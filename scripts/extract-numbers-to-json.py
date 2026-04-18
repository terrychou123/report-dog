"""
從 Numbers 檔案提取日照中心評鑑相關資料，輸出為 JSON。
用途：提供給 import-numbers-daycare.ts 匯入至資料庫。

執行方式：
  python3 scripts/extract-numbers-to-json.py
  python3 scripts/extract-numbers-to-json.py \\
    --source="$HOME/Desktop/日照中心評鑑全指標表格範例2.numbers" \\
    --output=scripts/numbers-extracted-daycare-indicators.json

預設輸出：scripts/numbers-extracted-daycare.json

支援的分頁命名格式（由 regex 統一處理）：
  「10開案與收案辦法」、「10-開案與收案辦法」、「10 開案與收案辦法」
"""

import argparse
import re
import json
import os

try:
    from numbers_parser import Document
except ImportError:
    print("❌ 請先安裝 numbers-parser：pip3 install numbers-parser")
    exit(1)

# CLI 參數
_default_source = os.path.expanduser("~/Desktop/日照中心評鑑全套管理辦法與紀錄表.numbers")
_default_output = os.path.join(os.path.dirname(__file__), "numbers-extracted-daycare.json")
_parser = argparse.ArgumentParser(description="提取 Numbers 檔案為 JSON")
_parser.add_argument("--source", default=_default_source, help="Numbers 來源檔案路徑")
_parser.add_argument("--output", default=_default_output, help="輸出 JSON 路徑")
_args = _parser.parse_args()

SOURCE_FILE = _args.source
OUTPUT_FILE = _args.output

# 無數字前綴的工作分頁手動指定對應項目編號
MANUAL_MAPPING = {
    "意外與緊急事件應變辦法": 35,
    "意外事件報告紀錄單": 35,
    "性騷擾防治管理辦法": 37,
}

# 欄寬/列高縮放比例（Numbers 使用 points，FortuneSheet 使用像素）
COL_SCALE = 1.5
ROW_SCALE = 1.7
ROW_MIN = 26  # 最小列高（對應 HEADER_ROW_HEIGHT）


def col_letter_to_index(letter: str) -> int:
    """將 Excel 欄位字母（A、B、AA 等）轉換為 0-based 索引。"""
    result = 0
    for ch in letter.upper():
        result = result * 26 + (ord(ch) - ord('A') + 1)
    return result - 1


def parse_merge_range(range_str: str):
    """
    將 Excel 範圍字串（如 'A1:F1'）解析為 {r, c, rs, cs}。
    Numbers 的列號為 1-based，轉為 0-based。
    """
    match = re.match(r'^([A-Z]+)(\d+):([A-Z]+)(\d+)$', range_str.upper())
    if not match:
        return None
    start_col = col_letter_to_index(match.group(1))
    start_row = int(match.group(2)) - 1  # 轉 0-based
    end_col = col_letter_to_index(match.group(3))
    end_row = int(match.group(4)) - 1
    rs = end_row - start_row + 1
    cs = end_col - start_col + 1
    if rs < 1 or cs < 1:
        return None  # 反向範圍，忽略
    return {
        "r": start_row,
        "c": start_col,
        "rs": rs,
        "cs": cs,
    }


def extract_sheet(sheet, template_number: int, sheet_name: str) -> dict:
    """提取單一工作分頁的資料為字典格式。"""
    tables = list(sheet.tables)
    if not tables:
        raise ValueError(f"工作分頁「{sheet_name}」沒有表格，無法提取資料")
    table = tables[0]

    num_rows = table.num_rows
    num_cols = table.num_cols

    # 提取儲存格資料（2D 字串陣列）
    data = []
    for r in range(num_rows):
        row = []
        for c in range(num_cols):
            try:
                val = table.cell(r, c).value
                row.append("" if val is None else str(val))
            except Exception:
                row.append("")
        data.append(row)

    # 提取欄寬（縮放後取整）
    col_widths = {}
    for c in range(num_cols):
        try:
            w = table.col_width(c)
            col_widths[str(c)] = max(60, round(w * COL_SCALE))
        except Exception:
            col_widths[str(c)] = 120

    # 提取列高（縮放後取整，最小 ROW_MIN）
    row_heights = {}
    for r in range(num_rows):
        try:
            h = table.row_height(r)
            row_heights[str(r)] = max(ROW_MIN, round(h * ROW_SCALE))
        except Exception:
            row_heights[str(r)] = ROW_MIN

    # 提取合併儲存格範圍
    merges = {}
    try:
        for merge_range in table.merge_ranges:
            parsed = parse_merge_range(str(merge_range))
            if parsed:
                key = f"{parsed['r']}_{parsed['c']}"
                merges[key] = parsed
    except Exception:
        pass  # 若無合併儲存格或解析失敗，忽略

    return {
        "templateNumber": template_number,
        "sheetName": sheet_name,
        "data": data,
        "colWidths": col_widths,
        "rowHeights": row_heights,
        "merges": merges,
    }


def main():
    if not os.path.exists(SOURCE_FILE):
        print(f"❌ 找不到來源檔案：{SOURCE_FILE}")
        exit(1)

    print(f"📖 讀取 Numbers 檔案：{SOURCE_FILE}")
    doc = Document(SOURCE_FILE)

    extracted_sheets = []

    for sheet in doc.sheets:
        original_name = sheet.name

        # 從分頁名稱解析數字前綴，相容「10開案」、「10-開案」、「10 開案」等格式
        match = re.match(r'^(\d+)\s*[-\u2010\u2011\u2012\u2013\u2014\uff0d]?\s*(.*)', original_name)
        if match:
            template_number = int(match.group(1))
            sheet_name = match.group(2).strip()
        elif original_name in MANUAL_MAPPING:
            template_number = MANUAL_MAPPING[original_name]
            sheet_name = original_name
        else:
            print(f"  ⚠️  跳過（無法對應範本編號）：【{original_name}】")
            continue

        print(f"  ✅ 【{original_name}】 → 範本 #{template_number}，分頁名稱：「{sheet_name}」")

        sheet_data = extract_sheet(sheet, template_number, sheet_name)
        extracted_sheets.append(sheet_data)

    output = {"sheets": extracted_sheets}
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 完成！共提取 {len(extracted_sheets)} 個工作分頁")
    print(f"📄 輸出至：{OUTPUT_FILE}")


if __name__ == "__main__":
    main()

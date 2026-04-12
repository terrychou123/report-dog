#!/usr/bin/env python3
"""
Phase 4: 批次重生成 249 篇部落格封面 SVG
策略：讀取現有舊格式 SVG → 提取內容 → 套用新模板結構

⚠️  警告：此腳本以舊版 SVG bbox 刮取為資料來源，覆蓋可靠度有限。
    請勿再對 public/blog/ 做全量批次覆寫，僅針對單篇重跑並人工核對。
    background: fa8533f Phase 4 曾造成 100+ 張封面爆框 / 空格，
    已由 git 回滾至手工版本（2026-04-12）。
"""

import re
import json
import sys
import subprocess
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
PUBLIC = BASE / 'public/blog'
POSTS_DIR = BASE / 'scripts/blog-posts'

# 已更新的封面（Phase 2/3 pilots）- 不重新生成
ALREADY_UPDATED = {
    'daycare-45-guide-cover.svg',
    'daycare-top10-cover.svg',
    'daycare-checklist-cover.svg',       # daycare-self-checklist
    'nursing-home-90day-cover.svg',
    'daycare-inspector-cover.svg',
    'psych-rehab-day-vs-residential-cover.svg',
}

# ============================================================
# 工具函式
# ============================================================

def ent(text: str) -> str:
    """CJK 字元轉 HTML entity，並 escape XML 特殊字符（避免文章標題含 & < > 導致 SVG 格式錯誤）"""
    _XML_ESCAPE = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}
    r = ''
    for c in text:
        if c in _XML_ESCAPE:
            r += _XML_ESCAPE[c]
        elif ord(c) > 127:
            r += f'&#{ord(c)};'
        else:
            r += c
    return r

def cjk_width(text: str) -> float:
    """計算字串等效 CJK 寬度（用於字級選擇）"""
    w = 0.0
    for c in text:
        if ord(c) > 127:
            w += 1.0
        elif c == ' ':
            w += 0.28
        else:
            w += 0.55
    return w

def slug_to_clip_id(cover_filename: str) -> str:
    """從封面檔名產生 clipPath id"""
    return 'clip-' + cover_filename.replace('-cover.svg', '')


# ============================================================
# 字級與座標選擇（§1 純 CJK 規則）
# ============================================================

def get_l1_font(n: float) -> int:
    """依字元寬度選擇 L1/L2 字級"""
    if n <= 3:
        return 160
    elif n <= 4:
        return 140
    elif n <= 5:
        return 120
    elif n <= 6:
        return 104
    else:
        return 92

def get_coords_for_font(font: int) -> dict:
    """依 L1 字級查詢各元素 y 座標（§1 純 CJK cascade）"""
    if font == 160:
        return dict(l1_y=203.76, l2_y=361.76, sep_y=391, sub_y=442.136,
                    pill_ry=461, pill_ty=499.708, aud_y=555.708, wm_y=597.928)
    elif font == 140:
        return dict(l1_y=211.32, l2_y=361.76, sep_y=388, sub_y=436.068,
                    pill_ry=461, pill_ty=499.708, aud_y=555.708, wm_y=597.928)
    elif font == 120:
        return dict(l1_y=219.32, l2_y=357.32, sep_y=384, sub_y=432.068,
                    pill_ry=461, pill_ty=499.708, aud_y=555.708, wm_y=597.928)
    elif font == 104:
        return dict(l1_y=222.0, l2_y=352.0, sep_y=380, sub_y=430.0,
                    pill_ry=458, pill_ty=497.0, aud_y=552.0, wm_y=597.928)
    else:  # 92
        return dict(l1_y=225.0, l2_y=348.0, sep_y=378, sub_y=428.0,
                    pill_ry=456, pill_ty=495.0, aud_y=550.0, wm_y=597.928)

# Pattern A 座標（§6）
PATTERN_A_MEDIUM = dict(  # digit=160 / cjk=128（2~3 位數）
    digit_font=160, cjk_font=128,
    digit_y=203.76, cjk_y=195.44,  # cjk_y = 203.76 - (160-128)×0.26
    l2_y=361.76, sep_y=391, sub_y=442.136,
    pill_ry=461, pill_ty=499.708, aud_y=555.708, wm_y=597.928
)
PATTERN_A_SHORT = dict(  # digit=200 / cjk=160（1~2 位數，timeline/chart/checklist 用）
    digit_font=200, cjk_font=160,
    digit_y=232.2, cjk_y=221.76,  # cjk_y = 232.2 - (200-160)×0.26
    l2_y=366.98, sep_y=397, sub_y=450.816,
    pill_ry=475.68, pill_ty=510.388, aud_y=568.388, wm_y=601.892
)

def detect_pattern_a(text: str):
    """偵測是否符合 Pattern A（數字+CJK 混排）
    Returns: (digit_str, cjk_str) or (None, None)
    """
    m = re.match(r'^(\d+)\s*(.+)$', text.strip())
    if not m:
        return None, None
    digit_str = m.group(1)
    cjk_str = m.group(2).strip()
    # CJK 部分必須全為中文/非 ASCII，且最多 4 字元（超過會在 font-128 下溢出面板右邊界）
    cjk_chars = [c for c in cjk_str if c not in ' ・']
    if all(ord(c) > 127 or c in ' ・' for c in cjk_str) and len(cjk_chars) <= 4:
        return digit_str, cjk_str
    return None, None

def calc_cjk_x(digit_x: float, digit_font: int, digit_str: str) -> float:
    """計算 Pattern A 中 CJK 部分的 x 座標"""
    n = len(digit_str)
    # 包含空格或尾部空格
    x = digit_x + round(digit_font * n * 0.55 + digit_font * 0.28 + 25)
    return x


# ============================================================
# 從舊格式 SVG 提取文字內容
# ============================================================

def extract_old_svg_texts(svg_content: str) -> list:
    """從舊格式 SVG 擷取所有 text 元素（含 x, y, text）"""
    texts = []

    # 舊格式：<text x="..." y="..." ...>content</text>
    pat = r'<text\s+([^>]*)>([^<]*)</text>'
    for m in re.finditer(pat, svg_content):
        attrs = m.group(1)
        content = m.group(2).strip()
        if not content or content.startswith('<!--'):
            continue
        x_m = re.search(r'\bx="([^"]+)"', attrs)
        y_m = re.search(r'\by="([^"]+)"', attrs)
        if not x_m or not y_m:
            continue
        try:
            x = float(x_m.group(1))
            y = float(y_m.group(1))
        except ValueError:
            continue
        texts.append({'x': x, 'y': y, 'text': content})

    # 新格式：<text ...><tspan ...>content</tspan></text>（屬性順序不定）
    pat2 = r'<text[^>]*>\s*(<tspan\s[^>]*>)([^<]*)</tspan>'
    for m in re.finditer(pat2, svg_content):
        tspan_tag = m.group(1)
        content = m.group(2).strip()
        x_m = re.search(r'\bx="([^"]+)"', tspan_tag)
        y_m = re.search(r'\by="([^"]+)"', tspan_tag)
        if not x_m or not y_m:
            continue
        try:
            x = float(x_m.group(1))
            y = float(y_m.group(1))
        except ValueError:
            continue
        if not content:
            continue
        texts.append({'x': x, 'y': y, 'text': content})

    return texts


def find_text(texts: list, x_lo: float, x_hi: float, y_lo: float, y_hi: float,
              exclude: str = None) -> str:
    """在指定範圍內找到文字（允許多筆，取第一筆非 exclude）"""
    for t in sorted(texts, key=lambda t: t['y']):
        if x_lo <= t['x'] <= x_hi and y_lo <= t['y'] <= y_hi:
            val = t['text']
            if exclude and val == exclude:
                continue
            # 過濾掉浮水印
            if 'reportwang' in val:
                continue
            return val
    return ''


def extract_standard_fields(svg_content: str) -> dict:
    """從舊格式標準型 SVG 提取所有欄位"""
    texts = extract_old_svg_texts(svg_content)

    # 左側（x 在 0–800 範圍，text-anchor 通常是 start，x≈60）
    l1 = find_text(texts, 0, 200, 80, 250)
    l2 = find_text(texts, 0, 200, 230, 390)
    # 副標題：舊格式位置不一（y=385~520），擴大範圍確保捕捉
    subtitle = find_text(texts, 0, 200, 390, 530)

    # pills 改由 article JSON tags 提供，不從舊 SVG 提取
    pill1 = ''
    pill2 = ''
    pill3 = ''

    # 適用對象（x≈60, y≈530-595，過濾掉「適用：」前綴）
    audience_raw = find_text(texts, 0, 200, 530, 595)
    # 移除舊格式「適用：」前綴，統一為「適合…」格式
    audience = re.sub(r'^適[用合][\s：:]*', '', audience_raw).strip() if audience_raw else ''

    # 右側 hero（text-anchor="middle"，x≈1010）
    hero_num = find_text(texts, 880, 1170, 200, 270)
    hero_desc = find_text(texts, 880, 1170, 265, 310)

    # 右側 2×2 卡片（center x≈918, 1083）
    card1_title = find_text(texts, 850, 970, 305, 360)   # TL title
    card1_sub = find_text(texts, 850, 970, 355, 400)     # TL sub
    card2_title = find_text(texts, 1010, 1140, 305, 360)  # TR title
    card2_sub = find_text(texts, 1010, 1140, 355, 400)    # TR sub
    card3_title = find_text(texts, 850, 970, 405, 460)   # BL title
    card3_sub = find_text(texts, 850, 970, 455, 500)     # BL sub
    card4_title = find_text(texts, 1010, 1140, 405, 460)  # BR title
    card4_sub = find_text(texts, 1010, 1140, 455, 500)    # BR sub

    # 底部寬 pill（y≈520-545）
    bottom_pill = find_text(texts, 840, 1160, 490, 560)

    return {
        'l1': l1, 'l2': l2, 'subtitle': subtitle,
        'pill1': pill1, 'pill2': pill2, 'pill3': pill3, 'audience': audience,
        'hero_num': hero_num, 'hero_desc': hero_desc,
        'card1_title': card1_title, 'card1_sub': card1_sub,
        'card2_title': card2_title, 'card2_sub': card2_sub,
        'card3_title': card3_title, 'card3_sub': card3_sub,
        'card4_title': card4_title, 'card4_sub': card4_sub,
        'bottom_pill': bottom_pill,
    }


def extract_chart_fields(svg_content: str) -> dict:
    """從舊格式 chart/top10 類型 SVG 提取欄位"""
    texts = extract_old_svg_texts(svg_content)

    # 左側
    l1 = find_text(texts, 0, 200, 80, 250)
    l2 = find_text(texts, 0, 200, 230, 390)
    subtitle = find_text(texts, 0, 200, 390, 530)
    pill1 = ''
    pill2 = ''
    pill3 = ''
    audience_raw = find_text(texts, 0, 200, 530, 595)
    audience = re.sub(r'^適[用合][\s：:]*', '', audience_raw).strip() if audience_raw else ''

    # 右側：可能是垂直清單的項目（x≈840-1170, y from 300 to 540）
    # 從舊格式中依 y 座標排序取前 5 個右側文字作為 bar 標籤
    right_items = []
    seen = set()
    for t in sorted(texts, key=lambda t: t['y']):
        if 840 <= t['x'] <= 1170 and 290 <= t['y'] <= 560:
            val = t['text']
            if val not in seen and 'reportwang' not in val:
                seen.add(val)
                right_items.append(val)

    # 取出 bar 標籤（右側非數字的短文字，去掉數字/百分比等）
    bar_labels = []
    for item in right_items:
        # 跳過純數字、百分比、年度標記等
        if re.match(r'^[\d%年條款項\s]+$', item):
            continue
        if len(item) <= 8:  # 短標籤才作為 bar label
            bar_labels.append(item)
        if len(bar_labels) >= 5:
            break

    # 右側圖表標題（通常是右側第一行文字）
    chart_title = find_text(texts, 840, 1170, 70, 140)

    return {
        'l1': l1, 'l2': l2, 'subtitle': subtitle,
        'pill1': pill1, 'pill2': pill2, 'pill3': pill3, 'audience': audience,
        'chart_title': chart_title, 'bar_labels': bar_labels,
    }


def extract_checklist_fields(svg_content: str) -> dict:
    """從舊格式 checklist 類型 SVG 提取欄位"""
    texts = extract_old_svg_texts(svg_content)

    # 左側
    l1 = find_text(texts, 0, 200, 80, 250)
    l2 = find_text(texts, 0, 200, 230, 390)
    subtitle = find_text(texts, 0, 200, 390, 530)
    pill1 = ''
    pill2 = ''
    pill3 = ''
    audience_raw = find_text(texts, 0, 200, 530, 595)
    audience = re.sub(r'^適[用合][\s：:]*', '', audience_raw).strip() if audience_raw else ''

    # 右側 checklist 項目
    right_items = []
    seen = set()
    for t in sorted(texts, key=lambda t: t['y']):
        if 840 <= t['x'] <= 1170 and 280 <= t['y'] <= 540:
            val = t['text']
            if val not in seen and 'reportwang' not in val and len(val) >= 3:
                seen.add(val)
                right_items.append(val)
        if len(right_items) >= 6:
            break

    checklist_title = find_text(texts, 840, 1170, 60, 130)

    return {
        'l1': l1, 'l2': l2, 'subtitle': subtitle,
        'pill1': pill1, 'pill2': pill2, 'pill3': pill3, 'audience': audience,
        'checklist_title': checklist_title, 'items': right_items[:6],
    }


def extract_timeline_fields(svg_content: str) -> dict:
    """從舊格式 timeline 類型 SVG 提取欄位"""
    texts = extract_old_svg_texts(svg_content)

    # 左側
    l1 = find_text(texts, 0, 200, 80, 250)
    l2 = find_text(texts, 0, 200, 230, 390)
    subtitle = find_text(texts, 0, 200, 390, 530)
    pill1 = ''
    pill2 = ''
    pill3 = ''
    audience_raw = find_text(texts, 0, 200, 530, 595)
    audience = re.sub(r'^適[用合][\s：:]*', '', audience_raw).strip() if audience_raw else ''

    # 右側 hero 數字（大字）
    hero_num = find_text(texts, 880, 1170, 200, 270)
    hero_desc = find_text(texts, 880, 1170, 265, 310)

    # 右側 3 個時程區塊（依 y 座標排序取 3 組標題+說明）
    stage_items = []
    seen = set()
    for t in sorted(texts, key=lambda t: t['y']):
        if 840 <= t['x'] <= 1180 and 270 <= t['y'] <= 560:
            val = t['text']
            if val not in seen and 'reportwang' not in val:
                seen.add(val)
                stage_items.append(val)
        if len(stage_items) >= 8:
            break

    return {
        'l1': l1, 'l2': l2, 'subtitle': subtitle,
        'pill1': pill1, 'pill2': pill2, 'pill3': pill3, 'audience': audience,
        'hero_num': hero_num, 'hero_desc': hero_desc,
        'stage_items': stage_items,
    }


def extract_quote_fields(svg_content: str, article: dict) -> dict:
    """從文章 excerpt 產生 quote 內容（舊格式 quote 無引言結構）"""
    texts = extract_old_svg_texts(svg_content)

    # 左側
    l1 = find_text(texts, 0, 200, 80, 250)
    l2 = find_text(texts, 0, 200, 230, 390)
    pill1 = find_text(texts, 60, 220, 455, 535)
    pill2 = find_text(texts, 220, 400, 455, 535)
    audience = find_text(texts, 0, 200, 530, 595)

    # 從 excerpt 衍生 3 行引言
    excerpt = article.get('excerpt', '')
    lines = derive_quote_lines(excerpt, article.get('title', ''))

    # 受訪者資訊
    person_name, person_role, person_org = derive_person_info(article)

    pill_r1 = pill1 or '評鑑委員'
    pill_r2 = pill2 or '現場觀察'

    return {
        'quote_l1': lines[0], 'quote_l2': lines[1], 'quote_l3': lines[2],
        'person_name': person_name, 'person_role': person_role,
        'person_org': person_org,
        'pill_r1': pill_r1, 'pill_r2': pill_r2,
    }


def extract_vs_fields(svg_content: str, article: dict) -> dict:
    """從文章標題/excerpt 衍生 VS 對比內容"""
    texts = extract_old_svg_texts(svg_content)

    # 3 個頂部標籤
    pill1 = find_text(texts, 60, 220, 455, 535)
    pill2 = find_text(texts, 220, 400, 455, 535)
    pill3 = find_text(texts, 380, 560, 455, 535)

    # 從標題提取 VS 兩側
    title = article.get('title', '')
    a_name, b_name, points_a, points_b, sub_a, sub_b = derive_vs_content(title, article)

    # 頂部標題行
    m = re.match(r'^(.+?)\s+vs\s+(.+?)(?:：|:)', title, re.IGNORECASE)
    if m:
        top_l1 = m.group(1).strip()
        top_l2 = 'vs'
    else:
        top_l1 = title[:6]
        top_l2 = '比較分析'

    return {
        'top_l1': top_l1, 'top_l2': top_l2,
        'pill1': pill1, 'pill2': pill2, 'pill3': pill3,
        'a_name': a_name, 'b_name': b_name,
        'points_a': points_a, 'points_b': points_b,
        'sub_a': sub_a, 'sub_b': sub_b,
    }


# ============================================================
# 輔助：衍生 quote/vs 內容
# ============================================================

def derive_quote_lines(excerpt: str, title: str) -> list:
    """從 excerpt 提取 3 行引言"""
    # 取 excerpt 第一句，拆成 3 段
    first_sent = re.split(r'[。！？\n]', excerpt)[0] if excerpt else title[:20]
    first_sent = first_sent.strip()

    # 依長度拆分
    n = len(first_sent)
    if n <= 12:
        lines = [first_sent, '', '']
    elif n <= 20:
        mid = n // 2
        lines = [first_sent[:mid] + '，', first_sent[mid:] + '。', '']
    else:
        # 找標點切分
        parts = re.split(r'[，,]', first_sent)
        if len(parts) >= 3:
            lines = [parts[0] + '，', parts[1] + '，', '，'.join(parts[2:]) + '。']
        elif len(parts) == 2:
            lines = [parts[0] + '，', parts[1] + '。', '']
        else:
            seg = n // 3
            lines = [first_sent[:seg], first_sent[seg:seg*2], first_sent[seg*2:]]
            lines = [l + ('，' if i < 2 else '。') for i, l in enumerate(lines)]

    # 補足 3 行
    while len(lines) < 3:
        lines.append('')
    return [l[:15] for l in lines[:3]]  # 每行最多 15 字


def derive_pills_from_tags(article: dict) -> tuple:
    """從 article tags 衍生 3 個 pill 標籤（最多 5 CJK 等效寬度）"""
    tags = article.get('tags', [])
    result = []
    for tag in tags:
        w = cjk_width(tag)
        # 若超過 5 CJK 寬，截斷為最長 4 字 CJK
        if w > 5:
            tag = tag[:4]
        result.append(tag)
        if len(result) >= 3:
            break
    # 補足 3 個
    defaults = ['評鑑準備', '文件管理', '實務攻略']
    while len(result) < 3:
        result.append(defaults[len(result)])
    return result[0], result[1], result[2]


def derive_audience_from_slug(article: dict) -> str:
    """從 slug/tags 衍生適用對象說明"""
    slug = article['slug']
    audience_map = {
        'daycare': '適合日照中心主任、社工師、護理師',
        'home-care': '適合居家服務機構負責人及督導員',
        'nursing-home': '適合住宿型機構主管與護理師',
        'home-nursing': '適合居家護理所主任及護理人員',
        'postpartum': '適合產後護理機構負責人與護理長',
        'general-nursing-home': '適合護理之家主管及護理工作人員',
        'infant-daycare': '適合托嬰中心主任及教保人員',
        'youth-care': '適合兒少機構主任及社工人員',
        'psychiatric-nursing-home': '適合精神護理之家主管及護理師',
        'psych-rehab': '適合精神復健機構主管及工作人員',
        'disability-welfare': '適合身障機構負責人及社工師',
        'hospital': '適合醫院評鑑準備主管及醫護人員',
        'elderly-welfare': '適合老人福利機構主管與社工師',
    }
    for prefix, desc in audience_map.items():
        if slug.startswith(prefix):
            return desc
    return '適合長照機構主管及評鑑準備人員'


def derive_person_info(article: dict) -> tuple:
    """從 slug/tags 衍生受訪者資訊"""
    slug = article['slug']
    tags = article.get('tags', [])
    title = article.get('title', '')

    # 職稱判斷
    role_map = {
        'daycare': '日照評鑑 · 現場查核實錄',
        'home-care': '居服評鑑 · 督導實戰分享',
        'nursing-home': '住宿型評鑑 · 現場觀察紀錄',
        'home-nursing': '居護評鑑 · 實務觀察報告',
        'postpartum': '月子中心評鑑 · 委員視角',
        'general-nursing-home': '護理之家評鑑 · 實務分享',
        'infant-daycare': '托嬰評鑑 · 委員觀察實錄',
        'youth-care': '兒少評鑑 · 現場審查紀錄',
        'psychiatric-nursing-home': '精護評鑑 · 委員視角',
        'psych-rehab': '精復評鑑 · 現場觀察',
        'disability-welfare': '身障評鑑 · 實務分享',
        'hospital': '醫院評鑑 · 委員觀察',
        'elderly-welfare': '老福評鑑 · 現場實錄',
    }

    name_map = {
        'daycare': '資深評鑑委員',
        'home-care': '居家服務督導員',
        'nursing-home': '護理之家護理長',
        'home-nursing': '居家護理所主任',
        'postpartum': '產後護理評鑑委員',
        'general-nursing-home': '護理之家資深委員',
        'infant-daycare': '托嬰評鑑資深委員',
        'youth-care': '兒少機構評鑑委員',
        'psychiatric-nursing-home': '精神護理評鑑委員',
        'psych-rehab': '精神復健機構委員',
        'disability-welfare': '身障機構評鑑委員',
        'hospital': '醫院評鑑委員',
        'elderly-welfare': '老人福利評鑑委員',
    }

    org_map = {
        'daycare': '日照評鑑現場',
        'home-care': '居服評鑑現場',
        'nursing-home': '住宿型評鑑',
        'home-nursing': '居護評鑑現場',
        'postpartum': '月子中心評鑑',
        'general-nursing-home': '護理之家評鑑',
        'infant-daycare': '托嬰中心評鑑',
        'youth-care': '兒少機構評鑑',
        'psychiatric-nursing-home': '精護評鑑現場',
        'psych-rehab': '精復機構評鑑',
        'disability-welfare': '身障機構評鑑',
        'hospital': '醫院評鑑現場',
        'elderly-welfare': '老福機構評鑑',
    }

    prefix = slug.split('-')[0]
    for key in role_map:
        if slug.startswith(key):
            prefix = key
            break

    name = name_map.get(prefix, '評鑑委員')
    role = role_map.get(prefix, '評鑑 · 現場觀察實錄')
    org = org_map.get(prefix, '機構評鑑現場')

    return name, role, org


def derive_vs_content(title: str, article: dict) -> tuple:
    """從標題/excerpt 衍生 VS 對比兩側內容"""
    excerpt = article.get('excerpt', '')
    slug = article['slug']

    # 嘗試從標題提取 A vs B
    m = re.search(r'(.+?)\s+(?:vs|VS|Vs)\s+(.+?)(?:：|:|的|評鑑|\s|$)', title)
    if m:
        a_raw = m.group(1).strip()
        b_raw = m.group(2).strip()
        # 清理
        a_name = a_raw[-8:] if len(a_raw) > 8 else a_raw
        b_name = b_raw[:8] if len(b_raw) > 8 else b_raw
    else:
        a_name = '方案 A'
        b_name = '方案 B'

    # 預設比較重點（3 項）
    default_points = ['核心指標差異', '文件準備重點', '適用評鑑類型']
    sub_a = '重點特色說明'
    sub_b = '重點特色說明'

    # 依 slug 衍生具體比較重點
    if 'vs' in slug or 'comparison' in slug or 'dual' in slug:
        if 'quality' in slug or 'reward' in slug:
            points_a = ['品質獎勵重點', '指標自訂空間', '每季追蹤']
            points_b = ['評鑑必要條文', '逐項書面佐證', '三/四年週期']
            sub_a = '彈性較高，可自訂指標'
            sub_b = '嚴謹規範，必要條文優先'
        elif 'day' in slug and 'residential' in slug:
            points_a = ['社區融合導向', '日間活動課程', '個案計畫追蹤']
            points_b = ['24小時照顧記錄', '限制措施管理', '住宿環境維護']
            sub_a = '特色：日間活動＋社區融合'
            sub_b = '特色：全天護理＋住宿管理'
        elif 'under2' in slug or 'dual' in slug:
            points_a = ['嬰兒期發展評估', '哺乳與副食品', '基本生活照顧']
            points_b = ['幼兒發展活動', '語言社交能力', '自理能力訓練']
            sub_a = '重點：健康與安全照護'
            sub_b = '重點：發展與學習能力'
        else:
            points_a = default_points
            points_b = default_points
            sub_a = '重點特色說明'
            sub_b = '重點特色說明'
    else:
        points_a = default_points
        points_b = default_points

    return a_name, b_name, points_a[:3], points_b[:3], sub_a, sub_b


# ============================================================
# 從舊格式解析 timeline 的時間數字
# ============================================================

def parse_timeline_number(l1: str, l2: str, hero_num: str, hero_desc: str,
                           title: str) -> tuple:
    """
    從 timeline 相關欄位推斷：
    - 時間數字 (e.g., "90", "3")
    - 時間單位 (e.g., "天", "個月")
    Returns: (digit, cjk_unit, is_short_pattern)
    """
    # 優先從 hero_num/hero_desc
    if hero_num and re.match(r'^\d+$', hero_num.strip()):
        n = hero_num.strip()
        # 從 hero_desc 提取單位
        unit = hero_desc.strip() if hero_desc else '天'
        # 清理單位（移除多餘字詞）
        unit = re.sub(r'[個月評鑑準備時程倒數計畫\s]', '', unit)
        if not unit or len(unit) > 2:
            # 從 title 推斷
            if '個月' in title:
                unit = '個月'
            elif '天' in title:
                unit = '天'
            else:
                unit = '天'
        # 決定 Pattern A 版本
        int_n = int(n) if n.isdigit() else 0
        is_short = int_n <= 99  # 1-99 用 SHORT (200/160)
        return n, unit, is_short

    # 從 l1 提取
    if l1:
        m = re.match(r'^(\d+)\s*(.+)', l1)
        if m:
            n = m.group(1)
            raw_unit = m.group(2).strip()
            if '個月' in raw_unit:
                unit = '個月'
            elif '天' in raw_unit:
                unit = '天'
            else:
                unit = raw_unit[:2]
            int_n = int(n) if n.isdigit() else 0
            is_short = int_n <= 99
            return n, unit, is_short

    # 從 title 推斷
    m = re.search(r'(\d+)\s*(天|個月)', title)
    if m:
        n = m.group(1)
        unit = m.group(2)
        int_n = int(n) if n.isdigit() else 0
        is_short = int_n <= 99
        return n, unit, is_short

    m = re.search(r'(\d+)\s*個月', title)
    if m:
        return m.group(1), '個月', True

    return '90', '天', True


def parse_timeline_stages(stage_items: list, title: str) -> list:
    """從右側 stage_items 解析三個階段名稱+時間描述"""
    # 過濾掉無關文字（年份、純數字）
    items = [x for x in stage_items if x and not re.match(r'^[\d年\s月]+$', x) and 'reportwang' not in x]

    stages = []
    # 嘗試依 "第N個月" or "第N-M天" or 類似模式配對
    i = 0
    while i < len(items) and len(stages) < 3:
        name = items[i]
        desc = items[i+1] if i+1 < len(items) else ''
        # 如果 desc 似乎不是時間描述，留空
        if desc and len(desc) > 15:
            desc = desc[:12]
        stages.append((name[:6], desc[:12]))
        i += 2

    # 不足 3 組時用預設
    defaults_90day = [('盤點清查', '第 1–30 天'), ('補強改善', '第 31–60 天'), ('模擬衝刺', '第 61–90 天')]
    defaults_3month = [('文件整備', '第 1 個月'), ('補強試評', '第 2 個月'), ('最終演練', '評鑑前一個月')]
    defaults = defaults_90day if '天' in title or '90' in title else defaults_3month

    while len(stages) < 3:
        stages.append(defaults[len(stages)])

    return stages[:3]


# ============================================================
# SVG 生成：各模板
# ============================================================

WM_X = '879.008'
WM_TEXT = ent('報告汪 reportwang.com')

def pill_svg(idx: int, text: str, colors=('#D97706', '#78716C', '#57534E'),
             rx_y: float = 461, tx_y: float = 499.708) -> str:
    """產生左側 3 個 pill 的 SVG（idx=1/2/3）"""
    pill_defs = [
        (198, 70, 198, 70),   # pill1: right=198, left=70, inner_w=128, inner_x=70
        (358, 230, 358, 230), # pill2
        (518, 390, 518, 390), # pill3
    ]
    rights = [198, 358, 518]
    lefts = [70, 230, 390]
    tx_starts = [78, 241, 398]

    i = idx - 1
    color = colors[i]
    left = lefts[i]
    right = rights[i]
    tx = tx_starts[i]
    h = 36

    # 使用模板中的正確路徑
    # pill 外框高度 46px（內框 26px），底部各點需 +46（外底）/+36（內底）/+41.523（底曲線控制點）
    rect_templates = [
        f'<path opacity="0.12" d="M198 {rx_y:.2f}H70C64.4772 {rx_y:.2f} 60 {rx_y+4.477:.3f} 60 {rx_y+10:.2f}V{rx_y+36:.2f}C60 {rx_y+41.523:.3f} 64.4772 {rx_y+46:.2f} 70 {rx_y+46:.2f}H198C203.523 {rx_y+46:.2f} 208 {rx_y+41.523:.3f} 208 {rx_y+36:.2f}V{rx_y+10:.2f}C208 {rx_y+4.477:.3f} 203.523 {rx_y:.2f} 198 {rx_y:.2f}Z" fill="{color}"/>',
        f'<path opacity="0.12" d="M358 {rx_y:.2f}H230C224.477 {rx_y:.2f} 220 {rx_y+4.477:.3f} 220 {rx_y+10:.2f}V{rx_y+36:.2f}C220 {rx_y+41.523:.3f} 224.477 {rx_y+46:.2f} 230 {rx_y+46:.2f}H358C363.523 {rx_y+46:.2f} 368 {rx_y+41.523:.3f} 368 {rx_y+36:.2f}V{rx_y+10:.2f}C368 {rx_y+4.477:.3f} 363.523 {rx_y:.2f} 358 {rx_y:.2f}Z" fill="{color}"/>',
        f'<path opacity="0.12" d="M518 {rx_y:.2f}H390C384.477 {rx_y:.2f} 380 {rx_y+4.477:.3f} 380 {rx_y+10:.2f}V{rx_y+36:.2f}C380 {rx_y+41.523:.3f} 384.477 {rx_y+46:.2f} 390 {rx_y+46:.2f}H518C523.523 {rx_y+46:.2f} 528 {rx_y+41.523:.3f} 528 {rx_y+36:.2f}V{rx_y+10:.2f}C528 {rx_y+4.477:.3f} 523.523 {rx_y:.2f} 518 {rx_y:.2f}Z" fill="{color}"/>',
    ]

    txt = f'<text fill="{color}" style="white-space: pre" xml:space="preserve"  font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="{tx}" y="{tx_y:.3f}">{ent(text)}</tspan></text>'

    return rect_templates[i] + '\n' + txt


def gen_standard_svg(clip_id: str, fields: dict, article: dict) -> str:
    """生成標準模板 SVG"""
    l1 = fields.get('l1', '')
    l2 = fields.get('l2', '')
    subtitle = fields.get('subtitle', '')
    # pills 一律從 article tags 衍生，忽略舊 SVG 提取值（因舊格式座標不一致）
    pill1, pill2, pill3 = derive_pills_from_tags(article)
    # audience 優先用舊 SVG 提取值（去掉「適用：」後），否則從 slug 衍生
    audience = derive_audience_from_slug(article)
    hero_num = fields.get('hero_num', '')
    hero_desc = fields.get('hero_desc', '')
    card1_title = fields.get('card1_title', '')
    card1_sub = fields.get('card1_sub', '')
    card2_title = fields.get('card2_title', '')
    card2_sub = fields.get('card2_sub', '')
    card3_title = fields.get('card3_title', '')
    card3_sub = fields.get('card3_sub', '')
    card4_title = fields.get('card4_title', '')
    card4_sub = fields.get('card4_sub', '')
    bottom_pill = fields.get('bottom_pill', '')

    # 決定 L1 Pattern A or 純 CJK
    digit, cjk_unit = detect_pattern_a(l1)
    if digit and cjk_unit:
        # Pattern A MEDIUM（standard 模板不用 SHORT 以免與 hero 衝突）
        pa = PATTERN_A_MEDIUM
        cjk_x = calc_cjk_x(58, pa['digit_font'], digit)
        l1_svg = (
            f'<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  '
            f'font-size="{pa["digit_font"]}" font-weight="bold" letter-spacing="0em">'
            f'<tspan x="58" y="{pa["digit_y"]}">{ent(digit)} </tspan></text>\n'
            f'<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  '
            f'font-size="{pa["cjk_font"]}" font-weight="bold" letter-spacing="0em">'
            f'<tspan x="{cjk_x}" y="{pa["cjk_y"]}">{ent(cjk_unit)}</tspan></text>'
        )
        c = pa
    else:
        n = max(cjk_width(l1), cjk_width(l2))
        font = get_l1_font(n)
        c = get_coords_for_font(font)
        l1_svg = (
            f'<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  '
            f'font-size="{font}" font-weight="bold" letter-spacing="0em">'
            f'<tspan x="58" y="{c["l1_y"]}">{ent(l1)}</tspan></text>'
        )

    l2_svg = (
        f'<text fill="#D97706" style="white-space: pre" xml:space="preserve"  '
        f'font-size="{font if not digit else pa["digit_font"]}" font-weight="bold" letter-spacing="0em">'
        f'<tspan x="58" y="{c["l2_y"]}">{ent(l2)}</tspan></text>'
    )
    if digit:
        l2_svg = (
            f'<text fill="#D97706" style="white-space: pre" xml:space="preserve"  '
            f'font-size="{pa["digit_font"]}" font-weight="bold" letter-spacing="0em">'
            f'<tspan x="58" y="{c["l2_y"]}">{ent(l2)}</tspan></text>'
        )

    # 驗證 hero_num 必須為純數字（含最多一個小數點），否則略過大數字區塊以免爆框
    hero_num = (hero_num or '').strip()
    _is_numeric_hero = bool(re.fullmatch(r'\d{1,4}(?:[.,]\d+)?', hero_num))
    if not _is_numeric_hero:
        hero_num = ''  # 非數字一律不 emit（中文 / 代碼 / 符號皆會在 font-200 爆框）

    # 依位數自適應字級，使用 text-anchor="middle" 置中於右側面板中心 x=1010
    if hero_num:
        _n_digits = len(re.sub(r'[^0-9]', '', hero_num))
        if _n_digits <= 2:
            _hero_font, _hero_x = 200, 1010
        elif _n_digits == 3:
            _hero_font, _hero_x = 160, 1010
        else:
            _hero_font, _hero_x = 128, 1010

    hero_svg = ''
    if hero_num:
        hero_svg = (
            f'<!-- 右側大數字 -->\n'
            f'<text fill="#D97706" style="white-space: pre" xml:space="preserve"  '
            f'font-size="{_hero_font}" font-weight="bold" letter-spacing="0em" text-anchor="middle">'
            f'<tspan x="{_hero_x}" y="232.2">{ent(hero_num)}</tspan></text>\n'
            f'<text fill="#78716C" style="white-space: pre" xml:space="preserve"  '
            f'font-size="28" font-weight="bold" letter-spacing="0em" text-anchor="middle">'
            f'<tspan x="1010" y="274.416">{ent(hero_desc)}</tspan></text>'
        )

    # 卡片輔助函式：content 若皆為空則略過整個卡片（避免只有空框沒有文字）
    def _card(path_d: str, t1_color: str, t1_x: int, t1_y: str, title: str,
              t2_x: int, t2_y: str, sub: str) -> str:
        if not (title or sub):
            return ''  # 空卡片完全不 emit
        return (
            f'<path d="{path_d}" fill="white" stroke="#E8E6DE"/>\n'
            f'<text fill="{t1_color}" style="white-space: pre" xml:space="preserve"  font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="{t1_x}" y="{t1_y}">{ent(title)}</tspan></text>\n'
            f'<text fill="#A8A29E" style="white-space: pre" xml:space="preserve"  font-size="22" letter-spacing="0em"><tspan x="{t2_x}" y="{t2_y}">{ent(sub)}</tspan></text>'
        )

    cards_svg = '<!-- 右側白底卡片 -->\n' + '\n'.join(filter(None, [
        _card("M991 300H856C850.477 300 846 304.477 846 310V376C846 381.523 850.477 386 856 386H991C996.523 386 1001 381.523 1001 376V310C1001 304.477 996.523 300 991 300Z",
              "#D97706", 868, "341.708", card1_title, 868, "370.476", card1_sub),
        _card("M1156 300H1021C1015.48 300 1011 304.477 1011 310V376C1011 381.523 1015.48 386 1021 386H1156C1161.52 386 1166 381.523 1166 376V310C1166 304.477 1161.52 300 1156 300Z",
              "#78716C", 1033, "341.708", card2_title, 1033, "370.476", card2_sub),
        _card("M991 399H856C850.477 399 846 403.477 846 409V475C846 480.523 850.477 485 856 485H991C996.523 485 1001 480.523 1001 475V409C1001 403.477 996.523 399 991 399Z",
              "#78716C", 868, "440.708", card3_title, 868, "469.476", card3_sub),
        _card("M1156 399H1021C1015.48 399 1011 403.477 1011 409V475C1011 480.523 1015.48 485 1021 485H1156C1161.52 485 1166 480.523 1166 475V409C1166 403.477 1161.52 399 1156 399Z",
              "#D97706", 1033, "440.708", card4_title, 1033, "469.476", card4_sub),
    ]))

    # bottom_pill 長度自適應字級 + 置中，空值則不 emit
    bottom_pill = (bottom_pill or '').strip()
    if bottom_pill:
        _pill_len = len(bottom_pill)
        if _pill_len <= 11:
            _pill_font = 28
        elif _pill_len <= 14:
            _pill_font = 24
        else:
            _pill_font = 20
        bottom_pill_svg = (
            f'<path opacity="0.12" d="M1156 498H856C850.477 498 846 502.477 846 508V540C846 545.523 850.477 550 856 550H1156C1161.52 550 1166 545.523 1166 540V508C1166 502.477 1161.52 498 1156 498Z" fill="#D97706"/>\n'
            f'<text fill="#D97706" style="white-space: pre" xml:space="preserve"  '
            f'font-size="{_pill_font}" font-weight="bold" letter-spacing="0em" text-anchor="middle">'
            f'<tspan x="1006" y="530.708">{ent(bottom_pill)}</tspan></text>'
        )
    else:
        bottom_pill_svg = ''  # 空值略過底部標籤與背景框

    sep_y = c["sep_y"]
    sub_y = c["sub_y"]
    pill_ry = c["pill_ry"]
    pill_ty = c["pill_ty"]
    aud_y = c["aud_y"]
    wm_y = c["wm_y"]

    return f'''<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="'Noto Sans TC', sans-serif">
  <rect width="1200" height="630" fill="#f0efe8"/>
<g clip-path="url(#{clip_id})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1200 0H820V630H1200V0Z" fill="#E8E6DE"/>
{hero_svg}
{cards_svg}
{bottom_pill_svg}
{l1_svg}
{l2_svg}
<path d="M57.5 {sep_y}H822" stroke="#DEDAD3" stroke-width="2"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="38" letter-spacing="0em"><tspan x="60" y="{sub_y}">{ent(subtitle)}</tspan></text>
{pill_svg(1, pill1, rx_y=pill_ry, tx_y=pill_ty)}
{pill_svg(2, pill2, rx_y=pill_ry, tx_y=pill_ty)}
{pill_svg(3, pill3, rx_y=pill_ry, tx_y=pill_ty)}
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve"  font-size="28" letter-spacing="0em"><tspan x="60" y="{aud_y}">{ent(audience)}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" letter-spacing="0em"><tspan x="{WM_X}" y="{wm_y}">{WM_TEXT}</tspan></text>
</g>
<defs>
<clipPath id="{clip_id}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>'''


def gen_chart_svg(clip_id: str, fields: dict, article: dict) -> str:
    """生成 Chart 模板 SVG"""
    l1 = fields.get('l1', '')
    l2 = fields.get('l2', '')
    subtitle = fields.get('subtitle', '')
    pill1, pill2, pill3 = derive_pills_from_tags(article)
    audience = derive_audience_from_slug(article)
    chart_title = fields.get('chart_title', '缺失頻率')
    bar_labels = fields.get('bar_labels', [])

    # 確保 5 個 bar labels
    default_labels = ['照護品質', '行政管理', '環境設施', '人力配置', '個案紀錄']
    while len(bar_labels) < 5:
        bar_labels.append(default_labels[len(bar_labels) % len(default_labels)])
    bar_labels = [l[:4] for l in bar_labels[:5]]

    # 純 CJK 字級
    n = max(cjk_width(l1), cjk_width(l2))
    font = get_l1_font(n)
    c = get_coords_for_font(font)

    # chart_title x 依字數置中
    ct_width = cjk_width(chart_title) * 36
    ct_x = 1010 - ct_width / 2

    return f'''<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="'Noto Sans TC', sans-serif">
  <rect width="1200" height="630" fill="#f0efe8"/>
<g clip-path="url(#{clip_id})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1200 0H820V630H1200V0Z" fill="#E8E6DE"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="36" font-weight="bold" letter-spacing="0em"><tspan x="{ct_x:.3f}" y="103.696">{ent(chart_title)}</tspan></text>
<path d="M1179 506H841C840.448 506 840 506.448 840 507C840 507.552 840.448 508 841 508H1179C1179.55 508 1180 507.552 1180 507C1180 506.448 1179.55 506 1179 506Z" fill="#A8A29E"/>
<path opacity="0.9" d="M893 166H861C857.686 166 855 168.686 855 172V500C855 503.314 857.686 506 861 506H893C896.314 506 899 503.314 899 500V172C899 168.686 896.314 166 893 166Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="851.312" y="155.964">85%</tspan></text>
<path opacity="0.9" d="M958 226H926C922.686 226 920 228.686 920 232V500C920 503.314 922.686 506 926 506H958C961.314 506 964 503.314 964 500V232C964 228.686 961.314 226 958 226Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="916.312" y="215.964">70%</tspan></text>
<path opacity="0.9" d="M1023 306H991C987.686 306 985 308.686 985 312V500C985 503.314 987.686 506 991 506H1023C1026.31 506 1029 503.314 1029 500V312C1029 308.686 1026.31 306 1023 306Z" fill="#57534E"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="981.312" y="295.964">50%</tspan></text>
<path opacity="0.9" d="M1088 366H1056C1052.69 366 1050 368.686 1050 372V500C1050 503.314 1052.69 506 1056 506H1088C1091.31 506 1094 503.314 1094 500V372C1094 368.686 1091.31 366 1088 366Z" fill="#A8A29E"/>
<text fill="#A8A29E" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="1046.31" y="355.964">35%</tspan></text>
<path opacity="0.9" d="M1153 426H1121C1117.69 426 1115 428.686 1115 432V500C1115 503.314 1117.69 506 1121 506H1153C1156.31 506 1159 503.314 1159 500V432C1159 428.686 1156.31 426 1153 426Z" fill="#94A3B8"/>
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="1111.31" y="415.964">20%</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="20" letter-spacing="0em"><tspan x="864.168" y="534.22">{ent(bar_labels[0])}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="20" letter-spacing="0em"><tspan x="929.17" y="534.22">{ent(bar_labels[1])}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="20" letter-spacing="0em"><tspan x="994.365" y="534.22">{ent(bar_labels[2])}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="20" letter-spacing="0em"><tspan x="1058.38" y="534.22">{ent(bar_labels[3])}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="20" letter-spacing="0em"><tspan x="1124.36" y="534.22">{ent(bar_labels[4])}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="{font}" font-weight="bold" letter-spacing="0em"><tspan x="60" y="{c['l1_y']}">{ent(l1)}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="{font}" font-weight="bold" letter-spacing="0em"><tspan x="60" y="{c['l2_y']}">{ent(l2)}</tspan></text>
<path d="M60 {c['sep_y']}H820" stroke="#DEDAD3" stroke-width="2"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="38" letter-spacing="0em"><tspan x="60" y="{c['sub_y']}">{ent(subtitle)}</tspan></text>
{pill_svg(1, pill1, rx_y=c['pill_ry'], tx_y=c['pill_ty'])}
{pill_svg(2, pill2, rx_y=c['pill_ry'], tx_y=c['pill_ty'])}
{pill_svg(3, pill3, rx_y=c['pill_ry'], tx_y=c['pill_ty'])}
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve"  font-size="28" letter-spacing="0em"><tspan x="60" y="{c['aud_y']}">{ent(audience)}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" letter-spacing="0em"><tspan x="{WM_X}" y="{c['wm_y']}">{WM_TEXT}</tspan></text>
</g>
<defs>
<clipPath id="{clip_id}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>'''


def gen_checklist_svg(clip_id: str, fields: dict, article: dict) -> str:
    """生成 Checklist 模板 SVG"""
    l1 = fields.get('l1', '')
    l2 = fields.get('l2', '')
    subtitle = fields.get('subtitle', '')
    pill1, pill2, pill3 = derive_pills_from_tags(article)
    audience = derive_audience_from_slug(article)
    checklist_title = fields.get('checklist_title', '評鑑自評清單')
    items = fields.get('items', [])

    # 確保 6 個項目
    default_items = ['個案評估與照顧計畫', '服務品質自我檢核', '人力配置合規確認',
                     '環境安全設備維護', '緊急事件處理辦法', '文件保存完整性']
    while len(items) < 6:
        items.append(default_items[len(items) % len(default_items)])
    items = [i[:12] for i in items[:6]]

    n = max(cjk_width(l1), cjk_width(l2))
    font = get_l1_font(n)
    c = get_coords_for_font(font)

    # checklist_title x
    ct_w = cjk_width(checklist_title) * 26
    ct_x = 1010 - ct_w / 2

    def item_row(i: int, text: str, checked: bool) -> str:
        ys = [119, 181, 243, 305, 367, 429]
        y = ys[i]
        opacity = '0.7' if checked else '0.5'
        check_mark = (f'<path d="M860 {y+22}L869.286 {y+32}L886 {y+12}" stroke="#D97706" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
                      if checked else '')
        item_color = '#1E293B' if checked else '#57534E'
        return (
            f'<path opacity="{opacity}" d="M1169 {y}H851C846.582 {y} 843 {y+3.582:.3f} 843 {y+8:.0f}V{y+46:.0f}C843 {y+50.418:.3f} 846.582 {y+54:.0f} 851 {y+54:.0f}H1169C1173.42 {y+54:.0f} 1177 {y+50.418:.3f} 1177 {y+46:.0f}V{y+8:.0f}C1177 {y+3.582:.3f} 1173.42 {y} 1169 {y}Z" fill="white"/>\n'
            f'<path d="M878.5 {y+12:.0f}H857.5C855.015 {y+12:.0f} 853 {y+14.015:.3f} 853 {y+16.5:.1f}V{y+37.5:.1f}C853 {y+39.985:.3f} 855.015 {y+42:.0f} 857.5 {y+42:.0f}H878.5C880.985 {y+42:.0f} 883 {y+39.985:.3f} 883 {y+37.5:.1f}V{y+16.5:.1f}C883 {y+14.015:.3f} 880.985 {y+12:.0f} 878.5 {y+12:.0f}Z" stroke="#A8A29E" stroke-width="1.5"/>\n'
            f'{check_mark}\n'
            f'<text fill="{item_color}" style="white-space: pre" xml:space="preserve"  font-size="20" font-weight="bold" letter-spacing="0em"><tspan x="892" y="{y+35.22:.2f}">{ent(text)}</tspan></text>'
        )

    items_svg = '\n'.join(item_row(i, items[i], i < 2) for i in range(6))

    progress_x = 921
    return f'''<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="'Noto Sans TC', sans-serif">
  <rect width="1200" height="630" fill="#f0efe8"/>
<g clip-path="url(#{clip_id})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1200 0H820V630H1200V0Z" fill="#E8E6DE"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="26" font-weight="bold" letter-spacing="0em"><tspan x="{ct_x:.3f}" y="92.336">{ent(checklist_title)}</tspan></text>
{items_svg}
<path opacity="0.12" d="M1166.23 501H853.774C847.824 501 843 505.477 843 511V539C843 544.523 847.824 549 853.774 549H1166.23C1172.18 549 1177 544.523 1177 539V511C1177 505.477 1172.18 501 1166.23 501Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="{progress_x:.3f}" y="535.964">{ent('已完成 2 / 6 項')}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="{font}" font-weight="bold" letter-spacing="0em"><tspan x="60" y="{c['l1_y']}">{ent(l1)}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="{font}" font-weight="bold" letter-spacing="0em"><tspan x="60" y="{c['l2_y']}">{ent(l2)}</tspan></text>
<path d="M60 {c['sep_y']}L820 {c['sep_y']}" stroke="#DEDAD3" stroke-width="2"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="38" letter-spacing="0em"><tspan x="60" y="{c['sub_y']}">{ent(subtitle)}</tspan></text>
{pill_svg(1, pill1, rx_y=c['pill_ry'], tx_y=c['pill_ty'])}
{pill_svg(2, pill2, rx_y=c['pill_ry'], tx_y=c['pill_ty'])}
{pill_svg(3, pill3, rx_y=c['pill_ry'], tx_y=c['pill_ty'])}
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve"  font-size="28" letter-spacing="0em"><tspan x="60" y="{c['aud_y']}">{ent(audience)}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" letter-spacing="0em"><tspan x="{WM_X}" y="{c['wm_y']}">{WM_TEXT}</tspan></text>
</g>
<defs>
<clipPath id="{clip_id}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>'''


def gen_timeline_svg(clip_id: str, fields: dict, article: dict, title: str) -> str:
    """生成 Timeline 模板 SVG"""
    raw_l1 = fields.get('l1', '')
    l2 = fields.get('l2', '')
    subtitle = fields.get('subtitle', '')
    pill1, pill2, pill3 = derive_pills_from_tags(article)
    audience = derive_audience_from_slug(article)
    stage_items = fields.get('stage_items', [])
    hero_num = fields.get('hero_num', '')
    hero_desc = fields.get('hero_desc', '')

    # 解析時間數字
    digit, unit, is_short = parse_timeline_number(raw_l1, l2, hero_num, hero_desc, title)
    pa = PATTERN_A_SHORT if is_short else PATTERN_A_MEDIUM

    cjk_x_l1 = calc_cjk_x(60, pa['digit_font'], digit)

    # 解析 3 個階段
    stages = parse_timeline_stages(stage_items, title)

    # 右側 hero（Pattern B: 160/60）
    hero_digit_x = 899
    hero_digit_y = 232.76
    hero_cjk_x = calc_cjk_x(hero_digit_x, 160, digit)
    hero_cjk_y = hero_digit_y - round((160 - 60) * 0.021 * 10) / 10

    # bottom pill text（從 l2 或預設）
    bottom_pill_text = l2 + '準備計畫' if l2 and '計畫' not in l2 else (l2 or '三階段備考計畫')
    # 限制長度
    if len(bottom_pill_text) > 8:
        bottom_pill_text = bottom_pill_text[:8]

    # bottom pill x 置中
    bp_w = cjk_width(bottom_pill_text) * 26
    bp_x = 1010 - bp_w / 2

    c = pa  # 用 Pattern A 座標

    # L2 字級自適應（與其他模板一致，避免長標題爆框）
    l2_font = get_l1_font(max(cjk_width(l2), 1))

    # 階段名稱 label x 值
    stage_label_xs = [844, 971, 1101]
    stage_name_xs = [834, 964, 1094]
    stage_desc_xs = [840, 963, 1093]

    return f'''<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="'Noto Sans TC', sans-serif">
  <rect width="1200" height="630" fill="#f0efe8"/>
<g clip-path="url(#{clip_id})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1201 0H821V630H1201V0Z" fill="#E8E6DE"/>
<!-- 右側裝飾英雄數字（Pattern B: digit=160, CJK=60） -->
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="160" font-weight="bold" letter-spacing="0em"><tspan x="{hero_digit_x}" y="{hero_digit_y}">{ent(digit)}</tspan></text>
<text fill="#78716C" style="white-space: pre" xml:space="preserve"  font-size="60" font-weight="bold" letter-spacing="0em"><tspan x="{hero_cjk_x}" y="{hero_cjk_y:.2f}">{ent(unit)}</tspan></text>
<!-- 右側階段標籤 -->
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="18" font-weight="bold" letter-spacing="0em"><tspan x="{stage_label_xs[0]}" y="279.848">{ent('第 1 階段')}</tspan></text>
<text fill="#78716C" style="white-space: pre" xml:space="preserve"  font-size="18" font-weight="bold" letter-spacing="0em"><tspan x="{stage_label_xs[1]}" y="279.848">{ent('第 2 階段')}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="18" font-weight="bold" letter-spacing="0em"><tspan x="{stage_label_xs[2]}" y="279.848">{ent('第 3 階段')}</tspan></text>
<!-- 連接線 -->
<path d="M893 312H988" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
<path d="M1028 312H1123" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
<!-- 節點圓 -->
<path d="M880 340C893.807 340 905 328.807 905 315C905 301.193 893.807 290 880 290C866.193 290 855 301.193 855 315C855 328.807 866.193 340 880 340Z" fill="#D97706"/>
<text fill="white" style="white-space: pre" xml:space="preserve"  font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="868" y="332.44">1</tspan></text>
<path d="M1008 337C1021.81 337 1033 325.807 1033 312C1033 298.193 1021.81 287 1008 287C994.193 287 983 298.193 983 312C983 325.807 994.193 337 1008 337Z" fill="#78716C"/>
<text fill="white" style="white-space: pre" xml:space="preserve"  font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="996" y="329.44">2</tspan></text>
<path d="M1138 337C1151.81 337 1163 325.807 1163 312C1163 298.193 1151.81 287 1138 287C1124.19 287 1113 298.193 1113 312C1113 325.807 1124.19 337 1138 337Z" fill="#57534E"/>
<text fill="white" style="white-space: pre" xml:space="preserve"  font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="1126" y="329.44">3</tspan></text>
<!-- 階段名稱與說明 -->
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="{stage_name_xs[0]}" y="367.592">{ent(stages[0][0])}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="17" letter-spacing="0em"><tspan x="{stage_desc_xs[0]}" y="391.912">{ent(stages[0][1])}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="{stage_name_xs[1]}" y="367.592">{ent(stages[1][0])}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="17" letter-spacing="0em"><tspan x="{stage_desc_xs[1]}" y="391.912">{ent(stages[1][1])}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="{stage_name_xs[2]}" y="367.592">{ent(stages[2][0])}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="17" letter-spacing="0em"><tspan x="{stage_desc_xs[2]}" y="391.912">{ent(stages[2][1])}</tspan></text>
<!-- 右側底部寬 pill -->
<path opacity="0.12" d="M1155 500H865C859.477 500 855 504.477 855 510V538C855 543.523 859.477 548 865 548H1155C1160.52 548 1165 543.523 1165 538V510C1165 504.477 1160.52 500 1155 500Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="26" font-weight="bold" letter-spacing="0em"><tspan x="{bp_x:.3f}" y="535.336">{ent(bottom_pill_text)}</tspan></text>
<!-- 左側 L1（Pattern A） -->
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="{pa['digit_font']}" font-weight="bold" letter-spacing="0em"><tspan x="60" y="{pa['digit_y']}">{ent(digit)} </tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="{pa['cjk_font']}" font-weight="bold" letter-spacing="0em"><tspan x="{cjk_x_l1}" y="{pa['cjk_y']}">{ent(unit)}</tspan></text>
<!-- 左側 L2 -->
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="{l2_font}" font-weight="bold" letter-spacing="0em"><tspan x="60" y="{c['l2_y']}">{ent(l2)}</tspan></text>
<path d="M60 {c['sep_y']}L821 {c['sep_y']}" stroke="#DEDAD3" stroke-width="2"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="38" letter-spacing="0em"><tspan x="60" y="{c['sub_y']}">{ent(subtitle)}</tspan></text>
{pill_svg(1, pill1, rx_y=c['pill_ry'], tx_y=c['pill_ty'])}
{pill_svg(2, pill2, rx_y=c['pill_ry'], tx_y=c['pill_ty'])}
{pill_svg(3, pill3, rx_y=c['pill_ry'], tx_y=c['pill_ty'])}
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve"  font-size="28" letter-spacing="0em"><tspan x="60" y="{c['aud_y']}">{ent(audience)}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" letter-spacing="0em"><tspan x="{WM_X}" y="{c['wm_y']}">{WM_TEXT}</tspan></text>
</g>
<defs>
<clipPath id="{clip_id}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>'''


def gen_quote_svg(clip_id: str, fields: dict, article: dict) -> str:
    """生成 Quote 模板 SVG（使用 daycare-inspector 為基準）"""
    q1 = fields.get('quote_l1', '')
    q2 = fields.get('quote_l2', '')
    q3 = fields.get('quote_l3', '')
    person_name = fields.get('person_name', '資深評鑑委員')
    person_role = fields.get('person_role', '評鑑 · 現場觀察實錄')
    person_org = fields.get('person_org', '機構評鑑現場')
    pill_r1 = fields.get('pill_r1', '查核重點')
    pill_r2 = fields.get('pill_r2', '評鑑實務')

    # 頂部 pill text（從 tags 或預設）
    tags = article.get('tags', [])
    top_pill = tags[0] if tags else '委員視角'

    return f'''<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="'Noto Sans TC', sans-serif">
  <rect width="1200" height="630" fill="#f0efe8"/>
<g clip-path="url(#{clip_id})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1200 0H820V630H1200V0Z" fill="#E8E6DE"/>
<!-- 頂部視角標籤 pill -->
<path opacity="0.12" d="M234 90H70C64.4772 90 60 94.4772 60 100V155C60 160.523 64.4772 165 70 165H234C239.523 165 244 160.523 244 155V100C244 94.4772 239.523 90 234 90Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="78" y="139.44">{ent(top_pill)}</tspan></text>
<!-- 左側垂直色條 -->
<path d="M68 175H60V539H68V175Z" fill="#D97706"/>
<!-- 引言三行 -->
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="64" font-weight="bold" letter-spacing="0em"><tspan x="92" y="245.404">{ent(q1)}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="64" font-weight="bold" letter-spacing="0em"><tspan x="92" y="316.404">{ent(q2)}</tspan></text>
<text fill="#78716C" style="white-space: pre" xml:space="preserve"  font-size="64" font-weight="bold" letter-spacing="0em"><tspan x="92" y="387.404">{ent(q3)}</tspan></text>
<!-- 分隔線 -->
<path d="M82 412H782" stroke="#DEDAD3" stroke-width="2"/>
<!-- 受訪者資訊 -->
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="90" y="463.88">{ent(person_name)}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="40" letter-spacing="0em"><tspan x="90" y="518.776">{ent(person_role)}</tspan></text>
<!-- 右側頭像圓框 -->
<path d="M1010 320C1079.04 320 1135 264.035 1135 195C1135 125.965 1079.04 70 1010 70C940.965 70 885 125.965 885 195C885 264.035 940.965 320 1010 320Z" fill="white" stroke="#D97706" stroke-width="3"/>
<path d="M1010 195C1032.51 195 1050.76 176.751 1050.76 154.239C1050.76 131.728 1032.51 113.479 1010 113.479C987.488 113.479 969.239 131.728 969.239 154.239C969.239 176.751 987.488 195 1010 195Z" fill="#C4BFB8"/>
<path d="M1010 299.619C1055.03 299.619 1091.52 282.587 1091.52 261.576C1091.52 240.565 1055.03 223.532 1010 223.532C964.977 223.532 928.479 240.565 928.479 261.576C928.479 282.587 964.977 299.619 1010 299.619Z" fill="#C4BFB8"/>
<!-- 機構名/組織 -->
<text fill="#A8A29E" style="white-space: pre" xml:space="preserve"  font-size="24" letter-spacing="0em"><tspan x="938" y="363.964">{ent(person_org)}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="930" y="408.44">{ent('評鑑委員')}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="24" letter-spacing="0em"><tspan x="962" y="438.964">{ent('現場查核')}</tspan></text>
<!-- 右下 2 pills -->
<path opacity="0.12" d="M1006 463H866C860.477 463 856 467.477 856 473V499C856 504.523 860.477 509 866 509H1006C1011.52 509 1016 504.523 1016 499V473C1016 467.477 1011.52 463 1006 463Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="888" y="491.964">{ent(pill_r1)}</tspan></text>
<path opacity="0.12" d="M1154 463H1024C1018.48 463 1014 467.477 1014 473V499C1014 504.523 1018.48 509 1024 509H1154C1159.52 509 1164 504.523 1164 499V473C1164 467.477 1159.52 463 1154 463Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="1036" y="491.964">{ent(pill_r2)}</tspan></text>
<!-- 浮水印 -->
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" letter-spacing="0em"><tspan x="{WM_X}" y="597.928">{WM_TEXT}</tspan></text>
</g>
<defs>
<clipPath id="{clip_id}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>'''


def gen_vs_svg(clip_id: str, fields: dict, article: dict) -> str:
    """生成 VS 對比模板 SVG"""
    top_l1 = fields.get('top_l1', article.get('title', '')[:6])
    top_l2 = fields.get('top_l2', '對比分析')
    pill1 = fields.get('pill1', '') or (article['tags'][0] if article.get('tags') else '')
    pill2 = fields.get('pill2', '') or (article['tags'][1] if len(article.get('tags', [])) > 1 else '')
    pill3 = fields.get('pill3', '') or (article['tags'][2] if len(article.get('tags', [])) > 2 else '')
    a_name = fields.get('a_name', '選項 A')
    b_name = fields.get('b_name', '選項 B')
    points_a = fields.get('points_a', ['重點 1', '重點 2', '重點 3'])
    points_b = fields.get('points_b', ['重點 1', '重點 2', '重點 3'])
    sub_a = fields.get('sub_a', '特色說明')
    sub_b = fields.get('sub_b', '特色說明')

    def card_content(name: str, pts: list, sub: str, color: str, x_offset: int) -> str:
        x = x_offset
        pts = [p[:10] for p in pts[:3]]
        return (
            f'<text fill="{color}" style="white-space: pre" xml:space="preserve"  font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="{x+15.6543:.4f}" y="341.592">{ent(name)}</tspan></text>\n'
            f'<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="{x+15}" y="398.592">{ent(pts[0] if len(pts) > 0 else "")}</tspan></text>\n'
            f'<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="{x+15}" y="434.592">{ent(pts[1] if len(pts) > 1 else "")}</tspan></text>\n'
            f'<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="{x+15}" y="470.592">{ent(pts[2] if len(pts) > 2 else "")}</tspan></text>\n'
            f'<text fill="#78716C" style="white-space: pre" xml:space="preserve"  font-size="17" letter-spacing="0em"><tspan x="{x+15}" y="512.912">{ent(sub)}</tspan></text>'
        )

    # L1/L2 字級
    n = max(cjk_width(top_l1), cjk_width(top_l2))
    font = min(80, max(60, int(80 - max(0, n - 5) * 4)))

    return f'''<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="'Noto Sans TC', sans-serif">
  <rect width="1200" height="630" fill="#f0efe8"/>
<g clip-path="url(#{clip_id})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve"  font-size="{font}" font-weight="bold" letter-spacing="0em"><tspan x="328.086" y="102.88">{ent(top_l1)}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="{font}" font-weight="bold" letter-spacing="0em"><tspan x="328.086" y="{102.88 + font * 1.15:.2f}">{ent(top_l2)}</tspan></text>
<path d="M40 218H1160" stroke="#DEDAD3" stroke-width="2"/>
<path opacity="0.12" d="M504 236H384C378.477 236 374 240.477 374 246V268C374 273.523 378.477 278 384 278H504C509.523 278 514 273.523 514 268V246C514 240.477 509.523 236 504 236Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="401.145" y="266.964">{ent(pill1[:4])}</tspan></text>
<path opacity="0.12" d="M660 236H540C534.477 236 530 240.477 530 246V268C530 273.523 534.477 278 540 278H660C665.523 278 670 273.523 670 268V246C670 240.477 665.523 236 660 236Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="557.145" y="266.964">{ent(pill2[:4])}</tspan></text>
<path opacity="0.12" d="M816 236H696C690.477 236 686 240.477 686 246V268C686 273.523 690.477 278 696 278H816C821.523 278 826 273.523 826 268V246C826 240.477 821.523 236 816 236Z" fill="#57534E"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve"  font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="713.145" y="266.964">{ent(pill3[:4])}</tspan></text>
<!-- 左側卡片（A） -->
<path d="M519.769 297H55.2308C46.819 297 40 303.225 40 310.903V535.097C40 542.775 46.819 549 55.2308 549H519.769C528.181 549 535 542.775 535 535.097V310.903C535 303.225 528.181 297 519.769 297Z" fill="white" stroke="#D97706" stroke-width="3"/>
<path d="M65 360H535" stroke="#E8E6DE"/>
<path opacity="0.15" d="M205 314H75C69.4772 314 65 318.477 65 324V340C65 345.523 69.4772 350 75 350H205C210.523 350 215 345.523 215 340V324C215 318.477 210.523 314 205 314Z" fill="#D97706"/>
{card_content(a_name, points_a, sub_a, '#D97706', 60)}
<!-- 右側卡片（B） -->
<path d="M1144.77 297H680.231C671.819 297 665 303.225 665 310.903V535.097C665 542.775 671.819 549 680.231 549H1144.77C1153.18 549 1160 542.775 1160 535.097V310.903C1160 303.225 1153.18 297 1144.77 297Z" fill="white" stroke="#78716C" stroke-width="3"/>
<path d="M665 360H1135" stroke="#E8E6DE"/>
<path opacity="0.15" d="M826 314H696C690.477 314 686 318.477 686 324V340C686 345.523 690.477 350 696 350H826C831.523 350 836 345.523 836 340V324C836 318.477 831.523 314 826 314Z" fill="#78716C"/>
{card_content(b_name, points_b, sub_b, '#78716C', 681)}
<!-- VS 圓徽章 -->
<path d="M600 456C622.091 456 640 438.091 640 416C640 393.909 622.091 376 600 376C577.909 376 560 393.909 560 416C560 438.091 577.909 456 600 456Z" fill="#F0EFE8" stroke="#D97706" stroke-width="3"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="32" font-weight="bold" letter-spacing="0em"><tspan x="580.312" y="429.952">VS</tspan></text>
<!-- 浮水印 -->
<text fill="#D97706" style="white-space: pre" xml:space="preserve"  font-size="24" letter-spacing="0em"><tspan x="{WM_X}" y="597.928">{WM_TEXT}</tspan></text>
</g>
<defs>
<clipPath id="{clip_id}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>'''


# ============================================================
# 主流程
# ============================================================

def parse_mapping(mapping_path: Path) -> dict:
    """解析 blog-cover-template-mapping.md，回傳 {cover_filename: template_type}"""
    content = mapping_path.read_text(encoding='utf-8')
    mapping = {}

    type_map = {
        'VS（對比）': 'vs',
        'Quote（訪談）': 'quote',
        'Timeline（時程）': 'timeline',
        'Checklist（清單）': 'checklist',
        'Chart（數據）': 'chart',
        '標準': 'standard',
    }

    current_type = None
    for line in content.splitlines():
        # 偵測章節標題
        for key, ttype in type_map.items():
            if key in line and line.startswith('##'):
                current_type = ttype
                break

        # 解析 table row
        if current_type and line.startswith('|') and '`' in line:
            # 格式: | # | `slug` | 標題 | 機構 | `cover.svg` | 分類 |
            parts = line.split('|')
            if len(parts) >= 6:
                cover_cell = parts[5].strip()
                m = re.search(r'`([^`]+)`', cover_cell)
                if m:
                    cover = m.group(1)
                    # 防止路徑穿越：只允許單純的 SVG 檔名（無目錄分隔符）
                    if re.match(r'^[\w-]+\.svg$', cover):
                        mapping[cover] = current_type

    return mapping


def _build_article_index() -> dict:
    """預先建立封面 → 文章 JSON 的 dict（避免主迴圈中 O(n²) 逐一掃描）"""
    index: dict = {}
    for f in sorted(POSTS_DIR.glob('article-*.json')):
        try:
            d = json.loads(f.read_text(encoding='utf-8'))
        except (json.JSONDecodeError, OSError) as e:
            print(f'  [WARN] 跳過損毀 JSON: {f.name}: {e}')
            continue
        cover_url = d.get('coverImageUrl', '')
        if cover_url:
            key = cover_url.rsplit('/', 1)[-1]
            index[key] = d
    return index

_ARTICLE_INDEX: dict | None = None

def load_article_by_cover(cover: str) -> dict:
    """依封面 SVG 檔名找對應的 JSON（使用快取索引）"""
    global _ARTICLE_INDEX
    if _ARTICLE_INDEX is None:
        _ARTICLE_INDEX = _build_article_index()
    return _ARTICLE_INDEX.get(cover, {})


def is_old_format(svg_content: str) -> bool:
    """判斷是否為舊格式 SVG（含舊浮水印色或無 clipPath 結構）
    注意：只比對 fill/stroke 屬性中的顏色，避免 HTML 注解誤判"""
    has_old_color = bool(re.search(r'(?:fill|stroke)="#c4bfb8"', svg_content))
    has_old_watermark_anchor = 'text-anchor="end"' in svg_content
    return has_old_color or has_old_watermark_anchor


def process_article(cover: str, template_type: str, dry_run: bool = False) -> bool:
    """處理單篇文章的封面重生成"""
    svg_path = PUBLIC / cover
    if not svg_path.exists():
        print(f'  [SKIP] 檔案不存在: {cover}')
        return False

    svg_content = svg_path.read_text(encoding='utf-8')

    if not is_old_format(svg_content):
        print(f'  [SKIP] 已是新格式: {cover}')
        return False

    article = load_article_by_cover(cover)
    if not article:
        print(f'  [WARN] 找不到文章 JSON: {cover}')
        return False

    clip_id = slug_to_clip_id(cover)
    title = article.get('title', '')

    try:
        if template_type == 'standard':
            fields = extract_standard_fields(svg_content)
            new_svg = gen_standard_svg(clip_id, fields, article)
        elif template_type == 'chart':
            fields = extract_chart_fields(svg_content)
            new_svg = gen_chart_svg(clip_id, fields, article)
        elif template_type == 'checklist':
            fields = extract_checklist_fields(svg_content)
            new_svg = gen_checklist_svg(clip_id, fields, article)
        elif template_type == 'timeline':
            fields = extract_timeline_fields(svg_content)
            new_svg = gen_timeline_svg(clip_id, fields, article, title)
        elif template_type == 'quote':
            fields = extract_quote_fields(svg_content, article)
            new_svg = gen_quote_svg(clip_id, fields, article)
        elif template_type == 'vs':
            fields = extract_vs_fields(svg_content, article)
            new_svg = gen_vs_svg(clip_id, fields, article)
        else:
            print(f'  [ERROR] 未知模板類型: {template_type}')
            return False
    except Exception as e:
        print(f'  [ERROR] 生成失敗 {cover}: {e}')
        import traceback
        traceback.print_exc()
        return None  # None 表示錯誤（False 表示正常跳過）

    if dry_run:
        print(f'  [DRY] 模擬生成: {cover} ({template_type})')
        return True

    svg_path.write_text(new_svg, encoding='utf-8')
    print(f'  [OK] {cover} ({template_type})')
    return True


def main():
    # 預設 dry-run，需明確傳入 --execute 才真正寫入（避免重演 fa8533f 全量覆寫事故）
    dry_run = '--execute' not in sys.argv
    limit = None
    for arg in sys.argv[1:]:
        if arg.startswith('--limit='):
            try:
                limit = int(arg.split('=')[1])
            except ValueError:
                print(f'[ERROR] --limit 必須為整數，例如 --limit=10')
                sys.exit(1)
    filter_type = None
    for arg in sys.argv[1:]:
        if arg.startswith('--type='):
            filter_type = arg.split('=')[1]

    mapping_path = BASE / 'scripts/blog-cover-template-mapping.md'
    mapping = parse_mapping(mapping_path)

    print(f'解析模板分類完成，共 {len(mapping)} 篇')
    print(f'乾跑模式: {dry_run}')
    if filter_type:
        print(f'過濾類型: {filter_type}')

    stats = {'ok': 0, 'skip': 0, 'error': 0}
    count = 0
    generated_files = []

    for cover, ttype in sorted(mapping.items()):
        if cover in ALREADY_UPDATED:
            stats['skip'] += 1
            continue

        if filter_type and ttype != filter_type:
            continue

        if limit and count >= limit:
            break

        print(f'處理: {cover} [{ttype}]')
        ok = process_article(cover, ttype, dry_run=dry_run)
        if ok is True:
            stats['ok'] += 1
            generated_files.append(f'public/blog/{cover}')
        elif ok is None:
            stats['error'] += 1
        else:
            stats['skip'] += 1
        count += 1

    print(f'\n完成！成功: {stats["ok"]}, 跳過: {stats["skip"]}, 錯誤: {stats["error"]}')

    if not dry_run and generated_files:
        print('\n執行 svg:validate --fix...')
        # 每批最多 50 個檔案，避免命令列過長
        batch_size = 50
        validate_errors = 0
        for i in range(0, len(generated_files), batch_size):
            batch = generated_files[i:i+batch_size]
            result = subprocess.run(
                ['npm', 'run', 'svg:validate', '--', '--fix'] + batch,
                cwd=str(BASE), capture_output=True, text=True
            )
            print(result.stdout[-2000:] if len(result.stdout) > 2000 else result.stdout)
            if result.returncode != 0:
                print(result.stderr[-500:])
                validate_errors += 1
        if validate_errors:
            print(f'\n[WARN] svg:validate 共 {validate_errors} 批次回傳錯誤，請手動檢查生成結果')


if __name__ == '__main__':
    main()

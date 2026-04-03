#!/usr/bin/env python3
"""Generate SVG illustrations for blog articles 13-17"""
import os

BASE = "public/blog"
os.makedirs(BASE, exist_ok=True)

COLORS = [
    ("#d97706", "#fef3c7"),
    ("#78716c", "#f5f5f4"),
    ("#57534e", "#f5f0eb"),
    ("#a8a29e", "#f5f5f4"),
    ("#94a3b8", "#f1f5f9"),
]
BG = "#f0efe8"
WM = '<text x="760" y="480" font-size="16" fill="#d97706" text-anchor="end" font-weight="400" font-family="\'Noto Sans TC\', sans-serif">報告汪 reportwang.com</text>'
FONT = "font-family=\"'Noto Sans TC', sans-serif\""

def write_svg(filename, svg):
    path = os.path.join(BASE, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f"✓ {filename}")

# ── LIST SVG N=3 ──────────────────────────────────────────────────
def list3(filename, title, rows):
    """rows = [(label, desc, s1, s2), ...]  3 rows"""
    ry = [166, 269, 372]
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" {FONT}>',
             f'<rect width="800" height="500" fill="{BG}"/>',
             '<rect x="0" y="38" width="800" height="90" fill="white"/>',
             '<rect x="0" y="38" width="6" height="90" fill="#d97706"/>',
             f'<text x="28" y="97" font-size="32" fill="#1e293b" font-weight="700">{title}</text>']
    for i, (y, row) in enumerate(zip(ry, rows)):
        label, desc, s1, s2 = row
        c, bg = COLORS[i]
        cy = y + 45
        parts += [
            f'<rect x="28" y="{y}" width="744" height="90" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>',
            f'<rect x="28" y="{y}" width="6" height="90" rx="2" fill="{c}"/>',
            f'<circle cx="66" cy="{cy}" r="20" fill="{c}" opacity="0.15"/>',
            f'<text x="66" y="{cy+7}" font-size="18" fill="{c}" text-anchor="middle" font-weight="900">{i+1}</text>',
            f'<text x="100" y="{y+44}" font-size="28" fill="#1e293b" font-weight="700">{label}</text>',
            f'<text x="100" y="{y+68}" font-size="18" fill="#57534e">{desc}</text>',
            f'<rect x="620" y="{y+19}" width="136" height="52" rx="8" fill="{c}" opacity="0.12"/>',
            f'<text x="688" y="{y+39}" font-size="16" fill="{c}" text-anchor="middle">{s1}</text>',
            f'<text x="688" y="{y+59}" font-size="16" fill="{c}" text-anchor="middle">{s2}</text>',
        ]
    parts += [WM, '</svg>']
    write_svg(filename, '\n'.join(parts))

# ── LIST SVG N=4 ──────────────────────────────────────────────────
def list4(filename, title, rows):
    ry = [160, 235, 310, 385]
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" {FONT}>',
             f'<rect width="800" height="500" fill="{BG}"/>',
             '<rect x="0" y="50" width="800" height="76" fill="white"/>',
             '<rect x="0" y="50" width="6" height="76" fill="#d97706"/>',
             f'<text x="28" y="104" font-size="36" fill="#1e293b" font-weight="700">{title}</text>']
    for i, (y, row) in enumerate(zip(ry, rows)):
        label, desc, s1, s2 = row
        c, bg = COLORS[i]
        cy = y + 31
        parts += [
            f'<rect x="28" y="{y}" width="744" height="62" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>',
            f'<rect x="28" y="{y}" width="6" height="62" rx="2" fill="{c}"/>',
            f'<circle cx="66" cy="{cy}" r="16" fill="{c}" opacity="0.15"/>',
            f'<text x="66" y="{cy+6}" font-size="14" fill="{c}" text-anchor="middle" font-weight="900">{i+1}</text>',
            f'<text x="100" y="{y+28}" font-size="22" fill="#1e293b" font-weight="700">{label}</text>',
            f'<text x="100" y="{y+48}" font-size="16" fill="#57534e">{desc}</text>',
            f'<rect x="620" y="{y+8}" width="136" height="46" rx="8" fill="{c}" opacity="0.12"/>',
            f'<text x="688" y="{y+25}" font-size="16" fill="{c}" text-anchor="middle">{s1}</text>',
            f'<text x="688" y="{y+45}" font-size="16" fill="{c}" text-anchor="middle">{s2}</text>',
        ]
    parts += [WM, '</svg>']
    write_svg(filename, '\n'.join(parts))

# ── LIST SVG N=5 ──────────────────────────────────────────────────
def list5(filename, title, rows):
    ry = [118, 191, 264, 337, 410]
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" {FONT}>',
             f'<rect width="800" height="500" fill="{BG}"/>',
             '<rect x="0" y="29" width="800" height="60" fill="white"/>',
             '<rect x="0" y="29" width="6" height="60" fill="#d97706"/>',
             f'<text x="28" y="70" font-size="28" fill="#1e293b" font-weight="700">{title}</text>']
    for i, (y, row) in enumerate(zip(ry, rows)):
        label, desc, s1, s2 = row
        c, bg = COLORS[i]
        cy = y + 30
        parts += [
            f'<rect x="28" y="{y}" width="744" height="60" rx="10" fill="white" stroke="#e8e6de" stroke-width="1"/>',
            f'<rect x="28" y="{y}" width="6" height="60" rx="2" fill="{c}"/>',
            f'<circle cx="66" cy="{cy}" r="16" fill="{c}" opacity="0.15"/>',
            f'<text x="66" y="{cy+6}" font-size="14" fill="{c}" text-anchor="middle" font-weight="900">{i+1}</text>',
            f'<text x="100" y="{y+27}" font-size="20" fill="#1e293b" font-weight="700">{label}</text>',
            f'<text x="100" y="{y+47}" font-size="16" fill="#57534e">{desc}</text>',
            f'<rect x="620" y="{y+8}" width="136" height="44" rx="8" fill="{c}" opacity="0.12"/>',
            f'<text x="688" y="{y+24}" font-size="15" fill="{c}" text-anchor="middle">{s1}</text>',
            f'<text x="688" y="{y+44}" font-size="15" fill="{c}" text-anchor="middle">{s2}</text>',
        ]
    parts += [WM, '</svg>']
    write_svg(filename, '\n'.join(parts))

# ── FLOW SVG N=3 ──────────────────────────────────────────────────
def flow3(filename, title, subtitle, steps):
    """steps = [(title, d1, d2, pill), ...]  3 steps"""
    cards = [(129, 214), (315, 400), (501, 586)]
    CW, CY_TOP, CH = 170, 108, 342
    R = 43; CY = 194; STEP_Y = 183; NUM_Y = 211
    H_Y = 297; J1_Y = 324; J2_Y = 346; PILL_Y = 381; PTY = 405; PW = 148
    AY = 279

    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" {FONT}>',
             f'<rect width="800" height="500" fill="{BG}"/>',
             f'<text x="400" y="48" text-anchor="middle" font-size="32" fill="#1e293b" font-weight="700">{title}</text>',
             f'<text x="400" y="78" text-anchor="middle" font-size="22" fill="#57534e">{subtitle}</text>',
             '<line x1="129" y1="94" x2="671" y2="94" stroke="#dedad3" stroke-width="1"/>']
    # arrows
    for i in range(2):
        ax1 = cards[i][0] + CW; ax2 = cards[i+1][0]
        parts += [f'<line x1="{ax1}" y1="{AY}" x2="{ax2-8}" y2="{AY}" stroke="#c4bfb8" stroke-width="2"/>',
                  f'<polygon points="{ax2-8},{AY-5} {ax2},{AY} {ax2-8},{AY+5}" fill="#c4bfb8"/>']
    # cards
    for i, ((cx_x, cx), (st, d1, d2, pill)) in enumerate(zip(cards, steps)):
        c, bg = COLORS[i]
        px = cx - PW // 2
        parts += [
            f'<rect x="{cx_x}" y="{CY_TOP}" width="{CW}" height="{CH}" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>',
            f'<rect x="{cx_x}" y="{CY_TOP}" width="{CW}" height="8" rx="4" fill="{c}"/>',
            f'<rect x="{cx_x}" y="{CY_TOP+4}" width="{CW}" height="4" fill="{c}"/>',
            f'<circle cx="{cx}" cy="{CY}" r="{R}" fill="{bg}"/>',
            f'<text x="{cx}" y="{STEP_Y}" text-anchor="middle" font-size="16" fill="{c}" font-weight="700">STEP</text>',
            f'<text x="{cx}" y="{NUM_Y}" text-anchor="middle" font-size="28" fill="{c}" font-weight="700">0{i+1}</text>',
            f'<text x="{cx}" y="{H_Y}" text-anchor="middle" font-size="20" fill="#1e293b" font-weight="700">{st}</text>',
        ]
        if d1: parts.append(f'<text x="{cx}" y="{J1_Y}" text-anchor="middle" font-size="15" fill="#57534e">{d1}</text>')
        if d2: parts.append(f'<text x="{cx}" y="{J2_Y}" text-anchor="middle" font-size="15" fill="#57534e">{d2}</text>')
        parts += [f'<rect x="{px}" y="{PILL_Y}" width="{PW}" height="36" rx="18" fill="{bg}"/>',
                  f'<text x="{cx}" y="{PTY}" text-anchor="middle" font-size="16" fill="{c}" font-weight="600">{pill}</text>']
    parts += [WM, '</svg>']
    write_svg(filename, '\n'.join(parts))

# ── FLOW SVG N=4 ──────────────────────────────────────────────────
def flow4(filename, title, subtitle, steps):
    cards = [(28, 115), (218, 305), (408, 495), (598, 685)]
    CW, CY_TOP, CH = 174, 108, 342
    R = 44; CY = 194; STEP_Y = 183; NUM_Y = 211
    H_Y = 297; J1_Y = 324; J2_Y = 346; PILL_Y = 381; PTY = 405; PW = 148
    AY = 279

    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" {FONT}>',
             f'<rect width="800" height="500" fill="{BG}"/>',
             f'<text x="400" y="48" text-anchor="middle" font-size="32" fill="#1e293b" font-weight="700">{title}</text>',
             f'<text x="400" y="78" text-anchor="middle" font-size="22" fill="#57534e">{subtitle}</text>',
             '<line x1="28" y1="94" x2="772" y2="94" stroke="#dedad3" stroke-width="1"/>']
    for i in range(3):
        ax1 = cards[i][0] + CW; ax2 = cards[i+1][0]
        parts += [f'<line x1="{ax1}" y1="{AY}" x2="{ax2-8}" y2="{AY}" stroke="#c4bfb8" stroke-width="2"/>',
                  f'<polygon points="{ax2-8},{AY-5} {ax2},{AY} {ax2-8},{AY+5}" fill="#c4bfb8"/>']
    for i, ((cx_x, cx), (st, d1, d2, pill)) in enumerate(zip(cards, steps)):
        c, bg = COLORS[i]
        px = cx - PW // 2
        parts += [
            f'<rect x="{cx_x}" y="{CY_TOP}" width="{CW}" height="{CH}" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>',
            f'<rect x="{cx_x}" y="{CY_TOP}" width="{CW}" height="8" rx="4" fill="{c}"/>',
            f'<rect x="{cx_x}" y="{CY_TOP+4}" width="{CW}" height="4" fill="{c}"/>',
            f'<circle cx="{cx}" cy="{CY}" r="{R}" fill="{bg}"/>',
            f'<text x="{cx}" y="{STEP_Y}" text-anchor="middle" font-size="17" fill="{c}" font-weight="700">STEP</text>',
            f'<text x="{cx}" y="{NUM_Y}" text-anchor="middle" font-size="28" fill="{c}" font-weight="700">0{i+1}</text>',
            f'<text x="{cx}" y="{H_Y}" text-anchor="middle" font-size="18" fill="#1e293b" font-weight="700">{st}</text>',
        ]
        if d1: parts.append(f'<text x="{cx}" y="{J1_Y}" text-anchor="middle" font-size="14" fill="#57534e">{d1}</text>')
        if d2: parts.append(f'<text x="{cx}" y="{J2_Y}" text-anchor="middle" font-size="14" fill="#57534e">{d2}</text>')
        parts += [f'<rect x="{px}" y="{PILL_Y}" width="{PW}" height="36" rx="18" fill="{bg}"/>',
                  f'<text x="{cx}" y="{PTY}" text-anchor="middle" font-size="15" fill="{c}" font-weight="600">{pill}</text>']
    parts += [WM, '</svg>']
    write_svg(filename, '\n'.join(parts))

# ── CATEGORIES 2×2 ───────────────────────────────────────────────
def categories(filename, title, subtitle, cards):
    """cards = [(color, bg, card_title, items[3], chip), ...]  4 cards"""
    pos = [(40, 104, 346, 168), (414, 104, 346, 168),
           (40, 288, 346, 162), (414, 288, 346, 162)]
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" {FONT}>',
             f'<rect width="800" height="500" fill="{BG}"/>',
             f'<text x="400" y="48" text-anchor="middle" font-size="32" fill="#1e293b" font-weight="700">{title}</text>',
             f'<text x="400" y="78" text-anchor="middle" font-size="22" fill="#57534e">{subtitle}</text>',
             '<line x1="40" y1="94" x2="760" y2="94" stroke="#dedad3" stroke-width="1"/>']
    for (x, y, w, h), (c, bg, ctitle, items, chip) in zip(pos, cards):
        parts += [
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="white"/>',
            f'<rect x="{x}" y="{y}" width="{w}" height="40" rx="12" fill="{c}"/>',
            f'<rect x="{x}" y="{y+20}" width="{w}" height="20" fill="{c}"/>',
            f'<text x="{x+w//2}" y="{y+26}" text-anchor="middle" font-size="16" fill="white" font-weight="700">{ctitle}</text>',
        ]
        for j, item in enumerate(items[:3]):
            parts.append(f'<text x="{x+16}" y="{y+62+j*24}" font-size="15" fill="#57534e">• {item}</text>')
        cw = min(len(chip)*18+24, w-32)
        cx_chip = x + w//2
        parts += [
            f'<rect x="{cx_chip-cw//2}" y="{y+h-26}" width="{cw}" height="20" rx="10" fill="{bg}"/>',
            f'<text x="{cx_chip}" y="{y+h-12}" text-anchor="middle" font-size="14" fill="{c}" font-weight="600">{chip}</text>',
        ]
    parts += [WM, '</svg>']
    write_svg(filename, '\n'.join(parts))

# ── CHECKLIST ─────────────────────────────────────────────────────
def checklist(filename, title, subtitle, left_items, right_items):
    """left/right_items = [(done:bool, text), ...]"""
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" {FONT}>',
             f'<rect width="800" height="500" fill="{BG}"/>',
             f'<text x="400" y="48" text-anchor="middle" font-size="32" fill="#1e293b" font-weight="700">{title}</text>',
             f'<text x="400" y="78" text-anchor="middle" font-size="22" fill="#57534e">{subtitle}</text>',
             '<line x1="40" y1="94" x2="760" y2="94" stroke="#dedad3" stroke-width="1"/>',
             '<line x1="400" y1="98" x2="400" y2="432" stroke="#dedad3" stroke-width="1"/>']

    def draw_items(items, x_start, cb_x):
        result = []
        y = 118
        for done, text in items:
            cb_y = y
            tx = cb_x + 28
            result.append(f'<rect x="{cb_x}" y="{cb_y}" width="20" height="20" rx="3" fill="{BG}" stroke="#a8a29e" stroke-width="1"/>')
            if done:
                result.append(f'<path d="M{cb_x+4},{cb_y+10} L{cb_x+8},{cb_y+15} L{cb_x+17},{cb_y+3}" fill="none" stroke="#78716c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>')
            result.append(f'<text x="{tx}" y="{cb_y+15}" font-size="17" fill="#1e293b">{text}</text>')
            y += 32
        return result

    parts += draw_items(left_items, 60, 64)
    parts += draw_items(right_items, 416, 420)
    parts += ['<line x1="40" y1="433" x2="760" y2="433" stroke="#dedad3" stroke-width="1"/>',
              '<rect x="75" y="443" width="18" height="18" rx="3" fill="#f0efe8" stroke="#a8a29e" stroke-width="1"/>',
              '<path d="M78,453 L82,458 L91,446" fill="none" stroke="#78716c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
              '<text x="102" y="458" font-size="17" fill="#57534e">已確認完成</text>',
              '<rect x="220" y="443" width="18" height="18" rx="3" fill="none" stroke="#a8a29e" stroke-width="1.5"/>',
              '<text x="247" y="458" font-size="17" fill="#57534e">待確認項目</text>',
              WM, '</svg>']
    write_svg(filename, '\n'.join(parts))

# ── COVER 1200×630 ────────────────────────────────────────────────
def cover(filename, t1, t2, subtitle, tags, bottom_text, big_num, num_label, right_cards):
    """right_cards = [(title, subtitle_text, color), ...] up to 4"""
    WM_COVER = '<text x="1140" y="590" font-size="24" fill="#c4bfb8" text-anchor="end" font-weight="400" font-family="\'Noto Sans TC\', sans-serif">報告汪 reportwang.com</text>'
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" {FONT}>',
             f'<rect width="1200" height="630" fill="{BG}"/>',
             '<rect x="820" y="0" width="380" height="630" fill="#e8e6de"/>',
             f'<text x="1010" y="239" font-size="180" font-weight="900" fill="#d97706" text-anchor="middle" opacity="0.85">{big_num}</text>',
             f'<text x="1010" y="281" font-size="28" fill="#78716c" text-anchor="middle" font-weight="600">{num_label}</text>']

    # Right cards (up to 4, 2x2 or 2 wide)
    card_configs = [(840, 299, 155, 86), (1005, 299, 155, 86),
                    (840, 395, 155, 86), (1005, 395, 155, 86)]
    for (cx_r, cy_r, cw, ch), (ct, cs, cc) in zip(card_configs, right_cards[:4]):
        cx_mid = cx_r + cw // 2
        ty = cy_r + 29; sy = cy_r + 60
        parts += [f'<rect x="{cx_r}" y="{cy_r}" width="{cw}" height="{ch}" rx="10" fill="white" stroke="#e8e6de" stroke-width="1"/>',
                  f'<text x="{cx_mid}" y="{ty}" font-size="26" fill="{cc}" text-anchor="middle" font-weight="700">{ct}</text>',
                  f'<text x="{cx_mid}" y="{sy}" font-size="20" fill="#a8a29e" text-anchor="middle">{cs}</text>']

    # Bottom pill on right
    parts += ['<rect x="840" y="491" width="320" height="52" rx="10" fill="#d97706" opacity="0.12"/>',
              f'<text x="1000" y="527" font-size="26" fill="#d97706" text-anchor="middle" font-weight="700">AI 輔助撰寫 × 報告汪</text>']

    # Left content
    t1_sz = max(80, 120 - max(0, len(t1)-4)*8)
    t2_sz = max(80, 120 - max(0, len(t2)-4)*8)
    t1_y = 200; t2_y = t1_y + t1_sz + 18
    div_y = t2_y + t2_sz + 14
    sub_y = div_y + 46
    tag_y = sub_y + 54

    parts += [f'<text x="60" y="{t1_y}" font-size="{t1_sz}" font-weight="900" fill="#1e293b">{t1}</text>',
              f'<text x="60" y="{t2_y}" font-size="{t2_sz}" font-weight="900" fill="#d97706">{t2}</text>',
              f'<line x1="60" y1="{div_y}" x2="780" y2="{div_y}" stroke="#dedad3" stroke-width="2"/>',
              f'<text x="60" y="{sub_y}" font-size="36" fill="#57534e" font-weight="400">{subtitle}</text>']

    tx = 60
    for tag_text, tag_color, tag_bg in tags:
        tw = len(tag_text) * 24 + 24
        parts += [f'<rect x="{tx}" y="{tag_y}" width="{tw}" height="50" rx="10" fill="{tag_bg}"/>',
                  f'<text x="{tx+tw//2}" y="{tag_y+32}" font-size="26" fill="{tag_color}" text-anchor="middle" font-weight="600">{tag_text}</text>']
        tx += tw + 14

    bt_y = min(tag_y + 80, 558)
    parts += [f'<text x="60" y="{bt_y}" font-size="26" fill="#94a3b8">{bottom_text}</text>',
              WM_COVER, '</svg>']
    write_svg(filename, '\n'.join(parts))

# ═══════════════════════════════════════════════════════
# ARTICLE 13: daycare-care-plan-*
# ═══════════════════════════════════════════════════════
cover("daycare-care-plan-cover.svg",
      "照顧計畫", "完整範例",
      "第5、6、7條實戰指引",
      [("AI輔助撰寫", "#d97706", "#fef3c7"), ("評鑑第5-7條", "#78716c", "#f5f5f4")],
      "適用：社工師、護理師、照顧管理員",
      "3", "條評鑑基準",
      [("初評工具", "第5條", "#d97706"), ("7個工作天", "第6條", "#78716c"),
       ("追蹤評值", "第7條", "#57534e"), ("AI輔助改寫", "節省50%時間", "#a8a29e")])

flow3("daycare-care-plan-flow.svg",
      "照顧計畫三階段全流程", "從入住初評到定期追蹤評值",
      [("入住初評", "ADL/IADL工具", "24小時完成", "第5條"),
       ("照顧計畫書", "6項照顧目標", "7個工作天內", "第6條"),
       ("追蹤評值", "每3個月評值", "狀況改變即評", "第7條")])

list4("daycare-care-plan-criteria5.svg",
      "第5條 入住評估核心要求",
      [("評估工具", "使用標準化量表（ADL/IADL/MMSE）", "評估方法", "第5條"),
       ("完成時限", "個案入住後24小時內完成初評", "時限規範", "24小時"),
       ("評估人員", "社工師或護理師擔任主責評估人員", "負責人員", "社工/護理"),
       ("資料留存", "評估紀錄存入個案檔，供評鑑查閱", "文件要求", "留存備查")])

list3("daycare-care-plan-criteria6.svg",
      "第6條 照顧計畫書規範",
      [("完成時限", "入住後7個工作天內完成照顧計畫書", "時限規範", "7個工作天"),
       ("計畫內容", "含6項照顧目標（日常、健康、心理等）", "計畫要素", "6項目標"),
       ("家屬參與", "計畫擬定需通知並確認家屬知情同意", "家屬告知", "簽名確認")])

list3("daycare-care-plan-criteria7.svg",
      "第7條 追蹤評值規範",
      [("定期評值", "每3個月進行一次定期追蹤評值作業", "頻率規範", "每3個月"),
       ("即時評值", "狀況顯著改變時立即進行追蹤評值", "即時要求", "狀況改變"),
       ("通知記錄", "評值結果需通知家屬並完整留存紀錄", "文件要求", "通知家屬")])

categories("daycare-care-plan-ng-ok.svg",
           "照顧計畫 NG vs OK 寫法對比", "常見缺失改善示範",
           [("#dc2626", "#fef2f2", "NG 寫法（不合格）",
             ["「依個案需求提供服務」（過於籠統）",
              "「每日協助洗澡」（缺乏評估依據）",
              "目標無法量化，評鑑委員無從查核"], "常見缺失"),
            ("#16a34a", "#f0fdf4", "OK 寫法（合格）",
             ["「依ADL評估，每週三次協助沐浴」",
              "「每日協助30分鐘步行復健訓練」",
              "目標具體可量化，含執行頻率與方式"], "達標示範"),
            ("#dc2626", "#fef2f2", "NG 追蹤評值（不合格）",
             ["「狀況穩定，繼續原計畫」（未評值）",
              "3個月僅簽名未記錄評值結果",
              "未通知家屬，缺少家屬確認簽名"], "追蹤NG"),
            ("#16a34a", "#f0fdf4", "OK 追蹤評值（合格）",
             ["記載具體評值結果與改變說明",
              "每3個月有完整評值記錄含日期",
              "家屬已知情並完成確認簽名"], "追蹤OK")])

checklist("daycare-care-plan-checklist.svg",
          "照顧計畫文件準備清單", "評鑑前必備確認項目",
          [(True, "標準化評估工具（ADL/IADL）"),
           (True, "初評記錄（24小時內）"),
           (False, "評估人員資格確認"),
           (False, "家屬通知記錄"),
           (True, "個案基本資料表"),
           (False, "入住評估摘要")],
          [(True, "照顧計畫書（7工作天內）"),
           (True, "6項照顧目標記載"),
           (False, "家屬簽名同意書"),
           (False, "定期追蹤評值（每3月）"),
           (True, "即時評值記錄"),
           (False, "追蹤結果通知記錄")])

# ═══════════════════════════════════════════════════════
# ARTICLE 14: daycare-role-division-*
# ═══════════════════════════════════════════════════════
categories("daycare-role-division-overview.svg",
           "評鑑分工職類概覽", "43條基準按職類分配",
           [("#2563eb", "#eff6ff", "社工師",
             ["負責：第2、5-10、13、18-19條",
              "個案評估、照顧計畫、個案研討",
              "服務品質紀錄、家屬溝通聯絡"], "9條"),
            ("#16a34a", "#f0fdf4", "護理師",
             ["負責：第12、20-21、32-33、36條",
              "健康評估、感染管制、緊急處置",
              "護理紀錄、健康促進計畫"], "5條"),
            ("#ea580c", "#fff7ed", "照服員",
             ["負責：第11、14-16條",
              "日常生活協助與服務紀錄",
              "備餐供餐、活動協助記錄"], "4條"),
            ("#78716c", "#f5f5f4", "主任/行政",
             ["負責：第1、3-4、17、22-28、34-43條",
              "行政制度、人力管理、財務",
              "環境設備、緊急應變管理"], "25條")])

list5("daycare-role-division-social-worker.svg",
      "社工師負責評鑑條文清單",
      [("第2條 服務契約", "個案服務契約書，含服務項目與費用說明", "書面契約", "確認簽名"),
       ("第5-7條 照顧計畫", "入住評估、照顧計畫、追蹤評值全流程", "主責執行", "全程記錄"),
       ("第8條 個案研討", "每月召開跨職類個案研討會議並記錄", "月度召開", "會議紀錄"),
       ("第9-10條 家屬聯繫", "定期家屬聯繫、緊急聯絡及通知機制", "聯繫記錄", "家屬簽名"),
       ("第13、18-19條", "活動計畫、投訴處理、服務對象管理", "多項主責", "各自文件")])

list4("daycare-role-division-nurse.svg",
      "護理師負責評鑑條文清單",
      [("第12條 健康評估", "定期生命徵象測量與健康狀態評估記錄", "健康管理", "月度紀錄"),
       ("第20-21條 感染管制", "感染管制計畫、手部衛生、防疫手冊", "感控主責", "手冊版本"),
       ("第32-33條 人員訓練", "護理人員執業登錄及在職訓練記錄", "訓練記錄", "登錄確認"),
       ("第36條 緊急處置", "緊急醫療應變流程及急救設備管理", "緊急應變", "設備清單")])

list3("daycare-role-division-care-worker.svg",
      "照服員主要責任範疇",
      [("第11條 日常照顧", "協助日常生活活動並記錄服務執行情形", "服務記錄", "每日確認"),
       ("第14-16條 供餐備餐", "依個案飲食需求備餐並記錄進食狀況", "飲食管理", "供餐記錄"),
       ("日常服務記錄", "服務日誌、異常情形即時回報主管", "日誌填寫", "異常回報")])

list4("daycare-role-division-director.svg",
      "主任/行政負責範疇",
      [("第23-27條 行政制度", "服務手冊、評鑑自評、品質文件管理", "行政主責", "制度建立"),
       ("第28-33條 人力管理", "人力配置、在職訓練、員工健康管理", "人事管理", "達標確認"),
       ("第34條 財務管理", "財務報表、收支記錄、費用公開透明", "財務主責", "報表留存"),
       ("第38-43條 安全環境", "設施安全、消防、飲食衛生、緊急應變", "環境管理", "定期檢查")])

flow3("daycare-role-division-collaboration.svg",
      "跨職類評鑑準備協作流程", "社工師×護理師×行政三方協同",
      [("各職類準備", "依分工清單", "收集所需文件", "自行備齊"),
       ("主任整合審核", "統一格式確認", "缺漏補充修正", "進度管理"),
       ("模擬演練確認", "情境問答演練", "文件最終確認", "評鑑就緒")])

list5("daycare-role-division-table.svg",
      "評鑑準備分工五大要點",
      [("文件分頭收集", "各職類依清單自行準備負責條文文件", "責任制度", "個別負責"),
       ("格式統一確認", "主任確認所有文件符合評鑑格式規範", "品質把關", "主任審核"),
       ("進度定期追蹤", "每週確認各職類準備進度與缺漏項目", "週度追蹤", "進度報告"),
       ("跨職類模擬演練", "評鑑前進行情境問答及文件翻查演練", "實戰演練", "評鑑前2週"),
       ("當日最終確認", "評鑑當日文件分類整齊，指定聯絡窗口", "當日備戰", "指定窗口")])

# ═══════════════════════════════════════════════════════
# ARTICLE 15: daycare-staffing-*
# ═══════════════════════════════════════════════════════
cover("daycare-staffing-cover.svg",
      "人力配置", "怎麼算才合規",
      "第28-33條完整解析",
      [("第28-33條", "#d97706", "#fef3c7"), ("定期追蹤", "#78716c", "#f5f5f4")],
      "適用：日照中心主任、行政人員",
      "1:10", "照服人力比",
      [("主任", "1名以上", "#d97706"), ("社工師", "1名以上", "#78716c"),
       ("護理師", "1名以上", "#57534e"), ("照服員", "每10人配1名", "#a8a29e")])

list4("daycare-staffing-standards.svg",
      "日照中心法定人力標準",
      [("主任（第28條）", "專職主任1名，具規定資格並完成訓練", "配置規範", "專職1名"),
       ("社工師（第29條）", "至少1名社工師，具執照或相關資格", "最低配置", "1名以上"),
       ("護理師（第32條）", "至少1名護理師，具護理師或士執照", "最低配置", "1名以上"),
       ("照服員（第33條）", "依服務人數1:10配置照顧服務員", "人力比例", "1:10比例")])

categories("daycare-staffing-calculation.svg",
           "人力計算範例（40人日照中心）", "依《社區式長照機構設立許可及管理辦法》",
           [("#d97706", "#fef3c7", "照服員需求計算",
             ["服務人數：40人",
              "比例規範：1:10",
              "最低需求：4名照服員"], "4名照服員"),
            ("#78716c", "#f5f5f4", "社工師需求",
             ["基本配置：1名以上",
              "服務對象多元時酌增",
              "需具社工師或相關資格"], "1名以上"),
            ("#57534e", "#f5f0eb", "護理師需求",
             ["基本配置：1名以上",
              "跨機構支援需有書面協議",
              "需具護理師或士執照"], "1名以上"),
            ("#a8a29e", "#f5f5f4", "主任配置",
             ["專職主任：1名",
              "需完成主任訓練課程",
              "兼任需主管機關核准"], "1名專職")])

flow3("daycare-staffing-retention.svg",
      "人員留任率計算流程", "第29條達標確認方式",
      [("計算基準人數", "以年初在職人數", "為計算基準", "基準確認"),
       ("統計離職人數", "記錄全年離職", "含各種原因", "年度統計"),
       ("計算留任比率", "（基準－離職）÷基準", "×100%得留任率", "達標確認")])

list3("daycare-staffing-training.svg",
      "在職訓練要求（第30條）",
      [("年度訓練時數", "每位在職人員每年至少完成18小時訓練", "時數規範", "18小時/年"),
       ("新進人員訓練", "新進人員應於到職3個月內完成職前訓練", "新進規範", "3個月內"),
       ("訓練記錄留存", "所有訓練記錄含簽到、證明需完整存檔", "文件要求", "留存備查")])

checklist("daycare-staffing-health-check.svg",
          "人員健康管理確認清單", "第31條 員工健康管理",
          [(True, "年度健康檢查記錄"),
           (True, "胸部X光結核病篩檢"),
           (False, "健康異常追蹤處理"),
           (False, "A型肝炎抗體檢查"),
           (True, "疫苗接種記錄"),
           (False, "健康不適回報制度")],
          [(True, "新進人員健康證明"),
           (False, "在職人員年度更新"),
           (True, "健康管理政策規定"),
           (False, "健康異常工作調配"),
           (True, "手部衛生訓練記錄"),
           (False, "健康管理委員會記錄")])

checklist("daycare-staffing-checklist.svg",
          "人力配置合規自評清單", "評鑑前人力達標確認",
          [(True, "主任資格符合規定"),
           (True, "社工師執照確認"),
           (False, "護理師執照確認"),
           (False, "照服員人力比達標"),
           (True, "勞保投保名冊"),
           (False, "執業登錄確認")],
          [(True, "在職訓練時數達標"),
           (False, "新進訓練3月完成"),
           (True, "年度健康檢查完成"),
           (False, "留任率計算記錄"),
           (True, "人力配置圖表"),
           (False, "兼職協議書備存")])

# ═══════════════════════════════════════════════════════
# ARTICLE 16: daycare-top10-*
# ═══════════════════════════════════════════════════════
list5("daycare-top10-overview.svg",
      "評鑑常見缺失 TOP 10 速覽",
      [("缺失1-2：照顧計畫類", "照顧計畫書不完整、追蹤評值未確實執行", "第6、7條", "計畫類缺失"),
       ("缺失3-4：家屬聯繫類", "家屬聯繫記錄不足、緊急通知未書面化", "第9條", "聯繫類缺失"),
       ("缺失5-6：品質監測類", "品質指標未建立、個案研討未依規辦理", "第22、8條", "品質類缺失"),
       ("缺失7-8：活動防疫類", "活動計畫未多元化、防疫手冊版本老舊", "第13、21條", "活動類缺失"),
       ("缺失9-10：行政人力類", "工作手冊不完整、人力配置未達法定標準", "第24、29條", "行政類缺失")])

list5("daycare-top10-items1-5.svg",
      "最常見前5大缺失（第6-22條）",
      [("照顧計畫書不完整", "照顧目標模糊、缺乏量化指標（第6條）", "第6條", "計畫書"),
       ("追蹤評值未確實", "每3個月評值未執行或記錄不完整（第7條）", "第7條", "追蹤評值"),
       ("家屬聯繫記錄不足", "聯繫紀錄缺漏、未書面化或頻率不足（第9條）", "第9條", "聯繫記錄"),
       ("品質指標未建立", "服務品質監測指標不明確或未定期分析（第22條）", "第22條", "品質監測"),
       ("人力配置未達標", "照服員人力不足、兼職未有書面協議（第29條）", "第29條", "人力配置")])

categories("daycare-top10-case-study.svg",
           "缺失6：個案研討記錄不完整（第8條）", "評鑑委員最常見缺失之一",
           [("#d97706", "#fef3c7", "研討頻率要求",
             ["每個月至少辦理一次",
              "日期、主題需有書面計畫",
              "臨時召開亦需留有記錄"], "每月召開"),
            ("#78716c", "#f5f5f4", "研討記錄內容",
             ["參與人員簽到表",
              "討論議題與決議事項",
              "後續追蹤行動記錄"], "記錄完整"),
            ("#57534e", "#f5f0eb", "跨職類參與",
             ["社工師、護理師、照服員",
              "主任或督導出席",
              "需有簽到紀錄佐證"], "跨職類"),
            ("#a8a29e", "#f5f5f4", "常見缺失情境",
             ["只有簽到無討論內容",
              "跨職類人員未實際出席",
              "討論議題與個案無關"], "常見NG")])

list3("daycare-top10-activity.svg",
      "缺失7：活動計畫未多元化（第13條）",
      [("活動多元性要求", "活動類型需涵蓋生理、心理、社會多面向", "多元類型", "第13條"),
       ("月度計畫書", "每月須有書面活動計畫，含活動名稱與時間", "月度規劃", "書面計畫"),
       ("活動記錄留存", "每次活動需有參與名冊、照片、紀錄留存", "活動記錄", "照片佐證")])

list3("daycare-top10-prevention.svg",
      "缺失8：防疫手冊版本老舊（第21條）",
      [("手冊版本更新", "防疫SOP需配合最新疫情指引定期更新", "定期更新", "第21條"),
       ("疫情應變程序", "含疫情分級、隔離程序、通報流程說明", "完整流程", "版本日期"),
       ("人員宣導記錄", "員工已閱讀了解防疫手冊，有簽名記錄", "宣導記錄", "員工簽名")])

list3("daycare-top10-handbook.svg",
      "缺失9：工作手冊不完整（第24條）",
      [("服務流程記載", "工作手冊含所有服務項目的操作流程說明", "流程完整", "第24條"),
       ("年度更新機制", "工作手冊每年至少更新一次並留版本記錄", "定期更新", "版本管理"),
       ("全員知悉確認", "所有員工均已閱讀手冊，有簽名確認記錄", "員工知悉", "簽名存檔")])

checklist("daycare-top10-checklist.svg",
          "評鑑缺失自查清單", "10大缺失對應確認項目",
          [(False, "照顧計畫書（第6條）"),
           (False, "追蹤評值記錄（第7條）"),
           (True, "個案研討紀錄（第8條）"),
           (False, "家屬聯繫記錄（第9條）"),
           (False, "活動計畫書（第13條）"),
           (True, "品質監測指標（第22條）")],
          [(False, "工作手冊版本（第24條）"),
           (False, "人力配置文件（第29條）"),
           (False, "防疫手冊更新（第21條）"),
           (True, "飲用水檢驗（第41條）"),
           (True, "消防檢查記錄（第42條）"),
           (False, "緊急應變演練（第37條）")])

# ═══════════════════════════════════════════════════════
# ARTICLE 17: daycare-ai-tool-*
# ═══════════════════════════════════════════════════════
cover("daycare-ai-tool-cover.svg",
      "AI工具", "準備評鑑指南",
      "四大功能 × 43條基準完整對應",
      [("AI輔助撰寫", "#d97706", "#fef3c7"), ("多人協作", "#78716c", "#f5f5f4"),
       ("定期追蹤", "#57534e", "#f5f0eb"), ("AI查核", "#a8a29e", "#f5f5f4")],
      "適用：所有日照中心評鑑準備人員",
      "4", "大核心功能",
      [("AI撰寫", "文書效率+50%", "#d97706"), ("多人協作", "三職類同平台", "#78716c"),
       ("定期追蹤", "逾期自動提醒", "#57534e"), ("AI查核", "43條比對缺失", "#a8a29e")])

list3("daycare-ai-tool-painpoints.svg",
      "評鑑文書準備三大痛點",
      [("文件量龐大", "43條基準對應大量備審文件，手工整理耗時", "準備負擔重", "時間壓力大"),
       ("格式要求嚴格", "評鑑委員查核格式規範，錯一處全條失分", "格式嚴謹", "容易失分"),
       ("多人協作困難", "社工師、護理師、行政各做各的，難以整合", "協作障礙", "進度不明")])

flow4("daycare-ai-tool-writing.svg",
      "AI輔助撰寫使用流程", "從原始文字到合規文件",
      [("上傳原稿", "上傳既有文件", "或貼上草稿", "開始輸入"),
       ("AI生成初稿", "依評鑑基準", "自動生成格式", "初稿產出"),
       ("人工審閱", "社工師確認", "內容準確性", "專業把關"),
       ("完成文件", "符合評鑑格式", "直接備審使用", "完成準備")])

categories("daycare-ai-tool-collaboration.svg",
           "多人協作功能介紹", "三職類同平台管理43條備審文件",
           [("#d97706", "#fef3c7", "標籤分類管理",
             ["依評鑑四大章節建立標籤",
              "文件自動分類對應條文",
              "快速找到所需備審文件"], "分類清晰"),
            ("#78716c", "#f5f5f4", "職類權限設定",
             ["社工師/護理師/行政各自登入",
              "只看到自己負責的條文",
              "避免誤改他人文件"], "權限管理"),
            ("#57534e", "#f5f0eb", "進度即時掌握",
             ["主任一眼看到整體進度",
              "哪些條文已完成/待補",
              "不用逐一詢問各職類"], "進度透明"),
            ("#a8a29e", "#f5f5f4", "共用文件模板",
             ["提供標準照顧計畫模板",
              "會議記錄、評值表格",
              "減少從零開始撰寫時間"], "模板共用")])

list3("daycare-ai-tool-tracking.svg",
      "定期追蹤功能介紹",
      [("設定追蹤頻率", "依第9、13、22、29條設定月度或季度追蹤", "彈性設定", "自訂頻率"),
       ("逾期自動提醒", "到期前系統自動發送提醒通知相關人員", "自動化提醒", "不漏追蹤"),
       ("追蹤進度總覽", "主任可查看所有追蹤項目的完成狀態", "進度可視", "總覽管理")])

list3("daycare-ai-tool-audit.svg",
      "AI查核功能運作方式",
      [("比對43條基準", "AI自動將現有文件與43條評鑑基準比對", "全面比對", "43條覆蓋"),
       ("標記缺失項目", "自動標記未達標或資料不足的條文項目", "缺失標記", "精確定位"),
       ("產生改善建議", "針對每個缺失提供具體的補強建議說明", "改善方向", "行動建議")])

categories("daycare-ai-tool-summary.svg",
           "報告汪四大功能總覽", "協助日照中心高效完成評鑑準備",
           [("#d97706", "#fef3c7", "AI輔助撰寫",
             ["照顧計畫書、活動記錄自動生成",
              "依評鑑基準格式自動調整",
              "節省50%以上文書作業時間"], "效率提升"),
            ("#78716c", "#f5f5f4", "多人協作",
             ["三職類同平台、標籤分類",
              "即時進度追蹤、權限管理",
              "主任總覽所有準備狀態"], "協作順暢"),
            ("#57534e", "#f5f0eb", "定期追蹤",
             ["自訂追蹤頻率與到期提醒",
              "家屬聯繫、品質監測不漏",
              "逾期自動通知，不錯過"], "追蹤不漏"),
            ("#a8a29e", "#f5f5f4", "AI查核缺失",
             ["自動比對43條評鑑基準",
              "標記缺失、提供改善方向",
              "評鑑前一鍵找出所有漏洞"], "缺失全查")])

print("\n✅ 全部 35 張 SVG 建立完成")

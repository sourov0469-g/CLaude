"""Austin redo, Stage 2: build the three identity boards and the comparison sheet as HTML, for rendering to PNG.

Each board carries what the owner-choice gate lists: logo lockup, the mark alone (with small-size tests), a reversed
version, the palette (black + white + steel family, hex values and contrast), the type pairing, the Austin shape-motif
set, a background-field sample at rest, one hero-style sample, plus the cursor companion and a generation test.
Real job photographs only (the firm's own, from siding/work/dl). No captions on photos: the hero samples need none.
"""
import base64, io, math, os, random, sys
sys.path.insert(0, os.path.dirname(__file__))
import marks as M
import iso as I
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
DL = os.path.join(HERE, '..', '..', 'work', 'dl')
OUT = os.path.join(HERE, 'work')

FONTS = '''
@font-face{font-family:Montserrat;font-weight:500;src:url(../fonts/Montserrat-500-latin.woff2)}
@font-face{font-family:Montserrat;font-weight:700;src:url(../fonts/Montserrat-700-latin.woff2)}
@font-face{font-family:Montserrat;font-weight:800;src:url(../fonts/Montserrat-800-latin.woff2)}
@font-face{font-family:Inter;font-weight:400;src:url(../fonts/Inter-400-latin.woff2)}
@font-face{font-family:Inter;font-weight:600;src:url(../fonts/Inter-600-latin.woff2)}
@font-face{font-family:Inter;font-weight:700;src:url(../fonts/Inter-700-latin.woff2)}
@font-face{font-family:Poppins;font-weight:500;src:url(../fonts/Poppins-500-latin.woff2)}
@font-face{font-family:Poppins;font-weight:600;src:url(../fonts/Poppins-600-latin.woff2)}
@font-face{font-family:Poppins;font-weight:700;src:url(../fonts/Poppins-700-latin.woff2)}
@font-face{font-family:Lato;font-weight:400;src:url(../fonts/Lato-400-latin.woff2)}
@font-face{font-family:Lato;font-weight:700;src:url(../fonts/Lato-700-latin.woff2)}
@font-face{font-family:Roboto;font-weight:100 900;src:url(../fonts/Roboto-400-latin.woff2)}
'''


def photo(name, w=1600):
    im = Image.open(os.path.join(DL, name)).convert('RGB')
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=86)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()


# ---------- colour helpers ----------
def _lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def lum(h):
    h = h.lstrip('#'); r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)


def contrast(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


# ---------- the three concepts ----------
CONCEPTS = {
 'c1': dict(
    n=1, name='Plan Corner', territory='Drafted precision',
    idea='The outside corner of a sided wall, drawn from above as an architect would, turned until the corner becomes a roof peak. The corner post sits at the tip.',
    display=('Montserrat', 800), display_case='upper', text=('Inter', 400), text_strong=('Inter', 600),
    pal=[('Ink', '#14181C', 'Type, mark, dark ground'), ('White', '#FFFFFF', 'Dominant ground'),
         ('Paper', '#F4F6F7', 'Second ground'), ('Steel 100', '#E2E7EB', 'Rules, fields'),
         ('Steel 300', '#A9B4BE', 'Drawn lines on dark'), ('Steel 500', '#677685', 'Secondary text, drawn lines'),
         ('Steel 700', '#3B4652', 'Corner post, buttons')],
    ink='#14181C', ground='#FFFFFF', paper='#F4F6F7', accent='#3B4652', soft='#E2E7EB', mid='#677685', line='#A9B4BE',
    mark=M.c1_mark, small=M.c1_small, hero_photo='photo0-1400.webp',
    headline='Every corner, finished.', sub='Siding, windows and roofing for Austin and 36 Central Texas communities since 2009.',
    motif_style='line', companion='post',
    works='Credibility-first pages: the pairs, proof, cost guides. Reads well small and in one colour (truck doors, yard signs).',
    risks='The chevron can read as a rank stripe or a generic roofing logo when shown without the post or the name.'),
 'c2': dict(
    n=2, name='Grade Stamp', territory='Primed-board warmth',
    idea='A lumber mill stamps every board with its grade. Austin Pro stamps its work: AP and the lap profile in section, inside the stamp frame.',
    display=('Poppins', 600), display_case='title', text=('Lato', 400), text_strong=('Lato', 700),
    pal=[('Ink', '#1C1B19', 'Type, mark, dark ground'), ('Primed', '#F3F1EB', 'Dominant ground (primed board)'),
         ('White', '#FFFFFF', 'Cards, fields'), ('Steel 200', '#D9D7D1', 'Rules, fields'),
         ('Steel 400', '#9B9993', 'Drawn lines'), ('Steel 600', '#5F5F62', 'Secondary text'),
         ('Steel 800', '#36373B', 'Buttons, stamp on photos')],
    ink='#1C1B19', ground='#F3F1EB', paper='#FFFFFF', accent='#36373B', soft='#D9D7D1', mid='#5F5F62', line='#9B9993',
    mark=M.c2_mark, small=M.c2_small, hero_photo='photo38-1400.webp',
    headline='Board by board, since 2009.', sub='One free inspection covers every trade on the house.',
    motif_style='relief', companion='shake',
    works='Warm, homeowner-facing pages: the about story, the crew, reviews. The stamp prints well on job-site signs, shirts and paperwork.',
    risks='Stamps are a familiar craft cliché; the lap profile reads as a serrated edge until it is explained once.'),
 'c3': dict(
    n=3, name='Whole House', territory='The street view, as a system',
    idea='A house corner seen from the street: the corner post and two sided walls running away in perspective. The firm\'s own rule: the full wall or the whole house.',
    display=('Roboto', 700), display_case='upper', text=('Roboto', 400), text_strong=('Roboto', 500),
    pal=[('Black', '#0E0F11', 'Type, mark, dark ground'), ('White', '#FFFFFF', 'Dominant ground'),
         ('Zinc 50', '#F1F3F4', 'Second ground'), ('Zinc 200', '#D2D8DC', 'Fields, rules'),
         ('Zinc 400', '#96A1AA', 'Drawn lines'), ('Zinc 600', '#5B6670', 'Secondary text'),
         ('Zinc 800', '#2D343B', 'Colour fields, buttons')],
    ink='#0E0F11', ground='#FFFFFF', paper='#F1F3F4', accent='#2D343B', soft='#D2D8DC', mid='#5B6670', line='#96A1AA',
    mark=M.c3_mark, small=M.c3_small, hero_photo='photo3-1400.webp',
    headline='The full wall or the whole house.', sub='No patch repairs. Siding, windows and roofing in Austin since 2009.',
    motif_style='flat', companion='board',
    works='System-heavy pages: the visualiser, colour fields, the trade index. The perspective corner animates naturally (courses slide in).',
    risks='At 16 px the courses merge into two blocks; the corner can read as an open book or an office tower without the name.'),
}

PROOF = '4.9 · 474 Google reviews · GAF Master Elite · James Hardie Elite Preferred'
PHONE = '(512) 550-0000'
DESCRIPTOR = 'SIDING · WINDOWS · ROOFING'


def wordmark(c, ink, size=1.0, desc_ink=None):
    fam, wt = c['display']
    name = 'AUSTIN PRO' if c['display_case'] == 'upper' else 'Austin Pro'
    ls = {'c1': '0.06em', 'c2': '-0.01em', 'c3': '0.01em'}[key_of(c)]
    tf, tw = c['text_strong']
    desc_ink = desc_ink or ink
    return (f'<div class="wm" style="color:{ink}"><div style="font:{wt} {46 * size}px/0.95 {fam};letter-spacing:{ls}">{name}</div>'
            f'<div style="font:{tw} {11.5 * size}px/1 {tf};letter-spacing:0.24em;margin-top:{8 * size}px;color:{desc_ink}">{DESCRIPTOR}</div></div>')


def key_of(c):
    return 'c%d' % c['n']


def mark_svg(c, size, ink=None, post=None, paper=None, small=False):
    k = key_of(c); ink = ink or c['ink']; paper = paper or c['ground']
    if k == 'c1':
        frag = (M.c1_small if small else M.c1_mark)(ink, post)
    elif k == 'c2':
        frag = M.c2_small(ink) if small else M.c2_mark(ink, paper)
    else:
        frag = (M.c3_small if small else M.c3_mark)(ink, post, None, paper) if not small else M.c3_small(ink, paper)
    return M.svg(frag, size)


def lockup(c, ink, mark_size=92, size=1.0, post=None, paper=None, desc_ink=None):
    return (f'<div class="lk" style="gap:{22 * size}px">{mark_svg(c, mark_size, ink, post, paper)}'
            f'{wordmark(c, ink, size, desc_ink)}</div>')


# ---------- motif pieces in three styles ----------
def shade_for(c, style):
    if style == 'line':
        def sh(n):
            return '#FFFFFF' if n[2] > 0.5 else (c['paper'] if n[0] > n[1] else c['soft'])
        return sh, c['mid'], 1.4
    if style == 'relief':
        def sh(n):
            if n[2] > 0.5: return '#FFFFFF'
            return '#ECE9E1' if n[0] > n[1] else '#DAD6CC'
        return sh, None, 0
    def sh(n):
        if n[2] > 0.5: return c['soft']
        return c['line'] if n[0] > n[1] else c['accent']
    return sh, None, 0


SHAPES = [('Cut siding piece', lambda: I.lap_board(36, 8), 4.2),
          ('Lap profile', lambda: I.lap_profile(3, 8, 1.25, 0.4, 1.6, 9), 5.2),
          ('Batten strip', lambda: I.batten(2.5, 1.0, 30), 4.0),
          ('Corner post', lambda: I.corner_post(5.5, 1.0, 26), 4.4),
          ('Shake', lambda: I.shake(7, 16, 0.3, 1.1), 6.0)]


def piece(c, idx, scale_mul=1.0, ox=0, oy=0, style=None, extra=''):
    style = style or c['motif_style']
    sh, stroke, sw = shade_for(c, style)
    _, fn, sc = SHAPES[idx]
    return I.render(fn(), sh, sc * scale_mul, ox, oy, stroke, sw, extra)


def motif_tile(c, idx):
    label = SHAPES[idx][0]
    style = c['motif_style']
    filt = 'filter="url(#relief-%s)"' % key_of(c) if style == 'relief' else ''
    g = f'<g {filt}>{piece(c, idx, 1.0, 0, 0)}</g>'
    x0, y0, x1, y1 = I.bbox(SHAPES[idx][1](), SHAPES[idx][2])
    pad = 14
    vb = f'{x0 - pad:.0f} {y0 - pad:.0f} {x1 - x0 + 2 * pad + 10:.0f} {y1 - y0 + 2 * pad + 10:.0f}'
    return (f'<div class="mt"><svg viewBox="{vb}" width="100%" height="150">{g}</svg>'
            f'<div class="cap">{label}</div></div>')


def defs(c):
    k = key_of(c)
    return f'''<svg width="0" height="0" style="position:absolute"><defs>
<filter id="relief-{k}" x="-40%" y="-40%" width="180%" height="180%">
  <feDropShadow dx="6" dy="9" stdDeviation="7" flood-color="#6E6A60" flood-opacity="0.28"/>
  <feDropShadow dx="-2" dy="-2" stdDeviation="1.2" flood-color="#FFFFFF" flood-opacity="0.9"/>
</filter>
<filter id="soft-{k}" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.6"/></filter>
<filter id="flat-{k}" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="7" dy="7" stdDeviation="0" flood-color="{c['soft']}" flood-opacity="1"/></filter>
<pattern id="grid-{k}" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="{c['soft']}" stroke-width="1"/></pattern>
</defs></svg>'''


def field_shade(c):
    def sh(n):
        if n[2] > 0.5: return '#FFFFFF'
        return c['soft'] if n[0] > n[1] else c['line']
    return sh


def field(c, w, h, seed=7, density=1.0, include_grid=True):
    """The background field at rest: Austin's pieces scattered with depth (scale + softness), never busy.
    Placement uses a jittered grid so pieces never pile up; far pieces are smaller and lighter."""
    k = key_of(c); style = c['motif_style']
    rnd = random.Random(seed)
    cols, rows = int(w / 210 * density) + 1, int(h / 170 * density) + 1
    items = []
    for r in range(rows):
        for q in range(cols):
            if rnd.random() < 0.42:
                continue
            x = 60 + (q + 0.5) * (w - 200) / cols + rnd.uniform(-40, 40)
            y = 150 + (r + 0.5) * (h - 190) / rows + rnd.uniform(-25, 25)
            depth = rnd.random()  # 0 far, 1 near
            items.append((depth, x, y, rnd.randrange(5)))
    items.sort()
    out = []
    if style == 'line' and include_grid:
        out.append(f'<rect width="{w}" height="{h}" fill="url(#grid-{k})" opacity="0.55"/>')
    for depth, x, y, idx in items:
        s = 0.45 + 0.75 * depth
        op = 0.35 + 0.65 * depth
        if style == 'relief':
            f = f'filter="url(#relief-{k})"' if depth > 0.35 else f'filter="url(#soft-{k})"'
        elif style == 'flat':
            f = f'filter="url(#flat-{k})"' if depth > 0.5 else ''
        else:
            f = ''
        if style == 'flat':
            _, fn, sc = SHAPES[idx]
            body = I.render(fn(), field_shade(c), sc * s, x, y)
        else:
            body = piece(c, idx, s, x, y)
        out.append(f'<g opacity="{op:.2f}" {f}>{body}</g>')
    return f'<svg viewBox="0 0 {w} {h}" width="100%" style="display:block;background:{c["ground"]}">{"".join(out)}</svg>'


# ---------- cursor companion ----------
def companion(c, size=120):
    k = c['companion']; ink = c['ink']; acc = c['accent']
    eyes = lambda x1, x2, y, r=5.2, look=1.6: (
        f'<g><ellipse cx="{x1}" cy="{y}" rx="{r}" ry="{r * 1.15}" fill="#fff" stroke="{ink}" stroke-width="2"/>'
        f'<ellipse cx="{x2}" cy="{y}" rx="{r}" ry="{r * 1.15}" fill="#fff" stroke="{ink}" stroke-width="2"/>'
        f'<circle cx="{x1 + look}" cy="{y + 0.6}" r="{r * 0.5}" fill="{ink}"/><circle cx="{x2 + look}" cy="{y + 0.6}" r="{r * 0.5}" fill="{ink}"/></g>')
    if k == 'post':
        body = (f'<g transform="rotate(45 50 50)"><rect x="32" y="32" width="36" height="36" rx="3" fill="{acc}"/></g>'
                f'{eyes(43, 57, 49)}<path d="M45 61 Q50 64 55 61" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/>')
    elif k == 'shake':
        body = (f'<path d="M36 18 L64 18 L68 82 L62 79 L56 84 L49 80 L42 85 L32 82 Z" fill="#E9E4D8" stroke="{ink}" stroke-width="2.4" stroke-linejoin="round"/>'
                f'<path d="M44 24 L43 74 M56 24 L58 74" stroke="#B9B2A3" stroke-width="1.4"/>'
                f'{eyes(44, 56, 46)}<path d="M45 58 Q50 61 55 58" stroke="{ink}" stroke-width="2.2" fill="none" stroke-linecap="round"/>')
    else:
        body = (f'<path d="M16 38 L84 34 L84 62 L16 62 Z" fill="{acc}"/><path d="M16 62 L84 62 L84 66 L16 66 Z" fill="{ink}"/>'
                f'{eyes(42, 58, 48)}<path d="M45 57 Q50 60 55 57" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/>')
    cursor = f'<path d="M6 6 L6 26 L11 21 L15 30 L19 28 L15 19 L22 19 Z" fill="#fff" stroke="{ink}" stroke-width="1.6" stroke-linejoin="round"/>'
    return f'<svg viewBox="0 0 100 100" width="{size}" height="{size}">{cursor}<g transform="translate(14 10) scale(0.86)">{body}</g></svg>'


# ---------- generation test ----------
def gen_test(c):
    k = key_of(c); ink, g, acc = c['ink'], c['ground'], c['accent']
    fam, wt = c['display']; tf, tw = c['text_strong']
    name = 'AUSTIN PRO' if c['display_case'] == 'upper' else 'Austin Pro'
    sign = (f'<div class="gt"><div class="sign" style="background:{g};border-color:{ink}">'
            f'<div style="display:flex;justify-content:center">{mark_svg(c, 64, ink, acc, g)}</div>'
            f'<div style="font:{wt} 22px/1 {fam};color:{ink};text-align:center;margin-top:10px">{name}</div>'
            f'<div style="font:{tw} 9px/1.3 {tf};letter-spacing:.2em;color:{ink};text-align:center;margin-top:6px">{DESCRIPTOR}</div>'
            f'<div style="font:{wt} 18px/1 {fam};color:{ink};text-align:center;margin-top:14px;white-space:nowrap">{PHONE}</div></div>'
            f'<div class="stake" style="background:{c["mid"]}"></div><div class="cap">Yard sign, 18 × 24 in</div></div>')
    truck = (f'<div class="gt"><div class="truck" style="background:#FFFFFF">'
             f'<div class="tdoor" style="border-color:{c["soft"]}">{mark_svg(c, 70, ink, acc, "#FFFFFF")}'
             f'<div style="font:{wt} 21px/1 {fam};color:{ink};margin-top:8px">{name}</div>'
             f'<div style="font:{tw} 8px/1.2 {tf};letter-spacing:.2em;color:{ink};margin-top:5px">{DESCRIPTOR}</div>'
             f'<div style="font:{wt} 15px/1 {fam};color:{ink};margin-top:10px">{PHONE}</div></div>'
             f'<div class="handle" style="background:{c["mid"]}"></div></div><div class="cap">Truck door</div></div>')
    card = (f'<div class="gt"><div class="card" style="background:{ink}">{mark_svg(c, 38, "#FFFFFF", c["line"], ink)}'
            f'<div style="font:{tw} 11px/1.45 {tf};color:#fff;margin-top:auto">Austin Pro Siding, Windows &amp; Roofing<br>'
            f'{PHONE} · info@austinprosiding.com<br>7801 N Lamar Blvd Suite C70, Austin TX 78752</div></div>'
            f'<div class="cap">Business card, reversed</div></div>')
    def small(col, bg):
        if k == 'c1': return M.c1_small(col)
        if k == 'c2': return M.c2_small(col, knock=bg)
        return M.c3_small(col, bg)
    fav = (f'<div class="gt"><div style="display:flex;gap:14px;align-items:end">'
           f'<div class="fav" style="background:{ink}">{M.svg(small("#fff", ink), 44)}</div>'
           f'<div class="fav" style="background:#fff;border:1px solid {c["soft"]}">{M.svg(small(ink, "#fff"), 44)}</div>'
           f'<div>{M.svg(small(ink, "#fff"), 16)}</div></div>'
           f'<div class="cap">App icon · favicon 16 px</div></div>')
    return sign + truck + card + fav


# ---------- hero sample ----------
def hero(c):
    k = key_of(c)
    img = photo(c['hero_photo'])
    fam, wt = c['display']; tf, tw = c['text']; sf, sw_ = c['text_strong']
    ink, g, acc = c['ink'], c['ground'], c['accent']
    head = c['headline'] if c['display_case'] != 'upper' else c['headline']
    nav = (f'<div class="nav">{lockup(c, ink, 40, 0.5, acc, g)}<div class="navr" style="font:{sw_} 13px {sf};color:{ink}">'
           f'<span>Siding</span><span>Windows</span><span>Roofing</span><span>Our work</span><b>{PHONE}</b></div></div>')
    cta = (f'<div class="cta"><span class="btn" style="background:{acc};font:{sw_} 15px {sf}">Book a free inspection</span>'
           f'<span style="font:{sw_} 15px {sf};color:{ink}">or call {PHONE}</span></div>')
    proof = f'<div class="proof" style="font:{sw_} 12.5px {sf};color:{c["mid"]}">{PROOF}</div>'
    if k == 'c1':
        lines = ''.join(f'<line x1="0" y1="{y}" x2="600" y2="{y}" stroke="{c["soft"]}" stroke-width="1" opacity="0.7"/>' for y in range(96, 855, 58))
        return (f'<div class="hero h1" style="background:{g}">'
                f'<svg class="hgrid" viewBox="0 0 600 855">{lines}</svg>'
                f'<div class="hfield">{field(c, 600, 230, seed=4, density=0.7, include_grid=False)}</div>'
                f'<div class="himg"><img src="{img}"></div>{nav}'
                f'<div class="hcopy"><h1 style="font:{wt} 64px/1.0 {fam};color:{ink};letter-spacing:-0.01em;text-transform:uppercase">{head}</h1>'
                f'<p style="font:{tw} 19px/1.5 {tf};color:{ink}">{c["sub"]}</p>{cta}{proof}</div>'
                f'<div class="hpost" style="background:{acc}"></div></div>')
    if k == 'c2':
        stamp = mark_svg(c, 150, '#FFFFFF', None, 'transparent')
        return (f'<div class="hero h2"><img class="full" src="{img}"><div class="shade"></div>'
                f'<div class="nav navd">{lockup(c, "#FFFFFF", 40, 0.5, None, "transparent")}<div class="navr" style="font:{sw_} 13px {sf};color:#fff">'
                f'<span>Siding</span><span>Windows</span><span>Roofing</span><span>Our work</span><b>{PHONE}</b></div></div>'
                f'<div class="stamp2">{stamp}</div>'
                f'<div class="card2" style="background:{g}"><h1 style="font:{wt} 50px/1.05 {fam};color:{ink};letter-spacing:-0.01em">{head}</h1>'
                f'<p style="font:{tw} 19px/1.5 {tf};color:{ink}">{c["sub"]}</p>{cta}{proof}</div></div>')
    return (f'<div class="hero h3"><img class="full" src="{img}">'
            f'<div class="nav navw" style="background:#fff">{lockup(c, ink, 40, 0.5, None, "#fff")}<div class="navr" style="font:{sw_} 13px {sf};color:{ink}">'
            f'<span>Siding</span><span>Windows</span><span>Roofing</span><span>Our work</span><b>{PHONE}</b></div></div>'
            f'<div class="band3" style="background:{acc}"><h1 style="font:{wt} 58px/1.0 {fam};color:#fff;letter-spacing:-0.015em;text-transform:uppercase">{head}</h1>'
            f'<p style="font:{tw} 19px/1.5 {tf};color:#E4E8EB">{c["sub"]}</p>'
            f'<div class="cta"><span class="btn" style="background:#fff;color:{ink};font:{sw_} 15px {sf}">Book a free inspection</span>'
            f'<span style="font:{sw_} 15px {sf};color:#fff">or call {PHONE}</span></div>'
            f'<div class="proof" style="font:{sw_} 12.5px {sf};color:#C9D0D6">{PROOF}</div></div>'
            f'<div class="fields3">{"".join(f"<i style=background:{h}></i>" for _, h, _ in c["pal"][2:])}</div></div>')


# ---------- the board ----------
def board(c):
    k = key_of(c); fam, wt = c['display']; tf, tw = c['text']; sf, sw_ = c['text_strong']
    ink, g, acc = c['ink'], c['ground'], c['accent']
    pal = ''.join(
        f'<div class="sw"><div class="chip" style="background:{h};{"border:1px solid #DDE1E4;" if lum(h) > 0.85 else ""}"></div>'
        f'<div class="sn">{n}</div><div class="sh">{h}</div><div class="sr">{role}</div>'
        f'<div class="sc">{"on white " + format(contrast(h, "#FFFFFF"), ".1f") + ":1" if lum(h) < 0.5 else "ink on it " + format(contrast(ink, h), ".1f") + ":1"}</div></div>'
        for n, h, role in c['pal'])
    sizes = ''.join(f'<div class="sz"><div class="szb">{mark_svg(c, s, ink, acc, g, small=s < 33)}</div><div class="cap">{s} px</div></div>' for s in (96, 48, 32, 16))
    motifs = ''.join(motif_tile(c, i) for i in range(5))
    type_spec = (f'<div class="ts"><div style="font:{wt} 64px/1 {fam};color:{ink};letter-spacing:-0.01em">Aa</div>'
                 f'<div class="tl"><b>{fam} {wt}</b>, display and headlines</div>'
                 f'<div style="font:{wt} 30px/1.1 {fam};color:{ink};margin-top:14px">{c["headline"]}</div>'
                 f'<div style="font:{tw} 17px/1.55 {tf};color:{ink};margin-top:12px;max-width:560px">One free inspection covers every trade on the house. A project manager walks the outside, measures and photographs, then you get the scope, materials and price.</div>'
                 f'<div class="tl" style="margin-top:10px"><b>{tf} {tw} / {c["text_strong"][1]}</b>, text and labels · normal everyday fonts only</div></div>')
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}{CSS}
.b{{--ink:{ink};--g:{g};--acc:{acc};--soft:{c["soft"]};--mid:{c["mid"]}}}
.b h2{{font:{sw_} 13px/1 {sf};letter-spacing:.2em;text-transform:uppercase;color:{c["mid"]}}}
.b .cap,.b .tl,.b .sr,.b .sc,.b .sh{{font-family:{tf}}}
</style></head><body><div class="b">{defs(c)}
<header class="hd"><div class="num" style="font:{wt} 120px/0.8 {fam};color:{c["soft"]}">{c["n"]}</div>
<div><div style="font:{sw_} 13px/1 {sf};letter-spacing:.22em;text-transform:uppercase;color:{c["mid"]}">Concept {c["n"]} of 3 · {c["territory"]}</div>
<div style="font:{wt} 44px/1.05 {fam};color:{ink};margin-top:10px">{c["name"]}</div>
<div style="font:{tw} 18px/1.5 {tf};color:{ink};margin-top:10px;max-width:980px">{c["idea"]}</div></div></header>
<section class="r1"><div class="panel big" style="background:{g}"><h2>Logo lockup</h2><div class="centre">{lockup(c, ink, 150, 1.55, acc, g)}</div></div>
<div class="panel" style="background:{c["paper"]}"><h2>The mark alone</h2><div class="centre">{mark_svg(c, 210, ink, acc, c["paper"])}</div><div class="sizes">{sizes}</div></div></section>
<section class="r2"><div class="panel" style="background:{ink}"><h2 style="color:{c["line"]}">Reversed</h2><div class="centre">{lockup(c, "#FFFFFF", 120, 1.2, c["line"], ink, "#D5DADF")}</div></div>
<div class="panel" style="background:#fff"><h2>Palette · black, white and the steel family</h2><div class="pal">{pal}</div></div></section>
<section class="r3"><div class="panel" style="background:{g}"><h2>Type pairing</h2>{type_spec}</div>
<div class="panel" style="background:{g}"><h2>Shape motifs · drawn with depth</h2><div class="motifs">{motifs}</div></div></section>
<section class="panel wide" style="background:{g}"><h2>Background field at rest</h2><div class="fieldbox">{field(c, 1520, 420, seed=11)}</div>
<div class="note" style="font-family:{tf}">At rest the pieces drift slowly at depth; around the cursor they part and return. White, clean and sparse by rule.</div></section>
<section class="panel wide" style="background:{c["paper"]}"><h2>Hero sample</h2>{hero(c)}</section>
<section class="r4"><div class="panel" style="background:{g}"><h2>Cursor companion</h2><div class="comp">{companion(c, 150)}{companion(c, 72)}</div>
<div class="note" style="font-family:{tf}">Follows the pointer, idles, blinks, glances at what you can press. Off on touch.</div></div>
<div class="panel" style="background:{c["paper"]}"><h2>Generation test · made from these rules alone</h2><div class="gen">{gen_test(c)}</div></div></section>
<footer class="ft" style="font-family:{tf}">Austin Pro Siding, Windows &amp; Roofing · identity concept {c["n"]} of 3 · Stage 2 option for the owner's choice</footer>
</div></body></html>'''


CSS = '''
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fff;width:1600px}
.b{padding:40px}
.hd{display:flex;gap:36px;align-items:flex-start;padding:10px 4px 34px}
.panel{border-radius:4px;padding:26px 28px;position:relative;overflow:hidden}
.panel h2{margin-bottom:18px}
section{margin-bottom:20px}
.r1{display:grid;grid-template-columns:2fr 1fr;gap:20px}
.r2,.r3,.r4{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.r4{grid-template-columns:1fr 2fr}
.big{min-height:440px}
.centre{display:flex;align-items:center;justify-content:center;min-height:300px}
.lk{display:flex;align-items:center}
.sizes{display:flex;gap:22px;align-items:flex-end;justify-content:center;margin-top:8px}
.sz{text-align:center}.szb{display:flex;align-items:flex-end;justify-content:center;min-height:100px}
.cap{font-size:12px;color:#6b737b;margin-top:8px;text-align:center}
.pal{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.chip{height:62px;border-radius:3px}
.sn{font:600 13px/1.2 Inter,sans-serif;margin-top:8px;color:#1b1e21}.sh{font-size:13px;color:#1b1e21;margin-top:2px}
.sr{font-size:11.5px;color:#68707a;margin-top:3px;line-height:1.35}.sc{font-size:11px;color:#68707a;margin-top:2px}
.ts{padding-top:6px}.tl{font-size:13px;color:#68707a;margin-top:6px}
.motifs{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;align-items:end}
.mt{text-align:center}
.wide .fieldbox{border-radius:3px;overflow:hidden;border:1px solid rgba(0,0,0,.06)}
.note{font-size:13.5px;color:#68707a;margin-top:12px}
.hero{position:relative;width:1520px;height:855px;overflow:hidden;border-radius:3px}
.hero img{display:block}
.nav{position:absolute;left:0;right:0;top:0;height:84px;display:flex;align-items:center;justify-content:space-between;padding:0 40px;z-index:3}
.navr{display:flex;gap:28px;align-items:center}
.navr b{padding:10px 16px;border:1.5px solid currentColor;border-radius:999px;font-weight:inherit}
.cta{display:flex;align-items:center;gap:20px;margin-top:30px}
.btn{color:#fff;padding:16px 24px;border-radius:3px}
.proof{margin-top:26px;letter-spacing:.02em}
.h1 .hgrid{position:absolute;left:0;top:0;width:600px;height:855px}
.h1 .hfield{position:absolute;left:0;bottom:0;width:600px;opacity:.85}
.h1 .himg{position:absolute;right:0;top:0;width:900px;height:855px}
.h1 .himg img{width:100%;height:100%;object-fit:cover;object-position:40% 50%}
.h1 .hcopy{position:absolute;left:56px;top:190px;width:520px;z-index:2}
.h1 .hcopy p{margin-top:22px}
.h1 .hpost{position:absolute;left:606px;top:0;width:14px;height:855px;transform:translateX(-7px)}
.h2 .full{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 40%}
.h2 .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,18,15,.55),rgba(20,18,15,0) 30%)}
.h2 .stamp2{position:absolute;right:60px;top:120px;opacity:.92;transform:rotate(-6deg)}
.h2 .card2{position:absolute;left:56px;bottom:56px;width:640px;padding:40px 44px;border-radius:3px}
.h2 .card2 p{margin-top:16px}
.navd{color:#fff}
.h3 .full{position:absolute;left:0;top:84px;width:100%;height:771px;object-fit:cover;object-position:50% 55%}
.h3 .band3{position:absolute;left:0;bottom:0;width:780px;padding:48px 56px 44px}
.h3 .band3 p{margin-top:18px}
.h3 .fields3{position:absolute;right:0;bottom:0;display:flex}
.h3 .fields3 i{display:block;width:74px;height:74px}
.comp{display:flex;gap:30px;align-items:center;justify-content:center;min-height:200px}
.gen{display:grid;grid-template-columns:1fr 1.25fr 1.2fr .9fr;gap:20px;align-items:end}
.gt{display:flex;flex-direction:column;align-items:center}
.sign{width:205px;padding:18px 14px;border:3px solid;border-radius:2px}
.stake{width:6px;height:46px}
.truck{width:250px;height:214px;border-radius:14px 30px 8px 8px;position:relative;box-shadow:inset 0 0 0 2px #e3e6e9;padding:18px}
.tdoor{border:2px solid;border-radius:6px;height:166px;padding:12px 14px}
.handle{position:absolute;right:26px;top:22px;width:34px;height:7px;border-radius:4px}
.truck .tdoor{margin-top:6px}
.card{width:250px;height:150px;border-radius:6px;padding:16px;display:flex;flex-direction:column}
.fav{width:64px;height:64px;border-radius:14px;display:flex;align-items:center;justify-content:center}
.ft{font-size:12px;color:#8a9097;padding:10px 4px 0}
'''


SCORES = {'c1': (7.6, 8.4, 6.8, 8.0), 'c2': (7.0, 7.9, 7.0, 8.5), 'c3': (8.0, 8.0, 7.8, 9.0)}
RECOMMEND = 'c3'


def weighted(k):
    d, u, cr, co = SCORES[k]
    return 0.4 * d + 0.3 * u + 0.2 * cr + 0.1 * co


def comparison():
    ks = ('c1', 'c2', 'c3')
    C = [CONCEPTS[k] for k in ks]
    def row(label, cells, cls=''):
        return f'<div class="lab">{label}</div><div class="row {cls}">' + ''.join(f'<div class="cell">{x}</div>' for x in cells) + '</div>'
    head = [f'<div class="nm"><span style="font:{c["display"][1]} 54px/0.8 {c["display"][0]};color:{c["line"]}">{c["n"]}</span>'
            f'<span style="font:{c["display"][1]} 27px/1.05 {c["display"][0]}">{c["name"]}</span></div>' for c in C]
    mk = [f'<div class="box" style="background:{c["ground"]};border:1px solid #eceff1">{mark_svg(c, 200, c["ink"], c["accent"], c["ground"])}</div>' for c in C]
    def stacked(c, ink, post, paper, desc):
        fam, wt = c['display']; tf, tw = c['text_strong']
        name = 'AUSTIN PRO' if c['display_case'] == 'upper' else 'Austin Pro'
        return (f'<div style="text-align:center">{mark_svg(c, 84, ink, post, paper)}'
                f'<div style="font:{wt} 33px/1 {fam};color:{ink};margin-top:12px">{name}</div>'
                f'<div style="font:{tw} 10.5px/1 {tf};letter-spacing:.2em;color:{desc};margin-top:8px">{DESCRIPTOR}</div></div>')
    lk = [f'<div class="box" style="background:{c["ground"]};border:1px solid #eceff1">{stacked(c, c["ink"], c["accent"], c["ground"], c["ink"])}</div>' for c in C]
    rv = [f'<div class="box" style="background:{c["ink"]}">{stacked(c, "#FFFFFF", c["line"], c["ink"], "#D5DADF")}</div>' for c in C]
    pl = [''.join(f'<div class="pc" style="background:{h};{"box-shadow:inset 0 0 0 1px #dfe3e6;" if lum(h) > 0.85 else ""}color:{"#fff" if lum(h) < 0.25 else "#14181C"}">{h}</div>' for _, h, _ in c['pal']) for c in C]
    ty = [f'<div style="font:{c["display"][1]} 30px/1.1 {c["display"][0]}">{c["display"][0]}</div><div style="font:{c["text"][1]} 22px/1.3 {c["text"][0]};margin-top:4px">{c["text"][0]} for text</div>' for c in C]
    fd = [f'<div class="fd">{field(c, 420, 300, seed=21, density=2.0)}</div>' for c in C]
    hr = [f'<div class="hz">{hero(c)}</div>' for c in C]
    idea = [f'<div class="tx">{c["works"]}</div><div class="tx risk"><b>Risk:</b> {c["risks"]}</div>' for c in C]
    sc = []
    for k in ks:
        d, u, cr, co = SCORES[k]
        star = '<div class="rec">Recommended</div>' if k == RECOMMEND else ''
        sc.append(f'{star}<div class="sc"><b>{weighted(k):.2f}</b><span>Design {d} · Usability {u}<br>Creativity {cr} · Content {co}</span></div>')
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}{CSS}
body{{width:1080px;font-family:Inter,sans-serif;color:#14181C;background:#fff}}
.top{{padding:44px 36px 10px}}.top h1{{font:800 44px/1.05 Montserrat}}.top p{{font:400 21px/1.45 Inter;margin-top:12px;color:#3d454d}}
.lab{{font:600 14px/1 Inter;letter-spacing:.2em;text-transform:uppercase;color:#677685;padding:26px 36px 10px}}
.row{{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0 24px}}
.cell{{min-width:0}}
.nm{{display:flex;flex-direction:column;gap:8px;padding:4px 6px}}
.box{{display:flex;align-items:center;justify-content:center;height:250px;border-radius:6px;overflow:hidden}}
.pc{{height:46px;display:flex;align-items:center;padding-left:12px;font:600 15px Inter;letter-spacing:.02em}}
.pc:first-child{{border-radius:6px 6px 0 0}}.pc:last-child{{border-radius:0 0 6px 6px}}
.fd{{border-radius:6px;overflow:hidden;border:1px solid #eceff1}}
.hz{{width:328px;height:184px;overflow:hidden;border-radius:6px}}
.hz .hero{{transform:scale(.2158);transform-origin:0 0}}
.tx{{font:400 19px/1.45 Inter;color:#2c3339}}.risk{{margin-top:10px;color:#5b6670}}
.sc{{display:flex;flex-direction:column;gap:6px;padding:16px;border:2px solid #14181C;border-radius:6px}}
.sc b{{font:800 44px/1 Montserrat;color:#14181C}}.sc span{{font:500 16px/1.4 Inter;color:#3d454d}}
.rec{{font:700 16px Inter;letter-spacing:.12em;text-transform:uppercase;background:#14181C;color:#fff;padding:10px 14px;border-radius:6px 6px 0 0;margin-bottom:-2px}}
.foot{{font:400 17px/1.5 Inter;color:#5b6670;padding:28px 36px 40px}}
</style></head><body>{defs(CONCEPTS["c1"])}{defs(CONCEPTS["c2"])}{defs(CONCEPTS["c3"])}
<div class="top"><h1>Austin Pro: three identity options</h1>
<p>Pick one whole, or mix parts across options (for example, the mark from 1 with the colours from 3). Full boards and guidelines are attached for each.</p></div>
{row("Option", head)}{row("The mark", mk)}{row("Logo", lk)}{row("Reversed", rv)}{row("Palette · hex", pl)}{row("Fonts", ty)}
{row("Background at rest", fd)}{row("Hero", hr)}{row("Best for · risk", idea)}{row("Self-rating (pass is 7.0)", sc)}
<div class="foot">Scorecard: Design 40 · Usability 30 · Creativity 20 · Content 10. A pass needs 7.0 weighted, no category under 6.0 and no vetoes. The recommendation advises; the owner decides.</div>
</body></html>'''


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for k, c in CONCEPTS.items():
        open(os.path.join(OUT, f'board-{k}.html'), 'w').write(board(c))
    open(os.path.join(OUT, 'comparison.html'), 'w').write(comparison())
    print('built boards and comparison')

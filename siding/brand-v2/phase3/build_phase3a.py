"""AUSTIN-PROMPT-V2, Phase 3a: concept visuals, animation storyboards and the flow map.

Writes brand-v2/phase3a-flow.html, standalone: fonts and the firm's own job photos embedded, all styling from
phase2/tokens.css. Sections:
1. Flow map: 6 pages and 41 sections, each section with its single annex-v3 reference. Shows the four visitor
   journeys and the in-file navigation model.
2. Concept key frames: seven moments, composed at 1440x900 and scaled to fit.
3. Storyboards: four motions, five frames each, with timing.
Run: python3 -I brand-v2/phase3/build_phase3a.py"""
import base64, html, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
BV2 = os.path.dirname(HERE)
ROOT = os.path.dirname(BV2)
sys.path.insert(0, os.path.join(BV2, 'phase2'))
sys.path.insert(0, BV2)
sys.path.insert(0, os.path.join(ROOT, 'src'))
import marks, tokens, home2  # noqa: E402
from icons import icon  # noqa: E402

esc = html.escape
P = tokens.PRIM
NAME = 'Austin Pro Siding'
TOK = open(os.path.join(BV2, 'phase2', 'tokens.css')).read()


def b64(path, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()


FACES = ''.join(f"@font-face{{font-family:'{f}';font-weight:{w};font-display:block;src:url({b64(os.path.join(BV2, 'fonts', p), 'font/woff2')}) format('woff2')}}"
                for f, w, p in [('Montserrat', 700, 'Montserrat-700-latin.woff2'), ('Montserrat', 800, 'Montserrat-800-latin.woff2'),
                                ('Inter', 400, 'Inter-400-latin.woff2'), ('Inter', 600, 'Inter-600-latin.woff2'), ('Inter', 700, 'Inter-700-latin.woff2')])
IMG = {}
for pid in ['robroy', 'siding0', 'siding2', 'home2', 'windows1', 'windows3']:
    for ab in 'ab':
        IMG[f'{pid}-{ab}'] = b64(os.path.join(ROOT, f'site/assets/img/h/work-{pid}-{ab}-1000.webp'), 'image/webp')
PLACE = {p['id']: p['place'] for p in home2.PAIRS6}
PINS = home2.PINS


def lockup(fg, word, h=32, tail=False):
    return (f'<svg class="lk" viewBox="0 0 296 64" width="{h * 296 / 64:.0f}" height="{h}" role="img" aria-label="{NAME}">'
            f'{marks.c1(fg, "#fff", tail=230 if tail else 0)}<text class="wm" x="78" y="41" fill="{word}">{NAME}</text></svg>')


def cline(w=600, color='var(--color-accent-line)', cls=''):
    return (f'<svg class="cline {cls}" viewBox="0 0 {w} 24" width="100%" height="24" preserveAspectRatio="none" aria-hidden="true">'
            f'<path d="M2 22.5L8 2H16V13H{w}" fill="none" stroke="{color}" stroke-width="3" vector-effect="non-scaling-stroke"/></svg>')


# ------------------------------------------------------------------------------------------------ page plan (41)
PAGES = [
    ('home', 'Home', [
        ('Hero: split-slider, process label in sync', 'MERSI'), ('Proof band', 'Dropbox Brand'),
        ('The record as a numeral event', 'Apple AirPods Pro'), ('Services router', 'Lusion'),
        ('Wall assembly chapter', 'Lusion · Graza bar'), ('Colour as content', 'Cash App Brand'),
        ('Visualiser entry', 'Quiet Cubes · Rimowa UNIQUE'), ('Map preview (static)', 'Bruno Simon (scoped)'),
        ('Before/after seam', 'MERSI seam'), ('Since 2009 film roll', 'Scout Motors'), ('Closing call', 'Dropbox Brand')]),
    ('siding', 'Siding & painting', [
        ('Hero: the wall, course-lined', 'Lusion'), ('Profiles as material samples', 'Ever (3D visualisations)'),
        ('Colour wall, full-bleed', 'Cash App Brand'), ('Visualiser, the full instrument', 'Rimowa UNIQUE · Quiet Cubes'),
        ('Siding pairs', 'MERSI seam'), ('Credential and close', 'Dropbox Brand')]),
    ('windows', 'Windows & doors', [
        ('Hero', 'Lusion'), ('A window in section, pinned', 'Apple AirPods Pro'), ('Types and finishes', 'Ever (3D visualisations)'),
        ('Andersen credential band', 'Dropbox Brand'), ('Window pairs', 'MERSI seam'), ('Close', 'Dropbox Brand')]),
    ('roofing', 'Roofing · gutters · covers', [
        ('Hero', 'Lusion'), ('A roof in layers, pinned', 'Apple AirPods Pro'), ('GAF credential band', 'Dropbox Brand'),
        ('Gutters: the water line', 'Lusion'), ('Patio covers archive', 'Lando Norris'), ('Close', 'Dropbox Brand')]),
    ('work', 'Our work', [
        ('The record, stated once', 'Apple AirPods Pro'), ('The map: the one explorable section', 'Bruno Simon (scoped)'),
        ('Job archive', 'Lando Norris · Ever (filtering)'), ('Before/after centrepiece', 'MERSI seam'),
        ('Reviews, as counted', 'Dropbox Brand'), ('Close', 'Dropbox Brand')]),
    ('about', 'About & booking', [
        ('Hero: homeowner warmth', 'Cowboy'), ('Since 2009, merged 2018', 'Scout Motors'), ('Credentials', 'Dropbox Brand'),
        ('Office and hours', 'Cowboy'), ('Booking form', 'Quiet Cubes (staffed service)'), ('FAQ', 'Erie Home (grammar note only)')]),
]
assert sum(len(s) for _, _, s in PAGES) == 41 and len(PAGES[0][2]) == 11 and all(len(s) >= 6 for _, _, s in PAGES)

JOURNEYS = [
    ('J1 · Research a trade', [('home', 0), ('home', 3), ('siding', 0), ('siding', 3), ('about', 4)], 'Hero → services router → Siding & painting → visualiser → booking'),
    ('J2 · Check the proof', [('home', 2), ('home', 7), ('work', 1), ('work', 3), ('about', 4)], 'Numeral → map preview → the map → the seam → booking'),
    ('J3 · Call now', [('home', 0), ('about', 3)], 'The phone number is in the header on every page; tap-to-call is 48 px'),
    ('J4 · Come back to book', [('about', 4)], 'Direct link #/about/booking; the visualiser summary travels with the form'),
]


def flowmap():
    colw, gap, x0, y0, rh = 200, 28, 20, 70, 46
    W = x0 * 2 + len(PAGES) * colw + (len(PAGES) - 1) * gap
    H = y0 + 11 * rh + 40
    pos = {}
    s = []
    for c, (pid, title, secs) in enumerate(PAGES):
        x = x0 + c * (colw + gap)
        s.append(f'<text x="{x}" y="34" class="fm-h">{esc(title)}</text><text x="{x}" y="54" class="fm-s">{len(secs)} sections</text>')
        for r, (nm, ref) in enumerate(secs):
            y = y0 + r * rh
            pos[(pid, r)] = (x, y)
            s.append(f'<g class="fm-box" data-k="{pid}-{r}"><rect x="{x}" y="{y}" width="{colw}" height="{rh - 8}" rx="2"/>'
                     f'<text x="{x + 10}" y="{y + 16}" class="fm-t">{r + 1}. {esc(nm if len(nm) <= 29 else nm[:28] + '…')}</text><text x="{x + 10}" y="{y + 31}" class="fm-r">{esc(ref[:32])}</text></g>')
    # the course line: one thread above every page, from the first hero to the last close
    s.insert(0, f'<path d="M{x0} 18L{x0 + 4} 6H{x0 + 10}V12H{W - x0}" class="fm-thread"/>')
    # journeys J1 and J2 as numbered badges on the boxes they pass through (lines would cross the text)
    for j, (nm, steps, _) in enumerate(JOURNEYS[:2]):
        for i, k in enumerate(steps):
            bx, by = pos[k]
            cx, cy = bx + colw + 14, by + 10 + j * 18
            s.append(f'<circle cx="{cx}" cy="{cy}" r="8" class="fm-b{j + 1}"/><text x="{cx}" y="{cy + 3.5}" text-anchor="middle" class="fm-bt">{i + 1}</text>')
    return (f'<svg class="flow" viewBox="0 0 {W} {H}" role="img" aria-label="Flow map: six pages, 41 sections; journeys J1 and J2 marked as numbered steps">'
            f'{"".join(s)}</svg>')


# ------------------------------------------------------------------------------------------------ concept key frames (1440x900)
def dots_svg(w=1440, h=900, n=None, sx=1.0, color='var(--steel-9)', r=3.2):
    hx, hy = home2.NEAR['hq']
    out = []
    pins = PINS if n is None else PINS[:n]
    for x, y, *_ in pins:
        out.append(f'<circle cx="{w / 2 + (x - hx) * sx:.1f}" cy="{h / 2 + (y - hy) * sx:.1f}" r="{r}" fill="{color}"/>')
    return ''.join(out)


def f_hero():
    return f'''<div class="fr fr-hero"><div class="half l"><img src="{IMG['robroy-b']}" alt=""></div><div class="half r"><img src="{IMG['robroy-a']}" alt=""></div>
<div class="hdr">{lockup(P["steel-9"], P["neutral-13"], 30, True)}<span class="hnav">Siding &amp; painting · Windows &amp; doors · Roofing · Our work · About</span><span class="hcall">{icon("communication-phone", 18)} (512) 550-0000</span></div>
<div class="plate"><p class="pl-k">Rob Roy, Austin</p><p class="pl-s">Step 04 of 06 · Lay the courses</p>{cline(360, "#fff")}<p class="pl-n">Before · After</p></div>
<div class="hero-h"><p class="ty-label">Siding · windows · roofing · painting</p><p class="h1w">Laid by hand,<br>course by course.</p><a class="btn btn-primary" href="#f">Book an estimate {icon("action-arrow-right", 20)}</a></div></div>'''


def f_numeral():
    return f'''<div class="fr fr-num"><svg class="nd" viewBox="0 0 1440 900" aria-hidden="true">{dots_svg(sx=1.9, color="var(--steel-7)", r=3.4)}</svg>
<div class="num-c"><p class="ty-label">The record</p><p class="big">312</p><p class="num-p">312 on the map with photos + 574 more counted</p><p class="num-s">Each dot is a job with photos. Open the map to see them.</p></div></div>'''


def f_wall():
    return f'''<div class="fr fr-wall"><svg viewBox="0 0 1440 900" class="wl" aria-hidden="true">
<path d="M0 120H1440" stroke="var(--steel-6)" stroke-width="3"/>
<rect x="900" y="160" width="120" height="640" fill="none" stroke="var(--steel-10)" stroke-width="3"/>
<path d="M893 160V800" stroke="var(--steel-9)" stroke-width="12"/><path d="M880 160V800" stroke="var(--steel-8)" stroke-width="3" stroke-dasharray="9 7"/>
{''.join(f'<path d="M876 {190 + i * 100}L846 {300 + i * 100}H876Z" fill="var(--steel-12)" stroke="var(--steel-6)" stroke-width="3"/>' for i in range(5))}
<path d="M846 800L838 880H1440" stroke="var(--steel-6)" stroke-width="3" fill="none"/>
<text x="1060" y="230" class="wl-t">STUD</text><text x="1060" y="330" class="wl-t">SHEATHING</text><text x="1060" y="430" class="wl-t">WRAP</text><text x="1060" y="530" class="wl-t">LAP BOARD, 4 OF 6</text></svg>
<div class="wall-c"><p class="ty-label on-dark">How a wall goes together</p><p class="h2w">Each board laps the one below it.</p><p class="pw">Scroll and the wall builds itself in the order the crew does it: stud, sheathing, wrap, then the courses from the bottom up. The course line from the section above runs into the drawing and leaves along the base.</p></div></div>'''


def f_colour():
    steps = [('Light', 3), ('Light-mid', 5), ('Mid', 7), ('Mid-deep', 9), ('Deep', 11), ('Deepest', 12)]
    fields = ''.join(f'<div class="cf" style="background:var(--steel-{k});color:{"#000" if k < 8 else "#fff"}"><span>{esc(n)}</span><span class="cf-k">steel-{k}</span></div>' for n, k in steps)
    return f'''<div class="fr fr-col"><div class="cfs">{fields}</div><div class="col-c"><p class="ty-label">Choosing a colour</p><p class="h2b">Pick the lightness first.<br>The colour comes second.</p><p class="pb">Full-bleed fields, one per value step. The firm's real colour range goes in the build once its list is confirmed; this frame shows the structure in the brand's own steel.</p></div></div>'''


def f_vis():
    steps = ['Profile', 'Colour', 'Trim', 'Preview']
    tabs = ''.join(f'<span class="vt{" on" if i == 0 else ""}"><b>{i + 1}</b> {s}</span>' for i, s in enumerate(steps))
    prof = ''.join(f'<span class="vp{" on" if i == 0 else ""}">{icon("trade-siding", 28)}<b>{n}</b></span>' for i, n in enumerate(['Lap', 'Panel', 'Shingle', 'Board &amp; batten']))
    return f'''<div class="fr fr-vis"><div class="vis-l"><p class="ty-label">Visualiser</p><p class="h2b">Build your wall in four steps.</p><div class="vtabs">{tabs}</div><div class="vps">{prof}</div>
<p class="pb">At the end you get a one-page summary of your choices. It goes with your estimate request, so the person who calls you already knows what you picked.</p><a class="btn btn-primary" href="#f">Next: colour {icon("action-arrow-right", 20)}</a></div>
<div class="vis-r"><svg viewBox="0 0 600 640" aria-hidden="true"><path d="M60 250L300 60L540 250V600H60Z" fill="var(--neutral-1)" stroke="var(--steel-9)" stroke-width="6"/>
{''.join(f'<path d="M60 {270 + i * 42}H540" stroke="var(--neutral-6)" stroke-width="3"/>' for i in range(8))}<rect x="250" y="440" width="100" height="160" fill="var(--steel-12)"/></svg></div></div>'''


def f_seam():
    return f'''<div class="fr fr-seam"><div class="sm-img"><img src="{IMG['siding2-a']}" alt=""><div class="sm-b" style="clip-path:inset(0 52% 0 0)"><img src="{IMG['siding2-b']}" alt=""></div>
<div class="seam" style="left:48%"><span class="sh">{icon("trade-seam", 28, "#fff")}</span></div><span class="tag tb">Before</span><span class="tag ta">After</span></div>
<div class="sm-c"><p class="ty-label">177 genuine before/after pairs</p><p class="h2b">Maple Run, Austin.</p><p class="pb">Drag the seam, or scroll through it. The label wipes in step with the photo, as in MERSI's split: one mechanism, carried from the hero.</p></div></div>'''


def f_close():
    return f'''<div class="fr fr-close"><div class="cl-c">{cline(520)}<p class="h1b">Call when you're ready.</p><p class="pb">(512) 550-0000 · Mon–Fri 8–8, Sat 8–6, Sun 12–5</p>
<div class="row"><a class="btn btn-primary" href="#f">Book an estimate {icon("action-arrow-right", 20)}</a><a class="btn btn-secondary" href="#f">{icon("communication-phone", 20)} (512) 550-0000</a></div></div></div>'''


FRAMES = [
    ('Home 1 · Hero (MERSI split, process label)', f_hero, 'Two halves of one job, before on the left and after on the right, cut at the centre. Scroll scrubs to the next job: the left half wipes up from the bottom, the right half wipes down from the top, and the label plate wipes at the same percentage (MERSI, measured live). The plate names the place and steps through the six-step process.'),
    ('Home 3 · The record (Apple numeral event)', f_numeral, 'Pinned. The firm\'s 312 photographed pins fill in as you scroll. The numeral counts only with the dots, and the full locked line always sits under it. "574 more counted" is never shown as a number alone.'),
    ('Home 5 · Wall assembly (Lusion flow, Graza bar)', f_wall, 'B3 dark steel. The course line arrives from the top, the wall builds in crew order, and the line leaves along the base into the next section. This is the page\'s carried object, as Lusion\'s single panel is.'),
    ('Home 6 · Colour as content (Cash App)', f_colour, 'Full-bleed steel fields, one per lightness step. The real colour list waits on the firm. No paint brand is named until it is confirmed.'),
    ('Home 7 · Visualiser entry (Quiet Cubes structure, Rimowa 4-step)', f_vis, 'Configurator-first, like Quiet Cubes\' "Select your pod" gate: the first thing you do is choose. Then four steps: profile → colour → trim → preview. A person on the firm\'s side receives the summary. The summary file is the Cisco mechanism note; it informs the feature only, not the layout. Rimowa itself could not be observed (403) and is held to the annex text.'),
    ('Home 9 · Before/after seam (MERSI seam)', f_seam, 'The same clip-path mechanism as the hero, turned 90°. One seam, draggable and keyboard-operable (arrow keys move it 5%), with the place label in step.'),
    ('Home 11 · Close (Dropbox subtraction)', f_close, 'Everything removed except one line, one sentence, the hours and two actions. The course line ends here, at the last section.'),
]


def storyboard(title, frames, note):
    cells = ''.join(f'<figure class="sbf"><div class="sbs">{svg}</div><figcaption><b>{esc(t)}</b> {esc(d)}</figcaption></figure>' for t, d, svg in frames)
    return f'<div class="sb"><h3>{esc(title)}</h3><div class="sbr">{cells}</div><p class="note">{esc(note)}</p></div>'


def sb_svg(inner):
    return f'<svg viewBox="0 0 160 100" aria-hidden="true">{inner}</svg>'


def sb_hero(p):
    a = 100 * p
    return sb_svg(f'<rect width="80" height="100" fill="var(--neutral-6)"/><rect x="80" width="80" height="100" fill="var(--neutral-5)"/>'
                  f'<rect y="{100 - a:.0f}" width="80" height="{a:.0f}" fill="var(--steel-7)"/><rect x="80" width="80" height="{a:.0f}" fill="var(--steel-6)"/>'
                  f'<rect x="50" y="40" width="60" height="20" fill="var(--steel-12)"/><rect x="50" y="{60 - 20 * p:.0f}" width="60" height="{20 * p:.0f}" fill="var(--steel-9)"/>')


_sbn = [0]


def sb_num(p):
    # the numeral never counts: it is always 312, revealed bottom-up by a clip that tracks the dots (no other figure is shown)
    n = int(312 * p)
    _sbn[0] += 1
    cid = f'sbn{_sbn[0]}'
    return sb_svg(f'<defs><clipPath id="{cid}"><rect x="0" y="{60 - 26 * p:.1f}" width="160" height="{26 * p + 2:.1f}"/></clipPath></defs>'
                  f'<rect width="160" height="100" fill="#fff"/>{dots_svg(160, 100, n, 0.19, "var(--steel-7)", 0.9)}'
                  f'<text x="80" y="58" text-anchor="middle" class="sbn" clip-path="url(#{cid})">312</text>'
                  + ('<text x="80" y="76" text-anchor="middle" class="sbp">312 on the map with photos + 574 more counted</text>' if p >= 1 else ''))


def sb_wall(k):
    parts = ['<rect width="160" height="100" fill="var(--steel-12)"/><path d="M0 6H160" stroke="var(--steel-6)" stroke-width="2"/>']
    if k >= 1: parts.append('<rect x="96" y="10" width="14" height="80" fill="none" stroke="var(--steel-8)"/>')
    if k >= 2: parts.append('<path d="M94 10V90" stroke="var(--steel-9)" stroke-width="2.5"/>')
    if k >= 3: parts.append('<path d="M91 10V90" stroke="var(--steel-7)" stroke-dasharray="2 2"/>')
    for i in range(max(0, k - 3) * 2):
        y = 74 - i * 13
        parts.append(f'<path d="M90 {y}L84 {y + 16}H90Z" fill="var(--steel-6)"/>')
    if k >= 5: parts.append('<path d="M0 94H160" stroke="var(--steel-6)" stroke-width="2"/>')
    return sb_svg(''.join(parts))


def sb_seam(p):
    x = 160 * p
    return sb_svg(f'<rect width="160" height="100" fill="var(--steel-6)"/><rect width="{x:.0f}" height="100" fill="var(--neutral-6)"/><path d="M{x:.0f} 0V100" stroke="#fff" stroke-width="2"/>'
                  f'<circle cx="{x:.0f}" cy="50" r="7" fill="var(--steel-9)" stroke="#fff"/>')


BOARDS = [
    ('Hero split-slider (MERSI)', [(f'{int(p * 100)}%', d, sb_hero(p)) for p, d in [(0, 'Rest on job 1.'), (.25, 'Input starts; halves open toward each other.'), (.5, 'Halfway; the label is half wiped.'), (.75, 'Lerp settles toward the input.'), (1, 'Job 2 at rest; the label reads step 2.')]],
     'Scrubbed by scroll or drag, lerp 0.12 per frame, so no duration applies. There is no autoplay; it stops where the input stops (as in MERSI). Keyboard: arrow keys step one job in 600 ms (--ease-draw). Reduced motion: the jobs switch instantly, and Previous/Next buttons remain.'),
    ('Numeral event (Apple)', [(f'{int(p * 100)}%', d, sb_num(p)) for p, d in [(0, 'Pinned; the map is empty.'), (.25, 'Dots fill in job order; the numeral is revealed, not counted.'), (.5, 'Half the dots; half of 312 is revealed.'), (.8, 'Most dots placed.'), (1, 'All 312 dots; the full locked line is shown.')]],
     'Pinned for 150% of the viewport height, scrubbed by scroll. The numeral is always 312 and is revealed by a clip; it never counts up, so no other figure ever shows. The full locked sentence is in the DOM from the start (screen readers read it once). Reduced motion: 312 and every dot render at once.'),
    ('Wall assembly (Lusion flow)', [(t, d, sb_wall(k)) for k, (t, d) in enumerate([('0', 'Course line arrives.'), ('1', 'Stud.'), ('2', 'Sheathing.'), ('3', 'Wrap (dashed).'), ('5', 'Courses lap bottom-up; the line leaves along the base.')])],
     'Pinned for 250% of the viewport height. Each layer is 1/6 of the scroll range. Boards land with --ease-settle (they overshoot to 1.03, never past 1.05). The course line\'s dashoffset is tied to scroll. One mover at a time.'),
    ('Before/after seam (MERSI seam)', [(f'{int(p * 100)}%', d, sb_seam(p)) for p, d in [(.5, 'Rests at the middle.'), (.3, 'Drag left shows more after.'), (.7, 'Drag right shows more before.'), (.05, 'The ends clamp at 5%.'), (.5, 'Release: no spring-back.')]],
     'clip-path: inset() on the before image. The handle is a 44 px slider with role="slider" and aria-valuenow. Arrow keys move it 5%, Home and End jump to the ends. Under reduced motion it is the same: it moves only when you move it.'),
]

CSS = r'''
*{box-sizing:border-box} body{margin:0;background:var(--color-bg-page);color:var(--color-text-primary);font:400 var(--type-body-size)/1.6 var(--font-text)}
.wrap{max-width:var(--layout-max-width);margin:0 auto;padding:0 var(--layout-gutter)} a{color:var(--color-text-accent)} :focus-visible{outline:3px solid var(--color-focus-ring);outline-offset:3px}
h1{font:800 var(--type-h1-size)/1.05 var(--font-display);margin:var(--space-06) 0 var(--space-05)} h2{font:800 var(--type-h2-size)/1.1 var(--font-display);margin:0 0 var(--space-05)}
h3{font:600 var(--type-label-size)/1.3 var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-secondary);margin:var(--space-08) 0 var(--space-04)}
.ty-label{font:600 var(--type-label-size)/1.3 var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-accent);margin:0 0 var(--space-03)} .on-dark{color:var(--steel-5)}
.note{font-size:var(--type-small-size);color:var(--color-text-secondary);max-width:76ch} .intro{font-size:var(--type-lead-size);color:var(--color-text-secondary);max-width:64ch}
.wm{font:800 23px var(--font-display)} .lk{max-width:100%;height:auto}
.top{padding:var(--space-10) 0 var(--space-08);border-bottom:1px solid var(--color-border-subtle)} .bsec{padding:var(--layout-section-pad) 0;border-bottom:1px solid var(--color-border-subtle)}
.flow{width:100%;height:auto;display:block;min-width:900px} .fwrap{overflow-x:auto;border:1px solid var(--color-border-subtle);padding:var(--space-04)}
.fm-h{font:800 15px var(--font-display);fill:var(--color-text-primary)} .fm-s{font:600 11px var(--font-text);fill:var(--color-text-secondary)}
.fm-box rect{fill:var(--color-bg-page);stroke:var(--color-border-default)} .fm-t{font:600 10.5px var(--font-text);fill:var(--color-text-primary)} .fm-r{font:400 10px var(--font-text);fill:var(--color-text-accent)}
.fm-thread{fill:none;stroke:var(--color-accent-line);stroke-width:3} .fm-j{fill:none;stroke-width:2.5} .fm-j1{stroke:var(--steel-9)} .fm-j2{stroke:var(--neutral-12);stroke-dasharray:6 4}
.fm-b1{fill:var(--steel-9)} .fm-b2{fill:var(--neutral-12)} .fm-bt{font:700 10px var(--font-text);fill:#fff}
.js{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-05);margin-top:var(--space-06)} .js div{border-top:3px solid var(--color-accent-line);padding-top:var(--space-03)}
.nav-model{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-06)}
.frames{display:grid;gap:var(--space-09)} .fbox{margin:0} .fbox figcaption{margin-top:var(--space-03);font-size:var(--type-small-size);color:var(--color-text-secondary);max-width:80ch} .fbox figcaption b{color:var(--color-text-primary)}
.fit{position:relative;width:100%;aspect-ratio:16/10;overflow:hidden;border:1px solid var(--color-border-default)} .fit>.fr{position:absolute;left:0;top:0;width:1440px;height:900px;transform-origin:0 0}
.fr{background:#fff;overflow:hidden} .fr img{width:100%;height:100%;object-fit:cover;display:block}
.btn{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 24px;border-radius:2px;font:600 16px var(--font-text);text-decoration:none;border:2px solid transparent}
.btn-primary{background:var(--color-accent-solid);color:#fff} .btn-secondary{background:#fff;color:var(--color-text-primary);border-color:var(--color-border-control)} .row{display:flex;gap:16px;flex-wrap:wrap}
.fr-hero .half{position:absolute;top:0;bottom:0;width:50%} .fr-hero .l{left:0} .fr-hero .r{right:0}
.fr-hero .hdr{position:absolute;left:0;right:0;top:0;height:76px;background:#fff;display:flex;align-items:center;gap:40px;padding:0 40px;z-index:2}
.hnav{font:600 15px var(--font-text);flex:1} .hcall{display:inline-flex;gap:8px;align-items:center;font:700 16px var(--font-text)}
.plate{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);width:420px;background:var(--color-bg-accent-field);color:#fff;padding:22px 26px;z-index:2}
.plate p{margin:0} .pl-k{font:800 26px var(--font-display)} .pl-s{font:600 15px var(--font-text);margin:6px 0 14px!important} .pl-n{font:600 12px var(--font-text);letter-spacing:.06em;text-transform:uppercase;margin-top:10px!important;color:var(--steel-4)}
.hero-h{position:absolute;left:0;bottom:0;z-index:2;width:640px;background:#fff;padding:36px 40px 40px} .hero-h .ty-label{color:var(--color-text-accent)!important} .h1w{font:800 64px/1.02 var(--font-display);color:var(--color-text-primary);margin:0 0 24px}
.fr-num{background:#fff} .nd{position:absolute;inset:0;width:100%;height:100%} .num-c{position:absolute;left:96px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.94);padding:32px 36px;max-width:620px}
.big{font:800 220px/0.9 var(--font-display);margin:0;letter-spacing:-.03em;color:var(--color-text-primary)} .num-p{font:700 26px/1.3 var(--font-text);margin:12px 0 8px} .num-s{color:var(--color-text-secondary);margin:0}
.fr-wall{background:var(--color-bg-deep)} .wl{position:absolute;inset:0} .wl-t{font:600 18px var(--font-text);letter-spacing:.08em;fill:var(--steel-6)}
.wall-c{position:absolute;left:96px;top:220px;max-width:600px;color:#fff} .h2w{font:800 56px/1.05 var(--font-display);margin:0 0 20px} .pw{font-size:19px;color:var(--steel-3)}
.fr-col .cfs{position:absolute;inset:0;display:grid;grid-template-columns:repeat(6,1fr)} .cf{display:flex;flex-direction:column;justify-content:flex-end;padding:24px;font:700 18px var(--font-text)} .cf-k{font:400 13px var(--font-text);opacity:.85}
.col-c{position:absolute;left:96px;top:96px;background:#fff;padding:32px 36px;max-width:600px} .h2b{font:800 48px/1.08 var(--font-display);margin:0 0 18px} .pb{font-size:18px;color:var(--color-text-secondary);margin:0 0 24px} .h1b{font:800 72px/1.02 var(--font-display);margin:24px 0 16px}
.fr-vis{display:grid;grid-template-columns:1fr 1fr} .vis-l{padding:110px 72px 0 96px} .vis-r{background:var(--color-bg-subtle);display:grid;place-items:center} .vis-r svg{width:70%}
.vtabs{display:flex;gap:4px;margin:28px 0 18px} .vt{flex:1;padding:12px;border-top:3px solid var(--color-border-default);font:600 15px var(--font-text);color:var(--color-text-secondary)} .vt.on{border-color:var(--color-accent-solid);color:var(--color-text-primary)}
.vps{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:24px} .vp{display:flex;align-items:center;gap:12px;padding:16px;border:1px solid var(--color-border-control);font-size:16px} .vp.on{background:var(--color-bg-accent-subtle);box-shadow:inset 0 0 0 2px var(--steel-11)}
.fr-seam .sm-img{position:absolute;left:0;top:0;width:62%;height:100%} .sm-b{position:absolute;inset:0} .seam{position:absolute;top:0;bottom:0;width:3px;background:#fff} .sh{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:56px;height:56px;border-radius:2px;background:var(--color-accent-solid);display:grid;place-items:center}
.tag{position:absolute;bottom:24px;background:var(--color-bg-inverse);color:#fff;font:600 14px var(--font-text);padding:6px 12px} .tb{left:24px} .ta{right:24px}
.sm-c{position:absolute;left:66%;top:220px;right:64px}
.fr-close{display:grid;place-items:center;background:#fff} .cl-c{width:820px}
.sbs svg{width:100%;height:auto;display:block;border:1px solid var(--color-border-subtle)} .sbn{font:800 26px var(--font-display);fill:var(--color-text-primary)} .sbp{font:600 5.6px var(--font-text);fill:var(--color-text-primary)}
.sbr{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:var(--space-04)} .sbf{margin:0} .sbf figcaption{font-size:13px;color:var(--color-text-secondary);margin-top:6px}
@media (max-width:900px){.js,.nav-model{grid-template-columns:minmax(0,1fr)} .sbr{grid-template-columns:repeat(2,minmax(0,1fr))}}
'''

JS = r'''
function fit(){document.querySelectorAll('.fit').forEach(b=>{const f=b.firstElementChild;f.style.transform=`scale(${b.clientWidth/1440})`;});}
addEventListener('resize',fit);document.fonts.ready.then(fit);fit();
'''

NAVMODEL = '''<div class="nav-model">
<div><h3>Routing</h3><p class="note">One HTML file. Each page is a <code>&lt;main data-page&gt;</code> block, and only one is shown at a time. Hash routes: <code>#/</code>, <code>#/siding</code>, <code>#/windows</code>, <code>#/roofing</code>, <code>#/work</code>, <code>#/about</code>, plus section anchors (<code>#/about/booking</code>). Back and forward work through <code>hashchange</code>. On each route: scroll to top, update the title, move focus to the page's h1, and announce the change in a polite live region.</p></div>
<div><h3>Persistent chrome</h3><p class="note">Header: the course-line lockup, the five page links (the current one marked with <code>aria-current</code>), the phone number and one "Book" action. At phone width the links fold into a sheet behind a 44 px button. Footer: B4 field, the office, hours, phone and email, all from the lock.</p></div>
<div><h3>The carrying thread</h3><p class="note">The course line starts in the header lockup and lays itself under each section heading. It runs into the wall drawing and ends at the closing call. Every page opens and closes on it, so six pages read as one journey (Lusion's job in the annex).</p></div></div>'''


def page():
    fm = flowmap()
    js = ''.join(f'<div><p><b>{esc(n)}</b></p><p class="note">{esc(d)}</p></div>' for n, _, d in JOURNEYS)
    frames = ''.join(f'<figure class="fbox"><div class="fit">{fn()}</div><figcaption><b>{esc(t)}.</b> {esc(c)}</figcaption></figure>' for t, fn, c in FRAMES)
    boards = ''.join(storyboard(t, f, n) for t, f, n in BOARDS)
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Flow and Concepts, Phase 3a</title>
<style>{FACES}{TOK}{CSS}</style></head><body>
<header class="top"><div class="wrap"><p class="ty-label">AUSTIN-PROMPT-V2 · Phase 3a</p>{lockup(P["steel-9"], P["neutral-13"], 56, True)}<h1>Flow map, key frames and storyboards</h1>
<p class="intro">Six pages and 41 sections under Muse's structural rule: 3–11 pages, at least 6 sections per page, 11 on the homepage. Every section names its one annex-v3 reference. The key frames are built from the Phase 2 tokens and the firm's own job photos.</p></div></header>
<main>
<section class="bsec" id="flow"><div class="wrap"><p class="ty-label">01 · Flow map</p><h2>Six pages, one thread</h2><div class="fwrap">{fm}</div>
<p class="note">The steel line along the top is the course line, the thread every page carries. Steel badges number the steps of journey J1; black badges number journey J2.</p><div class="js">{js}</div>{NAVMODEL}</div></section>
<section class="bsec" id="frames"><div class="wrap"><p class="ty-label">02 · Concept key frames</p><h2>Seven moments on the homepage</h2><div class="frames">{frames}</div></div></section>
<section class="bsec" id="boards"><div class="wrap"><p class="ty-label">03 · Storyboards</p><h2>Four motions, frame by frame</h2>{boards}</div></section>
</main><script>{JS}</script></body></html>'''


if __name__ == '__main__':
    out = page()
    open(os.path.join(BV2, 'phase3a-flow.html'), 'w', encoding='utf-8').write(out)
    print('wrote phase3a-flow.html', len(out) // 1024, 'KB')

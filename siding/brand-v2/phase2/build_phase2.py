"""AUSTIN-PROMPT-V2, Phase 2: identity asset board for Austin Pro Siding (mark C1 The Profile House).

Writes brand-v2/phase2-identity.html, one standalone file (fonts and the firm's own photo embedded). Every component on
the board reads the tokens in phase2/tokens.css. Raw hex values appear only in the primitive tier and inside the
canvas palettes, which are read from the CSS at runtime.
Sections: mark rules, colour, type, space, icons, motifs, backgrounds, components with states, motion tokens,
cursor companion (3 variants), design dials, exemplar section, generation test.
Run: python3 -I brand-v2/phase2/build_phase2.py"""
import base64, html, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
BV2 = os.path.dirname(HERE)
ROOT = os.path.dirname(BV2)
sys.path.insert(0, HERE)
sys.path.insert(0, BV2)
import marks, tokens  # noqa: E402
from icons import ICONS, icon  # noqa: E402

esc = html.escape
NAME = 'Austin Pro Siding'
P = tokens.PRIM
TOK_CSS = open(os.path.join(HERE, 'tokens.css')).read()


def b64(path, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()


FONTS = [('Montserrat', 700, 'Montserrat-700-latin.woff2'), ('Montserrat', 800, 'Montserrat-800-latin.woff2'),
         ('Inter', 400, 'Inter-400-latin.woff2'), ('Inter', 600, 'Inter-600-latin.woff2'), ('Inter', 700, 'Inter-700-latin.woff2')]
FACES = ''.join(f"@font-face{{font-family:'{f}';font-weight:{w};font-style:normal;font-display:block;"
                f"src:url({b64(os.path.join(BV2, 'fonts', p), 'font/woff2')}) format('woff2')}}" for f, w, p in FONTS)
PHOTO = b64(os.path.join(ROOT, 'site/assets/img/h/work-robroy-a-1000.webp'), 'image/webp')


def mark(fg, bg, size, small=False, label=None):
    a = f' role="img" aria-label="{esc(label)}"' if label else ' aria-hidden="true"'
    return f'<svg class="mk" viewBox="0 0 64 64" width="{size}" height="{size}"{a} focusable="false">{marks.c1(fg, bg, small=small)}</svg>'


def lockup(fg, bg, word, h=48, tail=False, label=True, cls=''):
    a = f' role="img" aria-label="{NAME}"' if label else ' aria-hidden="true"'
    art = marks.c1(fg, bg, tail=230 if tail else 0, cls=' c1-tail' if tail else '')
    return (f'<svg class="lk {cls}" viewBox="0 0 296 64" width="{h * 296 / 64:.0f}" height="{h}"{a} focusable="false">{art}'
            f'<text class="wm" x="78" y="41" fill="{word}">{NAME}</text></svg>')


def sec(id_, num, title, intro, body, cls=''):
    return (f'<section class="bsec {cls}" id="{id_}" aria-labelledby="{id_}-h"><div class="wrap"><p class="eyebrow">{num}</p>'
            f'<h2 id="{id_}-h">{title}</h2>{"<p class=intro>" + intro + "</p>" if intro else ""}{body}</div></section>')


# ------------------------------------------------------------------------------------------------ 1 mark rules
def s_mark():
    cs = f'''<div class="cs"><div class="cs-box">{lockup(P["steel-9"], "#fff", P["neutral-13"], h=96)}</div>
<p class="note">Dashed box: clear space is one course height (1/8 of the mark's height) on every side. Nothing else enters it.</p></div>'''
    mins = f'''<div class="mins"><figure>{mark(P["steel-9"], "#fff", 16, True)}<figcaption>16 px: the variant (two laps, a 7.5-unit line)</figcaption></figure>
<figure>{mark(P["steel-9"], "#fff", 32, True)}<figcaption>32 px: still the variant</figcaption></figure>
<figure>{mark(P["steel-9"], "#fff", 48)}<figcaption>48 px and up: the full mark</figcaption></figure>
<figure>{lockup(P["steel-9"], "#fff", P["neutral-13"], h=24)}<figcaption>24 px: the smallest lockup</figcaption></figure></div>'''
    dont = [('Stretched', f'<svg viewBox="0 0 64 64" width="88" height="56" preserveAspectRatio="none" aria-hidden="true">{marks.c1(P["steel-9"], "#fff")}</svg>'),
            ('Off-palette colour', f'<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">{marks.c1("#C2410C", "#fff")}</svg>'),
            ('Rotated', f'<svg viewBox="0 0 64 64" width="56" height="56" style="transform:rotate(-14deg)" aria-hidden="true">{marks.c1(P["steel-9"], "#fff")}</svg>'),
            ('Steel on steel-8 (fails 3:1)', f'<span style="background:var(--steel-8);display:inline-grid;padding:6px"><svg viewBox="0 0 64 64" width="44" height="44" aria-hidden="true">{marks.c1(P["steel-9"], P["steel-8"])}</svg></span>')]
    donts = ''.join(f'<figure class="dont">{d}<figcaption><b>Don\'t:</b> {esc(t)}</figcaption></figure>' for t, d in dont)
    surf = (f'<div class="surf"><div style="background:#fff">{lockup(P["steel-9"], "#fff", P["neutral-13"], h=40)}</div>'
            f'<div style="background:var(--color-bg-accent-field)">{lockup("#fff", P["steel-9"], "#fff", h=40)}</div>'
            f'<div style="background:var(--color-bg-deep)">{lockup("#fff", P["steel-12"], "#fff", h=40)}</div>'
            f'<div style="background:#000">{lockup("#fff", "#000", "#fff", h=40)}</div>'
            f'<div style="background:#fff">{lockup("#000", "#fff", "#000", h=40)}</div>'
            f'<div style="background:#fff">{lockup(P["steel-9"], "#fff", P["neutral-13"], h=40, tail=True)}</div></div>')
    body = (f'<div class="g2">{cs}<div><h3>Approved surfaces</h3>{surf}<p class="note">The last lockup above is the course-line lockup: the mark\'s own line runs on under the name. It is used once per page, in the header.</p></div></div>'
            f'<h3>Minimum sizes</h3>{mins}<h3>Misuse</h3><div class="donts">{donts}</div>')
    return sec('mark', '01 · Mark', 'The mark and its rules',
               'C1 The Profile House, picked at the Phase 1 gate. The mark is one line: a house whose left wall shows the lapped boards, as a sided wall does when cut at the corner.', body)


# ------------------------------------------------------------------------------------------------ 2 colour
def s_colour():
    def ramp(name, n):
        cells = ''.join(f'<div class="sw" style="background:var(--{name}-{i})"><span>{i}</span><code>{P[f"{name}-{i}"]}</code></div>' for i in range(1, n + 1))
        return f'<div class="ramp" aria-label="{name} ramp">{cells}</div>'
    roles = ''.join(f'<tr><td><span class="chip" style="background:var(--color-{n})"></span></td><td><code>--color-{n}</code></td><td>{p}</td><td>{esc(d)}</td></tr>' for n, p, d in tokens.SEM)
    pairs = ''.join(f'<tr data-fg="{fg}" data-bg="{bg}" data-need="{need}"><td><span class="pp" style="color:var(--color-{fg});background:var(--color-{bg})">Aa</span></td>'
                    f'<td>{fg} on {bg}</td><td>{esc(what)}</td><td class="m">…</td><td>{need}:1</td><td class="r">…</td></tr>' for fg, bg, need, what in tokens.PAIRS)
    prop = '<div class="prop" aria-label="Colour proportion"><div style="flex:70;background:#fff">White 70</div><div style="flex:14;background:var(--neutral-2)">Neutral 14</div><div style="flex:10;background:var(--steel-9);color:#fff">Steel 10</div><div style="flex:6;background:var(--neutral-13);color:#fff">Black 6</div></div>'
    body = (f'<h3>Ramps (OKLCH hue 248, Radix 12 steps)</h3>{ramp("steel", 12)}{ramp("neutral", 13)}'
            f'<h3>Proportion on a page</h3>{prop}<p class="note">Light-dominant. There is one steel field per page (colour as content), and the filled steel action appears once per view.</p>'
            f'<h3>Semantic roles</h3><div class="tw"><table class="t"><thead><tr><th></th><th>Token</th><th>Primitive</th><th>Job</th></tr></thead><tbody>{roles}</tbody></table></div>'
            f'<h3>Contrast, re-measured in the browser</h3><p class="note">Each row reads the computed colours of its own sample and computes the WCAG 2 ratio live. The same pairs are computed from token values in phase2/contrast-pairs.md.</p>'
            f'<div class="tw"><table class="t" id="pairs"><thead><tr><th>Sample</th><th>Pair</th><th>Use</th><th>Measured</th><th>Needs</th><th>Result</th></tr></thead><tbody>{pairs}</tbody></table></div>'
            f'<p id="pairs-sum" class="note"></p>')
    return sec('colour', '02 · Colour', 'Black, white and steel',
               'One accent ramp and one neutral ramp, both at the same hue so the greys read as steel and concrete. There are no status colours: an error is carried by an icon and words in neutral ink.', body)


# ------------------------------------------------------------------------------------------------ 3 type
def s_type():
    rows = []
    for r, st, fam, w, lh, tr, use in tokens.TYPE_ROLES:
        lo, hi, _ = tokens.STEPS[st]
        sample = {'display': 'Laid by hand.', 'h1': 'Siding and painting', 'h2': 'Every course, level', 'h3': 'Windows and doors',
                  'lead': 'Four courses up the corner, each one lapped over the last.', 'body': 'Running text sits in Inter at 16 to 18 px, line height 1.6, measure 60 to 70 characters.',
                  'label': 'Services', 'small': 'Rob Roy, Austin. The firm\'s own job photo.'}[r]
        rows.append(f'<tr><td><code>{r}</code><br><span class="note">step {st} · {lo:.1f}–{hi:.1f} px · {w} · {lh}</span></td><td><p class="ty-{r}" style="margin:0">{esc(sample)}</p></td></tr>')
    body = (f'<p class="note">The fluid scale runs from 360 px (base 16, ratio 1.2) to 1440 px (base 18, ratio 1.25) with clamp() (Utopia method, S1433). Montserrat 800 sets display; Inter sets text. Both are everyday fonts. Figures use tabular numerals.</p>'
            f'<div class="tw"><table class="t ty">{"".join(rows)}</table></div>')
    return sec('type', '03 · Type', 'Montserrat for the name, Inter for the reading', None, body)


# ------------------------------------------------------------------------------------------------ 4 space
def s_space():
    bars = ''.join(f'<div class="sp"><code>--space-{i + 1:02d}</code><span class="bar" style="width:var(--space-{i + 1:02d})"></span><span>{v} px · {u}</span></div>' for i, (v, u) in enumerate(zip(tokens.SPACE, tokens.SPACE_USE)))
    lay = ''.join(f'<tr><td><code>--layout-{n}</code></td><td>{esc(v)}</td><td>{esc(d)}</td></tr>' for n, v, d in tokens.LAYOUT)
    body = f'<div class="spaces">{bars}</div><h3>Layout</h3><table class="t">{lay}</table><p class="note">Radius: 0 by default (siding is cut square), 2 px on buttons, inputs and tiles.</p>'
    return sec('space', '04 · Space', 'A Carbon ladder from a 4 px base', None, body)


# ------------------------------------------------------------------------------------------------ 5 icons
def s_icons():
    cells = ''.join(f'<figure class="icn">{icon(n, 32)}<span>{icon(n, 24)}{icon(n, 16)}</span><figcaption>{n}</figcaption></figure>' for n in ICONS)
    body = (f'<p class="note">A closed set of {len(ICONS)} icons, drawn tonight on a 24-unit grid: 2-unit stroke, butt caps, mitred corners, so they share the mark\'s cut-square corners. Every icon has a text label or is aria-hidden, and every tap target is 44 px. Shown at 32, 24 and 16 px.</p>'
            f'<div class="icons">{cells}</div>')
    return sec('icons', '05 · Icons', 'One set, square-cornered like the mark', None, body)


# ------------------------------------------------------------------------------------------------ 6 motifs
def course_line(w=600, cls='', color='var(--color-accent-line)'):
    """the course line: starts with one lap step (the mark's wall) then runs level. Drawn on with dashoffset"""
    return (f'<svg class="cline {cls}" viewBox="0 0 {w} 24" width="100%" height="24" preserveAspectRatio="none" aria-hidden="true">'
            f'<path d="M2 22.5L8 2H16V13H{w}" fill="none" stroke="{color}" stroke-width="3" stroke-linejoin="miter" '
            f'vector-effect="non-scaling-stroke" pathLength="1"/></svg>')


def lap_band(w=1200, h=40, color='var(--color-border-default)'):
    """lap profile in section, laid on its side: the divider between two sections"""
    n, d = 30, []
    step = w / n
    for i in range(n):
        x = i * step
        d.append(f'M{x:.1f} {h - 6}L{x + step:.1f} {h - 14}V{h - 6}')
    return f'<svg class="lapband" viewBox="0 0 {w} {h}" width="100%" height="{h}" preserveAspectRatio="none" aria-hidden="true"><path d="{"".join(d)}" fill="none" stroke="{color}" stroke-width="2"/></svg>'


def s_motifs():
    body = f'''<div class="motifs">
<figure><div class="mstage">{course_line(cls="draw")}</div><figcaption><b>Course line.</b> The mark's line, carried on: one lap step, then level. Under section headings it lays itself left to right in 600 ms (--ease-draw), once, when the heading enters.</figcaption></figure>
<figure><div class="mstage">{lap_band()}</div><figcaption><b>Lap band.</b> The wall in section, laid flat: a divider between sections. Hairline, decorative.</figcaption></figure>
<figure><div class="mstage courses"></div><figcaption><b>Shadow-line field.</b> The wall face: courses with a shadow under each butt edge. A quiet texture behind text.</figcaption></figure>
<figure><div class="mstage"><div class="cut-frame"><img src="{PHOTO}" alt="Lap siding on a two-storey house in Rob Roy, Austin, after the firm's work" width="1000" height="667"><span class="cap">Rob Roy, Austin. The firm's own job photo.</span></div></div><figcaption><b>Corner cut.</b> Photos are cut square and carry one mitred corner bracket, the mark's corner. Captions give the place only.</figcaption></figure>
</div>'''
    return sec('motifs', '06 · Motifs', 'Drawn from the wall, not added to it', None, body)


# ------------------------------------------------------------------------------------------------ 7 backgrounds
def s_backgrounds():
    bp = blueprint()
    return f'''<section class="bsec" id="backgrounds" aria-labelledby="bg-h"><div class="wrap"><p class="eyebrow">07 · Backgrounds</p><h2 id="bg-h">Four full-section backgrounds</h2>
<p class="intro">Each one is a whole section, shown with real content on it. Text on every background is measured against the brightest value the field can reach.</p></div>
<div class="bg bg-courses"><div class="wrap bgc"><p class="eyebrow">B1 · Course field · light</p><p class="bg-h">The wall face, at rest.</p><p>Courses in white and neutral-1, with a neutral-3 shadow under each butt. Static CSS. Text-primary on the darkest band: 14.76:1.</p></div></div>
<div class="bg bg-dither"><canvas class="dither" aria-hidden="true"></canvas><div class="wrap bgc"><p class="eyebrow on-dark">B2 · Steel field, ordered dither</p><p class="bg-h">Colour as content.</p><p>A Bayer 4×4 dither (S1372), drawn only between steel-9 and steel-12, so white text is at worst 5.96:1. The field drifts slowly and stops under reduced motion, or when off screen or the tab is hidden.</p></div></div>
<div class="bg bg-blue">{bp}<div class="wrap bgc"><p class="eyebrow on-dark">B3 · Section drawing · dark steel</p><p class="bg-h">How the wall goes together.</p><p>The wall drawn in section as a technical sheet: stud, sheathing, wrap, lapped boards, with dimension ticks. It sets up the wall-assembly chapter.</p></div></div>
<div class="bg bg-atmos"><canvas class="atmos" aria-hidden="true"></canvas><div class="wrap bgc"><p class="eyebrow on-dark">B4 · Evening field · close</p><p class="bg-h">Call when the light's still good.</p><p>Vertical light folds in steel over steel-12, with the glow pooling lower right (S1364). It is reserved for the last section and the footer. The fold brightness is capped so white text stays at or above 5.96:1.</p></div></div>
</section>'''


def blueprint():
    """B3 art: the wall in section, as a drawing. Stud, sheathing, wrap, five lapped boards, dimension ticks."""
    s = []
    x0 = 860
    s.append(f'<rect x="{x0}" y="40" width="90" height="420" fill="none" stroke="var(--steel-10)" stroke-width="2"/>')        # stud
    s.append(f'<path d="M{x0 - 4} 40V460" stroke="var(--steel-9)" stroke-width="8"/>')                                           # sheathing
    s.append(f'<path d="M{x0 - 11} 40V460" stroke="var(--steel-8)" stroke-width="2" stroke-dasharray="6 5"/>')                    # wrap
    for i in range(6):
        y = 60 + i * 68
        s.append(f'<path d="M{x0 - 14} {y}L{x0 - 32} {y + 80}H{x0 - 14}Z" fill="none" stroke="var(--steel-7)" stroke-width="2" stroke-linejoin="miter"/>')
    s.append(f'<path d="M{x0 - 60} 60V128M{x0 - 66} 60H{x0 - 54}M{x0 - 66} 128H{x0 - 54}" stroke="var(--steel-7)" stroke-width="1.5"/>')
    s.append(f'<text x="{x0 - 72}" y="98" text-anchor="end" class="bp-t">EXPOSURE</text>')
    for y, t, ex in [(84, 'STUD', x0 + 45), (150, 'SHEATHING', x0 - 4), (216, 'WRAP', x0 - 11), (290, 'LAP BOARD', x0 - 22)]:
        s.append(f'<path d="M{ex} {y}H{x0 + 150}" stroke="var(--steel-8)" stroke-width="1.5"/><circle cx="{ex}" cy="{y}" r="3.5" fill="var(--steel-6)"/>'
                 f'<text x="{x0 + 160}" y="{y + 5}" class="bp-t">{t}</text>')
    return f'<svg class="bp" viewBox="0 0 1240 500" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">{"".join(s)}</svg>'


# ------------------------------------------------------------------------------------------------ 8 components
def s_components():
    btns = f'''<div class="row">
<a class="btn btn-primary" href="#components">Book an estimate {icon("action-arrow-right", 20)}</a>
<a class="btn btn-primary is-hover" href="#components" tabindex="-1">Hover</a>
<a class="btn btn-primary is-focus" href="#components" tabindex="-1">Focus</a>
<a class="btn btn-primary is-active" href="#components" tabindex="-1">Pressed</a>
<button class="btn btn-primary" type="button" disabled>Disabled</button></div>
<div class="row"><a class="btn btn-secondary" href="tel:+15125500000">{icon("communication-phone", 20)} (512) 550-0000</a>
<a class="btn btn-secondary is-hover" href="#components" tabindex="-1">Hover</a><a class="btn btn-secondary is-focus" href="#components" tabindex="-1">Focus</a>
<a class="lnk" href="#components">See the work on the map {icon("action-arrow-up-right", 16)}</a></div>
<p class="note">One filled primary per view (S0071). Secondary actions are neutral with a 6:1 edge. Every control is 48 px tall, above the 44 px minimum (S1441).</p>'''
    form = f'''<form class="frm" novalidate onsubmit="return false">
<div class="fld"><label for="f-name">Your name</label><input id="f-name" autocomplete="name" placeholder=" "></div>
<div class="fld is-error"><label for="f-phone">Phone</label><input id="f-phone" type="tel" autocomplete="tel" aria-invalid="true" aria-describedby="f-phone-e" value="512 55"><p class="err" id="f-phone-e">{icon("action-close", 16)} <b>Check:</b> the number looks short. Use 10 digits, like 512 550 0000.</p></div>
<fieldset class="fld"><legend>What needs doing</legend><div class="chips">
<label class="chip-in"><input type="checkbox" checked> {icon("trade-siding", 20)} Siding</label><label class="chip-in"><input type="checkbox"> {icon("trade-paint", 20)} Painting</label>
<label class="chip-in"><input type="checkbox"> {icon("trade-window", 20)} Windows</label><label class="chip-in"><input type="checkbox"> {icon("trade-roof", 20)} Roofing</label></div></fieldset>
<p class="note">Errors carry an icon, the word "Check" and a 2 px border in neutral ink, never colour alone (S1439). This form is a specimen: it does not send or save anything, and nothing on the site will say it did.</p></form>'''
    card = f'''<article class="jcard"><div class="cut-frame"><img src="{PHOTO}" alt="Lap siding on a two-storey house in Rob Roy, Austin" width="1000" height="667"></div>
<div class="jc-b"><p class="label">Siding</p><h3 class="ty-h3">Rob Roy, Austin</h3><p class="small">The firm's own job photo.</p></div></article>'''
    stats = '''<dl class="stats"><div><dt>Reviews</dt><dd><span class="num">4.9</span> stars from 474 reviews</dd></div>
<div><dt>Jobs</dt><dd>312 on the map with photos + 574 more counted</dd></div><div><dt>In Austin</dt><dd>Since 2009; merged 2018</dd></div></dl>
<ul class="creds"><li>GAF Master Elite</li><li>James Hardie Elite Preferred + President's Club 2025</li><li>Andersen Certified Premier</li><li>BBB A+</li></ul>
<p class="note">Facts appear only in their locked wording. Credentials are set as text; no third-party logos.</p>'''
    acc = f'''<div class="acc"><details open><summary>How long does a siding job take? {icon("action-plus", 20)}</summary><p>Specimen accordion: the answer text sits here at body size. Real answers come from the firm in the build phase.</p></details>
<details><summary>Do you paint as well? {icon("action-plus", 20)}</summary><p>Specimen.</p></details></div>'''
    nav = f'''<div class="navbar"><a href="#components" class="nb-logo" aria-label="{NAME}, home">{lockup(P["steel-9"], "#fff", P["neutral-13"], h=32, label=False)}</a>
<nav aria-label="Specimen"><a href="#components">Siding &amp; painting</a><a href="#components">Windows &amp; doors</a><a href="#components">Roofing</a><a href="#components">Our work</a><a href="#components">About</a></nav>
<a class="btn btn-primary btn-sm" href="#components">Book</a></div>'''
    body = (f'<h3>Navigation bar</h3>{nav}<h3>Actions and their states</h3>{btns}<div class="g2"><div><h3>Form</h3>{form}</div>'
            f'<div><h3>Job card</h3>{card}<h3>Proof</h3>{stats}<h3>Accordion</h3>{acc}</div></div>')
    return sec('components', '08 · Components', 'Component inventory, with states', None, body)


# ------------------------------------------------------------------------------------------------ 9 motion
def s_motion():
    rows = ''.join(f'<tr><td><code>--duration-{n}</code></td><td>{v} ms</td><td>{esc(d)}</td><td><button class="btn btn-secondary btn-sm mdemo" type="button" data-d="{v}" data-e="enter">Play</button></td></tr>' for n, v, d in tokens.MOTION)
    eas = ''.join(f'<tr><td><code>--ease-{n}</code></td><td><code>{esc(v)}</code></td><td>{esc(d)}</td><td><button class="btn btn-secondary btn-sm mdemo" type="button" data-d="600" data-e="{n}">Play</button></td></tr>' for n, v, d in tokens.EASE)
    body = f'''<div class="g2"><div><table class="t">{rows}</table><table class="t">{eas}</table></div>
<div><div class="mtrack" aria-hidden="true"><span class="board"></span></div>
<p class="note">Principles:</p><ul class="note"><li><b>One mover per view.</b> In the header it is the logo draw; in a section it is the course line laying itself.</li><li><b>Physical.</b> A board lands, a line is laid, a cut runs. No spins, pulses or floating.</li><li><b>Quick.</b> UI feedback 100–200 ms; one authored moment per view up to 600 ms; the sum stays under 700 ms.</li><li><b>Composite only.</b> transform, opacity and stroke-dashoffset.</li><li><b>Reduced motion.</b> Every duration token is 0 ms at :root; final states render at once.</li></ul>
<p class="note">Nothing loops. Nothing animates on its own after it has arrived, except the B2 and B4 fields, which drift slowly and stop under reduced motion.</p></div></div>'''
    return sec('motion', '09 · Motion', 'Motion tokens', None, body)


# ------------------------------------------------------------------------------------------------ 10 cursor companion
def s_cursor():
    body = f'''<div class="cc-ctl" role="radiogroup" aria-label="Companion variant">
<label><input type="radio" name="ccv" value="a" checked> A · Course tick (recommended)</label><label><input type="radio" name="ccv" value="b"> B · Corner bracket</label><label><input type="radio" name="ccv" value="c"> C · Lap chip</label></div>
<div class="cc-stage" id="cc-stage"><div class="cc-targets"><a class="btn btn-primary" href="#cursor" data-cc>Book an estimate</a><a class="btn btn-secondary" href="#cursor" data-cc>{icon("communication-phone", 20)} (512) 550-0000</a><a class="lnk" href="#cursor" data-cc>See the work on the map</a></div>
<div class="cc" id="cc" aria-hidden="true"><span class="cc-a"></span><span class="cc-b"><i></i><i></i><i></i><i></i></span><svg class="cc-c" viewBox="0 0 14 24"><path d="M5 0H9L14 24H0Z" fill="var(--color-accent-solid)"/></svg></div>
<p class="cc-touch note">Touch screen: there is no companion on touch. It appears only with a fine pointer.</p></div>
<div class="g3"><div><h3>A · Course tick</h3><p class="note">A 10 px steel square follows the pointer with a short lag (lerp 0.22 per frame). Over a link or button it stretches into a 3 px course line under the target and lays itself across the target's width (200 ms, --ease-draw). A press compresses it to 0.92. It explains the brand's thread on every hover.</p></div>
<div><h3>B · Corner bracket</h3><p class="note">Four mitred corners, 16 px apart when idle. Over a target they open to the target's box plus 6 px (200 ms, --ease-enter), framing it as photos are framed. Clear, but it competes with the focus ring.</p></div>
<div><h3>C · Lap chip</h3><p class="note">A single board in section (a wedge) trails the pointer and tilts with horizontal speed, capped at ±12°. Over a target it lands level with a small settle (--ease-settle). The most characterful, and the most distracting while reading.</p></div></div>
<p class="note"><b>Rules for all three.</b> The system cursor is never hidden. The companion is <code>pointer-events: none</code> and aria-hidden, and moves by transform only. It is off when <code>(pointer: coarse)</code> matches. Under reduced motion it snaps, with no lag, tilt or stretch.</p>
<p class="note"><b>Pick: A.</b> It is the only one whose behaviour is the brand's own drawing (the course line). B overlaps the focus ring's job. C pulls the eye while you read.</p>'''
    return sec('cursor', '10 · Cursor companion', 'A companion that lays the course line', None, body)


# ------------------------------------------------------------------------------------------------ 11 dials
def s_dials():
    D = [('Design variance', 4, 'A structured grid with one asymmetric move per section (a split hero, an offset photo). The trade sells level and plumb, so the layout should look measured.'),
         ('Motion intensity', 5, 'One authored mover per view (the logo draw, the course line), plus the before/after seam and the map. No ambient motion except two slow background fields.'),
         ('Visual density', 4, 'Airy, with facts set plainly. Proof lives in the photos and the map, not in packed stat walls.')]
    rows = ''.join(f'<div class="dial"><p><b>{n}</b> <span class="num">{v} / 10</span></p><div class="dbar"><span style="width:{v * 10}%"></span></div><p class="note">{esc(t)}</p></div>' for n, v, t in D)
    return sec('dials', '11 · Design dials', 'Set before any page is drawn (S0651)', None, f'<div class="g3">{rows}</div>')


# ------------------------------------------------------------------------------------------------ 12 exemplar
def s_exemplar():
    cards = [('trade-siding', 'Siding & painting', 'Siding replacement and repair, and exterior painting.'),
             ('trade-window', 'Windows & doors', 'Window and door replacement.'),
             ('trade-roof', 'Roofing, gutters & patio covers', 'Roofs, gutters and covered patios.')]
    cc = ''.join(f'<a class="svc" href="#exemplar"><span class="svc-i">{icon(i, 32)}</span><h3 class="ty-h3">{esc(t)}</h3><p>{esc(d)}</p><span class="svc-go">{icon("action-arrow-right", 24)}</span></a>' for i, t, d in cards)
    body = f'''<div class="ex"><p class="label ex-l">Services</p><h3 class="ty-h2 ex-h">Start with the part of the house.</h3>{course_line(cls="draw ex-line")}
<div class="svcs">{cc}</div><div class="row"><a class="btn btn-primary" href="#exemplar">Book an estimate {icon("action-arrow-right", 20)}</a><a class="btn btn-secondary" href="tel:+15125500000">{icon("communication-phone", 20)} (512) 550-0000</a></div></div>
<p class="note">Built only from tokens and the components above: no new value was introduced. This is homepage section 4 (services router), as a test that the system can build a real section. Hick's law: three choices, one primary action (S1444).</p>'''
    return sec('exemplar', '12 · Exemplar build', 'One real section, from tokens only', None, body)


# ------------------------------------------------------------------------------------------------ 13 generation test
def s_gentest():
    sign = f'''<figure class="gt gt-sign"><div class="sign">{mark("#fff", P["steel-9"], 92, label=NAME)}<p class="sg-n">{NAME}</p><p class="sg-p">(512) 550-0000</p></div><figcaption>Yard sign, 18×24 in. Steel field, white mark and name, phone number in Inter 700.</figcaption></figure>'''
    van = f'''<figure class="gt"><div class="van"><svg viewBox="0 0 520 220" aria-hidden="true"><path d="M20 40H330L420 110H500V190H20Z" fill="#fff" stroke="var(--neutral-8)" stroke-width="3"/><circle cx="110" cy="190" r="28" fill="var(--neutral-12)"/><circle cx="410" cy="190" r="28" fill="var(--neutral-12)"/><path d="M20 150H500" stroke="var(--steel-9)" stroke-width="5"/></svg>
<div class="van-l">{lockup(P["steel-9"], "#fff", P["neutral-13"], h=34)}<p>(512) 550-0000</p></div></div><figcaption>Van door. White van; the course line runs the van's length at sill height; one lockup and the phone number.</figcaption></figure>'''
    card = f'''<figure class="gt"><div class="bcard"><div>{lockup(P["steel-9"], "#fff", P["neutral-13"], h=28)}</div><div class="bc-t"><p>(512) 550-0000<br>info@austinprosiding.com</p><p>7801 N Lamar Blvd Suite C70<br>Austin TX 78752</p></div>{course_line(300)}</div><figcaption>Business card, 3.5×2 in. Every line is from the facts lock.</figcaption></figure>'''
    sig = f'''<figure class="gt"><div class="sig"><p><b>[Person's name]</b> · [role]<br>Austin Pro Siding</p>{course_line(240)}<p>(512) 550-0000 · info@austinprosiding.com<br>Mon–Fri 8–8, Sat 8–6, Sun 12–5</p></div><figcaption>Email signature. Text-only, so it survives mail clients; the course line is an image or a 2 px border.</figcaption></figure>'''
    fav = f'''<figure class="gt"><div class="favs">{mark(P["steel-9"], "#fff", 16, True)}{mark(P["steel-9"], "#fff", 32, True)}<span class="tile">{mark("#fff", P["steel-9"], 128)}</span></div><figcaption>Favicons at 16 and 32 px (the variant), and the 180 px touch icon (white on a steel tile, 2 px radius).</figcaption></figure>'''
    nf = f'''<figure class="gt"><div class="nf"><p class="label">404</p><p class="ty-h3">That page isn't on the wall.</p>{course_line(300)}<p><a class="lnk" href="#gentest">Back to the start {icon("action-arrow-right", 16)}</a></p></div><figcaption>Not-found block.</figcaption></figure>'''
    gaps = '''<ol class="note"><li><b>Email signature:</b> the brand document had no rule for a person's name and role. Added: Inter 700 name, Inter 400 role, no title case.</li>
<li><b>Van:</b> the document did not say where the course line sits on a vehicle. Added: at sill height, the full length, steel-9, and never crossing a door handle.</li>
<li><b>Business card:</b> no rule said which facts go on print. Added: phone, email and address only. Ratings and credentials are left off print because they date.</li>
<li><b>Touch icon:</b> the tile radius was undefined at 180 px. Added: radius-sm (2 px) on every tile, at every size.</li>
<li><b>404:</b> nothing was missing. Voice, type and the course line covered it.</li></ol>'''
    body = (f'<p class="intro">The test: make six new things using only BRAND.md and the tokens, and log every decision the documents didn\'t answer. Each gap is now a rule in BRAND.md.</p>'
            f'<div class="gts">{sign}{van}{card}{sig}{fav}{nf}</div><h3>Gaps the test found (all now closed in BRAND.md)</h3>{gaps}')
    return sec('gentest', '13 · Generation test', 'Six new things, from the documents alone', None, body)


CSS = r'''
*{box-sizing:border-box} html{-webkit-text-size-adjust:100%;scroll-behavior:smooth} @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
body{margin:0;background:var(--color-bg-page);color:var(--color-text-primary);font:var(--type-body-weight) var(--type-body-size)/var(--type-body-leading) var(--font-text);font-variant-numeric:tabular-nums}
.wrap{max-width:var(--layout-max-width);margin:0 auto;padding:0 var(--layout-gutter)}
a{color:var(--color-text-accent)} :focus-visible{outline:3px solid var(--color-focus-ring);outline-offset:3px}
h1,h2,.ty-display,.ty-h1,.ty-h2{font-family:var(--font-display);font-weight:800}
h1{font-size:var(--type-h1-size);line-height:var(--type-h1-leading);letter-spacing:var(--type-h1-tracking);margin:0 0 var(--space-05)}
h2{font-size:var(--type-h2-size);line-height:var(--type-h2-leading);letter-spacing:var(--type-h2-tracking);margin:0 0 var(--space-05)}
h3{font:600 var(--type-label-size)/1.3 var(--font-text);letter-spacing:var(--type-label-tracking);text-transform:uppercase;color:var(--color-text-secondary);margin:var(--space-08) 0 var(--space-04)}
.ty-display{font-size:var(--type-display-size);line-height:var(--type-display-leading);letter-spacing:var(--type-display-tracking)}
.ty-h1{font-size:var(--type-h1-size);line-height:var(--type-h1-leading);letter-spacing:var(--type-h1-tracking)}
.ty-h2,h3.ty-h2{font:800 var(--type-h2-size)/var(--type-h2-leading) var(--font-display);letter-spacing:var(--type-h2-tracking);margin:0;text-transform:none;color:var(--color-text-primary)}
.ty-h3{font:700 var(--type-h3-size)/var(--type-h3-leading) var(--font-display);margin:0;text-transform:none;letter-spacing:0;color:var(--color-text-primary)}
.ty-lead{font-size:var(--type-lead-size);line-height:var(--type-lead-leading)} .ty-body{font-size:var(--type-body-size)}
.ty-label,.label,.eyebrow{font:600 var(--type-label-size)/1.3 var(--font-text);letter-spacing:var(--type-label-tracking);text-transform:uppercase;color:var(--color-text-accent);margin:0 0 var(--space-03)}
.ty-small,.small,.note{font-size:var(--type-small-size);line-height:var(--type-small-leading);color:var(--color-text-secondary)}
.note{max-width:72ch} .intro{font-size:var(--type-lead-size);max-width:62ch;color:var(--color-text-secondary)}
.wm{font:800 23px var(--font-display);letter-spacing:-.01em} .lk{max-width:100%;height:auto} .cs-box{max-width:100%}
.top{padding:var(--space-11) 0 var(--space-09);border-bottom:1px solid var(--color-border-subtle)}
.toc{display:flex;flex-wrap:wrap;gap:var(--space-03) var(--space-05);margin-top:var(--space-07);padding:0;list-style:none}
.toc a{display:inline-flex;min-height:44px;align-items:center;text-decoration:none;font-weight:600}
.bsec{padding:var(--layout-section-pad) 0;border-bottom:1px solid var(--color-border-subtle)}
.g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-08)} .g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-07)}
.row{display:flex;flex-wrap:wrap;gap:var(--space-04);align-items:center;margin:var(--space-04) 0}
.cs-box{display:inline-block;padding:12px;outline:2px dashed var(--color-border-control);outline-offset:0}
.surf{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-03)} .surf>div{padding:var(--space-05);display:grid;place-items:center;border:1px solid var(--color-border-subtle)}
.mins{display:flex;flex-wrap:wrap;gap:var(--space-07);align-items:flex-end} .mins figure,.donts figure{margin:0;display:flex;flex-direction:column;gap:var(--space-03);align-items:flex-start}
.mins figcaption,.donts figcaption{font-size:var(--type-small-size);color:var(--color-text-secondary);max-width:22ch}
.donts{display:flex;flex-wrap:wrap;gap:var(--space-07)} .dont>svg,.dont>span{border-bottom:3px solid var(--color-error-ink)}
.ramp{display:grid;grid-template-columns:repeat(13,minmax(0,1fr));gap:2px;margin-bottom:var(--space-03)}
.sw{min-height:84px;padding:6px;display:flex;flex-direction:column;justify-content:space-between;font-size:11px}
.ramp .sw:nth-child(n+9) span,.ramp .sw:nth-child(n+9) code{color:#fff} .sw code{font-size:10px}
.prop{display:flex;height:56px;border:1px solid var(--color-border-default);font-size:12px;font-weight:600} .prop>div{display:flex;align-items:flex-end;padding:6px}
.tw{overflow-x:auto} .t{border-collapse:collapse;width:100%;font-size:var(--type-small-size)} .t th,.t td{text-align:left;vertical-align:top;padding:8px 10px;border-top:1px solid var(--color-border-subtle)}
.t th{font-weight:700} .chip{display:inline-block;width:28px;height:28px;border:1px solid var(--color-border-default)}
.pp{display:inline-block;padding:4px 10px;font-weight:700;border:1px solid var(--color-border-subtle)} .ok{color:var(--color-text-accent);font-weight:700} .bad{font-weight:700;text-decoration:underline}
.ty td:first-child{width:24%}
.spaces{display:grid;gap:6px} .sp{display:grid;grid-template-columns:110px 170px 1fr;align-items:center;gap:var(--space-04);font-size:var(--type-small-size)} .bar{display:block;height:12px;background:var(--color-accent-solid)}
.icons{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:var(--space-04)} .icn{margin:0;padding:var(--space-05) var(--space-03);border:1px solid var(--color-border-subtle);display:flex;flex-direction:column;align-items:center;gap:var(--space-03)}
.icn span{display:flex;gap:var(--space-04);align-items:center} .icn figcaption{font-size:12px;color:var(--color-text-secondary)}
.motifs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-07)} .motifs figure{margin:0} .motifs figcaption{font-size:var(--type-small-size);color:var(--color-text-secondary);margin-top:var(--space-03)}
.mstage{min-height:180px;border:1px solid var(--color-border-subtle);display:grid;place-items:center;padding:var(--space-06);overflow:hidden}
.bg-courses::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--color-bg-page) 0 38%,transparent 62%)}
.courses,.bg-courses{background:repeating-linear-gradient(180deg,var(--neutral-1) 0 31px,var(--neutral-3) 31px 34px,var(--white) 34px 65px,var(--neutral-3) 65px 68px)}
.cline{display:block;max-width:600px} .lapband{display:block}
.cut-frame{position:relative;margin:0} .cut-frame img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover}
.cut-frame::before{content:"";position:absolute;left:-8px;top:-8px;width:28px;height:28px;border-left:3px solid var(--color-accent-line);border-top:3px solid var(--color-accent-line)}
.cap{position:absolute;left:0;bottom:0;background:var(--color-bg-inverse);color:var(--color-text-inverse);font-size:13px;padding:6px 10px}
.bg{position:relative;overflow:hidden;min-height:440px;display:flex;align-items:center} .bgc{position:relative;z-index:1;padding:var(--space-11) var(--layout-gutter);width:100%}
.bgc p{max-width:52ch} .bg-h{font:800 var(--type-h2-size)/1.1 var(--font-display);margin:0 0 var(--space-04)}
.bg-dither,.bg-atmos,.bg-blue{color:var(--color-text-inverse)} .bg-dither{background:var(--color-bg-accent-field)} .bg-blue,.bg-atmos{background:var(--color-bg-deep)}
.bg-dither p:not(.eyebrow),.bg-atmos p:not(.eyebrow),.bg-blue p:not(.eyebrow){color:var(--color-text-inverse)}
.eyebrow.on-dark{color:var(--steel-5)}
canvas.dither,canvas.atmos{position:absolute;inset:0;width:100%;height:100%} .bp{position:absolute;inset:0;width:100%;height:100%} .bp-t{font:600 13px var(--font-text);letter-spacing:.08em;fill:var(--steel-6)}
.btn{display:inline-flex;align-items:center;gap:var(--space-03);min-height:var(--button-height);padding:0 var(--space-06);border-radius:var(--radius-sm);font:600 16px/1 var(--font-text);text-decoration:none;cursor:pointer;border:2px solid transparent;transition:background-color var(--duration-fast) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)}
.btn-sm{min-height:44px;padding:0 var(--space-05);font-size:15px}
.btn-primary{background:var(--color-accent-solid);color:var(--color-text-on-accent)} .btn-primary:hover,.btn-primary.is-hover{background:var(--color-accent-solid-hover)}
.btn-primary:active,.btn-primary.is-active{background:var(--color-accent-solid-active);transform:translateY(1px)} .is-focus{outline:3px solid var(--color-focus-ring);outline-offset:3px}
.btn:disabled{background:var(--color-bg-sunken);color:var(--color-text-muted);cursor:not-allowed}
.btn-secondary{background:var(--color-bg-page);color:var(--color-text-primary);border-color:var(--color-border-control)} .btn-secondary:hover,.btn-secondary.is-hover{background:var(--color-bg-subtle)}
.lnk{display:inline-flex;align-items:center;gap:6px;min-height:44px;font-weight:600;text-underline-offset:4px}
.frm{display:grid;gap:var(--space-05)} .fld{display:grid;gap:var(--space-02);border:0;padding:0;margin:0} .fld label,.fld legend{font-weight:600;font-size:15px;padding:0}
.fld input:not([type=checkbox]){min-height:var(--input-height);border:1px solid var(--color-border-control);border-radius:var(--radius-sm);padding:0 var(--space-04);font:inherit;background:var(--color-bg-page);color:var(--color-text-primary)}
.is-error input{border:2px solid var(--color-error-ink)} .err{display:flex;gap:6px;align-items:flex-start;margin:0;font-size:15px;color:var(--color-error-ink)}
.chips{display:flex;flex-wrap:wrap;gap:var(--space-03)} .chip-in{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 var(--space-04);border:1px solid var(--color-border-control);border-radius:var(--radius-sm);cursor:pointer}
.chip-in:has(input:checked){background:var(--color-bg-accent-subtle);border-color:var(--steel-11);box-shadow:inset 0 0 0 1px var(--steel-11)} .chip-in input{accent-color:var(--steel-9);width:18px;height:18px;margin:0}
.jcard{border:1px solid var(--color-border-default)} .jc-b{padding:var(--space-05)}
.stats{display:grid;gap:var(--space-04);margin:0} .stats div{border-top:1px solid var(--color-border-subtle);padding-top:var(--space-03)} .stats dt{font-size:13px;font-weight:600;color:var(--color-text-secondary)} .stats dd{margin:0;font-weight:600}
.num{font:800 var(--type-h3-size)/1 var(--font-display)} .creds{padding-left:18px;margin:var(--space-04) 0} .creds li{margin:4px 0}
.acc details{border-top:1px solid var(--color-border-default)} .acc summary{display:flex;justify-content:space-between;align-items:center;min-height:56px;font-weight:600;cursor:pointer;list-style:none} .acc summary::-webkit-details-marker{display:none}
.acc details[open] summary svg{transform:rotate(45deg)} .acc summary svg{transition:transform var(--duration-normal) var(--ease-standard)}
.navbar{display:flex;align-items:center;justify-content:space-between;gap:var(--space-05);padding:var(--space-03) var(--space-05);border:1px solid var(--color-border-default);flex-wrap:wrap}
.navbar nav{display:flex;flex-wrap:wrap;gap:var(--space-05)} .navbar nav a{color:var(--color-text-primary);text-decoration:none;font-weight:600;min-height:44px;display:inline-flex;align-items:center}
.mtrack{height:120px;border:1px solid var(--color-border-subtle);position:relative;overflow:hidden;margin-bottom:var(--space-05)} .board{position:absolute;left:16px;top:44px;width:120px;height:32px;background:var(--color-accent-solid)}
.cc-ctl{display:flex;flex-wrap:wrap;gap:var(--space-05);margin-bottom:var(--space-04)} .cc-ctl label{display:inline-flex;gap:8px;align-items:center;min-height:44px;font-weight:600}
.cc-stage{position:relative;min-height:320px;border:1px solid var(--color-border-default);background:var(--color-bg-subtle);overflow:hidden;display:grid;place-items:center}
.cc-targets{display:flex;flex-wrap:wrap;gap:var(--space-06);align-items:center;justify-content:center;padding:var(--space-07)}
.cc{position:absolute;left:0;top:0;pointer-events:none;z-index:3;opacity:0} .cc.on{opacity:1}
.cc-a{position:absolute;left:0;top:0;width:100px;height:10px;transform-origin:0 50%;display:none} .cc-a::before{content:"";position:absolute;inset:0;background:var(--color-accent-solid)}
.cc-b{position:absolute;left:0;top:0;display:none} .cc-b i{position:absolute;width:10px;height:10px;border:3px solid var(--color-accent-solid)}
.cc-b i:nth-child(1){border-right:0;border-bottom:0}.cc-b i:nth-child(2){border-left:0;border-bottom:0}.cc-b i:nth-child(3){border-right:0;border-top:0}.cc-b i:nth-child(4){border-left:0;border-top:0}
.cc-c{position:absolute;left:0;top:0;width:14px;height:24px;display:none}
.cc[data-v=a] .cc-a,.cc[data-v=b] .cc-b,.cc[data-v=c] .cc-c{display:block}
.cc-touch{display:none;position:absolute;bottom:8px;left:12px} @media (pointer:coarse){.cc{display:none}.cc-touch{display:block}}
.dial{border-top:3px solid var(--color-accent-line);padding-top:var(--space-04)} .dbar{height:8px;background:var(--color-bg-sunken)} .dbar span{display:block;height:100%;background:var(--color-accent-solid)}
.ex{border:1px solid var(--color-border-default);padding:var(--space-09) var(--space-07)} .ex-line{max-width:320px;margin:var(--space-05) 0 var(--space-08)}
.svcs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-05);margin-bottom:var(--space-07)}
.svc{position:relative;display:grid;gap:var(--space-04);align-content:start;padding:var(--space-06);border:1px solid var(--color-border-default);text-decoration:none;color:var(--color-text-primary);min-height:220px;transition:border-color var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)}
.svc:hover{border-color:var(--color-border-control);background:var(--color-bg-subtle)} .svc p{margin:0;color:var(--color-text-secondary)} .svc-i{color:var(--color-accent-solid)} .svc-go{position:absolute;right:var(--space-05);bottom:var(--space-05);transition:transform var(--duration-fast) var(--ease-standard)} .svc:hover .svc-go{transform:translateX(4px)}
.gts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-06)} .gt{margin:0} .gt figcaption{font-size:var(--type-small-size);color:var(--color-text-secondary);margin-top:var(--space-03)}
.gt>div{border:1px solid var(--color-border-default);min-height:240px}
.sign{background:var(--color-bg-accent-field);color:#fff;display:grid;place-items:center;align-content:center;gap:8px;padding:var(--space-06);aspect-ratio:3/4;min-height:0!important} .sg-n{font:800 26px var(--font-display);margin:0} .sg-p{font:700 22px var(--font-text);margin:0}
.van{position:relative;padding:var(--space-04)} .van svg{width:100%;height:auto;display:block} .van-l{position:absolute;left:9%;top:22%} .van-l p{margin:4px 0 0;font:700 15px var(--font-text)}
.bcard{aspect-ratio:7/4;padding:var(--space-05);display:flex;flex-direction:column;justify-content:space-between;min-height:0!important} .bc-t{display:flex;gap:var(--space-05);font-size:12px} .bc-t p{margin:0}
.sig{padding:var(--space-05);font-size:14px} .favs{display:flex;gap:var(--space-06);align-items:center;justify-content:center} .tile{display:grid;place-items:center;width:180px;height:180px;background:var(--color-accent-solid);border-radius:var(--radius-sm)}
.nf{padding:var(--space-06)}
footer{padding:var(--space-09) 0;background:var(--color-bg-deep);color:var(--color-text-inverse);font-size:14px} footer a{color:#fff}
@media (max-width:900px){.t{display:block;overflow-x:auto;max-width:100%} .g2,.g3,.motifs,.svcs,.gts{grid-template-columns:minmax(0,1fr)} .surf{grid-template-columns:1fr} .ramp{grid-template-columns:repeat(4,minmax(0,1fr))} .sp{grid-template-columns:96px 1fr;}.sp>span:last-child{grid-column:1/-1}}
'''

JS = r'''
(function(){
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, fine=matchMedia('(pointer: fine)').matches;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
// ---- contrast re-measured from computed styles
function lin(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)}
function L(rgb){const m=rgb.match(/\d+(\.\d+)?/g).map(Number);return .2126*lin(m[0])+.7152*lin(m[1])+.0722*lin(m[2])}
let pass=0,tot=0; document.querySelectorAll('#pairs tbody tr').forEach(tr=>{const s=tr.querySelector('.pp'),cs=getComputedStyle(s);
  const a=L(cs.color),b=L(cs.backgroundColor),r=(Math.max(a,b)+.05)/(Math.min(a,b)+.05),need=+tr.dataset.need; tot++; if(r>=need)pass++;
  tr.querySelector('.m').textContent=r.toFixed(2)+':1'; const c=tr.querySelector('.r'); c.textContent=r>=need?'PASS':'FAIL'; c.className='r '+(r>=need?'ok':'bad');});
document.getElementById('pairs-sum').textContent=`Measured in this browser: ${pass} of ${tot} pairs pass.`; document.documentElement.dataset.pairs=pass+'/'+tot;
// ---- course lines lay themselves once when they enter
const lines=[...document.querySelectorAll('.cline.draw path')];
if(!reduce&&'IntersectionObserver' in window){lines.forEach(p=>{p.style.strokeDasharray='1';p.style.strokeDashoffset='1';});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const p=e.target.querySelector('path');p.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:600,easing:css('--ease-draw'),fill:'forwards'});io.unobserve(e.target);}}),{threshold:.6});
  document.querySelectorAll('.cline.draw').forEach(s=>io.observe(s));}
// ---- motion token demos
document.querySelectorAll('.mdemo').forEach(b=>b.addEventListener('click',()=>{const bd=document.querySelector('.board');const w=bd.parentElement.clientWidth-152;
  bd.animate([{transform:'translateX(0)'},{transform:`translateX(${w}px)`}],{duration:reduce?0:+b.dataset.d,easing:css('--ease-'+b.dataset.e)||'ease-out',fill:'forwards'});}));
// ---- canvases: palettes read from tokens; draw once, drift only if motion allowed and visible
function palette(names){return names.map(n=>{const h=css('--'+n);return [1,3,5].map(i=>parseInt(h.slice(i,i+2),16));});}
const BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v=>(v+.5)/16);
function n2(x,y){const v=Math.sin(x*127.1+y*311.7)*43758.5453;return v-Math.floor(v)}
function vn(x,y){const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy);return n2(ix,iy)*(1-ux)*(1-uy)+n2(ix+1,iy)*ux*(1-uy)+n2(ix,iy+1)*(1-ux)*uy+n2(ix+1,iy+1)*ux*uy}
function fbm(x,y){let v=0,a=.5,f=1;for(let o=0;o<4;o++){v+=vn(x*f,y*f)*a;f*=2.02;a*=.5}return v}
function ss(a,b,v){const t=Math.max(0,Math.min(1,(v-a)/(b-a)));return t*t*(3-2*t)}
function loop(cv,draw){const ctx=cv.getContext('2d',{alpha:false});let vis=false,raf=0,w=0,h=0;
  function size(){const d=Math.min(devicePixelRatio||1,1.5);w=cv.clientWidth;h=cv.clientHeight;cv.width=w*d;cv.height=h*d;ctx.setTransform(d,0,0,d,0,0);draw(ctx,w,h,0);}
  function tick(t){if(!vis||document.hidden){raf=0;return}draw(ctx,w,h,t/1000);raf=requestAnimationFrame(tick)}
  size(); addEventListener('resize',size);
  if(!reduce){new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(tick)}).observe(cv);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&vis&&!raf)raf=requestAnimationFrame(tick)});}}
const DP=palette(['steel-9','steel-10','steel-11','steel-12']); // never lighter than steel-9: white text >= 5.96
const dc=document.querySelector('canvas.dither'); if(dc) loop(dc,(ctx,w,h,t)=>{const c=7,cols=Math.ceil(w/c),rows=Math.ceil(h/c),dr=t*.02;
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const nx=(x/cols-.5)*2,ny=(y/rows-.5)*2;const cl=fbm(nx*1.3+dr*.2+3,ny*1.6-dr*.1);
    const mass=ss(1.1,.1,Math.hypot(nx-.45,ny+.05));let v=Math.max(0,Math.min(.999,ss(.45,.9,cl)*.75+mass*.45));
    const i=Math.min(3,Math.floor(Math.min(.999,v+BAYER[(y%4)*4+x%4]*.25)*4));const col=DP[i];ctx.fillStyle=`rgb(${col})`;ctx.fillRect(x*c,y*c,c,c);}});
const AB=palette(['steel-12'])[0], AF=palette(['steel-9'])[0];
const ac=document.querySelector('canvas.atmos'); if(ac){const off=document.createElement('canvas');
  loop(ac,(ctx,w,h,t)=>{const ow=Math.max(8,Math.ceil(w/8)),oh=Math.max(8,Math.ceil(h/8));if(off.width!==ow){off.width=ow;off.height=oh;}const o=off.getContext('2d');
    // source-over blending toward steel-9 keeps every pixel between steel-12 and steel-9, so white text stays >= 5.96:1
    o.fillStyle=`rgb(${AB})`;o.fillRect(0,0,ow,oh);
    for(let i=0;i<14;i++){const x=ow*(.25+.7*i/13)+Math.sin(t*.15+i*1.7)*ow*.03,bw=ow*(.05+.04*((i*7)%3));
      const g=o.createLinearGradient(0,0,0,oh);const a=.08+.1*(i/13);g.addColorStop(0,`rgba(${AF},0)`);g.addColorStop(1,`rgba(${AF},${a})`);o.fillStyle=g;o.fillRect(x-bw/2,0,bw,oh);}
    const r=o.createRadialGradient(ow*.92,oh*1.05,0,ow*.92,oh*1.05,ow*.45);r.addColorStop(0,`rgba(${AF},.55)`);r.addColorStop(1,`rgba(${AF},0)`);o.fillStyle=r;o.fillRect(0,0,ow,oh);
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(off,0,0,w,h);});}
// ---- cursor companion
const st=document.getElementById('cc-stage'),cc=document.getElementById('cc'); if(st&&cc&&fine){
  let v='a',tx=0,ty=0,x=0,y=0,vx=0,tgt=null,raf=0,press=1; cc.dataset.v=v;
  document.querySelectorAll('input[name=ccv]').forEach(r=>r.addEventListener('change',()=>{v=r.value;cc.dataset.v=v;}));
  const A=cc.querySelector('.cc-a'),B=[...cc.querySelectorAll('.cc-b i')],C=cc.querySelector('.cc-c');
  function frame(){const k=reduce?1:.22;const px=x;x+=(tx-x)*k;y+=(ty-y)*k;vx=x-px;let r=null;
    if(tgt){const sr=st.getBoundingClientRect(),b=tgt.getBoundingClientRect();r={l:b.left-sr.left,t:b.top-sr.top,w:b.width,h:b.height};}
    if(v==='a'){if(r){A.style.transform=`translate(${r.l}px,${r.t+r.h+6}px) scale(${r.w/100},${0.3*press})`;}else{A.style.transform=`translate(${x+12}px,${y+12}px) scale(${0.1*press},${1*press})`;}}
    if(v==='b'){const p=r?{l:r.l-6,t:r.t-6,w:r.w+12,h:r.h+12}:{l:x-8,t:y-8,w:16,h:16};const pos=[[p.l,p.t],[p.l+p.w-10,p.t],[p.l,p.t+p.h-10],[p.l+p.w-10,p.t+p.h-10]];B.forEach((e,i)=>e.style.transform=`translate(${pos[i][0]}px,${pos[i][1]}px)`);}
    if(v==='c'){const tilt=reduce||r?0:Math.max(-12,Math.min(12,vx*2));const px2=r?r.l+r.w/2-7:x+14,py2=r?r.t-30:y+10;C.style.transform=`translate(${px2}px,${py2}px) rotate(${tilt}deg) scale(${press})`;}
    raf=requestAnimationFrame(frame);}
  st.addEventListener('pointerenter',()=>{cc.classList.add('on');if(!raf)raf=requestAnimationFrame(frame)});
  st.addEventListener('pointerleave',()=>{cc.classList.remove('on');cancelAnimationFrame(raf);raf=0;tgt=null});
  st.addEventListener('pointermove',e=>{const r=st.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;tgt=e.target.closest('[data-cc]');});
  st.addEventListener('pointerdown',()=>{press=.92});addEventListener('pointerup',()=>{press=1});
  window.__cc=(vv,px,py)=>{v=vv;cc.dataset.v=vv;cc.classList.add('on');const r=st.getBoundingClientRect();tgt=[...st.querySelectorAll('[data-cc]')].find(e=>{const b=e.getBoundingClientRect();return r.left+px>=b.left&&r.left+px<=b.right&&r.top+py>=b.top&&r.top+py<=b.bottom})||null;window.__cct=tgt?tgt.textContent.trim():'none';tx=x=px;ty=y=py;if(!raf)raf=requestAnimationFrame(frame);};
}
})();
'''

PAGE = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Identity Board, Phase 2</title><style>{FACES}{TOK_CSS}{CSS}</style></head><body>
<header class="top"><div class="wrap"><p class="eyebrow">AUSTIN-PROMPT-V2 · Phase 2 · identity asset board</p>
{lockup(P["steel-9"], "#fff", P["neutral-13"], h=72, tail=True)}
<h1 class="ty-h1" style="margin-top:var(--space-07)">Austin Pro Siding: the system</h1>
<p class="intro">Everything on this board is built from tokens in phase2/tokens.json (DTCG) and tokens.css. The rules are written in phase2/BRAND.md. The last section tests whether those documents alone can produce new work.</p>
<ul class="toc">{"".join(f'<li><a href="#{a}">{t}</a></li>' for a, t in [("mark", "01 Mark"), ("colour", "02 Colour"), ("type", "03 Type"), ("space", "04 Space"), ("icons", "05 Icons"), ("motifs", "06 Motifs"), ("backgrounds", "07 Backgrounds"), ("components", "08 Components"), ("motion", "09 Motion"), ("cursor", "10 Cursor"), ("dials", "11 Dials"), ("exemplar", "12 Exemplar"), ("gentest", "13 Generation test")])}</ul></div></header>
<main>{s_mark()}{s_colour()}{s_type()}{s_space()}{s_icons()}{s_motifs()}{s_backgrounds()}{s_components()}{s_motion()}{s_cursor()}{s_dials()}{s_exemplar()}{s_gentest()}</main>
<footer><div class="wrap">{lockup("#fff", P["steel-12"], "#fff", h=32)}<p>Built in this thread for the Phase 2 gate. Fonts: Montserrat and Inter, embedded under the SIL OFL. Photo: the firm's own job photo (IMAGE-REGISTRY E1). Nothing here is published.</p></div></footer>
<script>{JS}</script></body></html>'''

open(os.path.join(BV2, 'phase2-identity.html'), 'w', encoding='utf-8').write(PAGE)
print('wrote phase2-identity.html', len(PAGE) // 1024, 'KB')

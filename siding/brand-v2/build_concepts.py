"""AUSTIN-PROMPT-V2, Phase 1 step 2: three resolved logo concepts inside territory T1 The Profile Cut.

Writes brand-v2/phase1-concepts.html, one standalone file with fonts embedded. For each concept it shows:
- the mark large;
- sizes 120/24/16 px on white, black and steel, with the 16 px variant and a 4x pixel view of the real 16 px raster;
- the variant set: icon only, horizontal lockup, stacked lockup;
- the reference card;
- the motion, specified in words and playing live, with a seek harness: ?t=<ms> freezes every animation at that time;
- the one-line story;
- the logo-gate checklist with Haviv scores.

Colours: black, white and the steel ramp only (steel-9 #396791 as the one accent).
Run: python3 -I brand-v2/build_concepts.py"""
import base64, html, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import marks  # noqa: E402

css = open(os.path.join(ROOT, 'site/assets/css/home.css'), encoding='utf-8').read()
RAMP = {f'{n}-{k}': v for n, k, v in re.findall(r'--(steel|neutral)-(\d+):\s*(#[0-9A-F]{6})', css)}
S = lambda k: RAMP[f'steel-{k}']
N = lambda k: RAMP[f'neutral-{k}']
BLACK, WHITE = '#000000', '#FFFFFF'
NAME = 'Austin Pro Siding'
assert S(9) == '#396791'


def b64(path, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()


FONTS = [('Montserrat', 800, 'Montserrat-800-latin.woff2'), ('Inter', 400, 'Inter-400-latin.woff2'),
         ('Inter', 600, 'Inter-600-latin.woff2'), ('Inter', 700, 'Inter-700-latin.woff2')]
FACES = ''.join(f"@font-face{{font-family:'{f}';font-weight:{w};font-style:normal;font-display:block;"
                f"src:url({b64(os.path.join(HERE, 'fonts', p), 'font/woff2')}) format('woff2')}}" for f, w, p in FONTS)
esc = html.escape


def icon(k, fg, bg, size, small=False, cls='', label=None):
    a = f' role="img" aria-label="{esc(label)}"' if label else ' aria-hidden="true"'
    return (f'<svg class="mk {cls}" viewBox="0 0 64 64" width="{size}" height="{size}"{a} focusable="false">'
            f'{marks.CONCEPTS[k](fg, bg, small=small)}</svg>')


def lockup(k, fg, bg, word, h=56, stacked=False, tail=False, cls='', label=True):
    """the icon and the wordmark drawn in one SVG so they scale as one object. Wordmark: Montserrat 800."""
    a = f' role="img" aria-label="{NAME}"' if label else ' aria-hidden="true"'
    if stacked:
        inner = (f'<g transform="translate(118 0)">{marks.CONCEPTS[k](fg, bg)}</g>'
                 f'<text class="wm" x="150" y="100" text-anchor="middle" fill="{word}">{NAME}</text>')
        return f'<svg class="lk {cls}" viewBox="0 0 300 112" height="{h * 2}"{a} focusable="false">{inner}</svg>'
    if k == 'c1' and tail:
        art = marks.c1(fg, bg, tail=230, cls=' c1-tail')
        inner = f'{art}<text class="wm" x="78" y="41" fill="{word}">{NAME}</text>'
        return f'<svg class="lk {cls}" viewBox="0 0 296 64" height="{h}"{a} focusable="false">{inner}</svg>'
    inner = f'{marks.CONCEPTS[k](fg, bg)}<text class="wm" x="78" y="41" fill="{word}">{NAME}</text>'
    return f'<svg class="lk {cls}" viewBox="0 0 296 64" height="{h}"{a} focusable="false">{inner}</svg>'


# ------------------------------------------------------------------------------------------------------------------
# concept content: method, story, card, motion spec, gate
# ------------------------------------------------------------------------------------------------------------------
C = [
    dict(k='c1', name='The Profile House', method='Metaphor fusion + product action (S0609)',
         story='Cut a lap-sided wall at the corner and every board shows its edge. We drew the house with that edge, in one line, the way a course is laid.',
         small_note='Four lap steps close up below 32 px, so the 16 px variant keeps two deeper steps and a heavier line (7 units, not 5). Rule: the full mark at 48 px and above; the variant at 32 px and below.',
         card=dict(ex='Scout Motors', url='https://www.scoutmotors.com/', job='MOOD',
                   teardown='Observed live on 2026-11-02. An engineered page: nav plates joined by small hardware ticks, monospaced caps in the voice of a spec sheet, and one hand-drawn red underline under two words. That single drawn mark is the only gesture on the page, and it works because it is used once.',
                   adapted='The restraint: one drawn line is the brand\'s whole gesture, and it is used once per view.',
                   original='The line is a construction section (the lap profile), not handwriting. It forms a house. In the lockup it carries on as the course line, under the name.',
                   distance=['Geometric section line vs a hand-drawn script stroke.',
                             'Steel or black vs red on earth tones.',
                             'A pictorial house icon with a sans wordmark vs a script wordmark with no icon.',
                             'The line is the mark itself; theirs is an underline beside type.']),
         motion=[('Trigger', 'First paint of the header, or the replay button. Once per page load; never on scroll.'),
                 ('Mover (one)', 'The line draws on with stroke-dashoffset, from the foot of the left wall, up the four lap steps, over the ridge and down the right wall (S0407 draw-on).'),
                 ('Timing', 'Line 560 ms, cubic-bezier(.65,0,.35,1): the pen starts slow at the foot of the wall, is quickest over the ridge, and slows to land. In the course-line lockup the house takes the first third of the stroke and the line then runs on under the name, landing as the wordmark finishes. Wordmark: opacity 0 to 1 with a 4-unit slide, 180 ms ease-out, from 420 ms. Total 600 ms (under the 700 ms cap; S1436). Frames: shots/concept-c1-motion-start|mid|end.png.'),
                 ('Lockup with course line', 'The same single path runs on past the right wall and under the name, so the draw ends as a rule beneath the wordmark. This is the line the pages carry.'),
                 ('Reduced motion', 'No draw. The final frame renders at once (S0400).')]),
    dict(k='c2', name='Lap A', method='Monogram + meaning (S0609)',
         story='Two lap boards, cut in section and leaned together: the A of Austin, standing like a gable, with one course tucked behind.',
         small_note='At 16 px the crossing tips turn the A into an X, so the variant shortens the tips, widens the boards and doubles the lap gap. Rule: full mark at 48 px and above; variant at 32 px and below.',
         card=dict(ex='Dropbox Brand', url='https://brand.dropbox.com/', job='MECHANISM',
                   teardown='Observed live on 2026-11-02. The glyph is built from flat diamond planes shown on a visible hairline grid. How the planes overlap is shown with no shading at all: the build of the glyph explains the product (a box from folded planes). Annex v3: settled, CSSDA WOTY 2025.',
                   adapted='The mechanism: a glyph assembled from flat planes, whose overlap is drawn with a plain gap instead of shading.',
                   original='The planes are tapered boards taken from a real lap-siding section; the glyph is a letter (A); the overlap is a lap joint at the ridge; the crossbar is a course tucked behind.',
                   distance=['A letter vs a box.',
                             'Two tapered wedges and a bar vs four equal diamonds.',
                             'Steel vs Dropbox blue.',
                             'Overlap shown by a lap gap where the boards cross vs planes that only meet edge to edge.']),
         motion=[('Trigger', 'First paint, or replay. Once.'),
                 ('Mover (one)', 'The right board. It swings in about its own foot and lands over the left board with a spring: overshoot to -2°, back to +0.6°, settle (S0083). Squash and stretch held at none; rotation only.'),
                 ('Timing', 'Left board seats first: 8-unit drop with fade, 160 ms ease-out. Right board swings in: 340 ms from 100 ms. Crossbar slides in behind: scaleX from its left end, 160 ms from 400 ms. Wordmark 160 ms from 440 ms. Total 600 ms.'),
                 ('Properties', 'transform and opacity only, so the animation stays on the compositor (S0062, S0399).'),
                 ('Reduced motion', 'Final frame at once.')]),
    dict(k='c3', name='Reveal Tile', method='Negative space + container (S0609)',
         story='A piece of our wall, cut square. Four courses, and each joint shows the board\'s butt where it stands proud, then runs on as a shadow line.',
         small_note='The three thin reveals vanish below 32 px. The variant keeps two deep notches and drops the reveal lines, so the notches alone carry it and it closes as a notched block, not a "≡" in a box. Rule: full mark at 48 px and above; variant at 32 px and below.',
         card=dict(ex='Cash App Brand (press and assets page)', url='https://cash.app/press/assets', job='MECHANISM',
                   teardown='Observed live on 2026-11-02 (the guidelines URL did not resolve; the press and assets page was used). The glyph sits in a rounded-square container, and the container is carried white on a full-bleed brand-colour field. The logo SVG is a rounded square (rx about 7.8 on 150) plus one path. The container is the brand\'s unit: colour as content.',
                   adapted='The mechanism: a container mark that is itself the colour unit, carried on a field of the brand colour.',
                   original='There is no glyph inside. The content is cut out of the container: the board sections, in negative space. The cuts break the container\'s own edge.',
                   distance=['No symbol inside the tile; the cuts are the content.',
                             'A broken, notched edge vs an intact rounded square.',
                             'Steel vs green.',
                             'Radius 5 on 56 (9%) and a 56:54 tile vs their 5% radius on a square.',
                             'No currency meaning.']),
         motion=[('Trigger', 'First paint, or replay. Once.'),
                 ('Mover (one, as a group)', 'The three cuts. Each one runs across the tile from the left edge, like a saw kerf (scaleX from the left inside the mask), 220 ms ease-out, 70 ms apart.'),
                 ('Timing', 'Tile settles in first: scale 0.96 to 1 with fade, 160 ms ease-out (inside the 0.95 to 1.05 band; S0083). Cuts from 120 ms, so the last ends at 480 ms. Wordmark 160 ms from 440 ms. Total 600 ms.'),
                 ('Properties', 'transform and opacity only.'),
                 ('Reduced motion', 'Final frame at once.')]),
]

# ------------------------------------------------------------------------------------------------------------------
# page
# ------------------------------------------------------------------------------------------------------------------
BGS = [('White', WHITE, BLACK), ('Black', BLACK, WHITE), ('Steel-9', S(9), WHITE)]


def size_matrix(k):
    head = '<tr><th scope="col">Surface</th><th scope="col">120 px</th><th scope="col">24 px</th><th scope="col">16 px</th><th scope="col">24 px variant</th><th scope="col">16 px variant</th><th scope="col">16 px variant, real pixels ×4</th></tr>'
    rows = []
    for nm, bg, fg in BGS:
        cells = [icon(k, fg, bg, 120), icon(k, fg, bg, 24), icon(k, fg, bg, 16), icon(k, fg, bg, 24, True), icon(k, fg, bg, 16, True)]
        px = f'<canvas class="px" width="64" height="64" data-k="{k}" data-fg="{fg}" data-bg="{bg}"></canvas>'
        rows.append(f'<tr style="background:{bg};color:{fg}"><th scope="row">{nm}</th>' + ''.join(f'<td>{c}</td>' for c in cells) + f'<td>{px}</td></tr>')
    return f'<table class="sizes">{head}{"".join(rows)}</table>'


def variants(k):
    out = [f'<figure class="v" style="background:{WHITE}">{icon(k, BLACK, WHITE, 64, label=NAME)}<figcaption>Icon only, black</figcaption></figure>',
           f'<figure class="v" style="background:{WHITE}">{icon(k, S(9), WHITE, 64, label=NAME)}<figcaption>Icon only, steel-9 accent</figcaption></figure>',
           f'<figure class="v" style="background:{S(9)}">{icon(k, WHITE, S(9), 64, label=NAME)}<figcaption class="w">Icon only, on steel</figcaption></figure>',
           f'<figure class="v wide" style="background:{WHITE}">{lockup(k, S(9), WHITE, BLACK)}<figcaption>Horizontal lockup: steel icon, black name</figcaption></figure>',
           f'<figure class="v wide" style="background:{WHITE}">{lockup(k, BLACK, WHITE, BLACK)}<figcaption>Horizontal lockup, black only</figcaption></figure>',
           f'<figure class="v wide" style="background:{S(9)}">{lockup(k, WHITE, S(9), WHITE)}<figcaption class="w">Horizontal lockup, white on steel</figcaption></figure>',
           f'<figure class="v wide" style="background:{BLACK}">{lockup(k, WHITE, BLACK, WHITE)}<figcaption class="w">Horizontal lockup, white on black</figcaption></figure>',
           f'<figure class="v wide" style="background:{WHITE}">{lockup(k, S(9), WHITE, BLACK, stacked=True, h=60)}<figcaption>Stacked lockup</figcaption></figure>']
    if k == 'c1':
        out.append(f'<figure class="v wide" style="background:{WHITE}">{lockup(k, S(9), WHITE, BLACK, tail=True)}<figcaption>Lockup with course line: the same path runs on under the name</figcaption></figure>')
    return ''.join(out)


def card(c):
    d = c['card']
    dist = ''.join(f'<li>{esc(x)}</li>' for x in d['distance'])
    return f'''<aside class="card"><p class="eyebrow">Reference card, written before drawing</p>
<dl><dt>Exemplar (annex v3)</dt><dd>{esc(d["ex"])}, <a href="{d["url"]}">{esc(d["url"])}</a></dd>
<dt>Its one job</dt><dd><b>{d["job"]}</b></dd>
<dt>Teardown</dt><dd>{esc(d["teardown"])}</dd>
<dt>Adapted</dt><dd>{esc(d["adapted"])}</dd>
<dt>Original</dt><dd>{esc(d["original"])}</dd>
<dt>Distance check ({len(d["distance"])} differences)</dt><dd><ol>{dist}</ol></dd>
<dt>Motion quality bar</dt><dd>Graza (annex v3, scoped to motion quality): its motion reads as a physical thing happening to a material. Ours must too: a board landing, a line laid, a cut run.</dd></dl></aside>'''


def motion(c):
    rows = ''.join(f'<tr><th scope="row">{esc(a)}</th><td>{esc(b)}</td></tr>' for a, b in c['motion'])
    k = c['k']
    stage_art = lockup(k, S(9), WHITE, BLACK, h=72, tail=(k == 'c1'), cls=f'stage-{k}', label=True)
    return f'''<div class="motion"><div class="stage" id="stage-{k}">{stage_art}
<button type="button" class="replay" data-k="{k}">Replay</button></div>
<table class="spec">{rows}</table></div>'''


def gate(c):
    g = GATES[c['k']]
    items = ''.join(f'<tr><th scope="row">{esc(a)}</th><td class="{"ok" if s == "Pass" else "warn"}">{s}</td><td>{esc(n)}</td></tr>' for a, s, n in g['checks'])
    hv = ''.join(f'<tr><th scope="row">{a}</th><td>{v} / 5</td><td>{esc(n)}</td></tr>' for a, v, n in g['haviv'])
    tot = sum(v for _, v, _ in g['haviv'])
    return f'''<div class="gate"><h4>Logo gate</h4><table class="chk">{items}</table>
<h4>Haviv (appropriate, distinctive, simple), scored in writing</h4><table class="chk">{hv}<tr><th scope="row">Total</th><td><b>{tot} / 15</b></td><td></td></tr></table></div>'''


GATES = {
    'c1': dict(checks=[
        ('Black only', 'Pass', 'One line, one colour; nothing depends on tone.'),
        ('16 px', 'Pass', 'With the variant: at real 16 px pixels the house closes and the two laps show as two step pixels on the left wall (see the ×4 view). That is texture, not readable laps: at 16 px it is a house with a rough left side. The full mark at 16 px loses its steps, so the variant is required below 32 px.'),
        ('Doodle test', 'Pass', 'Drawn from memory in about five seconds: a house outline whose left wall is a staircase of laps.'),
        ('Quirk named', 'Pass', 'The lapped left wall. A house outline is the category default; the lapped wall is what makes this one ours.'),
        ('System complete', 'Pass', 'Icon, 16 px variant, horizontal and stacked lockups, the lockup with course line, black/white/steel.'),
        ('Risk', 'Watch', 'At a glance the step edge can read as a saw blade. Saw is still the building trade, so it fails safe, but it is not siding.')],
        haviv=[('Appropriate', 5, 'A house plus the lap profile: the trade, exterior siding, is named by the drawing itself.'),
               ('Distinctive', 3, 'Outline houses are everywhere. Only the lapped wall separates it, and that edge is a quarter of the mark.'),
               ('Simple', 5, 'One open line, one weight.')]),
    'c2': dict(checks=[
        ('Black only', 'Pass', 'Solid shapes; the lap gap is the surface colour, not a tone.'),
        ('16 px', 'Pass', 'With the variant: shortened tips and a doubled gap keep it an A. The full mark at 16 px reads as an X over an A.'),
        ('Doodle test', 'Pass', 'Two leaning strokes that cross at the top, plus a short bar.'),
        ('Quirk named', 'Pass', 'The crossing at the ridge, where the right board laps over the left.'),
        ('System complete', 'Pass', 'Icon, 16 px variant, horizontal and stacked lockups, black/white/steel.'),
        ('Risk', 'Watch', 'Crossed poles also read as a teepee or an A-frame tent. The board taper, which is the siding meaning, only reads once explained.')],
        haviv=[('Appropriate', 3, 'A for Austin is right. The siding meaning (lap boards in section) does not come through unaided.'),
               ('Distinctive', 3, 'Crossed-tip A forms exist in other marks; the lap gap is the distinguishing detail.'),
               ('Simple', 3, 'Three parts and two gaps; busier than C1 and C3 at small sizes.')]),
    'c3': dict(checks=[
        ('Black only', 'Pass', 'One solid tile with knock-outs; works as a single-colour stamp or engraving.'),
        ('16 px', 'Pass', 'With the variant: a block with two notches in its left edge. The full mark at 16 px reads as "≡ in a box", which is the list-icon risk, so the variant is required.'),
        ('Doodle test', 'Pass', 'A square with notches cut into its left side, and lines across.'),
        ('Quirk named', 'Pass', 'The notches break the container\'s edge: the tile is cut, not decorated.'),
        ('System complete', 'Pass', 'Icon, 16 px variant, horizontal and stacked lockups, black/white/steel; the tile doubles as the app or favicon unit.'),
        ('Risk', 'Watch', 'Large, it can read as stacked planks, drawers or a database stack before it reads as siding.')],
        haviv=[('Appropriate', 3, 'A cut piece of lap-sided wall when large. At lockup size (56 px) it reads first as a stack (server rack, drawers, planks); the notches only come through at 120 px and up.'),
               ('Distinctive', 4, 'A notched-edge tile is uncommon among exterior trades, whose marks are mostly roofs and houses.'),
               ('Simple', 4, 'One shape with three cuts; the variant has two.')]),
}

RECO = '''<section class="reco" id="reco"><h2>Recommendation: C1 The Profile House</h2>
<p>The three concepts are argued against the two tests the brief names: <b>ownability</b> (S0609, question 5: why does the whole thing feel ownable?) and <b>identifiability</b> (S0659: could a stranger name the brand from a screenshot?).</p>
<table class="spec"><tr><th scope="col"></th><th scope="col">Ownability</th><th scope="col">Identifiability</th><th scope="col">Haviv</th></tr>
<tr><th scope="row">C1 The Profile House</th><td>Medium on its own (it is still a house outline). High as a system: the same line runs on as the course line under the name and through the pages, and no rival's mark does that.</td><td><b>Highest.</b> A house with a lapped wall: a stranger names "siding" or "exterior" from the mark alone.</td><td>13 / 15</td></tr>
<tr><th scope="row">C2 Lap A</th><td>Medium: a crossed-tip A.</td><td>Low: reads as A, teepee or tent before siding.</td><td>9 / 15</td></tr>
<tr><th scope="row">C3 Reveal Tile</th><td><b>Highest</b> as a standalone mark: a notched tile.</td><td>Medium to low: at lockup size it reads as a stack (server rack or drawers) before boards.</td><td>11 / 15</td></tr></table>
<p><b>Pick: C1.</b> It leads on identifiability, and its ownability comes from the system rather than the silhouette. The brief's carrying thread, the course line laying itself, is this mark's own line, so the identity and the site are one drawing.</p>
<p><b>What it costs.</b> Distinctive scores 3: C1 is the weakest silhouette of the two serious concepts. If Muse rates distinctiveness above identification, C3 is the alternative and is ready. Per S1472, C1 and C3 are not merged.</p></section>'''

PAGE_CSS = f'''{FACES}
:root{{--s9:{S(9)};--s11:{S(11)};--s3:{S(3)};--n2:{N(2)};--n4:{N(4)};--n9:{N(9)};--n12:{N(12)}}}
*{{box-sizing:border-box}} html{{-webkit-text-size-adjust:100%}}
body{{margin:0;background:#fff;color:#000;font:400 16px/1.55 Inter,system-ui,sans-serif}}
.wrap{{max-width:1240px;margin:0 auto;padding:0 24px}}
header.top{{padding:56px 0 32px;border-bottom:1px solid var(--n4)}}
h1{{font:800 clamp(30px,4vw,48px)/1.05 Montserrat,sans-serif;letter-spacing:-.01em;margin:0 0 12px}}
h2{{font:800 clamp(24px,3vw,34px)/1.1 Montserrat,sans-serif;margin:0 0 8px}}
h3{{font:700 13px/1.3 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--n9);margin:28px 0 10px}}
h4{{font:700 15px/1.3 Inter,sans-serif;margin:18px 0 8px}}
p{{max-width:68ch}} a{{color:var(--s11)}}
.lede{{color:var(--n12);font-size:18px}}
.trio{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:28px 0 0}}
.trio a{{display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px 12px 18px;border:1px solid var(--n4);text-decoration:none;color:#000}}
.trio .sm{{display:flex;gap:14px;align-items:center}}
.concept{{padding:56px 0;border-bottom:1px solid var(--n4)}}
.concept .meta{{color:var(--n9);font-weight:600;margin:0 0 6px}}
.story{{font:600 20px/1.45 Inter,sans-serif;max-width:60ch;margin:12px 0 0}}
.hero{{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:24px;margin-top:28px}}
.big{{display:grid;place-items:center;border:1px solid var(--n4);min-height:420px}}
.card{{border:1px solid var(--n4);padding:20px 22px;font-size:14.5px}}
.card dt{{font-weight:700;margin-top:10px}} .card dd{{margin:2px 0 0}} .card ol{{margin:4px 0 0;padding-left:20px}}
.eyebrow{{font:700 12px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--s9);margin:0 0 4px}}
.sizes{{border-collapse:collapse;width:100%}} .sizes th,.sizes td{{padding:14px 10px;text-align:center;vertical-align:middle;font-size:13px;font-weight:600}}
.sizes tr:first-child th{{background:var(--n2);color:#000}}
.px{{width:64px;height:64px;image-rendering:pixelated;vertical-align:middle}}
.vgrid{{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}}
.v{{margin:0;border:1px solid var(--n4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:22px 12px 12px;min-height:150px}}
.v.wide{{grid-column:span 3}} .v figcaption{{font-size:12.5px;color:var(--n9)}} .v figcaption.w{{color:#fff}}
.lk{{max-width:100%;overflow:visible}} .wm{{font:800 23px Montserrat,sans-serif;letter-spacing:-.01em}}
.motion{{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:24px}}
.stage{{position:relative;border:1px solid var(--n4);display:grid;place-items:center;min-height:240px;padding:24px}}
.replay{{position:absolute;right:12px;bottom:12px;font:600 14px Inter,sans-serif;background:#000;color:#fff;border:0;padding:10px 16px;min-height:44px;cursor:pointer}}
.replay:focus-visible{{outline:3px solid var(--s9);outline-offset:3px}}
.spec,.chk{{border-collapse:collapse;width:100%;font-size:14.5px}} .spec th,.spec td,.chk th,.chk td{{text-align:left;vertical-align:top;padding:8px 10px;border-top:1px solid var(--n4)}}
.spec th,.chk th{{width:24%;font-weight:700}} .chk td:nth-child(2){{width:11%;font-weight:700}}
.ok{{color:var(--s11)}} .warn{{color:var(--n12)}}
.reco{{padding:56px 0}}
footer{{padding:32px 0 64px;color:var(--n9);font-size:13px;border-top:1px solid var(--n4)}}
@media (max-width:900px){{.hero,.motion{{grid-template-columns:1fr}} .trio{{grid-template-columns:1fr}} .vgrid{{grid-template-columns:repeat(2,1fr)}} .v.wide{{grid-column:span 2}}
 .sizes{{display:block;overflow-x:auto}} .big{{min-height:300px}}}}
'''

JS = r'''
(function(){
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const q = new URLSearchParams(location.search); const seek = q.has('t') ? +q.get('t') : null;
const E1 = 'cubic-bezier(.65,0,.35,1)', OUT = 'cubic-bezier(.2,.8,.2,1)';
function word(st, out){ const w = st.querySelector('.wm'); if (w) out.push(w.animate([{opacity:0, transform:'translateX(-4px)'},{opacity:1, transform:'none'}], {duration: st.dataset.k==='c1'?180:160, delay:st.dataset.k==='c1'?420:440, easing:OUT, fill:'both'})); }
const build = {
  c1(st){ const a=[]; st.querySelectorAll('.c1-draw').forEach(p=>{ p.style.strokeDasharray='1'; a.push(p.animate([{strokeDashoffset:1},{strokeDashoffset:0}], {duration:560, easing:E1, fill:'both'})); }); word(st,a); return a; },
  c2(st){ const a=[]; const l=st.querySelector('.c2-l'), r=st.querySelector('.c2-r'), b=st.querySelector('.c2-bar');
    [l,r,b].forEach(e=>{ e.style.transformBox='view-box'; });
    l.style.transformOrigin='13.5px 60px'; r.style.transformOrigin='50.5px 60px'; b.style.transformOrigin='20px 41px';
    a.push(l.animate([{opacity:0, transform:'translateY(8px)'},{opacity:1, transform:'none'}], {duration:160, easing:OUT, fill:'both'}));
    a.push(r.animate([{opacity:0, transform:'rotate(16deg)'},{opacity:1, transform:'rotate(-2deg)', offset:.62},{transform:'rotate(.6deg)', offset:.82},{transform:'rotate(0deg)'}], {duration:340, delay:100, easing:'ease-out', fill:'both'}));
    a.push(b.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}], {duration:160, delay:400, easing:OUT, fill:'both'}));
    word(st,a); return a; },
  c3(st){ const a=[]; const t=st.querySelector('.c3-tile'); t.style.transformBox='view-box'; t.style.transformOrigin='32px 32px';
    a.push(t.animate([{opacity:0, transform:'scale(.96)'},{opacity:1, transform:'scale(1)'}], {duration:160, easing:OUT, fill:'both'}));
    st.querySelectorAll('.c3-cut').forEach((c,i)=>{ c.style.transformBox='view-box'; c.style.transformOrigin='0px 32px';
      a.push(c.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}], {duration:220, delay:120+i*70, easing:OUT, fill:'both'})); });
    word(st,a); return a; }
};
const live = {};
function play(k){ const st=document.getElementById('stage-'+k); st.dataset.k=k; (live[k]||[]).forEach(x=>x.cancel()); live[k]=build[k](st); return live[k]; }
window.__seek = function(t){ Object.keys(build).forEach(k=>{ play(k).forEach(x=>{ x.pause(); x.currentTime=t; }); }); };
if (seek !== null) { document.fonts.ready.then(()=>{ __seek(seek); document.documentElement.dataset.seeked=seek; }); }
else if (!reduce) { Object.keys(build).forEach(play); }
document.querySelectorAll('.replay').forEach(b=>b.addEventListener('click',()=>{ if(!reduce) play(b.dataset.k); }));
// the 16 px variant drawn as a real 16x16 raster, then shown at 4x with pixels kept
document.querySelectorAll('canvas.px').forEach(cv=>{
  const tpl=document.getElementById('px-'+cv.dataset.k+'-'+cv.dataset.bg.slice(1)); if(!tpl) return;
  const img=new Image(); img.onload=()=>{ const s=document.createElement('canvas'); s.width=s.height=16; const sx=s.getContext('2d');
    sx.fillStyle=cv.dataset.bg; sx.fillRect(0,0,16,16); sx.drawImage(img,0,0,16,16);
    const c=cv.getContext('2d'); c.imageSmoothingEnabled=false; c.drawImage(s,0,0,64,64); cv.dataset.ready=1; };
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(tpl.textContent);
});
})();
'''


def px_templates():
    out = []
    for c in C:
        for _, bg, fg in BGS:
            svgsrc = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="16" height="16">'
                      f'{marks.CONCEPTS[c["k"]](fg, bg, small=True)}</svg>')
            assert '</' + 'script' not in svgsrc
            out.append(f'<script type="text/plain" id="px-{c["k"]}-{bg[1:]}">{svgsrc}</script>')
    return ''.join(out)


def concept_section(i, c):
    k = c['k']
    return f'''<section class="concept" id="{k}" aria-labelledby="{k}-h">
<p class="meta">Concept {i + 1} of 3 · {esc(c["method"])}</p>
<h2 id="{k}-h">C{i + 1} {esc(c["name"])}</h2>
<p class="story">{esc(c["story"])}</p>
<div class="hero"><div class="big">{icon(k, S(9), WHITE, 300, label=f"{NAME}, concept {i + 1}, large")}</div>{card(c)}</div>
<h3>Sizes and surfaces</h3>{size_matrix(k)}<p>{esc(c["small_note"])}</p>
<h3>Variant set</h3><div class="vgrid">{variants(k)}</div>
<h3>Motion, specified in words</h3>{motion(c)}
{gate(c)}
</section>'''


def trio():
    cells = []
    for i, c in enumerate(C):
        k = c['k']
        cells.append(f'<a href="#{k}">{icon(k, S(9), WHITE, 120)}<span class="sm">{icon(k, BLACK, WHITE, 24, True)}{icon(k, BLACK, WHITE, 16, True)}</span>'
                     f'<b>C{i + 1} {esc(c["name"])}</b></a>')
    return f'<nav class="trio" aria-label="The three concepts">{"".join(cells)}</nav>'


PAGE = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Logo Concepts, Phase 1</title><style>{PAGE_CSS}</style></head><body>
<div class="wrap"><header class="top"><p class="eyebrow">AUSTIN-PROMPT-V2 · Phase 1 · territory T1 The Profile Cut</p>
<h1>{NAME}: three logo concepts</h1>
<p class="lede">All three are drawn from one physical fact: cut a lap-sided wall at the corner and each board shows as a wedge, thin at its top, thick at its butt, lapped over the one below. Each concept uses a different method (S0609). Every mark is monochrome first and shown in black, white and steel-9, the one accent.</p>
<p>The territory was picked against criteria fixed before comparison (TERRITORY-SELECTION.md): T1 40/50, T3 34/50, T2 25/50. Sizes: the full mark at 48 px and above; each concept's 16 px variant at 32 px and below.</p>
{trio()}</header>
{"".join(concept_section(i, c) for i, c in enumerate(C))}
{RECO}
<footer>Built in this thread for the Phase 1 gate. The fonts (Montserrat 800, Inter) are embedded under the SIL OFL (licences in brand-v2/fonts). Nothing here is published. Seek harness: add ?t=&lt;ms&gt; to freeze all three animations at that time.</footer></div>
{px_templates()}<script>{JS}</script></body></html>'''

open(os.path.join(HERE, 'phase1-concepts.html'), 'w', encoding='utf-8').write(PAGE)
print('wrote phase1-concepts.html', len(PAGE) // 1024, 'KB')

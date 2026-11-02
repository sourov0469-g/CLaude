"""AUSTIN-PROMPT-V2, Phase 1 step 1: three logo TERRITORIES as stylescapes (not concepts).

Writes brand-v2/phase1-territories.html: one standalone file (fonts and the firm's own job photos embedded) with three
territory boards. Each board: the territory's dominant idea, a territory prototype mark (a direction sketch, not one of
the three concepts), its type and colour direction, the material it is built from, a real job photo, applications,
a motion cue, what it deliberately is NOT, and its reference card (exemplar from REFERENCE-ANNEX-AUSTIN + teardown +
adaptation + distance check). Colours: black, white and the locked steel/neutral ramps only.
Run: python3 -I brand-v2/build_territories.py"""
import base64, html, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(ROOT, 'src'))
import home2  # noqa: E402  (the firm's own data: the 312 photographed pins and the pair captions)

css = open(os.path.join(ROOT, 'site/assets/css/home.css'), encoding='utf-8').read()
RAMP = {f'{n}-{k}': v for n, k, v in re.findall(r'--(steel|neutral)-(\d+):\s*(#[0-9A-F]{6})', css)}
S = lambda k: RAMP[f'steel-{k}']
N = lambda k: RAMP[f'neutral-{k}']
BLACK, WHITE = '#000000', '#FFFFFF'
NAME = 'Austin Pro Siding'


def b64(path, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()


FONTS = [('Montserrat', 700, 'brand-v2/fonts/Montserrat-700-latin.woff2'), ('Montserrat', 800, 'brand-v2/fonts/Montserrat-800-latin.woff2'),
         ('Inter', 400, 'brand-v2/fonts/Inter-400-latin.woff2'), ('Inter', 600, 'brand-v2/fonts/Inter-600-latin.woff2'), ('Inter', 700, 'brand-v2/fonts/Inter-700-latin.woff2'),
         ('Poppins', 600, 'site/assets/fonts/Poppins-600-latin.woff2'), ('Poppins', 700, 'site/assets/fonts/Poppins-700-latin.woff2'),
         ('Roboto', '100 900', 'site/assets/fonts/Roboto-latin.woff2')]
FACES = ''.join(f"@font-face{{font-family:'{f}';font-weight:{w};font-style:normal;font-display:block;src:url({b64(os.path.join(ROOT, p), 'font/woff2')}) format('woff2')}}"
                for f, w, p in FONTS)
PAIRS = {p['id']: p for p in home2.PAIRS6}


def photo(pid):
    p = PAIRS[pid]
    return b64(os.path.join(ROOT, f'site/assets/img/h/work-{pid}-a-1000.webp'), 'image/webp'), f"{p['place']}, {p['when']}. The firm's own job photo."


# --------------------------------------------------------------------------------------------------------------------
# territory prototype marks (64-unit box). These are direction sketches for the territory pick, not the concepts.
# --------------------------------------------------------------------------------------------------------------------
def mark_profile(fill, gap):
    """T1: a corner cut through a lapped wall. On the left, four courses in section: tall thin wedges, thin at the
    top and thick at the butt, each laid over the one below; from every butt edge the course's shadow line runs on
    across the wall face. Drawn bottom-up so each upper butt edge overlaps the board under it, as on the wall"""
    out = []
    for i in reversed(range(4)):
        t = 3 + i * 14.5
        b = t + 17
        out.append(f'<path d="M6 {t:.1f}H9.5L21 {b:.1f}H8Z" fill="{fill}" stroke="{gap}" stroke-width="2" stroke-linejoin="round"/>')
        out.append(f'<path d="M21 {b - 3:.1f}H60V{b:.1f}H21Z" fill="{fill}"/>')
    return ''.join(out)


def mark_order(fill, gap):
    """T2: the wall in assembly order as four flat planes, exploded down and to the right: sheathing (solid), wrap
    (solid), siding (the plane cut by three course slots), trim (an L frame). Flat planes only, separated by gaps"""
    P = lambda x, y: f'M{x} {y + 6}L{x + 26} {y}V{y + 26}L{x} {y + 32}Z'      # one skewed plane, 26 wide
    out = [f'<path d="{P(6, 4)}" fill="{fill}"/>', f'<path d="{P(13, 11)}" fill="{fill}" stroke="{gap}" stroke-width="2.6"/>']
    sx, sy = 20, 18
    out.append(f'<path d="{P(sx, sy)}" fill="{fill}" stroke="{gap}" stroke-width="2.6"/>')
    for k in range(3):   # course slots across the siding plane, following its skew
        y0 = sy + 10 + k * 7
        out.append(f'<path d="M{sx + 3} {y0 + 5.3}L{sx + 23} {y0 + 0.7}" stroke="{gap}" stroke-width="2"/>')
    tx, ty = 27, 25
    out.append(f'<path d="M{tx} {ty + 6}L{tx + 26} {ty}V{ty + 26}L{tx} {ty + 32}Z" fill="none" stroke="{gap}" stroke-width="8.6" stroke-linejoin="miter"/>')
    out.append(f'<path d="M{tx} {ty + 6}L{tx + 26} {ty}V{ty + 26}L{tx} {ty + 32}Z" fill="none" stroke="{fill}" stroke-width="4.4" stroke-linejoin="miter"/>')
    return ''.join(out)


HOUSE = ['...#...', '..###..', '.#####.', '#######', '#######', '###.###', '###.###']


def mark_record(fill, _gap, lit=None):
    """T3: a house set in the dot grid the firm's map uses: gable rows, wall rows, the door left as missing dots"""
    out, n = [], 0
    for r, row in enumerate(HOUSE):
        for c, ch in enumerate(row):
            if ch == '#':
                op = '' if lit is None or n < lit else ' opacity="0.16"'
                out.append(f'<circle cx="{5 + c * 9:.1f}" cy="{5 + r * 9:.1f}" r="3.55" fill="{fill}"{op}/>')
                n += 1
    return ''.join(out)


def svg(inner, size, vb='0 0 64 64', cls='', label=None):
    a = f' role="img" aria-label="{html.escape(label)}"' if label else ' aria-hidden="true"'
    return f'<svg class="{cls}" viewBox="{vb}" width="{size}" height="{size}"{a} focusable="false">{inner}</svg>'


# --------------------------------------------------------------------------------------------------------------------
# motifs, overlays and applications per territory
# --------------------------------------------------------------------------------------------------------------------
def motif_profile():
    """the wall face on the left, the same courses cut open in section on the right"""
    w, h = 1400, 300
    out = [f'<rect width="{w}" height="{h}" fill="{WHITE}"/>']
    ex = 34
    for i in range(9):
        y = 8 + i * ex
        out.append(f'<rect x="0" y="{y}" width="1000" height="{ex}" fill="{N(1)}"/>')
        out.append(f'<rect x="0" y="{y + ex - 7}" width="1000" height="7" fill="{N(5)}"/>')      # the shadow line under each butt edge
        out.append(f'<path d="M0 {y + ex}H1000" stroke="{N(10)}" stroke-width="1.6"/>')
    out.append(f'<rect x="1000" y="0" width="400" height="{h}" fill="{N(2)}"/>')
    out.append(f'<path d="M1000 0V{h}" stroke="{BLACK}" stroke-width="2.2" stroke-dasharray="10 6"/>')           # the cut
    for i in reversed(range(9)):
        y = 8 + i * ex
        out.append(f'<path d="M1090 {y - 4}H1096L1120 {y + ex + 2}H1093Z" fill="{S(9)}" stroke="{WHITE}" stroke-width="2"/>')
    out.append(f'<path d="M1086 0V{h}" stroke="{BLACK}" stroke-width="3"/>')
    out.append(f'<path d="M1050 0V{h}" stroke="{N(8)}" stroke-width="1" stroke-dasharray="3 5"/>')
    for i, t in enumerate(['WALL', 'WRAP', 'COURSE']):
        x = [1046, 1094, 1130][i]
        out.append(f'<text x="{x}" y="{h - 14}" class="lab">{t}</text>')
    out.append(f'<text x="24" y="{h - 14}" class="lab">FACE</text><text x="1016" y="24" class="lab">SECTION</text>')
    return svg(''.join(out), '100%', f'0 0 {w} {h}', 'motif')


def motif_order():
    """the exploded wall, flat planes on a visible construction grid, labelled in assembly order"""
    w, h = 1400, 300
    out = [f'<rect width="{w}" height="{h}" fill="{WHITE}"/>']
    for x in range(0, w + 1, 50):
        out.append(f'<path d="M{x} 0V{h}" stroke="{N(4)}" stroke-width="1"/>')
    for y in range(0, h + 1, 50):
        out.append(f'<path d="M0 {y}H{w}" stroke="{N(4)}" stroke-width="1"/>')
    layers = [('SHEATHING', S(12), None), ('HOUSE WRAP', S(6), None), ('LAP SIDING', S(9), 'courses'), ('TRIM', None, 'frame')]
    for i, (lab, fill, kind) in enumerate(layers):
        x, y = 500 + i * 120, 70 + i * 14
        d = f'M{x} {y + 34}L{x + 130} {y}V{y + 150}L{x} {y + 184}Z'
        if kind == 'frame':
            out.append(f'<path d="{d}" fill="none" stroke="{BLACK}" stroke-width="16" stroke-linejoin="miter"/>')
        else:
            out.append(f'<path d="{d}" fill="{fill}" stroke="{WHITE}" stroke-width="3"/>')
        if kind == 'courses':
            for k in range(1, 8):
                yy = y + 34 + k * 19
                out.append(f'<path d="M{x} {yy}L{x + 130} {yy - 34}" stroke="{WHITE}" stroke-width="2.5"/>')
        lx, ly = x + 65, (22 if i % 2 == 0 else 46)
        out.append(f'<path d="M{lx} {y + 16}V{ly + 4}" stroke="{N(9)}" stroke-width="1" />')
        out.append(f'<text x="{lx + 6}" y="{ly}" class="lab">{i + 1:02d} {lab}</text>')
    out.append(f'<text x="24" y="{h - 16}" class="lab">ASSEMBLY ORDER, EXPLODED</text>')
    return svg(''.join(out), '100%', f'0 0 {w} {h}', 'motif')


def motif_record():
    """the real field: the 312 photographed jobs where the firm's own map places them, white on a full-bleed steel field"""
    w, h = 1400, 300
    out = [f'<rect width="{w}" height="{h}" fill="{S(9)}"/>']
    hx0, hy0 = home2.NEAR['hq']
    sx = sy = 1.15
    ox, oy = 800 - hx0 * sx, 150 - hy0 * sy
    for x, y, *_r in home2.PINS:
        out.append(f'<circle cx="{ox + x * sx:.1f}" cy="{oy + y * sy:.1f}" r="3" fill="{WHITE}"/>')
    hx, hy = home2.NEAR['hq']
    out.append(f'<circle cx="{ox + hx * sx:.1f}" cy="{oy + hy * sy:.1f}" r="11" fill="none" stroke="{WHITE}" stroke-width="2"/>')
    out.append(f'<rect x="12" y="{h - 54}" width="440" height="46" fill="{S(9)}"/><text x="24" y="{h - 34}" class="lab lab-w">THE FIELD IS THE FIRM\'S OWN MAP, ZOOMED ON AUSTIN</text>'
               f'<text x="24" y="{h - 16}" class="lab lab-w">312 on the map with photos + 574 more counted</text>')
    return svg(''.join(out), '100%', f'0 0 {w} {h}', 'motif')


def overlay(kind):
    if kind == 'profile':   # a section callout on the photo's siding: the course cut drawn at the photo's edge
        return (f'<svg class="ovl" viewBox="0 0 100 62.5" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
                f'<rect x="84" y="0" width="16" height="62.5" fill="{WHITE}"/>'
                + ''.join(f'<path d="M88 {2 + i * 7.6:.1f}H89L92.6 {11.4 + i * 7.6:.1f}H88.6Z" fill="{S(9)}" stroke="{WHITE}" stroke-width=".4"/>' for i in reversed(range(8)))
                + f'<path d="M87.6 0V62.5" stroke="{BLACK}" stroke-width=".8"/></svg>')
    if kind == 'order':     # the construction grid laid over the job
        return (f'<svg class="ovl" viewBox="0 0 100 62.5" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
                + ''.join(f'<path d="M{x} 0V62.5" stroke="{WHITE}" stroke-opacity=".55" stroke-width=".18"/>' for x in range(0, 101, 10))
                + ''.join(f'<path d="M0 {y}H100" stroke="{WHITE}" stroke-opacity=".55" stroke-width=".18"/>' for y in range(0, 63, 10))
                + '</svg>')
    return (f'<svg class="ovl" viewBox="0 0 100 62.5" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'   # record: the job is one dot
            f'<circle cx="80" cy="16" r="5" fill="none" stroke="{WHITE}" stroke-width=".7"/><circle cx="80" cy="16" r="1.4" fill="{WHITE}"/></svg>')


def van(lockup_svg):
    """a plain service-van side, neutral line drawing, the lockup on the cargo door"""
    return (f'<svg class="app" viewBox="0 0 420 200" aria-hidden="true"><rect width="420" height="200" fill="{N(1)}"/>'
            f'<path d="M30 150V60Q30 44 46 44H300Q318 44 330 58L376 104Q386 114 386 128V150Z" fill="{WHITE}" stroke="{N(9)}" stroke-width="2.5"/>'
            f'<path d="M306 60H322L360 104H306Z" fill="{N(3)}" stroke="{N(9)}" stroke-width="2"/><path d="M296 52V150" stroke="{N(7)}" stroke-width="1.5"/>'
            f'<circle cx="96" cy="152" r="22" fill="{N(12)}"/><circle cx="96" cy="152" r="8" fill="{N(5)}"/><circle cx="318" cy="152" r="22" fill="{N(12)}"/><circle cx="318" cy="152" r="8" fill="{N(5)}"/>'
            f'<path d="M14 176H406" stroke="{N(6)}" stroke-width="2"/>'
            f'<g transform="translate(52 72)">{lockup_svg}</g></svg>')


def sign(mark_inner, fg, bg, word_cls):
    return (f'<div class="sign" style="background:{bg};color:{fg}">{svg(mark_inner, 64)}<div class="sign-w {word_cls}">{NAME}</div>'
            f'<div class="sign-t">(512) 550-0000</div></div><div class="stake"></div>')


# --------------------------------------------------------------------------------------------------------------------
# the three territories
# --------------------------------------------------------------------------------------------------------------------
T = [
    dict(
        key='profile', no='T1', name='THE PROFILE CUT',
        idea='Every lap course, cut through, is the same wedge laid over the one below. The brand draws the trade from the side nobody shows: the section cut through a finished wall.',
        story='The cut proves the work: you can only draw this edge if you know how the boards hang.',
        material='Lap-siding courses, seen end-on: wedge, overlap, butt edge, the wall they hang on.',
        type_dir='Montserrat 800 for the wordmark, set in caps: flat-sided, wide letters that hold at truck-door distance, like sign-painted lettering on a work van. Roboto for everything that is read.',
        word_cls='w-mont', word='AUSTIN PRO SIDING',
        colour='White and black carry the page. Steel-9 is the mark\'s one colour and, in drawings, the cut face of the courses, the way a drawing hatches a section; nowhere else.',
        share=(80, 14, 6),
        mark=mark_profile, motif=motif_profile, photo='robroy',
        motion='On load, the four courses hang themselves top-down, each wedge sliding 6 px up into its overlap. 4 × 70 ms, 40 ms stagger, ease-out (0.2, 0.8, 0.2, 1): about 400 ms. The wall line draws first via dashoffset in 120 ms. On hover the courses close their gap by 1 px, 160 ms. Reduced motion: the final frame, still.',
        nots=['Not the face of the wall: no stack of horizontal stripes, the logo every siding firm already has.',
              'Not a roofline chevron or a house with a chimney.',
              'Not a retro badge or borrowed heritage: no script, no "est." seal.',
              'Not steel everywhere: steel is the mark and the cut face, nothing else on the page.'],
        ref=dict(name='Scout Motors', url='https://www.scoutmotors.com/', job='MOOD',
                 observed='Homepage at 1440 px, observed 2026-11-02 (screenshots in brand-v2/research/scout-*.png).',
                 why='Cinematic full-bleed photography of the product in real terrain carries the feeling, so the interface can stay nearly silent. Heritage is stated with a hard date label ("EST 2022") instead of adjectives.',
                 details='The navigation is built as separate white plates joined by small horizontal ticks, as if bolted together. Labels are set in tracked monospaced caps, the voice of a spec sheet. The one accent is a single hand-drawn red underline under two headline words: one drawn mark, used once. The headline is very large and tightly set.',
                 not_work='The script wordmark: it borrows heritage and reads poorly at distance. The long paragraph under the headline (a wall of text). The earthy sunset palette. A heavy cookie layer over the first view.',
                 adapt='Closely adapted: the hardware logic (parts visibly joined, here the courses overlapping at their butt edges); one drawn accent used once (Scout\'s red underline becomes the steel cut face); spec-label voice for small labels only.',
                 original='Original to this business: the lap-course section itself, a trade-only geometry; the steel family instead of red; no script; the courses as the mark rather than a wordmark-only identity.',
                 distance='Scout would not read this as theirs: (1) a geometric mark where theirs is a script wordmark; (2) steel and black where theirs is red on earth tones; (3) a building-trade section drawing where theirs is vehicle photography; (4) wide sans caps where theirs is script plus monospace.')),
    dict(
        key='order', no='T2', name='WALL ORDER',
        idea='A wall is built in order: sheathing, wrap, siding, trim. The mark is that order, four flat planes exploded down the line like a parts drawing, set on a construction grid that stays visible.',
        story='This firm builds in the right order and can show you each layer. The brand is the assembly drawing.',
        material='The exploded wall assembly: sheathing, house wrap, lap siding, trim, in the order they go on.',
        type_dir='Inter 700 for the wordmark in sentence case, set tight: engineered and neutral, with tabular figures for the numbers this firm publishes. Inter 400 for labels and text.',
        word_cls='w-inter', word=NAME,
        colour='Steel depth carries the layers (steel-12 sheathing, steel-6 wrap, steel-9 siding) over a hairline neutral grid, with black for the trim edge. Steel is the dominant colour of the mark itself; the page around it stays white.',
        share=(76, 8, 16),
        mark=mark_order, motif=motif_order, photo='siding0',
        motion='On scroll-into-view, the planes assemble in wall order: sheathing appears, then wrap, siding and trim each slide 6 px from up-left into place. Stagger 50 ms; each plane 140 ms on a spring with a 1.03 overshoot and settle; about 560 ms total. On hover the stack explodes 3 px apart and closes again, 200 ms. Reduced motion: assembled, still.',
        nots=['Not shaded 3D or an isometric render: flat planes only, no gradients.',
              'Not a blueprint-blue cliché: the grid is neutral hairline; steel is reserved for the layers.',
              'Not a cube or "stack" app logo: four planes in a trade order, one of them cut by courses.',
              'Not a diagram for its own sake: labels name layers, never invent numbers.'],
        ref=dict(name='Dropbox Brand', url='https://brand.dropbox.com/', job='MECHANISM',
                 observed='Brand guidelines site at 1440 px, observed 2026-11-02 (brand-v2/research/dropbox-*.png). Confirmed CSSDA Website of the Year 2025 winner (official announcement, 12 Feb 2026; top score 9.03, also Best UX Site).',
                 why='The page is its own construction grid: hairline lines run across the whole canvas and every block snaps to them, so order becomes the aesthetic. The glyph is built from flat diamond planes only; nothing is drawn, everything is a plane.',
                 details='Chapters are solid colour tiles of different proportions placed on the grid, with empty cells left visible. Large type sits flush to a column. The glyph sits small in a tile corner rather than centred. There is a lot of white between tiles.',
                 not_work='Its many-colour palette (this identity is steel only). Its wide display face (staples only here). The open-box glyph itself. The playful colour-pairing system, which would dilute one steel story.',
                 adapt='Closely adapted: the visible construction grid as the brand\'s ground; a mark built from flat planes only; layers presented as tiles snapped to the grid.',
                 original='Original to this business: the planes are a real wall assembly in trade order; one plane is cut by course lines; the trim is an L frame; steel depth instead of colour pairs.',
                 distance='Dropbox would not read this as theirs: (1) four planes in a stepped exploded stack, not an open box of diamonds; (2) a monochrome steel ramp, not a multi-colour system; (3) a wall assembly subject with labelled layers; (4) Inter instead of their display face.')),
    dict(
        key='record', no='T3', name='THE RECORD',
        idea='One dot is one photographed job. The mark is a house set in the dot grid the firm\'s map uses; the brand field behind it is the real map: 312 on the map with photos + 574 more counted.',
        story='Other firms say they have done the work. This one has plotted it.',
        material='The field of the firm\'s photographed job dots on the Austin map, and the dot as the unit.',
        type_dir='Poppins 700 for the wordmark: round geometry whose dots and bowls rhyme with the dot unit; friendly at a yard sign. Roboto for reading text.',
        word_cls='w-pop', word=NAME,
        colour='Steel-9 is owned as a full-bleed field carrying the white mark, the way one colour can be the whole brand surface. On light pages the mark flips to steel dots on white. Black only for text.',
        share=(70, 10, 20),
        mark=mark_record, motif=motif_record, photo='siding2',
        motion='On load, the dots fill from the foundation row up to the ridge, one row every 45 ms, each dot scaling from 0.6 to 1 with a spring (overshoot 1.04): 7 rows, about 450 ms. On hover the door dots blink once (100 ms). Reduced motion: complete house, still.',
        nots=['Not a map pin or location-marker logo.',
              'Not a dashboard or "data" startup look: no charts, no glow, no gradient.',
              'Not a claim in the mark: the dots in the mark are a drawing; only the field behind it is the real record, and it is labelled with the locked wording.',
              'Not a halftone texture used as decoration.'],
        ref=dict(name='Cash App brand assets', url='https://cash.app/press/assets', job='MECHANISM',
                 observed='Press resources and brand assets page at 1440 px, observed 2026-11-02 (brand-v2/research/cashbrand-*.png). The annex names "Cash App Brand Guidelines"; this public brand-assets page was the brand surface I could reach. No separate guidelines URL was found.',
                 why='One colour is owned so completely that a full-bleed field of it is the brand. The mark is a glyph inside a rounded-square container, so it works unchanged as app icon, favicon and avatar.',
                 details='The mark and wordmark are carried white on the field with a wide margin and no secondary colour. Black is used only for secondary actions (the "Log in" pill). The container\'s corner radius is roughly a fifth of its side.',
                 not_work='The dollar glyph and the neon green. The glossy 3D product renders further down the page. Rounded pills everywhere. The press page is generic below the hero.',
                 adapt='Closely adapted: one brand colour owned as a full-bleed field; the mark lives in a container tile that becomes the favicon and avatar; white on the field, nothing else.',
                 original='Original to this business: the field is the firm\'s real map data; the glyph is a house set in that map\'s dot unit; steel instead of green; the container is square-cornered like a lot plot.',
                 distance='Cash App would not read this as theirs: (1) a dot-set house, not a currency glyph; (2) steel blue-grey, not neon green; (3) a field of real geographic data instead of flat colour; (4) a square-cornered tile and Poppins instead of their rounded container and type.')),
]


def lockup_svg(t, fg, accent, gap, w=300):
    """mark + wordmark as one SVG (used on the van)"""
    fam = {'w-mont': "Montserrat;font-weight:800;letter-spacing:.02em", 'w-inter': "Inter;font-weight:700;letter-spacing:-.02em", 'w-pop': "Poppins;font-weight:700;letter-spacing:-.01em"}[t['word_cls']]
    size = 15 if t['word_cls'] == 'w-mont' else 19
    return (f'<svg x="0" y="4" width="44" height="44" viewBox="0 0 64 64">{t["mark"](accent, gap)}</svg>'
            f'<text x="54" y="33" style="font-family:{fam};font-size:{size}px" fill="{fg}">{html.escape(t["word"])}</text>')


def board(t):
    mk = t['mark']
    rec = t['key'] == 'record'
    hero_bg = S(9) if rec else WHITE
    hero_fg = WHITE if rec else BLACK
    hero_mark = mk(WHITE if rec else (S(9) if t['key'] != 'profile' else BLACK), S(9) if rec else WHITE)
    if t['key'] == 'profile':   # the accent lives on the cut face only: the large mark shows it in steel
        hero_mark = mk(S(9), WHITE)
    img, cap = photo(t['photo'])
    sizes = ''.join(f'<span class="sz">{svg(mk(BLACK, WHITE), s)}<i>{s}px</i></span>' for s in (120, 24, 16))
    tiles = (f'<div class="tile" style="background:{WHITE}">{svg(mk(BLACK, WHITE), 72)}<i>pure black</i></div>'
             f'<div class="tile" style="background:{BLACK}">{svg(mk(WHITE, BLACK), 72)}<i style="color:{N(5)}">pure white</i></div>'
             f'<div class="tile" style="background:{S(9)}">{svg(mk(WHITE, S(9)), 72)}<i style="color:{S(3)}">on steel-9</i></div>')
    frames = []
    for k, lab in ((0, 'start'), (1, 'mid'), (2, 'end')):
        if t['key'] == 'record':
            inner = mk(S(9), WHITE, lit=[0, 14, 99][k])
        elif t['key'] == 'profile':
            inner = mark_profile_frame(k)
        else:
            inner = mark_order_frame(k)
        frames.append(f'<div class="fr">{svg(inner, 84)}<i>{lab}</i></div>')
    share = t['share']
    bar = (f'<div class="bar"><span style="flex:{share[0]};background:{WHITE};color:{N(11)}">white + neutrals {share[0]}%</span>'
           f'<span style="flex:{share[1]};background:{BLACK};color:{WHITE}">black {share[1]}%</span>'
           f'<span style="flex:{share[2]};background:{S(9)};color:{WHITE}">steel {share[2]}%</span></div>')
    ramp = ''.join(f'<span style="background:{S(k)}" title="steel-{k} {S(k)}"></span>' for k in range(1, 13))
    fav = (f'<div class="tab"><span class="tab-ic">{svg(mk(S(9) if not rec else WHITE, WHITE if not rec else S(9)), 16)}</span>{NAME}</div>'
           if not rec else f'<div class="tab"><span class="tab-ic tab-ic-f">{svg(mk(WHITE, S(9)), 14)}</span>{NAME}</div>')
    r = t['ref']
    return f'''
<section class="terr" id="{t['key']}" aria-labelledby="{t['key']}-h">
  <header class="terr-head">
    <p class="terr-no">{t['no']} · territory</p>
    <h2 id="{t['key']}-h">{t['name']}</h2>
    <p class="terr-idea">{html.escape(t['idea'])}</p>
  </header>
  <div class="grid">
    <div class="p p-hero" style="background:{hero_bg};color:{hero_fg}">
      <div class="lock">{svg(hero_mark, 150, label=t['name'] + ' territory prototype mark')}<div class="word {t['word_cls']}">{html.escape(t['word'])}</div></div>
      <p class="p-note">Territory prototype: a direction sketch for the pick, not one of the three concepts.</p>
    </div>
    <div class="p p-mono"><div class="tiles">{tiles}</div><div class="sizes">{sizes}</div><p class="cap">Black-only first, white-only, then the steel anchor. 24 and 16 px shown as drawn, no simplified variant yet.</p></div>
    <div class="p p-photo"><figure><img src="{img}" alt="{html.escape(cap)}" width="1000" height="625">{overlay(t['key'])}<figcaption>{html.escape(cap)}</figcaption></figure></div>
    <div class="p p-motif">{t['motif']()}<p class="cap">Material: {html.escape(t['material'])}</p></div>
    <div class="p p-van">{van(lockup_svg(t, BLACK, S(9) if not rec else S(9), WHITE))}<p class="cap">Truck door: lockup at working distance.</p></div>
    <div class="p p-sign"><div class="sign-wrap">{sign(mk(WHITE if rec else BLACK, S(9) if rec else WHITE), WHITE if rec else BLACK, S(9) if rec else WHITE, t['word_cls'])}</div>{fav}</div>
    <div class="p p-type"><p class="lbl">Type</p><div class="spec {t['word_cls']}">{html.escape(t['word'])}</div><p class="spec-r">Since 2009. Call (512) 550-0000.</p><p class="cap">{html.escape(t['type_dir'])}</p></div>
    <div class="p p-colour"><p class="lbl">Colour</p>{bar}<div class="ramp">{ramp}</div><p class="cap">{html.escape(t['colour'])} Shares are intended proportions, not measurements.</p></div>
    <div class="p p-motion"><p class="lbl">Motion cue</p><div class="frames">{''.join(frames)}</div><p class="cap">{html.escape(t['motion'])}</p></div>
  </div>
  <div class="card">
    <div class="card-a">
      <p class="lbl">What this territory says</p><p class="story">{html.escape(t['story'])}</p>
      <p class="lbl">What it deliberately is NOT</p><ul>{''.join(f'<li>{html.escape(n)}</li>' for n in t['nots'])}</ul>
    </div>
    <div class="card-b">
      <p class="lbl">Reference card</p>
      <p class="ref"><b>{html.escape(r['name'])}</b> · <a href="{r['url']}">{r['url']}</a> · job: <b>{r['job']}</b></p>
      <p class="obs">{html.escape(r['observed'])}</p>
      <dl>
        <dt>Why it works</dt><dd>{html.escape(r['why'])}</dd>
        <dt>Principles and small details</dt><dd>{html.escape(r['details'])}</dd>
        <dt>What does not work, not imported</dt><dd>{html.escape(r['not_work'])}</dd>
        <dt>Adaptation</dt><dd>{html.escape(r['adapt'])}</dd>
        <dt>Original to Austin Pro Siding</dt><dd>{html.escape(r['original'])}</dd>
        <dt>Distance check</dt><dd>{html.escape(r['distance'])}</dd>
      </dl>
    </div>
  </div>
</section>'''


def mark_profile_frame(k):
    """motion frames for T1: the courses hang top-down, each shadow line drawing out after its wedge lands"""
    out = []
    shown = [1, 2, 4][k]
    for i in reversed(range(4)):
        t = 3 + i * 14.5
        b = t + 17
        dy = 0 if i < shown else 6
        op = '1' if i < shown else '0'
        out.append(f'<path d="M6 {t + dy:.1f}H9.5L21 {b + dy:.1f}H8Z" fill="{S(9)}" stroke="{WHITE}" stroke-width="2" opacity="{op}"/>')
        ln = 39 if i < shown - 1 or k == 2 else 14
        out.append(f'<path d="M21 {b - 3 + dy:.1f}H{21 + ln}V{b + dy:.1f}H21Z" fill="{S(9)}" opacity="{op}"/>')
    return ''.join(out)


def mark_order_frame(k):
    """motion frames for T2: planes assemble in wall order"""
    full = mark_order(S(9), WHITE)
    parts = re.findall(r'<path [^>]*/>', full)
    keep = [2, 4, len(parts)][k]
    return ''.join(parts[:keep])


ANIM = f'''
@media (prefers-reduced-motion: no-preference) {{
  #profile .p-hero svg path {{ animation: hang 300ms cubic-bezier(.2,.8,.2,1) both; }}
  #profile .p-hero svg path:nth-child(-n+2) {{ animation-delay: 210ms }} #profile .p-hero svg path:nth-child(n+3):nth-child(-n+4) {{ animation-delay: 140ms }}
  #profile .p-hero svg path:nth-child(n+5):nth-child(-n+6) {{ animation-delay: 70ms }}
  @keyframes hang {{ from {{ transform: translateY(6px); opacity: 0 }} to {{ transform: none; opacity: 1 }} }}
  #order .p-hero svg path {{ animation: seat 280ms cubic-bezier(.34,1.3,.5,1) both; }}
  #order .p-hero svg path:nth-child(2) {{ animation-delay: 50ms }} #order .p-hero svg path:nth-child(3) {{ animation-delay: 100ms }}
  #order .p-hero svg path:nth-child(n+4) {{ animation-delay: 150ms }}
  @keyframes seat {{ from {{ transform: translate(-6px,-6px); opacity: 0 }} to {{ transform: none; opacity: 1 }} }}
  #record .p-hero svg circle {{ transform-box: fill-box; transform-origin: center; animation: dot 260ms cubic-bezier(.34,1.4,.5,1) both; }}
  {''.join(f'#record .p-hero svg circle:nth-child({i + 1}) {{ animation-delay: {(6 - r) * 45}ms }}' for i, r in enumerate(r for r, row in enumerate(HOUSE) for ch in row if ch == '#'))}
  @keyframes dot {{ from {{ transform: scale(.6); opacity: 0 }} to {{ transform: none; opacity: 1 }} }}
}}'''

PAGE = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Austin Pro Siding: logo territories</title>
<meta name="description" content="Phase 1, step 1: three logo territories as stylescapes, for the territory pick.">
<style>
{FACES}
:root {{ --s9:{S(9)}; --s3:{S(3)}; --n1:{N(1)}; --n2:{N(2)}; --n4:{N(4)}; --n6:{N(6)}; --n8:{N(8)}; --n9:{N(9)}; --n11:{N(11)}; --n12:{N(12)}; --ink:{BLACK}; --paper:{WHITE}; }}
* {{ box-sizing: border-box }}
body {{ margin: 0; background: var(--n2); color: var(--n12); font: 400 16px/1.55 Roboto, system-ui, sans-serif; }}
.top {{ max-width: 1408px; margin: 0 auto; padding: 48px 16px 24px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; align-items: end; }}
.top h1 {{ margin: 0; font: 700 44px/1.1 Inter, sans-serif; letter-spacing: -.02em; color: var(--ink); }}
.top p {{ margin: 8px 0 0; max-width: 62ch; color: var(--n11); }}
.top .rules {{ font-size: 14px; color: var(--n11); border-left: 2px solid var(--ink); padding-left: 16px; }}
.terr {{ max-width: 1408px; margin: 0 auto 64px; padding: 0 16px; }}
.terr-head {{ display: grid; grid-template-columns: 220px 1fr; gap: 24px; align-items: baseline; padding: 32px 0 16px; border-top: 2px solid var(--ink); }}
.terr-no {{ margin: 0; font: 600 14px/1.3 Inter, sans-serif; color: var(--n9); }}
.terr-head h2 {{ margin: 0; font: 700 32px/1.2 Inter, sans-serif; letter-spacing: -.01em; color: var(--ink); grid-column: 1; }}
.terr-idea {{ margin: 0; grid-column: 2; grid-row: 1 / span 2; font-size: 19px; line-height: 1.5; color: var(--n12); max-width: 70ch; }}
.grid {{ display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 300px; gap: 16px; }}
.p {{ position: relative; background: var(--paper); border-radius: 4px; overflow: hidden; padding: 24px; display: flex; flex-direction: column; }}
.p-hero {{ grid-column: span 2; grid-row: span 2; justify-content: center; align-items: center; }}
.lock {{ display: flex; align-items: center; gap: 32px; }}
.word {{ font-size: 40px; line-height: 1.1; }}
.w-mont {{ font-family: Montserrat; font-weight: 800; letter-spacing: .02em; }}
.w-inter {{ font-family: Inter; font-weight: 700; letter-spacing: -.02em; }}
.w-pop {{ font-family: Poppins; font-weight: 700; letter-spacing: -.01em; }}
.p-hero .w-mont {{ font-size: 34px; max-width: 9ch; }}
.p-note {{ position: absolute; left: 24px; bottom: 16px; margin: 0; font-size: 12px; opacity: .72; }}
.p-mono {{ grid-column: span 2; gap: 16px; }}
.p-colour, .p-motion {{ grid-column: span 2; }}
.tiles {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; flex: 1; }}
.tile {{ display: grid; place-items: center; border-radius: 4px; position: relative; border: 1px solid var(--n4); }}
.tile i, .sz i, .fr i {{ font-style: normal; font-size: 12px; color: var(--n9); }}
.tile i {{ position: absolute; bottom: 6px; left: 8px; }}
.sizes {{ display: flex; align-items: flex-end; gap: 24px; }}
.sz {{ display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }}
.sizes .sz:first-child svg {{ width: 64px; height: 64px; }}
.p-photo {{ grid-column: span 2; padding: 0; }}
.p-photo figure {{ margin: 0; position: relative; height: 100%; }}
.p-photo img {{ width: 100%; height: 100%; object-fit: cover; display: block; }}
.ovl {{ position: absolute; inset: 0; width: 100%; height: 100%; }}
.p-photo figcaption {{ position: absolute; left: 12px; bottom: 12px; background: var(--paper); color: var(--n12); font-size: 12px; padding: 4px 8px; border-radius: 2px; }}
.p-motif {{ grid-column: span 4; padding: 0; }}
.p-motif .motif {{ width: 100%; height: 100%; display: block; }}
.p-motif .cap {{ position: absolute; right: 16px; bottom: 8px; background: var(--paper); padding: 4px 8px; margin: 0; }}
.lab {{ font: 600 12px Inter, sans-serif; letter-spacing: .06em; fill: {N(11)}; }}
.lab-w {{ fill: {WHITE}; }}
.p-van {{ grid-column: span 2; padding: 0; }}
.p-van .app {{ width: 100%; height: 100%; display: block; }}
.p-van .cap {{ position: absolute; left: 16px; bottom: 8px; margin: 0; }}
.p-sign {{ justify-content: space-between; background: var(--n1); }}
.sign-wrap {{ display: flex; flex-direction: column; align-items: center; }}
.sign {{ width: 100%; padding: 16px; border-radius: 2px; display: flex; flex-direction: column; align-items: center; gap: 8px; border: 1px solid var(--n6); }}
.sign svg {{ width: 48px; height: 48px; }}
.sign-w {{ font-size: 17px; line-height: 1.1; text-align: center; }}
.sign-t {{ font: 600 15px Inter, sans-serif; font-variant-numeric: tabular-nums; }}
.stake {{ width: 6px; height: 28px; background: var(--n9); }}
.tab {{ display: flex; align-items: center; gap: 8px; background: var(--paper); border: 1px solid var(--n6); border-bottom: 0; border-radius: 8px 8px 0 0; padding: 8px 12px; font-size: 13px; width: max-content; }}
.tab-ic {{ display: inline-grid; }} .tab-ic-f {{ background: var(--s9); border-radius: 2px; padding: 1px; }}
.lbl {{ margin: 0 0 8px; font: 600 13px Inter, sans-serif; color: var(--n9); }}
.spec {{ font-size: 30px; line-height: 1.1; color: var(--ink); }}
.spec-r {{ margin: 8px 0 0; font-size: 16px; font-variant-numeric: tabular-nums; }}
.cap {{ margin: auto 0 0; font-size: 13px; line-height: 1.45; color: var(--n11); }}
.bar {{ display: flex; height: 64px; border: 1px solid var(--n6); border-radius: 2px; overflow: hidden; }}
.bar span {{ display: flex; align-items: flex-end; padding: 6px; font-size: 11px; line-height: 1.2; min-width: 0; }}
.ramp {{ display: flex; height: 16px; margin-top: 8px; }} .ramp span {{ flex: 1; }}
.frames {{ display: flex; gap: 12px; }}
.fr {{ display: flex; flex-direction: column; align-items: center; gap: 4px; border: 1px solid var(--n4); border-radius: 2px; padding: 8px; }}
.card {{ display: grid; grid-template-columns: 1fr 1.6fr; gap: 16px; margin-top: 16px; }}
.card-a, .card-b {{ background: var(--paper); border-radius: 4px; padding: 24px; }}
.story {{ margin: 0 0 24px; font: 600 20px/1.35 Inter, sans-serif; color: var(--ink); }}
.card ul {{ margin: 0; padding-left: 18px; }} .card li {{ margin-bottom: 8px; }}
.ref {{ margin: 0; font-size: 17px; }} .ref a {{ color: var(--s9); }}
.obs {{ margin: 4px 0 16px; font-size: 13px; color: var(--n9); }}
dl {{ margin: 0; display: grid; grid-template-columns: 210px 1fr; gap: 8px 16px; }}
dt {{ font: 600 14px/1.5 Inter, sans-serif; color: var(--n12); }} dd {{ margin: 0; font-size: 15px; }}
.shared {{ max-width: 1408px; margin: 0 auto 64px; padding: 24px 16px 0; border-top: 2px solid var(--ink); display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }}
.shared h2 {{ margin: 0 0 8px; font: 700 24px/1.25 Inter, sans-serif; color: var(--ink); }}
.shared p {{ margin: 0 0 12px; }}
a {{ color: var(--s9); }}
{ANIM}
</style></head><body>
<header class="top">
  <div><h1>Austin Pro Siding: three logo territories</h1>
  <p>Phase 1, step 1. Each board is one territory: one dominant idea, its type and colour direction, the material it is built from, and what it is not. The marks on these boards are territory prototypes, drawn only to show each direction. After the pick, three concepts are built inside the chosen territory.</p></div>
  <div class="rules">The mark: black, white and one accent from the steel family (anchor steel-9 {S(9)}). Type: staple faces only (Montserrat, Inter, Poppins, Roboto). Photos: the firm's own job photos, captioned from its data. References: the annex list only, each with its teardown.</div>
</header>
{''.join(board(t) for t in T)}
<section class="shared" aria-label="Shared notes">
  <div><h2>Motion quality bar, all three</h2>
  <p><b>Graza</b> · <a href="https://www.graza.co/">https://www.graza.co/</a> · job: QUALITY BAR (scoped by the annex to custom animation). Observed 2026-11-02 in static frames at 1440 px (brand-v2/research/graza-*.png). The drawn olive carries its own labelled action ("*DRIP*"): the motion belongs to the product and could not be lifted onto anything else. Not imported: the serif, the hand-drawn illustration style, the olive-green palette.</p>
  <p>Applied here: each territory's motion is made from its own material (courses hang, planes assemble in wall order, dots fill from the foundation) and each stays under 700 ms, per the motion rules for the logo.</p></div>
  <div><h2>Recommendation, as an input to the pick</h2>
  <p><b>T3, The Record</b>, on ownability: no other siding firm can put its own field of photographed jobs behind its mark, and a stranger who sees that field once can name the firm from a screenshot. Its risk is reading as an app: dot-matrix houses exist elsewhere, so the concepts would have to earn the house from the firm's map grid, not from a generic dot font. Its prototype also fills in at 16 px; the concepts need a simplified small-size variant.</p>
  <p><b>T1, The Profile Cut</b>, as the trade-specific alternative: the section cut is siding knowledge made visible, but on this prototype, at 24 and 16 px the wedges and lines start to read as a list icon, which the concepts would have to solve. <b>T2, Wall Order</b> is the most systematic and the most at risk of looking like a generic "layers" icon.</p></div>
</section>
</body></html>'''

out = os.path.join(HERE, 'phase1-territories.html')
open(out, 'w', encoding='utf-8').write(PAGE)
print(out, len(PAGE) // 1024, 'KB')

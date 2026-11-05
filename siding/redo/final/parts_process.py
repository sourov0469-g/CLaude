"""SECTION 7 — Process (Version D, "Four columns", upgraded). Four columns, one open at a time: 01 Free inspection, 02 Detailed proposal, 03 Expert install,
04 Final check. The open column shows its step in words, two published figures and a small drawing that plays itself (a lens scanning the house; a proposal
whose lines write themselves; boards going up; a checklist ticking). A progress thread joins the four. Every sentence and figure is the firm's own text
(the earlier Process D markup and faq.json); the chip labels are fragments of those same sentences. Nothing is added, nothing summed."""
import html, json, os, re
e = html.escape
HERE = os.path.dirname(os.path.abspath(__file__)); WORK = os.path.join(HERE, '..', '..', 'work'); PRE = os.path.join(HERE, '..', 'prep', 'backgrounds')
REPLACES = ['proc2']   # the old Process module (proc2: C and D) drops out; this section carries its own CSS and JS
CSS = 'proc.css'
JS = 'proc.js'
GLOBAL = 'FProc'

HEAD = 'Four steps. Nothing hidden.'
STEPS = [
    ('01', 'Free inspection', 'A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade.',
     [('One visit', 'covers every trade on the house'), ('Mon–Fri 8–8', 'Sat 8–6 · Sun 12–5')]),
    ('02', 'Detailed proposal', 'An itemised price for the work you want, nothing else. Here is where our documented jobs actually landed.',
     [('$10k–$15k', 'median band, 415 priced siding jobs'), ('Itemised', 'only the work you asked for')]),
    ('03', 'Expert install', 'Old material off, new boards up, then trim and paint. Windows are measured, built to order, then set and sealed.',
     [('1–2 weeks', 'a siding job on site, paint included'), ('2 days', 'most window-only jobs')]),
    ('04', 'Final check', 'We walk the finished job with you, clear the punch list and leave the site clean. Then the warranties start.',
     [('Lifetime', 'workmanship warranty on labor'), ('30 years', 'James Hardie siding, non-prorated')]),
]
# chip labels: fragments of each step's own sentence; phase ends are fractions of the drawing's timeline
CHIPS = [['Siding', 'Trim', 'Windows', 'Roof', 'Gutters'], ['Work you want', 'Itemised price', 'Nothing else'],
         ['Old material off', 'New boards up', 'Trim and paint', 'Windows set and sealed'], ['Walk the job', 'Punch list', 'Site clean', 'Warranties']]
ENDS = [[.308, .476, .644, .812, .98], [.52, .8, .98], [.28, .56, .76, 1], [.25, .5, .75, 1]]
HINT = ['Move the lens over the house', 'Move across the drawing', 'Move across the drawing', 'Move across the drawing']
VB = ['38 30 244 183', '0 0 320 240', '50 28 246 185', '8 10 304 228']   # each drawing's own view box (all 4:3)
DUR = [7.6, 6.6, 8.6, 7.4]   # seconds the drawing takes to play once
CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>'


def check():
    """Every sentence and figure must exist in the firm's earlier Process D markup or in faq.json (curly apostrophes normalised)."""
    import parts_ported as PP
    old = PP.sections()['process']
    F = json.load(open(os.path.join(WORK, 'data', 'faq.json'), encoding='utf-8')); faq = ' '.join(a for k in F for _, a in F[k]).replace('’', "'")
    for n, t, p, f in STEPS:
        assert t in old and p in old, (t, p)
        for a, b in f: assert a in old and b in old, (a, b)
    assert HEAD in old
    for s in ('A siding replacement typically takes 1 to 2 weeks, including the painting process.', 'Most of the window-only jobs in our files took two days on site.',
              'Austin Pro adds a lifetime workmanship warranty on labor.', 'James Hardie siding carries a 30-year non-prorated warranty'): assert s in faq, s
    assert 'the middle half' in faq and 'median fell in the $10,000–$15,000 band' in faq and '415 siding jobs' in faq


# ---------- the drawings: static geometry here, motion in proc.js (each animated element names its kind, its time window and its offsets) ----------
def T(s, e): return f' data-t="{s},{e}"'
def dp(d, s, e, cls='l'): return f'<path class="{cls}" d="{d}" pathLength="1" data-k="d"{T(s, e)}/>'
def gk(k, s, e, inner, v=None, c=None, out=False, cls=''):
    a = f' data-k="{k}"{T(s, e)}' + (f' data-v="{v}"' if v else '') + (f' data-c="{c}"' if c else '') + (' data-o="out"' if out else '') + (f' class="{cls}"' if cls else '')
    return f'<g{a}>{inner}</g>'


def art0():
    o = [dp('M42 208H278', 0, .05, 'l th')]
    o.append('<g data-z="siding">' + ''.join(dp(f'M74 {y}H246', .05 + i * .012, .1 + i * .012, 'l th') for i, y in enumerate(range(120, 200, 14))) + '</g>')
    o.append(dp('M72 208V106H248V208', .02, .08))
    o.append('<g data-z="roof">' + dp('M56 112L160 40L264 112', .04, .1) + '</g>')
    o.append(dp('M196 74V46H214V86', .07, .1))
    o.append('<g data-z="trim">' + dp('M72 108V208', .08, .13, 'l tr') + dp('M248 108V208', .09, .14, 'l tr') + '</g>')
    o.append('<g data-z="gutters">' + dp('M50 116H270', .1, .14) + dp('M262 118V206', .11, .15, 'l th') + '</g>')
    w = ''
    for x, s in ((92, .08), (190, .1)):
        w += gk('f', s, s + .03, f'<rect class="fp" x="{x}" y="128" width="38" height="34" rx="2"/>') + dp(f'M{x} 128h38v34h-38z', s, s + .05) + dp(f'M{x + 19} 128v34M{x} 145h38', s + .03, s + .07, 'l th')
    o.append('<g data-z="windows">' + w + '</g>')
    o.append(gk('f', .09, .12, '<rect class="fp" x="144" y="152" width="32" height="56" rx="2"/>') + dp('M144 208V152H176V208', .09, .13) + dp('M170 182v.1', .12, .13, 'l kn'))
    o.append('<g class="lens" data-lens><circle r="17" class="lg"/><path d="M12 12l15 15" class="l lh"/></g>')
    return o


def art1():
    rows = [(70, 56), (92, 64), (114, 46), (136, 66), (158, 58)]
    cfg = []
    o = ['<g class="sh2" data-k="f"' + T(0, .03) + '><path d="M98 22H210L232 44V232H98Z" class="l th" transform="translate(9 7)"/></g>',
         gk('f', 0, .03, '<path class="fs" d="M88 14H206L228 36V226H88Z"/>') + dp('M88 14H206L228 36V226H88Z', 0, .05) + dp('M206 14V36H228', .03, .06, 'l th')]
    o.append(dp('M104 38H160', .02, .06, 'l tt') + gk('p', .02, .05, '<rect class="fa" x="196" y="30" width="16" height="12" rx="3"/>', c='204,36'))
    for k, (y, ln) in enumerate(rows):
        s = .05 + k * .085; e = s + .075; cfg.append([126, 126 + ln, y, s, e])
        o.append(gk('f', s - .02, s + .01, f'<rect class="bx" x="104" y="{y - 9}" width="12" height="12" rx="2.5"/>') + dp(f'M126 {y}h{ln}', s, e) + dp(f'M126 {y + 9}h{ln // 2}', s + .02, e, 'l th')
                 + dp(f'M200 {y}h12', s + .01, e, 'l pr') + dp(f'M106.5 {y - 3}l3.5 4 6-8', e - .005, e + .03, 'l ck'))
    o.append(dp('M104 178H212', .52, .56, 'l th'))
    o.append(gk('w', .54, .66, '<rect class="fa" x="104" y="186" width="108" height="14" rx="4"/>', c='104,193'))
    o.append(gk('p', .66, .74, '<g transform="rotate(-11 178 206)"><rect x="134" y="194" width="88" height="26" rx="6" class="l stp"/><text x="178" y="212" text-anchor="middle" class="stt">ITEMISED</text></g>', c='178,206'))
    o.append(gk('x', .66, .76, '<path class="l th" d="M142 190l-8-4M216 190l8-5M178 190v-8"/>', c='178,206'))
    o.append(dp('M100 214L216 224', .82, .97, 'l th') + dp('M216 214L100 224', .84, .98, 'l th'))
    o.append('<g class="pen" data-pen><path class="pb" d="M7.2 -2.7L26.3 -21.8L21.8 -26.3L2.7 -7.2Z"/><path class="pt" d="M0 0L7.2 -2.7L2.7 -7.2Z"/><path class="pc" d="M26.3 -21.8L30.6 -26.1L26.1 -30.6L21.8 -26.3Z"/><path class="pl" d="M16 -11.5L19 -14.5"/></g>')
    return o, cfg


def art2():
    X0, X1 = 72, 248; o = []
    pat = '<defs><pattern id="prHat" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><path d="M0 0v7" stroke="#0E3B2C" stroke-opacity=".16" stroke-width="1"/></pattern></defs>'
    o.append(pat + '<rect x="72" y="40" width="176" height="168" fill="url(#prHat)" class="wrap"/>' + '<rect class="wrap2" x="72" y="40" width="176" height="168"/>')
    o.append(dp('M54 208H294', 0, .05, 'l th'))
    lad = dp('M268 70V208M286 70V208', 0, .06) + ''.join(dp(f'M268 {y}H286', .02 + i * .004, .07, 'l th') for i, y in enumerate(range(84, 208, 18)))
    o.append(lad)
    o.append(gk('f', .2, .3, '<rect x="172" y="88" width="60" height="62" class="hole"/>'))
    for k in range(12):   # old boards, leaving from the top
        y = 208 - 14 * (k + 1); s = .005 + (11 - k) * .0155
        crack = f'<path class="l th" d="M{98 + (k * 37) % 110} {y + 2}l5 5l-4 4"/>' if k % 2 else ''
        o.append(gk('s', s, s + .075, f'<rect x="{X0}" y="{y + 1}" width="{X1 - X0}" height="12" class="old"/>{crack}', v='-96,0', out=True))
    for k in range(12):   # new boards, going up from the bottom; the five courses beside the window opening are split
        y = 208 - 14 * (k + 1); s = .25 + k * .0185
        segs = [(X0, X1)] if not (82 <= y <= 138) else [(X0, 172), (232, X1)]
        inner = ''.join(f'<rect x="{a}" y="{y + .5}" width="{b - a}" height="13" class="nb"/><path d="M{a + 3} {y + 12.4}H{b - 3}" class="l th sd"/><circle cx="{a + 7}" cy="{y + 5}" r="1.1" class="nl"/><circle cx="{b - 7}" cy="{y + 5}" r="1.1" class="nl"/>' for a, b in segs)
        o.append(gk('s', s, s + .075, inner, v='84,0'))
    o.append(gk('s', .56, .64, '<rect x="64" y="36" width="9" height="174" class="nb"/>', v='0,-70'))
    o.append(gk('s', .58, .66, '<rect x="247" y="36" width="9" height="174" class="nb"/>', v='0,-70'))
    o.append(gk('w', .62, .74, '<rect x="73" y="40" width="174" height="168" class="paint"/>', c='73,0'))
    o.append('<g class="roll" data-roll><rect x="-5" y="-26" width="10" height="52" rx="4" class="rl"/><path d="M0 -26v-8h-14" class="l"/><path d="M-14 -34v-12" class="l"/></g>')
    dm = gk('f', .76, .8, gk('f', .86, .9, dp('M172 78H232', .76, .8, 'l th') + dp('M172 73v10M232 73v10', .77, .8, 'l th') + dp('M162 88V150', .77, .81, 'l th') + dp('M157 88h10M157 150h10', .78, .81, 'l th'), out=True))
    o.append(dm)
    win = ('<rect x="172" y="88" width="60" height="62" class="wf"/><rect x="177" y="93" width="50" height="52" class="gl"/><path d="M177 119h50M202 93v52" class="l th"/>'
           '<path d="M183 141L219 97" class="gs"/><rect x="172" y="88" width="60" height="62" class="l" fill="none"/>')
    o.append(gk('s', .82, .92, win, v='0,-52'))
    o.append(dp('M168 84H236V154H168Z', .92, 1, 'l bead'))
    return o


def art3():
    o = [dp('M10 208H190', 0, .05, 'l th'), dp('M16 108L100 46L184 108', .0, .06), dp('M156 80V52H172V92', .03, .06), dp('M30 208V102H170V208', .02, .07)]
    o.append(gk('f', .04, .08, '<rect class="fp" x="46" y="124" width="30" height="28"/><rect class="fp" x="124" y="124" width="30" height="28"/><rect class="fp" x="86" y="152" width="28" height="56"/>')
             + dp('M46 124h30v28h-30zM124 124h30v28h-30z', .04, .09) + dp('M114 208V152H86V208', .05, .1) + dp('M61 124v28M46 138h30M139 124v28M124 138h30', .07, .1, 'l th'))
    # walkers' trail, punch-list markers, debris
    o.append(''.join(gk('p', .01 + i * .018, .03 + i * .018, f'<circle cx="{34 + i * 12.5}" cy="222" r="1.9" class="dt"/>', c=f'{34 + i * 12.5},222') for i in range(12)))
    o.append(gk('f', .24, .3, '<g class="walker" data-walk><circle cx="0" cy="-16" r="4.6" class="wk"/><path d="M0 -11V-1M0 -1L-4 8M0 -1L4 8M0 -8L-6 -3M0 -8L6 -4" class="l wl"/></g>', out=True))
    for i, (mx, my) in enumerate(((58, 180), (100, 138), (146, 184))):
        s = .26 + i * .065
        o.append(gk('f', 0, .04, gk('p', s, s + .05, f'<circle cx="{mx}" cy="{my}" r="8" class="mk"/><path d="M{mx} {my - 4}v4M{mx} {my + 3}v.1" class="l mkx"/>', c=f'{mx},{my}', out=True)))
        o.append(gk('p', s + .02, s + .09, f'<circle cx="{mx}" cy="{my}" r="8" class="ok"/><path d="M{mx - 4} {my}l3 3.5 5.5-7" class="l okc"/>', c=f'{mx},{my}'))
        o.append(gk('x', s + .02, s + .1, f'<circle cx="{mx}" cy="{my}" r="12" class="l bu"/>', c=f'{mx},{my}'))
    deb = [(40, 'M0 0l6 -1l1 4l-6 1z'), (66, 'M0 0l4 -3l3 3l-3 3z'), (104, 'M0 0l7 0l-1 3l-6 0z'), (132, 'M0 0l5 -2l2 4l-5 1z'), (156, 'M0 0l4 -3l4 1l-1 4z')]
    for x, d in deb:
        s = .5 + (x - 20) / 176 * .18
        o.append(gk('s', s, s + .05, f'<path d="{d}" transform="translate({x} 202)" class="db"/>', v='60,-4', out=True))
    o.append('<g class="broom" data-broom><path d="M0 -34L-4 0" class="l"/><path d="M-9 0h10l3 10h-16z" class="bm"/></g>')
    o.append(gk('p', .76, .86, '<path d="M100 66L114 72V84C114 95 106 101 100 104C94 101 86 95 86 84V72Z" class="sd2"/>' + dp('M93 84l5 5 9-11', .8, .88, 'l sc'), c='100,84'))
    o.append(gk('x', .82, .96, '<circle cx="100" cy="84" r="22" class="l bu"/>', c='100,84'))
    o.append(gk('p', .9, .97, '<path d="M60 70l2 -5l2 5l5 2l-5 2l-2 5l-2 -5l-5 -2z" class="sp"/><path d="M148 62l2 -5l2 5l5 2l-5 2l-2 5l-2 -5l-5 -2z" class="sp"/>', c='108,70'))
    # the clipboard
    o.append(gk('f', 0, .04, '<rect class="fs" x="204" y="30" width="104" height="176" rx="9"/>') + dp('M204 40a10 10 0 0 1 10 -10H298a10 10 0 0 1 10 10V196a10 10 0 0 1 -10 10H214a10 10 0 0 1 -10 -10Z', 0, .06, 'l')
             + '<rect class="fa" x="238" y="22" width="36" height="14" rx="5"/>')
    for k, y in enumerate((70, 106, 142, 178)):
        en = ENDS[3][k]
        o.append(gk('f', 0, .04, f'<rect class="bx" x="216" y="{y - 8}" width="16" height="16" rx="3.5"/>') + dp(f'M244 {y}h50', .02 + k * .01, .08, 'l th') + dp(f'M244 {y + 8}h30', .03 + k * .01, .08, 'l th')
                 + gk('w', en - .05, en, f'<rect class="fa" x="216" y="{y - 8}" width="16" height="16" rx="3.5"/>', c=f'216,{y}') + dp(f'M219.5 {y}l3.5 4 6-8', en - .05, en, 'l ck'))
    return o


def icon(i):
    d = ['<path d="M5 28V15L18 5L31 15V28Z"/><circle cx="23" cy="22" r="5.5"/><path d="M27 26l5 5"/>', '<path d="M9 4h14l5 5v23H9z"/><path d="M14 14h10M14 20h10M14 26h6"/>',
         '<path d="M5 30V6M31 30V6"/><path d="M5 12h26M5 19h26M5 26h26"/>', '<circle cx="18" cy="18" r="13"/><path d="M11 18.5l5 5 9-11"/>'][i]
    return f'<svg class="pr-ic" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{d}</svg>'


def background():
    def art(f, cls, tag):
        s = open(os.path.join(PRE, f)).read().replace(' xmlns="http://www.w3.org/2000/svg"', '')
        s = re.sub(r'id="(\w+)"', lambda m: f'id="{tag}{m.group(1)}"', s); s = re.sub(r'url\(#(\w+)\)', lambda m: f'url(#{tag}{m.group(1)})', s)
        return s.replace('<svg ', f'<svg class="{cls}" aria-hidden="true" focusable="false" ', 1)
    near = art('process-near.svg', 'pr-near', 'prn')
    k = [0]
    def mark(m):
        i = k[0]; k[0] += 1
        return f'<circle class="pr-nd" data-k="{i}" '
    near = re.sub(r'<circle (?=cx="\d+" cy="\d+" r="15")', mark, near)
    assert k[0] == 5, k
    return art('process-far.svg', 'pr-far', 'prf') + near


def markup(S, contact, cal):
    check()
    art_html = [art0(), art1(), art2(), art3()]
    cfg1 = art_html[1][1]; art_html[1] = art_html[1][0]
    items = ''
    for i, (n, t, p, figs) in enumerate(STEPS):
        svg = f'<svg class="pr-art" viewBox="{VB[i]}" aria-hidden="true" focusable="false" data-i="{i}"' + (f" data-cfg='{json.dumps(cfg1)}'" if i == 1 else '') + '>' + ''.join(art_html[i]) + '</svg>'
        chips = ''.join(f'<button type="button" class="pr-chip" data-j="{j}" data-end="{ENDS[i][j]}"><span>{e(c)}</span></button>' for j, c in enumerate(CHIPS[i]))
        pf = ''.join(f'<div><dt>{e(a)}</dt><dd>{e(b)}</dd></div>' for a, b in figs)
        items += f'''<div class="pr-item i{i}{' on' if i == 0 else ''}" data-i="{i}"><div class="pr-rs" aria-hidden="true"><i class="pr-node"><b></b></i><u class="pr-seg"><s></s><em></em></u></div>
<div class="pr-col"><h3 class="pr-ch"><button type="button" id="pr-b{i}" aria-expanded="{'true' if i == 0 else 'false'}" aria-controls="pr-p{i}">{icon(i)}<span class="pr-n">{n}</span><span class="pr-t">{e(t)}</span></button></h3>
<div class="pr-bd" id="pr-p{i}" role="region" aria-labelledby="pr-b{i}"><div class="pr-bi"><div class="pr-tx"><p>{e(p)}</p><dl class="pr-pf">{pf}</dl></div>
<div class="pr-vis"><div class="pr-panel">{svg}</div><div class="pr-chips" role="group" aria-label="Parts of this step">{chips}</div><p class="pr-hint" aria-hidden="true">{HINT[i]}</p></div></div></div></div></div>'''
    pp = ('<button type="button" class="pr-pp" aria-label="Pause the steps"><svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>'
          '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5l11 7-11 7z"/></svg><span>Pause</span></button>')
    return f'''<section class="pr" id="process" aria-labelledby="pr-h"><div class="pr-bg" aria-hidden="true">{background()}</div><div class="pr-in">
<div class="pr-hd"><div class="pr-hl"><h2 class="pr-h" id="pr-h">{e(HEAD)}</h2><p class="pr-count" aria-hidden="true">Step <b>1</b> of 4 <i></i><span>Free inspection</span></p></div>
<div class="pr-act">{pp}<a class="btn key" href="{contact}">Book a free inspection<span class="tab">{cal}</span></a></div></div>
<div class="pr-cols" data-dur='{json.dumps(DUR)}' data-ends='{json.dumps(ENDS)}'>{items}</div><p class="pr-live sr" aria-live="polite"></p></div></section>'''

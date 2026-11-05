"""SECTION 3 — Services (Version A, 'Sideways sequence', rebuilt). Markup, SVG scenes and the nine-row ledger. Every number, band and sentence is the firm's
published text (svc8.js T array and faq.json), checked at build; nothing is summed."""
import html, json, os
e = html.escape
HERE = os.path.dirname(os.path.abspath(__file__)); WORK = os.path.join(HERE, '..', '..', 'work'); SITE = os.path.join(HERE, '..', 'site')

# the nine documented trades: (name, count, band line, priced line, scene 0..3) exactly as Services L/M/N and svc8.js publish them
LEDGER = [('Siding', '431', '$10k–$15k median band', '415 priced', 0), ('Windows', '388', '$10k–$15k median band', '376 priced', 1), ('Exterior painting', '320', '$2k–$5k median band', '317 priced', 3),
          ('Shingle roofing', '210', '$10k–$15k median band', '204 priced', 2), ('Gutters', '121', '$2k–$5k median band', '109 priced', 3), ('Exterior doors', '109', '$2k–$5k median band', '96 priced', 3),
          ('Patio covers', '34', '$15k–$20k median band', '33 priced', 3), ('Metal roofing', '31', '$20k–$25k median band', '29 priced', 2), ('Garage doors', '9', '$2k–$5k median band', '6 priced', 3)]
FOOT = 'Counts are documented projects from our service list; one project can include several trades. Bands are each trade’s median price band, materials and labor, before discounts.'


def check():
    t = open(os.path.join(SITE, 'src', 'sec', 'svc8.js')).read()
    for n, c, b, p, _ in LEDGER:
        band = b.replace(' median band', '')
        assert f"{c}, " in t or f"'{c}'" in t or f", {c}," in t, ('count', n, c)
        assert f"{band} median band ({p})" in t, ('band', n, band, p)
    F = json.load(open(os.path.join(WORK, 'data', 'faq.json'))); faq = ' '.join(a for k in F for _, a in F[k])
    for s in SENT.values():
        for x in s: assert x in faq, ('not verbatim', x)


SENT = {0: ['A siding replacement typically takes 1 to 2 weeks, including the painting process.', 'James Hardie siding carries a 30-year non-prorated warranty when an Elite Preferred contractor installs it.'],
        1: ['Most of the window-only jobs in our files took two days on site.', 'NT Windows, built in Texas, is on 238 of our 376 priced window jobs.'],
        2: [], 3: []}
TITLE = {0: 'Siding', 1: 'Windows', 2: 'Roofing', 3: 'The other five trades'}


def att(a=None, o=None, y=None, x=None, s=None, r=None, d=None, org=None):
    out = ''
    if a: out += f' data-a="{a[0]},{a[1]}"'
    if o: out += f' data-o="{o[0]},{o[1]}"'
    if y: out += f' data-y="{y[0]},{y[1]}"'
    if x: out += f' data-x="{x[0]},{x[1]}"'
    if s: out += f' data-s="{s[0]},{s[1]}"'
    if r: out += f' data-r="{r[0]},{r[1]}"'
    if d: out += f' data-d="{d[0]},{d[1]}" pathLength="1" stroke-dasharray="1"'
    if org: out += f' data-org="{org}"'
    return out


def scene_siding():
    g = ['<g class="sv-art-in">']
    # studs and sheathing, then ten lap boards laid from the sill up
    g.append(f'<g{att(a=(0, .1), o=(0, 1))}>' + ''.join(f'<rect x="{112 + i * 77}" y="118" width="10" height="397" fill="rgba(255,255,255,.10)"/>' for i in range(8)) + '<rect x="100" y="118" width="600" height="397" fill="rgba(255,255,255,.05)"/></g>')
    for i in range(9):
        y = 472 - i * 44; a0 = .06 + i * .058
        tone = '#E8EFE7' if i % 2 == 0 else '#DCE6DB'
        g.append(f'<g{att(a=(a0, a0 + .12), o=(0, 1), y=(46, 0))}><rect x="100" y="{y}" width="600" height="42" rx="1.5" fill="{tone}"/><rect x="100" y="{y}" width="600" height="2.5" fill="rgba(255,255,255,.8)"/><rect x="100" y="{y + 39}" width="600" height="3.5" fill="rgba(14,59,44,.32)"/><circle cx="114" cy="{y + 20}" r="2.2" fill="rgba(14,59,44,.45)"/><circle cx="686" cy="{y + 20}" r="2.2" fill="rgba(14,59,44,.45)"/></g>')
    g.append('<rect x="86" y="514" width="628" height="12" rx="2" fill="#9DB0A3"/>')
    # the exposure dimension (the published 8.25-inch profile) draws beside the second board
    g.append(f'<g{att(a=(.6, .72), o=(0, 1))}><path d="M728 428V472M720 428H736M720 472H736" fill="none" stroke="#B5DB6E" stroke-width="2.5" stroke-linecap="round"{att(d=(1, 0), a=(.6, .72))}/><text x="742" y="454" fill="#B5DB6E">8.25 in</text></g>')
    # board and batten as an accent, wiped in on the right
    g.append(f'<g{att(a=(.74, .96), s=(0.02, 1), o=(0, 1), org="0% 50%")}><rect x="410" y="118" width="290" height="396" fill="#E3EAE2"/>' + ''.join(f'<rect x="{410 + i * 36}" y="118" width="7" height="396" fill="#C3D1C5"/>' for i in range(1, 8)) + '<rect x="410" y="118" width="290" height="3" fill="rgba(255,255,255,.85)"/></g>')
    g.append(f'<g{att(a=(.82, .96), o=(0, 1), y=(10, 0))}><rect x="100" y="538" width="330" height="32" rx="16" fill="#B5DB6E"/><text x="116" y="559" fill="#0E3B2C">HardiePlank lap · board and batten accent</text></g>')
    g.append('</g>')
    return '<svg class="sv-art" viewBox="0 0 800 580" aria-hidden="true" focusable="false">' + ''.join(g) + '</svg>'


def scene_windows():
    gl = 'url(#svGl)'
    g = ['<defs><linearGradient id="svGl" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#BFD5DD"/><stop offset=".55" stop-color="#7FA0B0"/><stop offset="1" stop-color="#3F5F6E"/></linearGradient>'
         '<clipPath id="svGc"><rect x="282" y="104" width="236" height="354"/></clipPath><pattern id="svMesh" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 0H6M0 0V6" stroke="#1A3A30" stroke-opacity=".5" stroke-width=".8"/></pattern></defs>']
    # a light wedge falling from the window, then the casing, the interior opening
    g.append(f'<g{att(a=(.4, .8), o=(0, 1))}><polygon points="250,120 120,520 460,520 550,120" fill="rgba(255,225,150,.30)"/></g>')
    g.append(f'<rect x="240" y="60" width="320" height="440" rx="8" fill="none" stroke="#0E3B2C" stroke-width="3"{att(d=(1, 0), a=(0, .22))}/>')
    g.append(f'<g{att(a=(.08, .26), o=(0, 1))}><rect x="240" y="60" width="320" height="440" rx="8" fill="#F6F8F3" stroke="rgba(14,59,44,.25)"/><rect x="268" y="88" width="264" height="384" rx="3" fill="#0F2A22"/><rect x="268" y="88" width="264" height="384" fill="url(#svMesh)" opacity=".7"/></g>')
    # fixed upper sash with a glass reflection that sweeps across once
    g.append(f'<g{att(a=(.14, .3), o=(0, 1))}><rect x="274" y="94" width="252" height="184" rx="3" fill="#F6F8F3"/><rect x="282" y="104" width="236" height="168" fill="{gl}"/></g>')
    g.append(f'<g clip-path="url(#svGc)"><g{att(a=(.56, .92), x=(-260, 300), o=(1, 1))}><polygon points="300,100 340,100 270,460 230,460" fill="rgba(255,255,255,.36)"/><polygon points="360,100 372,100 302,460 290,460" fill="rgba(255,255,255,.22)"/></g></g>')
    # the lower sash slides up (a springy ease), the lock turns first
    g.append(f'<g{att(a=(.32, .72), y=(0, -160), o=(1, 1))} data-e="spring"><rect x="274" y="280" width="252" height="186" rx="3" fill="#F6F8F3" stroke="rgba(14,59,44,.2)"/><rect x="282" y="290" width="236" height="166" fill="{gl}"/><rect x="274" y="270" width="252" height="12" fill="#E7ECE3"/><path d="M282 290H518" stroke="rgba(14,59,44,.35)" stroke-width="2"/></g>')
    g.append(f'<g{att(a=(.2, .34), r=(0, -80), org="50% 50%")}><rect x="384" y="268" width="32" height="9" rx="3" fill="#7E877C"/></g>')
    g.append('<rect x="226" y="500" width="348" height="16" rx="3" fill="#D3DAD0"/><rect x="226" y="514" width="348" height="6" rx="2" fill="rgba(14,59,44,.18)"/>')
    # a hinged casement beside it
    g.append(f'<g{att(a=(.5, .64), o=(0, 1))}><rect x="610" y="130" width="140" height="290" rx="6" fill="#F6F8F3" stroke="rgba(14,59,44,.25)"/><rect x="624" y="144" width="112" height="262" fill="#0F2A22"/></g>')
    g.append(f'<g{att(a=(.58, .94), s=(1, .34), org="0% 50%")}><rect x="624" y="144" width="112" height="262" fill="{gl}" stroke="#F6F8F3" stroke-width="6"/><rect x="722" y="260" width="5" height="40" rx="2" fill="#7E877C"/></g>')
    g.append(f'<g{att(a=(.66, .9), o=(0, 1), y=(8, 0))}><rect x="600" y="440" width="170" height="30" rx="15" fill="#0E3B2C"/><text x="618" y="460" fill="#fff">Sash, lock, screen, seal</text></g>')
    return '<svg class="sv-art" viewBox="0 0 800 580" aria-hidden="true" focusable="false">' + ''.join(g) + '</svg>'


def scene_roofing():
    g = ['<defs><linearGradient id="svSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A4A44"/><stop offset="1" stop-color="#24302B"/></linearGradient></defs>']
    # nine shingle rows laid from the eave to the ridge (left roof), then the ridge cap
    eaves = (60, 440); ridge = (150, 350); top, bot = 150, 480
    n = 9
    for j in range(n):
        y1 = bot - j * (bot - top) / n; y0 = y1 - (bot - top) / n
        t0 = (j * (bot - top) / n) / (bot - top); t1 = ((j + 1) * (bot - top) / n) / (bot - top)
        xl0 = eaves[0] + (ridge[0] - eaves[0]) * t0; xl1 = eaves[0] + (ridge[0] - eaves[0]) * t1
        xr0 = eaves[1] + (ridge[1] - eaves[1]) * t0; xr1 = eaves[1] + (ridge[1] - eaves[1]) * t1
        a0 = .05 + j * .07
        tabs = ''.join(f'<path d="M{xl0 + (xr0 - xl0) * k / 8:.1f} {y1:.1f}L{xl1 + (xr1 - xl1) * k / 8:.1f} {y0:.1f}" stroke="rgba(0,0,0,.34)" stroke-width="1.4"/>' for k in range(1, 8))
        g.append(f'<g{att(a=(a0, a0 + .11), o=(0, 1), y=(-24, 0))}><polygon points="{xl0:.1f},{y1:.1f} {xr0:.1f},{y1:.1f} {xr1:.1f},{y0:.1f} {xl1:.1f},{y0:.1f}" fill="{"#46564F" if j % 2 == 0 else "#3C4B45"}"/>{tabs}<path d="M{xl0:.1f} {y1:.1f}H{xr0:.1f}" stroke="rgba(255,255,255,.22)" stroke-width="2"/></g>')
    g.append(f'<path d="M150 150H350" fill="none" stroke="#B5DB6E" stroke-width="9" stroke-linecap="round"{att(d=(1, 0), a=(.7, .8))}/>')
    # metal panels with standing seams drawn after
    g.append(f'<g{att(a=(.76, .84), o=(0, 1))}><polygon points="470,480 760,480 700,150 530,150" fill="#8FA39A"/></g>')
    for k in range(9):
        xb = 470 + 290 * k / 8; xt = 530 + 170 * k / 8; a0 = .78 + k * .02
        g.append(f'<path d="M{xb:.1f} 480L{xt:.1f} 150" fill="none" stroke="#EEF3EE" stroke-width="3" stroke-linecap="round"{att(d=(1, 0), a=(a0, a0 + .1))}/>')
    g.append('<rect x="40" y="484" width="740" height="10" rx="3" fill="rgba(14,59,44,.35)"/>')
    g.append(f'<g{att(a=(.86, .98), o=(0, 1), y=(10, 0))}><rect x="110" y="526" width="140" height="32" rx="16" fill="#0E3B2C"/><text x="128" y="547" fill="#fff">Shingle roofs</text><rect x="540" y="526" width="130" height="32" rx="16" fill="#0E3B2C"/><text x="558" y="547" fill="#fff">Metal roofs</text></g>')
    return '<svg class="sv-art" viewBox="0 0 800 580" aria-hidden="true" focusable="false">' + ''.join(g) + '</svg>'


def scene_minor():
    cards = [('Exterior painting', 'paint'), ('Gutters', 'gutter'), ('Exterior doors', 'door'), ('Patio covers', 'patio'), ('Garage doors', 'garage')]
    g = []
    for i, (nm, k) in enumerate(cards):
        x = 22 + i * 154; a0 = .04 + i * .12; a1 = a0 + .5
        card = f'<g{att(a=(a0, a0 + .12), o=(0, 1), y=(24, 0))}><rect x="{x}" y="110" width="144" height="330" rx="18" fill="rgba(255,255,255,.62)" stroke="rgba(14,59,44,.14)"/><text x="{x + 12}" y="420" fill="#0E3B2C">{nm}</text></g>'
        inner = ''
        if k == 'paint':
            inner = f'<rect x="{x + 22}" y="150" width="100" height="220" rx="4" fill="#E2E9E1"/><path d="M{x + 34} 190H{x + 110}M{x + 34} 232H{x + 110}M{x + 34} 274H{x + 110}M{x + 34} 316H{x + 110}" fill="none" stroke="#B5DB6E" stroke-width="22" stroke-linecap="round"{att(d=(1, 0), a=(a0 + .1, a1))}/>'
        elif k == 'gutter':
            inner = f'<rect x="{x + 18}" y="150" width="108" height="26" fill="#C9D4CC"/><path d="M{x + 18} 186H{x + 126}V300" fill="none" stroke="#6F8478" stroke-width="12" stroke-linecap="round"{att(d=(1, 0), a=(a0 + .1, a0 + .34))}/><circle cx="{x + 126}" cy="200" r="7" fill="#6FA8D6"{att(a=(a0 + .3, a1), y=(0, 120), o=(1, 0))}/>'
        elif k == 'door':
            inner = f'<rect x="{x + 28}" y="150" width="88" height="228" rx="4" fill="#0F2A22"/><g{att(a=(a0 + .1, a1), s=(1, .3), org="0% 50%")}><rect x="{x + 28}" y="150" width="88" height="228" rx="4" fill="#0E3B2C" stroke="#F6F8F3" stroke-width="6"/><circle cx="{x + 104}" cy="270" r="5" fill="#B5DB6E"/></g>'
        elif k == 'patio':
            inner = ''.join(f'<path d="M{x + 18} {200 + r * 20}L{x + 126} {188 + r * 20}" stroke="#6B5B4C" stroke-width="8" stroke-linecap="round" fill="none"{att(d=(1, 0), a=(a0 + .08 + r * .05, a0 + .2 + r * .05))}/>' for r in range(4)) + f'<rect x="{x + 22}" y="190" width="8" height="190" fill="#6B5B4C"{att(a=(a0 + .06, a0 + .2), o=(0, 1))}/><rect x="{x + 114}" y="190" width="8" height="190" fill="#6B5B4C"{att(a=(a0 + .06, a0 + .2), o=(0, 1))}/>'
        else:
            inner = f'<rect x="{x + 18}" y="170" width="108" height="206" rx="4" fill="#0F2A22"/>' + ''.join(f'<rect x="{x + 18}" y="{338 - s * 40}" width="108" height="36" rx="3" fill="#E8EDE6" stroke="rgba(14,59,44,.25)"{att(a=(a0 + .1 + s * .05, a0 + .3 + s * .05), y=(0, -190), o=(1, 0))}/>' for s in range(5))
        g.append(card + f'<g{att(a=(a0 + .04, a0 + .14), o=(0, 1))}>{inner}</g>')
    return '<svg class="sv-art" viewBox="0 0 800 580" aria-hidden="true" focusable="false">' + ''.join(g) + '</svg>'


def services():
    check()
    scenes = [scene_siding(), scene_windows(), scene_roofing(), scene_minor()]
    pats = [
        '<svg class="sv-pat" viewBox="0 0 800 580" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs><pattern id="svP0" width="40" height="14" patternUnits="userSpaceOnUse"><path d="M0 13.5H40" stroke="#B5DB6E" stroke-opacity=".08"/></pattern></defs><rect width="800" height="540" fill="url(#svP0)"/></svg>',
        '<svg class="sv-pat" viewBox="0 0 800 580" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><circle cx="150" cy="40" r="260" fill="rgba(255,214,140,.18)"/><path d="M0 120C200 90 320 150 520 110S720 80 800 120" fill="none" stroke="rgba(14,59,44,.06)" stroke-width="2"/></svg>',
        '<svg class="sv-pat" viewBox="0 0 800 580" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><path d="M0 60C160 20 300 90 460 50S700 30 800 70" fill="none" stroke="rgba(14,59,44,.10)" stroke-width="2"/><path d="M0 110C160 70 300 140 460 100S700 80 800 120" fill="none" stroke="rgba(14,59,44,.07)" stroke-width="2"/></svg>',
        '<svg class="sv-pat" viewBox="0 0 800 580" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs><pattern id="svP3" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="rgba(14,59,44,.14)"/></pattern></defs><rect width="800" height="540" fill="url(#svP3)"/></svg>']
    sc = ''
    for i in range(4):
        ps = ''.join(f'<p class="sv-p">{e(s)}</p>' for s in SENT[i])
        chip = '<span class="sv-chip">GAF Master Elite</span>' if i == 2 else ''
        sc += f'<div class="sv-sc" data-i="{i}" role="group" aria-label="{e(TITLE[i])}">{pats[i]}{scenes[i]}<div class="sv-cap"><p class="sv-n">0{i + 1} / 04</p><h3 class="sv-t">{e(TITLE[i])}</h3>{ps}{chip}</div></div>'
    rows = ''.join(f'<li class="sv-row" data-s="{s}"><b>{c}</b><strong>{e(n)}</strong><small>{e(b)} ({e(p)})</small></li>' for n, c, b, p, s in LEDGER)
    dots = ''.join(f'<button type="button" data-i="{i}" aria-label="Show {e(TITLE[i])}"{" aria-current=\"true\"" if not i else ""}></button>' for i in range(4))
    return f'''<section class="sv" id="services" aria-labelledby="sv-h"><div class="sv-pin"><div class="sv-view"><div class="sv-track">{sc}</div><div class="sv-dots" role="group" aria-label="Services scenes">{dots}</div></div>
<aside class="sv-led" aria-label="The documented record, trade by trade"><h2 class="sv-h" id="sv-h">Trade by trade.</h2><ul>{rows}</ul><p class="sv-fn">{e(FOOT)}</p></aside></div></section>'''

"""Inner pages of the Austin Pro concept site. Every figure is from FACTS.md / the firm's pages read 29 Oct 2026."""
import json, os
from parts import *  # noqa

FAQ = json.load(open(W + 'faq.json'))


# ---------------- shared inner-page parts ----------------

def page_hero(h1, lead, media='', crumbs=''):
    return f'''<main id="main">
<section class="phero" aria-labelledby="ph-h">
  <div class="wrap">
    <div class="phero-copy" data-roles>
      {crumbs}
      <h1 class="display phero-h" id="ph-h" data-role="title">{h1}</h1>
      <p class="lead" data-role="body">{lead}</p>
      <div class="hero-ctas" data-role="body">
        <a class="btn btn-primary" href="#book" data-book>Book a free inspection</a>
        <a class="tlink" href="{TEL}">Call {PHONE}</a>
      </div>
    </div>
    {media}
  </div>
</section>'''


def stats_row(items, label):
    cells = ''.join(f'<div><b>{v}</b><span>{t}</span></div>' for v, t in items)
    return f'<div class="stats-row" role="group" aria-label="{e(label)}">{cells}</div>'


def quotes(items, head):
    lis = ''.join(f'''<figure class="quote" data-dir><blockquote><p>{q}</p></blockquote><figcaption>{e(n)}<span>Google review, {w}</span></figcaption></figure>''' for q, n, w in items)
    return f'''<section class="section" id="reviews" aria-labelledby="rv-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="rv-h" data-split>{head}</h2>
      <p>4.9 on 474 Google reviews. Excerpts as the firm publishes them; an ellipsis marks where a review goes on.</p></div>
    <div class="quotes">{lis}</div>
  </div>
</section>'''


def faq_section(key, head):
    items = ''.join(f'<details class="qa"><summary>{e(q)}<svg aria-hidden="true"><use href="#i-plus"/></svg></summary><div class="qa-a"><p>{e(a)}</p></div></details>' for q, a in FAQ[key])
    return f'''<section class="section" id="questions" aria-labelledby="qa-h">
  <div class="wrap qa-grid">
    <div class="side-head"><h2 class="h2" id="qa-h" data-split>{head}</h2>
      <p>The firm's own answers, word for word. Anything else, bring it to the free inspection.</p></div>
    <div class="qa-list">{items}</div>
  </div>
</section>'''


def chip_book(title, chips, note):
    li = ''.join(f'<li><i style="--sw:{h}" aria-hidden="true"></i><span>{e(n)}<small>{e(c)}</small></span></li>' for n, c, h in chips)
    return f'<div class="chipbook"><h3 class="h4">{title}</h3><ul>{li}</ul><p class="cap">{note}</p></div>'


SW = [('Pure White', 'SW 7005', '#EDECE6'), ('Alabaster', 'SW 7008', '#EDEAE0'), ('Agreeable Gray', 'SW 7029', '#D1CBC1'), ('Repose Gray', 'SW 7015', '#CCC9C0'),
      ('Accessible Beige', 'SW 7036', '#D1C7B8'), ('Dovetail', 'SW 7018', '#908A83'), ('Gauntlet Gray', 'SW 7019', '#78736E'), ('Urbane Bronze', 'SW 7048', '#54504A'),
      ('Iron Ore', 'SW 7069', '#434341'), ('Tricorn Black', 'SW 6258', '#2F2F30'), ('In the Navy', 'SW 9178', '#283849'), ('Hunt Club', 'SW 6468', '#2A4F43')]
COLORPLUS = [('Arctic White', 'ColorPlus', '#E0E0D8'), ('Cobble Stone', 'ColorPlus', '#C6BEB0'), ('Navajo Beige', 'ColorPlus', '#D5C9B2'), ('Khaki Brown', 'ColorPlus', '#A28F7D'),
             ('Timber Bark', 'ColorPlus', '#7B7064'), ('Rich Espresso', 'ColorPlus', '#5F5A55'), ('Mountain Sage', 'ColorPlus', '#706F5E'), ('Light Mist', 'ColorPlus', '#B6BAB5'),
             ('Pearl Gray', 'ColorPlus', '#B2AEA9'), ('Gray Slate', 'ColorPlus', '#898A87'), ('Boothbay Blue', 'ColorPlus', '#778184'), ('Evening Blue', 'ColorPlus', '#5F696D'),
             ('Deep Ocean', 'ColorPlus', '#49545C'), ('Aged Pewter', 'ColorPlus', '#7D7974'), ('Night Gray', 'ColorPlus', '#6A6D6F'), ('Iron Gray', 'ColorPlus', '#575B59'),
             ('Countrylane Red', 'ColorPlus', '#714D47')]


def hbar_list(rows, label):
    """Horizontal share bars: (name, value, of, note)."""
    li = ''.join(f'<li><span class="hb-name">{e(n)}</span><span class="hb-track"><i style="--w:{v / of * 100:.1f}%"></i></span><span class="hb-val">{note}</span></li>' for n, v, of, note in rows)
    return f'<ul class="hbars" aria-label="{e(label)}">{li}</ul>'


# ---------------- siding.html ----------------

def wall_svg():
    """Exploded wall, as published: sheathing (replaced where rotten) / house wrap / HardiePlank lap 8.25in, 7in exposure / trim.
    Oblique drawing; JS moves the layer groups along the depth axis. Codes A-D key into the table beside it."""
    W, H, x0, y0 = 300, 372, 190, 92
    course = 24  # 7in exposure at 3.43 px per inch
    n = H // course
    laps = ''.join(f'<path d="M{x0} {y0 + i * course + course}H{x0 + W}"/>' for i in range(n))
    shadow = ''.join(f'<rect x="{x0}" y="{y0 + i * course + course - 4}" width="{W}" height="4"/>' for i in range(n))
    flakes = ''.join(f'<path d="M{x0 + 14 + (i * 37) % (W - 30)} {y0 + 12 + (i * 53) % (H - 24)}l{6 + i % 5} {(-1) ** i * 3}"/>' for i in range(70))
    wrap = ''.join(f'<path d="M{x0} {y0 + i * 18}l{min(W, H - i * 18)} {min(W, H - i * 18)}"/>' for i in range(0, 21)) + ''.join(f'<path d="M{x0 + i * 18} {y0}l{min(W - i * 18, H)} {min(W - i * 18, H)}"/>' for i in range(1, 17))

    def side(dx=16, dy=-11):  # thickness edge on the right
        return f'<path class="w-edge" d="M{x0 + W} {y0}l{dx} {dy}v{H}l{-dx} {-dy}z"/><path class="w-edge" d="M{x0} {y0}l{dx} {dy}h{W}l{-dx} {-dy}z"/>'

    def code(c, x, y):
        return f'<g class="w-code"><circle cx="{x}" cy="{y}" r="11"/><text x="{x}" y="{y + 4}" text-anchor="middle">{c}</text></g>'

    LX = x0 + W + 52  # labels sit in a fixed column right of the stack and only move down with their layer

    def label(t, sub, ly):
        return (t, sub, ly)

    clip = f'<clipPath id="w-face"><rect x="{x0}" y="{y0}" width="{W}" height="{H}"/></clipPath>'
    layers = [
        ('sheathing', f'<rect class="w-face w-osb" x="{x0}" y="{y0}" width="{W}" height="{H}"/><g class="w-hatch">{flakes}</g>{side()}', label('Sheathing', 'Rotten sections replaced at tear-off', y0 + 30)),
        ('wrap', f'<rect class="w-face w-wrap" x="{x0}" y="{y0}" width="{W}" height="{H}"/><g class="w-hatch w-fine" clip-path="url(#w-face)">{wrap}</g>{side(6, -4)}', label('House wrap', 'Over the sheathing, under the boards', y0 + 96)),
        ('lap', f'<rect class="w-face w-lap" x="{x0}" y="{y0}" width="{W}" height="{H}"/><g class="w-shadow">{shadow}</g><g class="w-course">{laps}</g>{side(14, -9)}{code("A", x0 + W - 34, y0 + 4 * course + 12)}{code("B", x0 + W - 64, y0 + 6 * course + 12)}{code("C", x0 + W / 2, y0 - 2)}{code("D", x0 + W + 7, y0 + H - 40)}', label('HardiePlank lap', 'Primed, painted on site, or ColorPlus', y0 + 162)),
        ('trim', f'<rect class="w-face w-trim" x="{x0 - 2}" y="{y0}" width="30" height="{H}"/><path class="w-edge" d="M{x0 + 28} {y0}l8 -5v{H}l-8 5z"/>', label('Trim', 'Corners and openings, same job', y0 + 228)),
    ]
    # exploded by default (no-JS and phone); JS assembles it and scrubs it apart on desktop
    groups = ''.join(f'<g class="w-layer" data-layer="{k}" data-i="{i}" transform="translate({-46 * i} {30 * i})"><g class="w-body">{body}</g></g>' for i, (k, body, lab) in enumerate(layers))
    anchor = {'sheathing': x0 + W + 16, 'wrap': x0 + W + 6, 'lap': x0 + W + 14, 'trim': x0 + 34}
    labels = ''.join(f'<g class="w-label" data-i="{i}" data-x="{anchor[k]}" data-y="{ly}" transform="translate(0 {30 * i})"><path d="M{anchor[k] - 46 * i} {ly}H{LX - 8}"/><circle cx="{anchor[k] - 46 * i}" cy="{ly}" r="2.5"/><text x="{LX}" y="{ly + 4}"><tspan class="w-l1">{t}</tspan><tspan x="{LX}" dy="17">{sub}</tspan></text></g>'
                     for i, (k, body, (t, sub, ly)) in enumerate(layers))
    return f'''<svg class="wall-svg" viewBox="0 0 790 560" role="img" aria-labelledby="wall-t">
  <title id="wall-t">Exploded drawing of the wall Austin Pro installs: sheathing, replaced where rotten; house wrap; HardiePlank lap siding with an 8.25 inch board and 7 inch exposure; trim at corners and openings.</title>
  <defs>{clip}</defs>{groups}{labels}
</svg>'''


def lap_detail():
    """Section through three courses: 8.25in board and 7in exposure to scale (1.25in lap), 12 px per inch; thickness drawn x3."""
    k = 12
    board, expo, th = 8.25 * k, 7 * k, 5 / 16 * k * 3
    x = 96
    boards = ''
    for i in range(3):
        top = 26 + i * expo
        boards += f'<path class="ld-board" d="M{x} {top}l{th:.1f} 0l{th:.1f} {board:.1f}l{-th:.1f} 0z"/>'
    dim = f'''<g class="ld-dim"><path d="M{x - 26} 26v{board:.1f}M{x - 32} 26h12M{x - 32} {26 + board:.1f}h12"/><text x="{x - 38}" y="{26 + board / 2:.1f}" text-anchor="end">A</text>
      <path d="M{x + 40} {26 + expo:.1f}v{expo:.1f}M{x + 34} {26 + expo:.1f}h12M{x + 34} {26 + 2 * expo:.1f}h12"/><text x="{x + 52}" y="{26 + 1.5 * expo:.1f}">B</text></g>'''
    return f'''<svg class="lap-svg" viewBox="0 0 180 {int(26 + 2 * expo + board + 20)}" role="img" aria-label="Section through three courses of HardiePlank lap, to scale: A, the 8.25 inch board; B, the 7 inch exposure, so each board laps the one below by 1.25 inches.">
  <path class="ld-wall" d="M{x - 4} 10v{int(2 * expo + board + 30)}"/>{boards}{dim}
</svg>'''


def wall_section():
    rows = [('A', 'Board width', '8.25″', 'also made 5.25″, 6.25″, 7.25″'), ('B', 'Exposure', '7″', 'what shows of each course'),
            ('C', 'Length', '12 ft', ''), ('D', 'Thickness', '5/16″', '')]
    tr = ''.join(f'<tr><th scope="row"><span class="w-chip">{c}</span></th><td>{n}</td><td class="num">{v}</td><td>{note}</td></tr>' for c, n, v, note in rows)
    counts = hbar_list([('8.25″ HardiePlank lap', 301, 415, '301 of 415'), ('Select Cedarmill texture', 286, 415, '286 of 415'),
                        ('Smooth texture', 36, 415, '36 of 415'), ('Board & batten', 27, 415, '27 of 415')], 'How often each choice was made on 415 priced siding jobs')
    return f'''<section class="wall-sec" id="wall" aria-labelledby="wall-h" data-wall>
  <div class="wall-track"><div class="wall-stage">
    <div class="wrap wall-grid">
      <div class="wall-copy">
        <h2 class="h2" id="wall-h" data-split>The wall, layer by layer.</h2>
        <p class="body-m">Every one of the firm's 415 priced siding jobs is James Hardie fiber cement. Tear-off, sheathing fixes where they are needed, house wrap, boards, trim, then paint.</p>
        <table class="spec">
          <caption class="sr-only">HardiePlank lap dimensions</caption>
          <tbody>{tr}</tbody>
        </table>
        <figure class="lap-fig">{lap_detail()}<figcaption class="cap">Section through three courses. A and B to scale: each 8.25″ board laps the one below by 1.25″, leaving 7″ in view. Thickness drawn three times over so it reads.</figcaption></figure>
      </div>
      <figure class="wall-fig">{wall_svg()}
        <ol class="wall-legend"><li><b>Sheathing</b> Rotten sections replaced at tear-off</li><li><b>House wrap</b> Over the sheathing, under the boards</li><li><b>HardiePlank lap</b> Primed, painted on site, or ColorPlus</li><li><b>Trim</b> Corners and openings, same job</li></ol>
        <figcaption class="sr-only">Layers from back to front.</figcaption>
      </figure>
    </div>
  </div></div>
  <div class="wrap wall-after">
    <div>
      <h3 class="h4">What 415 job files chose</h3>
      {counts}
      <p class="cap">Counts are the product named in each priced siding job file, 2022-2026. A line naming both textures counts as neither.</p>
    </div>
    <div class="bb-note">
      <h3 class="h4">Board &amp; batten, the modern farmhouse look</h3>
      <p>Four-foot HardiePanel sheets hung vertically, with 2.5″ HardieTrim battens fastened over them, 16″ on centre. Panels 8 or 10 ft tall, Cedarmill or smooth.</p>
    </div>
  </div>
</section>'''


def cost_section():
    from build_data_facts import HIST
    examples = {2: ('East Oak Hill, Austin', 'Windows, siding, gutters and exterior painting; James Hardie 8.25″ Select Cedar Mill'),
                3: ('Block House Creek, Leander', 'Siding and exterior painting; James Hardie Select Cedar Mill 8.25″'),
                4: ('Anderson Mill West, Cedar Park', 'Siding and exterior painting; James Hardie 8.25″ Primed Select Cedar Mill'),
                5: ('Northwest Hills, Austin', 'Siding and exterior painting; James Hardie Select Cedar Mill 8.25″')}
    H = HIST['siding']
    say = {}
    for i, (b, c) in enumerate(H['bands']):
        s = f'{b}: {c} of 415 jobs.'
        if i == H['median']:
            s += ' This band holds the median job.'
        if i in examples:
            s += f' A real job from this band: {examples[i][0]}. {examples[i][1]}.'
        say[i] = s
    hist_html = hist('siding', 'Siding jobs by price band, 415 priced jobs, 2022-2026').replace('<button type="button" class="hbar', '<button type="button" data-i class="hbar')
    for i in range(len(H['bands'])):
        hist_html = hist_html.replace('<button type="button" data-i class="hbar', f'<button type="button" data-say="{e(say[i])}" class="hbar', 1)
    cities = [('Austin', 279, '$15k–$20k'), ('Round Rock', 56, '$10k–$15k'), ('Cedar Park', 16, '$10k–$15k'), ('Pflugerville', 14, '$5k–$10k'), ('Leander', 9, '$10k–$15k'), ('Buda', 6, '$15k–$20k')]
    ct = ''.join(f'<tr><th scope="row">{c}</th><td class="num">{n}</td><td class="num">{m}</td></tr>' for c, n, m in cities)
    levers = [('Wall area and stories', 'More square footage and second-story walls mean more material, labour and staging.'),
              ("What's under the old siding", 'Rotten sheathing found at tear-off gets replaced before new siding goes on.'),
              ('Whole house or a few walls', 'The firm re-sides by the full wall or the whole house, and prices only what you need.'),
              ('Trim, soffit and fascia', 'Replacing them with the siding adds to the price and gives a cleaner finish.'),
              ('Paint or ColorPlus', "Sherwin-Williams paint after install, or James Hardie's factory-baked ColorPlus."),
              ('Profile and details', 'Lap or board and batten, plus accent walls, corners and openings.')]
    lv = ''.join(f'<li><b>{t}</b><span>{d}</span></li>' for t, d in levers)
    same = hbar_list([('Exterior painting', 297, 415, '72%'), ('Windows', 136, 415, '33%'), ('Gutters', 64, 415, '15%'), ('Shingle roofing', 63, 415, '15%')],
                     'Share of the 415 siding jobs where another trade ran on the same job')
    return f'''<section class="section" id="prices" aria-labelledby="cost-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="cost-h" data-split>What 415 siding jobs cost.</h2>
      <p>Each bar is documented work with a materials-and-labour price, before discounts, for the siding portion of the job. The median landed in $10k-$15k; the middle half between $5k and $20k.</p></div>
    <div class="cost-grid">
      <div class="cost-main">{hist_html}</div>
      <aside class="cost-side">
        <h3 class="h4">Median band by city</h3>
        <table class="data-table city-table"><thead><tr><th scope="col">City</th><th scope="col">Priced jobs</th><th scope="col">Median band</th></tr></thead><tbody>{ct}</tbody></table>
        <p class="cap">Cities with fewer than five documented siding jobs are left out. Differences track the housing stock: size, age and stories.</p>
        <h3 class="h4" style="margin-top:var(--s6)">Done in the same job</h3>
        {same}
      </aside>
    </div>
    <div class="levers">
      <h3 class="h3">What moves the price</h3>
      <ol>{lv}</ol>
    </div>
    <p class="fineprint">Bands come straight from each job's worksheet, read per trade, so a siding-and-painting project contributes only its siding amount here. Jobs whose per-trade split could not be verified are excluded entirely, which is why this is a documented sample of the firm's work rather than every job it has run. Materials and labour, excluding tax; 31 Central Texas cities.</p>
  </div>
</section>'''


def texas_section():
    claims = [('warp.', "Doesn't", 'UV and heat', "Won't warp, swell or sag through triple-digit summers."),
              ('rot.', "Doesn't", 'Moisture', "Won't rot, swell or soak up water like wood and hardboard."),
              ('burn.', "Doesn't", 'Fire', "Noncombustible fiber cement. The board itself won't burn."),
              ('termites.', "Doesn't feed", 'Pests', 'Termites and woodpeckers leave fiber cement alone.'),
              ('decades.', 'Lasts for', 'Warranty', 'Non-prorated for 30 years from James Hardie when an Elite Preferred contractor installs it.')]
    li = ''.join(f'<li><p class="tx-big"><span>{a}</span> {w}</p><p class="tx-cond"><b>{k}.</b> {d}</p></li>' for w, a, k, d in claims)
    return f'''<section class="section texas" aria-labelledby="tx-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="tx-h" data-split>Built for Texas sun, heat and hail.</h2>
      <p>Half of it is the board. The other half is the install: flashed, sealed and gapped right by an Elite Preferred contractor.</p></div>
    <ol class="tx-list" data-rise>{li}</ol>
    <p class="tx-warranty"><b>Warranty, in writing.</b> James Hardie's 30-year non-prorated siding warranty, plus Austin Pro's lifetime workmanship warranty on labour. 15 years on trim.</p>
  </div>
</section>'''


def build_siding():
    mil = SVC_PAIRS['siding'][0]
    assert mil['place'].startswith('Milwood')
    p_b, s_b = img_set('siding0', 'b')
    p_a, s_a = img_set('siding0', 'a')
    media = f'''<div class="phero-media" data-scale>
      <figure class="compare" data-compare style="margin:0">
        <img class="c-before" src="{p_b}" srcset="{s_b}" sizes="(max-width: 1440px) 100vw, 1320px" width="1280" height="800" alt="{e(mil['before']['alt'])}" fetchpriority="high">
        <img class="c-after" src="{p_a}" srcset="{s_a}" sizes="(max-width: 1440px) 100vw, 1320px" width="1280" height="800" alt="{e(mil['after']['alt'])}">
        <span class="frame-tag tag-before">Before</span><span class="frame-tag tag-after">After</span>
        <span class="c-divider" aria-hidden="true"></span>
        <button class="c-handle" type="button" role="slider" aria-label="Compare before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><svg aria-hidden="true"><use href="#i-h"/></svg></button>
        <span class="pair-price"><small>{e(mil['bl'])}</small><b>{e(mil['band'])}</b></span>
      </figure>
      <p class="cap phero-cap">Milwood, Austin, {e(mil['when'])}: {e(mil['installed'])}. {ext_link(LIVE + mil['href'], 'Open job file APS-' + mil['href'].rsplit('-', 1)[-1])}</p>
    </div>'''
    html = head('James Hardie siding in Austin | Austin Pro Siding, Windows & Roofing',
                'James Hardie fiber cement siding installed by an Elite Preferred contractor: 415 priced Austin jobs, the median band, the wall layer by layer, and a free inspection. Concept redesign.')
    html += header('siding')
    html += page_hero('James Hardie, installed by an Elite Preferred crew.',
                      'The firm re-sides by the full wall or the whole house, in fiber cement, and prints what 415 of those jobs cost.', media)
    html += '<div class="wrap">' + stats_row([('431', 'documented siding jobs'), ('30 yr', 'James Hardie non-prorated warranty'), ('Lifetime', 'workmanship warranty on labour'), ('1-2 wks', 'typical replacement, paint included')], 'Siding at a glance') + '</div>'
    html += wall_section()
    html += cost_section()
    head_p = '''<div class="side-head"><h2 class="h2" id="pairs-h" data-split>Four siding jobs, price on each.</h2>
      <p>Drag across the photo. Each pair is one of the firm's jobs with that job's own siding band.</p></div>'''
    html += f'''<section class="section" id="pairs" aria-labelledby="pairs-h"><div class="wrap">{pairs(['siding'], head=head_p)}</div></section>'''
    html += texas_section()
    html += f'''<section class="section" id="colour" aria-labelledby="col-h" style="background:var(--paper-2)">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="col-h" data-split>Colour on the board.</h2>
      <p>Primed boards painted after they go up in any of 1,700+ Sherwin-Williams colours, with free colour matching. Or ColorPlus, baked on at the James Hardie plant: 17 colours for Austin, with Arctic White trim.</p></div>
    <div class="chipbooks">
      {chip_book('Sherwin-Williams, a sample of 1,700+', SW, 'The usual finish. Hex values as the firm publishes them.')}
      {chip_book('James Hardie ColorPlus, all 17 for Austin', COLORPLUS, 'Factory finish, 15+ years. Screen colour is a guide only.')}
    </div>
    <p style="margin-top:var(--s6)"><a class="btn btn-dark" href="plan.html#studio">Try them on a real house</a></p>
  </div>
</section>'''
    html += faq_section('siding', 'Siding questions, answered.')
    html += quotes([
        ('…Jake handled our initial bid and was incredibly thorough, providing a fair and transparent estimate without any high-pressure sales tactics…', 'Joe Liu', 'Apr 2026'),
        ('…We had them replace and paint all of our siding. Build quality was top notch, and install was fast and efficient…', 'Megan Randolph', 'Apr 2026'),
        ("I hired Austin Pro to redo my house's 80s era masonite siding with Hardie Board. They gave a great quote and did phenomenal work…", 'Pat Mehaffy', 'Jul 2026'),
        ('…Kevin and his team, as well as Garrett, went above and beyond to make sure the work was of a high standard…', 'Annamaria Scaccia', 'Apr 2026'),
    ], 'What homeowners say about the siding.')
    html += booking_section('Book your free siding inspection', 'The office calls you back to pick a time. The project manager looks at the siding, measures and photographs what they find, and you get the scope, materials and price. Free, no obligation.')
    html += '</main>\n' + footer()
    return write('siding.html', html)


def build_all():
    print('siding', build_siding())

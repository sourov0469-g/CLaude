"""windows.html: every figure from /services/windows and /services/windows/cost, read 29 Oct 2026."""
import json
from parts import *  # noqa
from pages_inner import page_hero, stats_row, quotes, faq_section, hbar_list

WCOL = json.load(open(W + 'window_colours.json'))

BRANDS = [
    dict(name='NT Windows', n=238, med='$10k–$15k', kicker='Made in Dallas–Fort Worth',
         blurb="Texas-made windows, custom-built at NT's own Dallas–Fort Worth plant. The firm's go-to for vinyl, and the only aluminum line it installs.",
         lines=[('Executive', 'vinyl', 89), ('Twinsulator', 'aluminum', 54), ('Presidential', 'vinyl', 33)],
         spec=[('Frame', '3-1/4″ multi-chambered vinyl (Executive)'), ('Glass', '3/4″ dual-pane; NT rates it at 99% UV protection (Executive)'),
               ('Colour', 'Presidential VividColor in 18 colours, 15-year coating warranty')],
         swnote='Executive: Creme White or Almond. Presidential: VividColor. Twinsulator: 3 colours.'),
    dict(name='Simonton', n=54, med='$10k–$15k', kicker='Slim frames, more glass',
         blurb='Vinyl windows with a slim frame that shows more glass. DaylightMax is the Simonton line customers chose most.',
         lines=[('DaylightMax', 'vinyl', 49)],
         spec=[('Warranty', 'DaylightMax: lifetime limited, parts and labour, transferable'), ('Glass', 'ProSolar Shield Low-E option')],
         swnote='Vinyl, laminate and custom exterior colours.'),
    dict(name='Andersen', n=38, med='$20k–$25k', kicker='Certified Contractor, Premier',
         blurb='The 100 Series is made of Fibrex composite, which Andersen says is twice as strong as vinyl, in a finish that never needs painting.',
         lines=[('100 Series', 'Fibrex composite', 33)],
         spec=[('Warranty', 'Limited: 20 years glass, 10 years other parts'), ('Finish', "Andersen says it won't fade, flake, blister or peel")],
         swnote='100 Series: 5 exterior colours.'),
    dict(name='Pella', n=31, med='$5k–$10k', kicker='Vinyl and fiberglass',
         blurb="Vinyl and Impervia fiberglass windows. Pella says Impervia won't expand, warp or sag in summer heat.",
         lines=[('Impervia', 'fiberglass', 2), ('Vinyl', 'line not named', 10)],
         spec=[('Warranty', 'Impervia: limited lifetime; Pella covers labour 2 years'), ('Finish', 'Impervia powder coat that resists chalking and fading')],
         swnote='Impervia: 5 powder-coat colours.'),
]


def brand_panels():
    panels = ''
    for i, b in enumerate(BRANDS):
        lines = ''.join(f'<li><span>{e(l)} <small>{e(m)}</small></span><b>{c}</b></li>' for l, m, c in b['lines'])
        spec = ''.join(f'<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>' for k, v in b['spec'])
        sw = ''.join(f'<li style="--sw:{h}" title="{e(n)}"><span class="sr-only">{e(n)}</span></li>' for n, h in WCOL[b['name']])
        panels += f'''<article class="brand-card" aria-labelledby="br-{i}">
      <p class="brand-k">{e(b['kicker'])}</p>
      <h3 class="brand-h" id="br-{i}">{e(b['name'])}</h3>
      <div class="brand-share"><b>{b['n']}</b><span>of 376 priced window jobs</span><i style="--w:{b['n'] / 376 * 100:.1f}%" aria-hidden="true"></i></div>
      <p class="brand-blurb">{e(b['blurb'])}</p>
      <ul class="brand-lines" aria-label="Lines installed, by job count">{lines}</ul>
      <dl class="brand-spec">{spec}</dl>
      <div class="brand-sw"><ul aria-label="{e(b['name'])} exterior colours">{sw}</ul><p>{e(b['swnote'])}</p></div>
      <p class="brand-med"><span>Median job with {e(b['name'])}</span><b>{b['med']}</b></p>
    </article>'''
    dots = ''.join(f'<i class="hdot"></i>' for _ in BRANDS)
    return f'''<section class="brands-sec" id="brands" aria-labelledby="brands-h" data-hscroll>
  <div class="wrap brands-head">
    <div class="side-head"><h2 class="h2" id="brands-h" data-split>Four brands, by how often Austin chose them.</h2>
      <p>They cover 361 of the firm's 376 priced window jobs. Counts are the brand and line named in each job file, 2022-2026; brand facts are each manufacturer's own.</p></div>
  </div>
  <div class="brands-pin">
    <div class="wrap hdots" aria-hidden="true">{dots}</div>
    <div class="brands-track">{panels}</div>
  </div>
</section>'''


def glass_svg():
    """3/4in dual-pane unit: overall depth to scale (72 px per inch); lite thickness nominal, not dimensioned."""
    total = .75 * 72
    t, x0, h = 6, 64, 190
    return f'''<svg class="glass-svg" viewBox="0 0 250 250" role="img" aria-label="Section through a three-quarter inch dual-pane glass unit: outer lite with a Low-E coating, a spacer and sealed space, inner lite.">
  <rect class="g-lite" x="{x0}" y="16" width="{t}" height="{h}"/>
  <rect class="g-lite" x="{x0 + total - t}" y="16" width="{t}" height="{h}"/>
  <rect class="g-space" x="{x0 + t}" y="16" width="{total - 2 * t}" height="{h}"/>
  <rect class="g-spacer" x="{x0 + t}" y="{16 + h - 22}" width="{total - 2 * t}" height="22"/>
  <path class="g-lowe" d="M{x0 + t + 1.5} 20v{h - 30}"/>
  <g class="g-dim"><path d="M{x0} {h + 32}h{total}M{x0} {h + 26}v12M{x0 + total} {h + 26}v12"/><text x="{x0 + total / 2}" y="{h + 52}" text-anchor="middle">3/4″</text></g>
  <g class="g-lab"><text x="{x0 - 10}" y="36" text-anchor="end">Out</text><text x="{x0 + total + 10}" y="36">In</text>
    <path d="M{x0 + t + 2} 74H{x0 + total + 6}"/><text x="{x0 + total + 10}" y="78">Low-E</text>
    <text x="{x0 + total + 10}" y="122">Sealed</text><text x="{x0 + total + 10}" y="138">space</text>
    <path d="M{x0 + total / 2} {16 + h - 11}H{x0 + total + 6}"/><text x="{x0 + total + 10}" y="{16 + h - 7}">Spacer</text></g>
</svg>'''


def frames_glass():
    mats = [('Vinyl', 214, '#2F2F30'), ('Aluminum', 64, '#78736E'), ('Fibrex composite', 33, '#A8A39A'), ('Fiberglass or wood', 4, '#CCC9C0'),
            ('Not recorded', 61, 'repeating-linear-gradient(135deg, #CCC9C0 0 4px, #E3E1DA 4px 8px)')]
    seg = ''.join(f'<i style="flex:{n};background:{c}"></i>' for m, n, c in mats)
    key = ''.join(f'<li><i style="background:{c}"></i><span>{e(m)}</span><b>{n}</b></li>' for m, n, c in mats)
    lowe = [('NT Windows', 'Quad LoE-452+ glass on the Twinsulator; optional on the Executive.'), ('Simonton', 'ProSolar Shield Low-E, made for the warmest climates.'),
            ('Pella', 'Low-E glass packages, including sun-control options.'), ('Andersen', 'SmartSun and other Low-E options.')]
    lw = ''.join(f'<li><b>{b}</b><span>{t}</span></li>' for b, t in lowe)
    return f'''<section class="section" id="frames" aria-labelledby="fr-h">
  <div class="wrap fg-grid">
    <div>
      <h2 class="h2" id="fr-h" data-split>Frames, then the glass.</h2>
      <p class="body-m fg-p">What the frames on 376 priced jobs were made of, counted from the line each job file names (NT's Twinsulator is aluminum), else the material it records.</p>
      <div class="stackbar" role="img" aria-label="Frame materials on 376 priced window jobs: vinyl 214, aluminum 64, Fibrex composite 33, fiberglass or wood 4, not recorded 61.">{seg}</div>
      <ul class="stackkey">{key}</ul>
    </div>
    <div class="fg-glass">
      <figure>{glass_svg()}<figcaption class="cap">3/4″ dual-pane glass. Overall depth to scale; lite thickness drawn nominal.</figcaption></figure>
      <div><h3 class="h4">Most of a window is glass</h3><p class="cap" style="margin:8px 0 14px">Each of the four main brands offers Low-E glass, including packages made for strong sun.</p><ul class="lowe">{lw}</ul></div>
    </div>
  </div>
</section>'''


def cost_windows():
    from build_data_facts import HIST
    examples = {1: ('MLK-183, Austin', 'Pella; siding, exterior painting, doors and windows on the same job'),
                2: ('East Oak Hill, Austin', 'NT Windows Twinsulator; windows, siding, gutters and exterior painting'),
                3: ('Wells Branch, Austin', 'Simonton DaylightMax; windows only'),
                4: ('Austin', 'NT Windows Presidential; windows only')}
    H = HIST['windows']
    hist_html = hist('windows', 'Window jobs by price band, 376 priced jobs, 2022-2026')
    for i, (b, c) in enumerate(H['bands']):
        sx = f'{b}: {c} of 376 jobs.' + (' This band holds the median job.' if i == H['median'] else '') + (' The most common band.' if i == 2 else '')
        if i in examples:
            sx += f' A real job from this band: {examples[i][0]}. {examples[i][1]}.'
        hist_html = hist_html.replace('<button type="button" class="hbar', f'<button type="button" data-say="{e(sx)}" class="xbar', 1)
    hist_html = hist_html.replace('class="xbar', 'class="hbar')
    brands = [('NT Windows', 238, '$10k–$15k'), ('Simonton', 54, '$10k–$15k'), ('Andersen', 38, '$20k–$25k'), ('Pella', 31, '$5k–$10k'), ('Provia', 5, '$5k–$10k')]
    cities = [('Austin', 248, '$10k–$15k'), ('Round Rock', 39, '$10k–$15k'), ('Cedar Park', 15, '$15k–$20k'), ('Pflugerville', 12, '$10k–$15k'), ('Leander', 9, '$10k–$15k'), ('Georgetown', 7, '$2k–$5k')]

    def tb(rows, h):
        body = ''.join(f'<tr><th scope="row">{a}</th><td class="num">{n}</td><td class="num">{m}</td></tr>' for a, n, m in rows)
        return f'<table class="data-table city-table"><thead><tr><th scope="col">{h}</th><th scope="col">Priced jobs</th><th scope="col">Median band</th></tr></thead><tbody>{body}</tbody></table>'
    levers = [('How many windows, and how big', 'More openings and oversized units mean more material and labour.'),
              ('Brand, line and frame', 'Vinyl, aluminum, Fibrex composite or fiberglass, and the line within each brand.'),
              ('Exterior colour and glass', 'Standard white or almond, a laminate or VividColor exterior, and the glass package you pick.'),
              ('Openings that need work', 'A new header, stone or stucco around the frame, or an opening changed to meet code.'),
              ('Second stories and access', 'Upper-floor and hard-to-reach windows can need scaffolding.'),
              ('Windows with new siding', 'On 36% of priced window jobs the siding was replaced too, usually with the windows set first.')]
    lv = ''.join(f'<li><b>{t}</b><span>{d}</span></li>' for t, d in levers)
    same = hbar_list([('Siding', 134, 376, '36%'), ('Exterior painting', 82, 376, '22%'), ('Doors', 68, 376, '18%'), ('Shingle roofing', 37, 376, '10%')],
                     'Share of the 376 window jobs where another trade ran on the same job')
    return f'''<section class="section" id="prices" aria-labelledby="cost-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="cost-h" data-split>What 376 window jobs cost.</h2>
      <p>The windows portion of each job, materials and labour, before discounts. The median landed in $10k-$15k, the most common band was $5k-$10k, and the middle half ran $5k to $25k.</p></div>
    <div class="cost-grid">
      <div class="cost-main">{hist_html}</div>
      <aside class="cost-side">
        <h3 class="h4">Median band by brand</h3>
        {tb(brands, 'Brand')}
        <p class="cap">Brands with fewer than four documented jobs are left out.</p>
        <h3 class="h4" style="margin-top:var(--s6)">By city</h3>
        {tb(cities, 'City')}
      </aside>
    </div>
    <div class="cost-grid cost-lower">
      <div class="cost-main levers"><h3 class="h3">What moves the price</h3><ol class="lv-2">{lv}</ol></div>
      <aside class="cost-side"><h3 class="h4">Done in the same job</h3>{same}</aside>
    </div>
    <p class="fineprint">Bands come straight from each job's worksheet, read per trade, so a job with siding and painting contributes only its windows amount here. Jobs whose per-trade split could not be verified are excluded entirely, which is why this is a documented sample of the firm's work rather than every job it has run. Materials and labour, excluding tax; 40 Central Texas cities.</p>
  </div>
</section>'''


def two_days():
    steps = [('Free inspection', 'The windows and openings, looked at; brands, lines and colours talked through.'),
             ('Detailed proposal', 'Scope, materials and price, with options where there is a real choice. Free, no obligation.'),
             ('Measure and install', 'Each opening measured, windows built to order for those openings, then set, sealed and the old units hauled away.'),
             ('Final check', 'The finished work checked and the warranty details gone over for what went on your house.')]
    li = ''.join(f'<li><h3>{t}</h3><p>{d}</p></li>' for t, d in steps)
    return f'''<section class="section" id="process" aria-labelledby="pr-h" style="background:var(--paper-2)">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="pr-h" data-split>Built to order, then two days on site.</h2>
      <p>Windows are made for your openings, so the order comes first. Most window-only jobs in the firm's files took two days on site.</p></div>
    <ol class="steps4" data-rise>{li}</ol>
    <div class="honest">
      <blockquote><p>“…It took about 6 weeks for measuring, ordering and installing. Day of install there were numerous folks hustling, getting the job done very quickly.”</p></blockquote>
      <p class="cap">Sara Helms, Google review, May 2026. Windows are built to order before the crew comes; the firm's files put most window-only jobs at two days on site. 18% of priced window jobs replaced doors too.</p>
    </div>
  </div>
</section>'''


def build_windows():
    am = HOME_PAIRS[2]
    assert am['p'].startswith('Anderson Mill')

    def src(side):
        return (f'assets/img/pairs/home2{side}-1280.webp', f'assets/img/pairs/home2{side}-720.webp 720w, assets/img/pairs/home2{side}-1280.webp 1280w')
    bs, bset = src('b')
    as_, aset = src('a')
    job = am['s'].rsplit('-', 1)[-1]
    media = f'''<div class="phero-media">
      <div class="course-frame sash-frame" data-course data-axis="x" data-n="12,8" data-start="50" data-unit="sashes showing the after photo">
        <img class="course-before" src="{bs}" srcset="{bset}" sizes="(max-width: 1440px) 100vw, 1320px" width="1280" height="800" alt="{e(am['ba'])}" fetchpriority="high">
        <img class="course-after" src="{as_}" srcset="{aset}" sizes="(max-width: 1440px) 100vw, 1320px" width="1280" height="800" alt="{e(am['aa'])}">
        <div class="course-strips" aria-hidden="true"></div>
        <div class="course-line" aria-hidden="true"></div>
        <span class="frame-tag tag-before" aria-hidden="true">Before</span>
        <span class="frame-tag tag-after" aria-hidden="true">After</span>
        <span class="pair-price"><small>{e(am['bl'])}</small><b>{e(am['b'])}</b></span>
        <button class="course-handle" type="button" role="slider" aria-label="Compare before and after" aria-valuemin="0" aria-valuemax="12" aria-valuenow="12"><svg aria-hidden="true"><use href="#i-h"/></svg></button>
      </div>
      <p class="cap phero-cap">Anderson Mill, Austin, {e(am['wl'])}: {e(am['i'])}. {ext_link(LIVE + '/recent-projects/' + am['s'], 'Open job file APS-' + job)}</p>
    </div>'''
    html = head('Replacement windows in Austin | Austin Pro Siding, Windows & Roofing',
                'NT Windows, Simonton, Andersen and Pella, measured and built to order for each opening: 376 priced Austin jobs, brand by brand, with a free inspection. Concept redesign.')
    html += header('windows')
    html += page_hero('Four window brands, measured to every opening.',
                      "NT Windows, Simonton, Andersen and Pella, built to order for your openings. Here is what 376 of those jobs cost.", media)
    html += '<div class="wrap">' + stats_row([('388', 'documented window projects'), ('238', 'of 376 priced jobs used NT Windows'), ('2 days', 'on site, most window-only jobs'), ('Lifetime', 'workmanship warranty on labour')], 'Windows at a glance') + '</div>'
    html += brand_panels()
    html += frames_glass()
    html += cost_windows()
    head_p = '''<div class="side-head"><h2 class="h2" id="pairs-h" data-split>Four window jobs, price on each.</h2>
      <p>Drag across the photo. Each pair is one of the firm's jobs with that job's own windows band.</p></div>'''
    html += f'<section class="section" id="pairs" aria-labelledby="pairs-h"><div class="wrap">{pairs(["windows"], head=head_p)}</div></section>'
    html += two_days()
    html += faq_section('windows', 'Window questions, answered.')
    html += quotes([
        ('Jerry, Kevin, Paul and Garrett are fantastic. Very responsive and professional. From the start of ordering new windows and back doors, to the installation…', 'Karen HIbpshman', 'Jun 2026'),
        ('Wow what a difference our new windows have made, our home is so QUIET!…', 'LOIS RICHWINE', '2026'),
        ('Tracy and his team were great to work with, I had several windows replaced and all of my siding as well as a portion of my house demoed so I could add to the house…', 'Bryce Martin', 'May 2026'),
        ('…They were also the most affordable quote I received for very high quality windows…', 'Sara Helms', 'May 2026'),
    ], 'What homeowners say about the windows.')
    html += booking_section('Book your free window inspection', 'The office calls you back to pick a time. Every opening gets looked at, and you get the scope, the brand options and the price in writing. Free, no obligation.')
    html += '</main>\n' + footer()
    return write('windows.html', html)

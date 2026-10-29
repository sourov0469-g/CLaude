"""Build the Austin Pro concept site into ../site/*.html."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parts import *  # noqa
import pages_inner


def hero():
    rob = SVC_PAIRS['siding'][1]  # Rob Roy, Jul 2026, $15k–$20k
    href = LIVE + rob['href']
    job = rob['href'].rsplit('-', 1)[-1].upper()
    return f'''<main id="main">
<section class="hero" aria-labelledby="hero-h">
  <div class="hero-grid">
    <div class="hero-copy" data-roles>
      <h1 class="display" id="hero-h" data-role="title">Siding and windows, priced in public.</h1>
      <p class="lead" data-role="body">Real prices from 886 documented Austin jobs. Yours comes free at the inspection.</p>
      <div class="hero-ctas" data-role="body">
        <a class="btn btn-primary" href="#book" data-book>Book a free inspection</a>
        <a class="tlink" href="{TEL}">Call {PHONE}</a>
        <span class="hint">Pick a time online in about a minute. Free, no obligation.</span>
      </div>
      <div class="proofline" data-role="media">
        <span>{stars()}<span>4.9 on 474 Google reviews</span></span>
        <span>James Hardie Elite Preferred</span>
        <span>GAF Master Elite</span>
        <span>Austin, since 2009</span>
      </div>
    </div>
    <div class="hero-media">
      <div class="course-frame" data-course data-start="42">
        <img class="course-before" src="assets/img/pairs/robroy-b-1600.webp" srcset="assets/img/pairs/robroy-b-800.webp 800w, assets/img/pairs/robroy-b-1600.webp 1600w" sizes="(max-width: 960px) 100vw, 60vw" width="1600" height="1000" alt="{e(rob['before']['alt'])}, before the job: khaki siding" fetchpriority="high">
        <img class="course-after" src="assets/img/pairs/robroy-a-1600.webp" srcset="assets/img/pairs/robroy-a-800.webp 800w, assets/img/pairs/robroy-a-1600.webp 1600w" sizes="(max-width: 960px) 100vw, 60vw" width="1600" height="1000" alt="{e(rob['after']['alt'])}, after: navy James Hardie lap siding" fetchpriority="high">
        <div class="course-strips" aria-hidden="true"></div>
        <div class="course-line" aria-hidden="true"></div>
        <span class="frame-tag tag-before">Before</span>
        <span class="frame-tag tag-after">After</span>
        <button class="course-handle" type="button" role="slider" aria-label="Siding courses installed" aria-valuemin="0" aria-valuemax="100" aria-valuenow="58"><svg aria-hidden="true"><use href="#i-v"/></svg><span>Finish the wall</span></button>
      </div>
      <div class="jobtag">
        <dl>
          <div><dt>On this wall</dt><dd>Rob Roy, Austin<span class="jt-when">, July 2026</span></dd></div>
          <div><dt>Installed</dt><dd>{e(rob['installed'])}</dd></div>
        </dl>
        <div class="band-row"><span class="cap">{e(rob['bl'])}</span><span class="band">{e(rob['band'])}</span></div>
        {ext_link(href, 'Open job file ' + job)}
      </div>
    </div>
  </div>
</section>'''


def record():
    items = [
        ('886', 'documented projects since 2018, each with dates, products and a price band'),
        ('415', 'priced siding jobs, 2022–2026. The median landed at <span class="nw">$10k–$15k</span>'),
        ('301', 'of those 415 used the same board: HardiePlank lap, 8.25 inches wide'),
        ('177', 'before-and-after pairs, shot before the crew started and after it finished'),
    ]
    cells = ''.join(f'<div class="record-item"><span class="record-num big-num" data-odo="{n}">{n}</span><p>{t}</p></div>' for n, t in items)
    return f'''<section class="record" aria-label="The job file in numbers">
  <div class="wrap">
    <div class="record-grid">{cells}</div>
    <div class="tally-wrap">
      <ol class="tally" aria-label="312 mapped with photos, plus 574 counted but not mapped, equals 886 documented projects">
        <li><span class="op" aria-hidden="true"></span><b data-odo="312">312</b><span>mapped, with photos</span></li>
        <li><span class="op" aria-hidden="true">+</span><b data-odo="574">574</b><span>counted, not on the map</span></li>
        <li class="is-sum"><span class="op" aria-hidden="true">=</span><b data-odo="886">886</b><span>documented projects</span></li>
      </ol>
      <p class="eq-note">The firm's own figures reconcile to the job. The 312 are drawn on the map further down; every one is a photographed project.</p>
    </div>
  </div>
</section>'''


def ledger_sec():
    return f'''<section class="section" id="trades" aria-labelledby="trades-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="trades-h" data-split>Eleven trades. What each one actually cost.</h2>
      <p>The middle half of every trade's priced jobs, and the band that holds the median, read off each job's worksheet. Materials and labour, before discounts.</p></div>
    {ledger()}
    <p class="fineprint">*Per month: the median band financed in full with no down payment, 120 payments at 7.99% APR, on approved credit. Bands come from 1,590 individually priced trades on 886 documented projects, 2018–2026: a documented sample, not every job since 2009. Storm and hail damage starts with a free inspection. <a class="tlink" href="plan.html#prices">See every band in detail</a></p>
  </div>
</section>'''


def pairs_sec():
    head = '''<div class="side-head"><h2 class="h2" id="pairs-h" data-split>Same house. Price on it.</h2>
      <p>Each pair is one of the firm's own jobs, with that job's own price band printed on it. 177 pairs are published; these six lead the homepage.</p></div>'''
    return f'''<section class="section" id="pairs" aria-labelledby="pairs-h" style="padding-top:0">
  <div class="wrap">
    {pairs(['home'], head=head)}
  </div>
</section>'''


def studio_compact():
    sw = [('Pure White', 'SW 7005', '#EDECE6'), ('Repose Gray', 'SW 7015', '#CCC9C0'), ('Accessible Beige', 'SW 7036', '#D1C7B8'), ('Dovetail', 'SW 7018', '#908A83'), ('Gauntlet Gray', 'SW 7019', '#78736E'), ('Urbane Bronze', 'SW 7048', '#54504A'),
          ('Iron Ore', 'SW 7069', '#434341'), ('Tricorn Black', 'SW 6258', '#2F2F30'), ('In the Navy', 'SW 9178', '#283849'), ('Hunt Club', 'SW 6468', '#2A4F43'), ('Agreeable Gray', 'SW 7029', '#D1CBC1'), ('Alabaster', 'SW 7008', '#EDEAE0')]
    sws = ''.join(f'<button class="swatch paint-chip" type="button" role="radio" aria-checked="false" data-hex="{h}" style="--sw:{h}" aria-label="{n} {c}"><i aria-hidden="true"></i><span aria-hidden="true">{n}<small>{c}</small></span></button>' for n, c, h in sw)
    return f'''<section class="section" id="studio" aria-labelledby="studio-h" style="background:var(--paper-2)">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="studio-h" data-split>Repaint a real house before you pick a colour.</h2>
      <p>This is the Rob Roy job from the top of the page. Choose a Sherwin-Williams colour the firm publishes and the new boards take it, shadow lines and all.</p></div>
    <div class="studio" data-studio data-body="#2A4F43" data-trim="#EDECE6">
      <div class="studio-frame">
        <img src="assets/img/studio/base-1400.webp" srcset="assets/img/studio/base-760.webp 760w, assets/img/studio/base-1400.webp 1400w" sizes="(max-width: 960px) 100vw, 58vw" width="1400" height="875" alt="The Rob Roy house after its James Hardie siding job, shown repainted in the colours you choose" loading="lazy">
        <div class="zone" data-zone="body" style="-webkit-mask-image:url(assets/img/studio/mask-body.png);mask-image:url(assets/img/studio/mask-body.png)"><span class="paint"></span><img class="shade" src="assets/img/studio/shade-body.webp" alt="" loading="lazy"></div>
        <div class="zone" data-zone="gable" style="-webkit-mask-image:url(assets/img/studio/mask-gable.png);mask-image:url(assets/img/studio/mask-gable.png)"><span class="paint"></span><img class="shade" src="assets/img/studio/shade-body.webp" alt="" loading="lazy"></div>
        <div class="zone" data-zone="trim" style="-webkit-mask-image:url(assets/img/studio/mask-trim.png);mask-image:url(assets/img/studio/mask-trim.png)"><span class="paint"></span><img class="shade" src="assets/img/studio/shade-trim.webp" alt="" loading="lazy"></div>
        <span class="frame-tag">Colour preview on a real job</span>
      </div>
      <div class="studio-panel">
        <div class="seg" role="group" aria-label="Part of the house"><button type="button" data-zone-btn="body" aria-pressed="true">Siding</button><button type="button" data-zone-btn="trim" aria-pressed="false">Trim</button></div>
        <div class="swatches" role="radiogroup" aria-label="Sherwin-Williams colours">{sws}</div>
        <dl class="readout">
          <div><dt>Siding</dt><dd data-read="body"><i></i><span>Hunt Club SW 6468</span></dd></div>
          <div><dt>Trim</dt><dd data-read="trim"><i></i><span>Pure White SW 7005</span></dd></div>
          <div><dt>This job</dt><dd>Siding portion $15k–$20k</dd></div>
        </dl>
        <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
          <button class="btn btn-line btn-sm" type="button" data-original aria-pressed="false">Show the real navy</button>
          <a class="btn btn-dark btn-sm" href="plan.html#studio">Open the full studio</a>
        </div>
        <p class="cap">A colour preview on the job's own photo; real paint reads differently in Texas sun. The price band is that job's own, not a quote.</p>
      </div>
    </div>
  </div>
</section>'''


def timeline():
    from datetime import date
    D = [date(2026, 3, 9), date(2026, 6, 18), date(2026, 8, 31), date(2026, 9, 3)]
    gaps = [(D[1] - D[0]).days, (D[2] - D[1]).days, (D[3] - D[2]).days]  # 101, 74, 3 (four on-site days)
    steps = [
        ('Mar 9, 2026', '', 'A referral, and an inspection the same day', 'A past customer sent the homeowner. The inspection and estimate started that day and covered siding plus fascia, soffit, garage jambs and brick-pocket details.'),
        ('Jun 18, 2026', f'{gaps[0]} days later', 'Approved', 'The plan: James Hardie 8.25-inch smooth fiber cement, finished in Sherwin-Williams SuperPaint.'),
        ('Aug 31, 2026', f'{gaps[1]} days later', 'Crew on site', 'Wall sections, fascia, soffit, brick pockets and garage jambs, then paint on the siding, fascia, soffit, garage doors and porch ceiling.'),
        ('Sep 3, 2026', 'Day 4 on site', 'Done', 'Punch-out items and two yard clean-ups, then the final walkthrough.'),
    ]
    lis = ''.join(f'<li class="tl-step"><span class="tl-dot" aria-hidden="true"></span><span class="tl-date">{d}</span>{f"<span class=tl-gap>{g}</span>" if g else ""}<h3>{t}</h3><p>{b}</p></li>' for d, g, t, b in steps)
    tot = (D[3] - D[0]).days
    seg = lambda n: f'{n / tot * 100:.2f}%'
    span = f'''<div class="tl-span" role="img" aria-label="{tot} days from first inspection to final walkthrough: {gaps[0]} days to approval, {gaps[1]} days until the crew arrived, four days on site.">
          <div class="tl-span-bar" aria-hidden="true"><i style="width:{seg(gaps[0])}"></i><i style="width:{seg(gaps[1])}"></i><i class="is-site"></i></div>
          <div class="tl-span-key" aria-hidden="true"><span><b>{gaps[0]}</b> days to approval</span><span><b>{gaps[1]}</b> days to the crew</span><span class="is-site"><b>4</b> days on site</span></div>
        </div>'''
    p = HOME_PAIRS[0]
    return f'''<section class="section" id="one-job" aria-labelledby="job-h">
  <div class="wrap">
    <div class="tl" data-timeline>
      <div class="tl-aside">
        <div class="side-head"><h2 class="h2" id="job-h" data-split>One job, start to finish.</h2>
          <p>Job APS-4867, Village at Western Oaks, Austin, as the firm's own file records it. Every job runs the same four steps: free inspection, written proposal, install, final check.</p></div>
        <figure class="compare" style="margin:0;aspect-ratio:16/10">
          <img class="c-after" style="clip-path:none" src="assets/img/pairs/home0a-1280.webp" srcset="assets/img/pairs/home0a-720.webp 720w, assets/img/pairs/home0a-1280.webp 1280w" sizes="(max-width: 960px) 100vw, 40vw" width="1280" height="800" alt="{e(p['aa'])}" loading="lazy">
          <span class="pair-price"><small>Siding portion</small><b>$25k–$30k</b></span>
        </figure>
        {span}
        <p class="cap">Exterior painting on the same job: $5k–$10k. {ext_link(LIVE + '/recent-projects/' + p['s'], 'Open job file APS-4867')}</p>
      </div>
      <div class="tl-track"><span class="tl-rail" aria-hidden="true"></span><span class="tl-fill" aria-hidden="true"></span><ol class="tl-list">{lis}</ol></div>
    </div>
  </div>
</section>'''


def people_sec():
    return f'''<section class="section" id="people" aria-labelledby="people-h">
  <div class="wrap">
    <h2 class="sr-only" id="people-h">Reviews and credentials</h2>
    {people()}
  </div>
</section>'''


def money_sec():
    head = '''<div class="side-head"><h2 class="h2" id="money-h" data-split>The money, worked out.</h2>
      <p>Three published plans, on approved credit through GreenSky. Move the amount and every payment is recomputed with the formula behind the firm's own example.</p></div>'''
    return f'''<section class="section" id="money" aria-labelledby="money-h" style="background:var(--paper-2)">
  <div class="wrap">
    {money(head=head, offers=True)}
  </div>
</section>'''


def build_index():
    html = head('Austin Pro Siding, Windows & Roofing | Siding and windows, priced in public',
                'James Hardie Elite Preferred siding, four window brands and GAF Master Elite roofing in Austin since 2009, with real price bands from 886 documented jobs. Concept redesign.')
    html += header('home')
    html += hero() + record() + ledger_sec() + pairs_sec() + studio_compact() + timeline() + map_section() + people_sec() + money_sec()
    html += booking_section() + '</main>\n' + footer()
    open(os.path.join(SITE, 'index.html'), 'w').write(html)
    return len(html)


if __name__ == '__main__':
    print('index', build_index())
    if len(sys.argv) > 1 and sys.argv[1] == 'all':
        pages_inner.build_all()

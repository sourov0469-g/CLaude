"""projects.html: sticky grid opener, full map, photo gallery with lightbox, all 14 pairs, APS-4867 in full."""
import json
from parts import *  # noqa
from pages_inner import page_hero

JOB = json.load(open(W + 'job4867.json'))
FILTERS = [('Siding', 'siding'), ('Windows', 'windows'), ('Roofing', 'roofing'), ('Painting', 'painting'), ('Doors', 'doors'), ('Gutters', 'gutters'), ('Patio covers', 'patio')]


def grid_opener():
    """Codrops Sticky Grid Scroll (#94): 3 columns, the centre column's middle tile (APS-4867) spans two rows and takes the zoom."""
    picks = [3, 10, 15, 36, 6, 18, 28, 1, 22, 12]  # ten photos from the firm's captioned set, mixed trades, round the APS-4867 tile
    tiles = [(f'assets/img/photos/p{i}-640.webp', PHOTOS[i]['place'], PHOTOS[i]['when'], PHOTOS[i]['trades']) for i in picks]

    def tile(t, k):
        if t is None:
            p = HOME_PAIRS[0]
            return f'''<figure class="sg-item sg-target" data-k="{k}"><img src="assets/img/pairs/home0a-1280.webp" srcset="assets/img/pairs/home0a-720.webp 720w, assets/img/pairs/home0a-1280.webp 1280w" sizes="(max-width: 900px) 100vw, 90vw" width="1280" height="800" alt="{e(p['aa'])}"></figure>'''
        src, place, when, trades = t
        return f'<figure class="sg-item" data-k="{k}"><img src="{src}" width="640" height="480" alt="{e(trades)} in {e(place)}, {e(when)}" loading="lazy"><figcaption>{e(place.split(",")[0])}<span>{e(when)}</span></figcaption></figure>'
    col_html = ''
    k = 0
    for c, items in enumerate([tiles[0:4], [tiles[4], None, tiles[5]], tiles[6:10]]):  # 4 + (1, target x2, 1) + 4
        inner = ''
        for t in items:
            inner += tile(t, k)
            k += 1
        col_html += f'<div class="sg-col" data-col="{c}">{inner}</div>'
    return f'''<section class="sg" aria-label="Twelve photographed Austin Pro jobs" data-sticky-grid>
  <div class="sg-stage">
    <div class="sg-grid">{col_html}</div>
    <div class="sg-overlay"><span class="label">Job APS-4867</span><b>Village at Western Oaks, Austin</b><span>Siding portion $25k-$30k. Referral to final walkthrough in 178 days, four of them on site.</span><a class="btn btn-primary btn-sm" href="#aps-4867">Read the job, start to finish</a></div>
  </div>
</section>'''


def gallery():
    tiles = ''
    counts = {f: 0 for _, f in FILTERS}
    for i, p in enumerate(PHOTOS):
        t = p['trades'].lower()
        tags = ' '.join(f for _, f in FILTERS if f in t)
        for f in tags.split():
            counts[f] += 1
        tiles += f'''<li data-tags="{tags}"><button type="button" class="gal-tile" data-i="{i}" data-full="assets/img/photos/p{i}-1400.webp" aria-label="Open photo: {e(p['trades'])} in {e(p['place'])}, {e(p['when'])}">
      <img src="assets/img/photos/p{i}-640.webp" width="640" height="480" alt="" loading="lazy" data-flip-id="g{i}"></button>
      <p><b>{e(p['place'])}</b><span>{e(p['trades'])}, {e(p['when'])}</span></p></li>'''
    chips = f'<button class="chip" type="button" data-g="all" aria-pressed="true">All<span>{len(PHOTOS)}</span></button>' + ''.join(
        f'<button class="chip" type="button" data-g="{f}" aria-pressed="false">{n}<span>{counts[f]}</span></button>' for n, f in FILTERS)
    caps = json.dumps([dict(t=f"{p['trades']}", p=p['place'], w=p['when'], h=LIVE + p['href']) for p in PHOTOS], ensure_ascii=False).replace('</', '<\\/')
    return f'''<section class="section" id="gallery" aria-labelledby="gal-h" data-gallery>
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="gal-h" data-split>Every photo is a finished job.</h2>
      <p>{len(PHOTOS)} photos from the firm's captioned project file, each with its neighbourhood, month and trades. Tap one to see it large.</p></div>
    <div class="filters" role="group" aria-label="Filter photos by trade">{chips}</div>
    <ul class="gal-grid">{tiles}</ul>
    <button type="button" class="btn btn-line gal-more" hidden><span>Show all {len(PHOTOS)} photos</span></button>
  </div>
  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Project photo" tabindex="-1" hidden>
    <div class="lb-stage"><img class="lb-img" alt=""></div>
    <div class="lb-bar">
      <p class="lb-cap" aria-live="polite"></p>
      <div class="lb-btns">
        <button type="button" class="btn btn-line btn-sm lb-prev">Previous</button>
        <button type="button" class="btn btn-line btn-sm lb-next">Next</button>
        <a class="btn btn-line btn-sm lb-job" href="#" target="_blank" rel="noopener">Job file</a>
        <button type="button" class="btn btn-dark btn-sm lb-close">Close</button>
      </div>
    </div>
  </div>
  <script type="application/json" id="gal-data">{caps}</script>
</section>'''


def job_full():
    photos = ''.join(f'<li><img src="assets/img/job/4867-{i}-480.webp" srcset="assets/img/job/4867-{i}-480.webp 480w, assets/img/job/4867-{i}-960.webp 960w" sizes="(max-width: 900px) 70vw, 22vw" width="480" height="480" alt="{e(j["alt"])}" loading="lazy"></li>' for i, j in enumerate(JOB))
    scope = [('Siding', 'James Hardie 8.25″ smooth fiber cement on the wall sections, extended to fascia, soffit, garage jambs and brick pockets. Metal drip edge replaced at two 2-by-2 locations.', '$25k-$30k'),
             ('Exterior painting', 'Sherwin-Williams SuperPaint on the siding, plus fascia, soffit, garage doors and the porch ceiling, inside the four-day window.', '$5k-$10k')]
    sc = ''.join(f'<li><div><b>{t}</b><p>{d}</p></div><span>{b}</span></li>' for t, d, b in scope)
    extra = f'''<div class="job-extra">
      <div class="job-scope"><h3 class="h4">Scope, as the job file lists it</h3><ul>{sc}</ul><p class="cap">Bands are each trade's own amount before discounts.</p></div>
      <div class="job-photos"><h3 class="h4">Nine photos from the job</h3><ul class="job-strip">{photos}</ul></div>
    </div>'''
    from build import timeline
    return timeline('aps-4867', 'Job APS-4867, start to finish.', extra)


def build_projects():
    html = head('Projects: 886 documented jobs | Austin Pro Siding, Windows & Roofing',
                "Austin Pro's documented projects: 312 photographed jobs on a map, 43 captioned photos, 14 before-and-after pairs with their price bands, and one job told start to finish. Concept redesign.")
    html += header('projects')
    html += page_hero('886 jobs, documented and dated.',
                      '316 of them have photos. Scroll in, find the ones near you, then read one job from first call to final walkthrough.')
    html += grid_opener()
    html += map_section(full=True, heading='Find the jobs near you.')
    html += gallery()
    head_p = '''<div class="side-head"><h2 class="h2" id="pairs-h" data-split>Fourteen pairs, price on each.</h2>
      <p>Every before-and-after pair on the homepage, the siding page and the windows page, filterable by trade. 177 pairs are published in all.</p></div>'''
    html += f'<section class="section" id="pairs" aria-labelledby="pairs-h"><div class="wrap">{pairs(["home", "siding", "windows"], head=head_p)}</div></section>'
    html += job_full()
    html += booking_section('See your house in the file next', 'The office calls you back to pick a time. The inspection is free and takes 30 to 60 minutes; you get the scope, materials and price in writing.')
    html += '</main>\n' + footer(scripts=('Flip.min.js',))
    return write('projects.html', html)

"""plan.html: Colour Studio (full), every trade priced, distributions, financing worked, referral. Facts from FACTS.md."""
from parts import *  # noqa
from pages_inner import page_hero, SW, COLORPLUS

ARCTIC = '#E0E0D8'


def studio_full():
    def tray(key, chips, label, hidden=False):
        b = ''.join(f'<button class="swatch" type="button" role="radio" aria-checked="false" data-hex="{h}" style="--sw:{h}" aria-label="{e(n)} {e(c) if c != "ColorPlus" else "ColorPlus"}" title="{e(n)}"><i aria-hidden="true"></i></button>' for n, c, h in chips)
        return f'<div class="swatches tray" data-tray="{key}" role="radiogroup" aria-label="{label}"{" hidden" if hidden else ""}>{b}</div>'
    from build_data_facts import HIST
    H = HIST['siding']
    mx = max(c for _, c in H['bands'])
    mini = ''.join(f'<i class="{"is-med" if i == H["median"] else ""}{" is-job" if i == 4 else ""}" style="--h:{c / mx * 100:.0f}%" title="{e(b)}: {c}"></i>' for i, (b, c) in enumerate(H['bands']))
    return f'''<section class="section studio-sec" id="studio" aria-labelledby="studio-h" style="background:var(--paper-2)">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="studio-h" data-split>The Colour Studio.</h2>
      <p>A real Austin Pro job, the Rob Roy re-side, repainted in your browser with the colours the firm publishes. Pick a part of the house, then a finish, then a colour.</p></div>
    <div class="studio studio-full" data-studio data-permalink data-body="#2A4F43" data-trim="#EDECE6">
      <div class="studio-frame">
        <img src="assets/img/studio/base-1400.webp" srcset="assets/img/studio/base-760.webp 760w, assets/img/studio/base-1400.webp 1400w" sizes="(max-width: 900px) 100vw, 60vw" width="1400" height="875" alt="The Rob Roy house after its James Hardie siding job, repainted in the colours you choose">
        {zones()}
        <button class="s-handle" type="button" role="slider" aria-label="Split between the real photo and your colours" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" hidden><svg aria-hidden="true"><use href="#i-h"/></svg></button>
        <span class="frame-tag">Colour preview on a real job</span>
      </div>
      <div class="studio-panel">
        <div class="ctl"><span class="label">Part of the house</span>
          <div class="seg" role="group" aria-label="Part of the house"><button type="button" data-zone-btn="body" aria-pressed="true">Siding</button><button type="button" data-zone-btn="gable" aria-pressed="false">Gable</button><button type="button" data-zone-btn="trim" aria-pressed="false">Trim</button></div></div>
        <div class="ctl"><span class="label">Finish</span>
          <div class="seg" role="group" aria-label="Finish"><button type="button" data-finish-btn="sw" aria-pressed="true">Painted on site</button><button type="button" data-finish-btn="cp" data-trim="{ARCTIC}" aria-pressed="false">ColorPlus</button></div></div>
        {tray('sw', SW, 'Sherwin-Williams colours, a sample of 1,700+')}
        {tray('cp', COLORPLUS, 'James Hardie ColorPlus, the 17 Austin colours', hidden=True)}
        <div class="studio-actions">
          <button class="btn btn-line btn-sm" type="button" data-original aria-pressed="false">Show the real navy</button>
          <button class="btn btn-line btn-sm" type="button" data-split-btn aria-pressed="false">Compare side by side</button>
        </div>
        <p class="cap">Lap siding on this job; 27 of 415 priced siding jobs went board &amp; batten instead. A colour preview on the job's own photo: real paint reads differently in Texas sun.</p>
      </div>
      <aside class="plan-sum" aria-labelledby="sum-h">
        <h3 class="h4" id="sum-h">Your plan</h3>
        <dl class="readout">
          <div><dt>Siding</dt><dd data-read="body"><i></i><span>Hunt Club SW 6468</span></dd></div>
          <div><dt>Gable</dt><dd data-read="gable"><i></i><span>Hunt Club SW 6468</span></dd></div>
          <div><dt>Trim</dt><dd data-read="trim"><i></i><span>Pure White SW 7005</span></dd></div>
          <div><dt>Finish</dt><dd data-sum="finish">Painted on site in Sherwin-Williams</dd></div>
        </dl>
        <div class="sum-price">
          <p><span>This job's siding portion</span><b>$15k-$20k</b></p>
          <div class="minihist" role="img" aria-label="Where all 415 priced siding jobs landed; this job's band, $15k-$20k, is marked, next to the median band, $10k-$15k.">{mini}</div>
          <p class="cap">Where all 415 priced siding jobs landed. Dark: the median band. Red: this job's band. Financed in full at 7.99% for 120 months, $15k-$20k is about $182-$243 a month, on approved credit.</p>
        </div>
        <div class="sum-actions">
          <a class="btn btn-primary" href="#book" data-book data-book-plan>Book with this plan</a>
          <button class="tlink link-btn" type="button" data-copy>Copy a link to this plan</button>
          <p class="cap" data-copy-msg aria-live="polite"></p>
        </div>
      </aside>
    </div>
  </div>
</section>'''


def trades_full():
    return f'''<section class="section" id="trades" aria-labelledby="trades-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="trades-h" data-split>Every trade, priced from the files.</h2>
      <p>The middle half of each trade's priced jobs and the band holding the median, read off each job's worksheet. Materials and labour, before discounts, excluding tax.</p></div>
    {ledger()}
    <p class="fineprint">*Per month: the median band financed in full with no down payment, 120 payments at 7.99% APR, on approved credit. Bands come from 1,590 individually priced trades on 886 documented projects, 2018-2026: a documented sample, not every job since 2009.</p>
  </div>
</section>'''


def distributions():
    return f'''<section class="section" id="prices" aria-labelledby="dist-h" data-tabs>
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="dist-h" data-split>Where every siding and window job landed.</h2>
      <p>Every priced job in its band, 2022-2026. The dark bar holds the median; mid-grey is the rest of the middle half. Point at or tap a bar for its count.</p></div>
    <div class="seg" role="tablist" aria-label="Trade">
      <button type="button" role="tab" id="tab-s" aria-controls="panel-s" aria-selected="true" data-tab="s">Siding, 415 jobs</button>
      <button type="button" role="tab" id="tab-w" aria-controls="panel-w" aria-selected="false" data-tab="w" tabindex="-1">Windows, 376 jobs</button>
    </div>
    <div class="dist-panels">
      <div role="tabpanel" id="panel-s" aria-labelledby="tab-s" data-panel="s">{hist('siding', 'Siding jobs by price band, 415 priced jobs')}<p class="cap">Median $10k-$15k; middle half $5k-$20k. <a class="tlink" href="siding.html#prices">Siding prices in detail</a></p></div>
      <div role="tabpanel" id="panel-w" aria-labelledby="tab-w" data-panel="w" hidden>{hist('windows', 'Window jobs by price band, 376 priced jobs')}<p class="cap">Median $10k-$15k; most common $5k-$10k; middle half $5k-$25k. <a class="tlink" href="windows.html#prices">Window prices in detail</a></p></div>
    </div>
  </div>
</section>'''


def money_full():
    head = '''<div class="side-head"><h2 class="h2" id="money-h" data-split>The money, worked out.</h2>
      <p>Three published plans on approved credit through GreenSky, and the discounts as the firm stacks them. Move the amount; every figure is recomputed.</p></div>'''
    return f'''<section class="section" id="money" aria-labelledby="money-h">
  <div class="wrap">
    {money(full=True, head=head)}
    <p class="cap" style="margin-top:var(--s6)">Payment methods: Visa, Mastercard, American Express, debit, bank transfer or ACH, and checks.</p>
  </div>
</section>'''


def referral():
    return '''<section class="section referral-sec" id="referral" aria-labelledby="ref-h" style="padding-top:0">
  <div class="wrap">
    <div class="ticket">
      <div class="ticket-main">
        <h2 class="h2" id="ref-h">Send a neighbour. Get paid each time.</h2>
        <p>A neighbour, a friend or family: when they mention your name before their first appointment, you get $200. There is no cap on how many.</p>
      </div>
      <div class="ticket-stub"><b>$200</b><span>for every referral, no limit</span></div>
    </div>
  </div>
</section>'''


def build_plan():
    html = head('Plan and price your project | Austin Pro Siding, Windows & Roofing',
                'Repaint a real Austin Pro job in published Sherwin-Williams and ColorPlus colours, see what every trade cost across 886 documented jobs, and work out the financing. Concept redesign.')
    html += header('plan')
    html += page_hero('Pick the colour. Then see the price.',
                      'A real job repainted in your browser, every trade priced from the firm\'s files, and the monthly maths worked out.')
    html += studio_full() + trades_full() + distributions() + money_full() + referral()
    html += booking_section('Book an inspection for your plan', 'The office calls you back to pick a time. Bring your Colour Studio plan: the inspection turns it into a scope, materials and a written price. Free, no obligation.')
    html += '</main>\n' + footer()
    return write('plan.html', html)

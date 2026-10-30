"""OWNER ORDER (2026-10-30): the full website. Eight inner pages, each a set of sections, each section in five
genuinely different versions behind its own switcher, exactly as the homepage sections work.

How a section gets five versions: every section has a job (intro, items, cost, work, photos, colour, faq, reviews,
cta, map, form). Each job has a family of renderers that differ in layout and mechanism (cards, accordion, tabs,
rail, ledger, pick-and-detail, steps, bars...). A section takes five different renderers of its job, fed with the
page's own published data. Nothing here invents a figure: every number is read from the same data the homepage
uses (home2.TRADES, SV1, BRANDS, FAQ, PAIRS6, PHOTOS, REVIEWS, the map pins, CRED_ROWS, TEXAS, TERMS).

Hidden backups: where the firm's earlier page had a matching section, that section is the backup record. The old
pages are kept byte-identical as *-record.html and the Versions panel opens the section there.

Run: cd src && python3 -I site_pages.py   (writes site/<page>.html for every page)
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import home2 as H          # noqa: E402  (shared shell, data and helpers)
import versions as VS      # noqa: E402
import clad                # noqa: E402
from parts import e, clean, SITE   # noqa: E402
from pages_windows import BRANDS   # noqa: E402
from pages_inner import FAQ        # noqa: E402

T = {t['name']: t for t in H.TRADES}
SV1 = {k: f for k, _l, _t, _s, f in H.SV1}
PH, TH = VS.PH, VS.TH
band, med = VS.band, VS.med


def ea(x):
    """escape, but let the Annex A hours keep their en-dash entities through the house-style cleaner"""
    return e(x).replace('&amp;ndash;', '&ndash;')


def tr(n):
    return T[n]


def docs(n):
    t = T[n]
    return t['doc'] or t['n']


def nextline():
    return (f'<p class="nextstep">Questions about any of it? <a class="tlink" href="{H.TEL}">Call {H.PHONE}</a> '
            f'<span class="ns-or">or</span> <a class="tlink" href="contact.html">book a free inspection</a></p>')


def head2(h2, lead=''):
    return f'<div class="pg-head"><h2 class="h2x" data-split>{h2}</h2>{f"<p class=\"lead\">{lead}</p>" if lead else ""}</div>'


def radio(i, attrs, label, cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<button type="button" role="radio"{c} aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" {attrs}>{label}</button>'


# ================================================================ items: a list of (title, value, text)
def it_cards(sid, h2, lead, items):
    li = ''.join(f'<li><span class="pg-v num">{e(v)}</span><h3>{e(t)}</h3><p>{e(x)}</p></li>' for t, v, x in items)
    return 'Cards', f'<div class="v pg-cards" data-tone="ground">{head2(h2, lead)}<ul class="pg-cg">{li}</ul></div>'


def it_accordion(sid, h2, lead, items):
    acc = ''.join(f'<details class="nv-acc"{" open" if i == 0 else ""}><summary><span class="num">{e(v)}</span>{e(t)}<i aria-hidden="true"></i></summary><p>{e(x)}</p></details>' for i, (t, v, x) in enumerate(items))
    return 'Open one', f'<div class="v pg-acc" data-tone="ground2"><div class="pg-split">{head2(h2, lead)}<div class="nv-accs">{acc}</div></div></div>'


def it_pick(sid, h2, lead, items):
    t0, v0, x0 = items[0]
    btn = ''.join(radio(i, f'data-o-t="{e(t)}" data-o-v="{e(v)}" data-o-x="{e(x)}"', f'<b>{e(t)}</b>') for i, (t, v, x) in enumerate(items))
    return 'Pick and read', f'''<div class="v pg-pick" data-tone="ground">{head2(h2, lead)}
  <div class="pg-pk"><div class="nv-chips nv-col" role="radiogroup" aria-label="{e(h2)}" data-nv-pick>{btn}</div>
    <div class="pg-pk-o" aria-live="polite"><p class="pg-pk-v num" data-o="v">{e(v0)}</p><h3 data-o="t">{e(t0)}</h3><p data-o="x">{e(x0)}</p></div></div></div>'''


def it_rail(sid, h2, lead, items):
    li = ''.join(f'<li><span class="num">{i + 1:02d}</span><b>{e(v)}</b><h3>{e(t)}</h3><p>{e(x)}</p></li>' for i, (t, v, x) in enumerate(items))
    return 'Rail', f'<div class="v pg-rail" data-tone="ground2">{head2(h2, lead)}<ol class="pg-rl" tabindex="0" aria-label="{e(h2)}, scrolls sideways">{li}</ol></div>'


def it_ledger(sid, h2, lead, items):
    rows = ''.join(f'<tr><th scope="row">{e(t)}</th><td class="num">{e(v)}</td><td>{e(x)}</td></tr>' for t, v, x in items)
    return 'Ledger', f'<div class="v pg-ledger" data-tone="ground">{head2(h2, lead)}<div class="pg-tw"><table class="pg-tb"><tbody>{rows}</tbody></table></div></div>'


def it_steps(sid, h2, lead, items):
    li = ''.join(f'<li><span class="num">{i + 1}</span><div><h3>{e(t)}</h3><p>{e(x)}</p>{f"<b class=num>{e(v)}</b>" if v else ""}</div></li>' for i, (t, v, x) in enumerate(items))
    return 'Steps', f'<div class="v pg-steps" data-tone="ground2"><div class="pg-split">{head2(h2, lead)}<ol class="pg-st">{li}</ol></div></div>'


def it_tabs(sid, h2, lead, items):
    tabs = ''.join(f'<button type="button" role="tab" id="{sid}-t{i}" aria-controls="{sid}-p{i}" aria-selected="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}">{e(t)}</button>' for i, (t, _v, _x) in enumerate(items))
    panels = ''.join(f'<div role="tabpanel" class="pg-tp" id="{sid}-p{i}" aria-labelledby="{sid}-t{i}"{"" if i == 0 else " hidden"}><b class="num">{e(v)}</b><p>{e(x)}</p></div>' for i, (_t, v, x) in enumerate(items))
    return 'Tabs', f'<div class="v pg-tabs" data-tone="ground">{head2(h2, lead)}<div class="nv-tabs" role="tablist" aria-label="{e(h2)}" data-nv-tabs>{tabs}</div>{panels}</div>'


def it_bars(sid, h2, lead, items):
    nums = [float(re.sub(r'[^\d.]', '', v) or 0) for _t, v, _x in items]
    mx = max(nums) or 1
    li = ''.join(f'<li style="--w:{n / mx:.3f}"><b>{e(t)}</b><i></i><span class="num">{e(v)}</span><p>{e(x)}</p></li>' for (t, v, x), n in zip(items, nums))
    return 'Bars', f'<div class="v pg-bars" data-tone="ground2">{head2(h2, lead)}<ol class="pg-br">{li}</ol></div>'


def it_flip(sid, h2, lead, items):
    li = ''.join(f'<li><button class="pg-fl" type="button" aria-pressed="false" data-nv-flip><span class="pg-fl-f"><b class="num">{e(v)}</b><i>{e(t)}</i></span><span class="pg-fl-b">{e(x)}</span></button></li>' for t, v, x in items)
    return 'Turn over', f'<div class="v pg-flip" data-tone="ground">{head2(h2, lead + " Turn a tile to read the back.")}<ul class="pg-fls">{li}</ul></div>'


def it_big(sid, h2, lead, items):
    li = ''.join(f'<li><b class="num">{e(v)}</b><span>{e(t)}</span><p>{e(x)}</p></li>' for t, v, x in items)
    return 'Big numbers', f'<div class="v pg-big" data-tone="ground2">{head2(h2, lead)}<ul class="pg-bg">{li}</ul></div>'


ITEMS = {'cards': it_cards, 'accordion': it_accordion, 'pick': it_pick, 'rail': it_rail, 'ledger': it_ledger, 'steps': it_steps,
         'tabs': it_tabs, 'bars': it_bars, 'flip': it_flip, 'big': it_big}


def items_section(sid, h2, lead, items, kinds):
    return [ITEMS[k](f'{sid}{n}', h2, lead, items) for n, k in enumerate(kinds)]


# ================================================================ intro (the page's H1)
def intro_section(sid, h1, lead, stats, img_html, chips):
    """five page openings; stats = [(value, label)], chips = [(label, anchor)] for the sections below"""
    H1 = f'<h1 class="display" data-split>{h1}</h1>'
    st = ''.join(f'<li><b class="num">{e(v)}</b><span>{e(l)}</span></li>' for v, l in stats)
    cta = f'<div class="ctas"><a class="btn btn-red" href="contact.html">Book free inspection</a><a class="tlink" href="{H.TEL}">Call {H.PHONE}</a></div>'
    ch = ''.join(f'<a class="pg-chip" href="#{a}">{e(l)}</a>' for l, a in chips)
    q = ''.join(radio(i, f'data-o-a="{e(l)}" data-o-h="#{a}"', e(l)) for i, (l, a) in enumerate(chips))
    out = [
        ('Split', f'<div class="v pg-in pg-in-split" data-tone="ground"><div class="pg-in-l">{H.pstrip()}{H1}<p class="lead">{lead}</p>{cta}</div><figure class="pg-in-ph">{img_html}</figure></div>'),
        ('Numbers', f'<div class="v pg-in pg-in-num" data-tone="ground2">{H.pstrip()}{H1}<ul class="pg-in-st">{st}</ul><p class="lead">{lead}</p>{cta}</div>'),
        ('Photo band', f'<div class="v pg-in pg-in-band" data-tone="ground"><figure class="pg-in-bph">{img_html}</figure><div class="pg-in-card">{H1}<p class="lead">{lead}</p>{cta}</div></div>'),
        ('On this page', f'<div class="v pg-in pg-in-idx" data-tone="ground"><div>{H.pstrip()}{H1}<p class="lead">{lead}</p>{cta}</div><nav class="pg-in-nav" aria-label="On this page">{ch}</nav></div>'),
        ('Ask first', f'''<div class="v pg-in pg-in-q" data-tone="ground2">{H1}<p class="lead">{lead}</p>
  <p class="pg-in-k">What do you want to know first?</p><div class="nv-chips" role="radiogroup" aria-label="Start with" data-nv-pick>{q}</div>
  <p class="pg-in-go"><a class="btn btn-red" href="#{chips[0][1]}" data-o="h" data-nv-href>Go to <span data-o="a">{e(chips[0][0])}</span></a> <a class="tlink" href="{H.TEL}">or call {H.PHONE}</a></p></div>'''),
    ]
    return out


# ================================================================ cost: published bands for the page's trades
def cost_section(sid, h2, names, levers=None):
    ts = [tr(n) for n in names]
    lo = min(t['lo'] for t in ts)
    hi = max(t['hi'] for t in ts)
    sc = lambda v: (v - lo) / (hi - lo or 1)
    rul = ''.join(f'''<li><b>{e(t['name'])}</b><span class="pg-rr"><i style="--a:{sc(t['lo']):.3f};--b:{sc(t['hi']):.3f}"></i><em style="--a:{sc(t['med'][0]):.3f};--b:{sc(t['med'][1]):.3f}"></em></span>
      <span class="num">{band(t)}, median {med(t)}</span></li>''' for t in ts)
    axis = ''.join(f'<span class="num" style="--x:{sc(v):.3f}">${v}k</span>' for v in sorted({lo, hi, *(t["med"][0] for t in ts)}))
    lead = 'Every band is the firm\'s own, from its priced jobs; the price for your house comes in writing after the free inspection.'
    out = [('Ruler', f'<div class="v pg-cost pg-ruler" data-tone="ground">{head2(h2, lead)}<ul class="pg-rl2">{rul}</ul><div class="pg-ax">{axis}</div><p class="pg-key"><i></i> middle half <em></em> median band</p></div>')]

    def lines(t):
        lo_, hi_ = t['med'][0] * 1000, t['med'][1] * 1000
        return ''.join(f'<li><b>{lab}, {mo}</b><span class="num">{VS.money(H.pmt(lo_, apr, n) if apr else lo_ / n)} to {VS.money(H.pmt(hi_, apr, n) if apr else hi_ / n)} a month</span></li>' for apr, n, lab, mo in H.TERMS)
    btn = ''.join(radio(i, f'data-o-t="{e(t["name"])}: median band {med(t)}, from {t["n"]} priced jobs" data-o-l="{e(lines(t))}"', e(t['name'])) for i, t in enumerate(ts))
    out.append(('By the month', f'''<div class="v pg-cost pg-month" data-tone="ground2">{head2(h2, "The median band of each trade, run through the three published financing plans.")}
  <div class="nv-chips" role="radiogroup" aria-label="Trade" data-nv-pick data-nv-html>{btn}</div>
  <div class="nv-bt-o" aria-live="polite"><h3 data-o="t">{e(ts[0]["name"])}: median band {med(ts[0])}, from {ts[0]["n"]} priced jobs</h3><ul data-o="l">{lines(ts[0])}</ul></div><p class="nv-fine">{e(H.FINE)}</p></div>'''))
    rows = ''.join(f'<tr><th scope="row">{e(t["name"])}</th><td class="num">{t["doc"] or "-"}</td><td class="num">{t["n"]}</td><td class="num">{band(t)}</td><td class="num">{med(t)}</td></tr>' for t in ts)
    out.append(('Ledger', f'''<div class="v pg-cost pg-cl" data-tone="ground">{head2(h2, lead)}<div class="pg-tw"><table class="pg-tb pg-tb-h"><thead><tr><th scope="col">Trade</th><th scope="col">Documented</th><th scope="col">Priced</th><th scope="col">Middle half</th><th scope="col">Median band</th></tr></thead><tbody>{rows}</tbody></table></div></div>'''))
    lv = levers or H.LEVERS
    out.append(('What moves it', f'''<div class="v pg-cost pg-lev" data-tone="ground2"><div class="pg-split">{head2(h2, "Where in the band a job lands depends on the house. These are the things that move it.")}
  <div><ol class="pg-lv">{"".join(f"<li>{e(x)}</li>" for x in lv)}</ol><div class="pg-lv-b">{"".join(f"<p><b>{e(t['name'])}</b> <span class=num>{band(t)}</span></p>" for t in ts)}</div></div></div></div>'''))
    note = lambda t: f'<p class="pg-mc-n">{e(t["note"])}</p>' if t.get('note') else ''
    cards = ''.join(f'<li><h3>{e(t["name"])}</h3><p class="pg-mc num">{med(t)}</p><p>median band, from {t["n"]} priced jobs</p><p class="pg-mc-r">middle half <span class="num">{band(t)}</span></p>{note(t)}</li>' for t in ts)
    out.append(('Median cards', f'<div class="v pg-cost pg-mcs" data-tone="ground">{head2(h2, lead)}<ul class="pg-mcl">{cards}</ul></div>'))
    return out


# ================================================================ work: true before/after pairs
def work_section(sid, h2, pairs):
    P = pairs
    out = []
    chips = ''.join(radio(i, f'data-i="{i}"', e(q["place"].split(",")[0])) for i, q in enumerate(P))
    stage = ''.join(f'<figure class="nv-fl-f{" on" if i == 0 else ""}" data-i="{i}">{VS.pair_img(q, "b", "nv-fb")}{VS.pair_img(q, "a", "nv-fa")}<figcaption>{e(q["place"])}, {q["when"]}: {e(q["what"])}. {e(q["bl"])} {q["band"]}.</figcaption></figure>' for i, q in enumerate(P))
    out.append(('Flip', f'''<div class="v pg-work nv-flip" data-tone="ground" data-side="b">{head2(h2, "One button, the same wall twice.")}<div class="nv-fl">{stage}</div>
  <div class="nv-fl-bar"><button class="btn btn-red" type="button" data-nv-flipside>Show after</button><div class="nv-chips" role="radiogroup" aria-label="Job" data-nv-job>{chips}</div></div></div>'''))
    tiles = ''.join(f'<li><button class="nv-hg" type="button" aria-pressed="false" data-nv-flip aria-label="{e(q["place"])}: show after">{VS.pair_img(q, "b", "nv-hg-b")}{VS.pair_img(q, "a", "nv-hg-a")}</button><p><b>{e(q["place"])}</b> {q["when"]} · {q["band"]}</p></li>' for q in P)
    out.append(('Point to see after', f'<div class="v pg-work nv-hgrid" data-tone="ground2">{head2(h2, "Point at one, or tap it, to see it after.")}<ul class="nv-hgs">{tiles}</ul></div>'))
    sides = ''.join(f'<li class="nv-sb-i{" on" if i == 0 else ""}" data-cyc-i><figure>{VS.pair_img(q, "b")}<figcaption>Before</figcaption></figure><figure>{VS.pair_img(q, "a")}<figcaption>After</figcaption></figure><p><b>{e(q["place"])}</b>, {q["when"]}: {e(q["what"])}. {e(q["bl"])} {q["band"]}.</p></li>' for i, q in enumerate(P))
    out.append(('Side by side', f'''<div class="v pg-work nv-side" data-tone="ground" data-nv-cyc>{head2(h2, f'<span class="num" data-cyc-n>1</span> of {len(P)}')}
  <div class="nv-sb-nav"><button class="btn btn-line btn-sm" type="button" data-cyc="-1">Previous</button><button class="btn btn-red btn-sm" type="button" data-cyc="1">Next</button></div><ul class="nv-sbs" aria-live="polite">{sides}</ul></div>'''))
    rows = ''.join(f'<tr><td>{VS.pair_img(q, "a")}</td><th scope="row">{e(q["place"])}</th><td>{e(q["what"])}</td><td>{q["when"]}</td><td class="num">{q["band"]}</td></tr>' for q in P)
    out.append(('Job ledger', f'<div class="v pg-work pg-wl" data-tone="ground2">{head2(h2, "Each finished job with its published band.")}<div class="pg-tw"><table class="pg-tb pg-tb-img"><tbody>{rows}</tbody></table></div></div>'))
    big = P[0]
    rest = ''.join(f'<li>{VS.pair_img(q, "a")}<p><b>{e(q["place"])}</b> {q["band"]}</p></li>' for q in P[1:])
    out.append(('Feature and the rest', f'''<div class="v pg-work pg-feat" data-tone="ground">{head2(h2)}
  <div class="pg-ft"><figure class="pg-ft-m">{VS.pair_img(big, "b")}{VS.pair_img(big, "a")}<figcaption>{e(big["place"])}, {big["when"]}: before, then after. {e(big["what"])}. {e(big["bl"])} {big["band"]}.</figcaption></figure>
    <ul class="pg-ft-r">{rest}</ul></div></div>'''))
    return out


# ================================================================ photos: the firm's finished-job photos
def photos_section(sid, h2, idx):
    """idx: PHOTOS indices; full-size where the page already carries one, thumbnails otherwise"""
    full = [i for i in idx if i in VS.IMG_P]
    th = [i for i in idx if i in VS.THUMBS]
    P = H.PHOTOS
    cap = lambda i: f'{e(P[i]["trades"])}, {e(P[i]["place"])}, {P[i]["when"]}'
    alt = lambda i: f'{P[i]["trades"]} at a home in {P[i]["place"]}'
    out = []
    mos = ''.join(f'<figure>{VS.ph(i, alt(i))}<figcaption>{cap(i)}</figcaption></figure>' for i in full) + ''.join(f'<figure>{VS.thumb(i, alt(i))}<figcaption>{cap(i)}</figcaption></figure>' for i in th if i not in full)
    out.append(('Mosaic', f'<div class="v pg-ph pg-mos" data-tone="ground">{head2(h2, "Every photo is a finished job, with where and when.")}<div class="pg-ms">{mos}</div></div>'))
    rail = ''.join(f'<li><figure>{VS.thumb(i, alt(i))}<figcaption>{cap(i)}</figcaption></figure></li>' for i in th)
    out.append(('Rail', f'<div class="v pg-ph pg-phr" data-tone="ground2">{head2(h2, "Scroll along the finished jobs.")}<ul class="pg-pr" tabindex="0" aria-label="Finished jobs, scrolls sideways">{rail}</ul></div>'))
    one = full or th
    big = ''.join(f'<li class="nv-sb-i{" on" if k == 0 else ""}" data-cyc-i><figure>{VS.ph(i, alt(i)) if i in VS.IMG_P else VS.thumb(i, alt(i))}<figcaption>{cap(i)}</figcaption></figure></li>' for k, i in enumerate(one + [x for x in th if x not in one]))
    n = len(one + [x for x in th if x not in one])
    out.append(('One at a time', f'''<div class="v pg-ph pg-one" data-tone="ground" data-nv-cyc>{head2(h2, f'<span class="num" data-cyc-n>1</span> of {n}')}
  <div class="nv-sb-nav"><button class="btn btn-line btn-sm" type="button" data-cyc="-1">Previous</button><button class="btn btn-red btn-sm" type="button" data-cyc="1">Next</button></div><ul class="pg-onel" aria-live="polite">{big}</ul></div>'''))
    rows = ''.join(f'<li><span class="num">{P[i]["when"]}</span><b>{e(P[i]["place"])}</b><i>{e(P[i]["trades"])}</i></li>' for i in idx)
    out.append(('Job list', f'<div class="v pg-ph nv-feed" data-tone="ground2">{head2(h2, "The finished jobs, listed with where, when and what went on.")}<ol class="nv-fd">{rows}</ol></div>'))
    tl = ''.join(f'<li><figure>{VS.thumb(i, alt(i)) if i in VS.THUMBS else VS.ph(i, alt(i))}</figure><p><b>{e(P[i]["place"])}</b><span>{P[i]["when"]}</span></p></li>' for i in (th or full)[:8])
    out.append(('Contact sheet', f'<div class="v pg-ph pg-cs" data-tone="ground">{head2(h2, "A contact sheet of the finished work.")}<ul class="pg-csl">{tl}</ul></div>'))
    return out


# ================================================================ colour: the published palettes
def colour_section(sid, h2):
    return [(n, h) for n, h in VS.colour(H)]


# ================================================================ faq
def faq_section(sid, h2, qa):
    out = []
    acc = ''.join(f'<details class="nv-acc"{" open" if i == 0 else ""}><summary>{ea(q)}<i aria-hidden="true"></i></summary><p>{ea(a)}</p></details>' for i, (q, a) in enumerate(qa))
    out.append(('Accordion', f'<div class="v pg-faq" data-tone="ground">{head2(h2)}<div class="nv-accs">{acc}</div></div>'))
    two = ''.join(f'<div><dt>{ea(q)}</dt><dd>{ea(a)}</dd></div>' for q, a in qa)
    out.append(('All answers', f'<div class="v pg-faq pg-faq2" data-tone="ground2">{head2(h2, "Every answer, open at once.")}<dl class="pg-qa">{two}</dl></div>'))
    tabs = ''.join(f'<button type="button" role="tab" id="{sid}2-t{i}" aria-controls="{sid}2-p{i}" aria-selected="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}">{e(q)}</button>' for i, (q, _a) in enumerate(qa))
    pan = ''.join(f'<div role="tabpanel" id="{sid}2-p{i}" aria-labelledby="{sid}2-t{i}" class="pg-qp"{"" if i == 0 else " hidden"}><p>{ea(a)}</p></div>' for i, (_q, a) in enumerate(qa))
    out.append(('Question list', f'<div class="v pg-faq pg-faq3" data-tone="ground">{head2(h2)}<div class="pg-faq-g"><div class="nv-tabs pg-vtabs" role="tablist" aria-orientation="vertical" aria-label="Questions" data-nv-tabs>{tabs}</div><div>{pan}</div></div></div>'))
    srch = ''.join(f'<details class="nv-acc" data-f="{e((q + " " + a.replace('&ndash;', '-')).lower())}"><summary>{ea(q)}<i aria-hidden="true"></i></summary><p>{ea(a)}</p></details>' for q, a in qa)
    out.append(('Search', f'''<div class="v pg-faq pg-faq4" data-tone="ground2" data-nv-filter>{head2(h2, "Type a word: cost, warranty, time...")}
  <label class="pg-srch"><span class="sr-only">Search the questions</span><input type="search" placeholder="Search {len(qa)} answers" data-nv-filter-in></label>
  <p class="pg-srch-n" aria-live="polite"><span data-nv-filter-n>{len(qa)}</span> of {len(qa)} questions</p><div class="nv-accs">{srch}</div></div>'''))
    chat = ''.join(f'<p class="nv-ct-b nv-ct-me">{ea(q)}</p><p class="nv-ct-b nv-ct-them">{ea(a)}</p>' for q, a in qa[:5])
    out.append(('As a conversation', f'<div class="v pg-faq pg-faq5" data-tone="ground">{head2(h2, "What homeowners ask the office, and what the office answers.")}<div class="nv-ct">{chat}</div></div>'))
    return out


# ================================================================ reviews: aggregate-led, real text only
def reviews_section(sid, h2, word):
    R = [r for r in H.REVIEWS if not word or word in r['text'].lower()] or H.REVIEWS
    cut = lambda t, n=180: t if len(t) <= n else t[:t.rfind(' ', 0, n)] + '...'
    agg = f'<div class="pg-agg"><b class="num">4.9</b>{H.stars("nv-st")}<p>on <b>474</b> Google reviews</p><a class="tlink" href="{H.G_REVIEWS_URL}" target="_blank" rel="noopener">Read all 474 on Google<span class="sr-only"> (opens in a new tab)</span></a></div>'
    out = [('Pull quote', f'<div class="v pg-rv pg-pull" data-tone="ground">{agg}<blockquote class="pg-pq"><p>&ldquo;{e(cut(R[0]["text"], 260))}&rdquo;</p><footer>{e(R[0]["name"])}, {e(R[0]["source"])}</footer></blockquote></div>')]
    wall = ''.join(f'<li><p>&ldquo;{e(r["text"])}&rdquo;</p><span>{e(r["name"])}, {e(r["source"])}</span></li>' for r in R[:6])
    out.append(('Wall', f'<div class="v pg-rv nv-wall" data-tone="ground2">{head2(h2, f"{len(R)} of the 30 quoted reviews name this work. 4.9 on 474 Google reviews.")}<ul class="nv-wl-c">{wall}</ul></div>'))
    cyc = ''.join(f'<li class="nv-sb-i{" on" if i == 0 else ""}" data-cyc-i><blockquote><p>&ldquo;{e(r["text"])}&rdquo;</p><footer>{e(r["name"])}, {e(r["source"])}</footer></blockquote></li>' for i, r in enumerate(R[:8]))
    out.append(('One at a time', f'''<div class="v pg-rv pg-rc" data-tone="ground" data-nv-cyc>{head2(h2, f'<span class="num" data-cyc-n>1</span> of {min(8, len(R))}')}
  <div class="nv-sb-nav"><button class="btn btn-line btn-sm" type="button" data-cyc="-1">Previous</button><button class="btn btn-red btn-sm" type="button" data-cyc="1">Next</button></div><ul class="pg-rcl" aria-live="polite">{cyc}</ul>{agg}</div>'''))
    out.append(('The number', f'<div class="v pg-rv pg-num" data-tone="ground2"><div class="nv-agg-n"><b class="num">4.9</b>{H.stars("nv-st nv-st-xl")}<p>on <b>474</b> Google reviews</p><a class="btn btn-red" href="{H.G_REVIEWS_URL}" target="_blank" rel="noopener">Read all 474 on Google<span class="sr-only"> (opens in a new tab)</span></a></div><div>{head2(h2)}<p>Aggregate first: the number is every review on Google; the quotes on this site are 30 of them, as written.</p></div></div>'))
    lines = ''.join(f'<li><span>{e(r["name"])}</span><p>&ldquo;{e(cut(r["text"], 110))}&rdquo;</p></li>' for r in R[:6])
    out.append(('Names and lines', f'<div class="v pg-rv pg-nl" data-tone="ground">{head2(h2, "One line from each, with the name it was signed with.")}<ul class="pg-nll">{lines}</ul>{agg}</div>'))
    return out


# ================================================================ pages
def pages():
    out = {}
    pairs_s = [p for p in H.PAIRS6 if p['bl'].startswith('Siding')]
    pairs_w = [p for p in H.PAIRS6 if p['bl'].startswith('Windows')]
    fq = lambda k: [(q, a) for q, a in FAQ[k]]

    # ---------------- SIDING & PAINTING
    hardie = [('James Hardie fiber cement', '415', 'On every priced siding job, installed by an Elite Preferred crew.'),
              ('HardiePlank lap 8.25 in', '301 of 415', 'The board on 301 of the 415 priced siding jobs; 27 went board and batten.'),
              ('Select Cedarmill texture', '286 of 415', 'Select Cedarmill texture on 286 of 415, Smooth on 36.'),
              ('The board itself', '7 in', '8.25 in board, 7 in exposure, 1.25 in lap, 5/16 in thick.'),
              ('Warranty', '30 years', '30-year non-prorated Hardie warranty, plus lifetime workmanship on labour.'),
              ('Painted in the same job', '297 of 415', 'Painted in the same job on 297 of 415 priced siding jobs.')]
    texas = [(h, k, f'{h}: {k}.') for h, k, _p in H.TEXAS]
    sid_items = items_section('sdh', 'James Hardie, by the numbers', 'What goes on the wall, as the firm documents it.', hardie, ['cards', 'ledger', 'pick', 'big'])
    sid_items.insert(3, ('Clad the gable', clad.html(H.TRADES, H.COLORPLUS).replace('class="v built-4 cl"', 'class="v pg-clad cl"').replace('<h2 class="h2x" data-split>Clad the gable</h2>', '<h2 class="h2x" data-split>James Hardie, by the numbers: clad the gable</h2>')))
    out['siding'] = dict(title='James Hardie siding and exterior painting in Austin | Austin Pro', label='Siding &amp; painting', desc='James Hardie siding and exterior painting in Austin, priced in public from 415 priced siding jobs.', sections=[
        ('intro', 'Overview', intro_section('sdi', 'James Hardie siding and paint, priced in public', f'{docs("Siding")} documented siding jobs and {docs("Exterior painting")} painting jobs around Austin, each with its real price. Inspections are free.',
                                            [('431', 'documented siding jobs'), (med(tr('Siding')), 'median siding band'), ('320', 'documented painting jobs'), ('2025', "James Hardie President's Club")],
                                            VS.ph(3, 'Siding, exterior painting and gutters at a home in Maple Run, Austin'), [('The board', 'sd-hardie'), ('Colour', 'sd-colour'), ('Prices', 'sd-cost'), ('Questions', 'sd-faq')]), None),
        ('hardie', 'The board', sid_items, 'siding-record.html#wall'),
        ('texas', 'Built for Texas', items_section('sdt', 'Built for Texas sun, heat and hail', 'What Austin weather does to a wall, and what fiber cement does back.', texas, ['flip', 'steps', 'tabs', 'accordion', 'rail']), None),
        ('colour', 'Colour', colour_section('sdc', 'Colour'), 'siding-record.html#colour'),
        ('cost', 'Prices', cost_section('sdp', 'What siding and paint cost', ['Siding', 'Exterior painting']), 'siding-record.html#prices'),
        ('work', 'The work', work_section('sdw', 'Siding jobs, price on each', pairs_s), 'siding-record.html#pairs'),
        ('faq', 'Questions', faq_section('sdq', 'Siding questions, answered', fq('siding')), 'siding-record.html#questions'),
        ('reviews', 'Reviews', reviews_section('sdr', 'What homeowners say about the siding', 'siding'), 'siding-record.html#reviews'),
    ])

    # ---------------- WINDOWS & DOORS
    brands = [(b['name'], f"{b['n']} jobs", f"{b['blurb']} Lines: " + '; '.join(f'{l} ({m}, {c})' for l, m, c in b['lines']) + '. ' + ' '.join(f'{k}: {v}.' for k, v in b['spec'])) for b in BRANDS]
    frames = [('Vinyl', '214', 'Vinyl frames on 214 of the priced window jobs.'), ('Aluminum', '64', 'Aluminum on 64; NT Twinsulator is the only aluminum line the firm installs.'), ('Fibrex composite', '33', "Andersen 100 Series Fibrex composite on 33.")]
    steps = [('Free inspection', '', 'The windows and openings, looked at; brands, lines and colours talked through.'),
             ('Detailed proposal', '', 'Scope, materials and price, with options where there is a real choice. Free, no obligation.'),
             ('Measure and install', '', 'Each opening measured, windows built to order for those openings, then set, sealed and the old units hauled away.'),
             ('Final check', '', 'The finished work checked and the warranty details gone over for what went on your house.')]
    doors = [('Exterior doors', str(tr('Exterior doors')['doc']), f"{tr('Exterior doors')['doc']} exterior door jobs documented; brands: {tr('Exterior doors')['note']}."),
             ('With the windows', '18%', '18% of priced window jobs replaced doors too.'),
             ('Garage doors', str(tr('Garage doors')['doc']), f"{tr('Garage doors')['doc']} garage door jobs documented; brand: {tr('Garage doors')['note']}.")]
    out['windows'] = dict(title='Replacement windows and doors in Austin | Austin Pro', label='Windows &amp; doors', desc='Replacement windows and doors in Austin from NT Windows, Simonton, Andersen and Pella, priced from 376 priced window jobs.', sections=[
        ('intro', 'Overview', intro_section('wdi', 'Windows and doors, priced in public', f'{docs("Windows")} documented window jobs and {docs("Exterior doors")} door jobs around Austin, each with its real price. Four brands cover 361 of 376 priced window jobs.',
                                            [('388', 'documented window jobs'), (med(tr('Windows')), 'median window band'), ('4', 'window brands'), ('109', 'documented door jobs')],
                                            VS.pair_img(pairs_w[0], 'a'), [('Brands', 'wd-brands'), ('Frames', 'wd-frames'), ('Prices', 'wd-cost'), ('Questions', 'wd-faq')]), None),
        ('brands', 'Brands', items_section('wdb', 'Four window brands, by how often Austin chose them', 'Priced window jobs by brand, with the lines and what the maker says about them.', brands, ['bars', 'tabs', 'cards', 'pick', 'ledger']), 'windows-record.html#brands'),
        ('frames', 'Frames', items_section('wdf', 'Frames, then the glass', 'What the frames are made of on the priced window jobs.', frames, ['big', 'bars', 'flip', 'accordion', 'rail']), 'windows-record.html#frames'),
        ('process', 'How it goes', items_section('wdp', 'Built to order, then two days on site', 'Windows are made for your openings, so the order comes first. Most window-only jobs in the firm\'s files took two days on site.', steps, ['steps', 'rail', 'cards', 'tabs', 'accordion']), 'windows-record.html#process'),
        ('doors', 'Doors', items_section('wdd', 'Doors, front and garage', 'Exterior and garage doors, as the firm documents them.', doors, ['big', 'ledger', 'pick', 'flip', 'cards']), None),
        ('cost', 'Prices', cost_section('wdc', 'What windows and doors cost', ['Windows', 'Exterior doors', 'Garage doors']), 'windows-record.html#prices'),
        ('work', 'The work', work_section('wdw', 'Window jobs, price on each', pairs_w), 'windows-record.html#pairs'),
        ('faq', 'Questions', faq_section('wdq', 'Window questions, answered', fq('windows')), 'windows-record.html#questions'),
    ])

    # ---------------- ROOFING & GUTTERS
    roof = [('GAF Master Elite', 'under 2%', 'GAF says fewer than 2% of contractors nationwide hold it; GAF on 200 documented projects.'),
            ('Shingle roofs', str(tr('Shingle roofing')['doc']), '210 shingle roofs and 31 metal roofs documented.'),
            ('Shingle warranty', '5 years', '5-year labour warranty on laminate and designer shingles; GAF Golden Pledge available.'),
            ('Metal roofs', str(tr('Metal roofing')['doc']), f"Standing-seam metal from {tr('Metal roofing')['note']}. Metal: lifetime workmanship, manufacturer 30 to 50 years."),
            ('Gutters', str(tr('Gutters')['doc']), f"{tr('Gutters')['doc']} gutter jobs documented, {tr('Gutters')['n']} of them priced."),
            ('Storm damage', 'Free', 'Hail and wind damage, inspected and documented for your insurer; it starts with a free inspection.')]
    rph = [i for i, p in enumerate(H.PHOTOS) if 'Roofing' in p['trades'] or 'Gutters' in p['trades']]
    out['roofing'] = dict(title='Shingle and metal roofing and gutters in Austin | Austin Pro', label='Roofing &amp; gutters', desc='GAF Master Elite shingle roofing, standing-seam metal roofing, gutters and storm damage inspections in Austin.', sections=[
        ('intro', 'Overview', intro_section('rfi', 'Roofs and gutters, priced in public', f'{docs("Shingle roofing")} documented shingle roofs, {docs("Metal roofing")} metal roofs and {docs("Gutters")} gutter jobs around Austin, from a GAF Master Elite contractor.',
                                            [('210', 'documented shingle roofs'), ('31', 'documented metal roofs'), ('121', 'documented gutter jobs'), ('< 2%', 'of contractors are GAF Master Elite, GAF says')],
                                            VS.ph(15, 'Metal roofing at a home in Buttercup Creek, Cedar Park'), [('Roofs', 'rf-roof'), ('Prices', 'rf-cost'), ('Photos', 'rf-photos'), ('Reviews', 'rf-reviews')]), None),
        ('roof', 'Roofs', items_section('rfr', 'Shingle, metal, gutters, storms', 'What the firm installs over your head, as it documents it.', roof, ['cards', 'pick', 'ledger', 'accordion', 'flip']), None),
        ('cost', 'Prices', cost_section('rfc', 'What roofs and gutters cost', ['Shingle roofing', 'Metal roofing', 'Gutters']), None),
        ('photos', 'Photos', photos_section('rfp', 'Roofs on the record', rph), None),
        ('reviews', 'Reviews', reviews_section('rfv', 'What homeowners say about the roofs', 'roof'), None),
    ])

    # ---------------- PATIOS & DECKS
    oph = [i for i, p in enumerate(H.PHOTOS) if 'Patio' in p['trades']]
    outd = [('Patio covers', str(tr('Patio covers')['doc']), f"{tr('Patio covers')['doc']} patio cover jobs documented, {tr('Patio covers')['n']} of them priced; covers from {tr('Patio covers')['note']}."),
            ('Decking', str(tr('Decking')['n']), f"{tr('Decking')['n']} priced decking jobs; {tr('Decking')['note'].lower()}."),
            ('With other work', str(len([p for p in H.PHOTOS if 'Patio' in p['trades'] and '&' in p['trades']])), 'Of the photographed patio jobs on this page, the ones listed with another trade in the same job.')]
    out['outdoor'] = dict(title='Patio covers and decks in Austin | Austin Pro', label='Patios &amp; decks', desc='Renaissance Patio covers and composite and wood decks in Austin, priced from the firm\'s own jobs.', sections=[
        ('intro', 'Overview', intro_section('odi', 'Patio covers and decks, priced in public', f'{docs("Patio covers")} documented patio cover jobs and {tr("Decking")["n"]} priced decks around Austin, each with its real price.',
                                            [('34', 'documented patio cover jobs'), (med(tr('Patio covers')), 'median patio cover band'), ('5', 'priced decking jobs'), (med(tr('Decking')), 'median decking band')],
                                            VS.ph(18, 'Patio cover at a home in Tarrytown, Austin'), [('What goes up', 'od-what'), ('Prices', 'od-cost'), ('Photos', 'od-photos')]), None),
        ('what', 'What goes up', items_section('odw', 'Covers and decks', 'The two outdoor trades, as the firm documents them.', outd, ['big', 'cards', 'ledger', 'pick', 'rail']), None),
        ('cost', 'Prices', cost_section('odc', 'What covers and decks cost', ['Patio covers', 'Decking']), None),
        ('photos', 'Photos', photos_section('odp', 'Covers on the record', oph), None),
    ])

    # ---------------- OUR WORK
    out['projects'] = dict(title='Our work: 886 documented jobs | Austin Pro', label='Our work', desc='886 documented jobs around Austin: 312 on the map with photos + 574 more counted, and 177 before-and-after pairs.', sections=[
        ('intro', 'Overview', intro_section('pji', '886 jobs, documented and dated', '312 on the map with photos + 574 more counted. 177 of them have a before and an after, each with its real price.',
                                            [('886', 'documented jobs'), ('312', 'on the map with photos'), ('177', 'before-and-after pairs'), ('5,000+', 'Central Texas homes since 2009, by the firm\'s own count')],
                                            VS.pair_img(H.PAIRS6[0], 'a'), [('Pairs', 'pj-pairs'), ('Photos', 'pj-photos'), ('Where', 'pj-where')]), None),
        ('pairs', 'Pairs', work_section('pjw', 'Before, after, and the price', H.PAIRS6), 'projects-record.html#pairs'),
        ('photos', 'Photos', photos_section('pjp', 'Every photo is a finished job', list(range(len(H.PHOTOS)))), 'projects-record.html#gallery'),
        ('where', 'Where', [(n, h) for n, h in VS.near(H)], 'projects-record.html#map'),
    ])

    # ---------------- FINANCING & OFFERS
    offers = [('Holiday Savings', '10%', 'On contracts signed through November 30, 2026.'),
              ('Hometown Heroes', '5%', 'Veterans and military, teachers, seniors, first responders.'),
              ('Pay in full', '10%', 'Cash, check or ACH; not with financing.'),
              ("The firm's own example", '$22,500', '$30,000 with all three discounts.'),
              ('Send a neighbour', '$200', 'When a neighbour, friend or family member mentions your name before their first appointment, you get $200. There is no cap on how many.')]
    plans = [(lab, mo, f'{lab} for {mo}. {H.FINE}') for _a, _n, lab, mo in H.TERMS]
    fin_qa = [('Who provides the financing?', 'GreenSky, on approved credit; not everyone qualifies.'),
              ('What are the published plans?', '0% APR for 24 months, 4.99% APR for 60 months and 7.99% APR for 120 months.'),
              ("What is the firm's own worked example?", '$15,000 at 7.99% APR for 120 months is 120 payments of $181.91.'),
              ('Can discounts stack?', "Holiday Savings (on contracts signed through November 30, 2026), Hometown Heroes and pay in full: the firm's own example takes $30,000 with all three to $22,500. Pay in full is not available with financing."),
              ('What does a job cost?', 'Every trade has a published band from its priced jobs; the price for your house comes in writing after the free inspection.')]
    money = VS.money_v(H)
    out['financing'] = dict(title='Financing and offers | Austin Pro', label='Financing', desc='GreenSky financing on approved credit, the three published plans, and the firm\'s published discounts.', sections=[
        ('intro', 'Overview', intro_section('fni', 'Financing and offers, worked out', 'Three published plans through GreenSky, on approved credit, and three discounts that stack. Every figure here is the firm\'s own.',
                                            [('0%', 'APR for 24 months'), ('$181.91', 'a month: $15,000 at 7.99% for 120 months, the firm\'s example'), ('25%', 'all three discounts stacked'), ('$200', 'for every referral, no limit')],
                                            VS.ph(0, 'Siding and exterior painting at a home in Maple Run, Austin'), [('Plans', 'fn-plans'), ('Offers', 'fn-offers'), ('Questions', 'fn-faq')]), None),
        ('plans', 'Plans', [money[0], money[1], money[2]] + items_section('fnp', 'Three published plans', 'GreenSky plans, as the firm publishes them.', plans, ['big', 'cards']), 'plan-record.html#money'),
        ('offers', 'Offers', items_section('fno', 'Three discounts and a referral', 'The firm\'s published offers.', offers, ['ledger', 'flip', 'big', 'steps']) + [money[4]], 'plan-record.html#referral'),
        ('faq', 'Questions', faq_section('fnq', 'Financing, asked and answered', fin_qa), None),
    ])

    # ---------------- ABOUT
    steps = [('2009', '2009', 'Austin Pro Siding & Windows opens in Austin.'), ('2010', '2010', 'Sanders Roofing & Exteriors opens.'),
             ('2015-2018', '4 years', 'GuildQuality Guildmaster, Award for Service Excellence four years in a row.'),
             ('2018', '2018', 'The two firms merge: siding, windows and roofing under one roof.'), ('2025', '2025', "James Hardie President's Club, on top of Elite Preferred status."),
             ('2026', '886', '886 documented jobs (312 on the map with photos + 574 more counted), 4.9 on 474 Google reviews.')]
    creds = [(n, k, t) for _f, n, k, t in H.CRED_ROWS]
    crew = [(n, f'{c} of 30', f'Named in {c} of the 30 quoted reviews.') for n, c, _q, _w in __import__('parts').CREW]
    out['about'] = dict(title='About Austin Pro: since 2009 | Austin Pro', label='About', desc='Austin Pro Siding, Windows & Roofing: in business since 2009, merged 2018, 4.9 on 474 Google reviews.', sections=[
        ('intro', 'Overview', intro_section('abi', 'Austin Pro, since 2009', 'Austin Pro Siding &amp; Windows (2009) and Sanders Roofing &amp; Exteriors (2010) merged in 2018. Homeowners rate the work 4.9 on 474 Google reviews.',
                                            [('2009', 'in business since'), ('2018', 'the merger'), ('4.9', 'on 474 Google reviews'), ('5,000+', 'Central Texas homes, by the firm\'s own count')],
                                            VS.ph(28, 'Siding and exterior painting at a home in Block House Creek, Leander'), [('The story', 'ab-story'), ('Credentials', 'ab-creds'), ('Reviews', 'ab-reviews')]), None),
        ('story', 'The story', items_section('abs', 'Since 2009, year by year', 'The record, in order.', steps, ['rail', 'steps', 'big', 'ledger', 'tabs']), None),
        ('creds', 'Credentials', items_section('abc', 'What each credential takes', 'The badges, and what it takes to hold each one.', creds, ['flip', 'cards', 'accordion', 'ledger', 'pick']), None),
        ('crew', 'The crew', items_section('abw', 'The names homeowners write down', 'Counts are from the 30 review excerpts the firm publishes.', crew, ['bars', 'big', 'cards', 'ledger', 'rail']), None),
        ('reviews', 'Reviews', reviews_section('abr', 'What homeowners write', ''), None),
    ])

    # ---------------- CONTACT & BOOKING
    form = []
    for f in (H.book1, H.book2, H.book3):
        form.append((None, f()))
    bk = VS.book(H)
    form = [('Call', form[0][1]), ('Form', form[1][1]), ('One sentence', form[2][1]), ('Chat', bk[4][1]), ('Two doors', bk[3][1])]
    con_qa = [('How long is the inspection?', 'Free, 30 to 60 minutes, no obligation.'), ('What do I get?', 'The scope, materials and price, in writing.'),
              ('When is the office open?', H.HOURS), ('Where is the office?', H.ADDRESS), ('Can I finance it?', 'GreenSky, on approved credit; not everyone qualifies. Three published plans, from 0% APR for 24 months.')]
    out['contact'] = dict(title='Book a free inspection | Austin Pro', label='Contact &amp; booking', desc='Book a free 30 to 60 minute inspection with Austin Pro, call (512) 550-0000, or visit 7801 N Lamar Blvd, Suite C70.', sections=[
        ('intro', 'Overview', intro_section('cti', 'Book a free inspection', 'Free, 30 to 60 minutes, no obligation. You get the scope, materials and price in writing.',
                                            [('Free', 'inspection, no obligation'), ('30-60', 'minutes on site'), ('4.9', 'on 474 Google reviews'), ('2009', 'in business since')],
                                            VS.ph(41, 'Shingle roofing, siding, patio covers, windows and exterior painting at a home in Maple Run, Austin'), [('Book', 'book'), ('The office', 'ct-office'), ('Questions', 'ct-faq')]), None),
        ('book', 'Book', form, None),
        ('office', 'The office', [bk[0], bk[2], bk[1], cta_open(), cta_card()], None),
        ('faq', 'Questions', faq_section('ctq', 'Before you call', con_qa), None),
    ])
    return out


def cta_open():
    return ('Open now', f'''<div class="v pg-in nv-open" data-tone="ground"><div class="nv-op-l"><h2 class="h2x" data-split>Is the office open?</h2>
  <p class="nv-op-st" data-nv-open aria-live="polite">Office hours: {H.HOURS}</p><a class="nv-op-tel num" href="{H.TEL}">{H.PHONE}</a><p class="nv-op-h">{H.HOURS}<br>{H.ADDRESS}</p></div>
  <figure class="nv-op-ph">{VS.ph(37, 'Windows, siding, gutters and exterior painting at a home in East Oak Hill, Austin')}<figcaption>East Oak Hill, Austin, Sep 2026</figcaption></figure></div>''')


def cta_card():
    return ('Card', f'''<div class="v pg-card" data-tone="ground2"><div class="pg-bc">{H.brand("brand--card")}<dl><div><dt>Call</dt><dd><a href="{H.TEL}">{H.PHONE}</a></dd></div>
  <div><dt>Visit</dt><dd>{H.ADDRESS}</dd></div><div><dt>Hours</dt><dd>{H.HOURS}</dd></div><div><dt>Write</dt><dd><a href="mailto:{H.EMAIL}">{H.EMAIL}</a></dd></div></dl></div>
  <div>{head2('The whole office on one card', 'Everything you need to reach Austin Pro, in one place.')}</div></div>''')


# ================================================================ section + page assembly (mirrors home2.section)
MOTIF = {'intro': None, 'hardie': 'built', 'texas': 'built', 'colour': 'colour', 'cost': 'money', 'work': 'work', 'faq': 'book', 'reviews': 'reviews',
         'brands': 'services', 'frames': 'built', 'process': 'book', 'doors': 'services', 'roof': 'services', 'photos': 'work', 'what': 'services',
         'pairs': 'work', 'where': 'near', 'plans': 'money', 'offers': 'money', 'story': 'proof', 'creds': 'proof', 'crew': 'reviews', 'book': None, 'office': 'near'}


PREFIX = {'siding': 'sd', 'windows': 'wd', 'roofing': 'rf', 'outdoor': 'od', 'projects': 'pj', 'financing': 'fn', 'about': 'ab', 'contact': 'ct'}


def page_section(slug, num, key, label, versions, record):
    # the booking section keeps the key "book" so the homepage's form scripts (V.book1-3) drive it unchanged
    sid = 'book' if (slug, key) == ('contact', 'book') else f'{PREFIX[slug]}-{key}'
    names = [n for n, _h in versions]
    vs = []
    for n, (_nm, v) in enumerate(versions):
        if key != 'intro':
            eb = f'<p class="eyebrow" aria-hidden="true"><span>{num:02d}</span>{label}</p>'
            v = re.sub(r'(<h2\b)', eb + r'\1', v, count=1)
        if H.TEL not in v:
            v = v[:v.rfind('</div>')] + nextline() + '</div>'
        if MOTIF.get(key):
            v = v[:v.rfind('</div>')] + f'<div class="art-corner">{H.art.motif(MOTIF[key])}</div></div>'
        vs.append(v)
    tabs = ''.join(f'<button class="vsw-b" type="button" role="tab" id="{sid}-tab{n}" aria-selected="{"true" if n == 1 else "false"}" aria-controls="{sid}-stage" tabindex="{0 if n == 1 else -1}" data-v="{n}" aria-label="{label} version {n}: {e(nm)}">{n}</button>' for n, nm in enumerate(names, 1))
    tpl = ''.join(f'<template data-v="{n}">{v}</template>' for n, v in enumerate(vs, 1))
    return (f'<section class="sec sec-{key}" id="{sid}" data-sec="{sid}" data-code="{label[:1].upper()}" data-names="{e("|".join(names))}" data-bk-names="" aria-label="{label}">'
            f'<div class="vsw-rail"><div class="vsw" role="tablist" aria-label="{label} versions"><span class="vsw-l" aria-hidden="true"><b>{label}</b> <span>{e(names[0])}</span></span>{tabs}</div></div>'
            f'<div class="stage" id="{sid}-stage" role="tabpanel" aria-labelledby="{sid}-tab1">{vs[0]}</div>{tpl}</section>'), sid, names, record


def page_picks(rows):
    seg = ''.join(f'''<li><span>{lab}</span><div class="pk-seg" role="radiogroup" aria-label="{lab} version" data-for="{sid}">{''.join(f'<button type="button" role="radio" aria-checked="{"true" if n == 1 else "false"}" data-v="{n}" title="{e(nm)}">{n}</button>' for n, nm in enumerate(names, 1))}</div></li>''' for sid, lab, names, _r in rows)
    bk = ''.join(f'<li><span>{lab}</span><div class="pk-bk" data-for="{sid}">' + (f'<a class="pk-rec" href="{rec}">Backup 1: the earlier page</a>' if rec else '<span class="pk-none">No earlier version</span>') + '</div></li>' for sid, lab, _n, rec in rows)
    code0 = ' '.join(f'{lab[:1].upper()}1' for _s, lab, _n, _r in rows)
    return f'''<div class="picks">
  <button class="pk-btn" type="button" aria-expanded="false" aria-controls="pk-panel"><span>Versions</span><b class="num" data-pk-code>{code0}</b></button>
  <div class="pk-panel" id="pk-panel" role="dialog" aria-label="Versions" hidden>
    <p class="pk-h">Versions</p><p class="pk-code num" data-pk-code2>{code0}</p>
    <p class="pk-tip">Every section has five versions. Switch here or with each section's numbered buttons; keys 1 to 5 switch the section in view.</p>
    <ul class="pk-list">{seg}</ul>
    <details class="pk-more"><summary>Backups: the firm's earlier pages, kept as records</summary><ul class="pk-list">{bk}</ul></details>
    <label class="pk-motion"><input type="checkbox" data-motion checked><span>Motion</span></label>
    <div class="pk-act"><button class="btn btn-ink btn-sm" type="button" data-copy>Copy the version list</button><button class="tlink" type="button" data-reset>Reset</button></div>
    <p class="pk-msg" aria-live="polite"></p>
  </div>
</div>'''


def build_page(slug, P):
    secs, rows = [], []
    for num, (key, label, versions, rec) in enumerate(P['sections'], 1):
        assert len(versions) == 5, (slug, key, len(versions))
        html, sid, names, rec = page_section(slug, num, key, label, versions, rec)
        secs.append(html)
        rows.append((sid, label, names, rec))
    data = json.dumps(dict(map=H.MAPDATA, sw=H.SW, cp=H.COLORPLUS), ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    body = (H.head(P['title'], P['desc'], slug) + H.header(slug) + '<main id="main">\n' + ''.join(secs) + '</main>\n' + H.footer(slug) + page_picks(rows)
            + f'\n<script type="application/json" id="home-data">{data}</script>\n')
    js = ['gsap', 'ScrollTrigger', 'DrawSVGPlugin', 'MorphSVGPlugin', 'Draggable', 'InertiaPlugin', 'CustomEase']
    body += ''.join(f'<script src="assets/js/{n}.min.js" defer></script>\n' for n in js)
    body += '<script src="assets/js/lenis.min.js" defer></script>\n<script src="assets/js/fx.js" defer></script>\n<script src="assets/js/v4.js" defer></script>\n<script src="assets/js/home.js" defer></script>\n</body>\n</html>\n'
    out = clean(body)
    with open(os.path.join(SITE, f'{slug}.html'), 'w', encoding='utf-8') as f:
        f.write(out)
    print(f'{slug}.html', len(out) // 1024, 'KB;', len(secs), 'sections x 5 versions')


if __name__ == '__main__':
    only = sys.argv[1:]
    for slug, P in pages().items():
        if not only or slug in only:
            build_page(slug, P)

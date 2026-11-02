"""Windows & doors page: six sections, two versions each. Shared helpers for the credential close and the pair seams."""
from shell import IM, PAIRS, TEL, PHONE, CREDS, esc, icon, cline
from sec_home3 import _seam

ANDERSEN = CREDS[2]


def close(cred, n):
    v1 = (f'<div class="sc1 sec-pad"><div class="wrap sc-g"><div><p class="label">Credential</p><p class="sc-c">{esc(cred)}</p></div>'
          f'<div>{cline()}<h2 class="h2">Book the estimate.</h2><div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a>'
          f'<a class="btn btn-secondary" href="{TEL}">{icon("communication-phone", 20)} {PHONE}</a></div></div></div></div>')
    return 'Credential and close', v1, steel_close(cred), '', ''


def steel_close(cred):
    """the page's one steel field (B2): ordered dither drawn only between steel-9 and steel-12, so white text is >= 5.96:1"""
    return (f'<div class="sc2 scf sec-pad"><canvas class="dither" aria-hidden="true"></canvas><div class="wrap scf-c"><p class="label scf-l">{esc(cred)}</p>'
            f'<h2 class="h1 scf-h">Book the estimate.</h2><div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a>'
            f'<a class="sc2-p" href="{TEL}">{PHONE}</a></div></div></div>')


def pairs_section(ids, name, label, h2b):
    idx = [i for i, p in enumerate(PAIRS) if p['id'] in ids]
    chips = ''.join(f'<label class="chip-in"><input type="radio" name="{name}" value="{i}" {"checked" if i == idx[0] else ""}> {esc(PAIRS[i]["place"])}</label>' for i in idx)
    v1 = (f'<div class="pp1 sec-pad" data-pp="{name}"><div class="wrap sm-g">{_seam("", idx[0])}<div><p class="label">{esc(label)}</p><h2 class="h2 pp-h" aria-live="polite">{esc(PAIRS[idx[0]]["place"])}</h2>'
          f'<p class="lead">Drag the seam, or focus it and use the arrow keys.</p><fieldset class="chips"><legend class="label">Pick a job</legend>{chips}</fieldset></div></div></div>')
    trio = ''.join(f'<figure class="ss2-f">{_seam("", i)}<figcaption>{esc(PAIRS[i]["place"])}</figcaption></figure>' for i in idx)
    v2 = f'<div class="ss2 sec-pad"><div class="wrap"><p class="label">{esc(label)}</p><h2 class="h2">{esc(h2b)}</h2>{cline()}<div class="ss2-g">{trio}</div></div></div>'
    js = """
(function(){const PL=%s;document.querySelectorAll('input[name=%s]').forEach(r=>r.addEventListener('change',()=>{const s=r.closest('[data-pp]');s.querySelector('[data-seam]')._show(+r.value);s.querySelector('.pp-h').textContent=PL[+r.value];}));})();
""" % ('[' + ','.join(f'"{esc(p["place"])}"' for p in PAIRS) + ']', name)
    return v1, v2, js


def _window_section(cls):
    """a window drawn in section: frame, sash, two panes of glass with a spacer, sill. data-k orders the build"""
    parts = [('frame', '<path class="wn-p" data-k="0" d="M120 60H480V600H120Z" fill="none" stroke="var(--steel-8)" stroke-width="10"/>', 'FRAME', 90),
             ('sash', '<path class="wn-p" data-k="1" d="M160 100H440V560H160Z" fill="none" stroke="var(--steel-6)" stroke-width="8"/>', 'SASH', 160),
             ('glass', '<path class="wn-p" data-k="2" d="M196 136H404V524H196Z" fill="var(--steel-10)" fill-opacity=".35" stroke="var(--steel-5)" stroke-width="3"/>'
                       '<path class="wn-p" data-k="2" d="M210 150H390V510H210Z" fill="none" stroke="var(--steel-5)" stroke-width="2"/>', 'GLASS, TWO PANES SHOWN', 240),
             ('spacer', '<path class="wn-p" data-k="3" d="M196 136L210 150M404 136L390 150M196 524L210 510M404 524L390 510" stroke="var(--steel-4)" stroke-width="3"/>', 'SPACER', 320),
             ('sill', '<path class="wn-p" data-k="4" d="M90 600H510L530 630H70Z" fill="var(--steel-12)" stroke="var(--steel-6)" stroke-width="4"/>', 'SILL', 610)]
    art = ''.join(a for _, a, _, _ in parts)
    lab = ''.join(f'<g class="wn-p" data-k="{k}"><path d="M480 {y}H560" stroke="var(--steel-7)" stroke-width="1.5"/><text x="570" y="{y + 6}" class="wn-t">{t}</text></g>'
                  for k, (_, _, t, y) in enumerate(parts))
    return f'<svg class="wn {cls}" viewBox="40 30 800 640" role="img" aria-label="A window drawn in elevation: frame, sash, two panes of glass with a spacer, and the sill">{art}{lab}</svg>'


def w1():
    v1 = (f'<div class="wh1"><div class="wh1-view">{IM.img("windows1-a", "Ridgewood, Cedar Park: new windows after the work", eager=True)}<span class="wh1-sash" aria-hidden="true"></span>'
          f'<span class="cap">Ridgewood, Cedar Park</span></div><div class="wh1-c"><p class="label">Windows &amp; doors</p><h1 class="h1">Openings, fitted square.</h1>{cline()}'
          f'<p class="lead">Window, exterior-door and garage-door replacement. {esc(ANDERSEN)}.</p>'
          f'<div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a><a class="btn btn-secondary" href="{TEL}">{icon("communication-phone", 20)} {PHONE}</a></div></div></div>')
    v2 = (f'<div class="wn2h on-dark sec-pad"><div class="wrap sp2-g"><div><p class="label on-dark-l">Windows &amp; doors</p><h1 class="h1 on-dark-h">Openings, fitted square.</h1>'
          f'<p class="lead on-dark-p">Window, exterior-door and garage-door replacement. {esc(ANDERSEN)}.</p>'
          f'<div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a></div></div>{_window_section("wn-static")}</div></div>')
    css = '''.wn{width:100%;height:auto} .wn-t{font:600 16px var(--font-text);letter-spacing:.08em;fill:var(--steel-5)} .wn2h .btn-primary{background:#fff;color:var(--color-text-primary)}
.wh1{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);min-height:calc(100vh - 72px)} .wh1-view{position:relative;overflow:hidden;background:var(--color-bg-sunken)}
.wh1-view img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.wh1-sash{position:absolute;inset:0;border:clamp(18px,2.4vw,34px) solid var(--color-bg-page);box-shadow:inset 0 0 0 3px var(--color-accent-solid);
 background:linear-gradient(var(--color-bg-page),var(--color-bg-page)) 50% 0/clamp(12px,1.6vw,22px) 100% no-repeat,linear-gradient(var(--color-bg-page),var(--color-bg-page)) 0 52%/100% clamp(14px,1.8vw,26px) no-repeat}
.wh1-view .cap{left:auto;right:clamp(24px,3vw,42px);bottom:clamp(24px,3vw,42px)} .wh1-c{align-self:center;padding:var(--space-09) var(--layout-gutter) var(--space-09) var(--space-09)}
@media (max-width:900px){.wh1{grid-template-columns:minmax(0,1fr)} .wh1-view{min-height:56vh} .wh1-c{padding:var(--space-07) var(--layout-gutter)}}'''
    return 'Windows hero', v1, v2, css, ''


def w2():
    v1 = (f'<div class="wnp" data-wnp><div class="wa-stick"><div class="wrap wa-g"><div><p class="label">A window, piece by piece</p><h2 class="h2">What you are buying.</h2>'
          f'<p class="lead">Scroll, and the window assembles: frame, sash, glass, spacer, sill.</p></div>{_window_section("wn-pin")}</div></div></div>')
    items = [('Frame', 'The fixed outer box set into the wall opening.'), ('Sash', 'The part that holds the glass and, on opening windows, moves.'),
             ('Glass', 'Two panes are shown here; the build of the glass is chosen per window.'), ('Spacer', 'Holds the panes apart at the edge.'), ('Sill', 'Sheds water away from the wall below.')]
    dl = ''.join(f'<div><dt><span>{i + 1}</span>{esc(t)}</dt><dd>{esc(d)}</dd></div>' for i, (t, d) in enumerate(items))
    v2 = f'<div class="wnx sec-pad"><div class="wrap wa-g">{_window_section("wn-static")}<div><p class="label">A window, piece by piece</p><h2 class="h2">What you are buying.</h2><dl class="wnx-l">{dl}</dl></div></div></div>'
    css = """
.wnp{height:260vh;position:relative} .js [data-wnp] .wn-p{opacity:0;transition:opacity var(--duration-moderate) var(--ease-standard)} .js [data-wnp] .wn-p.on{opacity:1}
.wn-pin .wn-t,.wn-static .wn-t{fill:var(--color-text-secondary)} .wnp .wn-pin .wn-t{fill:var(--color-text-secondary)} .wn2h .wn-t{fill:var(--steel-5)}
.wnx-l{display:grid;gap:var(--space-04);margin:0} .wnx-l dt{font:700 20px var(--font-display);display:flex;gap:12px;align-items:center} .wnx-l dt span{display:inline-grid;place-items:center;width:30px;height:30px;background:var(--color-accent-solid);color:#fff;font:700 14px var(--font-text);border-radius:var(--radius-sm)}
.wnx-l dd{margin:4px 0 0 42px;color:var(--color-text-secondary)}
"""
    js = """
(function(){const w=document.querySelector('[data-wnp]');if(!w)return;const P=[...w.querySelectorAll('.wn-p')];const set=p=>P.forEach(e=>e.classList.toggle('on',p*5.4+1>(+e.dataset.k)));
if(window.APS.reduce)set(1);else{set(0);window.APS.pin(w,set);}})();
"""
    return 'Window in section', v1, v2, css, js


def _elev(kind):
    s = 'stroke="var(--steel-9)" stroke-width="6" fill="none"'
    g = 'fill="var(--steel-2)"'
    body = {'Double-hung': f'<rect x="20" y="20" width="160" height="220" {g}/><path d="M20 130H180" {s}/><path d="M90 76L100 70L110 76M90 184L100 190L110 184" stroke="var(--steel-9)" stroke-width="3" fill="none"/>',
            'Casement': f'<rect x="20" y="20" width="160" height="220" {g}/><path d="M180 20L20 130L180 240" stroke="var(--steel-7)" stroke-width="2" stroke-dasharray="6 5" fill="none"/>',
            'Slider': f'<rect x="20" y="20" width="160" height="220" {g}/><path d="M100 20V240" {s}/><path d="M60 130H140M128 120L140 130L128 140" stroke="var(--steel-9)" stroke-width="3" fill="none"/>',
            'Picture': f'<rect x="20" y="20" width="160" height="220" {g}/>',
            'Entry door': f'<rect x="30" y="20" width="140" height="220" {g}/><circle cx="148" cy="134" r="6" fill="var(--steel-9)"/><rect x="60" y="50" width="80" height="60" fill="none" stroke="var(--steel-7)" stroke-width="3"/>',
            'Garage door': f'<rect x="10" y="60" width="180" height="180" {g}/>' + ''.join(f'<path d="M10 {60 + i * 36}H190" stroke="var(--steel-7)" stroke-width="3"/>' for i in range(1, 5))}[kind]
    return f'<svg class="el" viewBox="0 0 200 260" aria-hidden="true">{body}<rect x="20" y="20" width="160" height="220" {s} opacity="{0 if kind in ("Entry door", "Garage door") else 1}"/></svg>'


def w3():
    kinds = [('Double-hung', 'Two sashes that slide up and down.'), ('Casement', 'Hinged at the side; opens outward with a crank.'), ('Slider', 'One sash slides sideways past the other.'),
             ('Picture', 'Fixed glass, for the view.'), ('Entry door', 'The front door, with its frame and threshold.'), ('Garage door', 'Sectional panels on a track.')]
    cards = ''.join(f'<figure class="el-c">{_elev(k)}<figcaption><b>{esc(k)}</b><span>{esc(d)}</span></figcaption></figure>' for k, d in kinds)
    v1 = f'<div class="wt1 sec-pad"><div class="wrap"><p class="label">Types</p><h2 class="h2">Six kinds of opening.</h2>{cline()}<div class="els">{cards}</div></div></div>'
    tabs = ''.join(f'<button type="button" role="tab" aria-selected="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" data-i="{i}" data-d="{esc(d)}">{esc(k)}</button>' for i, (k, d) in enumerate(kinds))
    big = ''.join(f'<div class="el-big" data-i="{i}" {"" if i == 0 else "hidden"}>{_elev(k)}</div>' for i, (k, _) in enumerate(kinds))
    v2 = (f'<div class="wt2 sec-pad"><div class="wrap spp2-g"><div class="el-bw">{big}</div><div><p class="label">Types</p><h2 class="h2">Six kinds of opening.</h2>'
          f'<div class="spp2-t" role="tablist" aria-label="Opening types">{tabs}</div><p class="lead wt2-d" role="tabpanel">{esc(kinds[0][1])}</p></div></div></div>')
    css = """
.els{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--space-05)} .el-c{margin:0} .el{width:100%;height:auto;display:block;background:var(--color-bg-subtle);padding:var(--space-04)}
.el-c figcaption{display:grid;gap:4px;margin-top:var(--space-03)} .el-c b{font:700 17px var(--font-display)} .el-c span{color:var(--color-text-secondary);font-size:15px}
.el-bw{max-width:420px} @media (max-width:1000px){.els{grid-template-columns:repeat(3,minmax(0,1fr))}} @media (max-width:600px){.els{grid-template-columns:repeat(2,minmax(0,1fr))}}
"""
    js = """
(function(){const r=document.querySelector('.wt2');if(!r)return;const tabs=[...r.querySelectorAll('[role=tab]')],d=r.querySelector('.wt2-d');
const pick=b=>{tabs.forEach(x=>{const on=x===b;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;});d.textContent=b.dataset.d;r.querySelectorAll('.el-big').forEach(s=>s.hidden=s.dataset.i!==b.dataset.i);};
tabs.forEach((b,i)=>{b.addEventListener('click',()=>pick(b));b.addEventListener('keydown',e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(k){const n=tabs[(i+k+tabs.length)%tabs.length];n.focus();pick(n);e.preventDefault();}});});})();
"""
    return 'Types', v1, v2, css, js


def w4():
    v1 = (f'<div class="pb1"><div class="wrap pb1-in"><p class="pb1-r">{icon("status-credential", 22)}<b>{esc(ANDERSEN)}</b></p>'
          f'<p class="pb1-c"><span>{esc(CREDS[3])}</span></p><a class="pb1-a" href="#/about/booking">Book an estimate {icon("action-arrow-right", 18)}</a></div></div>')
    v2 = f'<div class="cr2 sec-pad"><div class="wrap"><p class="label">Credential</p><p class="cr2-t">{esc(ANDERSEN)}.</p>{cline()}</div></div>'
    return 'Credential band', v1, v2, '.cr2-t{font:800 var(--type-h1-size)/1.05 var(--font-display);margin:0 0 var(--space-05);max-width:18ch}', ''


def w5():
    v1, v2, js = pairs_section(('windows1', 'windows3', 'home2'), 'wp1', 'Windows, before and after', 'Three houses, three seams.')
    return 'Window pairs', v1, v2, '', js


def w6():
    return close(ANDERSEN, 'windows')


WINDOWS = [w1, w2, w3, w4, w5, w6]

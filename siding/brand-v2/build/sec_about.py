"""About & booking page: six sections, two versions each. The form validates and never claims anything was sent or saved.
The FAQ answers only from the facts lock (question-first grammar: the Erie Home note, used for wording only)."""
from shell import IM, TEL, PHONE, EMAIL, ADDRESS, HOURS, REVIEWS, RECORD, CREDS, esc, icon, cline, home2
from sec_home import _dots

TRADES = ['Siding', 'Painting', 'Windows', 'Doors', 'Roofing', 'Gutters', 'Patio cover']


def a1():
    v1 = (f'<div class="ah1"><div class="ah1-p">{IM.img("home2-a", "Anderson Mill, Austin: the house after the work", eager=True)}<span class="cap">Anderson Mill, Austin</span></div>'
          f'<div class="wrap ah1-g"><div><p class="label">About &amp; booking</p><h1 class="h1">Austin homes, since 2009.</h1></div>'
          f'<div>{cline()}<p class="lead">Siding, windows, roofing and painting, from one office on North Lamar.</p>'
          f'<div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a><a class="btn btn-secondary" href="{TEL}">{icon("communication-phone", 20)} {PHONE}</a></div></div></div></div>')
    v2 = (f'<div class="ab2"><div class="wrap ab2-c"><p class="label">About &amp; booking</p><h1 class="h1">Austin homes, since 2009.</h1>{cline()}'
          f'<p class="lead">Siding, windows, roofing and painting, from one office on North Lamar.</p><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a></div></div>')
    css = """
.ab2{position:relative;padding:var(--layout-section-pad) 0;background:repeating-linear-gradient(180deg,var(--color-pattern-ground) 0 31px,var(--color-pattern-course) 31px 34px,var(--color-bg-page) 34px 65px,var(--color-pattern-course) 65px 68px)}
.ab2::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--color-bg-page) 0 50%,transparent 80%)} .ab2-c{position:relative}
.ah1-p{position:relative;height:min(64vh,640px)} .ah1-p img{width:100%;height:100%;object-fit:cover;object-position:50% 40%;display:block} .ah1-p .cap{left:auto;right:var(--layout-gutter)}
.ah1-g{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:var(--space-08);align-items:end;padding-top:var(--space-08);padding-bottom:var(--space-09)}
@media (max-width:900px){.ah1-g{grid-template-columns:minmax(0,1fr)}}
"""
    return 'About hero', v1, v2, css, ''


def a2():
    items = [('2009', 'Since 2009', 'The firm starts work on Austin homes.'), ('2018', 'Merged 2018', 'Two firms become one.'), ('Today', REVIEWS, RECORD)]
    tl = ''.join(f'<li><span class="tl-y">{esc(y)}</span><div><b>{esc(t)}</b><p>{esc(d)}</p></div></li>' for y, t, d in items)
    v1 = f'<div class="fr2 sec-pad"><div class="wrap fr2-g"><div><p class="label">The story</p><h2 class="h2">Short, and on the record.</h2></div><ol class="tl">{tl}</ol></div></div>'
    plates = ''.join(f'<div class="yp"><span class="yp-y">{esc(y)}</span><b>{esc(t)}</b><span>{esc(d)}</span></div>' for y, t, d in items[:2])
    v2 = f'<div class="yp2 sec-pad"><div class="wrap"><p class="label">The story</p><h2 class="h2">Two dates.</h2>{cline()}<div class="yps">{plates}</div></div></div>'
    css = """
.yps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-05)} .yp{display:grid;gap:var(--space-03);background:var(--color-bg-deep);color:var(--color-text-inverse);padding:var(--space-07)}
.yp-y{font:800 var(--type-numeral-l)/.9 var(--font-display);color:var(--color-numeral-on-dark)} .yp b{font:700 var(--type-h3-size) var(--font-text)} .yp span:last-child{color:var(--color-text-inverse-muted)}
@media (max-width:700px){.yps{grid-template-columns:minmax(0,1fr)}}
"""
    return 'Since 2009', v1, v2, css, ''


def a3():
    what = ['Roofing', 'Siding', 'Windows', 'Business']
    rows = ''.join(f'<li>{icon("status-credential", 24)}<span class="cr-k">{k}</span><b>{esc(c)}</b></li>' for k, c in zip(what, CREDS))
    v1 = f'<div class="cr1 sec-pad"><div class="wrap"><p class="label">Credentials</p><h2 class="h2">Held by the firm.</h2><ul class="crl">{rows}</ul></div></div>'
    v2 = f'<div class="cr3 on-dark sec-pad"><div class="wrap"><p class="label on-dark-l">Credentials</p><ul class="crb">{"".join(f"<li>{esc(c)}</li>" for c in CREDS)}</ul></div></div>'
    css = """
.crl{list-style:none;padding:0;margin:0;border-top:1px solid var(--color-border-default)} .crl li{display:grid;grid-template-columns:32px 120px minmax(0,1fr);gap:var(--space-04);align-items:center;padding:var(--space-05) 0;border-bottom:1px solid var(--color-border-subtle)}
.crl svg{color:var(--color-accent-solid)} .cr-k{font:600 var(--type-label-size) var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-secondary)} .crl b{font:700 var(--type-lead-size) var(--font-text)}
.crb{list-style:none;padding:0;margin:0;display:grid;gap:var(--space-04)} .crb li{font:800 var(--type-h2-size)/1.15 var(--font-display);color:var(--color-text-inverse)}
@media (max-width:700px){.crl li{grid-template-columns:32px minmax(0,1fr)} .crl b{grid-column:2}}
"""
    return 'Credentials', v1, v2, css, ''


def a4():
    v1 = (f'<div class="of1 sec-pad"><div class="wrap of-g"><div><p class="label">Office</p><h2 class="h2">Come by, or call.</h2><dl class="ofl">'
          f'<div><dt>Address</dt><dd>{esc(ADDRESS)}</dd></div><div><dt>Hours</dt><dd>{esc(HOURS)}</dd></div>'
          f'<div><dt>Phone</dt><dd><a href="{TEL}">{PHONE}</a></dd></div><div><dt>Email</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div></dl></div>'
          f'<div class="of-m">{_dots("nd-d on")}<p class="small">The ring is the office; the dots are the {esc(RECORD.split(" + ")[0])}.</p></div></div></div>')
    v2 = (f'<div class="of2 sec-pad"><div class="wrap"><div class="of2-c on-dark"><p class="label on-dark-l">Office</p><p class="of2-a">{esc(ADDRESS)}</p><p class="on-dark-p">{esc(HOURS)}</p>'
          f'<p><a class="of2-p" href="{TEL}">{PHONE}</a></p><p><a class="of2-e" href="mailto:{EMAIL}">{EMAIL}</a></p></div></div></div>')
    css = """
.of-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--space-09);align-items:center} .ofl{display:grid;gap:var(--space-04);margin:0}
.ofl dt{font:600 var(--type-label-size) var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-secondary)} .ofl dd{margin:4px 0 0;font:600 var(--type-lead-size) var(--font-text)} .ofl dd a{display:inline-flex;align-items:center;min-height:44px}
.of-m{background:var(--color-bg-subtle);padding:var(--space-05)} .of-m .nd{max-height:420px}
.of2-c{padding:var(--space-09) var(--space-08);max-width:760px} .of2-a{font:800 var(--type-h2-size)/1.15 var(--font-display);color:var(--color-text-inverse);margin:0 0 var(--space-04)}
.of2-p{font:800 var(--type-h3-size) var(--font-display);color:var(--color-text-inverse)} .of2-e{color:var(--color-text-inverse);font-weight:600} .of2 :focus-visible{outline-color:var(--color-focus-ring-on-dark)}
@media (max-width:900px){.of-g{grid-template-columns:minmax(0,1fr)}}
"""
    return 'Office and hours', v1, v2, css, ''


def _field(fid, label, kind='text', ac='', req=True, hint=''):
    h = f'<p class="hint" id="{fid}-h">{esc(hint)}</p>' if hint else ''
    d = f' aria-describedby="{fid}-h {fid}-e"' if hint else f' aria-describedby="{fid}-e"'
    return (f'<div class="fld"><label for="{fid}">{esc(label)}{"" if req else " <span>(optional)</span>"}</label>{h}'
            f'<input id="{fid}" name="{fid}" type="{kind}" autocomplete="{ac}"{" required" if req else ""}{d}><p class="err" id="{fid}-e" hidden></p></div>')


def a5():
    chips = lambda n: ''.join(f'<label class="chip-in"><input type="checkbox" name="{n}" value="{t}"> {t}</label>' for t in TRADES)
    v1 = (f'<div class="bk1 sec-pad" id="about-booking"><div class="wrap bk-g"><div><p class="label">Book an estimate</p><h2 class="h2">Tell the firm about the job.</h2>'
          f'<p class="lead">Prefer to talk now? Call <a href="{TEL}">{PHONE}</a>, {esc(HOURS)}.</p></div>'
          f'<form class="frm" data-form novalidate>{_field("b1-name", "Your name", ac="name")}{_field("b1-phone", "Phone", "tel", "tel", hint="10 digits, like 512 550 0000")}'
          f'{_field("b1-email", "Email", "email", "email", req=False)}{_field("b1-where", "Street or neighbourhood", ac="street-address", hint="So the estimate visit can be planned")}'
          f'<fieldset class="fld" aria-describedby="b1-what-e"><legend>What needs doing</legend><div class="chips">{chips("b1-what")}</div><p class="err" id="b1-what-e" hidden></p></fieldset>'
          f'<div class="fld"><label for="b1-msg">Anything else <span>(optional)</span></label><textarea id="b1-msg" name="b1-msg" rows="4"></textarea></div>'
          f'<label class="chk"><input type="checkbox" name="b1-vis" checked> Include my visualiser choices, if I made any</label>'
          f'<button type="submit" class="btn btn-primary">Send the request {icon("action-arrow-right", 20)}</button><div class="frm-out" role="status" aria-live="polite"></div></form></div></div>')
    v2 = (f'<div class="bk2 on-dark sec-pad"><div class="wrap bk-g"><div><p class="label on-dark-l">Book an estimate</p><h2 class="h2 on-dark-h">Three things, and you’re done.</h2>'
          f'<p class="lead on-dark-p">Or call now: <a class="bk2-p" href="{TEL}">{PHONE}</a></p></div>'
          f'<form class="frm frm-d" data-form novalidate>{_field("b2-name", "Your name", ac="name")}{_field("b2-phone", "Phone", "tel", "tel", hint="10 digits, like 512 550 0000")}'
          f'<fieldset class="fld" aria-describedby="b2-what-e"><legend>What needs doing</legend><div class="chips">{chips("b2-what")}</div><p class="err" id="b2-what-e" hidden></p></fieldset>'
          f'<button type="submit" class="btn btn-primary">Send the request {icon("action-arrow-right", 20)}</button><div class="frm-out" role="status" aria-live="polite"></div></form></div></div>')
    css = """
.bk-g{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:var(--space-09);align-items:start}
.frm{display:grid;gap:var(--space-05)} .frm>.btn{justify-self:start} .fld{display:grid;gap:var(--space-03);border:0;padding:0;margin:0} .fld label:not(.chip-in),.fld legend{font:600 var(--type-body-size) var(--font-text);padding:0} .fld label span{font-weight:400;color:var(--color-text-secondary)}
.fld input,.fld textarea{min-height:var(--input-height);border:1px solid var(--color-border-control);border-radius:var(--radius-sm);padding:var(--space-04) var(--space-04);font:inherit;background:var(--color-bg-page);color:var(--color-text-primary)}
.fld [aria-invalid=true]{border:2px solid var(--color-error-ink)} .hint{margin:0;font-size:var(--type-small-size);color:var(--color-text-secondary)}
.err{display:flex;gap:var(--space-03);align-items:flex-start;margin:0;font-size:var(--type-body-size);color:var(--color-error-ink)} .err::before{content:"✕";font-weight:700}
.chk{display:flex;gap:var(--space-04);align-items:center;min-height:44px} .chk input{width:20px;height:20px;accent-color:var(--color-accent-solid)}
.frm-out:empty{display:none} .frm-out{border-left:4px solid var(--color-accent-solid);background:var(--color-bg-accent-subtle);padding:var(--space-05);color:var(--color-text-primary)}
.frm-d .fld label,.frm-d .fld legend{color:var(--color-text-inverse)} .frm-d .hint{color:var(--color-text-inverse-muted)} .frm-d .err{color:var(--color-error-ink-on-dark)} .frm-d .fld [aria-invalid=true]{border-color:var(--color-error-ink-on-dark)}
.frm-d .chip-in{border-color:var(--color-border-on-dark);color:var(--color-text-inverse)} .frm-d .chip-in:has(input:checked){background:var(--color-selected-on-dark);box-shadow:inset 0 0 0 2px var(--color-surface-on-dark)} .bk2 .btn-primary{background:var(--color-surface-on-dark);color:var(--color-text-primary)}
.bk2-p{color:var(--color-text-inverse);font-weight:700} .bk2 :focus-visible{outline-color:var(--color-focus-ring-on-dark)}
@media (max-width:900px){.bk-g{grid-template-columns:minmax(0,1fr)}}
"""
    js = """
(function(){document.querySelectorAll('[data-form]').forEach(f=>{const out=f.querySelector('.frm-out');
const err=(el,box,msg)=>{box.hidden=!msg;box.textContent=msg?'Check: '+msg:'';if(el)el.setAttribute('aria-invalid',msg?'true':'false');return !msg;};
f.addEventListener('submit',e=>{e.preventDefault();out.textContent='';const q=n=>f.querySelector(`[name$="-${n}"]`);let first=null,ok=true;
  const chk=(n,test,msg)=>{const el=q(n);if(!el)return;const box=f.querySelector(`#${el.id}-e`);const good=err(el,box,test(el.value.trim())?'':msg);if(!good){ok=false;first=first||el;}};
  chk('name',v=>v.length>1,'add your name.');chk('phone',v=>v.replace(/\\D/g,'').length===10,'the number needs 10 digits, like 512 550 0000.');
  const em=q('email');if(em&&em.value.trim())chk('email',v=>/^\\S+@\\S+\\.\\S+$/.test(v),'the email address looks incomplete.');
  const wh=q('where');if(wh)chk('where',v=>v.length>2,'add a street or neighbourhood.');
  const boxes=[...f.querySelectorAll('input[name$="-what"]')],wb=f.querySelector('[id$="-what-e"]');if(!err(null,wb,boxes.some(b=>b.checked)?'':'pick at least one.')){ok=false;first=first||boxes[0];}
  if(!ok){first.focus();return;}
  // honest: this page is a preview with no server behind it, so nothing is sent and nothing is saved
  out.textContent='Nothing has been sent: this page is a preview without a connection to the office. To book now, call %s (%s).';out.setAttribute('tabindex','-1');out.focus();});});})();
"""
    js = js.replace("%s (%s)", f"{PHONE} ({HOURS})")
    return 'Booking form', v1, v2, css, js


def a6():
    qa = [('When is the office open?', HOURS + '.'), ('Where is the office?', ADDRESS + '.'), ('How do I book an estimate?', f'Use the form on this page, or call {PHONE}.'),
          ('How long has the firm been working?', 'Since 2009; merged 2018.'), ('What do reviewers say, in number?', REVIEWS + '.'),
          ('Which credentials does the firm hold?', ' · '.join(CREDS) + '.'), ('How much work is on the map?', RECORD + '.')]
    acc = ''.join(f'<details {"open" if i == 0 else ""}><summary>{esc(q)} {icon("action-plus", 20)}</summary><p>{esc(a)}</p></details>' for i, (q, a) in enumerate(qa))
    v1 = f'<div class="fq1 sec-pad"><div class="wrap fq-g"><div><p class="label">Questions</p><h2 class="h2">Asked, answered.</h2></div><div class="acc">{acc}</div></div></div>'
    dl = ''.join(f'<div><dt>{esc(q)}</dt><dd>{esc(a)}</dd></div>' for q, a in qa)
    v2 = f'<div class="fq2 sec-pad"><div class="wrap"><p class="label">Questions</p><h2 class="h2">Asked, answered.</h2>{cline()}<dl class="fqd">{dl}</dl></div></div>'
    css = """
.fq-g{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:var(--space-09)}
.acc details{border-top:1px solid var(--color-border-default)} .acc details:last-child{border-bottom:1px solid var(--color-border-default)}
.acc summary{display:flex;justify-content:space-between;align-items:center;gap:var(--space-04);min-height:60px;font:600 var(--type-body-size) var(--font-text);cursor:pointer;list-style:none} .acc summary::-webkit-details-marker{display:none}
.acc summary svg{flex:none;transition:transform var(--duration-normal) var(--ease-standard)} .acc details[open] summary svg{transform:rotate(45deg)} .acc details p{margin:0 0 var(--space-05);color:var(--color-text-secondary)}
.fqd{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-06) var(--space-08);margin:0} .fqd dt{font:700 var(--type-body-size) var(--font-text)} .fqd dd{margin:var(--space-02) 0 0;color:var(--color-text-secondary)}
@media (max-width:900px){.fq-g,.fqd{grid-template-columns:minmax(0,1fr)}}
"""
    return 'FAQ', v1, v2, css, ''


ABOUT = [a1, a2, a3, a4, a5, a6]

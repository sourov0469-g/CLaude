"""SECTION 10 — Booking, Version C ("The record, then the call") then Version J ("The receipt") at the end. NO form and NO button that leaves the site on the homepage:
the phone number and the email address are shown right in the section (with copy buttons and a live open/closed line). After the proof, the receipt prints out and
carries ONE button, to this site's own Contact Us page (contact.html, built later, where the form lives)."""
import html, os, re
e = html.escape
HERE = os.path.dirname(os.path.abspath(__file__)); PRE = os.path.join(HERE, '..', 'prep', 'backgrounds')
REPLACES = ['cta2', 'cta5']   # cta (base: status + footer) stays until the footer is rebuilt
CSS = 'book.css'; JS = 'book.js'; GLOBAL = 'FBook'
PHONE = '(512) 550-0000'; MAIL = 'info@austinprosiding.com'; ADDR = '7801 N Lamar Blvd Suite C70, Austin TX 78752'
CONTACT_PAGE = 'contact.html'   # this site's own Contact Us page (an inner page, built after the homepage is approved)
STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>'
PH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>'
ML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
AR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
CHIPS = ['GAF Master Elite', 'James Hardie Elite Preferred + President’s Club 2025', 'Andersen Certified Premier', 'BBB A+']
RECEIPT = [('Free inspection', '$0'), ('One visit, every trade', 'included'), ('Detailed proposal', 'after the visit'), ('Workmanship warranty', 'lifetime, labor'), ('James Hardie warranty', '30-year non-prorated')]


def art(f, cls, tag):
    s = open(os.path.join(PRE, f)).read().replace(' xmlns="http://www.w3.org/2000/svg"', '')
    s = re.sub(r'id="(\w+)"', lambda m: f'id="{tag}{m.group(1)}"', s); s = re.sub(r'url\(#(\w+)\)', lambda m: f'url(#{tag}{m.group(1)})', s); s = re.sub(r'href="#(\w+)"', lambda m: f'href="#{tag}{m.group(1)}"', s)
    return s.replace('<svg ', f'<svg class="{cls}" aria-hidden="true" focusable="false" ', 1)


def frames():
    house = '<svg class="bk-house" viewBox="0 0 220 150" aria-hidden="true" focusable="false"><path pathLength="1" d="M16 70 110 16l94 54M30 62v76h160V62M92 138V96h36v42"/><rect class="bk-lit" x="44" y="84" width="30" height="26" rx="2"/><rect class="bk-lit" x="146" y="84" width="30" height="26" rx="2"/><path pathLength="1" d="M44 84h30v26H44zM146 84h30v26h-30zM59 84v26M161 84v26" /></svg>'
    return [
        ('Since 2009', f'<b class="bk-n">2009</b>', 'Working on Austin homes, one house at a time.'),
        ('Merged', '<div class="bk-merge" aria-hidden="true"><i class="a"></i><i class="b"></i></div><b class="bk-n sm">2018</b>', 'With Sanders Roofing &amp; Exteriors.'),
        ('Documented projects', '<svg class="bk-dots" viewBox="0 0 380 240" aria-hidden="true" focusable="false"></svg><b class="bk-n sm">886</b>', '312 on the map with photos + 574 more counted.'),
        ('Credentials', '<ul class="bk-chips">' + ''.join(f'<li style="--i:{i}">{e(c)}</li>' for i, c in enumerate(CHIPS)) + '</ul>', ''),
        ('From 474 Google reviews', '<b class="bk-n">4.9</b><span class="bk-st" aria-hidden="true">' + STAR * 5 + '</span>', ''),
        ('Next', house + '<b class="bk-n xs">Your house</b>', 'One free inspection covers every trade on it.'),
    ]


def markup(S, contact, cal):
    F = frames(); n = len(F)
    fr = ''.join(f'<li class="fr{" last" if i == n - 1 else ""}"><div class="in"><p class="k">{k}</p>{body}{f"<p class=t>{t}</p>" if t else ""}</div></li>' for i, (k, body, t) in enumerate(F))
    C = f'''<section class="bk" id="booking" aria-labelledby="bk-h" style="--n:{n}"><div class="bk-stage"><div class="bk-bg" aria-hidden="true">{art('try-far.svg', 'bk-far', 'bkf')}{art('try-near.svg', 'bk-near', 'bkn')}<svg class="bk-rip" viewBox="0 0 400 400" focusable="false"><circle cx="200" cy="200" r="60"/><circle cx="200" cy="200" r="110"/><circle cx="200" cy="200" r="160"/><circle cx="200" cy="200" r="195"/></svg></div>
<div class="bk-txt"><h2 class="bk-h" id="bk-h">The record, then the call.</h2><p class="bk-p">One free inspection covers every trade on the house. Call, or write to us.</p><p class="bk-sts" aria-live="polite"></p>
<div class="bk-contact"><div class="bk-row"><a class="bk-big" href="tel:+15125500000">{PH}<span>{PHONE}</span></a><button type="button" class="bk-copy" data-copy="{PHONE}" aria-label="Copy the phone number">Copy</button></div>
<div class="bk-row"><a class="bk-big sm" href="mailto:{MAIL}">{ML}<span>{MAIL}</span></a><button type="button" class="bk-copy" data-copy="{MAIL}" aria-label="Copy the email address">Copy</button></div>
<p class="bk-addr">{ADDR}</p><ul class="bk-hours" aria-label="Opening hours"><li data-d="1,2,3,4,5">Mon–Fri <b>8–8</b></li><li data-d="6">Sat <b>8–6</b></li><li data-d="0">Sun <b>12–5</b></li></ul></div><p class="bk-msg" role="status" aria-live="polite"></p></div>
<div class="bk-gate"><div class="bk-roll"><ol class="bk-strip">{fr}</ol></div><i class="bk-lens" aria-hidden="true"></i><span class="bk-cn" aria-hidden="true"><b>01</b>/{n:02d}</span></div></div></section>'''
    items = ''.join(f'<li class="bkr-i" style="--i:{i + 4}"><span>{e(a)}</span><i aria-hidden="true"></i><b>{e(b)}</b></li>' for i, (a, b) in enumerate(RECEIPT))
    J = f'''<section class="bkr" id="receipt" aria-labelledby="bkr-h"><div class="bkr-hd"><h2 class="bkr-h" id="bkr-h">Here is your receipt.</h2><p class="bkr-p">Everything the free inspection gets you, before you spend a cent.</p></div>
<div class="bkr-print"><div class="bkr-slot" aria-hidden="true"><i></i></div><div class="bkr-clip"><div class="bkr-paper"><ol class="bkr-l"><li class="bkr-h2" style="--i:0"><b>Austin Pro</b><small>Siding, Windows &amp; Roofing</small></li><li class="bkr-s" style="--i:1">{ADDR}</li><li class="bkr-s" style="--i:2">{PHONE} · {MAIL}</li><li class="bkr-r" style="--i:3" aria-hidden="true"></li>{items}<li class="bkr-r" style="--i:9" aria-hidden="true"></li><li class="bkr-t" style="--i:10"><span>To find out</span><i aria-hidden="true"></i><b>$0</b></li><li class="bkr-r" style="--i:11" aria-hidden="true"></li><li class="bkr-s" style="--i:12">Rated 4.9 from 474 Google reviews</li><li class="bkr-s" style="--i:13">Mon–Fri 8–8 · Sat 8–6 · Sun 12–5</li><li class="bkr-s" style="--i:14">Thank you. Since 2009.</li></ol>
<div class="bkr-stub"><p>Tear here and</p><a class="btn key bkr-go" href="{CONTACT_PAGE}">Go to the contact page<span class="tab">{AR}</span></a><p class="bkr-or">or call <a href="tel:+15125500000">{PHONE}</a></p></div></div></div></div>
<button type="button" class="bkr-again">Print it again</button></section>'''
    assert '<form' not in C + J and 'http' not in (C + J).replace('http://www.w3.org', '')
    return C + J

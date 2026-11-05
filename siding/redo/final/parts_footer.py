"""SECTION 11 — Footer (the owner's current footer: board-and-batten columns standing on a concrete sill, a small house at the end), upgraded.
A hierarchy (name and one-line promise, the two actions, then Contact and Hours first, the rest after), a drawn street roofline that reacts to the pointer, a live
open/closed sign computed in the browser from the locked hours (America/Chicago), click-to-copy for the phone and the email, a back-to-top control.
Every line of text is the old footer's own text or a locked fact; every link is internal (#anchor), tel: or mailto:."""
import html, os, re, sys
e = html.escape
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', 'site'))
REPLACES = ['cta']      # the old footer's CSS lives inside cta.css (shared with the old Booking module); its classes (.ft, .boards, .bd, .sill, .hs) are not used by this markup, so nothing of it applies
CSS = 'foot.css'
JS = 'foot.js'
GLOBAL = 'FFoot'

NAME = 'Austin Pro Siding, Windows & Roofing'
TAG = 'Siding, windows and roofing for Austin homes since 2009.'
PHONE, PHONE_HREF, MAIL = '(512) 550-0000', 'tel:+15125500000', 'info@austinprosiding.com'
ADDR = ('7801 N Lamar Blvd Suite C70', 'Austin TX 78752')
HOURS = [('Mon–Fri', '8–8'), ('Sat', '8–6'), ('Sun', '12–5')]
TOWNS = 'Austin, Round Rock, Cedar Park, Leander, Pflugerville, Georgetown, Buda'
ABOUT = 'Since 2009; merged with Sanders Roofing & Exteriors in 2018.'
CREDS = ['GAF Master Elite', 'James Hardie Elite Preferred', "President's Club 2025", 'Andersen Certified Premier', 'BBB A+']
REVIEWS = '4.9 from 474 Google reviews'
SERVICES = [('Siding', '#services'), ('Windows', '#windows'), ('Roofing', '#services'), ('Try a colour', '#colours'), ('How a job runs', '#process')]


def check():
    """The old footer's words must all be present in the old markup (the owner's footer); the locked facts exact."""
    import parts_ported as PP
    old = PP.sections()['footer']; oldt = html.unescape(re.sub(r'<[^>]+>', '\n', old.replace('<wbr>', '')))
    for t in (PHONE, MAIL, ADDR[0], ADDR[1], TOWNS, ABOUT, REVIEWS, *CREDS):
        assert t in oldt.replace('\n', ' ').replace('  ', ' ') or t in oldt, t
    for d, h in HOURS: assert f'{d} {h}' in oldt, (d, h)
    assert '(512) 550-0000' == PHONE and 'info@austinprosiding.com' == MAIL


def I(d, w=2):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{d}</svg>'


IC = {
    'phone': I('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
    'clock': I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    'tools': I('<path d="M4 20l9-9M14 6l4-3 3 3-3 4-3-1-1-3z"/><path d="M5 12l3-3 3 3-3 3z"/>'),
    'pin': I('<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    'info': I('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.1"/>'),
    'badge': I('<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
    'copy': I('<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9"/>', 2.2),
    'ok': I('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 2.6),
    'up': I('<path d="M12 19V5M6 11l6-6 6 6"/>', 2.4),
    'arrow': I('<path d="M5 12h14M13 6l6 6-6 6"/>', 2.2),
    'star': '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>',
}
CRED_IC = [I('<path d="M3 12l9-7 9 7M6 11v8h12v-8"/>', 2), I('<path d="M4 7h16M4 12h16M4 17h16"/>', 2), IC['star'], I('<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M12 4v16M5 12h14"/>', 2), IC['badge']]


# ---------- the street: drawn from simple parts; ground at y 0 in local coordinates ----------
def cottage(w, h, r):
    return (f'<path class="fsb" d="M0 0V{-h}H{w}V0Z"/><path class="fsr fsr{r}" d="M-9 {-h}L{w / 2} {-h - 36}L{w + 9} {-h}Z"/><g class="fsk"><circle cx="{w * .73:.0f}" cy="{-h - 36}" r="3.4"/><circle cx="{w * .73:.0f}" cy="{-h - 36}" r="3"/><circle cx="{w * .73:.0f}" cy="{-h - 36}" r="2.6"/></g>'
            f'<rect class="fsc" x="{w * .68:.0f}" y="{-h - 32}" width="11" height="22"/><rect class="fsd" x="{w / 2 - 8:.0f}" y="-26" width="16" height="26" rx="2"/>'
            f'<rect class="fsw" x="{w * .13:.0f}" y="{-h + 16}" width="{w * .2:.0f}" height="20" rx="2"/><rect class="fsw" x="{w * .67:.0f}" y="{-h + 16}" width="{w * .2:.0f}" height="20" rx="2"/>')


def two(w, h, r):
    return (f'<path class="fsb" d="M0 0V{-h}H{w}V0Z"/><path class="fsr fsr{r}" d="M-8 {-h}L{w * .22:.0f} {-h - 30}H{w * .78:.0f}L{w + 8} {-h}Z"/><rect class="fsc" x="{w * .18:.0f}" y="{-h - 40}" width="11" height="20"/>'
            f'<rect class="fsd" x="{w / 2 - 8:.0f}" y="-26" width="16" height="26" rx="2"/>'
            + ''.join(f'<rect class="fsw" x="{w * x:.0f}" y="{y}" width="{w * .17:.0f}" height="19" rx="2"/>' for x in (.12, .42, .71) for y in (-h + 14, -h + 50))[:])


def ranch(w, h, r):
    return (f'<path class="fsb" d="M0 0V{-h}H{w}V0Z"/><path class="fsr fsr{r}" d="M-10 {-h}L{w * .22:.0f} {-h - 24}H{w * .78:.0f}L{w + 10} {-h}Z"/><rect class="fsc" x="{w * .7:.0f}" y="{-h - 28}" width="10" height="18"/>'
            f'<g class="fsk"><circle cx="{w * .7 + 5:.0f}" cy="{-h - 28}" r="3.4"/><circle cx="{w * .7 + 5:.0f}" cy="{-h - 28}" r="3"/><circle cx="{w * .7 + 5:.0f}" cy="{-h - 28}" r="2.6"/></g>'
            f'<rect class="fsd" x="{w * .08:.0f}" y="-24" width="{w * .3:.0f}" height="24" rx="2"/><rect class="fsd" x="{w * .46:.0f}" y="-24" width="14" height="24" rx="2"/>'
            f'<rect class="fsw" x="{w * .66:.0f}" y="{-h + 12}" width="{w * .24:.0f}" height="18" rx="2"/>')


def tree(s=1.0):
    return (f'<g transform="scale({s})"><rect class="fst" x="-3" y="-26" width="6" height="26"/><circle class="fsn" cx="0" cy="-42" r="22"/><circle class="fsn" cx="-14" cy="-30" r="15"/><circle class="fsn" cx="14" cy="-30" r="15"/></g>')


STREET = [('tree', 26, 1.0), ('cottage', 66, 112, 62, 1), ('tree', 214, .8), ('two', 246, 96, 92, 2), ('tree', 368, 1.05), ('ranch', 400, 150, 52, 3), ('tree', 590, .9), ('cottage', 620, 104, 70, 2),
          ('tree', 752, 1.1), ('two', 782, 110, 98, 1), ('tree', 920, .85), ('ranch', 948, 138, 56, 2), ('tree', 1110, 1.0), ('cottage', 1136, 108, 66, 3), ('tree', 1268, .9), ('two', 1292, 92, 84, 1)]


def street():
    out = ''
    for it in STREET:
        k, x = it[0], it[1]
        if k == 'tree': out += f'<g class="fo-hs fo-tr" data-k="tree" style="--tx:{x}px">{tree(it[2])}</g>'
        else:
            f = {'cottage': cottage, 'two': two, 'ranch': ranch}[k]; w, h, r = it[2], it[3], it[4]
            out += f'<g class="fo-hs" data-k="{k}" style="--tx:{x}px"><g class="fshb">{f(w, h, r)}</g></g>'
    return out


def sky():
    return f'''<svg class="fo-svg" viewBox="0 0 1400 222" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
<defs><mask id="foMk" maskUnits="userSpaceOnUse" x="-20" y="-20" width="40" height="40"><rect x="-20" y="-20" width="40" height="40" fill="#fff"/><circle cx="8" cy="-5" r="13" fill="#000"/></mask><linearGradient id="foLaw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B5DB6E" stop-opacity=".30"/><stop offset="1" stop-color="#B5DB6E" stop-opacity=".08"/></linearGradient></defs>
<g class="fo-cl"><g class="c1"><path d="M0 14a9 9 0 0 1 16-5a12 12 0 0 1 23 3a8 8 0 0 1-1 16H8a9 9 0 0 1-8-14z"/></g><g class="c2"><path d="M0 12a8 8 0 0 1 14-4a10 10 0 0 1 20 3a7 7 0 0 1-1 13H7a8 8 0 0 1-7-12z"/></g></g>
<g class="fo-sun" data-sun><g class="rays"><path d="M0 -26V-34M0 26V34M-26 0H-34M26 0H34M-18 -18L-24 -24M18 18L24 24M-18 18L-24 24M18 -18L24 -24"/></g><circle class="disc" r="17"/></g>
<g class="fo-moon" data-moon><circle class="halo" r="26"/><circle class="disc" r="15" mask="url(#foMk)"/></g>
<g class="fo-stars"><path d="M180 30v6M177 33h6M520 22v6M517 25h6M880 38v6M877 41h6M1190 26v6M1187 29h6M1320 52v6M1317 55h6"/></g>
<rect class="lawn" x="-20" y="186" width="1440" height="60" fill="url(#foLaw)"/><path class="gl" d="M-20 186H1420"/>
<g class="fo-st" transform="translate(0 186)">{street()}</g></svg>'''


def house_icon():
    return '''<svg viewBox="0 0 120 110" aria-hidden="true" focusable="false"><g class="hh"><path d="M10 50L60 12L110 50V104H10Z" fill="#DCE8DF"/>
<path d="M10 56H110M10 64H110M10 72H110M10 80H110M10 88H110M10 96H110" stroke="rgba(14,59,44,.14)" stroke-width="2"/><path d="M2 54L60 8L118 54" fill="none" stroke="#0E3B2C" stroke-width="8" stroke-linejoin="round"/>
<rect class="dd" x="50" y="70" width="20" height="34" fill="#0E3B2C"/><rect class="fw2" x="22" y="62" width="18" height="16" fill="#8FA7BA" stroke="#E0E9DE" stroke-width="3"/><rect class="fw2" x="80" y="62" width="18" height="16" fill="#8FA7BA" stroke="#E0E9DE" stroke-width="3"/></g></svg>'''


def copybtn(val, what):
    return (f'<button type="button" class="fo-copy" data-copy="{e(val)}" data-what="{e(what)}" aria-label="Copy {e(what.lower())}"><span class="ico">{IC["copy"]}<span class="fo-ck">{IC["ok"]}</span></span><span class="lab">Copy</span></button>')


def markup(S, contact, cal):
    check()
    from build import logo_svg
    sv = ''.join(f'<li><a href="{h}"><span>{e(t)}</span>{IC["arrow"]}</a></li>' for t, h in SERVICES)
    hrs = ''.join(f'<p class="fo-hr" data-d="{d}"><b>{e(a)}</b> {e(b)}</p>' for d, (a, b) in zip(('15', '6', '0'), HOURS))
    cr = ''.join(f'<li>{CRED_IC[i]}<span>{e(c)}</span></li>' for i, c in enumerate(CREDS))
    return f'''<footer class="fo" id="footer" role="contentinfo" aria-labelledby="fo-h"><div class="fo-bg" aria-hidden="true"><svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMin slice" focusable="false"><g fill="none" stroke="#0E3B2C" stroke-opacity=".07" stroke-width="1.6" stroke-linecap="round"><path d="M-20 90C220 40 360 150 640 96S1100 20 1460 80"/><path d="M-20 130C240 82 380 188 660 134S1100 62 1460 120" stroke-opacity=".05"/><path d="M-20 170C260 124 400 226 680 172S1100 104 1460 160" stroke-opacity=".04"/></g><g fill="none" stroke="#0E3B2C" stroke-opacity=".1" stroke-width="1.6" stroke-linecap="round"><path d="M40 40h30M40 40v30M1400 40h-30M1400 40v30"/></g></svg></div>
<div class="fo-in"><div class="fo-top"><div class="fo-brand"><span class="fo-logo" aria-hidden="true">{logo_svg(52, fill='#0E3B2C', butt='#7FA43E')}</span><div><h2 class="fo-h" id="fo-h">{e(NAME)}</h2><p class="fo-tag">{e(TAG)}</p></div></div>
<div class="fo-cta"><a class="btn key" href="{contact}">Book a free inspection<span class="tab">{cal}</span></a><a class="fo-call" href="{PHONE_HREF}">{IC["phone"]}<span>{PHONE}</span></a></div></div>
<div class="fo-sky" data-sky>{sky()}</div>
<div class="fo-boards">
<section class="fo-b fo-p fo-contact" aria-labelledby="fo-t1"><h3 id="fo-t1">{IC["phone"]}Contact</h3>
<div class="fo-row"><a class="fo-big" href="{PHONE_HREF}">{PHONE}</a>{copybtn(PHONE, "Phone number")}</div>
<div class="fo-row"><a class="fo-mail" href="mailto:{MAIL}">info@<wbr>austinprosiding.com</a>{copybtn(MAIL, "Email address")}</div>
<p class="fo-addr">{e(ADDR[0])}<br>{e(ADDR[1])}</p></section>
<section class="fo-b fo-p fo-hours" aria-labelledby="fo-t2"><h3 id="fo-t2">{IC["clock"]}Hours</h3>
<div class="fo-sign" aria-hidden="true"><svg viewBox="0 0 96 76" focusable="false"><g class="sw"><path class="rope" d="M30 0V20M66 0V20"/><rect class="plate" x="6" y="18" width="84" height="44" rx="9"/><rect class="plin" x="12" y="24" width="72" height="32" rx="6"/><text x="48" y="46" text-anchor="middle" class="ptx">Open</text></g></svg></div>
<p class="fo-state" data-state><b>Open now</b><span></span></p>{hrs}<a class="fo-link fo-bk" href="{contact}"><span>Book a free inspection</span>{IC["arrow"]}</a></section>
<section class="fo-b fo-services" aria-labelledby="fo-t3"><h3 id="fo-t3">{IC["tools"]}Services</h3><ul class="fo-ul">{sv}</ul></section>
<section class="fo-b fo-area" aria-labelledby="fo-t4"><h3 id="fo-t4">{IC["pin"]}Area</h3><a class="fo-link" href="#area"><span>On your street</span>{IC["arrow"]}</a><p class="fo-towns">{e(TOWNS)}</p></section>
<section class="fo-b fo-about" aria-labelledby="fo-t5"><h3 id="fo-t5">{IC["info"]}About</h3><p>{e(ABOUT.replace("&", "&"))}</p>
<svg class="fo-tl" viewBox="0 0 200 44" aria-hidden="true" focusable="false"><path class="tl" d="M14 14H186" pathLength="1"/><circle class="tn" cx="14" cy="14" r="6"/><circle class="tn" cx="186" cy="14" r="6"/><text x="14" y="38" text-anchor="start">2009</text><text x="186" y="38" text-anchor="end">2018</text></svg>
<a class="fo-link" href="#reviews"><span class="fo-stars" aria-hidden="true">{IC["star"]}</span><span>{e(REVIEWS)}</span></a></section>
<section class="fo-b fo-creds" aria-labelledby="fo-t6"><h3 id="fo-t6">{IC["badge"]}Credentials</h3><ul class="fo-cl2">{cr}</ul></section>
<div class="fo-hs2" aria-hidden="true" data-house>{house_icon()}</div></div>
<div class="fo-sill"><span>© {e(NAME)}</span><a class="fo-top2" href="#top"><span>Back to top</span>{IC["up"]}</a></div></div><p class="fo-live sr" aria-live="polite"></p></footer>'''

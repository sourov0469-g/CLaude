"""SECTION 5 — Windows (Version A, "One window, morning to midnight", rebuilt with Version F's idea). On the left the FIVE KINDS (single hung, double hung,
casement, slider, picture); in the middle one real, shaded SVG window the visitor can open, lock, tilt, screen, grille, colour and light; on the right the
controls. The frame colours are each maker's PUBLISHED colours (window_colours.json); the maker counts are the published ones. How each kind opens is a
general mechanical description, flagged as such (the firm publishes nothing about the five kinds). The drawings are made in the browser from geometry."""
import html, json, os, re
e = html.escape
HERE = os.path.dirname(os.path.abspath(__file__)); WORK = os.path.join(HERE, '..', '..', 'work'); PRE = os.path.join(HERE, '..', 'prep', 'backgrounds')
KINDS = [('single', 'Single hung', 'The lower sash lifts'), ('double', 'Double hung', 'Both sashes slide'), ('casement', 'Casement', 'Cranks open'), ('slider', 'Slider', 'Slides sideways'), ('picture', 'Picture', 'Fixed glass')]
BRANDS = [('NT Windows', 238), ('Simonton', 54), ('Andersen', 38), ('Pella', 31)]
FACT1 = '388 documented window jobs. Of 376 priced: NT Windows 238, Simonton 54, Andersen 38, Pella 31.'
FAQ_VINYL = "Mostly vinyl. 214 of our 376 priced window jobs were vinyl, 64 were NT's Twinsulator aluminum and 33 were Andersen's Fibrex composite."
FAQ_DAYS = 'Most of the window-only jobs in our files took two days on site.'
NOTE = "How each kind opens is a general description, not a statement about any maker's line. Frame colours are each maker's published colours, shown approximately on screen. Which kinds and colours a line comes in, we'll confirm at the free inspection."


def check():
    faq = open(os.path.join(WORK, 'data', 'faq.json'), encoding='utf-8').read().replace('\u2019', "'")
    for t in (FAQ_VINYL, FAQ_DAYS):
        assert t in faq, t   # verbatim from the firm's FAQ (curly apostrophes normalised)
    col = json.load(open(os.path.join(WORK, 'data', 'window_colours.json')))
    assert [b for b, _ in BRANDS] == list(col.keys()) or set(b for b, _ in BRANDS) == set(col.keys()), list(col.keys())
    assert len(col['NT Windows']) == 19 and len(col['Simonton']) == 10 and len(col['Andersen']) == 5 and len(col['Pella']) == 5
    return col


def windows(contact, cal):
    col = check()
    def art(f, cls, tag):
        s = open(os.path.join(PRE, f)).read().replace(' xmlns="http://www.w3.org/2000/svg"', '')
        s = re.sub(r'id="(\w+)"', lambda m: f'id="{tag}{m.group(1)}"', s); s = re.sub(r'url\(#(\w+)\)', lambda m: f'url(#{tag}{m.group(1)})', s); s = re.sub(r'href="#(\w+)"', lambda m: f'href="#{tag}{m.group(1)}"', s)
        return s.replace('<svg ', f'<svg class="{cls}" aria-hidden="true" focusable="false" ', 1)
    kinds = ''.join(f'<button type="button" role="radio" class="wn-k" data-k="{k}" aria-checked="{str(k == "single").lower()}" tabindex="{0 if k == "single" else -1}"><svg class="wn-mini" viewBox="0 0 64 64" aria-hidden="true"></svg><span><b>{e(n)}</b><small>{e(t)}</small></span></button>' for k, n, t in KINDS)
    brands = ''.join(f'<button type="button" role="radio" class="wn-b" data-b="{e(b)}" aria-checked="{str(i == 0).lower()}" tabindex="{0 if i == 0 else -1}">{e(b)}<i>{c}</i></button>' for i, (b, c) in enumerate(BRANDS))
    top = BRANDS[0][1]
    bars = ''.join(f'<div class="wn-bar{" on" if i == 0 else ""}" data-b="{e(b)}"><span>{e(b)}</span><u><i style="--w:{c / top * 100:.1f}%"></i></u><b>{c}</b></div>' for i, (b, c) in enumerate(BRANDS))
    return f'''<section class="wn" id="windows" aria-labelledby="wn-h"><div class="wn-bg" aria-hidden="true">{art('windows-far.svg', 'wn-far', 'wnf')}{art('windows-near.svg', 'wn-near', 'wnn')}</div>
<div class="wn-in" data-col='{e(json.dumps(col), quote=True)}'>
<div class="wn-hd"><h2 class="wn-h" id="wn-h">One window, morning to midnight.</h2><p class="wn-sub">Pick a kind. Open it. Dress it. Move the sun.</p></div>
<div class="wn-main">
<div class="wn-left"><div class="wn-kinds" role="radiogroup" aria-label="Kind of window">{kinds}</div>
<div class="wn-stat"><p class="wn-sq">Whose windows we fitted</p><p class="wn-sn"><b>376</b> priced window jobs</p>{bars}<p class="wn-sf">388 documented window jobs in all.</p></div></div>
<figure class="wn-fig"><div class="wn-stage"><svg class="wn-svg" viewBox="0 0 640 540" role="img" aria-label="A window drawn in elevation on a lap-sided wall; it changes with the controls"><g class="wn-st"></g><g class="wn-dy"></g></svg><div class="wn-hit" aria-hidden="true"></div>
<div class="wn-tag" aria-hidden="true"><b></b><span></span></div><div class="wn-hint" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="2.2"/></svg><span>Drag the window</span></div>
<div class="wn-inset" aria-hidden="true"><p>From inside</p><svg viewBox="0 0 220 150"></svg></div></div>
<figcaption class="wn-cap"><span class="wn-fact">{e(FACT1)}</span><span class="wn-fact">{e(FAQ_VINYL)}</span><span class="wn-fact">{e(FAQ_DAYS)}</span><span class="wn-note">{e(NOTE)}</span></figcaption></figure>
<aside class="wn-panel" aria-label="Window controls"><div class="wn-now"><h3 class="wn-kn"></h3><p class="wn-how"></p></div>
<div class="wn-sec wn-op"><p class="wn-q">Open it</p><div class="wn-row"><button type="button" class="wn-open wn-btn" aria-pressed="false"><span>Open</span></button><button type="button" class="wn-lock wn-btn" aria-pressed="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path class="shk" d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><span>Locked</span></button></div>
<div class="wn-rng"><label class="wn-r" data-r="lo"><span>Lower sash</span><input type="range" min="0" max="100" value="0"></label><label class="wn-r" data-r="up"><span>Upper sash</span><input type="range" min="0" max="100" value="0"></label><label class="wn-r" data-r="ang"><span>Crank</span><input type="range" min="0" max="100" value="0"></label><label class="wn-r" data-r="sl"><span>Sash</span><input type="range" min="0" max="100" value="0"></label></div>
<button type="button" class="wn-tilt wn-btn wn-sm" aria-pressed="false">Tilt in, for cleaning</button><p class="wn-fixed">A picture window is fixed glass: it does not open.</p></div>
<div class="wn-sec"><p class="wn-q">Frame colour <em class="wn-cn"></em></p><div class="wn-brands" role="radiogroup" aria-label="Window maker">{brands}</div><div class="wn-sw" role="radiogroup" aria-label="Frame colour"></div></div>
<div class="wn-sec"><p class="wn-q">Grilles, glass, screen</p><div class="wn-seg" role="radiogroup" aria-label="Grille pattern"><button type="button" role="radio" class="wn-g" data-g="none" aria-checked="true" tabindex="0">No grille</button><button type="button" role="radio" class="wn-g" data-g="colonial" aria-checked="false" tabindex="-1">Colonial</button><button type="button" role="radio" class="wn-g" data-g="prairie" aria-checked="false" tabindex="-1">Prairie</button></div>
<div class="wn-row"><button type="button" class="wn-lowe wn-btn wn-sm" aria-pressed="true">Low-E glass</button><button type="button" class="wn-scr wn-btn wn-sm" aria-pressed="false">Insect screen</button></div></div>
<div class="wn-sec"><label class="wn-q" for="wn-t">Time of day <em class="wn-tl"></em></label><input id="wn-t" class="wn-time" type="range" min="7" max="23" step="0.25" value="13" aria-valuetext="1 pm"><div class="wn-ticks" aria-hidden="true"><span>7 am</span><span>Noon</span><span>Dusk</span><span>11 pm</span></div></div>
<div class="wn-sec wn-last"><button type="button" class="wn-reset wn-btn wn-sm">Reset window</button><a class="btn key wn-book" href="{contact}">Book a free inspection<span class="tab">{cal}</span></a></div>
<p class="wn-live" aria-live="polite"></p></aside></div></div></section>'''

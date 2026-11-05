"""SECTION 4 — Visualiser (Version O, "Recolour a real house", upgraded). One real job photograph (#3, Maple Run, Austin, Jul 2026: the firm's 1900 px
original, shown at 1600) with a hand-traced siding mask; the 17 published ColorPlus colours; four kinds of light; hold-to-compare; the sample card.
The siding comes apart into small tiles when the pointer moves over it and goes back together when it leaves (Hero V1's effect, done with real shards of
the photograph, a house-wrap reveal, depth and springs). The label is exact."""
import html, json, os, base64, re
e = html.escape
HERE = os.path.dirname(os.path.abspath(__file__)); WORK = os.path.join(HERE, '..', '..', 'work'); SITE = os.path.join(HERE, '..', 'site')
LABEL = 'A real Austin Pro job, recoloured on screen. Colours are approximate; see real samples at the free inspection.'
CP = [('Arctic White', '#E0E0D8'), ('Cobble Stone', '#C6BEB0'), ('Navajo Beige', '#D5C9B2'), ('Khaki Brown', '#A28F7D'), ('Timber Bark', '#7B7064'), ('Rich Espresso', '#5F5A55'), ('Mountain Sage', '#706F5E'),
      ('Light Mist', '#B6BAB5'), ('Pearl Gray', '#B2AEA9'), ('Gray Slate', '#898A87'), ('Boothbay Blue', '#778184'), ('Evening Blue', '#5F696D'), ('Deep Ocean', '#49545C'), ('Aged Pewter', '#7D7974'),
      ('Night Gray', '#6A6D6F'), ('Iron Gray', '#575B59'), ('Countrylane Red', '#714D47')]
LIGHT = [('midday', 'Midday'), ('morning', 'Morning'), ('golden', 'Golden hour'), ('dusk', 'Dusk')]


def vis(contact, cal):
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json'))); q = P[3]
    assert (q['place'], q['when']) == ('Maple Run, Austin', 'Jul 2026') and 'Siding' in q['trades']
    assert open(os.path.join(SITE, 'src', 'sec', 'vis9.js')).read().count("['Countrylane Red', '#714D47']") == 1   # the same published list as the earlier versions
    mask = open(os.path.join(HERE, 'assets', 'vis', 'mask-siding.json')).read(); assert json.loads(mask)['w'] == 1400
    img = 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(HERE, 'assets', 'vis', 'photo3-1600.webp'), 'rb').read()).decode()
    PRE = os.path.join(HERE, '..', 'prep', 'backgrounds')
    def art(f, cls, tag):
        s = open(os.path.join(PRE, f)).read().replace(' xmlns="http://www.w3.org/2000/svg"', '')
        s = re.sub(r'id="(\w+)"', lambda m: f'id="{tag}{m.group(1)}"', s); s = re.sub(r'url\(#(\w+)\)', lambda m: f'url(#{tag}{m.group(1)})', s); s = re.sub(r'href="#(\w+)"', lambda m: f'href="#{tag}{m.group(1)}"', s)
        return s.replace('<svg ', f'<svg class="{cls}" aria-hidden="true" focusable="false" ', 1)
    sw = ''.join(f'<button type="button" role="radio" class="vz-sw" data-i="{i}" aria-checked="{str(i == 15).lower()}" tabindex="{0 if i == 15 else -1}"><i style="background:{h}"></i><span>{e(n)}</span></button>' for i, (n, h) in enumerate(CP))
    lt = ''.join(f'<button type="button" role="radio" class="vz-lt" data-l="{k}" aria-checked="{str(k == "midday").lower()}" tabindex="{0 if k == "midday" else -1}">{e(n)}</button>' for k, n in LIGHT)
    return f'''<section class="vz" id="colours" aria-labelledby="vz-h"><div class="vz-bg" aria-hidden="true">{art('visualiser-far.svg', 'vz-far', 'vzf')}{art('visualiser-near.svg', 'vz-near', 'vzn')}</div>
<div class="vz-in" data-m='{e(mask, quote=True)}' data-cp='{e(json.dumps([[n, h] for n, h in CP]), quote=True)}'>
<div class="vz-hd"><h2 class="vz-h" id="vz-h">Try a colour on a real Austin house.</h2><p class="vz-sub">Pick a colour. Move across the siding.</p></div>
<div class="vz-main"><figure class="vz-fig"><div class="vz-stage"><img class="vz-src" src="{img}" alt="Siding at a home in {e(q['place'])}, TX, by Austin Pro" width="1600" height="1200" decoding="async"><canvas class="vz-cv" width="1600" height="1200" aria-hidden="true"></canvas>
<i class="vz-lite" data-l="morning"></i><i class="vz-lite" data-l="golden"></i><i class="vz-lite" data-l="dusk"></i>
<div class="vz-tag" aria-hidden="true"><i></i><b></b></div><div class="vz-hint" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="2"/></svg>Move across the siding</div><div class="vz-orig" aria-hidden="true">As photographed</div></div>
<figcaption class="vz-label">{LABEL}<span class="vz-rec">Photo: {e(q['place'])} · {e(q['when'])} · {e(q['trades'])}.</span></figcaption></figure>
<aside class="vz-panel" aria-label="Recolour controls"><p class="vz-q">Siding colour</p><div class="vz-grid" role="radiogroup" aria-label="ColorPlus colour">{sw}</div>
<p class="vz-q">Light</p><div class="vz-lts" role="radiogroup" aria-label="Light">{lt}</div>
<div class="vz-acts"><button type="button" class="vz-cmp" aria-pressed="false">Hold to compare</button><button type="button" class="vz-sur">Surprise me</button><button type="button" class="vz-rst">Reset</button></div>
<p class="vz-now" aria-live="polite"></p>
<div class="vz-card"><p class="vz-k">Bring this to your inspection</p><p class="vz-pick"></p><a class="btn key vz-book" href="{contact}">Book a free inspection<span class="tab">{cal}</span></a></div></aside></div></div></section>'''

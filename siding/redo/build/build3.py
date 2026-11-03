"""Build the two full-screen material-world heroes (owner-confirmed essence): A = 3D house assembling, B = real photo
torn and rebuilt by 3D pieces. three.js r160 via import map (jsdelivr); kit + version concatenated into one module."""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from build import font_css, ICON, HEADER, MBAR, photo, src

HERE = os.path.dirname(os.path.abspath(__file__))
s3 = lambda f: open(os.path.join(HERE, 'src3', f)).read()
IMPORTMAP = '<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}</script>'


def module(version_js):
    kit = re.sub(r'^export (const|function|class|\{[^}]*\};)', lambda m: '' if m.group(1).startswith('{') else m.group(1), s3('kit.js'), flags=re.M)
    v = re.sub(r"^import .* from './kit.js';\n", '', version_js, flags=re.M)
    return kit + '\n' + v


def page(title, headline, sub, body_extra, js, fade=''):
    copy = f'''<div class="copy"><h1 id="hero-title">{headline}</h1><p class="sub">{sub}</p>
<div class="ctas"><a class="btn" href="https://www.austinprosiding.com/schedule-appointment">Book a free inspection</a><a class="link" href="tel:+15125500000">{ICON['phone']}Call (512) 550-0000</a></div>
<p class="proof"><span class="stars">{ICON['star'] * 5}</span><span><b>4.9</b> from 474 Google reviews</span></p></div>'''
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title><meta name="description" content="Austin Pro Siding, Windows &amp; Roofing. Siding, windows and roofing for Austin homes since 2009.">
<style>{font_css()}{src('base.css')}{s3('hero3.css')}</style>{IMPORTMAP}</head><body id="top">{HEADER}<main>
<section class="hero" aria-labelledby="hero-title" data-mate="squint"><canvas role="img" aria-label="{body_extra}"></canvas>{fade}{copy}</section></main>{MBAR}
<script>{src('shared.js')}</script><script>AP.mate();</script>
<script type="module">{js}</script></body></html>'''


def heroA():
    return page('Austin Pro: hero A, the house assembles', 'The full wall or the whole house.',
                'Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house.',
                'A house built from real siding, trim, windows and cedar shakes, assembling itself piece by piece.', module(s3('v1.js')))


if __name__ == '__main__':
    out = {'hero-A.html': heroA}
    if os.path.exists(os.path.join(HERE, 'src3', 'v2.js')):
        from build3_b import heroB; out['hero-B.html'] = heroB
    for n, fn in out.items():
        h = fn(); open(os.path.join(HERE, 'out', n), 'w').write(h); print(n, len(h) // 1024, 'KB')

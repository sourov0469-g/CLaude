"""Build the hero versions as standalone single files (fonts and photo embedded; three.js from the CDN for V2)."""
import base64, io, os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from logo import logo_svg

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, '..', 'branding', 'fonts')
DL = os.path.join(HERE, '..', '..', 'work', 'dl')
src = lambda f: open(os.path.join(HERE, 'src', f)).read()


def b64font(name):
    return base64.b64encode(open(os.path.join(FONTS, name), 'rb').read()).decode()


def font_css():
    faces = [('Montserrat', 700, 'Montserrat-700-latin.woff2'), ('Montserrat', 800, 'Montserrat-800-latin.woff2'),
             ('Inter', 400, 'Inter-400-latin.woff2'), ('Inter', 600, 'Inter-600-latin.woff2'), ('Inter', 700, 'Inter-700-latin.woff2')]
    return ''.join(f'@font-face{{font-family:"{f}";font-weight:{w};font-display:swap;src:url(data:font/woff2;base64,{b64font(n)}) format("woff2")}}' for f, w, n in faces)


def photo(name, w=1400, q=84):
    im = Image.open(os.path.join(DL, name)).convert('RGB')
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=q, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()


ICON = {
 'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
 'cal': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
 'menu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
 'star': '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>',
}

HEADER = f'''<header class="hdr"><a class="brand" href="#top" aria-label="Austin Pro Siding, Windows &amp; Roofing, home">{logo_svg(40)}
<span><b>AUSTIN PRO</b><small>Siding, Windows &amp; Roofing</small></span></a>
<nav aria-label="Main"><ul class="nav"><li><a href="#siding">Siding</a></li><li><a href="#windows">Windows</a></li><li><a href="#roofing">Roofing</a></li><li><a href="#work">Our work</a></li></ul></nav>
<a class="tel" href="tel:+15125500000">{ICON['phone']}<span>(512) 550-0000</span><b class="sr">Call (512) 550-0000</b></a></header>'''

MBAR = f'''<nav class="mbar" aria-label="Quick actions"><a href="tel:+15125500000">{ICON['phone']}Call</a><a class="book" href="https://www.austinprosiding.com/schedule-appointment">{ICON['cal']}Book</a><a href="#menu">{ICON['menu']}Menu</a></nav>'''

COPY = f'''<h1 id="hero-title">The full wall or the whole house.</h1>
<p class="sub">Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house.</p>
<div class="ctas"><a class="btn" href="https://www.austinprosiding.com/schedule-appointment">Book a free inspection</a><a class="link" href="tel:+15125500000">{ICON['phone']}Call (512) 550-0000</a></div>
<p class="proof"><span class="stars">{ICON['star'] * 5}</span><span><b>4.9</b> from 474 Google reviews</span></p>'''


def page(title, body, css, js, head_extra=''):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title><meta name="description" content="Austin Pro Siding, Windows &amp; Roofing. Siding, windows and roofing for Austin homes since 2009.">
<style>{font_css()}{src('base.css')}{css}</style>{head_extra}</head><body id="top">{HEADER}<main>{body}</main>{MBAR}
<script>{src('shared.js')}</script>{js}</body></html>'''


def v1():
    body = f'''<section class="hero v1" aria-labelledby="hero-title">
<canvas class="field" aria-hidden="true"></canvas>
<div class="panel" role="img" data-mate="squint" aria-label="A finished Austin Pro job: a two-storey house re-sided in lap siding above a brick base."></div>
<canvas class="art" aria-hidden="true"></canvas>
<div class="copy">{COPY}</div></section>'''
    js = f'''<script>window.AP_PHOTO="{photo('photo3-1400.webp')}";</script><script>{src('hero-v1.js')}</script>
<script>(function(){{const h=document.querySelector('.hero');AP.field(h.querySelector('canvas.field'),{{host:h,seed:11,max:10,
avoid:(x,y)=>{{const p=h.querySelector('.panel').getBoundingClientRect(),c=h.querySelector('.copy').getBoundingClientRect(),r=h.getBoundingClientRect();
return (x>p.left-r.left-10&&y>p.top-r.top-10&&y<p.bottom-r.top+10)||(x>c.left-r.left-30&&x<c.right-r.left+30&&y>c.top-r.top+150&&y<c.bottom-r.top+20);}},
keepOut:(x,y)=>{{const r=h.getBoundingClientRect();const inR=(el,m)=>{{const b=el.getBoundingClientRect();return x>b.left-r.left-m&&x<b.right-r.left+m&&y>b.top-r.top-m&&y<b.bottom-r.top+m;}};
return inR(h.querySelector('.copy'),40)||inR(h.querySelector('.panel'),30);}}}});AP.mate();}})();</script>'''
    return page('Austin Pro Siding, Windows & Roofing: hero V1, the cut photograph', body, src('hero-v1.css'), js)


def v2():
    copy = COPY.replace('<p class="sub">', '<div class="side"><p class="sub">').replace('Google reviews</span></p>', 'Google reviews</span></p></div>')
    body = f'''<section class="hero v2" aria-labelledby="hero-title">
<canvas class="field" aria-hidden="true"></canvas>
<div class="zone" data-mate="squint" aria-hidden="true"></div>
<canvas class="stage" role="img" aria-label="A house shown in its real parts: lap siding, trim, windows, a door and a shingle roof, assembling itself."></canvas>
<img class="nogl-img" src="{photo('photo3-1400.webp', 1100, 80)}" alt="A finished Austin Pro job: a two-storey house re-sided in lap siding above a brick base.">
<div class="copy">{copy}</div></section>'''
    js = f'''<script type="module">{src('hero-v2.js')}</script>
<script>(function(){{const h=document.querySelector('.hero');AP.field(h.querySelector('canvas.field'),{{host:h,seed:5,max:9,
avoid:(x,y)=>{{const r=h.getBoundingClientRect(),c=h.querySelector('.copy').getBoundingClientRect();return x>c.left-r.left-30&&x<c.right-r.left+30&&y>c.top-r.top-30&&y<c.bottom-r.top+30;}},
keepOut:(x,y)=>{{const r=h.getBoundingClientRect(),b=h.querySelector('.copy').getBoundingClientRect();return x>b.left-r.left-40&&x<b.right-r.left+40&&y>b.top-r.top-40&&y<b.bottom-r.top+40;}}}});AP.mate();}})();</script>'''
    return page('Austin Pro Siding, Windows & Roofing: hero V2, the exploded house', body, src('hero-v2.css'), js)


if __name__ == '__main__':
    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    for name, fn in (('hero-v1.html', v1),) + ((('hero-v2.html', globals()['v2']),) if 'v2' in globals() else ()):
        html = fn(); open(os.path.join(HERE, 'out', name), 'w').write(html); print(name, len(html) // 1024, 'KB')

"""Build the three sheet-faithful heroes (owner: "exact same as the references"; Heroes 1, 2, 3 of the heroes sheet).
Interim layers are cut from the sheet itself (sheetcut/extract.py) until Muse's high-res layers arrive; the page and
motion code stay as they are and only the data changes. Text is live HTML at the sheet's own coordinates."""
import base64, io, json, os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from logo import logo_svg
from build import font_css, ICON

HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, 'assets')


def data_url(path, jpeg=False):
    im = Image.open(path)
    b = io.BytesIO()
    if jpeg: im.convert('RGB').save(b, 'JPEG', quality=92, optimize=True); mt = 'image/jpeg'
    else: im.save(b, 'PNG', optimize=True); mt = 'image/png'
    return f'data:{mt};base64,' + base64.b64encode(b.getvalue()).decode()


def hero_data(k, mobile_crop=None):
    m = json.load(open(os.path.join(A, f'h{k}.json')))
    for sp in m['sprites']: sp['data'] = data_url(os.path.join(A, sp['src']))
    if m['art']: m['art']['data'] = data_url(os.path.join(A, m['art']['src']), jpeg=True)
    m['mobileCrop'] = mobile_crop
    return m


BRAND = f'''<a class="lg" href="#top" aria-label="Austin Pro Siding, Windows &amp; Roofing, home">{logo_svg(22, butt=None)}
<span><b>AUSTIN PRO</b><small>SIDING · ROOFING · WINDOWS</small></span></a>'''
NAV = '''<nav class="nv" aria-label="Main"><a href="#roofing">Roofing</a><i>·</i><a href="#siding">Siding</a><i>·</i><a href="#windows">Windows</a><i>·</i><a href="#work">Projects</a><i>·</i><a href="#about">About</a></nav>'''
PILL = '<a class="pill" href="https://www.austinprosiding.com/schedule-appointment">Get Free Estimate</a>'

CSS = '''
:root{--steel:#3F6E9A;--steel-d:#2F5A82;--ink:#1D2733;--page:#F4F3F0}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--page);color:var(--ink);font:400 16px/1.5 Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
:focus-visible{outline:3px solid var(--steel);outline-offset:3px;border-radius:6px}
.hero{min-height:100svh;display:grid;place-items:center;padding:3vh 0;overflow:hidden;position:relative}
.wrap{position:relative}
.card{position:absolute;left:0;top:0;transform-origin:0 0;background:#fff;border-radius:16px;
  box-shadow:0 1px 2px rgba(29,39,51,.06),0 28px 60px -34px rgba(29,39,51,.32)}
.card .art{position:absolute;display:block;-webkit-mask:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent),linear-gradient(transparent,#000 3%,#000 96%,transparent);-webkit-mask-composite:source-in;mask:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent) intersect,linear-gradient(transparent,#000 3%,#000 96%,transparent)}
.sprites{position:absolute;inset:0;pointer-events:none;z-index:4}
.sprites img{position:absolute;display:block;opacity:0;transition:opacity .35s ease;will-change:transform;
  filter:drop-shadow(3px 6px 5px rgba(29,39,51,.18))}
.hero.go .sprites img{opacity:1}
/* the sheet's own type system, at sheet pixels (the card is scaled as one unit) */
.lg{position:absolute;left:30px;top:15px;display:flex;align-items:center;gap:9px;z-index:5}
.lg svg{color:var(--steel)}
.lg b{display:block;font:500 15.5px/1 Montserrat,sans-serif;letter-spacing:.3em;color:#2A333D}
.lg b::before,.lg b::after{content:"";display:inline-block;width:14px;height:1px;background:#2A333D;vertical-align:middle;margin:0 8px 0 0}
.lg b::after{margin:0 0 0 1px}
.lg small{display:block;font:600 6.4px/1 Inter,sans-serif;letter-spacing:.2em;color:#4A535C;margin-top:5px;padding-left:2px}
.nv{position:absolute;top:22px;display:flex;align-items:center;gap:5px;white-space:nowrap;font:500 13.2px/20px Inter,sans-serif;color:#1D2733;z-index:5}
.nv i{font-style:normal;opacity:.7}
.nv a:hover{color:var(--steel)}
.pill{position:absolute;top:16px;height:32px;padding:0 15px;white-space:nowrap;display:flex;align-items:center;border-radius:99px;background:var(--steel);
  color:#fff;font:500 13.4px/1 Inter,sans-serif;z-index:5;box-shadow:0 4px 10px -6px rgba(47,90,130,.8);transition:background-color .2s ease,transform .18s cubic-bezier(.23,1,.32,1)}
.pill:hover{background:var(--steel-d);transform:translateY(-1px)}
.pill:active{transform:scale(.97)}
.hl{position:absolute;font:700 29px/1.12 Roboto,sans-serif;letter-spacing:-.005em;color:var(--ink);text-transform:uppercase;z-index:5}
.sb{position:absolute;font:400 16.4px/1.42 Inter,sans-serif;color:#1F2A35;z-index:5}
.mtext,.mhead{display:none}
/* phones: the scaled visual on top, live text below at a readable size */
.hero.m{display:block;padding:0;min-height:0}
.hero.m .wrap{clip-path:inset(-60px -40px 0 -40px)}
.hero.m .wrap{margin:10px auto 0;overflow:visible}
.hero.m .card .ct{display:none}
.mhead{position:sticky;top:0;z-index:20;justify-content:space-between;align-items:center;padding:12px 14px;background:var(--page)}
.hero.m ~ .mtext,.hero.m .mtext{display:block}
.mtext{padding:22px 18px 40px}
.mtext h1{font:700 32px/1.1 Roboto,sans-serif;text-transform:uppercase;color:var(--ink)}
.mtext p{margin-top:12px;font-size:17px;line-height:1.5;color:#2A333D}
.mtext .mp{display:inline-flex;margin-top:22px;height:50px;padding:0 24px;align-items:center;border-radius:99px;background:var(--steel);color:#fff;font:600 16px Inter}
.mtext .tel{display:flex;gap:8px;align-items:center;margin-top:16px;font:600 16px Inter;color:var(--ink)}
.mtext .tel svg{width:18px;height:18px;color:var(--steel)}
@media (max-width:820px){.mhead{display:flex}.mhead .lgm{display:flex;align-items:center;gap:8px;font:600 15px Montserrat;letter-spacing:.18em}
 .mhead .pm{height:38px;padding:0 14px;display:flex;align-items:center;border-radius:99px;background:var(--steel);color:#fff;font:600 13.5px Inter}}
@media (prefers-reduced-motion:reduce){.sprites img{opacity:1;transition:none}.pill{transition:none}}
'''

HEROES = {
 1: dict(title='Built for Austin weather', sub='Premium siding &amp; roofing, installed in Austin, TX',
         art_alt='A finished home with siding pieces flying around it', nav_x=346, pill_x=677,
         text=lambda: '<h1 class="hl" style="left:62px;top:442px">Built for Austin weather</h1><p class="sb" style="left:62px;top:484px">Premium siding &amp; roofing, installed in Austin, TX</p>',
         extra='', mcrop=455),
 2: dict(title='Modern protection. Clean design.', sub='Windows &amp; siding tailored for Texas homes',
         art_alt='A steel-blue board-and-batten home with a cream siding board peeling away', nav_x=335, pill_x=665,
         text=lambda: '<h1 class="hl" style="left:493px;top:223px;font-size:26.5px;line-height:1.2">Modern protection.<br>Clean design.</h1><p class="sb" style="left:493px;top:296px;width:280px">Windows &amp; siding tailored for Texas homes</p>',
         extra='<div class="logobox" style="position:absolute;left:0;top:0;width:283px;height:65px;background:#EFEEEA;border-radius:16px 0 0 0;z-index:1"></div>', mcrop=None),
 3: dict(title='Assembled to last.', sub='Custom panels. Precision fit. Built for Austin, TX.',
         art_alt='', nav_x=346, pill_x=677,
         text=lambda: '<h1 class="hl" style="left:0;right:0;top:446px;text-align:center;font-size:33px">Assembled to last.</h1><p class="sb" style="left:0;right:0;top:494px;text-align:center">Custom panels. Precision fit. Built for Austin, TX.</p>',
         extra='<div style="position:absolute;left:170px;top:318px;width:470px;height:34px;border-radius:50%;background:radial-gradient(closest-side,rgba(29,39,51,.22),rgba(29,39,51,0));z-index:2"></div><div style="position:absolute;left:0;right:0;top:375px;height:1px;background:#EEECE8"></div>', mcrop=380),
}


def page(k):
    h = HEROES[k]; d = hero_data(k, h['mcrop'])
    art = d['art']
    art_html = (f'<img class="art ct-art" src="{art["data"]}" alt="{h["art_alt"]}" style="left:{art["x"]}px;top:{art["y"]}px;width:{art["w"]}px;height:{art["h"]}px;z-index:2">'
                if art else '')
    data = {k2: v for k2, v in d.items() if k2 != 'art'}
    card = f'''<div class="card" style="width:{d['card']['w']}px;height:{d['card']['h']}px">{h['extra']}{art_html}
<div class="ct">{BRAND}<div style="position:absolute;left:{h['nav_x']}px;top:0">{NAV}</div><div style="position:absolute;left:{h['pill_x']}px;top:0">{PILL}</div>{h['text']()}</div>
<div class="sprites" aria-hidden="true"></div></div>'''
    mtext = f'''<div class="mtext"><h1>{h['title']}</h1><p>{h['sub']}</p><a class="mp" href="https://www.austinprosiding.com/schedule-appointment">Get Free Estimate</a>
<a class="tel" href="tel:+15125500000">{ICON['phone']}Call (512) 550-0000</a></div>'''
    mhead = f'<header class="mhead"><a class="lgm" href="#top">{logo_svg(24, butt=None)}AUSTIN PRO</a><a class="pm" href="tel:+15125500000">(512) 550-0000</a></header>'
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Austin Pro Siding, Windows &amp; Roofing: hero {k}</title>
<style>{font_css()}@font-face{{font-family:"Roboto";font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,{base64.b64encode(open(os.path.join(HERE,"..","branding","fonts","Roboto-400-latin.woff2"),"rb").read()).decode()}) format("woff2")}}
@font-face{{font-family:"Montserrat";font-weight:500;font-display:swap;src:url(data:font/woff2;base64,{base64.b64encode(open(os.path.join(HERE,"..","branding","fonts","Montserrat-500-latin.woff2"),"rb").read()).decode()}) format("woff2")}}
{CSS}</style></head><body id="top">{mhead}<main><section class="hero" aria-label="{h['title']}"><div class="wrap">{card}</div></section>{mtext}</main>
<script>window.HERO_DATA={json.dumps(data)};</script><script>{open(os.path.join(HERE,'src','sheet-hero.js')).read()}</script></body></html>'''


if __name__ == '__main__':
    for k in (1, 2, 3):
        html = page(k); open(os.path.join(HERE, 'out', f'hero-s{k}.html'), 'w').write(html); print(k, len(html) // 1024, 'KB')

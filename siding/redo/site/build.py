"""Build the five hero versions as standalone single files (round 2 of the hero gate). Everything embedded: fonts,
photos, video (H.264 + VP9), field and engine. The winner moves into the one-file site."""
import base64, io, json, os, sys
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', 'build'))
from logo import logo_svg
FONTS = os.path.join(HERE, '..', 'branding', 'fonts')
src = lambda f: open(os.path.join(HERE, 'src', f)).read()
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()


def fonts():
    faces = [('Montserrat', 700, 'Montserrat-700-latin.woff2'), ('Montserrat', 800, 'Montserrat-800-latin.woff2'),
             ('Inter', 400, 'Inter-400-latin.woff2'), ('Inter', 500, 'Inter-600-latin.woff2'), ('Inter', 600, 'Inter-600-latin.woff2'), ('Inter', 700, 'Inter-700-latin.woff2')]
    return ''.join(f'@font-face{{font-family:"{f}";font-weight:{w};font-display:swap;src:url(data:font/woff2;base64,{b64(os.path.join(FONTS, n))}) format("woff2")}}' for f, w, n in faces)


def jpeg(path, w, q=86, crop=None):
    im = Image.open(path).convert('RGB')
    if crop: im = im.crop(crop)
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=q, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()


I = {
 'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
 'cal': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>',
 'menu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
 'star': '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>',
 'chev': '<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
 'pause': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
 'play': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5l11 7-11 7z"/></svg>',
}
BOOK = 'https://www.austinprosiding.com/schedule-appointment'
SWATCH = [('Lap siding', 'HardiePlank, 8.25" boards', '#B9B4A8', '-3deg'), ('Board &amp; batten', 'Vertical panels and battens', '#2F4B3F', '2deg'),
          ('Shingle &amp; shake', 'Gable accents', '#B98D63', '-1deg'), ('Trim &amp; soffit', 'Corners, fascia, frieze', '#EDE7DA', '3deg')]
HEADER = f'''<header class="hdr"><a class="brand" href="#top" aria-label="Austin Pro Siding, Windows &amp; Roofing, home">{logo_svg(38, fill='#0E3B2C', butt='#7FA43E')}<span><b>AUSTIN PRO</b><small>Siding, Windows &amp; Roofing</small></span></a>
<nav aria-label="Main"><ul class="menu"><li><button type="button" aria-expanded="false" aria-controls="book">Siding {I['chev']}</button>
<div class="book" id="book"><div class="fan">{''.join(f'<a href="#siding"><i style="background:{c};--r:{r}"></i><b>{n}</b><small>{d}</small></a>' for n, d, c, r in SWATCH)}</div></div></li>
<li><a href="#windows">Windows</a></li><li><a href="#roofing">Roofing</a></li><li><a href="#work">Our work</a></li></ul></nav>
<a class="tel" href="tel:+15125500000">{I['phone']}<span>(512) 550-0000</span><b class="sr">Call (512) 550-0000</b></a></header>'''
MBAR = f'<nav class="mbar" aria-label="Quick actions"><a href="tel:+15125500000">{I["phone"]}Call</a><a class="book-btn" href="{BOOK}">{I["cal"]}Book</a><a href="#menu">{I["menu"]}Menu</a></nav>'
HEAD_JS = '''<script>(function(){const b=document.querySelector('.menu button'),d=document.getElementById('book');if(!b)return;
const set=o=>{b.setAttribute('aria-expanded',o);d.classList.toggle('open',o);};b.addEventListener('click',()=>set(b.getAttribute('aria-expanded')!=='true'));
b.parentElement.addEventListener('mouseenter',()=>matchMedia('(hover:hover)').matches&&set(true));b.parentElement.addEventListener('mouseleave',()=>set(false));
addEventListener('keydown',e=>{if(e.key==='Escape')set(false);});})();</script>'''

LEAD = 'The full wall or the whole house.'
SUB = 'Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house.'
CTAS = f'''<div class="ctas"><a class="btn key" href="{BOOK}">Book a free inspection<span class="tab">{I['cal']}</span></a><a class="callx" href="tel:+15125500000">{I['phone']}(512) 550-0000</a></div>
<p class="proof"><span class="stars">{I['star'] * 5}</span><span><b>4.9</b> from 474 Google reviews</span></p>'''


def video_tags(cls=''):
    mp4, webm = os.path.join(HERE, 'media', 'hero-1280.mp4'), os.path.join(HERE, 'media', 'hero-1280.webm')
    poster = jpeg(os.path.join(HERE, 'media', 'f1.jpg'), 480, 70)
    return (f'<video class="{cls}" autoplay muted loop playsinline preload="auto" poster="{poster}" aria-label="Film of a finished white board-and-batten home at golden hour">'
            f'<source type="video/webm" src="data:video/webm;base64,{b64(webm)}"><source type="video/mp4" src="data:video/mp4;base64,{b64(mp4)}"></video>')


PP = f'<button class="pp" type="button" aria-label="Pause the film" aria-pressed="false">{I["pause"]}</button>'
PP_JS = f'''<script>document.querySelectorAll('.pp').forEach(b=>{{const v=b.closest('.hero').querySelector('video');if(!v)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches){{v.pause();v.removeAttribute('autoplay');b.innerHTML={json.dumps(I['play'])};b.setAttribute('aria-label','Play the film');b.setAttribute('aria-pressed','true');}}
b.addEventListener('click',()=>{{const p=!v.paused;p?v.pause():v.play();b.innerHTML=p?{json.dumps(I['play'])}:{json.dumps(I['pause'])};b.setAttribute('aria-label',p?'Play the film':'Pause the film');b.setAttribute('aria-pressed',p);}});}});</script>'''


def page(n, title, body, extra_js=''):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Austin Pro Siding, Windows &amp; Roofing: hero {n}, {title}</title><meta name="description" content="Siding, windows and roofing for Austin homes since 2009. Call (512) 550-0000.">
<style>{fonts()}{src('frame.css')}{src('heroes.css')}</style></head><body id="top">{HEADER}<main>{body}</main>{MBAR}
<script>{src('field.js')}</script>{HEAD_JS}{extra_js}</body></html>'''


def photo_js(sel, srcp, data_file, crop, radius):
    data = json.load(open(os.path.join(HERE, 'media', data_file)))
    return (f'<script>{src("photo-hero.js")}</script><script>window.__photo=photoHero(document.querySelector("{sel}"),'
            f'{{src:"{jpeg(os.path.join(HERE, "media", srcp), 1900, 88)}",data:{json.dumps(data)},crop:{json.dumps(crop)},radius:{radius}}});</script>')


def v1():
    body = f'''<section class="hero v1" aria-labelledby="h1"><div class="stage" data-fx="0.2" data-fy="0.3" data-mate="squint">
<canvas role="img" aria-label="A finished Austin Pro job in Maple Run, Austin: charcoal lap siding above brick, with a two-car garage."></canvas>
<span class="hint" data-solid><i></i>Move across the siding</span>
<div class="creds" data-solid><span>GAF Master Elite</span><span>James Hardie Elite Preferred</span></div>
<div class="card" data-solid><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div></div></section>'''
    return page(1, 'interactive photo, charcoal job', body, photo_js('.v1 .stage', 'charcoal-orig.jpg', 'charcoal-boards.json', [0, 0, 1900, 1180], 170))


def v2():
    body = f'''<section class="hero v2" aria-labelledby="h1"><div class="copy"><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div>
<div class="stage" data-fx="0.5" data-fy="0.42" data-mate="squint"><canvas role="img" aria-label="A finished Austin Pro siding job in Maple Run, Austin: a two-storey house in HardiePlank lap siding with a covered patio."></canvas>
<div class="tag" data-solid><b>177</b><small>before-and-after pairs published</small></div><span class="hint" data-solid><i></i>Move across the siding</span></div></section>'''
    return page(2, 'interactive photo, white-lap job', body, photo_js('.v2 .stage', 'whitelap-orig.jpg', 'whitelap-after-boards.json', [0, 330, 1771, 1180], 150))


def v3():
    body = f'<section class="hero v3" aria-labelledby="h1">{video_tags()}<div class="copy"><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div>{PP}</section>'
    return page(3, 'the firm\'s film, full bleed', body, PP_JS)


def v4():
    body = f'''<section class="hero v4" aria-labelledby="h1"><div class="copy"><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div>
<div class="win" data-solid><div class="glass">{video_tags()}<div class="mull"></div>{PP}</div><div class="sill"></div></div></section>'''
    return page(4, 'live field with the film in a window', body, PP_JS)


def v5():
    body = f'''<section class="hero v5" aria-labelledby="h1"><h1 class="lead" id="h1">{LEAD}</h1>
<div class="strip" data-solid>{video_tags()}{PP}</div><div class="row"><p class="sub">{SUB}</p>{CTAS}</div></section>'''
    return page(5, 'live field, huge type, film strip', body, PP_JS)


if __name__ == '__main__':
    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    for n, fn in enumerate((v1, v2, v3, v4, v5), 1):
        h = fn(); open(os.path.join(HERE, 'out', f'hero-{n}.html'), 'w').write(h); print(n, len(h) // 1024, 'KB')

"""Assemble the ONE-file site: out/site.html. Everything embedded (fonts, photos, film, field, sections).
Each section slot holds its live winner; the other versions sit beside it as hidden in-file backups (<template>),
never deleted. For audit only, ?hero=2..5, ?services=a|b, ?vis=a|b swap a backup into its slot (no switcher chrome).
Section markup is pre-rendered at build time by running the section modules in node, so the page reads without JS."""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build import (fonts, jpeg, src, b64, I, BOOK, HEADER, MBAR, HEAD_JS, LEAD, SUB, CTAS, PP)

# the live winner of every slot; the rest become backups
LIVE = {'hero': '1', 'services': 'a', 'vis': 'b', 'windows': 'a', 'reviews': 'b', 'process': 'a', 'try': 'a', 'area': 'a', 'book': 'a'}
SEC = lambda f: open(os.path.join(HERE, 'src', 'sec', f)).read()
MODS = ['scenes', 'services', 'svc2', 'vis', 'vis2', 'windows', 'win2', 'reviews', 'rev2', 'process', 'proc2', 'seq', 'seq2', 'area', 'cta', 'nav']
REV = json.load(open(os.path.join(HERE, '..', '..', 'work', 'data', 'reviews.json')))
WORK = os.path.join(HERE, '..', '..', 'work')


def area():
    # the firm's own published project photos with their recorded place/date/trades; city tallies from the finder dataset
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json'))); N = json.load(open(os.path.join(WORK, 'data', 'near.json')))
    import base64 as _b
    cards = [{'src': 'data:image/webp;base64,' + _b.b64encode(open(os.path.join(WORK, 'dl', f'photo{i}-640.webp'), 'rb').read()).decode(),
              'alt': P[i]['alt'] or f"{P[i]['trades']} at a home in {P[i]['place']}, TX, by Austin Pro", 'place': P[i]['place'], 'when': P[i]['when'], 'trades': P[i]['trades'], 'href': 'https://www.austinprosiding.com' + P[i]['href']}
             for i in (0, 10, 2, 7, 28, 33, 36, 42)]
    want = ['Austin', 'Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown', 'Buda']
    tally = {g[0]: g[6] for g in N['g'] if g[1] == 'c'}
    places = sorted({p.strip() for p in N['pl'] if p.strip()} | {g[0] for g in N['g'] if g[1] == 'c'}, key=str.lower)
    return {'cards': cards, 'cities': [[c, tally[c]] for c in want], 'places': places}


AREA = area()


def svcp():
    # the firm's own published job photos for Services D, with their recorded place, date and trades
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json')))
    import base64 as _b
    pick = {'siding': 0, 'windows': 42, 'roofing': 10}
    return {k: {'src': 'data:image/webp;base64,' + _b.b64encode(open(os.path.join(WORK, 'dl', f'photo{i}-1400.webp'), 'rb').read()).decode(),
                'alt': P[i]['alt'] or f"{P[i]['trades']} at a home in {P[i]['place']}, TX, by Austin Pro", 'place': P[i]['place'], 'when': P[i]['when'],
                'trades': P[i]['trades'], 'href': 'https://www.austinprosiding.com' + P[i]['href']} for k, i in pick.items()}


SVCP = svcp()


def winp():
    # Windows D: the firm's own published window projects whose photographs show windows (checked one by one), newest first
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json')))
    from PIL import Image as _I
    import io as _io, base64 as _b
    def pic(i):
        im = _I.open(os.path.join(WORK, 'dl', f'photo{i}-1400.webp')).convert('RGB'); im.thumbnail((960, 960)); buf = _io.BytesIO(); im.save(buf, 'WEBP', quality=68)
        return {'src': 'data:image/webp;base64,' + _b.b64encode(buf.getvalue()).decode(), 'alt': P[i]['alt'] or f"{P[i]['trades']} at a home in {P[i]['place']}, TX, by Austin Pro"}
    jobs = []
    for grp in [[4], [5, 38], [6], [7], [40], [42], [29], [11], [41]]:
        p = P[grp[0]]; jobs.append({'place': p['place'], 'when': p['when'], 'trades': p['trades'], 'href': 'https://www.austinprosiding.com' + p['href'], 'photos': [pic(i) for i in grp]})
    return jobs


WINP = winp()


def prerender():
    js = '\n'.join(SEC(m + '.js') for m in MODS)
    prog = ('const window=globalThis;globalThis.matchMedia=()=>({matches:false});globalThis.__REV=' + json.dumps(REV) + ';globalThis.__AREA=' + json.dumps(AREA) + ';globalThis.__SVCP=' + json.dumps(SVCP) + ';globalThis.__WINP=' + json.dumps(WINP) + ';' + js +
            # fact lock: every quote must be a verbatim excerpt of its review
            ';for(const p of [...Rev.PICK,...Proc.QUOTES,...Rev2.PICK]){if(!__REV[p[0]].text.includes(p[1]))throw new Error("not verbatim: "+p[1]);}'
            ';process.stdout.write(JSON.stringify({sa:Services.A(),sb:Services.B(),sc:Svc2.C(),sd:Svc2.D(),va:Vis.A(),vb:Vis.B(),vc:Vis2.C(),vd:Vis2.D(),wa:Win.A(),wb:Win.B(),wc:Win2.C(),wd:Win2.D(),ra:Rev.A(),rb:Rev.B(),rc:Rev2.C(),rd:Rev2.D(),pa:Proc.A(),pb:Proc.B(),pc:Proc2.C(),pd:Proc2.D(),aa:Area.A(),ab:Area.B(),qa:Seq.A(),qb:Seq.B(),qc:Seq2.C(),qd:Seq2.D(),ca:Cta.A(),cb:Cta.B(),ft:Cta.FOOT()}))')
    return json.loads(subprocess.run(['node', '-'], input=prog, capture_output=True, text=True, check=True).stdout)


FILM = '<video class="film" muted loop playsinline preload="none" data-film aria-label="Film of a finished white board-and-batten home at golden hour"></video>'


def heroes():
    v1 = f'''<section class="hero v1" aria-labelledby="h1"><div class="stage" data-fx="0.2" data-fy="0.3">
<canvas role="img" aria-label="A finished Austin Pro job in Maple Run, Austin: charcoal lap siding above brick, with a two-car garage."></canvas>
<span class="hint" data-solid><i></i>Move across the siding</span>
<div class="creds" data-solid><span>GAF Master Elite</span><span>James Hardie Elite Preferred</span></div>
<div class="card" data-solid><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div></div></section>'''
    v2 = f'''<section class="hero v2" aria-labelledby="h1"><div class="copy"><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div>
<div class="stage" data-fx="0.5" data-fy="0.42"><canvas role="img" aria-label="A finished Austin Pro siding job in Maple Run, Austin: a two-storey house in HardiePlank lap siding with a covered patio."></canvas>
<div class="tag" data-solid><b>177</b><small>before-and-after pairs published</small></div><span class="hint" data-solid><i></i>Move across the siding</span></div></section>'''
    v3 = f'<section class="hero v3" aria-labelledby="h1">{FILM}<div class="copy"><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div>{PP}</section>'
    v4 = f'''<section class="hero v4" aria-labelledby="h1"><div class="copy"><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div>
<div class="win" data-solid><div class="glass">{FILM}<div class="mull"></div>{PP}</div><div class="sill"></div></div></section>'''
    v5 = f'''<section class="hero v5" aria-labelledby="h1"><h1 class="lead" id="h1">{LEAD}</h1>
<div class="strip" data-solid>{FILM}{PP}</div><div class="row"><p class="sub">{SUB}</p>{CTAS}</div></section>'''
    return {'1': v1, **new_heroes(), 'a2': v2, 'a3': v3, 'a4': v4, 'a5': v5}


ALT = {'c2': 'A modern two-storey house with charcoal lap siding and warm wood soffits.',
       'c1': 'A black board-and-batten house at dusk with warm light in the windows.',
       'c3': 'A craftsman-style house at dusk with board-and-batten siding and stone.'}
ARROW = lambda d: f'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="{"M15 5l-7 7 7 7" if d < 0 else "M9 5l7 7-7 7"}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
LAPCHIP = '<svg viewBox="0 0 44 44" aria-hidden="true"><rect x="2" y="2" width="40" height="40" rx="9" fill="#0E3B2C"/><g fill="#B5DB6E"><rect x="8" y="10" width="28" height="5" rx="1"/><rect x="8" y="19" width="28" height="5" rx="1" opacity=".8"/><rect x="8" y="28" width="28" height="5" rx="1" opacity=".6"/></g></svg>'


def matte_url():
    from PIL import Image
    import base64, io
    m = Image.open(os.path.join(HERE, 'media', 'cand3-matte.png')).convert('L'); rgba = Image.new('RGBA', m.size, (0, 0, 0, 0)); rgba.putalpha(m)
    b = io.BytesIO(); rgba.save(b, 'PNG', optimize=True); return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()


def hero2_data():
    from PIL import Image
    import base64, io
    def png(p):
        b = io.BytesIO(); Image.open(os.path.join(HERE, 'media', p)).save(b, 'PNG', optimize=True); return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()
    return {'c2': jpeg(os.path.join(HERE, 'media', 'hero-cand-2.png'), 1200, 86), 'c2d': png('cand2-depth.png'),
            'c1': jpeg(os.path.join(HERE, 'media', 'hero-cand-1.jpg'), 1024, 84), 'c1d': png('cand1-depth.png'),
            'c3': jpeg(os.path.join(HERE, 'media', 'hero-cand-3.jpg'), 1200, 86)}


def new_heroes():
    """Five new heroes on Muse's supplied photographs (never captioned as the firm's jobs). Photos load from one
    embedded copy (window.__HERO2) so no version duplicates an image."""
    creds = '<div class="creds2"><span>GAF Master Elite</span><span>James Hardie Elite Preferred</span><span>Andersen Certified Premier</span></div>'
    copy = lambda: f'<h1 class="lead" id="h1" data-split>{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}'
    hint = '<span class="hint2" data-solid><i></i>Move to look around</span>'
    v2 = f'''<section class="hero h2v" aria-labelledby="h1"><div class="copy">{copy()}{creds}</div>
<div class="hph" role="img" aria-label="{ALT['c2']}">{hint}<div class="chip" data-solid>{LAPCHIP}<div><b>Lap siding</b><small>The full wall, course by course</small></div></div></div></section>'''
    steps = ['One project manager walks every side.', 'Every trade priced on one visit.', 'Built, then walked through with you.']
    v3 = f'''<section class="hero h3v" aria-labelledby="h1"><div class="pin"><div class="copy"><h1 class="lead" id="h1" data-split>{LEAD}</h1>
<div class="steps" aria-live="polite">{''.join(f'<p class="step{" on" if not i else ""}"><b>0{i + 1}</b>{t}</p>' for i, t in enumerate(steps))}</div><p class="sub">{SUB}</p>{CTAS}</div>
<div class="hph" role="img" aria-label="{ALT['c1']}"><span class="rail" aria-hidden="true"></span>{hint}</div></div></section>'''
    v4 = f'''<section class="hero h4v" aria-labelledby="h1" style="--matte:url({matte_url()})"><div class="layers"><img class="back" alt="{ALT['c3']}" decoding="async">
<h1 class="lead" id="h1"><span class="ln">The full wall or</span><span class="ln">the whole house.</span></h1><img class="front" alt="" aria-hidden="true" decoding="async"></div>
<div class="card" data-solid><p class="sub">{SUB}</p>{CTAS}</div></section>'''
    n = 11
    courses = ''.join(f'<div class="c" style="top:{i * 100 / n:.3f}%;height:{100 / n + 0.35:.3f}%;--side:{-1 if i % 2 else 1};--d:{(n - 1 - i) * 0.07:.2f}s"><img alt="" decoding="async"></div>' for i in range(n))
    v5 = f'''<section class="hero h5v" aria-labelledby="h1"><div class="copy">{copy()}{creds}</div>
<div class="courses" role="img" aria-label="{ALT['c2']} The photograph is hung as lap courses, the bottom course first.">{courses}<span class="tag5" data-solid>Every course, from the bottom up</span></div></section>'''
    cards = [('c2', 'Lap siding'), ('c1', 'Board and batten'), ('c3', 'Board and batten with stone')]
    v6 = f'''<section class="hero h6v" aria-labelledby="h1"><div class="copy">{copy()}{creds}</div>
<div class="stage" tabindex="0" role="group" aria-roledescription="carousel" aria-label="Three siding styles. Arrow keys or the buttons change the front card.">
<div class="deck">{''.join(f'<figure class="card" data-label="{lb}" data-img="{k}"><img alt="{ALT[k]}" decoding="async"><figcaption class="lb">{lb}</figcaption></figure>' for k, lb in cards)}</div>
<div class="ctl"><span class="now" aria-live="polite"></span><button type="button" data-go="-1" aria-label="Previous style">{ARROW(-1)}</button><button type="button" data-go="1" aria-label="Next style">{ARROW(1)}</button></div></div></section>'''
    return {'2': v2, '3': v3, '4': v4, '5': v5, '6': v6}


VERSIONS = {
    'hero': [['1', 'Charcoal photo, boards lift (backup, rejected photo)'], ['2', 'Depth window'], ['3', 'Pinned dusk portrait'], ['4', 'Title between sky and house'],
             ['5', 'Photo hung as lap courses'], ['6', 'Three-house deck'], ['a2', 'Archive: white-lap photo'], ['a3', 'Archive: film full bleed'], ['a4', 'Archive: film in a window'], ['a5', 'Archive: film strip']],
    'services': [['a', 'Sideways sequence'], ['b', 'Word switcher'], ['c', 'Counted chapters'], ['d', 'Split cover, real jobs']], 'vis': [['a', 'Swatch fan'], ['b', 'Snap-together wall'], ['c', 'Colour fields, compare'], ['d', 'The instrument']],
    'windows': [['a', 'Morning to midnight'], ['b', 'Bay, built out'], ['c', 'Taken apart, pinned'], ['d', 'Window jobs on record']], 'reviews': [['a', '4.9 in lap courses'], ['b', 'Hanging tags'], ['c', 'Read at reading pace'], ['d', 'Ask the neighbours']],
    'process': [['a', 'Stacked chapters'], ['b', 'Pinned wall'], ['c', 'The plumb line'], ['d', 'Four columns']], 'try': [['a', 'Pinned sideways'], ['b', 'Swipe rail'], ['c', 'The workbench'], ['d', 'The dive (Lusion idea)']],
    'area': [['a', 'Thread board'], ['b', 'Street finder']], 'book': [['a', 'Work order'], ['b', 'Press the board']]}
SLOTNAMES = {'hero': 'Hero', 'services': 'Services', 'vis': 'Visualiser', 'windows': 'Windows', 'reviews': 'Reviews', 'process': 'Process', 'try': 'Try the job', 'area': 'On your street', 'book': 'Booking'}


def slot(name, versions):
    live = versions[LIVE[name]]
    backs = ''.join(f'<template data-slot="{name}" data-v="{k}">{v}</template>' for k, v in versions.items() if k != LIVE[name])
    return f'<div class="slot" data-slot="{name}" data-v="{LIVE[name]}">{live}</div>{backs}'


def photos():
    def one(srcp, data_file, crop):
        return {'src': jpeg(os.path.join(HERE, 'media', srcp), 1900, 88), 'data': json.load(open(os.path.join(HERE, 'media', data_file))), 'crop': crop}
    return {'v1': {**one('charcoal-orig.jpg', 'charcoal-boards.json', [0, 0, 1900, 1180]), 'radius': 170},
            'v2': {**one('whitelap-orig.jpg', 'whitelap-after-boards.json', [0, 330, 1771, 1180]), 'radius': 150}}


BOOT = '''(function(){
const q=new URLSearchParams(location.search);
/* audit only: put a backup version into its slot */
document.querySelectorAll('.slot').forEach(s=>{const v=q.get(s.dataset.slot);if(!v||v===s.dataset.v)return;
  const t=document.querySelector('template[data-slot="'+s.dataset.slot+'"][data-v="'+v+'"]');if(!t)return;
  const back=document.createElement('template');back.dataset.slot=s.dataset.slot;back.dataset.v=s.dataset.v;back.innerHTML=s.innerHTML;
  s.replaceChildren(t.content.cloneNode(true));s.dataset.v=v;t.replaceWith(back);});
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* hero: interactive photo, or the film */
const P=window.__PHOTOS,h=document.querySelector('.slot[data-slot=hero] .hero');
if(h&&h.matches('.v1,.v2')){const k=h.matches('.v1')?'v1':'v2';window.__photo=photoHero(h.querySelector('.stage'),P[k]);}
const H2=window.__HERO2;if(h&&h.matches('.h4v')){h.querySelector('.back').src=H2.c3;h.querySelector('.front').src=H2.c3;}
if(h&&h.matches('.h5v'))h.querySelectorAll('.c img').forEach(i=>i.src=H2.c2);
if(h&&h.matches('.h6v'))h.querySelectorAll('.card').forEach(c=>c.querySelector('img').src=H2[c.dataset.img]);
Hero2.wire();
document.querySelectorAll('.slot video[data-film]').forEach(v=>{v.append(document.getElementById('film').content.cloneNode(true));
  v.poster=document.getElementById('film').dataset.poster;v.preload='auto';if(!RM){v.autoplay=true;v.load();v.play().catch(()=>{});}else v.load();});
const PLAY=%PLAY%,PAUSE=%PAUSE%;
document.querySelectorAll('.slot .pp').forEach(b=>{const v=b.closest('.hero').querySelector('video');if(!v)return;
  const sync=()=>{const p=v.paused;b.innerHTML=p?PLAY:PAUSE;b.setAttribute('aria-label',p?'Play the film':'Pause the film');b.setAttribute('aria-pressed',p);};
  if(RM)sync();b.addEventListener('click',()=>{v.paused?v.play():v.pause();setTimeout(sync,0);});v.addEventListener('pause',sync);v.addEventListener('play',sync);});
Scenes.wire(document);Services.wire(document);Svc2.wire(document);Vis.wire(document);Vis2.wire(document);Win.wire(document);Win2.wire(document);Rev.wire(document);Rev2.wire(document);Proc.wire(document);Proc2.wire(document);Seq.wire(document);Seq2.wire(document);Area.wire(document);Cta.wire(document);Nav.wire();
})();'''


def build():
    pre = prerender()
    css = fonts() + src('frame.css') + src('heroes.css') + ''.join(SEC(f + '.css') for f in MODS)
    css += src('hero2.css') + src('fx.css') + '.slot{display:contents}'
    css = css.replace('244,242,236', '255,255,255')
    film = (f'<template id="film" data-poster="{jpeg(os.path.join(HERE, "media", "f1.jpg"), 480, 70)}">'
            f'<source type="video/webm" src="data:video/webm;base64,{b64(os.path.join(HERE, "media", "hero-1280.webm"))}">'
            f'<source type="video/mp4" src="data:video/mp4;base64,{b64(os.path.join(HERE, "media", "hero-1280.mp4"))}"></template>')
    main = (slot('hero', heroes()) + slot('services', {'a': pre['sa'], 'b': pre['sb'], 'c': pre['sc'], 'd': pre['sd']}) + slot('vis', {'a': pre['va'], 'b': pre['vb'], 'c': pre['vc'], 'd': pre['vd']}) +
            slot('windows', {'a': pre['wa'], 'b': pre['wb'], 'c': pre['wc'], 'd': pre['wd']}) + slot('reviews', {'a': pre['ra'], 'b': pre['rb'], 'c': pre['rc'], 'd': pre['rd']}) +
            slot('process', {'a': pre['pa'], 'b': pre['pb'], 'c': pre['pc'], 'd': pre['pd']}) + slot('try', {'a': pre['qa'], 'b': pre['qb'], 'c': pre['qc'], 'd': pre['qd']}) +
            slot('area', {'a': pre['aa'], 'b': pre['ab']}) + slot('book', {'a': pre['ca'], 'b': pre['cb']}))
    foot = pre['ft']
    boot = BOOT.replace('%PLAY%', json.dumps(I['play'])).replace('%PAUSE%', json.dumps(I['pause']))
    js = src('photo-hero.js') + src('hero2.js') + ''.join(SEC(m + '.js') for m in MODS) + src('fx.js')
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Austin Pro Siding, Windows &amp; Roofing | Austin, TX since 2009</title>
<meta name="description" content="Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house. Call (512) 550-0000.">
<style>{css}</style></head><body id="top">{HEADER.replace('href="#work"', 'href="#area"')}<main>{main}</main>{foot}{MBAR}{film}
<script>{src('world.js')}</script>{HEAD_JS}<script>window.__HERO2={json.dumps(hero2_data())};window.__VERSIONS={json.dumps(VERSIONS)};window.__SLOTNAMES={json.dumps(SLOTNAMES)};window.__PHOTOS={json.dumps(photos())};window.__REV={json.dumps(REV)};window.__AREA={{cities:{json.dumps(AREA['cities'])},places:{json.dumps(AREA['places'])}}};{js}{boot}</script></body></html>'''


if __name__ == '__main__':
    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    h = build(); open(os.path.join(HERE, 'out', 'site.html'), 'w').write(h); print('site.html', len(h) // 1024, 'KB')

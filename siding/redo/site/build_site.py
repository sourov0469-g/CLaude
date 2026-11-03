"""Assemble the ONE-file site: out/site.html. Everything embedded (fonts, photos, film, field, sections).
Each section slot holds its live winner; the other versions sit beside it as hidden in-file backups (<template>),
never deleted. For audit only, ?hero=2..5, ?services=a|b, ?vis=a|b swap a backup into its slot (no switcher chrome).
Section markup is pre-rendered at build time by running the section modules in node, so the page reads without JS."""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build import (fonts, jpeg, src, b64, I, BOOK, HEADER, MBAR, HEAD_JS, LEAD, SUB, CTAS, PP)

# the live winner of every slot; the rest become backups
LIVE = {'hero': '1', 'services': 'a', 'vis': 'b', 'windows': 'a', 'reviews': 'b', 'process': 'a', 'area': 'a'}
SEC = lambda f: open(os.path.join(HERE, 'src', 'sec', f)).read()
MODS = ['scenes', 'services', 'vis', 'windows', 'reviews', 'process', 'area']
REV = json.load(open(os.path.join(HERE, '..', '..', 'work', 'data', 'reviews.json')))
WORK = os.path.join(HERE, '..', '..', 'work')


def area():
    # the firm's own published project photos with their recorded place/date/trades; city tallies from the finder dataset
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json'))); N = json.load(open(os.path.join(WORK, 'data', 'near.json')))
    import base64 as _b
    cards = [{'src': 'data:image/webp;base64,' + _b.b64encode(open(os.path.join(WORK, 'dl', f'photo{i}-640.webp'), 'rb').read()).decode(),
              'alt': P[i]['alt'], 'place': P[i]['place'], 'when': P[i]['when'], 'trades': P[i]['trades'], 'href': 'https://www.austinprosiding.com' + P[i]['href']}
             for i in (0, 10, 2, 7, 28, 33, 36, 42)]
    want = ['Austin', 'Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown', 'Buda']
    tally = {g[0]: g[6] for g in N['g'] if g[1] == 'c'}
    places = sorted({p.strip() for p in N['pl'] if p.strip()} | {g[0] for g in N['g'] if g[1] == 'c'}, key=str.lower)
    return {'cards': cards, 'cities': [[c, tally[c]] for c in want], 'places': places}


AREA = area()


def prerender():
    js = '\n'.join(SEC(m + '.js') for m in MODS)
    prog = ('const window=globalThis;globalThis.matchMedia=()=>({matches:false});globalThis.__REV=' + json.dumps(REV) + ';globalThis.__AREA=' + json.dumps(AREA) + ';' + js +
            # fact lock: every quote must be a verbatim excerpt of its review
            ';for(const p of [...Rev.PICK,...Proc.QUOTES]){if(!__REV[p[0]].text.includes(p[1]))throw new Error("not verbatim: "+p[1]);}'
            ';process.stdout.write(JSON.stringify({sa:Services.A(),sb:Services.B(),va:Vis.A(),vb:Vis.B(),wa:Win.A(),wb:Win.B(),ra:Rev.A(),rb:Rev.B(),pa:Proc.A(),pb:Proc.B(),aa:Area.A(),ab:Area.B()}))')
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
    return {'1': v1, '2': v2, '3': v3, '4': v4, '5': v5}


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
document.querySelectorAll('.slot video[data-film]').forEach(v=>{v.append(document.getElementById('film').content.cloneNode(true));
  v.poster=document.getElementById('film').dataset.poster;v.preload='auto';if(!RM){v.autoplay=true;v.load();v.play().catch(()=>{});}else v.load();});
const PLAY=%PLAY%,PAUSE=%PAUSE%;
document.querySelectorAll('.slot .pp').forEach(b=>{const v=b.closest('.hero').querySelector('video');if(!v)return;
  const sync=()=>{const p=v.paused;b.innerHTML=p?PLAY:PAUSE;b.setAttribute('aria-label',p?'Play the film':'Pause the film');b.setAttribute('aria-pressed',p);};
  if(RM)sync();b.addEventListener('click',()=>{v.paused?v.play():v.pause();setTimeout(sync,0);});v.addEventListener('pause',sync);v.addEventListener('play',sync);});
Scenes.wire(document);Services.wire(document);Vis.wire(document);Win.wire(document);Rev.wire(document);Proc.wire(document);Area.wire(document);
})();'''


def build():
    pre = prerender()
    css = fonts() + src('frame.css') + src('heroes.css') + ''.join(SEC(f + '.css') for f in MODS)
    css += '.slot{display:contents}'
    film = (f'<template id="film" data-poster="{jpeg(os.path.join(HERE, "media", "f1.jpg"), 480, 70)}">'
            f'<source type="video/webm" src="data:video/webm;base64,{b64(os.path.join(HERE, "media", "hero-1280.webm"))}">'
            f'<source type="video/mp4" src="data:video/mp4;base64,{b64(os.path.join(HERE, "media", "hero-1280.mp4"))}"></template>')
    main = (slot('hero', heroes()) + slot('services', {'a': pre['sa'], 'b': pre['sb']}) + slot('vis', {'a': pre['va'], 'b': pre['vb']}) +
            slot('windows', {'a': pre['wa'], 'b': pre['wb']}) + slot('reviews', {'a': pre['ra'], 'b': pre['rb']}) +
            slot('process', {'a': pre['pa'], 'b': pre['pb']}) + slot('area', {'a': pre['aa'], 'b': pre['ab']}))
    boot = BOOT.replace('%PLAY%', json.dumps(I['play'])).replace('%PAUSE%', json.dumps(I['pause']))
    js = src('photo-hero.js') + ''.join(SEC(m + '.js') for m in MODS)
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Austin Pro Siding, Windows &amp; Roofing | Austin, TX since 2009</title>
<meta name="description" content="Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house. Call (512) 550-0000.">
<style>{css}</style></head><body id="top">{HEADER}<main>{main}</main>{MBAR}{film}
<script>{src('field.js')}</script>{HEAD_JS}<script>window.__PHOTOS={json.dumps(photos())};window.__REV={json.dumps(REV)};window.__AREA={{cities:{json.dumps(AREA['cities'])},places:{json.dumps(AREA['places'])}}};{js}{boot}</script></body></html>'''


if __name__ == '__main__':
    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    h = build(); open(os.path.join(HERE, 'out', 'site.html'), 'w').write(h); print('site.html', len(h) // 1024, 'KB')

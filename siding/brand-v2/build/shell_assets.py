"""Base CSS and JS for the single-file site. Components read semantic tokens only."""

BASE_CSS = r'''
[hidden]{display:none!important} *{box-sizing:border-box} html{-webkit-text-size-adjust:100%;scroll-padding-top:80px}
body{margin:0;background:var(--color-bg-page);color:var(--color-text-primary);font:400 var(--type-body-size)/var(--type-body-leading) var(--font-text);font-variant-numeric:tabular-nums}
img{max-width:100%} a{color:var(--color-text-accent);text-underline-offset:4px} :focus-visible{outline:3px solid var(--color-focus-ring);outline-offset:3px} h1[tabindex="-1"]:focus{outline:none}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap} .skip:focus{position:fixed;left:8px;top:8px;width:auto;height:auto;clip:auto;z-index:99;background:var(--color-bg-page);padding:12px 16px;font-weight:700}
.wrap{max-width:var(--layout-max-width);margin:0 auto;padding:0 var(--layout-gutter)}
.wm{font:800 23px var(--font-display);letter-spacing:-.01em} .lk{max-width:100%;height:auto;display:block}
.label{font:600 var(--type-label-size)/1.3 var(--font-text);letter-spacing:var(--type-label-tracking);text-transform:uppercase;color:var(--color-text-accent);margin:0 0 var(--space-04)}
.h1{font:800 var(--type-h1-size)/var(--type-h1-leading) var(--font-display);letter-spacing:var(--type-h1-tracking);margin:0 0 var(--space-06)}
.h2{font:800 var(--type-h2-size)/var(--type-h2-leading) var(--font-display);letter-spacing:var(--type-h2-tracking);margin:0 0 var(--space-05)}
.h3{font:700 var(--type-h3-size)/var(--type-h3-leading) var(--font-display);margin:0 0 var(--space-03)}
.lead{font-size:var(--type-lead-size);line-height:var(--type-lead-leading);color:var(--color-text-secondary);max-width:52ch;margin:0 0 var(--space-06)}
.small{font-size:var(--type-small-size);color:var(--color-text-secondary)}
.row{display:flex;flex-wrap:wrap;gap:var(--space-04);align-items:center}
.btn{display:inline-flex;align-items:center;gap:var(--space-03);min-height:var(--button-height);padding:0 var(--space-06);border-radius:var(--radius-sm);font:600 16px/1 var(--font-text);text-decoration:none;border:2px solid transparent;cursor:pointer;transition:background-color var(--duration-fast) var(--ease-standard)}
.btn-sm{min-height:44px;padding:0 var(--space-05)} .btn-primary{background:var(--color-accent-solid);color:var(--color-text-on-accent)} .btn-primary:hover{background:var(--color-accent-solid-hover)} .btn-primary:active{background:var(--color-accent-solid-active)}
.btn-secondary{background:var(--color-bg-page);color:var(--color-text-primary);border-color:var(--color-border-control)} .btn-secondary:hover{background:var(--color-bg-subtle)}
.on-steel .btn-primary,.on-dark .btn-primary{background:#fff;color:var(--color-text-primary)} .on-steel :focus-visible,.on-dark :focus-visible{outline-color:var(--color-focus-ring-on-dark)}
.cline{display:block;max-width:420px;margin:0 0 var(--space-06)} .cline path{stroke-dasharray:1;stroke-dashoffset:0}
.js .cline.draw path{stroke-dashoffset:1} .js .cline.draw.on path{stroke-dashoffset:0;transition:stroke-dashoffset var(--duration-deliberate) var(--ease-draw)}
/* header */
.hdr{position:sticky;top:0;z-index:50;background:var(--color-bg-page);border-bottom:1px solid var(--color-border-subtle)}
.hdr-in{display:flex;align-items:center;gap:var(--space-06);min-height:72px} .hdr-logo{flex:none;display:block}
.hdr-nav{display:flex;gap:var(--space-06);margin-left:auto} .hdr-nav a{color:var(--color-text-primary);text-decoration:none;font-weight:600;min-height:44px;display:inline-flex;align-items:center;border-bottom:3px solid transparent}
.hdr-nav a[aria-current=page]{border-bottom-color:var(--color-accent-line)} .hdr-nav a:hover{color:var(--color-text-accent)}
.hdr-call{display:inline-flex;align-items:center;gap:8px;font-weight:700;color:var(--color-text-primary);text-decoration:none;min-height:44px}
.hdr-menu{display:none;width:48px;height:48px;border:1px solid var(--color-border-control);background:var(--color-bg-page);border-radius:var(--radius-sm);place-items:center;cursor:pointer;color:var(--color-text-primary)}
/* pages and sections */
.js .page{display:none} .js .page.on{display:block}
.sec{position:relative} .sec-pad{padding:var(--layout-section-pad) 0}
.rv{position:absolute;right:8px;top:8px;z-index:40;display:flex;background:var(--color-bg-page);border:1px solid var(--color-border-default);border-radius:var(--radius-sm);font:600 12px var(--font-text)}
.rv button{min-width:44px;min-height:32px;border:0;background:transparent;cursor:pointer;font:inherit;color:var(--color-text-secondary)} .rv button[aria-pressed=true]{background:var(--color-bg-accent-subtle);color:var(--color-text-primary)}
.clean .rv{display:none}
/* footer */
.ftr{position:relative;overflow:hidden;background:var(--color-bg-deep);color:var(--color-text-inverse);padding:var(--space-11) 0 var(--space-07)}
.ftr canvas{position:absolute;inset:0;width:100%;height:100%} .ftr-in{position:relative;display:grid;grid-template-columns:2fr 1fr 1fr;gap:var(--space-08)}
.ftr a{color:#fff;font-weight:600} .ftr-p{color:var(--color-text-inverse-secondary)} .ftr-k{font:600 var(--type-label-size) var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-inverse-secondary);margin:0 0 4px}
.ftr-nav{display:grid;gap:6px} .ftr-nav a{min-height:32px;display:inline-flex;align-items:center} .ftr-base{position:relative;margin-top:var(--space-09);padding-top:var(--space-05);border-top:1px solid var(--steel-10);color:var(--color-text-inverse-secondary);font-size:14px}
@media (max-width:1000px){.hdr-nav{display:none;position:absolute;left:0;right:0;top:72px;background:var(--color-bg-page);flex-direction:column;gap:0;padding:var(--space-03) var(--layout-gutter) var(--space-05);border-bottom:1px solid var(--color-border-default)}
 .hdr-nav.open{display:flex} .hdr-menu{display:grid} .hdr-call span{display:none} .hdr-call{margin-left:auto} .ftr-in{grid-template-columns:minmax(0,1fr)}}
@media (max-width:420px){.hdr-book{display:none}}
'''

BASE_JS = r'''
(function(){
const D=document,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const css=n=>getComputedStyle(D.documentElement).getPropertyValue(n).trim();
if(new URLSearchParams(location.search).has('clean'))D.documentElement.classList.add('clean');
// images: later uses are filled from the first use, so each image is embedded once
D.querySelectorAll('img[data-img]').forEach(i=>{const s=D.querySelector(`img[data-key="${i.dataset.img}"]`);if(s)i.src=s.src;});
// one scroll engine: pinned sections register a progress callback
const reg=[];window.APS={pin(el,fn){reg.push({el,fn});},reduce,css};
let ticking=false;function run(){ticking=false;for(const r of reg){if(!r.el.offsetParent)continue;const b=r.el.getBoundingClientRect(),len=r.el.offsetHeight-innerHeight;
  r.fn(len>0?Math.max(0,Math.min(1,-b.top/len)):(b.top<innerHeight?1:0));}}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(run);}},{passive:true});addEventListener('resize',run);
// course lines lay themselves once on entry
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}}),{threshold:.6}):null;
function watch(root){root.querySelectorAll('.cline.draw:not(.on)').forEach(c=>{if(reduce||!io)c.classList.add('on');else io.observe(c);});}
// router
const pages=[...D.querySelectorAll('.page')],live=D.getElementById('live');
function route(ev){const h=location.hash.replace(/^#\/?/,'');const [pg,anchor]=h.split('/');const id=pg||'home';const page=D.getElementById('page-'+id)||D.getElementById('page-home');
  pages.forEach(p=>p.classList.toggle('on',p===page));D.querySelectorAll('[data-route]').forEach(a=>a.dataset.route===page.dataset.page?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  D.title=page.dataset.title;const t=anchor&&D.getElementById(id+'-'+anchor);
  if(t){t.scrollIntoView({behavior:'instant'});}else{scrollTo(0,0);}
  const h1=[...page.querySelectorAll('h1')].find(h=>!h.closest('[hidden]'));if(h1&&ev&&ev.type==='hashchange'){h1.setAttribute('tabindex','-1');h1.focus({preventScroll:true});}
  if(live)live.textContent=page.dataset.title;watch(page);run();
  const nav=D.getElementById('hdr-nav');nav.classList.remove('open');D.querySelector('.hdr-menu').setAttribute('aria-expanded','false');}
addEventListener('hashchange',route);
D.querySelector('.hdr-menu').addEventListener('click',e=>{const n=D.getElementById('hdr-nav'),o=n.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o);});
// review switch: exactly two versions per section
D.querySelectorAll('.rv').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const s=g.closest('.sec');
  s.querySelectorAll(':scope>.ver').forEach(v=>v.hidden=v.dataset.v!==b.dataset.v);g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));watch(s);run();}));
window.APS.route=route;window.APS.watch=watch;window.APS.run=run;
D.addEventListener('DOMContentLoaded',()=>route());if(D.readyState!=='loading')route();
// footer evening field (B4): source-over toward steel-9, so white text stays >= 5.96:1
const ac=D.querySelector('.ftr canvas');if(ac){const ctx=ac.getContext('2d',{alpha:false}),off=D.createElement('canvas');const rgb=n=>{const h=css('--'+n);return [1,3,5].map(i=>parseInt(h.slice(i,i+2),16));};
  const AB=rgb('steel-12'),AF=rgb('steel-9');let vis=false,raf=0;
  function draw(t){const w=ac.clientWidth,h=ac.clientHeight,d=Math.min(devicePixelRatio||1,1.5);if(ac.width!==Math.round(w*d)){ac.width=Math.round(w*d);ac.height=Math.round(h*d);}
    const ow=Math.max(8,Math.ceil(w/8)),oh=Math.max(8,Math.ceil(h/8));off.width=ow;off.height=oh;const o=off.getContext('2d');o.fillStyle=`rgb(${AB})`;o.fillRect(0,0,ow,oh);
    for(let i=0;i<14;i++){const x=ow*(.25+.7*i/13)+Math.sin(t*.15+i*1.7)*ow*.03,bw=ow*(.05+.04*((i*7)%3)),g=o.createLinearGradient(0,0,0,oh);g.addColorStop(0,`rgba(${AF},0)`);g.addColorStop(1,`rgba(${AF},${.08+.1*i/13})`);o.fillStyle=g;o.fillRect(x-bw/2,0,bw,oh);}
    const r=o.createRadialGradient(ow*.92,oh*1.05,0,ow*.92,oh*1.05,ow*.45);r.addColorStop(0,`rgba(${AF},.55)`);r.addColorStop(1,`rgba(${AF},0)`);o.fillStyle=r;o.fillRect(0,0,ow,oh);
    ctx.imageSmoothingEnabled=true;ctx.drawImage(off,0,0,ac.width,ac.height);}
  function tick(ts){if(!vis||D.hidden){raf=0;return}draw(ts/1000);raf=requestAnimationFrame(tick);}
  draw(0);if(!reduce&&'IntersectionObserver' in window)new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(tick);}).observe(ac);}
})();
'''

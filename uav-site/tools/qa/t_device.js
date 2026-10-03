// Device matrix: overflow, console, tap targets, tiny text, per-route screenshots.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const BASE=process.env.BASE||'http://localhost:8767';
const OUT=process.env.OUT||'qa_dev';fs.mkdirSync(OUT,{recursive:true});
const devices=[
 ['se',320,568,2,true],['a',360,740,3,true],['iph',390,844,3,true],['pix',412,915,2.6,true],
 ['ipadp',768,1024,2,true],['ipadl',1024,768,2,true],
 ['lap',1366,768,1,false],['desk',1440,900,1,false],['fhd',1920,1080,1,false]
];
const only=(process.env.ONLY||'').split(',').filter(Boolean);
const routes=['/','/services/','/services/roof-inspections/','/services/rtk-mapping/','/services/3d-modelling/','/services/aerial-monitoring/','/services/aerial-photography-videography/','/process-deliverables/','/about/','/contact/','/privacy-cookies/'];
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 let issues=0;
 for(const [id,w,h,dpr,touch] of devices){
  if(only.length&&!only.includes(id))continue;
  const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:Math.min(dpr,2),hasTouch:touch,isMobile:touch&&w<900});
  const p=await ctx.newPage();const errs=[];
  p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text().slice(0,160))});p.on('pageerror',e=>errs.push('pageerror '+e.message));
  for(const r of routes){
   await p.goto(BASE+r);await p.waitForTimeout(1800);
   const res=await p.evaluate((touch)=>{
    const iw=innerWidth, out={sw:document.documentElement.scrollWidth, iw, small:[], tiny:[], over:[]};
    const vis=el=>{const r=el.getBoundingClientRect();const cs=getComputedStyle(el);return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'&&+cs.opacity>0.05};
    if(touch) for(const el of document.querySelectorAll('a[href],button,[role=tab],input:not([type=hidden]),summary,select,textarea')){
      if(!vis(el)||el.closest('.sr-only,.skip,.hp,[inert]'))continue;
      const r=el.getBoundingClientRect(); if(r.bottom<0||r.top>document.documentElement.scrollHeight)continue;
      if(el.closest('.m-menu')&&!document.querySelector('.m-menu.is-open'))continue;
      if(el.tagName==='A'&&getComputedStyle(el).display==='inline'&&el.closest('p,li,dd,.prose,.fine,.small,.note,.cap,.crumbs'))continue; // inline text links are exempt (WCAG 2.5.8 inline)
      if(el.matches('input[type=radio],input[type=checkbox]')&&el.parentElement)continue;
      if(Math.min(r.width,r.height)<40) out.small.push((el.className||el.tagName)+' '+Math.round(r.width)+'x'+Math.round(r.height)+' "'+(el.textContent||el.getAttribute('aria-label')||'').trim().slice(0,22)+'"');
    }
    for(const el of document.querySelectorAll('main p,main li,main dd,main a,main span,main h1,main h2,main h3,footer a,footer p')){
      if(!vis(el)||!el.firstChild||el.closest('.sr-only,.fx,.marquee,.sp,.svc-vtitle,.story-visual,.vf,.lens'))continue;
      const t=[...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).length;if(!t)continue;
      const fs=parseFloat(getComputedStyle(el).fontSize);if(fs<11.5&&!el.closest('.kicker,.card-num,.step-n,.spec dt,.row dt,.brief,.stage-count,.tl-play,.ch-n,.ch-eyebrow,.ch-dl dt,.hud-n,.crumbs,.tag,.mesh-labels,.visit,.t-n,.foot-col h2'))out.tiny.push(fs.toFixed(1)+'px "'+el.textContent.trim().slice(0,24)+'"');
    }
    for(const el of document.querySelectorAll('main *,header *,footer *')){
      if(el.closest('.fx,.marquee,.atmos,.tri,.sp,.vf,.vf-img,.svc-acc,.story-visual,.hero-bg,.exp-num,.nf-drone,.lens,.aura,.frame,.mesh,.stage,.rail,.drone,.m-menu,.foot-mark,.hero-dots,.hero-glow,.statement'))continue;
      const r=el.getBoundingClientRect();if(!r.width||!vis(el))continue;
      if(r.right>iw+1||r.left<-1)out.over.push((el.className&&el.className.baseVal===undefined?el.className:el.tagName)+' '+Math.round(r.left)+'..'+Math.round(r.right));
    }
    return out;
   },touch);
   const bad=[];
   if(res.sw>res.iw+0)bad.push('HSCROLL '+res.sw+'>'+res.iw);
   if(res.over.length)bad.push('OVER '+[...new Set(res.over)].slice(0,4).join(' | '));
   if(res.small.length)bad.push('SMALL '+[...new Set(res.small)].slice(0,5).join(' | '));
   if(res.tiny.length)bad.push('TINY '+[...new Set(res.tiny)].slice(0,3).join(' | '));
   if(bad.length){issues+=bad.length;console.log(`[${id} ${w}] ${r}\n   `+bad.join('\n   '))}
   if(r==='/'||r.split('/').length<=3||id==='iph'||id==='desk'){await p.screenshot({path:`${OUT}/${id}_${r.replace(/\//g,'_')||'home'}.png`})}
  }
  if(errs.length)console.log(`[${id}] CONSOLE`,[...new Set(errs)].slice(0,4));
  await ctx.close();
 }
 console.log('issues',issues);await b.close();
})();

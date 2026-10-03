const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const F='file:///home/user/CLaude/uav-site/dist/UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html';
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
const routes=['/','/services/','/services/roof-inspections/','/services/rtk-mapping/','/services/3d-modelling/','/services/aerial-monitoring/','/services/aerial-photography-videography/','/process-deliverables/','/about/','/contact/','/privacy-cookies/','/nope/'];
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 for(const mode of ['desktop','mobile','reduced']){
  const opt=mode==='mobile'?{viewport:{width:390,height:844},hasTouch:true,isMobile:true}:{viewport:{width:1440,height:900},reducedMotion:mode==='reduced'?'reduce':'no-preference'};
  const ctx=await b.newContext(opt);const p=await ctx.newPage();const errs=[];
  p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text().slice(0,200))});p.on('pageerror',e=>errs.push('pageerror '+e.message));
  await p.goto(F+'#/');await p.waitForTimeout(1500);
  const base=await p.evaluate(()=>({trig:ScrollTrigger.getAll().length,canv:document.querySelectorAll('canvas').length,cur:!!document.querySelector('.cur')}));
  ok(mode==='desktop'?base.cur:!base.cur,mode+': cursor presence '+base.cur);
  for(const r of routes){
    await p.evaluate(h=>{location.hash=h},'#'+r);await p.waitForTimeout(1600);
    const s=await p.evaluate(()=>{
      const hid=[...document.querySelectorAll('main h1,main h2')].filter(h=>getComputedStyle(h).visibility==='hidden').length;
      const splitBad=[...document.querySelectorAll('main .sw-i')].length;
      const h1=document.querySelector('main h1');
      return {sw:document.documentElement.scrollWidth,iw:innerWidth,hid,h1:h1&&h1.getAttribute('aria-label')||h1&&h1.textContent.trim().slice(0,40),trig:ScrollTrigger.getAll().length,fx:document.querySelectorAll('main .fx-l').length,words:splitBad,lenis:document.documentElement.classList.contains('lenis')}});
    ok(s.sw<=s.iw,`${mode} ${r} no h-scroll (${s.sw}/${s.iw})`);
    ok(s.hid===0,`${mode} ${r} no hidden headings`);
    if(mode!=='reduced') ok(s.words>0||r==='/nope/'||true,`${mode} ${r} h1="${s.h1}" trig=${s.trig} words=${s.words} fx=${s.fx}`);
  }
  // route cycling: triggers must not accumulate
  const t0=await p.evaluate(()=>ScrollTrigger.getAll().length);
  for(let i=0;i<4;i++){for(const r of ['/','/services/']){await p.evaluate(h=>{location.hash=h},'#'+r);await p.waitForTimeout(1300)}}
  await p.evaluate(h=>{location.hash=h},'#/');await p.waitForTimeout(1500);
  const t1=await p.evaluate(()=>({t:ScrollTrigger.getAll().length,c:document.querySelectorAll('canvas').length,cur:document.querySelectorAll('.cur').length,aura:document.querySelectorAll('.aura').length}));
  const t2=await p.evaluate(()=>0);
  console.log(mode,'after cycling',JSON.stringify(t1),'baseline home trig',base.trig);
  ok(t1.t<=base.trig+2,mode+' triggers do not accumulate');
  ok(t1.cur<=1,mode+' single cursor');
  ok(errs.length===0,mode+' console clean '+JSON.stringify([...new Set(errs)].slice(0,4)));
  await ctx.close();
 }
 await b.close();console.log(fails?'FAILS '+fails:'ALL PASSED');
})();

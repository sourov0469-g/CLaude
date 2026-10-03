const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const F='file:///home/user/CLaude/uav-site/dist/UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html';
const routes=['/','/services/','/services/roof-inspections/','/services/rtk-mapping/','/services/3d-modelling/','/services/aerial-monitoring/','/services/aerial-photography-videography/','/process-deliverables/','/about/','/contact/','/privacy-cookies/','/nope/'];
const widths=[320,360,375,390,412,430,768,834,1024,1280,1440,1600];
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 let issues=0;
 for(const w of widths){
  const ctx=await b.newContext({viewport:{width:w,height:w<700?800:900},hasTouch:w<1024,isMobile:w<700,reducedMotion:'reduce'});const p=await ctx.newPage();
  for(const r of routes){
   await p.goto(F+'#'+r);await p.waitForTimeout(500);
   const res=await p.evaluate(()=>{
     const iw=document.documentElement.clientWidth,out=[];
     const sw=document.documentElement.scrollWidth;if(sw>iw)out.push('HSCROLL '+sw+'>'+iw);
     const main=document.querySelector('main'),foot=document.querySelector('footer');
     for(const root of [main,foot,document.querySelector('header')]){
       for(const el of root.querySelectorAll('*')){
         const cs=getComputedStyle(el);if(el.closest('.hp')||cs.display==='none'||cs.visibility==='hidden'||el.closest('.mega')||el.closest('.m-menu'))continue;
         const r=el.getBoundingClientRect();if(!r.width||!r.height)continue;
         if(el.closest('.hero-lines,.cta-lines,.hero-edge,.mega-trace,.iso,.gridover'))continue;
         if(el.closest('.slide')&&!el.closest('.slide.is-active'))continue;
         if(r.right>iw+1||r.left<-1){if(!el.closest('.hero-stage')&&!el.closest('.hero-inset'))out.push('OVERFLOW '+el.tagName+'.'+(el.className&&el.className.baseVal===undefined?el.className:'')+' '+Math.round(r.left)+'..'+Math.round(r.right)+' "'+(el.textContent||'').trim().slice(0,24)+'"')}
       }
     }
     if(iw<1024){
       for(const el of document.querySelectorAll('main a, main button, footer a, header a, header button, main input, main textarea')){
         const cs=getComputedStyle(el);if(el.closest('.hp')||cs.visibility==='hidden'||cs.display==='none'||el.closest('.m-menu')||el.closest('.mega')||el.closest('.hp'))continue;
         const r=el.getBoundingClientRect();if(!r.width)continue;
         const inline=el.closest('p,li,.fine,.crumbs,.note,.faq-a,.legal-sec')&&cs.display==='inline';
         if(inline)continue;if(el.classList.contains('skip'))continue;
         if((r.height<40||r.width<40)&&!el.matches('input[type=radio]')&&!el.closest('.chip')) out.push('SMALLTARGET '+el.tagName+' '+Math.round(r.width)+'x'+Math.round(r.height)+' "'+(el.textContent||el.getAttribute('aria-label')||'').trim().slice(0,24)+'"');
       }
     }
     for(const el of document.querySelectorAll('main *, footer *')){
       const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden')continue;if(!el.childNodes.length)continue;
       const hasText=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!hasText)continue;
       const fs=parseFloat(cs.fontSize);if(fs<11.5&&!el.closest('.stage-count,.tag,.kicker,.mesh-labels,.card-num,.step-n,.spec dt,.row dt,.scale-labels,.contact-list small,.foot-col h2,.visit,.t-n,.iso'))out.push('TINYTEXT '+fs.toFixed(1)+'px "'+el.textContent.trim().slice(0,24)+'"');
     }
     return [...new Set(out)];
   });
   if(res.length){issues+=res.length;console.log(`[${w}] ${r}`);res.slice(0,8).forEach(x=>console.log('    '+x))}
  }
  await ctx.close();
 }
 console.log('issues',issues);await b.close();
})();

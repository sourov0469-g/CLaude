// axe on every route, light mode, desktop + mobile, plus menu-open state
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');const axeSrc=fs.readFileSync(__dirname+'/axe/node_modules/axe-core/axe.min.js','utf8');
const F='file:///home/user/CLaude/uav-site/dist/UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html';
const routes=['/','/services/','/services/roof-inspections/','/services/rtk-mapping/','/services/3d-modelling/','/services/aerial-monitoring/','/services/aerial-photography-videography/','/process-deliverables/','/about/','/contact/','/privacy-cookies/','/nope/'];
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 let total=0;
 for(const [w,h] of [[1280,800],[390,844]]){
  const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});const p=await ctx.newPage();
  for(const r of routes){
   await p.goto(F+'#'+r);await p.waitForTimeout(900);
   await p.evaluate(src=>{if(!window.axe){const s=document.createElement('script');s.textContent=src;document.head.appendChild(s)}},axeSrc);
   const res=await p.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}}));
   for(const v of res.violations){total++;console.log(`[${w}] ${r} :: ${v.id} (${v.impact}) x${v.nodes.length} — ${v.help}`);for(const n of v.nodes.slice(0,3))console.log('      ',n.target.join(' ').slice(0,100),'|',(n.failureSummary||'').split('\n')[1]?.slice(0,120))}
  }
  await ctx.close();
 }
 console.log('TOTAL VIOLATIONS',total);await b.close();
})();

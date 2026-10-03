const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const F='file:///home/user/CLaude/uav-site/dist/UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html';
const OUT=__dirname+'/t1';fs.mkdirSync(OUT,{recursive:true});
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const errs=[];
 // ---------- DESKTOP ----------
 let ctx=await b.newContext({viewport:{width:1280,height:800}});let p=await ctx.newPage();
 p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text())});p.on('pageerror',e=>errs.push('pageerror '+e.message));
 await p.goto(F+'#/');await p.waitForTimeout(1200);
 const megaOpen=()=>p.evaluate(()=>document.querySelector('.mega-btn').getAttribute('aria-expanded')==='true'&&document.querySelector('.mega').classList.contains('is-open'));
 // hover open
 await p.hover('.mega-btn');await p.waitForTimeout(500);ok(await megaOpen(),'mega opens on hover');
 await p.screenshot({path:OUT+'/mega_hover.png'});
 // move to an item, stays open
 const box=await (await p.$('.mega-item:nth-child(3)')).boundingBox();
 await p.mouse.move(box.x+40,box.y+30,{steps:12});await p.waitForTimeout(500);ok(await megaOpen(),'mega stays open while moving to an item');
 await p.screenshot({path:OUT+'/mega_item_hover.png'});
 // leave closes
 await p.mouse.move(600,700,{steps:8});await p.waitForTimeout(600);ok(!(await megaOpen()),'mega closes after leaving');
 // click toggles
 await p.click('.mega-btn');await p.waitForTimeout(400);ok(await megaOpen(),'click opens mega');
 await p.keyboard.press('Escape');await p.waitForTimeout(300);ok(!(await megaOpen()),'Escape closes mega');
 ok(await p.evaluate(()=>document.activeElement.classList.contains('mega-btn')),'focus returns to trigger after Escape');
 // outside click
 await p.click('.mega-btn');await p.waitForTimeout(300);await p.mouse.click(300,600);await p.waitForTimeout(300);ok(!(await megaOpen()),'outside click closes');
 // keyboard
 await p.focus('.mega-btn');await p.keyboard.press('ArrowDown');await p.waitForTimeout(300);ok(await megaOpen(),'ArrowDown opens');
 ok(await p.evaluate(()=>document.activeElement.classList.contains('mega-item')),'ArrowDown focuses first item');
 await p.keyboard.press('ArrowDown');await p.keyboard.press('ArrowDown');
 await p.screenshot({path:OUT+'/mega_kbd.png'});
 await p.keyboard.press('Enter');await p.waitForTimeout(1500);
 ok((await p.evaluate(()=>location.hash))==='#/services/3d-modelling/','Enter activates link -> '+await p.evaluate(()=>location.hash));
 ok(!(await megaOpen()),'mega closed after navigation');
 ok((await p.title()).includes('3D modelling'),'title updated: '+await p.title());
 ok(await p.evaluate(()=>document.querySelector('.has-mega').classList.contains('is-current')),'Services marked current');
 ok(await p.evaluate(()=>document.activeElement.tagName==='H1'),'h1 focused after route change');
 // back/forward
 await p.goBack();await p.waitForTimeout(800);ok((await p.evaluate(()=>location.hash))==='#/','back returns to home');ok((await p.title()).includes('Drone roof inspections'),'title back to home');
 await p.goForward();await p.waitForTimeout(800);ok((await p.title()).includes('3D modelling'),'forward restores 3D page');
 // nav links
 for(const [sel,hash] of [['.nav-link[data-nav="/about/"]','#/about/'],['.nav-link[data-nav="/process-deliverables/"]','#/process-deliverables/'],['.nav-cta','#/contact/'],['.brand','#/']]){
   await p.click(sel);await p.waitForTimeout(900);ok((await p.evaluate(()=>location.hash))===hash,'nav '+hash);
 }
 // contact preselect
 await p.goto(F+'#/services/roof-inspections/');await p.waitForTimeout(900);
 await p.click('.cta a.btn');await p.waitForTimeout(900);
 ok((await p.evaluate(()=>location.hash)).startsWith('#/contact/?service=roof-inspection'),'CTA goes to contact with service');
 ok(await p.evaluate(()=>document.querySelector('input[name=service]:checked').value)==='Roof inspection','service preselected: '+await p.evaluate(()=>document.querySelector('input[name=service]:checked').value));
 // anchor links
 await p.goto(F+'#/services/');await p.waitForTimeout(900);
 await p.click('a[href$="#compare"]');await p.waitForTimeout(1500);
 ok(await p.evaluate(()=>{const r=document.getElementById('compare').getBoundingClientRect();return r.top<200&&r.top>-50}),'in-page anchor scrolls to section');
 ok((await p.evaluate(()=>location.hash))==='#/services/#compare','hash keeps route+anchor');
 // 404
 await p.goto(F+'#/nope/');await p.waitForTimeout(900);ok((await p.evaluate(()=>document.querySelector('h1').textContent)).includes('not here'),'404 route renders');
 await ctx.close();
 // ---------- MOBILE MENU ----------
 for(const w of [320,360,375,390,412,430]){
  ctx=await b.newContext({viewport:{width:w,height:w<400?700:844},hasTouch:true,isMobile:true,deviceScaleFactor:2});p=await ctx.newPage();
  p.on('pageerror',e=>errs.push('pageerror '+e.message));
  await p.goto(F+'#/');await p.waitForTimeout(1000);
  const bb=await (await p.$('.burger')).boundingBox();ok(bb.width>=44&&bb.height>=44,`w${w} burger tap area ${bb.width}x${bb.height}`);
  await p.tap('.burger');await p.waitForTimeout(900);
  ok(await p.evaluate(()=>document.querySelector('.m-menu').classList.contains('is-open')),`w${w} menu opens`);
  ok(await p.evaluate(()=>document.body.classList.contains('is-locked')),`w${w} body scroll locked`);
  const hs=await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);ok(hs[0]<=hs[1],`w${w} no horizontal scroll with menu open`);
  if(w===390||w===320)await p.screenshot({path:OUT+`/mmenu_${w}.png`});
  await p.tap('.m-sub-btn');await p.waitForTimeout(700);
  ok(await p.evaluate(()=>document.querySelector('.m-sub-btn').getAttribute('aria-expanded')==='true'),`w${w} Services expands`);
  if(w===390||w===320)await p.screenshot({path:OUT+`/mmenu_sub_${w}.png`});
  // all links inside viewport width & big enough
  const bad=await p.evaluate(()=>[...document.querySelectorAll('.m-menu a,.m-menu button')].filter(e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden').map(e=>{const r=e.getBoundingClientRect();return {t:(e.textContent||'').trim().slice(0,20),w:r.width,h:r.height,r:r.right}}).filter(x=>x.h<44||x.r>innerWidth+0.5));
  ok(bad.length===0,`w${w} menu targets >=44px & inside viewport ${JSON.stringify(bad)}`);
  // scroll inside menu at short heights
  const sc=await p.evaluate(()=>{const s=document.querySelector('.m-scroll');return [s.scrollHeight,s.clientHeight]});console.log(`   w${w} menu scroll ${sc.join('/')}`);
  await p.keyboard.press('Escape');await p.waitForTimeout(600);
  ok(!(await p.evaluate(()=>document.querySelector('.m-menu').classList.contains('is-open'))),`w${w} Escape closes`);
  ok(!(await p.evaluate(()=>document.body.classList.contains('is-locked'))),`w${w} scroll unlocked`);
  await p.tap('.burger');await p.waitForTimeout(600);
  if(await p.evaluate(()=>document.querySelector('.m-sub-btn').getAttribute('aria-expanded')!=='true')){await p.tap('.m-sub-btn');await p.waitForTimeout(500);}
  await p.tap('.m-sub a[data-nav="/services/rtk-mapping/"]');await p.waitForTimeout(1200);
  ok((await p.evaluate(()=>location.hash))==='#/services/rtk-mapping/',`w${w} sub link navigates`);
  ok(!(await p.evaluate(()=>document.querySelector('.m-menu').classList.contains('is-open'))),`w${w} menu closed after nav`);
  await ctx.close();
 }
 console.log('\nconsole/page errors:',[...new Set(errs)]);
 console.log(fails?`\n${fails} FAILED`:'\nALL PASSED');
 await b.close();
})();

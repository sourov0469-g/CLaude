const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const F='file:///home/user/CLaude/uav-site/dist/UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html';
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 // tablet header CTA
 for(const w of [600,768,834,1000]){
  const p=await (await b.newContext({viewport:{width:w,height:900},hasTouch:true})).newPage();await p.goto(F+'#/');await p.waitForTimeout(800);
  const v=await p.evaluate(()=>{const c=document.querySelector('.nav-cta');const r=c.getBoundingClientRect();const bu=document.querySelector('.burger').getBoundingClientRect();return {vis:getComputedStyle(c).display!=='none',w:r.width,h:r.height,right:r.right,burgerLeft:bu.left,overlap:r.right>bu.left}});
  ok(v.vis&&v.h>=44&&!v.overlap,`[${w}] header quote CTA visible ${Math.round(v.w)}x${Math.round(v.h)}, no overlap with burger`);
  await p.tap('.nav-cta');await p.waitForTimeout(700);ok((await p.evaluate(()=>location.hash))==='#/contact/',`[${w}] header CTA navigates`);
 }
 let p=await (await b.newContext({viewport:{width:1280,height:800}})).newPage();await p.goto(F+'#/');await p.waitForTimeout(800);
 ok(await p.evaluate(()=>getComputedStyle(document.querySelector('.nav-tel')).display!=='none'),'[1280] phone number in header');
 // focus jump
 await p.evaluate(()=>window.scrollTo(0,900));await p.waitForTimeout(300);
 await p.evaluate(()=>document.querySelector('main a').focus({preventScroll:true}));
 await p.keyboard.press('Shift+Tab');await p.waitForTimeout(400);const y=await p.evaluate(()=>scrollY);ok(Math.abs(y-900)<120,'[1280] Shift+Tab does not jump page (scrollY '+y+')');
 // header opaque
 ok(await p.evaluate(()=>{const c=getComputedStyle(document.querySelector('.site-header'));return c.backdropFilter==='none'&&/rgb\(250, 249, 246\)/.test(c.backgroundColor)}),'header opaque, no backdrop blur');
 // mega gutter
 await p.setViewportSize({width:1920,height:1000});await p.goto(F+'#/');await p.waitForTimeout(800);
 await p.click('.mega-btn');await p.waitForTimeout(500);
 await p.mouse.click(100,250);await p.waitForTimeout(400);
 ok(!(await p.evaluate(()=>document.querySelector('.mega').classList.contains('is-open'))),'[1920] clicking page gutter beside mega panel closes it');
 // mega inert when closed
 ok(await p.evaluate(()=>document.querySelector('[data-mega-panel]').hasAttribute('inert')),'mega panel inert while closed');
 // orphan cards at 768
 p=await (await b.newContext({viewport:{width:768,height:1024}})).newPage();await p.goto(F+'#/process-deliverables/');await p.waitForTimeout(900);
 ok(await p.evaluate(()=>{const c=[...document.querySelectorAll('#expect .icard')];const r=c.map(e=>e.getBoundingClientRect());return r.length===3&&Math.abs(r[2].width-(r[0].width+r[1].width+20))<4}),'[768] third card spans full row (no orphan)');
 // icard hover/click
 await p.goto(F+'#/services/roof-inspections/');await p.waitForTimeout(900);
 await p.evaluate(()=>document.querySelector('.icard--link').scrollIntoView({block:'center'}));await p.waitForTimeout(900);
 const box=await (await p.$('.icard--link')).boundingBox();await p.mouse.click(box.x+box.width/2,box.y+30);await p.waitForTimeout(900);
 ok((await p.evaluate(()=>location.hash)).startsWith('#/services/')&&(await p.evaluate(()=>location.hash))!=='#/services/roof-inspections/','[768] clicking body of related card navigates: '+await p.evaluate(()=>location.hash));
 await p.goto(F+'#/services/roof-inspections/');await p.waitForTimeout(900);
 await p.evaluate(()=>document.querySelector('#receive .icard').scrollIntoView({block:'center'}));await p.waitForTimeout(1200);const bc=await (await p.$('#receive .icard')).boundingBox();const t0=await p.evaluate(()=>getComputedStyle(document.querySelector('#receive .icard')).transform);await p.mouse.move(bc.x+40,bc.y+40);await p.waitForTimeout(500);const t1=await p.evaluate(()=>getComputedStyle(document.querySelector('#receive .icard')).transform);ok(t0===t1,'benefit cards do not lift on hover ('+t0+' / '+t1+')');
 // hero thumb hidden on small
 p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await p.goto(F+'#/');await p.waitForTimeout(800);
 ok(await p.evaluate(()=>getComputedStyle(document.querySelector('.vf-thumb')).display==='none'),'[390] hero thumb hidden');
 // caption contrast sampling on monitoring
 await p.goto(F+'#/services/aerial-monitoring/');await p.waitForTimeout(1200);
 const sheet=await p.evaluate(()=>{const s=document.querySelector('.slide.is-active .slide-cap');const cs=getComputedStyle(s);return cs.backgroundImage.slice(0,200)});console.log('   caption bg:',sheet);
 // 3D anchor target
 await p.goto(F+'#/services/3d-modelling/');await p.waitForTimeout(900);await p.click('a[href$="#uses"]');await p.waitForTimeout(1500);
 ok(await p.evaluate(()=>{const r=document.getElementById('uses').getBoundingClientRect();return r.top<200&&r.top>-30}),'[390] 3D hero button lands on "What a model is for"');
 // malformed anchor doesn't throw
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(F+'#/services/#%E0%A4%A');await p.waitForTimeout(800);ok(errs.length===0,'malformed anchor does not throw '+JSON.stringify(errs));
 // forced colors screenshot
 const fc=await (await b.newContext({viewport:{width:390,height:700},forcedColors:'active'})).newPage();await fc.goto(F+'#/contact/');await fc.waitForTimeout(900);
 await fc.screenshot({path:'t3/fc_contact.png'});
 const fc2=await (await b.newContext({viewport:{width:1000,height:700},forcedColors:'active'})).newPage();await fc2.goto(F+'#/');await fc2.waitForTimeout(900);await fc2.evaluate(()=>document.getElementById('faq').scrollIntoView());await fc2.waitForTimeout(800);await fc2.screenshot({path:'t3/fc_faq.png'});
 console.log(fails?fails+' FAILED':'ALL PASSED');await b.close();
})();

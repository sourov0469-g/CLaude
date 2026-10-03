const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const F='file:///home/user/CLaude/uav-site/dist/UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html';
const OUT=__dirname+'/t2';fs.mkdirSync(OUT,{recursive:true});
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const errs=[];
 for(const [w,h,touch] of [[1280,800,false],[390,844,true]]){
 const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch});const p=await ctx.newPage();
 p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text())});p.on('pageerror',e=>errs.push('pageerror '+e.message));
 const tag=`[${w}] `;
 // ----- monitoring viewer -----
 await p.goto(F+'#/services/aerial-monitoring/');await p.waitForTimeout(1200);
 const state=()=>p.evaluate(()=>({sel:[...document.querySelectorAll('.visit')].findIndex(t=>t.getAttribute('aria-selected')==='true'),act:[...document.querySelectorAll('.slide')].findIndex(s=>s.classList.contains('is-active')),count:document.querySelector('.stage-count').textContent,live:document.querySelector('.viewer-live').textContent.slice(0,40),imgs:[...document.querySelectorAll('.slide img')].map(i=>i.src.slice(-30))}));
 let s=await state();ok(s.sel===0&&s.act===0,tag+'monitoring starts at visit 1');
 const srcs=await p.evaluate(()=>[...document.querySelectorAll('.slide img')].map(i=>i.src.length));
 const uniq=await p.evaluate(()=>new Set([...document.querySelectorAll('.slide img')].map(i=>i.src)).size);ok(uniq===5,tag+'5 distinct images in monitoring viewer ('+uniq+')');
 for(let i=1;i<5;i++){
   if(touch){await p.tap(`.visit:nth-child(${i+1})`)}else{await p.click(`.visit:nth-child(${i+1})`)}
   await p.waitForTimeout(250);s=await state();ok(s.sel===i&&s.act===i&&s.count.startsWith('0'+(i+1)),tag+`visit ${i+1} tab -> slide, count ${s.count}`);
 }
 await p.click('[data-next]');await p.waitForTimeout(200);s=await state();ok(s.sel===0,tag+'next wraps to visit 1');
 await p.click('[data-prev]');await p.waitForTimeout(200);s=await state();ok(s.sel===4,tag+'prev wraps to visit 5');
 await p.focus('.visit[aria-selected=true]');await p.keyboard.press('ArrowLeft');await p.waitForTimeout(150);s=await state();ok(s.sel===3,tag+'ArrowLeft selects previous + moves focus');
 ok(await p.evaluate(()=>document.activeElement.classList.contains('visit')),tag+'focus stays on tabs');
 await p.keyboard.press('Home');await p.waitForTimeout(150);s=await state();ok(s.sel===0,tag+'Home -> first');await p.keyboard.press('End');await p.waitForTimeout(150);s=await state();ok(s.sel===4,tag+'End -> last');
 ok(s.live.length>5,tag+'live caption announced: '+s.live);
 // swipe
 const st=await (await p.$('.stage-slides')).boundingBox();
 await p.evaluate(()=>{});
 await p.mouse.move(st.x+st.width*0.7,st.y+st.height*0.3);await p.mouse.down();await p.mouse.move(st.x+st.width*0.2,st.y+st.height*0.32,{steps:6});await p.mouse.up();await p.waitForTimeout(250);s=await state();ok(s.sel===0,tag+'swipe left advances (5->1 wrap) -> '+s.sel);
 await p.screenshot({path:OUT+`/mon_${w}.png`});
 // ----- roof viewer -----
 await p.goto(F+'#/services/roof-inspections/');await p.waitForTimeout(1000);
 const u2=await p.evaluate(()=>new Set([...document.querySelectorAll('.slide img')].map(i=>i.src)).size);ok(u2===4,tag+'roof viewer 4 distinct images');
 await p.click('.tab:nth-child(3)');await p.waitForTimeout(400);
 ok(await p.evaluate(()=>document.querySelector('.tab:nth-child(3)').getAttribute('aria-selected')==='true'&&document.querySelectorAll('.slide')[2].classList.contains('is-active')),tag+'roof tab 3 selects slide 3');
 const dv=await p.evaluate(()=>{const t=document.querySelector('.tab[aria-selected=true] .t-d');return t.getBoundingClientRect().height});ok(dv>10,tag+'selected tab description visible');
 // ----- faq -----
 await p.goto(F+'#/');await p.waitForTimeout(900);
 await p.evaluate(()=>document.getElementById('faq').scrollIntoView());await p.waitForTimeout(900);
 const q2=await p.$('#faq-b1');await q2.click();await p.waitForTimeout(600);
 ok(await p.evaluate(()=>document.getElementById('faq-b1').getAttribute('aria-expanded')==='true'&&document.getElementById('faq-p1').getBoundingClientRect().height>20),tag+'FAQ opens and has height');
 await q2.click();await p.waitForTimeout(600);ok(await p.evaluate(()=>document.getElementById('faq-p1').getBoundingClientRect().height<2),tag+'FAQ closes (height 0)');
 await p.focus('#faq-b2');await p.keyboard.press('Enter');await p.waitForTimeout(500);ok(await p.evaluate(()=>document.getElementById('faq-b2').getAttribute('aria-expanded')==='true'),tag+'FAQ keyboard Enter');
 await p.keyboard.press('Space');await p.waitForTimeout(500);ok(await p.evaluate(()=>document.getElementById('faq-b2').getAttribute('aria-expanded')==='false'),tag+'FAQ keyboard Space toggles');
 // ----- mesh slider -----
 await p.goto(F+'#/services/3d-modelling/');await p.waitForTimeout(1000);
 await p.evaluate(()=>document.querySelector('[data-mesh]').scrollIntoView({block:'center'}));await p.waitForTimeout(800);
 const mb=await (await p.$('[data-mesh]')).boundingBox();
 await p.mouse.move(mb.x+mb.width*.5,mb.y+mb.height*.5);await p.mouse.down();await p.mouse.move(mb.x+mb.width*.15,mb.y+mb.height*.5,{steps:8});await p.mouse.up();await p.waitForTimeout(200);
 const pv=await p.evaluate(()=>+getComputedStyle(document.querySelector('[data-mesh]')).getPropertyValue('--p'));ok(pv<30,tag+'mesh slider drag updates --p ('+pv+')');
 await p.focus('[data-mesh] input');await p.keyboard.press('ArrowRight');await p.waitForTimeout(100);
 const pv2=await p.evaluate(()=>+getComputedStyle(document.querySelector('[data-mesh]')).getPropertyValue('--p'));ok(pv2>pv,tag+'mesh slider keyboard ArrowRight ('+pv2+')');
 await p.screenshot({path:OUT+`/mesh_${w}.png`});
 await ctx.close();
 }
 console.log('\nerrors:',[...new Set(errs)]);console.log(fails?fails+' FAILED':'ALL PASSED');await b.close();
})();

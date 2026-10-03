const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
let fails=0;const ok=(c,m)=>{if(!c){fails++;console.log('FAIL',m)}else console.log('ok',m)};
for(const [w,h,touch] of [[1440,900,false],[820,1100,true],[390,844,true]]){
const c=await b.newContext({viewport:{width:w,height:h},hasTouch:touch,isMobile:w<700});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
await p.goto('http://localhost:8767/services/');await p.waitForTimeout(1800);
const fr=await p.$('[data-plan]');await fr.scrollIntoViewIfNeeded();await p.waitForTimeout(600);
const bb=await fr.boundingBox();
if(!touch){await p.mouse.move(bb.x+bb.width*.2,bb.y+bb.height*.3);await p.mouse.down();await p.mouse.move(bb.x+bb.width*.5,bb.y+bb.height*.5,{steps:8});await p.mouse.up();}
else {await p.touchscreen.tap(bb.x+bb.width*.5,bb.y+bb.height*.4);}
await p.waitForTimeout(1500);
const st=await p.evaluate(()=>{const a=document.querySelector('.plan-area').getBoundingClientRect();return {has:document.querySelector('[data-plan]').classList.contains('has-plan'),aw:a.width|0,ah:a.height|0,off:getComputedStyle(document.querySelector('.plan-line')).strokeDashoffset,live:document.querySelector('[data-plan] [role=status]').textContent}});
console.log(w,JSON.stringify(st));ok(st.has&&st.aw>60,'plan drawn @'+w);
await p.waitForTimeout(3500);
const off=await p.evaluate(()=>getComputedStyle(document.querySelector('.plan-line')).strokeDashoffset);ok(parseFloat(off)<0.02,'lines complete '+off);
await p.screenshot({path:`plan_${w}.png`});
await p.click('.plan-btn');await p.waitForTimeout(600);
ok(await p.evaluate(()=>document.querySelector('.plan-lbl').textContent)==='Plan another','button replans');
const sx=await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);ok(sx,'no h-overflow');
ok(errs.length===0,'no errors '+errs.join('|'));await c.close()}
console.log(fails?fails+' FAILED':'ALL PASSED');await b.close()})()

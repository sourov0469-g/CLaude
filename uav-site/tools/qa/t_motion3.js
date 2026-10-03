const { chromium } = require('/opt/node22/lib/node_modules/playwright');
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const c=await b.newContext({viewport:{width:1440,height:900}});const p=await c.newPage();const errs=[];
p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text().slice(0,200))});p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8767/');await p.waitForTimeout(2000);
// capture button
await p.click('[data-capture]');await p.click('[data-capture]');
ok(await p.textContent('[data-frames]')==='02','capture counter 02');
ok((await p.textContent('[data-frames-live]')).includes('Frame 2'),'live region announces');
// anchor glide
await p.click('a[href="#services"].btn');await p.waitForTimeout(2200);
const y=await p.evaluate(()=>({y:scrollY,top:document.getElementById('services').getBoundingClientRect().top}));
ok(Math.abs(y.top-96)<40,'anchor lands under header '+JSON.stringify(y));
ok((await p.evaluate(()=>location.hash))==='#services','hash updated');
// keyboard tab burst
await p.keyboard.press('Tab');await p.keyboard.press('Tab');await p.waitForTimeout(300);
// fps while scrolling
const fps=await p.evaluate(()=>new Promise(res=>{let n=0,t0=performance.now();function f(){n++;if(performance.now()-t0<3000){scrollBy(0,12);requestAnimationFrame(f)}else res(n/3)}f()}));
console.log('fps while scrolling',fps.toFixed(1));ok(fps>25,'fps>25 headless');
// wheel with lenis
await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(500);await p.mouse.move(700,500);await p.mouse.wheel(0,600);await p.waitForTimeout(1500);
ok((await p.evaluate(()=>scrollY))>300,'wheel scrolls via lenis');
// mobile menu with lenis
await b.close();
const b2=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const c2=await b2.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const q=await c2.newPage();
await q.goto('http://localhost:8767/');await q.waitForTimeout(1500);await q.evaluate(()=>scrollTo(0,500));await q.waitForTimeout(500);
await q.click('.burger');await q.waitForTimeout(600);ok(await q.evaluate(()=>document.body.classList.contains('is-locked')),'menu locks');
await q.click('.m-close');await q.waitForTimeout(600);
const yy=await q.evaluate(()=>scrollY);ok(Math.abs(yy-500)<5,'scroll restored '+yy);
await q.evaluate(()=>scrollTo(0,900));await q.waitForTimeout(500);ok((await q.evaluate(()=>scrollY))>800,'scroll works after menu');
console.log('errs',errs);await b2.close();console.log(fails?'FAILS '+fails:'ALL PASSED')})();

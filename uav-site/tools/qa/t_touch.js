const { chromium } = require('/opt/node22/lib/node_modules/playwright');const swipe=require('./swipe');
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
const BASE=process.env.BASE||'http://localhost:8767';
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});
 const p=await ctx.newPage();const errs=[];
 p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text().slice(0,160))});p.on('pageerror',e=>errs.push('pageerror '+e.message));
 const cdp=await ctx.newCDPSession(p);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await p.goto(BASE+'/');await p.waitForTimeout(3500);
 // hero: tap capture, toggle model
 await p.tap('[data-capture]');await p.waitForTimeout(300);
 ok((await p.textContent('[data-frames]'))==='01','tap capture counts (01)');
 await p.tap('[data-vf-mode="model"]');await p.waitForTimeout(1600);
 const lr=await p.evaluate(()=>getComputedStyle(document.querySelector('.vf .layer-img')).getPropertyValue('--lr'));
 ok(parseFloat(lr)>300,'Model toggle floods the frame (lr='+lr+')');
 ok((await p.getAttribute('[data-vf-mode="model"]','aria-pressed'))==='true','Model button pressed state');
 await p.tap('[data-vf-mode="photo"]');await p.waitForTimeout(1500);
 const lr2=await p.evaluate(()=>parseFloat(getComputedStyle(document.querySelector('.vf .layer-img')).getPropertyValue('--lr')));
 ok(lr2<260,'Photo toggle returns to window (lr='+lr2.toFixed(0)+')');
 // frame-time while flicking down the whole page
 await p.evaluate(()=>{window.__f=[];let l=performance.now();(function t(n){window.__f.push(n-l);l=n;requestAnimationFrame(t)})(l)});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);
 for(let k=0;k<40&&(await p.evaluate(()=>scrollY))<H-860;k++){await swipe(cdp,195,760,0,-620,10,12);await p.waitForTimeout(350)}
 const st=await p.evaluate(()=>{const f=window.__f.slice(5).sort((a,b)=>a-b);return {n:f.length,med:f[Math.floor(f.length/2)],p95:f[Math.floor(f.length*.95)],max:f[f.length-1],y:scrollY}});
 console.log('frame times @4x CPU throttle',JSON.stringify(st));
 ok(st.y>H*0.9,'flick scroll reached the bottom ('+Math.round(st.y)+'/'+H+')');
 ok(st.p95<80,'95th percentile frame <80ms under 4x throttle ('+st.p95.toFixed(0)+'ms)');
 // deck swipe
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(500);
 await p.evaluate(()=>document.querySelector('.svc-acc').scrollIntoView({block:'center'}));await p.waitForTimeout(800);
 const box=await (await p.$('.svc-acc')).boundingBox();
 await swipe(cdp,box.x+300,box.y+box.height/2,-240,0,10,14);await p.waitForTimeout(1000);
 const dot=await p.evaluate(()=>[...document.querySelectorAll('.svc-dots i')].findIndex(i=>i.classList.contains('is-on')));
 ok(dot>=1,'deck swipe advances the dot (index '+dot+')');
 // menu
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400);
 await p.tap('.burger');await p.waitForTimeout(700);
 ok(await p.evaluate(()=>document.body.classList.contains('is-locked')),'menu opens + locks');
 await p.tap('.m-close');await p.waitForTimeout(600);
 ok(!(await p.evaluate(()=>document.body.classList.contains('is-locked'))),'menu closes');
 ok(errs.length===0,'console clean '+JSON.stringify([...new Set(errs)].slice(0,3)));
 await b.close();console.log(fails?'FAILS '+fails:'ALL PASSED');
})();

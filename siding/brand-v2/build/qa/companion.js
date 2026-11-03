// Cursor companion: each variant (A course tick, B corner bracket, C lap chip) under real pointer movement, the asymmetric press, the remembered choice, and touch (no companion, no switch). node companion.js <shot-dir>
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html?clean#/siding');await p.waitForTimeout(500);
const btn=p.locator('.page.on .ver:not([hidden]) .btn-primary').first();const bb=await btn.boundingBox();
for(const v of ['a','b','c']){await p.evaluate(v=>{const r=document.querySelector(`input[name=ccv][value="${v}"]`);r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}))},v);
 await p.mouse.move(700,600,{steps:3});await p.waitForTimeout(300);await p.screenshot({path:`${process.argv[2]||'.'}/${v}-free.png`,clip:{x:600,y:500,width:220,height:200}});
 await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2,{steps:12});await p.waitForTimeout(500);
 await p.screenshot({path:`${process.argv[2]||'.'}/${v}-over.png`,clip:{x:Math.max(0,bb.x-40),y:Math.max(0,bb.y-60),width:bb.width+80,height:bb.height+120}});
 // press timing: scale sampled each frame after down, then after up
 const t=await p.evaluate(async()=>{const cc=document.querySelector('.cc');const sample=()=>{const el=cc.dataset.v==='a'?cc.querySelector('i'):cc.dataset.v==='b'?cc.querySelector('b'):cc.querySelector('svg');return el.style.transform};
   const out={};const t0=performance.now();dispatchEvent(new PointerEvent('pointerdown'));let n=0;await new Promise(r=>{const f=()=>{n++;if(n<30)requestAnimationFrame(f);else r()};requestAnimationFrame(f)});out.down=sample();
   dispatchEvent(new PointerEvent('pointerup'));n=0;await new Promise(r=>{const f=()=>{n++;if(n<30)requestAnimationFrame(f);else r()};requestAnimationFrame(f)});out.up=sample();return out});
 console.log(v,'| on:',await p.evaluate(()=>document.querySelector('.cc').className),'| visible parts:',await p.evaluate(()=>[...document.querySelectorAll('.cc > *')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.tagName).join(',')),'| press settled:',t.down.match(/scale\([^)]*\)/)[0],'→',t.up.match(/scale\([^)]*\)/)[0]);}
await p.reload();await p.waitForTimeout(400);console.log('remembered after reload:',await p.evaluate(()=>document.querySelector('.cc').dataset.v+' / radio '+document.querySelector('input[name=ccv]:checked').value));
await p.evaluate(()=>{const r=document.querySelector('input[name=ccv][value="a"]');r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}))});
const m=await b.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const q=await m.newPage();await q.goto('file:///home/user/CLaude/siding/brand-v2/site.html');await q.waitForTimeout(400);
console.log('touch: companion present',await q.evaluate(()=>!!document.querySelector('.cc')),'| switch displayed',await q.evaluate(()=>getComputedStyle(document.querySelector('.ftr-cc')).display));
console.log('errors',errs.length);await b.close()})();

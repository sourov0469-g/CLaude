const { chromium } = require('/opt/node22/lib/node_modules/playwright');const swipe=require('./swipe');
const BASE='http://localhost:8767';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const css of ['','','.fx--topo{display:none!important}']){
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});const p=await ctx.newPage();const cdp=await ctx.newCDPSession(p);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await p.goto(BASE+'/');await p.waitForTimeout(3000);if(css)await p.addStyleTag({content:css});
 await p.evaluate(()=>{window.__f=[];let l=performance.now();(function t(n){window.__f.push([n-l,scrollY]);l=n;requestAnimationFrame(t)})(l)});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);
 for(let k=0;k<40&&(await p.evaluate(()=>scrollY))<H-860;k++){await swipe(cdp,195,760,0,-620,10,12);await p.waitForTimeout(350)}
 const out=await p.evaluate((H)=>{const B=8,b=Array.from({length:B},()=>[]);window.__f.slice(5).forEach(([d,y])=>{b[Math.min(B-1,Math.floor(y/H*B))].push(d)});return b.map((a,i)=>{a.sort((x,y)=>x-y);return a.length?(a[Math.floor(a.length/2)]).toFixed(0)+'/'+a.length:'-'}).join('  ')},H);
 console.log((css||'base').slice(0,40).padEnd(41),out);await ctx.close()}
await b.close()})();

const { chromium } = require('/opt/node22/lib/node_modules/playwright');const swipe=require('./swipe');
const BASE=process.env.BASE||'http://localhost:8767';
const variants={base:'',notri:'@@rm|canvas.tri'};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [name,css] of Object.entries(variants)){
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});const p=await ctx.newPage();const cdp=await ctx.newCDPSession(p);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 if(css==='@@nogsap')await p.route('**/vendor.js',r=>r.fulfill({status:200,contentType:'text/javascript',body:'/*none*/'}));
 await p.goto(BASE+(process.env.ROUTE||'/'));await p.waitForTimeout(3000);
 if(css==='@@nolenis')await p.evaluate(()=>{const l=UAV.motion._lenis();if(l){l.destroy()}});
 else if(css==='@@nost')await p.evaluate(()=>{ScrollTrigger.getAll().forEach(t=>t.disable())});
 else if(css.startsWith('@@rm')){const sel=css.split('|')[1];await p.evaluate(sel=>document.querySelectorAll(sel).forEach(e=>e.remove()),sel)}
 else if(css.startsWith('@@nofx')){await p.evaluate(()=>{document.querySelectorAll('.fx,canvas,.aura,.rail').forEach(e=>e.remove())});const extra=css.split('|')[1];if(extra)await p.addStyleTag({content:extra})}
 else if(css)await p.addStyleTag({content:css});
 await p.evaluate(()=>{window.__f=[];let l=performance.now();(function t(n){window.__f.push(n-l);l=n;requestAnimationFrame(t)})(l)});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);
 for(let k=0;k<40&&(await p.evaluate(()=>scrollY))<H-860;k++){await swipe(cdp,195,760,0,-620,10,12);await p.waitForTimeout(350)}
 const st=await p.evaluate(()=>{const f=window.__f.slice(5).sort((a,b)=>a-b);return {n:f.length,med:+f[Math.floor(f.length/2)].toFixed(1),p95:+f[Math.floor(f.length*.95)].toFixed(1),max:+f[f.length-1].toFixed(1)}});
 console.log(name.padEnd(9),JSON.stringify(st));await ctx.close();
}
await b.close()})();

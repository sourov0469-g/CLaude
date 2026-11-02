const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
await p.addInitScript(()=>{window.__raf=0;const o=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=f=>{window.__raf++;return o(f);};});
await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html#/siding');await p.waitForTimeout(500);
await p.evaluate(()=>{const s=document.getElementById('siding-6');s.querySelector('.rv button[data-v="2"]').click();s.scrollIntoView({behavior:'instant'});});await p.waitForTimeout(800);
const r0=await p.evaluate(()=>window.__raf);await p.waitForTimeout(1000);const running=await p.evaluate(()=>window.__raf)-r0;
await p.evaluate(()=>location.hash='#/');await p.waitForTimeout(800);const r1=await p.evaluate(()=>window.__raf);await p.waitForTimeout(1000);const after=await p.evaluate(()=>window.__raf)-r1;
console.log('rAF/s while the steel field shows:',running,'| rAF/s after route change to home:',after);await b.close()})();

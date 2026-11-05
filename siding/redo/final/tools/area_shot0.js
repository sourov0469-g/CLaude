const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
for(const [w,h] of [[1440,900],[390,844]]){const c=await b.newContext({viewport:{width:w,height:h}});const p=await c.newPage();await p.goto('file:///home/user/CLaude/siding/redo/final/out/final-area.html');
await p.evaluate(()=>scrollTo({top:scrollY+document.querySelector('#area').getBoundingClientRect().top,behavior:'instant'}));await p.waitForTimeout(1500);
console.log(w, await p.evaluate(()=>[document.documentElement.scrollWidth, innerWidth]));
await p.screenshot({path:`gate/_old-area-${w}.png`});await c.close();}
await b.close();})();

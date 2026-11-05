const { chromium } = require('playwright');
const F='file:///home/user/CLaude/siding/redo/final/out/'+(process.env.F||'final-area.html');
(async()=>{const b=await chromium.launch();
const w=+process.argv[2]||1440,h=+process.argv[3]||900;
const c=await b.newContext({viewport:{width:w,height:h}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto(F);
const top=await p.evaluate(()=>scrollY+document.querySelector('.ar-board').getBoundingClientRect().top);
const steps=(process.argv[4]||'-120,300,620,900').split(',').map(Number);
let k=0;for(const dy of steps){await p.evaluate((y)=>scrollTo({top:y,behavior:'instant'}),top+dy);await p.waitForTimeout(1600);await p.screenshot({path:`gate/_a1-${w}-${k++}.png`});}
console.log(errs, await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth, document.querySelector('.ar-board').getBoundingClientRect().height]));
await b.close();})();

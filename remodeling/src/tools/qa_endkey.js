// QA-1: a visitor who wheels once (a half-pixel target, 45 x 0.9) then uses PageDown and End must reach the page end.
// Usage: node qa_endkey.js
const { chromium } = require('playwright');
const PAGES={home:'elbaz-homepage.html',kitchens:'kitchens.html',bathrooms:'bathrooms.html',renovation:'renovation.html',contact:'contact.html'};
(async()=>{const b=await chromium.launch();
for(const [n,f] of Object.entries(PAGES)) for (const w of [768,1440]){
 const p=await b.newPage({viewport:{width:w,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e));
 await p.goto('file:///home/user/CLaude/remodeling/site/'+f); await p.waitForTimeout(1300);
 await p.mouse.move(w/2,450); await p.mouse.wheel(0,45); await p.waitForTimeout(2500);   // 45 x 0.9 = 40.5: the half-pixel target
 const s1=await p.evaluate(()=>({y:scrollY,sc:EZ.lenis&&EZ.lenis.isScrolling}));
 await p.keyboard.press('PageDown'); await p.waitForTimeout(1200); const pd=await p.evaluate(()=>scrollY);
 await p.keyboard.press('End'); await p.waitForTimeout(2500);
 for(let k=0;k<6;k++){ await p.keyboard.press('End'); await p.waitForTimeout(600); }
 const e=await p.evaluate(()=>({y:Math.round(scrollY),max:document.documentElement.scrollHeight-innerHeight}));
 console.log(n,w,'after wheel',JSON.stringify(s1),'pagedown->',pd,'end',e.y,'/',e.max, e.y>=e.max-2?'OK':'STUCK','errors',errs.length); await p.close();}
await b.close();})();

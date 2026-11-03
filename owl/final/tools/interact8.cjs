// round 8: Protect Your Nest page, including the magnet sweep game
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(q){const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>errs.push(q+': '+e.message)); await p.route('https://**',r=>r.abort()); await p.goto(F+q); await p.waitForTimeout(1200); return p;}
let p=await page('?all=1');
await p.click('.ftr a[href="#/protect-your-nest"]'); await p.waitForTimeout(500); console.log('footer link -> page:', await p.evaluate(()=>document.querySelector('.page:not([hidden])').dataset.page));
await p.click('.pn1 .pt:nth-child(3)'); await p.waitForTimeout(500); console.log('nest pick:', await p.textContent('.pn1 .cap b'), '| pin selected:', await p.evaluate(()=>document.querySelectorAll('.pn1 .pin')[2].getAttribute('aria-pressed')));
await p.locator('.pp1 .board').scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
const bb=await (await p.$('.pp1 .board')).boundingBox();
for (let r=0;r<6;r++){ const y=bb.y+60+r*(bb.height-100)/5; await p.mouse.move(bb.x+20,y); await p.mouse.move(bb.x+bb.width-20,y,{steps:30}); }
await p.waitForTimeout(600); console.log('manual sweep:', await p.textContent('.pp1 .cnt'));
await p.click('.pp1 .auto'); await p.waitForTimeout(12000);
console.log('after auto sweep:', await p.textContent('.pp1 .cnt'), '| won:', await p.evaluate(()=>document.querySelector('.pp1 .board').classList.contains('over')), '| pass 3 now:', await p.evaluate(()=>document.querySelectorAll('.pp1 .passes li')[2].classList.contains('now')));
await p.click('.pp1 .again'); await p.waitForTimeout(200); console.log('scatter again:', await p.textContent('.pp1 .cnt'));
await p.close(); p=await page('?all=2#/protect-your-nest');
await p.focus('.pn2 .pull'); await p.keyboard.press('End'); await p.waitForTimeout(200); console.log('wrap End key:', await p.getAttribute('.pn2 .pull','aria-valuenow'), '| wrapped:', await p.evaluate(()=>document.querySelector('.pn2 .stage').classList.contains('wrapped')));
await p.click('.pp2 .tab:nth-child(3)'); console.log('passes pick:', await p.evaluate(()=>document.querySelector('.pp2 .act.on').dataset.i));
await p.close();
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'no page errors'); await b.close();})();

// round 2 interactives: explore layers, lens depth, Wise Check dial, owl eye
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(q){const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>errs.push(q+': '+e.message)); await p.route('https://**',r=>r.abort()); await p.goto(F+q); await p.waitForTimeout(1200); return p;}
let p=await page('?all=1');
await p.click('.explore1 .opt[data-k="decking"]'); await p.waitForTimeout(600);
console.log('explore pick:', await p.textContent('.explore1 .info b'), '| lifted layers:', await p.evaluate(()=>document.querySelectorAll('.explore1 .lay.on').length));
await p.keyboard.press('ArrowDown'); console.log('arrow ->', await p.textContent('.explore1 .info b'));
for (const k of ['shingles','flashing','ventilation','gutters']) { await p.click('.wise1 .it[data-k="'+k+'"]'); await p.waitForTimeout(150); }
await p.waitForTimeout(1200);
console.log('wise all ticked:', await p.textContent('.wise1 .say'), '| needle:', await p.evaluate(()=>document.querySelector('.wise1 .needle').style.transform), '| cta pulsing:', await p.evaluate(()=>document.querySelector('.wise1 .btn').classList.contains('ready')));
await p.click('.wise1 .reset'); console.log('after reset:', await p.textContent('.wise1 .say'));
await p.close(); p=await page('?all=2');
await p.click('.explore2 .depth button[data-d="3"]'); console.log('lens depth:', await p.textContent('.explore2 .tag'));
const f=await (await p.$('.explore2 .field')).boundingBox(); await p.mouse.move(f.x+f.width*.3,f.y+f.height*.4); await p.mouse.wheel(0,-120); await p.waitForTimeout(200);
console.log('wheel up ->', await p.textContent('.explore2 .tag'));
await p.click('.wise2 .chip:nth-of-type(2)'); console.log('eye pick:', await p.textContent('.wise2 .read b'));
await p.close();
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'no page errors'); await b.close();})();

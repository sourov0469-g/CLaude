// round 7: Wise Check page
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(q){const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>errs.push(q+': '+e.message)); await p.route('https://**',r=>r.abort()); await p.goto(F+q); await p.waitForTimeout(1200); return p;}
let p=await page('?all=1');
await p.click('.hdr-nav a[href="#/wise-check"]'); await p.waitForTimeout(400); console.log('nav -> page:', await p.evaluate(()=>document.querySelector('.page:not([hidden])').dataset.page));
await p.click('.wc1 .c:nth-child(2)'); console.log('case:', await p.textContent('.wc1 .pan h2'), '| first lit part:', await p.evaluate(()=>[...document.querySelectorAll('.wc1 .parts li')].sort((a,b)=>a.style.order-b.style.order)[0].querySelector('b').textContent));
await p.keyboard.press('ArrowRight'); console.log('arrow ->', await p.textContent('.wc1 .pan h2'));
await p.click('.wp1 .card:nth-child(3) .flip'); await p.waitForTimeout(900); console.log('flip pressed:', await p.getAttribute('.wp1 .card:nth-child(3) .flip','aria-pressed'), '| label:', await p.getAttribute('.wp1 .card:nth-child(3) .flip','aria-label'));
await p.close(); p=await page('?all=2#/wise-check');
const s=await (await p.$('.wc2 .scan')).boundingBox(); await p.mouse.move(s.x+5,s.y+s.height/2); await p.mouse.down(); await p.mouse.move(s.x+s.width*.7,s.y+s.height/2,{steps:8}); await p.mouse.up();
console.log('scan at', await p.getAttribute('.wc2 .grip','aria-valuenow'), '| warm spot shown:', await p.evaluate(()=>document.querySelector('.wc2 .scan').classList.contains('found')));
await p.click('.wp2 .lab:nth-of-type(3)'); await p.waitForTimeout(600); console.log('knob label ->', await p.textContent('.wp2 .screen h3'), '| aria:', await p.getAttribute('.wp2 .knob','aria-valuetext'));
await p.focus('.wp2 .knob'); await p.keyboard.press('ArrowRight'); console.log('knob arrow ->', await p.textContent('.wp2 .screen h3'));
await p.close();
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'no page errors'); await b.close();})();

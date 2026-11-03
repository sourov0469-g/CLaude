// round 9: About page
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(q){const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>errs.push(q+': '+e.message)); await p.route('https://**',r=>r.abort()); await p.goto(F+q); await p.waitForTimeout(1200); return p;}
let p=await page('?all=1');
await p.click('.hdr-nav a[href="#/about"]'); await p.waitForTimeout(400); console.log('nav -> page:', await p.evaluate(()=>document.querySelector('.page:not([hidden])').dataset.page), '| current:', await p.getAttribute('.hdr-nav a[href="#/about"]','aria-current'));
await p.click('.ab1 .hoot'); await p.waitForTimeout(300); console.log('owl says:', await p.textContent('.ab1 .bubble')); await p.click('.ab1 .hoot'); console.log('owl says:', await p.textContent('.ab1 .bubble'));
await p.click('.av1 .w:nth-child(2)'); console.log('value:', await p.textContent('.av1 .proof p')); await p.keyboard.press('ArrowRight'); console.log('arrow ->', await p.textContent('.av1 .proof p'));
await p.close(); p=await page('?all=2#/about'); await p.waitForTimeout(1600);
console.log('count-up:', await p.evaluate(()=>[...document.querySelectorAll('.ab2 .n b')].map(b=>b.textContent).join(' ')));
await p.click('.av2 .fe[aria-label="Expert"]'); console.log('feather:', await p.textContent('.av2 .card h3'), '|', await p.textContent('.av2 .card p'));
await p.focus('.av2 .fe[aria-label="Expert"]'); await p.keyboard.press('ArrowRight'); console.log('feather arrow ->', await p.textContent('.av2 .card h3'));
await p.close();
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'no page errors'); await b.close();})();

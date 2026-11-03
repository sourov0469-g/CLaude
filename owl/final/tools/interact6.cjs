// round 6: router (pages inside one file) and Services page interactives
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(q){const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>errs.push(q+': '+e.message)); await p.route('https://**',r=>r.abort()); await p.goto(F+q); await p.waitForTimeout(1200); return p;}
const vis=p=>p.evaluate(()=>document.querySelector('.page:not([hidden])').dataset.page);
let p=await page('?all=1');
await p.click('.hdr-nav a[href="#/services"]'); await p.waitForTimeout(500); console.log('nav -> page:', await vis(p), '| title:', await p.title(), '| scrollY:', await p.evaluate(()=>scrollY), '| aria-current:', await p.getAttribute('.hdr-nav a[href="#/services"]','aria-current'));
await p.hover('.sh1 .p:nth-child(3)'); await p.waitForTimeout(300); console.log('panel open:', await p.evaluate(()=>[...document.querySelectorAll('.sh1 .p')].map(x=>x.classList.contains('on')?1:0).join('')));
await p.click('.ss1 li:nth-child(6) button'); await p.waitForTimeout(900); console.log('timeline step:', await p.evaluate(()=>document.querySelector('.ss1 li.on h3').textContent), '| badge:', await p.textContent('.ss1 .badge b'));
await p.click('.ctaband a[href="#book"]'); await p.waitForTimeout(700); console.log('#book from services -> page:', await vis(p), '| book in view:', await p.evaluate(()=>{const r=document.getElementById('book').getBoundingClientRect(); return r.top<innerHeight && r.bottom>0;}));
await p.click('.hdr-logo'); await p.waitForTimeout(400); console.log('logo -> page:', await vis(p), '| scrollY:', await p.evaluate(()=>scrollY));
await p.goBack(); await p.waitForTimeout(400); console.log('back button -> page:', await vis(p));
await p.close(); p=await page('?all=2#/services');
await p.click('.sh2 .t:nth-child(4)'); await p.waitForTimeout(300); console.log('picker:', await p.textContent('.sh2 .card h2'), '|', await p.textContent('.sh2 .card li'));
await p.click('.ss2 .nx'); await p.click('.ss2 .nx'); console.log('stepper:', await p.textContent('.ss2 .card h3'), '| done tabs:', await p.evaluate(()=>document.querySelectorAll('.ss2 .tab.done').length));
await p.close();
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'no page errors'); await b.close();})();

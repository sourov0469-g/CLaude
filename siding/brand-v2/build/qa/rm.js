const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html#/about/booking');await p.waitForTimeout(700);
console.log('deep link: page',await p.evaluate(()=>document.querySelector('.page.on').id),'booking top',await p.evaluate(()=>Math.round(document.getElementById('about-booking').getBoundingClientRect().top)));
const r=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errs=[];r.on('pageerror',e=>errs.push(e.message));await r.goto('file:///home/user/CLaude/siding/brand-v2/site.html');await r.waitForTimeout(500);
console.log('reduced: durations',await r.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--duration-deliberate')),'record dots on',await r.evaluate(()=>document.querySelectorAll('[data-rec1] .nd-d.on').length),'course lines drawn',await r.evaluate(()=>document.querySelectorAll('.page.on .cline.draw.on').length+'/'+document.querySelectorAll('.page.on .cline.draw').length),'errs',errs.length);
await b.close()})();

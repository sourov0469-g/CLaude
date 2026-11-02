const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html');await p.waitForTimeout(400);
const pre=await p.evaluate(()=>!!document.getElementById('live')&&document.getElementById('live').getAttribute('aria-live'));
await p.evaluate(()=>location.hash='#/windows');await p.waitForTimeout(300);const t1=await p.evaluate(()=>document.getElementById('live').textContent);
const f1=await p.evaluate(()=>document.activeElement.tagName+':'+document.activeElement.textContent.slice(0,30));
await p.evaluate(()=>location.hash='#/');await p.waitForTimeout(300);
await p.evaluate(()=>document.getElementById('home-9').scrollIntoView({behavior:'instant'}));await p.click('#home-9 input[name=sm1][value="2"]');await p.waitForTimeout(900);
const alt=await p.evaluate(()=>[...document.querySelectorAll('#home-9 .ver[data-v="1"] [data-seam] img')].map(i=>i.alt));
console.log('live region present before change:',pre,'| announced:',t1,'| focus moved to:',f1,'| seam alts after swap:',JSON.stringify(alt));await b.close()})();

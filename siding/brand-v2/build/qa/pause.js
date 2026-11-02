const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html');await p.waitForTimeout(400);await p.keyboard.press('Tab');await p.keyboard.press('Tab');
console.log('2nd tab stop:',await p.evaluate(()=>document.activeElement.textContent));
await p.evaluate(()=>document.querySelector('.ftr').scrollIntoView({behavior:'instant'}));await p.waitForTimeout(600);
const px=async()=>p.evaluate(()=>{const c=document.querySelector('.ftr canvas');return c.toDataURL().length+':'+c.getContext('2d').getImageData(Math.floor(c.width*.6),Math.floor(c.height*.5),1,1).data.join(',')});
const a=await px();await p.waitForTimeout(1200);const b1=await px();
await p.click('.ftr-mo');await p.waitForTimeout(300);const c1=await px();await p.waitForTimeout(1500);const d1=await px();
console.log('moving before pause:',a!==b1,'| frozen after pause:',c1===d1,'| label:',await p.evaluate(()=>document.querySelector('.ftr-mo').textContent+' '+document.querySelector('.ftr-mo').getAttribute('aria-pressed')),'errs',errs.length);
await p.click('.ftr-mo');await p.waitForTimeout(1200);console.log('resumed:',d1!==await px());await b.close()})();

const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for (const w of [1440,390]){const p=await b.newPage({viewport:{width:w,height:900}});
await p.goto('file:///home/user/CLaude/owl/final/owl-roofing.html?explore=14');await p.waitForTimeout(1500);
const m=()=>p.evaluate(()=>{const b=document.querySelector('.explore14 .bk'),s=document.querySelector('.explore14 .say');return [Math.round(b.getBoundingClientRect().width),Math.round(s.getBoundingClientRect().height)]});
await p.click('.explore14 .bk'); await p.waitForTimeout(900); // now "lost some shingles"
const r=[];r.push(['rest',await m()]);await p.click('.explore14 .bk');await p.waitForTimeout(100);r.push(['mid',await m()]);await p.waitForTimeout(900);r.push(['end',await m()]);
console.log(w,'lost some shingles -> took a storm hit',JSON.stringify(r));await p.close();}
await b.close()})()

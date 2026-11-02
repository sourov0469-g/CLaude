const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html#/siding');await p.waitForTimeout(600);
const tick=()=>p.evaluate(()=>{const m=document.querySelector('.cc i').style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\) scale\(([-\d.]+), ([-\d.]+)\)/);return m?m.slice(1).map(Number):null});
const res=[];
for(const sel of ['.hdr-nav a:nth-child(2)','.hdr-book','#siding-1 .ver[data-v="1"] .btn-primary']){const bb=await (await p.$(sel)).boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2,{steps:12});await p.waitForTimeout(250);
 const t=await tick();res.push([sel,Math.round(bb.width),t&&Math.round(t[2]*100),t&&Math.round(t[0]),Math.round(bb.x),t&&Math.round(t[1]),Math.round(bb.y+bb.height+4)]);}
// plain text: no target -> small tick near pointer
await p.mouse.move(200,600,{steps:10});await p.waitForTimeout(500);const free=await tick();
// scroll while over a target: tick follows the target's new position
const bb=await (await p.$('#siding-1 .ver[data-v="1"] .btn-primary')).boundingBox();await p.mouse.move(bb.x+20,bb.y+20,{steps:5});await p.waitForTimeout(200);await p.mouse.wheel(0,120);await p.waitForTimeout(400);
const bb2=await (await p.$('#siding-1 .ver[data-v="1"] .btn-primary')).boundingBox();const ts=await tick();
console.log(JSON.stringify(res));console.log('free tick',free&&free.map(v=>Math.round(v*100)/100),'| after scroll: target bottom',Math.round(bb2.y+bb2.height+4),'tick y',ts&&Math.round(ts[1]),'| errs',errs.length);
await b.close()})();

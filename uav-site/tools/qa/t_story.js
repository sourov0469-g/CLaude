const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const [,, W='1440', H='900', tag='d', url='http://localhost:8767/']=process.argv;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const mobile=+W<700;
const c=await b.newContext({viewport:{width:+W,height:+H},hasTouch:mobile,isMobile:mobile,deviceScaleFactor:mobile?2:1});const p=await c.newPage();
const errs=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text().slice(0,200))});p.on('pageerror',e=>errs.push(e.message));
await p.goto(url);await p.waitForTimeout(2500);
const info=await p.evaluate(()=>{const t=document.querySelector('.story-track');const r=t.getBoundingClientRect();return {top:r.top+scrollY,h:r.height,live:document.querySelector('.story').classList.contains('is-live')}});
console.log(info);
const fr=[0,.12,.28,.4,.5,.6,.72,.82,.92,1];let i=0;
for(const f of fr){const y=info.top+(info.h-(+H))*f+ (f===0?-40:0);await p.evaluate(yy=>scrollTo(0,yy),y);await p.waitForTimeout(1100);await p.screenshot({path:`m7/${tag}_${String(i++).padStart(2,'0')}.png`})}
console.log(errs);await b.close()})();

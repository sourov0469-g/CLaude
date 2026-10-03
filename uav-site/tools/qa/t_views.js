const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const [,, W='1440', H='900', tag='d']=process.argv;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const mobile=+W<700;
const c=await b.newContext({viewport:{width:+W,height:+H},hasTouch:mobile,isMobile:mobile,deviceScaleFactor:mobile?2:1});const p=await c.newPage();
const errs=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text().slice(0,200))});p.on('pageerror',e=>errs.push(e.message));
const jobs=[
 ['/', null, 'hero'],
 ['/', '.statement', 'statement'],
 ['/', '.svc-acc', 'services'],
 ['/', '.cta', 'cta'],
 ['/services/', '#compare', 'chooser'],
 ['/contact/', '.form-card', 'contact'],
 ['/services/roof-inspections/', null, 'roofhero'],
];
let n=0;
for(const [url,sel,name] of jobs){
  await p.goto('http://localhost:8767'+url);await p.waitForTimeout(2200);
  if(sel){await p.evaluate(s=>{const e=document.querySelector(s);const r=e.getBoundingClientRect();scrollTo(0,r.top+scrollY-90)},sel);await p.waitForTimeout(1600);}
  if(!mobile){await p.mouse.move(+W*0.6,+H*0.5);await p.mouse.move(+W*0.66,+H*0.55,{steps:12});await p.waitForTimeout(600);}
  if(name==='contact'){await p.fill('#f-loc','Macclesfield');await p.fill('#f-msg','Roof survey please');await p.waitForTimeout(900);}
  if(name==='chooser'){await p.click('#ch-t2');await p.waitForTimeout(900);}
  await p.screenshot({path:`m8/${tag}_${String(n++).padStart(2,'0')}_${name}.png`});
}
console.log(errs);await b.close()})();

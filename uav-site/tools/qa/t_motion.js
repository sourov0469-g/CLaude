const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
(async()=>{
  const target=process.argv[2]||'http://localhost:8767/', out=process.argv[3]||'m1', W=+(process.argv[4]||1440), H=+(process.argv[5]||900);
  fs.mkdirSync(out,{recursive:true});
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const ctx=await b.newContext({viewport:{width:W,height:H}});
  const p=await ctx.newPage();const errs=[];
  p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.type()+': '+m.text().slice(0,300))});
  p.on('pageerror',e=>errs.push('pageerror: '+e.message));
  await p.goto(target);await p.waitForTimeout(2500);
  console.log(await p.evaluate(()=>({gsap:!!window.gsap&&gsap.version,st:!!window.ScrollTrigger,lenis:typeof Lenis,cls:document.documentElement.className,trig:ScrollTrigger.getAll().length,cur:!!document.querySelector('.cur'),trail:!!document.querySelector('.trail'),atmos:document.querySelectorAll('.atmos').length,sw:document.documentElement.scrollWidth,H:document.documentElement.scrollHeight})));
  await p.mouse.move(300,300);await p.mouse.move(700,420,{steps:25});await p.waitForTimeout(500);
  await p.screenshot({path:out+'/00_top.png'});
  const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);
  let i=1;
  for(let y=Math.round(H*.85);y<Hh;y+=Math.round(H*.8)){
    await p.evaluate(yy=>window.scrollTo(0,yy),y);await p.waitForTimeout(900);
    await p.mouse.move(600+i*20,450,{steps:6});await p.waitForTimeout(500);
    await p.screenshot({path:out+'/'+String(i).padStart(2,'0')+'.png'});i++;
    if(i>22)break;
  }
  console.log('errs',[...new Set(errs)]);
  await b.close();
})();

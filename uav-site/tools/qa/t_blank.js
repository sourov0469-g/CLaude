const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const F=process.argv[2]||'file:///home/user/CLaude/uav-site/dist/UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html#/';
const sizes=(process.argv[3]||'1366x768,1920x1080,1280x720').split(',').map(s=>s.split('x').map(Number));
const out=process.argv[4]||'bl';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [w,h] of sizes){
 const c=await b.newContext({viewport:{width:w,height:h}});const p=await c.newPage();
 await p.goto(F);await p.waitForTimeout(2500);await p.mouse.move(w/2,h/2);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);let i=0;const bad=[];
 for(let y=0;y<H;y+=Math.round(h*0.45)){
  await p.mouse.wheel(0,Math.round(h*0.45));await p.waitForTimeout(450);
  const f=`${out}/${w}_${String(i).padStart(2,'0')}.png`;await p.screenshot({path:f});
  const sy=await p.evaluate(()=>scrollY);
  // blankness: sample via python later
  i++;if(i>60)break;
 }
 console.log(w,h,'H',H,'frames',i);await c.close();
}
await b.close()})();

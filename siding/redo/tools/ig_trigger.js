// Immersive Garden: what makes the relief appear? pointer alone, then wheel alone (pointer still), each given time
const {chromium}=require('playwright');const fs=require('fs');const O=__dirname+'/../evidence/immersive-garden/frames/';
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await(await b.newContext({viewport:{width:1440,height:900}})).newPage();await p.goto('https://immersive-g.com/',{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(15000);
const shot=async n=>{fs.writeFileSync(O+n,await p.screenshot());console.log('shot',n,new Date().toISOString().slice(11,19));};
await shot('trig-A-loaded.png');
await p.mouse.move(200,300);await p.mouse.move(1200,600,{steps:30});await p.mouse.move(400,750,{steps:30});await p.waitForTimeout(6000);await shot('trig-B-pointer-only.png');
for(let i=0;i<3;i++){await p.mouse.wheel(0,600);await p.waitForTimeout(3000);}await shot('trig-C-after-3-wheels.png');
await p.waitForTimeout(6000);await shot('trig-D-6s-later.png');
for(let i=0;i<3;i++){await p.mouse.wheel(0,600);await p.waitForTimeout(3000);}await shot('trig-E-after-6-wheels.png');
await b.close();})();

// Immersive Garden relief field: rest drift vs pointer reaction, measured inside the relief area
const {chromium}=require('playwright');const fs=require('fs');const {execSync}=require('child_process');const O=__dirname+'/../evidence/immersive-garden/frames/';
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await(await b.newContext({viewport:{width:1440,height:900}})).newPage();await p.goto('https://immersive-g.com/',{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(12000);
await p.mouse.move(720,880);for(let i=0;i<9;i++){await p.mouse.wheel(0,650);await p.waitForTimeout(500);}await p.waitForTimeout(6000);
const shot=async n=>fs.writeFileSync(O+n,await p.screenshot());
await shot('f-rest-a.png');await p.waitForTimeout(2000);await shot('f-rest-b.png');
await p.mouse.move(150,450);await p.waitForTimeout(300);await p.mouse.move(1300,450,{steps:45});await shot('f-pass-0.png');
await p.waitForTimeout(250);await shot('f-pass-250.png');await p.waitForTimeout(750);await shot('f-pass-1000.png');await p.waitForTimeout(2000);await shot('f-pass-3000.png');
await b.close();})();

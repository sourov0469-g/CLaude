const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:8767/');await p.waitForTimeout(2600);
await p.mouse.move(300,300);for(let i=0;i<30;i++){await p.mouse.move(300+i*30,300+Math.sin(i/3)*80,{steps:2});}
await p.screenshot({path:'m6/a_trail.png'});
await p.waitForTimeout(800);
await p.hover('.btn--ghost');await p.waitForTimeout(700);await p.screenshot({path:'m6/b_ghost.png',clip:{x:40,y:560,width:620,height:160}});
await p.mouse.move(1000,500);await p.waitForTimeout(900);await p.screenshot({path:'m6/c_vf.png',clip:{x:700,y:100,width:700,height:760}});
await p.click('[data-capture]');await p.waitForTimeout(120);await p.screenshot({path:'m6/d_capture.png',clip:{x:700,y:100,width:700,height:760}});
await p.evaluate(()=>scrollTo(0,document.querySelector('#services').offsetTop+100));await p.waitForTimeout(1200);
await p.hover('.svc-p:nth-child(3)');await p.waitForTimeout(1300);await p.screenshot({path:'m6/e_panel.png'});
await b.close()})();

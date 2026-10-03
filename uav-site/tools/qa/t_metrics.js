const { chromium } = require('/opt/node22/lib/node_modules/playwright');const swipe=require('./swipe');
const BASE=process.env.BASE||'http://localhost:8767';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const mode of ['base','nogsap']){
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});const p=await ctx.newPage();const cdp=await ctx.newCDPSession(p);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await cdp.send('Performance.enable');
 if(mode==='nogsap')await p.route('**/vendor.js',r=>r.fulfill({status:200,contentType:'text/javascript',body:'/*none*/'}));
 await p.goto(BASE+'/');await p.waitForTimeout(3000);
 const get=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
 const a=await get();
 for(let k=0;k<6;k++){await swipe(cdp,195,760,0,-620,10,12);await p.waitForTimeout(350)}
 const z=await get();
 const d=n=>+(z[n]-a[n]).toFixed(3);
 console.log(mode.padEnd(7),'Task',d('TaskDuration'),'Script',d('ScriptDuration'),'Layout',d('LayoutDuration'),'Style',d('RecalcStyleDuration'),'layouts',d('LayoutCount'),'styles',d('RecalcStyleCount'),'frames?',d('Frames'));
 await ctx.close();
}
await b.close()})();

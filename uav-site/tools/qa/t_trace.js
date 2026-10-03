const { chromium } = require('/opt/node22/lib/node_modules/playwright');const swipe=require('./swipe');
const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});const p=await ctx.newPage();const cdp=await ctx.newCDPSession(p);
await p.goto('http://localhost:8767/');await p.waitForTimeout(2500);
const region=process.env.REGION||'story';
const info=await p.evaluate(sel=>{const t=document.querySelector(sel).getBoundingClientRect();return {top:t.top+scrollY,h:t.height}},region==='story'?'.story-track':region==='faq'?'#faq':region==='marq'?'.marquee':'.hero');
await p.evaluate(y=>scrollTo(0,y),info.top-60);await p.waitForTimeout(800);
await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
const chunks=[];cdp.on('Tracing.dataCollected',e=>chunks.push(...e.value));
await cdp.send('Tracing.start',{categories:'devtools.timeline,disabled-by-default-devtools.timeline,v8.execute',transferMode:'ReportEvents'});
for(let k=0;k<9;k++){await swipe(cdp,195,700,0,-230,12,16);await p.waitForTimeout(300)}
const done=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');await done;
const tot={};const cnt={};
for(const e of chunks){if(e.ph==='X'&&e.dur){tot[e.name]=(tot[e.name]||0)+e.dur;cnt[e.name]=(cnt[e.name]||0)+1}}
const top=Object.entries(tot).sort((a,b)=>b[1]-a[1]).slice(0,22);
for(const [n,d] of top)console.log(n.padEnd(34),(d/1000).toFixed(0).padStart(7),'ms',String(cnt[n]).padStart(6),'calls');
await b.close()})();

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [name,o] of [['reduced',{reducedMotion:'reduce'}],['nojs',{javaScriptEnabled:false}]]){
const c=await b.newContext({viewport:{width:1280,height:800},...o});const p=await c.newPage();await p.goto('http://localhost:8767/');await p.waitForTimeout(1200);
await p.screenshot({path:`m2/${name}_top.png`});
const s=await p.evaluate(()=>({h:[...document.querySelectorAll('h1,h2')].filter(h=>getComputedStyle(h).visibility==='hidden').length,m:document.querySelector('.marquee-track').getBoundingClientRect().height,sw:document.documentElement.scrollWidth}));console.log(name,JSON.stringify(s));await c.close()}
await b.close()})();

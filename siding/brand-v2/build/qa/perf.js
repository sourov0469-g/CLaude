const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [w,h,cpu] of [[1440,900,1],[375,740,4]]){const ctx=await b.newContext({viewport:{width:w,height:h}});const p=await ctx.newPage();const c=await ctx.newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:cpu});
 await p.addInitScript(()=>{window.__m={lcp:0,cls:0,long:0,longN:0};new PerformanceObserver(l=>{for(const e of l.getEntries())__m.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)__m.cls+=e.value}).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(l=>{for(const e of l.getEntries()){__m.long+=e.duration-50;__m.longN++}}).observe({type:'longtask',buffered:true});});
 await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 // scroll the whole homepage once to include scroll-driven work in the layout-shift and long-task totals
 const H=await p.evaluate(()=>document.body.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30);}
 const m=await p.evaluate(()=>{const n=performance.getEntriesByType('navigation')[0],fcp=performance.getEntriesByName('first-contentful-paint')[0];return {dcl:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd),fcp:Math.round(fcp?fcp.startTime:0),lcp:Math.round(__m.lcp),cls:+__m.cls.toFixed(3),tbt:Math.round(__m.long),longTasks:__m.longN}});
 console.log(`${w}px cpu x${cpu}:`,JSON.stringify(m));await ctx.close();}
await b.close()})();

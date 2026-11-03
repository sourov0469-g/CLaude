// usage: node shot.cjs <query> <out.png> [width=1440] [height=900] [full=1] [waitms=1500]
const {chromium}=require('playwright'); const path=require('path'); const fs=require('fs');
const [,,query,out,W='1440',H='900',full='1',wait='1500']=process.argv;
(async()=>{const b=await chromium.launch(); const p=await b.newPage({viewport:{width:+W,height:+H},deviceScaleFactor:1});
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+path.resolve(__dirname,'../owl-roofing.html')+(query||''),{waitUntil:'load'});
await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(+wait);
if(full==='1'){const h=await p.evaluate(()=>document.documentElement.scrollHeight); await p.setViewportSize({width:+W,height:Math.min(h,16000)}); await p.waitForTimeout(400);}
await p.screenshot({path:out}); console.log('ok',out,errs.length?('ERRORS: '+errs.join(' | ')):'no errors'); await b.close();})();

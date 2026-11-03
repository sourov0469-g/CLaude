// Evidence for homepage verification: full page at 1440 / 768 / 390 and one screenshot per section, default view.
const {chromium}=require('playwright'); const path=require('path'); const OUT=path.resolve(__dirname,'../gates/home-verify');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
const names=['hero','video','explore','wise','wrap','services','reviews','area','family','booking'];
(async()=>{const b=await chromium.launch();
async function open(w,h){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1}); await p.route('https://**',r=>r.abort()); await p.goto(F); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1500); return p;}
// walk the page so every scroll-triggered piece (count-ups, flaps, ribbon ride) runs as it would for a visitor
async function walk(p){ const H=await p.evaluate(()=>document.documentElement.scrollHeight); for(let y=0;y<H;y+=500){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(220);} await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(600); }
for(const [w,h,tag] of [[1440,900,'desktop-1440'],[768,1024,'tablet-768'],[390,844,'phone-390']]){
  const p=await open(w,h); await walk(p);
  await p.screenshot({path:OUT+'/HOME-full-'+tag+'.png',fullPage:true}); console.log('full',tag);
  if(w===1440){
    await p.locator('.hdr').screenshot({path:OUT+'/SEC-00-header.png'}); await p.addStyleTag({content:'.hdr{visibility:hidden}'});
    for(let i=0;i<names.length;i++){ const el=p.locator('.page[data-page="home"] .ver[data-sec="'+names[i]+'"]:not([hidden])'); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(names[i]==='services'?3500:1400);
      await el.screenshot({path:OUT+'/SEC-'+String(i+1).padStart(2,'0')+'-'+names[i]+'-V1.png'}); console.log('section',names[i]); }
    await p.locator('.ftr').screenshot({path:OUT+'/SEC-11-footer.png'});
  }
  await p.close(); }
await b.close();})();

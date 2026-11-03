// round 5: booking forms (validation + mailto, never "sent"), anchors follow versions, family interactions
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(q){const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>errs.push(q+': '+e.message)); await p.route('https://**',r=>r.abort()); await p.goto(F+q); await p.waitForTimeout(1200); return p;}
for (const v of ['1','2']){
  const p=await page('?all='+v); const f='.book'+v+' form';
  await p.click(f+' button[type=submit]'); console.log('V'+v,'empty submit ->', await p.textContent('.book'+v+' .form-msg'), '| focused:', await p.evaluate(()=>document.activeElement.id));
  let mail=null; p.on('framenavigated',fr=>{}); await p.exposeFunction('noop',()=>{});
  await p.evaluate(()=>{ window.__mail=null; const d=Object.getOwnPropertyDescriptor(Location.prototype,'href'); });
  await p.fill('#bk'+v+'-n','Test Person'); await p.fill('#bk'+v+'-p','6510000000'); await p.fill('#bk'+v+'-a','1 Example St');
  await p.click(f+' .chips button:nth-child(3)');
  const req=p.waitForEvent('request',{timeout:3000}).catch(()=>null);
  await p.click(f+' button[type=submit]'); await p.waitForTimeout(400);
  console.log('V'+v,'filled submit ->', await p.textContent('.book'+v+' .form-msg'));
  console.log('V'+v,'#book is visible version:', await p.evaluate(v=>{const e=document.getElementById('book'); return !!e && !e.closest('.ver').hidden && e.classList.contains('book'+v);},v),
    '| #crew-video ok:', await p.evaluate(()=>{const e=document.getElementById('crew-video'); return !!e && !e.closest('.ver').hidden;}));
  await p.close();
}
let p=await page('?all=1'); await p.click('.fam1 .hoot'); await p.waitForTimeout(300); console.log('feathers canvas drawn:', await p.evaluate(()=>{const c=document.querySelector('.fam1 canvas'); const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data; let n=0; for(let i=3;i<d.length;i+=4) if(d[i]) n++; return n>0;}));
await p.close(); p=await page('?all=2'); const s0=await p.evaluate(()=>document.querySelector('.fam2 .reel').scrollLeft); await p.click('.fam2 .next'); await p.waitForTimeout(800);
console.log('reel next:', s0, '->', await p.evaluate(()=>Math.round(document.querySelector('.fam2 .reel').scrollLeft)));
await p.close();
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'no page errors'); await b.close();})();

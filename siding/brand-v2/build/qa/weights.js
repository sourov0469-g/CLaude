// Synthesised-weight check (brief: "load every weight the design uses — synthesised weights are a defect").
// Every visible text element and SVG text, every page x both versions: first family + computed weight, against the
// @font-face weights actually in the file. Also lists the distinct rendered font sizes in use at 1440 and 390.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const url='file:///home/user/CLaude/siding/brand-v2/site.html';const bad=new Map(),used=new Map(),sizes={};
for(const [w,h] of [[1440,900],[390,844]]){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto(url);await p.waitForTimeout(400);sizes[w]=new Map();
 const loaded=await p.evaluate(()=>{const o={};for(const r of [...document.styleSheets].flatMap(s=>[...s.cssRules]))if(r.type===5){const f=r.style.getPropertyValue('font-family').replace(/['"]/g,'').trim();(o[f]=o[f]||[]).push(+r.style.getPropertyValue('font-weight'))}return o});
 for(const r of ['home','siding','windows','roofing','work','about'])for(const v of ['1','2']){
  await p.evaluate(r=>location.hash='#/'+(r==='home'?'':r),r);await p.waitForTimeout(200);
  await p.evaluate(v=>document.querySelectorAll('.page.on .rv button[data-v="'+v+'"]').forEach(x=>x.click()),v);await p.waitForTimeout(100);
  const rows=await p.evaluate(()=>{const out=[];const roots=[document.querySelector('.page.on'),document.querySelector('header'),document.querySelector('footer')];
   for(const R of roots)for(const e of R.querySelectorAll('*')){if(e.closest('[hidden],template,.rv'))continue;
    const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!own)continue;const s=getComputedStyle(e);if(s.display==='none')continue;
    const fam=s.fontFamily.split(',')[0].replace(/['"]/g,'').trim();out.push([fam,+s.fontWeight,e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/)[0]:''),Math.round(parseFloat(s.fontSize)*10)/10,!!e.ownerSVGElement])}return out});
  for(const [fam,wt,el,fs,svg] of rows){const k=fam+' '+wt;used.set(k,(used.get(k)||0)+1);if(!(loaded[fam]||[]).includes(wt))bad.set(k+' | '+el,(bad.get(k+' | '+el)||0)+1);if(!svg)sizes[w].set(fs,(sizes[w].get(fs)||0)+1);}}
 if(w===1440)console.log('loaded faces',JSON.stringify(loaded));await p.close();}
console.log('family+weight in use',JSON.stringify(Object.fromEntries(used)));
console.log('synthesised (not loaded):',bad.size?'':'none');for(const [k,n] of bad)console.log('  ',k,'x'+n);
for(const w of Object.keys(sizes)){const arr=[...sizes[w]].sort((a,b)=>b[1]-a[1]);console.log(`rendered HTML text sizes at ${w}: ${arr.length} distinct |`,arr.map(([s,n])=>s+'px x'+n).join(', '))}
await b.close()})();

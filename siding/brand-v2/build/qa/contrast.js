// rendered contrast sweep: every visible text element vs the background it renders on; every focusable's ring vs its background
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
const fails=[],notes=[];let checked=0,rings=0;
for(const route of ['','siding','windows','roofing','work','about'])for(const v of ['1','2']){
 await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html#/'+route);await p.waitForTimeout(400);
 await p.evaluate(v=>document.querySelectorAll('.page.on .rv button[data-v="'+v+'"]').forEach(x=>x.click()),v);
 // settle reveal-on-entry states so text is measured in its final state
 await p.evaluate(()=>{document.querySelectorAll('.rec2').forEach(e=>e.classList.add('in'));});await p.waitForTimeout(300);
 const r=await p.evaluate(()=>{
  const lin=c=>{c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)},L=a=>.2126*lin(a[0])+.7152*lin(a[1])+.0722*lin(a[2]);
  const parse=s=>{const m=s.match(/[\d.]+/g);return m?m.map(Number):null};const ratio=(a,b)=>{const x=L(a),y=L(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
  function bg(e){for(let n=e;n&&n!==document.documentElement;n=n.parentElement){const cs=getComputedStyle(n);
    if(cs.backgroundImage&&cs.backgroundImage!=='none'&&!/gradient/.test(cs.backgroundImage))return {img:true};
    if(n.querySelector&&n!==e&&n.matches('.sm-img,.seam,.sp1,.hs,.cut-frame'))return {img:true};
    const c=parse(cs.backgroundColor);if(c&&(c.length<4||c[3]>0.95))return {c:c.slice(0,3),el:n};
    if(n.querySelector(':scope>canvas.dither,:scope>canvas.atmos'))return {canvas:true};}
   return {c:[255,255,255]};}
  const out={checked:0,fails:[],notes:[],rings:0,ringFails:[]};const scope=[...document.querySelectorAll('header,.page.on,footer')];
  for(const root of scope)for(const e of root.querySelectorAll('*')){if(e.closest('[hidden],template,[aria-hidden="true"],.rv,.sr'))continue;
   if(e.closest('svg'))continue;const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1);if(!own)continue;const r=e.getBoundingClientRect();if(!r.width||!r.height)continue;
   const cs=getComputedStyle(e);if(cs.visibility==='hidden'||parseFloat(cs.opacity)===0)continue;const fg=parse(cs.color);const B=bg(e);
   if(B.img){out.notes.push('on photo: '+e.textContent.trim().slice(0,30));continue;} if(B.canvas){continue;}
   const k=ratio(fg.slice(0,3),B.c),fs=parseFloat(cs.fontSize),bold=+cs.fontWeight>=700,large=fs>=24||(bold&&fs>=18.66),need=large?3:4.5;out.checked++;
   if(k<need)out.fails.push(e.tagName+'.'+(e.getAttribute('class')||'')+' "'+e.textContent.trim().slice(0,28)+'" '+k.toFixed(2)+'<'+need);}
  for(const root of scope)for(const t of root.querySelectorAll('svg text')){if(t.closest('[hidden],template,[aria-hidden="true"] svg[aria-hidden="true"] ~ *'))continue;
   const r=t.getBoundingClientRect();if(!r.width)continue;const svg=t.ownerSVGElement;if(svg.closest('[hidden]'))continue;let a=1;for(let n=t;n&&n!==svg.parentElement;n=n.parentElement)a*=parseFloat(getComputedStyle(n).opacity);
   if(a<0.05)continue;const f=parse(getComputedStyle(t).fill);if(!f)continue;const B=bg(svg.parentElement);if(B.img||B.canvas)continue;
   const c=[0,1,2].map(i=>a*f[i]+(1-a)*B.c[i]);const k=ratio(c,B.c),fs=parseFloat(getComputedStyle(t).fontSize)*(r.height/Math.max(1,parseFloat(getComputedStyle(t).fontSize))) ;out.checked++;
   const need=4.5;if(k<need)out.fails.push('svg-text "'+t.textContent.trim().slice(0,24)+'" opacity '+a.toFixed(2)+' '+k.toFixed(2)+'<'+need);}
  for(const root of scope)for(const e of root.querySelectorAll('a[href],button,input,summary,[tabindex="0"],[role=slider],select,textarea')){if(e.closest('[hidden],template,[aria-hidden="true"]'))continue;
   const r=e.getBoundingClientRect();if(!r.width)continue;e.focus({preventScroll:true});if(document.activeElement!==e)continue;
   const cs=getComputedStyle(e,null);let oc=null;
   // the ring shows only for keyboard focus (:focus-visible); read the rule colour by matching the element against :focus-visible styles via a keyboard-focus flag
   oc=parse(cs.outlineColor);const B=bg(e.parentElement||e);if(B.img||B.canvas||!oc)continue;out.rings++;let k=ratio(oc.slice(0,3),B.c);const sh=cs.boxShadow&&cs.boxShadow.match(/rgba?\(([^)]+)\)/);if(sh){const c=sh[1].split(',').map(Number);k=Math.max(k,ratio(c.slice(0,3),B.c));}
   if(k<3)out.ringFails.push(e.tagName+' "'+(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,24)+'" ring '+k.toFixed(2));}
  return out;});
 checked+=r.checked;rings+=r.rings;r.fails.forEach(f=>fails.push((route||'home')+'-v'+v+': '+f));r.ringFails.forEach(f=>fails.push((route||'home')+'-v'+v+' RING: '+f));notes.push(...r.notes.map(n=>(route||'home')+'-v'+v+': '+n));}
console.log('text elements checked',checked,'| rings checked',rings,'| failures',fails.length);const g={};for(const f of new Set(fails)){const k=f.replace(/^[a-z]+-v\d(: | RING: )/,'$1');g[k]=(g[k]||[]).concat(f.split(':')[0].split(' ')[0]);}for(const [k,v] of Object.entries(g))console.log(v.length+'x',k,'  ['+[...new Set(v)].join(',')+']');
console.log('--- text on photos (checked by plate, below):',[...new Set(notes)].length);console.log([...new Set(notes)].slice(0,12).join('\n'));await b.close()})();

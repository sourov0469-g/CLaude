// keyboard-only walkthrough: every page, both versions; records each focus stop and checks indicator, visibility, traps
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
const all={};let total=0;
for(const route of ['','siding','windows','roofing','work','about'])for(const v of ['1','2']){
 await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html#/'+route);await p.waitForTimeout(400);
 await p.evaluate(v=>document.querySelectorAll('.page.on .rv button[data-v="'+v+'"]').forEach(x=>x.click()),v);await p.evaluate(()=>scrollTo(0,0));await p.focus('.skip');
 const stops=[];let same=0,last=null;
 for(let i=0;i<400;i++){await p.keyboard.press('Tab');
  const s=await p.evaluate(()=>{const e=document.activeElement;if(!e||e===document.body)return null;const cs=getComputedStyle(e);
   const ring=(cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>=2)||/rgb/.test(cs.boxShadow);
   const r=e.getBoundingClientRect();const hidden=!!e.closest('[aria-hidden="true"],[hidden],template')||r.width===0;
   if(!e.dataset.kbi)e.dataset.kbi=String(Math.random()).slice(2,10);const id=e.dataset.kbi+'|'+e.tagName+'|'+(e.textContent||e.getAttribute('aria-label')||e.name||'').trim().slice(0,30);
   return {id,ring,hidden,inPage:!!e.closest('.page.on')||!!e.closest('header,footer')||e.classList.contains('skip')||e.classList.contains('skip2'),oc:cs.outlineColor}});
  if(!s)break; if(last&&s.id===last){same++;if(same>3)break;}else same=0; last=s.id;
  if(stops.length&&s.id===stops[0].id)break; stops.push(s);}
 total+=stops.length;
 all[(route||'home')+'-v'+v]={n:stops.length,noRing:stops.filter(s=>!s.ring).map(s=>s.id).slice(0,5),hidden:stops.filter(s=>s.hidden).map(s=>s.id).slice(0,5),offPage:stops.filter(s=>!s.inPage).map(s=>s.id).slice(0,5),trap:same>3?last:false};}
for(const [k,v] of Object.entries(all))console.log(k,JSON.stringify(v));console.log('total stops',total);await b.close()})();

// Viewport sweep at the brief's veto widths (390 and 768, plus 1024): every page x both versions.
// Reports: page-level horizontal overflow; visible elements running past the viewport edge (and not clipped by an ancestor);
// clipped text (overflow hidden/clip with scrollWidth > clientWidth); overlapping text boxes in the same section;
// tap targets under 24 px (WCAG 2.5.8); bordered controls whose text touches the border; JS errors. Optional full-page shots: node vp.js shots
const {chromium}=require('playwright');const SHOTS=process.argv[2]==='shots';const OUT=process.argv[3]||'.';
(async()=>{const b=await chromium.launch();const url='file:///home/user/CLaude/siding/brand-v2/site.html';const out={};let total=0;
for(const [w,h] of [[390,844],[768,1024],[1024,768]]){const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto(url);await p.waitForTimeout(500);
 for(const r of ['home','siding','windows','roofing','work','about'])for(const v of ['1','2']){
  await p.evaluate(r=>location.hash='#/'+(r==='home'?'':r),r);await p.waitForTimeout(250);
  await p.evaluate(v=>document.querySelectorAll('.page.on .rv button[data-v="'+v+'"]').forEach(x=>x.click()),v);await p.waitForTimeout(150);
  // walk the page so scroll-driven states settle at each screen, then check at each stop
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);const found=new Map();
  for(let y=0;y<H;y+=Math.round(h*0.8)){await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(120);
   const r1=await p.evaluate(([w,h])=>{const res=[];const vw=document.documentElement.clientWidth;
    const shown=e=>{if(e.closest('[hidden],template,.rv,.sr,[aria-hidden="true"]'))return false;const dt=e.closest('details');if(dt&&!dt.open&&!e.closest('summary'))return false;const s=getComputedStyle(e);if(s.visibility==='hidden'||+s.opacity===0||s.display==='none')return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<h};
    const clippedBy=e=>{for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const s=getComputedStyle(a);if(/(hidden|clip|auto|scroll)/.test(s.overflowX)){const ar=a.getBoundingClientRect();if(ar.right<=vw+1&&ar.left>=-1)return true}}return false};
    const name=e=>{const sec=e.closest('section[id],.sec[id],footer,header');return (sec?(sec.id||sec.tagName.toLowerCase()):'?')+' '+e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/)[0]:'')+' "'+(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,24)+'"'};
    const root=[document.querySelector('.page.on'),document.querySelector('header'),document.querySelector('footer')].filter(Boolean);
    if(document.documentElement.scrollWidth>vw)res.push(['overflow-page',document.documentElement.scrollWidth+'>'+vw]);
    for(const R of root)for(const e of R.querySelectorAll('*')){if(!shown(e))continue;const r=e.getBoundingClientRect();
     if((r.right>vw+1||r.left<-1)&&!clippedBy(e)&&!e.closest('svg'))res.push(['past-edge',name(e)+' '+Math.round(r.left)+'..'+Math.round(r.right)]);
     const s=getComputedStyle(e);if(/(hidden|clip)/.test(s.overflowX+s.overflowY)&&r.width>2&&r.height>2&&e.children.length===0&&e.textContent.trim()&&(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+2))res.push(['clipped-text',name(e)]);
     if(e.matches('a,button,input,select,textarea,summary,[role=tab],[role=slider]')){const lb=e.matches('input')&&(e.closest('label')||(e.id&&document.querySelector('label[for="'+e.id+'"]')));const lr=lb?lb.getBoundingClientRect():r,t=lr.width*lr.height>r.width*r.height?lr:r;  // the larger of the input and its label is the target
     if(parseFloat(s.borderLeftWidth)>0&&[...e.childNodes].some(n=>(n.nodeType===3&&n.textContent.trim())||(n.nodeType===1&&!n.matches('.sr,svg')&&n.textContent.trim()))&&!e.matches('input,select,textarea')&&(parseFloat(s.paddingLeft)<8||parseFloat(s.paddingRight)<8))res.push(['tight-pad',name(e)+' '+s.paddingLeft+'/'+s.paddingRight]);   // bordered control, text against the border
     if((t.width<24||t.height<24)&&!e.closest('p'))res.push(['tap<24',name(e)+' '+Math.round(t.width)+'x'+Math.round(t.height)]);}}
    // overlapping text: leaf text boxes in the same section that intersect
    for(const R of root){const leaves=[...R.querySelectorAll('h1,h2,h3,h4,p,li,a,button,span,label,figcaption,dt,dd,small,strong')].filter(e=>shown(e)&&e.textContent.trim()&&![...e.children].some(c=>c.textContent.trim())&&!e.closest('svg'));
     for(let i=0;i<leaves.length;i++){const a=leaves[i].getBoundingClientRect();for(let j=i+1;j<leaves.length;j++){const B=leaves[j];if(leaves[i].contains(B)||B.contains(leaves[i]))continue;const c=B.getBoundingClientRect();
      const ix=Math.min(a.right,c.right)-Math.max(a.left,c.left),iy=Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top);
      if(ix>4&&iy>4)res.push(['text-overlap',name(leaves[i])+' x '+name(B)]);}}}
    return res},[w,h]);
   for(const [k,m] of r1){const key=k+' | '+m;if(!found.has(key))found.set(key,y)}}
  if(SHOTS){await p.evaluate(()=>window.scrollTo(0,0));await p.screenshot({path:`${OUT}/vp-${w}-${r}-v${v}.png`,fullPage:true})}
  const list=[...found.keys()];total+=list.length;out[`${w}-${r}-v${v}`]=list;}
 out['errs-'+w]=errs;await p.close();}
for(const [k,v] of Object.entries(out))if(v.length)console.log(k,'\n  '+v.join('\n  '));
console.log('page states with findings:',Object.entries(out).filter(([k,v])=>v.length).length,'of',Object.keys(out).length);await b.close()})();

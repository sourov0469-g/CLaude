const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const url='file:///home/user/CLaude/siding/brand-v2/site.html';const res={};
for(const [w,h] of [[1440,900],[375,780]]){const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto(url);await p.waitForTimeout(500);
 for(const r of ['home','siding','windows','roofing','work','about']){await p.evaluate(r=>location.hash='#/'+(r==='home'?'':r),r);await p.waitForTimeout(300);
  for(const v of ['1','2']){await p.evaluate(v=>document.querySelectorAll('.page.on .rv button[data-v="'+v+'"]').forEach(x=>x.click()),v);await p.waitForTimeout(150);
   const a=await p.evaluate(()=>{const pg=document.querySelector('.page.on');const vis=e=>!e.closest('[hidden]');
    const h1=[...pg.querySelectorAll('h1')].filter(vis).length;const noalt=[...pg.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length;
    const badlinks=[...document.querySelectorAll('a[href^="#/"]')].map(a=>a.getAttribute('href').split('/')[1]).filter(k=>k&&!document.getElementById('page-'+k)).length;
    const sw=document.documentElement.scrollWidth;const btnNoName=[...pg.querySelectorAll('button')].filter(vis).filter(x=>!(x.textContent.trim()||x.getAttribute('aria-label'))).length;
    return {h1,noalt,badlinks,sw,btnNoName};});
   res[`${w}-${r}-v${v}`]=a;}}
 res['errs-'+w]=errs;await p.close();}
const bad=Object.entries(res).filter(([k,v])=>Array.isArray(v)?v.length:(v.h1!==1||v.noalt||v.badlinks||v.btnNoName||(k.startsWith('375')&&v.sw>375)));
console.log('checked',Object.keys(res).length,'problems',JSON.stringify(bad));await b.close()})();

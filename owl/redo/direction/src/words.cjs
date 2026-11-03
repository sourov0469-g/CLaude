const {chromium}=require('playwright'); const fs=require('fs'); const path=require('path'); const ROOT=process.argv[2];
(async()=>{const b=await chromium.launch(); const p=await b.newPage();
await p.route('http://local/**',async r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));
 if(!fs.existsSync(f))return r.fulfill({status:404,body:''}); r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':f.endsWith('.html')?'text/html':f.endsWith('.css')?'text/css':'application/octet-stream'}});});
for(const d of ['d1','d2','d3']){await p.goto('http://local/board/'+d+'.html');
 const r=await p.evaluate(()=>{const cnt=sel=>{const el=document.querySelector(sel).cloneNode(true);el.querySelectorAll('.nav,.hnav,svg').forEach(n=>n.remove());
  const t=el.innerText||el.textContent; const w=t.replace(/[·→↓|]/g,' ').split(/\s+/).filter(x=>x&&!/^\(?\d{3}\)?$|^\d{3}-\d{4}$|^0\d$/.test(x)); return [w.length,w.join(' ')]};
  const h=document.querySelector('.hero h2,.hero .hcopy h2'); return {hero:cnt('.hero'),pyn:cnt('.pyn'),h:h?h.innerText.split(/\s+/).length:0}});
 console.log(d,'HERO',r.hero[0],'| headline',r.h,'| PYN',r.pyn[0]); console.log('  ',r.hero[1]); console.log('  ',r.pyn[1]);}
await b.close();})();

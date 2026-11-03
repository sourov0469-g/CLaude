const {chromium}=require('playwright'); const fs=require('fs'); const path=require('path');
const ROOT=process.argv[2];
(async()=>{const b=await chromium.launch(); const out={};
for(const d of ['d1','d2','d3']){const p=await b.newPage({viewport:{width:1600,height:900}});
await p.route('http://local/**',async r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));
 if(!fs.existsSync(f))return r.fulfill({status:404,body:''});const ext=path.extname(f);
 const ct={'.html':'text/html','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.css':'text/css','.woff2':'font/woff2'}[ext]||'application/octet-stream';
 r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':ct}});});
await p.goto('http://local/board/'+d+'.html'); await p.evaluate(()=>document.fonts.ready);
const h=await p.evaluate(()=>document.documentElement.scrollHeight); await p.setViewportSize({width:1600,height:h});
out[d]=await p.evaluate(()=>{const g=s=>[...document.querySelectorAll(s)].map(e=>{const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y+scrollY),Math.round(r.width),Math.round(r.height)]});
 return {hero:g('.hero'),pyn:g('.pyn'),bgp:g('.bgp'),motifs:g('.motifs'),cc:g('.cc')}}); await p.close();}
fs.writeFileSync(ROOT+'/board/rects.json',JSON.stringify(out)); console.log(JSON.stringify(out)); await b.close();})();

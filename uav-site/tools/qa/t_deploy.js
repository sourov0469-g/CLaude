const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const B='http://127.0.0.1:8765';
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
const routes=['/','/services/','/services/roof-inspections/','/services/rtk-mapping/','/services/3d-modelling/','/services/aerial-monitoring/','/services/aerial-photography-videography/','/process-deliverables/','/about/','/contact/','/privacy-cookies/'];
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const ctx=await b.newContext({viewport:{width:1280,height:800}});const p=await ctx.newPage();
 const reqs=new Set(),errs=[],bad=[];
 p.on('request',r=>reqs.add(new URL(r.url()).origin));
 p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url())});
 p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text())});p.on('pageerror',e=>errs.push('pageerror '+e.message));
 const titles={},descs={};
 for(const r of routes){
  await p.goto(B+r);await p.waitForTimeout(700);
  const d=await p.evaluate(()=>({title:document.title,desc:document.querySelector('meta[name=description]')?.content,canon:document.querySelector('link[rel=canonical]')?.href,h1:document.querySelectorAll('h1').length,lang:document.documentElement.lang,og:document.querySelector('meta[property="og:title"]')?.content,ogimg:document.querySelector('meta[property="og:image"]')?.content,tw:document.querySelector('meta[name="twitter:card"]')?.content,ld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{return JSON.parse(s.textContent)['@type']}catch(e){return 'INVALID'}}),imgsBroken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length,imgNoDims:[...document.images].filter(i=>!i.getAttribute('width')||!i.getAttribute('height')).length,cur:document.querySelector('[aria-current=page]')?.textContent.trim()}));
  ok(d.h1===1,r+' one h1');ok(d.canon===('https://www.uavaerialsolutions.co.uk'+r),r+' canonical '+d.canon);
  ok(d.title.length>20&&d.title.length<=66,r+' title len '+d.title.length+': '+d.title);ok(d.desc&&d.desc.length>70&&d.desc.length<=170,r+' desc len '+(d.desc||'').length);
  ok(!titles[d.title],r+' unique title');titles[d.title]=1;ok(!descs[d.desc],r+' unique description');descs[d.desc]=1;
  ok(d.og&&d.ogimg&&d.tw==='summary_large_image',r+' OG/Twitter present');ok(!d.ld.includes('INVALID')&&d.ld.length>0,r+' JSON-LD valid: '+d.ld.join(','));
  ok(d.imgsBroken===0&&d.imgNoDims===0,r+' images ok (broken '+d.imgsBroken+', no dims '+d.imgNoDims+')');ok(d.lang==='en-GB',r+' lang en-GB');
 }
 ok([...reqs].every(o=>o===B),'all requests same-origin: '+[...reqs].join(', '));
 ok(bad.length===0,'no 4xx/5xx during crawl '+JSON.stringify(bad));
 // 404
 const r404=await p.goto(B+'/nope/');ok(r404.status()===404,'404 status served');ok(await p.evaluate(()=>document.querySelector('h1').textContent.includes('not here')),'404 page content');
 // sitemap / robots / manifest
 for(const f of ['/sitemap.xml','/robots.txt','/manifest.webmanifest','/favicon.ico','/assets/og/home.jpg','/assets/img/favicon-32.png','/assets/img/apple-touch-icon.png']){const r=await p.request.get(B+f);ok(r.status()===200,f+' 200 ('+r.headers()['content-type']+')')}
 const sm=await (await p.request.get(B+'/sitemap.xml')).text();ok(routes.every(r=>sm.includes('<loc>https://www.uavaerialsolutions.co.uk'+r+'</loc>')),'sitemap lists every route');
 // link crawl
 const links=new Set();for(const r of routes){await p.goto(B+r);(await p.evaluate(()=>[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')))).forEach(h=>links.add(h))}
 let linkBad=[];for(const h of links){if(/^(https?:|mailto:|tel:)/.test(h))continue;const u=h.split('#')[0].split('?')[0];if(!u)continue;const r=await p.request.get(B+u);if(r.status()!==200)linkBad.push(h)}
 ok(linkBad.length===0,'all internal links 200 ('+links.size+' unique hrefs) '+JSON.stringify(linkBad));
 // external links security
 await p.goto(B+'/');const ext=await p.evaluate(()=>[...document.querySelectorAll('a[target=_blank]')].map(a=>a.rel));ok(ext.length>0&&ext.every(r=>/noopener/.test(r)),'target=_blank links have rel noopener ('+ext.length+')');
 console.log('errors:',[...new Set(errs)]);
 // no-JS
 const c2=await b.newContext({viewport:{width:1280,height:800},javaScriptEnabled:false});const p2=await c2.newPage();await p2.goto(B+'/services/');await p2.waitForTimeout(500);
 const vis=await p2.evaluate(()=>{const els=[...document.querySelectorAll('[data-reveal]')];return {n:els.length,hidden:els.filter(e=>getComputedStyle(e).opacity==='0').length}});ok(vis.hidden===0,'no-JS: content visible (reveal items hidden: '+vis.hidden+'/'+vis.n+')');
 await p2.screenshot({path:__dirname+'/t2/nojs.png'});
 console.log(fails?fails+' FAILED':'ALL PASSED');await b.close();
})();

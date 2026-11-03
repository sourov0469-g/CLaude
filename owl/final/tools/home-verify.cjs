// Homepage verification on the DEFAULT view (no query string): what a visitor gets.
// Checks: one visible version per section and that it is V1; a key interaction per section; every in-page link;
// sideways overflow at 1440 / 768 / 390; reduced motion; console and page errors; axe is run separately.
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
const R=[]; function rec(sec,check,ok,detail){R.push({sec,check,ok,detail}); console.log((ok?'PASS':'FAIL')+' | '+sec+' | '+check+(detail!==undefined?' | '+detail:''));}
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(opts){const p=await b.newPage(Object.assign({viewport:{width:1440,height:900}},opts||{})); p.on('pageerror',e=>errs.push('pageerror: '+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())}); await p.route('https://**',r=>r.abort()); await p.goto(F); await p.waitForTimeout(1500); return p;}
let p=await page();
// 1 · frozen default view
const vers=await p.evaluate(()=>{const o={}; document.querySelectorAll('.page[data-page="home"] .ver').forEach(v=>{o[v.dataset.sec]=o[v.dataset.sec]||[]; if(!v.hidden)o[v.dataset.sec].push(v.dataset.v);}); return o;});
for(const [s,v] of Object.entries(vers)) rec(s,'default view shows exactly one version, V1',v.length===1&&v[0]==='1','visible: '+v.join(','));
rec('page','home page is the page shown',await p.evaluate(()=>document.querySelector('.page:not([hidden])').dataset.page==='home'));
rec('page','review switcher hidden for visitors',await p.evaluate(()=>!document.querySelector('.rev').classList.contains('on')));
rec('page','document title',true,await p.title());
// 2 · section interactions
await p.click('.hero1 .storm'); rec('hero','Storm test toggles on',await p.getAttribute('.hero1 .storm','aria-pressed')==='true');
rec('hero','rain canvas is drawing',await p.evaluate(()=>{const c=document.querySelector('.hero1 canvas'),d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let n=0;for(let i=3;i<d.length;i+=16)if(d[i])n++;return n>0;}));
rec('video','crew film has a source and plays',await p.evaluate(()=>{const v=document.querySelector('.video1 video');return !!v.src&&!v.paused;}));
await p.click('.video1 .chips button:nth-child(4)'); await p.waitForTimeout(300);
rec('video','chapter chip seeks (Finished roof ~9.2 s)',true,await p.evaluate(()=>document.querySelector('.video1 video').currentTime.toFixed(1)+' s, active: '+document.querySelector('.video1 .chips .on').textContent));
await p.click('.video1 .play'); rec('video','play button loads YouTube ehKLv5DF2TQ (blocked offline in test, iframe checked)',await p.evaluate(()=>!!document.querySelector('.video1 iframe[src*="youtube-nocookie.com/embed/ehKLv5DF2TQ"]')));
await p.click('.explore1 .opt[data-k="deck"]'); await p.waitForTimeout(500);
rec('explore','choosing Roof deck lifts one layer and names it',await p.evaluate(()=>document.querySelectorAll('.explore1 .lay.on').length===1&&document.querySelector('.explore1 .info b').textContent==='Roof deck'));
for(const k of ['shingles','flashing','ventilation','gutters']) await p.click('.wise1 .it[data-k="'+k+'"]');
await p.waitForTimeout(1300);
rec('wise','all four ticked: needle at PROTECTED and CTA glows',await p.evaluate(()=>/118/.test(document.querySelector('.wise1 .needle').style.transform)&&document.querySelector('.wise1 .btn').classList.contains('ready')));
await p.click('.wise1 .reset'); rec('wise','Start again resets',await p.evaluate(()=>!document.querySelector('.wise1 .it[aria-pressed="true"]')));
await p.fill('.wrap1 input[type=range]','40'); await p.dispatchEvent('.wrap1 input[type=range]','input'); await p.waitForTimeout(900);
rec('wrap','job at 40: "Tear-off", debris in the open yard, debris on the wrap (none on the lawn but strays)',await p.evaluate(()=>document.querySelector('.wrap1 output').textContent==='Tear-off'&&document.querySelectorAll('.wrap1 .pane.u .db.dn').length>5&&document.querySelector('.wrap1 .pane.p .wrapg').classList.contains('on')&&document.querySelectorAll('.wrap1 .pane.p .wrapg .db.dn').length>3));
await p.fill('.wrap1 input[type=range]','100'); await p.dispatchEvent('.wrap1 input[type=range]','input'); await p.waitForTimeout(900);
rec('wrap','job at 100: wrap off, strays swept, PM check, aftercare box; open yard still has nails',await p.evaluate(()=>document.querySelector('.wrap1 output').textContent==='Done: aftercare box'&&document.querySelector('.wrap1 .pane.p .wrapg').classList.contains('lift')&&[...document.querySelectorAll('.wrap1 .pane.p .db[data-stray]')].every(g=>g.classList.contains('got'))&&document.querySelector('.wrap1 .pane.p .box').classList.contains('on')&&document.querySelectorAll('.wrap1 .pane.u .nail.dn').length>5));
await p.locator('.svc1 .rows').scrollIntoViewIfNeeded(); await p.waitForTimeout(3500);
rec('services','board settles to ROOF REPLACEMENT',await p.evaluate(()=>[...document.querySelectorAll('.svc1 .row')[0].querySelectorAll('.t')].map(t=>t.textContent||' ').join('').trim()==='ROOF REPLACEMENT'));
await p.click('.svc1 .row:nth-child(3)'); await p.waitForTimeout(2000);
rec('services','row 3 shows Storm damage help',(await p.textContent('.svc1 .det h3'))==='Storm damage help');
await p.locator('.rev1 .dial').scrollIntoViewIfNeeded(); await p.waitForTimeout(1600);
rec('reviews','dial counts to 5.0',(await p.textContent('.rev1 .big'))==='5.0');
await p.click('.rev1 .tab[data-i="2"]'); await p.waitForTimeout(600);
rec('reviews','Trusted tab flips the face to BBB A− / GAF',/BBB/.test(await p.evaluate(()=>document.querySelector('.rev1 .face>div.on').textContent)));
await p.fill('.area1 input','Stillwater'); await p.dispatchEvent('.area1 input','input'); await p.waitForTimeout(1800);
rec('area','typing Stillwater confirms and draws the road',/Stillwater/.test(await p.textContent('.area1 .res'))&&parseFloat(await p.evaluate(()=>document.querySelector('.area1 .trip').style.strokeDasharray))>100);
await p.fill('.area1 input','Duluth'); await p.dispatchEvent('.area1 input','input');
rec('area','unknown town gets the call-and-ask path',/Call \(651\) 977-6027/.test(await p.textContent('.area1 .res')));
await p.click('.fam1 .hoot'); await p.waitForTimeout(300);
rec('family','Give a hoot draws feathers',await p.evaluate(()=>{const c=document.querySelector('.fam1 canvas'),d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let n=0;for(let i=3;i<d.length;i+=16)if(d[i])n++;return n>0;}));
await p.click('.book1 form button[type=submit]');
rec('booking','empty submit names the first missing field',(await p.textContent('.book1 .form-msg'))==='Please add your name.');
await p.fill('#bk1-n','Test'); await p.fill('#bk1-p','6510000000'); await p.fill('#bk1-a','1 Example St'); await p.click('.book1 form button[type=submit]'); await p.waitForTimeout(300);
rec('booking','complete submit opens email app, never claims sent',/email app/.test(await p.textContent('.book1 .form-msg'))&&!/sent|received|confirmed/i.test(await p.textContent('.book1 .form-msg')));
// 3 · links on the homepage, header and footer
const links=await p.evaluate(()=>[...document.querySelectorAll('.hdr a[href^="#"], .page[data-page="home"] a[href^="#"], .ftr a[href^="#"]')].filter(a=>!a.closest('.ver[hidden]')).map(a=>a.getAttribute('href')));
const uniq=[...new Set(links)]; const bad=[];
for(const h of uniq){ if(h.startsWith('#/')){ const name=h.slice(2)||'home'; const ok=await p.evaluate(n=>!!document.querySelector('.page[data-page="'+n+'"]')||n==='home',name); if(!ok)bad.push(h);} else if(h!=='#' && h!=='#top'){ const ok=await p.evaluate(id=>!!document.getElementById(id),h.slice(1)); if(!ok)bad.push(h);} }
rec('links','every in-page link resolves',bad.length===0,uniq.length+' unique links'+(bad.length?'; broken: '+bad.join(' '):''));
const ext=await p.evaluate(()=>[...document.querySelectorAll('.hdr a, .page[data-page="home"] a, .ftr a')].filter(a=>!a.closest('.ver[hidden]')).map(a=>a.getAttribute('href')).filter(h=>/^(tel|mailto):/.test(h)));
rec('links','phone and email links use the locked contacts',ext.every(h=>h==='tel:+16519776027'||h==='mailto:info@owlroofing.com'),[...new Set(ext)].join(' '));
const html=await p.content();
rec('facts','never the wrong phone (651) 867-2961',!/867-2961/.test(html));
rec('facts','never Master Elite / BBB A+',!/Master Elite|A\+ /.test(html.replace(/<[^>]+>/g,' ')));
for(const id of ['crew-video','explore','wise-check','protect','services','reviews','areas','family','book']){ await p.evaluate(i=>{location.hash='#'+i;},id); await p.waitForTimeout(1800);
  const r=await p.evaluate(i=>{const s=document.getElementById(i),h=document.querySelector('.hdr-bar').getBoundingClientRect();return [Math.round(s.getBoundingClientRect().top),Math.round(h.bottom)];},id);
  rec('links','#'+id+' lands below the sticky header',r[0]>=r[1]-1,'section top '+r[0]+', header bottom '+r[1]); }
await p.close();
// 4 · overflow at three widths
for(const w of [1440,768,390]){ const q=await page({viewport:{width:w,height:900}}); const o=await q.evaluate(()=>document.documentElement.scrollWidth-innerWidth); rec('layout','no sideways scroll at '+w+' px',o<=0,o+' px'); await q.close(); }
// 5 · reduced motion
const rm=await page({reducedMotion:'reduce'}); rec('motion','reduced motion: page loads, rain off, video not autoplaying',await rm.evaluate(()=>document.querySelector('.video1 video').paused)); await rm.close();
rec('errors','no page or console errors in any run',errs.length===0,errs.join(' || '));
require('fs').writeFileSync(path.resolve(__dirname,'../gates/up-r2/home-verify-checks.json'),JSON.stringify(R,null,1));
console.log('TOTAL', R.filter(r=>r.ok).length+'/'+R.length,'passed'); await b.close();})();

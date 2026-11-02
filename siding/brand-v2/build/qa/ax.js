// accessibility-tree audit: heading outline, landmarks, nameless controls/images, from Chromium's AX tree (what a screen reader reads)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});const c=await p.context().newCDPSession(p);
const report={};
for(const route of ['','siding','windows','roofing','work','about'])for(const v of ['1','2']){
 await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html#/'+route);await p.waitForTimeout(500);
 await p.evaluate(v=>document.querySelectorAll('.page.on .rv button[data-v="'+v+'"]').forEach(x=>x.click()),v);await p.waitForTimeout(200);
 const {nodes}=await c.send('Accessibility.getFullAXTree');
 const live=nodes.filter(n=>!n.ignored);const role=n=>n.role&&n.role.value,name=n=>(n.name&&n.name.value||'').trim();
 const heads=live.filter(n=>role(n)==='heading').map(n=>{const l=(n.properties||[]).find(p=>p.name==='level');return {l:l?l.value.value:0,t:name(n).slice(0,40)}});
 const skips=[];let prev=0;heads.forEach(h=>{if(prev&&h.l>prev+1)skips.push(`h${prev}→h${h.l} "${h.t}"`);prev=h.l;});
 const h1=heads.filter(h=>h.l===1).length;
 const lm={};live.filter(n=>['banner','navigation','main','contentinfo','region','complementary','search','form'].includes(role(n))).forEach(n=>{lm[role(n)]=(lm[role(n)]||[]).concat(name(n).slice(0,30))});
 const nameless=live.filter(n=>['button','link','img','image','textbox','checkbox','radio','slider','tab','combobox'].includes(role(n))&&!name(n)).map(n=>role(n));
 report[(route||'home')+'-v'+v]={h1,heads:heads.length,skips,nameless,landmarks:Object.fromEntries(Object.entries(lm).map(([k,v])=>[k,v.length+(k==='navigation'?' '+JSON.stringify(v):'')]))};}
for(const [k,v] of Object.entries(report))console.log(k,JSON.stringify(v));await b.close()})();

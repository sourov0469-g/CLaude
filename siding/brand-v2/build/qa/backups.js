// Packed backups: a normal load builds no backup templates; ?backups unpacks every one into its own section, without errors.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const u='file:///home/user/CLaude/siding/brand-v2/site.html';
const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(u);await p.waitForTimeout(300);
const n0=await p.evaluate(()=>document.querySelectorAll('template.bk').length),cnt=+await p.evaluate(()=>document.getElementById('aps-backups').dataset.count);
await p.goto(u+'?backups');await p.waitForFunction(()=>document.documentElement.dataset.backups==='unpacked',null,{timeout:20000});
const r=await p.evaluate(()=>{const t=[...document.querySelectorAll('template.bk')];return {n:t.length,inPlace:t.filter(x=>x.parentElement.id===x.dataset.sec).length,empty:t.filter(x=>!x.innerHTML.trim()).length}});
console.log('normal load templates',n0,'| packed',cnt,'| unpacked',r.n,'| in their own section',r.inPlace,'| empty',r.empty,'| errors',errs.length);await b.close()})();

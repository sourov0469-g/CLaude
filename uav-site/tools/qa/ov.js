const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});let bad=0;
for(const w of [320,360,390,430,600,768,820,1024,1100,1180,1280,1366,1440,1600,1920]){const c=await b.newContext({viewport:{width:w,height:w<700?800:900}});const p=await c.newPage();
await p.goto('http://localhost:8767/');await p.waitForTimeout(4000);
const r=await p.evaluate(()=>{const q=s=>[...document.querySelectorAll(s)].filter(e=>e.offsetParent!==null||getComputedStyle(e).position==='fixed');const els=[...q('[data-vf-mode]'),...q('[data-capture]'),...q('.hud-n'),...q('.vf-thumb')];const rs=els.map(e=>[e.className.slice(0,14),e.getBoundingClientRect()]);const o=[];for(let i=0;i<rs.length;i++)for(let j=i+1;j<rs.length;j++){const a=rs[i][1],b=rs[j][1];if(a.left<b.right-1&&b.left<a.right-1&&a.top<b.bottom-1&&b.top<a.bottom-1)o.push(rs[i][0]+'x'+rs[j][0])}const vf=document.querySelector('.vf').getBoundingClientRect();const bar=document.querySelector('.vf-bar').getBoundingClientRect();return {o,barInside:bar.left>=vf.left&&bar.right<=vf.right,sw:document.documentElement.scrollWidth<=innerWidth}});
if(r.o.length||!r.barInside||!r.sw){bad++;console.log(w,JSON.stringify(r))}await c.close()}
console.log(bad?bad+' bad':'hero controls clean at all widths');await b.close()})()

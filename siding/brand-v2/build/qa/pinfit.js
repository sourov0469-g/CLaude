// for each pinned section at 375: scroll to mid-run, compare content box to the sticky viewport
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:375,height:740},hasTouch:true,isMobile:true});
const res=[];for(const [route,sel,stick,v] of [['','[data-hero1]','.h1-stick',1],['','[data-hero2]','.h1-stick',2],['','[data-rec1]','.rec-stick',1],['','[data-wa1]','.wa-stick',1],['windows','[data-wnp]','.wa-stick',1],['roofing','[data-rfp]','.wa-stick',1],['work','[data-wkp2]','.h1-stick',2]]){
 await p.goto('file:///home/user/CLaude/siding/brand-v2/site.html#/'+route);await p.waitForTimeout(500);
 const r=await p.evaluate(([sel,stick,v])=>{const e=document.querySelector(sel);const sec=e.closest('.sec');if(v===2)sec.querySelector('.rv button[data-v="2"]').click();
   scrollTo(0,e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.5);return 1},[sel,stick,v]);await p.waitForTimeout(500);
 const m=await p.evaluate(([sel,stick])=>{const s=document.querySelector(sel+' '+stick);const sb=s.getBoundingClientRect();let top=1e9,bot=-1e9;
   s.querySelectorAll('h1,h2,p,ol,svg,.row,.pls').forEach(x=>{const r=x.getBoundingClientRect();if(r.height&&getComputedStyle(x).visibility!=='hidden'&&!x.closest('[hidden]')){top=Math.min(top,r.top);bot=Math.max(bot,r.bottom);}});
   return {stickTop:Math.round(sb.top),stickBot:Math.round(sb.bottom),contentTop:Math.round(top),contentBot:Math.round(bot)}},[sel,stick]);
 res.push([sel,m,m.contentTop<m.stickTop-1||m.contentBot>m.stickBot+1?'CLIPPED':'ok']);}
res.forEach(r=>console.log(JSON.stringify(r)));await b.close()})();

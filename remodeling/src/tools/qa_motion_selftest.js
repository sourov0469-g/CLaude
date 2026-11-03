// QA-2: self-test of qa_motion.js overlaps(): a real collision must count (1); the same collision under an opaque cover must not (0).
const { chromium } = require('playwright'); const fs=require('fs');
const src=fs.readFileSync('/home/user/CLaude/remodeling/src/tools/qa_motion.js','utf8'); const fn=src.slice(src.indexOf('function overlaps() {'), src.indexOf('\n}\n', src.indexOf('function overlaps() {'))+2);
(async()=>{const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.goto('file:///home/user/CLaude/remodeling/site/contact.html'); await p.waitForTimeout(1500);
 await p.evaluate(()=>{const h=document.querySelector('main h1'); h.scrollIntoView(); });  await p.waitForTimeout(800);
 const before=await p.evaluate('(()=>{'+fn+';return overlaps();})()');
 await p.evaluate(()=>{const h=document.querySelector('main h1'); const r=h.getBoundingClientRect(); const q=document.createElement('p'); q.textContent='A collision test line that sits on the heading'; Object.assign(q.style,{position:'fixed',left:r.left+'px',top:(r.top+4)+'px',width:r.width+'px',zIndex:5,margin:0}); h.closest('section').appendChild(q);});
 const after=await p.evaluate('(()=>{'+fn+';return overlaps();})()');
 // the same collision hidden under an opaque cover
 await p.evaluate(()=>{const q=[...document.querySelectorAll('main p')].find(x=>/collision test/.test(x.textContent)); const c=document.createElement('div'); const r=q.getBoundingClientRect(); Object.assign(c.style,{position:'fixed',left:(r.left-10)+'px',top:(r.top-30)+'px',width:(r.width+20)+'px',height:(r.height+60)+'px',background:'#fff',zIndex:9}); document.body.appendChild(c);});
 const dbg2=await p.evaluate(()=>{const q=[...document.querySelectorAll('main p')].find(x=>/collision test/.test(x.textContent));const r=q.getBoundingClientRect();const c=document.body.lastElementChild; return [c.tagName, JSON.stringify(c.getBoundingClientRect()), getComputedStyle(c).position, document.elementsFromPoint(r.left+r.width/2,r.top+r.height/2).slice(0,3).map(e=>e.tagName+'.'+e.className)]}); console.log(JSON.stringify(dbg2));
 const covered=await p.evaluate('(()=>{'+fn+';return overlaps();})()');
 const dbg=await p.evaluate(()=>{const q=[...document.querySelectorAll('main p')].find(x=>/collision test/.test(x.textContent));const r=q.getBoundingClientRect();return [r.left,r.top,r.width,r.height, document.elementsFromPoint(r.left+r.width/2,r.top+r.height/2).slice(0,5).map(e=>e.tagName+'.'+e.className+' '+getComputedStyle(e).backgroundColor)]}); console.log(JSON.stringify(dbg));
 console.log('before',before.length,'| injected collision',after.length,after[0]||'','| under opaque cover',covered.length); await b.close();})();

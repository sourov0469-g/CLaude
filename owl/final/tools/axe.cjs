// runs axe-core (WCAG 2 A/AA) on the single file for a given query
const {chromium}=require('playwright'); const path=require('path'); const fs=require('fs');
const AXE=process.env.AXE||'/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js';
(async()=>{const b=await chromium.launch();
for(const q of process.argv.slice(2)){const p=await b.newPage({viewport:{width:1440,height:900}}); await p.route('https://**',r=>r.abort());
await p.goto('file://'+path.resolve(__dirname,'../owl-roofing.html')+q); await p.waitForTimeout(1200);
await p.addScriptTag({content:fs.readFileSync(AXE,'utf8')});
const r=await p.evaluate(async()=>{const res=await axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21aa']}); return res.violations.map(v=>v.id+' ('+v.impact+') x'+v.nodes.length+': '+v.nodes.slice(0,3).map(n=>n.target.join(' ')).join(' | '));});
console.log(q, r.length? '\n  '+r.join('\n  ') : 'axe: 0 violations'); await p.close();}
await b.close();})();

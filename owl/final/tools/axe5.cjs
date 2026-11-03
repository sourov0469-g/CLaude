const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.route('https://**', r => r.abort());
  await p.goto('file://' + path.resolve(__dirname, '../owl-roofing.html') + '?hero=' + process.argv[2]); await p.waitForTimeout(2200); await p.click('.btn-film.light').catch(()=>{}); await p.keyboard.press('Escape'); await p.waitForTimeout(300); await p.addScriptTag({ content: AXE });
  const r = await p.evaluate(async () => (await axe.run(document.querySelector('.ver[data-sec="hero"]:not([hidden])'), { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa'] } })).violations.map(v => v.nodes.map(n => v.id + ': ' + n.target.join(' ') + ' :: ' + (n.any[0] && n.any[0].message))));
  console.log(JSON.stringify(r, null, 1)); await b.close(); })();

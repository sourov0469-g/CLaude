const { chromium } = require('playwright'); const fs = require('fs');
const AXE = fs.readFileSync(process.argv[3], 'utf8');
(async () => { const F = process.argv[2]; const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const probe = await b.newPage(); await probe.goto('file://' + F, { waitUntil: 'load' });
const secs = await probe.evaluate(() => [...document.querySelectorAll('.sec')].map(s => s.dataset.sec)); const allV2 = '?v=' + secs.map(s => s + ':2').join(',');
const agg = {};
for (const [mode, q] of [['defaults', ''], ['all-V2', allV2]]) for (const w of [1440, 390]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  for (const pg of ['home', 'services', 'storm', 'nest', 'families', 'contact']) {
    await p.goto('file://' + F + q + '#/' + pg, { waitUntil: 'load' }); await p.waitForTimeout(500);
    await p.addScriptTag({ content: AXE });
    const res = await p.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }, resultTypes: ['violations'] })).violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join(' ').slice(0, 140)) })));
    for (const v of res) { const k = v.id; agg[k] = agg[k] || { impact: v.impact, help: v.help, where: new Set(), nodes: new Set() }; agg[k].where.add(`${mode}/${w}/${pg}`); v.nodes.forEach(n => agg[k].nodes.add(n)); }
  }
}
for (const [k, v] of Object.entries(agg)) { console.log(`\n## ${k} (${v.impact}): ${v.help}\n  in: ${[...v.where].join(', ')}\n  nodes (${v.nodes.size}):`); [...v.nodes].slice(0, 12).forEach(n => console.log('   - ' + n)); }
console.log('\nrules violated:', Object.keys(agg).length); await b.close(); })();

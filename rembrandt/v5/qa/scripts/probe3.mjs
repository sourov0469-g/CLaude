import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch();
for (const [id, q] of [['area', 'areab1'], ['call', 'callb1'], ['how', 'howb2']]) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage(); await p.goto('file://' + process.argv[2] + '?v=' + q); await p.waitForTimeout(1500);
  console.log(q, await p.evaluate(id => { const r = document.querySelector(`#${id} .stage`).firstElementChild; const out = {}; for (const e of [r, ...r.querySelectorAll('*')]) { const c = getComputedStyle(e); if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue; const k = c.fontFamily.split(',')[0] + ' lh' + c.lineHeight; out[k] = (out[k] || 0) + 1; } return JSON.stringify(out); }, id));
}
await b.close();

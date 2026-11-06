// usage: node tools/page_shot.js <route> <outprefix> [width=1440] [selector]; screenshots each section of the page
const { chromium } = require('playwright');
(async () => { const [route, pre, w = '1440', sel] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: 900 } });
  p.on('pageerror', e => console.log('PAGEERR', e.stack.split('\n').slice(0,4).join(' | '))); p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
  await p.goto('file:///home/user/CLaude/siding/redo/final/out/final-' + (route === 'our-work' ? 'work' : route) + '.html#/' + route, { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const secs = await p.$$(sel || '.pg.on section'); let i = 0;
  for (const s of secs) { await s.scrollIntoViewIfNeeded(); const bb = await s.boundingBox(); for (let y = 0; y < bb.height; y += 500) { await p.evaluate(v => scrollBy(0, v), 500); await p.waitForTimeout(150); } await p.waitForTimeout(2200); await s.screenshot({ path: `/home/user/CLaude/siding/redo/final/gate/${pre}-${w}-${i++}.png` }); }
  console.log('shots', secs.length); await b.close(); })();

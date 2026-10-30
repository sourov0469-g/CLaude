// Phase 4 end-to-end: Clad the gable is clicked through as a visitor would, and every readout is checked against
// the map pins it claims to count.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + require('path').resolve(__dirname, '../../homepage-standalone.html')); await p.waitForTimeout(1500);
  const tab = p.locator('#built .vsw-b[data-v="4"]'); await tab.click(); await p.waitForTimeout(600);
  const R = '#built .cl';
  const read = () => p.evaluate(R => { const r = document.querySelector(R); return { n: r.querySelector('[data-cl-n]').textContent, of: r.querySelector('[data-cl-of]').textContent, on: r.querySelectorAll('.cl-co.on, .cl-bb.on').length, match: r.querySelector('[data-cl-match]').textContent, trades: r.querySelector('[data-cl-trades]').textContent, latest: r.querySelector('[data-cl-latest]').textContent, bands: [...r.querySelectorAll('[data-cl-band]')].filter(l => !l.hidden).map(l => l.dataset.clBand), btn: r.querySelector('[data-cl-nail]').textContent }; }, R);
  const pins = await p.evaluate(() => { const D = JSON.parse(document.getElementById('home-data').textContent); return { pins: D.map.pins, sv: D.map.sv }; });
  const count = names => { const m = names.reduce((a, n) => a | (1 << pins.sv.indexOf(n)), 0); return pins.pins.filter(q => (q[3] & m) === m).length; };
  const log = (step, o) => console.log(step.padEnd(28), JSON.stringify(o));
  log('start', await read());
  for (let i = 0; i < 5; i++) await p.click(`${R} [data-cl-nail]`);
  await p.waitForTimeout(400); log('5 nails (button)', await read());
  await p.click(`${R} .cl-svg`); await p.click(`${R} .cl-svg`); log('2 more (click the wall)', await read());
  await p.click(`${R} [data-board="bb"]`); log('board and batten', await read());
  await p.click(`${R} .cl-sw:nth-child(6)`); log('colour 6', await p.evaluate(R => [document.querySelector(R).style.getPropertyValue('--cl-c'), document.querySelector(R + ' [data-cl-cname]').textContent], R));
  await p.click(`${R} [data-roof="metal"]`); log('metal roof', await read()); console.log('  expected siding+metal pins:', count(['Siding', 'Metal Roofing']));
  await p.click(`${R} [data-win="new"]`); log('new windows', await read()); console.log('  expected siding+metal+windows pins:', count(['Siding', 'Metal Roofing', 'Windows']));
  await p.click(`${R} [data-roof="shingle"]`); log('shingle roof', await read()); console.log('  expected siding+shingle+windows pins:', count(['Siding', 'Shingle Roofing', 'Windows']));
  await p.click(`${R} [data-cl-all]`); await p.waitForTimeout(600); log('clad it all', await read());
  await p.locator(`${R} .cl-stage`).screenshot({ path: '/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/ap/clad-done.png' });
  await p.click(`${R} [data-cl-strip]`); log('strip', await read());
  await p.focus(`${R} [data-board="lap"]`); await p.keyboard.press('ArrowRight'); log('keyboard arrow on board', await p.evaluate(R => document.querySelector(R).dataset.board, R));
  await p.click(`${R} .cl-book`); await p.waitForTimeout(900);
  log('book handoff', await p.evaluate(() => ({ hash: location.hash, siding: !!document.querySelector('#book input[name="trade"][value="Siding"]:checked') })));
  await p.evaluate(() => document.querySelector('#built').scrollIntoView()); await p.waitForTimeout(300);
  await p.screenshot({ path: '/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/ap/clad-full.png', fullPage: false });
  console.log('console errors:', errs.length, errs.slice(0, 3)); await b.close();
})();

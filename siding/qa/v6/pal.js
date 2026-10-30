// node pal.js <fileurl>  — §4: the companion reacts DIFFERENTLY to buttons, links, images, headings and cards, in each
// variant. Hover one target of each kind, snapshot the companion's drawing; all six poses (idle + 5) must differ.
const { chromium } = require('playwright');
const URL = process.argv[2];
const T = { button: '#hero .btn-red', link: '#hero a.tlink[href^="tel:"]', heading: '#proof .h2x, #proof h2', image: '#work .fs img', card: '#services .sv1-parts [role=radio]:nth-child(2)' };
(async () => { const b = await chromium.launch(); const out = []; const errs = [];
  for (const pal of ['sash', 'gable', 'chip']) {
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.goto(`${URL}?v=1111111111&pal=${pal}`, { waitUntil: 'load' }); await p.waitForTimeout(400);
    const snap = () => p.evaluate(() => { const s = document.querySelector('.pal svg'); return s ? [...s.querySelectorAll('*')].map(n => (n.getAttribute('transform') || '') + (n.style.transform || '') + (n.style.opacity || '') + (n.getAttribute('opacity') || '') + (n.style.fill || '')).join('|') : 'none'; });
    const shots = {};
    await p.mouse.move(700, 300); await p.mouse.move(720, 320, { steps: 4 }); await p.waitForTimeout(700); shots.idle = await snap();
    for (const [k, sel] of Object.entries(T)) {
      const loc = p.locator(sel).first(); await loc.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
      const bb = await loc.boundingBox(); await p.mouse.move(bb.x + bb.width / 2 - 30, bb.y + bb.height / 2 - 30); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 5 }); await p.waitForTimeout(700);
      shots[k] = await snap();
      await p.mouse.move(5, 450, { steps: 3 }); await p.waitForTimeout(500);
    }
    const keys = Object.keys(shots), same = [];
    for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) if (shots[keys[i]] === shots[keys[j]]) same.push(`${keys[i]}=${keys[j]}`);
    out.push(`${same.length ? 'FAIL' : 'PASS'} ${pal}: ${keys.length} poses${same.length ? ' identical: ' + same.join(', ') : ' all distinct'}`);
    await p.context().close();
  }
  console.log(out.join('\n')); console.log('page errors', errs.length ? errs.join(' | ') : 0); await b.close(); })();

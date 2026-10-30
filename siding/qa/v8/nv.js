// Phase 5 click-through: the new versions' own mechanisms, exercised as a visitor would.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message + ' @ ' + (e.stack || '').split('\n').slice(0, 3).join(' | '))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + require('path').resolve(__dirname, '../../homepage-standalone.html')); await p.waitForTimeout(1500);
  const go = async (k, v) => { await p.click(`#${k} .vsw-b[data-v="${v}"]`); await p.waitForTimeout(400); };
  const T = (sel) => p.$eval(sel, e => e.textContent.trim());
  const out = [];
  await go('hero', 4); await p.click('#hero .ar-h[data-trade="Metal roofing"]'); out.push(['hero4 house click', await T('#hero [data-nv-say]')]);
  await go('hero', 5); await p.dispatchEvent('#hero [data-nv-hold]', 'pointerdown'); out.push(['hero5 hold', await p.$eval('#hero .nv-hold', e => e.classList.contains('is-held'))]); await p.dispatchEvent('#hero [data-nv-hold]', 'pointerup');
  await go('hero', 8); out.push(['hero8 open status', await T('#hero [data-nv-open]')]);
  await go('proof', 4); await p.click('#proof .nv-pl >> nth=1'); out.push(['proof4 flip', await p.getAttribute('#proof .nv-pl >> nth=1', 'aria-pressed')]);
  await go('proof', 6); await p.click('#proof [data-nv-set="show:map"]'); out.push(['proof6 highlight', await p.getAttribute('#proof .nv-grid886', 'data-show')]);
  await go('proof', 8); await p.click('#proof [data-nv-toggle]'); out.push(['proof8 pause', await T('#proof [data-nv-toggle]')]);
  await go('services', 5); await p.click('#services .nv-bar >> nth=2'); out.push(['services5 bar', await T('#services [data-o="name"]')]);
  await go('services', 8); await p.click('#services [data-b="Exterior painting"]'); out.push(['services8 two', await T('#services .nv-two-out')]);
  await go('work', 4); await p.click('#work [data-nv-flipside]'); out.push(['work4 flip', await p.getAttribute('#work .nv-flip', 'data-side')]);
  await go('work', 8); await p.click('#work [data-sb="1"]'); out.push(['work8 next', await T('#work [data-sb-n]')]);
  await go('built', 5); await p.click('#built [data-l="wrap"]'); out.push(['built5 layer', await T('#built [data-o="read"]')]);
  await go('built', 6); await p.click('#built .nv-dial [data-i="3"]'); out.push(['built6 dial', await p.getAttribute('#built .nv-dial', 'data-i')]);
  await go('built', 8); await p.click('#built [data-is="1"]'); await p.click('#built [data-is="1"]'); out.push(['built8 step', await p.getAttribute('#built .nv-steps', 'data-step')]);
  await go('colour', 4); await p.click('#colour .nv-cs >> nth=20'); out.push(['colour4 strip', await T('#colour [data-o="n"]')]);
  await go('colour', 6); await p.fill('#colour [data-sh]', '12'); await p.dispatchEvent('#colour [data-sh]', 'input'); out.push(['colour6 slider', await T('#colour [data-sh-n]')]);
  await go('colour', 7); await p.click('#colour [data-paint] >> nth=5'); await p.click('#colour .ar-h >> nth=0'); out.push(['colour7 painted', await T('#colour [data-paint-n]')]);
  await go('colour', 8); await p.click('#colour [data-sf]'); out.push(['colour8 shuffle', await T('#colour [data-sf-bn]')]);
  await go('reviews', 5); await p.click('#reviews .nv-wd button >> nth=2'); out.push(['reviews5 word', (await T('#reviews [data-o="q"]')).slice(0, 60)]);
  await go('reviews', 6); await p.click('#reviews .nv-tabs [role="tab"] >> nth=1'); out.push(['reviews6 tab', await p.$eval('#reviews #rv6-p1', e => !e.hidden)]);
  await go('reviews', 8); await p.click('#reviews .fl-d circle >> nth=40', { force: true }); out.push(['reviews8 dot', (await T('#reviews [data-fl-by]'))]);
  await go('money', 4); await p.click('#money [data-amt="30000"]'); out.push(['money4 30k row1', await T('#money .nv-pt tbody tr td')]);
  await go('money', 8); out.push(['money8 days', await T('#money [data-nv-until]')]);
  await go('book', 7); await p.click('#book [data-nv-go="2"]'); await p.waitForTimeout(600); out.push(['book7 -> form', await p.getAttribute('#book', 'data-v')]);
  await go('book', 8); for (const a of ['Sam', 'Siding', '78752', '5125550111']) { await p.fill('#book #nv-ct-in', a); await p.press('#book #nv-ct-in', 'Enter'); await p.waitForTimeout(80); }
  out.push(['book8 chat end', (await p.$$eval('#book .nv-ct-b', x => x[x.length - 1].textContent)).slice(0, 70)]);
  out.forEach(([k, v]) => console.log(k.padEnd(20), JSON.stringify(v)));
  console.log('console errors:', errs.length, errs.slice(0, 3)); await b.close();
})();

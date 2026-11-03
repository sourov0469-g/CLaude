// Upgrade Round 1 gate: every hero version, its own interaction, reduced motion, overflow, targets, axe, default view.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const R = []; function rec(v, check, ok, detail) { R.push({ v, check, ok, detail }); console.log((ok ? 'PASS' : 'FAIL') + ' | V' + v + ' | ' + check + (detail !== undefined ? ' | ' + detail : '')); }
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  async function open(q, opts) { const errs = []; const p = await b.newPage(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {})); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); await p.route('https://**', r => r.abort()); await p.goto(F + q); await p.waitForTimeout(2200); return { p, errs }; }
  // default view is still V1
  { const { p, errs } = await open(''); rec(1, 'default view (no query) shows hero V1 only', await p.evaluate(() => [...document.querySelectorAll('.ver[data-sec="hero"]')].filter(v => !v.hidden).map(v => v.dataset.v).join() === '1')); rec(1, 'backup hero-b1 kept in file, inert', await p.evaluate(() => !!document.querySelector('template.bak[data-sec="hero"][data-b="1"]'))); await p.close(); }
  for (const v of ['1', '2', '3', '4', '5', '6']) {
    const { p, errs } = await open('?hero=' + v); const S = `.ver[data-sec="hero"][data-v="${v}"]`;
    rec(v, 'only this version visible', await p.evaluate(v => [...document.querySelectorAll('.ver[data-sec="hero"]')].filter(x => !x.hidden).map(x => x.dataset.v).join() === v, v));
    const h1 = await p.evaluate(S => { const h = document.querySelector(S + ' h1'); return h ? (h.getAttribute('aria-label') || h.textContent).replace(/\s+/g, ' ').trim() : ''; }, S); rec(v, 'one h1 with a readable name', !!h1, h1);
    const links = await p.evaluate(S => [...document.querySelectorAll(S + ' a[href]')].map(a => a.getAttribute('href')), S);
    rec(v, 'primary CTA goes to #book', links.includes('#book'), links.join(' '));
    const small = await p.evaluate(S => [...document.querySelectorAll(S + ' a, ' + S + ' button')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 44); }).map(e => (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 20) + ' ' + Math.round(e.getBoundingClientRect().height)), S);
    rec(v, 'every hero control at least 44 px', small.length === 0, small.join('; '));
    const noName = await p.evaluate(S => [...document.querySelectorAll(S + ' button, ' + S + ' a')].filter(e => !(e.textContent.trim() || e.getAttribute('aria-label'))).length, S); rec(v, 'every control has a name', noName === 0);
    // version-specific interaction
    if (v === '1') { await p.click(S + ' .storm'); rec(v, 'Storm test toggles', await p.getAttribute(S + ' .storm', 'aria-pressed') === 'true'); }
    if (v === '2') {
      rec(v, 'WebGL mesh is live (painting on the mesh)', await p.evaluate(S => document.querySelector(S + ' section').classList.contains('gl-on'), S));
      const art = await (await p.$(S + ' .art')).boundingBox(); const face = { x: art.x + art.width * .42, y: art.y + art.height * .22, width: art.width * .2, height: art.height * .26 };
      await p.mouse.move(40, 450, { steps: 8 }); await p.waitForTimeout(1600); const a = await p.screenshot({ clip: face });
      await p.mouse.move(1400, 450, { steps: 8 }); await p.waitForTimeout(1600); const c = await p.screenshot({ clip: face });
      rec(v, 'owl head turns toward the cursor (frames differ)', Buffer.compare(a, c) !== 0);
      await p.click(S + ' .fold'); rec(v, 'Wings over the house toggles', await p.getAttribute(S + ' .fold', 'aria-pressed') === 'true');
    }
    if (v === '3') {
      await p.click(S + ' ol.layers button[data-k="deck"]'); await p.waitForTimeout(300);
      rec(v, 'layer key Roof deck explains the layer', /OSB panels/.test(await p.textContent(S + ' .note')));
      const roof = await (await p.$(S + ' .roof canvas')).boundingBox(); await p.mouse.move(roof.x + roof.width * .5, roof.y + roof.height * .55, { steps: 10 }); await p.waitForTimeout(400);
      const tag = await p.evaluate(S => { const t = document.querySelector(S + ' .tag'); return t.classList.contains('on') ? t.textContent : ''; }, S); rec(v, 'hovering the roof names the layer under the cursor', !!tag, tag);
      rec(v, 'seven layers listed in build order', (await p.$$eval(S + ' ol.layers button', bs => bs.map(b => b.textContent.replace(/^\d+/, '')).join(' > '))) === 'Roof deck > Drip edge > Ice & water shield > Underlayment > Starter strip > Shingles > Ridge vent and cap');
    }
    if (v === '4') {
      rec(v, 'crew film has a source and plays', await p.evaluate(S => { const m = document.querySelector(S + ' video'); return !!m.src && !m.paused; }, S));
      rec(v, 'film roll loops seamlessly (7 photos + 7 hidden copies)', await p.evaluate(S => document.querySelectorAll(S + ' .reel figure').length === 14 && document.querySelectorAll(S + ' .reel figure[aria-hidden="true"]').length === 7, S));
      await p.click(S + ' .btn-film.light'); await p.waitForTimeout(300);
      rec(v, 'Watch the Full Film opens YouTube ehKLv5DF2TQ', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]')));
      await p.keyboard.press('Escape'); await p.waitForTimeout(600); rec(v, 'Escape closes the film', await p.evaluate(() => !document.querySelector('dialog.ytm')));
    }
    if (v === '5') {
      const t = await p.evaluate(S => { const e = document.querySelector(S + ' .track'); return { top: e.getBoundingClientRect().top + scrollY, span: e.offsetHeight - innerHeight }; }, S);
      const seen = [];
      for (const f of [.05, .37, .62, .9]) { await p.evaluate(y => scrollTo(0, y), t.top + t.span * f); await p.waitForTimeout(600); seen.push(await p.textContent(S + ' .cap span')); }
      rec(v, 'scroll lays the four numbers in order', seen.join(' | ') === '10-year workmanship warranty | Up to 50-year manufacturer warranty | 29 towns served from Shoreview | 5.0 · 90+ reviews', seen.join(' | '));
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300); await p.click(S + ' ol.steps li:nth-child(2) button'); await p.waitForTimeout(1500);
      rec(v, 'step key jumps to its number', (await p.evaluate(S => document.querySelector(S + ' ol.steps [aria-current]').textContent, S)) === '50');
      rec(v, 'the stage pins while scrolling', await p.evaluate(S => Math.abs(document.querySelector(S + ' .sticky').getBoundingClientRect().top) < 2, S));
    }
    if (v === '6') {
      const got = [];
      for (const k of ['repair', 'storm', 'replace', 'check']) { await p.click(`${S} .key[data-k="${k}"]`); await p.waitForTimeout(1300); got.push(await p.textContent(S + ' .seam b')); }
      rec(v, 'each key turns the cover to its chapter', got.join(' | ') === 'Roof Repair | Storm Damage Help | Roof Replacement | Wise Check Inspection', got.join(' | '));
      rec(v, 'exactly one key pressed', (await p.$$eval(S + ' .key[aria-pressed="true"]', x => x.length)) === 1);
      await p.focus(S + ' .key[data-k="storm"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(500); rec(v, 'keys work from the keyboard', await p.getAttribute(S + ' .key[data-k="storm"]', 'aria-pressed') === 'true');
    }
    // axe on the hero
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1200); await p.addScriptTag({ content: AXE });
    const ax = await p.evaluate(async S => { const r = await axe.run(document.querySelector(S), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(x => x.id + '(' + x.nodes.length + ')'); }, S);
    rec(v, 'axe WCAG 2.1 A/AA on the hero: 0 violations', ax.length === 0, ax.join(' '));
    rec(v, 'no page or console errors', errs.length === 0, errs.slice(0, 3).join(' || '));
    await p.close();
    for (const w of [1440, 768, 390]) { const o = await open('?hero=' + v, { viewport: { width: w, height: 900 } }); const ov = await o.p.evaluate(() => document.documentElement.scrollWidth - innerWidth); rec(v, 'no sideways scroll at ' + w, ov <= 0, ov + ' px'); await o.p.close(); }
    const rm = await open('?hero=' + v, { reducedMotion: 'reduce' });
    const rmState = await rm.p.evaluate(v => { const s = document.querySelector(`.ver[data-sec="hero"][data-v="${v}"] section`); return { gl: s.classList.contains('gl-on'), grid: s.classList.contains('gridmode') }; }, v);
    const rmOk = v === '2' ? !rmState.gl : v === '5' ? rmState.grid : true;
    rec(v, 'reduced motion: loads clean, still frame / no pin', rmOk && rm.errs.length === 0, JSON.stringify(rmState) + (rm.errs.length ? ' ' + rm.errs[0] : ''));
    await rm.p.close();
  }
  fs.writeFileSync(path.resolve(__dirname, '../gates/up-r2/hero-regression-checks.json'), JSON.stringify(R, null, 1));
  console.log('TOTAL', R.filter(r => r.ok).length + '/' + R.length, 'passed'); await b.close();
})();

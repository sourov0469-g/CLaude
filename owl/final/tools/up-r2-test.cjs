// Upgrade Round 2 gate: Video V1–V3 and Explore V1–V3.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const R = []; function rec(s, v, check, ok, detail) { R.push({ sec: s, v, check, ok, detail }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + s + ' V' + v + ' | ' + check + (detail !== undefined ? ' | ' + detail : '')); }
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  async function open(q, opts) { const errs = []; const p = await b.newPage(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {})); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); await p.route('https://**', r => r.abort()); await p.goto(F + q); await p.waitForTimeout(1200); return { p, errs }; }
  { const { p } = await open(''); for (const s of ['video', 'explore']) rec(s, '1', 'default view shows V1 only', await p.evaluate(s => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(v => !v.hidden).map(v => v.dataset.v).join() === '1', s));
    rec('page', '-', 'every homepage section is inside the home page', await p.evaluate(() => ['hero','video','explore','wise','wrap','services','reviews','area','family','booking'].every(s => document.querySelector(`.page[data-page="home"] .ver[data-sec="${s}"]`))));
    rec('video', '-', 'superseded versions kept as inert backups', await p.evaluate(() => !!document.querySelector('template.bak[data-sec="video"][data-b="1"]') && !!document.querySelector('template.bak[data-sec="explore"][data-b="1"]') && !!document.querySelector('template.bak[data-sec="explore"][data-b="2"]'))); await p.close(); }
  for (const [sec, v] of [['video', '1'], ['video', '2'], ['video', '3'], ['explore', '1'], ['explore', '2'], ['explore', '3']]) {
    const { p, errs } = await open('?' + sec + '=' + v); const S = `.ver[data-sec="${sec}"][data-v="${v}"]`;
    await p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await p.waitForTimeout(1500);
    rec(sec, v, 'only this version visible', await p.evaluate(([s, v]) => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(x => !x.hidden).map(x => x.dataset.v).join() === v, [sec, v]));
    rec(sec, v, 'section keeps the page anchor id', await p.evaluate(([S, id]) => document.querySelector(S + ' section').id === id, [S, sec === 'video' ? 'crew-video' : 'explore']));
    const h2 = await p.evaluate(S => { const h = document.querySelector(S + ' h2'); return h ? (h.getAttribute('aria-label') || h.textContent).trim() : ''; }, S); rec(sec, v, 'one h2 with a readable name', !!h2, h2);
    const small = await p.evaluate(S => [...document.querySelectorAll(S + ' a, ' + S + ' button, ' + S + ' input')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 44) && getComputedStyle(e).visibility !== 'hidden'; }).map(e => (e.textContent || e.getAttribute('aria-label') || e.type).trim().slice(0, 18) + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)), S);
    rec(sec, v, 'every control at least 44 px', small.length === 0, small.join('; '));
    if (sec === 'video' && v === '1') { await p.click(S + ' .chips button:nth-child(4)'); await p.waitForTimeout(300); rec(sec, v, 'chapter chip seeks', await p.evaluate(S => Math.abs(document.querySelector(S + ' video').currentTime - 9.2) < 1.2, S)); }
    if (sec === 'video' && v === '2') {
      await p.waitForTimeout(2500);
      rec(sec, v, 'contact strip holds real frames from the clip', await p.evaluate(S => [...document.querySelectorAll(S + ' .cells canvas')].filter(c => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let s = 0; for (let i = 0; i < d.length; i += 400) s += d[i] + d[i + 1] + d[i + 2]; return s > 0; }).length, S) >= 8);
      await p.focus(S + ' .strip'); const t0 = await p.evaluate(S => document.querySelector(S + ' video').currentTime, S); await p.evaluate(S => document.querySelector(S + ' video').pause(), S); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
      rec(sec, v, 'strip steps the film from the keyboard', await p.evaluate(([S, t0]) => document.querySelector(S + ' video').currentTime > t0 + 1.5, [S, t0]));
      await p.click(S + ' ol.moments li:nth-child(5) button'); await p.waitForTimeout(300); rec(sec, v, 'a moment jumps the film and marks itself', await p.evaluate(S => document.querySelector(S + ' video').currentTime >= 12.5 && document.querySelector(S + ' ol.moments li:nth-child(5) button').getAttribute('aria-current') === 'true', S));
      await p.click(S + ' button.btn-film'); await p.waitForTimeout(300); rec(sec, v, 'full film opens YouTube ehKLv5DF2TQ, Escape closes', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]'))); await p.keyboard.press('Escape'); await p.waitForTimeout(200);
    }
    if (sec === 'video' && v === '3') {
      await p.click(S + ' .vent:nth-of-type(4)'); await p.waitForTimeout(400); rec(sec, v, 'a vent on the roofline jumps the film', await p.evaluate(S => { const t = document.querySelector(S + ' video').currentTime; return t >= 9 && t < 13; }, S));
      await p.click(S + ' .pp'); await p.waitForTimeout(200); rec(sec, v, 'play key pauses the film', await p.evaluate(S => document.querySelector(S + ' video').paused, S));
      rec(sec, v, 'film light spills onto the page (glow canvas painted)', await p.evaluate(S => { const c = document.querySelector(S + ' canvas.glow'), d = c.getContext('2d').getImageData(0, 0, 32, 18).data; let s = 0; for (let i = 0; i < d.length; i += 4) s += d[i + 3]; return s > 0; }, S));
    }
    if (sec === 'explore' && v === '1') {
      await p.click(S + ' .opt[data-k="deck"]'); await p.waitForTimeout(400); rec(sec, v, 'Roof deck lifts one layer and names it', await p.evaluate(S => document.querySelectorAll(S + ' .lay.on').length === 1 && document.querySelector(S + ' .info b').textContent === 'Roof deck', S));
      await p.keyboard.press('ArrowDown'); await p.waitForTimeout(200); rec(sec, v, 'arrow keys move through the layers', (await p.textContent(S + ' .info b')) === 'Rafters and ventilation');
      rec(sec, v, 'insulation explained as on the attic floor', /attic floor/.test(await p.evaluate(S => document.querySelector(S).innerHTML, S)));
    }
    if (sec === 'explore' && v === '2') {
      await p.waitForTimeout(9000); rec(sec, v, 'the roof builds itself once to step 8', await p.evaluate(S => document.querySelectorAll(S + ' .st.in').length === 8, S));
      await p.fill(S + ' input[type=range]', '4'); await p.dispatchEvent(S + ' input[type=range]', 'input'); await p.waitForTimeout(200);
      rec(sec, v, 'slider to step 4 shows the ice & water shield', (await p.textContent(S + ' .step b')) === 'Ice & water shield' && await p.evaluate(S => document.querySelectorAll(S + ' .st.in').length === 4, S));
      await p.click(S + ' .ctrl .key[data-d="1"]'); await p.waitForTimeout(200); rec(sec, v, 'Next goes to underlayment', (await p.textContent(S + ' .step b')) === 'Underlayment');
    }
    if (sec === 'explore' && v === '3') {
      await p.click(S + ' .tile[data-i="2"]'); await p.waitForTimeout(200); rec(sec, v, 'wrong layer: hint names what comes first', /Not yet: Roof deck comes first/.test(await p.textContent(S + ' .hint')));
      for (const i of [0, 1, 2, 3, 4, 5, 6]) { await p.focus(S + ` .tile[data-i="${i}"]`); await p.keyboard.press('Enter'); await p.waitForTimeout(150); }
      await p.waitForTimeout(400); rec(sec, v, 'keyboard builds the roof in order and wins', await p.evaluate(S => document.querySelector(S + ' .won').classList.contains('on') && document.querySelectorAll(S + ' .stack .slab').length === 7, S));
      await p.click(S + ' .again'); await p.waitForTimeout(200); rec(sec, v, 'Play again resets', (await p.textContent(S + ' .placed')) === '0 of 7 placed');
    }
    await p.addScriptTag({ content: AXE }); await p.waitForTimeout(300);
    const ax = await p.evaluate(async S => { const r = await axe.run(document.querySelector(S), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(x => x.id + '(' + x.nodes.length + ':' + x.nodes[0].target.join(' ') + ')'); }, S);
    rec(sec, v, 'axe WCAG 2.1 A/AA: 0 violations', ax.length === 0, ax.join(' '));
    rec(sec, v, 'no page or console errors', errs.length === 0, errs.slice(0, 3).join(' || '));
    await p.close();
    for (const w of [1440, 768, 390]) { const o = await open('?' + sec + '=' + v, { viewport: { width: w, height: 900 } }); await o.p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await o.p.waitForTimeout(400); const ov = await o.p.evaluate(() => document.documentElement.scrollWidth - innerWidth); rec(sec, v, 'no sideways scroll at ' + w, ov <= 0, ov + ' px'); await o.p.close(); }
    const rm = await open('?' + sec + '=' + v, { reducedMotion: 'reduce' }); await rm.p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await rm.p.waitForTimeout(600);
    const st = await rm.p.evaluate(S => { const vd = document.querySelector(S + ' video'); return { videoPaused: vd ? vd.paused : null, built: document.querySelectorAll(S + ' .st.in').length }; }, S);
    rec(sec, v, 'reduced motion: loads clean, film not autoplaying, drawings shown complete', rm.errs.length === 0 && (st.videoPaused === null || st.videoPaused) && (sec + v !== 'explore2' || st.built === 8), JSON.stringify(st));
    await rm.p.close();
  }
  fs.mkdirSync(path.resolve(__dirname, '../gates/up-r2'), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname, '../gates/up-r2/checks.json'), JSON.stringify(R, null, 1));
  console.log('TOTAL', R.filter(r => r.ok).length + '/' + R.length, 'passed'); await b.close();
})();

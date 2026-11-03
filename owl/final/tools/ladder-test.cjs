// Overnight ladder gate: generic checks for new versions of one slot, plus that slot's own interaction checks.
// node ladder-test.cjs <sec> <v,v> <round-name>   extras: tools/ladder-extra/<sec>.cjs exports { '<v>': async (p, S, rec, txt) => {} }
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const [sec, vs, round] = process.argv.slice(2); const VS = vs.split(',');
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const IDS = { hero: 'top-hero', video: 'crew-video', explore: 'explore', wise: 'wise-check', wrap: 'protect', services: 'services', reviews: 'reviews', area: 'areas', family: 'family', booking: 'book' };
let EX = {}; try { EX = require('./ladder-extra/' + sec + '.cjs'); } catch (e) {}
const R = []; function rec(s, v, check, ok, detail) { R.push({ sec: s, v, check, ok: !!ok, detail }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + s + ' V' + v + ' | ' + check + (detail !== undefined && detail !== '' ? ' | ' + detail : '')); }
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  async function open(q, opts) { const errs = []; const p = await b.newPage(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {})); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); await p.route('https://**', r => r.abort()); await p.goto(F + q); await p.waitForTimeout(1200); return { p, errs }; }
  { const { p } = await open(''); rec(sec, '1', 'default view still shows V1 only', await p.evaluate(s => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(v => !v.hidden).map(v => v.dataset.v).join() === '1', sec));
    rec(sec, '-', 'live version count', true, await p.evaluate(s => document.querySelectorAll(`.ver[data-sec="${s}"]`).length, sec)); await p.close(); }
  for (const v of VS) {
    const { p, errs } = await open('?' + sec + '=' + v); const S = `.ver[data-sec="${sec}"][data-v="${v}"]`;
    await p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await p.waitForTimeout(1500);
    rec(sec, v, 'only this version visible', await p.evaluate(([s, v]) => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(x => !x.hidden).map(x => x.dataset.v).join() === v, [sec, v]));
    const id = await p.evaluate(S => document.querySelector(S + ' section').id, S); const want = await p.evaluate(s => document.querySelector(`.ver[data-sec="${s}"][data-v="1"] section`) && document.querySelector(`.ver[data-sec="${s}"][data-v="1"] section`).dataset.id0 || null, sec);
    rec(sec, v, 'section takes the page anchor id', id === (IDS[sec] === 'top-hero' ? id : IDS[sec]), id);
    const hs = await p.evaluate(([S, sec]) => { const h = document.querySelectorAll(S + (sec === 'hero' ? ' h1' : ' h2')); return h.length === 1 ? (h[0].getAttribute('aria-label') || h[0].textContent).trim() : ''; }, [S, sec]); rec(sec, v, 'one ' + (sec === 'hero' ? 'h1' : 'h2') + ' with a readable name', !!hs, hs);
    const small = await p.evaluate(S => [...document.querySelectorAll(S + ' a, ' + S + ' button, ' + S + ' input')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 44) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[inert]') && !['range', 'radio', 'checkbox'].includes(e.type); }).map(e => (e.className || e.tagName) + ' ' + e.getBoundingClientRect().width.toFixed(0) + 'x' + e.getBoundingClientRect().height.toFixed(0)), S);
    rec(sec, v, 'every control at least 44 px', small.length === 0, small.join('; '));
    const txt = await p.evaluate(S => document.querySelector(S).innerText, S);
    rec(sec, v, 'facts lock: only (651) 977-6027; no Master Elite, A+, Accredited; ratings only as 5.0 · 90+', !/867-2961|Master Elite|A\+|Accredited/.test(txt) && (!/\(651\)/.test(txt) || /\(651\) 977-6027/.test(txt)) && (!/\breviews?\b/i.test(txt) || !/\b[1-4]\.\d\b/.test(txt)));
    if (EX[v]) { try { await EX[v](p, S, (c, ok, d) => rec(sec, v, c, ok, d), txt); } catch (e) { rec(sec, v, 'extra checks ran', false, e.message.slice(0, 160)); } }
    await p.addScriptTag({ content: AXE }); await p.waitForTimeout(300);
    const ax = await p.evaluate(async S => { const r = await axe.run(document.querySelector(S), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(x => x.id + '(' + x.nodes.length + ':' + x.nodes[0].target.join(' ') + ')'); }, S);
    rec(sec, v, 'axe WCAG 2.1 A/AA: 0 violations', ax.length === 0, ax.join(' '));
    rec(sec, v, 'no page or console errors', errs.length === 0, errs.slice(0, 3).join(' || '));
    await p.close();
    for (const w of [1440, 768, 390]) { const o = await open('?' + sec + '=' + v, { viewport: { width: w, height: 900 } }); await o.p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await o.p.waitForTimeout(500);
      const ov = await o.p.evaluate(() => document.documentElement.scrollWidth - innerWidth); rec(sec, v, 'no sideways scroll at ' + w, ov <= 0, ov + ' px');
      if (w === 390) { const sm = await o.p.evaluate(S => [...document.querySelectorAll(S + ' a, ' + S + ' button')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.height < 44 || r.width < 40) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[inert]'); }).length, S); rec(sec, v, 'phone: controls at least 44 px', sm === 0, sm + ' small'); }
      await o.p.close(); }
    const rm = await open('?' + sec + '=' + v, { reducedMotion: 'reduce' }); await rm.p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await rm.p.waitForTimeout(700);
    const anim = await rm.p.evaluate(S => document.querySelector(S).getAnimations({ subtree: true }).filter(a => a.playState === 'running' && a.effect && a.effect.getTiming().iterations === Infinity).length, S);
    rec(sec, v, 'reduced motion: loads clean, no looping animation', rm.errs.length === 0 && anim === 0, anim + ' looping'); await rm.p.close();
  }
  const out = path.resolve(__dirname, '../gates/ladder', round); fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'checks.json'), JSON.stringify(R, null, 1));
  console.log('TOTAL', R.filter(r => r.ok).length + '/' + R.length, 'passed'); await b.close();
})();

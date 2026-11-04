// Reset page checks: node reset-test.cjs <sectionId> <outDir>   (sectionId e.g. finder; outDir relative to owl/final)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const F = 'file://' + path.resolve(__dirname, '../owl-reset.html');
const [SEC, OUTD] = process.argv.slice(2); const OUT = path.resolve(__dirname, '..', OUTD || 'gates/reset/tmp'); fs.mkdirSync(OUT, { recursive: true });
const res = []; const rec = (name, ok, info) => { res.push({ name, ok: !!ok, info: info || '' }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + name + (info ? ' | ' + info : '')); };
const EXTRA = {
  finder: async (p) => {
    const S = '#finder';
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ block: 'start', behavior: 'instant' })); await p.waitForTimeout(800);
    const st = () => p.evaluate(() => { const s = document.getElementById('finder'), g = s.querySelector('.gate'); return { kase: s.dataset.case || '', gateUp: g.classList.contains('up'), gateHidden: g.getAttribute('aria-hidden'), dock: document.querySelector('.rbar .dock').classList.contains('on'),
      gateChecked: [...s.querySelectorAll('.pill')].map(b => b.getAttribute('aria-checked')).indexOf('true'), dockChecked: [...document.querySelectorAll('.rbar .dock button')].map(b => b.getAttribute('aria-checked')).indexOf('true'),
      h: s.querySelector('.sc-h').textContent, k: s.querySelector('.sc-k').textContent, tag: s.querySelector('.ph-tag').textContent, store: (() => { try { return sessionStorage.getItem('owlCase'); } catch (e) { return 'x'; } })(), call: s.querySelector('.sc-call').getAttribute('aria-label'), clip: getComputedStyle(g).clipPath }; });
    let s = await st();
    rec('the first act is a choice: "What’s going on up there?" with six photo pills (a radiogroup); no scene, no dock yet', s.kase === '' && !s.gateUp && !s.dock && await p.evaluate(() => { const g = document.querySelector('#finder .pills'); return g.getAttribute('role') === 'radiogroup' && g.querySelectorAll('[role="radio"] img').length === 6 && document.getElementById('fd-q').textContent === 'What’s going on up there?'; }));
    await p.evaluate(() => { window.__ev = ''; document.addEventListener('owl:case', e => { window.__ev = e.detail; }); });
    await p.click(S + ' .pill >> nth=0'); await p.waitForTimeout(450); s = await st();
    rec('choosing pulls the gate up with a curved edge (curtain mid-reveal: an ellipse clip-path animating)', s.gateUp && /ellipse/.test(s.clip) && !/ellipse\(160% 100%/.test(s.clip));
    await p.waitForTimeout(1300); s = await st();
    rec('behind it: the full scene for YOUR case (Roof Repair, "A leak? We’ll find it and stop it.", Owl’s crew photo) and a tailored call', s.kase === 'leak' && s.k === 'Roof Repair' && s.h === 'A leak? We’ll find it and stop it.' && s.tag === 'Owl’s crew' && s.call === 'Call about my leak, (651) 977-6027' && s.gateHidden === 'true');
    rec('the choice docks into the top bar (page-wide chooser), with the same case checked', s.dock && s.dockChecked === 0 && s.gateChecked === 0);
    rec('the case is shared with the rest of the page (stored + owl:case event)', s.store === 'leak' && await p.evaluate(() => window.__ev) === 'leak');
    await p.focus('.rbar .dock button >> nth=0'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900); s = await st();
    rec('keyboard: ArrowRight in the dock switches the case (A ceiling stain) and the scene follows', s.kase === 'stain' && s.dockChecked === 1 && /A stain\? We look above it\./.test(s.h) && /attic above the stain/.test(await p.evaluate(() => document.querySelector('#finder .sc-l').textContent)));
    await p.click('.rbar .dock button >> nth=3'); await p.waitForTimeout(900); s = await st();
    rec('switching to "After a storm" names Storm Damage Help and labels the photo illustrative', s.kase === 'storm' && s.k === 'Storm Damage Help' && s.tag === 'Illustrative photo' && s.call === 'Call about storm damage, (651) 977-6027');
    rec('every answer names a real Owl service from the site’s own list; no prices, timings or invented claims', await p.evaluate(() => { const C = RESET.cases, svc = ['Roof Repair', 'Storm Damage Help', 'Wise Check Inspections', 'Roof Replacement', 'Wise Check']; return C.length === 6 && C.every(c => c.s.split(/ \+ | · /).every(x => svc.includes(x))) && !C.some(c => /\$|\bfree\b|same.day|within|hours?\b|minutes?\b|guarantee/i.test(c.h + c.l)); }));
  }
};
(async () => { const b = await chromium.launch(); const errs = [];
  const open = async (q, o) => { const p = await b.newPage(Object.assign({ viewport: { width: 1440, height: 900 } }, o || {})); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); await p.route('https://**', r => r.abort()); await p.goto(F + (q || '')); await p.waitForTimeout(1200); return p; };
  let p = await open();
  for (const pal of ['night', 'control', 'safety', 'slate']) {
    await p.evaluate(pal => document.documentElement.dataset.pal = pal, pal); await p.addScriptTag({ content: AXE });
    if (SEC) await p.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start', behavior: 'instant' }), SEC);
    const ax = await p.evaluate(async s => { const r = await axe.run(s ? document.getElementById(s) : document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(x => x.id + '(' + x.nodes.length + ':' + x.nodes[0].target.join(' ') + ')'); }, SEC);
    rec('axe WCAG 2.1 A/AA, palette ' + pal + ': 0 violations', ax.length === 0, ax.join(' '));
  }
  await p.evaluate(() => document.documentElement.dataset.pal = 'night');
  rec('facts lock: only (651) 977-6027; no Master Elite, A+, Accredited; reviews only as 5.0 · 90+', await p.evaluate(() => { const t = document.body.innerText + [...document.querySelectorAll('a[href^="tel:"]')].map(a => a.href).join(' '); return !/867-2961|Master Elite|A\+|Accredited/i.test(t) && [...document.querySelectorAll('a[href^="tel:"]')].every(a => a.getAttribute('href') === 'tel:+16519776027') && !/\b[0-4]\.\d\s*(stars?|·)/.test(t); }));
  if (SEC) rec('no skeleton: the section opens with no kicker + h2 + lede and ends with no Book + Call button row', await p.evaluate(s => { const e = document.getElementById(s); return !e.querySelector('.kick') && !(e.querySelector('a[href="#book"]') && e.querySelector('a[href^="tel:"].btn-line')); }, SEC));
  if (SEC && EXTRA[SEC]) { const q = await open(); try { await EXTRA[SEC](q); } catch (e) { rec('extra checks ran', false, e.message.split('\n')[0]); } await q.close(); }
  for (const w of [1440, 768, 390]) { const q = await open('', { viewport: { width: w, height: 900 } }); if (SEC) { await q.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start', behavior: 'instant' }), SEC); await q.waitForTimeout(400); if (SEC === 'finder') { await q.click('#finder .pill >> nth=1'); await q.waitForTimeout(1500); } }
    const ov = await q.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    rec('no sideways scroll at ' + w, ov <= 0, ov + ' px');
    const sm = await q.evaluate(s => [...(s ? document.getElementById(s) : document).querySelectorAll('a[href], button, [role=radio]')].concat([...document.querySelectorAll('.rbar a, .rbar button, .callpill')]).filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 40) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[aria-hidden="true"]') && !e.closest('.gate.gone'); }).map(e => (e.className || e.tagName) + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)), SEC);
    rec('controls at least 44 px at ' + w, sm.length === 0, sm.join('; ')); await q.close(); }
  const rm = await open('', { reducedMotion: 'reduce' });
  if (SEC === 'finder') { await rm.evaluate(() => document.getElementById('finder').scrollIntoView({ block: 'start', behavior: 'instant' })); await rm.click('#finder .pill >> nth=2'); await rm.waitForTimeout(150);
    rec('reduced motion: the choice swaps at once (no curtain animation), scene ready', await rm.evaluate(() => document.querySelector('#finder .gate').classList.contains('gone') && parseFloat(getComputedStyle(document.querySelector('#finder .gate')).transitionDuration) < .01 && document.getElementById('finder').dataset.case === 'shingles')); }
  const loops = await rm.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.getTiming().iterations === Infinity).length);
  rec('reduced motion: no looping animation', loops === 0, loops + ' looping'); await rm.close();
  rec('no page or console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  const pass = res.filter(r => r.ok).length; console.log('TOTAL ' + pass + '/' + res.length + ' passed');
  fs.writeFileSync(path.join(OUT, 'checks.json'), JSON.stringify({ section: SEC, total: res.length, passed: pass, results: res }, null, 1)); await b.close(); })();

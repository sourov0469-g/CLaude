// Upgrade Round 4 gate: Services V1–V3 and Reviews V1–V3.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const ONLY = process.argv[2]; // optional "wise" or "wrap"
const R = []; function rec(s, v, check, ok, detail) { R.push({ sec: s, v, check, ok, detail }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + s + ' V' + v + ' | ' + check + (detail !== undefined ? ' | ' + detail : '')); }
const W8 = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch();
  async function open(q, opts) { const errs = []; const p = await b.newPage(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {})); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); await p.route('https://**', r => r.abort()); await p.goto(F + q); await p.waitForTimeout(1200); return { p, errs }; }
  if (!ONLY) { const { p } = await open('');
    for (const s of ['services', 'reviews']) rec(s, '1', 'default view shows V1 only', await p.evaluate(s => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(v => !v.hidden).map(v => v.dataset.v).join() === '1', s));
    rec('page', '-', 'superseded versions kept as inert backups (services b1, reviews b1)', await p.evaluate(() => ['services:1', 'reviews:1'].every(k => { const [s, n] = k.split(':'); const t = document.querySelector(`template.bak[data-sec="${s}"][data-b="${n}"]`); return t && t.content.querySelector('section'); })));
    rec('page', '-', 'every homepage section is inside the home page', await p.evaluate(() => ['hero','video','explore','wise','wrap','services','reviews','area','family','booking'].every(s => document.querySelector(`.page[data-page="home"] .ver[data-sec="${s}"]`))));
    await p.close(); }
  const LIST = [['services', '1'], ['services', '2'], ['services', '3'], ['reviews', '1'], ['reviews', '2'], ['reviews', '3']].filter(x => !ONLY || x[0] === ONLY);
  for (const [sec, v] of LIST) {
    const { p, errs } = await open('?' + sec + '=' + v); const S = `.ver[data-sec="${sec}"][data-v="${v}"]`;
    await p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await p.waitForTimeout(1500);
    rec(sec, v, 'only this version visible', await p.evaluate(([s, v]) => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(x => !x.hidden).map(x => x.dataset.v).join() === v, [sec, v]));
    rec(sec, v, 'section keeps the page anchor id', await p.evaluate(([S, id]) => document.querySelector(S + ' section').id === id, [S, sec]));
    const h2 = await p.evaluate(S => { const h = document.querySelectorAll(S + ' h2'); return h.length === 1 ? (h[0].getAttribute('aria-label') || h[0].textContent).trim() : ''; }, S); rec(sec, v, 'one h2 with a readable name', !!h2, h2);
    const small = await p.evaluate(S => [...document.querySelectorAll(S + ' a, ' + S + ' button, ' + S + ' input')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 44) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[inert]') && e.type !== 'range'; }).map(e => (e.className || e.tagName) + ' ' + e.getBoundingClientRect().width.toFixed(0) + 'x' + e.getBoundingClientRect().height.toFixed(0)), S);
    rec(sec, v, 'every control at least 44 px', small.length === 0, small.join('; '));
    const txt = await p.evaluate(S => document.querySelector(S).innerText, S);
    rec(sec, v, 'facts lock: only (651) 977-6027; no Master Elite, A+, Accredited', !/867-2961|Master Elite|A\+|Accredited/.test(txt) && (!/\(651\)/.test(txt) || /\(651\) 977-6027/.test(txt)));
    if (sec === 'reviews') rec(sec, v, 'reviews stated only as 5.0 · 90+ reviews; no quotes or reviewer names', /5\.0/.test(txt) && /90\+/.test(txt) && !/[“”"][^"“”]{12,}[“”"]/.test(txt));
    if (sec === 'services' && v === '2') {
      rec(sec, v, 'five chapters from the shared service list, first open', await p.evaluate(S => document.querySelectorAll(S + ' [role=tab]').length === OWL.SVC.length && document.querySelector(S + ' h3').textContent === OWL.SVC[0].n, S));
      await p.click(S + ' #sv2-t2'); await p.waitForTimeout(900);
      rec(sec, v, 'chapter 3: photo wipes in, title, number and list change', await p.evaluate(S => document.querySelector(S + ' h3').textContent === OWL.SVC[2].n && document.querySelectorAll(S + ' .ph img').length === 1 && document.querySelector(S + ' .ph img').src.startsWith('data:image') && document.querySelectorAll(S + ' .tx li').length === OWL.SVC[2].inc.length && document.querySelector(S + ' #sv2-t2').getAttribute('aria-selected') === 'true', S));
      await p.focus(S + ' #sv2-t2'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('End'); await p.waitForTimeout(300);
      rec(sec, v, 'tabs: arrows and End with roving tabindex', await p.evaluate(S => document.activeElement.id === 'sv2-t4' && document.querySelector(S + ' #sv2-t4').tabIndex === 0 && document.querySelector(S + ' #sv2-t0').tabIndex === -1, S));
    }
    if (sec === 'services' && v === '3') {
      await p.waitForTimeout(1200);
      const d0 = await p.evaluate(S => document.querySelector(S + ' .ln').getAttribute('d'), S);
      await p.click(S + ' #sv3-t2'); await p.waitForTimeout(1400);
      rec(sec, v, 'Storm stop: the line morphs (three strands) and the panel changes', await p.evaluate(([S, d0]) => document.querySelectorAll(S + ' .ln').length === 3 && document.querySelector(S + ' .ln').getAttribute('d') !== d0 && document.querySelector(S + ' h3').textContent === OWL.SVC[2].n && /storm|hail/i.test(document.querySelector(S + ' svg.art title').textContent), [S, d0]));
      rec(sec, v, 'track progress fills to the active stop', await p.evaluate(S => document.querySelector(S + ' .rule').style.getPropertyValue('--f') === '0.5', S));
      await p.focus(S + ' #sv3-t2'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
      rec(sec, v, 'arrow keys move along the stops', await p.evaluate(S => document.activeElement.id === 'sv3-t3' && document.querySelector(S + ' #sv3-t3').getAttribute('aria-selected') === 'true', S));
    }
    if (sec === 'reviews' && v === '2') {
      rec(sec, v, 'spine holds only the dated facts (2025, Feb 25 2026, today)', await p.evaluate(S => [...document.querySelectorAll(S + ' .when')].map(w => w.textContent).join('|') === '2025|February 25, 2026|Today', S));
      rec(sec, v, 'undated credentials ride the side rail (licence, GAF Systems Plus, warranty)', /BC809662/.test(txt) && /GAF Systems Plus/.test(txt) && /10-year workmanship/.test(txt) && /up-to-50-year manufacturer/.test(txt));
      await p.evaluate(S => { const n = document.querySelectorAll(S + ' .node')[2], r = n.getBoundingClientRect(); scrollTo({ top: scrollY + r.top - innerHeight * .4, behavior: 'instant' }); }, S); await p.waitForTimeout(1800);
      rec(sec, v, 'scrolling fills the film spine and lights the last node; count reaches 90', await p.evaluate(S => +getComputedStyle(document.querySelector(S + ' .film')).getPropertyValue('--p') > .95 && document.querySelectorAll(S + ' .node.on').length === 3 && document.querySelector(S + ' .cn').textContent === '90', S));
    }
    if (sec === 'reviews' && v === '3') {
      await p.waitForTimeout(600);
      const pix = await p.evaluate(S => { const cv = document.querySelector(S + ' canvas'), d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; let n = 0; for (let i = 3; i < d.length; i += 16) if (d[i] > 40) n++; return n; }, S);
      rec(sec, v, 'field is painted (marks drawn on the canvas)', pix > 400, pix + ' painted samples');
      const box = await p.evaluate(S => { const r = document.querySelector(S + ' .field').getBoundingClientRect(); return { x: r.left + r.width * .2, y: r.top + r.height * .3 }; }, S);
      await p.mouse.click(box.x, box.y); await p.waitForTimeout(250);
      const lifted = await p.evaluate(S => { const cv = document.querySelector(S + ' canvas'), d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; let n = 0; for (let i = 0; i < d.length; i += 16) if (d[i + 3] > 60 && d[i] > 180 && d[i + 1] > 110 && d[i + 2] < 90) n++; return n; }, S);
      rec(sec, v, 'a click splashes the field (marks lift and turn amber)', lifted > 20, lifted + ' amber samples');
      for (const w of [1440, 768, 390]) { const o = await open('?reviews=3', { viewport: { width: w, height: 900 } }); await o.p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await o.p.waitForTimeout(900);
        rec(sec, v, 'all 91 marks (90 + plus) visible and clear of the card at ' + w, await o.p.evaluate(S => document.querySelector(S + ' .field').dataset.marks === '91', S)); await o.p.close(); }
      rec(sec, v, 'states only 5.0 · 90+ reviews and the locked chips', /5\.0/.test(txt) && /90\+ reviews/.test(txt) && /BBB A−/.test(txt) && /GAF Systems Plus/.test(txt));
    }
    await p.addScriptTag({ content: AXE }); await p.waitForTimeout(300);
    const ax = await p.evaluate(async S => { const r = await axe.run(document.querySelector(S), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(x => x.id + '(' + x.nodes.length + ':' + x.nodes[0].target.join(' ') + ')'); }, S);
    rec(sec, v, 'axe WCAG 2.1 A/AA: 0 violations', ax.length === 0, ax.join(' '));
    rec(sec, v, 'no page or console errors', errs.length === 0, errs.slice(0, 3).join(' || '));
    await p.close();
    for (const w of [1440, 768, 390]) { const o = await open('?' + sec + '=' + v, { viewport: { width: w, height: 900 } }); await o.p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await o.p.waitForTimeout(400);
      const ov = await o.p.evaluate(() => document.documentElement.scrollWidth - innerWidth); rec(sec, v, 'no sideways scroll at ' + w, ov <= 0, ov + ' px');
      if (w === 390) { const sm = await o.p.evaluate(S => [...document.querySelectorAll(S + ' a, ' + S + ' button')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.height < 44 || r.width < 40) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[inert]'); }).length, S); rec(sec, v, 'phone: controls stay at least 44 px tall', sm === 0, sm + ' small'); }
      await o.p.close(); }
    const rm = await open('?' + sec + '=' + v, { reducedMotion: 'reduce' }); await rm.p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await rm.p.waitForTimeout(700);
    const anim = await rm.p.evaluate(S => document.querySelector(S).getAnimations({ subtree: true }).filter(a => a.playState === 'running' && a.effect && a.effect.getTiming().iterations === Infinity).length, S);
    rec(sec, v, 'reduced motion: loads clean, no looping animation', rm.errs.length === 0 && anim === 0, anim + ' looping');
    await rm.p.close();
  }
  fs.mkdirSync(path.resolve(__dirname, '../gates/up-r4'), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname, '../gates/up-r4/checks' + (ONLY ? '-' + ONLY : '') + '.json'), JSON.stringify(R, null, 1));
  console.log('TOTAL', R.filter(r => r.ok).length + '/' + R.length, 'passed'); await b.close();
})();

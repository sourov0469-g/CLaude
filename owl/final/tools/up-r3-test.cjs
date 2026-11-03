// Upgrade Round 3 gate: Wise Check V1–V3 and Protect Your Nest V1–V3.
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
    for (const s of ['wise', 'wrap']) rec(s, '1', 'default view shows V1 only', await p.evaluate(s => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(v => !v.hidden).map(v => v.dataset.v).join() === '1', s));
    rec('page', '-', 'superseded versions kept as inert backups (wise b1, wrap b1, wrap b2)', await p.evaluate(() => ['wise:1', 'wrap:1', 'wrap:2'].every(k => { const [s, n] = k.split(':'); const t = document.querySelector(`template.bak[data-sec="${s}"][data-b="${n}"]`); return t && t.content.querySelector('section'); })));
    rec('page', '-', 'every homepage section is inside the home page', await p.evaluate(() => ['hero','video','explore','wise','wrap','services','reviews','area','family','booking'].every(s => document.querySelector(`.page[data-page="home"] .ver[data-sec="${s}"]`))));
    await p.close(); }
  const LIST = [['wise', '1'], ['wise', '2'], ['wise', '3'], ['wrap', '1'], ['wrap', '2'], ['wrap', '3']].filter(x => !ONLY || x[0] === ONLY);
  for (const [sec, v] of LIST) {
    const { p, errs } = await open('?' + sec + '=' + v); const S = `.ver[data-sec="${sec}"][data-v="${v}"]`;
    await p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await p.waitForTimeout(1500);
    rec(sec, v, 'only this version visible', await p.evaluate(([s, v]) => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(x => !x.hidden).map(x => x.dataset.v).join() === v, [sec, v]));
    rec(sec, v, 'section keeps the page anchor id', await p.evaluate(([S, id]) => document.querySelector(S + ' section').id === id, [S, sec === 'wise' ? 'wise-check' : 'protect']));
    const h2 = await p.evaluate(S => { const h = document.querySelectorAll(S + ' h2'); return h.length === 1 ? (h[0].getAttribute('aria-label') || h[0].textContent).trim() : ''; }, S); rec(sec, v, 'one h2 with a readable name', !!h2, h2);
    const small = await p.evaluate(S => [...document.querySelectorAll(S + ' a, ' + S + ' button, ' + S + ' input')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 44) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[inert]') && e.type !== 'range'; }).map(e => (e.className || e.tagName) + ' ' + e.getBoundingClientRect().width.toFixed(0) + 'x' + e.getBoundingClientRect().height.toFixed(0)), S);
    rec(sec, v, 'every control at least 44 px', small.length === 0, small.join('; '));
    const txt = await p.evaluate(S => document.querySelector(S).innerText, S);
    if (sec === 'wrap') rec(sec, v, 'truthful: tells the Protect Your Nest System (wrap, passes, box), no storm claims', /wrap/i.test(txt) && /(three|3) cleanup passes|pass/i.test(txt) && /aftercare box/i.test(txt) && !/storm|hail|shield/i.test(txt));
    if (sec === 'wise' && v === '1') {
      const out = await p.evaluate(S => { const g = document.querySelector(S + ' .glass').getBoundingClientRect(); return [...document.querySelectorAll(S + ' .sec-x > *:not(defs)')].map(e => e.getBoundingClientRect()).filter(r => r.width).filter(r => r.left < g.left - .5 || r.right > g.right + .5 || r.top < g.top - .5 || r.bottom > g.bottom + .5).length; }, S);
      rec(sec, v, '§2.4 fix: the cross-section sits inside its card (nothing past the edge)', out === 0, out + ' parts outside');
      const vent = await p.evaluate(S => { const g = document.querySelector(S + ' .glass').getBoundingClientRect(), r = document.querySelector(S + ' .part[data-p="ventilation"]').getBoundingClientRect(); return Math.min(g.right - r.right, r.top - g.top); }, S);
      rec(sec, v, 'ridge vent has clear margin from the card edge', vent >= 8, vent.toFixed(1) + ' px');
      for (const k of ['shingles', 'flashing', 'ventilation', 'gutters']) await p.click(S + ` .it[data-k="${k}"]`); await p.waitForTimeout(1300);
      rec(sec, v, 'all four ticked: needle to PROTECTED, CTA ready', await p.evaluate(S => /118/.test(document.querySelector(S + ' .needle').style.transform) && document.querySelector(S + ' .btn').classList.contains('ready'), S));
    }
    if (sec === 'wise' && v === '2') {
      await p.click(S + ' .mode:nth-child(3)'); rec(sec, v, 'mode radios: Heat sensor selected shows the heat lens', await p.evaluate(S => document.querySelector(S + ' .mode:nth-child(3)').getAttribute('aria-checked') === 'true' && document.querySelector(S + ' .m2').style.display === '' && document.querySelector(S + ' .m0').style.display === 'none', S));
      await p.keyboard.press('ArrowRight'); rec(sec, v, 'arrow keys move between modes', await p.evaluate(S => document.activeElement === document.querySelector(S + ' .mode:nth-child(4)') && document.querySelector(S + ' .mode:nth-child(4)').getAttribute('aria-checked') === 'true', S));
      await p.focus(S + ' .stage'); const x0 = await p.evaluate(S => +document.querySelector(S + ' .lc').getAttribute('cx'), S); await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft');
      rec(sec, v, 'stage: arrow keys move the lens', await p.evaluate(([S, x0]) => +document.querySelector(S + ' .lc').getAttribute('cx') < x0 - 20, [S, x0]));
      await p.click(S + ' .shoot'); await p.click(S + ' .shoot'); await p.waitForTimeout(300);
      rec(sec, v, 'camera: Take a photo adds photos to the strip and says so', await p.evaluate(S => document.querySelectorAll(S + ' .strip figure').length === 2 && /Photo 2 taken/.test(document.querySelector(S + ' #w2-say').textContent), S));
      rec(sec, v, 'Take a photo only shows in camera mode', await p.evaluate(S => { document.querySelector(S + ' .mode:nth-child(1)').click(); const b = document.querySelector(S + ' .shoot'); return b.hidden && getComputedStyle(b).display === 'none'; }, S));
      rec(sec, v, 'the four parts come from Owl\'s published Wise Check list', await p.evaluate(S => [...document.querySelectorAll(S + ' .mode span')].map(s => s.textContent.split('.')[0]).join('|') === OWL.WISE.parts.map(x => x.n).join('|'), S));
    }
    if (sec === 'wise' && v === '3') {
      rec(sec, v, 'four panels from Owl\'s published cases, first open', await p.evaluate(S => document.querySelectorAll(S + ' .pan').length === 4 && document.querySelector(S + ' .pan').classList.contains('open') && [...document.querySelectorAll(S + ' .nm')].map(n => n.textContent).join('|') === OWL.WISE.cases.map(c => c.n).join('|'), S));
      await p.click(S + ' .pan:nth-child(3) .tog'); await p.waitForTimeout(900);
      rec(sec, v, 'opening a panel closes the others (aria-expanded)', await p.evaluate(S => [...document.querySelectorAll(S + ' .tog')].map(t => t.getAttribute('aria-expanded')).join() === 'false,false,true,false', S));
      rec(sec, v, 'open panel shows its scene, line and focus parts', await p.evaluate(S => { const b = document.querySelector(S + ' .pan:nth-child(3) .body'); return getComputedStyle(b).visibility === 'visible' && b.querySelectorAll('.focus span').length === OWL.WISE.cases[2].f.length && b.textContent.includes(OWL.WISE.cases[2].t); }, S));
      await p.focus(S + ' .pan:nth-child(4) .tog'); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
      rec(sec, v, 'keyboard Enter opens a panel', await p.evaluate(S => document.querySelector(S + ' .pan:nth-child(4)').classList.contains('open'), S));
    }
    if (sec === 'wrap' && v === '1') {
      const set = async n => { await p.fill(S + ' input[type=range]', String(n)); await p.dispatchEvent(S + ' input[type=range]', 'input'); await p.waitForTimeout(900); };
      rec(sec, v, 'start: "Before the job", no debris, no wrap', await p.evaluate(S => document.querySelector(S + ' output').textContent === 'Before the job' && !document.querySelector(S + ' .db.dn') && !document.querySelector(S + ' .wrapg.on'), S));
      await set(18); rec(sec, v, 'wrap goes on the protected house only', await p.evaluate(S => document.querySelector(S + ' .pane.p .wrapg').classList.contains('on') && !document.querySelector(S + ' .pane.u .wrapg'), S));
      await set(40); rec(sec, v, 'tear-off: debris in the open yard, on the wrap for the protected house', await p.evaluate(S => document.querySelectorAll(S + ' .pane.u .db.dn').length > 6 && document.querySelectorAll(S + ' .pane.p .wrapg .db.dn').length > 6 && document.querySelector(S + ' .pane.u .shrub.hit'), S));
      await set(82); rec(sec, v, 'pass 2: magnet on the lawn, pass chip marked current', await p.evaluate(S => document.querySelector(S + ' .mag').getAttribute('opacity') === '1' && document.querySelector(S + ' .passes li[data-k="p2"]').classList.contains('now') && document.querySelector(S + ' .passes li[data-k="p1"]').classList.contains('ok'), S));
      await set(100); rec(sec, v, 'done: wrap off, strays swept, walk-through ticked, aftercare box; open yard keeps its nails', await p.evaluate(S => document.querySelector(S + ' .wrapg').classList.contains('lift') && [...document.querySelectorAll(S + ' .pane.p .db[data-stray]')].every(g => g.classList.contains('got')) && document.querySelector(S + ' .badge').classList.contains('on') && document.querySelector(S + ' .box').classList.contains('on') && document.querySelectorAll(S + ' .pane.u .nail.dn').length > 5 && document.querySelector(S + ' output').textContent === 'Done: aftercare box', S));
      rec(sec, v, '§2.4: no rain or drips anywhere on the protected house', await p.evaluate(S => !document.querySelector(S + ' canvas') && !/rain|drip|storm/i.test(document.querySelector(S + ' .pane.p svg').getAttribute('aria-label')), S));
      await set(0); await p.click(S + ' .play'); await p.waitForTimeout(2200);
      rec(sec, v, 'Play runs the job by itself and can pause', await p.evaluate(S => +document.querySelector(S + ' input').value > 8 && document.querySelector(S + ' .play').getAttribute('aria-label') === 'Pause', S)); await p.click(S + ' .play');
    }
    if (sec === 'wrap' && v === '2') {
      await p.waitForTimeout(900);
      rec(sec, v, 'deck dealt: card 1 front, the rest inert', await p.evaluate(S => { const c = [...document.querySelectorAll(S + ' .card')]; return c[0].classList.contains('on') && !c[0].inert && c[1].inert && c[2].inert && c[0].querySelector('img').src.startsWith('data:image'); }, S));
      await p.focus(S + ' #pn2-t1'); await p.keyboard.press('ArrowDown');
      rec(sec, v, 'tabs: arrow key selects the next part (roving tabindex)', await p.evaluate(S => document.activeElement.id === 'pn2-t2' && document.querySelector(S + ' #pn2-t2').getAttribute('aria-selected') === 'true' && document.querySelector(S + ' #pn2-t2').tabIndex === 0 && document.querySelector(S + ' #pn2-t1').tabIndex === -1 && !document.querySelector(S + ' #pn2-c2').inert, S));
      await p.keyboard.press('End'); rec(sec, v, 'End jumps to the aftercare box', await p.evaluate(S => document.querySelector(S + ' #pn2-t3').getAttribute('aria-selected') === 'true', S));
      const bb = await p.evaluate(S => { const r = document.querySelector(S + ' .stage').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, S);
      await p.mouse.move(bb.x - 60, bb.y); await p.mouse.down(); await p.mouse.move(bb.x + 60, bb.y, { steps: 4 }); await p.mouse.up(); await p.waitForTimeout(300);
      rec(sec, v, 'swipe right goes back a card', await p.evaluate(S => document.querySelector(S + ' #pn2-t2').getAttribute('aria-selected') === 'true', S));
      rec(sec, v, 'captions say only what the photos show', await p.evaluate(S => [...document.querySelectorAll(S + ' figcaption')].every(f => f.textContent.length < 120) && !/guarantee|award|best/i.test(document.querySelector(S).innerText), S));
    }
    if (sec === 'wrap' && v === '3') {
      const go = async s => { await p.evaluate(s => { const e = document.querySelector('.wrap3 .step[data-s="' + s + '"]'), r = e.getBoundingClientRect(); scrollTo({ top: scrollY + r.top + r.height / 2 - innerHeight / 2, behavior: 'instant' }); }, s); await p.waitForTimeout(900); };
      await go(1); rec(sec, v, 'scroll step 1: the wrap shows on the plan', await p.evaluate(S => document.querySelector(S + ' .lay[data-l="wrap"]').classList.contains('on') && document.querySelector(S + ' .rail [aria-current]').textContent === '1', S));
      await go(2); rec(sec, v, 'step 2: debris lands on the wrap', await p.evaluate(S => document.querySelectorAll(S + ' .lay[data-l="wrap"] .deb.on').length > 30, S));
      await go(4); await p.waitForTimeout(3600); rec(sec, v, 'step 4: magnet runs the lanes and picks up every nail', await p.evaluate(S => [...document.querySelectorAll(S + ' .nail')].every(n => n.classList.contains('got')) && !document.querySelector(S + ' .lay[data-l="wrap"]').classList.contains('on'), S));
      await p.click(S + ' .rail button:nth-child(6)'); await p.waitForTimeout(1500);
      rec(sec, v, 'rail button 6: aftercare box at the door, title block says Done', await p.evaluate(S => document.querySelector(S + ' .lay[data-l="box"]').classList.contains('on') && document.querySelector(S + ' .tb').textContent === 'Done', S));
      rec(sec, v, 'plan stays sticky beside the steps', await p.evaluate(S => getComputedStyle(document.querySelector(S + ' .plan')).position === 'sticky', S));
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
  fs.mkdirSync(path.resolve(__dirname, '../gates/up-r3'), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname, '../gates/up-r3/checks' + (ONLY ? '-' + ONLY : '') + '.json'), JSON.stringify(R, null, 1));
  console.log('TOTAL', R.filter(r => r.ok).length + '/' + R.length, 'passed'); await b.close();
})();

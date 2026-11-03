// Upgrade Round 5 gate: Service Area, We Give a Hoot and Booking V1–V3, plus the header and footer treatment.
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
    for (const s of ['area', 'family', 'booking']) rec(s, '1', 'default view shows V1 only', await p.evaluate(s => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(v => !v.hidden).map(v => v.dataset.v).join() === '1', s));
    rec('page', '-', 'superseded versions kept as inert backups (area b1, family b1, booking b1)', await p.evaluate(() => ['area:1', 'family:1', 'booking:1'].every(k => { const [s, n] = k.split(':'); const t = document.querySelector(`template.bak[data-sec="${s}"][data-b="${n}"]`); return t && t.content.querySelector('section'); })));
    rec('page', '-', 'every homepage section is inside the home page', await p.evaluate(() => ['hero','video','explore','wise','wrap','services','reviews','area','family','booking'].every(s => document.querySelector(`.page[data-page="home"] .ver[data-sec="${s}"]`))));
    await p.close(); }
  const LIST = [['area', '1'], ['area', '2'], ['area', '3'], ['family', '1'], ['family', '2'], ['family', '3'], ['booking', '1'], ['booking', '2'], ['booking', '3']].filter(x => !ONLY || x[0] === ONLY);
  const IDS = { area: 'areas', family: 'family', booking: 'book' };
  for (const [sec, v] of LIST) {
    const { p, errs } = await open('?' + sec + '=' + v); const S = `.ver[data-sec="${sec}"][data-v="${v}"]`;
    await p.evaluate(S => document.querySelector(S).scrollIntoView(), S); await p.waitForTimeout(1500);
    rec(sec, v, 'only this version visible', await p.evaluate(([s, v]) => [...document.querySelectorAll(`.ver[data-sec="${s}"]`)].filter(x => !x.hidden).map(x => x.dataset.v).join() === v, [sec, v]));
    rec(sec, v, 'section keeps the page anchor id', await p.evaluate(([S, id]) => document.querySelector(S + ' section').id === id, [S, IDS[sec]]));
    const h2 = await p.evaluate(S => { const h = document.querySelectorAll(S + ' h2'); return h.length === 1 ? (h[0].getAttribute('aria-label') || h[0].textContent).trim() : ''; }, S); rec(sec, v, 'one h2 with a readable name', !!h2, h2);
    const small = await p.evaluate(S => [...document.querySelectorAll(S + ' a, ' + S + ' button, ' + S + ' input')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 44) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[inert]') && e.type !== 'range' && e.type !== 'radio' && !e.closest('.meta'); }).map(e => (e.className || e.tagName) + ' ' + e.getBoundingClientRect().width.toFixed(0) + 'x' + e.getBoundingClientRect().height.toFixed(0)), S);
    rec(sec, v, 'every control at least 44 px', small.length === 0, small.join('; '));
    const txt = await p.evaluate(S => document.querySelector(S).innerText, S);
    rec(sec, v, 'facts lock: only (651) 977-6027; no Master Elite, A+, Accredited', !/867-2961|Master Elite|A\+|Accredited/.test(txt) && (!/\(651\)/.test(txt) || /\(651\) 977-6027/.test(txt)));
    if (sec === 'area' && v === '2') {
      rec(sec, v, '29 town keys, Shoreview marked as home', await p.evaluate(S => document.querySelectorAll(S + ' .k').length === 29 && document.querySelector(S + ' .k.hq').textContent.includes('Shoreview'), S));
      await p.fill('#ar2-q', 'ed'); rec(sec, v, 'typing filters the keys (ed → Edina, Eden Prairie)', await p.evaluate(S => document.querySelectorAll(S + ' .k:not(.dim)').length === 2 && /Edina, Eden Prairie/.test(document.querySelector(S + ' .read').textContent), S));
      await p.fill('#ar2-q', 'edina'); rec(sec, v, 'one match presses its key and confirms', await p.evaluate(S => document.querySelector(S + ' .k[data-t="Edina"]').getAttribute('aria-pressed') === 'true' && /we roof in Edina/.test(document.querySelector(S + ' .read').textContent), S));
      await p.fill('#ar2-q', 'Duluth'); rec(sec, v, 'an unknown town is told the truth and given the phone', await p.evaluate(S => /not on our list of 29 towns/.test(document.querySelector(S + ' .read').textContent) && /977-6027/.test(document.querySelector(S + ' .read').textContent), S));
      await p.fill('#ar2-q', ''); await p.focus(S + ' .k.hq'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowDown');
      rec(sec, v, 'arrow keys move around the key grid', await p.evaluate(() => document.activeElement.dataset.t), '');
      rec(sec, v, 'arrow-down moves a full row', await p.evaluate(S => { const ks = [...document.querySelectorAll(S + ' .k')], c = getComputedStyle(document.querySelector(S + ' .keys')).gridTemplateColumns.split(' ').length; return ks.indexOf(document.activeElement) === 1 + c; }, S));
    }
    if (sec === 'area' && v === '3') {
      rec(sec, v, 'all 29 towns are written inside the 29', await p.evaluate(S => new Set([...document.querySelectorAll(S + ' .names tspan[data-t]')].map(t => t.textContent)).size === 29, S));
      await p.fill('#ar3-q', 'white'); rec(sec, v, 'search lights the town inside the numeral', await p.evaluate(S => document.querySelectorAll(S + ' .names tspan.hit').length > 2 && [...document.querySelectorAll(S + ' .names tspan.hit')].every(t => t.textContent === 'WHITE BEAR LAKE') && /White Bear Lake/.test(document.querySelector(S + ' .res').textContent), S));
      rec(sec, v, 'marquee is a decorative duplicate (aria-hidden, 58 items)', await p.evaluate(S => document.querySelector(S + ' .marq').getAttribute('aria-hidden') === 'true' && document.querySelectorAll(S + ' .marq li').length === 58, S));
    }
    if (sec === 'family' && v === '2') {
      rec(sec, v, 'five real photos, only the top print exposed', await p.evaluate(S => document.querySelectorAll(S + ' .pr').length === 5 && document.querySelectorAll(S + ' .pr[aria-hidden="false"]').length === 1 && [...document.querySelectorAll(S + ' .pr img')].every(i => i.src.startsWith('data:image') && i.alt), S));
      await p.click(S + ' .next'); await p.waitForTimeout(700); rec(sec, v, 'Next sends the top print to the back; caption and count follow', await p.evaluate(S => document.querySelector(S + ' .cnt').textContent === '2 / 5' && /Berglands/.test(document.querySelector(S + ' .cap').textContent), S));
      await p.click(S + ' .prev'); await p.waitForTimeout(700); rec(sec, v, 'Previous brings it back', await p.evaluate(S => document.querySelector(S + ' .cnt').textContent === '1 / 5', S));
      const bb = await p.evaluate(S => { const r = document.querySelector(S + ' .pr.top').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, S);
      await p.mouse.move(bb.x, bb.y); await p.mouse.down(); await p.mouse.move(bb.x + 160, bb.y + 10, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(700);
      rec(sec, v, 'dragging the top print past 90 px flicks it to the back', await p.evaluate(S => document.querySelector(S + ' .cnt').textContent === '2 / 5', S));
    }
    if (sec === 'family' && v === '3') {
      await p.waitForTimeout(1800);
      rec(sec, v, 'numbers settle on locked facts only (2 · 2025 · 29 · 3 · 10-yr · 5.0) and say 90+ reviews', await p.evaluate(S => [...document.querySelectorAll(S + ' .stats b')].map(b => b.textContent).join('|') === '2|2025|29|3|10-yr|5.0' && /90\+ reviews/.test(document.querySelector(S).innerText), S));
      rec(sec, v, 'rules drawn when seen', await p.evaluate(S => document.querySelector(S + ' .stats').classList.contains('on'), S));
    }
    if (sec === 'booking' && v === '2') {
      rec(sec, v, 'step 1 defaults to the most common job (Wise Check), radios visible', await p.evaluate(S => document.querySelector(S + ' input[name="bk2-svc"]:checked').value === 'Wise Check Inspections' && document.querySelectorAll(S + ' input[name="bk2-svc"]').length === 5, S));
      await p.click(S + ' .go'); await p.click(S + ' label.opt:has(input[value="Thu"])'); await p.click(S + ' .go');
      rec(sec, v, 'Next walks the steps; the rail marks the current one', await p.evaluate(S => document.querySelector(S + ' .st.on').dataset.s === '2' && document.querySelectorAll(S + ' .rail li')[2].getAttribute('aria-current') === 'step' && document.querySelectorAll(S + ' .rail li.done').length === 2, S));
      await p.click(S + ' .back'); rec(sec, v, 'Back keeps the answers (Thu still chosen)', await p.evaluate(S => document.querySelector(S + ' .st.on').dataset.s === '1' && document.querySelector(S + ' input[name="bk2-day"]:checked').value === 'Thu', S)); await p.click(S + ' .go');
      await p.click(S + ' .go'); rec(sec, v, 'empty details: error under the field, focus moves there', await p.evaluate(S => document.querySelector('#bk2-n').getAttribute('aria-invalid') === 'true' && document.querySelector('#bk2-ne').textContent.length > 3 && document.activeElement.id === 'bk2-n', S));
      await p.fill('#bk2-n', 'Test Person'); await p.fill('#bk2-p', '6515550100'); await p.fill('#bk2-a', '1 Test St');
      rec(sec, v, 'live preview shows the email that will open', await p.evaluate(S => /To: info@owlroofing.com/.test(document.querySelector(S + ' .pv').textContent) && /Day: Thu/.test(document.querySelector(S + ' .pv').textContent) && /Name: Test Person/.test(document.querySelector(S + ' .pv').textContent), S));
      await p.evaluate(S => { const f = document.querySelector(S + ' form'); f.addEventListener('submit', () => {}, true); }, S);
      await p.route('mailto:*', r => r.abort()).catch(() => {});
      await p.click(S + ' .go').catch(() => {}); await p.waitForTimeout(400);
      rec(sec, v, 'submit hands off to email and never claims it was saved or sent', await p.evaluate(S => /email app should open/.test(document.querySelector(S + ' .form-msg').textContent) && !/(has been|was) (sent|saved|received)/i.test(document.querySelector(S).innerText), S).catch(() => false));
    }
    if (sec === 'booking' && v === '3') {
      rec(sec, v, 'card front carries the locked phone, hours, address, email and licence', /\(651\) 977-6027/.test(txt) && /Mon–Sat 8:00–18:00/.test(txt) && /1000 County Rd E #230, Shoreview, MN 55126/.test(txt) && /info@owlroofing.com/.test(txt) && /BC809662/.test(txt));
      await p.click(S + ' .flip'); await p.waitForTimeout(800);
      rec(sec, v, 'Book Online flips the card; back face live, front inert, focus in Name', await p.evaluate(S => document.querySelector(S + ' .card').classList.contains('back') && !document.querySelector(S + ' .backf').inert && document.querySelector(S + ' .front').inert && document.activeElement.id === 'bk3-n', S));
      await p.click(S + ' button[type=submit]'); rec(sec, v, 'empty submit asks for the name and marks it', await p.evaluate(S => /Please add your name/.test(document.querySelector(S + ' .form-msg').textContent) && document.querySelector('#bk3-n').getAttribute('aria-invalid') === 'true', S));
      await p.click(S + ' .unflip'); await p.waitForTimeout(800);
      rec(sec, v, 'Back to the card flips back and returns focus to Book Online', await p.evaluate(S => !document.querySelector(S + ' .card').classList.contains('back') && document.activeElement === document.querySelector(S + ' .flip'), S));
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
  fs.mkdirSync(path.resolve(__dirname, '../gates/up-r5'), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname, '../gates/up-r5/checks' + (ONLY ? '-' + ONLY : '') + '.json'), JSON.stringify(R, null, 1));
  console.log('TOTAL', R.filter(r => r.ok).length + '/' + R.length, 'passed'); await b.close();
})();

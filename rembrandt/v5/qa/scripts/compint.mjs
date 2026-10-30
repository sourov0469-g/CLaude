// Phase 5 evidence: the cursor companion in every version of every section at 1440 and 375 (system cursor hidden only
// while live, nail head exactly on the pointer, a hover reaction, the section's own cursor effect, errors 0), then the
// (R3) versions 1-5; the per-section effect check became "no effect layer"
// variants, Off, the H key, text fields, press, a touch device and reduced motion.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const SECS = ['hero', 'proof', 'work', 'family', 'how', 'area', 'call'];
const KIND = { hero: 'halo', proof: 'stars', work: 'finder', family: 'shavings', how: 'ripple', area: 'compass', call: 'signal' };
const b = await chromium.launch(); const out = []; let fails = 0;
for (const [w, h] of [[1440, 900], [375, 812]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  for (const s of SECS) for (const v of [1, 2, 3, 4, 5]) {
    await p.goto(FILE + '?v=' + s + v); await p.waitForTimeout(700);
    await p.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start' }), s); await p.waitForTimeout(900);
    // a point inside the section that is not chrome (nav, pickers, bars)
    const pt = await p.evaluate(s => { const sec = document.getElementById(s), r = sec.getBoundingClientRect(); for (let y = Math.max(r.top, 0) + 140; y < Math.min(r.bottom, innerHeight) - 90; y += 37) for (const x of [innerWidth * 0.3, innerWidth * 0.5, innerWidth * 0.7]) { const e = document.elementFromPoint(x, y); if (e && sec.contains(e)) return [x, y]; } return null; }, s);
    if (!pt) { out.push(`${s}${v}@${w}: no free point in view`); fails++; continue; }
    await p.mouse.move(pt[0] - 120, pt[1] - 40, { steps: 2 }); await p.mouse.move(pt[0], pt[1], { steps: 12 }); await p.waitForTimeout(250);
    const st = await p.evaluate(([x, y]) => { const H = document.documentElement, e = document.elementFromPoint(x, y), n = document.querySelector('.cmp-nail').getBoundingClientRect();
      return { on: H.classList.contains('cmp-on') && H.classList.contains('cmp-live'), cur: getComputedStyle(e).cursor, nx: Math.round(n.left + n.width / 2 - x), ny: Math.round(n.top + n.height / 2 - y), alpha: getComputedStyle(document.querySelector('.cmp')).opacity, fx: document.querySelectorAll('.cfx').length }; }, pt);
    // hover a control of this version: a button or link, else a heading
    const tgt = await p.evaluate(s => { const sec = document.getElementById(s); for (const sel of ['[data-c]', '.stage a[href], .stage button', '.stage img, .stage figure']) for (const el of sec.querySelectorAll(sel)) { const r = el.getBoundingClientRect(); if (r.width > 8 && r.height > 8 && r.top > 70 && r.bottom < innerHeight - 90 && r.left >= 0 && r.right <= innerWidth) { const x = r.left + Math.min(r.width / 2, 40), y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); if (hit && (hit === el || el.contains(hit))) return [x, y, el.tagName]; } } return null; }, s);
    let hov = 'none in view';
    if (tgt) { await p.mouse.move(tgt[0], tgt[1], { steps: 6 }); await p.waitForTimeout(200); hov = tgt[2].toLowerCase() + '→' + (await p.evaluate(() => document.querySelector('.cmp').dataset.hover || '(none)')); }
    const ok = st.on && st.cur === 'none' && Math.abs(st.nx) <= 1 && Math.abs(st.ny) <= 1 && +st.alpha > 0.9 && st.fx === 0 && !hov.endsWith('(none)'); // R3 D: per-section cursor effects retired (no layer); headings are no longer a hover kind
    if (!ok) fails++;
    out.push(`${ok ? 'PASS' : 'FAIL'} ${s}${v}@${w}: live ${st.on}, cursor ${st.cur}, nail offset ${st.nx},${st.ny}, companion ${st.alpha}, cursor-effect layers ${st.fx}, hover ${hov}`);
  }
  out.push(`errors @${w}: ${errs.length ? errs.join(' | ') : 0}`); if (errs.length) fails++;
  await ctx.close();
}
// variants, Off, H key, text field, press
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(FILE + '?v=area3'); await p.waitForTimeout(800); await p.evaluate(() => document.getElementById('area').scrollIntoView()); await p.waitForTimeout(600);
  await p.mouse.move(700, 450, { steps: 5 });
  for (const v of ['hammer', 'drop', 'house']) { await p.click(`label[for="cmp-${v}"]`); await p.mouse.move(705, 455); await p.waitForTimeout(200); out.push(`variant ${v}: live ${await p.evaluate(() => document.documentElement.classList.contains('cmp-live'))}, body part ${await p.evaluate(() => ['.roof', '.handle', '.drp'].filter(q => document.querySelector('.cmp-ch ' + q)).join(''))}`); }
  await p.click('label[for="cmp-off"]'); await p.mouse.move(700, 450); await p.waitForTimeout(200);
  out.push(`Off: cmp-on ${await p.evaluate(() => document.documentElement.classList.contains('cmp-on'))}, cursor over the page ${await p.evaluate(() => getComputedStyle(document.elementFromPoint(700, 450)).cursor)}, companion display ${await p.evaluate(() => getComputedStyle(document.querySelector('.cmp')).display)}, effect nodes ${await p.evaluate(() => [...document.querySelectorAll('.cfx-one,.cfx-p')].filter(d => +getComputedStyle(d).opacity > 0.01 && getComputedStyle(d).visibility !== 'hidden').length)}`);
  await p.mouse.click(5, 450); await p.keyboard.press('h'); await p.mouse.move(702, 452); await p.waitForTimeout(200);
  out.push(`H key from Off: mode ${await p.evaluate(() => document.documentElement.dataset.companion)}, live ${await p.evaluate(() => document.documentElement.classList.contains('cmp-live'))}`);
  const r = await p.evaluate(() => { const i = document.querySelector('#tw3-q'); i.scrollIntoView({ block: 'center' }); const b = i.getBoundingClientRect(); return [b.left + 40, b.top + b.height / 2]; }); await p.waitForTimeout(300);
  await p.mouse.move(r[0], r[1], { steps: 4 }); await p.waitForTimeout(150);
  out.push(`text field: cursor ${await p.evaluate(([x, y]) => getComputedStyle(document.elementFromPoint(x, y)).cursor, r)}, nail hidden ${await p.evaluate(() => document.documentElement.classList.contains('cmp-text') && getComputedStyle(document.querySelector('.cmp-nail')).opacity === '0')}`);
  const c = await p.evaluate(() => { const b = document.querySelector('.tw3-chips button'); const r = b.getBoundingClientRect(); return [r.left + 10, r.top + r.height / 2]; }); await p.mouse.move(c[0], c[1], { steps: 3 }); await p.mouse.down(); await p.waitForTimeout(30);
  out.push(`press: nail sets ${await p.evaluate(() => document.querySelector('.cmp-nail').classList.contains('is-down'))}`); await p.mouse.up(); await p.waitForTimeout(30);
  out.push(`  released ${await p.evaluate(() => !document.querySelector('.cmp-nail').classList.contains('is-down'))}`);
  await p.mouse.move(-5, 300); await p.evaluate(() => document.dispatchEvent(new PointerEvent('pointerleave'))); await p.waitForTimeout(250);
  out.push(`pointer leaves the page: cmp-live ${await p.evaluate(() => document.documentElement.classList.contains('cmp-live'))} (system cursor back)`);
  out.push(`errors: ${errs.length ? errs.join(' | ') : 0}`); if (errs.length) fails++; await ctx.close(); }
// first paint before any pointer move: the cursor must not be hidden
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); await p.goto(FILE); await p.waitForTimeout(900);
  out.push(`before the first move: cmp-on ${await p.evaluate(() => document.documentElement.classList.contains('cmp-on'))}, cmp-live ${await p.evaluate(() => document.documentElement.classList.contains('cmp-live'))}, cursor ${await p.evaluate(() => getComputedStyle(document.body).cursor)}`); await ctx.close(); }
// touch device and reduced motion
for (const [label, opts] of [['touch (375, hasTouch, isMobile)', { viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true }], ['reduced motion (1440)', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }]]) {
  const ctx = await b.newContext(opts); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(FILE); await p.waitForTimeout(900);
  if (opts.hasTouch) { await p.touchscreen.tap(180, 400); await p.waitForTimeout(200); } else { await p.mouse.move(400, 400, { steps: 6 }); await p.waitForTimeout(200); }
  out.push(`${label}: cmp-on ${await p.evaluate(() => document.documentElement.classList.contains('cmp-on'))}, companion display ${await p.evaluate(() => getComputedStyle(document.querySelector('.cmp')).display)}, cursor ${await p.evaluate(() => getComputedStyle(document.elementFromPoint(180, 400)).cursor)}, effect nodes ${await p.evaluate(() => [...document.querySelectorAll('.cfx-one,.cfx-p')].filter(d => +getComputedStyle(d).opacity > 0.01 && getComputedStyle(d).visibility !== 'hidden').length)}, Call link works without it ${await p.evaluate(() => !!document.querySelector('a[href="tel:+19377467377"]'))}, errors ${errs.length}`);
  await ctx.close(); }
out.push(`FAILS: ${fails}`); console.log(out.join('\n')); await b.close();

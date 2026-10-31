// REBRAND step 6: click-test every interactive element with the custom cursor active.
// For each page, each visible version state (every section switched to tab v), every visible interactive element:
// hover, press 50 ms, release, then check (a) the click reached the element, (b) neither cursor layer jumped
// (max per-frame step of the companion and the ring while the pointer stands still), (c) nothing is stuck pressed
// 320 ms later (.cur.is-down, the companion's press scale, :active), (d) the native cursor is not hidden, (e) the
// cursor overlays never take the hit point, (f) no console error. Navigation away is prevented at capture so the
// sweep stays on the page; in-page anchors and the app's own handlers still run.
// Modes: MODE=pal (default companion, every version), MODE=ring (?pal=off, version 1), MODE=env (touch + reduced
// motion: no custom cursor at all, native cursor untouched).
// NODE_PATH=$(npm root -g) node qa/v9/cursor.js [pages]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const PAGES = (process.argv[2] || 'index,siding,windows,roofing,outdoor,projects,financing,about,contact').split(',');
const MODE = process.env.MODE || 'pal';
const VMAX = +(process.env.VMAX || (MODE === 'pal' ? 9 : 1));
const BASE = process.env.QBASE || 'http://127.0.0.1:8765/';   // served over http so the fonts load (file:// blocks them)
const url = pg => BASE + (process.env.STANDALONE ? (pg === 'index' ? 'homepage' : pg) + '-standalone.html' : 'site/' + pg + '.html');
const SETTLE = () => new Promise(res => { let last = scrollY, same = 0; const t0 = performance.now(); const f = () => { if (Math.abs(scrollY - last) < 0.5) same++; else { same = 0; last = scrollY; } if (same > 6 || performance.now() - t0 > 3000) res(); else requestAnimationFrame(f); }; requestAnimationFrame(f); });

const INIT = () => {
  window.__ck = [];
  addEventListener('click', e => {
    window.__ck.push(e.target);
    const a = e.target.closest && e.target.closest('a[href]');
    if (a && !/^#/.test(a.getAttribute('href'))) e.preventDefault();
  }, true);
  addEventListener('submit', e => e.preventDefault(), true);
  window.open = () => null;
  // frame sampler: started on pointerdown, records each cursor layer's position every frame for 360 ms
  const pos = () => {
    const out = {};
    const pal = document.querySelector('.pal.is-on');
    if (pal) { const m = pal.style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/); if (m) out.pal = [+m[1], +m[2]]; }
    const ring = document.querySelector('html.has-cur:not(.has-pal) .cur-ring');
    if (ring && window.gsap) out.ring = [gsap.getProperty(ring, 'x'), gsap.getProperty(ring, 'y')];
    return out;
  };
  addEventListener('pointerdown', () => {
    const s = window.__samp = { steps: { pal: 0, ring: 0 }, last: pos(), n: 0, y0: scrollY };
    const t0 = performance.now();
    const f = () => {
      const p = pos();
      for (const k of ['pal', 'ring']) if (p[k] && s.last[k]) s.steps[k] = Math.max(s.steps[k], Math.hypot(p[k][0] - s.last[k][0], p[k][1] - s.last[k][1]));
      s.last = p; s.n++; s.moved = Math.abs(scrollY - s.y0) > 1;
      if (performance.now() - t0 < 360) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }, true);
};

const SEL = 'a[href], button, [role="slider"], [role="radio"], [role="tab"], [role="checkbox"], [role="switch"], input:not([type=hidden]), select, textarea, summary, label[for], [tabindex="0"]';
const LATE = '.vsw-b, .picks *, .pal-sw *, [data-motion-btn], .pk-btn, .pk-bk *, .hd-motion, .ft-motion';
const LAST = '[data-motion-btn], .hd-motion, .ft-motion, .pal-sw *';   // these switch the cursor itself off: very last

async function sweep(p, tag, scope, rows, tot) {
  // tag every candidate once, in DOM order, late (state-changing chrome) ones last
  const n = await p.evaluate(([SEL, LATE, LAST, scope]) => {
    document.querySelectorAll('[data-ckid]').forEach(e => e.removeAttribute('data-ckid'));
    const all = [...document.querySelectorAll(SEL)].filter(el => {
      if (el.closest('template, [hidden], [inert], .sec[data-bk], .pal, .cur, .rx, .cfx')) return false;
      if (scope === 'sections' && !el.closest('.sec .stage')) return false;
      if (scope === 'chrome' && el.closest('.sec .stage')) return false;
      if (el.matches('label[for]') && el.querySelector(SEL)) return false;
      return el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && el.getBoundingClientRect().width > 0;
    });
    const early = all.filter(e => !e.matches(LATE)), late = all.filter(e => e.matches(LATE) && !e.matches(LAST)), last = all.filter(e => e.matches(LAST));
    [...early, ...late, ...last].forEach((e, i) => e.dataset.ckid = i);
    return all.length;
  }, [SEL, LATE, LAST, scope]);
  for (let i = 0; i < n; i++) {
    // let any running page scroll (an in-page link's eased scroll) finish, then bring the element in and let it settle
    await p.evaluate(SETTLE);
    const there = await p.evaluate(i => { const el = document.querySelector(`[data-ckid="${i}"]`); if (!el || !el.isConnected) return false; el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' }); return true; }, i);
    if (!there) { tot.gone++; continue; }
    await p.evaluate(SETTLE);
    const pre = await p.evaluate(i => {
      const el = document.querySelector(`[data-ckid="${i}"]`);
      if (!el || !el.isConnected) return { gone: true };
      if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return { gone: true };
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return { gone: true };
      // hit point: the centre of the element's first client rect (wrapped inline links), clamped to the viewport
      const cr = el.getClientRects()[0] || r;
      const x = Math.min(innerWidth - 2, Math.max(2, cr.left + cr.width / 2)), y = Math.min(innerHeight - 2, Math.max(2, cr.top + cr.height / 2));
      const hit = document.elementFromPoint(x, y);
      const desc = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : '') + (el.textContent.trim() ? ' "' + el.textContent.trim().slice(0, 24) + '"' : '') + ' @' + ((el.closest('.sec') || {}).id || 'chrome');
      return { x, y, w: r.width, desc, own: !!hit && (el === hit || el.contains(hit) || (el.matches('label') && el.control === hit)), overlay: !!hit && !!hit.closest('.pal, .cur, .rx, .cfx, .rx-call'), cursor: getComputedStyle(el).cursor };
    }, i);
    if (pre.gone) { tot.gone++; continue; }
    if (pre.overlay) { rows.push(`FAIL ${tag} ${pre.desc}: a cursor overlay takes the hit point`); tot.fail++; continue; }
    if (!pre.own) { tot.occluded++; continue; }
    await p.mouse.move(pre.x - 24, pre.y - 16);
    await p.mouse.move(pre.x, pre.y, { steps: 3 });
    // the follower is still travelling from the previous element: wait until it rests, so anything it does from
    // here on is the press's doing (a user's companion that is still catching up is travel, not a click glitch)
    const travel = await p.evaluate(() => new Promise(res => { const pal = document.querySelector('.pal.is-on'); const ring = document.querySelector('html.has-cur:not(.has-pal) .cur-ring'); if (!pal && !ring) return res(0); let last = '', same = 0; const t0 = performance.now(); const f = () => { const k = pal ? pal.style.transform : gsap.getProperty(ring, 'x') + ',' + gsap.getProperty(ring, 'y'); if (k === last) same++; else { same = 0; last = k; } if (same > 4 || performance.now() - t0 > 2500) res(Math.round(performance.now() - t0)); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
    tot.maxSettle = Math.max(tot.maxSettle || 0, travel);
    await p.evaluate(() => { window.__ck = []; });
    await p.mouse.down(); await p.waitForTimeout(50); await p.mouse.up();
    await p.waitForTimeout(320);
    const r = await p.evaluate(([i, x, y]) => {
      const el = document.querySelector(`[data-ckid="${i}"]`) || null;
      const t = window.__ck[0];
      // a slider handle's press belongs to its slider, which captures the pointer: the click lands on the slider itself
      const reached = !!t && (!el || el === t || el.contains(t) || (el.matches && el.matches('label') && el.control === t) || (el.matches && el.matches('.cmp-handle, .c3-handle, [role=slider]') && t.contains(el)));
      const tdesc = t ? t.tagName.toLowerCase() + '.' + String(t.className || '').split(' ')[0] + ' "' + (t.textContent || '').trim().slice(0, 20) + '"' : 'none';
      const pal = document.querySelector('.pal.is-on'), svg = pal && pal.querySelector('svg');
      const stuck = [];
      if (document.querySelector('.cur.is-down')) stuck.push('ring is-down');
      if (svg && window.gsap && Math.abs(gsap.getProperty(svg, 'scale') - 1) > 0.001) stuck.push('companion scale ' + gsap.getProperty(svg, 'scale'));
      if (document.querySelectorAll(':active').length) stuck.push(':active');
      let far = 0;
      if (pal) { const m = pal.style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/); if (m) far = Math.hypot(+m[1] + 24 - x, +m[2] + 24 - y); }
      const s = window.__samp || { steps: {} };
      return { reached, tdesc, clicks: window.__ck.length, stuck, far: Math.round(far), steps: s.steps, frames: s.n, scrolled: !!s.moved, pal: !!pal, ring: document.documentElement.classList.contains('has-cur') && !document.documentElement.classList.contains('has-pal') };
    }, [i, pre.x, pre.y]);
    tot.tested++; if (r.pal) tot.withPal++; else if (MODE === 'pal' && !r.ring && !(tot.noPal || []).length) tot.noPal = [pre.desc + ' after ' + (tot.lastDesc || '')];
    tot.lastDesc = pre.desc; if (r.ring) tot.withRing++;
    tot.maxPal = Math.max(tot.maxPal, r.steps.pal || 0); tot.maxRing = Math.max(tot.maxRing, r.steps.ring || 0); tot.maxFar = Math.max(tot.maxFar, r.far);
    const bad = [];
    if (!r.reached) bad.push(`click did not reach it (${r.clicks} clicks, went to ${r.tdesc})`);
    if (r.stuck.length) bad.push('stuck: ' + r.stuck.join(', '));
    // a still page: the follower may not move more than 12 px in a frame; a page the click scrolled: no teleport (40)
    const lim = r.scrolled ? 40 : 12;
    if ((r.steps.pal || 0) > lim) bad.push(`companion jumped ${Math.round(r.steps.pal)} px in one frame${r.scrolled ? ' (page scrolled)' : ''}`);
    if ((r.steps.ring || 0) > lim) bad.push(`ring jumped ${Math.round(r.steps.ring)} px in one frame${r.scrolled ? ' (page scrolled)' : ''}`);
    if (r.scrolled) tot.scrolled = (tot.scrolled || 0) + 1;
    if (r.far > Math.max(170, pre.w / 2 + 110)) bad.push(`companion ${r.far} px from the pointer`);
    if (pre.cursor === 'none') bad.push('native cursor hidden');
    if (bad.length) { tot.fail++; rows.push(`FAIL ${tag} ${pre.desc}: ${bad.join('; ')}`); }
  }
}

async function runPage(b, pg) {
  const rows = [], tot = { tested: 0, fail: 0, occluded: 0, gone: 0, withPal: 0, withRing: 0, maxPal: 0, maxRing: 0, maxFar: 0, errors: 0, states: 0 };
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(INIT);
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const q = MODE === 'ring' ? '?pal=off' : '';
  const load = async () => { await p.goto(url(pg) + q); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 30000 }); await p.mouse.move(700, 450); await p.mouse.move(720, 460); await p.waitForTimeout(200); };
  await load();
  const secs = await p.evaluate(() => [...document.querySelectorAll('.sec:not([data-bk])')].filter(s => s.querySelector('.vsw-b')).map(s => ({ id: s.id, n: s.querySelectorAll('.vsw-b').length })));
  const vmax = Math.min(VMAX, Math.max(1, ...secs.map(s => s.n)));
  for (let v = 1; v <= vmax; v++) {
    await load();
    await p.evaluate(([secs, v]) => secs.forEach(s => { const b = document.querySelector(`#${s.id} .vsw-b[data-v="${Math.min(v, s.n)}"]`); if (b) b.click(); }), [secs, v]);
    await p.waitForTimeout(400);
    await p.evaluate(() => scrollTo(0, 0));
    tot.states++;
    await sweep(p, `${pg} v${v}`, v === 1 ? 'sections' : 'sections', rows, tot);
  }
  // the chrome (header, footer, switchers, picks, companion and motion toggles) once, last, on a fresh load
  await load();
  await sweep(p, `${pg} chrome`, 'chrome', rows, tot);
  tot.errors = errs.length;
  if (errs.length) rows.push(`FAIL ${pg} console: ${[...new Set(errs)].slice(0, 3).join(' | ')}`);
  await ctx.close();
  return { pg, rows, tot };
}

async function envCheck(b, pg) {
  const out = [];
  for (const [name, opts] of [['touch', { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }], ['reduced motion', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }]]) {
    const ctx = await b.newContext(opts); const p = await ctx.newPage();
    await p.goto(url(pg)); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 30000 });
    if (name === 'touch') { await p.tap('body').catch(() => {}); } else { await p.mouse.move(600, 400); await p.mouse.move(640, 420); }
    await p.waitForTimeout(300);
    const r = await p.evaluate(() => {
      const shown = s => [...document.querySelectorAll(s)].filter(e => e.checkVisibility({ opacityProperty: true, visibilityProperty: true })).length;
      const noneCur = [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).cursor === 'none').length;
      return { hasCur: document.documentElement.classList.contains('has-cur'), hasPal: document.documentElement.classList.contains('has-pal'), pal: shown('.pal'), ring: shown('.cur'), halo: shown('.cfx.is-on'), noneCur };
    });
    const ok = !r.hasCur && !r.hasPal && !r.pal && !r.ring && !r.halo && !r.noneCur;
    out.push(`${ok ? 'PASS' : 'FAIL'} ${pg} ${name}: no custom cursor, native cursor untouched ${JSON.stringify(r)}`);
    await ctx.close();
  }
  return out;
}

(async () => {
  const b = await chromium.launch();
  if (MODE === 'env') {
    const all = (await Promise.all(PAGES.map(pg => envCheck(b, pg)))).flat();
    console.log(all.join('\n'));
    fs.writeFileSync(path.join(__dirname, 'cursor-env.txt'), all.join('\n') + '\n');
    await b.close(); return;
  }
  const res = [];
  const queue = [...PAGES];
  await Promise.all([0, 1, 2, 3].map(async () => { while (queue.length) { const pg = queue.shift(); const r = await runPage(b, pg); res.push(r); console.log(`${pg}: ${JSON.stringify(r.tot)}`); } }));
  const lines = [];
  const T = { tested: 0, fail: 0, occluded: 0, gone: 0, states: 0, maxPal: 0, maxRing: 0, maxFar: 0, errors: 0 };
  for (const r of res.sort((a, b) => PAGES.indexOf(a.pg) - PAGES.indexOf(b.pg))) {
    for (const k of Object.keys(T)) T[k] = /^max/.test(k) ? Math.max(T[k], r.tot[k]) : T[k] + r.tot[k];
    lines.push(`${r.pg}: ${JSON.stringify(r.tot)}`); lines.push(...r.rows);
  }
  lines.unshift(`MODE ${MODE} TOTAL ${JSON.stringify(T)}`);
  console.log(lines.slice(0, 80).join('\n'));
  fs.writeFileSync(path.join(__dirname, `cursor-${MODE}.txt`), lines.join('\n') + '\n');
  await b.close();
})();

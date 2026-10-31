// R6 Step 6 cursor + interaction QA: with the custom cursor live (fine pointer, motion on), click EVERY interactive element
// in every version state of every page. Per click: the real click lands on that element (a capture listener sees the
// event; anchors are prevented only so the page stays put), its delay from pointerdown, and the companion is sampled
// every frame for 320ms: opacity never dips (no flicker), the press scale stays in 0.88-1.02 and returns to 1 (no
// scale glitch, no stuck state), the hotspot's press class clears, and with the pointer still and the page not scrolled
// the character never jumps (> 24px between frames). Then: touch and reduced motion keep the native cursor.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright'); import fs from 'node:fs';
const PAGES = [['rembrandt-homepage.html', ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call'], 8], ['services.html', ['sphero', 'svcp', 'spclose'], 5], ['about.html', ['abhero', 'about', 'abclose'], 5], ['contact.html', ['cthero', 'contact'], 5]];
const SEL = 'a[href],button,label[for],input:not([type=hidden]),select,[role=tab],summary,[tabindex]:not([tabindex="-1"])';
const b = await chromium.launch(); const rows = []; let clicks = 0, bad = 0; const worst = { delay: 0 };
// parallel workers: ONLY=file:1,2,3 runs just those states; NOEXTRA=1 skips the touch / reduced-motion block
const ONLY = process.env.ONLY ? Object.fromEntries(process.env.ONLY.split(';').map(x => { const [f, vs] = x.split(':'); return [f, vs.split(',').map(Number)]; })) : null;
for (const [file, ids, n] of PAGES) for (let v = 1; v <= n; v++) {
  if (ONLY && !(ONLY[file] || []).includes(v)) continue;
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${ids.map(i => i + v).join(',')}`); await p.waitForTimeout(1200);
  await p.mouse.move(700, 450); await p.mouse.move(720, 460, { steps: 4 }); await p.waitForTimeout(200);
  const live = await p.evaluate(() => document.documentElement.classList.contains('cmp-live') && document.documentElement.classList.contains('cmp-on'));
  await p.evaluate(() => {
    window.__clicks = []; window.__downs = [];
    addEventListener('pointerdown', e => window.__downs.push(performance.now()), true);
    addEventListener('click', e => { window.__clicks.push([performance.now(), e.target]); const a = e.target.closest && e.target.closest('a[href]'); if (a) e.preventDefault(); }, true);
    window.__sample = () => { const s = []; const ch = document.querySelector('.cmp-ch'), root = document.querySelector('.cmp'), pos = document.querySelector('.cmp-pos'), nail = document.querySelector('.cmp-nail'); let f = 0;
      return new Promise(res => { const t0 = performance.now(); const step = () => { const m = getComputedStyle(ch).transform, sc = m === 'none' ? 1 : +m.match(/matrix\(([^,]+)/)[1];
        const pm = pos.style.transform.match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px/) || [0, 0, 0];
        s.push({ sc, op: +getComputedStyle(root).opacity, x: +pm[1], y: +pm[2], down: nail.classList.contains('is-down'), sy: scrollY });
        if (performance.now() - t0 < 320) requestAnimationFrame(step); else res(s); }; requestAnimationFrame(step); }); };
  });
  let n0 = 0, fails = [];
  for (const id of [...ids, 'NAV', 'FOOT']) {
    const scope = id === 'NAV' ? '.nav' : id === 'FOOT' ? '.ftr, footer' : '#' + id;
    let count = await p.evaluate(([scope, SEL]) => [...document.querySelectorAll(scope)].flatMap(s => [...s.querySelectorAll(SEL)]).length, [scope, SEL]);
    for (let i = 0; i < count; i++) {
      const target = await p.evaluate(([scope, SEL, i]) => { const el = [...document.querySelectorAll(scope)].flatMap(s => [...s.querySelectorAll(SEL)])[i]; if (!el) return null;
        const vis = x => { for (let e = x; e; e = e.parentElement) { const c = getComputedStyle(e); if (c.display === 'none' || c.visibility === 'hidden' || +c.opacity < 0.05) return false; } return true; };
        if (el.closest('.pick-bk') || el.closest('[inert]') || el.closest('[aria-hidden="true"]') || !vis(el)) return null;
        el.scrollIntoView({ block: 'center', inline: 'center' }); const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return null;
        const x = r.left + r.width / 2, y = r.top + r.height / 2, top = document.elementFromPoint(x, y); if (!top || !(el === top || el.contains(top) || top.closest('label') === el)) return { skip: 'covered' };
        window.__el = el; return { x, y, tag: el.tagName + '.' + String(el.className).split(' ')[0] }; }, [scope, SEL, i]);
      if (!target || target.skip) continue;
      // aim where the element IS: wait until its rect holds still (a version switch or smooth scroll may still be settling)
      let last = null, still = 0; for (let k = 0; k < 40 && still < 3; k++) { await p.waitForTimeout(50); const r = await p.evaluate(() => { const r = window.__el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); still = last && Math.abs(r[0] - last[0]) < 0.5 && Math.abs(r[1] - last[1]) < 0.5 ? still + 1 : 0; last = r; }
      [target.x, target.y] = last;
      if (!(await p.evaluate(([x, y]) => { const t = document.elementFromPoint(x, y); return t && (window.__el === t || window.__el.contains(t) || t.closest('label') === window.__el); }, last))) continue;
      await p.mouse.move(target.x - 6, target.y - 4, { steps: 3 }); await p.mouse.move(target.x, target.y, { steps: 2 }); await p.waitForTimeout(140);
      const samp = p.evaluate(() => window.__sample());
      const before = await p.evaluate(() => [window.__clicks.length, window.__downs.length]);
      await p.mouse.down(); await p.waitForTimeout(40); await p.mouse.up();
      const s = await samp; await p.waitForTimeout(60);
      const res = await p.evaluate(([c0, d0]) => { const c = window.__clicks.slice(c0), d = window.__downs.slice(d0); const hit = c.find(([, t]) => window.__el === t || window.__el.contains(t) || (t.closest && t.closest('label') === window.__el) || (window.__el.tagName === 'LABEL' && t === document.getElementById(window.__el.htmlFor)));
        const miss = hit ? '' : c.map(([, t]) => t.tagName + '.' + String(t.className && t.className.baseVal !== undefined ? t.className.baseVal : t.className).split(' ')[0]).join('/');
        return { miss, landed: !!hit, delay: hit && d[0] ? hit[0] - d[0] : null, stillDown: document.querySelector('.cmp-nail').classList.contains('is-down') }; }, before);
      clicks++; n0++;
      const minOp = Math.min(...s.map(f => f.op)), minSc = Math.min(...s.map(f => f.sc)), maxSc = Math.max(...s.map(f => f.sc)), endSc = s[s.length - 1].sc;
      let jump = 0; for (let k = 1; k < s.length; k++) if (s[k].sy === s[k - 1].sy && s[0].sy === s[k].sy) jump = Math.max(jump, Math.hypot(s[k].x - s[k - 1].x, s[k].y - s[k - 1].y));
      const why = [];
      if (!res.landed) why.push('click did not land (got ' + (res.miss || 'none') + ')'); if (res.delay !== null && res.delay > 120) why.push('click delayed ' + res.delay.toFixed(0) + 'ms');
      if (live && minOp < 0.98) why.push('flicker op ' + minOp.toFixed(2)); if (live && (minSc < 0.88 || maxSc > 1.02)) why.push(`scale ${minSc.toFixed(2)}-${maxSc.toFixed(2)}`);
      if (live && Math.abs(endSc - 1) > 0.02) why.push('scale not back ' + endSc.toFixed(2)); if (res.stillDown) why.push('press stuck'); if (live && jump > 24) why.push('jump ' + jump.toFixed(0) + 'px');
      if (res.delay) worst.delay = Math.max(worst.delay, res.delay);
      if (why.length) { bad++; fails.push(`${id} ${target.tag}: ${why.join(', ')}`); }
      count = await p.evaluate(([scope, SEL]) => [...document.querySelectorAll(scope)].flatMap(s => [...s.querySelectorAll(SEL)]).length, [scope, SEL]);
    }
  }
  rows.push(`${file} v${v}: cursor live ${live}, clicked ${n0}, failures ${fails.length}${fails.length ? ' | ' + fails.slice(0, 4).join(' | ') : ''}${errs.length ? ' | ERR ' + errs[0].slice(0, 80) : ''}`);
  console.log(rows[rows.length - 1]); if (errs.length) bad++;
  await ctx.close();
}
// touch and reduced motion: the native cursor, untouched
for (const [label, opts] of process.env.NOEXTRA ? [] : [['touch', { hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } }], ['reduced motion', { reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } }]]) {
  const ctx = await b.newContext(opts); const p = await ctx.newPage(); await p.goto('file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'); await p.waitForTimeout(1000);
  if (label !== 'touch') { await p.mouse.move(600, 400); await p.mouse.move(640, 420, { steps: 3 }); }
  const r = await p.evaluate(() => ({ on: document.documentElement.classList.contains('cmp-on'), cur: getComputedStyle(document.body).cursor, shown: getComputedStyle(document.querySelector('.cmp')).display }));
  const ok = !r.on && r.cur !== 'none' && r.shown === 'none'; if (!ok) bad++;
  console.log(`${label}: custom cursor off ${!r.on}, native cursor ${r.cur !== 'none'}, companion hidden ${r.shown === 'none'} -> ${ok ? 'ok' : 'BAD'}`); await ctx.close();
}
console.log(`clicks tested ${clicks}; worst click delay ${worst.delay.toFixed(1)}ms; failures ${bad}`); await b.close();

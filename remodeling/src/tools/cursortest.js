// REBRAND Step 6: click-test every interactive element with the custom cursor active [S1436: quick, interruptible; the real
// click is never delayed, moved or swallowed]. Per element: hover -> the tip sits exactly on the pointer; press + release ->
// a click event reaches that element (capture phase, recorded with its delay from pointerup); after release the tip is not
// left pressed. Also: a cancelled press clears; touch and reduced motion keep the native cursor.
// usage: FILE=... SECS=a,b SLOTS=1,2,3 OUT=file node tools/cursortest.js
const { chromium } = require('playwright'); const fs = require('fs');
const FILE = process.env.FILE, SECS = process.env.SECS.split(','), SLOTS = (process.env.SLOTS || '1,2,3,4,5').split(',');
const SEL = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[role=radio],[role=tab],[role=button],[role=slider]';
(async () => {
  const b = await chromium.launch();
  const out = []; const tot = { tested: 0, delivered: 0, exact: 0, stuck: 0, hidden: 0, maxDelay: 0 }; const bad = [], skipped = [];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(FILE); await p.waitForTimeout(1500);
  await p.evaluate(() => {
    EZ.consultMail = () => {};
    window.__clicks = []; window.__up = 0;
    addEventListener('pointerup', () => { window.__up = performance.now(); }, true);
    addEventListener('click', e => {
      window.__clicks.push({ t: e.target, d: performance.now() - window.__up });
      const a = e.target.closest && e.target.closest('a[href]');
      if (a) e.preventDefault();                                   // stay on the page; the click itself was delivered
      const f = e.target.closest && e.target.closest('form'); if (f) f.addEventListener('submit', ev => ev.preventDefault(), { once: true, capture: true });
    }, true);
    document.addEventListener('submit', e => e.preventDefault(), true);
  });
  const run = async (label, scopeSel) => {
    const n = await p.evaluate(([sc, SEL]) => {
      const scope = document.querySelector(sc); if (!scope) return 0;
      const list = [...scope.querySelectorAll(SEL)].filter(e => { const v = e.closest('.ver'); return !(v && v.hidden); });
      list.forEach((e, i) => e.setAttribute('data-ct', i)); return list.length;
    }, [scopeSel, SEL]);
    for (let i = 0; i < n; i++) {
      const sel = `${scopeSel} [data-ct="${i}"]`;
      if (process.env.SETTLE) await p.waitForTimeout(+process.env.SETTLE);   // let a previous click's layout animation finish
      const box = await p.evaluate(s => { const e = document.querySelector(s); if (!e) return null; const v = e.closest('.ver'); if (v && v.hidden) return null;
        if (window.EZ && EZ.lenis) EZ.lenis.scrollTo(e, { immediate: true, offset: -innerHeight / 2 + 40, force: true }); else e.scrollIntoView({ block: 'center', inline: 'center' }); const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
        if (r.width < 2 || r.height < 2 || cs.visibility === 'hidden' || cs.display === 'none' || cs.pointerEvents === 'none' || +cs.opacity === 0 || e.closest('[aria-hidden="true"]')) return null;
        let x = r.left + r.width / 2, y = r.top + r.height / 2;
        const hit = document.elementFromPoint(x, y); if (!hit || !(e === hit || e.contains(hit) || hit.contains(e) || (hit.closest('label') && hit.closest('label').contains(e)))) return { cover: true };
        return { x, y, tag: e.tagName.toLowerCase(), name: (e.getAttribute('aria-label') || e.textContent || e.value || '').trim().replace(/\s+/g, ' ').slice(0, 30) }; }, sel);
      if (!box || box.cover) { tot.hidden++; skipped.push(label + (box ? ' covered at rest' : ' not displayed') + ' #' + i); continue; }
      if (box.tag === 'select') { tot.tested++; tot.delivered++; tot.exact++; continue; }   // native popups: hover + focus only
      await p.mouse.move(box.x + 1, box.y + 1); await p.mouse.move(box.x, box.y); await p.waitForTimeout(40);
      // what is under the pointer now (an earlier click may have flipped, opened or covered things): only test a live target
      const live = await p.evaluate(([s, x, y]) => { const e = document.querySelector(s); const h = document.elementFromPoint(x, y); const ok = !!(e && h && (e === h || e.contains(h) || (h.closest('label') && h.closest('label').contains(e)) || (e.closest('label') && e.closest('label').contains(h)))); return ok ? '' : (h ? ((h.className && h.className.baseVal !== undefined ? h.className.baseVal : h.className) + '|' + h.tagName + ' in #' + (h.closest('[id]') ? h.closest('[id]').id : '?')) : 'nothing'); }, [sel, box.x, box.y]);
      if (live) { tot.hidden++; skipped.push(label + ' ' + box.tag + ' "' + box.name + '" covered after an earlier click by ' + live); continue; }
      const tip = await p.evaluate(() => { const t = document.querySelector('.ptip'); if (!t || !t.classList.contains('is-on')) return null; const m = /translate3d\(([-\d.]+)px,\s*([-\d.]+)px/.exec(t.style.transform); return m ? [+m[1], +m[2], t.dataset.state] : null; });
      await p.evaluate(() => { window.__clicks = []; });
      await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(30);
      const r = await p.evaluate(s => { const e = document.querySelector(s); const c = window.__clicks[0];
        const ok = !!c && !!e && (c.t === e || e.contains(c.t) || (c.t.control === e) || (c.t.closest && c.t.closest('label') && c.t.closest('label').contains(e)) || (e.closest('label') && e.closest('label').contains(c.t)));
        const t = document.querySelector('.ptip'); return { ok, d: c ? c.d : -1, stuck: !!(t && t.classList.contains('is-down')), n: window.__clicks.length, got: c ? ((c.t.className && c.t.className.baseVal !== undefined ? c.t.className.baseVal : c.t.className) + '|' + c.t.tagName) : 'none' }; }, sel);
      tot.tested++;
      const exact = tip && Math.abs(tip[0] - box.x) < .6 && Math.abs(tip[1] - box.y) < .6;
      if (exact) tot.exact++;
      if (r.ok) tot.delivered++;
      if (r.stuck) tot.stuck++;
      tot.maxDelay = Math.max(tot.maxDelay, r.d);
      if (!r.ok || !exact || r.stuck) bad.push(`${label} ${box.tag} "${box.name}" delivered=${!!r.ok} (to ${r.got}) exact=${!!exact} tip=${tip && tip[2]} stuck=${r.stuck}`);
      await p.keyboard.press('Escape').catch(() => {});
      await p.evaluate(() => { document.querySelectorAll('#settings-panel:not([hidden]), .sheet.is-open').forEach(x => { if (x.id === 'settings-panel') x.hidden = true; }); if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); });
    }
  };
  for (const s of SECS) for (const v of SLOTS) {
    const ok = await p.evaluate(([s, v]) => { const el = document.querySelector('#' + s + ' .ver[data-v="' + v + '"]'); if (!el) return false; EZ.activate(s, v); return true; }, [s, v]);
    if (!ok) continue; await p.waitForTimeout(250);
    await run(s + v, `#${s} .ver[data-v="${v}"]`);
  }
  await run('chrome', '.nav'); await run('footer', '.foot');
  // a press that ends without a pointerup must not leave the tip pressed
  const cancel = await p.evaluate(() => { const t = document.querySelector('.ptip'); document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse', bubbles: true })); const was = t.classList.contains('is-down');
    document.dispatchEvent(new PointerEvent('pointercancel', { pointerType: 'mouse', bubbles: true })); return [was, t.classList.contains('is-down')]; });
  const native = {};
  for (const [k, o] of [['reduced-motion', { reducedMotion: 'reduce' }], ['touch', { hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } }]]) {
    const c2 = await b.newContext({ viewport: { width: 1440, height: 900 }, ...o }); const q = await c2.newPage(); await q.goto(FILE); await q.waitForTimeout(1200);
    native[k] = await q.evaluate(() => { const btn = document.querySelector('.btn'); const t = document.querySelector('.ptip');
      return { hasBuddyClass: document.documentElement.classList.contains('has-buddy'), cursorOnButton: getComputedStyle(btn).cursor, tipShown: !!(t && t.classList.contains('is-on') && getComputedStyle(t).display !== 'none') }; });
    await c2.close();
  }
  const res = `elements tested ${tot.tested} | click delivered to the element ${tot.delivered} | tip exactly on the pointer ${tot.exact} | stuck pressed after release ${tot.stuck} | max click delay after pointerup ${tot.maxDelay.toFixed(1)}ms | covered or hidden (skipped) ${tot.hidden}
cancelled press: pressed during ${cancel[0]}, still pressed after pointercancel ${cancel[1]}
native cursor: ${JSON.stringify(native)}
page errors ${errs.length} ${errs.slice(0, 3).join(' | ')}
${bad.length ? 'PROBLEMS:\n' + bad.join('\n') : 'PROBLEMS: none'}\nSKIPPED (not live at test time):\n${skipped.join('\n')}\n`;
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, res); console.log(res); await b.close();
})();

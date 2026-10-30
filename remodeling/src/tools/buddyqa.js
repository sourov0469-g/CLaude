// Cursor companion + pointer tip QA (FULL Phase 5): every section x version x variant on desktop; tip sits on the hotspot and
// mirrors the buddy's state; system arrow hidden (caret kept in text fields); disabled on touch and reduced motion.
const { chromium } = require('playwright');
const SECS = ['hero','proof','services','ba','process','financing','work','reviews','towns','consult'];
(async () => {
  const b = await chromium.launch();
  const out = [], fails = [];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror ' + e.message));
  await p.goto('file:///home/user/CLaude/remodeling/site/elbaz-homepage.html');
  await p.waitForTimeout(900);
  // first move: lands beside the pointer, never flies in from 0,0
  await p.mouse.move(700, 500);
  await p.waitForTimeout(60);
  const first = await p.evaluate(() => { const m = document.querySelector('.buddy').style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/); return m ? [+m[1], +m[2]] : null; });
  if (!first || Math.abs(first[0] - 708) > 40 || Math.abs(first[1] - 506) > 40) fails.push('first move landed at ' + first);
  const state = () => p.evaluate(() => [document.querySelector('.buddy').dataset.state, document.querySelector('.buddy').classList.contains('is-on') && document.querySelector('.ptip').classList.contains('is-on') && document.querySelector('.ptip').dataset.state === document.querySelector('.buddy').dataset.state]);
  let checks = 0;
  for (const variant of ['hat', 'level', 'cone']) {
    await p.evaluate(v => EZ.buddy.set(v), variant);
    for (const s of SECS) for (const v of [1, 2, 3]) {
      await p.evaluate(([s, v]) => { const sec = document.getElementById(s); document.querySelector('.vswitch[data-for="' + s + '"] [data-v="' + v + '"]').click(); sec.scrollIntoView(); }, [s, v]);
      await p.waitForTimeout(1000);   // a re-initialised version finishes its .3s entrances first
      // targets inside the active version
      const targets = await p.evaluate(s => {
        const root = document.querySelector('#' + s + ' .ver:not([hidden])');
        const pick = sel => { const els = [...root.querySelectorAll(sel)].filter(e => { const r = e.getBoundingClientRect(); return r.width > 8 && r.height > 8 && r.top > 80 && r.bottom < innerHeight - 20 && r.left >= 0 && r.right <= innerWidth; }); return els[0] ? (r => [r.left + r.width / 2, r.top + Math.min(r.height / 2, 20)])(els[0].getBoundingClientRect()) : null; };
        return { button: pick('.btn, button'), heading: pick('h2, h3'), image: pick('img') };
      }, s);
      for (const [kind, pt] of Object.entries(targets)) {
        if (!pt) continue;
        await p.mouse.move(pt[0], pt[1], { steps: 3 });
        await p.waitForTimeout(220);
        const [st, on] = await state();
        checks++;
        if (!on) fails.push(`${variant} ${s}${v} ${kind}: buddy or tip hidden / tip state differs`);
        const tipAt = await p.evaluate(() => { const m = document.querySelector('.ptip').style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/); return m ? [+m[1], +m[2]] : null; });
        if (!tipAt || Math.abs(tipAt[0] - pt[0]) > 1 || Math.abs(tipAt[1] - pt[1]) > 1) fails.push(`${variant} ${s}${v} ${kind}: tip at ${tipAt} not on ${pt}`);
        const cur = await p.evaluate(([x, y]) => getComputedStyle(document.elementFromPoint(x, y)).cursor, pt);
        if (cur !== 'none' && cur !== 'text' && cur !== 'default') fails.push(`${variant} ${s}${v} ${kind}: system cursor ${cur}`);
        // element under the point may be an overlay; record mismatch only for clear cases
        const under = await p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e && (e.closest('button, .btn, [role="radio"], [role="tab"], summary') ? 'button' : e.closest('a[href]') ? 'link' : e.closest('input, textarea') ? 'type' : e.closest('img, picture, figure, [data-img]') ? 'image' : e.closest('h1,h2,h3') ? 'heading' : 'other'); }, pt);
        // a range input reads as "drag" (the slider), not as a text field
        if (under === 'type' && st === 'drag') { } else if (under !== 'other' && under !== st && !(under === 'type' && st === 'type')) fails.push(`${variant} ${s}${v} ${kind}: under=${under} state=${st}`);
      }
      // leave everything: state must clear (no stuck states)
      await p.mouse.move(1436, 120, { steps: 2 });
      await p.waitForTimeout(200);
      const [st2] = await state();
      const under2 = await p.evaluate(() => { const e = document.elementFromPoint(1436, 120); return e ? e.tagName + '.' + (e.className.baseVal === undefined ? e.className : '') : ''; });
      if (st2 === 'button' || st2 === 'heading') fails.push(`${variant} ${s}${v}: stuck state ${st2} over ${under2}`);
    }
  }
  // scroll with a still pointer: state re-evaluates
  await p.evaluate(() => document.getElementById('consult').scrollIntoView());
  await p.waitForTimeout(300);
  await p.mouse.move(720, 450);
  await p.evaluate(() => window.scrollBy(0, 400));
  await p.waitForTimeout(300);
  const after = await p.evaluate(() => { const e = document.elementFromPoint(720, 450); return [document.querySelector('.buddy').dataset.state, e && e.tagName]; });
  out.push('scroll re-hit: ' + after);
  // leaving the window hides it
  await p.mouse.move(-10, -10);
  await p.evaluate(() => document.dispatchEvent(new PointerEvent('pointerout', { pointerType: 'mouse', relatedTarget: null, bubbles: true })));
  await p.waitForTimeout(250);
  const hid = await p.evaluate(() => document.querySelector('.buddy').classList.contains('is-on') || document.querySelector('.ptip').classList.contains('is-on'));
  if (hid) fails.push('still shown after pointer left the window');
  // off switch
  await p.evaluate(() => EZ.buddy.set('off'));
  await p.mouse.move(600, 400);
  await p.waitForTimeout(150);
  if (await p.evaluate(() => document.querySelector('.buddy').classList.contains('is-on') || document.querySelector('.ptip').classList.contains('is-on'))) fails.push('shown while Off');
  if (await p.evaluate(() => getComputedStyle(document.body).cursor) === 'none') fails.push('system cursor still hidden while Off');
  await p.evaluate(() => EZ.buddy.set('hat'));
  // text fields keep the native caret
  await p.evaluate(() => { document.querySelector('.vswitch[data-for="consult"] [data-v="1"]').click(); document.getElementById('c1-name').scrollIntoView({ block: 'center' }); });
  await p.waitForTimeout(400);
  const ib = await p.$eval('#c1-name', e => { const r = e.getBoundingClientRect(); return [r.left + 30, r.top + r.height / 2]; });
  await p.mouse.move(ib[0], ib[1], { steps: 2 }); await p.waitForTimeout(200);
  const caret = await p.evaluate(() => [getComputedStyle(document.getElementById('c1-name')).cursor, document.querySelector('.ptip').dataset.state]);
  out.push('text field: cursor=' + caret[0] + ' tip=' + caret[1]);
  if (caret[0] !== 'text') fails.push('text field lost its caret');
  out.push(`desktop checks ${checks}, fails ${fails.length}${fails.length ? '\n  ' + fails.slice(0, 40).join('\n  ') : ''}, errs ${errs.length ? JSON.stringify(errs.slice(0, 3)) : 0}`);
  await ctx.close();
  // touch and reduced motion: disabled cleanly
  for (const opt of [{ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true }, { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }]) {
    const c = await b.newContext(opt); const q = await c.newPage();
    await q.goto('file:///home/user/CLaude/remodeling/site/elbaz-homepage.html'); await q.waitForTimeout(700);
    if (!opt.hasTouch) await q.mouse.move(600, 400);
    else await q.touchscreen.tap(200, 400);
    await q.waitForTimeout(300);
    out.push((opt.hasTouch ? 'touch' : 'reduced motion') + ': buddy on=' + await q.evaluate(() => [EZ.buddy.on, document.querySelector('.buddy').classList.contains('is-on'), document.documentElement.classList.contains('has-buddy'), getComputedStyle(document.querySelector('.buddysw')).display, document.querySelector('.ptip').classList.contains('is-on'), getComputedStyle(document.body).cursor]));
    await c.close();
  }
  console.log(out.join('\n'));
  await b.close();
})();

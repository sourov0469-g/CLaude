module.exports = { sharpAt: [0, .5, .99],
  async extra(p, rec, c) {
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), c.SELF); await p.waitForTimeout(1200);
    const a = await p.evaluate(s => { const e = document.querySelector(s), v = e.querySelector('video'); return { src: v.currentSrc.slice(0, 5), vw: v.videoWidth, paused: v.paused, tiles: e.querySelectorAll('.tile').length, chips: e.querySelectorAll('.moms button').length, hasStrip: !!e.querySelector('.roofline, .prog, [role="progressbar"]'), yt: !!e.querySelector('iframe, dialog.ytm') || /Full Film/i.test(e.textContent) }; }, c.SELF);
    rec('one film, played from a Blob URL; no progress strip, no full-film button', a.src === 'blob:' && a.vw === 960 && !a.hasStrip && !a.yt, JSON.stringify(a));
    rec('twelve pieces and five moments', a.tiles === 12 && a.chips === 5);
    await p.screenshot({ path: c.OUT + '/intro-0.png' });
    // the pieces arrive and are replaced by the film
    await p.evaluate(s => document.querySelector(s + ' .again').click(), c.SELF); await p.waitForTimeout(1300);
    await p.screenshot({ path: c.OUT + '/intro-mid.png' });
    const mid = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .tiles')).opacity, c.SELF);
    await p.waitForTimeout(2800);
    const end = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .tiles')).opacity, c.SELF);
    rec('the pieces show during the arrival and are replaced by the film', +mid > .3 && +end < .05, 'mid ' + mid + ' end ' + end);
    await p.screenshot({ path: c.OUT + '/after.png' });
    // the lens follows the pointer and shows colour
    const box = await p.evaluate(s => { const r = document.querySelector(s + ' canvas.lens').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, c.SELF);
    await p.mouse.move(box[0] + box[2] * .25, box[1] + box[3] * .5, { steps: 6 }); await p.waitForTimeout(700);
    const l1 = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .ring')).transform, c.SELF);
    await p.mouse.move(box[0] + box[2] * .75, box[1] + box[3] * .5, { steps: 6 }); await p.waitForTimeout(700);
    const l2 = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .ring')).transform, c.SELF);
    rec('the colour lens follows the pointer', l1 !== l2, l1 + ' -> ' + l2);
    const px = await p.evaluate(s => { const cv = document.querySelector(s + ' canvas.lens'), r = document.querySelector(s + ' .ring').getBoundingClientRect(), b = cv.getBoundingClientRect(), k = cv.width / b.width; const d = cv.getContext('2d').getImageData(Math.round((r.left + r.width / 2 - b.left) * k), Math.round((r.top + r.height / 2 - b.top) * k), 1, 1).data; return [...d]; }, c.SELF);
    rec('inside the lens the film is painted (opaque pixel)', px[3] === 255, px.join(','));
    await p.screenshot({ path: c.OUT + '/lens.png' });
    // the screen leans, sheen follows
    const tilt = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .theatre')).getPropertyValue('--ry'), c.SELF);
    rec('the screen leans toward the pointer', tilt !== '0deg' && tilt !== '', tilt);
    // the background takes the film's colour
    const sp = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' section')).getPropertyValue('--spill'), c.SELF);
    rec('the page behind takes the film\'s colour', /rgb|#/.test(sp) && sp.trim() !== '', sp);
    // a moment jumps the film
    await p.evaluate(s => document.querySelectorAll(s + ' .moms button')[3].click(), c.SELF); await p.waitForTimeout(500);
    const t = await p.evaluate(s => ({ t: document.querySelector(s + ' video').currentTime, cur: document.querySelectorAll(s + ' .moms button[aria-current="true"]').length }), c.SELF);
    rec('a moment jumps the film there and is marked', t.t > 8.9 && t.cur === 1, JSON.stringify(t));
    // pause / play
    await p.click(c.SELF + ' .pp'); await p.waitForTimeout(300);
    const paused = await p.evaluate(s => document.querySelector(s + ' video').paused, c.SELF);
    rec('the pause button pauses', paused);
    await p.click(c.SELF + ' .pp'); await p.waitForTimeout(300);
    // keyboard moves the lens
    await p.focus(c.SELF + ' .screen'); const k1 = await p.evaluate(s => document.querySelector(s + ' .ring').style.getPropertyValue('--x'), c.SELF);
    for (let i = 0; i < 5; i++) await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(500);
    const k2 = await p.evaluate(s => document.querySelector(s + ' .ring').style.getPropertyValue('--x'), c.SELF);
    rec('arrow keys move the lens', parseFloat(k2) < parseFloat(k1), k1 + ' -> ' + k2);
  },
  async reduced(p, rec, c) {
    const r = await p.evaluate(s => { const e = document.querySelector(s); return { paused: e.querySelector('video').paused, tiles: getComputedStyle(e.querySelector('.tiles')).display }; }, c.SELF);
    rec('reduced motion: film paused, pieces not used', r.paused && r.tiles === 'none', JSON.stringify(r));
  } };

// Ladder interaction checks for new hero versions.
module.exports = {
  '7': async (p, S, rec) => {
    await p.waitForTimeout(3200);
    rec('the one-stroke house has drawn itself on', await p.evaluate(S => +getComputedStyle(document.querySelector(S + ' #h7-line')).strokeDashoffset.replace('px', '') < 5, S));
    rec('roofer check: shingle courses lie between the hips, inside the roof face', await p.evaluate(S => { const c = document.querySelector(S + ' .course').getBBox(); return c.x >= 380 && c.x + c.width <= 1060 && c.y >= 322 && c.y + c.height <= 480; }, S));
    const b = await p.evaluate(S => { const r = document.querySelector(S + ' svg').getBoundingClientRect(); return { x: r.left + r.width * .9, y: r.top + r.height * .2 }; }, S);
    await p.mouse.move(b.x, b.y, { steps: 4 }); await p.waitForTimeout(700);
    rec('the owl turns its head toward the pointer (subtle, under 15°)', await p.evaluate(S => { const m = /rotate\(([-\d.]+)deg\)/.exec(document.querySelector(S + ' .owl .head').style.transform); return m && +m[1] > 0 && +m[1] <= 14; }, S));
  },
  '8': async (p, S, rec) => {
    await p.waitForTimeout(600);
    const g = await p.evaluate(S => { const c = getComputedStyle(document.querySelector(S + ' .film')).getPropertyValue('--clip'); const n = (c.match(/[\d.]+px/g) || []).map(x => parseFloat(x)); return { c, n }; }, S);
    rec('the split is a true 6/12 pitch (rise/run = 0.5)', (() => { const n = g.n, W = 1440; if (/^polygon\([\d.]+px 0/.test(g.c)) return Math.abs(n[1] / (W - n[0]) - .5) < .01; return Math.abs((n[0] - n[1]) / W - .5) < .01; })(), g.c);
    rec('pitch mark reads 6 over 12; shingle courses drawn along the slope', await p.evaluate(S => document.querySelector(S + ' .t6').textContent === '6' && document.querySelector(S + ' .t12').textContent === '12' && document.querySelectorAll(S + ' .tabs path').length > 10, S));
    rec('the film is Owl\'s own crew clip', await p.evaluate(S => document.querySelector(S + ' video').dataset.media === 'crew', S));
    await p.click(S + ' .play'); await p.waitForTimeout(400);
    rec('Watch the Full Film opens YouTube ehKLv5DF2TQ; Escape closes', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]')));
    await p.keyboard.press('Escape'); await p.waitForTimeout(600);
    rec('dialog closed', await p.evaluate(() => !document.querySelector('dialog.ytm')));
  },
  '9': async (p, S, rec) => {
    await p.waitForTimeout(500);
    const ink = async () => p.evaluate(S => { const c = document.querySelector(S + ' canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) n += d[i]; return n / (d.length / 4); }, S);
    rec('the roof is painted (shingle courses drawn)', (await ink()) > 30);
    const g = await p.evaluate(S => { const r = document.querySelector(S + ' .roof').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }, S);
    const before = await ink();
    await p.mouse.move(g.x + g.w * .2, g.y + g.h * .5); await p.mouse.move(g.x + g.w * .8, g.y + g.h * .5, { steps: 10 }); await p.waitForTimeout(200);
    rec('the surface reacts where the pointer moves (tabs lift and lighten)', Math.abs((await ink()) - before) > .3);
    rec('the hint gets out of the way once the roof is touched', await p.evaluate(S => getComputedStyle(document.querySelector(S + ' .hint')).opacity === '0', S));
  },
  '10': async (p, S, rec) => {
    rec('ten real frames, each captioned, plus an aria-hidden duplicate set for the loop', await p.evaluate(S => document.querySelectorAll(S + ' figure:not([aria-hidden])').length === 10 && document.querySelectorAll(S + ' figure[aria-hidden="true"]').length === 10 && [...document.querySelectorAll(S + ' figure:not([aria-hidden]) img')].every(i => i.alt && i.src.startsWith('data:image')), S));
    const x0 = await p.evaluate(S => document.querySelector(S + ' .track').style.transform, S); await p.waitForTimeout(800);
    rec('the film runs by itself', await p.evaluate(([S, x0]) => document.querySelector(S + ' .track').style.transform !== x0, [S, x0]));
    await p.focus(S + ' .roll'); const a = await p.evaluate(S => document.querySelector(S + ' .track').style.transform, S); await p.waitForTimeout(600);
    rec('focus pauses it (WCAG 2.2.2)', await p.evaluate(([S, a]) => document.querySelector(S + ' .track').style.transform === a, [S, a]));
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(100);
    rec('arrow keys step it a frame', await p.evaluate(([S, a]) => document.querySelector(S + ' .track').style.transform !== a, [S, a]));
  },
  '11': async (p, S, rec) => {
    await p.waitForTimeout(2600);
    rec('the Owl lands on the photo and the house brightens', await p.evaluate(S => { const st = document.querySelector(S + ' .stage'); return st.classList.contains('landed') && st.classList.contains('dry') && getComputedStyle(document.querySelector(S + ' .card img')).filter === 'none' && +getComputedStyle(document.querySelector(S + ' .owl')).opacity === 1; }, S));
    rec('the Owl is the cut-out without the old house; the house is a real photo with an honest alt', await p.evaluate(S => /owl lands on the picture/.test(document.querySelector(S + ' .owl').alt) && /family home with a shingle roof among tall pines/.test(document.querySelector(S + ' .card img').alt), S));
    rec('rain is falling and the wings throw amber splashes (canvas has amber pixels)', await p.evaluate(S => { const c = document.querySelector(S + ' canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let a = 0, k = 0; for (let i = 0; i < d.length; i += 16) { if (d[i + 3] > 40) { k++; if (d[i] > 180 && d[i + 1] > 120 && d[i + 2] < 90) a++; } } return k > 50 && a > 3; }, S));
    rec('the house photo stays dry: no rain drawn over the photo once landed', await p.evaluate(S => { const c = document.querySelector(S + ' canvas'), cr = c.getBoundingClientRect(), r = document.querySelector(S + ' .card').getBoundingClientRect(), k = c.width / cr.width; const x0 = Math.round((r.left - cr.left + r.width * .3) * k), y0 = Math.round((r.top - cr.top + r.height * .45) * k), w = Math.round(r.width * .4 * k), h = Math.round(r.height * .45 * k); const d = c.getContext('2d').getImageData(x0, y0, w, h).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 40) n++; return n < 40; }, S));
    rec('the two calls to action: book and the real phone', await p.evaluate(S => document.querySelector(S + ' .btn-tab').getAttribute('href') === '#book' && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027', S));
    await p.click(S + ' .pour'); await p.waitForTimeout(300);
    rec('Make It Pour turns the storm on', await p.evaluate(S => document.querySelector(S + ' .pour').getAttribute('aria-pressed') === 'true', S));
    await p.waitForTimeout(6300);
    rec('the storm eases off by itself after six seconds', await p.evaluate(S => document.querySelector(S + ' .pour').getAttribute('aria-pressed') === 'false', S));
  },
  '12': async (p, S, rec) => {
    await p.waitForTimeout(2600);
    rec('the Owl has risen and opened its wings round the home; the ring is drawn', await p.evaluate(S => { const a = document.querySelector(S + ' .art'); return a.classList.contains('open') && +getComputedStyle(document.querySelector(S + ' .owl')).opacity === 1 && getComputedStyle(document.querySelector(S + ' .ring path')).strokeDashoffset.replace('px', '') * 1 === 0; }, S));
    rec('the home is a real photo in a round frame, with an honest alt and no caption', await p.evaluate(S => { const ph = document.querySelector(S + ' .med .ph'); return getComputedStyle(ph).borderRadius === '50%' && /two-storey family home with a brown shingle roof/.test(ph.querySelector('img').alt) && !document.querySelector(S + ' figcaption'); }, S));
    rec('the medallion sits in front of the Owl, centred under the title on desktop', await p.evaluate(S => { const m = document.querySelector(S + ' .med').getBoundingClientRect(), h = document.querySelector(S + ' .h1').getBoundingClientRect(); return Math.abs((m.left + m.width / 2) - (h.left + h.width / 2)) < 30; }, S));
    const b = await p.evaluate(S => { const r = document.querySelector(S + ' .med').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, S);
    await p.mouse.move(b[0], b[1], { steps: 6 }); await p.waitForTimeout(700);
    rec('pointing at the home makes the Owl lean in', await p.evaluate(S => document.querySelector(S + ' .art').classList.contains('leaning') && getComputedStyle(document.querySelector(S + ' .lean')).transform !== 'none', S));
    await p.mouse.move(b[0] + 300, b[1] - 200, { steps: 6 }); await p.waitForTimeout(500);
    rec('the planes drift with the pointer (depth)', await p.evaluate(S => +document.querySelector(S + ' .stage').style.getPropertyValue('--px') !== 0, S));
    rec('both calls to action sit in the first screen at 1440×900', await p.evaluate(S => { window.scrollTo(0, 0); return [...document.querySelectorAll(S + ' .ctas a')].every(a => a.getBoundingClientRect().bottom <= innerHeight); }, S));
    rec('the two calls to action: book and the real phone', await p.evaluate(S => document.querySelector(S + ' .btn-tab').getAttribute('href') === '#book' && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027', S));
  },
  '13': async (p, S, rec) => {
    await p.waitForTimeout(2900);
    rec('the dusk photo has settled from its slow zoom', await p.evaluate(S => document.querySelector(S + ' .g').classList.contains('on') && getComputedStyle(document.querySelector(S + ' .pic img')).transform === 'none', S));
    rec('the card overlaps the photo on desktop and the Owl perches on the card', await p.evaluate(S => { const c = document.querySelector(S + ' .card').getBoundingClientRect(), ph = document.querySelector(S + ' .pic').getBoundingClientRect(), o = document.querySelector(S + ' .perch').getBoundingClientRect(); return c.right > ph.left + 60 && Math.abs(o.bottom - c.top) < 16; }, S));
    rec('the photo is real with an honest alt and no caption', await p.evaluate(S => /stone and brick family home with a dark shingle roof at sunset/.test(document.querySelector(S + ' .pic img').alt) && !document.querySelector(S + ' figcaption'), S));
    let blinked = false; for (let i = 0; i < 28 && !blinked; i++) { blinked = await p.evaluate(S => document.querySelector(S + ' .perch > div').classList.contains('blink'), S); await p.waitForTimeout(200); }
    rec('the Owl blinks now and then', blinked);
    const b = await p.evaluate(S => { const r = document.querySelector(S + ' .ctas .btn-amber').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, S);
    await p.mouse.move(b[0], b[1], { steps: 4 }); await p.waitForTimeout(150);
    rec('going for a button makes the Owl hop', await p.evaluate(S => document.querySelector(S + ' .perch > div').classList.contains('hop'), S));
    await p.waitForTimeout(900);
    rec('after the hop it settles back to breathing', await p.evaluate(S => { const d = document.querySelector(S + ' .perch > div'); return !d.classList.contains('hop') && d.classList.contains('breathe'); }, S));
    await p.keyboard.press('Tab'); 
    rec('both calls to action sit in the first screen at 1440×900', await p.evaluate(S => { window.scrollTo(0, 0); return [...document.querySelectorAll(S + ' .ctas a')].every(a => a.getBoundingClientRect().bottom <= innerHeight); }, S));
    rec('the two calls to action: book and the real phone', await p.evaluate(S => document.querySelector(S + ' .btn-amber').getAttribute('href') === '#book' && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027', S));
  },
  '14': async (p, S, rec) => {
    await p.waitForTimeout(2400);
    const T = () => p.evaluate(S => document.querySelector(S + ' .shd').style.transform, S);
    const a1 = await T(); await p.waitForTimeout(600); const a2 = await T();
    rec('the Owl shadow has swept in and keeps gliding over the roof', a1 !== a2 && await p.evaluate(S => { const b = document.querySelector(S + ' .band').getBoundingClientRect(), s = document.querySelector(S + ' .shd').getBoundingClientRect(); return s.left + s.width / 2 > b.left && s.left + s.width / 2 < b.right; }, S));
    rec('the shadow is the Owl silhouette, darkened and soft, never the illustration itself', await p.evaluate(S => /brightness\(0\)/.test(getComputedStyle(document.querySelector(S + ' .shd img')).filter), S));
    const b = await p.evaluate(S => { const r = document.querySelector(S + ' .band').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, S);
    const tx = b[0] + b[2] * .18, ty = b[1] + b[3] * .3;
    await p.mouse.move(tx, ty, { steps: 8 }); await p.waitForTimeout(2200);
    rec('pointing at the roof brings the shadow there', await p.evaluate(([S, tx, ty]) => { const s = document.querySelector(S + ' .shd').getBoundingClientRect(); return Math.hypot(s.left + s.width * .55 - tx, s.top + s.height * .5 - ty) < 70; }, [S, tx, ty]));
    rec('the photo is a real aerial with an honest alt and no caption', await p.evaluate(S => /shingle roof seen from straight above/.test(document.querySelector(S + ' .band > img').alt) && !document.querySelector(S + ' figcaption'), S));
    rec('both calls to action sit in the first screen at 1440×900', await p.evaluate(S => { window.scrollTo(0, 0); return [...document.querySelectorAll(S + ' .ctas a')].every(a => a.getBoundingClientRect().bottom <= innerHeight); }, S));
    rec('the calls to action are not inside the photo (they stack under it on phones)', await p.evaluate(S => !document.querySelector(S + ' .band .ctas') && !!document.querySelector(S + ' .bandwrap > .ctas'), S));
    rec('the two calls to action: book and the real phone', await p.evaluate(S => document.querySelector(S + ' .btn-tab').getAttribute('href') === '#book' && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027', S));
  },
  '15': async (p, S, rec) => {
    await p.waitForTimeout(2200);
    rec('the hammer has struck once on load: jolt, sparks, "Nail" underlined, warranty stamp down', await p.evaluate(S => { const pic = document.querySelector(S + ' .pic'); return pic.classList.contains('hit') && pic.classList.contains('stamped') && document.querySelector(S + ' .g').classList.contains('struck') && +getComputedStyle(document.querySelector(S + ' .stamp')).opacity === 1; }, S));
    rec('the stamp states the locked fact exactly: 10-Year Workmanship Warranty', await p.evaluate(S => document.querySelector(S + ' .stamp').textContent.trim() === '10-Year Workmanship Warranty' && /10-year workmanship warranty/.test(document.querySelector(S + ' .lede').textContent), S));
    rec('the stamp is round (not squashed by its text)', await p.evaluate(S => { const r = document.querySelector(S + ' .stamp').getBoundingClientRect(); return Math.abs(r.width - r.height) < 3; }, S));
    await p.evaluate(S => document.querySelector(S + ' .pic').classList.remove('hit'), S);
    await p.click(S + ' .pic'); await p.waitForTimeout(80);
    rec('tapping the photo strikes again', await p.evaluate(S => document.querySelector(S + ' .pic').classList.contains('hit'), S));
    await p.evaluate(S => document.querySelector(S + ' .pic').classList.remove('hit'), S);
    await p.focus(S + ' .pic'); await p.keyboard.press('Enter'); await p.waitForTimeout(80);
    rec('Enter on the photo strikes too (it is a real button with a name)', await p.evaluate(S => { const b = document.querySelector(S + ' .pic'); return b.tagName === 'BUTTON' && b.getAttribute('aria-label') === 'Strike the nail again' && b.classList.contains('hit'); }, S));
    rec('both calls to action sit in the first screen at 1440×900', await p.evaluate(S => { window.scrollTo(0, 0); return [...document.querySelectorAll(S + ' .ctas a')].every(a => a.getBoundingClientRect().bottom <= innerHeight); }, S));
    rec('the two calls to action: book and the real phone', await p.evaluate(S => document.querySelector(S + ' .btn-amber').getAttribute('href') === '#book' && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027', S));
  }
};

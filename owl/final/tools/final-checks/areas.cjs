module.exports = { sharpAt: [0, .99],
  async extra(p, rec, c) {
    const S = c.SELF;
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(800);
    const a = await p.evaluate(s => { const e = document.querySelector(s); return { img: !!e.querySelector('img.bgph'), inputs: e.querySelectorAll('input').length, list29: e.querySelectorAll('.row li, ul:not(.lb) li').length, maps: !!e.querySelector('svg.map, .map, [class*="contour"]') }; }, S);
    rec('a real photograph and one search bar; no row of 29 towns, no map', a.img && a.inputs === 1 && a.list29 === 0 && !a.maps, JSON.stringify(a));
    // click opens the list with all 29, nearest first
    await p.click(S + ' input'); await p.waitForTimeout(300);
    const o = await p.evaluate(s => ({ open: !document.querySelector(s + ' .lb').hidden, n: document.querySelectorAll(s + ' .lb li[role="option"]').length, first: document.querySelector(s + ' .lb li').textContent, exp: document.querySelector(s + ' input').getAttribute('aria-expanded') }), S);
    rec('clicking the bar opens all 29 towns, nearest first (Shoreview), with distances', o.open && o.n === 29 && /Shoreview/.test(o.first) && o.exp === 'true', JSON.stringify(o));
    await p.screenshot({ path: c.OUT + '/open.png' });
    // hover highlights
    const r = await p.evaluate(s => { const l = document.querySelectorAll(s + ' .lb li')[4].getBoundingClientRect(); return [l.left + 40, l.top + l.height / 2]; }, S);
    await p.mouse.move(r[0], r[1], { steps: 5 }); await p.waitForTimeout(300);
    const h = await p.evaluate(s => { const li = document.querySelector(s + ' .lb li.act'); return { t: li && li.textContent, sel: li && li.getAttribute('aria-selected'), ad: document.querySelector(s + ' input').getAttribute('aria-activedescendant') === (li && li.id) }; }, S);
    rec('hovering an option highlights it (and tells assistive tech)', h.t && h.sel === 'true' && h.ad, JSON.stringify(h));
    await p.screenshot({ path: c.OUT + '/hover.png' });
    // click chooses
    await p.mouse.click(r[0], r[1]); await p.waitForTimeout(400);
    const ch = await p.evaluate(s => ({ v: document.querySelector(s + ' input').value, ans: document.querySelector(s + ' .ans').textContent, open: !document.querySelector(s + ' .lb').hidden, town: document.querySelector(s + ' section').dataset.town }), S);
    rec('clicking an option fills the bar, answers with the distance and closes the list', /^Yes, we come to /.test(ch.ans) && /miles from our Shoreview base/.test(ch.ans) && !ch.open && ch.v === ch.town, JSON.stringify(ch));
    // typing narrows
    await p.fill(S + ' input', ''); await p.type(S + ' input', 'wood'); await p.waitForTimeout(400);
    const w = await p.evaluate(s => ({ n: document.querySelectorAll(s + ' .lb li[role="option"]').length, first: document.querySelector(s + ' .lb li').textContent, ans: document.querySelector(s + ' .ans').textContent }), S);
    rec('typing "wood" narrows to Woodbury and answers', w.n >= 1 && /Woodbury/.test(w.first) && /Woodbury/.test(w.ans), JSON.stringify(w));
    // keyboard
    await p.fill(S + ' input', ''); await p.waitForTimeout(150);
    await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
    const k = await p.evaluate(s => ({ v: document.querySelector(s + ' input').value, open: !document.querySelector(s + ' .lb').hidden }), S);
    rec('keyboard: arrows move, Enter chooses', k.v.length > 2 && !k.open, JSON.stringify(k));
    await p.keyboard.press('ArrowDown'); await p.waitForTimeout(150); await p.keyboard.press('Escape'); await p.waitForTimeout(150);
    rec('Escape closes the list', await p.evaluate(s => document.querySelector(s + ' .lb').hidden, S));
    // aliases and honesty
    await p.fill(S + ' input', 'st paul'); await p.waitForTimeout(300);
    rec('"st paul" is understood as Saint Paul', await p.evaluate(s => /Saint Paul/.test(document.querySelector(s + ' .ans').textContent), S));
    await p.fill(S + ' input', 'Duluth'); await p.waitForTimeout(300);
    const d = await p.evaluate(s => ({ ans: document.querySelector(s + ' .ans').textContent, none: document.querySelector(s + ' .lb li.none') && document.querySelector(s + ' .lb li.none').textContent, tel: [...document.querySelectorAll(s + ' a[href^="tel:"]')].map(a => a.getAttribute('href')) }), S);
    rec('an unlisted town gets the honest answer and the one phone number', /isn’t on our list of 29 towns/.test(d.ans) && /Call \(651\) 977-6027/.test(d.ans) && d.tel.every(t => t === 'tel:+16519776027'), JSON.stringify(d).slice(0, 200));
    await p.fill(S + ' input', '<img src=x onerror=window.__t=1>zzz'); await p.waitForTimeout(300);
    rec('typed text is never injected as markup', await p.evaluate(s => !document.querySelector(s + ' .ans img') && !window.__t, S));
    await p.fill(S + ' input', 'Shoreview'); await p.waitForTimeout(300);
    rec('Shoreview gives the real address', await p.evaluate(s => /1000 County Rd E #230, Shoreview, MN 55126/.test(document.querySelector(s + ' .ans').textContent), S));
    await p.click(S + ' .x'); await p.waitForTimeout(300);
    rec('the clear button empties the bar and reopens the list', await p.evaluate(s => document.querySelector(s + ' input').value === '' && !document.querySelector(s + ' .lb').hidden, S));
    await p.screenshot({ path: c.OUT + '/cleared.png' });
    // phone: tap works
    const m = await c.open('', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    await m.evaluate(s => document.querySelector(s + ' .tq').scrollIntoView({ block: 'center', behavior: 'instant' }), S); await m.waitForTimeout(600);
    await m.tap(S + ' input'); await m.waitForTimeout(400);
    const n = await m.evaluate(s => document.querySelectorAll(s + ' .lb li[role="option"]').length, S);
    const bx = await m.evaluate(s => { const l = document.querySelectorAll(s + ' .lb li')[6]; l.scrollIntoView({ block: 'nearest' }); const r = l.getBoundingClientRect(); return [r.left + 60, r.top + r.height / 2]; }, S);
    await m.touchscreen.tap(bx[0], bx[1]); await m.waitForTimeout(500);
    const t = await m.evaluate(s => ({ v: document.querySelector(s + ' input').value, ans: document.querySelector(s + ' .ans').textContent }), S);
    rec('phone: tapping the bar lists 29 towns and tapping one chooses it', n === 29 && /^Yes/.test(t.ans), JSON.stringify([n, t]).slice(0, 160));
    await m.screenshot({ path: c.OUT + '/phone-chosen.png' }); await m.close();
  },
  async reduced(p, rec, c) { rec('reduced motion: the bar is usable', await p.evaluate(s => !!document.querySelector(s + ' input'), c.SELF)); }
};

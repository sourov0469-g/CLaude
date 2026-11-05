module.exports = { sharpAt: [0, .5, 1],
  async beforeAxe(p) { await p.evaluate(() => document.querySelector('#services').scrollIntoView({ block: 'start', behavior: 'instant' })); await p.waitForTimeout(500); },
  async extra(p, rec, c) {
    const S = c.SELF;
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(900);
    const a = await p.evaluate(s => ({ rows: [...document.querySelectorAll(s + ' .rw .nm')].map(e => e.textContent), open: document.querySelectorAll(s + ' .rw[aria-expanded="true"]').length }), S);
    rec('five named jobs; the first is open', JSON.stringify(a.rows) === JSON.stringify(['Roof Replacement', 'Roof Repair', 'Storm Damage Help', 'Wise Check Inspections', 'Siding']) && a.open === 1, JSON.stringify(a));
    const r = await p.evaluate(s => { const b = document.querySelectorAll(s + ' .rw')[2].getBoundingClientRect(); return [b.left + 200, b.top + b.height / 2]; }, S);
    await p.mouse.move(r[0], r[1], { steps: 8 }); await p.waitForTimeout(700);
    const h = await p.evaluate(s => ({ on: document.querySelector(s + ' .flo').classList.contains('on'), which: [...document.querySelectorAll(s + ' .flo img')].findIndex(i => i.classList.contains('on')), ar: document.querySelector(s + ' .flo').style.aspectRatio }), S);
    rec('pointing at a job floats its own photo (Storm Damage Help = the fallen tree), in the photo\'s own shape', h.on && h.which === 2 && /560/.test(h.ar), JSON.stringify(h));
    await p.screenshot({ path: c.OUT + '/hover.png' });
    await p.click(S + ' .rw >> nth=1'); await p.waitForTimeout(700);
    const o = await p.evaluate(s => ({ exp: [...document.querySelectorAll(s + ' .rw')].map(b => b.getAttribute('aria-expanded')).join(','), inert: [...document.querySelectorAll(s + ' .det')].map(d => d.hasAttribute('inert')).join(',') }), S);
    rec('clicking opens one job and closes the others (closed details are inert)', o.exp === 'false,true,false,false,false' && o.inert === 'true,false,true,true,true', JSON.stringify(o));
    await p.screenshot({ path: c.OUT + '/open.png' });
    await p.focus(S + ' .rw >> nth=4'); await p.keyboard.press('Enter'); await p.waitForTimeout(600);
    const k = await p.evaluate(s => document.querySelectorAll(s + ' .rw')[4].getAttribute('aria-expanded'), S);
    rec('keyboard Enter opens a job', k === 'true');
    const links = await p.evaluate(s => [...document.querySelectorAll(s + ' a[href^="#"]')].map(a => a.getAttribute('href')), S);
    rec('the section offers Book a Wise Check', links.includes('#book'), links.join(','));
    // phone: touch has no hover; each job shows its photo inside the details, at natural proportions
    const m = await c.open('', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    await m.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await m.waitForTimeout(800);
    const ph = await m.evaluate(s => { const i = document.querySelector(s + ' .open .ph img'); const r = i.getBoundingClientRect(); return { w: Math.round(r.width), nat: i.naturalWidth, floatHidden: getComputedStyle(document.querySelector(s + ' .flo')).display === 'none' }; }, S);
    rec('phone: the open job shows its photo at no more than its own pixels; no floating photo', ph.w <= 280 && ph.floatHidden && ph.nat === 560, JSON.stringify(ph));
    await m.close();
  } };

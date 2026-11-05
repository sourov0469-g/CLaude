module.exports = { sharpAt: [0, .2, .5],
  async extra(p, rec, c) {
    const S = c.SELF;
    await p.evaluate(s => document.querySelector(s + ' .p1').scrollIntoView({ block: 'center', behavior: 'instant' }), S); await p.waitForTimeout(1500);
    const st = await p.evaluate(s => { const e = document.querySelector(s); return { p1btn: e.querySelectorAll('.p1 .btn, .p1 button, .p1 a').length, p2btn: e.querySelectorAll('.p2 .btn, .p2 a').length, order: [...e.querySelectorAll('.p1,.p2,.p3')].map(x => x.className).join(',') }; }, S);
    rec('order is image/fog, then day and time, then words; no buttons or links in the first two', st.p1btn === 0 && st.p2btn === 0 && st.order === 'p1,p2,p3', JSON.stringify(st));
    await p.screenshot({ path: c.OUT + '/fog.png' });
    // wipe with the mouse
    const b = await p.evaluate(s => { const r = document.querySelector(s + ' .pane').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, S);
    await p.waitForTimeout(1400);
    for (let k = 0; k < 6; k++) { await p.mouse.move(b[0] + 30, b[1] + b[3] * (0.1 + k * .16)); await p.mouse.down(); await p.mouse.move(b[0] + b[2] - 30, b[1] + b[3] * (0.1 + k * .16), { steps: 14 }); await p.mouse.up(); }
    await p.waitForTimeout(1500);
    const cl = await p.evaluate(s => ({ clear: document.querySelector(s + ' .p1').dataset.clear, w: +document.querySelector(s + ' .p1').dataset.wiped, gone: document.querySelector(s + ' canvas.fog').classList.contains('gone'), ok: getComputedStyle(document.querySelector(s + ' .ok')).opacity }), S);
    rec('wiping with the pointer clears the fog, and "Clear view" appears', cl.clear === 'yes' && cl.gone && +cl.ok > .9, JSON.stringify(cl));
    await p.screenshot({ path: c.OUT + '/clear.png' });
    // the keyboard fogs and clears again
    await p.focus(S + ' .pane'); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
    const k1 = await p.evaluate(s => document.querySelector(s + ' .p1').dataset.clear, S);
    await p.keyboard.press('Enter'); await p.waitForTimeout(400);
    const k2 = await p.evaluate(s => document.querySelector(s + ' .p1').dataset.clear, S);
    rec('keyboard: Enter toggles clear and fog', k1 !== k2, k1 + ' -> ' + k2);
    // day then time
    await p.evaluate(s => document.querySelector(s + ' .p2').scrollIntoView({ block: 'center', behavior: 'instant' }), S); await p.waitForTimeout(600);
    const n = await p.evaluate(s => ({ days: document.querySelectorAll(s + ' .week .day:not(.sun)').length, sun: !!document.querySelector(s + ' .week .sun'), times: document.querySelectorAll(s + ' .times .tm').length }), S);
    rec('six days Monday to Saturday, a sleeping Sunday owl, morning and afternoon', n.days === 6 && n.sun && n.times === 2, JSON.stringify(n));
    await p.click(S + ' .week .day:nth-child(2)'); await p.click(S + ' .times .tm:nth-child(1)'); await p.waitForTimeout(400);
    const say = await p.evaluate(s => document.querySelector(s + ' .dsay').textContent, S);
    rec('the line writes itself: "Tuesday morning suits me."', /Tuesday morning suits me/.test(say), say);
    await p.screenshot({ path: c.OUT + '/pick.png' });
    await p.click(S + ' .week .sun'); await p.waitForTimeout(300);
    const sn = await p.evaluate(s => document.querySelector(s + ' .dnote').textContent, S);
    rec('tapping Sunday answers honestly', /day off/.test(sn), sn);
    // the words
    await p.evaluate(s => document.querySelector(s + ' .p3').scrollIntoView({ block: 'center', behavior: 'instant' }), S); await p.waitForTimeout(1200);
    const bk = await p.$$(S + ' .bk'); await bk[0].click(); await p.waitForTimeout(900); await bk[2].click(); await p.waitForTimeout(900);
    const mt = await p.evaluate(s => ({ url: decodeURIComponent(document.querySelector(s).dataset.mailto || ''), card: document.querySelector(s + ' .mailcard .mb').textContent, reply: document.querySelector(s + ' .reply').textContent }), S);
    rec('the words and the day fill the email: address, sentence, Tuesday, morning', /^mailto:info@owlroofing\.com\?subject=Wise Check request/.test(mt.url) && /lost some shingles/.test(mt.url) && /call me back/.test(mt.url) && /Tuesday/.test(mt.url) && /Morning/.test(mt.url), mt.url.slice(0, 220));
    rec('the visible email card shows the same words and day', /lost some shingles/.test(mt.card) && /Tuesday/.test(mt.card) && /Morning/.test(mt.card), mt.card.slice(0, 160));
    rec('the reply names a service', /Roof repair/.test(mt.reply), mt.reply);
    const call = await p.evaluate(s => document.querySelector(s + ' .p3 a[href^="tel:"]').getAttribute('href'), S);
    rec('the call button is the one phone number', call === 'tel:+16519776027', call);
    await p.screenshot({ path: c.OUT + '/words.png' });
    const inj = await p.evaluate(s => !document.querySelector(s + ' .mailcard img, ' + s + ' .mailcard script'), S);
    rec('no markup injection into the email card', inj);
  },
  async reduced(p, rec, c) {
    const r = await p.evaluate(s => { const e = document.querySelector(s); return { under: getComputedStyle(e.querySelector('.bk'), '::after').transform, fog: !!e.querySelector('canvas.fog') }; }, c.SELF);
    rec('reduced motion: underlines drawn, fog present', r.fog && r.under !== 'matrix(0, 0, 0, 1, 0, 0)', JSON.stringify(r));
  } };

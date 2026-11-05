const frames = p => p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r)))));
module.exports = { sharpAt: [0],
  async beforeAxe(p) { await p.evaluate(() => document.querySelector('#book .flip').click()); await p.waitForTimeout(1400); },
  async extra(p, rec, c) {
    const S = c.SELF;
    await p.evaluate(s => document.querySelector(s + ' .card').scrollIntoView({ block: 'center', behavior: 'instant' }), S); await p.waitForTimeout(1000);
    const f = await p.evaluate(s => { const e = document.querySelector(s); const st = e.querySelector('.front'); return { tel: [...e.querySelectorAll('.front a[href^="tel:"]')].map(a => a.getAttribute('href')), text: st.textContent.replace(/\s+/g, ' '), backInert: e.querySelector('.backf').inert }; }, S);
    rec('the front: the one number, hours, email, office, licence; the back is inert while hidden', f.tel.every(t => t === 'tel:+16519776027') && /Mon–Sat 8:00–18:00/.test(f.text) && /info@owlroofing\.com/.test(f.text) && /1000 County Rd E #230, Shoreview, MN 55126/.test(f.text) && /BC809662/.test(f.text) && f.backInert, f.text.slice(0, 200));
    await p.screenshot({ path: c.OUT + '/front.png' });
    await p.click(S + ' .flip'); await p.waitForTimeout(450);
    await p.screenshot({ path: c.OUT + '/turning.png' });
    await p.waitForTimeout(1100); await frames(p); { const r = await p.evaluate(s => { const q = document.querySelector(s + ' .scene').getBoundingClientRect(); return [q.left + q.width / 2, q.top + 30]; }, S); await p.mouse.move(r[0], r[1], { steps: 3 }); await p.waitForTimeout(300); }
    const b = await p.evaluate(s => { const e = document.querySelector(s); return { backInert: e.querySelector('.backf').inert, frontInert: e.querySelector('.front').inert, focus: document.activeElement && document.activeElement.id, exp: e.querySelector('.flip').getAttribute('aria-expanded') }; }, S);
    rec('the card turns: the paper is live, the front inert, focus lands on the first line', !b.backInert && b.frontInert && b.focus === 'bk3-n' && b.exp === 'true', JSON.stringify(b));
    // paper and ink: handwriting on labels, placeholders and typed text
    const h = await p.evaluate(async s => { await document.fonts.ready; const e = document.querySelector(s), inp = e.querySelector('#bk3-n'), lab = e.querySelector('label[for="bk3-n"]'), ph = getComputedStyle(inp, '::placeholder');
      return { loaded: document.fonts.check('26px OwlHand'), input: getComputedStyle(inp).fontFamily, label: getComputedStyle(lab).fontFamily, ph: ph.fontFamily, chip: getComputedStyle(e.querySelector('.chips button')).fontFamily, bg: getComputedStyle(e.querySelector('.backf')).backgroundImage.indexOf('repeating-linear-gradient') > -1, margin: getComputedStyle(e.querySelector('.backf'), '::before').width, holes: e.querySelectorAll('.holes i').length, labelsize: getComputedStyle(lab).fontSize, inputsize: getComputedStyle(inp).fontSize, colors: [getComputedStyle(inp).color, ph.color] }; }, S);
    rec('the paper is ruled with a red margin and punched holes', h.bg && h.margin === '2px' && h.holes === 3, JSON.stringify([h.bg, h.margin, h.holes]));
    rec('labels, placeholders, typed text and day chips are all in handwriting (OwlHand loaded)', h.loaded && /OwlHand/.test(h.input) && /OwlHand/.test(h.label) && /OwlHand/.test(h.ph) && /OwlHand/.test(h.chip), JSON.stringify(h));
    rec('the handwriting is large enough to read (labels at least 24 px, typed text at least 26 px)', parseFloat(h.labelsize) >= 24 && parseFloat(h.inputsize) >= 26, h.labelsize + ' / ' + h.inputsize);
    await p.screenshot({ path: c.OUT + '/paper-empty.png' });
    // invalid first
    await p.click(S + ' button[type="submit"]'); await p.waitForTimeout(300);
    const err = await p.evaluate(s => document.querySelector(s + ' .form-msg').textContent, S);
    rec('an empty letter is not handed over: "Please add your name."', /Please add your name/.test(err), err);
    // write the letter
    await p.fill(S + ' #bk3-n', 'Maria Lopez'); await p.fill(S + ' #bk3-p', '612 555 0142'); await p.fill(S + ' #bk3-a', '88 Oak Lane, Roseville'); await p.fill(S + ' #bk3-x', 'Gutter looks loose too');
    await p.hover(S + ' .chips button:nth-child(3)'); await p.waitForTimeout(250); await p.click(S + ' .chips button:nth-child(3)'); await p.waitForTimeout(700);
    const w = await p.evaluate(s => ({ sig: document.querySelector(s + ' .sig').textContent, empty: document.querySelector(s + ' .sig').classList.contains('empty'), pressed: [...document.querySelectorAll(s + ' .chips button')].map(b => b.getAttribute('aria-pressed')).join(','), dash: getComputedStyle(document.querySelector(s + ' .chips button[aria-pressed="true"] ellipse')).strokeDashoffset }), S);
    rec('the signature writes your name as you type it; the chosen day is circled in pen', w.sig === 'Maria Lopez' && !w.empty && w.pressed === 'false,false,true,false,false,false' && parseFloat(w.dash) === 0, JSON.stringify(w));
    await p.screenshot({ path: c.OUT + '/paper-written.png' });
    await p.evaluate(() => document.dispatchEvent(new CustomEvent('owl:town', { detail: 'Roseville' })));
    await p.hover(S + ' button[type="submit"]'); await p.waitForTimeout(250); await p.click(S + ' button[type="submit"]'); await p.waitForTimeout(500);
    const mt = await p.evaluate(s => ({ url: decodeURIComponent(document.querySelector(s + ' form').dataset.mailto || ''), msg: document.querySelector(s + ' .form-msg').textContent, stamp: document.querySelector(s + ' .stamp').classList.contains('on') }), S);
    rec('the letter goes to the visitor\'s own email app, filled in: name, phone, address, Wednesday, town, note', /^mailto:info@owlroofing\.com\?subject=Wise Check request/.test(mt.url) && /Name: Maria Lopez/.test(mt.url) && /Phone: 612 555 0142/.test(mt.url) && /Address: 88 Oak Lane, Roseville/.test(mt.url) && /Best day: Wednesday/.test(mt.url) && /Town: Roseville/.test(mt.url) && /One more thing: Gutter looks loose too/.test(mt.url), mt.url.replace(/\n/g, ' / ').slice(0, 260));
    rec('it never claims to have sent anything', /should open with your letter.*Send it from there/.test(mt.msg) && !/\b(sent|submitted|thank you for)/i.test(mt.msg.replace(/Send it from there/, '')) && mt.stamp, mt.msg);
    await p.screenshot({ path: c.OUT + '/paper-stamped.png' });
    // back to the card, and Escape
    await p.click(S + ' .unflip'); await p.waitForTimeout(1400); await frames(p);
    const u = await p.evaluate(s => ({ backInert: document.querySelector(s + ' .backf').inert, frontInert: document.querySelector(s + ' .front').inert }), S);
    rec('"Back to the card" turns it again', u.backInert && !u.frontInert, JSON.stringify(u));
    await p.click(S + ' .flip'); await p.waitForTimeout(1400); await frames(p); await p.keyboard.press('Escape'); await p.waitForTimeout(1400);
    rec('Escape turns the card back', await p.evaluate(s => document.querySelector(s + ' .backf').inert, S));
    // 3D lean on the front
    const bx = await p.evaluate(s => { const r = document.querySelector(s + ' .scene').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, S);
    await p.mouse.move(bx[0] + bx[2] * .85, bx[1] + bx[3] * .3, { steps: 6 }); await p.waitForTimeout(600);
    const ry = await p.evaluate(s => document.querySelector(s + ' .tilt').style.getPropertyValue('--ry'), S);
    rec('the card leans toward the pointer', parseFloat(ry) > 2, ry);
    // phone: the letter fits and works
    const m = await c.open('', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    await m.evaluate(s => document.querySelector(s + ' .card').scrollIntoView({ block: 'center', behavior: 'instant' }), S); await m.waitForTimeout(500);
    await m.tap(S + ' .flip'); await m.waitForTimeout(1500); await frames(m);
    const pw = await m.evaluate(s => { const b = document.querySelector(s + ' .backf').getBoundingClientRect(); return { w: Math.round(b.width), over: document.documentElement.scrollWidth - innerWidth, inputs: [...document.querySelectorAll(s + ' .backf input:not([type="hidden"])')].map(i => Math.round(i.getBoundingClientRect().width)) }; }, S);
    rec('phone: the paper fits, every line is wide enough to type on', pw.over <= 1 && pw.inputs.every(w => w >= 150), JSON.stringify(pw));
    await m.screenshot({ path: c.OUT + '/phone-paper.png' }); await m.close();
  },
  async reduced(p, rec, c) { const r = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .card')).transitionDuration, c.SELF); rec('reduced motion: the card turns without animation', /^(0s|1e-05s)/.test(r), r); }
};

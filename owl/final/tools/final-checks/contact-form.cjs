const frames = p => p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
module.exports = { hash: '#/contact', sharpAt: [0],
  async extra(p, rec, c) { const S = c.SELF;
    await p.evaluate(() => { window.__nav = 0; addEventListener('beforeunload', () => window.__nav++); });
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(900);
    const h = await p.evaluate(async s => { await document.fonts.ready; const e = document.querySelector(s), inp = e.querySelector('#ct2-n'), lab = e.querySelector('label[for="ct2-n"]'), ph = getComputedStyle(inp, '::placeholder'), ta = e.querySelector('textarea');
      return { loaded: document.fonts.check('26px OwlHand'), input: getComputedStyle(inp).fontFamily, label: getComputedStyle(lab).fontFamily, ph: getComputedStyle(inp, '::placeholder').fontFamily, tph: getComputedStyle(ta, '::placeholder').fontFamily, ta: getComputedStyle(ta).fontFamily, chip: getComputedStyle(e.querySelector('.topics button')).fontFamily, ruled: getComputedStyle(e.querySelector('.paper')).backgroundImage.indexOf('repeating-linear-gradient') > -1, holes: e.querySelectorAll('.holes i').length, ls: getComputedStyle(lab).fontSize, is: getComputedStyle(inp).fontSize, ts: getComputedStyle(ta).fontSize, forms: document.querySelectorAll('.page[data-page="contact"] form').length }; }, S);
    rec('ruled paper with a red margin and punched holes', h.ruled && h.holes === 3, JSON.stringify([h.ruled, h.holes]));
    rec('labels, placeholders, typed text, message and topic words are all handwriting (OwlHand loaded)', h.loaded && [h.input, h.label, h.ph, h.tph, h.ta, h.chip].every(f => /OwlHand/.test(f)), JSON.stringify([h.loaded, h.input, h.ph, h.ta]));
    rec('the handwriting is large enough to read (24+ px labels, 26+ px typed)', parseFloat(h.ls) >= 24 && parseFloat(h.is) >= 26 && parseFloat(h.ts) >= 26, [h.ls, h.is, h.ts].join(' / '));
    await p.screenshot({ path: c.OUT + '/paper-empty.png' });
    // refusals
    async function press() { await p.hover(S + ' button[type="submit"]'); await p.waitForTimeout(200); await p.click(S + ' button[type="submit"]'); await p.waitForTimeout(400); return p.evaluate(s => document.querySelector(s + ' .form-msg').textContent, S); }
    rec('an empty letter is refused: "Please add your name."', /Please add your name/.test(await press()));
    await p.fill(S + ' #ct2-n', 'Maria Lopez');
    rec('with no phone or email it asks for one', /phone number or an email/.test(await press()));
    await p.fill(S + ' #ct2-e', 'not-an-email');
    rec('a malformed email is refused', /check your email/.test(await press()));
    await p.fill(S + ' #ct2-e', 'maria@example.com');
    rec('with contact details but no message it asks for the message', /add your message/.test(await press()));
    await p.fill(S + ' #ct2-x', 'Two shingles blew off in the wind.\nCould someone come and look?');
    await p.hover(S + ' .topics button >> nth=2'); await p.waitForTimeout(300); await p.click(S + ' .topics button >> nth=2'); await p.waitForTimeout(700);
    const w = await p.evaluate(s => ({ sig: document.querySelector(s + ' .sig').textContent, pressed: [...document.querySelectorAll(s + ' .topics button')].map(b => b.getAttribute('aria-pressed')).join(','), dash: parseFloat(getComputedStyle(document.querySelector(s + ' .topics button[aria-pressed="true"] ellipse')).strokeDashoffset) }), S);
    rec('the signature writes your name; the chosen topic is circled in pen', w.sig === 'Maria Lopez' && w.pressed === 'false,false,true,false,false' && w.dash === 0, JSON.stringify(w));
    await p.screenshot({ path: c.OUT + '/paper-written.png' });
    const msg = await press();
    const r = await p.evaluate(s => ({ stamp: document.querySelector(s + ' .stamp').classList.contains('on'), cls: document.querySelector(s + ' .form-msg').className, box: JSON.parse(localStorage.getItem('owlOutbox') || '[]').filter(x => x.kind === 'contact-letter').slice(-1)[0], nav: window.__nav, mailto: !!document.querySelector(s + ' [href^="mailto:"]') }), S);
    rec('on send the page itself says "We received your message. We’ll get back to you soon.", stamps the letter, and no email app opens', msg === 'We received your message. We’ll get back to you soon.' && r.stamp && /ok/.test(r.cls) && r.nav === 0 && !r.mailto, msg);
    const f = (r.box || {}).fields || {};
    rec('the letter is taken in place with name, email, topic and the full message (two lines)', f.name === 'Maria Lopez' && f.email === 'maria@example.com' && f.topic === 'Storm damage' && /blew off/.test(f.message || '') && /Could someone/.test(f.message || ''), JSON.stringify(f));
    await p.screenshot({ path: c.OUT + '/paper-stamped.png' });
    rec('there is no mailto anywhere in the form and the endpoint is left unset', await p.evaluate(() => OWL.endpoint === '' && !document.querySelector('.page[data-page="contact"] form [href^="mailto:"]')));
    // phone
    const m = await c.open('', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    await m.evaluate(s => document.querySelector(s + ' .paper').scrollIntoView({ block: 'start', behavior: 'instant' }), S); await m.waitForTimeout(500);
    const pw = await m.evaluate(s => ({ over: document.documentElement.scrollWidth - innerWidth, inputs: [...document.querySelectorAll(s + ' .paper input:not([type="hidden"]), ' + s + ' textarea')].map(i => Math.round(i.getBoundingClientRect().width)) }), S);
    rec('phone: the paper fits and every line is wide enough to type on', pw.over <= 1 && pw.inputs.every(w => w >= 150), JSON.stringify(pw));
    await m.screenshot({ path: c.OUT + '/phone-paper.png' }); await m.close();
  },
  async reduced(p, rec, c) { rec('reduced motion: the paper is simply there', await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .stamp')).transitionDuration.match(/^(0s|1e-05s)/) !== null, c.SELF)); } };

module.exports = { hash: '#/about', sharpAt: [0],
  async extra(p, rec, c) { const S = c.SELF;
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(700);
    const a = await p.evaluate(s => ({ w: [...document.querySelectorAll(s + ' .w')].map(x => x.textContent), p: document.querySelector(s + ' .proof p').textContent }), S);
    rec('four values: Friendly, Trustworthy, Expert, Reassuring', a.w.join('') === 'Friendly.Trustworthy.Expert.Reassuring.', a.w.join(' '));
    await p.hover(S + ' .w >> nth=1'); await p.waitForTimeout(300); await p.click(S + ' .w >> nth=1'); await p.waitForTimeout(400);
    const b = await p.evaluate(s => document.querySelector(s + ' .proof p').textContent, S);
    rec('Trustworthy shows BBB A− and the licence, never "Accredited"', /BBB A−/.test(b) && /BC809662/.test(b) && !/Accredited/.test(b), b);
    await p.screenshot({ path: c.OUT + '/about-values.png' }); } };

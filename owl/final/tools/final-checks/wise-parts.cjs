module.exports = { hash: '#/wise-check', sharpAt: [0],
  async extra(p, rec, c) { const S = c.SELF;
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(700);
    const a = await p.evaluate(s => ({ labs: [...document.querySelectorAll(s + ' .lab')].map(l => l.textContent), h3: document.querySelector(s + ' .screen h3').textContent }), S);
    rec('four parts of the Wise Check, in Owl\'s own words', a.labs.length === 4 && a.h3 === 'Roof evaluation', JSON.stringify(a));
    await p.hover(S + ' .lab >> nth=2'); await p.click(S + ' .lab >> nth=2'); await p.waitForTimeout(500);
    const b = await p.evaluate(s => ({ h3: document.querySelector(s + ' .screen h3').textContent, v: document.querySelector(s + ' .knob').getAttribute('aria-valuenow') }), S);
    rec('pressing a label turns the dial and shows that part', /Heat-sensor/.test(b.h3) && b.v === '3', JSON.stringify(b));
    await p.focus(S + ' .knob'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
    rec('the dial turns with the arrow keys', await p.evaluate(s => /Photo and video/.test(document.querySelector(s + ' .screen h3').textContent), S));
    await p.screenshot({ path: c.OUT + '/wise-parts.png' }); } };

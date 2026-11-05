module.exports = { hash: '#/wise-check', sharpAt: [0, .5],
  async extra(p, rec, c) { const S = c.SELF;
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(2800);
    const a = await p.evaluate(s => ({ x: document.querySelector(s + ' .scan').style.getPropertyValue('--x'), found: document.querySelector(s + ' .scan').classList.contains('found'), page: document.querySelector('.page[data-page="wise-check"]').hidden, note: document.querySelector(s + ' .foot p').textContent }), S);
    rec('the scanner sweeps in by itself and finds the warm spot; the page says it is an illustration', !a.page && parseFloat(a.x) > 50 && a.found && /Illustration/.test(a.note), JSON.stringify(a));
    const r = await p.evaluate(s => { const b = document.querySelector(s + ' .scan').getBoundingClientRect(); return [b.left, b.top + b.height / 2, b.width]; }, S);
    await p.mouse.move(r[0] + 10, r[1]); await p.mouse.down(); await p.mouse.move(r[0] + r[2] * .15, r[1], { steps: 5 }); await p.mouse.up(); await p.waitForTimeout(300);
    const b = await p.evaluate(s => ({ x: parseFloat(document.querySelector(s + ' .scan').style.getPropertyValue('--x')), found: document.querySelector(s + ' .scan').classList.contains('found') }), S);
    rec('dragging back hides the spot again', b.x < 30 && !b.found, JSON.stringify(b));
    await p.focus(S + ' .grip'); for (let i = 0; i < 8; i++) await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
    rec('the keyboard moves the scanner', await p.evaluate(s => +document.querySelector(s + ' .grip').getAttribute('aria-valuenow') > 40, S));
    await p.screenshot({ path: c.OUT + '/wise-hero.png' }); } };

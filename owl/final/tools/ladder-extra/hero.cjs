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
  }
};

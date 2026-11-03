// Ladder interaction checks for new Protect Your Nest versions (truth: the wrap, three cleanup passes, the aftercare box; no storm story).
module.exports = {
  '4': async (p, S, rec, txt) => {
    rec('tells the system truthfully (wrap, three passes, box; no storm)', /wrap/i.test(txt) && /three cleanup passes/i.test(txt) && /aftercare box/i.test(txt) && !/storm|hail|shield/i.test(txt));
    const shot = () => p.evaluate(S => { const c = document.querySelector(S + ' canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let h = 0; for (let i = 0; i < d.length; i += 64) h = (h * 31 + d[i]) % 1e9; return h; }, S);
    await p.waitForTimeout(500); const a = await shot();
    const b = await p.evaluate(S => { const r = document.querySelector(S + ' .stage').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }, S);
    await p.mouse.move(b.x + b.w * .3, b.y + b.h * .6); await p.mouse.move(b.x + b.w * .7, b.y + b.h * .65, { steps: 12 }); await p.waitForTimeout(200);
    rec('the mesh moves where the pointer blows across it', (await shot()) !== a);
  },
  '5': async (p, S, rec, txt) => {
    rec('tells the system truthfully (wrap, three passes, box; no storm)', /wrap/i.test(txt) && /three cleanup passes/i.test(txt) && /aftercare box/i.test(txt) && !/storm|hail|shield/i.test(txt));
    await p.waitForTimeout(3600);
    rec('the nest weaves itself and the owl settles in', await p.evaluate(S => document.querySelector(S + ' .art').classList.contains('woven') && document.querySelectorAll(S + ' .band').length === 6, S));
    await p.click(S + ' #pn5-t1'); await p.waitForTimeout(400);
    rec('choosing the middle weave lifts it and tells the three passes in Owl\'s words', await p.evaluate(S => [...document.querySelectorAll(S + ' .band.on')].every(g => g.dataset.k === '1') && document.querySelectorAll(S + ' .band.on').length === 2 && /magnet/.test(document.querySelector(S + ' .say').textContent) && /project manager/.test(document.querySelector(S + ' .say').textContent), S));
    await p.focus(S + ' #pn5-t1'); await p.keyboard.press('ArrowDown');
    rec('arrow keys rove to the lining (the aftercare box)', await p.evaluate(S => document.activeElement.id === 'pn5-t2' && /Left with you/.test(document.querySelector(S + ' .say').textContent), S));
  }
};

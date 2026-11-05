module.exports = { sharpAt: [0, .99],
  async extra(p, rec, c) {
    const t = await p.evaluate(s => { const e = document.querySelector(s); return { h1: (e.querySelector('h1') || {}).textContent, ctas: [...e.querySelectorAll('.ctas a')].map(a => a.getAttribute('href')), trust: e.querySelector('.trust').textContent.replace(/\s+/g, ' ').trim(), gl: !!e.querySelector('canvas.gl') }; }, c.SELF);
    rec('headline "We Give a Hoot About Your Roof"', /We Give a Hoot About Your Roof/i.test(t.h1 || ''), t.h1);
    rec('two actions: book and services', t.ctas.includes('#book') && t.ctas.includes('#services'), t.ctas.join(','));
    rec('trust row carries only locked facts', /5\.0 · 90\+ reviews/.test(t.trust) && /GAF Systems Plus Certified/.test(t.trust) && /Founded 2025/.test(t.trust), t.trust);
    rec('the living owl (WebGL mesh) is mounted', t.gl);
    const m = await p.evaluate(async s => { const e = document.querySelector(s), cv = e.querySelector('canvas.gl'); await new Promise(r => setTimeout(r, 600)); return { w: cv.width, h: cv.height }; }, c.SELF);
    rec('the canvas has a size', m.w > 100 && m.h > 100, m.w + 'x' + m.h);
    await p.mouse.move(300, 300); await p.waitForTimeout(300); await p.mouse.move(1100, 500, { steps: 8 }); await p.waitForTimeout(500);
    const px = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .stage')).getPropertyValue('--px'), c.SELF);
    rec('the depth planes follow the pointer', px !== '' && px !== '0', px);
    await p.screenshot({ path: c.OUT + '/hero-1440.png' });
  } };

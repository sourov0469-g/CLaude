// "Nothing" V3 · Filmstrip: five frames slide sideways as you scroll down; the loop plays only while on screen
module.exports = {
  sharpAt: [0, .25, .5, .75, 1],
  async extra(p, rec) {
    const at = async f => { await p.evaluate(f => { const s = document.getElementById('nothing'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(900); return p.evaluate(() => { const s = document.getElementById('nothing'), m = new DOMMatrix(getComputedStyle(s.querySelector('.track')).transform), v = s.querySelector('video'); return { step: +s.dataset.step, x: Math.round(m.m41), playing: !v.paused, src: !!(v.currentSrc || v.getAttribute('src')) }; }); };
    const a = await at(0), b = await at(.5), c = await at(1), d = await at(.5);
    rec('scrolling down slides the strip sideways (and back): steps 1 → 3 → 5 → 3', a.step === 1 && b.step === 3 && c.step === 5 && d.step === 3 && a.x === 0 && b.x < -100 && c.x < b.x && Math.abs(d.x - b.x) < 4, JSON.stringify([a, b, c, d]));
    rec('the “Roof” loop plays only while its frame is on screen', b.playing && b.src && !a.playing && !c.playing, JSON.stringify([a.playing, b.playing, c.playing]));
    rec('two drawn frames, two stock photos and one stock loop, each stock frame tagged', await p.evaluate(() => { const s = document.getElementById('nothing'); return s.querySelectorAll('.pic.drawn').length === 2 && s.querySelectorAll('.pic .tag').length === 3 && [...s.querySelectorAll('.pic .tag')].every(t => /^Illustrative (photo|footage)$/.test(t.textContent)); }));
    await p.click('#nothing .dots button >> nth=3'); await p.waitForTimeout(1500);
    rec('the dots jump to a step (Clean)', await p.evaluate(() => +document.getElementById('nothing').dataset.step === 4));
  },
  async reduced(p, rec) { await p.evaluate(() => { const s = document.getElementById('nothing'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * .5); }); await p.waitForTimeout(400);
    rec('reduced motion: the strip still follows scroll, the loop never plays', await p.evaluate(() => { const s = document.getElementById('nothing'); return +s.dataset.step === 3 && !s.querySelector('video').getAttribute('src'); })); }
};

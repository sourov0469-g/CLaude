// Family V1 · Split cover, repaired: framed photos at their own pixels, a crossfade (no collage), clear of faces on phones
module.exports = {
  sharpAt: [.1, .5, .9],
  async extra(p, rec) {
    const at = async f => { await p.evaluate(f => { const s = document.getElementById('people'); scrollTo({ top: s.offsetTop + (s.offsetHeight - innerHeight) * f, behavior: 'instant' }); }, f); await p.waitForTimeout(1200); return p.evaluate(() => { const s = document.getElementById('people'); return { cv: +s.dataset.cover, nm: s.querySelector('.card .nm').textContent, on: s.querySelectorAll('.cv.on').length }; }); };
    const a = await at(.15), b = await at(.5), c = await at(.85);
    rec('scroll turns the chapters: The Browns → The Berglands → Owl’s crew, one at a time', /^The Browns/.test(a.nm) && /^The Berglands/.test(b.nm) && /^Owl’s crew/.test(c.nm) && a.cv === 1 && c.cv === 3 && a.on === 1 && c.on === 1);
    await at(.15); await p.evaluate(() => { const s = document.getElementById('people'); scrollTo({ top: s.offsetTop + (s.offsetHeight - innerHeight) * .5, behavior: 'instant' }); }); await p.waitForTimeout(300);
    rec('mid-turn there is no collage: the two chapters cross-fade in place (no half slides over another)', await p.evaluate(() => [...document.querySelectorAll('#people .cv')].every(c => { const r = c.getBoundingClientRect(); return Math.abs(r.top) < 2 && Math.abs(r.left) < 2; }) && [...document.querySelectorAll('#people .half img')].every(i => Math.abs(parseFloat(getComputedStyle(i).translate.split(' ')[1] || '0')) < 30)));
    rec('Owl’s own photos only, with the site’s own captions; no stock house, no invented detail', await p.evaluate(() => { const s = document.getElementById('people'), alts = [...s.querySelectorAll('img')].map(i => i.alt).join(' | '); return /Tim Brown with his wife and their children/.test(alts) && /Noah Bergland on a ladder at a roof edge/.test(alts) && !/illustrative/i.test(alts) && /Founded 2025/.test(s.innerHTML) && !/\bvan\b|years? of experience/i.test(s.textContent); }));
    await p.click('#people .dots button >> nth=1'); await p.waitForTimeout(1500);
    rec('the dots jump to a chapter (The Berglands)', await p.evaluate(() => +document.getElementById('people').dataset.cover === 2));
  },
  async reduced(p, rec) { await p.evaluate(() => { const s = document.getElementById('people'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * .5); }); await p.waitForTimeout(200);
    rec('reduced motion: the chapter swaps at once', await p.evaluate(() => +document.getElementById('people').dataset.cover === 2 && parseFloat(getComputedStyle(document.querySelector('#people .cv')).transitionDuration) < .01)); }
};

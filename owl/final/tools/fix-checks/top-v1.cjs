// Hero V1 · Crew film: Owl's own film, framed at no more than its pixels, two beats, the cue to the finder
module.exports = {
  async extra(p, rec) {
    await p.waitForTimeout(1500);
    const f = await p.evaluate(() => { const s = document.getElementById('top'), v = s.querySelector('video'), r = s.querySelector('.frame').getBoundingClientRect();
      return { blob: (v.currentSrc || v.src).startsWith('blob:'), t: v.currentTime, w: Math.round(r.width), nw: v.videoWidth, tag: s.querySelector('.tag').textContent, sticky: getComputedStyle(s.querySelector('.stage')).position, h: s.offsetHeight / innerHeight }; });
    rec('Owl’s own crew film plays (from a Blob URL, the phone-safe way), labelled “Owl’s crew at work”', f.blob && f.t > .3 && f.tag === 'Owl’s crew at work', JSON.stringify(f));
    rec('sharp by construction: the 960 px film is framed no wider than 960 px on a 1440 screen', f.w <= f.nw && f.nw === 960, f.w + ' px frame for a ' + f.nw + ' px film');
    rec('a short pinned arrival (sticky stage, at most 2 screens)', f.sticky === 'sticky' && f.h <= 2.05, f.h.toFixed(2) + ' screens');
    const at = async x => { await p.evaluate(x => { const s = document.getElementById('top'); scrollTo(0, (s.offsetHeight - innerHeight) * x); }, x); await p.waitForTimeout(900); return p.evaluate(() => document.getElementById('top').classList.contains('two')); };
    const a = await at(0), b = await at(.7), c = await at(0);
    rec('scroll turns “Roof trouble? We’ll take it from here.” into “You call. We climb. You relax.” and back', !a && b && !c);
    rec('only locked facts on the film: 5.0 · 90+ reviews, GAF Systems Plus, 10-year workmanship warranty', await p.evaluate(() => { const t = document.getElementById('top').textContent; return ['5.0 · 90+ reviews', 'GAF Systems Plus', '10-year workmanship warranty', 'Family-owned roofers in Shoreview, MN'].every(x => t.includes(x)); }));
    await p.click('#top .cue'); await p.waitForTimeout(1500);
    rec('the cue goes straight to the problem-finder', await p.evaluate(() => Math.abs(document.getElementById('finder').getBoundingClientRect().top) < 140));
  },
  async reduced(p, rec) {
    rec('reduced motion: no film loaded, the crew poster stays, the beats still turn', await p.evaluate(async () => { const s = document.getElementById('top'); scrollTo(0, (s.offsetHeight - innerHeight) * .7); await new Promise(r => setTimeout(r, 300)); return !s.querySelector('video').getAttribute('src') && getComputedStyle(s.querySelector('.poster')).opacity === '1' && s.classList.contains('two'); }));
  }
};

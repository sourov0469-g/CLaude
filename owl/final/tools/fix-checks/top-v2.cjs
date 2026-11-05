// Hero V2 · Pull back: a stock drone rise scrubbed by scroll, reversible, three beats, square crop on phones
module.exports = {
  sharpAt: [0, .5, .95],
  async extra(p, rec) {
    await p.waitForTimeout(1200);
    const at = async x => { await p.evaluate(x => { const s = document.getElementById('top'); scrollTo(0, (s.offsetHeight - innerHeight) * x); }, x); await p.waitForTimeout(1000); return p.evaluate(() => { const s = document.getElementById('top'), v = s.querySelector('video'); return { t: +v.currentTime.toFixed(2), beat: +s.dataset.beat, blob: (v.currentSrc || v.src).startsWith('blob:') }; }); };
    const a = await at(.1), b = await at(.5), c = await at(.92), d = await at(.5);
    rec('the AirPods mechanism: scroll scrubs the drone film up (time rises with scroll) and back down (falls when you scroll up)', b.t > a.t + 2 && c.t > b.t + 2 && Math.abs(d.t - b.t) < .6 && a.blob, [a.t, b.t, c.t, d.t].join(' → '));
    rec('three beats follow: one shingle → the roof it belongs to → 29 towns around Shoreview, MN', a.beat === 1 && b.beat === 2 && c.beat === 3);
    rec('stock is labelled as such (“Illustrative footage”), and the last beat carries the call and the cue', await p.evaluate(() => { const s = document.getElementById('top'); return s.querySelector('.alt').textContent === 'Illustrative footage' && s.querySelector('.b3 a[href="tel:+16519776027"]') && s.querySelector('.b3 a[href="#finder"]') && s.textContent.includes('29 towns around'); }));
    rec('a pinned stage (sticky), 2.8 screens', await p.evaluate(() => { const s = document.getElementById('top'); return getComputedStyle(s.querySelector('.stage')).position === 'sticky' && s.offsetHeight / innerHeight > 2.5 && s.offsetHeight / innerHeight < 3.1; }));
  },
  async reduced(p, rec) {
    rec('reduced motion: no film is loaded or scrubbed (the still frame stays), the beats still follow scroll', await p.evaluate(async () => { const s = document.getElementById('top'); scrollTo(0, (s.offsetHeight - innerHeight) * .9); await new Promise(r => setTimeout(r, 300)); return !s.querySelector('video').getAttribute('src') && getComputedStyle(s.querySelector('.still')).opacity === '1' && +s.dataset.beat === 3; }));
  }
};

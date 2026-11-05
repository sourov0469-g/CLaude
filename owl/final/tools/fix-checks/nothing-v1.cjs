// "Nothing" V1 · Scroll film: a pinned stage scrubbing NEW footage (not Owl's crew film) through five beats
module.exports = {
  sharpAt: [.1, .5, .9],
  async extra(p, rec) {
    const at = async f => { await p.evaluate(f => { const s = document.getElementById('nothing'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(1000); return p.evaluate(() => { const s = document.getElementById('nothing'), v = s.querySelector('video'); return { beat: +s.dataset.beat, t: +v.currentTime.toFixed(2), you: s.querySelector('.you .w').textContent, first: s.querySelector('.bt b').textContent, blob: (v.currentSrc || v.src).startsWith('blob:') }; }); };
    rec('a pinned stage, 4.5 screens (shortened from 5.4)', await p.evaluate(() => { const s = document.getElementById('nothing'); return getComputedStyle(s.querySelector('.stage')).position === 'sticky' && Math.abs(s.offsetHeight / innerHeight - 4.5) < .1; }));
    const a = await at(.1), b = await at(.5), c = await at(.9), d = await at(.5);
    rec('the scrub: film time rises with scroll and falls back when you scroll up (Blob URL)', b.t > a.t + 2 && c.t > b.t + 2 && Math.abs(d.t - b.t) < .5 && a.blob, [a.t, b.t, c.t, d.t].join(' → '));
    rec('five beats follow scroll, with the “meanwhile, you” line', a.beat === 1 && b.beat === 3 && c.beat === 5 && a.you === 'make coffee.' && c.you === 'open the front door.');
    rec('different footage from the hero, labelled honestly: “Illustrative footage” (not “Owl’s crew film”)', await p.evaluate(() => document.querySelector('#nothing .tag').textContent === 'Illustrative footage' && !/crew film/i.test(document.getElementById('nothing').innerText)));
    rec('beat 1 follows the case chosen above (none chosen: “We look closely first.”)', a.first === 'We look closely first.');
    await p.click('#nothing .rail button >> nth=3'); await p.waitForTimeout(1500);
    rec('the rail jumps to a step (Clean)', await p.evaluate(() => +document.getElementById('nothing').dataset.beat === 4));
  },
  async reduced(p, rec) { await p.evaluate(() => { const s = document.getElementById('nothing'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * .7); }); await p.waitForTimeout(400);
    rec('reduced motion: no film is loaded or scrubbed, the still stays, the beats still follow', await p.evaluate(() => { const s = document.getElementById('nothing'); return !s.querySelector('video').getAttribute('src') && +s.dataset.beat === 4; })); }
};

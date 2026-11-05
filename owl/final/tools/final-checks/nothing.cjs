// Section 5 · Your part: nothing: a pinned stage scrubbing stock footage through five beats
module.exports = {
  sharpAt: [.1, .5, .9],
  async extra(p, rec) {
    const at = async f => { await p.evaluate(f => { const s = document.getElementById('nothing'); scrollTo(0, s.getBoundingClientRect().top + scrollY + (s.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(1100);
      return p.evaluate(() => { const s = document.getElementById('nothing'); const v = s.querySelector('video'); return { t: v.currentTime, beat: +s.dataset.beat, you: s.querySelector('.you .w').textContent, first: s.querySelector('.bt b').textContent, blob: v.currentSrc.slice(0, 5) === 'blob:' }; }); };
    rec('a pinned stage, 4.5 screens', await p.evaluate(() => { const s = document.getElementById('nothing'); return getComputedStyle(s.querySelector('.stage')).position === 'sticky' && Math.abs(s.offsetHeight / innerHeight - 4.5) < .1; }));
    const a = await at(.1), b = await at(.5), c = await at(.9), d = await at(.5);
    rec('the scrub: film time rises with scroll and falls back when you scroll up (Blob URL)', b.t > a.t + 2 && c.t > b.t + 2 && Math.abs(d.t - b.t) < .5 && a.blob, [a.t, b.t, c.t, d.t].join(' → '));
    rec('five beats follow scroll, with the "meanwhile, you" line', a.beat === 1 && b.beat === 3 && c.beat === 5 && a.you === 'make coffee.' && c.you === 'open the front door.', JSON.stringify([a.beat, b.beat, c.beat, a.you, c.you]));
    rec('the footage is labelled "Illustrative footage" and never called Owl\'s crew film', await p.evaluate(() => document.querySelector('#nothing .tag').textContent === 'Illustrative footage' && !/crew film/i.test([...document.querySelectorAll('#nothing .stage *')].filter(e => !/SCRIPT|STYLE/.test(e.tagName)).map(e => e.childNodes.length === 1 && e.firstChild.nodeType === 3 ? e.textContent : '').join(' '))));
    rec('beat 1 starts as "We look closely first." when nothing has been said above', a.first === 'We look closely first.', a.first);
    await p.evaluate(() => document.dispatchEvent(new CustomEvent('owl:case', { detail: 'leak' }))); await p.waitForTimeout(200);
    rec('beat 1 follows what the visitor said above (a leak)', await p.evaluate(() => document.querySelector('#nothing .bt b').textContent === 'We find your leak first.'));
    await p.screenshot({ path: 'gates/final/nothing/stage.png' });
    await p.click('#nothing .rail button >> nth=3'); await p.waitForTimeout(1500);
    rec('the rail jumps to a step (Clean)', await p.evaluate(() => +document.getElementById('nothing').dataset.beat === 4));
  },
  async reduced(p, rec) { await p.evaluate(() => { const s = document.getElementById('nothing'); scrollTo(0, s.getBoundingClientRect().top + scrollY + (s.offsetHeight - innerHeight) * .7); }); await p.waitForTimeout(500);
    rec('reduced motion: no film is loaded or scrubbed, the still stays, the beats still follow', await p.evaluate(() => { const s = document.getElementById('nothing'); return !s.querySelector('video').getAttribute('src') && +s.dataset.beat === 4; })); }
};

// Hero V4 · The question: four answers, each opens the problem-finder already set to that case
module.exports = {
  async extra(p, rec) {
    rec('one question and four answers, each a real button at least 44 px', await p.evaluate(() => { const b = [...document.querySelectorAll('#top .ans button')]; return document.querySelector('#top h1').textContent === 'Is your roof okay right now?' && b.length === 4 && b.every(x => x.getBoundingClientRect().height >= 44); }));
    await p.click('#top .ans button >> nth=1'); await p.waitForTimeout(1800);
    const r = await p.evaluate(() => ({ cas: document.getElementById('finder').dataset.case, top: Math.round(document.getElementById('finder').getBoundingClientRect().top), shared: window.RESET.case() }));
    rec('“A storm just hit.” opens section 2 set to the storm case (shared with the page), in view', r.cas === 'storm' && r.shared === 'storm' && Math.abs(r.top) < 160, JSON.stringify(r));
    rec('the call stays one tap away under the answers, with the hours; the stock photo is tagged', await p.evaluate(() => { const s = document.getElementById('top'); return !!s.querySelector('.or a[href="tel:+16519776027"]') && /Mon–Sat 08:00–18:00/.test(s.querySelector('.or').textContent) && s.querySelector('.tag').textContent === 'Illustrative photo'; }));
  },
  async reduced(p, rec) {
    await p.evaluate(() => document.getElementById('top').scrollIntoView({ behavior: 'instant' }));
    await p.click('#top .ans button >> nth=3'); await p.waitForTimeout(300);
    rec('reduced motion: an answer opens the finder at once (case “unsure”)', await p.evaluate(() => document.getElementById('finder').dataset.case === 'unsure'));
  }
};

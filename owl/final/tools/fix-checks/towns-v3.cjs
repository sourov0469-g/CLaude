// Towns V3 · From above: a sharp aerial photo, one ask box, the 29 names as a quiet row (in order of distance)
const core = require('./_towns-core.cjs');
module.exports = {
  async extra(p, rec) {
    await core(p, rec, { input: '#t3-in', ans: '#towns .ans' });
    rec('the 29 towns as buttons, nearest first (Shoreview, then Arden Hills), the typed one lit', await p.evaluate(() => { const b = [...document.querySelectorAll('#towns .row li button')]; return b.length === 29 && b[0].textContent === 'Shoreview' && b[1].textContent === 'Arden Hills' && document.querySelector('#towns .row li.hit button').textContent === 'Stillwater'; }));
    await p.click('#towns .row li button >> nth=5'); await p.waitForTimeout(500);
    rec('choosing a name in the row answers it', await p.evaluate(() => /Yes, we come to/.test(document.querySelector('#towns .ans').textContent)));
    rec('the stock photo is tagged and described', await p.evaluate(() => document.querySelector('#towns .tag').textContent === 'Illustrative photo' && /illustrative photo/.test(document.querySelector('#towns .bgph').alt)));
  },
  async reduced(p, rec) { await p.evaluate(() => document.getElementById('towns').scrollIntoView({ behavior: 'instant' })); await p.fill('#t3-in', 'Eagan'); await p.waitForTimeout(60);
    rec('reduced motion: the answer and the lit name appear at once; nothing animates in the section', await p.evaluate(() => /Eagan/.test(document.querySelector('#towns .ans').textContent) && document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('#towns')).length === 0)); }
};

// Call V3 · Winter house: the number set on a sharp photograph
const core = require('./_call-core.cjs');
module.exports = {
  async extra(p, rec) {
    await core(p, rec, { now: '#call .now', head: '#call h2', mail: '#call .mail', msg: '#call .msg' });
    rec('the number set large in white on the photograph (at least 120 px on desktop); the stock is tagged and described', await p.evaluate(() => { const a = document.querySelector('#call a.big'); return parseFloat(getComputedStyle(a).fontSize) >= 120 && document.querySelector('#call .tag').textContent === 'Illustrative photo' && /illustrative photo/.test(document.querySelector('#call .bgph').alt); }));
  },
  async reduced(p, rec) { rec('reduced motion: nothing here animates', await p.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('#call')).length === 0)); }
};

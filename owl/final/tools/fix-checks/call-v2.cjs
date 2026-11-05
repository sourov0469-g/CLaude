// Call V2 · Two doors: Call us | Write to us, as two whole cards
const core = require('./_call-core.cjs');
module.exports = {
  noMedia: true,
  async extra(p, rec) {
    await core(p, rec, { now: '#call .now', head: '#call .hl', mail: '#call .mail', msg: '#call .msg' });
    rec('two doors side by side on desktop: “Call us” with the number and the copper call; “Write to us” with what the page knows', await p.evaluate(() => { const d = [...document.querySelectorAll('#call .door')]; return d.length === 2 && Math.abs(d[0].getBoundingClientRect().top - d[1].getBoundingClientRect().top) < 2 && !!d[0].querySelector('.btn-call') && /Your roof/.test(d[1].textContent) && /Your town/.test(d[1].textContent); }));
  },
  async reduced(p, rec) { rec('reduced motion: nothing here animates', await p.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('#call')).length === 0)); }
};

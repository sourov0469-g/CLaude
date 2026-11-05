// Numbers V1 · Numerals: facts arrive WHOLE and early; never a half-masked glyph
const FACTS = require('./_numbers-facts.cjs');
module.exports = {
  noMedia: true,
  async extra(p, rec) {
    rec('in flow (no sticky stage)', await p.evaluate(() => ![...document.querySelectorAll('#numbers *')].some(e => getComputedStyle(e).position === 'sticky')));
    rec('no glyph is ever masked: no clip-path on any number', await p.evaluate(() => [...document.querySelectorAll('#numbers .n b, #numbers .big .v')].every(b => getComputedStyle(b).clipPath === 'none')));
    await p.evaluate(() => { const n = document.querySelector('#numbers .n'); scrollTo({ top: n.getBoundingClientRect().top + scrollY - innerHeight * .8, behavior: 'instant' }); }); await p.waitForTimeout(500);
    const early = await p.evaluate(() => [...document.querySelectorAll('#numbers .n')].filter(n => n.getBoundingClientRect().top < innerHeight * .85).map(n => n.classList.contains('on') && getComputedStyle(n).opacity === '1'));
    rec('arrives early: a card is fully in place within 0.5 s of entering the screen', early.length > 0 && early[0] === true, JSON.stringify(early));
    await p.evaluate(() => { const s = document.getElementById('numbers'); scrollTo(0, s.offsetTop + s.offsetHeight - innerHeight); }); await p.waitForTimeout(900);
    rec('every number has arrived by the end of the section', await p.evaluate(() => document.querySelectorAll('#numbers .n.on').length === 6 && document.querySelector('#numbers .big').classList.contains('on')));
    rec('locked facts, exact, and nothing else (no A+, Master Elite, Accredited, lifetime)', await p.evaluate(F => { const t = document.getElementById('numbers').innerText.replace(/\s+/g, ' '); return F.every(x => t.includes(x)) && !/A\+|Master Elite|Accredited|lifetime/i.test(t); }, FACTS));
  },
  async reduced(p, rec) { await p.evaluate(() => document.getElementById('numbers').scrollIntoView()); await p.waitForTimeout(200);
    rec('reduced motion: every number is visible at once', await p.evaluate(() => [...document.querySelectorAll('#numbers .n')].every(n => getComputedStyle(n).opacity === '1'))); }
};

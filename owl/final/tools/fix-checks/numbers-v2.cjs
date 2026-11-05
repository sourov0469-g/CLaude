// Numbers V2 · Ninety marks: the 5.0 drawn with 90 marks that gather as it enters
const FACTS = require('./_numbers-facts.cjs');
module.exports = {
  noMedia: true,
  async extra(p, rec) {
    await p.evaluate(() => document.getElementById('numbers').scrollIntoView({ behavior: 'instant' })); await p.waitForTimeout(2200);
    const r = await p.evaluate(() => { const s = document.getElementById('numbers'), c = [...s.querySelectorAll('svg.marks circle')]; return { n: c.length, settled: s.dataset.settled, moved: c.filter(x => x.style.transform !== 'none').length, inside: c.filter(x => { const cx = +x.getAttribute('cx'), cy = +x.getAttribute('cy'); return cx > 50 && cx < 950 && cy > 40 && cy < 500; }).length }; });
    rec('exactly 90 marks, all gathered into the numeral once it is on screen', r.n === 90 && r.settled === '1' && r.moved === 0 && r.inside === 90, JSON.stringify(r));
    rec('the honest caption: “5.0 from 90+ reviews”, one mark per review, no names or quotes; the drawing is labelled for screen readers', await p.evaluate(() => { const s = document.getElementById('numbers'), cap = s.querySelector('figcaption').textContent; return /5\.0 from 90\+ reviews/.test(cap) && /one for each review/.test(cap) && /No names, no quotes/.test(cap) && s.querySelector('svg.marks').getAttribute('aria-labelledby') === 'm2-cap'; }));
    rec('locked facts, exact, and nothing else', await p.evaluate(F => { const t = document.getElementById('numbers').innerText.replace(/\s+/g, ' '); return F.every(x => t.includes(x)) && !/A\+|Master Elite|Accredited|lifetime/i.test(t); }, FACTS));
    rec('in flow (no sticky stage)', await p.evaluate(() => ![...document.querySelectorAll('#numbers *')].some(e => getComputedStyle(e).position === 'sticky')));
  },
  async reduced(p, rec) { await p.waitForTimeout(400);
    rec('reduced motion: the marks are in place from the start', await p.evaluate(() => document.getElementById('numbers').dataset.settled === '1' && [...document.querySelectorAll('#numbers svg.marks circle')].every(c => c.style.transform === 'none'))); }
};

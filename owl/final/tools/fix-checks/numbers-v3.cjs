// Numbers V3 · Spec row over a street (Longbow): a sharp full-bleed photo, the 5.0, six facts in one row
const FACTS = require('./_numbers-facts.cjs');
module.exports = {
  async extra(p, rec) {
    await p.evaluate(() => document.getElementById('numbers').scrollIntoView({ behavior: 'instant' })); await p.waitForTimeout(900);
    rec('one full-bleed screen, in flow; the stock photo tagged and described', await p.evaluate(() => { const s = document.getElementById('numbers'); return s.offsetHeight >= innerHeight - 2 && s.offsetHeight < innerHeight * 1.6 && ![...s.querySelectorAll('*')].some(e => getComputedStyle(e).position === 'sticky') && s.querySelector('.tag').textContent === 'Illustrative photo' && /illustrative photo/.test(s.querySelector('img').alt); }));
    rec('the Longbow row: six facts in one strict row on desktop', await p.evaluate(() => { const li = [...document.querySelectorAll('#numbers ul li')]; const tops = new Set(li.map(l => Math.round(l.getBoundingClientRect().top))); return li.length === 6 && tops.size === 1; }));
    rec('locked facts, exact, and nothing else', await p.evaluate(F => { const t = document.getElementById('numbers').innerText.replace(/\s+/g, ' '); return F.every(x => t.includes(x.replace('Workmanship warranty', 'workmanship warranty').replace('Manufacturer warranties', 'manufacturer warranties'))) && !/A\+|Master Elite|Accredited|lifetime/i.test(t); }, FACTS));
    rec('everything has arrived (whole, no masks)', await p.evaluate(() => [...document.querySelectorAll('#numbers .in > *')].every(e => getComputedStyle(e).opacity === '1')));
  },
  async reduced(p, rec) { rec('reduced motion: everything visible at once', await p.evaluate(() => { document.getElementById('numbers').scrollIntoView(); return [...document.querySelectorAll('#numbers .in > *')].every(e => getComputedStyle(e).opacity === '1'); })); }
};

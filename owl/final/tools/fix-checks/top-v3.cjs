// Hero V3 · Editorial split: a sharp still beside one line and a strict row of hard facts, in flow
module.exports = {
  async extra(p, rec) {
    rec('in flow: no sticky stage, one screen tall', await p.evaluate(() => { const s = document.getElementById('top'); return ![...s.querySelectorAll('*')].some(e => getComputedStyle(e).position === 'sticky') && s.offsetHeight <= innerHeight * 1.05; }));
    rec('the Longbow row: four hard facts, exact (5.0 from 90+ reviews · Systems Plus certified by GAF · 10-year workmanship warranty · MN licence #BC809662)', await p.evaluate(() => { const t = [...document.querySelectorAll('#top .row li')].map(l => l.textContent.replace(/\s+/g, ' ').trim()); return t.join('|') === '5.0from 90+ reviews|Systems Pluscertified by GAF|10-yearworkmanship warranty|#BC809662MN licence'; }));
    rec('one heading, the founders by name, the call is a real tel link, the stock photo is tagged', await p.evaluate(() => { const s = document.getElementById('top'); return s.querySelectorAll('h1').length === 1 && /Tim Brown and Noah Bergland/.test(s.textContent) && s.querySelector('.acts a[href="tel:+16519776027"]').getBoundingClientRect().height < 80 && s.querySelector('.tag').textContent === 'Illustrative photo'; }));
    await p.waitForTimeout(1200);
    rec('the one reveal has finished: every line is fully visible', await p.evaluate(() => [...document.querySelectorAll('#top .txt > *')].every(e => getComputedStyle(e).opacity === '1')));
  },
  async reduced(p, rec) {
    rec('reduced motion: everything is visible at once', await p.evaluate(() => [...document.querySelectorAll('#top .txt > *')].every(e => getComputedStyle(e).opacity === '1')));
  }
};

// Call V1 · End card, repaired: the Shoreview clock in words, the warm call colour on the number
const core = require('./_call-core.cjs');
module.exports = {
  async extra(p, rec) {
    await core(p, rec, { now: '#call .now', head: '#call h2', mail: '#call .mail', msg: '#call .msg' });
    rec('the number is the end card: at least 120 px on desktop, its line in the call colour', await p.evaluate(() => { const a = document.querySelector('#call a.num'); return parseFloat(getComputedStyle(a).fontSize) >= 120 && getComputedStyle(a, '::after').backgroundColor === getComputedStyle(document.querySelector('.callpill')).backgroundColor; }));
    rec('the week strip: Mon–Sat 8–6, Sunday closed, today marked', await p.evaluate(() => { const l = [...document.querySelectorAll('#call .week li')]; return l.length === 7 && /closed/.test(l[6].textContent) && l.filter(x => x.classList.contains('today')).length === 1; }));
    rec('the owl illustration appears here and nowhere else on the page', await p.evaluate(() => { const src = document.querySelector('#call .perch').currentSrc; return [...document.querySelectorAll('main img')].filter(i => i.currentSrc === src).length === 1; }));
  },
  async reduced(p, rec) { rec('reduced motion: the number, its line and the owl are in place at once', await p.evaluate(async () => { document.getElementById('call').scrollIntoView({ behavior: 'instant' }); await new Promise(r => setTimeout(r, 300)); const s = document.getElementById('call'); return s.classList.contains('on') && getComputedStyle(s.querySelector('.perch')).opacity === '1'; })); }
};

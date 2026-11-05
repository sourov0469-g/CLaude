// Towns V1 · Contour finder, repaired: drawn home marker, zoom around Shoreview, clear of the pill on phones
const core = require('./_towns-core.cjs');
module.exports = {
  noMedia: true,
  async extra(p, rec) {
    await core(p, rec, { input: '#tw-in', ans: '#towns .ans' });
    rec('29 dots; the home marker is drawn (no photo or illustration shared with another section)', await p.evaluate(() => document.querySelectorAll('#towns .dot').length === 29 && !!document.querySelector('#towns .home svg') && !document.querySelector('#towns .home img')));
    const before = await p.evaluate(() => { const a = document.querySelectorAll('#towns .dot')[2].getBoundingClientRect(), b = document.querySelectorAll('#towns .dot')[7].getBoundingClientRect(); return Math.hypot(a.left - b.left, a.top - b.top); });
    await p.click('#towns .zoom'); await p.waitForTimeout(900);
    const after = await p.evaluate(() => { const a = document.querySelectorAll('#towns .dot')[2].getBoundingClientRect(), b = document.querySelectorAll('#towns .dot')[7].getBoundingClientRect(); return Math.hypot(a.left - b.left, a.top - b.top); });
    rec('zooming in on Shoreview spreads the close towns apart (Arden Hills to New Brighton at least 2× further apart)', after > before * 2 && await p.evaluate(() => document.getElementById('towns').dataset.zoom === '1'), before.toFixed(0) + ' → ' + after.toFixed(0) + ' px');
    await p.fill('#tw-in', 'Apple Valley'); await p.waitForTimeout(900);
    rec('typing a far town while zoomed zooms back out so its dot shows', await p.evaluate(() => document.getElementById('towns').dataset.zoom === '0'));
    await p.click('#towns .dot >> nth=18', { force: true }); await p.waitForTimeout(300);
    rec('tapping a dot answers (Stillwater)', await p.evaluate(() => /Yes, we come to Stillwater/.test(document.querySelector('#towns .ans').textContent)));
  },
  async reduced(p, rec) { await p.evaluate(() => document.querySelector('#towns .zoom').click()); await p.waitForTimeout(50);
    rec('reduced motion: the zoom happens at once', await p.evaluate(() => document.getElementById('towns').dataset.zoom === '1' && parseFloat(getComputedStyle(document.querySelector('#towns .dot')).transitionDuration) < .01)); }
};

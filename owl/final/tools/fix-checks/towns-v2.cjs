// Towns V2 · Distance rings: true bearing and distance; the ring lights
const core = require('./_towns-core.cjs');
module.exports = {
  noMedia: true,
  async extra(p, rec) {
    await core(p, rec, { input: '#t2-in', ans: '#towns .ans' });
    rec('28 towns around the Shoreview hub, rings every 5 miles to 25', await p.evaluate(() => document.querySelectorAll('#towns .town').length === 28 && document.querySelectorAll('#towns .ring').length === 5));
    rec('true geometry: Stillwater sits east of the hub, Maple Grove west, Forest Lake north, Apple Valley south', await p.evaluate(() => { const c = n => { const e = [...document.querySelectorAll('#towns .town')].find(t => t.getAttribute('aria-label').startsWith(n)).querySelector('circle.d'); return [+e.getAttribute('cx'), +e.getAttribute('cy')]; }; const s = c('Stillwater'), m = c('Maple Grove'), f = c('Forest Lake'), a = c('Apple Valley'); return s[0] > 150 && m[0] < -150 && f[1] < -150 && a[1] > 200; }));
    await p.fill('#t2-in', 'Apple Valley'); await p.waitForTimeout(300);
    rec('the answer names the ring honestly (Apple Valley: the 25-mile ring), and that ring lights', await p.evaluate(() => /inside the 25-mile ring/.test(document.querySelector('#towns .ans').textContent) && document.querySelector('#towns .ring.lit').dataset.m === '25'));
    await p.focus('#towns .town >> nth=4'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
    rec('keyboard: Enter on a focused town answers', await p.evaluate(() => /Yes, we come to/.test(document.querySelector('#towns .ans').textContent) && !!document.querySelector('#towns .town.hit')));
  },
  async reduced(p, rec) { await p.evaluate(() => document.getElementById('towns').scrollIntoView({ behavior: 'instant' })); await p.fill('#t2-in', 'Eagan'); await p.waitForTimeout(60);
    rec('reduced motion: the ring and the dot light at once (no transition)', await p.evaluate(() => document.querySelector('#towns .ring.lit') && parseFloat(getComputedStyle(document.querySelector('#towns .ring')).transitionDuration) < .01 && parseFloat(getComputedStyle(document.querySelector('#towns .town circle.d')).transitionDuration) < .01)); }
};

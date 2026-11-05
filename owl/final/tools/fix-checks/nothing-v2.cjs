// "Nothing" V2 · Two lists: Owl's list ticks itself as you scroll; yours stays at one line. Type only, in flow.
module.exports = {
  noMedia: true,
  async extra(p, rec) {
    rec('in flow: no pinned stage (only the small “your list” card follows you)', await p.evaluate(() => { const s = document.getElementById('nothing'); return [...s.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'sticky').every(e => e.classList.contains('yours')); }));
    const at = async i => { await p.evaluate(i => { const li = document.querySelectorAll('#nothing .owl li')[i]; scrollTo(0, li.getBoundingClientRect().top + scrollY - innerHeight * .3); }, i); await p.waitForTimeout(700); return p.evaluate(() => ({ done: +document.getElementById('nothing').dataset.done, w: document.querySelector('#nothing .yours .w').textContent, t: document.querySelector('#nothing .t-owl').textContent })); };
    const a = await at(0), b = await at(2), c = await at(4);
    rec('Owl’s list ticks itself as you scroll (1 → 3 → 5 of 5); your list moves on with your day', a.done === 1 && b.done === 3 && c.done === 5 && a.w === 'Make coffee.' && c.w === 'Open the front door.' && c.t === '5 of 5', JSON.stringify([a, b, c]));
    rec('the facts on the list are Owl’s: Wise Check, Protect Your Nest, GAF Systems Plus, magnet sweep, project manager, aftercare box, 10-year warranty', await p.evaluate(() => { const t = document.querySelector('#nothing .owl').textContent; return ['Wise Check', 'Protect Your Nest', 'GAF Systems Plus', 'magnet sweep', 'project manager', 'aftercare box', '10-year workmanship warranty'].every(x => t.includes(x)); }));
    await p.evaluate(() => window.RESET.setCase('storm')); await p.waitForTimeout(200);
    rec('step 1 follows the case chosen above (storm)', await p.evaluate(() => document.querySelector('#nothing .owl li b').textContent === 'We check the storm damage first.'));
  },
  async reduced(p, rec) { await p.evaluate(() => { const li = document.querySelectorAll('#nothing .owl li')[3]; scrollTo(0, li.getBoundingClientRect().top + scrollY - innerHeight * .3); }); await p.waitForTimeout(300);
    rec('reduced motion: the ticks appear at once (no drawing)', await p.evaluate(() => +document.getElementById('nothing').dataset.done >= 4 && parseFloat(getComputedStyle(document.querySelector('#nothing .box svg')).transitionDuration) < .01)); }
};

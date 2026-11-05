// Finder V2 · Point at it: tap where you see it on the house photo; two chips for what a photo can't show
module.exports = {
  async beforeAxe(p) { await p.click('#finder .spot >> nth=1'); await p.waitForTimeout(500); },
  async extra(p, rec) {
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ behavior: 'instant' })); await p.waitForTimeout(400);
    rec('five tap points sit on the photo (roof, vent, dormer, gutter, side roof) plus two chips; every one a real button at least 44 px', await p.evaluate(() => { const s = [...document.querySelectorAll('#finder .spot')], c = [...document.querySelectorAll('#finder .chip')], pic = document.querySelector('#finder .pic').getBoundingClientRect(); return s.length === 5 && c.length === 2 && s.every(b => { const r = b.getBoundingClientRect(); return r.width >= 44 && r.height >= 44 && r.left >= pic.left - 1 && r.right <= pic.right + 1 && r.top >= pic.top - 1 && r.bottom <= pic.bottom + 1; }); }));
    await p.click('#finder .spot >> nth=2'); await p.waitForTimeout(700);
    const a = await p.evaluate(() => ({ cas: document.getElementById('finder').dataset.case, h: document.querySelector('#finder .call h3').textContent, shared: window.RESET.case(), call: !!document.querySelector('#finder .call a.btn-call[href="tel:+16519776027"]') }));
    rec('tapping the dormer answers the stain case (“we look above it”) and shares the case with the page', a.cas === 'stain' && /look above it/.test(a.h) && a.shared === 'stain' && a.call, JSON.stringify(a));
    await p.click('#finder .chip >> nth=1'); await p.waitForTimeout(700);
    rec('the chip “It’s just getting old” answers the old-roof case, naming the Wise Check and the 10-year workmanship warranty', await p.evaluate(() => document.getElementById('finder').dataset.case === 'old' && /10-year workmanship warranty/.test(document.querySelector('#finder .call').textContent)));
    rec('keyboard: Enter on a focused tap point answers', await (async () => { await p.focus('#finder .spot >> nth=4'); await p.keyboard.press('Enter'); await p.waitForTimeout(600); return p.evaluate(() => document.getElementById('finder').dataset.case === 'storm'); })());
    rec('the stock photo is tagged “Illustrative photo”', await p.evaluate(() => document.querySelector('#finder .tag').textContent === 'Illustrative photo'));
  },
  async reduced(p, rec) { await p.evaluate(() => document.getElementById('finder').scrollIntoView({ behavior: 'instant' })); await p.click('#finder .spot >> nth=0'); await p.waitForTimeout(100);
    rec('reduced motion: the answer appears at once, no pulsing rings', await p.evaluate(() => document.getElementById('finder').dataset.case === 'shingles' && getComputedStyle(document.querySelector('#finder .spot'), '::after').animationName === 'none')); }
};

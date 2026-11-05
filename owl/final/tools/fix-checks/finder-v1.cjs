// Finder V1 · Curtain: choice first, a curved curtain into the scene for your case, docked in the bar. Repaired: no photo twice.
module.exports = {
  async beforeSharp(p, f) { if (f === 0) { const g = await p.$('#finder .gate:not(.gone) .pill'); if (g) { await g.click(); await p.waitForTimeout(1600); } } },
  async beforeAxe(p) { const g = await p.$('#finder .gate:not(.gone) .pill'); if (g) { await g.click(); await p.waitForTimeout(1600); } },
  async extra(p, rec) {
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ behavior: 'instant' })); await p.waitForTimeout(400);
    rec('six cases, each pill a drawn symbol, not a photo (the dock likewise)', await p.evaluate(() => { const pills = [...document.querySelectorAll('#finder .pill')]; return pills.length === 6 && pills.every(b => b.querySelector('.ic svg') && !b.querySelector('img')) && [...document.querySelectorAll('.rbar .dock button')].every(b => !b.querySelector('img')); }));
    await p.click('#finder .pill >> nth=3'); await p.waitForTimeout(1700);
    const s = await p.evaluate(() => { const f = document.getElementById('finder'), im = f.querySelector('.arch img'); return { cas: f.dataset.case, gone: f.querySelector('.gate').classList.contains('gone'), h: f.querySelector('.sc-h').textContent, alt: im.alt, nw: im.naturalWidth, tag: f.querySelector('.ph-tag').textContent, dock: document.querySelector('.rbar .dock').classList.contains('on'), call: f.querySelector('.sc-call').classList.contains('btn-call') }; });
    rec('choosing “After a storm” lifts the curtain onto the storm scene, docks the choice in the bar, and shares the case', s.cas === 'storm' && s.gone && /Storm hit/.test(s.h) && s.dock && await p.evaluate(() => window.RESET.case() === 'storm'), JSON.stringify(s));
    rec('the scene photo is sharp stock (2000 px), described, and tagged “Illustrative photo”; the call is the copper phone action', s.nw >= 1125 && /illustrative photo/.test(s.alt) && s.tag === 'Illustrative photo' && s.call);
    await p.click('.rbar .dock button >> nth=0'); await p.waitForTimeout(1200);
    rec('the dock changes the case from anywhere (to “A leak”)', await p.evaluate(() => document.getElementById('finder').dataset.case === 'leak' && /A leak\? We’ll find it/.test(document.querySelector('#finder .sc-h').textContent)));
    rec('another section can open a case here (RESET.openCase)', await p.evaluate(() => typeof window.RESET.openCase === 'function'));
  },
  async reduced(p, rec) { await p.evaluate(() => document.getElementById('finder').scrollIntoView({ behavior: 'instant' })); await p.click('#finder .pill >> nth=2'); await p.waitForTimeout(150);
    rec('reduced motion: the choice swaps at once (no curtain animation)', await p.evaluate(() => document.querySelector('#finder .gate').classList.contains('gone') && document.getElementById('finder').dataset.case === 'shingles')); }
};

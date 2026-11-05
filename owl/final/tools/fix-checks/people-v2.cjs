// Family V2 · Prints on a table: Owl's photos as prints at their own size; tap to turn over, drag to move
module.exports = {
  async extra(p, rec) {
    await p.evaluate(() => document.getElementById('people').scrollIntoView({ behavior: 'instant' })); await p.waitForTimeout(500);
    rec('five prints of Owl’s own photos, each a real button, none wider than its photo', await p.evaluate(() => { const b = [...document.querySelectorAll('#people .print')]; return b.length === 5 && b.every(x => { const im = x.querySelector('img'); return x.tagName === 'BUTTON' && im.getBoundingClientRect().width <= im.naturalWidth + 1; }); }));
    await p.click('#people .print >> nth=4'); await p.waitForTimeout(900);
    rec('tapping the Browns’ print brings it to the front and turns it over to the names', await p.evaluate(() => { const b = document.querySelectorAll('#people .print')[4]; return b.classList.contains('turned') && b.classList.contains('top') && b.getAttribute('aria-pressed') === 'true' && /Tim Brown, co-founder/.test(b.textContent); }));
    const before = await p.evaluate(() => { const r = document.querySelectorAll('#people .print')[1].getBoundingClientRect(); return [r.left, r.top]; });
    const box = await (await p.$('#people .print >> nth=1')).boundingBox();
    await p.mouse.move(box.x + 40, box.y + 40); await p.mouse.down(); await p.mouse.move(box.x + 140, box.y + 10, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(300);
    const after = await p.evaluate(() => { const r = document.querySelectorAll('#people .print')[1].getBoundingClientRect(); return [r.left, r.top, document.querySelectorAll('#people .print')[1].classList.contains('turned')]; });
    rec('dragging moves a print (and a drag is not a tap: it does not turn over)', after[0] - before[0] > 60 && !after[2], JSON.stringify([before, after]));
    await p.focus('#people .print >> nth=2'); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
    rec('keyboard: Enter turns a print over (Noah, ladder in hand)', await p.evaluate(() => document.querySelectorAll('#people .print')[2].classList.contains('turned')));
    rec('the facts beside the table are locked ones: founded 2025 by Tim Brown and Noah Bergland, family-owned, Shoreview, GAF Systems Plus', await p.evaluate(() => /Founded in 2025 by Tim Brown and Noah Bergland/.test(document.querySelector('#people .facts').textContent) && /GAF Systems Plus certified/.test(document.querySelector('#people .facts').textContent)));
  },
  async reduced(p, rec) { await p.evaluate(() => document.getElementById('people').scrollIntoView({ behavior: 'instant' })); await p.click('#people .print >> nth=4'); await p.waitForTimeout(80);
    rec('reduced motion: the print turns at once', await p.evaluate(() => document.querySelectorAll('#people .print')[4].classList.contains('turned') && parseFloat(getComputedStyle(document.querySelector('#people .flip')).transitionDuration) < .01)); }
};

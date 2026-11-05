// Family V3 · Two names: the names set large; choosing a name opens that family's photo in a growing mask
module.exports = {
  async extra(p, rec) {
    await p.evaluate(() => document.getElementById('people').scrollIntoView({ behavior: 'instant' })); await p.waitForTimeout(900);
    rec('two names and the crew, as three buttons; Tim Brown open first', await p.evaluate(() => { const b = [...document.querySelectorAll('#people .names button')]; return b.length === 3 && b[0].textContent.startsWith('Tim Brown') && b[1].textContent.startsWith('Noah Bergland') && b[0].getAttribute('aria-pressed') === 'true'; }));
    await p.click('#people .names button >> nth=1'); await p.waitForTimeout(1000);
    rec('choosing Noah Bergland opens the Berglands and Noah on the ladder (Owl’s own photos), and closes the Browns', await p.evaluate(() => { const s = document.getElementById('people'), pn = s.querySelectorAll('.pane'); return s.dataset.name === '2' && pn[1].classList.contains('on') && !pn[0].classList.contains('on') && /Noah Bergland on a ladder/.test([...pn[1].querySelectorAll('img')].map(i => i.alt).join(' ')); }));
    await p.focus('#people .names button >> nth=2'); await p.waitForTimeout(900);
    rec('keyboard focus opens the crew', await p.evaluate(() => document.getElementById('people').dataset.name === '3'));
    rec('the footer line carries only locked facts', await p.evaluate(() => /Family-owned/.test(document.querySelector('#people .foot').textContent) && /founded 2025/.test(document.querySelector('#people .foot').textContent) && /GAF Systems Plus certified/.test(document.querySelector('#people .foot').textContent)));
  },
  async reduced(p, rec) { await p.evaluate(() => document.getElementById('people').scrollIntoView({ behavior: 'instant' })); await p.click('#people .names button >> nth=1'); await p.waitForTimeout(80);
    rec('reduced motion: the photo opens at once', await p.evaluate(() => document.querySelectorAll('#people .pane')[1].classList.contains('on') && parseFloat(getComputedStyle(document.querySelector('#people .pane')).transitionDuration) < .01)); }
};

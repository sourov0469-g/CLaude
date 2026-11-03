// Ladder interaction checks for new Explore versions (no game mechanic allowed: Explore V3 is the site's one game).
module.exports = {
  '4': async (p, S, rec) => {
    const at = async f => { await p.evaluate(([S, f]) => { const t = document.querySelector(S + ' .track'), r = t.getBoundingClientRect(), span = t.offsetHeight - innerHeight * .9; scrollTo({ top: scrollY + r.top + span * f + 2, behavior: 'instant' }); }, [S, f]); await p.waitForTimeout(500); };
    await at(0); rec('top of the pin: the finished roof, nothing lifted', await p.evaluate(S => document.querySelectorAll(S + ' .ly.off').length === 0 && document.querySelector(S + ' .ev h3').textContent === 'A finished roof', S));
    await at(3 / 6); await p.waitForTimeout(400);
    rec('half way: shingles and underlayment lifted away, the ice & water shield is the layer peeling', await p.evaluate(S => [...document.querySelectorAll(S + ' .ly.off')].map(l => l.dataset.i).sort().join() === '1,2' && document.querySelector(S + ' .ly[data-i="3"]').classList.contains('lift') && document.querySelector(S + ' .ev h3').textContent === 'Ice & water shield', S));
    await at(1); await p.waitForTimeout(400);
    rec('end of the pin: only the rafters remain', await p.evaluate(S => document.querySelectorAll(S + ' .ly.off').length === 5 && document.querySelector(S + ' .ev h3').textContent === 'Rafters', S));
    rec('roofer order top to bottom: shingles, underlayment, ice & water, drip edge, deck, rafters', await p.evaluate(S => [...document.querySelectorAll(S + ' .rail button')].slice(1).map(b => b.getAttribute('aria-label').replace('Lift to: ', '')).join('|') === 'Shingles|Underlayment|Ice & water shield|Drip edge|Roof deck|Rafters', S));
    await p.click(S + ' .rail button:nth-child(5)'); await p.waitForTimeout(1500);
    rec('a rail button jumps to its layer (aria-current)', await p.evaluate(S => document.querySelector(S + ' .rail [aria-current]').textContent === '04' && document.querySelector(S + ' .ev h3').textContent === 'Drip edge', S));
  },
  '5': async (p, S, rec) => {
    rec('six layer cards, top to bottom, first selected', await p.evaluate(S => [...document.querySelectorAll(S + ' .card')].map(c => c.getAttribute('aria-label')).join('|') === 'Shingles|Underlayment|Ice & water shield|Drip edge|Roof deck|Rafters' && document.querySelector(S + ' .card[aria-selected="true"]').id === 'ex5-c0', S));
    await p.hover(S + ' .deck'); await p.waitForTimeout(900); await p.evaluate(S => document.querySelector(S + ' #ex5-c2').click(), S); await p.waitForTimeout(500);
    rec('choosing ice & water brings it forward and states the 24 in rule with its source', await p.evaluate(S => document.querySelector(S + ' #ex5-c2').getAttribute('aria-selected') === 'true' && /24 in/.test(document.querySelector(S + ' .info').textContent) && /R905\.1\.2/.test(document.querySelector(S + ' .info').textContent), S));
    await p.focus(S + ' #ex5-c2'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(400);
    rec('arrow keys move through the layers (roving tabindex)', await p.evaluate(S => document.activeElement.id === 'ex5-c3' && document.querySelector(S + ' #ex5-c3').tabIndex === 0 && /Drip edge/.test(document.querySelector(S + ' .info h3').textContent), S));
    rec('numbers are framed as typical, not as a quote', await p.evaluate(S => /Typical values for a correct roof, not a quote/.test(document.querySelector(S).innerText), S));
  }
};

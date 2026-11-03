// Ladder interaction checks for new Reviews versions (rating stated only as 5.0 · 90+ reviews; no quotes or names).
module.exports = {
  '4': async (p, S, rec, txt) => {
    rec('rating stated as 5.0 from 90+ reviews; no quotes', /5\.0 from 90\+ reviews/.test(txt) && !/[“"][^”"]{12,}[”"]/.test(txt));
    await p.waitForTimeout(3600);
    rec('five stars drew and filled', await p.evaluate(S => document.querySelector(S + ' .stars').classList.contains('go') && document.querySelectorAll(S + ' .st').length === 5 && getComputedStyle(document.querySelectorAll(S + ' .st .f')[4]).transform !== 'matrix(0, 0, 0, 0, 0, 0)', S));
    rec('each star holds a locked proof (5.0, 90+, A−, GAF, 10-yr)', await p.evaluate(S => [...document.querySelectorAll(S + ' .st b')].map(b => b.textContent).join('|') === '5.0|90+|A−|GAF|10-yr', S));
    await p.focus(S + ' #rv4-t1'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
    rec('arrow keys move along the stars and read each line', await p.evaluate(S => document.activeElement.id === 'rv4-t2' && /Better Business Bureau/.test(document.querySelector(S + ' .line').textContent) && !/Accredited/.test(document.querySelector(S + ' .line').textContent), S));
  },
  '5': async (p, S, rec, txt) => {
    rec('rating stated as 5.0 from 90+ reviews; proof chips are the locked wording', /5\.0 from 90\+ reviews/.test(txt) && /BBB A−/.test(txt) && /GAF Systems Plus Certified/.test(txt) && /BC809662/.test(txt));
    rec('the 5.0 is filled with shingle courses inside the glyphs', await p.evaluate(S => document.querySelectorAll(S + ' g[clip-path] rect').length > 100, S));
    const b = await p.evaluate(S => { const r = document.querySelector(S + ' .obj').getBoundingClientRect(); return { x: r.left + r.width * .9, y: r.top + r.height * .2 }; }, S);
    await p.mouse.move(b.x, b.y, { steps: 4 }); await p.waitForTimeout(300);
    rec('the object tilts toward the pointer (small 3D)', await p.evaluate(S => parseFloat(document.querySelector(S + ' .tilt').style.getPropertyValue('--ry')) > 5, S));
  },
  '6': async (p, S, rec, txt) => {
    rec('the only rating is 5.0 from 90+ reviews; no quotes or names', /5\.0/.test(txt) && /90\+ reviews/.test(txt) && !/[“"]/.test(txt.replace(/“[^”]*”/g, '')) && !/\b\d\.\d\b(?<!5\.0)/.test(txt.replace(/5\.0/g, '')));
    rec('the locked proofs: BBB A− since Feb 25, 2026; GAF Systems Plus; licence; 10-year warranty', /BBB A− since Feb 25, 2026/.test(txt) && /GAF Systems Plus/.test(txt) && /#BC809662/.test(txt) && /10-year workmanship warranty/.test(txt));
    await p.waitForTimeout(2500);
    rec('at rest the level is level and the bubble is centred', await p.evaluate(S => { const t = document.querySelector(S + ' .lv').getAttribute('transform'), a = +t.match(/rotate\(([-\d.]+)/)[1], b = +document.querySelector(S + ' .bub').getAttribute('cx'); return Math.abs(a) < .3 && Math.abs(b - 500) < 4; }, S));
    const r = await p.evaluate(S => { const b = document.querySelector(S + ' .bench').getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; }, S);
    await p.mouse.move(r[0] + r[2] * .5, r[1] + r[3] / 2); await p.mouse.move(r[0] + r[2] * .98, r[1] + r[3] / 2, { steps: 8 }); await p.waitForTimeout(900);
    rec('the pointer tilts it and the bubble runs to the high end', await p.evaluate(S => { const a = +document.querySelector(S + ' .lv').getAttribute('transform').match(/rotate\(([-\d.]+)/)[1], b = +document.querySelector(S + ' .bub').getAttribute('cx'); return a > 3 && b < 470; }, S));
    rec('the reading stays 5.0 while it tips', await p.evaluate(S => document.querySelector(S + ' .big').textContent === '5.0' && /Still 5\.0/.test(document.querySelector(S + ' .say').textContent), S));
    await p.mouse.move(r[0] + r[2] * .5, r[1] - 400, { steps: 4 }); await p.waitForTimeout(200);
    await p.evaluate(S => document.querySelector(S).dispatchEvent(new PointerEvent('pointerleave')), S); await p.waitForTimeout(3200);
    rec('let go and it settles back dead level', await p.evaluate(S => { const a = +document.querySelector(S + ' .lv').getAttribute('transform').match(/rotate\(([-\d.]+)/)[1], b = +document.querySelector(S + ' .bub').getAttribute('cx'); return Math.abs(a) < .3 && Math.abs(b - 500) < 4 && document.querySelector(S + ' .say').textContent === 'It sits level.'; }, S));
    await p.click(S + ' .nudge'); await p.waitForTimeout(350);
    rec('Give It a Nudge tips it for keyboard and touch too', await p.evaluate(S => Math.abs(+document.querySelector(S + ' .lv').getAttribute('transform').match(/rotate\(([-\d.]+)/)[1]) > 1, S));
  },
  '7': async (p, S, rec, txt) => {
    await p.waitForTimeout(7000);
    rec('ninety review shingles plus cut rake pieces that are not counted', await p.evaluate(S => document.querySelectorAll(S + ' .sh:not(.cut)').length === 90 && document.querySelectorAll(S + ' .sh.cut').length === 3, S));
    rec('laid in full: counter reads 90+, the ridge reads 5.0 · 90+ reviews', await p.evaluate(S => document.querySelector(S + ' .count b').textContent === '90+' && +document.querySelector(S + ' .badge').getAttribute('opacity') > .99 && /5\.0 · 90\+ reviews/.test(document.querySelector(S + ' .badge text').textContent) && [...document.querySelectorAll(S + ' .sh')].every(s => +s.getAttribute('opacity') > .99), S));
    rec('roofer order: starter first, courses from the eave up, each course lapping the one below', await p.evaluate(S => { const sh = [...document.querySelectorAll(S + ' .sh rect:first-child')].map(r => +r.getAttribute('y')); for (let i = 1; i < sh.length; i++) if (sh[i] > sh[i - 1] + .5) return false; return !!document.querySelector(S + ' .starter'); }, S));
    rec('the ridge cap covers the top course nails', await p.evaluate(S => { const topNail = Math.min(...[...document.querySelectorAll(S + ' .sh circle')].map(c => +c.getAttribute('cy'))); return topNail < 8 + 78; }, S));
    await p.click(S + ' .again'); await p.waitForTimeout(1600);
    rec('Lay It Again replays from the eave with the counter climbing', await p.evaluate(S => { const n = +document.querySelector(S + ' .count b').textContent; return n > 5 && n < 90 && +document.querySelector(S + ' .badge').getAttribute('opacity') === 0; }, S));
    rec('it says no shingle stands for a quote', /none stands for a quote/.test(txt));
  }
};

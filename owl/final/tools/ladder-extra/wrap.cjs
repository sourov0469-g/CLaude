// Ladder interaction checks for new Protect Your Nest versions (truth: the wrap, three cleanup passes, the aftercare box; no storm story).
module.exports = {
  '4': async (p, S, rec, txt) => {
    rec('tells the system truthfully (wrap, three passes, box; no storm)', /wrap/i.test(txt) && /three cleanup passes/i.test(txt) && /aftercare box/i.test(txt) && !/storm|hail|shield/i.test(txt));
    const shot = () => p.evaluate(S => { const c = document.querySelector(S + ' canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let h = 0; for (let i = 0; i < d.length; i += 64) h = (h * 31 + d[i]) % 1e9; return h; }, S);
    await p.waitForTimeout(500); const a = await shot();
    const b = await p.evaluate(S => { const r = document.querySelector(S + ' .stage').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }, S);
    await p.mouse.move(b.x + b.w * .3, b.y + b.h * .6); await p.mouse.move(b.x + b.w * .7, b.y + b.h * .65, { steps: 12 }); await p.waitForTimeout(200);
    rec('the mesh moves where the pointer blows across it', (await shot()) !== a);
  },
  '5': async (p, S, rec, txt) => {
    rec('tells the system truthfully (wrap, three passes, box; no storm)', /wrap/i.test(txt) && /three cleanup passes/i.test(txt) && /aftercare box/i.test(txt) && !/storm|hail|shield/i.test(txt));
    await p.waitForTimeout(3600);
    rec('the nest weaves itself and the owl settles in', await p.evaluate(S => document.querySelector(S + ' .art').classList.contains('woven') && document.querySelectorAll(S + ' .band').length === 6, S));
    await p.click(S + ' #pn5-t1'); await p.waitForTimeout(400);
    rec('choosing the middle weave lifts it and tells the three passes in Owl\'s words', await p.evaluate(S => [...document.querySelectorAll(S + ' .band.on')].every(g => g.dataset.k === '1') && document.querySelectorAll(S + ' .band.on').length === 2 && /magnet/.test(document.querySelector(S + ' .say').textContent) && /project manager/.test(document.querySelector(S + ' .say').textContent), S));
    await p.focus(S + ' #pn5-t1'); await p.keyboard.press('ArrowDown');
    rec('arrow keys rove to the lining (the aftercare box)', await p.evaluate(S => document.activeElement.id === 'pn5-t2' && /Left with you/.test(document.querySelector(S + ' .say').textContent), S));
  },
  '6': async (p, S, rec, txt) => {
    rec('truth: names the wrap, three passes and the box; no storm, hail or shield', /wrap/i.test(txt) && /magnet sweep/i.test(txt) && /project manager/i.test(txt) && /aftercare box/i.test(txt) && !/storm|hail|shield/i.test(txt));
    rec('the starting state is the wrap: tarp down, strays past it', await p.evaluate(S => document.querySelector(S + ' .tarp').getAttribute('opacity') === '1' && [...document.querySelectorAll(S + ' .nail')].every(n => n.getAttribute('opacity') === '1') && document.querySelector(S + ' .cap h3').textContent === 'The wrap', S));
    await p.click(S + ' .key >> nth=0'); await p.waitForTimeout(2600);
    rec('pass 1: the tarp comes up and the stray bits go to the bag', await p.evaluate(S => document.querySelector(S + ' .tarp').getAttribute('opacity') === '0' && [...document.querySelectorAll(S + ' .bit')].every(b => b.getAttribute('opacity') === '0') && document.querySelector(S + ' .bag').getAttribute('opacity') === '1', S));
    rec('…while the nails are still in the grass', await p.evaluate(S => [...document.querySelectorAll(S + ' .nail')].every(n => n.getAttribute('opacity') === '1'), S));
    await p.click(S + ' .key >> nth=1'); await p.waitForTimeout(1400);
    rec('pass 2: the magnet is rolling across the lawn and nails are lifting to it', await p.evaluate(S => { const m = document.querySelector(S + ' .mag').getAttribute('transform').match(/translate\(([-\d.]+)/); const lifted = [...document.querySelectorAll(S + ' .nail')].filter(n => /rotate\((8\d|90)\)/.test(n.getAttribute('transform'))).length; return +m[1] > 0 && +m[1] < 1000 && lifted > 0; }, S));
    await p.waitForTimeout(2800);
    rec('after the sweep no nail is left in the lawn, but the one under the shrub is', await p.evaluate(S => [...document.querySelectorAll(S + ' .nail')].every(n => n.getAttribute('opacity') === '0') && document.querySelector(S + ' .hid').getAttribute('opacity') === '1', S));
    await p.click(S + ' .key >> nth=2'); await p.waitForTimeout(4300);
    rec('pass 3: footsteps cross the yard and the manager finds the last one', await p.evaluate(S => [...document.querySelectorAll(S + ' .fp')].every(f => +f.getAttribute('opacity') > .2) && document.querySelector(S + ' .hid').getAttribute('opacity') === '0' && document.querySelector(S + ' .ok').getAttribute('opacity') === '1', S));
    await p.click(S + ' .key >> nth=3'); await p.waitForTimeout(1400);
    rec('the aftercare box is set down on the step, in Owl\'s words', await p.evaluate(S => document.querySelector(S + ' .box').getAttribute('transform') === 'translate(122 118)' && document.querySelector(S + ' .cap p').textContent === 'Left with you when the crew goes.', S));
    rec('pressed and done states follow the passes', await p.evaluate(S => document.querySelectorAll(S + ' .key[aria-pressed="true"]').length === 1 && document.querySelectorAll(S + ' .key.done').length === 3, S));
    rec('the drawing is labelled as not a count from a real job', /not a count from a real job/.test(txt));
  },
  '7': async (p, S, rec, txt) => {
    await p.waitForTimeout(1600);
    rec('truth: the wrap, three passes and the box in Owl\'s words; no storm, hail or shield', await p.evaluate(S => { const t = document.querySelector(S).textContent; return /Mesh from the eaves down, and a tarp over the lawn/.test(t) && /The crew, a magnet sweep, then the project manager/.test(t) && /Left with you when the crew goes/.test(t) && !/storm|hail|shield/i.test(t); }, S));
    rec('chapter 01 opens on view: its cover splits apart', await p.evaluate(S => { const c = document.querySelector(S + ' .ch'); const l = getComputedStyle(c.querySelector('.half.l')).transform; return c.classList.contains('open') && c.querySelector('.cover').getAttribute('aria-expanded') === 'true' && l !== 'none'; }, S));
    rec('the open chapter is wider than the closed ones', await p.evaluate(S => { const w = [...document.querySelectorAll(S + ' .ch')].map(c => c.getBoundingClientRect().width); return w[0] > w[1] * 2; }, S));
    await p.click(S + ' .ch:nth-child(2) .cover'); await p.waitForTimeout(1400);
    rec('opening chapter 02 closes 01 (one open at a time)', await p.evaluate(S => { const c = [...document.querySelectorAll(S + ' .ch')]; return c[1].classList.contains('open') && !c[0].classList.contains('open') && c.filter(x => x.classList.contains('open')).length === 1; }, S));
    rec('closed chapters keep their content out of reach (inert)', await p.evaluate(S => document.querySelector(S + ' .ch:nth-child(1) .inner').hasAttribute('inert') && !document.querySelector(S + ' .ch:nth-child(2) .inner').hasAttribute('inert'), S));
    rec('chapter 02 lists the three passes in order', await p.evaluate(S => [...document.querySelectorAll(S + ' .ch:nth-child(2) li')].map(l => l.textContent.replace(/^\d/, '')).join('|') === 'The crew|A magnet sweep|The project manager’s walk-through', S));
    await p.focus(S + ' .ch:nth-child(2) .cover'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('Enter'); await p.waitForTimeout(1400);
    rec('arrow then Enter opens chapter 03 (the box)', await p.evaluate(S => document.querySelector(S + ' .ch:nth-child(3)').classList.contains('open') && document.activeElement.id === 'pn7-b2', S));
  },
  '8': async (p, S, rec, txt) => {
    rec('truth: the wrap, three passes and the box in Owl’s words; no storm, hail or shield', /Pass 1: the crew/.test(txt) && /Pass 2: a magnet sweep/.test(txt) && /Pass 3: the project manager/.test(txt) && /Aftercare box: left with you/.test(txt) && /Mesh from the eaves down, and a tarp over the lawn/.test(txt) && !/storm|hail|shield/i.test(txt));
    await p.waitForTimeout(3600);
    rec('seven lines in order, each ticked in marker when the board is seen', await p.evaluate(S => { const l = [...document.querySelectorAll(S + ' .ln')]; return l.length === 7 && l.every(b => b.classList.contains('done')) && l[0].querySelector('.t').textContent === 'Wrap goes up' && l[6].querySelector('.t').textContent === 'Aftercare box: left with you'; }, S));
    await p.click(S + ' .ln >> nth=4'); await p.waitForTimeout(400);
    rec('choosing a line underlines it and pins its note', await p.evaluate(S => document.querySelectorAll(S + ' .ln[aria-pressed="true"]').length === 1 && document.querySelector(S + ' .note h3').textContent === 'Pass 2: a magnet sweep' && /Step 5 of 7/.test(document.querySelector(S + ' .note .k').textContent), S));
    await p.click(S + ' .wipe'); await p.waitForTimeout(700);
    rec('Wipe and Run Again erases the ticks…', await p.evaluate(S => document.querySelectorAll(S + ' .ln.done').length < 7, S));
    await p.waitForTimeout(3800);
    rec('…and ticks them again in order', await p.evaluate(S => document.querySelectorAll(S + ' .ln.done').length === 7, S));
  },
  '9': async (p, S, rec, txt) => {
    await p.waitForTimeout(3500);
    rec('truth: the three inside panels in Owl’s words; no storm, hail or shield', await p.evaluate(S => { const t = document.querySelector(S).textContent; return /Mesh from the eaves down, and a tarp over the lawn/.test(t) && /The crew, a magnet sweep, then the project manager/.test(t) && /Left with you when the crew goes/.test(t) && !/storm|hail|shield/i.test(t); }, S));
    rec('the leaflet unfolds when seen: both flaps flat, the key says Fold It', await p.evaluate(S => { const lf = document.querySelector(S + ' .lf'); return lf.classList.contains('open') && getComputedStyle(document.querySelector(S + ' .pn.r')).getPropertyValue('--r').trim() !== '-180deg' && document.querySelector(S + ' .tog').getAttribute('aria-expanded') === 'true' && document.querySelector(S + ' .tog').textContent === 'Fold It'; }, S));
    rec('the cover carries only locked facts', await p.evaluate(S => /Protect Your Nest System/.test(document.querySelector(S + ' .cover').textContent) && /Shoreview, MN/.test(document.querySelector(S + ' .cover').textContent) && /\(651\) 977-6027/.test(document.querySelector(S + ' .backp').textContent), S));
    await p.click(S + ' .tog'); await p.waitForTimeout(1900);
    rec('Fold It folds it back to the cover and hides the inside from readers', await p.evaluate(S => document.querySelector(S + ' .lf').classList.contains('shut') && [...document.querySelectorAll(S + ' .face.in')].every(f => f.getAttribute('aria-hidden') === 'true') && document.querySelector(S + ' .tog').textContent === 'Open It', S));
    await p.click(S + ' .tog'); await p.waitForTimeout(1900);
    rec('Open It opens it again', await p.evaluate(S => document.querySelector(S + ' .lf').classList.contains('open'), S));
  },
  '10': async (p, S, rec, txt) => {
    await p.mouse.move(2, 2);
    await p.evaluate(S => document.querySelector(S).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(1500);
    const st = () => p.evaluate(S => { const r = document.querySelector(S), c = r.querySelector('.ctr'); return { left: +r.dataset.left, done: r.dataset.done, stuck: r.querySelectorAll('.stuck i').length, loose: r.querySelectorAll('.nl:not(.gone)').length, hint: !r.querySelector('.hint').classList.contains('gone'), btn: r.querySelector('.aux button').textContent, msg: r.querySelector(c.classList.contains('done') ? '.msg .b' : '.msg .a').textContent.trim() }; }, S);
    let s = await st();
    rec('starts with 24 drawn nails in the lawn, the magnet resting with "Drag the magnet", "Move the magnet over the lawn."', s.left === 24 && s.loose === 24 && s.stuck === 0 && s.hint && s.done === 'no' && s.msg === 'Move the magnet over the lawn.' && s.btn === 'Sweep it for me');
    const bb = await p.locator(S + ' .lawn').boundingBox();
    await p.mouse.move(bb.x + bb.width * .08, bb.y + bb.height * .6); await p.mouse.move(bb.x + bb.width * .5, bb.y + bb.height * .65, { steps: 25 }); await p.waitForTimeout(500); s = await st();
    rec('mouse: the magnet follows the pointer and the nails near it jump up and hang from its tips; the hint goes', s.stuck > 0 && s.left < 24 && s.left === s.loose && !s.hint && s.done === 'no');
    for (let row = 0; row < 4; row++) { const y = bb.y + bb.height * (.58 + row * .12); await p.mouse.move(bb.x + 10, y); await p.mouse.move(bb.x + bb.width - 10, y, { steps: 26 }); }
    await p.mouse.move(2, 2); await p.waitForTimeout(2200); s = await st();
    rec('past 80 % the rest fly in by themselves: "Not a nail left." with the three cleanup passes', s.done === 'yes' && s.left === 0 && s.stuck === 24 && /^Not a nail left\./.test(s.msg) && /pass two of our three cleanup passes: the crew clears up, a magnet sweeps the lawn, then the project manager walks it last/.test(s.msg) && s.btn === 'Scatter them again');
    await p.click(S + ' .aux button'); await p.waitForTimeout(300); s = await st();
    rec('"Scatter them again" puts all 24 back', s.done === 'no' && s.left === 24 && s.stuck === 0 && s.btn === 'Sweep it for me');
    await p.focus(S + ' .aux button'); await p.keyboard.press('Enter'); await p.waitForTimeout(3400); s = await st();
    rec('keyboard: "Sweep it for me" sweeps the whole lawn on its own', s.done === 'yes' && s.left === 0 && s.stuck === 24);
    rec('touch: the lawn still scrolls the page (pan-y); only the magnet itself takes a drag (touch-action none)', await p.evaluate(S => getComputedStyle(document.querySelector(S + ' .lawn')).touchAction === 'pan-y' && getComputedStyle(document.querySelector(S + ' .mag')).touchAction === 'none', S));
    rec('no count, timer or score anywhere (not a game)', await p.evaluate(S => !/\b\d+\s*(of|\/)\s*\d+\b|score|points|seconds|timer/i.test(document.querySelector(S).innerText), S));
    rec('labelled: "Illustrative photo; drawn nails"', /Illustrative photo; drawn nails/.test(txt) || await p.evaluate(S => /Illustrative photo; drawn nails/.test(document.querySelector(S + ' .lab').textContent), S));
    rec('Protect Your Nest facts only (three cleanup passes as the site states them); no construction words other than the homeowner’s "nail"', await p.evaluate(S => { const t = document.querySelector(S).textContent; return /Protect Your Nest System/.test(t) && !/underlayment|decking|ventilation|rafter|granule|flashing|shingle/i.test(t) && !/\bfree\b|\$\s?\d|guarantee|every job/i.test(t); }, S));
    rec('next steps: Get My Roof Checked (#book) and the real phone', await p.evaluate(S => { const b = document.querySelector(S + ' .acts .btn-amber'); return b.getAttribute('href') === '#book' && /Get My Roof Checked/.test(b.textContent) && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027'; }, S));
  }
};

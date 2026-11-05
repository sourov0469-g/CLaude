module.exports = { sharpAt: [0],
  async extra(p, rec, c) {
    const S = c.SELF;
    await p.evaluate(s => document.querySelector(s + ' .field').scrollIntoView({ block: 'center', behavior: 'instant' }), S); await p.waitForTimeout(2000);
    const a = await p.evaluate(s => { const e = document.querySelector(s); const t = e.querySelector('.card').textContent.replace(/\s+/g, ' '); return { marks: +e.querySelector('.field').dataset.marks, stars: e.querySelectorAll('.stars svg').length, sr: e.querySelector('.sr').textContent, big: e.querySelector('.big').textContent, cnt: e.querySelector('.cnt').textContent, h2: e.querySelector('h2').textContent, proof: [...e.querySelectorAll('.proof li')].map(l => l.textContent), quotes: /[“”"]/.test(t), cta: !!e.querySelector('a[href="#book"]'), hint: e.querySelector('.hint .ht').textContent }; }, S);
    rec('the card: five stars, 5.0, "90+ reviews", the heading, three proofs, one action', a.stars === 5 && a.big === '5.0' && a.cnt === '90+ reviews' && /Ninety-Plus and Counting/.test(a.h2) && JSON.stringify(a.proof) === JSON.stringify(['BBB A−', 'GAF Systems Plus', '10-year workmanship warranty']) && a.cta, JSON.stringify(a));
    rec('screen readers get "Rated 5.0 from 90+ reviews."', a.sr === 'Rated 5.0 from 90+ reviews.', a.sr);
    rec('no review is quoted or invented', !a.quotes);
    rec('all 91 marks (90 feathers and a plus) are placed in view, clear of the card', a.marks === 91, String(a.marks));
    const st = await p.evaluate(s => [...document.querySelectorAll(s + ' .stars svg')].map(v => getComputedStyle(v).transform), S);
    rec('the stars have filled in', st.every(t => t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)'), st.join(' | ').slice(0, 120));
    await p.screenshot({ path: c.OUT + '/card.png' });
    // water: a splash lifts feathers (amber pixels appear on the canvas)
    const amber = () => p.evaluate(s => { const cv = document.querySelector(s + ' canvas'), g = cv.getContext('2d'), d = g.getImageData(0, 0, cv.width, cv.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 120 && d[i] > 150 && d[i + 1] > 90 && d[i + 2] < 90) n++; return n; }, S);
    await p.waitForTimeout(4200); const n0 = await amber();
    const b = await p.evaluate(s => { const r = document.querySelector(s + ' .field').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, S);
    await p.mouse.click(b[0] + 90, b[1] + 120); await p.waitForTimeout(260); const n1 = await amber();
    rec('touching the water sends a ripple that lifts feathers', n1 > n0 + 20, n0 + ' -> ' + n1);
    const hg = await p.evaluate(s => document.querySelector(s + ' .hint').classList.contains('gone'), S);
    rec('the hint "Touch the water" goes away once touched', hg);
    await p.mouse.move(b[0] + b[2] * .9, b[1] + b[3] * .5, { steps: 6 }); await p.waitForTimeout(900);
    const ry = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .card')).transform, S);
    rec('the card leans toward the pointer', ry !== 'none' && ry !== 'matrix(1, 0, 0, 1, 0, 0)', ry.slice(0, 80));
    await p.screenshot({ path: c.OUT + '/water.png' });
  },
  async reduced(p, rec, c) {
    const r = await p.evaluate(s => { const e = document.querySelector(s); return { marks: +e.querySelector('.field').dataset.marks, tr: getComputedStyle(e.querySelector('.stars svg')).transform }; }, c.SELF);
    rec('reduced motion: all marks placed, stars already filled, no tilt', r.marks === 91 && (r.tr === 'none' || r.tr === 'matrix(1, 0, 0, 1, 0, 0)'), JSON.stringify(r));
  } };

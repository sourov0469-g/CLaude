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
  }
};

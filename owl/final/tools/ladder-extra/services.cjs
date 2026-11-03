// Ladder interaction checks for new Services versions.
module.exports = {
  '4': async (p, S, rec) => {
    rec('five services from the shared list, each with a zone on the house', await p.evaluate(S => document.querySelectorAll(S + ' [role=tab]').length === OWL.SVC.length && OWL.SVC.every(s => document.querySelector(S + ' .zone[data-k="' + s.k + '"]')), S));
    const z = await p.evaluate(S => { const r = document.querySelector(S + ' .zone[data-k="siding"] .hl').getBoundingClientRect(); return { x: r.left + r.width * .1, y: r.top + r.height * .8 }; }, S);
    await p.mouse.move(z.x, z.y); await p.waitForTimeout(300);
    rec('pointing at the walls opens Siding and highlights the walls', await p.evaluate(S => document.querySelector(S + ' .zone[data-k="siding"]').classList.contains('on') && document.querySelector(S + ' .card h3').textContent === 'Siding', S));
    await p.focus(S + ' #sv4-t0'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(200);
    rec('the key list roves with arrows and moves the highlight (Roof Repair)', await p.evaluate(S => document.activeElement.id === 'sv4-t1' && document.querySelector(S + ' .zone[data-k="repair"]').classList.contains('on') && document.querySelectorAll(S + ' .card li').length === OWL.SVC[1].inc.length, S));
  },
  '5': async (p, S, rec) => {
    const at = async f => { await p.evaluate(([S, f]) => { const t = document.querySelector(S + ' .track'), r = t.getBoundingClientRect(), span = t.offsetHeight - innerHeight * .9; scrollTo({ top: scrollY + r.top + span * f + 2, behavior: 'instant' }); }, [S, f]); await p.waitForTimeout(500); };
    await at(.003); rec('pin start: service 1 small, its name in ink on cream', await p.evaluate(S => document.querySelector(S + ' .rail [aria-current]').textContent === '01' && document.querySelector(S + ' .big').style.color === 'rgb(23, 17, 29)', S));
    await at(.19); rec('photo grows to fill the frame; the name turns cream over it', await p.evaluate(S => { const m = /scale\(([\d.]+)\)/.exec(document.querySelectorAll(S + ' .ph')[0].style.transform); return m && +m[1] > .95 && document.querySelector(S + ' .big').style.color === 'rgb(251, 250, 246)'; }, S));
    await at(.7); rec('later in the pin: service 4, Wise Check Inspections', await p.evaluate(S => document.querySelector(S + ' .rail [aria-current]').textContent === '04' && document.querySelector(S + ' .tx h3').textContent === OWL.SVC[3].n, S));
    rec('each photo is Owl\'s service photo with a truthful alt', await p.evaluate(S => [...document.querySelectorAll(S + ' .ph img')].every(i => i.src.startsWith('data:image') && i.alt.length > 8), S));
  }
};

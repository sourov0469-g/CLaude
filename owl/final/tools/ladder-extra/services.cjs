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
  },
  '6': async (p, S, rec) => {
    rec('five cards, each Owl\'s own name, line and photo', await p.evaluate(S => { const c = [...document.querySelectorAll(S + ' .card')]; return c.length === 5 && c.every((x, i) => x.querySelector('h3').textContent === OWL.SVC.find(s => s.k === x.dataset.k).n && x.querySelector('p').textContent === OWL.SVC.find(s => s.k === x.dataset.k).d && x.querySelector('img').src.startsWith('data:image')); }, S));
    await p.click(S + ' .key >> nth=0'); await p.waitForTimeout(900);
    rec('a leak or a stain: Roof Repair first, Wise Check second', await p.evaluate(S => { const c = [...document.querySelectorAll(S + ' .card')]; return c[0].dataset.k === 'repair' && c[0].classList.contains('first') && c[1].dataset.k === 'check' && c[1].classList.contains('second'); }, S));
    rec('the first card opens with what is included', await p.evaluate(S => getComputedStyle(document.querySelector(S + ' .card.first ul')).display === 'block', S));
    await p.click(S + ' .key >> nth=1'); await p.waitForTimeout(900);
    rec('shingles down after a storm: Storm Damage Help first', await p.evaluate(S => document.querySelector(S + ' .card').dataset.k === 'storm' && /start with Storm Damage Help/.test(document.querySelector(S + ' .status').textContent), S));
    await p.focus(S + ' .key >> nth=1'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter'); await p.waitForTimeout(900);
    rec('arrow and Enter: an older roof puts the Wise Check first', await p.evaluate(S => document.querySelector(S + ' .card').dataset.k === 'check' && document.querySelectorAll(S + ' .key[aria-pressed="true"]').length === 1, S));
    rec('it says it is a guide, not a diagnosis', await p.evaluate(S => /A guide, not a diagnosis/.test(document.querySelector(S).innerText), S));
  },
  '7': async (p, S, rec) => {
    rec('five stops in a roof\'s life, no years claimed', await p.evaluate(S => { const w = [...document.querySelectorAll(S + ' .when')].map(x => x.textContent); return w.join('|') === 'Day one|After a storm|When something leaks|Every so often|When the walls are next' && !/\b\d+\s*(years?|yrs)\b/i.test(w.join(' ')); }, S));
    rec('each stop carries Owl\'s own service words', await p.evaluate(S => [...document.querySelectorAll(S + ' .stop')].every(s => { const d = OWL.SVC.find(x => x.k === s.dataset.k); return s.querySelector('h3').textContent === d.n && s.querySelector('.tx p').textContent === d.d; }), S));
    const go = k => p.evaluate(([S, k]) => { const t = document.querySelector(S + ' .tl'), b = t.getBoundingClientRect(); scrollTo({ top: scrollY + b.top - (innerHeight * .55 - k * b.height), behavior: 'instant' }); }, [S, k]);
    await go(0.02); await p.waitForTimeout(1200);
    rec('at the top nothing is lit and photos are closed', await p.evaluate(S => document.querySelectorAll(S + ' .stop.on').length === 0, S));
    await go(0.5); await p.waitForTimeout(1600);
    rec('halfway: the spine is half drawn and the first stops are lit', await p.evaluate(S => { const pv = +getComputedStyle(document.querySelector(S + ' .spine')).getPropertyValue('--p'); const n = document.querySelectorAll(S + ' .stop.on').length; return Math.abs(pv - .5) < .05 && n >= 2 && n <= 3; }, S));
    rec('the badge rides the spine and shows the current stop', await p.evaluate(S => { const b = document.querySelector(S + ' .badge'); return +b.dataset.s === document.querySelectorAll(S + ' .stop.on').length - 1 && parseFloat(b.style.getPropertyValue('--by')) > 100; }, S));
    await go(1); await p.waitForTimeout(1800);
    rec('the end: all five lit, the badge shows new siding', await p.evaluate(S => document.querySelectorAll(S + ' .stop.on').length === 5 && document.querySelector(S + ' .badge').dataset.s === '4', S));
    rec('each photo is Owl\'s service photo with a truthful alt', await p.evaluate(S => [...document.querySelectorAll(S + ' .ph img')].every(i => i.src.startsWith('data:image') && i.alt.length > 8), S));
  },
  '8': async (p, S, rec) => {
    rec('five rows, Owl’s names and words; the first is open', await p.evaluate(S => { const r = [...document.querySelectorAll(S + ' .rw')]; return r.length === 5 && r.every((b, i) => b.querySelector('.nm').textContent === OWL.SVC[i].n) && r[0].getAttribute('aria-expanded') === 'true' && document.querySelector(S + ' #sv8-d0 p').textContent === OWL.SVC[0].d; }, S));
    rec('closed rows keep their details out of reach (inert)', await p.evaluate(S => [1, 2, 3, 4].every(i => document.querySelector(S + ' #sv8-d' + i).hasAttribute('inert')), S));
    const b = await p.evaluate(S => { const r = document.querySelectorAll(S + ' .rw')[2].getBoundingClientRect(); return [r.left + r.width * .4, r.top + r.height / 2]; }, S);
    await p.mouse.move(b[0] - 100, b[1]); await p.mouse.move(b[0], b[1], { steps: 8 }); await p.waitForTimeout(900);
    rec('pointing at a row floats that service’s own photo beside the cursor', await p.evaluate(S => { const f = document.querySelector(S + ' .flo'); return f.classList.contains('on') && f.querySelectorAll('img.on').length === 1 && f.querySelectorAll('img')[2].classList.contains('on') && f.querySelector('img.on').src.startsWith('data:image'); }, S));
    await p.click(S + ' .rw >> nth=3'); await p.waitForTimeout(700);
    rec('opening a row closes the others and shows what is included', await p.evaluate(S => { const r = [...document.querySelectorAll(S + ' .rw')]; return r[3].getAttribute('aria-expanded') === 'true' && r.filter(x => x.getAttribute('aria-expanded') === 'true').length === 1 && document.querySelectorAll(S + ' #sv8-d3 li').length === OWL.SVC[3].inc.length && !document.querySelector(S + ' #sv8-d3').hasAttribute('inert'); }, S));
    await p.click(S + ' .rw >> nth=3'); await p.waitForTimeout(400);
    rec('the same row closes again', await p.evaluate(S => document.querySelectorAll(S + ' .rw[aria-expanded="true"]').length === 0, S));
  },
  '9': async (p, S, rec) => {
    rec('five cards with Owl’s own photos and words', await p.evaluate(S => { const c = [...document.querySelectorAll(S + ' .crd')]; return c.length === 5 && c.every((x, i) => x.querySelector('h3').textContent === OWL.SVC[i].n && x.querySelector('p').textContent === OWL.SVC[i].d && x.querySelector('img').src.startsWith('data:image') && x.querySelector('img').alt.length > 8); }, S));
    const go = k => p.evaluate(([S, k]) => { const l = document.querySelector(S + ' .stk'), b = l.getBoundingClientRect(); scrollTo({ top: scrollY + b.top + (l.offsetHeight - innerHeight) * k, behavior: 'instant' }); }, [S, k]);
    await go(0.7); await p.waitForTimeout(900);
    rec('cards pin and stack: earlier cards sit stacked at the top', await p.evaluate(S => { const s = [...document.querySelectorAll(S + ' .slot')].map(x => x.getBoundingClientRect().top); return s[0] < 140 && s[1] < 160 && Math.abs(s[1] - s[0] - 18) < 6; }, S));
    rec('covered cards settle back (smaller, dimmer)', await p.evaluate(S => { const c = document.querySelector(S + ' .crd'); return +c.style.getPropertyValue('--s') < .97 && +c.style.getPropertyValue('--b') < .95; }, S));
    await go(0); await p.waitForTimeout(700);
    rec('scrolling back restores the top card', await p.evaluate(S => +document.querySelector(S + ' .crd').style.getPropertyValue('--s') > .99, S));
  }
};

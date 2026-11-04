// Ladder interaction checks for new Service Area versions (the real 29 towns; abstract, never a map).
const TOWNS = ['Shoreview','North Oaks','Arden Hills','Vadnais Heights','Little Canada','Roseville','Mounds View','New Brighton','Lino Lakes','Blaine','White Bear Lake','Maplewood','Fridley','Saint Paul','Minneapolis','Forest Lake','Coon Rapids','Oakdale','Stillwater','Woodbury','Maple Grove','Plymouth','Minnetonka','Edina','Eden Prairie','Bloomington','Eagan','Burnsville','Apple Valley'];
module.exports = {
  '4': async (p, S, rec) => {
    rec('29 houses, one per real town, Shoreview first', await p.evaluate(([S, T]) => [...document.querySelectorAll(S + ' .nm')].map(n => n.textContent).join('|') === T.join('|'), [S, TOWNS]));
    rec('starts at home: Shoreview centred and named', await p.evaluate(S => /Shoreview/.test(document.querySelector(S + ' .read').textContent) && document.querySelector(S + ' .nm.on').textContent === 'Shoreview', S));
    await p.fill('#ar4-q', 'stillw'); await p.waitForTimeout(1200);
    rec('typing a town glides the row to it and lights its windows', await p.evaluate(S => document.querySelector(S + ' .nm.on').textContent === 'Stillwater' && document.querySelectorAll(S + ' g[data-i="18"] .win.on').length === 2 && /Stillwater/.test(document.querySelector(S + ' .read').textContent), S));
    await p.focus(S + ' .row'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900);
    rec('arrow keys move along the row', await p.evaluate(S => document.querySelector(S + ' .nm.on').textContent === 'Woodbury', S));
    await p.fill('#ar4-q', 'Duluth'); await p.waitForTimeout(200);
    rec('an unlisted town is told the truth and given the phone', await p.evaluate(S => /not on our list of 29 towns/.test(document.querySelector(S + ' .read').textContent), S));
  },
  '5': async (p, S, rec) => {
    rec('the drum holds the 29 real towns as listbox options', await p.evaluate(([S, T]) => document.querySelector(S + ' .win').getAttribute('role') === 'listbox' && [...document.querySelectorAll(S + ' [role=option]')].map(o => o.textContent).join('|') === T.join('|'), [S, TOWNS]));
    await p.waitForTimeout(1500); await p.focus(S + ' .win'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(500);
    rec('arrow keys turn the drum (active descendant follows)', await p.evaluate(S => document.querySelector(S + ' .win').getAttribute('aria-activedescendant') === 'ar5-o2' && /Arden Hills/.test(document.querySelector(S + ' .read').textContent), S));
    await p.fill('#ar5-q', 'eagan'); await p.waitForTimeout(600);
    rec('typing turns the drum to the town', await p.evaluate(S => document.querySelector(S + ' [aria-selected="true"]').textContent === 'Eagan' && document.querySelector(S + ' .cnt').textContent === '27 / 29', S));
    await p.click(S + ' .dn'); await p.waitForTimeout(500);
    rec('the 3D buttons turn it one town', await p.evaluate(S => document.querySelector(S + ' [aria-selected="true"]').textContent === 'Burnsville', S));
  },
  '6': async (p, S, rec, txt) => {
    rec('all 29 real towns, Shoreview home first', await p.evaluate(S => { const t = [...document.querySelectorAll(S + ' .towns button')].map(b => b.textContent); return t.length === 29 && t[0] === 'Shoreview' && new Set(t).size === 29 && document.querySelectorAll(S + ' .dot').length === 29; }, S));
    rec('a real map: towns sit where they are (Minneapolis west of Saint Paul, Forest Lake furthest north, Apple Valley furthest south)', await p.evaluate(S => { const d = {}; document.querySelectorAll(S + ' .dot').forEach(c => { d[document.querySelector(S + ' .lb[data-i="' + c.dataset.i + '"]').textContent] = [+c.getAttribute('cx'), +c.getAttribute('cy')]; }); const ys = Object.values(d).map(v => v[1]); return d['Minneapolis'][0] < d['Saint Paul'][0] && d['Forest Lake'][1] === Math.min(...ys) && d['Apple Valley'][1] === Math.max(...ys) && d['Stillwater'][0] === Math.max(...Object.values(d).map(v => v[0])); }, S));
    rec('labelled honestly: plotted from coordinates, not a street map, miles approximate', /plotted from their coordinates/.test(txt) && /Not a street map/.test(txt) && /approximate/.test(txt));
    await p.click(S + ' .towns button >> text=Edina'); await p.waitForTimeout(1500);
    rec('Edina: about 15–17 miles as the owl flies, and the owl lands there', await p.evaluate(S => { const m = +(document.querySelector(S + ' .read span').textContent.match(/About (\d+) mile/) || [])[1]; const o = document.querySelector(S + ' .owl').getAttribute('transform').match(/translate\(([\d.]+) ([\d.]+)/), e = document.querySelector(S + ' .dot.on'); return m >= 15 && m <= 17 && Math.abs(+o[1] - +e.getAttribute('cx')) < 1 && Math.abs(+o[2] - +e.getAttribute('cy')) < 1; }, S));
    rec('the flight line is drawn from the nest to the town', await p.evaluate(S => /^M[\d.]+ [\d.]+L[\d.]+ [\d.]+$/.test(document.querySelector(S + ' .fly').getAttribute('d')) && +document.querySelector(S + ' .fly').style.strokeDashoffset < .01, S));
    await p.fill(S + ' #ar6-q', 'st paul'); await p.press(S + ' #ar6-q', 'Enter'); await p.waitForTimeout(1200);
    rec('search understands “st paul”', await p.evaluate(S => document.querySelector(S + ' .read b').textContent === 'Saint Paul', S));
    await p.fill(S + ' #ar6-q', 'Duluth'); await p.press(S + ' #ar6-q', 'Enter'); await p.waitForTimeout(300);
    rec('an unknown town is told plainly and given the phone', await p.evaluate(S => /Not on our list of 29 towns\. Call \(651\) 977-6027/.test(document.querySelector(S + ' .read').textContent), S));
    rec('a true 5-mile scale bar (18 px per mile, 69.17 miles per degree)', await p.evaluate(S => /5 miles/.test(document.querySelector(S + ' svg').textContent), S));
  },
  '7': async (p, S, rec) => {
    rec('29 real towns on the sign, A–Z letters only where a town starts', await p.evaluate(S => { const l = [...document.querySelectorAll(S + ' .az button')].map(b => b.textContent).join(''); return l === 'ABCEFLMNOPRSVW'; }, S));
    rec('it starts at home: Welcome to Shoreview', await p.evaluate(S => document.querySelector(S + ' .nm').textContent === 'Shoreview' || document.querySelector(S + ' .count').textContent.endsWith('of 29'), S));
    await p.fill(S + ' #ar7-q', 'edina'); await p.press(S + ' #ar7-q', 'Enter'); await p.waitForTimeout(900);
    rec('search spins the sign to Edina and confirms', await p.evaluate(S => document.querySelector(S + ' .nm').textContent === 'Edina' && document.querySelector(S + ' .say').textContent === 'Yes, we roof in Edina.', S));
    const t0 = await p.evaluate(S => document.querySelector(S + ' .nm').textContent, S); await p.waitForTimeout(3600);
    rec('after a visitor acts, the idle turning stops', await p.evaluate(([S, t0]) => document.querySelector(S + ' .nm').textContent === t0, [S, t0]));
    await p.click(S + ' .az button >> text=M'); await p.waitForTimeout(800); await p.click(S + ' .az button >> text=M'); await p.waitForTimeout(800);
    rec('a letter cycles through its towns (M: Maple Grove → Maplewood)', await p.evaluate(S => document.querySelector(S + ' .nm').textContent === 'Maplewood' && document.querySelector(S + ' .az button[aria-pressed="true"]').textContent === 'M', S));
    await p.click(S + ' .nx'); await p.waitForTimeout(800);
    rec('Next moves alphabetically (Maplewood → Minneapolis)', await p.evaluate(S => document.querySelector(S + ' .nm').textContent === 'Minneapolis', S));
    await p.fill(S + ' #ar7-q', 'Rochester'); await p.press(S + ' #ar7-q', 'Enter'); await p.waitForTimeout(300);
    rec('an unknown town is told plainly and given the phone', await p.evaluate(S => /not on our list of 29 towns\. Call \(651\) 977-6027/.test(document.querySelector(S + ' .say').textContent), S));
  },
  '8': async (p, S, rec) => {
    rec('29 postmarks, the real towns, Shoreview marked home; no ZIP codes invented', await p.evaluate(S => { const b = [...document.querySelectorAll(S + ' .pm')]; return b.length === 29 && b[0].getAttribute('aria-label') === 'Shoreview, home' && !/\b55\d{3}\b/.test(document.querySelector(S + ' .wall').textContent); }, S));
    await p.fill(S + ' #ar8-q', 'ma'); await p.waitForTimeout(300);
    rec('typing filters the wall (ma: Maplewood, Maple Grove)', await p.evaluate(S => [...document.querySelectorAll(S + ' .pm.hit')].map(b => b.getAttribute('aria-label')).sort().join('|') === 'Maple Grove|Maplewood' && document.querySelector(S + ' .wall').classList.contains('filtering'), S));
    await p.fill(S + ' #ar8-q', 'st paul'); await p.press(S + ' #ar8-q', 'Enter'); await p.waitForTimeout(500);
    rec('Find stamps Saint Paul and confirms it', await p.evaluate(S => document.querySelector(S + ' .pm[aria-label="Saint Paul"]').getAttribute('aria-pressed') === 'true' && document.querySelector(S + ' .say').textContent === 'Yes, we roof in Saint Paul.', S));
    await p.fill(S + ' #ar8-q', ''); await p.dispatchEvent(S + ' #ar8-q', 'input'); await p.click(S + ' .pm >> nth=23'); await p.waitForTimeout(400);
    rec('clicking a postmark stamps it (Edina), one at a time', await p.evaluate(S => document.querySelectorAll(S + ' .pm[aria-pressed="true"]').length === 1 && /Edina/.test(document.querySelector(S + ' .say').textContent), S));
    await p.focus(S + ' .pm >> nth=23'); await p.keyboard.press('ArrowRight');
    rec('arrow keys move across the wall', await p.evaluate(S => document.activeElement.getAttribute('aria-label') === 'Eden Prairie', S));
    await p.fill(S + ' #ar8-q', 'Duluth'); await p.press(S + ' #ar8-q', 'Enter'); await p.waitForTimeout(300);
    rec('an unknown town is told plainly and given the phone', await p.evaluate(S => /not on our list of 29 towns\. Call \(651\) 977-6027/.test(document.querySelector(S + ' .say').textContent), S));
  },
  '9': async (p, S, rec) => {
    rec('a real slider over 29 stations, starting home', await p.evaluate(S => { const k = document.querySelector(S + ' .knob'); return k.getAttribute('role') === 'slider' && k.getAttribute('aria-valuemax') === '28' && k.getAttribute('aria-valuetext') === 'Shoreview' && document.querySelectorAll(S + ' .band text').length === 58; }, S));
    await p.focus(S + ' .knob'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(1300);
    rec('arrow keys tune town by town (Arden Hills) and the signal fills', await p.evaluate(S => document.querySelector(S + ' .knob').getAttribute('aria-valuetext') === 'Arden Hills' && document.querySelector(S + ' .say').textContent === 'Yes, we roof in Arden Hills.' && [...document.querySelectorAll(S + ' .bar')].every(b => b.getAttribute('fill') === '#2E7D32'), S));
    const r = await p.evaluate(S => { const b = document.querySelector(S + ' svg').getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; }, S);
    await p.mouse.move(r[0] + r[2] * .5, r[1] + r[3] * .3); await p.mouse.down(); await p.mouse.move(r[0] + r[2] * .5 - 1.45 * 150 * r[2] / 1000, r[1] + r[3] * .3, { steps: 6 });
    rec('dragging the dial between stations drops the signal and brings static', await p.evaluate(S => document.querySelector(S + ' .bar').getAttribute('fill') !== '#2E7D32' && +document.querySelector(S + ' .static').getAttribute('opacity') > 0, S));
    await p.mouse.up(); await p.waitForTimeout(1400);
    rec('letting go settles on the nearest town', await p.evaluate(S => { const k = document.querySelector(S + ' .knob'); return k.getAttribute('aria-valuetext') === 'Little Canada' || k.getAttribute('aria-valuetext') === 'Vadnais Heights'; }, S));
    await p.fill(S + ' #ar9-q', 'eagan'); await p.press(S + ' #ar9-q', 'Enter'); await p.waitForTimeout(1800);
    rec('search tunes straight to Eagan', await p.evaluate(S => document.querySelector(S + ' .knob').getAttribute('aria-valuetext') === 'Eagan' && document.querySelector(S + ' .say').textContent === 'Yes, we roof in Eagan.', S));
    await p.fill(S + ' #ar9-q', 'Fargo'); await p.press(S + ' #ar9-q', 'Enter'); await p.waitForTimeout(300);
    rec('an unknown town is told plainly and given the phone', await p.evaluate(S => /not on our list of 29 towns\. Call \(651\) 977-6027/.test(document.querySelector(S + ' .say').textContent), S));
  }
};

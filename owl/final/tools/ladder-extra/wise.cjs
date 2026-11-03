// Ladder interaction checks for new Wise Check versions.
module.exports = {
  '4': async (p, S, rec) => {
    rec('five question chips; the thread opens with a greeting', await p.evaluate(S => document.querySelectorAll(S + ' .qs button').length === 5 && document.querySelectorAll(S + ' .log .m').length === 1, S));
    await p.click(S + ' .qs button:nth-child(2)'); await p.waitForTimeout(1400);
    rec('asking about the attic answers with Owl\'s own Attic inspection words', await p.evaluate(S => { const m = [...document.querySelectorAll(S + ' .log .m')]; return m.length === 3 && m[1].classList.contains('you') && m[2].textContent.includes(OWL.WISE.parts[1].n) && m[2].textContent.includes(OWL.WISE.parts[1].t); }, S));
    rec('an asked question is marked and the log is a live region', await p.evaluate(S => document.querySelector(S + ' .qs button:nth-child(2)').getAttribute('aria-pressed') === 'true' && document.querySelector(S + ' .log').getAttribute('aria-live') === 'polite', S));
    await p.click(S + ' .qs button:nth-child(5)'); await p.waitForTimeout(1400);
    rec('"When should I book one?" lists Owl\'s four published cases', await p.evaluate(S => { const a = [...document.querySelectorAll(S + ' .log .m.owl')].pop().textContent; return OWL.WISE.cases.every(c => a.includes(c.n)); }, S));
  },
  '5': async (p, S, rec) => {
    rec('four tools mapped one-to-one to the four published parts', await p.evaluate(S => [...document.querySelectorAll(S + ' .list b')].map(b => b.textContent).join('|') === OWL.WISE.parts.slice(0, 4).map(x => x.n).join('|') && document.querySelectorAll(S + ' .tool').length === 4, S));
    await p.click(S + ' #w5-t2'); await p.waitForTimeout(500);
    rec('picking heat-sensor lifts that tool and says what it is for', await p.evaluate(S => document.querySelector(S + ' .tool[data-i="2"]').classList.contains('on') && /Heat-sensor camera/.test(document.querySelector(S + ' .say').textContent) && document.querySelector(S + ' .say').textContent.includes(OWL.WISE.parts[2].t), S));
    await p.focus(S + ' #w5-t2'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(200);
    rec('arrow keys rove the list and move the lifted tool', await p.evaluate(S => document.activeElement.id === 'w5-t3' && document.querySelector(S + ' .tool[data-i="3"]').classList.contains('on'), S));
    const b = await p.evaluate(S => { const r = document.querySelector(S + ' .tool[data-i="0"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, S);
    await p.mouse.move(b.x, b.y); await p.waitForTimeout(400);
    rec('pointing at a tool on the mat selects it', await p.evaluate(S => document.querySelector(S + ' #w5-t0').getAttribute('aria-selected') === 'true', S));
  },
  '6': async (p, S, rec) => {
    await p.waitForTimeout(1500);
    rec('eight frames: the four published parts, then the four published cases', await p.evaluate(S => { const n = [...document.querySelectorAll(S + ' .fr')].map(b => b.getAttribute('aria-label').replace(/^Frame \d: /, '')); return n.length === 8 && n.join('|') === OWL.WISE.parts.map(x => x.n).concat(OWL.WISE.cases.map(x => x.n)).join('|'); }, S));
    rec('frame 1 is chosen and circled; its words are Owl\'s', await p.evaluate(S => document.querySelector(S + ' .fr').getAttribute('aria-pressed') === 'true' && document.querySelector(S + ' .cap p').textContent === OWL.WISE.parts[0].t, S));
    await p.click(S + ' .nx'); await p.click(S + ' .nx'); await p.waitForTimeout(500);
    rec('Next moves to frame 3 (heat-sensor leak detection)', await p.evaluate(S => document.querySelector(S + ' .cap h3').textContent === 'Heat-sensor leak detection' && document.querySelectorAll(S + ' .fr[aria-pressed="true"]').length === 1, S));
    await p.focus(S + ' .fr:nth-child(3)'); await p.keyboard.press('End'); await p.waitForTimeout(800);
    rec('End jumps to the last frame and the strip brings it into view', await p.evaluate(S => { const t = document.querySelector(S + ' .table').getBoundingClientRect(), f = document.querySelector(S + ' .fr:nth-child(8)').getBoundingClientRect(); return document.querySelector(S + ' .cap h3').textContent === 'Just checking' && f.left >= t.left - 2 && f.right <= t.right + 2; }, S));
    rec('a case frame names the parts it focuses on, from the data', await p.evaluate(S => [...document.querySelectorAll(S + ' .cap li')].length === OWL.WISE.cases[3].f.length, S));
    const tb = await p.evaluate(S => { const r = document.querySelector(S + ' .table').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, S);
    const x0 = await p.evaluate(S => document.querySelector(S + ' .film').style.transform, S);
    await p.mouse.move(tb[0] + tb[2] * .3, tb[1] + tb[3] / 2); await p.mouse.down(); await p.mouse.move(tb[0] + tb[2] * .7, tb[1] + tb[3] / 2, { steps: 10 }); await p.mouse.up(); await p.waitForTimeout(900);
    rec('dragging the strip moves it', await p.evaluate(([S, x0]) => document.querySelector(S + ' .film').style.transform !== x0, [S, x0]));
    rec('a drag does not pick a frame by accident', await p.evaluate(S => document.querySelector(S + ' .cap h3').textContent === 'Just checking', S));
    rec('the frames are labelled as drawings, not job photos', await p.evaluate(S => /drawings, not job photos/.test(document.querySelector(S).innerText), S));
  },
  '7': async (p, S, rec) => {
    rec('four station cards in Owl\'s published words', await p.evaluate(S => [...document.querySelectorAll(S + ' .card span')].map(s => s.textContent).join('|') === OWL.WISE.parts.map(x => x.t).join('|'), S));
    const go = k => p.evaluate(([S, k]) => { const f = document.querySelector(S + ' .fig'), b = f.getBoundingClientRect(), span = b.height * .95 + innerHeight * .2; scrollTo({ top: scrollY + b.top - (innerHeight * .8 - k * span), behavior: 'instant' }); }, [S, k]);
    await go(0.02); await p.waitForTimeout(1200);
    rec('at the start no station is lit', await p.evaluate(S => document.querySelectorAll(S + ' .st.on').length === 0, S));
    await go(0.6); await p.waitForTimeout(1500);
    rec('scrolling draws the route: halfway lights the roof and attic stations', await p.evaluate(S => document.querySelectorAll(S + ' .st.on').length === 2 && document.querySelector(S + ' .card[aria-current="step"] b').textContent.startsWith('2.'), S));
    rec('the attic flashlight is on at station 2', await p.evaluate(S => document.querySelector(S + ' .f1').classList.contains('on') && !document.querySelector(S + ' .f2').classList.contains('on'), S));
    await go(1); await p.waitForTimeout(1600);
    rec('the end of the route reaches documentation: all four lit', await p.evaluate(S => document.querySelectorAll(S + ' .st.on').length === 4 && document.querySelector(S + ' .card[aria-current="step"] b').textContent.startsWith('4.'), S));
    await p.click(S + ' .card >> nth=2'); await p.waitForTimeout(1600);
    rec('a card moves the route to its station (heat sensor)', await p.evaluate(S => document.querySelectorAll(S + ' .st.on').length === 3 && document.querySelector(S + ' .f2').classList.contains('on') && !document.querySelector(S + ' .f3').classList.contains('on'), S));
    rec('the route is masked, drawn only up to the marker', await p.evaluate(S => { const m = document.querySelector(S + ' .mp'); return parseFloat(m.style.strokeDashoffset) > 0; }, S));
    rec('no fixed order of work is claimed', await p.evaluate(S => /not as a fixed order of work/.test(document.querySelector(S).innerText), S));
  }
};

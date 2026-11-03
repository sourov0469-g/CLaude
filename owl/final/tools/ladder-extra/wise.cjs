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
  }
};

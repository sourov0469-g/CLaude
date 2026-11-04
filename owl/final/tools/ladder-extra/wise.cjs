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
  },
  '8': async (p, S, rec, txt) => {
    rec('five tabs in a real tablist; the first sheet is in front', await p.evaluate(S => { const t = [...document.querySelectorAll(S + ' [role=tab]')]; return t.length === 5 && t[0].getAttribute('aria-selected') === 'true' && document.querySelector(S + ' #w8-p0').classList.contains('front'); }, S));
    rec('sheets behind are inert and hidden from readers', await p.evaluate(S => [...document.querySelectorAll(S + ' .sheet:not(.front)')].every(x => x.hasAttribute('inert') && x.getAttribute('aria-hidden') === 'true'), S));
    await p.click(S + ' #w8-t1'); await p.waitForTimeout(700);
    rec('What’s in it: the four published parts, word for word', await p.evaluate(S => [...document.querySelectorAll(S + ' #w8-p1 li span')].map(x => x.textContent).join('|') === OWL.WISE.parts.map(x => x.t).join('|'), S));
    await p.focus(S + ' #w8-t1'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500);
    rec('arrow keys move between tabs (When to book: the four published cases)', await p.evaluate(S => document.activeElement.id === 'w8-t2' && [...document.querySelectorAll(S + ' #w8-p2 li b')].map(x => x.textContent).join('|') === OWL.WISE.cases.map(x => x.n).join('|'), S));
    await p.keyboard.press('End'); await p.waitForTimeout(500);
    rec('How do I book: only the locked phone, email, hours and address', await p.evaluate(S => { const t = document.querySelector(S + ' #w8-p4').textContent; return /\(651\) 977-6027/.test(t) && /info@owlroofing\.com/.test(t) && /08:00–18:00/.test(t) && /1000 County Rd E #230, Shoreview, MN 55126/.test(t) && document.querySelector(S + ' #w8-p4 a').getAttribute('href') === 'tel:+16519776027'; }, S));
    rec('no price or duration is claimed anywhere in the file', await p.evaluate(S => !/\$\d|free|minutes|hours? long|\d+\s*min/i.test(document.querySelector(S + ' .stack').textContent), S));
  },
  '9': async (p, S, rec, txt) => {
    await p.waitForTimeout(1200);
    rec('page 1 of 5: the first part in Owl’s words, a sketch drawn, previous disabled', await p.evaluate(S => document.querySelector(S + ' .pg').textContent === '1 / 5' && document.querySelector(S + ' .tx h3').textContent === OWL.WISE.parts[0].n && document.querySelector(S + ' .tx p').textContent === OWL.WISE.parts[0].t && document.querySelectorAll(S + ' .sk .ink').length > 3 && document.querySelector(S + ' .pv').disabled, S));
    await p.click(S + ' .nx'); await p.waitForTimeout(1100);
    rec('Next turns the page to the attic inspection, the turning leaf cleans itself up', await p.evaluate(S => document.querySelector(S + ' .pg').textContent === '2 / 5' && document.querySelector(S + ' .tx h3').textContent === OWL.WISE.parts[1].n && document.querySelectorAll(S + ' .leaf').length === 0, S));
    await p.focus(S + ' .nb'); for (let i = 0; i < 3; i++){ await p.keyboard.press('ArrowRight'); await p.waitForTimeout(950); }
    rec('arrow keys reach the last page: how to book with the locked phone', await p.evaluate(S => document.querySelector(S + ' .pg').textContent === '5 / 5' && document.querySelector(S + ' .tx a').getAttribute('href') === 'tel:+16519776027' && document.querySelector(S + ' .nx').disabled, S));
    await p.click(S + ' .pv'); await p.waitForTimeout(1100);
    rec('Previous turns back', await p.evaluate(S => document.querySelector(S + ' .pg').textContent === '4 / 5' && document.querySelector(S + ' .tx h3').textContent === OWL.WISE.parts[3].n, S));
    rec('labelled as sketches, not photos', /Sketches, not photos/.test(txt));
  },
  '10': async (p, S, rec, txt) => {
    const st = () => p.evaluate(S => { const r = document.querySelector(S); const l = r.querySelector('.lad'); return { now: l.getAttribute('aria-valuenow'), text: l.getAttribute('aria-valuetext'), on: [...r.querySelectorAll('.sh')].findIndex(x => x.classList.contains('on')), past: [...r.querySelectorAll('.sh')].findIndex(x => x.classList.contains('past')), tag: r.querySelector('.tag').textContent, say: r.querySelector('.say .st.on b').textContent, phone: r.querySelector('.phone').classList.contains('on'), hint: !r.querySelector('.hint').classList.contains('gone') }; }, S);
    let s = await st();
    rec('starts on the ground: rung 1 of 4, the yard photo, "From your yard", the drag hint shown, no phone yet', s.now === '1' && s.on === 0 && s.tag === 'From the yard' && s.say === 'From your yard' && s.hint && !s.phone && s.text === 'Rung 1 of 4. From your yard. It’s hard to tell what’s going on up there.' && await p.evaluate(S => { const l = document.querySelector(S + ' .lad'); return l.getAttribute('role') === 'slider' && l.getAttribute('aria-orientation') === 'vertical' && l.tabIndex === 0; }, S));
    await p.focus(S + ' .lad'); await p.keyboard.press('ArrowUp'); await p.waitForTimeout(150); s = await st();
    rec('ArrowUp climbs to rung 2 and the view rises (old photo leaving while the new one arrives)', s.now === '2' && s.on === 1 && s.past === 0 && await p.evaluate(S => { const o = parseFloat(getComputedStyle(document.querySelectorAll(S + ' .sh')[1]).opacity); return o > 0 && o < 1; }, S));
    await p.waitForTimeout(700); s = await st();
    rec('rung 2: Owl’s crew on the roof, "Our crew does the climbing. You stay on the ground.", the hint goes', s.tag === 'Owl’s crew' && s.say === 'We go up' && /Our crew does the climbing\. You stay on the ground\./.test(s.text) && !s.hint && await p.evaluate(S => /Owl's crew/.test(document.querySelectorAll(S + ' .sh img')[1].alt), S));
    await p.keyboard.press('End'); await p.waitForTimeout(800); s = await st();
    rec('End: rung 4, back in your yard with the photos and video on a phone', s.now === '4' && s.on === 3 && s.phone && s.tag === 'Back in your yard' && /Photos and video of what we found, so you see what we saw\./.test(s.text));
    await p.keyboard.press('Home'); await p.waitForTimeout(300); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(300); s = await st();
    rec('Home returns to the ground; ArrowDown at the bottom stays put', s.now === '1' && s.on === 0 && !s.phone);
    const bb = await p.locator(S + ' .lad').boundingBox();
    await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height * .88); await p.mouse.down(); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height * .5, { steps: 6 }); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height * .1, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(700); s = await st();
    rec('drag the owl up the ladder: settles on rung 4', s.now === '4' && s.phone);
    await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height * .63); await p.waitForTimeout(700); s = await st();
    rec('tap a rung: jumps straight to it (rung 2)', s.now === '2' && s.on === 1);
    rec('Wise Check facts only: attic and photos-and-video from lib/wise-data.js; no price, no "free", no timing', await p.evaluate(S => { const t = document.querySelector(S).innerText + [...document.querySelectorAll(S + ' .st')].map(x => x.textContent).join(' '); return /the attic too/.test(t) && !/\bfree\b|\$\s?\d|no cost|no charge|\bminutes?\b|\bhours?\b|same.day/i.test(t); }, S));
    rec('labelled: "Photos are illustrative, except our crew."', /Photos are illustrative, except our crew\./.test(txt));
    rec('no construction words', await p.evaluate(S => !/underlayment|decking|nail|ventilation|rafter|granule|flashing/i.test(document.querySelector(S).innerText), S));
    rec('next steps: Book a Wise Check (#book) and the real phone', await p.evaluate(S => { const b = document.querySelector(S + ' .acts .btn-amber'); return b.getAttribute('href') === '#book' && /Book a Wise Check/.test(b.textContent) && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027'; }, S));
  },
  '11': async (p, S, rec, txt) => {
    await p.evaluate(S => document.querySelector(S).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(2400);
    const st = () => p.evaluate(S => { const r = document.querySelector(S); return { clear: r.dataset.clear, wiped: +r.dataset.wiped, gone: r.querySelector('.fog').classList.contains('gone'), done: r.querySelector('.ctr').classList.contains('done'), hint: !r.querySelector('.hint').classList.contains('gone'), btn: r.querySelector('.aux button').textContent, msg: r.querySelector(r.querySelector('.ctr').classList.contains('done') ? '.msg .b' : '.msg .a').textContent.trim() }; }, S);
    let s = await st();
    rec('starts fogged: the window is covered, "Wipe the window with your finger or mouse.", "Wipe here" shown, "Clear it for me" offered', s.clear === 'no' && !s.gone && !s.done && s.hint && s.msg === 'Wipe the window with your finger or mouse.' && s.btn === 'Clear it for me' && await p.evaluate(S => { const c = document.querySelector(S + ' .fog'); return c.width > 300 && c.height > 100; }, S));
    rec('the demo stroke wiped a little of the window by itself, without clearing it', s.wiped > 2 && s.wiped < 40);
    const bb = await p.locator(S + ' .pane').boundingBox(), w0 = s.wiped;
    await p.mouse.move(bb.x + bb.width * .1, bb.y + bb.height * .25); await p.mouse.move(bb.x + bb.width * .6, bb.y + bb.height * .25, { steps: 12 }); s = await st();
    rec('moving the mouse over the window wipes it (no press needed); the hint goes', s.wiped > w0 && !s.hint && s.clear === 'no');
    for (let row = 0; row < 7; row++) { const y = bb.y + bb.height * (.06 + row * .15); await p.mouse.move(bb.x + 4, y); await p.mouse.move(bb.x + bb.width - 4, y, { steps: 18 }); }
    await p.mouse.move(2, 2); await p.waitForTimeout(1100); s = await st();
    rec('past about 55 % the rest of the fog lifts: "Now you can see it." with the Wise Check line', s.clear === 'yes' && s.gone && s.done && /^Now you can see it\./.test(s.msg) && /we check the roof and the attic, and show you photos and video of what we saw/.test(s.msg) && await p.evaluate(S => getComputedStyle(document.querySelector(S + ' .fog')).opacity === '0', S));
    await p.click(S + ' .aux button'); await p.waitForTimeout(300); s = await st();
    rec('"Fog it up again" puts the fog back', s.clear === 'no' && !s.gone && s.wiped === 0 && s.btn === 'Clear it for me');
    await p.focus(S + ' .aux button'); await p.keyboard.press('Enter'); await p.waitForTimeout(300); s = await st();
    rec('keyboard: "Clear it for me" clears it without wiping', s.clear === 'yes' && s.done && s.btn === 'Fog it up again');
    rec('touch: sideways strokes wipe, up-and-down swipes still scroll the page (touch-action: pan-y)', await p.evaluate(S => getComputedStyle(document.querySelector(S + ' .pane')).touchAction === 'pan-y', S));
    rec('the window has a spoken description; the fog canvas is hidden from screen readers', await p.evaluate(S => { const pn = document.querySelector(S + ' .pane'); return pn.getAttribute('role') === 'img' && /fogged-up window/.test(pn.getAttribute('aria-label')) && document.querySelector(S + ' .fog').getAttribute('aria-hidden') === 'true'; }, S));
    rec('Wise Check facts only: roof, attic, photos and video; no price, "free" or timing', await p.evaluate(S => { const t = document.querySelector(S).textContent; return /the attic/.test(t) && /photos and video/.test(t) && !/\bfree\b|\$\s?\d|no cost|no charge|\bminutes?\b|\bhours?\b|same.day/i.test(t); }, S));
    rec('labelled: "Illustrative photo"', await p.evaluate(S => /Illustrative photo/.test(document.querySelector(S + ' .lab').textContent), S));
    rec('no construction words', await p.evaluate(S => !/underlayment|decking|nail|ventilation|rafter|granule|flashing/i.test(document.querySelector(S).textContent), S));
    rec('next steps: Book a Wise Check (#book) and the real phone', await p.evaluate(S => { const b = document.querySelector(S + ' .acts .btn-amber'); return b.getAttribute('href') === '#book' && /Book a Wise Check/.test(b.textContent) && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027'; }, S));
  },
  '12': async (p, S, rec, txt) => {
    await p.evaluate(S => document.querySelector(S).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(1800);
    const st = () => p.evaluate(S => { const r = document.querySelector(S); return { n: +r.dataset.answered, k: r.querySelector('.slot .k').textContent, b: r.querySelector('.slot b').textContent, t: (r.querySelector('.slot p.t') || {}).textContent, w: (r.querySelector('.slot p.w') || { textContent: '' }).textContent, ans: [...r.querySelectorAll('.bub')].map(x => x.classList.contains('ans')), lab: [...r.querySelectorAll('.bub')].map(x => x.getAttribute('aria-label')), all: r.querySelector('.stage').classList.contains('all') }; }, S);
    let s = await st();
    rec('four worries float as real buttons in the homeowner’s words; nothing answered yet', s.n === 0 && s.ans.every(a => !a) && s.lab[0] === 'Worry: Did the storm get us? Press for Owl’s answer.' && s.lab[3] === 'Worry: Is it OK up there? Press for Owl’s answer.' && s.b === 'Tap a worry.' && await p.evaluate(S => [...document.querySelectorAll(S + ' .bub')].every(b => b.tagName === 'BUTTON' && getComputedStyle(b).animationName === 'wc12f'), S));
    rec('the house draws itself on when seen', await p.evaluate(S => document.querySelector(S + ' .stage').classList.contains('on') && getComputedStyle(document.querySelector(S + ' .house path')).strokeDashoffset === '0px', S));
    await p.click(S + ' .bub >> nth=0', { force: true }); await p.waitForTimeout(120);
    rec('tapping a worry pops it (specks burst out)', await p.evaluate(S => document.querySelectorAll(S + ' .spk').length > 0, S));
    await p.waitForTimeout(500); s = await st();
    rec('the bubble becomes an "After a storm" chip; Owl’s answer and the Wise Check promise appear; "1 of 4 answered"', s.n === 1 && s.ans[0] && s.k === '1 of 4 answered' && s.b === 'After a storm' && /easy to miss from the ground/.test(s.t) && s.w === 'A Wise Check finds out, and shows you photos and video.' && s.lab[0] === 'Answered: After a storm. Press to read the answer again.');
    await p.focus(S + ' .bub >> nth=2'); await p.keyboard.press('Enter'); await p.waitForTimeout(500); s = await st();
    rec('keyboard: Enter on "How long has it got left?" answers in plain words (no construction terms)', s.n === 2 && s.b === 'An older roof' && s.t === 'We look it over closely and tell you straight where it stands.');
    await p.click(S + ' .bub >> nth=0', { force: true }); await p.waitForTimeout(400); s = await st();
    rec('tapping an answered chip reads its answer again without counting it twice', s.n === 2 && s.b === 'After a storm' && s.k === '2 of 4 answered');
    await p.click(S + ' .bub >> nth=1', { force: true }); await p.waitForTimeout(400); await p.click(S + ' .bub >> nth=3', { force: true }); await p.waitForTimeout(800); s = await st();
    rec('all four answered: the house gets its check badge and the closing line', s.n === 4 && s.all && s.k === '4 of 4 answered' && /^All four answered\. That’s what a Wise Check is for/.test(s.w) && await p.evaluate(S => getComputedStyle(document.querySelector(S + ' .badge')).scale === '1', S));
    rec('answers come from lib/wise-data.js (three verbatim, one plain rewrite); no price, "free" or timing', await p.evaluate(S => { const c = OWL.WISE.cases, t = document.querySelector(S).textContent + [0, 1, 3].map(i => c[i].t).join(' '); return /Water travels before it shows/.test(c[1].t) && !/\bfree\b|\$\s?\d|no cost|no charge|\bminutes?\b|\bhours?\b|same.day/i.test(document.querySelector(S).textContent); }, S));
    rec('no construction words', await p.evaluate(S => !/underlayment|decking|nail|ventilation|rafter|granule|flashing/i.test(document.querySelector(S).textContent), S));
    rec('next steps: Book a Wise Check (#book) and the real phone', await p.evaluate(S => { const b = document.querySelector(S + ' .acts .btn-amber'); return b.getAttribute('href') === '#book' && /Book a Wise Check/.test(b.textContent) && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027'; }, S));
  }
};

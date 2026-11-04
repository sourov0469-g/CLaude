// Ladder interaction checks for new video versions.
const painted = (p, sel) => p.evaluate(sel => { const c = document.querySelector(sel); if (!c || !c.width) return 0; const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 40) if (d[i] > 0) n++; return n; }, sel);
module.exports = {
  '4': async (p, S, rec) => {
    await p.waitForTimeout(800);
    rec('the grey film is painted on the canvas', (await painted(p, S + ' canvas')) > 1000);
    rec('the clip is Owl\'s own crew film', await p.evaluate(S => document.querySelector(S + ' video').dataset.media === 'crew', S));
    await p.focus(S + ' .scr'); const x0 = await p.evaluate(S => document.querySelector(S + ' .ring').style.getPropertyValue('--x'), S);
    for (let i = 0; i < 5; i++) await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(700);
    rec('arrow keys move the colour lens', await p.evaluate(([S, x0]) => parseFloat(document.querySelector(S + ' .ring').style.getPropertyValue('--x')) < parseFloat(x0) - 20, [S, x0]));
    rec('the caption names a moment from the frame-checked list', await p.evaluate(S => ['Rafters', 'Materials', 'The crew', 'Finished roof', 'Decking'].includes(document.querySelector(S + ' .ring b').textContent), S));
    await p.click(S + ' .pp'); await p.waitForTimeout(200);
    rec('the play key pauses and relabels', await p.evaluate(S => document.querySelector(S + ' video').paused && document.querySelector(S + ' .pp').getAttribute('aria-label') === 'Play the film', S));
    await p.click(S + ' .full'); await p.waitForTimeout(400);
    rec('the full film opens YouTube ehKLv5DF2TQ', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]'))); await p.keyboard.press('Escape');
  },
  '5': async (p, S, rec) => {
    await p.waitForTimeout(2600);
    rec('twelve tiles, all assembled in place', await p.evaluate(S => { const t = [...document.querySelectorAll(S + ' .tile')]; return t.length === 12 && document.querySelector(S + ' .grid').classList.contains('set') && t.every(x => x.style.getPropertyValue('--z') === '0'); }, S));
    rec('every tile draws its piece of the film', (await Promise.all([0, 5, 11].map(i => painted(p, S + ` .tile:nth-child(${i + 1}) canvas`)))).every(n => n > 50));
    await p.click(S + ' .moms li:nth-child(4) button'); await p.waitForTimeout(300);
    rec('a moment chip seeks the film and marks itself', await p.evaluate(S => { const v = document.querySelector(S + ' video'); return v.currentTime >= 9 && v.currentTime < 13 && document.querySelector(S + ' .moms li:nth-child(4) button').getAttribute('aria-current') === 'true'; }, S));
    await p.click(S + ' .scatter'); await p.waitForTimeout(200);
    rec('Scatter breaks the shot apart again', await p.evaluate(S => !document.querySelector(S + ' .grid').classList.contains('set'), S));
    await p.waitForTimeout(2200);
    rec('…and it reassembles', await p.evaluate(S => document.querySelector(S + ' .grid').classList.contains('set'), S));
  },
  '6': async (p, S, rec) => {
    await p.waitForTimeout(1800);
    rec('the curtains draw open when the window comes into view', await p.evaluate(S => document.querySelector(S + ' .front').classList.contains('open') && getComputedStyle(document.querySelector(S + ' .cur.l')).transform !== 'none', S));
    rec('the clip in the window is Owl\'s own crew film', await p.evaluate(S => document.querySelector(S + ' video').dataset.media === 'crew', S));
    rec('the sill names a moment from the frame-checked list', await p.evaluate(S => ['Rafters and new decking', 'GAF shingles carried up', 'One of the crew, shingle in hand', 'Walking a finished roof', 'OSB carried in for the next roof'].includes(document.querySelector(S + ' .sill').textContent), S));
    await p.evaluate(S => { const v = document.querySelector(S + ' video'); v.currentTime = 9.6; }, S); await p.waitForTimeout(600);
    rec('the sill follows the film (9.6 s → finished roof)', await p.evaluate(S => document.querySelector(S + ' .sill').textContent === 'Walking a finished roof', S));
    await p.evaluate(S => document.querySelector(S + ' video').play().catch(() => {}), S); await p.waitForTimeout(200);
    await p.click(S + ' .pp'); await p.waitForTimeout(250);
    rec('the play key pauses and relabels', await p.evaluate(S => document.querySelector(S + ' video').paused && document.querySelector(S + ' .pp').getAttribute('aria-label') === 'Play the film', S));
    await p.click(S + ' .full'); await p.waitForTimeout(400);
    rec('the full film opens YouTube ehKLv5DF2TQ', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]'))); await p.keyboard.press('Escape');
  },
  '7': async (p, S, rec) => {
    rec('five moment dots sit on the rail', await p.evaluate(S => document.querySelectorAll(S + ' .rail b').length === 5, S));
    const go = k => p.evaluate(([S, k]) => { const t = document.querySelector(S + ' .track'), span = t.offsetHeight - innerHeight * .9, top = t.getBoundingClientRect().top + scrollY; scrollTo(0, top + span * k); }, [S, k]);
    await go(0.62); await p.waitForTimeout(1500);
    rec('scrolling sets the rail to the scroll position', await p.evaluate(S => Math.abs(parseFloat(document.querySelector(S + ' .rail').style.getPropertyValue('--p')) - .62) < .04, S));
    rec('the film follows the scroll (about 9.6 s)', await p.evaluate(S => Math.abs(document.querySelector(S + ' video').currentTime - .62 * 15.5) < 1.2, S));
    rec('the caption names the moment at that point', await p.evaluate(S => document.querySelector(S + ' .cap b').textContent === 'Finished roof', S));
    rec('dots up to that moment are lit', await p.evaluate(S => document.querySelectorAll(S + ' .rail b.on').length === 4, S));
    rec('the stage stays pinned while scrubbing', await p.evaluate(S => { const r = document.querySelector(S + ' .stage').getBoundingClientRect(); return r.top >= 60 && r.top < 120; }, S));
    await go(0.1); await p.waitForTimeout(1500);
    rec('scrolling back up rewinds', await p.evaluate(S => document.querySelector(S + ' video').currentTime < 3 && document.querySelector(S + ' .cap b').textContent === 'Rafters', S));
    await p.click(S + ' .full'); await p.waitForTimeout(400);
    rec('the full film opens YouTube ehKLv5DF2TQ', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]'))); await p.keyboard.press('Escape');
  },
  '8': async (p, S, rec) => {
    rec('the crew film sits under knocked-out letters reading OWL CREW', await p.evaluate(S => document.querySelector(S + ' video').dataset.media === 'crew' && document.querySelector(S + ' mask text').textContent === 'OWL CREW', S));
    const go = k => p.evaluate(([S, k]) => { const t = document.querySelector(S + ' .track'), span = t.offsetHeight - innerHeight * .9, top = t.getBoundingClientRect().top + scrollY; scrollTo({ top: top + span * k, behavior: 'instant' }); }, [S, k]);
    await go(0.02); await p.waitForTimeout(1200);
    const sc = () => p.evaluate(S => { const m = document.querySelector(S + ' .word').getAttribute('transform').match(/scale\(([\d.]+)\)/); return [+m[1], +document.querySelector(S + ' .paper').style.opacity, document.querySelector(S + ' .line').classList.contains('on')]; }, S);
    const a = await sc();
    rec('at the start the letters are at rest and the cream covers the rest', a[0] < 1.05 && a[1] > .99 && !a[2]);
    await go(0.5); await p.waitForTimeout(1400); const b = await sc();
    rec('scrolling grows the letters about the O', b[0] > 3 && b[1] > .5);
    rec('the stage stays pinned while it grows', await p.evaluate(S => { const r = document.querySelector(S + ' .stage').getBoundingClientRect(); return r.top >= 60 && r.top < 120; }, S));
    await go(1); await p.waitForTimeout(1600); const c = await sc();
    rec('at the end the film fills the frame and the line lands', c[1] < .01 && c[2] && await p.evaluate(S => document.querySelector(S + ' .line b').textContent === 'Owl’s own crew, on the job.', S));
    await p.click(S + ' .full'); await p.waitForTimeout(400);
    rec('the full film opens YouTube ehKLv5DF2TQ', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]'))); await p.keyboard.press('Escape');
  },
  '9': async (p, S, rec) => {
    await p.waitForTimeout(1800);
    rec('the projector comes on when the driveway is seen and the film plays on the door', await p.evaluate(S => document.querySelector(S + ' .scene').classList.contains('on') && document.querySelector(S + ' .sw').getAttribute('aria-pressed') === 'true' && document.querySelector(S + ' video').dataset.media === 'crew', S));
    await p.evaluate(S => { const v = document.querySelector(S + ' video'); v.currentTime = 9.5; }, S); await p.waitForTimeout(700);
    rec('Now showing names the frame-checked moment (9.5 s → finished roof)', await p.evaluate(S => document.querySelector(S + ' .now span').textContent === 'Walking a finished roof' && document.querySelector(S + ' .now time').textContent === '0:09', S));
    await p.click(S + ' .sw'); await p.waitForTimeout(500);
    rec('the switch stops the movie: beam off, film paused, label changes', await p.evaluate(S => !document.querySelector(S + ' .scene').classList.contains('on') && document.querySelector(S + ' video').paused && document.querySelector(S + ' .sw .lb').textContent === 'Start the Movie', S));
    await p.click(S + ' .full'); await p.waitForTimeout(400);
    rec('the full film opens YouTube ehKLv5DF2TQ', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]'))); await p.keyboard.press('Escape');
  },
  '10': async (p, S, rec) => {
    await p.waitForTimeout(1800);
    rec('the story plays when seen: crew film, five bars, chapter 1 caption', await p.evaluate(S => { const v = document.querySelector(S + ' video'); return v.dataset.media === 'crew' && !v.paused && document.querySelectorAll(S + ' .bars i').length === 5 && document.querySelector(S + ' .cap p').textContent.length > 5; }, S));
    await p.evaluate(S => { document.querySelector(S + ' video').currentTime = 9.6; }, S); await p.waitForTimeout(700);
    const q4 = await p.evaluate(S => { const f = [...document.querySelectorAll(S + ' .bars i')].map(i => +(i.style.transform.match(/[\d.]+/) || [0])[0]); return [document.querySelector(S + ' .cap p').textContent === 'Walking a finished roof' && document.querySelector(S + ' .chap [aria-current="true"]').textContent.includes('Walking a finished roof') && f[0] === 1 && f[2] === 1 && f[3] > 0 && f[3] < 1 && f[4] === 0, document.querySelector(S + ' .cap p').textContent + ' ' + f.join(',') + ' t=' + document.querySelector(S + ' video').currentTime.toFixed(2)]; }, S);
    rec('at 9.6 s the caption, list and bars agree on chapter 4 (finished roof)', q4[0], q4[1]);
    const box = await p.evaluate(S => { const r = document.querySelector(S + ' .story').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, S);
    await p.mouse.click(box[0] + box[2] * .8, box[1] + box[3] * .5); await p.waitForTimeout(500);
    rec('a tap on the right skips to chapter 5', await p.evaluate(S => document.querySelector(S + ' .cap small').textContent === 'Chapter 5 of 5' && document.querySelector(S + ' video').currentTime >= 13, S));
    await p.mouse.click(box[0] + box[2] * .1, box[1] + box[3] * .5); await p.waitForTimeout(500);
    rec('a tap on the left goes back to chapter 4', await p.evaluate(S => document.querySelector(S + ' .cap small').textContent === 'Chapter 4 of 5', S));
    await p.mouse.move(box[0] + box[2] * .6, box[1] + box[3] * .5); await p.mouse.down(); await p.waitForTimeout(600);
    const held = await p.evaluate(S => document.querySelector(S + ' video').paused && document.querySelector(S + ' .story').classList.contains('paused'), S);
    const ch = await p.evaluate(S => document.querySelector(S + ' .cap small').textContent, S);
    await p.mouse.up(); await p.waitForTimeout(400);
    rec('press and hold pauses, letting go plays on without changing chapter', held && ch === 'Chapter 4 of 5' && await p.evaluate(S => !document.querySelector(S + ' video').paused && document.querySelector(S + ' .cap small').textContent === 'Chapter 4 of 5', S));
    await p.focus(S + ' .story'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
    rec('arrow keys on the card change chapter', await p.evaluate(S => document.querySelector(S + ' .cap small').textContent === 'Chapter 5 of 5', S));
    await p.click(S + ' .pp'); await p.waitForTimeout(300);
    rec('the Pause button pauses and becomes Play', await p.evaluate(S => document.querySelector(S + ' video').paused && document.querySelector(S + ' .pp').getAttribute('aria-pressed') === 'true' && document.querySelector(S + ' .pp span').textContent === 'Play', S));
    await p.click(S + ' .chap button >> nth=1'); await p.waitForTimeout(400);
    rec('a chapter in the list jumps there (GAF shingles at 3.1 s)', await p.evaluate(S => Math.abs(document.querySelector(S + ' video').currentTime - 3.1) < .3 && document.querySelector(S + ' .cap p').textContent === 'GAF shingles carried up', S));
    await p.click(S + ' .full'); await p.waitForTimeout(400);
    rec('the full film opens YouTube ehKLv5DF2TQ', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]'))); await p.keyboard.press('Escape');
  },
  '11': async (p, S, rec) => {
    await p.waitForTimeout(1600);
    rec('the crew film loops quietly behind the Owl when seen', await p.evaluate(S => { const v = document.querySelector(S + ' video'); return v.dataset.media === 'crew' && v.muted && v.loop && !v.paused; }, S));
    const b = await p.evaluate(S => { const r = document.querySelector(S + ' .face').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, S);
    await p.mouse.move(b[0] + 400, b[1] - 10, { steps: 6 }); await p.waitForTimeout(700);
    const right = await p.evaluate(S => document.querySelector(S + ' .pupil').getAttribute('transform') || '', S);
    await p.mouse.move(b[0] - 400, b[1] + 10, { steps: 6 }); await p.waitForTimeout(700);
    const left = await p.evaluate(S => document.querySelector(S + ' .pupil').getAttribute('transform') || '', S);
    const num = t => +((t.match(/translate\(([-\d.]+)/) || [0, 0])[1]);
    rec('the Owl looks where the pointer is (pupils right, then left)', num(right) > 4 && num(left) < -4, right + ' / ' + left);
    rec('the pupils never leave the iris (max 9 units)', Math.abs(num(right)) <= 9.01 && Math.abs(num(left)) <= 9.01);
    let blinked = false; for (let i = 0; i < 30 && !blinked; i++) { blinked = await p.evaluate(S => document.querySelector(S + ' .face svg').classList.contains('blink'), S); await p.waitForTimeout(180); }
    rec('the Owl blinks now and then', blinked);
    rec('the beak is the play triangle and the button has a clear name', await p.evaluate(S => /M88 118L118 136 88 154z/.test(document.querySelector(S + ' .beak').getAttribute('d')) && document.querySelector(S + ' .owlbtn').getAttribute('aria-label') === 'Play the full crew film', S));
    await p.click(S + ' .owlbtn'); await p.waitForTimeout(400);
    rec('pressing the Owl opens the full film on YouTube ehKLv5DF2TQ', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]'))); await p.keyboard.press('Escape');
    rec('one next step: Get My Roof Checked goes to booking', await p.evaluate(S => document.querySelector(S + ' .bar a').getAttribute('href') === '#book', S));
  },
  '12': async (p, S, rec) => {
    await p.waitForTimeout(1200);
    rec('before ringing the screen dozes: a blurred still and "Press the doorbell", no film playing', await p.evaluate(S => { const sc = document.querySelector(S + ' .scr'), v = document.querySelector(S + ' video'); return !sc.classList.contains('awake') && v.paused && /blur/.test(getComputedStyle(v).filter) && /Press the doorbell/.test(sc.textContent); }, S));
    rec('the screen never claims a live feed (no "Live", no clock)', await p.evaluate(S => !/\blive\b/i.test(document.querySelector(S + ' .scr').textContent) && !/\d{1,2}:\d{2}/.test(document.querySelector(S + ' .scr').textContent), S));
    await p.click(S + ' .bell'); await p.waitForTimeout(250);
    rec('pressing the bell rings: glow waves go out', await p.evaluate(S => document.querySelector(S + ' .bell').classList.contains('ringing'), S));
    await p.waitForTimeout(1500);
    rec('then the doorbell screen wakes and Owl’s crew film plays, labelled Front door', await p.evaluate(S => { const sc = document.querySelector(S + ' .scr'), v = document.querySelector(S + ' video'); return sc.classList.contains('awake') && v.dataset.media === 'crew' && !v.paused && getComputedStyle(v).filter === 'none' && /Front door/.test(document.querySelector(S + ' .chip').textContent); }, S));
    rec('the page names who it is and offers the real call', await p.evaluate(S => /That’s Owl’s crew/.test(document.querySelector(S + ' .say').textContent) && document.querySelector(S + ' .call').getAttribute('href') === 'tel:+16519776027' && document.querySelector(S + ' .call').textContent.trim() === 'Call (651) 977-6027', S));
    await p.focus(S + ' .bell'); await p.keyboard.press('Enter'); await p.waitForTimeout(120);
    rec('the bell is a real named button (Enter rings it)', await p.evaluate(S => { const b = document.querySelector(S + ' .bell'); return b.tagName === 'BUTTON' && /Ring the doorbell/.test(b.getAttribute('aria-label')) && b.classList.contains('ringing'); }, S));
    await p.click(S + ' .full'); await p.waitForTimeout(400);
    rec('the full film opens YouTube ehKLv5DF2TQ', await p.evaluate(() => !!document.querySelector('dialog.ytm iframe[src*="ehKLv5DF2TQ"]'))); await p.keyboard.press('Escape');
  }
};

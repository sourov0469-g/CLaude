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
  }
};

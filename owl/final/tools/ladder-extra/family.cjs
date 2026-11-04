// Ladder interaction checks for new We Give a Hoot versions (Owl's own family and crew photos; captions say only what is shown).
module.exports = {
  '4': async (p, S, rec, txt) => {
    rec('the tagline is the control: three word buttons spelling We Give a Hoot', await p.evaluate(S => [...document.querySelectorAll(S + ' .w')].map(b => b.textContent).join(' ') === 'We Give a Hoot', S));
    await p.hover(S + ' .w:nth-child(3)'); await p.waitForTimeout(900);
    rec('hovering "a Hoot" reveals the crew photo with a truthful caption', await p.evaluate(S => document.querySelector(S + ' .over').alt.includes('crew') && /the crew on a roof/.test(document.querySelector(S + ' figcaption').textContent) && parseFloat(document.querySelector(S + ' .over').style.getPropertyValue('--r')) > 50, S));
    await p.click(S + ' .w:nth-child(1)'); await p.waitForTimeout(300);
    rec('"We" holds both founding families (a second press shows the Berglands)', await p.evaluate(S => /Noah Bergland/.test(document.querySelector(S + ' .over').alt), S));
    rec('names the founders as locked', /Tim Brown and Noah Bergland/.test(txt));
  },
  '5': async (p, S, rec, txt) => {
    rec('two eyes, two founding-family photos', await p.evaluate(S => document.querySelectorAll(S + ' .eye image').length === 2, S));
    await p.click(S + ' .pick button[data-k="1"]'); await p.waitForTimeout(200);
    rec('choosing the Berglands lights that eye and says who they are', await p.evaluate(S => document.querySelectorAll(S + ' .eye')[1].classList.contains('on') && /Noah Bergland, co-founder/.test(document.querySelector(S + ' .say').textContent), S));
    rec('founding facts as locked (2025, Shoreview, Tim Brown and Noah Bergland)', /2025/.test(txt) && /Shoreview/.test(txt) && /Tim Brown and Noah Bergland/.test(txt));
  },
  '6': async (p, S, rec, txt) => {
    rec('founding facts as locked (family-owned, 2025, Shoreview, Tim Brown, Noah Bergland)', /family-owned/i.test(txt) && /2025/.test(txt) && /Shoreview/.test(txt) && /Tim Brown/.test(txt) && /Noah Bergland/.test(txt) && await p.evaluate(S => /WE GIVE A HOOT/.test(document.querySelector(S + ' svg').textContent), S));
    rec('the two founding families are real photos with true alts', await p.evaluate(S => { const i = [...document.querySelectorAll(S + ' .ph img')]; return i.length === 2 && i.every(x => x.src.startsWith('data:image') && x.naturalWidth > 0) && /Tim Brown/.test(i[0].alt) && /Noah Bergland/.test(i[1].alt); }, S));
    await p.waitForTimeout(1600);
    rec('the porch light comes on when the porch is seen', await p.evaluate(S => document.querySelector(S + ' .scene').classList.contains('lit') && document.querySelector(S + ' .sw').getAttribute('aria-pressed') === 'true', S));
    await p.click(S + ' .sw'); await p.waitForTimeout(300);
    rec('the switch turns it off and says so', await p.evaluate(S => !document.querySelector(S + ' .scene').classList.contains('lit') && document.querySelector(S + ' .sw').getAttribute('aria-pressed') === 'false', S));
    await p.click(S + ' .sw'); await p.waitForTimeout(1400);
    rec('…and on again: the dusk lifts and the glow falls on the photos', await p.evaluate(S => getComputedStyle(document.querySelector(S + ' .dusk')).opacity < .05 && getComputedStyle(document.querySelector(S + ' .glow')).opacity > .95, S));
  },
  '7': async (p, S, rec, txt) => {
    await p.waitForTimeout(1800);
    rec('five real photos as prints, every one with a true description', await p.evaluate(S => { const b = [...document.querySelectorAll(S + ' .pr')]; return b.length === 5 && b.every(x => x.querySelector('img').src.startsWith('data:image') && x.getAttribute('aria-label').length > 20) && /Tim Brown/.test(b[0].getAttribute('aria-label')) && /Noah Bergland/.test(b[1].getAttribute('aria-label')); }, S));
    rec('the patch carries only locked facts', await p.evaluate(S => { const t = document.querySelector(S + ' .patch').textContent; return /FAMILY-OWNED/.test(t) && /EST\. 2025/.test(t) && /SHOREVIEW, MN/.test(t) && /WE GIVE A HOOT/.test(t); }, S));
    const pos = s => p.evaluate(([S, s]) => { const e = document.querySelector(S + ' .pr:nth-of-type(' + s + ')'); return [parseFloat(e.style.getPropertyValue('--x')), parseFloat(e.style.getPropertyValue('--y'))]; }, [S, s]);
    const home = await pos(1); const bb = await p.evaluate(S => { const r = document.querySelector(S + ' .pr').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, S);
    await p.mouse.move(bb[0], bb[1]); await p.mouse.down(); await p.mouse.move(bb[0] + 220, bb[1] + 90, { steps: 10 }); await p.mouse.up(); await p.waitForTimeout(1200);
    const moved = await pos(1);
    rec('a print drags and settles where it is dropped', moved[0] > home[0] + 150 && moved[1] > home[1] + 50);
    await p.focus(S + ' .pr >> nth=1'); const k0 = await pos(2); await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(1000);
    const k1 = await pos(2);
    rec('arrow keys move a focused print', k1[0] < k0[0] - 30);
    await p.click(S + ' .tidy'); await p.waitForTimeout(1600);
    const back = await pos(1);
    rec('Tidy Up eases every print home', Math.abs(back[0] - home[0]) < 3 && Math.abs(back[1] - home[1]) < 3);
  },
  '8': async (p, S, rec, txt) => {
    rec('founding facts as locked (family-owned, 2025, Shoreview)', await p.evaluate(S => /Est\. 2025 · Shoreview, MN/.test(document.querySelector(S + ' svg').textContent), S) && /Family-owned since 2025/i.test(txt));
    await p.waitForTimeout(2600);
    rec('the branches grow and five frames hold Owl’s real photos', await p.evaluate(S => document.querySelector(S + ' .tree').classList.contains('grow') && [...document.querySelectorAll(S + ' .fr')].length === 5 && [...document.querySelectorAll(S + ' .fr img')].every(i => i.src.startsWith('data:image') && i.naturalWidth > 0), S));
    rec('every frame has a true description', await p.evaluate(S => [...document.querySelectorAll(S + ' .fr')].every(b => b.getAttribute('aria-label').length > 12) && /Tim Brown/.test(document.querySelector(S + ' .fr').getAttribute('aria-label')), S));
    await p.click(S + ' .fr >> nth=1'); await p.waitForTimeout(400);
    rec('choosing a frame opens it larger with its caption (the Berglands)', await p.evaluate(S => document.querySelector(S + ' .card b').textContent === 'The Berglands' && /Noah Bergland, co-founder/.test(document.querySelector(S + ' .card p').textContent) && document.querySelector(S + ' .card img').alt.length > 10 && document.querySelectorAll(S + ' .fr[aria-pressed="true"]').length === 1, S));
  },
  '9': async (p, S, rec, txt) => {
    rec('founding facts as locked', /Tim Brown/.test(txt) && /Noah Bergland/.test(txt) && /2025/.test(txt) && /Shoreview/.test(txt));
    await p.waitForTimeout(2600);
    rec('on first view the owl hoots silently and four photos come into orbit', await p.evaluate(S => [...document.querySelectorAll(S + ' .orb')].every(o => o.style.getPropertyValue('--s') === '1') && [...document.querySelectorAll(S + ' .orb img')].every(i => i.src.startsWith('data:image') && i.alt.length > 8), S));
    await p.evaluate(S => { window.__tones = 0; const AC = window.AudioContext; window.AudioContext = function(){ const a = new AC(); const o = a.createOscillator.bind(a); a.createOscillator = function(){ window.__tones++; return o(); }; return a; }; }, S);
    await p.click(S + ' .hoot'); await p.waitForTimeout(500);
    rec('pressing Give a Hoot plays the two-note hoot and ripples go out', await p.evaluate(S => window.__tones === 2 && document.querySelectorAll(S + ' .ring.go').length >= 2 && /We give a hoot/.test(document.querySelector(S + ' .say').textContent), S));
    await p.click(S + ' .snd'); await p.waitForTimeout(1200); await p.click(S + ' .hoot'); await p.waitForTimeout(300);
    rec('with Sound off the hoot is silent', await p.evaluate(S => window.__tones === 2 && document.querySelector(S + ' .snd').getAttribute('aria-pressed') === 'false', S));
  }
};

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
  }
};

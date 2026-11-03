// Ladder interaction checks for new Booking versions (no form may claim a request was saved or sent).
module.exports = {
  '4': async (p, S, rec, txt) => {
    rec('twelve working days from tomorrow; Sundays shown closed, never bookable', await p.evaluate(S => document.querySelectorAll(S + ' .day').length === 12 && [...document.querySelectorAll(S + ' .day')].every(b => !/^Sun/.test(b.getAttribute('aria-label'))) && document.querySelectorAll(S + ' .closed').length >= 1, S));
    rec('hours stated as locked: Monday to Saturday, 08:00–18:00', /Monday to Saturday, 08:00–18:00/.test(txt));
    await p.click(S + ' .day:nth-of-type(1)').catch(() => {}); await p.evaluate(S => document.querySelectorAll(S + ' .day')[2].click(), S); await p.waitForTimeout(400);
    rec('choosing a day slides up the short form and states it as a preference to confirm', await p.evaluate(S => !document.querySelector(S + ' .sheet').hidden && /Preferred: .+ We.ll call to confirm/.test(document.querySelector(S + ' .sum').textContent), S));
    await p.focus(S + ' .day[aria-pressed="true"]'); await p.keyboard.press('ArrowRight');
    rec('arrow keys move across the days (roving tabindex)', await p.evaluate(S => document.activeElement === document.querySelectorAll(S + ' .day')[3] && document.querySelectorAll(S + ' .day')[3].tabIndex === 0, S));
    await p.click(S + ' .sheet button[type=submit]'); await p.waitForTimeout(200);
    rec('empty submit asks for the name and marks it', await p.evaluate(S => /Please add your name/.test(document.querySelector(S + ' .form-msg').textContent) && document.querySelector('#bk4-n').getAttribute('aria-invalid') === 'true', S));
    await p.fill('#bk4-n', 'Test Person'); await p.fill('#bk4-p', '6515550100'); await p.fill('#bk4-a', '1 Test St');
    await p.route('mailto:*', r => r.abort()).catch(() => {}); await p.click(S + ' .sheet button[type=submit]').catch(() => {}); await p.waitForTimeout(300);
    rec('submit hands off to email and never claims it was saved or sent', await p.evaluate(S => /email app should open/.test(document.querySelector(S + ' .form-msg').textContent) && !/(has been|was) (sent|saved|received)/i.test(document.querySelector(S).innerText), S).catch(() => false));
  },
  '5': async (p, S, rec, txt) => {
    rec('the clock carries the locked hours as an arc, and the hands are set', await p.evaluate(S => !!document.querySelector(S + ' .arc') && /rotate\(/.test(document.querySelector(S + ' .hh').style.transform), S));
    rec('status is computed from the locked hours in Shoreview time', await p.evaluate(S => { const t = document.querySelector(S + ' .status span').textContent; return /^Open now, until 18:00 \(Shoreview time\)$/.test(t) || /^Closed now\. Opens (today|tomorrow|Monday) at 08:00 \(Shoreview time\)$/.test(t); }, S));
    rec('the phone, email and office are the locked ones', /\(651\) 977-6027/.test(txt) && /info@owlroofing\.com/.test(txt) && /1000 County Rd E #230, Shoreview, MN 55126/.test(txt));
    rec('the big call key dials (651) 977-6027', await p.evaluate(S => document.querySelector(S + ' .call').getAttribute('href') === 'tel:+16519776027', S));
  }
};

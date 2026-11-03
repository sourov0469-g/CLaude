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
  },
  '6': async (p, S, rec, txt) => {
    rec('locked contacts: only (651) 977-6027; honest hand-off wording', /\(651\) 977-6027/.test(txt) && /Nothing is sent until you send it/.test(txt) && !/(request|booking) (has been |was )?(sent|received|saved|confirmed)/i.test(txt));
    await p.route('mailto:*', r => r.abort()).catch(() => {});
    await p.click(S + ' button[type=submit]'); await p.waitForTimeout(300);
    rec('an empty sheet asks for the name first and does not stamp', await p.evaluate(S => /Please add your name/.test(document.querySelector(S + ' .form-msg').textContent) && document.activeElement.id === 'bk6-n' && !document.querySelector(S + ' .stamp').classList.contains('on'), S));
    await p.fill(S + ' #bk6-n', 'Jo Smith'); await p.fill(S + ' #bk6-p', '651 555 0100'); await p.fill(S + ' #bk6-a', '1 Main St, Shoreview');
    await p.click(S + ' .chips button >> nth=1'); await p.waitForTimeout(200);
    rec('filling the sheet ticks the checklist, chips choose one', await p.evaluate(S => document.querySelectorAll(S + ' .list li.ok').length === 4 && document.querySelectorAll(S + ' .chips [aria-pressed="true"]').length === 1, S));
    await p.click(S + ' button[type=submit]').catch(() => {}); await p.waitForTimeout(400);
    rec('a valid sheet hands off to email: honest message, sheet lifts, stamp "Over to your email"', await p.evaluate(S => /Your email app should open with these details\. Send it from there, or call \(651\) 977-6027\./.test(document.querySelector(S + ' .form-msg').textContent) && document.querySelector(S + ' .stamp').classList.contains('on') && document.querySelector(S + ' .stamp').textContent === 'Over to your email', S));
    rec('the stamp never says sent or booked', await p.evaluate(S => !/sent|booked|received|confirmed/i.test(document.querySelector(S + ' .stamp').textContent), S));
  },
  '7': async (p, S, rec, txt) => {
    rec('three doors: call, write, find', await p.evaluate(S => [...document.querySelectorAll(S + ' .door .lb')].map(x => x.textContent).join('|') === 'Call us|Write to us|Find us', S));
    rec('closed doors keep their way in out of reach (inert)', await p.evaluate(S => [...document.querySelectorAll(S + ' .way')].every(w => w.hasAttribute('inert')), S));
    await p.click(S + ' .door >> nth=0'); await p.waitForTimeout(1000);
    rec('door 1 swings in on the locked phone and hours', await p.evaluate(S => { const d = document.querySelector(S + ' .door'), w = document.querySelector(S + ' #bk7-in0'); return d.getAttribute('aria-expanded') === 'true' && !w.hasAttribute('inert') && w.querySelector('a').getAttribute('href') === 'tel:+16519776027' && /\(651\) 977-6027/.test(w.textContent) && /Mon–Sat, 08:00–18:00/.test(w.textContent); }, S));
    rec('the open door stays inside its frame (swings in, not out)', await p.evaluate(S => { const b = document.querySelector(S + ' .bay').getBoundingClientRect(), d = document.querySelector(S + ' .door').getBoundingClientRect(); return d.left >= b.left - 2 && d.right <= b.right + 2 && d.top >= b.top - 2 && d.bottom <= b.bottom + 2; }, S));
    await p.click(S + ' .door >> nth=1'); await p.waitForTimeout(1000);
    rec('opening door 2 closes door 1; email is the locked address', await p.evaluate(S => { const d = [...document.querySelectorAll(S + ' .door')]; return d[1].getAttribute('aria-expanded') === 'true' && d[0].getAttribute('aria-expanded') === 'false' && document.querySelector(S + ' #bk7-in0').hasAttribute('inert') && /^mailto:info@owlroofing\.com/.test(document.querySelector(S + ' #bk7-in1 a').getAttribute('href')); }, S));
    await p.focus(S + ' .door >> nth=2'); await p.keyboard.press('Enter'); await p.waitForTimeout(900);
    rec('keyboard opens door 3 on the locked address', await p.evaluate(S => /Owl Roofing LLC/.test(document.querySelector(S + ' #bk7-in2').textContent) && /1000 County Rd E #230/.test(document.querySelector(S + ' #bk7-in2').textContent) && /Shoreview, MN 55126/.test(document.querySelector(S + ' #bk7-in2').textContent) && document.querySelectorAll(S + ' .door[aria-expanded="true"]').length === 1, S));
    await p.focus(S + ' .door >> nth=0'); await p.keyboard.press('Enter'); await p.waitForTimeout(900); await p.keyboard.press('Tab');
    rec('Tab from an open door goes straight to its way in (the phone link)', await p.evaluate(S => document.activeElement.getAttribute('href') === 'tel:+16519776027', S));
  }
};

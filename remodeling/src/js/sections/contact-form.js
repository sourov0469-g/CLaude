/* FINALIZE · Contact 1 · Hero (the owner's merge). The call side reads the published hours through EZ.openStatus (one
   source of truth with the footer and Home Consult); the letter validates inline, then composes an email in the
   visitor's own mail app (said before sending, never claimed as sent). Helpers kept from the reviewed build. */
(function () {
  var TO = 'Sales@elbazconstruction.com';
  var LABEL = { name: 'your full name', phone: 'a phone number', email: 'an email address', address: 'the property address', project: 'what you want to change' };
  // the firm's published services, in its own order (FACTS.md "Services")
  var WORK = [['Kitchen Remodeling', 'hood'], ['Bathroom Remodeling', 'shower'], ['Whole-Home Renovation', 'house'], ['ADUs & Additions', 'stairs'],
    ['New Construction', 'crane'], ['Commercial Remodeling', 'briefcase'], ['Flooring', 'grid'], ['Roofing', 'ladder'], ['Windows & Doors', 'window'],
    ['Outdoor Living', 'palm'], ['Planning & Permitting', 'ledger']];
  function check(form, names) {
    var f = form.elements, errs = [];
    names.forEach(function (n) {
      var el = f[n]; if (!el || n === 'consent') return;
      var v = (el.value || '').trim(), msg = '';
      if (!v) msg = 'Please add ' + LABEL[n] + '.';
      else if (n === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'That email address does not look complete.';
      else if (n === 'phone' && v.replace(/\D/g, '').length < 10) msg = 'Please include the area code.';
      errs.push({ el: el, msg: msg });
    });
    var c = f.consent;
    if (c && names.indexOf('consent') > -1) errs.push({ el: c, msg: c.checked ? '' : 'Please tick the box so we may contact you about this enquiry.' });
    return errs;
  }
  function show(errs, form, k) {
    errs.forEach(function (e) {
      var box = form.querySelector('#' + e.el.id + '-err');
      e.el.setAttribute('aria-invalid', e.msg ? 'true' : 'false');
      if (box) { box.textContent = e.msg; box.hidden = !e.msg; e.el.setAttribute('aria-describedby', box.id); }
    });
    var first = errs.filter(function (e) { return e.msg; })[0];
    if (first) {
      first.el.focus();
      if (k && k.motion) gsap.fromTo(first.el.closest('.c-f, .c-consent, .fm3__blank') || first.el, { x: 0 }, { keyframes: [{ x: 6, duration: .08 }, { x: -6, duration: .08 }, { x: 4, duration: .06 }, { x: 0, duration: .06 }] });
    }
    return !first;
  }
  function v(form, n) { var el = form.elements[n]; return el ? (el.value || '').trim() : ''; }
  function compose(form, head) {
    var lines = (head || []).slice();
    [['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'], ['address', 'Property address'], ['project', 'Project'], ['notes', 'Notes'], ['contact', 'Preferred contact']].forEach(function (p) {
      var x = v(form, p[0]); if (x) lines.push(p[1] + ': ' + x);
    });
    lines.push('', 'I agree to be contacted by Elbaz Construction about this enquiry. Message and data rates may apply.');
    return 'mailto:' + TO + '?subject=' + encodeURIComponent('Consultation request from ' + v(form, 'name')) + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  function done(form) {
    var d = form.querySelector('.c-done');
    d.innerHTML = 'Your email app should now be open with your request to ' + TO + '. Send it from there and we will come back to you, usually the same or next working day. If it is urgent, call <a class="link" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>.';
    d.hidden = false;
    if (EZ.bindOne) EZ.bindOne(d.querySelector('a'), form._kit);
  }
  function liveClear(form, k) {
    form._kit = k;
    form.querySelectorAll('input, textarea').forEach(function (el) {
      // a filled field is checked when it is left; an empty one is only flagged on send
      k.on(el, 'blur', function () {
        if (!el.value || !LABEL[el.name]) return;
        var e = check(form, [el.name])[0], b = el.id && form.querySelector('#' + el.id + '-err');
        if (!e || !e.msg || !b) return;
        b.textContent = e.msg; b.hidden = false; el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', b.id);
      });
      k.on(el, 'input', function () { var b = el.id && form.querySelector('#' + el.id + '-err'); if (b && !b.hidden) { b.hidden = true; el.setAttribute('aria-invalid', 'false'); } });
      k.on(el, 'change', function () { var b = el.id && form.querySelector('#' + el.id + '-err'); if (b && !b.hidden && el.checked) { b.hidden = true; } });
    });
    k.add(function () { form.reset(); form.querySelectorAll('.c-err, .c-done').forEach(function (b) { b.hidden = true; }); form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); }); });
  }
  function send(form, url) { (EZ.consultMail || function (u) { window.location.href = u; })(url); done(form); }
  if (!EZ.consultMail) EZ.consultMail = function (url) { window.location.href = url; };   // tests replace this to intercept the mailto navigation
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  EZ.section('contact-form', { 1: { init: function (root, k) {
    var st = root.querySelector('.fm5__open'), stt = root.querySelector('.fm5__st');
    function status() { var o = EZ.openStatus(); st.classList.toggle('is-open', o.open); stt.textContent = o.text; }
    status(); (function tick() { k.timeout(function () { status(); tick(); }, 60000); })();
    var form = root.querySelector('form');
    liveClear(form, k);
    k.on(form, 'submit', function (e) {
      e.preventDefault();
      if (!show(check(form, ['name', 'project', 'address', 'phone', 'email', 'consent']), form, k)) return;
      send(form, compose(form));
    });
    EZ.reveal(k, root.querySelectorAll('.fm5__call > *'));
    if (k.motion) gsap.from(root.querySelectorAll('.fm3__blank'), { '--u': 0, duration: .5, stagger: .08, ease: 'power2.out', delay: .3 });
  } } });
})();

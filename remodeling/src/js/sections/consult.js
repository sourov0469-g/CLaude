/* FINALIZE · Home 10 · Consult. No server in this file: validate inline, then compose an email to the firm in the
   visitor's own mail app (said before sending; never claimed as sent). Helpers kept from the reviewed build.
   V1 · the guided sentence: the note's blanks grow with what is typed; every choice group has an open path.
   V2 · the calm form with the phone desk: a live open or closed line from the published hours (Miami time). */
(function () {
  var TO = 'Sales@elbazconstruction.com';
  var LABEL = { name: 'your full name', phone: 'a phone number', email: 'an email address', address: 'the property address', project: 'what you want to change' };
  function check(form, names) {
    var f = form.elements, errs = [];
    names.forEach(function (n) {
      var el = f[n]; if (!el) return;
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
      if (k && k.motion) gsap.fromTo(first.el.closest('.c-f, .c-consent') || first.el, { x: 0 }, { keyframes: [{ x: 6, duration: .08 }, { x: -6, duration: .08 }, { x: 4, duration: .06 }, { x: 0, duration: .06 }] });   // S0409 error shake
    }
    return !first;
  }
  function compose(lines, name) {
    lines.push('', 'I agree to be contacted by Elbaz Construction about this enquiry. Message and data rates may apply.');
    return 'mailto:' + TO + '?subject=' + encodeURIComponent('Consultation request from ' + name) + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  function v(form, n) { var el = form.elements[n]; return el ? (el.value || '').trim() : ''; }
  function done(form) {
    var d = form.querySelector('.c-done');
    d.innerHTML = 'Your email app should now be open with your request to ' + TO + '. Send it from there and we will come back to you, usually the same or next working day. If it is urgent, call <a class="link" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>.';
    d.hidden = false;
    if (EZ.bindOne) EZ.bindOne(d.querySelector('a'), form._kit);   // the late call link reacts like every other [AUDIT-01 D.2.4]
  }
  function liveClear(form, k) {
    form._kit = k;
    form.querySelectorAll('input, textarea').forEach(function (el) {
      // a filled field is checked when it is left; an empty one is only flagged on send (no nagging on tab-through)
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
  if (!EZ.consultMail) EZ.consultMail = function (url) { window.location.href = url; };   // tests replace this to intercept the mailto navigation


  function grow(inp) { inp.size = Math.max((inp.getAttribute('placeholder') || '').length, (inp.value || '').length + 1, 6); }
  function radio(form, n) { var r = form.querySelector('input[name="' + n + '"]:checked'); return r ? r.value : ''; }

  EZ.section('consult', {
    1: { init: function (root, k) {
      // OWNER · the call card: digits dial in a wave, the live open/closed light, copy with a confirmation, a gentle lean
      (function () {
        var cl = root.querySelector('.cl'); if (!cl) return;
        var num = cl.querySelector('.cl__num'), call = cl.querySelector('.cl__call'), st = cl.querySelector('.cl__stt'), cp = cl.querySelector('.cl__copy'), cpl = cp.querySelector('.cl__cl');
        var raw = num.textContent; num.setAttribute('aria-label', raw.replace(/\u00a0/g, ' ').replace(/\u2011/g, '-'));
        num.innerHTML = raw.split('').map(function (ch, i) { return '<span class="d" aria-hidden="true" style="--i:' + i + '">' + (ch === ' ' ? '&nbsp;' : ch) + '</span>'; }).join('');
        function upd() { var o = EZ.openStatus(); cl.classList.toggle('is-open', o.open); st.textContent = o.text; }
        upd(); var iv = setInterval(upd, 30000); k.add(function () { clearInterval(iv); num.textContent = raw; cl.classList.remove('is-open'); });
        var tm = 0;
        k.on(cp, 'click', function () {
          function done() { cp.classList.add('is-done'); cpl.textContent = 'Copied'; clearTimeout(tm); tm = setTimeout(function () { cp.classList.remove('is-done'); cpl.textContent = 'Copy number'; }, 1800); }
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(cp.dataset.n).then(done, function () { cpl.textContent = cp.dataset.n; });
          else cpl.textContent = cp.dataset.n;
        });
        k.add(function () { clearTimeout(tm); });
        if (!k.motion || !k.fine) return;
        k.on(call, 'pointermove', function (e) { var r = call.getBoundingClientRect(); call.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5) * 8 + 'px'); call.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5) * 6 + 'px'); });
        k.on(call, 'pointerleave', function () { call.style.removeProperty('--mx'); call.style.removeProperty('--my'); });
      })();
      var form = root.querySelector('.gs__note'), other = root.querySelector('.gs__other'), otherIn = other.querySelector('input');
      var firstP = form.querySelector('input[name="project"]'); firstP.id = 'gs-project';
      liveClear(form, k);
      form.querySelectorAll('.gs__b input').forEach(function (inp) { grow(inp); k.on(inp, 'input', function () { grow(inp); }); });
      form.querySelectorAll('input[name="project"]').forEach(function (r) {
        k.on(r, 'change', function () {
          other.hidden = radio(form, 'project') !== 'other';
          if (!other.hidden) otherIn.focus();
          var b = form.querySelector('#gs-project-err'); b.hidden = true;
        });
      });
      k.add(function () { other.hidden = true; form.querySelectorAll('.gs__b input').forEach(grow); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var errs = check(form, ['name', 'address', 'phone', 'email']);
        var p = radio(form, 'project');
        errs.unshift({ el: firstP, msg: !p ? 'Please pick what you would like to talk about, or choose not sure yet.' : (p === 'other' && !otherIn.value.trim() ? 'Please add a few words about it, or choose not sure yet.' : '') });
        errs = errs.concat(check(form, ['consent']));
        if (!show(errs, form, k)) return;
        var topic = p === 'other' ? otherIn.value.trim() : p, how = radio(form, 'contact');
        var lines = [
          'Hi, my name is ' + v(form, 'name') + '.',
          'I would like to talk about ' + topic + '.',
          'The property is at ' + v(form, 'address') + '.',
          'The easiest way to reach me is ' + ({ Phone: 'a call', Text: 'a text', Email: 'an email' }[how] || 'whichever is easiest') + ', on ' + v(form, 'phone') + ' or at ' + v(form, 'email') + '.'
        ];
        if (v(form, 'notes')) lines.push('', 'Anything else: ' + v(form, 'notes'));
        EZ.consultMail(compose(lines, v(form, 'name')));
        done(form);
      });
      EZ.reveal(k, root.querySelectorAll('.gs__side > *'));
      if (k.motion) {   // the note is written in as it arrives: line by line, the clay underlines drawn left to right
        var parts = form.querySelectorAll('.gs__s, .gs__chips, .gs__send');
        gsap.set(parts, { autoAlpha: 0, y: 10 });
        var st = ScrollTrigger.create({ trigger: form, start: 'top 78%', once: true, onEnter: function () {
          gsap.to(parts, { autoAlpha: 1, y: 0, duration: .4, ease: 'power2.out', stagger: .07 });
        } });
        k.add(function () { st.kill(); gsap.set(parts, { clearProps: 'all' }); });
      }
    } },

    2: { init: function (root, k) {
      var form = root.querySelector('.cf__form'), st = root.querySelector('.cf__st'), stt = root.querySelector('.cf__stt');
      var firstR = form.querySelector('input[name="rooms"]'); firstR.id = 'cf-rooms';
      liveClear(form, k);
      // the phone desk: open or closed now, from the published hours (Sun to Fri 7am to 7pm, Saturday closed), Miami time
      function status() { var o = EZ.openStatus(); st.classList.toggle('is-open', o.open); stt.textContent = o.text; }
      status();
      (function tick() { k.timeout(function () { status(); tick(); }, 60000); })();
      form.querySelectorAll('input[name="rooms"]').forEach(function (c) { k.on(c, 'change', function () { form.querySelector('#cf-rooms-err').hidden = true; }); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var rooms = Array.prototype.map.call(form.querySelectorAll('input[name="rooms"]:checked'), function (c) { return c.value; });
        var errs = [{ el: firstR, msg: rooms.length ? '' : 'Please pick at least one, or choose not sure yet.' }].concat(check(form, ['name', 'phone', 'email', 'address', 'consent']));
        if (!show(errs, form, k)) return;
        var lines = ['What I would like to change: ' + rooms.join(', '), '', 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Property address: ' + v(form, 'address')];
        if (v(form, 'notes')) lines.push('Project description: ' + v(form, 'notes'));
        lines.push('Preferred contact method: ' + radio(form, 'contact'));
        EZ.consultMail(compose(lines, v(form, 'name')));
        done(form);
      });
      EZ.reveal(k, root.querySelectorAll('.cf__desk > *, .cf__form'));
    } }
  });
})();

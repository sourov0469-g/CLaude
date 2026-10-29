/* consult [PLAN-V2 2.9] — no server in this file: validate inline, then compose an email to the firm (stated before sending) */
(function () {
  var TO = 'Sales@elbazconstruction.com';
  var LABEL = { name: 'your full name', phone: 'a phone number', email: 'an email address', address: 'the property address', project: 'what you want to change' };
  function check(form) {
    var f = form.elements, errs = [];
    ['name', 'phone', 'email', 'address', 'project'].forEach(function (n) {
      var el = f[n]; if (!el) return;
      var v = (el.value || '').trim(), msg = '';
      if (!v) msg = 'Please add ' + LABEL[n] + '.';
      else if (n === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'That email address does not look complete.';
      else if (n === 'phone' && v.replace(/\D/g, '').length < 10) msg = 'Please include the area code.';
      errs.push({ el: el, msg: msg });
    });
    var c = f.consent;
    if (c) errs.push({ el: c, msg: c.checked ? '' : 'Please tick the box so we may contact you about this enquiry.' });
    return errs;
  }
  function show(errs, form) {
    errs.forEach(function (e) {
      var box = e.el.id ? form.querySelector('#' + e.el.id + '-err') : null;
      if (!box && e.el.name === 'consent') box = form.querySelector('[id$="consent-err"]');
      e.el.setAttribute('aria-invalid', e.msg ? 'true' : 'false');
      var wrap = e.el.closest('.c1__f'); if (wrap) wrap.classList.toggle('is-bad', !!e.msg);
      if (box) { box.textContent = e.msg; box.hidden = !e.msg; if (e.el.id) e.el.setAttribute('aria-describedby', box.id); }
    });
    var first = errs.filter(function (e) { return e.msg; })[0];
    if (first) first.el.focus();
    return !first;
  }
  function compose(form) {
    var f = form.elements, contact = (form.querySelector('[name="contact"]:checked') || f.contact || {}).value || '';
    var body = [
      'Full name: ' + f.name.value.trim(), 'Phone: ' + f.phone.value.trim(), 'Email: ' + f.email.value.trim(),
      'Address: ' + f.address.value.trim(), 'Project: ' + f.project.value.trim(), 'Preferred contact: ' + contact, '',
      'I agree to be contacted by Elbaz Construction about this enquiry. Message and data rates may apply.'
    ].join('\n');
    return 'mailto:' + TO + '?subject=' + encodeURIComponent('Consultation request from ' + f.name.value.trim()) + '&body=' + encodeURIComponent(body);
  }
  function done(form) {
    var d = form.querySelector('.c__done');
    d.innerHTML = 'Your email app should now be open with your request to ' + TO + '. Send it from there and we will come back to you, usually the same or next working day. If it is urgent, call <a class="link" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>.';
    d.hidden = false;
    return d;
  }
  function openMail(url) { window.location.href = url; }
  EZ.consultMail = openMail;   // tests replace this to intercept the mailto navigation
  function liveClear(form, k) {
    form.querySelectorAll('input, textarea').forEach(function (el) {
      k.on(el, 'input', function () {
        if (el.getAttribute('aria-invalid') === 'true') show([{ el: el, msg: '' }], form);
        var w = el.closest('.c1__f'); if (w) w.classList.toggle('is-filled', !!el.value);
      });
    });
  }

  EZ.section('consult', {
    /* v1 · the form, with the circular progress submit */
    1: { init: function (root, k) {
      var form = root.querySelector('.consult1__form'), btn = form.querySelector('.pbtn'), ring = form.querySelector('.pbtn__ring circle');
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form), form)) return;
        var url = compose(form);
        // the button reports the real state: label out (.15s), pill -> circle, ring draws while the email is composed, tick on success
        btn.classList.add('is-loading'); btn.disabled = true;
        var steps = k.motion ? 1 : 0;
        k.ctx.add(function () {
          gsap.fromTo(ring, { strokeDashoffset: 204.2 }, { strokeDashoffset: 0, duration: steps ? .9 : 0, ease: 'power1.inOut', delay: steps ? .3 : 0, onComplete: function () {
            EZ.consultMail(url);
            btn.classList.remove('is-loading'); btn.classList.add('is-success');
            done(form);
          } });
        });
      });
      k.add(function () { btn.classList.remove('is-loading', 'is-success'); btn.disabled = false; });
      EZ.reveal(k, root.querySelectorAll('.consult1__side > *'));
      EZ.reveal(k, root.querySelectorAll('.consult1__form'));
    } },

    /* v2 · four short steps in an overlay */
    2: { init: function (root, k) {
      var openBtn = root.querySelector('.consult2__open'), ov = root.querySelector('.consult2__overlay'), form = ov.querySelector('form');
      var steps = Array.prototype.slice.call(form.querySelectorAll('.consult2__step'));
      var cur = 0, curEl = form.querySelector('.consult2__cur');
      var back = form.querySelector('.consult2__back'), next = form.querySelector('.consult2__next'), send = form.querySelector('.consult2__send');
      var prevFocus = null;
      liveClear(form, k);
      function go(i, dir) {
        var from = steps[cur], to = steps[i];
        cur = i; curEl.textContent = ('0' + (i + 1)).slice(-2);
        back.disabled = i === 0; next.hidden = i === steps.length - 1; send.hidden = i !== steps.length - 1;
        from.hidden = true; to.hidden = false;
        if (k.motion) k.ctx.add(function () { gsap.fromTo(to, { x: 24 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .3, ease: 'power2.out' }); });
        var f = to.querySelector('input, textarea'); if (f) f.focus();
      }
      function stepErrors() {
        var names = Array.prototype.map.call(steps[cur].querySelectorAll('input[name]:not([type="radio"]), textarea'), function (el) { return el.name; });
        return check(form).filter(function (e) { return names.indexOf(e.el.name) > -1; });
      }
      function openOv() {
        prevFocus = document.activeElement; ov.hidden = false; document.body.style.overflow = 'hidden';
        if (EZ.lenis) EZ.lenis.stop();
        if (k.motion) k.ctx.add(function () { gsap.from(form, { y: 24, autoAlpha: 0, duration: .35, ease: 'power3.out' }); });
        steps[cur].querySelector('input, textarea').focus();
      }
      function closeOv() {
        ov.hidden = true; document.body.style.overflow = '';
        if (EZ.lenis) EZ.lenis.start();
        if (prevFocus && prevFocus.focus) prevFocus.focus();
      }
      k.on(openBtn, 'click', openOv);
      k.on(form.querySelector('.consult2__close'), 'click', closeOv);
      k.on(ov, 'click', function (e) { if (e.target === ov) closeOv(); });
      k.on(ov, 'keydown', function (e) { if (e.key === 'Escape') closeOv(); else EZ.trapTab(e, ov); });
      k.on(next, 'click', function () { if (show(stepErrors(), form)) go(cur + 1, 1); });
      k.on(back, 'click', function () { if (cur > 0) go(cur - 1, -1); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form), form)) {
          var bad = check(form).filter(function (x) { return x.msg; })[0];
          var si = steps.indexOf(bad.el.closest('.consult2__step'));
          if (si > -1 && si !== cur) { go(si, -1); show(check(form), form); }
          return;
        }
        EZ.consultMail(compose(form));
        steps.forEach(function (s) { s.hidden = true; });
        next.hidden = send.hidden = true; back.disabled = true;
        var d = done(form); d.setAttribute('tabindex', '-1'); d.focus();
      });
      back.disabled = true; send.hidden = true;
      k.add(function () { if (!ov.hidden) closeOv(); });
      EZ.reveal(k, root.querySelectorAll('.consult2__in > *'));
    } },

    /* v3 · a sentence */
    3: { init: function (root, k) {
      var form = root.querySelector('.consult3__form'), errs = root.querySelector('.consult3__errs');
      var inputs = form.querySelectorAll('.c3__w input');
      // each blank is as wide as its content or placeholder (field-sizing fallback)
      function size(el) { el.size = Math.max(4, (el.value || el.placeholder || '').length + 1); }
      inputs.forEach(function (el) { size(el); k.on(el, 'input', function () { size(el); if (el.getAttribute('aria-invalid') === 'true') { el.setAttribute('aria-invalid', 'false'); } }); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var list = check(form), bad = list.filter(function (x) { return x.msg; });
        list.forEach(function (x) { x.el.setAttribute('aria-invalid', x.msg ? 'true' : 'false'); });
        var consentBox = form.querySelector('#c3-consent-err'), cErr = bad.filter(function (x) { return x.el.name === 'consent'; })[0];
        consentBox.textContent = cErr ? cErr.msg : ''; consentBox.hidden = !cErr;
        errs.innerHTML = bad.filter(function (x) { return x.el.name !== 'consent'; }).map(function (x) { return '<li>' + x.msg + '</li>'; }).join('');
        if (bad.length) { bad[0].el.focus(); return; }
        EZ.consultMail(compose(form));
        done(form);
      });
      k.add(function () { errs.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.consult3 > .wrap > .t-label, .consult3 > .wrap > .t-head'));
    } }
  });
})();

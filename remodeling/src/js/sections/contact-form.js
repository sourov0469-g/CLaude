/* Contact page, section 1 · contact-form. No server in this file: validate inline, then compose an email to the firm (said
   before sending). The helpers are the homepage consult helpers, copied so this page does not load the homepage section. */
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
    d.innerHTML = 'Your email app should now be open with your request to ' + TO + '. Send it from there and we will come back to you, usually the same or next working day. If it is urgent, call <a class="link" href="tel:+17542360675" data-rx="phone">(754)&nbsp;236&#8209;0675</a>.';
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

  EZ.section('contact-form', {
    /* v1 · The request sheet: every published field at once */
    1: { init: function (root, k) {
      var form = root.querySelector('form');
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'email', 'address', 'project', 'consent']), form, k)) return;
        send(form, compose(form));
      });
      EZ.reveal(k, root.querySelectorAll('.fm1__side > *'));
      if (k.motion) gsap.from(root.querySelector('.fm1__sheet'), { y: 24, rotate: -1.2, opacity: 0, duration: .7, ease: 'power3.out', delay: .15 });
    } },

    /* v2 · One question at a time along a tape measure */
    2: { init: function (root, k) {
      var form = root.querySelector('form'), steps = Array.prototype.slice.call(root.querySelectorAll('.fm2__step'));
      var back = root.querySelector('.fm2__back'), next = root.querySelector('.fm2__next'), go = root.querySelector('.fm2__go');
      var count = root.querySelector('.fm2__count .nums'), fill = root.querySelector('.fm2__fill'), svg = root.querySelector('.fm2__svg');
      var NEED = [['project'], ['address'], ['name'], ['phone', 'email'], ['consent']], at = 0;
      var s = '<path class="fm2__edge" d="M0 55 H1000"/>';
      for (var i = 0; i <= 100; i++) s += '<path class="fm2__tk' + (i % 20 === 0 ? ' fm2__tk--big' : '') + '" d="M' + (i * 10) + ' 55 V' + (i % 20 === 0 ? 20 : i % 2 ? 44 : 36) + '"/>';
      for (var j = 1; j <= 5; j++) s += '<text class="fm2__n" x="' + (j * 200 - 12) + '" y="16">' + j + '</text>';
      svg.innerHTML = s;
      function to(n, focus) {
        at = n;
        steps.forEach(function (st, i) { st.hidden = i !== n; });
        back.hidden = n === 0; next.hidden = n === 4; go.hidden = n !== 4;
        count.textContent = n + 1;
        if (k.motion) k.ctx.add(function () { gsap.to(fill, { scaleX: (n + 1) / 5, duration: .45, ease: 'power3.out' }); }); else fill.style.transform = 'scaleX(' + (n + 1) / 5 + ')';
        if (focus) { var f = steps[n].querySelector('input:not([type=radio]), textarea'); if (f) f.focus(); }
      }
      function forward() { if (show(check(form, NEED[at]), form, k)) to(at + 1, true); }
      liveClear(form, k);
      k.on(next, 'click', forward);
      k.on(back, 'click', function () { to(at - 1, true); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (at < 4) { forward(); return; }   // Enter in a field moves along instead of sending early
        if (!show(check(form, ['consent']), form, k)) return;
        send(form, compose(form));
      });
      to(0);
      k.add(function () { svg.innerHTML = ''; steps.forEach(function (st, i) { st.hidden = i !== 0; }); back.hidden = true; next.hidden = false; go.hidden = true; fill.style.transform = ''; });
      EZ.reveal(k, root.querySelectorAll('.fm2__wrap > .eyebrow, .fm2__wrap > h1'));
    } },

    /* v3 · The letter: blanks inside the sentence; errors listed under it */
    3: { init: function (root, k) {
      var form = root.querySelector('form');
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'project', 'address', 'phone', 'email', 'consent']), form, k)) return;
        send(form, compose(form));
      });
      EZ.reveal(k, root.querySelectorAll('.fm3__side > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.fm3__blank'), { '--u': 0, duration: .5, stagger: .08, ease: 'power2.out', delay: .3 });
    } },

    /* v4 · Pick the work first: toggles for the published services; the picked ones head the email */
    4: { init: function (root, k) {
      var form = root.querySelector('form'), chips = root.querySelector('.fm4__chips'), picked = root.querySelector('.fm4__picked'), err = root.querySelector('.fm4__chips + .c-err');
      chips.innerHTML = WORK.map(function (w, i) { return '<button type="button" class="fm4__chip" aria-pressed="false" data-i="' + i + '" data-rx="~' + w[1] + '/pop/chips/t"><svg class="fm4__tick" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8.5 L6.5 12 L13 4.5"/></svg>' + esc(w[0]) + '</button>'; }).join('');
      var C = Array.prototype.slice.call(chips.children);
      function list() { return C.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; }).map(function (c) { return WORK[+c.dataset.i][0]; }); }
      C.forEach(function (c) {
        k.on(c, 'click', function () {
          var on = c.getAttribute('aria-pressed') !== 'true';
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
          var l = list(); picked.textContent = l.length ? 'Picked: ' + l.join(', ') + '.' : 'Nothing picked yet.';
          if (l.length) err.hidden = true;
          if (on && k.motion) k.ctx.add(function () { gsap.fromTo(c.querySelector('.fm4__tick'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .25, ease: 'power2.out' }); });
        });
      });
      if (EZ.bindReactions) EZ.bindReactions(chips, k);
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var l = list();
        err.textContent = l.length ? '' : 'Please pick at least one kind of work.'; err.hidden = !!l.length;
        var ok = show(check(form, ['name', 'phone', 'email', 'address', 'consent']), form, k);
        if (!l.length) { C[0].focus(); return; }
        if (!ok) return;
        send(form, compose(form, ['Work: ' + l.join(', ')]));
      });
      k.add(function () { chips.innerHTML = ''; picked.textContent = 'Nothing picked yet.'; err.hidden = true; });
      EZ.reveal(k, root.querySelectorAll('.fm4__head > *'));
      if (k.motion) gsap.from(C, { y: 14, opacity: 0, duration: .4, stagger: .04, ease: 'power3.out', delay: .2 });
    } },

    /* v5 · Call first: open or closed right now from the published hours (Sun to Fri 7am to 7pm, Saturday closed), Miami time */
    5: { init: function (root, k) {
      var openP = root.querySelector('.fm5__open'), openT = root.querySelector('.fm5__st');
      function openNow() {
        var parts = {};
        try { new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; }); } catch (e) { return; }
        var day = parts.weekday, h = +parts.hour % 24, open = day !== 'Sat' && h >= 7 && h < 19;
        openP.classList.toggle('is-open', open);
        openT.textContent = open ? 'Open now, until 7pm Miami time' : day === 'Sat' ? 'Closed on Saturdays. We open again Sunday at 7am' : 'Closed now. We open at 7am Miami time' + (day === 'Fri' && h >= 19 ? ' on Sunday' : '');
      }
      openNow();
      var t = setInterval(openNow, 60000);
      k.add(function () { clearInterval(t); openP.classList.remove('is-open'); openT.textContent = 'Sun–Fri 7am–7pm, Miami time'; });
      var form = root.querySelector('form');
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'project', 'consent']), form, k)) return;
        send(form, compose(form, ['Please call me back.']));
      });
      EZ.reveal(k, root.querySelectorAll('.fm5__call > *'));
      if (k.motion) gsap.from(root.querySelector('.fm5__card'), { x: 30, opacity: 0, duration: .7, ease: 'power3.out', delay: .2 });
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      var form = root.querySelector('form');
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'email', 'address', 'project', 'consent']), form, k)) return;
        send(form, compose(form));
      });
      EZ.reveal(k, root.querySelectorAll('.fm1r__side > *'));
      if (k.motion) gsap.from(root.querySelector('.fm1r__sheet'), { y: 24, rotate: -1.2, opacity: 0, duration: .7, ease: 'power3.out', delay: .15 });
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var form = root.querySelector('form'), steps = Array.prototype.slice.call(root.querySelectorAll('.fm2r__step'));
      var back = root.querySelector('.fm2r__back'), next = root.querySelector('.fm2r__next'), go = root.querySelector('.fm2r__go');
      var count = root.querySelector('.fm2r__count .nums'), fill = root.querySelector('.fm2r__fill'), svg = root.querySelector('.fm2r__svg');
      var NEED = [['project'], ['address'], ['name'], ['phone', 'email'], ['consent']], at = 0;
      var s = '<path class="fm2r__edge" d="M0 55 H1000"/>';
      for (var i = 0; i <= 100; i++) s += '<path class="fm2r__tk' + (i % 20 === 0 ? ' fm2r__tk--big' : '') + '" d="M' + (i * 10) + ' 55 V' + (i % 20 === 0 ? 20 : i % 2 ? 44 : 36) + '"/>';
      for (var j = 1; j <= 5; j++) s += '<text class="fm2r__n" x="' + (j * 200 - 12) + '" y="16">' + j + '</text>';
      svg.innerHTML = s;
      function to(n, focus) {
        at = n;
        steps.forEach(function (st, i) { st.hidden = i !== n; });
        back.hidden = n === 0; next.hidden = n === 4; go.hidden = n !== 4;
        count.textContent = n + 1;
        if (k.motion) k.ctx.add(function () { gsap.to(fill, { scaleX: (n + 1) / 5, duration: .45, ease: 'power3.out' }); }); else fill.style.transform = 'scaleX(' + (n + 1) / 5 + ')';
        if (focus) { var f = steps[n].querySelector('input:not([type=radio]), textarea'); if (f) f.focus(); }
      }
      function forward() { if (show(check(form, NEED[at]), form, k)) to(at + 1, true); }
      liveClear(form, k);
      k.on(next, 'click', forward);
      k.on(back, 'click', function () { to(at - 1, true); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (at < 4) { forward(); return; }   // Enter in a field moves along instead of sending early
        if (!show(check(form, ['consent']), form, k)) return;
        send(form, compose(form));
      });
      to(0);
      k.add(function () { svg.innerHTML = ''; steps.forEach(function (st, i) { st.hidden = i !== 0; }); back.hidden = true; next.hidden = false; go.hidden = true; fill.style.transform = ''; });
      EZ.reveal(k, root.querySelectorAll('.fm2r__wrap > .eyebrow, .fm2r__wrap > h1'));
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var form = root.querySelector('form');
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'project', 'address', 'phone', 'email', 'consent']), form, k)) return;
        send(form, compose(form));
      });
      EZ.reveal(k, root.querySelectorAll('.fm3r__side > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.fm3r__blank'), { '--u': 0, duration: .5, stagger: .08, ease: 'power2.out', delay: .3 });
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var form = root.querySelector('form'), chips = root.querySelector('.fm4r__chips'), picked = root.querySelector('.fm4r__picked'), err = root.querySelector('.fm4r__chips + .c-err');
      chips.innerHTML = WORK.map(function (w, i) { return '<button type="button" class="fm4r__chip" aria-pressed="false" data-i="' + i + '" data-rx="~' + w[1] + '/pop/chips/t"><svg class="fm4r__tick" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8.5 L6.5 12 L13 4.5"/></svg>' + esc(w[0]) + '</button>'; }).join('');
      var C = Array.prototype.slice.call(chips.children);
      function list() { return C.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; }).map(function (c) { return WORK[+c.dataset.i][0]; }); }
      C.forEach(function (c) {
        k.on(c, 'click', function () {
          var on = c.getAttribute('aria-pressed') !== 'true';
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
          var l = list(); picked.textContent = l.length ? 'Picked: ' + l.join(', ') + '.' : 'Nothing picked yet.';
          if (l.length) err.hidden = true;
          if (on && k.motion) k.ctx.add(function () { gsap.fromTo(c.querySelector('.fm4r__tick'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .25, ease: 'power2.out' }); });
        });
      });
      if (EZ.bindReactions) EZ.bindReactions(chips, k);
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var l = list();
        err.textContent = l.length ? '' : 'Please pick at least one kind of work.'; err.hidden = !!l.length;
        var ok = show(check(form, ['name', 'phone', 'email', 'address', 'consent']), form, k);
        if (!l.length) { C[0].focus(); return; }
        if (!ok) return;
        send(form, compose(form, ['Work: ' + l.join(', ')]));
      });
      k.add(function () { chips.innerHTML = ''; picked.textContent = 'Nothing picked yet.'; err.hidden = true; });
      EZ.reveal(k, root.querySelectorAll('.fm4r__head > *'));
      if (k.motion) gsap.from(C, { y: 14, opacity: 0, duration: .4, stagger: .04, ease: 'power3.out', delay: .2 });
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var openP = root.querySelector('.fm5r__open'), openT = root.querySelector('.fm5r__st');
      function openNow() {
        var parts = {};
        try { new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; }); } catch (e) { return; }
        var day = parts.weekday, h = +parts.hour % 24, open = day !== 'Sat' && h >= 7 && h < 19;
        openP.classList.toggle('is-open', open);
        openT.textContent = open ? 'Open now, until 7pm Miami time' : day === 'Sat' ? 'Closed on Saturdays. We open again Sunday at 7am' : 'Closed now. We open at 7am Miami time' + (day === 'Fri' && h >= 19 ? ' on Sunday' : '');
      }
      openNow();
      var t = setInterval(openNow, 60000);
      k.add(function () { clearInterval(t); openP.classList.remove('is-open'); openT.textContent = 'Sun–Fri 7am–7pm, Miami time'; });
      var form = root.querySelector('form');
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'project', 'consent']), form, k)) return;
        send(form, compose(form, ['Please call me back.']));
      });
      EZ.reveal(k, root.querySelectorAll('.fm5r__call > *'));
      if (k.motion) gsap.from(root.querySelector('.fm5r__card'), { x: 30, opacity: 0, duration: .7, ease: 'power3.out', delay: .2 });
    } }
  });
})();

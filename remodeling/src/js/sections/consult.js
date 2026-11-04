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

    // RETIRED (Final: one version per section): the calm form's markup left the file; its definition is kept for the record
    // under a key no version uses. NEW VERSIONS: slot 2 is "The conversation" (below).
    calm: { init: function (root, k) {
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
    } },

    /* NEW VERSIONS · V2 "The conversation" (governing reference: Igloo Inc, continuity). One thread that grows: the firm
       asks one question at a time (a short typing beat first), you answer with a quick reply or a short text; each answer
       stays in the thread as your bubble and can be changed with a tap. The thread ends as the email draft (the same lines
       as V1), and "Open in email" composes it to Sales@elbazconstruction.com once consent is ticked; it is never called
       sent [S1437, S1440, S1442, S1441, S1018]. The window's header keeps the call one tap away with the live open line.
       Reduced motion: no typing beat, no slides [S0400]. */
    2: { init: function (root, k) {
      var log = root.querySelector('.ct__log'), comp = root.querySelector('.ct__comp'), replies = root.querySelector('.ct__replies'), row = root.querySelector('.ct__row'),
        inp = root.querySelector('.ct__in'), inL = root.querySelector('#ct-in-l'), err = root.querySelector('#ct-in-err'), skip = root.querySelector('.ct__skip'),
        editL = root.querySelector('.ct__edit'), end = root.querySelector('.ct__end'), draft = root.querySelector('.ct__draft'), consent = root.querySelector('#ct-consent'),
        cErr = root.querySelector('#ct-consent-err'), go = root.querySelector('.ct__go'), win = root.querySelector('.ct__win'), st = root.querySelector('.ct__st'), stt = root.querySelector('.ct__stt');
      function first(n) { return String(n || '').trim().split(/\s+/)[0]; }
      var Q = [
        { id: 'name', ask: function () { return 'Hi, this is Elbaz Construction. Who are we talking to?'; }, type: 'text', ac: 'name', ph: 'Your full name', check: function (v) { return v ? '' : 'Please add your full name.'; } },
        { id: 'project', ask: function (a) { return 'Good to meet you, ' + first(a.name) + '. What would you like to talk about?'; }, type: 'choice', opts: ['the kitchen', 'a bathroom', 'the whole home', 'outdoor living', 'something else', 'not sure yet'], open: 'something else', oph: 'In a few words',
          check: function (v) { return v ? '' : 'Please add a few words about it, or choose not sure yet.'; } },
        { id: 'address', ask: function () { return 'Where is the property?'; }, type: 'text', ac: 'street-address', ph: 'The property address', check: function (v) { return v ? '' : 'Please add the property address.'; } },
        { id: 'phone', ask: function () { return 'What number should we call or text?'; }, type: 'tel', ac: 'tel', ph: 'Phone number, with area code', check: function (v) { return !v ? 'Please add a phone number.' : v.replace(/\D/g, '').length < 10 ? 'Please include the area code.' : ''; } },
        { id: 'email', ask: function () { return 'And your email address?'; }, type: 'email', ac: 'email', ph: 'Email address', check: function (v) { return !v ? 'Please add an email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'That email address does not look complete.'; } },
        { id: 'contact', ask: function () { return 'What is the easiest way to reach you?'; }, type: 'choice', opts: ['a call', 'a text', 'an email', 'whichever is easiest'] },
        { id: 'notes', ask: function () { return 'Anything else you want us to know? This one is optional.'; }, type: 'text', ph: 'Optional', optional: true }
      ];
      var A = {}, cur = -1, editing = -1, openMode = false, busy = false, touched = false;
      k.add(function () { log.innerHTML = ''; replies.innerHTML = ''; draft.innerHTML = ''; end.hidden = true; comp.hidden = false; consent.checked = false; cErr.hidden = true; end.querySelector('.c-done').hidden = true; inp.value = ''; });
      // the window's header: open or closed now, from the published hours (Sun to Fri 7am to 7pm, Saturday closed), Miami time
      function status() { var o = EZ.openStatus(); st.classList.toggle('is-open', o.open); stt.textContent = o.text; }
      status(); (function tick() { k.timeout(function () { status(); tick(); }, 60000); })();

      function bubble(cls, html, extra) { var li = document.createElement('li'); li.className = 'ct__m ' + cls; li.innerHTML = html; if (extra) extra(li); log.appendChild(li); if (k.motion) gsap.fromTo(li, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .28, ease: 'power2.out', clearProps: 'transform,opacity' }); return li; }
      function keep() { if (touched) comp.scrollIntoView({ block: 'nearest', behavior: k.motion ? 'smooth' : 'auto' }); }
      function shown(i) { var q = Q[i]; if (q.id === 'project' && A.project === q.open) return A.projectText; return A[q.id]; }
      function setComposer(i) {
        var q = Q[i]; openMode = false; err.hidden = true; inp.removeAttribute('aria-invalid');
        inL.textContent = q.ask(A);
        editL.hidden = editing < 0; if (editing > -1) editL.textContent = 'Changing your answer';
        skip.hidden = !q.optional;
        if (q.type === 'choice') {
          replies.innerHTML = q.opts.map(function (o, j) { return '<button type="button" class="ct__r' + (o === q.open || o.indexOf('not sure') === 0 || o.indexOf('whichever') === 0 ? ' ct__r--open' : '') + '" data-v="' + o + '" tabindex="' + (j ? -1 : 0) + '">' + o + '</button>'; }).join('');
          replies.setAttribute('aria-label', q.ask(A)); replies.hidden = false; row.hidden = true;
        } else {
          replies.hidden = true; replies.innerHTML = ''; row.hidden = false;
          inp.type = q.type === 'tel' ? 'tel' : q.type === 'email' ? 'email' : 'text';
          inp.setAttribute('autocomplete', q.ac || 'off'); inp.placeholder = q.ph; inp.inputMode = q.type === 'tel' ? 'tel' : q.type === 'email' ? 'email' : 'text';
          inp.value = editing > -1 ? (A[q.id] || '') : '';
        }
      }
      function ask(i) {
        cur = i; var q = Q[i];
        function put() {
          bubble('ct__m--them', '<p>' + q.ask(A) + '</p>');
          setComposer(i); keep();
          if (touched) { if (q.type === 'choice') replies.querySelector('.ct__r').focus({ preventScroll: true }); else inp.focus({ preventScroll: true }); }
          busy = false;
        }
        busy = true;
        if (!k.motion) { put(); return; }
        var dots = bubble('ct__m--them ct__typing', '<span></span><span></span><span></span>');
        dots.setAttribute('aria-hidden', 'true');
        k.timeout(function () { dots.remove(); put(); }, 520);
      }
      function nextOpen() { for (var i = 0; i < Q.length; i++) if (!(Q[i].id in A)) return i; return -1; }
      function answer(val, label) {
        var q = Q[editing > -1 ? editing : cur], was = editing > -1;
        if (editing > -1) {
          A[q.id] = val; if (label != null) A[q.id + 'Text'] = label;
          var b = log.querySelector('.ct__m--me[data-q="' + q.id + '"] .ct__a'); if (b) b.textContent = q.id === 'project' && A.project === q.open ? A.projectText : (val || 'No, that is all');
          editing = -1;
        } else {
          A[q.id] = val; if (label != null) A[q.id + 'Text'] = label;
          bubble('ct__m--me', '<button type="button" class="ct__a" data-q="' + q.id + '" aria-label="Your answer: ' + (shown(Q.indexOf(q)) || 'skipped').replace(/"/g, '&quot;') + '. Change it">' + '</button>', function (li) { li.dataset.q = q.id; li.firstChild.textContent = shown(Q.indexOf(q)) || 'No, that is all'; });
        }
        var n = nextOpen();
        if (was && n === cur) { setComposer(cur); keep(); return; }   // a change made mid-way: back to the question still waiting
        if (n > -1) ask(n); else finish();
      }
      function fail(msg) { err.textContent = msg; err.hidden = false; inp.setAttribute('aria-invalid', 'true'); inp.focus(); if (k.motion) gsap.fromTo(row, { x: 0 }, { keyframes: [{ x: 6, duration: .08 }, { x: -6, duration: .08 }, { x: 0, duration: .08 }] }); }
      k.on(comp, 'submit', function (e) {
        e.preventDefault(); if (busy) return; touched = true;
        var q = Q[editing > -1 ? editing : cur], v = inp.value.trim();
        if (openMode) { var m1 = q.check(v); if (m1) { fail(m1); return; } A.project = q.open; A.projectText = v; answer(q.open, v); return; }
        if (q.type === 'choice') return;
        var m = q.check ? q.check(v) : ''; if (m) { fail(m); return; }
        answer(v);
      });
      k.on(skip, 'click', function () { touched = true; answer(''); });
      k.on(replies, 'click', function (e) {
        var b = e.target.closest('.ct__r'); if (!b || busy) return; touched = true;
        var q = Q[editing > -1 ? editing : cur];
        if (b.dataset.v === q.open) { openMode = true; replies.hidden = true; row.hidden = false; inp.type = 'text'; inp.placeholder = q.oph; inp.value = ''; inp.setAttribute('autocomplete', 'off'); inp.focus(); return; }
        if (q.id === 'project') delete A.projectText;
        answer(b.dataset.v);
      });
      k.on(replies, 'keydown', function (e) {
        var bs = Array.prototype.slice.call(replies.children), i = bs.indexOf(document.activeElement), d = /Right|Down/.test(e.key) ? 1 : /Left|Up/.test(e.key) ? -1 : 0;
        if (!d || i < 0) return; e.preventDefault(); var j = (i + d + bs.length) % bs.length; bs.forEach(function (b, x) { b.tabIndex = x === j ? 0 : -1; }); bs[j].focus();
      });
      // tap any of your answers to change it
      k.on(log, 'click', function (e) {
        var b = e.target.closest('.ct__a'); if (!b || busy) return; touched = true;
        editing = Q.findIndex(function (q) { return q.id === b.dataset.q; }); if (editing < 0) return;
        end.hidden = true; comp.hidden = false; setComposer(editing);
        if (Q[editing].type === 'choice') replies.querySelector('.ct__r').focus(); else inp.focus();
        keep();
      });
      function lines() {
        var how = { 'a call': 'a call', 'a text': 'a text', 'an email': 'an email' }[A.contact] || 'whichever is easiest';
        var topic = A.project === Q[1].open ? A.projectText : A.project;
        var L = ['Hi, my name is ' + A.name + '.', 'I would like to talk about ' + topic + '.', 'The property is at ' + A.address + '.', 'The easiest way to reach me is ' + how + ', on ' + A.phone + ' or at ' + A.email + '.'];
        if (A.notes) L.push('', 'Anything else: ' + A.notes);
        return L;
      }
      function finish() {
        comp.hidden = true; end.hidden = false;
        draft.innerHTML = lines().map(function (l) { return l ? '<p>' + l.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</p>' : ''; }).join('');
        if (k.motion) gsap.fromTo(end, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .35, ease: 'power2.out', clearProps: 'transform,opacity' });
        if (touched) { end.scrollIntoView({ block: 'nearest', behavior: k.motion ? 'smooth' : 'auto' }); consent.focus({ preventScroll: true }); }
      }
      k.on(consent, 'change', function () { if (consent.checked) cErr.hidden = true; });
      end._kit = k;
      k.on(go, 'click', function () {
        if (!consent.checked) { cErr.textContent = 'Please tick the box so we may contact you about this enquiry.'; cErr.hidden = false; consent.setAttribute('aria-invalid', 'true'); consent.focus(); return; }
        consent.setAttribute('aria-invalid', 'false');
        EZ.consultMail(compose(lines(), A.name));
        done(end);
      });
      EZ.reveal(k, root.querySelectorAll('.ct__head > *, .ct__facts'));
      // the conversation starts when the window arrives (never steals focus on its own)
      var started = false;
      function start() { if (started) return; started = true; ask(0); }
      if (!k.motion) start();
      else { var sti = ScrollTrigger.create({ trigger: win, start: 'top 85%', once: true, onEnter: start }); k.add(function () { sti.kill(); }); k.on(win, 'focusin', start); }
    } },

    /* NEW VERSIONS · V3 "The postcard" (governing reference: Boffi, rooms as chapters). The room you choose is the front of
       the card; turn it over and the back carries the firm's own fields, addressed to Sales@elbazconstruction.com. The
       same note as V1, composed in the visitor's mail app with consent, never claimed as sent [S0062, S1018, S1442]. */
    3: { init: function (root, k) {
      var form = root.querySelector('.pc__form'), card = root.querySelector('.pc__card'), front = root.querySelector('.pc__front'), back = root.querySelector('.pc__back'),
        pics = root.querySelector('.pc__pics'), lt = root.querySelector('.pc__lt'), cap = root.querySelector('.pc__cap'), turn = root.querySelector('.pc__turn'), tl = root.querySelector('.pc__tl'),
        other = root.querySelector('.pc__other'), otherIn = other.querySelector('input'), st = root.querySelector('.pc__st'), stt = root.querySelector('.pc__stt');
      var P = (window.__DATA || {}).projects || [];
      function title(key) { var p = P.filter(function (x) { return x.k === key; })[0]; return p ? p.t : ''; }
      var ROOMS = ['k-navy-shaker', 'b-polished-concrete', 'w-farmhouse', 'o-waterfront'];
      var firstP = form.querySelector('input[name="project"]'); firstP.id = 'pc-project';
      liveClear(form, k);

      // the phone, one tap away: open or closed now, from the published hours (Miami time)
      function upd() { var o = EZ.openStatus(); st.classList.toggle('is-open', o.open); stt.textContent = o.text; }
      upd(); var iv = setInterval(upd, 30000); k.add(function () { clearInterval(iv); });

      /* ---------- the front: the room you choose [S0063: a short blur, never two photographs crossfaded] ---------- */
      function img(key) { return '<img src="' + EZ.img(key) + '" alt="" decoding="async" draggable="false">'; }
      function setFront(p, key) {
        var html, label, c = '';
        if (key) { html = img(key); label = p; c = 'Our work: ' + title(key); }
        else if (p === 'other') { html = '<span class="pc__note">' + esc(otherIn.value.trim() || 'Something else') + '</span>'; label = 'something else'; }
        else if (p) { html = '<span class="pc__four">' + ROOMS.map(img).join('') + '</span>'; label = 'not sure yet'; c = 'Our work: four of our rooms'; }
        else { html = '<span class="pc__four">' + ROOMS.map(img).join('') + '</span>'; label = 'Choose a room above'; c = 'Our work: four of our rooms'; }
        var swap = function () { pics.innerHTML = html; lt.textContent = label; cap.textContent = c; front.classList.toggle('is-set', !!p); };
        if (k.motion && pics.innerHTML) gsap.to(pics, { filter: 'blur(6px)', opacity: .3, duration: .14, ease: 'power2.in', onComplete: function () { swap(); gsap.to(pics, { filter: 'blur(0px)', opacity: 1, duration: .32, ease: 'power2.out', clearProps: 'filter,opacity' }); } });
        else swap();
      }
      function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
      form.querySelectorAll('input[name="project"]').forEach(function (r) {
        k.on(r, 'change', function () {
          var p = radio(form, 'project');
          other.hidden = p !== 'other'; if (!other.hidden) otherIn.focus();
          form.querySelector('#pc-project-err').hidden = true;
          setFront(p, r.dataset.k || '');
          if (isBack) flip(false);   // show the room you just chose
          turn.classList.add('is-ready');
        });
      });
      k.on(otherIn, 'input', function () { var n = front.querySelector('.pc__note'); if (n) n.textContent = otherIn.value.trim() || 'Something else'; });

      /* ---------- the turn: one rotateY on the card; the side you cannot see is inert [S0062] ---------- */
      var isBack = false;
      function flip(toBack, then) {
        isBack = toBack; card.classList.toggle('is-back', toBack);
        front.inert = toBack; back.inert = !toBack;
        front.setAttribute('aria-hidden', toBack ? 'true' : 'false'); back.setAttribute('aria-hidden', toBack ? 'false' : 'true');
        turn.setAttribute('aria-pressed', toBack ? 'true' : 'false'); tl.textContent = toBack ? 'See the front' : 'Turn the card over';
        if (then) k.timeout(then, k.motion ? 760 : 0);
      }
      flip(false);
      k.on(turn, 'click', function () { flip(!isBack, function () { if (isBack) { var f = back.querySelector('#pc-name'); if (f && !f.value) f.focus({ preventScroll: true }); } }); });
      k.add(function () { card.classList.remove('is-back'); front.inert = false; back.inert = false; pics.innerHTML = ''; other.hidden = true; turn.classList.remove('is-ready'); });

      /* ---------- open in email: the same lines as V1, with consent; never "sent" ---------- */
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var p = radio(form, 'project');
        var head = [{ el: firstP, msg: !p ? 'Please pick what you would like to talk about, or choose not sure yet.' : (p === 'other' && !otherIn.value.trim() ? 'Please add a few words about it, or choose not sure yet.' : '') }];
        var backErrs = check(form, ['name', 'address', 'phone', 'email']), cons = check(form, ['consent']);
        var all = head.concat(backErrs, cons), first = all.filter(function (x) { return x.msg; })[0];
        if (first && backErrs.indexOf(first) > -1 && !isBack) {   // an error on the back turns the card to it first
          flip(true, function () { show(all, form, k); });
          return;
        }
        if (!show(all, form, k)) return;
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

      setFront('', '');
      EZ.reveal(k, root.querySelectorAll('.pc__side > *'));
      if (k.motion) {   // the card arrives the way a postcard is dealt: a small tilt, then flat
        var once = false;
        k.io(card, function (en) { if (!en.isIntersecting || once) return; once = true; gsap.fromTo(card, { rotation: -4, y: 24, opacity: 0 }, { rotation: 0, y: 0, opacity: 1, duration: .8, ease: 'expo.out', clearProps: 'rotation,y,opacity,transform' }); }, { threshold: .2 });
      }
    } }
  });
})();

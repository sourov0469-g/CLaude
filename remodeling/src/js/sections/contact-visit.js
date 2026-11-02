/* Contact page, section 2 · contact-visit. Open or closed comes only from the published hours (Sun to Fri 7am to 7pm,
   Saturday closed), read in Miami time. */
(function () {
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function miami() {
    var o = {};
    try { new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; }); } catch (e) { return null; }
    var d = DAYS.indexOf(o.weekday), h = +o.hour % 24, m = +o.minute;
    return { d: d, h: h, m: m, open: d !== 6 && h >= 7 && h < 19 };
  }
  function status(t) {
    if (!t) return 'Sun–Fri 7am–7pm · Saturday closed';
    if (t.open) return 'Open now, until 7pm Miami time.';
    if (t.d === 6) return 'Closed on Saturdays. We open again Sunday at 7am.';
    return 'Closed now. We open at 7am Miami time' + (t.d === 5 && t.h >= 19 ? ' on Sunday.' : '.');
  }

  function openLine(root, k) {   // the live line, from the published hours (one source of truth with the footer)
    var st = root.querySelector('.vs__open'), t = root.querySelector('.vs__ost'); if (!st) return;
    function upd() { var o = EZ.openStatus(); st.classList.toggle('is-open', o.open); t.textContent = o.text; }
    upd(); (function tick() { k.timeout(function () { upd(); tick(); }, 60000); })();
  }
  EZ.section('contact-visit', {
    1: { init: function (root, k) {
      openLine(root, k);
      var btn = root.querySelector('.vs1__turn'), card = root.querySelector('.vs1__card'), front = root.querySelector('.vs1__front'), back = root.querySelector('.vs1__back');
      function set(over) {
        btn.setAttribute('aria-pressed', over ? 'true' : 'false');
        btn.querySelector('.btn__label').textContent = over ? 'Turn back to the front' : 'Turn the card over';
        front.inert = over; back.inert = !over;
        front.setAttribute('aria-hidden', over ? 'true' : 'false'); back.setAttribute('aria-hidden', over ? 'false' : 'true');
        if (k.motion) k.ctx.add(function () { gsap.to(card, { rotateY: over ? 180 : 0, duration: .7, ease: 'power3.inOut' }); });
        else card.classList.toggle('is-over', over);
      }
      k.on(btn, 'click', function () { set(btn.getAttribute('aria-pressed') !== 'true'); });
      set(false);
      k.add(function () { gsap.set(card, { clearProps: 'transform' }); card.classList.remove('is-over'); front.inert = false; back.inert = false; front.removeAttribute('aria-hidden'); back.removeAttribute('aria-hidden'); btn.setAttribute('aria-pressed', 'false'); btn.querySelector('.btn__label').textContent = 'Turn the card over'; });
      EZ.reveal(k, root.querySelectorAll('.vs1__copy > *'));
      if (k.motion) gsap.from(card, { rotate: -6, y: 40, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
    } },
    2: { init: function (root, k) {
      openLine(root, k);
      var btn = root.querySelector('.vs3__cp'), st = root.querySelector('.vs3__st'), ADDR = '19 W Flagler St #310, Miami, FL 33130';
      function say(t) { st.textContent = t; }
      k.on(btn, 'click', function () {
        var ok = function () { say('Copied: ' + ADDR + '.'); }, no = function () { say('Copying is blocked here. The address is ' + ADDR + '.'); };
        try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ADDR).then(ok, no); else no(); } catch (e) { no(); }
      });
      k.add(function () { st.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.vs3__copy > *'));
      if (k.motion) gsap.from(root.querySelector('.vs3__label'), { rotate: 3, y: 30, opacity: 0, duration: .7, ease: 'back.out(1.4)', scrollTrigger: { trigger: root.querySelector('.vs3__label'), start: 'top 85%', once: true } });
    } }
  });
})();

/* OWNER · Home 6 · Financing: four partner cards (both earlier versions retired at the owner's word). Pick what you are
   building and the cards that usually fit come forward (the routing is the firm's own framing, FACTS.md "Financing");
   the pointer tilts a card toward you; click, tap or Enter turns it over to how you repay. The cards deal in as the
   section arrives. Reduced motion: no tilt, no deal; the flip is instant [S0340 physics, S1018 keyboard, S0400]. */
(function () {
  var ROUTES = {
    kitchen: ['syn', 'sfc'], bath: ['syn', 'sfc'], floor: ['syn', 'sfc'],
    roof: ['sfc', 'ygr', 'rnw'], hvac: ['sfc', 'ygr', 'rnw'], unsure: ['syn', 'sfc', 'ygr', 'rnw']
  };
  var WHY = {
    kitchen: 'Interior finish work, so consumer credit is the usual route. PACE covers specific improvements; a kitchen remodel is generally not one of them.',
    bath: 'Interior finish work, so consumer credit is the usual route. Synchrony’s card is “useful if a kitchen now is likely to be followed by a bathroom or a flooring run later.”',
    floor: 'Consumer credit: Synchrony’s reusable card, or a Service Finance fixed installment loan. Flooring is on the list of typical Elbaz projects that Service Finance fits.',
    roof: 'Roofing, and windows and doors, are among Ygrene’s Florida PACE categories, repaid with property taxes. Roof replacement and impact windows and doors are typical Service Finance projects too.',
    hvac: 'HVAC, and wind-resistance and storm protection, are among Ygrene’s Florida PACE categories. HVAC is a typical Service Finance project as well.',
    unsure: 'Four financing partners, not one. Two are consumer credit and two are property-assessed, so more than one kind of answer is possible.'
  };
  EZ.section('financing', {
    1: { init: function (root, k) {
      var chips = Array.prototype.slice.call(root.querySelectorAll('.fn__chip')), slots = Array.prototype.slice.call(root.querySelectorAll('.fn__slot'));
      var cards = Array.prototype.slice.call(root.querySelectorAll('.fn__card')), why = root.querySelector('.fn__why');
      function pick(key) {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.k === key ? 'true' : 'false'); });
        var fit = ROUTES[key], all = key === 'unsure';
        slots.forEach(function (s) { var on = fit.indexOf(s.dataset.p) > -1; s.classList.toggle('is-in', on && !all); s.classList.toggle('is-out', !on); });
        why.textContent = WHY[key];
      }
      chips.forEach(function (c) { k.on(c, 'click', function () { pick(c.dataset.k); }); });
      cards.forEach(function (c) {
        k.on(c, 'click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); });
        if (!k.motion || !k.fine) return;
        k.on(c, 'pointermove', function (e) {
          if (e.pointerType !== 'mouse') return;
          var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
          c.classList.add('is-tilting'); c.style.setProperty('--ry', (x * 14).toFixed(2) + 'deg'); c.style.setProperty('--rx', (-y * 12).toFixed(2) + 'deg');
        });
        k.on(c, 'pointerleave', function () { c.classList.remove('is-tilting'); c.style.removeProperty('--ry'); c.style.removeProperty('--rx'); });
      });
      pick('unsure');
      k.add(function () { cards.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); c.style.removeProperty('--ry'); c.style.removeProperty('--rx'); }); slots.forEach(function (s) { s.classList.remove('is-in', 'is-out'); }); });
      EZ.reveal(k, root.querySelectorAll('.fn__head > *, .fn__why, .fn__foot > *'));
      if (!k.motion) return;
      // the four cards are dealt in, left to right, as the deck reaches the screen
      gsap.set(cards, { y: 60, rotate: function (i) { return (i - 1.5) * 4; }, opacity: 0 });
      var st = ScrollTrigger.create({ trigger: root.querySelector('.fn__deck'), start: 'top 85%', once: true,
        onEnter: function () { gsap.to(cards, { y: 0, rotate: 0, opacity: 1, duration: .7, ease: 'power3.out', stagger: .09, clearProps: 'transform,opacity' }); } });
      k.add(function () { st.kill(); gsap.set(cards, { clearProps: 'all' }); });
    } }
  });
})();

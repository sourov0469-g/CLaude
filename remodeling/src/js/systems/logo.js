/* FINALIZE Phase 2: the living logo, "a course laid, a room closed" (PHASE1-PLAN.md, Logo).
   The mark is two shapes [S1422 closure]: a bracket (the E's spine and arms, open on the right) and a clay tile laid in
   the course where the middle arm would be. Every beat is caused (load, scroll compaction, hover, press, the page end);
   nothing moves idly [S0544]. Load beat is pure CSS (no flash before JS, works if JS fails); the rest is here.
   Reduced motion / Motion: Off: the mark is static and complete. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  function armPath(L) { return 'M' + (10 + L).toFixed(2) + ' 7.5 H10 V40.5 H' + (10 + L).toFixed(2); }

  function live(svg, where) {
    var br = svg.querySelector('.lg-br'), tile = svg.querySelector('.lg-tile');
    if (!br || !tile) return;
    // the closing side: drawn only when the room is "closed" (press, page end)
    var close = document.createElementNS(NS, 'path');
    close.setAttribute('d', 'M38 7.5 V40.5');
    close.setAttribute('class', 'lg-close');
    close.setAttribute('pathLength', '1');
    br.parentNode.insertBefore(close, br.nextSibling);
    var st = { L: 28, tx: 0, c: 0 };
    function paint() {
      br.setAttribute('d', armPath(st.L));
      close.setAttribute('d', 'M' + (10 + st.L).toFixed(2) + ' 7.5 V40.5');
      // the slide uses the x attribute: the CSS load beat owns the tile's transform (fill: both) and would override it
      tile.setAttribute('x', (18 + st.tx - (28 - st.L) * .3).toFixed(2));
      close.style.strokeDashoffset = (1 - st.c).toFixed(3);
    }
    paint();
    var motion = function () { return EZ.motionOn(); };

    if (where === 'nav') {
      var a = svg.closest('a');
      // hover: the tile slides along its course to touch the spine (the eye completes the E), like a trowel tap;
      // hover-out is slower and softer than hover-in [S0410]
      a.addEventListener('pointerenter', function (e) { if (e.pointerType === 'touch' || !motion()) return; gsap.to(st, { tx: -4.5, duration: .25, ease: 'expo.out', onUpdate: paint, overwrite: 'auto' }); });
      a.addEventListener('pointerleave', function () { if (!motion()) return; gsap.to(st, { tx: 0, duration: .45, ease: 'power3.out', onUpdate: paint, overwrite: 'auto' }); });
      a.addEventListener('focus', function () { if (motion()) gsap.to(st, { tx: -4.5, duration: .25, ease: 'expo.out', onUpdate: paint, overwrite: 'auto' }); });
      a.addEventListener('blur', function () { if (motion()) gsap.to(st, { tx: 0, duration: .45, ease: 'power3.out', onUpdate: paint, overwrite: 'auto' }); });
      // press (going home): the room closes for one beat, then opens again; the beat starts on the press frame [S0544 causal]
      a.addEventListener('pointerdown', function () {
        if (!motion()) return;
        gsap.timeline({ overwrite: 'auto' }).to(st, { c: 1, duration: .14, ease: 'power2.in', onUpdate: paint })
          .to(st, { c: 0, duration: .3, ease: 'power3.out', onUpdate: paint }, '+=.22');
      });
      // scroll compaction: when the header turns solid the arms shorten and the tile tucks closer (the mark stays legible small)
      var nav = document.getElementById('nav');
      if (nav && 'MutationObserver' in window) {
        var solid = nav.classList.contains('is-solid');
        new MutationObserver(function () {
          var s = nav.classList.contains('is-solid');
          if (s === solid) return; solid = s;
          if (!motion()) { st.L = s ? 22 : 28; paint(); return; }
          gsap.to(st, { L: s ? 22 : 28, duration: .4, ease: 'power3.inOut', onUpdate: paint, overwrite: 'auto' });
        }).observe(nav, { attributes: true, attributeFilter: ['class'] });
      }
    } else if (where === 'foot') {
      // the page ends: the bracket draws, the tile is laid, and the room closes and STAYS closed (the closing beat)
      var played = false;
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (!en.isIntersecting || played) return;
          played = true; io.disconnect();
          svg.classList.add('is-in');
          if (!motion()) { st.c = 1; paint(); return; }
          gsap.to(st, { c: 1, duration: .32, ease: 'power3.inOut', delay: .75, onUpdate: paint });
        });
      }, { threshold: .6 });
      io.observe(svg);
    }
  }

  EZ.logoInit = function () {
    document.querySelectorAll('[data-logo-live] svg.lg').forEach(function (svg) { live(svg, svg.closest('[data-logo-live]').dataset.logoLive); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', EZ.logoInit); else EZ.logoInit();
})();

/* OWNER · Home 5 · How a job runs: one calendar on one screen (the long pinned drawing is retired at the owner's word).
   The bars draw in, in order, as the section arrives (once); pointer, tap or focus on a stage lights its bar and the card
   gives the firm's line. Arrow keys walk the stages. Reduced motion: the chart drawn, still [S0186, S1018, S0400]. */
(function () {
  var ST = [
    ['Week 1', 'Consultation', 'We walk the property, talk through what you actually want to change, and give you an honest read on scope and budget before anyone quotes a number.'],
    ['Week 1–2', 'Site evaluation', 'Flood zone, HVHZ requirements, permit history, HOA or historic review, and what is behind the walls.'],
    ['Weeks 2–5', 'Design and planning', 'Layouts, finishes and system choices, with the real trade-offs explained rather than one pre-set package.'],
    ['Weeks 5–6', 'Proposal and scope', 'A written scope that says what is included, what is not, and where contingencies are likely. Priced against the drawings, not a guess.'],
    ['Weeks 6–12', 'Permitting', 'Permits pulled directly, and every product checked for its Notice of Acceptance or Florida Product Approval.'],
    ['Varies', 'Construction', 'One point of contact, inspections at each stage, and a site that gets cleaned at the end of the day.'],
    ['Final 1–2 weeks', 'Quality review', 'We walk the work against the scope before we call it finished.'],
    ['Closeout', 'Completion and handover', 'Final inspection, a walkthrough together, and registration of manufacturer and workmanship warranties.']
  ];
  EZ.section('process', {
    1: { init: function (root, k) {
      var rows = Array.prototype.slice.call(root.querySelectorAll('.pc__row')), card = root.querySelector('.pc__card');
      var no = card.querySelector('.pc__no'), wk = card.querySelector('.pc__wk'), t = card.querySelector('.pc__t'), p = card.querySelector('.pc__p');
      var cur = -1;
      function pick(i) {
        if (i === cur) return; cur = i;
        rows.forEach(function (r, j) { r.classList.toggle('is-on', j === i); r.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
        no.textContent = (i < 9 ? '0' : '') + (i + 1); wk.textContent = ST[i][0]; t.textContent = ST[i][1]; p.textContent = ST[i][2];
        card.classList.remove('is-swap'); void card.offsetWidth; card.classList.add('is-swap');
      }
      rows.forEach(function (r, i) {
        k.on(r, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(i); });
        k.on(r, 'focus', function () { pick(i); });
        k.on(r, 'click', function () { pick(i); });
        k.on(r, 'keydown', function (e) {
          var d = /Down|Right/.test(e.key) ? 1 : /Up|Left/.test(e.key) ? -1 : 0; if (!d) return;
          e.preventDefault(); rows[(i + d + rows.length) % rows.length].focus();
        });
      });
      pick(0);
      k.add(function () { rows.forEach(function (r) { r.classList.remove('is-on'); r.removeAttribute('aria-pressed'); }); cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.pc__head > *, .pc__card'));
      if (!k.motion) return;
      // the bars draw in, in order, once the chart is on screen
      var bars = root.querySelectorAll('.pc__bar');
      gsap.set(bars, { scaleX: 0 });
      var tl = gsap.timeline({ paused: true }).to(bars, { scaleX: 1, duration: .55, ease: 'power3.out', stagger: .09 });
      var st = ScrollTrigger.create({ trigger: root.querySelector('.pc__chart'), start: 'top 78%', once: true, onEnter: function () { tl.play(); } });
      k.add(function () { st.kill(); tl.kill(); gsap.set(bars, { clearProps: 'transform' }); });
    } }
  });
})();

/* process [PLAN-V2 2.4] */
(function () {
  var STAGES = [
    ['Consultation', 'Week 1', 'We walk the property, talk through what you actually want to change, and give you an honest read on scope and budget before anyone quotes a number.'],
    ['Site evaluation', 'Weeks 1–2', 'Flood zone, HVHZ requirements, permit history, HOA or historic review, and what is behind the walls.'],
    ['Design and planning', 'Weeks 2–5', 'Layouts, finishes and system choices, with the real trade-offs explained rather than one pre-set package.'],
    ['Proposal and scope', 'Weeks 5–6', 'A written scope that says what is included, what is not, and where contingencies are likely. Priced against the drawings, not a guess.'],
    ['Permitting', 'Weeks 6–12', 'Permits pulled directly, and every product checked for its Notice of Acceptance or Florida Product Approval.'],
    ['Construction', 'Varies', 'One point of contact, inspections at each stage, and a site that gets cleaned at the end of the day.'],
    ['Quality review', 'Final 1–2 weeks', 'We walk the work against the scope before we call it finished.'],
    ['Completion and handover', 'Closeout', 'Final inspection, a walkthrough together, and registration of manufacturer and workmanship warranties.']
  ];

  EZ.section('process', {
    /* v1 · the calendar */
    1: { init: function (root, k) {
      var rows = Array.prototype.slice.call(root.querySelectorAll('.process1__row'));
      var dn = root.querySelector('.process1__dn'), dt = root.querySelector('.process1__dt');
      rows.forEach(function (r) {
        var bar = r.querySelector('.process1__bar'), cs = getComputedStyle(bar);
        var span = (parseFloat(cs.getPropertyValue('--e')) - parseFloat(cs.getPropertyValue('--s'))) || 1;
        bar.style.setProperty('--mw', Math.max(26, Math.round(span / 15 * 100)));   // phone: bar length keeps its proportion
      });
      function show(i) {
        rows.forEach(function (r, j) { r.classList.toggle('is-on', j === i); });
        dn.textContent = STAGES[i][0] + '.'; dt.textContent = STAGES[i][2];
      }
      rows.forEach(function (r, i) {
        k.on(r, 'pointerenter', function () { show(i); });
        k.on(r, 'focus', function () { show(i); });
        k.on(r, 'click', function () { show(i); });
      });
      show(0);
      k.add(function () { rows.forEach(function (r) { r.classList.remove('is-on'); }); });
      EZ.reveal(k, root.querySelectorAll('.process__head > *'));
      if (!k.motion) return;
      // the calendar draws itself: bars grow along the week axis, .8s power3.out, .07s apart
      var bars = root.querySelectorAll('.process1__bar');
      gsap.fromTo(bars, { '--grow': 0 }, { '--grow': 1, duration: .8, ease: 'power3.out', stagger: .07,
        scrollTrigger: { trigger: root.querySelector('.process1__chart'), start: 'top 78%', once: true } });
    } },

    /* v2 · the rail (S1325 measured between the first and last dot centres) */
    2: { init: function (root, k) {
      var track = root.querySelector('.process2__track'), rail = root.querySelector('.process2__rail');
      var steps = Array.prototype.slice.call(root.querySelectorAll('.process2__step'));
      var dots = steps.map(function (s) { return s.querySelector('.process2__dot'); });
      var num = root.querySelector('.process2__num'), name = root.querySelector('.process2__name'), when = root.querySelector('.process2__when');
      var centers = [], first = 0, last = 1, active = -1;
      function measure() {
        var top = track.getBoundingClientRect().top;
        centers = dots.map(function (d) { var r = d.getBoundingClientRect(); return r.top + r.height / 2 - top; });
        first = centers[0]; last = centers[centers.length - 1];
        rail.style.top = first + 'px'; rail.style.bottom = 'auto'; rail.style.height = (last - first) + 'px';
      }
      function setActive(i) {
        if (i === active) return;
        active = i;
        steps.forEach(function (s, j) { s.dataset.active = j <= i ? 'true' : 'false'; });
        var n = Math.max(0, i);
        num.textContent = ('0' + (n + 1)).slice(-2); name.textContent = STAGES[n][0]; when.textContent = STAGES[n][1];
      }
      measure();
      k.ro(track, function () { measure(); ScrollTrigger.refresh(); });
      k.add(function () { rail.style.cssText = ''; steps.forEach(function (s) { delete s.dataset.active; }); });
      ScrollTrigger.create({
        trigger: track,
        start: function () { return 'top+=' + first + ' center'; },
        end: function () { return 'top+=' + last + ' center'; },
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          // normalized progress -> fill scaleY; the step whose centre the head has crossed becomes active
          var p = self.progress, head = first + p * (last - first), i = -1;
          rail.style.setProperty('--progress', p.toFixed(4));
          centers.forEach(function (c, j) { if (head >= c - 1) i = j; });
          setActive(i);
        }
      });
      setActive(-1); num.textContent = '01';
      EZ.reveal(k, root.querySelectorAll('.process2__sticky > .t-label, .process2__sticky > .t-head'));
    } },

    /* v3 · the run (pinned horizontal scroll with pagination) */
    3: { init: function (root, k) {
      var field = root.querySelector('.process3__field'), wrapper = root.querySelector('.process3__wrapper');
      EZ.reveal(k, root.querySelectorAll('.process3__head > *'));
      if (!k.motion || k.mobile) return;          // phones and reduced motion: a native swipe row, no pin
      var dist = function () { return Math.max(0, wrapper.scrollWidth - field.clientWidth); };
      var run = gsap.to(wrapper, {
        x: function () { return -dist(); }, ease: 'none',
        // end matches the travel so one pixel of scroll moves the run one pixel (the bank's fix to the pen)
        scrollTrigger: { trigger: field, scrub: true, pin: true, pinSpacing: true, invalidateOnRefresh: true, end: function () { return '+=' + dist(); } }
      });
      root.querySelectorAll('.process3__panel').forEach(function (panel) {
        ScrollTrigger.create({
          trigger: panel, containerAnimation: run, start: 'left center', end: 'right center',
          toggleClass: { targets: root.querySelector('.process3__dot[data-panel="' + panel.id + '"]'), className: 'active' }
        });
      });
    } }
  });
})();

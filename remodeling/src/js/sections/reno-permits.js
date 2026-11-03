/* OWNER · Renovation 4 · Planning and permitting. The five site-evaluation checks tick one by one as the panel comes into
   view (once); the county strip is a picker: each county's rule (FACTS.md) lands on the card under a stamp that thumps
   down. Arrow keys move between counties. Reduced motion: all ticked, no thump [S0362 draw, S1018, S0400]. */
(function () {
  var C = {
    pb: ['Palm Beach', 'Outside the HVHZ, under Wind-Borne Debris Region rules.', ['Wind-Borne', 'Debris Region']],
    br: ['Broward', 'High-Velocity Hurricane Zone: products need a valid Miami-Dade Notice of Acceptance.', ['Notice of', 'Acceptance']],
    md: ['Miami‑Dade', 'High-Velocity Hurricane Zone: products need a valid Miami-Dade Notice of Acceptance.', ['Notice of', 'Acceptance']]
  };
  EZ.section('reno-permits', {
    1: { init: function (root, k) {
      var cks = Array.prototype.slice.call(root.querySelectorAll('.rp__ck')), bs = Array.prototype.slice.call(root.querySelectorAll('.rp__c'));
      var card = root.querySelector('.rp__card'), nm = card.querySelector('.rp__cname'), rule = card.querySelector('.rp__rule'), s1 = card.querySelector('.rp__s1'), s2 = card.querySelector('.rp__s2');
      var cur = 'md';
      function pick(c, anim) {
        cur = c; bs.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.c === c ? 'true' : 'false'); });
        nm.textContent = C[c][0]; rule.textContent = C[c][1]; s1.textContent = C[c][2][0]; s2.textContent = C[c][2][1];
        if (anim) { card.classList.remove('is-swap', 'is-stamp'); void card.offsetWidth; card.classList.add('is-swap', 'is-stamp'); }
      }
      bs.forEach(function (b, i) {
        k.on(b, 'click', function () { pick(b.dataset.c, true); });
        k.on(b, 'keydown', function (e) { var d = /Down|Right/.test(e.key) ? 1 : /Up|Left/.test(e.key) ? -1 : 0; if (!d) return; e.preventDefault(); var n = bs[(i + d + bs.length) % bs.length]; n.focus(); pick(n.dataset.c, true); });
      });
      pick('md', false);
      var tms = [];
      k.add(function () { tms.forEach(clearTimeout); cks.forEach(function (c) { c.classList.remove('is-done'); }); card.classList.remove('is-swap', 'is-stamp'); });
      EZ.reveal(k, root.querySelectorAll('.rp__head > *, .rp__panel'));
      if (!k.motion) { cks.forEach(function (c) { c.classList.add('is-done'); }); return; }
      var st = ScrollTrigger.create({ trigger: root.querySelector('.rp__checks'), start: 'top 75%', once: true, onEnter: function () {
        cks.forEach(function (c, i) { tms.push(setTimeout(function () { c.classList.add('is-done'); }, 260 + i * 220)); });
        tms.push(setTimeout(function () { card.classList.add('is-stamp'); }, 260 + cks.length * 220));
      } });
      k.add(function () { st.kill(); });
    } }
  });
})();

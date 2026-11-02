/* FINALIZE · Contact 5 · Questions before you call. One list of questions (worded for the visitor) and the firm's own
   published answers. V1: an accordion (aria-expanded, region), the plus morphs into a minus and the panel opens by its
   grid row (no layout jump); V2: a vertical tablist beside an answer card (arrow keys, Home, End). */
(function () {
  var Q = [
    ['How long will it take?', 'A single bathroom might run 4&ndash;8 weeks of construction; a kitchen often 6&ndash;12; a whole-home renovation several months. Permit review can add weeks.'],
    ['Do you pull the permits?', 'We pull the permits in our own name, verify every product against its Notice of Acceptance before it is ordered, and keep one person accountable from the first walkthrough to final inspection.'],
    ['What does the hurricane zone mean for my project?', 'Miami-Dade and Broward sit inside Florida&rsquo;s High-Velocity Hurricane Zone, and products need a valid Miami-Dade Notice of Acceptance. Palm Beach is outside the HVHZ but under Wind-Borne Debris Region rules.'],
    ['Can I finance it?', 'Four financing partners, not one: two are consumer credit and two are property-assessed. Elbaz Construction is not a lender and does not approve, decline or fund applications. Every rate, term and approval decision comes from the financing partner.'],
    ['Do you work in my town?', 'We build in <span class="nums">104</span> municipalities across Miami-Dade, Broward and Palm Beach. Find yours in the service area above.'],
    ['Is the consultation free?', 'Send us a message to get a free consultation. Don&rsquo;t worry, we won&rsquo;t charge a dime.'],
    ['Are you licensed?', 'Licensed, bonded &amp; insured &middot; CBC1265280. Elbaz Construction is a Florida Certified Building Contractor, recognised by the Florida Department of Business and Professional Regulation.'],
    ['Can I just call?', 'Call <a class="link nums" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>: you will get a real answer, not a callback form.']
  ];
  EZ.section('contact-faq', {
    1: { init: function (root, k) {
      var host = root.querySelector('.fq__list');
      host.innerHTML = Q.map(function (q, i) {
        return '<div class="fq__item"><h3 style="margin:0"><button type="button" class="fq__btn" id="fq-b' + i + '" aria-expanded="false" aria-controls="fq-p' + i + '"><span>' + q[0] + '</span><span class="fq__ic" aria-hidden="true"></span></button></h3>' +
          '<div class="fq__panel" id="fq-p' + i + '" role="region" aria-labelledby="fq-b' + i + '"><div><p>' + q[1] + '</p></div></div></div>';
      }).join('');
      host.querySelectorAll('.fq__btn').forEach(function (b) {
        k.on(b, 'click', function () { var on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on ? 'true' : 'false'); b.closest('.fq__item').classList.toggle('is-open', on); });
      });
      k.add(function () { host.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.fq__side > *'));
    } },
    2: { init: function (root, k) {
      var qs = root.querySelector('.fp__qs'), card = root.querySelector('.fp__card'), qq = root.querySelector('.fp__q'), aa = root.querySelector('.fp__a');
      qs.innerHTML = Q.map(function (q, i) { return '<button type="button" role="tab" class="fp__qb" id="fp-t' + i + '" aria-selected="false" tabindex="-1" aria-controls="fp-card">' + q[0] + '</button>'; }).join('');
      card.id = 'fp-card';
      var bs = Array.prototype.slice.call(qs.querySelectorAll('.fp__qb')), cur = -1;
      function pick(i, focus) {
        if (i === cur) return; cur = i;
        bs.forEach(function (b, j) { b.setAttribute('aria-selected', j === i ? 'true' : 'false'); b.tabIndex = j === i ? 0 : -1; });
        card.setAttribute('aria-labelledby', 'fp-t' + i); qq.innerHTML = Q[i][0]; aa.innerHTML = Q[i][1];
        if (focus) bs[i].focus();
        if (k.motion) gsap.fromTo([qq, aa], { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .3, ease: 'power2.out', stagger: .05, overwrite: true });
      }
      bs.forEach(function (b, i) {
        k.on(b, 'click', function () { pick(i); });
        k.on(b, 'keydown', function (e) { var n = /Down|Right/.test(e.key) ? i + 1 : /Up|Left/.test(e.key) ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? bs.length - 1 : null; if (n === null) return; e.preventDefault(); pick((n + bs.length) % bs.length, true); });
      });
      pick(0);
      k.add(function () { qs.innerHTML = ''; cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.fp__head > *'));
    } }
  });
})();

/* OWNER (second pass) · Home 6 · Financing: three layouts of the same four partners, built from one list.
   V1 ask then answer: the projects on the left; the answer on the right shows ONLY the partners that usually fit, with
      the firm's reason. V2 two kinds of money: consumer credit beside property-assessed; "inside the home" or "outside
      and energy" lights the half that usually fits. V3 the wallet: a fanned stack; point, tap or arrow to pull a card
      out and read it, with what it usually fits. Figures and lines: the partners' own as the firm publishes them
      (FACTS.md "Financing"); routing: the firm's framing [S0226 proof by the action, S1018, S0400]. */
(function () {
  var P = {
    syn: { k: 'cc', kind: 'Consumer credit', name: 'Synchrony', big: '6–132', unit: 'months, published special-financing term range', what: 'Project Card, revolving credit', repay: 'On the card, as revolving credit', also: '1 card, reusable across projects', src: 'As published by Synchrony' },
    sfc: { k: 'cc', kind: 'Consumer credit', name: 'Service Finance', big: '30', unit: 'days after completion until the first payment', what: 'Fixed installment loan', repay: 'In fixed installments', also: '0 pre-payment penalty', src: 'As published by Service Finance Company, NMLS 140908' },
    ygr: { k: 'pa', kind: 'Property-assessed', name: 'Ygrene', big: '20', unit: 'year maximum published residential term', what: 'Florida PACE. Not a loan.', repay: 'Through your property tax bill', also: 'Soft credit pull', src: 'As published by Ygrene' },
    rnw: { k: 'pa', kind: 'Property-assessed', name: 'RenewPACE', big: '$250K', unit: 'published maximum, and up to 20% of property value', what: 'PACE, from Renew Financial', repay: 'Through your property tax bill', also: 'No application fee', src: 'As published by Renew Financial, NMLS 1788120' }
  };
  var ORDER = ['syn', 'sfc', 'ygr', 'rnw'];
  var PROJ = [
    ['kitchen', 'Kitchen', 'M4 3h16v18H4zM4 10h16M8 6.5h.01M12 6.5h.01M8 14h8v4H8z'],
    ['bath', 'Bathroom', 'M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM6 12V5.5a2 2 0 0 1 4 0M7 20l-1 2M17 20l1 2'],
    ['floor', 'Flooring', 'M3 3h18v18H3zM3 9h18M3 15h18M9 3v6M15 9v6M9 15v6'],
    ['roof', 'Roof, windows or doors', 'M2 12l10-8 10 8M5 10v10h14V10M9 20v-6h6v6'],
    ['hvac', 'HVAC or storm protection', 'M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8'],
    ['unsure', 'Not sure yet', 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.4V14M12 17v.5']
  ];
  var ROUTES = { kitchen: ['syn', 'sfc'], bath: ['syn', 'sfc'], floor: ['syn', 'sfc'], roof: ['sfc', 'ygr', 'rnw'], hvac: ['sfc', 'ygr', 'rnw'], unsure: ORDER };
  var WHY = {
    kitchen: 'Interior finish work, so consumer credit is the usual route. PACE covers specific improvements; a kitchen remodel is generally not one of them.',
    bath: 'Interior finish work, so consumer credit is the usual route. Synchrony’s card is “useful if a kitchen now is likely to be followed by a bathroom or a flooring run later.”',
    floor: 'Consumer credit: Synchrony’s reusable card, or a Service Finance fixed installment loan. Flooring is on the list of typical Elbaz projects that Service Finance fits.',
    roof: 'Roofing, and windows and doors, are among Ygrene’s Florida PACE categories, repaid with property taxes. Roof replacement and impact windows and doors are typical Service Finance projects too.',
    hvac: 'HVAC, and wind-resistance and storm protection, are among Ygrene’s Florida PACE categories. HVAC is a typical Service Finance project as well.',
    unsure: 'Four financing partners, not one. Two are consumer credit and two are property-assessed, so more than one kind of answer is possible.'
  };
  function fits(p) { return PROJ.filter(function (x) { return x[0] !== 'unsure' && ROUTES[x[0]].indexOf(p) > -1; }).map(function (x) { return x[1]; }); }
  function ic(d, cls) { return '<svg class="' + (cls || 'fz-ic') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + d + '"/></svg>'; }
  var CHIP = 'M5 6h14v12H5zM5 10h14M5 14h14M10 6v12M14 6v12', HOUSE = 'M3 12L12 4l9 8M6 10v10h12V10M10 20v-5h4v5';
  // the partner card, in the language of the first pass (clay for consumer credit, ink for property-assessed)
  function cardHTML(id, extra) {
    var p = P[id];
    return '<span class="fz-card fz-card--' + p.k + '"' + (extra || '') + '><span class="fz-kind">' + p.kind + '</span>' + ic(p.k === 'cc' ? CHIP : HOUSE, 'fz-ic fz-cic') +
      '<span class="fz-big nums">' + p.big + '</span><span class="fz-unit">' + p.unit + '</span><span class="fz-name">' + p.name + '</span></span>';
  }
  function rows(p) {
    return '<dl class="fz-rows"><div><dt>What it is</dt><dd>' + p.what + '</dd></div><div><dt>How you repay</dt><dd>' + p.repay + '</dd></div><div><dt>Also published</dt><dd>' + p.also + '</dd></div></dl><p class="fz-src">' + p.src + '</p>';
  }
  var FOOT = '<div class="go"><a class="btn" href="#consult"><span class="btn__label">Book a consultation</span></a><p class="vouch"><span><span class="nums">4.8</span> &middot; <span class="nums">343</span> Google reviews</span><span>Licensed, bonded &amp; insured &middot; CBC1265280</span></p></div>' +
    '<p class="fz-not">Elbaz Construction is not a lender and does not approve, decline or fund applications. Every rate, term and approval decision comes from the financing partner.</p>';
  function foot(root, k) { var f = root.querySelector('.fz-foot'); f.innerHTML = FOOT; k.add(function () { f.innerHTML = ''; }); }
  function pop(k, els) { if (!k.motion || !els.length) return; gsap.fromTo(els, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'power3.out', stagger: .07, clearProps: 'transform,opacity' }); }

  EZ.section('financing', {
    /* V1 · ask then answer */
    1: { init: function (root, k) {
      var opts = root.querySelector('.fa__opts'), list = root.querySelector('.fa__list'), why = root.querySelector('.fa__why');
      opts.innerHTML = PROJ.map(function (x) { return '<button type="button" class="fa__o" data-k="' + x[0] + '" aria-pressed="false">' + ic(x[2], 'fz-ic fa__oi') + '<span>' + x[1] + '</span><svg class="fa__ar" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>'; }).join('');
      var bs = Array.prototype.slice.call(opts.querySelectorAll('.fa__o')), cur = '';
      function pick(key, anim) {
        if (key === cur) return; cur = key;
        bs.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.k === key ? 'true' : 'false'); });
        why.textContent = WHY[key];
        list.innerHTML = ROUTES[key].map(function (id) { var p = P[id]; return '<li class="fa__p fa__p--' + p.k + '"><span class="fa__pk">' + p.kind + '</span><span class="fa__pn">' + p.name + '</span><span class="fa__pb nums">' + p.big + '</span><span class="fa__pu">' + p.unit + '</span><span class="fa__pr">' + p.what + ' &middot; ' + p.repay.charAt(0).toLowerCase() + p.repay.slice(1) + '</span></li>'; }).join('');
        list.dataset.n = ROUTES[key].length;
        if (anim) pop(k, list.children);
      }
      bs.forEach(function (b) { k.on(b, 'click', function () { pick(b.dataset.k, true); }); });
      pick('kitchen', false);
      foot(root, k);
      k.add(function () { opts.innerHTML = ''; list.innerHTML = ''; cur = ''; });
      EZ.reveal(k, root.querySelectorAll('.fa__side > *, .fa__ans'));
    } },

    /* V2 · two kinds of money */
    2: { init: function (root, k) {
      var split = root.querySelector('.fb__split');
      function half(kind, title, line, ids, note) {
        return '<article class="fb__h fb__h--' + kind + '" data-k="' + kind + '"><header class="fb__hh">' + ic(kind === 'cc' ? CHIP : HOUSE, 'fz-ic fb__hi') + '<div><h3 class="fb__ht">' + title + '</h3><p class="fb__hl">' + line + '</p></div></header>' +
          '<ul class="fb__ps">' + ids.map(function (id) { var p = P[id]; return '<li class="fb__p"><span class="fb__pn">' + p.name + '</span><span class="fb__pb nums">' + p.big + '</span><span class="fb__pu">' + p.unit + '</span><span class="fb__pw">' + p.what + ' &middot; ' + p.also + '</span></li>'; }).join('') + '</ul>' +
          (note ? '<p class="fb__note">' + note + '</p>' : '') + '</article>';
      }
      split.innerHTML = half('cc', 'Consumer credit', 'Repaid on a card or in fixed installments.', ['syn', 'sfc'], 'Usually fits interior finish work: kitchens, bathrooms, flooring.') +
        '<div class="fb__or" aria-hidden="true"><span>or</span></div>' +
        half('pa', 'Property-assessed', 'Repaid through your property tax bill.', ['ygr', 'rnw'], 'PACE covers specific improvements. A kitchen remodel is generally not one of them.');
      var hs = split.querySelectorAll('.fb__h'), sbs = Array.prototype.slice.call(root.querySelectorAll('.fb__sb'));
      var MAP = { in: ['cc'], out: ['cc', 'pa'], all: ['cc', 'pa'] }, HOT = { in: 'cc', out: 'pa', all: '' };
      function pick(w) {
        sbs.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.w === w ? 'true' : 'false'); });
        hs.forEach(function (h) { var on = MAP[w].indexOf(h.dataset.k) > -1; h.classList.toggle('is-dim', !on); h.classList.toggle('is-hot', HOT[w] === h.dataset.k); });
      }
      sbs.forEach(function (b) { k.on(b, 'click', function () { pick(b.dataset.w); }); });
      pick('all');
      foot(root, k);
      k.add(function () { split.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.fb__head > *'));
      if (!k.motion) return;
      gsap.set(hs, { y: 40, opacity: 0 });
      var st = ScrollTrigger.create({ trigger: split, start: 'top 82%', once: true, onEnter: function () { gsap.to(hs, { y: 0, opacity: 1, duration: .7, ease: 'power3.out', stagger: .15, clearProps: 'transform,opacity' }); } });
      k.add(function () { st.kill(); });
    } },

    /* V3 · the wallet */
    3: { init: function (root, k) {
      var wal = root.querySelector('.fw__wallet'), det = root.querySelector('.fw__detail');
      wal.innerHTML = ORDER.map(function (id, i) { return '<button type="button" class="fw__c" data-p="' + id + '" style="--i:' + i + '" aria-pressed="false" aria-label="' + P[id].name + ', ' + P[id].kind.toLowerCase() + '">' + cardHTML(id) + '</button>'; }).join('');
      var bs = Array.prototype.slice.call(wal.querySelectorAll('.fw__c')), cur = '';
      function pick(id, anim) {
        if (id === cur) return; cur = id; var p = P[id];
        bs.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.p === id ? 'true' : 'false'); });
        det.innerHTML = '<p class="fw__k fz-kind">' + p.kind + '</p><h3 class="fw__n">' + p.name + '</h3><p class="fw__big"><span class="nums">' + p.big + '</span><span class="fw__u">' + p.unit + '</span></p>' + rows(p) +
          '<p class="fw__fl">Usually fits</p><ul class="fw__fits">' + fits(id).map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>';
        det.className = 'fw__detail fw__detail--' + p.k;
        if (anim) pop(k, det.children);
      }
      bs.forEach(function (b, i) {
        k.on(b, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(b.dataset.p, true); });
        k.on(b, 'click', function () { pick(b.dataset.p, true); }); k.on(b, 'focus', function () { pick(b.dataset.p, true); });
        k.on(b, 'keydown', function (e) { var d = /Down|Right/.test(e.key) ? 1 : /Up|Left/.test(e.key) ? -1 : 0; if (!d) return; e.preventDefault(); bs[(i + d + 4) % 4].focus(); });
      });
      pick('syn', false);
      foot(root, k);
      k.add(function () { wal.innerHTML = ''; det.innerHTML = ''; cur = ''; });
      EZ.reveal(k, root.querySelectorAll('.fw__side > :not(.fw__wallet), .fw__detail'));
      if (!k.motion) return;
      gsap.set(bs, { y: 80, rotate: 0, opacity: 0 });
      var st = ScrollTrigger.create({ trigger: wal, start: 'top 82%', once: true, onEnter: function () { gsap.to(bs, { y: 0, opacity: 1, duration: .6, ease: 'power3.out', stagger: .08, clearProps: 'transform,opacity' }); } });
      k.add(function () { st.kill(); });
    } }
  });
})();

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
    /* V2 · two kinds of money */
    1: { init: function (root, k) {
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

    /* NEW VERSIONS · V2 "The money map" (governing reference: Lusion, flow maps). Three columns joined by living ribbons:
       what you are building -> the partners that usually fit -> how each is repaid. Pick a project (or a partner) and its
       path lights while the money flows along it; the rest of the map steps back [S0083]. The ribbons are measured from
       the nodes, so the same engine draws left-to-right on wide screens and top-to-bottom on phones. Routing is the
       firm's framing already used above (ROUTES, WHY); figures are the partners' own (P). Reduced motion: no flowing,
       no draw-in [S0400]. */
    2: { init: function (root, k) {
      var map = root.querySelector('.mm__map'), svg = root.querySelector('.mm__wires'), say = root.querySelector('.mm__say');
      var colA = root.querySelector('.mm__col--a .mm__nodes'), colB = root.querySelector('.mm__col--b .mm__nodes'), colC = root.querySelector('.mm__col--c .mm__nodes');
      var CAL = 'M4 5h16v15H4zM4 9h16M8 3v4M16 3v4M8 13h2M12 13h2M16 13h2M8 16h2M12 16h2';
      var RT = [['card', 'On a card, as revolving credit', CHIP], ['inst', 'In fixed installments', CAL], ['tax', 'Through your property tax bill', HOUSE]];
      var RTOF = { syn: 'card', sfc: 'inst', ygr: 'tax', rnw: 'tax' };
      colA.innerHTML = PROJ.map(function (x, i) { return '<button type="button" class="mm__a" data-id="' + x[0] + '" tabindex="' + (i ? -1 : 0) + '" aria-pressed="false">' + ic(x[2], 'fz-ic mm__ai') + '<span>' + x[1] + '</span></button>'; }).join('');
      colB.innerHTML = ORDER.map(function (id, i) { var q = P[id]; return '<button type="button" class="mm__p mm__p--' + q.k + '" data-id="' + id + '" tabindex="' + (i ? -1 : 0) + '" aria-pressed="false" aria-label="' + q.name + ', ' + q.kind + ': ' + q.big + ' ' + q.unit + '"><span class="mm__k">' + q.kind + '</span><span class="mm__big nums">' + q.big + '</span><span class="mm__u">' + q.unit + '</span><span class="mm__n">' + q.name + '</span></button>'; }).join('');
      colC.innerHTML = RT.map(function (r) { return '<div class="mm__r" data-id="' + r[0] + '">' + ic(r[2], 'fz-ic mm__ri') + '<span>' + r[1] + '</span></div>'; }).join('');
      var A = Array.prototype.slice.call(colA.children), B = Array.prototype.slice.call(colB.children), C = Array.prototype.slice.call(colC.children);
      function byId(list, id) { return list.filter(function (n) { return n.dataset.id === id; })[0]; }
      k.add(function () { colA.innerHTML = colB.innerHTML = colC.innerHTML = ''; svg.innerHTML = ''; say.textContent = ''; });

      /* ---------- the ribbons: measured from the nodes; base + a flowing overlay ---------- */
      var LINKS = [];
      PROJ.forEach(function (x) { ROUTES[x[0]].forEach(function (id) { LINKS.push({ a: x[0], b: id, k: P[id].k, s: 1 }); }); });
      ORDER.forEach(function (id) { LINKS.push({ b: id, c: RTOF[id], k: P[id].k, s: 2 }); });
      function rel(el) { var x = 0, y = 0, n = el; while (n && n !== map) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x: x, y: y, w: el.offsetWidth, h: el.offsetHeight }; }
      var vert = false;
      function wires() {
        vert = getComputedStyle(map).gridTemplateColumns.trim().split(/\s+/).length < 2;   // follow the CSS layout, never a guess
        svg.setAttribute('viewBox', '0 0 ' + map.offsetWidth + ' ' + map.offsetHeight);
        svg.innerHTML = LINKS.map(function (l, i) {
          var f = rel(l.s === 1 ? byId(A, l.a) : byId(B, l.b)), t = rel(l.s === 1 ? byId(B, l.b) : byId(C, l.c)), d;
          if (!vert) { var sx = f.x + f.w, sy = f.y + f.h / 2, ex = t.x, ey = t.y + t.h / 2, m = (ex - sx) * .5; d = 'M' + sx + ' ' + sy + 'C' + (sx + m) + ' ' + sy + ' ' + (ex - m) + ' ' + ey + ' ' + ex + ' ' + ey; }
          else { var vx = f.x + f.w / 2, vy = f.y + f.h, wx = t.x + t.w / 2, wy = t.y, n = (wy - vy) * .5; d = 'M' + vx + ' ' + vy + 'C' + vx + ' ' + (vy + n) + ' ' + wx + ' ' + (wy - n) + ' ' + wx + ' ' + wy; }
          return '<g class="mm__w mm__w--' + l.k + '" data-i="' + i + '"><path class="mm__wb" d="' + d + '"/><path class="mm__wf" d="' + d + '"/></g>';
        }).join('');
        LINKS.forEach(function (l, i) { l.g = svg.querySelector('.mm__w[data-i="' + i + '"]'); });
        paint();
      }

      /* ---------- a choice lights its path ---------- */
      var sel = { t: 'a', id: 'kitchen' };
      function paint() {
        var onA = {}, onB = {}, onC = {}, onL = [];
        if (sel.t === 'a') { onA[sel.id] = 1; ROUTES[sel.id].forEach(function (id) { onB[id] = 1; onC[RTOF[id]] = 1; }); }
        else { onB[sel.id] = 1; onC[RTOF[sel.id]] = 1; PROJ.forEach(function (x) { if (x[0] !== 'unsure' && ROUTES[x[0]].indexOf(sel.id) > -1) onA[x[0]] = 1; }); }
        LINKS.forEach(function (l) {
          var on = l.s === 1 ? (sel.t === 'a' ? l.a === sel.id : l.b === sel.id && l.a !== 'unsure') : !!onB[l.b];
          if (l.g) { l.g.classList.toggle('is-on', on); l.g.classList.toggle('is-off', !on); }
        });
        A.forEach(function (n) { var on = !!onA[n.dataset.id]; n.classList.toggle('is-lit', on); n.setAttribute('aria-pressed', sel.t === 'a' && n.dataset.id === sel.id ? 'true' : 'false'); });
        B.forEach(function (n) { var on = !!onB[n.dataset.id]; n.classList.toggle('is-lit', on); n.classList.toggle('is-dim', !on); n.setAttribute('aria-pressed', sel.t === 'b' && n.dataset.id === sel.id ? 'true' : 'false'); });
        C.forEach(function (n) { var on = !!onC[n.dataset.id]; n.classList.toggle('is-lit', on); n.classList.toggle('is-dim', !on); });
      }
      function answer() {
        if (sel.t === 'a') {
          var x = PROJ.filter(function (q) { return q[0] === sel.id; })[0], names = ROUTES[sel.id].map(function (id) { return P[id].name; });
          var list = names.length > 2 ? names.slice(0, -1).join(', ') + ' or ' + names[names.length - 1] : names.join(' or ');
          say.innerHTML = '<b>' + x[1] + '</b><span>' + list + '.</span> ' + WHY[sel.id];
        } else {
          var q = P[sel.id];
          say.innerHTML = '<b>' + q.name + '</b><span>' + q.what.replace(/\.$/, '') + '.</span> ' + q.repay + '; ' + q.also.charAt(0).toLowerCase() + q.also.slice(1) + '. ' + q.src + '.';
        }
      }
      function choose(t, id) { if (sel.t === t && sel.id === id) return; sel = { t: t, id: id }; paint(); answer(); if (k.motion) { say.classList.remove('is-swap'); void say.offsetWidth; say.classList.add('is-swap'); } }
      function rove(list, n) { list.forEach(function (m) { m.tabIndex = m === n ? 0 : -1; }); }
      [[A, 'a'], [B, 'b']].forEach(function (pr) {
        var list = pr[0], t = pr[1];
        list.forEach(function (n, i) {
          k.on(n, 'click', function () { rove(list, n); choose(t, n.dataset.id); });
          k.on(n, 'pointerenter', function (e) { if (e.pointerType === 'mouse') choose(t, n.dataset.id); });
          k.on(n, 'focus', function () { rove(list, n); choose(t, n.dataset.id); });
          k.on(n, 'keydown', function (e) {
            var d = /Down|Right/.test(e.key) ? 1 : /Up|Left/.test(e.key) ? -1 : 0, j = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : d ? (i + d + list.length) % list.length : -1;
            if (j < 0) return; e.preventDefault(); list[j].focus();
          });
        });
      });
      k.ro(map, wires);
      wires(); answer();
      foot(root, k);
      EZ.reveal(k, root.querySelectorAll('.mm__head > *, .mm__ch'));
      if (!k.motion) return;
      /* ---------- arriving: the columns rise, then the ribbons draw from the first column on ---------- */
      gsap.set(A.concat(B, C), { opacity: 0, y: 16 }); gsap.set(svg, { opacity: 0 });
      var st = ScrollTrigger.create({ trigger: map, start: 'top 78%', once: true, onEnter: function () {
        gsap.to(A.concat(B, C), { opacity: 1, y: 0, duration: .5, ease: 'power3.out', stagger: .04, clearProps: 'transform,opacity' });
        gsap.fromTo(svg, { opacity: 1, clipPath: vert ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0% 0)', duration: 1.1, delay: .25, ease: 'power2.inOut', clearProps: 'clipPath' });
      } });
      k.add(function () { st.kill(); gsap.set(A.concat(B, C, [svg]), { clearProps: 'all' }); });
    } }
  });
})();

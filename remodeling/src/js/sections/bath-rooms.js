/* FINALIZE · Bathrooms 3 · Rooms we build. The ten published sub-services, verbatim; a photograph only where the firm's
   own project title carries that kind of room (FACTS.md "Photos available"). V1: the giant list answers pointer and
   focus by bringing in the real photograph (crossfade 300ms) with the firm's title; V2: the sample board. */
(function () {
  var ROOMS = [
    ['Full Bathroom Remodel', 'b-champagne', 'Champagne Bronze & Marble-Look Tile Bathroom Renovation'],
    ['Primary/Master Bath Suite', 'b-black-marble', 'Black Marble Primary Bathroom with Freestanding Tub & Glass Wet Room'],
    ['Spa Bathroom', 'b-spa-guest', 'Spa-Style Guest Bathroom Remodel with Curbless Shower & Backlit Mirrors'],
    ['Walk-In Shower Conversion', 'b-emerald', 'Emerald Tile Walk-In Shower Bathroom Remodel'],
    ['Vanity & Storage', 'b-navy-niche', 'Navy Vanity Bathroom Remodel with Backlit Tile Niche'],
    ['Bathtub-to-Shower Conversion'], ['Small Bathroom'], ['Powder Room'], ['ADA & Accessible'], ['Luxury']
  ];
  // OWNER (rooms 06–10 looked like broken images): the firm has no photograph of these five, and none is borrowed. Each gets
  // a drawn floor plan in the site's line language instead, captioned as drawn [S1421 one illustration language].
  function W(d) { return '<path class="w" d="' + d + '"/>'; }
  function F(d) { return '<path class="f" d="' + d + '"/>'; }
  function Dd(d) { return '<path class="dd" d="' + d + '"/>'; }
  function A(d) { return '<path class="a" d="' + d + '"/>'; }
  function L(x, y, t) { return '<text class="lb" x="' + x + '" y="' + y + '">' + t + '</text>'; }
  var ROOM = W('M60 60 H340 V440 H210 M150 440 H60 Z') + A('M150 440 A60 60 0 0 1 210 380') + Dd('M210 380 V440');   // walls, door and its swing
  var WC = function (x, y) { return F('M' + x + ' ' + y + ' h44 v18 h-44 Z') + F('M' + (x + 6) + ' ' + (y + 18) + ' h32 v14 q0 30 -16 30 q-16 0 -16 -30 Z'); };
  var SINK = function (x, y, w) { return F('M' + x + ' ' + y + ' h' + w + ' v44 h-' + w + ' Z') + '<ellipse class="f" cx="' + (x + w / 2) + '" cy="' + (y + 24) + '" rx="' + (w / 2 - 10) + '" ry="13"/>'; };
  var DRAIN = function (x, y) { return '<circle class="f" cx="' + x + '" cy="' + y + '" r="6"/>'; };
  var PLANS = {
    5: ROOM + Dd('M66 66 H180 V250 H66 Z') + L(78, 160, 'old tub') + F('M196 66 H334 V250 H196 Z') + A('M196 250 H334') + DRAIN(265, 158) + L(214, 236, 'walk-in shower') + A('M150 158 L186 158 M176 148 L186 158 L176 168') + WC(270, 300) + SINK(80, 300, 110),
    6: W('M110 90 H290 V440 H220 M170 440 H110 Z') + A('M170 440 A50 50 0 0 1 220 390') + F('M116 96 H284 V210 H116 Z') + A('M116 210 H284') + DRAIN(200, 150) + L(150, 200, 'shower') + WC(226, 250) + SINK(122, 250, 90) + L(130, 320, '5 × 8 ft'),
    7: W('M120 140 H280 V420 H220 M170 420 H120 Z') + A('M170 420 A50 50 0 0 1 220 370') + WC(178, 146) + '<circle class="f" cx="160" cy="300" r="22"/>' + F('M152 322 h16 v40 h-16 Z') + L(138, 260, 'pedestal sink') + L(176, 222, 'WC'),
    8: W('M60 60 H340 V440 H240 M140 440 H60 Z') + A('M140 440 A100 100 0 0 1 240 340') + F('M66 66 H210 V230 H66 Z') + DRAIN(138, 148) + L(76, 222, 'roll-in, no curb') + A('M216 90 V200 M120 236 H206 M300 250 V330') + '<circle class="dd" cx="230" cy="330" r="75"/>' + L(196, 334, '60 in turn') + WC(286, 72) + L(250, 210, 'grab bars'),
    9: ROOM + '<ellipse class="f" cx="140" cy="170" rx="62" ry="96"/><ellipse class="f" cx="140" cy="170" rx="48" ry="80"/>' + L(104, 290, 'freestanding tub') + F('M240 66 H334 V250 H240 Z') + A('M240 66 V250') + DRAIN(287, 158) + SINK(230, 300, 104) + F('M236 352 h96') + L(240, 372, 'double vanity')
  };
  var CAM = '<svg class="br__cam" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 8 H8 L10 5 H14 L16 8 H21 V19 H3 Z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function viewer() { return ROOMS.filter(function (r) { return r[1]; }).map(function (r) { return { key: r[1], title: r[2], alt: r[2] + ', an Elbaz project' }; }); }

  EZ.section('bath-rooms', {
    1: { init: function (root, k) {
      var list = root.querySelector('.br__list'), prev = root.querySelector('.br__prev'), img = root.querySelector('.br__img'), cap = root.querySelector('.br__cap');
      var plan = root.querySelector('.br__plan');
      list.innerHTML = ROOMS.map(function (r, i) {
        var n = '<span class="br__t"><span class="nums">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' + esc(r[0]) + '</span>';
        return '<li><button type="button" class="br__r" data-i="' + i + '" aria-describedby="br-cap">' + n + (r[1] ? CAM : '') + '</button></li>';   // owner: every room answers (photo or drawn plan)
      }).join('');
      cap.id = 'br-cap';
      var rows = Array.prototype.slice.call(list.querySelectorAll('.br__r')), on = -1;
      function pick(i) {
        if (i === on) return; on = i;
        rows.forEach(function (r) { r.classList.toggle('is-on', +r.dataset.i === i); });
        var r = ROOMS[i];
        if (r && r[1]) { img.src = EZ.img(r[1]); img.alt = r[2] + ', an Elbaz project'; prev.classList.add('has-img'); cap.textContent = r[0] + ': ' + r[2] + '.'; }
        else { prev.classList.remove('has-img'); img.alt = ''; plan.innerHTML = PLANS[i] || ''; prev.classList.toggle('has-plan', !!PLANS[i]); cap.textContent = r ? r[0] + ': drawn, not photographed. Ask us about it on the consultation.' : 'Pick a room.'; }
        if (r && r[1]) prev.classList.remove('has-plan');
      }
      rows.forEach(function (row) {
        var i = +row.dataset.i;
        k.on(row, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(i); });
        if (row.tagName === 'BUTTON') { k.on(row, 'focus', function () { pick(i); }); k.on(row, 'click', function () { pick(i); }); }
      });
      pick(0);
      k.add(function () { list.innerHTML = ''; on = -1; prev.classList.remove('has-img', 'has-plan'); plan.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.br__side > :not(.br__prev)'));
      if (k.motion) {
        gsap.set(rows, { y: 14, autoAlpha: 0 });
        var st = ScrollTrigger.create({ trigger: list, start: 'top 80%', once: true, onEnter: function () { gsap.to(rows, { y: 0, autoAlpha: 1, duration: .45, ease: 'power4.out', stagger: .05 }); } });
        k.add(function () { st.kill(); gsap.set(rows, { clearProps: 'all' }); });
      }
    } },
    2: { init: function (root, k) {
      var board = root.querySelector('.bs__board'), all = viewer(), vi = 0;
      board.innerHTML = ROOMS.map(function (r) {
        if (r[1]) { var j = vi++; return '<li><button type="button" class="bs__tile" data-v="' + j + '" aria-label="' + esc(r[0]) + ': ' + esc(r[2]) + ', open large"><img src="' + EZ.img(r[1]) + '" alt="" loading="lazy"><span>' + esc(r[0]) + '</span></button></li>'; }
        return '<li><div class="bs__tile"><svg class="bs__g" viewBox="0 0 26 26" aria-hidden="true"><path d="M3 3 H23 V23 H3 Z M3 13 H23 M13 3 V23"/></svg><span>' + esc(r[0]) + '</span></div></li>';
      }).join('');
      k.on(board, 'click', function (e) { var b = e.target.closest('button.bs__tile'); if (b) EZ.viewer.open(all, +b.dataset.v, b.querySelector('img')); });
      k.add(function () { board.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.bs__head > *'));
      if (k.motion) {
        var tiles = board.querySelectorAll('.bs__tile');
        gsap.set(tiles, { y: 16, autoAlpha: 0 });
        var st = ScrollTrigger.create({ trigger: board, start: 'top 80%', once: true, onEnter: function () { gsap.to(tiles, { y: 0, autoAlpha: 1, duration: .4, ease: 'power4.out', stagger: { each: .04, grid: 'auto', from: 'start' } }); } });
        k.add(function () { st.kill(); gsap.set(tiles, { clearProps: 'all' }); });
      }
    } }
  });
})();

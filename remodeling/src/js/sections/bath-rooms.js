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
  var CAM = '<svg class="br__cam" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 8 H8 L10 5 H14 L16 8 H21 V19 H3 Z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function viewer() { return ROOMS.filter(function (r) { return r[1]; }).map(function (r) { return { key: r[1], title: r[2], alt: r[2] + ', an Elbaz project' }; }); }

  EZ.section('bath-rooms', {
    1: { init: function (root, k) {
      var list = root.querySelector('.br__list'), prev = root.querySelector('.br__prev'), img = root.querySelector('.br__img'), cap = root.querySelector('.br__cap');
      list.innerHTML = ROOMS.map(function (r, i) {
        var n = '<span class="br__t"><span class="nums">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' + esc(r[0]) + '</span>';
        return '<li>' + (r[1] ? '<button type="button" class="br__r" data-i="' + i + '" aria-describedby="br-cap">' + n + CAM + '</button>' : '<p class="br__r" data-i="' + i + '">' + n + '</p>') + '</li>';
      }).join('');
      cap.id = 'br-cap';
      var rows = Array.prototype.slice.call(list.querySelectorAll('.br__r')), on = -1;
      function pick(i) {
        if (i === on) return; on = i;
        rows.forEach(function (r) { r.classList.toggle('is-on', +r.dataset.i === i); });
        var r = ROOMS[i];
        if (r && r[1]) { img.src = EZ.img(r[1]); img.alt = r[2] + ', an Elbaz project'; prev.classList.add('has-img'); cap.textContent = r[0] + ': ' + r[2] + '.'; }
        else { prev.classList.remove('has-img'); img.alt = ''; cap.textContent = r ? r[0] + '. Ask us about it on the consultation.' : 'Pick a room.'; }
      }
      rows.forEach(function (row) {
        var i = +row.dataset.i;
        k.on(row, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(i); });
        if (row.tagName === 'BUTTON') { k.on(row, 'focus', function () { pick(i); }); k.on(row, 'click', function () { pick(i); }); }
      });
      pick(0);
      k.add(function () { list.innerHTML = ''; on = -1; prev.classList.remove('has-img'); });
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

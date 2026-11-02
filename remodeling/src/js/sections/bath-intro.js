/* FINALIZE · Bathrooms 1 · Hero. The drawn bathroom is built in one pass (strokes before fills, once, on load). Five
   target marks sit on the parts the firm is careful about; pointing at or focusing one LOCKS it (the crosshair turns and
   fills), the other marks fall back, the drawing lenses in on that point (scale 1.35 about the mark, --ez-move) and the
   callout gives the firm's own line for it. Leaving or Escape releases. Every line is the firm's (FACTS.md). */
(function () {
  var M = [
    { x: 150, y: 190, t: 'Tile, set square', c: 'Tile set square.' },
    { x: 262, y: 250, t: 'Glass, templated after tiling', c: 'Glass is templated after tiling, because it is cut to what was actually built rather than to the drawing.' },
    { x: 72, y: 372, t: 'Behind the tile', c: 'Backer board is water-resistant, not waterproof. Waterproofed properly.' },
    { x: 205, y: 120, t: 'Plumbing and permits', c: 'Elbaz Construction holds the certified building contractor licence and pulls the building, plumbing and electrical permits.' },
    { x: 452, y: 286, t: 'Fixtures', c: 'Glass and fixtures that still look right in year five.' }
  ];
  function art() {
    var s = '<path class="ln" d="M20 440 H580"/><path class="lt" d="M20 40 H580"/>';
    // the shower: a tiled back wall, a cutaway corner that shows what is behind the tile, the valve and head, the glass
    var tiles = ''; for (var y = 60; y <= 420; y += 30) tiles += 'M40 ' + y + 'H262 '; for (var x = 40; x <= 262; x += 37) tiles += 'M' + x + ' 60V440 ';
    s += '<rect class="fill" x="40" y="60" width="222" height="380"/><path class="lt" d="' + tiles + '"/>';
    s += '<path class="board" d="M40 330 L120 330 L40 410 Z"/><path class="memb" d="M40 336 L114 336"/>' + '<rect class="stud" x="40" y="340" width="10" height="60"/><rect class="stud" x="66" y="350" width="10" height="38"/>';
    s += '<path class="pipe" d="M205 40 V112 M205 150 V230"/><circle class="ln" cx="205" cy="160" r="14"/><path class="ln" d="M205 160 l9 -9"/><path class="ln" d="M205 112 h-30 l-10 10 h50 z"/>';
    s += '<rect class="glass" x="258" y="80" width="12" height="360"/><path class="ln" d="M262 80 V440"/>';
    // the vanity: mirror, basin, faucet, cabinet; a towel ring
    s += '<rect class="fill" x="370" y="110" width="160" height="140" rx="70"/><rect class="fill" x="350" y="300" width="200" height="140"/><path class="lt" d="M450 310 V430 M360 370 H540"/>';
    s += '<rect class="ln" x="362" y="290" width="176" height="10"/><path class="ln" d="M408 290 Q450 312 492 290"/><path class="ln" d="M452 290 V270 H440"/><rect class="blk" x="449" y="262" width="6" height="10"/>';
    s += '<circle class="ln" cx="574" cy="190" r="0"/>';
    return s;
  }
  EZ.section('bath-intro', { 1: { init: function (root, k) {
    var svg = root.querySelector('.bi__svg'), host = root.querySelector('.bi__marks'), frame = root.querySelector('.bi__frame'), lens = root.querySelector('.bi__lens');
    var ct = root.querySelector('.bi__ct'), cx = root.querySelector('.bi__cx');
    svg.innerHTML = art();
    host.innerHTML = M.map(function (m, i) {
      return '<button type="button" class="bi__m" data-i="' + i + '" style="--x:' + (m.x / 6).toFixed(2) + '%;--y:' + (m.y / 4.8).toFixed(2) + '%" aria-label="' + m.t + '" aria-describedby="bi-cx"><svg viewBox="-24 -24 48 48" aria-hidden="true"><circle class="ring" r="15"/><path class="cross" d="M-22 0 H-9 M9 0 H22 M0 -22 V-9 M0 9 V22"/><circle class="dot" r="3"/></svg></button>';
    }).join('');
    cx.id = 'bi-cx';
    var marks = Array.prototype.slice.call(host.querySelectorAll('.bi__m')), on = -1;
    function lock(i) {
      if (i === on) return; on = i;
      marks.forEach(function (b, j) { b.classList.toggle('is-on', j === i); });
      frame.classList.toggle('is-lock', i > -1);
      if (i < 0) { ct.textContent = 'Point at a mark'; cx.textContent = 'Each one is a part of the room we are careful about.'; frame.style.setProperty('--z', 1); return; }
      ct.textContent = M[i].t; cx.textContent = M[i].c;
      if (k.motion) { frame.style.setProperty('--ox', (M[i].x / 6) + '%'); frame.style.setProperty('--oy', (M[i].y / 4.8) + '%'); frame.style.setProperty('--z', 1.35); }
    }
    marks.forEach(function (b, i) {
      k.on(b, 'pointerenter', function () { lock(i); });
      k.on(b, 'focus', function () { lock(i); });
      k.on(b, 'click', function () { lock(i); });
    });
    k.on(frame, 'pointerleave', function () { if (!frame.contains(document.activeElement)) lock(-1); });
    k.on(host, 'focusout', function (e) { if (!host.contains(e.relatedTarget)) lock(-1); });
    k.on(host, 'keydown', function (e) { if (e.key === 'Escape') { lock(-1); document.activeElement.blur(); } });
    k.add(function () { svg.innerHTML = ''; host.innerHTML = ''; frame.classList.remove('is-lock'); frame.style.removeProperty('--z'); });
    EZ.reveal(k, root.querySelectorAll('.bi__copy > *'));
    if (k.motion) {
      gsap.set(svg.querySelectorAll('.ln, .lt, .memb'), { drawSVG: '0%' });
      gsap.set(svg.querySelectorAll('.fill, .glass, .board, .stud, .blk'), { opacity: 0 });
      gsap.set(marks, { scale: 0, opacity: 0 });
      gsap.timeline({ delay: .25 })
        .to(svg.querySelectorAll('.ln, .lt, .memb'), { drawSVG: '100%', duration: .9, ease: 'power2.inOut', stagger: { amount: .5 } })
        .to(svg.querySelectorAll('.fill, .glass, .board, .stud, .blk'), { opacity: 1, duration: .35, stagger: .04 }, '-=.4')
        .to(marks, { scale: 1, opacity: 1, duration: .35, ease: 'power4.out', stagger: .08, clearProps: 'transform,opacity' }, '-=.1');   // only what the tween set: the marks keep their inline --x / --y
    }
  } } });
})();

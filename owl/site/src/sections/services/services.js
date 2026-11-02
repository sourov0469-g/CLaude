/* ===== Services: V1 tablist (ARIA tabs pattern) + chapter drawings; V2 hover/focus photo view ===== */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var INK = 'stroke:var(--text-primary)', MUTED = 'stroke:var(--line-control)';
  var ART = {
    courses: function (svg) { Owl.courses(svg, { rows: 6, width: 400, height: 300 }).set(1); },
    hail: function (svg) {
      el('path', { d: 'M110 130 A50 50 0 0 1 120 46 A64 64 0 0 1 240 52 A44 44 0 0 1 280 130 Z', fill: 'none', 'stroke-width': 4, 'stroke-linejoin': 'round', style: INK }, svg);
      for (var i = 0; i < 9; i++) { var x = 120 + i * 18, y = 160 + (i % 3) * 24; el('circle', { cx: x, cy: y, r: 4 + (i % 2), fill: 'none', 'stroke-width': 3, style: INK, class: 'hailstone' }, svg); }
      el('path', { d: 'M40 270 L200 200 L360 270', fill: 'none', 'stroke-width': 4, 'stroke-linejoin': 'round', style: INK }, svg);
      [[150, 236], [214, 222], [260, 240]].forEach(function (d) { el('path', { d: 'M' + (d[0] - 6) + ' ' + d[1] + ' a6 4 0 1 0 12 0 a6 4 0 1 0 -12 0', fill: 'none', 'stroke-width': 2.5, style: 'stroke:var(--accent-fill)' }, svg); });
    },
    leak: function (svg) {
      el('path', { d: 'M40 120 L200 30 L360 120 M70 104 V270 H330 V104', fill: 'none', 'stroke-width': 4, 'stroke-linejoin': 'round', style: INK }, svg);
      el('path', { d: 'M90 150 H310', 'stroke-width': 2, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round', style: MUTED }, svg);
      el('path', { d: 'M200 160 C200 160 182 184 182 196 A18 18 0 0 0 218 196 C218 184 200 160 200 160 Z', fill: 'none', 'stroke-width': 3.5, style: INK }, svg);
      el('circle', { cx: 200, cy: 112, r: 26, fill: 'none', 'stroke-width': 3, style: 'stroke:var(--accent-fill)' }, svg);
      el('path', { d: 'M200 86 V70 M226 112 H242 M200 138 V150 M174 112 H158', 'stroke-width': 2.5, 'stroke-linecap': 'round', style: 'stroke:var(--accent-fill)' }, svg);
    },
    siding: function (svg) {
      for (var y = 40; y <= 260; y += 22) el('path', { d: 'M40 ' + y + ' H360', 'stroke-width': y % 44 ? 2 : 2.5, style: MUTED }, svg);
      el('rect', { x: 150, y: 96, width: 100, height: 110, fill: 'var(--surface-page)', 'stroke-width': 4, style: INK }, svg);
      el('path', { d: 'M200 96 V206 M150 151 H250', 'stroke-width': 3, style: INK }, svg);
      el('path', { d: 'M40 30 V270 M360 30 V270', 'stroke-width': 4, style: INK }, svg);
    }
  };
  var r1 = document.querySelector('.svc-v1');
  if (r1) {
    r1.querySelectorAll('[data-art]').forEach(function (s) { ART[s.dataset.art](s); });
    var tabs = [].slice.call(r1.querySelectorAll('[role="tab"]'));
    function select(t, focus) {
      tabs.forEach(function (x) { var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !on; });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t, false); });
      t.addEventListener('keydown', function (e) {
        var j = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (j === undefined) return; e.preventDefault(); select(tabs[(j + tabs.length) % tabs.length], true);
      });
    });
  }
  var r2 = document.querySelector('.svc-v2');
  if (r2) {
    var figs = [].slice.call(r2.querySelectorAll('.sv2-view .frame'));
    r2.querySelectorAll('.svc').forEach(function (a) {
      var show = function () { figs.forEach(function (f, i) { f.classList.toggle('is-on', i === +a.dataset.img); }); };
      a.addEventListener('pointerenter', show); a.addEventListener('focus', show);
    });
  }
})();

/* Wise Check V1: tabs (ARIA tabs, arrow keys, roving tabindex) light the part of the drawn house each check covers.
   The numbered spots on the drawing are a mouse shortcut to the same tabs, never the only control. */
(function () {
  var r = document.querySelector('.hw-v1'); if (!r) return;
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var INK = 'stroke:var(--text-primary)', MUTE = 'stroke:var(--line-control)', AMB = 'stroke:var(--accent-fill)';
  var s = r.querySelector('.hw1-svg');
  var attic = el('path', { d: 'M104 228 L300 96 L496 228 Z', style: 'fill:var(--accent-fill);opacity:0;transition:opacity var(--dur-normal) var(--ease-out)' }, s);
  el('path', { d: 'M110 230 V400 M490 230 V400 M70 400 H530', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', style: INK }, s);
  el('path', { d: 'M104 230 H496', 'stroke-width': 3, style: INK }, s);
  el('path', { d: 'M170 186 V230 M235 142 V230 M300 98 V230 M365 142 V230 M430 186 V230', 'stroke-width': 2, 'stroke-dasharray': '5 6', style: MUTE }, s);
  var zig = 'M112 224'; for (var x = 112; x < 488; x += 12) zig += ' L' + (x + 6) + ' 216 L' + (x + 12) + ' 224';
  el('path', { d: zig, fill: 'none', 'stroke-width': 2, 'stroke-linejoin': 'round', style: MUTE }, s);
  el('path', { d: 'M56 232 L300 68 L544 232', fill: 'none', 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', style: INK }, s);
  el('rect', { x: 160, y: 290, width: 70, height: 56, fill: 'none', 'stroke-width': 3, style: INK }, s);
  el('path', { d: 'M266 400 V316 H334 V400', fill: 'none', 'stroke-width': 3, style: INK }, s);
  el('path', { d: 'M438 238 C438 238 428 252 428 258 A10 10 0 0 0 448 258 C448 252 438 238 438 238 Z', fill: 'none', 'stroke-width': 3, style: INK }, s);
  el('ellipse', { cx: 438, cy: 234, rx: 18, ry: 4, fill: 'none', 'stroke-width': 2, style: MUTE }, s);
  var heat = [16, 30, 44].map(function (rr) { return el('circle', { cx: 438, cy: 250, r: rr, fill: 'none', 'stroke-width': 2.5, 'stroke-dasharray': '6 6', style: AMB + ';opacity:0;transition:opacity var(--dur-normal) var(--ease-out)' }, s); });
  var cam = el('g', { style: 'opacity:.35;transition:opacity var(--dur-normal) var(--ease-out)' }, s);
  el('rect', { x: 112, y: 54, width: 40, height: 28, rx: 5, fill: 'var(--surface-alt)', 'stroke-width': 3, style: INK }, cam);
  el('circle', { cx: 132, cy: 68, r: 7, fill: 'none', 'stroke-width': 3, style: INK }, cam);
  var frame = el('path', { d: 'M40 44 h28 M40 44 v28 M560 44 h-28 M560 44 v28 M40 252 h28 M40 252 v-28 M560 252 h-28 M560 252 v-28', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', style: AMB + ';opacity:0;transition:opacity var(--dur-normal) var(--ease-out)' }, s);
  var tabs = [].slice.call(r.querySelectorAll('[role="tab"]')), panes = [].slice.call(r.querySelectorAll('[role="tabpanel"]')), spots = [].slice.call(r.querySelectorAll('.hw1-spot'));
  function pick(k, focus) {
    tabs.forEach(function (t, i) { var on = i === k; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; panes[i].hidden = !on; spots[i].classList.toggle('is-on', on); });
    if (focus) tabs[k].focus();
    attic.style.opacity = k === 0 ? 0.22 : 0;
    heat.forEach(function (h) { h.style.opacity = k === 1 ? 1 : 0; });
    frame.style.opacity = k === 2 ? 1 : 0; cam.style.opacity = k === 2 ? 1 : 0.35;
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(i); });
    t.addEventListener('keydown', function (e) {
      var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (n === undefined) return; e.preventDefault(); pick((n + tabs.length) % tabs.length, true);
    });
  });
  spots.forEach(function (b, i) { b.addEventListener('click', function () { pick(i); }); });
  pick(0);
})();

/* call band: the page's line resolves. V1 weaves a nest around the number; V2 draws the line under it. Both play as the band enters. */
(function () {
  document.querySelectorAll('.call-bg').forEach(function (s) { Owl.bg.night(s); });
  var r1 = document.querySelector('.call-v1');
  if (r1) { var n = Owl.nest(r1.querySelector('.cl1-svg'), { onDeep: true }); Owl.scrub(r1.querySelector('.cl1-nest'), n.set, { start: 0.95, end: 0.55 }); }
  var r2 = document.querySelector('.call-v2');
  if (r2) {
    var svg = r2.querySelector('.cl2-line'), line = Owl.sweepLine(r2.querySelector('.cl2-path'), { width: 4 });
    var place = function () { var w = Math.round(svg.getBoundingClientRect().width); if (!w) return; svg.setAttribute('viewBox', '0 0 ' + w + ' 24'); [line.live, line.base].forEach(function (p) { p.setAttribute('d', 'M2 12 H' + (w - 2)); }); };
    place(); addEventListener('resize', place); document.addEventListener('owl:version', place);
    Owl.scrub(svg, line.set, { start: 0.95, end: 0.5 });
  }
})();

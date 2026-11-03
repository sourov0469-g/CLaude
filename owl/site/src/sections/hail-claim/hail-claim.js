/* Insurance paperwork.
   V1 (S1325): base line and fill run from the first dot centre to the last; one normalised scroll value fills the line
   (scaleY, compositor only) and a step turns on when the line head crosses its dot. Passive scroll never moves focus.
   V2: the report travels roof -> Owl -> insurer once when the flow is seen; at Owl it gets its lines and seal. */
(function () {
  var r1 = document.querySelector('.hk-v1');
  if (r1) {
    var line = r1.querySelector('.hk1-line'), base = r1.querySelector('.hk1-base'), fill = r1.querySelector('.hk1-fill'), lis = [].slice.call(r1.querySelectorAll('.hk1-steps li')), geo = null, raf = 0;
    var measure = function () {
      var lr = line.getBoundingClientRect(), dots = lis.map(function (li) { var d = li.querySelector('.hk1-dot').getBoundingClientRect(); return d.top + d.height / 2 - lr.top; });
      geo = { a: dots[0], b: dots[dots.length - 1], dots: dots };
      [base, fill].forEach(function (n) { n.style.top = geo.a + 'px'; n.style.height = (geo.b - geo.a) + 'px'; });
    };
    var update = function () {
      raf = 0; if (r1.closest('[hidden]')) return; if (!geo) measure();
      var top = line.getBoundingClientRect().top, anchor = innerHeight * 0.55 - top;
      var p = Owl.reduced() ? 1 : Math.max(0, Math.min(1, (anchor - geo.a) / Math.max(1, geo.b - geo.a)));
      fill.style.transform = 'scaleY(' + p.toFixed(4) + ')';
      var head = geo.a + p * (geo.b - geo.a);
      lis.forEach(function (li, k) { li.classList.toggle('is-on', geo.dots[k] <= head + 1); });
    };
    var req = function () { if (!raf) raf = requestAnimationFrame(update); };
    var remeasure = function () { geo = null; req(); };
    addEventListener('scroll', req, { passive: true }); addEventListener('resize', remeasure); document.addEventListener('owl:version', remeasure); addEventListener('hashchange', remeasure);
    document.fonts && document.fonts.ready.then(remeasure);
    remeasure();
  }
  var r2 = document.querySelector('.hk-v2');
  if (r2) {
    var flow = r2.querySelector('.hk2-flow'), doc = r2.querySelector('.hk2-doc'), lines = doc.querySelector('.hk2-lines'), seal = doc.querySelector('.hk2-seal'), nodes = [].slice.call(r2.querySelectorAll('.hk2-node')), last = 0;
    lines.setAttribute('pathLength', 1); lines.style.strokeDasharray = 1;
    var pts = function () { var fr = flow.getBoundingClientRect(); return nodes.map(function (n) { var r = n.getBoundingClientRect(); return [r.left - fr.left + r.width * 0.72, r.top - fr.top - r.height * 0.42]; }); };
    var set = function (p) {
      last = p; var P = pts(); if (!P[0][0] && !P[2][0]) return;
      var a = Owl.EASE.travel(Owl.seg(p, 0, 0.35)), b = Owl.EASE.travel(Owl.seg(p, 0.58, 0.95)), x, y;
      if (p < 0.58) { x = P[0][0] + (P[1][0] - P[0][0]) * a; y = P[0][1] + (P[1][1] - P[0][1]) * a; }
      else { x = P[1][0] + (P[2][0] - P[1][0]) * b; y = P[1][1] + (P[2][1] - P[1][1]) * b; }
      doc.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      lines.style.strokeDashoffset = 1 - Owl.EASE.out(Owl.seg(p, 0.36, 0.5));
      seal.style.opacity = Owl.seg(p, 0.48, 0.56);
    };
    set(Owl.reduced() ? 1 : 0);
    addEventListener('resize', function () { set(last); }); document.addEventListener('owl:version', function () { set(last); }); addEventListener('hashchange', function () { setTimeout(function () { set(last); }, 50); });
    new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(set, 2600); } }, { threshold: 0.5 }).observe(flow);
  }
})();

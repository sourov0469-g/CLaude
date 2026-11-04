/* SERVICES M — "One frame, every trade" (new-versions addendum, pass 3; Lusion: flow, one thing continuously becoming
   the next). Markup in build_site.py (svcM). One photo frame whose outline flows, through clip-path polygons that all
   share the same ten points, into the shape of each trade's work; the trade's published photo cross-flows inside it
   and its record sits beside it. Not a configurator: nothing is chosen for the visitor's house. */
window.Svc7 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // ten points per shape, clockwise from the top left, in % of the frame (4:3)
  const S = [
    [[4, 14], [100, 14], [100, 40], [96, 40], [96, 66], [100, 66], [100, 92], [0, 92], [0, 40], [4, 40]],      // siding: lapped boards
    [[22, 2], [50, 2], [78, 2], [78, 86], [84, 86], [84, 96], [50, 96], [16, 96], [16, 86], [22, 86]],          // windows: the unit on its sill
    [[0, 8], [50, 4], [100, 8], [100, 72], [80, 72], [80, 94], [68, 94], [68, 72], [0, 72], [0, 40]],           // painting: a swatch with a drip
    [[40, 13], [50, 4], [60, 13], [100, 56], [92, 56], [92, 96], [8, 96], [8, 56], [0, 56], [20, 34.5]],       // shingle roofing: a gable with eaves
    [[0, 12], [50, 12], [100, 12], [100, 40], [88, 40], [88, 98], [74, 98], [74, 40], [40, 40], [0, 40]],      // gutters: the run and its downspout
    [[30, 2], [50, 2], [70, 2], [70, 90], [76, 90], [76, 98], [50, 98], [24, 98], [24, 90], [30, 90]],          // doors: tall, on the threshold
    [[0, 10], [50, 16], [100, 22], [100, 32], [90, 32], [90, 96], [50, 96], [10, 96], [10, 30], [0, 30]],       // patio covers: the sloped cover on posts
    [[0, 38], [50, 21], [100, 4], [100, 16], [94, 16], [94, 96], [50, 96], [6, 96], [6, 36], [0, 36]],         // metal roofing: a mono-slope roof
    [[2, 28], [50, 28], [98, 28], [98, 38], [94, 38], [94, 96], [50, 96], [6, 96], [6, 38], [2, 38]],           // garage doors: wide, under a header
  ];
  const poly = (s) => 'polygon(' + s.map((p) => `${p[0]}% ${p[1]}%`).join(',') + ')';
  const DOT = poly(S[0].map(() => [50, 50]));
  function wire(root) {
    const sec = root.querySelector('.svM'); if (!sec || sec.dataset.w) return; sec.dataset.w = '1';
    const rs = [...sec.querySelectorAll('.smr')], clip = sec.querySelector('.smclip'), imgs = [...sec.querySelectorAll('.smi')], pans = [...sec.querySelectorAll('.smpan')];
    let cur = 0;
    const pick = (i, focus) => {
      if (i === cur) { if (focus) rs[i].focus(); return; }
      cur = i;
      rs.forEach((r, j) => { r.setAttribute('aria-checked', String(j === i)); r.tabIndex = j === i ? 0 : -1; });
      if (focus) rs[i].focus();
      clip.style.clipPath = poly(S[i]);
      imgs.forEach((m, j) => { m.classList.toggle('on', j === i); m.setAttribute('aria-hidden', String(j !== i)); });
      pans.forEach((p, j) => { p.hidden = j !== i; if (j === i && !RM) { p.classList.remove('smin'); void p.offsetWidth; p.classList.add('smin'); } });
    };
    rs.forEach((r, i) => {
      r.addEventListener('click', () => pick(i));
      r.addEventListener('keydown', (e) => {
        const n = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: rs.length - 1 }[e.key];
        if (n === undefined) return; e.preventDefault(); pick((n + rs.length) % rs.length, true);
      });
    });
    // arrival, once: the frame blooms out of a point into the first shape
    if (RM || !('IntersectionObserver' in window)) return;
    clip.style.transition = 'none'; clip.style.clipPath = DOT; void clip.offsetWidth; clip.style.transition = '';
    const io = new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting)) { io.disconnect(); setTimeout(() => { clip.style.clipPath = poly(S[cur]); }, 150); } }, { threshold: 0.35 });
    io.observe(sec.querySelector('.smf'));   // the figure, not the clipped layer: a frame clipped to a point never counts as visible
  }
  return { wire, S };
})();

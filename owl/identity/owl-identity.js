/* Owl Roofing identity runtime: the reusable motion and motif code behind the asset board and every later section.
   No dependencies. Everything reads the CSS tokens in tokens.css; nothing here hardcodes a colour.
   Motion method: rossark (⟦S0489⟧) — never teleport, calm curves, small amplitudes, one clock per scene, reduced motion
   = still (frame 0 / final frame is a good drawing), nothing runs unseen.
   API (window.Owl):
     Owl.logo(svgEl)                         blink once on appear, glance <=1 unit toward the pointer, blink on click
     Owl.sweepLine(pathEl)  -> {set(p)}     dotted while travelling, solid amber where it works (p = 0..1)
     Owl.magnetPass(svgEl, opts) -> {set(p)} the 3-Part Cleanup magnet pass: nails lift onto the bar, scrub-safe
     Owl.courses(svgEl, opts) -> {set(p)}   shingle courses lay themselves, eave to ridge
     Owl.nest(svgEl, opts) -> {set(p)}      strands weave a nest around a centre (the call)
     Owl.scrub(el, fn)                      drive fn(p) from an element's pass through the viewport
     Owl.play(fn, ms)                       drive fn(p) once over time (one-shot clock), honours reduced motion
     Owl.companion.set('eyes'|'magnet'|'off')  the cursor companion (pointer: fine only, off under reduced motion)
*/
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => mqReduce.matches;
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ms = (name) => parseFloat(css(name)) || 0;
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (p, a, b) => clamp01((p - a) / (b - a));
  const seeded = (i, k = 0) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
  // cubic-bezier evaluator (x->y) so JS-driven motion uses the same curves as the tokens
  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const sx = (t) => ((ax * t + bx) * t + cx) * t, sy = (t) => ((ay * t + by) * t + cy) * t, dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
    return (x) => { let t = x; for (let i = 0; i < 6; i++) { const d = dx(t); if (Math.abs(d) < 1e-6) break; t -= (sx(t) - x) / d; } return sy(clamp01(t)); };
  }
  const EASE = { out: bezier(0.23, 1, 0.32, 1), travel: bezier(0.77, 0, 0.175, 1), in: bezier(0.55, 0, 1, 0.45) };
  const el = (tag, attrs = {}, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };

  // ---------- clocks
  function play(fn, dur) {
    if (reduced()) { fn(1); return { cancel() {} }; }
    let raf, t0;
    const step = (now) => { t0 ??= now; const p = clamp01((now - t0) / dur); fn(p); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return { cancel() { cancelAnimationFrame(raf); } };
  }
  function scrub(target, fn, { start = 0.85, end = 0.15 } = {}) {
    // p = 0 when target top hits `start` of viewport height, 1 when its bottom passes `end`
    if (reduced()) { fn(1); return; }
    let raf = 0, visible = false;
    const update = () => { raf = 0; const r = target.getBoundingClientRect(), vh = innerHeight; const a = vh * start, b = vh * end - r.height; fn(clamp01((a - r.top) / (a - b))); };
    const req = () => { if (visible && !raf) raf = requestAnimationFrame(update); };
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; req(); }, { rootMargin: '20% 0px' }).observe(target);
    addEventListener('scroll', req, { passive: true }); addEventListener('resize', req);
    update();
  }

  // ---------- 1. the kept logo, alive in place (paths are Owl's; only transforms are applied)
  function logo(svg) {
    const parts = [...svg.querySelectorAll('.eye, .pupil')];
    if (!parts.length) return;
    parts.forEach((p) => { p.style.transformBox = 'fill-box'; p.style.transformOrigin = 'center'; });
    const pupils = [...svg.querySelectorAll('.pupil')];
    let busy = false;
    const blink = () => {
      if (reduced() || busy) return; busy = true;
      const c = ms('--blink-close') || 110, h = ms('--blink-hold') || 40, o = ms('--blink-open') || 190, tot = c + h + o;
      parts.forEach((p) => p.animate([
        { transform: 'scaleY(1)', easing: css('--ease-travel') },
        { transform: 'scaleY(.08)', offset: c / tot },
        { transform: 'scaleY(.08)', offset: (c + h) / tot, easing: css('--ease-out') },
        { transform: 'scaleY(1)' }], { duration: tot, composite: 'add' }));
      setTimeout(() => (busy = false), tot);
    };
    let gx = 0, gy = 0, back;
    const glance = (dx, dy) => {
      if (reduced()) return;
      const nx = Math.max(-1, Math.min(1, dx)), ny = Math.max(-1, Math.min(1, dy)) * 0.6;
      if (Math.abs(nx - gx) < 0.15 && Math.abs(ny - gy) < 0.15) return;
      pupils.forEach((p) => { p.style.transition = `transform ${ms('--dur-slow')}ms ${css('--ease-travel')}`; p.style.transform = `translate(${nx}px,${ny}px)`; });
      gx = nx; gy = ny;
    };
    const host = svg.closest('a, header, [data-logo-host]') || svg;
    host.addEventListener('pointermove', (e) => { const r = svg.getBoundingClientRect(); glance((e.clientX - (r.left + r.width / 2)) / 120, (e.clientY - (r.top + r.height / 2)) / 120); clearTimeout(back); back = setTimeout(() => glance(0, 0), 1200); });
    host.addEventListener('pointerleave', () => { clearTimeout(back); glance(0, 0); });
    host.addEventListener('pointerdown', blink);
    new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { setTimeout(blink, 450); io.disconnect(); } }, { threshold: 0.6 }).observe(svg);
    return { blink, glance };
  }

  // ---------- 2. the sweep line: one line through the page
  function sweepLine(path, { width = 2.5 } = {}) {
    const base = path.cloneNode(); const live = path.cloneNode();
    for (const [n, stroke] of [[base, 'var(--sweep-line-idle)'], [live, 'var(--sweep-line)']]) {
      n.removeAttribute('id'); n.setAttribute('fill', 'none'); n.setAttribute('stroke-linecap', 'round'); n.setAttribute('stroke-linejoin', 'round');
      n.style.stroke = stroke; n.setAttribute('stroke-width', width); n.setAttribute('pathLength', '1'); path.parentNode.insertBefore(n, path);
    }
    base.setAttribute('stroke-dasharray', '0 0.012'); base.setAttribute('stroke-width', width * 1.1); base.style.opacity = '.55';
    live.setAttribute('stroke-dasharray', '1 1');
    path.setAttribute('visibility', 'hidden');
    const set = (p) => live.setAttribute('stroke-dashoffset', 1 - clamp01(p));
    set(reduced() ? 1 : 0);
    return { set, live, base };
  }

  // ---------- 3. drawn pieces (Owl's own grammar: monoline 1.5-2.5 units, round caps, tokens only)
  function nailShape(parent, s = 1) {
    const g = el('g', { class: 'owl-nail' }, parent);
    el('path', { d: `M${-6 * s} 0H${6 * s} M${-1.3 * s} 0V${14 * s}L0 ${19 * s}L${1.3 * s} ${14 * s}V0`, fill: 'none', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', style: 'stroke:var(--nail)' }, g);
    return g;
  }
  function sweeper(parent, s = 1) {
    // a rolling roofing-magnet sweeper, side view: magnet bar, two wheels, handle. Origin = bar centre, floor at y = 12*s+wheel
    const g = el('g', { class: 'owl-sweeper' }, parent);
    el('path', { d: `M${40 * s} ${-8 * s} L${118 * s} ${-104 * s} M${108 * s} ${-110 * s} L${130 * s} ${-96 * s}`, fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', style: 'stroke:var(--text-primary)' }, g);
    el('rect', { x: -62 * s, y: -10 * s, width: 124 * s, height: 16 * s, rx: 4 * s, style: 'fill:var(--text-primary)' }, g);
    el('rect', { x: -56 * s, y: 6 * s, width: 112 * s, height: 4 * s, rx: 2 * s, style: 'fill:var(--accent-fill)' }, g); // the magnet face: the one amber
    const wheels = [-66, 66].map((x) => {
      const w = el('g', { transform: `translate(${x * s} ${6 * s})` }, g);
      el('circle', { r: 11 * s, 'stroke-width': 3, style: 'stroke:var(--text-primary);fill:var(--surface-page)' }, w);
      const spokes = el('path', { d: `M${-7 * s} 0H${7 * s} M0 ${-7 * s}V${7 * s}`, 'stroke-width': 2, 'stroke-linecap': 'round', style: 'stroke:var(--text-primary)' }, w);
      return spokes;
    });
    return { g, wheels, r: 11 * s };
  }

  // ---------- 4. the magnet pass (signature motif): deterministic in p, so scroll can scrub it both ways
  function magnetPass(svg, { width = 1200, ground = 236, nails = 14, seed = 3 } = {}) {
    svg.setAttribute('viewBox', `0 92 ${width} 192`); // tight: handle top to nail tips
    const lawn = el('g', { class: 'owl-lawn' }, svg);
    const blades = [];
    for (let x = 8, i = 0; x < width; x += 6 + seeded(i, seed) * 3, i++) {
      const h = 7 + seeded(i, seed + 1) * 12, lean = (seeded(i, seed + 2) - 0.5) * 6;
      const b = el('path', { d: `M${x} ${ground} q${lean * 0.4} ${-h * 0.6} ${lean} ${-h}`, fill: 'none', 'stroke-width': 1.5, 'stroke-linecap': 'round', style: 'stroke:var(--line-control);opacity:.75' }, lawn);
      blades.push({ b, x });
    }
    el('path', { d: `M0 ${ground}H${width}`, 'stroke-width': 1.5, style: 'stroke:var(--line-control)' }, lawn);
    const items = [];
    for (let i = 0; i < nails; i++) {
      const x = 90 + (i + seeded(i, seed + 4) * 0.8) * ((width - 360) / nails), rot = (seeded(i, seed + 5) - 0.5) * 150;
      const g = nailShape(svg, 0.9);
      items.push({ g, x, y: ground - 4 - seeded(i, seed + 6) * 8, rot, slot: -44 + seeded(i, seed + 7) * 88 });
    }
    const sw = sweeper(svg, 1);
    const floorY = ground - 6 - 11; // bar centre height so wheels sit on the lawn line
    const set = (p) => {
      const mx = lerp(-160, width - 170, EASE.travel(p)); // parks on stage, nails on the bar
      sw.g.setAttribute('transform', `translate(${mx} ${floorY})`);
      const ang = ((mx + 160) / sw.r) * (180 / Math.PI);
      sw.wheels.forEach((w) => w.setAttribute('transform', `rotate(${ang})`));
      let got = 0;
      for (const n of items) {
        const reach = (n.x - 30 + 160) / (width - 10); // travel fraction at which the bar's leading half reaches the nail
        const tp = EASE.travel(p), t = EASE.out(seg(tp, reach, reach + 0.035));
        if (t > 0) got++;
        const x = lerp(n.x, mx + n.slot, t), y = lerp(n.y, floorY + 14, t), r = lerp(n.rot, 0, t);
        n.g.setAttribute('transform', `translate(${x} ${y}) rotate(${r})`);
      }
      blades.forEach(({ b, x }) => { const d = Math.abs(x - mx); b.style.transform = d < 70 ? `skewX(${(x < mx ? 1 : -1) * (1 - d / 70) * 18}deg)` : ''; b.style.transformOrigin = `${x}px ${ground}px`; });
      svg.dispatchEvent(new CustomEvent('owl:collected', { detail: { got, total: items.length } }));
    };
    set(reduced() ? 1 : 0);
    return { set, total: items.length };
  }

  // ---------- 5. shingle courses lay themselves, eave first
  function courses(svg, { rows = 7, width = 600, height = 300 } = {}) {
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const top = 40, eave = height - 30, rowH = (eave - top) / rows, out = [];
    for (let r = 0; r < rows; r++) {
      const y = eave - (r + 1) * rowH, g = el('g', {}, svg), off = (r % 2) * 18, tab = 36;
      el('rect', { x: 20, y, width: width - 40, height: rowH + 2, style: `fill:${r % 2 ? 'var(--surface-alt)' : 'var(--surface-page)'}` }, g);
      let d = `M20 ${y + rowH}H${width - 20}`;
      for (let x = 20 + off + tab; x < width - 20; x += tab) d += ` M${x} ${y + rowH * 0.42}V${y + rowH}`;
      el('path', { d, fill: 'none', 'stroke-width': 1.5, 'stroke-linecap': 'round', style: 'stroke:var(--text-primary)' }, g);
      out.push(g);
    }
    const ridge = el('path', { d: `M14 ${top}H${width - 14}`, 'stroke-width': 4, 'stroke-linecap': 'round', style: 'stroke:var(--text-primary)' }, svg);
    const set = (p) => {
      out.forEach((g, r) => { const t = EASE.out(seg(p, r * 0.11, r * 0.11 + 0.25)); g.style.opacity = t > 0 ? 1 : 0; g.setAttribute('transform', `translate(0 ${(1 - t) * -14})`); g.style.opacity = t; });
      const t = EASE.out(seg(p, 0.85, 1)); ridge.style.opacity = t; ridge.setAttribute('transform', `translate(0 ${(1 - t) * -8})`);
    };
    set(reduced() ? 1 : 0);
    return { set };
  }

  // ---------- 6. the nest: strands weave around the centre (the phone number sits there)
  function nest(svg, { width = 640, height = 300, strands = 14, seed = 9 } = {}) {
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const cx = width / 2, rimY = height * 0.42, rx = width * 0.36, rr = height * 0.1, depth = height * 0.42, out = [];
    const tones = ['var(--line-control)', 'var(--graphic-warm)', 'var(--text-primary)'];
    const add = (d, i, w, stroke, op = 1) => out.push(el('path', { d, fill: 'none', 'stroke-width': w, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', style: `stroke:${stroke};opacity:${op}` }, svg));
    // back rim (upper half of the rim ellipse), lighter: it sits behind
    for (let k = 0; k < 3; k++) { const o = (k - 1) * 5; add(`M${cx - rx - o} ${rimY} A${rx + o} ${rr + o * 0.4} 0 0 1 ${cx + rx + o} ${rimY}`, k, 1.6, tones[k], 0.55); }
    // bowl strands: each enters the rim on one side and leaves on the other, alternating lean so they cross (the weave)
    for (let i = 0; i < strands; i++) {
      const lean = i % 2 ? 1 : -1, u0 = seeded(i, seed), u1 = seeded(i, seed + 1);
      const x0 = cx - rx * (0.72 + u0 * 0.3), y0 = rimY + rr * (0.2 + u1 * 0.6) * lean;
      const x3 = cx + rx * (0.72 + u1 * 0.3), y3 = rimY - rr * (0.2 + u0 * 0.6) * lean;
      const sag = depth * (0.62 + seeded(i, seed + 2) * 0.42), sk = (seeded(i, seed + 3) - 0.5) * rx * 0.5;
      add(`M${x0.toFixed(1)} ${y0.toFixed(1)} C${(x0 + rx * 0.22 + sk).toFixed(1)} ${(rimY + sag).toFixed(1)} ${(x3 - rx * 0.22 + sk).toFixed(1)} ${(rimY + sag).toFixed(1)} ${x3.toFixed(1)} ${y3.toFixed(1)}`, i, 1.4 + seeded(i, seed + 4) * 1.4, tones[i % 3]);
    }
    // front rim (lower half), drawn last; the final strand is the one amber
    for (let k = 0; k < 3; k++) { const o = (k - 1) * 6; add(`M${cx - rx - o} ${rimY} A${rx + o} ${rr + 4 + o * 0.4} 0 0 0 ${cx + rx + o} ${rimY}`, k, k === 2 ? 3.2 : 2, k === 2 ? 'var(--accent-fill)' : tones[(k + 1) % 3]); }
    const n = out.length;
    const set = (p) => out.forEach((s, i) => s.setAttribute('stroke-dashoffset', 1 - EASE.out(seg(p, (i / n) * 0.62, (i / n) * 0.62 + 0.38))));
    set(reduced() ? 1 : 0);
    return { set, rim: { cx, y: rimY } };
  }

  // ---------- 7. cursor companion: native cursor + ONE companion (eyes | magnet). Off on touch and under reduced motion.
  const companion = (() => {
    let node, kind = 'off', raf = 0, x = -100, y = -100, tx = -100, ty = -100, vis = false, last = 0, roll = 0, target = null, aside = 0;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const allowed = () => fine.matches && !reduced();
    function build(k) {
      node?.remove(); node = null; kind = k;
      if (k === 'off' || !allowed()) { cancelAnimationFrame(raf); raf = 0; return; }
      node = document.createElementNS(NS, 'svg');
      node.setAttribute('class', 'owl-companion'); node.setAttribute('aria-hidden', 'true');
      node.style.cssText = 'position:fixed;left:0;top:0;pointer-events:none;z-index:2147483000;overflow:visible;opacity:0;transition:opacity var(--dur-fast) linear';
      if (k === 'eyes') {
        node.setAttribute('width', 46); node.setAttribute('height', 30); node.setAttribute('viewBox', '-23 -15 46 30');
        const g = el('g', { class: 'c-body' }, node);
        el('rect', { x: -22, y: -14, width: 44, height: 28, rx: 14, style: 'fill:var(--surface-ink)' }, g);
        node._eyes = [-10, 10].map((ex) => {
          const e = el('g', { transform: `translate(${ex} 0)` }, g);
          const iris = el('circle', { r: 8, style: 'fill:var(--accent-fill)' }, e);
          const pupil = el('circle', { r: 3.4, style: 'fill:var(--surface-ink)' }, e);
          return { e, iris, pupil };
        });
      } else {
        node.setAttribute('width', 70); node.setAttribute('height', 48); node.setAttribute('viewBox', '-35 -30 70 48');
        const g = el('g', { class: 'c-body' }, node);
        el('path', { d: 'M12 -6 L30 -27', 'stroke-width': 3, 'stroke-linecap': 'round', style: 'stroke:var(--text-primary)' }, g);
        el('rect', { x: -22, y: -8, width: 44, height: 9, rx: 3, style: 'fill:var(--text-primary)' }, g);
        el('rect', { x: -19, y: 1, width: 38, height: 2.6, rx: 1.3, style: 'fill:var(--accent-fill)' }, g);
        node._wheels = [-24, 24].map((wx) => { const w = el('g', { transform: `translate(${wx} 2)` }, g); el('circle', { r: 6, 'stroke-width': 2, style: 'stroke:var(--text-primary);fill:var(--surface-page)' }, w); return el('path', { d: 'M-3.5 0H3.5M0 -3.5V3.5', 'stroke-width': 1.5, 'stroke-linecap': 'round', style: 'stroke:var(--text-primary)' }, w); });
        node._bits = el('g', {}, g);
      }
      document.body.appendChild(node);
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function role(t) {
      if (!t || !t.closest) return null;
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return 'field';
      if (t.closest('[data-owl-busy]')) return 'busy';
      const b = t.closest('button, .btn, [role="button"]'); if (b) return { kind: 'button', el: b };
      const a = t.closest('a[href]'); if (a) return { kind: 'link', el: a };
      return null;
    }
    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (!node) return;
      const dt = Math.min(64, now - (last || now)); last = now;
      const k = 1 - Math.pow(1 - 0.22, dt / 16.7); // frame-rate independent lag: no jumps on fast flicks
      const r = target, want = r === 'field' || r === 'busy' ? 1 : 0;
      aside += (want - aside) * (1 - Math.pow(1 - 0.12, dt / 16.7));
      const ox = 22 + aside * 46, oy = 20 + aside * 30; // beside the native cursor; drifts further aside off fields / busy scenes
      const px = x; x += (tx + ox - x) * k; y += (ty + oy - y) * k;
      node.style.transform = `translate(${x - (kind === 'eyes' ? 23 : 35)}px, ${y - 15}px)`;
      node.style.opacity = vis ? String(1 - aside * 0.55) : '0';
      if (kind === 'eyes') {
        let lx = tx - x, ly = ty - y;
        if (r && r.el) { const b = r.el.getBoundingClientRect(); lx = b.left + b.width / 2 - x; ly = b.top + b.height / 2 - y; }
        const m = Math.hypot(lx, ly) || 1, s = Math.min(3, m / 40);
        node._eyes.forEach(({ pupil }) => pupil.setAttribute('transform', `translate(${(lx / m) * s} ${(ly / m) * s})`));
        const wide = r && r.kind === 'link' ? 1.12 : 1;
        node._eyes.forEach(({ e }, i) => { const cur = e._w ?? 1; e._w = cur + (wide - cur) * 0.2; e.setAttribute('transform', `translate(${i ? 10 : -10} 0) scale(${e._w})`); });
      } else {
        roll += (x - px) / 6 * (180 / Math.PI);
        node._wheels.forEach((w) => w.setAttribute('transform', `rotate(${roll})`));
        const tilt = r && r.el ? Math.max(-12, Math.min(12, (r.el.getBoundingClientRect().left + r.el.getBoundingClientRect().width / 2 - x) / 12)) : Math.max(-8, Math.min(8, (x - px) * 0.8));
        const body = node.querySelector('.c-body'); const ct = body._t ?? 0; body._t = ct + (tilt - ct) * 0.15; body.setAttribute('transform', `rotate(${body._t})`);
      }
    }
    function tap() {
      if (!node) return;
      const body = node.querySelector('.c-body');
      body.style.transformBox = 'fill-box'; body.style.transformOrigin = '0% 0%'; // press pivots on the corner nearest the pointer tip
      body.getAnimations().forEach((a) => a.cancel());
      body.animate([{ scale: '1' }, { scale: '0.84' }], { duration: ms('--press-in') || 100, easing: css('--ease-in') })
        .finished.then(() => body.animate([{ scale: '0.84' }, { scale: '1' }], { duration: ms('--press-out') || 220, easing: css('--ease-out') })).catch(() => {});
      if (kind === 'eyes') node._eyes.forEach(({ e }) => e.animate([{ scale: '1 1' }, { scale: '1 .08', offset: 0.32 }, { scale: '1 .08', offset: 0.45 }, { scale: '1 1' }], { duration: 340, composite: 'add' }));
      else for (let i = 0; i < 3; i++) { // three nails fly up into the magnet face, same frame as the click
        const n = nailShape(node._bits, 0.32), sx = (i - 1) * 9;
        n.animate([{ transform: `translate(${sx}px, 22px) rotate(${(i - 1) * 40}deg)`, opacity: 1 }, { transform: `translate(${sx * 0.6}px, 3px) rotate(0deg)`, opacity: 1, offset: 0.7 }, { transform: `translate(${sx * 0.6}px, 3px) rotate(0deg)`, opacity: 0 }], { duration: 520, easing: 'cubic-bezier(.23,1,.32,1)' }).finished.then(() => n.remove());
      }
    }
    addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; tx = e.clientX; ty = e.clientY; if (!vis) { x = tx + 22; y = ty + 20; } vis = true; target = role(e.target); }, { passive: true });
    document.addEventListener('pointerleave', () => (vis = false));
    document.documentElement.addEventListener('mouseleave', () => (vis = false));
    addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') tap(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else if (node && !raf) { last = 0; raf = requestAnimationFrame(tick); } });
    const reapply = () => build(kind);
    fine.addEventListener?.('change', reapply); mqReduce.addEventListener?.('change', reapply);
    return {
      set(k) { try { localStorage.setItem('owl-companion', k); } catch (e) {} build(k); document.dispatchEvent(new CustomEvent('owl:companion', { detail: k })); },
      get kind() { return kind; },
      init(def = 'eyes') { let k = def; try { k = localStorage.getItem('owl-companion') || def; } catch (e) {} build(k); return k; },
      allowed,
    };
  })();


  // ---------- 8. full-section backgrounds (layered constructions, one focal mass each, transform/opacity drift only)
  // Each returns the <svg>. Drift runs only while on screen (class .is-live), never under reduced motion.
  // Rings and Night need Owl's own symbols in the page: <symbol id="owl-rings"> (faq-bg.svg) and <symbol id="owl-trees"> (footer-bg.svg).
  function liveWhileVisible(node) {
    new IntersectionObserver((es) => es.forEach((e) => node.classList.toggle('is-live', e.isIntersecting && !reduced()))).observe(node);
  }
  let gid = 0;
  const bg = {
    lawn(svg, { seed = 5 } = {}) { // light: receding shingle-course underdrawing, dotted sweep, lawn edge, one warm glow low-left
      const id = 'owlbg' + ++gid, W = 1440, H = 800;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('preserveAspectRatio', 'xMidYMax slice'); svg.setAttribute('aria-hidden', 'true'); svg.classList.add('owl-bg', 'owl-bg--lawn');
      const defs = el('defs', {}, svg);
      const lg = el('linearGradient', { id: id + 'f', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
      el('stop', { offset: 0, 'stop-color': '#fff', 'stop-opacity': 0 }, lg); el('stop', { offset: 0.55, 'stop-color': '#fff', 'stop-opacity': 1 }, lg);
      const m = el('mask', { id: id + 'm' }, defs); el('rect', { width: W, height: H, fill: `url(#${id}f)` }, m);
      const rg = el('radialGradient', { id: id + 'g' }, defs);
      el('stop', { offset: 0, style: 'stop-color:var(--graphic-warm);stop-opacity:.22' }, rg); el('stop', { offset: 1, style: 'stop-color:var(--graphic-warm);stop-opacity:0' }, rg);
      el('ellipse', { class: 'drift-a', cx: W - 300, cy: H - 230, rx: 460, ry: 300, fill: `url(#${id}g)` }, svg); // the one focal mass, opposite the copy
      const c = el('g', { mask: `url(#${id}m)`, fill: 'none', 'stroke-width': 1, style: 'stroke:var(--line-hairline)' }, svg);
      for (let i = 1, y = H - 40; y > 40; i++) { // courses: spacing shrinks toward the top so the plane recedes
        const gap = Math.max(22, 70 * Math.pow(0.88, i)); // floor keeps the loop finite and the top courses legible
        let d = `M0 ${y}H${W}`;
        for (let x = (i % 2) * 40 + Math.max(24, 80 * Math.pow(0.9, i)); x < W; x += Math.max(24, 80 * Math.pow(0.9, i))) d += ` M${x.toFixed(1)} ${y}v${(-gap * 0.45).toFixed(1)}`;
        el('path', { d, style: `stroke-width:${Math.max(0.6, 1.4 * Math.pow(0.9, i))}` }, c);
        y -= gap;
      }
      const line = el('path', { d: `M-20 ${H - 210} C 360 ${H - 330} 620 ${H - 120} 980 ${H - 250} S 1400 ${H - 330} ${W + 20} ${H - 300}`, fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': '0 12', style: 'stroke:var(--line-control);opacity:.5' }, svg);
      const lawn = el('g', { 'stroke-width': 1.4, 'stroke-linecap': 'round', fill: 'none', style: 'stroke:var(--line-control);opacity:.4' }, svg);
      let d = '';
      for (let x = 4, i = 0; x < W; x += 5 + seeded(i, seed) * 4, i++) { const h = 6 + seeded(i, seed + 1) * 16; d += `M${x.toFixed(1)} ${H} q${((seeded(i, seed + 2) - 0.5) * 3).toFixed(1)} ${(-h * 0.6).toFixed(1)} ${((seeded(i, seed + 2) - 0.5) * 7).toFixed(1)} ${(-h).toFixed(1)} `; }
      el('path', { d }, lawn);
      liveWhileVisible(svg);
      return svg;
    },
    rings(svg) { // cream: Owl's own tree-ring contours, two scales drifting against each other; the focal cluster sits right
      const id = 'owlbg' + ++gid, W = 1440, H = 800;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('preserveAspectRatio', 'xMidYMid slice'); svg.setAttribute('aria-hidden', 'true'); svg.classList.add('owl-bg', 'owl-bg--rings');
      const defs = el('defs', {}, svg);
      const rg = el('radialGradient', { id: id + 'f', cx: 0.62, cy: 0.5, r: 0.7 }, defs);
      el('stop', { offset: 0.35, 'stop-color': '#fff' }, rg); el('stop', { offset: 1, 'stop-color': '#000' }, rg);
      const m = el('mask', { id: id + 'm' }, defs); el('rect', { width: W, height: H, fill: `url(#${id}f)` }, m);
      const g = el('g', { mask: `url(#${id}m)` }, svg);
      el('use', { href: '#owl-rings', x: -260, y: -120, width: 1500, height: 1060, class: 'drift-b', style: 'fill:var(--graphic-warm);opacity:.10' }, g);
      el('use', { href: '#owl-rings', x: 760, y: 120, width: 820, height: 580, class: 'drift-a', style: 'fill:var(--graphic-warm);opacity:.22' }, g); // focal cluster
      liveWhileVisible(svg);
      return svg;
    },
    night(svg) { // deep: Owl's treeline in three depths, parallax drift; one porch-light glow low-right
      const id = 'owlbg' + ++gid, W = 1440, H = 800;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('preserveAspectRatio', 'xMidYMax slice'); svg.setAttribute('aria-hidden', 'true'); svg.classList.add('owl-bg', 'owl-bg--night');
      const defs = el('defs', {}, svg);
      const rg = el('radialGradient', { id: id + 'g' }, defs);
      el('stop', { offset: 0, style: 'stop-color:var(--accent-fill);stop-opacity:.38' }, rg); el('stop', { offset: 1, style: 'stop-color:var(--accent-fill);stop-opacity:0' }, rg);
      el('ellipse', { class: 'drift-a', cx: 1130, cy: H - 150, rx: 230, ry: 170, fill: `url(#${id}g)` }, svg);
      const layer = (h, style, cls) => { const g = el('g', { class: cls }, svg); for (let k = 0; k < 2; k++) el('use', { href: '#owl-trees', x: k * W, y: H - h, width: W, height: h, style }, g); return g; };
      layer(380, 'fill:var(--line-on-deep);opacity:.12', 'pan-slow');
      layer(300, 'fill:var(--surface-night);opacity:.55', 'pan-mid');
      layer(210, 'fill:var(--surface-night)', 'pan-fast');
      liveWhileVisible(svg);
      return svg;
    },
  };

  // ---------- 9. header: menu toggle <-> panel (aria-expanded, Escape, link click, outside click close it)
  function header(h) {
    const t = h.querySelector('.menu-toggle'), panel = h.querySelector('.menu-panel');
    if (!t || !panel) return;
    const set = (open) => { t.setAttribute('aria-expanded', open); panel.hidden = !open; if (open) panel.querySelector('a')?.focus({ preventScroll: true }); };
    t.addEventListener('click', () => set(t.getAttribute('aria-expanded') !== 'true'));
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && t.getAttribute('aria-expanded') === 'true') { set(false); t.focus(); } });
    document.addEventListener('pointerdown', (e) => { if (!h.contains(e.target) && t.getAttribute('aria-expanded') === 'true') set(false); });
  }

  window.Owl = { header, bg, logo, sweepLine, magnetPass, courses, nest, scrub, play, companion, seeded, seg, EASE, reduced };
})();

/* HERO VERSIONS 2–6 (upgrade brief §3), all on Muse's supplied photographs (never captioned as the firm's jobs).
   Shared: a depth-photo engine. Each photo has a hand-traced depth map (depth.py); a fragment shader bends the photo by
   (depth − focus) × the damped pointer (S1330: one target, 0.055 per 60 Hz frame dt-corrected, near and far move by
   opposing, unequal amounts), refined in 4 steps so edges do not tear. Dusk photos get a warm-light lift on hover.
   Touch: a slow authored drift while in view. Reduced motion: the still photo at the designed pose. */
window.Hero2 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const P = () => window.__HERO2 || {};

  function depthPhoto(host, o) {
    const cv = document.createElement('canvas'); cv.className = 'dp'; cv.setAttribute('aria-hidden', 'true'); host.prepend(cv);
    const gl = cv.getContext('webgl', { premultipliedAlpha: false, antialias: false });
    const fallback = () => { cv.remove(); const im = new Image(); im.src = o.src; im.alt = ''; im.className = 'dp-still'; host.prepend(im); };
    if (!gl) return fallback();
    const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0,1);}';
    const FS = `precision mediump float;varying vec2 v;uniform sampler2D img,dep;uniform vec2 sc,of,mv;uniform float focus,glow,zoom;
      vec2 cov(vec2 u){return (u-.5)/zoom+.5;}
      void main(){vec2 u=cov(v)*sc+of;vec2 q=u;for(int i=0;i<4;i++){float d=texture2D(dep,q).r;q=u+mv*(d-focus);}
        vec4 c=texture2D(img,q);float l=dot(c.rgb,vec3(.299,.587,.114));c.rgb+=glow*smoothstep(.5,.92,l)*vec3(.22,.13,.02);gl_FragColor=vec4(c.rgb,1.);}`;
    const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); return x; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return fallback();
    gl.useProgram(pr); const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const ap = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(pr, n);
    const tex = (unit, im) => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
      ['TEXTURE_WRAP_S', 'TEXTURE_WRAP_T'].forEach((w) => gl.texParameteri(gl.TEXTURE_2D, gl[w], gl.CLAMP_TO_EDGE)); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im); };
    gl.uniform1i(U('img'), 0); gl.uniform1i(U('dep'), 1);
    let iw = 1, ih = 1, W = 0, H = 0, raf = 0, t0 = 0, vis = true, ready = 0, hov = 0, glowT = 0, glow = 0, zoomT = 1, zoom = 1;
    const s = { x: 0, y: 0, tx: 0, ty: 0 };
    const load = (src, unit) => new Promise((r) => { const im = new Image(); im.onload = () => { tex(unit, im); if (!unit) { iw = im.naturalWidth; ih = im.naturalHeight; } r(); }; im.src = src; });
    function size() { const r = host.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 1.5); W = r.width; H = r.height; cv.width = Math.max(2, Math.round(W * d)); cv.height = Math.max(2, Math.round(H * d)); gl.viewport(0, 0, cv.width, cv.height);
      // object-fit: cover with a focal point (o.fx, o.fy), plus 6 % bleed so the bend never shows an edge
      const ar = W / H, iar = iw / ih, bleed = 1.06; let sx = 1, sy = 1; if (ar > iar) sy = iar / ar; else sx = ar / iar; sx /= bleed; sy /= bleed;
      gl.uniform2f(U('sc'), sx, sy); gl.uniform2f(U('of'), (1 - sx) * (o.fx ?? 0.5), (1 - sy) * (o.fy ?? 0.5)); kick(); }
    function frame(now) { raf = 0; const dt = Math.min(1 / 30, t0 ? (now - t0) / 1000 : 1 / 60); t0 = now;
      if (!FINE && !RM && vis) { const t = now / 1000; s.tx = Math.sin(t * 0.35) * 0.55; s.ty = Math.sin(t * 0.23 + 1) * 0.35; }
      const a = RM ? 1 : 1 - Math.pow(1 - 0.055, dt * 60); s.x += (s.tx - s.x) * a; s.y += (s.ty - s.y) * a;
      glow += (glowT - glow) * (RM ? 1 : 1 - Math.pow(1 - 0.06, dt * 60)); zoom += (zoomT - zoom) * (RM ? 1 : 0.12);
      const k = o.strength ?? 0.03; gl.uniform2f(U('mv'), -s.x * k, -s.y * k * 0.7); gl.uniform1f(U('focus'), o.focus ?? 0.5); gl.uniform1f(U('glow'), glow); gl.uniform1f(U('zoom'), zoom);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); host.classList.add('live');
      const moving = Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) + Math.abs(glowT - glow) + Math.abs(zoomT - zoom) > 0.0015;
      if (vis && (moving || (!FINE && !RM))) raf = requestAnimationFrame(frame); }
    function kick() { if (ready === 2 && !raf) raf = requestAnimationFrame(frame); }
    const zone = o.zone || host;
    zone.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const r = zone.getBoundingClientRect(); s.tx = ((e.clientX - r.left) / r.width) * 2 - 1; s.ty = ((e.clientY - r.top) / r.height) * 2 - 1; if (o.warm) glowT = 0.9; kick(); });
    zone.addEventListener('pointerleave', () => { s.tx = s.ty = 0; glowT = o.warmRest || 0; kick(); });
    new IntersectionObserver((es) => es.forEach((e) => { vis = e.isIntersecting; if (vis) { t0 = 0; kick(); } })).observe(host);
    new ResizeObserver(size).observe(host);
    Promise.all([load(o.src, 0), load(o.depth, 1)]).then(() => { ready = 2; glow = glowT = o.warmRest || 0; size(); });
    return { set zoom(z) { zoomT = z; kick(); }, set glowTo(g) { glowT = g; kick(); }, poke(x, y) { s.tx = x; s.ty = y; kick(); } };
  }

  /* word-split helper for the big type versions (S1329: 20 px rise, .8 s, expo-out, 70 ms stagger; accessible label kept) */
  function split(el) { if (!el || el.dataset.split) return; const t = el.textContent; el.setAttribute('aria-label', t.trim()); el.textContent = '';
    t.split(/(\s+)/).forEach((w, i) => { if (!w.trim()) { el.append(w); return; } const s = document.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); const i2 = document.createElement('span'); i2.textContent = w; s.append(i2); el.append(s); });
    [...el.querySelectorAll('.w')].forEach((w, i) => w.style.setProperty('--i', i)); el.dataset.split = 1; requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in'))); }

  function wire() {
    const h = document.querySelector('.slot[data-slot=hero] .hero'); if (!h) return; const d = P();
    h.querySelectorAll('[data-split]').forEach((e) => { delete e.dataset.split; split(e); });
    if (h.matches('.h2v')) {   // V2: depth window on the lap house
      depthPhoto(h.querySelector('.hph'), { src: d.c2, depth: d.c2d, fx: 0.6, fy: 0.45, strength: 0.034, focus: 0.55, zone: h });
    }
    if (h.matches('.h3v')) {   // V3: pinned dusk portrait; scroll zooms out from the lit windows to the whole house, copy steps through three lines
      const dp = depthPhoto(h.querySelector('.hph'), { src: d.c1, depth: d.c1d, fx: 0.35, fy: 0.42, strength: 0.03, focus: 0.55, warm: true, warmRest: 0.25, zone: h });
      const steps = [...h.querySelectorAll('.step')]; let raf = 0;
      const upd = () => { raf = 0; const r = h.getBoundingClientRect(), tot = h.offsetHeight - innerHeight, p = innerWidth <= 860 ? 1 : Math.max(0, Math.min(1, -r.top / Math.max(1, tot)));
        if (dp) dp.zoom = 1.35 - 0.35 * p; const k = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999)); steps.forEach((s, i) => s.classList.toggle('on', i === k)); h.style.setProperty('--p', p.toFixed(3)); };
      addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd); upd();
    }
    if (h.matches('.h4v')) {   // V4: the headline set between the sky and the house; three layers, opposing parallax
      const st = h.querySelector('.layers'); const s = { x: 0, y: 0, tx: 0, ty: 0 }; let raf = 0, t0 = 0;
      const f = (now) => { raf = 0; const dt = Math.min(1 / 30, t0 ? (now - t0) / 1000 : 1 / 60); t0 = now; const a = RM ? 1 : 1 - Math.pow(1 - 0.055, dt * 60); s.x += (s.tx - s.x) * a; s.y += (s.ty - s.y) * a;
        st.style.setProperty('--x', s.x.toFixed(4)); st.style.setProperty('--y', s.y.toFixed(4)); if (Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.001) raf = requestAnimationFrame(f); else t0 = 0; };
      h.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const r = h.getBoundingClientRect(); s.tx = ((e.clientX - r.left) / r.width) * 2 - 1; s.ty = ((e.clientY - r.top) / r.height) * 2 - 1; if (!raf) raf = requestAnimationFrame(f); });
      h.addEventListener('pointerleave', () => { s.tx = s.ty = 0; if (!raf) raf = requestAnimationFrame(f); });
      h.classList.add('lit');
    }
    if (h.matches('.h5v')) {   // V5: the photo hung as lap courses, bottom course first; each course shifts by its own depth
      const box = h.querySelector('.courses'), cs = [...box.querySelectorAll('.c')], n = cs.length; const s = { x: 0, tx: 0 }; let raf = 0, t0 = 0;
      const lay = () => { const r = box.getBoundingClientRect(); cs.forEach((c, i) => { const im = c.querySelector('img'); im.style.width = r.width * 1.06 + 'px'; im.style.height = r.height + 'px'; im.style.top = -(i * r.height / n) + 'px'; }); };
      new ResizeObserver(lay).observe(box); lay();
      const f = (now) => { raf = 0; const dt = Math.min(1 / 30, t0 ? (now - t0) / 1000 : 1 / 60); t0 = now; const a = RM ? 1 : 1 - Math.pow(1 - 0.055, dt * 60); s.x += (s.tx - s.x) * a;
        cs.forEach((c, i) => c.style.setProperty('--dx', (s.x * (6 + (i / (n - 1)) * 26) * (i % 2 ? 1 : 0.86)).toFixed(2) + 'px')); if (Math.abs(s.tx - s.x) > 0.001) raf = requestAnimationFrame(f); else t0 = 0; };
      h.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const r = h.getBoundingClientRect(); s.tx = ((e.clientX - r.left) / r.width) * 2 - 1; if (!raf) raf = requestAnimationFrame(f); });
      h.addEventListener('pointerleave', () => { s.tx = 0; if (!raf) raf = requestAnimationFrame(f); });
      requestAnimationFrame(() => box.classList.add('hung')); setTimeout(() => box.classList.add('settled'), 1900);
    }
    if (h.matches('.h6v')) {   // V6: three houses as a deck of material cards; the deck tilts to the pointer, fans on hover, steps on click or arrows
      const deck = h.querySelector('.deck'), cards = [...deck.querySelectorAll('.card')], lab = h.querySelector('.now'); let order = cards.map((_, i) => i); const s = { x: 0, y: 0, tx: 0, ty: 0 }; let raf = 0, t0 = 0;
      const lay = () => { order.forEach((ci, k) => { const c = cards[ci]; c.style.setProperty('--k', k); c.classList.toggle('front', k === 0); c.setAttribute('aria-hidden', k !== 0); c.tabIndex = -1; }); lab.textContent = cards[order[0]].dataset.label; };
      const go = (d) => { order = d > 0 ? [...order.slice(1), order[0]] : [order[order.length - 1], ...order.slice(0, -1)]; lay(); };
      const f = (now) => { raf = 0; const dt = Math.min(1 / 30, t0 ? (now - t0) / 1000 : 1 / 60); t0 = now; const a = RM ? 1 : 1 - Math.pow(1 - 0.055, dt * 60); s.x += (s.tx - s.x) * a; s.y += (s.ty - s.y) * a;
        deck.style.setProperty('--rx', (-s.y * 7).toFixed(2) + 'deg'); deck.style.setProperty('--ry', (s.x * 10).toFixed(2) + 'deg'); if (Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.001) raf = requestAnimationFrame(f); else t0 = 0; };
      const zone = h.querySelector('.stage');
      zone.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const r = zone.getBoundingClientRect(); s.tx = ((e.clientX - r.left) / r.width) * 2 - 1; s.ty = ((e.clientY - r.top) / r.height) * 2 - 1; deck.classList.add('fan'); if (!raf) raf = requestAnimationFrame(f); });
      zone.addEventListener('pointerleave', () => { s.tx = s.ty = 0; deck.classList.remove('fan'); if (!raf) raf = requestAnimationFrame(f); });
      h.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => go(+b.dataset.go)));
      deck.addEventListener('click', () => go(1));
      h.querySelector('.stage').addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
      lay();
    }
  }
  return { wire, depthPhoto, split };
})();

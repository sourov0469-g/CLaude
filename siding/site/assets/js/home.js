/* Austin Pro homepage v2 (DIRECTION-HOME-V2.md). One live version per section; the others wait in <template>s.
   Motion rules from the Skill Pack: GSAP + ScrollTrigger, Lenis on desktop only, reduced motion = finished states
   (S0400/S0652), UI under 300 ms, reveals once (S1321), pins desktop only, every drag has a key/tap path (S0070). */
(() => {
  'use strict';
  const d = document, root = d.documentElement;
  const $ = (s, el = d) => el.querySelector(s);
  const $$ = (s, el = d) => Array.from(el.querySelectorAll(s));
  const G = window.gsap, ST = window.ScrollTrigger, FL = window.Flip;
  if (G) G.registerPlugin(...[ST, FL].filter(Boolean));
  const DATA = JSON.parse($('#home-data').textContent);
  const PINS = DATA.map.pins;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: picks still work for this visit */ } }
  };
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  const mqDesk = matchMedia('(min-width: 900px)');
  let userMotion = store.get('ap-motion');
  const motionOK = () => !!G && (userMotion ? userMotion === 'on' : !mqReduce.matches);
  const setMotionClass = () => root.classList.toggle('motion', motionOK());
  setMotionClass();

  const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const usd2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pmt = (P, apr, n) => apr === 0 ? P / n : P * (apr / 12) / (1 - Math.pow(1 + apr / 12, -n));
  const pv = (M, apr, n) => apr === 0 ? M * n : M * (1 - Math.pow(1 + apr / 12, -n)) / (apr / 12);
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ym = m => `${MONTHS[m % 100 - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const hdH = () => ($('.hd') || { offsetHeight: 0 }).offsetHeight;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const CREW_RX = /\b(Kevin(?: Harris)?|Garret{1,2}|Tracy|Paul Hale|Paul Schantz(?:'s)?|Taylor(?: Anderson)?|Jake|Jerry|Maria|Shorty)\b/g;
  const markNames = s => esc(s).replace(CREW_RX, '<mark>$1</mark>');
  const tradesOf = bits => DATA.map.sv.filter((_, i) => bits & (1 << i)).join(', ');
  const ease = { out: 'power3.out', x: 'expo.out', io: 'power4.inOut' };

  /* a bag of listeners, observers and timers, cleared when a version is switched out (S1315 leak rules) */
  function bag() {
    const fns = [];
    return {
      on(el, ev, fn, opt) { el.addEventListener(ev, fn, opt); fns.push(() => el.removeEventListener(ev, fn, opt)); },
      io(el, cb, opt) { const o = new IntersectionObserver(cb, opt); o.observe(el); fns.push(() => o.disconnect()); return o; },
      ro(el, cb) { if (!window.ResizeObserver) return; const o = new ResizeObserver(cb); o.observe(el); fns.push(() => o.disconnect()); },
      add(fn) { fns.push(fn); },
      clear() { while (fns.length) { try { fns.pop()(); } catch (e) { /* already gone */ } } }
    };
  }

  /* ---------- smooth scroll: Lenis, desktop pointer only, never under reduced motion (S0403, S1209) ---------- */
  let lenis = null;
  const lenisTick = t => lenis && lenis.raf(t * 1000);
  function lenisSync() {
    const want = motionOK() && mqFine.matches && mqDesk.matches && !!window.Lenis && !!ST;
    if (want && !lenis) {
      lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
      lenis.on('scroll', ST.update);
      G.ticker.add(lenisTick);
      G.ticker.lagSmoothing(0);
    } else if (!want && lenis) {
      G.ticker.remove(lenisTick);
      lenis.destroy();
      lenis = null;
    }
  }
  function jumpBy(dy) { if (!dy) return; if (lenis) lenis.scrollTo(window.scrollY + dy, { immediate: true, force: true }); else window.scrollBy(0, dy); }
  function goTo(el) {
    const y = el.getBoundingClientRect().top + window.scrollY - hdH();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: motionOK() ? 'smooth' : 'auto' });
  }

  /* ---------- words: masked rise for headings (S0451); accessible name kept on the heading ---------- */
  function splitWords(el) {
    if (el.dataset.splitDone) return $$('.w', el);
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    const walker = d.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const frag = d.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(p)); return; }
        const m = d.createElement('span'); m.className = 'wm'; m.setAttribute('aria-hidden', 'true');
        const w = d.createElement('span'); w.className = 'w'; w.textContent = p;
        m.appendChild(w); frag.appendChild(m);
      });
      n.replaceWith(frag);
    });
    el.dataset.splitDone = '1';
    return $$('.w', el);
  }
  function heads(rootEl, s) {
    $$('[data-split]', rootEl).forEach(el => {
      if (!motionOK()) { el.classList.add('is-split'); return; }
      const words = splitWords(el);
      el.classList.add('is-split');
      if (s.key === 'hero' && !s.switched) {
        G.from(words, { yPercent: 110, duration: 0.9, ease: ease.out, stagger: 0.05, delay: 0.12 });
      } else {
        G.from(words, { yPercent: 110, duration: 0.8, ease: ease.out, stagger: 0.035, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      }
    });
  }
  function riseIn(els, opts = {}) {
    if (!motionOK() || !els.length) return;
    G.from(els, Object.assign({ y: 16, autoAlpha: 0, duration: 0.6, ease: ease.out, stagger: 0.08 }, opts));
  }

  /* ---------- odometer: only changed digits roll, 260 ms (S0652) ---------- */
  function Odo(el) {
    let cur = '';
    const strip = c => `<span class="oc"><span class="os" style="transform:translateY(-${c * 10}%)">${'0123456789'.split('').map(n => `<span>${n}</span>`).join('')}</span></span>`;
    return text => {
      if (text === cur) return;
      if (text.length !== cur.length || !motionOK()) {
        el.innerHTML = [...text].map(c => /\d/.test(c) ? strip(c) : `<span class="ox">${esc(c)}</span>`).join('');
      } else {
        const slots = el.children;
        [...text].forEach((c, i) => {
          if (c === cur[i]) return;
          const slot = slots[i];
          if (/\d/.test(c) && slot && slot.classList.contains('oc')) slot.firstChild.style.transform = `translateY(-${c * 10}%)`;
          else if (slot) slot.outerHTML = /\d/.test(c) ? strip(c) : `<span class="ox">${esc(c)}</span>`;
        });
      }
      cur = text;
    };
  }

  /* ---------- rolling figures for the proof index: two turns of the drum, 1.1 s expo, columns 70 ms apart ---------- */
  function rollIn(el, delay) {
    const val = el.dataset.roll;
    if (!motionOK()) return;
    const drum = '01234567890123456789'.split('').map(n => `<span>${n}</span>`).join('');
    el.innerHTML = `<span aria-hidden="true" style="display:inline-flex">${[...val].map(c => /\d/.test(c) ? `<span class="rc"><span class="rs" data-to="${c}">${drum}</span></span>` : `<span class="rx">${esc(c)}</span>`).join('')}</span><span class="sr-only">${esc(val)}</span>`;
    const strips = $$('.rs', el);
    G.fromTo(strips, { yPercent: 0 }, { yPercent: i => -(10 + +strips[i].dataset.to) * 5, duration: 1.1, ease: ease.x, stagger: 0.07, delay, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  }

  /* ---------- the logo's 2x2 window: four panes open from the centre cross (house motif) ---------- */
  function panesOpen(panes, delay = 0) {
    if (!motionOK()) { panes.forEach(p => G && G.set(p, { scale: 0 })); return null; }
    G.set(panes, { scale: 1 });
    return G.to(panes, { scale: 0, duration: 1, ease: ease.io, stagger: { each: 0.06, from: 'center' }, delay });
  }

  /* ---------- drag helper: pointer capture, 10 px direction lock so vertical page scroll is never trapped (S1443) ---------- */
  function hdrag(el, b, { onMove, onStart, onEnd, handle }) {
    let sx = 0, sy = 0, id = null, live = false;
    b.on(el, 'pointerdown', e => {
      if (e.button > 0 || e.target.closest('button:not(.cmp-handle):not(.c3-handle), a')) return;
      sx = e.clientX; sy = e.clientY; id = e.pointerId; live = false;
      if ((handle && e.target.closest(handle)) || e.pointerType === 'mouse') { live = true; el.setPointerCapture(id); onStart && onStart(e); onMove(e); }
    });
    b.on(el, 'pointermove', e => {
      if (e.pointerId !== id) return;
      if (!live) {
        const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy);
        if (dx < 10 && dy < 10) return;
        if (dx > dy) { live = true; el.setPointerCapture(id); onStart && onStart(e); } else { id = null; return; }
      }
      onMove(e);
    });
    const end = e => { if (e.pointerId !== id) return; if (live) onEnd && onEnd(e); id = null; live = false; };
    b.on(el, 'pointerup', end); b.on(el, 'pointercancel', end); b.on(el, 'lostpointercapture', end);
  }
  function sliderKeys(handle, b, get, set) {
    b.on(handle, 'keydown', e => {
      const step = e.shiftKey ? 10 : 5;
      const map = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step };
      if (e.key in map) { e.preventDefault(); set(get() + map[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); set(0); }
      else if (e.key === 'End') { e.preventDefault(); set(100); }
    });
  }

  /* ---------- radio groups: one Tab stop, arrows move and select (S0070) ---------- */
  function radios(group, b, onPick, sel = '[role="radio"]') {
    const items = () => $$(sel, group).filter(x => !x.hidden && !x.closest('[hidden]'));
    const pick = (it, focus) => {
      items().forEach(x => { const on = x === it; x.setAttribute('aria-checked', on); x.tabIndex = on ? 0 : -1; });
      if (focus) it.focus();
      onPick(it);
    };
    const all = items();
    const cur = all.find(x => x.getAttribute('aria-checked') === 'true') || all[0];
    all.forEach(x => { x.tabIndex = x === cur ? 0 : -1; });
    b.on(group, 'click', e => { const it = e.target.closest(sel); if (it && group.contains(it)) pick(it); });
    b.on(group, 'keydown', e => {
      const list = items(); const i = list.indexOf(d.activeElement); if (i < 0) return;
      let n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = list[(i + 1) % list.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = list[(i - 1 + list.length) % list.length];
      else if (e.key === 'Home') n = list[0]; else if (e.key === 'End') n = list[list.length - 1];
      if (n) { e.preventDefault(); pick(n, true); }
    });
    return pick;
  }

  /* ========================================================================================
     VERSIONS
     ======================================================================================== */
  const V = {};

  /* HERO 1: full-bleed photo, auto wipe 15-85% (tastemaker recipe), pointer and drag take over, pause button (WCAG 2.2.2) */
  V.hero1 = (r, b) => {
    const fr = $('.h1-frame', r), range = $('.h1-range', fr), pause = $('.h1-pause', fr);
    const st = { v: 50 };
    const set = v => { st.v = clamp(v, 0, 100); fr.style.setProperty('--wipe', st.v + '%'); range.value = Math.round(st.v); };
    let auto = null, stopped = false;
    const stopAuto = () => { if (auto) auto.pause(); };
    if (!motionOK()) { pause.hidden = true; set(50); }
    else {
      set(100);
      G.from($$('img', fr), { scale: 1.06, duration: 1.6, ease: ease.x });
      riseIn($$('.lead, .ctas', r), { delay: 0.5 });
      auto = G.fromTo(st, { v: 15 }, { v: 85, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: 3, paused: true, onUpdate: () => set(st.v),
        onComplete: () => { G.to(st, { v: 50, duration: 1.2, ease: ease.io, onUpdate: () => set(st.v) }); pause.hidden = true; } });
      G.to(st, { v: 50, duration: 1.5, ease: ease.io, delay: 0.35, onUpdate: () => set(st.v), onComplete: () => { if (!stopped) auto.time(2).play(); } });
      b.io(fr, ([en]) => { if (!auto || stopped) return; if (en.isIntersecting) auto.resume(); else auto.pause(); }, { threshold: 0.05 });
    }
    const takeOver = () => { stopped = true; stopAuto(); G && G.killTweensOf(st); pause.setAttribute('aria-pressed', 'true'); };
    b.on(pause, 'click', () => {
      const on = pause.getAttribute('aria-pressed') !== 'true';
      pause.setAttribute('aria-pressed', on);
      pause.setAttribute('aria-label', on ? 'Play the before and after animation' : 'Pause the before and after animation');
      stopped = on; if (on) stopAuto(); else if (auto) auto.resume();
    });
    b.on(range, 'input', () => { takeOver(); set(+range.value); });
    const toX = e => { const rc = fr.getBoundingClientRect(); return (e.clientX - rc.left) / rc.width * 100; };
    if (mqFine.matches) {
      const q = G ? G.quickTo(st, 'v', { duration: 0.45, ease: 'power3', onUpdate: () => set(st.v) }) : v => set(v);
      b.on(fr, 'pointermove', e => { if (e.pointerType !== 'mouse') return; takeOver(); q(toX(e)); });
    }
    hdrag(fr, b, { onMove: e => { if (e.pointerType === 'mouse') return; takeOver(); set(toX(e)); } });
  };

  /* HERO 2: the logo window opens, then scroll grows it to full bleed (opening-window recipe, desktop only) */
  V.hero2 = (r, b) => {
    const stage = $('.h2-stage', r), layer = $('.h2-layer', r), box = $('.h2-box', r), copy = $('.h2-copy', r), cap = $('.h2-cap', r);
    const panes = $$('.pane', box), mull = $$('.mull', box);
    const desk = mqDesk.matches;
    if (!desk) { layer.appendChild(box); Object.assign(box.style, { inset: '0' }); }
    const inset = () => { const S = stage.getBoundingClientRect(), B = box.getBoundingClientRect(); return `inset(${B.top - S.top}px ${S.right - B.right}px ${S.bottom - B.bottom}px ${B.left - S.left}px)`; };
    if (desk && motionOK() && ST) r.classList.add('is-scene');
    if (desk) layer.style.clipPath = inset();
    if (!motionOK()) return;
    G.set(mull, { scale: 0 });
    const tl = G.timeline({ delay: 0.2 });
    tl.set(panes, { scale: 1 })
      .to(mull, { scale: 1, duration: 0.5, ease: 'power4.out', stagger: 0.08 })
      .to(panes, { scale: 0, duration: 1, ease: ease.io, stagger: { each: 0.06, from: 'center' } }, '-=0.1')
      .to(mull, { autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, '-=0.35')
      .from($('img', layer), { scale: 1.14, duration: 1.7, ease: ease.x }, 0.45);
    riseIn($$('.lead, .ctas', copy), { delay: 0.55 });
    if (desk && ST) {
      const scene = $('.h2-scene', r);
      G.timeline({ scrollTrigger: { trigger: scene, start: () => `top ${hdH()}`, end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } })
        .fromTo(layer, { clipPath: () => inset() }, { clipPath: 'inset(0px 0px 0px 0px)', ease: 'none', duration: 1 }, 0)
        .to(copy, { autoAlpha: 0, y: -60, ease: 'none', duration: 0.45 }, 0)
        .fromTo(cap, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.2 }, 0.8);
      b.ro(stage, () => ST.refresh());
    }
  };

  /* HERO 3: WebGL brush paints the after photo over the before; tap button for touch, keyboard and fallback */
  V.hero3 = (r, b) => {
    const fig = $('.h3-stage', r), cv = $('.h3-gl', fig), imgB = $('.h3-b', fig), imgA = $('.h3-a', fig), btn = $('.h3-toggle', fig);
    if (motionOK()) riseIn($$('.lead, .ctas', r), { delay: 0.5 });
    let gl = null, after = false;
    const label = () => { btn.textContent = after ? 'Show the old siding' : 'Show the new siding'; btn.setAttribute('aria-pressed', after); };
    b.on(btn, 'click', () => {
      after = !after; label();
      if (gl) gl.show(after);
      else fig.classList.toggle('is-after', after);
    });
    if (!motionOK()) return;
    const start = () => { if (gl || !imgA.complete || !imgB.complete) return; gl = paintGL(fig, cv, imgB, imgA, b); if (gl) { fig.classList.add('gl-on'); gl.demo(); } };
    b.io(fig, ([en]) => { if (en.isIntersecting) { if (imgA.complete && imgB.complete) start(); else { imgA.decode().then(start, () => {}); imgB.decode().then(start, () => {}); } } }, { rootMargin: '200px' });
  };

  function paintGL(fig, cv, imgB, imgA, b) {
    let g;
    try { g = cv.getContext('webgl', { premultipliedAlpha: false, antialias: false, failIfMajorPerformanceCaveat: true }); } catch (e) { g = null; }
    if (!g) return null;
    const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
    const FS_BRUSH = 'precision mediump float;varying vec2 v;uniform vec2 uPos;uniform float uR,uAsp,uK;void main(){vec2 q=v-uPos;q.x*=uAsp;float a=smoothstep(uR,uR*.3,length(q))*uK;gl_FragColor=vec4(a);}';
    const FS = `precision mediump float;varying vec2 v;uniform sampler2D uB,uA,uP;uniform vec4 uC;uniform float uProg;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
      void main(){vec2 uv=vec2(v.x,1.-v.y);vec2 t=uv*uC.xy+uC.zw;
        float nn=n(uv*vec2(9.,6.))*.6+n(uv*vec2(24.,16.))*.4;
        float m=texture2D(uP,v).r+uProg*1.5;
        float k=smoothstep(.42,.62,m+(nn-.5)*.4);float e=k*(1.-k)*4.;vec2 o=vec2(nn-.5)*.014*e;
        vec3 cb=texture2D(uB,t+o).rgb,ca=texture2D(uA,t-o).rgb;
        gl_FragColor=vec4(clamp(mix(cb,ca,k)+e*.05,0.,1.),1.);}`;
    const sh = (type, src) => { const s = g.createShader(type); g.shaderSource(s, src); g.compileShader(s); if (!g.getShaderParameter(s, g.COMPILE_STATUS)) { console.warn(g.getShaderInfoLog(s)); return null; } return s; };
    const prog = (fs) => { const p = g.createProgram(); const a = sh(g.VERTEX_SHADER, VS), c = sh(g.FRAGMENT_SHADER, fs); if (!a || !c) return null; g.attachShader(p, a); g.attachShader(p, c); g.bindAttribLocation(p, 0, 'p'); g.linkProgram(p); return g.getProgramParameter(p, g.LINK_STATUS) ? p : null; };
    const P1 = prog(FS_BRUSH), P2 = prog(FS);
    if (!P1 || !P2) return null;
    const buf = g.createBuffer(); g.bindBuffer(g.ARRAY_BUFFER, buf); g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), g.STATIC_DRAW);
    g.enableVertexAttribArray(0); g.vertexAttribPointer(0, 2, g.FLOAT, false, 0, 0);
    const tex = (src) => { const t = g.createTexture(); g.bindTexture(g.TEXTURE_2D, t); [g.TEXTURE_WRAP_S, g.TEXTURE_WRAP_T].forEach(k => g.texParameteri(g.TEXTURE_2D, k, g.CLAMP_TO_EDGE)); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR); if (src) g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, src); return t; };
    let tB, tA;
    try { tB = tex(imgB); tA = tex(imgA); } catch (e) { return null; }
    const PW = 512, PH = 320;
    const tP = tex(null); g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, PW, PH, 0, g.RGBA, g.UNSIGNED_BYTE, null);
    const fb = g.createFramebuffer(); g.bindFramebuffer(g.FRAMEBUFFER, fb); g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, tP, 0);
    const clearPaint = () => { g.bindFramebuffer(g.FRAMEBUFFER, fb); g.viewport(0, 0, PW, PH); g.clearColor(0, 0, 0, 0); g.clear(g.COLOR_BUFFER_BIT); };
    clearPaint();
    const U = (p, n) => g.getUniformLocation(p, n);
    const st = { prog: 0 };
    let W = 1, H = 1, frame = 0, lost = false;
    const size = () => { const rc = fig.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 1.5); W = Math.max(1, Math.round(rc.width * dpr)); H = Math.max(1, Math.round(rc.height * dpr)); cv.width = W; cv.height = H; draw(); };
    function draw() {
      frame = 0; if (lost) return;
      g.bindFramebuffer(g.FRAMEBUFFER, null); g.viewport(0, 0, W, H); g.disable(g.BLEND); g.useProgram(P2);
      const ca = W / H, ia = 1280 / 800;
      const c = ca > ia ? [1, ia / ca, 0, (1 - ia / ca) / 2] : [ca / ia, 1, (1 - ca / ia) / 2, 0];
      g.uniform4f(U(P2, 'uC'), c[0], c[1], c[2], c[3]); g.uniform1f(U(P2, 'uProg'), st.prog);
      [[tB, 'uB'], [tA, 'uA'], [tP, 'uP']].forEach(([t, n], i) => { g.activeTexture(g.TEXTURE0 + i); g.bindTexture(g.TEXTURE_2D, t); g.uniform1i(U(P2, n), i); });
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
    }
    const ask = () => { if (!frame) frame = requestAnimationFrame(draw); };
    function stamp(x, y, k = 1) {
      g.bindFramebuffer(g.FRAMEBUFFER, fb); g.viewport(0, 0, PW, PH); g.useProgram(P1);
      g.enable(g.BLEND); g.blendFunc(g.ONE, g.ONE);
      g.uniform2f(U(P1, 'uPos'), x, 1 - y); g.uniform1f(U(P1, 'uR'), 0.11); g.uniform1f(U(P1, 'uAsp'), W / H); g.uniform1f(U(P1, 'uK'), 0.45 * k);
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4); g.disable(g.BLEND);
    }
    let last = null;
    function strokeTo(x, y) {
      if (!last) { stamp(x, y); last = [x, y]; ask(); return; }
      const dx = x - last[0], dy = y - last[1], dist = Math.hypot(dx * W / H, dy), steps = Math.min(24, Math.ceil(dist / 0.025));
      for (let i = 1; i <= steps; i++) stamp(last[0] + dx * i / steps, last[1] + dy * i / steps);
      last = [x, y]; ask();
    }
    const pos = e => { const rc = fig.getBoundingClientRect(); return [(e.clientX - rc.left) / rc.width, (e.clientY - rc.top) / rc.height]; };
    let demoTl = null;
    const stopDemo = () => { if (demoTl) { demoTl.kill(); demoTl = null; } };
    if (mqFine.matches) {
      b.on(fig, 'pointermove', e => { if (e.pointerType !== 'mouse') return; stopDemo(); const [x, y] = pos(e); strokeTo(x, y); });
      b.on(fig, 'pointerleave', () => { last = null; });
    }
    hdrag(fig, b, { onMove: e => { if (e.pointerType === 'mouse') return; stopDemo(); const [x, y] = pos(e); strokeTo(x, y); }, onEnd: () => { last = null; } });
    b.on(cv, 'webglcontextlost', e => { e.preventDefault(); lost = true; fig.classList.remove('gl-on'); });
    b.ro(fig, size);
    size();
    b.add(() => { if (frame) cancelAnimationFrame(frame); stopDemo(); G.killTweensOf(st); [tB, tA, tP].forEach(t => g.deleteTexture(t)); g.deleteFramebuffer(fb); g.deleteBuffer(buf); g.deleteProgram(P1); g.deleteProgram(P2); const ext = g.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); });
    return {
      show(on) {
        stopDemo(); G.killTweensOf(st);
        G.to(st, { prog: on ? 1 : 0, duration: 1.2, ease: 'power2.inOut', onUpdate: ask, onComplete: () => { if (!on) { clearPaint(); ask(); } } });
      },
      demo() {
        const p = { t: 0 };
        last = null;
        demoTl = G.to(p, { t: 1, duration: 1.6, delay: 0.6, ease: 'power2.inOut', onUpdate: () => { const x = 0.18 + p.t * 0.55, y = 0.55 + Math.sin(p.t * Math.PI * 2) * 0.12; strokeTo(x, y); }, onComplete: () => { last = null; demoTl = null; } });
      }
    };
  }

  /* PROOF */
  V.proof1 = r => { $$('.roll', r).forEach((el, k) => rollIn(el, k * 0.08)); };
  V.proof2 = r => {
    const tiles = $$('.wt', r).filter(t => t.offsetParent !== null);
    if (motionOK()) G.from(tiles, { autoAlpha: 0, scale: 0.9, duration: 0.7, ease: ease.out, stagger: { each: 0.014, from: 'center', grid: 'auto' }, scrollTrigger: { trigger: r, start: 'top 75%', once: true } });
  };
  V.proof3 = r => {
    const p = $('.statement', r);
    if (!motionOK()) return;
    const walker = d.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => { const f = d.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(t => { if (!t) return; if (/^\s+$/.test(t)) f.appendChild(d.createTextNode(t)); else { const s = d.createElement('span'); s.className = 't'; s.textContent = t; f.appendChild(s); } }); n.replaceWith(f); });
    const bits = $$('.t, .ipill', p);
    G.fromTo(bits, { opacity: 0.18 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 50%', scrub: 0.4 } });
  };

  /* SERVICES */
  V.services1 = (r, b) => {
    const list = $('.ix', r), rows = $$('.ix-row', r);
    if (motionOK()) G.from(rows, { yPercent: 40, autoAlpha: 0, duration: 0.7, ease: ease.out, stagger: 0.04, scrollTrigger: { trigger: list, start: 'top 85%', once: true } });
    if (!(mqFine.matches && mqDesk.matches) || !G) return;
    const peek = $('.ix-peek', r), pim = $('img', peek);
    const qx = G.quickTo(peek, 'x', { duration: 0.45, ease: 'power3' }), qy = G.quickTo(peek, 'y', { duration: 0.45, ease: 'power3' });
    let src = '';
    b.on(list, 'pointermove', e => { const rc = r.getBoundingClientRect(); qx(e.clientX - rc.left + 28); qy(e.clientY - rc.top - peek.offsetHeight * 0.5); });
    rows.forEach(row => b.on(row, 'pointerenter', () => {
      const s = row.dataset.img;
      if (!s) { G.to(peek, { autoAlpha: 0, duration: 0.2 }); return; }
      if (s !== src) { pim.src = s; src = s; }
      G.to(peek, { autoAlpha: 1, scale: 1, duration: 0.3, ease: ease.out });
    }));
    b.on(list, 'pointerleave', () => G.to(peek, { autoAlpha: 0, scale: 0.96, duration: 0.2 }));
  };

  V.services2 = (r, b) => {
    const wrap = $('.slices', r), items = $$('.sl', r);
    let on = 0, timer = 0;
    const clip = () => mqDesk.matches && !!G;
    function lay(anim) {
      items.forEach((it, k) => { it.classList.toggle('is-on', k === on); $('.sl-btn', it).setAttribute('aria-expanded', k === on); });
      if (!clip()) { wrap.classList.remove('is-clip'); items.forEach(it => G && G.set([it, $('.sl-img', it), $('.sl-btn', it), $('.sl-body', it)], { clearProps: 'clipPath,x' })); return; }
      wrap.classList.add('is-clip');
      const W = wrap.clientWidth, gap = 4, n = items.length, wOn = W * 0.52, wOff = (W - wOn - gap * (n - 1)) / (n - 1);
      let x = 0;
      items.forEach((it, k) => {
        const w = k === on ? wOn : wOff, L = x, R = W - x - w, cx = L + w / 2 - W / 2;
        const parts = [[it, { clipPath: `inset(0px ${R}px 0px ${L}px)` }], [$('.sl-img', it), { x: cx }], [$('.sl-btn', it), { x: L }], [$('.sl-body', it), { x: L }]];
        parts.forEach(([el, v]) => (anim && motionOK()) ? G.to(el, Object.assign({ duration: 0.7, ease: ease.io, overwrite: 'auto' }, v)) : G.set(el, v));
        x += w + gap;
      });
    }
    const pick = (k, anim = true) => { if (k === on && clip()) return; on = k; lay(anim); };
    items.forEach((it, k) => {
      const btn = $('.sl-btn', it);
      b.on(btn, 'click', () => pick(k));
      b.on(btn, 'focus', () => { if (clip()) pick(k); });
      if (mqFine.matches) {
        b.on(it, 'pointerenter', () => { clearTimeout(timer); timer = setTimeout(() => clip() && pick(k), 80); });
        b.on(it, 'pointerleave', () => clearTimeout(timer));
      }
    });
    b.add(() => clearTimeout(timer));
    lay(false);
    b.ro(wrap, () => lay(false));
    if (motionOK() && clip()) G.from(items, { autoAlpha: 0, duration: 0.8, ease: ease.out, stagger: 0.07, scrollTrigger: { trigger: wrap, start: 'top 80%', once: true } });
  };

  V.services3 = (r, b) => {
    const inp = $('#bud-in', r), out = $('.bud-out', r), say = $('.bud-say', r), cards = $$('.bc', r);
    const upd = () => {
      const v = +inp.value, f = usd.format(v);
      out.textContent = f; inp.setAttribute('aria-valuetext', f);
      let n = 0;
      cards.forEach(c => { const inr = v >= +c.dataset.lo * 1000 && v <= +c.dataset.hi * 1000; c.classList.toggle('is-out', !inr); if (inr) n++; });
      say.innerHTML = n === 1 ? `<b>1</b> of ${cards.length} trades usually lands around this budget.` : `<b>${n}</b> of ${cards.length} trades usually land around this budget.`;
    };
    b.on(inp, 'input', upd); upd();
  };

  /* WORK */
  V.work1 = (r, b) => {
    const fig = $('.cmp', r), A = $('.cmp-a', fig), B = $('.cmp-b', fig), h = $('.cmp-handle', fig), info = $('.cmp-info', r);
    const P = JSON.parse($('.pairs-data', r).textContent);
    const panes = $$('.pane', fig);
    const st = { v: 50 };
    const set = v => { st.v = clamp(v, 0, 100); fig.style.setProperty('--split', st.v + '%'); h.setAttribute('aria-valuenow', Math.round(st.v)); h.setAttribute('aria-valuetext', `${Math.round(st.v)}% of the before photo showing`); };
    const toX = e => { const rc = fig.getBoundingClientRect(); return (e.clientX - rc.left) / rc.width * 100; };
    hdrag(fig, b, { handle: '.cmp-handle', onStart: () => G && G.killTweensOf(st), onMove: e => set(toX(e)) });
    sliderKeys(h, b, () => st.v, set);
    if (motionOK()) { set(100); G.to(st, { v: 50, duration: 1.3, ease: ease.io, onUpdate: () => set(st.v), scrollTrigger: { trigger: fig, start: 'top 70%', once: true } }); }
    let cur = 0, busy = false;
    const fill = p => {
      A.src = `assets/img/h/work-${p.id}-a-1000.webp`; A.alt = p.aa; B.src = `assets/img/h/work-${p.id}-b-1000.webp`; B.alt = p.ab;
      $('.cmp-price', info).textContent = p.band;
      $('.cmp-what', info).innerHTML = `<b>${esc(p.bl)}, ${esc(p.place)}</b><span>${esc(p.what)}, ${esc(p.when)}. <a class="tlink" href="${esc(p.href)}" target="_blank" rel="noopener">Job file</a></span>`;
      if (window.__apAsset) window.__apAsset(fig);
    };
    $$('.fs', r).forEach(btn => b.on(btn, 'click', () => {
      const k = +btn.dataset.i; if (k === cur || busy) return;
      $$('.fs', r).forEach(x => x.setAttribute('aria-pressed', x === btn)); cur = k;
      if (!motionOK()) { fill(P[k]); set(50); return; }
      busy = true;
      G.timeline({ onComplete: () => { busy = false; } })
        .to(panes, { scale: 1, duration: 0.42, ease: 'power4.in', stagger: 0.04 })
        .add(() => { fill(P[k]); set(50); return null; })
        .add(() => Promise.all([A, B].map(i => i.decode ? i.decode().catch(() => {}) : 0)))
        .to(panes, { scale: 0, duration: 0.6, ease: 'power4.out', stagger: 0.04 }, '+=0.12');
    }));
  };

  V.work2 = (r, b) => {
    const items = $$('.sc', r), count = $('.sc-count span', r);
    const pin = motionOK() && mqDesk.matches && window.innerHeight >= 620 && !!ST;
    const toggleOf = it => $('.sc-toggle', it);
    const setAfter = (it, on) => { it.classList.toggle('is-after', on); const t = toggleOf(it); t.setAttribute('aria-pressed', on); t.textContent = on ? 'Show before' : 'Show after'; };
    if (!pin) {
      items.forEach(it => {
        b.on(toggleOf(it), 'click', () => setAfter(it, !it.classList.contains('is-after')));
        if (motionOK() && ST) ST.create({ trigger: it, start: 'top 55%', once: true, onEnter: () => setAfter(it, true) });
      });
      return;
    }
    r.classList.add('is-pin');
    const wrap = $('.sc-wrap', r);
    G.set(items.slice(1), { yPercent: 104 });
    const tl = G.timeline({ scrollTrigger: { trigger: wrap, start: () => `top ${hdH()}`, end: () => '+=' + window.innerHeight * 2.6, pin: wrap, scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: self => { count.textContent = Math.min(items.length, 1 + Math.floor(self.progress * items.length * 0.999)); } } });
    items.forEach((it, k) => {
      tl.fromTo($('.sc-b', it), { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 100%)', ease: 'none', duration: 1 });
      if (k < items.length - 1) tl.to(items[k + 1], { yPercent: 0, ease: 'none', duration: 0.55 }, '+=0.15');
    });
  };

  V.work3 = (r, b) => {
    $$('.sp-fig', r).forEach(fig => {
      const btn = $('.sp-toggle', fig);
      b.on(btn, 'click', () => { const on = fig.classList.toggle('is-before'); btn.setAttribute('aria-pressed', on); btn.textContent = on ? 'Show after' : 'Show before'; });
      if (!mqFine.matches) return;
      let tx = 0, ty = 0, x = 0, y = 0, tr = 0, rr = 0, raf = 0;
      const R = () => Math.min(260, Math.max(140, fig.clientWidth * 0.22));
      const loop = () => {
        const k1 = motionOK() ? 0.1 : 1, k2 = motionOK() ? 0.14 : 1;
        x += (tx - x) * k1; y += (ty - y) * k1; rr += (tr - rr) * k2;
        fig.style.setProperty('--x', x.toFixed(1) + 'px'); fig.style.setProperty('--y', y.toFixed(1) + 'px'); fig.style.setProperty('--r', rr.toFixed(1) + 'px');
        raf = (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 || Math.abs(tr - rr) > 0.1) ? requestAnimationFrame(loop) : 0;
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
      const move = e => { const rc = fig.getBoundingClientRect(); tx = e.clientX - rc.left; ty = e.clientY - rc.top; if (rr < 0.5) { x = tx; y = ty; } tr = R(); kick(); };
      b.on(fig, 'pointerenter', move); b.on(fig, 'pointermove', move);
      ['pointerleave', 'pointercancel'].forEach(ev => b.on(fig, ev, () => { tr = 0; kick(); }));
      b.on(window, 'blur', () => { tr = 0; kick(); });
      b.add(() => cancelAnimationFrame(raf));
    });
    if (motionOK()) G.from($$('.sp', r), { y: 40, autoAlpha: 0, duration: 0.8, ease: ease.out, stagger: 0.08, scrollTrigger: { trigger: $('.spots', r), start: 'top 80%', once: true } });
  };

  /* COLOUR: one studio engine over the photo-traced masks (S0006: masks from the photo, never polygons) */
  function Studio(frame) {
    const zones = Object.fromEntries($$('.zone', frame).map(z => [z.dataset.zone, z]));
    const state = {};
    function paint(zone, hex, how = {}) {
      const z = zones[zone]; if (!z) return;
      const p0 = $('.p0', z), p1 = $('.p1', z);
      state[zone] = hex;
      const anim = motionOK() && G;
      const shape0 = how.x != null ? `circle(0% at ${how.x}px ${how.y}px)` : 'inset(0% 100% 0% 0%)';
      const shape1 = how.x != null ? `circle(150% at ${how.x}px ${how.y}px)` : 'inset(0% 0% 0% 0%)';
      if (!z.classList.contains('is-painted')) {
        p0.style.setProperty('--c', hex); z.classList.add('is-painted');
        if (anim) { G.killTweensOf(z); G.fromTo(z, { clipPath: shape0 }, { clipPath: shape1, duration: 0.7, ease: ease.io, onComplete: () => G.set(z, { clearProps: 'clipPath' }) }); }
        return;
      }
      if (!anim) { p0.style.setProperty('--c', hex); return; }
      G.killTweensOf(p1);
      p1.style.setProperty('--c', hex);
      G.fromTo(p1, { clipPath: shape0 }, { clipPath: shape1, duration: 0.6, ease: ease.io, onComplete: () => { p0.style.setProperty('--c', hex); G.set(p1, { clipPath: 'inset(0% 100% 0% 0%)' }); } });
    }
    function reset() { Object.values(zones).forEach(z => { z.classList.remove('is-painted'); if (G) G.set(z, { clearProps: 'clipPath' }); }); Object.keys(state).forEach(k => delete state[k]); }
    return { paint, reset, state, zones };
  }
  /* which painted zone lies under a point: alpha of the traced masks, trim over gable over siding */
  function zoneSampler(frame) {
    const masks = {};
    $$('.zone', frame).forEach(z => {
      const url = getComputedStyle(z).maskImage || getComputedStyle(z).webkitMaskImage || '';
      const m = url.match(/url\(["']?(.*?)["']?\)/); if (!m) return;
      const im = new Image(); im.src = m[1];
      masks[z.dataset.zone] = { im, cx: null };
    });
    return (x, y) => {
      const rc = frame.getBoundingClientRect();
      const u = (x - rc.left) / rc.width, v = (y - rc.top) / rc.height;
      if (u < 0 || v < 0 || u > 1 || v > 1) return null;
      for (const z of ['trim', 'gable', 'body']) {
        const M = masks[z]; if (!M || !M.im.complete || !M.im.naturalWidth) continue;
        if (!M.cx) { const c = d.createElement('canvas'); c.width = M.im.naturalWidth; c.height = M.im.naturalHeight; const cx = c.getContext('2d', { willReadFrequently: true }); cx.drawImage(M.im, 0, 0); M.cx = cx; }
        const px = M.cx.getImageData(Math.floor(u * (M.im.naturalWidth - 1)), Math.floor(v * (M.im.naturalHeight - 1)), 1, 1).data;
        if (px[3] > 110) return z;
      }
      return null;
    };
  }
  const ZNAME = { body: 'siding', gable: 'gable', trim: 'trim' };

  V.colour1 = (r, b) => {
    const frame = $('.st-frame', r), S = Studio(frame), now = $('.c1-now', r);
    let part = 'body';
    radios($('.seg:not(.seg-set)', r), b, it => { part = it.dataset.part; });
    const docks = $$('.dock', r);
    radios($('.seg-set', r), b, it => { docks.forEach(dk => { dk.hidden = dk.dataset.setList !== it.dataset.set; }); });
    docks.forEach(dk => {
      radios(dk, b, it => { S.paint(part, it.dataset.hex); now.innerHTML = `<b>${esc(it.dataset.name)}</b> <span>${esc(it.dataset.code)} on the ${ZNAME[part]}</span>`; });
      if (mqFine.matches && motionOK()) {
        const sws = $$('.sw', dk);
        b.on(dk, 'pointermove', e => sws.forEach(s => { const rc = s.getBoundingClientRect(); const dist = Math.abs(e.clientX - (rc.left + rc.width / 2)); G.to(s, { scale: 1 + 0.28 * Math.max(0, 1 - dist / 110), duration: 0.18, ease: ease.out, overwrite: 'auto' }); }));
        b.on(dk, 'pointerleave', () => G.to(sws, { scale: 1, duration: 0.24, ease: ease.out }));
      }
    });
    if (motionOK()) G.from(frame, { clipPath: 'inset(8% 6% 8% 6%)', duration: 1.1, ease: ease.io, scrollTrigger: { trigger: frame, start: 'top 80%', once: true } });
  };

  V.colour2 = (r, b) => {
    const frame = $('.st-frame', r), S = Studio(frame), house = $('.c2-house', r), how = $('.c2-how', r), zb = $$('[data-zone-btn]', r);
    const at = zoneSampler(frame);
    let sel = null;
    const select = chip => {
      $$('.chip-paint', r).forEach(c => c.setAttribute('aria-pressed', c === chip));
      sel = chip; zb.forEach(x => { x.disabled = !chip; });
      how.textContent = chip ? `${chip.dataset.name} picked. Tap the siding, gable or trim, or use the buttons under the photo.` : 'Drag a chip onto the siding, gable or trim. Or tap a chip, then tap the house.';
    };
    zb.forEach(x => { x.disabled = true; b.on(x, 'click', () => { if (sel) { S.paint(x.dataset.zoneBtn, sel.dataset.hex); how.textContent = `${sel.dataset.name} on the ${ZNAME[x.dataset.zoneBtn]}.`; } }); });
    const drop = (chip, x, y) => {
      const z = at(x, y);
      if (!z) { how.textContent = 'That spot is not siding, gable or trim. Try the wall.'; return false; }
      const rc = frame.getBoundingClientRect();
      S.paint(z, chip.dataset.hex, { x: x - rc.left, y: y - rc.top });
      how.textContent = `${chip.dataset.name} on the ${ZNAME[z]}.`;
      return true;
    };
    b.on(frame, 'click', e => { if (sel) drop(sel, e.clientX, e.clientY); });
    $$('.chip-paint', r).forEach(chip => {
      let ghost = null, sx = 0, sy = 0, dragging = false, pid = null;
      b.on(chip, 'pointerdown', e => { if (e.button > 0) return; sx = e.clientX; sy = e.clientY; pid = e.pointerId; dragging = false; chip.setPointerCapture(pid); });
      b.on(chip, 'pointermove', e => {
        if (e.pointerId !== pid) return;
        if (!dragging && Math.hypot(e.clientX - sx, e.clientY - sy) > 6) {
          dragging = true; ghost = d.createElement('span'); ghost.className = 'c2-ghost'; ghost.style.background = chip.dataset.hex; d.body.appendChild(ghost);
          if (motionOK()) G.from(ghost, { scale: 0.6, duration: 0.2, ease: ease.out });
        }
        if (dragging) {
          ghost.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          house.classList.toggle('is-over', !!at(e.clientX, e.clientY));
        }
      });
      const end = e => {
        if (e.pointerId !== pid) return;
        pid = null; house.classList.remove('is-over');
        if (dragging) {
          const ok = e.type === 'pointerup' && drop(chip, e.clientX, e.clientY);
          const g = ghost; ghost = null;
          if (motionOK() && g) G.to(g, { scale: ok ? 1.6 : 0.4, autoAlpha: 0, duration: 0.3, ease: ease.out, onComplete: () => g.remove() }); else if (g) g.remove();
          chip.dataset.dragged = '1'; setTimeout(() => { delete chip.dataset.dragged; }, 50);
        }
        dragging = false;
      };
      b.on(chip, 'pointerup', end); b.on(chip, 'pointercancel', end);
      b.on(chip, 'click', () => { if (chip.dataset.dragged) return; select(sel === chip ? null : chip); });
      b.add(() => { if (ghost) ghost.remove(); });
    });
    b.on($('.c2-reset', r), 'click', () => { S.reset(); select(null); });
  };

  V.colour3 = (r, b) => {
    const frame = $('.st-frame', r), S = Studio(frame), h = $('.c3-handle', frame), out = $('.c3-now', r), ghost = $('.ghost', frame);
    const st = { v: 50 };
    const set = v => { st.v = clamp(v, 0, 100); frame.style.setProperty('--split', st.v + '%'); h.setAttribute('aria-valuenow', Math.round(st.v)); };
    const toX = e => { const rc = frame.getBoundingClientRect(); return (e.clientX - rc.left) / rc.width * 100; };
    let demo = null;
    const stopDemo = () => { if (demo) { demo.kill(); demo = null; G.set(ghost, { autoAlpha: 0 }); } };
    hdrag(frame, b, { handle: '.c3-handle', onStart: stopDemo, onMove: e => set(toX(e)) });
    sliderKeys(h, b, () => st.v, v => { stopDemo(); set(v); });
    const row = $('.c3-row', r);
    const pick = radios(row, b, it => { S.paint('body', it.dataset.hex); S.paint('gable', it.dataset.hex); out.textContent = `Yours: ${it.dataset.name}, ${it.dataset.code}. Left of the line is the real job.`; });
    const sws = $$('.sw', row);
    pick(sws[11]);
    ['pointerdown', 'keydown', 'wheel'].forEach(ev => b.on(r, ev, stopDemo, { passive: true }));
    if (!motionOK()) return;
    b.io(frame, ([en], o) => {
      if (!en.isIntersecting || demo) return; o.disconnect();
      const W = () => frame.clientWidth, H = () => frame.clientHeight;
      demo = G.timeline({ delay: 0.4, onComplete: () => { demo = null; } })
        .set(ghost, { x: () => W() * 0.5 + 40, y: () => H() * 0.5 + 60, autoAlpha: 0 })
        .to(ghost, { autoAlpha: 1, duration: 0.25 })
        .to(ghost, { x: () => W() * 0.5 + 6, y: () => H() * 0.5 + 6, duration: 0.6, ease: ease.out })
        .to(st, { v: 26, duration: 0.9, ease: ease.io, onUpdate: () => set(st.v) })
        .to(ghost, { x: () => W() * 0.26 + 6, duration: 0.9, ease: ease.io }, '<')
        .add(() => pick(sws[10]))
        .to(st, { v: 62, duration: 1, ease: ease.io, onUpdate: () => set(st.v) }, '+=0.5')
        .to(ghost, { x: () => W() * 0.62 + 6, duration: 1, ease: ease.io }, '<')
        .add(() => pick(sws[4]))
        .to(ghost, { autoAlpha: 0, duration: 0.3 }, '+=0.5');
    }, { threshold: 0.6 });
  };

  /* NEAR YOU: shared map + finder */
  function MapView(svg) {
    const pins = $$('.m-pins circle', svg), ring = $('.m-ring', svg);
    return {
      pins,
      hot(set) { pins.forEach((c, i) => { const h = set.has(i); c.classList.toggle('hot', h); c.classList.toggle('dim', set.size > 0 && !h); }); },
      ring(x, y, rad) { if (x < 0 || y < 0 || x > 566 || y > 640) { ring.classList.remove('on'); return; } ring.setAttribute('cx', x); ring.setAttribute('cy', y); ring.setAttribute('r', Math.max(10, rad)); ring.classList.add('on'); },
      clear() { pins.forEach(c => c.classList.remove('hot', 'dim')); ring.classList.remove('on'); }
    };
  }
  const placeOf = i => DATA.map.names[PINS[i][4]];
  function Finder(box, M, n, b) {
    const inp = $('input', box), list = $('.fd-list', box), out = $('.fd-out', box), clr = $('.fd-clear', box);
    const places = DATA.map.places;
    let opts = [], act = -1;
    const close = () => { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); act = -1; };
    const render = () => {
      const q = inp.value.trim().toLowerCase();
      clr.hidden = !q;
      if (q.length < 2) { close(); return; }
      opts = places.filter(p => p[0].toLowerCase().includes(q)).sort((a, z) => (a[0].toLowerCase().startsWith(q) ? 0 : 1) - (z[0].toLowerCase().startsWith(q) ? 0 : 1) || a[0].length - z[0].length).slice(0, 6);
      if (!opts.length) { close(); out.innerHTML = `<p>No place called “${esc(inp.value.trim())}” in the project file.</p><p class="fine">Try a town, like Round Rock, Cedar Park or Georgetown.</p>`; return; }
      list.innerHTML = opts.map((p, i) => { const k = p[0].toLowerCase().indexOf(q); return `<li role="option" id="${inp.id}-o${i}" aria-selected="false">${esc(p[0].slice(0, k))}<mark>${esc(p[0].slice(k, k + q.length))}</mark>${esc(p[0].slice(k + q.length))}</li>`; }).join('');
      list.hidden = false; inp.setAttribute('aria-expanded', 'true'); act = -1;
    };
    const mark = i => { $$('li', list).forEach((li, k) => li.setAttribute('aria-selected', k === i)); act = i; if (i >= 0) inp.setAttribute('aria-activedescendant', `${inp.id}-o${i}`); };
    function pick(p) {
      inp.value = p[0]; close(); clr.hidden = false;
      const [, x, y] = p;
      const near = PINS.map((q, i) => [Math.hypot(q[0] - x, q[1] - y), i]).sort((a, z) => a[0] - z[0]).slice(0, n);
      const ppm = DATA.map.ppm;
      out.innerHTML = `<p>Nearest documented jobs to ${esc(p[0])}</p><ol>${near.map(([dd, i]) => `<li><span><b>${esc(placeOf(i))}</b><br>${esc(tradesOf(PINS[i][3]))}, ${ym(PINS[i][2])}</span><span class="num">${(dd / ppm).toFixed(1)}&nbsp;mi</span></li>`).join('')}</ol>`;
      M.hot(new Set(near.map(a => a[1]))); M.ring(x, y, near[near.length - 1][0] + 6);
    }
    b.on(inp, 'input', render);
    b.on(inp, 'keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) render(); mark(Math.min(act + 1, opts.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); mark(Math.max(act - 1, 0)); }
      else if (e.key === 'Enter') { if (!list.hidden && opts.length) { e.preventDefault(); pick(opts[act >= 0 ? act : 0]); } }
      else if (e.key === 'Escape') close();
    });
    b.on(list, 'pointerdown', e => { const li = e.target.closest('li'); if (!li) return; e.preventDefault(); pick(opts[$$('li', list).indexOf(li)]); });
    b.on(inp, 'blur', () => setTimeout(close, 120));
    b.on(clr, 'click', () => { inp.value = ''; out.innerHTML = ''; clr.hidden = true; M.clear(); inp.focus(); });
    $$('[data-try]', box).forEach(t => b.on(t, 'click', () => { const p = places.find(q => q[0] === t.dataset.try); if (p) pick(p); }));
  }
  function tips(svg, tip, b) {
    if (!mqFine.matches) return;
    b.on(svg, 'pointerover', e => {
      const c = e.target.closest('circle[data-i]'); if (!c || c.classList.contains('off')) { tip.hidden = true; return; }
      const i = +c.dataset.i, p = PINS[i];
      tip.innerHTML = `<b>${esc(placeOf(i))}</b>${esc(tradesOf(p[3]))}, ${ym(p[2])}`;
      tip.hidden = false;
      const rc = svg.getBoundingClientRect(), cr = c.getBoundingClientRect(), host = tip.parentElement.getBoundingClientRect();
      tip.style.left = Math.min(cr.left - host.left + 12, host.width - tip.offsetWidth - 4) + 'px';
      tip.style.top = (cr.top - host.top - tip.offsetHeight - 8) + 'px';
      void rc;
    });
    b.on(svg, 'pointerleave', () => { tip.hidden = true; });
  }

  V.near1 = (r, b) => {
    const svg = $('.map-svg', r), M = MapView(svg), cnt = $('[data-count]', r), when = $('[data-when]', r);
    Finder($('[data-finder]', r), M, 3, b);
    tips(svg, $('.m-tip', r), b);
    if (!motionOK() || !ST) return;
    const months = Array.from(new Set(PINS.map(p => p[2])));
    M.pins.forEach(c => c.classList.add('off'));
    G.set($('.m-hq', svg), { scale: 0, transformOrigin: '50% 50%' });
    const st = { k: 0 };
    let shown = 0;
    const tl = G.timeline({ paused: true });
    tl.to($('.m-hq', svg), { scale: 1, duration: 0.5, ease: 'back.out(1.6)' })
      .to(st, { k: months.length - 1, duration: 2.8, ease: 'power1.inOut', onUpdate: () => {
        const lim = months[Math.round(st.k)];
        while (shown < PINS.length && PINS[shown][2] <= lim) { M.pins[shown].classList.remove('off'); shown++; }
        while (shown > 0 && PINS[shown - 1][2] > lim) { shown--; M.pins[shown].classList.add('off'); }
        cnt.textContent = shown; when.textContent = `jobs, Mar 2022 to ${ym(lim)}`;
      } }, 0.2);
    ST.create({ trigger: svg, start: 'top 72%', once: true, onEnter: () => tl.play() });
  };

  V.near2 = (r, b) => {
    const svg = $('.map-svg', r), M = MapView(svg), cap = $('.n2-cap', r), cities = DATA.map.cities;
    const btns = $$('.tw', r);
    const show = btn => {
      btns.forEach(x => x.setAttribute('aria-pressed', x === btn && btn.getAttribute('aria-pressed') !== 'true'));
      if (btn.getAttribute('aria-pressed') !== 'true') { M.clear(); cap.textContent = '312 photographed jobs shown'; return; }
      const ci = cities.indexOf(btn.dataset.town);
      const set = new Set(PINS.map((p, i) => p[5] === ci ? i : -1).filter(i => i >= 0));
      M.hot(set); M.ring(+btn.dataset.x, +btn.dataset.y, 26);
      const n = +$('.tw-c', btn).textContent;
      cap.textContent = `${btn.dataset.town}: ${n} documented jobs, ${set.size} of them photographed on this map`;
    };
    btns.forEach(btn => b.on(btn, 'click', () => show(btn)));
    if (motionOK()) G.from($$('.tw i', r), { scaleX: 0, duration: 0.9, ease: ease.out, stagger: 0.06, scrollTrigger: { trigger: $('.towns', r), start: 'top 80%', once: true } });
  };

  V.near3 = (r, b) => {
    const svg = $('.map-svg', r), M = MapView(svg);
    Finder($('[data-finder]', r), M, 5, b);
  };

  /* REVIEWS */
  V.reviews1 = (r, b) => {
    const tracks = $$('.mq-track', r), mqs = $('.mqs', r), btn = $('.mq-pause', r);
    if (!motionOK()) { btn.hidden = true; return; }
    tracks.forEach((t, k) => {
      [...t.children].forEach(c => { const cl = c.cloneNode(true); cl.setAttribute('aria-hidden', 'true'); cl.setAttribute('inert', ''); t.appendChild(cl); });
      t.style.setProperty('--dur', (k ? 95 : 80) + 's'); t.classList.add('is-loop');
    });
    b.on(btn, 'click', () => { const on = !mqs.classList.contains('is-paused'); mqs.classList.toggle('is-paused', on); btn.setAttribute('aria-pressed', on); btn.textContent = on ? 'Play' : 'Pause'; });
    b.io(r, ([en]) => r.classList.toggle('is-offscreen', !en.isIntersecting), { threshold: 0.01 });
  };

  V.reviews2 = (r, b) => {
    const Q = JSON.parse($('.one-data', r).textContent), q = $('.one-q', r), name = $('.one-n', r), k = $('.one-k span', r), say = $('[data-one-say]', r);
    let i = 0;
    const go = dir => {
      i = (i + dir + Q.length) % Q.length;
      q.innerHTML = `<p>“${markNames(Q[i].q)}”</p>`;
      name.innerHTML = `${esc(Q[i].n)}<span>Google review, 2026</span>`;
      k.textContent = i + 1;
      say.textContent = `Review ${i + 1} of ${Q.length}, ${Q[i].n}: ${Q[i].q}`;
      if (motionOK()) {
        const p = $('p', q);
        p.setAttribute('aria-hidden', 'true');
        G.from(splitWords(p), { yPercent: 110, duration: 0.6, ease: ease.out, stagger: 0.012 });
        G.fromTo(name, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: ease.out, delay: 0.2, overwrite: true });
      }
    };
    $$('.rb', r).forEach(btn => b.on(btn, 'click', () => go(+btn.dataset.dir)));
    let sx = null;
    b.on(q, 'pointerdown', e => { sx = e.clientX; });
    b.on(q, 'pointerup', e => { if (sx !== null && Math.abs(e.clientX - sx) > 50) go(e.clientX < sx ? 1 : -1); sx = null; });
  };

  /* REVIEWS 3: four cards at a time so the wall never turns into a document; "Show more" adds four */
  V.reviews3 = (r, b) => {
    const cards = $$('.nw', r), more = $('.nw-more', r), say = $('.nw-say', r), STEP = 4;
    let pool = cards, lim = STEP, who = '';
    const lay = fresh => {
      cards.forEach(c => c.classList.toggle('is-out', pool.indexOf(c) < 0 || pool.indexOf(c) >= lim));
      const shown = Math.min(lim, pool.length), left = pool.length - shown;
      more.hidden = left <= 0;
      more.textContent = `Show ${Math.min(STEP, left)} more`;
      say.textContent = `${shown} of ${pool.length} reviews${who ? ' naming ' + who : ''}`;
      if (fresh && motionOK()) G.fromTo(fresh, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: ease.out, stagger: 0.05, overwrite: true });
    };
    radios($('.names', r), b, it => {
      who = it.dataset.name;
      pool = cards.filter(c => !who || c.dataset.names.split('|').includes(who));
      lim = STEP; lay(pool.slice(0, lim));
    });
    b.on(more, 'click', () => {
      const from = lim; lim += STEP; lay(pool.slice(from, lim));
      const f = pool[from] && $('blockquote', pool[from]);
      if (f) { f.tabIndex = -1; f.focus({ preventScroll: true }); }
    });
    lay(null);
  };

  /* MONEY */
  function srSay(el, text) { clearTimeout(el._t); el._t = setTimeout(() => { el.textContent = text; }, 450); }
  V.money1 = (r, b) => {
    const inp = $('#m1-amt', r), out = $('output', r), sub = $('[data-m1-sub]', r), sr = $('[data-sr]', r);
    const odo = Odo($('[data-odo]', r));
    let apr = 0.0799, n = 120;
    const upd = () => {
      const A = +inp.value, m = pmt(A, apr, n), f = usd.format(A);
      out.textContent = f; inp.setAttribute('aria-valuetext', f);
      odo(usd2.format(m));
      sub.textContent = `${f} over ${n} months at ${apr ? (apr * 100).toFixed(2) + '%' : '0%'} APR`;
      srSay(sr, `${usd2.format(m)} a month`);
    };
    radios($('.terms', r), b, it => { apr = +it.dataset.apr; n = +it.dataset.n; upd(); });
    b.on(inp, 'input', upd);
    upd();
  };
  V.money2 = (r, b) => {
    const inp = $('#m2-mo', r), out = $('output', r), cols = $$('.m2-cols li', r);
    const upd = () => {
      const M = +inp.value; out.textContent = usd.format(M); inp.setAttribute('aria-valuetext', `${usd.format(M)} a month`);
      cols.forEach(li => { $('.m2-amt', li).textContent = usd.format(Math.floor(pv(M, +li.dataset.apr, +li.dataset.n) / 100) * 100); });
    };
    b.on(inp, 'input', upd); upd();
    if (motionOK()) G.from(cols, { y: 30, autoAlpha: 0, duration: 0.7, ease: ease.out, stagger: 0.1, scrollTrigger: { trigger: $('.m2-cols', r), start: 'top 85%', once: true } });
  };
  V.money3 = (r, b) => {
    const amt = $('.rc-amt input', r), boxes = $$('input[type="checkbox"]', r), odo = Odo($('[data-odo]', r)), was = $('[data-was]', r), save = $('[data-save]', r);
    const lines = { 5: $('[data-line="5"]', r), p: $('[data-line="p"]', r) };
    const upd = () => {
      const A = Math.min(500000, +amt.value.replace(/[^\d]/g, '') || 0);
      const heroes = boxes[0].checked, full = boxes[1].checked;
      lines[5].classList.toggle('is-off', !heroes); lines.p.classList.toggle('is-off', !full);
      const pct = 10 + (heroes ? 5 : 0) + (full ? 10 : 0), price = Math.round(A * (100 - pct) / 100);
      was.textContent = usd.format(A); odo(usd.format(price)); save.textContent = usd.format(A - price);
    };
    b.on(amt, 'input', upd); b.on(amt, 'blur', () => { const v = +amt.value.replace(/[^\d]/g, '') || 0; amt.value = v.toLocaleString('en-US'); upd(); });
    boxes.forEach(x => b.on(x, 'change', upd));
    upd();
    if (motionOK()) G.from($$('.rc-h, .rc-line, .rc-tot, .rc-save', r), { clipPath: 'inset(0% 0% 100% 0%)', y: -6, duration: 0.45, ease: ease.out, stagger: 0.12, scrollTrigger: { trigger: $('.receipt', r), start: 'top 75%', once: true }, clearProps: 'clipPath' });
  };

  /* BOOK: one form engine for all three versions (S1442, S0661: validate on Continue, then live; focus first invalid) */
  function Form(form, b) {
    const steps = $$('.bk-step', form), kEl = $('.bk-k', form), k = $('.bk-k span', form), next = $('.bk-next', form), back = $('.bk-back', form), send = $('.bk-send', form), done = $('.bk-done', form);
    let i = 0;
    const err = (id, on) => { const e = $('#' + id, form) || $(`[id="${id}"]`, form); if (e) e.hidden = !on; };
    const fid = $('.bk-err', form).id.replace(/-e1$/, '');
    function valid(n, focus) {
      if (n === 0) { const ok = $$('input[name="trade"]:checked', form).length > 0; err(`${fid}-e1`, !ok); if (!ok && focus) $('input[name="trade"]', form).focus(); return ok; }
      if (n === 1) { const ok = !!$(`input[type="radio"]:checked`, form); err(`${fid}-e2`, !ok); if (!ok && focus) $('input[type="radio"]', form).focus(); return ok; }
      const f = [['name', v => v.trim().length > 0], ['tel', v => v.replace(/\D/g, '').length === 10], ['zip', v => /^\d{5}$/.test(v.trim())]];
      let first = null;
      f.forEach(([nm, test]) => { const inp = $(`input[name="${nm}"]`, form), ok = test(inp.value); inp.setAttribute('aria-invalid', !ok); err(inp.getAttribute('aria-describedby'), !ok); if (!ok && !first) first = inp; });
      if (first && focus) first.focus();
      return !first;
    }
    function shake() { if (motionOK()) G.fromTo(steps[i], { x: 0 }, { keyframes: { x: [0, -6, 6, -4, 4, 0] }, duration: 0.32, ease: 'none' }); }
    function show(n, dir) {
      steps[i].hidden = true; steps[n].hidden = false; i = n; k.textContent = n + 1;
      back.hidden = n === 0; next.hidden = n === 2; send.hidden = n !== 2;
      if (motionOK()) G.fromTo(steps[n], { x: 36 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.3, ease: ease.out, overwrite: true });
      const f = $('input', steps[n]); if (f) f.focus({ preventScroll: true });
    }
    b.on(next, 'click', () => { if (valid(i, true)) show(i + 1, 1); else shake(); });
    b.on(back, 'click', () => show(i - 1, -1));
    b.on(form, 'change', () => { if (i < 2) { const e = $$('.bk-err', steps[i])[0]; if (e && !e.hidden) valid(i, false); } });
    $$('input[name="name"], input[name="tel"], input[name="zip"]', form).forEach(inp => b.on(inp, 'input', () => { if (inp.getAttribute('aria-invalid') === 'true') valid(2, false); }));
    const tel = $('input[name="tel"]', form);
    b.on(tel, 'input', () => { const v = tel.value.replace(/\D/g, '').slice(0, 10); tel.value = v.length > 6 ? `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}` : v.length > 3 ? `(${v.slice(0, 3)}) ${v.slice(3)}` : v; });
    b.on(form, 'submit', e => {
      e.preventDefault();
      if (!valid(2, true)) { shake(); return; }
      $('[data-done-name]', form).textContent = $('input[name="name"]', form).value.trim() || 'thanks';
      steps.forEach(s => { s.hidden = true; }); [kEl, $('.bk-nav', form)].forEach(x => { x.hidden = true; });
      done.hidden = false; done.focus();
      if (motionOK()) { const p = $('path', done), L = p.getTotalLength(); G.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.55, ease: ease.out, delay: 0.1 }); G.from($$('p', done), { y: 10, autoAlpha: 0, duration: 0.4, ease: ease.out, stagger: 0.06 }); }
    });
    return trade => {
      const box = $$('input[name="trade"]', form).find(x => x.value.toLowerCase() === String(trade).toLowerCase());
      if (box) box.checked = true;
    };
  }
  V.book1 = (r, b, s) => {
    const open = $('.b1-open', r), panel = $('#b1-panel', r), pre = Form($('form', r), b);
    const toggle = (on, focus) => {
      open.setAttribute('aria-expanded', on); panel.hidden = !on; open.textContent = on ? 'Hide the form' : 'Book free inspection online';
      if (on && motionOK()) G.fromTo(panel, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: ease.out, overwrite: true });
      if (on && focus) { const f = $('input', panel); if (f) f.focus({ preventScroll: true }); }
    };
    b.on(open, 'click', () => toggle(open.getAttribute('aria-expanded') !== 'true', true));
    s.api.book = trade => { if (trade) pre(trade); toggle(true, true); };
    if (motionOK()) G.from($('.b1-tel', r), { yPercent: 40, autoAlpha: 0, duration: 0.9, ease: ease.x, scrollTrigger: { trigger: r, start: 'top 70%', once: true } });
  };
  V.book2 = (r, b, s) => {
    const pre = Form($('form', r), b);
    s.api.book = trade => { if (trade) pre(trade); const f = $('input', $('form', r)); if (f) setTimeout(() => f.focus({ preventScroll: true }), 600); };
    if (motionOK()) G.from($('.b2-ph img', r), { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.08, duration: 1.1, ease: ease.io, scrollTrigger: { trigger: r, start: 'top 75%', once: true } });
  };
  V.book3 = (r, b, s) => {
    const pre = Form($('form', r), b);
    s.api.book = trade => { if (trade) pre(trade); const f = $('input', $('form', r)); if (f) setTimeout(() => f.focus({ preventScroll: true }), 600); };
  };

  /* ========================================================================================
     SECTION CONTROLLER: 1/2/3 tabs, keys, picks panel, persistence (S0067, S0082, S1246)
     ======================================================================================== */
  const SECS = $$('.sec').map(el => ({ el, key: el.dataset.sec, stage: $('.stage', el), tabs: $$('.vsw-b', el), label: $('.vsw-l span', el), names: el.dataset.names.split('|'), tpls: $$('template', el), v: 1, b: null, ctx: null, api: {}, switched: false }));
  const BY = Object.fromEntries(SECS.map(s => [s.key, s]));

  function unmount(s) {
    if (s.b) s.b.clear();
    if (s.ctx) s.ctx.revert();
    s.b = s.ctx = null; s.api = {};
  }
  function mount(s, v, initial) {
    if (!initial) {
      unmount(s);
      s.stage.replaceChildren(s.tpls[v - 1].content.cloneNode(true));
      if (window.__apAsset) window.__apAsset(s.stage);
    }
    s.v = v; s.el.dataset.v = v;
    s.tabs.forEach(t => { const on = +t.dataset.v === v; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    s.stage.setAttribute('aria-labelledby', s.tabs[v - 1].id);
    s.label.textContent = s.names[v - 1];
    const vr = s.stage.firstElementChild;
    s.b = bag();
    const run = () => { heads(vr, s); const fn = V[s.key + v]; if (fn) fn(vr, s.b, s); };
    try {
      if (G) { s.ctx = G.context(() => {}); s.ctx.add(run); } else run();
    } catch (err) { console.error(s.key + v, err); }
  }
  const code = () => SECS.map(s => s.v).join('');
  const pretty = () => code().replace(/(\d{3})(?=\d)/g, '$1 ');
  function save() {
    store.set('ap-picks', code());
    try { const u = new URL(location.href); u.searchParams.set('v', code()); history.replaceState(null, '', u); } catch (e) { /* file URL or sandbox: the panel still shows the picks */ }
    syncPicks();
  }
  function switchTo(s, v, opts = {}) {
    v = clamp(v | 0, 1, 3);
    if (v === s.v) return;
    const y0 = s.el.getBoundingClientRect().top;
    s.switched = true;
    mount(s, v);
    if (ST) ST.refresh();
    jumpBy(s.el.getBoundingClientRect().top - y0);
    if (opts.focusTab) s.tabs[v - 1].focus();
    save();
  }
  SECS.forEach(s => {
    const list = $('.vsw', s.el);
    list.addEventListener('click', e => { const t = e.target.closest('.vsw-b'); if (t) switchTo(s, +t.dataset.v); });
    list.addEventListener('keydown', e => {
      const i = s.v - 1; let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % 3; else if (e.key === 'ArrowLeft') n = (i + 2) % 3; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = 2;
      if (n !== null) { e.preventDefault(); switchTo(s, n + 1, { focusTab: true }); }
    });
  });

  /* keys 1, 2, 3 switch the section in view; never inside fields or with modifiers */
  d.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || !/^[123]$/.test(e.key)) return;
    const t = e.target;
    if (t.closest && t.closest('input, textarea, select, [contenteditable="true"], [role="slider"]')) return;
    const mid = window.innerHeight * 0.45;
    const s = SECS.find(x => { const rc = x.el.getBoundingClientRect(); return rc.top <= mid && rc.bottom >= mid; });
    if (s) { e.preventDefault(); switchTo(s, +e.key); }
  });

  /* picks panel */
  const pkBtn = $('.pk-btn'), pkPanel = $('#pk-panel'), pkCode = $('[data-pk-code]'), pkMsg = $('.pk-msg');
  function syncPicks() {
    pkCode.textContent = pretty();
    $$('.pk-seg').forEach(g => { const s = BY[g.dataset.for]; $$('button', g).forEach(x => { const on = +x.dataset.v === s.v; x.setAttribute('aria-checked', on); x.tabIndex = on ? 0 : -1; }); });
  }
  const pkOpen = on => { pkPanel.hidden = !on; pkBtn.setAttribute('aria-expanded', on); if (on) { syncPicks(); const f = $('.pk-seg [aria-checked="true"]', pkPanel); if (f) f.focus(); } };
  pkBtn.addEventListener('click', () => pkOpen(pkPanel.hidden));
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && !pkPanel.hidden) { pkOpen(false); pkBtn.focus(); } });
  d.addEventListener('pointerdown', e => { if (!pkPanel.hidden && !e.target.closest('.picks')) pkOpen(false); });
  $$('.pk-seg').forEach(g => {
    const s = BY[g.dataset.for];
    g.addEventListener('click', e => { const x = e.target.closest('button'); if (x) switchTo(s, +x.dataset.v); });
    g.addEventListener('keydown', e => {
      let n = null; const i = s.v - 1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % 3; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i + 2) % 3;
      if (n !== null) { e.preventDefault(); switchTo(s, n + 1); $(`button[data-v="${n + 1}"]`, g).focus(); }
    });
  });
  $('[data-copy]').addEventListener('click', () => {
    const text = 'My picks: ' + SECS.map(s => `${s.el.getAttribute('aria-label')} ${s.v} (${s.names[s.v - 1]})`).join(', ');
    const ok = () => { pkMsg.textContent = 'Copied. Paste it into your message.'; };
    const fallback = () => { const t = d.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0'; d.body.appendChild(t); t.select(); let done = false; try { done = d.execCommand('copy'); } catch (e) { done = false; } t.remove(); pkMsg.textContent = done ? 'Copied. Paste it into your message.' : text; };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
  });
  $('[data-reset]').addEventListener('click', () => { SECS.forEach(s => switchTo(s, 1)); pkMsg.textContent = 'Every section is back to version 1.'; });
  const motionBox = $('[data-motion]');
  motionBox.checked = motionOK();
  function remountAll() { SECS.forEach(s => { const v = s.v; s.switched = true; mount(s, v, false); }); if (ST) ST.refresh(); }
  motionBox.addEventListener('change', () => {
    userMotion = motionBox.checked ? 'on' : 'off'; store.set('ap-motion', userMotion);
    setMotionClass(); lenisSync(); remountAll();
    pkMsg.textContent = motionBox.checked ? 'Motion on.' : 'Motion off: every section shows its finished state.';
  });
  mqReduce.addEventListener('change', () => { if (userMotion) return; motionBox.checked = motionOK(); setMotionClass(); lenisSync(); remountAll(); });

  /* in-page links: smooth with Lenis, focus moves to the target (S0915); booking links can preselect a trade */
  d.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const t = id ? d.getElementById(id) : null;
    if (!t) return;
    e.preventDefault();
    closeSheet();
    goTo(t);
    t.setAttribute('tabindex', '-1');
    setTimeout(() => t.focus({ preventScroll: true }), lenis ? 900 : 50);
    if (a.hasAttribute('data-book') && BY.book && BY.book.api.book) BY.book.api.book(a.dataset.trade || '');
  });

  /* mobile menu sheet */
  const menu = $('.hd-menu'), sheet = $('#sheet');
  function closeSheet() { if (!sheet.hidden) { sheet.hidden = true; menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu'; if (lenis) lenis.start(); } }
  menu.addEventListener('click', () => {
    const on = sheet.hidden; sheet.hidden = !on; menu.setAttribute('aria-expanded', on); menu.textContent = on ? 'Close' : 'Menu';
    if (on) { const f = $('a', sheet); if (f) f.focus(); }
  });
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { closeSheet(); menu.focus(); } });

  /* boot: picks from ?v=, then saved picks, else all version 1 */
  let picks = null;
  try { picks = new URL(location.href).searchParams.get('v'); } catch (e) { picks = null; }
  if (!/^[123]{9}$/.test(picks || '')) picks = store.get('ap-picks');
  if (!/^[123]{9}$/.test(picks || '')) picks = '111111111';
  lenisSync();
  SECS.forEach((s, k) => mount(s, +picks[k], +picks[k] === 1));
  syncPicks();
  if (ST) {
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => ST.refresh());
    window.addEventListener('load', () => ST.refresh());
  }
  mqDesk.addEventListener('change', () => { lenisSync(); remountAll(); });
})();

/* THE FIELD: Immersive Garden's background mechanism (immersive-g.com, studied at code level in REVERSE-ENGINEERING.md),
   with Austin's own cut siding shapes in place of flowers. One full-viewport WebGL canvas behind the whole site.
   - Baked relief: two height bakes (R, G) of clustered siding shapes on a white plaster ground (IG: tBake1/tBake2 on
     tPlaster). Each cluster is real Austin stock: lap boards with a wedge profile and a crisp butt, Dutch-lap coves,
     cedar shakes with grain and split butts, battens, corner posts, lap-profile sections.
   - Reveal mask (IG: extrude by noise): the relief rises out of the flat plaster by a slow noise (recomposes at rest),
     by scroll speed (IG scrollExtrude), and along the cursor's path (IG tFlow).
   - Flowmap (IG: mouseEase .4, dissipation .953, falloff .38): a ping-pong buffer painted with pointer velocity; it
     raises relief, bends the plaster like water and tints the edge (IG applyFluidEffect).
   - Splash: a click or tap drops a ring wave that bends the relief outward and raises it.
   WebGL1, no library. DPR capped, renders only while something moves, stops on hidden tabs; static under reduced motion. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cv = document.createElement('canvas'); cv.className = 'field'; cv.setAttribute('aria-hidden', 'true');
  document.body.prepend(cv);
  const gl = cv.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, preserveDrawingBuffer: false });
  if (!gl) { document.documentElement.classList.add('nofield'); return; }

  /* ---------- bake the relief (height in R and G, two layouts) ---------- */
  const T = 2048, TH = 1280;
  let seed = 4;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  function bake(layout) {
    const c = document.createElement('canvas'); c.width = T; c.height = TH; const g = c.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, T, TH);
    seed = layout === 0 ? 2009 : 2018;
    // clusters: like IG's bouquets, a few per tile, each a small arrangement of real pieces
    const clusters = layout === 0 ? [[330, 300], [1250, 240], [1760, 760], [700, 960], [1400, 1120], [180, 1160]] : [[860, 380], [1680, 260], [300, 760], [1220, 820], [1880, 1180], [560, 1200]];
    clusters.forEach(([cx, cy], ci) => {
      const kind = ['laps', 'shakes', 'bnb', 'corner', 'laps', 'shakes'][(ci + layout * 2) % 6], ang = (rnd() - 0.5) * 1.1;
      g.save(); g.translate(cx, cy); g.rotate(ang);
      if (kind === 'laps') {          // a cut-away of a lapped wall: courses overlapping, staggered ends, each with its butt
        const n = 4 + Math.floor(rnd() * 2);
        for (let k = n - 1; k >= 0; k--) { const w = 300 + rnd() * 200, off = (rnd() - 0.5) * 120; g.save(); g.translate(off, k * 50 - n * 25); piece(g, k % 2 ? 'dutch' : 'lap', 0, 0, 0, w); g.restore(); }
      } else if (kind === 'shakes') { // a fan of cedar shakes, butts out
        const n = 5 + Math.floor(rnd() * 3);
        for (let k = 0; k < n; k++) { g.save(); g.rotate((k - n / 2) * 0.2); piece(g, 'shake', 0, -110, 0); g.restore(); }
      } else if (kind === 'bnb') {    // board-and-batten: wide boards with battens over the seams
        for (let k = -1; k <= 1; k++) { g.fillStyle = 'rgb(120,120,120)'; g.fillRect(k * 92 - 45, -170, 88, 340); }
        for (let k = -1; k <= 2; k++) piece(g, 'batten', k * 92 - 46, 0, 0);
      } else {                        // an outside corner: post with lap courses butting into it
        piece(g, 'post', 0, 0, 0);
        for (let k = 0; k < 5; k++) { g.save(); g.translate(-170, k * 50 - 110); piece(g, 'lap', 0, 0, 0, 220); g.restore(); }
        piece(g, 'profile', 150, 40, 0);
      }
      g.restore();
    });
    g.filter = 'blur(1.6px)'; g.drawImage(c, 0, 0); g.filter = 'none';
    return g.getImageData(0, 0, T, TH).data;
  }
  function wedge(g, w, h, lo, hi, butt = true) {   // a board face: height rises from the thin top (lo) to the thick butt (hi)
    const gr = g.createLinearGradient(0, -h / 2, 0, h / 2);
    gr.addColorStop(0, `rgb(${lo},${lo},${lo})`); gr.addColorStop(0.86, `rgb(${hi},${hi},${hi})`); gr.addColorStop(1, `rgb(${hi * 0.9 | 0},${hi * 0.9 | 0},${hi * 0.9 | 0})`);
    g.fillStyle = gr; g.fillRect(-w / 2, -h / 2, w, h);
    if (butt) { g.fillStyle = `rgb(${hi + 14},${hi + 14},${hi + 14})`; g.fillRect(-w / 2, h / 2 - h * 0.12, w, h * 0.05); }
  }
  function grain(g, w, h, amp, n) {
    g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < n; i++) { const y = -h / 2 + rnd() * h; g.strokeStyle = `rgba(255,255,255,${amp * rnd()})`; g.lineWidth = 0.8 + rnd() * 1.4;
      g.beginPath(); g.moveTo(-w / 2, y); g.bezierCurveTo(-w / 6, y + (rnd() - 0.5) * 6, w / 6, y + (rnd() - 0.5) * 6, w / 2, y + (rnd() - 0.5) * 4); g.stroke(); }
    g.globalCompositeOperation = 'source-over';
  }
  function piece(g, kind, x, y, ang, wIn) {
    g.save(); g.translate(x, y); g.rotate(ang);
    if (kind === 'lap' || kind === 'dutch') {
      const w = wIn || 260 + rnd() * 220, h = 58;
      wedge(g, w, h, 70, 190);
      if (kind === 'dutch') { const gr = g.createLinearGradient(0, -h / 2, 0, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.35)');
        g.fillStyle = gr; g.fillRect(-w / 2, -h * 0.18, w, h * 0.16); }
      grain(g, w, h * 0.8, 0.07, 14);
      g.fillStyle = 'rgb(200,200,200)'; g.fillRect(w / 2 - 4, -h / 2, 4, h);                      // the clean factory cut end
    } else if (kind === 'shake') {
      const w = 70 + rnd() * 60, h = 170 + rnd() * 40;
      g.beginPath(); g.moveTo(-w / 2, -h / 2); g.lineTo(w / 2, -h / 2); g.lineTo(w / 2, h / 2 - 8); g.lineTo(w * 0.2, h / 2); g.lineTo(-w * 0.1, h / 2 - 10); g.lineTo(-w / 2, h / 2 - 3); g.closePath(); g.clip();
      wedge(g, w + 2, h, 60, 175, false); g.rotate(Math.PI / 2); grain(g, h, w, 0.12, 18);
    } else if (kind === 'batten') {
      const w = 34, h = 300 + rnd() * 140; const gr = g.createLinearGradient(-w / 2, 0, w / 2, 0);
      gr.addColorStop(0, 'rgb(110,110,110)'); gr.addColorStop(0.18, 'rgb(170,170,170)'); gr.addColorStop(0.82, 'rgb(170,170,170)'); gr.addColorStop(1, 'rgb(90,90,90)');
      g.fillStyle = gr; g.fillRect(-w / 2, -h / 2, w, h);
    } else if (kind === 'post') {
      const w = 60, h = 280 + rnd() * 80;
      g.fillStyle = 'rgb(175,175,175)'; g.fillRect(-w, -h / 2, w, h); g.fillStyle = 'rgb(140,140,140)'; g.fillRect(0, -h / 2, w * 0.8, h);
      g.fillStyle = 'rgb(205,205,205)'; g.fillRect(-2, -h / 2, 4, h);
    } else {   // lap profile in section: three lapped wedges
      for (let k = 0; k < 3; k++) { g.save(); g.translate(0, (k - 1) * 46); g.beginPath(); g.moveTo(-60, -30); g.lineTo(-42, -30); g.lineTo(60, 26); g.lineTo(-60, 26); g.closePath();
        const gr = g.createLinearGradient(-60, 0, 60, 0); gr.addColorStop(0, 'rgb(120,120,120)'); gr.addColorStop(1, 'rgb(185,185,185)'); g.fillStyle = gr; g.fill(); g.restore(); }
    }
    g.restore();
  }
  const A = bake(0), B = bake(1), px = new Uint8Array(T * TH * 4);
  for (let i = 0, j = 0; i < T * TH; i++, j += 4) { px[j] = A[j]; px[j + 1] = B[j]; px[j + 2] = 0; px[j + 3] = 255; }

  /* ---------- GL helpers ---------- */
  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(s); return s; }
  function prog(vs, fs) { const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p);
    const u = {}; const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); for (let i = 0; i < n; i++) { const a = gl.getActiveUniform(p, i); u[a.name.replace('[0]', '')] = gl.getUniformLocation(p, a.name); } return { p, u }; }
  function tex(w, h, data, linear = true, repeat = false) { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST);
    const wrap = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE; gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data); return t; }
  function fbo(t) { const f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0); return f; }
  const quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';

  // the relief (not a power of two: no mipmaps; REPEAT needs POT in WebGL1, so tiling is done in the shader with fract)
  const relief = tex(T, TH, px, true, false);
  // the flowmap: 128 x 128 ping-pong, velocity in RG (0.5 = still), intensity in B
  const FW = 128, FH = 128, still = new Uint8Array(FW * FH * 4); for (let i = 0; i < still.length; i += 4) { still[i] = 128; still[i + 1] = 128; still[i + 2] = 0; still[i + 3] = 255; }
  const fT = [tex(FW, FH, still), tex(FW, FH, still)], fF = [fbo(fT[0]), fbo(fT[1])]; let fi = 0;

  const FLOW = prog(VS, `precision highp float;varying vec2 v;uniform sampler2D prev;uniform vec2 m;uniform vec2 vel;uniform float aspect;uniform float on;uniform float dissipation;uniform float falloff;
    void main(){vec4 o=texture2D(prev,v);vec2 d=(v-m)*vec2(aspect,1.);float r=1.-smoothstep(0.,falloff*.25,length(d));r*=on;
      vec2 cv=(o.rg-.5)*dissipation;float b=o.b*dissipation;
      cv+=vel*r*.5;b=min(1.,b+r*min(1.,length(vel)*2.2+.08));gl_FragColor=vec4(cv+.5,b,1.);}`);

  const MAIN = prog(VS, `precision highp float;varying vec2 v;uniform sampler2D relief;uniform sampler2D flow;uniform vec2 res;uniform float t;uniform float scroll;uniform float sv;uniform float tile;
    uniform vec4 splash[4];uniform float ink;
    float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
    float fbm(vec2 p){return n2(p)*.55+n2(p*2.1+3.1)*.3+n2(p*4.3+7.7)*.15;}
    vec2 puv(vec2 frag){vec2 q=vec2(frag.x,frag.y+scroll)/vec2(tile,tile/${(T / TH).toFixed(4)});return fract(q);}
    float H(vec2 frag,float mix_,float mask){vec2 q=puv(frag);vec2 r=texture2D(relief,q).rg;return mix(r.r,r.g,mix_)*mask;}
    void main(){
      vec2 frag=v*res;vec4 fl=texture2D(flow,v);vec2 vel=(fl.rg-.5)*2.;float amt=fl.b;
      // splash rings: bend outward and raise
      float sp=0.;vec2 disp=vel*amt*18.;
      for(int i=0;i<4;i++){vec4 s=splash[i];if(s.w>0.){float age=t-s.z;vec2 d=frag-s.xy;float L=length(d);float rr=age*620.;
        float ring=exp(-pow((L-rr)/(46.+age*60.),2.))*exp(-age*1.7)*s.w;disp+=normalize(d+1e-4)*ring*16.;sp+=ring;}}
      frag-=disp;
      vec2 pq=frag/tile;
      float mix_=smoothstep(.36,.64,fbm(pq*.9+vec2(t*.011,-t*.007)));
      float rest=smoothstep(.42,.7,fbm(pq*1.7+vec2(-t*.013,t*.009)+5.));
      float mask=clamp(rest*.62+amt*1.35+sp*.9+sv*.5,0.,1.);
      float h=H(frag,mix_,mask);
      float e=1.5;float hx=H(frag+vec2(e,0.),mix_,mask)-H(frag-vec2(e,0.),mix_,mask);float hy=H(frag+vec2(0.,e),mix_,mask)-H(frag-vec2(0.,e),mix_,mask);
      vec3 n=normalize(vec3(-hx*5.5,-hy*5.5,1.));
      vec3 L=normalize(vec3(-.55,.62,.62));
      float dif=clamp(dot(n,L),0.,1.);
      float sh=0.;for(int k=1;k<6;k++){float o=float(k)*3.2;float hs=H(frag+vec2(-.55,.62)*o,mix_,mask);sh=max(sh,hs-h-float(k)*.012);}
      float shadow=1.-clamp(sh*2.6,0.,.42);
      float grainN=h21(floor(frag*.9))*.018-.009;
      vec3 plaster=vec3(.957,.949,.925)+grainN;
      vec3 col=plaster*(.86+.18*dif)*shadow + pow(clamp(dot(reflect(-L,n),vec3(0,0,1)),0.,1.),24.)*.06*h;
      // the splash / fluid edge: a cool steel tint where the water moves
      col+=vec3(-.03,-.005,.03)*clamp(amt*length(vel)*2.+sp*.5,0.,1.)*ink;
      gl_FragColor=vec4(col,1.);}`);

  /* ---------- state, input, loop ---------- */
  let W = 1, Hh = 1, dpr = 1, running = false, lastT = 0, t0 = performance.now(), lastMove = 0, lastScroll = scrollY, sv = 0;
  const m = { x: 0.5, y: 0.5, vx: 0, vy: 0, sx: 0.5, sy: 0.5, on: 0 };
  const splashes = [[0, 0, -9, 0], [0, 0, -9, 0], [0, 0, -9, 0], [0, 0, -9, 0]]; let si = 0;
  function size() { dpr = Math.min(devicePixelRatio || 1, 1.5); W = innerWidth; Hh = innerHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(Hh * dpr); }
  addEventListener('resize', () => { size(); kick(); });
  addEventListener('pointermove', (e) => {
    const nx = e.clientX / W, ny = 1 - e.clientY / Hh;
    m.vx = (nx - m.x) * 60; m.vy = (ny - m.y) * 60; m.x = nx; m.y = ny; m.on = e.target.closest && e.target.closest('[data-solid]') ? 0 : 1; lastMove = performance.now(); kick();
  }, { passive: true });
  addEventListener('pointerdown', (e) => {
    if (e.target.closest && e.target.closest('a,button,input,select,textarea,[data-solid]')) return;
    splashes[si] = [e.clientX * dpr, (Hh - e.clientY) * dpr, (performance.now() - t0) / 1000, 1]; si = (si + 1) % 4; kick();
  }, { passive: true });
  addEventListener('scroll', () => kick(), { passive: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });

  function frame(now) {
    const t = (now - t0) / 1000, dt = Math.min(1 / 30, lastT ? (now - lastT) / 1000 : 1 / 60); lastT = now;
    const ds = scrollY - lastScroll; lastScroll = scrollY; sv += (Math.min(1, Math.abs(ds) / 60) - sv) * 0.12;
    // the eased pointer (IG mouseEase .4) and velocity normalised to the frame (IG: min(32,dt)/16)
    const k = 0.4; const ex = m.sx + (m.x - m.sx) * k, ey = m.sy + (m.y - m.sy) * k;
    const f = Math.min(32, dt * 1000) / 16, vx = (ex - m.sx) * 22 * f, vy = (ey - m.sy) * 22 * f; m.sx = ex; m.sy = ey;
    const moving = now - lastMove < 120;
    // flow pass
    gl.useProgram(FLOW.p); gl.bindFramebuffer(gl.FRAMEBUFFER, fF[1 - fi]); gl.viewport(0, 0, FW, FH);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, fT[fi]); gl.uniform1i(FLOW.u.prev, 0);
    gl.uniform2f(FLOW.u.m, m.sx, m.sy); gl.uniform2f(FLOW.u.vel, vx, vy); gl.uniform1f(FLOW.u.aspect, W / Hh); gl.uniform1f(FLOW.u.on, moving ? m.on : 0);
    gl.uniform1f(FLOW.u.dissipation, 0.953); gl.uniform1f(FLOW.u.falloff, 0.38);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); fi = 1 - fi;
    // main pass
    gl.useProgram(MAIN.p); gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, cv.width, cv.height);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, relief); gl.uniform1i(MAIN.u.relief, 0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, fT[fi]); gl.uniform1i(MAIN.u.flow, 1);
    gl.uniform2f(MAIN.u.res, cv.width, cv.height); gl.uniform1f(MAIN.u.t, t); gl.uniform1f(MAIN.u.scroll, scrollY * 0.25 * dpr); gl.uniform1f(MAIN.u.sv, sv);
    gl.uniform1f(MAIN.u.tile, 1500 * dpr); gl.uniform1f(MAIN.u.ink, 1);
    gl.uniform4fv(MAIN.u.splash, splashes.flat());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    const busy = moving || now - lastMove < 2600 || sv > 0.01 || splashes.some((s) => t - s[2] < 2.5);
    // at rest the relief keeps recomposing slowly: render at a calm ~20 fps; otherwise full rate
    if (document.hidden || RM) { running = false; return; }
    if (busy) requestAnimationFrame(frame); else setTimeout(() => requestAnimationFrame(frame), 50);
  }
  function kick() { if (!running && !document.hidden) { running = true; requestAnimationFrame(frame); } }
  size();
  if (RM) { requestAnimationFrame((n) => { running = true; frame(n); running = false; }); } else kick();
  window.__field = { splash: (x, y) => { splashes[si] = [x * dpr, (Hh - y) * dpr, (performance.now() - t0) / 1000, 1]; si = (si + 1) % 4; kick(); },
    move: (x, y) => { m.vx = 0; m.x = x / W; m.y = 1 - y / Hh; m.on = 1; lastMove = performance.now(); kick(); } };
})();

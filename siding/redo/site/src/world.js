/* THE HIDDEN WORLD (AUSTIN-BACKGROUND-CORRECTION-2026-11-04; IMMERSIVE-BACKGROUND-SPEC.md). Immersive Garden's mechanism,
   copied, with Austin's own objects:
   - the scene is a white plaster bas-relief (three connected panels: the street, the wall, the roof), sculpted as height
     fields and baked offline into six lighting levels of increasing relief depth (bg/relief.py); the flat wall is pure
     white in every level, so at rest the page is exactly white;
   - a 256² ping-pong flowmap holds the reveal: presence (a) and eased pointer speed (b), stamped with
     smoothstep(0.19, 0, dist) in viewport-height units, broken by drifting cloud noise (0.15–1), decayed every frame by
     1/(1 + dm·(1/0.953 − 1)), dm = min(dt, 32)/16;
   - extrude = b + a walks IG's six-step ladder from white up through levels 1–5;
   - the wall moves at 0.31× page scroll (eased, τ ≈ 340 ms); the mask is shifted with it so trails stay on the wall;
   - owner's rules over IG: nothing at rest (no ghost cursor), the disc closes by itself once the pointer is still (250 ms hold, then a 0.93 release), no
     colour at all (grey only, drawn as black with alpha over the white page), a 4 px pointer parallax on the highest relief.
   WebGL2 (WebGL1 fallback), no library. Reduced motion: nothing starts; the page stays white. */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const PANELS = window.__BG || []; if (!PANELS.length) return;
  const cv = document.createElement('canvas'); cv.className = 'world'; cv.setAttribute('aria-hidden', 'true'); document.body.prepend(cv);
  let gl = cv.getContext('webgl2', { premultipliedAlpha: true, alpha: true, antialias: false }); const GL2 = !!gl;
  if (!gl) gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) { cv.remove(); return; }

  /* ---------- the mask target: half-float where possible, else bytes with a floor so it always reaches zero ---------- */
  let FT = gl.UNSIGNED_BYTE, IF = gl.RGBA, BYTE = true;
  if (GL2 && gl.getExtension('EXT_color_buffer_float')) { FT = gl.HALF_FLOAT; IF = gl.RGBA16F; BYTE = false; }
  else if (!GL2) { const h = gl.getExtension('OES_texture_half_float'); if (h && gl.getExtension('EXT_color_buffer_half_float')) { FT = h.HALF_FLOAT_OES; BYTE = false; } }
  const MS = 256;
  const mk = () => { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, IF, MS, MS, 0, gl.RGBA, FT, null);
    [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach((p) => gl.texParameteri(gl.TEXTURE_2D, p, gl.LINEAR));
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((p) => gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE));
    const f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE; gl.bindFramebuffer(gl.FRAMEBUFFER, null); return { t, f, ok }; };
  let M = [mk(), mk()];
  if (!M[0].ok && !BYTE) { FT = gl.UNSIGNED_BYTE; IF = gl.RGBA; BYTE = true; M = [mk(), mk()]; }
  if (!M[0].ok) { cv.remove(); return; }

  /* ---------- shaders ---------- */
  const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0,1);}';
  const NOISE = `float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
    float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+1.),f.x),f.y);}
    float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*vn(p);p*=2.03;a*=.5;}return s;}`;
  // flowmap: decay, scroll shift, stamp (IG: smoothstep(falloff,0,dist), noise2 = .15 + .85*smoothstep(.4,1,n))
  const FM = `precision highp float;varying vec2 v;uniform sampler2D prev;uniform vec2 mouse;uniform float aspect,falloff,dm,shift,time,pres,speed,floor8,keep;${NOISE}
    void main(){vec4 d=texture2D(prev,v+vec2(0.,shift));float k=1./(1.+dm*(1./keep-1.));d*=k;d=max(d-floor8,0.);
      vec2 c=v-mouse;c.x*=aspect;float st=1.-smoothstep(0.,falloff,length(c));   /* = IG's smoothstep(falloff,0,d), written with ordered edges (reversed edges are undefined in GLSL) */
      float n2=.15+.85*smoothstep(.4,1.,fbm(v*vec2(aspect,1.)*3.2+vec2(.01)*time));
      d.a=min(1.,d.a+st*n2*dm*pres);d.b=min(1.,max(d.b,st*speed*n2));gl_FragColor=d;}`;
  // composite: IG's six-level ladder; out = black with alpha (1 - v) over the white page, so R = G = B and rest = transparent
  const CO = `precision highp float;varying vec2 v;uniform sampler2D flow,a0,b0,a1,b1,a2,b2;uniform vec2 res,par;uniform float wy,pw,ph,dbg;
    vec3 L(int i,vec2 q,int c){vec4 A,B;if(i==0){A=texture2D(a0,q);B=texture2D(b0,q);}else if(i==1){A=texture2D(a1,q);B=texture2D(b1,q);}else{A=texture2D(a2,q);B=texture2D(b2,q);}
      return c==0?A.rgb:B.rgb;}
    void main(){vec4 f=texture2D(flow,v);float e=clamp(f.b+f.a,0.,2.);
      if(dbg>2.5){gl_FragColor=vec4(0.,0.,0.,f.b);return;}if(dbg>1.5){gl_FragColor=vec4(0.,0.,0.,f.a);return;}if(dbg>.5){gl_FragColor=vec4(0.,0.,0.,clamp(e,0.,1.));return;}   // measurement only (?bgmask): the mask itself
      if(e<.002){gl_FragColor=vec4(0.);return;}
      vec2 px=vec2(v.x*res.x,(1.-v.y)*res.y);                      // css px, y down
      float wyp=px.y+wy;float n=floor(wyp/ph);int pi=int(mod(n,3.));
      vec2 q=vec2((px.x-res.x*.5)/pw+.5,(wyp-n*ph)/ph);
      vec3 la=L(pi,q,0);vec4 lb=vec4(L(pi,q+par*.6/vec2(pw,ph),1),1.);
      vec3 hi=L(pi,q+par/vec2(pw,ph),1);
      float val=1.;
      val=mix(val,la.r,smoothstep(0.,.2,e));val=mix(val,la.g,smoothstep(.2,.4,e));val=mix(val,la.b,smoothstep(.4,.6,e));
      val=mix(val,lb.r,smoothstep(.6,.8,e));val=mix(val,hi.g,smoothstep(.8,1.,e));
      val=1.-(1.-val)*(.85+.3*clamp((hi.b-.94)/.06,0.,1.));                                  // plaster grain only where there is relief, so an empty wall stays white
      if(q.x<0.||q.x>1.)val=1.;
      gl_FragColor=vec4(0.,0.,0.,1.-val);}`;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(o)); return o; };
  const prog = (fs) => { const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p); return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null; };
  const PF = prog(FM), PC = prog(CO); if (!PF || !PC) { cv.remove(); return; }
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const U = (p, n) => gl.getUniformLocation(p, n);

  /* ---------- the relief panels (2 images each: levels 1-3, levels 4-5 + plaster grain) ---------- */
  const PW = 1280, PH = 1600; const T = []; let loaded = 0;
  PANELS.forEach((pn, i) => ['a', 'b'].forEach((ab) => { const t = gl.createTexture(); T[i * 2 + (ab === 'a' ? 0 : 1)] = t; const im = new Image();
    im.onload = () => { gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); loaded++; };
    im.src = pn[ab]; }));

  /* ---------- state ---------- */
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const DBG = /[?&]bgmask=a\b/.test(location.search) ? 2 : /[?&]bgmask=b\b/.test(location.search) ? 3 : /[?&]bgmask\b/.test(location.search) ? 1 : 0;   // measurement only: draws the mask value instead of the relief
  let W = 0, H = 0, dpr = 1;
  function size() { dpr = Math.min(devicePixelRatio || 1, FINE ? 1.5 : 1); W = innerWidth; H = innerHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
  const P = { tx: 0.5, ty: 0.5, x: 0.5, y: 0.5, px: 0.5, py: 0.5, last: -1e9, sp: 0, on: false };
  let nF = 0, sumDt = 0;
  let wy = scrollY * 0.31, raf = 0, prevT = 0, lastStamp = -1e9, t0 = performance.now(), cur = 0;
  const now = () => performance.now();
  function input(x, y) { P.tx = x / W; P.ty = 1 - y / H; if (!P.on) { P.x = P.tx; P.y = P.ty; P.px = P.x; P.py = P.y; } P.on = true; P.last = now(); kick(); }

  function frame() {
    const t = now(); raf = 0;   // one clock for everything (rAF stamps and event times share it)
    const dt = Math.min(32, prevT ? t - prevT : 16); prevT = t; const dm = dt / 16; nF++; sumDt += dt;
    // pointer: eased 0.4 per 16 ms frame (IG), speed eased 0.1 moving / 0.04 still
    const ke = 1 - Math.pow(0.6, dm); P.x += (P.tx - P.x) * ke; P.y += (P.ty - P.y) * ke;
    const vx = (P.x - P.px) * dm, vy = (P.y - P.py) * dm; P.px = P.x; P.py = P.y;
    const mv = Math.hypot(vx, vy); const target = 1 - Math.pow(1 - Math.min(1, 50 * mv), 2);
    P.sp += (target - P.sp) * (1 - Math.pow(1 - (mv > 1e-5 ? 0.1 : 0.04), dm));
    const active = P.on && t - P.last < 250; P.act = active; P.age = t - P.last;   // owner: a still pointer lets the disc close by itself                         // owner: the disc closes by itself once the pointer is still (250 ms hold, then a 0.93 release)
    if (active || P.sp > 0.01) lastStamp = t;
    // wall: 0.31 x scroll, eased tau ~340 ms; the mask moves with it so trails stay on the wall
    const want = scrollY * 0.31, prevWy = wy; wy += (want - wy) * (1 - Math.pow(1 - 0.047, dm));
    if (Math.abs(want - wy) < 0.05) wy = want;
    const shift = -(wy - prevWy) / H;                                 // mask texture is y-up
    // flowmap pass
    const src = M[cur], dst = M[1 - cur]; cur = 1 - cur;
    gl.bindFramebuffer(gl.FRAMEBUFFER, dst.f); gl.viewport(0, 0, MS, MS); gl.useProgram(PF);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, src.t); gl.uniform1i(U(PF, 'prev'), 0);
    gl.uniform2f(U(PF, 'mouse'), P.x, P.y); gl.uniform1f(U(PF, 'aspect'), W / H); gl.uniform1f(U(PF, 'falloff'), 0.19); gl.uniform1f(U(PF, 'dm'), dm);
    gl.uniform1f(U(PF, 'shift'), shift); gl.uniform1f(U(PF, 'time'), (t - t0) / 1000); gl.uniform1f(U(PF, 'pres'), active ? 1 : 0);
    gl.uniform1f(U(PF, 'speed'), active ? P.sp : 0); gl.uniform1f(U(PF, 'floor8'), BYTE ? 1.5 / 255 : 0.0004);
    gl.uniform1f(U(PF, 'keep'), active ? 0.953 : 0.93);                 // IG's 0.953 while the pointer moves; a faster release once it is still
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // composite pass
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, cv.width, cv.height); gl.useProgram(PC);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, dst.t); gl.uniform1i(U(PC, 'flow'), 0);
    ['a0', 'b0', 'a1', 'b1', 'a2', 'b2'].forEach((n, i) => { gl.activeTexture(gl.TEXTURE1 + i); gl.bindTexture(gl.TEXTURE_2D, T[i]); gl.uniform1i(U(PC, n), 1 + i); });
    const pw = Math.max(W, 900), ph = pw * PH / PW;
    gl.uniform2f(U(PC, 'res'), W, H); gl.uniform1f(U(PC, 'wy'), wy); gl.uniform1f(U(PC, 'pw'), pw); gl.uniform1f(U(PC, 'ph'), ph);
    gl.uniform1f(U(PC, 'dbg'), DBG); gl.uniform2f(U(PC, 'par'), (P.x - 0.5) * -4, (0.5 - P.y) * -4);     // up to 4 px on the highest relief
    if (loaded === PANELS.length * 2) gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // run while anything is still showing (the mask fades to nothing ~2.2 s after the last stamp) or the wall is still easing
    if (t - lastStamp < 2300 || Math.abs(want - wy) > 0.05) raf = requestAnimationFrame(frame);
    else { gl.clear(gl.COLOR_BUFFER_BIT); prevT = 0; }
  }
  function kick() { if (!raf && !document.hidden) raf = requestAnimationFrame(frame); }
  if (FINE) addEventListener('pointermove', (e) => input(e.clientX, e.clientY), { passive: true });
  else {
    addEventListener('touchstart', (e) => { const t = e.touches[0]; if (t) input(t.clientX, t.clientY); }, { passive: true });
    addEventListener('touchmove', (e) => { const t = e.touches[0]; if (t) input(t.clientX, t.clientY); }, { passive: true });
  }
  addEventListener('scroll', () => { if (raf || now() - lastStamp < 2300) kick(); else wy = scrollY * 0.31; }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { prevT = 0; kick(); } });
  addEventListener('resize', size);
  size();
  window.__world = { state: () => ({ wy, x: P.x, y: P.y, sp: P.sp, running: !!raf, act: P.act, age: P.age, frames: nF, sumDt, byte: BYTE, gl2: GL2, loaded }) };
})();

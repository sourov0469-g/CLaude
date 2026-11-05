/* BACKGROUND V2 ENGINE (AUSTIN-BACKGROUND-V2-CODE-COPY-2026-11-05). Immersive Garden's homepage background, copied from
   their production bundle (entry.DyxL_KXi.js) as closely as a single-file build allows, on the same engine generation
   (Three.js r150, bundled here). De-minified from the byte offsets in bgstudy-v2/background-code/EXTRACT-INDEX.md:
     pointer tracker  Kge   @1876144     flowmap        E_e + b_e/x_e  @1934458-1937300
     fluid sheen      v8    @1552018     relief         D_e + S_e/C_e  @1937300-1956900
     background plane T_e/I_e @1945600   home config    k_e            @1987291-1990300
   Shaders are copied verbatim (marked where Austin needs a switch). One mechanism; the worlds only change the assets:
     'ig'      their relief model, textures and noises, exactly (comparison only: their artwork, never for the live site)
     b1..b3    Austin's own relief panels (bg/relief2.py), baked the same way, fluid sheen off (it is colour). */
import * as THREE from 'three';
// No post pass: the home config lists a bloom (k_e.composer), but the home view (F_e extends Oc) has no composer; the only
// consumer of `config.composer` is another view's composer (sve @2021221). The home relief is rendered straight to its target.

const Hv = 9.995, CB = 1.33;                                    // row pitch and camera fit constant (bundle: Hv, CB)
// ---------------------------------------------------------------- home config k_e (verbatim values)
const K = {
  renderer: { clearColor: '#ffffff' },
  composer: { bloom: { enabled: true, strength: 2.2, radius: 0.15, threshold: 0.38, smoothWidth: 0.5 } },
  relief: {
    scroll: { speed: 0.25 }, flowmap: { mouseEase: 0.4, dissipation: 0.953, falloff: 0.38, alpha: 1 },
    extrude: { textureStrength: 1, gradientStrength: 0.17 },
    camera: { fov: 30, distance: 15, fastModeZoom: 0.6, slowModeZoom: 1, near: 5, far: 20 },
    scrollExtrude: { noiseSize: 7.77, speed: 2, mask: { min: -1, max: 1 }, strength: 1.02 },
    chromaticMask: { fresnelSharpness: 35, fresnelOpacity: 0.98, shadowRange: { min: 0.2, max: 0.42 }, shadowOpacity: 0.25 },
    fluidEffect: { amplitude: 0.57, shadowStrength: 0.3, baseColor: { r: 122, g: 191, b: 197 }, baseThreshold: 1, fluidMagnitude: 0.15, fluidRedCoef: 2, fluidGreenCoef: 1, fluidBlueCoef: 1.5,
      linesSpeed: 2, linesScale: 4, linesStrength: 0, linesWaveLength: 0.15, hueShift: -0.52, colorRange: 2 },
  },
  scroll: { fastMode: { fastTrigger: 0.99, fastOffsetSpeed: 0.05, fastFactorSlowDown: 0.3, fastFactorSpeedUp: 0.6 }, slowMode: { slowTrigger: 0.75, slowOffsetSpeed: 0.025, slowFactorSlowDown: 0.3, slowFactorSpeedUp: 0.9 } },
  fluidFlowmap: { densityDissipation: 0.95, velocityDissipation: 0.8891, pressureDissipation: 0.925, velocityRange: { min: 5, max: 78 }, curlStrength: 0.1, radius: 0.7 },
};
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const mapClamp = (v, [a, b], [c, d]) => clamp(c + (d - c) * ((v - a) / (b - a)), Math.min(c, d), Math.max(c, d));   // bundle `un`

// ---------------------------------------------------------------- tiny tween / timeline (stands in for GSAP)
const EASE = {
  'power2.out': (t) => 1 - (1 - t) * (1 - t), 'power1.out': (t) => 1 - (1 - t), 'sine.out': (t) => Math.sin(t * Math.PI / 2),
  'sine.inOut': (t) => -(Math.cos(Math.PI * t) - 1) / 2, none: (t) => t,
};
// GSAP RoughEase (template, strength, points, taper none, randomize, clamp): jittered points on the template curve
function rough({ strength, points, template }) {
  const tf = EASE[template] || EASE.none, P = [[0, 0]];
  for (let i = 1; i < points; i++) { const x = i / points; const y = tf(x) + (Math.random() - 0.5) * strength * 0.4 / Math.max(1, points / 12); P.push([x, clamp(y, 0, 1)]); }
  P.push([1, 1]);
  return (t) => { for (let i = 1; i < P.length; i++) if (t <= P[i][0]) { const [x0, y0] = P[i - 1], [x1, y1] = P[i]; return y0 + (y1 - y0) * ((t - x0) / (x1 - x0)); } return 1; };
}
const tweens = new Set();
function tween(obj, key, to, dur, ease = 'none', from) {
  const tw = { obj, key, a: from ?? obj[key], b: to, t: 0, dur: Math.max(1e-3, dur), e: typeof ease === 'function' ? ease : (EASE[ease] || EASE.none) };
  [...tweens].forEach((x) => { if (x.obj === obj && x.key === key) tweens.delete(x); }); tweens.add(tw); return tw;
}
function stepTweens(dt) { tweens.forEach((tw) => { tw.t = Math.min(1, tw.t + dt / tw.dur); tw.obj[tw.key] = lerp(tw.a, tw.b, tw.e(tw.t)); if (tw.t >= 1) tweens.delete(tw); }); }

// ---------------------------------------------------------------- the fullscreen triangle (bundle `Vy`)
class Vy extends THREE.BufferGeometry {
  constructor() { super(); this.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)); this.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2)); }
}

// ---------------------------------------------------------------- pointer tracker (bundle Kge; page coords are client coords here: Austin's page scrolls natively)
class Pointer {
  constructor(touchStamps) {
    this.normalFlip = new THREE.Vector2(-1, -1); this.velocity = new THREE.Vector2(); this.last = new THREE.Vector2(-1, -1);
    const upd = (e) => {
      if (!touchStamps && e.pointerType && e.pointerType !== 'mouse') return;      // Austin worlds: no hover reveal on touch
      let x = e.clientX, y = e.clientY; if (e.changedTouches && e.changedTouches.length) { if (!touchStamps) return; x = e.changedTouches[0].clientX; y = e.changedTouches[0].clientY; }
      this.normalFlip.set(x / innerWidth, 1 - y / innerHeight);
    };
    addEventListener('pointerdown', upd); addEventListener('pointermove', upd); addEventListener('touchmove', upd, { passive: true });
  }
  tick(ms) { if (this.last.x === -1) this.last.copy(this.normalFlip); const dx = this.normalFlip.x - this.last.x, dy = this.normalFlip.y - this.last.y; this.last.copy(this.normalFlip); const r = Math.min(32, ms) / 16; this.velocity.set(dx * r, dy * r); }
}

// ---------------------------------------------------------------- flowmap (bundle E_e, shaders b_e / x_e verbatim)
const b_e = `precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform float uFalloff;uniform float uAlpha;uniform float uDissipation;uniform float uDeltaMult;uniform float uOffset;uniform float uAspect;uniform vec2 uMouse;uniform vec2 uVelocity;uniform vec2 uMouse2;uniform vec2 uVelocity2;uniform sampler2D tNoise;uniform float uTime;varying vec2 vUv;vec4 getStamp(vec2 velocity,vec2 mouse){vec2 cursor=vUv-mouse;cursor.x*=uAspect;velocity*=50.0;float magnitude=1.0-pow(1.0-min(1.0,length(velocity)),2.0);vec4 stamp=vec4(velocity,magnitude,1.0);float falloff=smoothstep(uFalloff,0.0,length(cursor))*uAlpha;return stamp*falloff;}void main(){vec2 uv=vUv;uv.y+=uOffset;vec4 data=texture2D(tMap,uv);float friction=(1.0/uDissipation)-1.0;float dissipation=1.0/(1.0+(uDeltaMult*friction));data*=dissipation;float noise=0.00+1.00*smoothstep(0.4,1.0,texture2D(tNoise,(vUv*vec2(uAspect,1.0))*0.35+vec2(0.01,0.01)*uTime).g);float noise2=0.15+0.85*smoothstep(0.4,1.0,texture2D(tNoise,(vUv*vec2(uAspect,1.0))*0.8+vec2(0.01,0.01)*uTime).g);vec4 stamp=getStamp(uVelocity,uMouse);data+=stamp*noise2*uDeltaMult;vec4 stamp2=getStamp(uVelocity2,uMouse2)*3.;stamp2.a=stamp2.b;stamp2.rg*=0.0;data+=stamp2*noise*uDeltaMult;data=min(data,vec4(1));data.rgb=max(data.rgb,vec3(-1));gl_FragColor=data;}`;
const x_e = `#define GLSLIFY 1
attribute vec2 uv;attribute vec3 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1);}`;
class Flowmap {
  constructor(renderer, { size = 256, falloff = 0.5, alpha = 0.3, dissipation = 0.98, tNoise, uTime }) {
    this.renderer = renderer; this.camera = new THREE.Camera(); this.scene = new THREE.Scene(); this.uniform = { value: null };
    const o = { type: /(iPad|iPhone|iPod)/g.test(navigator.userAgent) ? THREE.HalfFloatType : THREE.FloatType, depthBuffer: false };
    this.mask = { read: new THREE.WebGLRenderTarget(size, size, o), write: new THREE.WebGLRenderTarget(size, size, o) };
    this.mask.swap = () => { const u = this.mask.read; this.mask.read = this.mask.write; this.mask.write = u; this.uniform.value = this.mask.read.texture; };
    this.mask.swap(); this.aspect = 1;
    this.mouse = new THREE.Vector2(); this.velocity = new THREE.Vector2(); this.mouse2 = new THREE.Vector2(); this.velocity2 = new THREE.Vector2();
    const m = new THREE.RawShaderMaterial({ vertexShader: x_e, fragmentShader: b_e, depthTest: false, uniforms: { tMap: this.uniform, uFalloff: { value: falloff * 0.5 }, uAlpha: { value: alpha },
      uDissipation: { value: dissipation }, uDeltaMult: { value: 1 }, tNoise, uTime, uAspect: { value: 1 }, uMouse: { value: this.mouse }, uVelocity: { value: this.velocity },
      uMouse2: { value: this.mouse2 }, uVelocity2: { value: this.velocity2 }, uOffset: { value: 0 } } });
    this.mesh = new THREE.Mesh(new Vy(), m); this.mesh.frustumCulled = false; this.scene.add(this.mesh);
  }
  setFalloff(e) { this.mesh.material.uniforms.uFalloff.value = e * 0.5; } setDissipation(e) { this.mesh.material.uniforms.uDissipation.value = e; } setAlpha(e) { this.mesh.material.uniforms.uAlpha.value = e; }
  update(off = 0) { const u = this.mesh.material.uniforms; u.uAspect.value = this.aspect; u.uOffset.value = off; const t = this.renderer.getRenderTarget(); this.renderer.setRenderTarget(this.mask.write); this.renderer.render(this.scene, this.camera); this.renderer.setRenderTarget(t); this.mask.swap(); }
  tick(ms) { this.mesh.material.uniforms.uDeltaMult.value = Math.min(ms, 32) / 16; }
}

// ---------------------------------------------------------------- global fluid simulation (bundle v8, shaders verbatim)
const ql = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;
void main () {
	vUv = uv;
	vL = vUv - vec2(texelSize.x, 0.0);
	vR = vUv + vec2(texelSize.x, 0.0);
	vT = vUv + vec2(0.0, texelSize.y);
	vB = vUv - vec2(0.0, texelSize.y);
	gl_Position = vec4(position, 0, 1);
}
`;
const Kde = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () {
	gl_FragColor = value * texture2D(uTexture, vUv);
}
`;
const Xde = `
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
	vec2 p = vUv - point.xy;
	p.x *= aspectRatio;
	vec3 splat = exp(-dot(p, p) / radius) * color;
	vec3 base = texture2D(uTarget, vUv).xyz;
	gl_FragColor = vec4(base + splat, 1.0);
}
`;
const Jde = `
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main () {
	vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
	gl_FragColor = dissipation * texture2D(uSource, coord);
	gl_FragColor.a = 1.0;
}
`;
const Zde = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
	float L = texture2D(uVelocity, vL).x;
	float R = texture2D(uVelocity, vR).x;
	float T = texture2D(uVelocity, vT).y;
	float B = texture2D(uVelocity, vB).y;
	vec2 C = texture2D(uVelocity, vUv).xy;
	if (vL.x < 0.0) { L = -C.x; }
	if (vR.x > 1.0) { R = -C.x; }
	if (vT.y > 1.0) { T = -C.y; }
	if (vB.y < 0.0) { B = -C.y; }
	float div = 0.5 * (R - L + T - B);
	gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`;
const efe = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
	float L = texture2D(uVelocity, vL).y;
	float R = texture2D(uVelocity, vR).y;
	float T = texture2D(uVelocity, vT).x;
	float B = texture2D(uVelocity, vB).x;
	float vorticity = R - L - T + B;
	gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
`;
const tfe = `
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
	float L = texture2D(uCurl, vL).x;
	float R = texture2D(uCurl, vR).x;
	float T = texture2D(uCurl, vT).x;
	float B = texture2D(uCurl, vB).x;
	float C = texture2D(uCurl, vUv).x;
	vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
	force /= length(force) + 0.0001;
	force *= curl * C;
	force.y *= -1.0;
	vec2 vel = texture2D(uVelocity, vUv).xy;
	gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
}
`;
const nfe = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
	float L = texture2D(uPressure, vL).x;
	float R = texture2D(uPressure, vR).x;
	float T = texture2D(uPressure, vT).x;
	float B = texture2D(uPressure, vB).x;
	float C = texture2D(uPressure, vUv).x;
	float divergence = texture2D(uDivergence, vUv).x;
	float pressure = (L + R + B + T - divergence) * 0.25;
	gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`;
const ife = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
	float L = texture2D(uPressure, vL).x;
	float R = texture2D(uPressure, vR).x;
	float T = texture2D(uPressure, vT).x;
	float B = texture2D(uPressure, vB).x;
	vec2 velocity = texture2D(uVelocity, vUv).xy;
	velocity.xy -= vec2(R - L, T - B);
	gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`;
class Fluid {
  constructor(e, t) {
    const o = new THREE.Camera(), a = new THREE.Color(1, 1, 1); this.uniform = { value: null }; this.queue = [];
    const pair = (w, h, opt) => { const s = { read: new THREE.WebGLRenderTarget(w, h, opt), write: new THREE.WebGLRenderTarget(w, h, opt) }; s.swap = () => { const x = s.read; s.read = s.write; s.write = x; }; return s; };
    const c = 128, h = 512, u = 3, d = { value: new THREE.Vector2(1 / c, 1 / c) };
    const gl2 = e.capabilities.isWebGL2, p = THREE.RGBAFormat, m = gl2 ? THREE.RGFormat : THREE.RGBAFormat, _ = gl2 ? THREE.RedFormat : THREE.RGBAFormat;
    const base = { type: THREE.HalfFloatType, depthBuffer: false };
    const A = pair(h, h, { ...base, format: p, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
    const v = pair(c, c, { ...base, format: m, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
    const x = pair(c, c, { ...base, format: _, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    const w = new THREE.WebGLRenderTarget(c, c, { ...base, format: _, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    const E = new THREE.WebGLRenderTarget(c, c, { ...base, format: _, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    const S = new Vy();
    const pass = (fs, uniforms) => { const mesh = new THREE.Mesh(S, new THREE.RawShaderMaterial({ vertexShader: ql, fragmentShader: fs, uniforms: { texelSize: d, ...uniforms }, depthTest: false, depthWrite: false })); mesh.scene = new THREE.Scene(); mesh.scene.add(mesh); mesh.frustumCulled = false; return mesh; };
    const M = pass(Kde, { uTexture: { value: null }, value: { value: 1 } });
    const P = pass(Xde, { uTarget: { value: null }, aspectRatio: { value: 1 }, color: { value: new THREE.Vector3() }, point: { value: new THREE.Vector2() }, radius: { value: 1 } });
    const R = pass(Jde, { dyeTexelSize: { value: new THREE.Vector2(1 / h, 1 / h) }, uVelocity: { value: null }, uSource: { value: null }, dt: { value: 0.016 }, dissipation: { value: 1 } });
    const I = pass(Zde, { uVelocity: { value: null } });
    const B = pass(efe, { uVelocity: { value: null } });
    const W = pass(tfe, { uVelocity: { value: null }, uCurl: { value: null }, curl: { value: 5 }, dt: { value: 0.016 } });
    const O = pass(nfe, { uPressure: { value: null }, uDivergence: { value: null } });
    const G = pass(ife, { uPressure: { value: null }, uVelocity: { value: null } });
    const Kp = new THREE.Vector2(); let init = false;
    const Y = (ev) => { const co = ev.getCoalescedEvents && ev.getCoalescedEvents(); if (co && co.length > 1) { co.forEach(Y); return; }
      let X = ev.clientX, Yy = ev.clientY; if (!init) { init = true; Kp.set(X, Yy); }
      let dx = X - Kp.x, dy = Yy - Kp.y; const ce = 20; if (dx) dx /= Math.max(1, Math.abs(dx) / ce); if (dy) dy /= Math.max(1, Math.abs(dy) / ce);
      Kp.set(X, Yy); if (Math.abs(dx) || Math.abs(dy)) this.queue.push({ x: X / innerWidth, y: 1 - Yy / innerHeight, dx: dx * 5, dy: dy * -5 }); };
    addEventListener('pointermove', Y, false);
    const splat = ({ x: X, y: Yy, dx, dy }) => {
      P.material.uniforms.uTarget.value = v.read.texture; P.material.uniforms.aspectRatio.value = innerWidth / innerHeight; P.material.uniforms.point.value.set(X, Yy); P.material.uniforms.color.value.set(dx, dy, 1);
      const ce = mapClamp(Math.sqrt(dx * dx + dy * dy), [t.velocityRange.min, t.velocityRange.max], [0, 2]); P.material.uniforms.radius.value = t.radius / 100 * Math.max(ce, 0);
      e.setRenderTarget(v.write); e.render(P.scene, o); v.swap(); P.material.uniforms.uTarget.value = A.read.texture; e.setRenderTarget(A.write); e.render(P.scene, o); A.swap(); };
    this.tick = () => {
      const ac = e.autoClear, cc = new THREE.Color(); e.getClearColor(cc); const ca = e.getClearAlpha(); e.setClearColor(a, 1); e.autoClear = false;
      for (let i = this.queue.length - 1; i >= 0; i--) splat(this.queue.splice(i, 1)[0]);
      B.material.uniforms.uVelocity.value = v.read.texture; e.setRenderTarget(E); e.render(B.scene, o);
      W.material.uniforms.uVelocity.value = v.read.texture; W.material.uniforms.uCurl.value = E.texture; W.material.uniforms.curl.value = t.curlStrength; e.setRenderTarget(v.write); e.render(W.scene, o); v.swap();
      I.material.uniforms.uVelocity.value = v.read.texture; e.setRenderTarget(w); e.render(I.scene, o);
      M.material.uniforms.uTexture.value = x.read.texture; M.material.uniforms.value.value = t.pressureDissipation; e.setRenderTarget(x.write); e.render(M.scene, o); x.swap();
      O.material.uniforms.uDivergence.value = w.texture;
      for (let i = 0; i < u; i++) { O.material.uniforms.uPressure.value = x.read.texture; e.setRenderTarget(x.write); e.render(O.scene, o); x.swap(); }
      G.material.uniforms.uPressure.value = x.read.texture; G.material.uniforms.uVelocity.value = v.read.texture; e.setRenderTarget(v.write); e.render(G.scene, o); v.swap();
      R.material.uniforms.dyeTexelSize.value.set(1 / c, 1 / c); R.material.uniforms.uVelocity.value = v.read.texture; R.material.uniforms.uSource.value = v.read.texture; R.material.uniforms.dissipation.value = t.velocityDissipation; e.setRenderTarget(v.write); e.render(R.scene, o); v.swap();
      R.material.uniforms.dyeTexelSize.value.set(1 / h, 1 / h); R.material.uniforms.uVelocity.value = v.read.texture; R.material.uniforms.uSource.value = A.read.texture; R.material.uniforms.dissipation.value = t.densityDissipation; e.setRenderTarget(A.write); e.render(R.scene, o); A.swap();
      this.uniform.value = A.read.texture; e.autoClear = ac; e.setClearColor(cc, ca); e.setRenderTarget(null);
    };
  }
}

// ---------------------------------------------------------------- relief shaders (bundle C_e / S_e / T_e / I_e, verbatim except the
// one marked AUSTIN switch: Austin's baked levels are stored as plain values, so the sRGB re-encode is skipped for them)
const C_e = `precision highp float;
#define GLSLIFY 1
uniform float uTime;uniform vec2 uResolution;uniform sampler2D tMaskNoise;uniform sampler2D tFlow;uniform sampler2D tBake1;uniform sampler2D tBake2;uniform sampler2D tPlaster;uniform float uScreenScroll;uniform float uTextureStrength;uniform float uGradientStrength;uniform float uOpacity;uniform float uSwitchColorTransition;uniform float uSwitchColorFastScroll;uniform float uFastScroll;uniform sampler2D tFluidFlowmap;uniform float uBrightnessFactor;uniform float uBrightnessOffset;varying vec2 vUv;varying vec3 vNormal;varying vec3 vPos;varying vec3 vEye;vec4 sRGBTransferOETF(in vec4 value){
#ifdef AUSTIN_LINEAR_BAKE
return value;
#else
return vec4(mix(pow(value.rgb,vec3(0.41666))*1.055-vec3(0.055),value.rgb*12.92,vec3(lessThanEqual(value.rgb,vec3(0.0031308)))),value.a);
#endif
}float circularIn(float t){return 1.0-sqrt(1.0-t*t);}vec2 getFastScrollNoise(float time,vec2 screenUv,sampler2D noiseTexture,vec4 params){float speed=params.x;float noiseSize=params.y;vec2 mask=params.zw;float t=time*speed;vec2 uvFastScrollNoise=screenUv/noiseSize+t*0.007;vec2 uvFastScrollNoise2=screenUv/noiseSize-t*0.007;vec3 fastScrollNoise=texture2D(noiseTexture,uvFastScrollNoise).rgb;vec3 fastScrollNoise2=texture2D(noiseTexture,uvFastScrollNoise2).rgb;fastScrollNoise=(fastScrollNoise+fastScrollNoise2)/2.;vec3 colorDot=vec3(sin(vec3(t,t+1.047,t+2.094)));float colorAvg=(abs(colorDot.r)+abs(colorDot.g)+abs(colorDot.b))/3.;colorDot/=colorAvg;vec3 colorDot2=vec3(sin(vec3(t+1.047,t+2.094,t)));float colorAvg2=(abs(colorDot2.r)+abs(colorDot2.g)+abs(colorDot2.b))/3.;colorDot2/=colorAvg2;float fastScrollExtrude=smoothstep(mask.x,mask.y,dot(normalize(fastScrollNoise-0.5),colorDot));float fastScrollExtrude2=smoothstep(mask.x,mask.y,dot(normalize(fastScrollNoise-0.5),colorDot2));return vec2(circularIn(fastScrollExtrude),circularIn(fastScrollExtrude2));}struct FluidEffectConfig{float amplitude;float shadowStrength;float fluidMagnitude;float fluidRedCoef;float fluidGreenCoef;float fluidBlueCoef;float linesSpeed;float linesScale;float linesStrength;float linesWaveLength;vec3 baseColor;float baseThreshold;float hueShift;float colorRange;};float cremap(float value,float start1,float stop1,float start2,float stop2){float r=start2+(stop2-start2)*((value-start1)/(stop1-start1));return clamp(r,min(start2,stop2),max(start2,stop2));}vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 applyFluidEffect(FluidEffectConfig config,vec3 color,vec4 fluid,vec2 uv,float time,float mask,vec3 normal){float rgbVel=(fluid.r+fluid.g)*0.005*4.;vec3 rgbCoef=vec3(config.fluidRedCoef,config.fluidGreenCoef,config.fluidBlueCoef);vec3 aberrationColor=vec3(sin(rgbVel*rgbCoef));float fluidEdges=smoothstep(0.0,1.0,fluid.b*config.fluidMagnitude);vec2 uvLines=uv+time*0.01*config.linesSpeed;uvLines.x=uvLines.x*1000.0/config.linesScale;uvLines.y=sin(uvLines.y*50.0*config.linesWaveLength)*20.0/config.linesScale;float lines=smoothstep(-1.0,0.5,sin(uvLines.x+uvLines.y));lines=mix(1.0,lines,config.linesStrength);vec3 normalVector=normal;normalVector.z*=config.colorRange;normalVector=normalize(normalVector);vec3 normalColor=(normalVector+1.)/2.;normalColor=rgb2hsv(normalColor);normalColor.r=fract(normalColor.r+config.hueShift);normalColor=hsv2rgb(normalColor);vec3 effectColor=normalColor;color=mix(color,effectColor,mask*fluidEdges*lines*config.amplitude);
#if SHOW_EFFECT_FLUID
color=vec3(fluidEdges);
#endif
#if SHOW_EFFECT_COLORS
color=mix(vec3(1.),effectColor,fluidEdges*config.amplitude);
#endif
#if SHOW_EFFECT_LINES
color=vec3(lines);
#endif
return color;}const FluidEffectConfig effectConfig=FluidEffectConfig(EFFECT_AMPLITUDE,EFFECT_SHADOW_STRENGTH,EFFECT_FLUID_MAGNITUDE,EFFECT_FLUID_RED_COEF,EFFECT_FLUID_GREEN_COEF,EFFECT_FLUID_BLUE_COEF,EFFECT_LINES_SPEED,EFFECT_LINES_SCALE,EFFECT_LINES_STRENGTH,EFFECT_LINES_WAVE_LENGTH,EFFECT_BASE_COLOR,EFFECT_BASE_THRESHOLD,EFFECT_HUE_SHIFT,EFFECT_COLOR_RANGE);vec3 ContrastSaturationBrightness(vec3 color,float brt,float sat,float con){const float AvgLumR=0.5;const float AvgLumG=0.5;const float AvgLumB=0.5;const vec3 LumCoeff=vec3(0.2125,0.7154,0.0721);vec3 AvgLumin=vec3(AvgLumR,AvgLumG,AvgLumB);vec3 brtColor=color*brt;vec3 intensity=vec3(dot(brtColor,LumCoeff));vec3 satColor=mix(intensity,brtColor,sat);vec3 conColor=mix(AvgLumin,satColor,con);return conColor;}void main(){vec3 color=vec3(0);float alpha=1.0;vec2 uvScreen=gl_FragCoord.xy/uResolution;vec4 flow=texture2D(tFlow,uvScreen)*2.;float extrude=mix(flow.b,flow.a,0.5);vec2 fastScrollNoise=getFastScrollNoise(uTime,uvScreen+vec2(0.,-uScreenScroll),tMaskNoise,vec4(SCROLL_EXTRUDE_SPEED,SCROLL_EXTRUDE_NOISE_SIZE,SCROLL_EXTRUDE_MASK));float fastScrollExtrude=fastScrollNoise.r*SCROLL_EXTRUDE_STRENGTH;extrude=mix(extrude,fastScrollExtrude,uFastScroll)*uOpacity;float gradient=mix(1.0,0.5,length(uvScreen-vec2(0.0,0.8)));vec3 bake1=sRGBTransferOETF(texture2D(tBake1,vUv)).rgb;vec3 bake2=sRGBTransferOETF(texture2D(tBake2,vUv)).rgb;float level0=bake2.b;float level1=bake2.g;float level2=bake2.r;float level3=bake1.b;float level4=bake1.g;float level5=bake1.r;float o=level0;o=0.54504;o=mix(o,level1,smoothstep(0.0,0.2,extrude));o=mix(o,level2,smoothstep(0.2,0.4,extrude));o=mix(o,level3,smoothstep(0.4,0.6,extrude));o=mix(o,level4,smoothstep(0.6,0.8,extrude));o=mix(o,level5,smoothstep(0.8,1.0,extrude));color+=vec3(o);vec2 uvPlaster=vPos.xy/10.0;float plaster=texture2D(tPlaster,uvPlaster).g;
#ifdef AUSTIN_WHITE
float edge=smoothstep(0.0,0.04,vUv.x)*smoothstep(1.0,0.96,vUv.x);o=mix(0.54504,o,edge);color=vec3(o);float rel=clamp(abs(o-0.54504)*6.0,0.0,1.0);color=mix(color,color*plaster,uTextureStrength*rel);color+=(gradient-1.0)*0.7*uGradientStrength*rel;color=color*uBrightnessFactor+(1.0-0.54504*uBrightnessFactor);
#else
color=mix(color,color*plaster,uTextureStrength);color+=gradient*0.7*uGradientStrength;color=color*uBrightnessFactor+uBrightnessOffset;
#endif
vec3 dFdxPos=dFdx(vEye);vec3 dFdyPos=dFdy(vEye);vec3 normal=normalize(cross(dFdxPos,dFdyPos));float fresnelFactor=abs(dot(normal,vec3(0.,0.,1.)));float inversefresnelFactor=1.0-fresnelFactor;inversefresnelFactor=1.-pow(inversefresnelFactor,CHROMATIC_FRESNEL_SHARPNESS);float waveMask=max(smoothstep(1.,0.1,mix(inversefresnelFactor,1.,1.-CHROMATIC_FRESNEL_OPACITY)),smoothstep(CHROMATIC_SHADOW_RANGE.y,CHROMATIC_SHADOW_RANGE.x,level5)*CHROMATIC_SHADOW_OPACITY)*uOpacity;vec4 fluid=texture2D(tFluidFlowmap,uvScreen);fluid+=mix(0.,fastScrollNoise.g*2.,uFastScroll);color=applyFluidEffect(effectConfig,color,fluid,vUv,uTime,waveMask,normal);vec3 fastModeColor=ContrastSaturationBrightness(color,2.,1.,0.08);fastModeColor+=0.3;
#ifdef AUSTIN_WHITE
fastModeColor=color;
#endif
vec3 whiteRender=mix(color,fastModeColor,uFastScroll);float blackFluidR=pow(o*(length(fluid)*0.0003)+o,5.5);float blackFluidG=pow(o*(length(fluid)*0.0003)+o,5.5);float blackFluidB=pow(o*(length(fluid)*0.0003)+o,5.5);vec3 blackRender=vec3(blackFluidR,blackFluidG,blackFluidB);color=mix(whiteRender,blackRender,uSwitchColorTransition);gl_FragColor.rgb=color;gl_FragColor.a=alpha;}`;
const S_e = `#define GLSLIFY 1
uniform sampler2D tFlow;uniform sampler2D tMaskNoise;uniform float uTime;uniform float uAspect;uniform float uScreenScroll;uniform float uScrollSpeed;uniform float uFastScroll;uniform float uOpacity;varying vec2 vUv;varying vec3 vNormal;varying vec3 vPos;varying vec3 vEye;float circularIn(float t){return 1.0-sqrt(1.0-t*t);}vec2 getFastScrollNoise(float time,vec2 screenUv,sampler2D noiseTexture,vec4 params){float speed=params.x;float noiseSize=params.y;vec2 mask=params.zw;float t=time*speed;vec2 uvFastScrollNoise=screenUv/noiseSize+t*0.007;vec2 uvFastScrollNoise2=screenUv/noiseSize-t*0.007;vec3 fastScrollNoise=texture2D(noiseTexture,uvFastScrollNoise).rgb;vec3 fastScrollNoise2=texture2D(noiseTexture,uvFastScrollNoise2).rgb;fastScrollNoise=(fastScrollNoise+fastScrollNoise2)/2.;vec3 colorDot=vec3(sin(vec3(t,t+1.047,t+2.094)));float colorAvg=(abs(colorDot.r)+abs(colorDot.g)+abs(colorDot.b))/3.;colorDot/=colorAvg;vec3 colorDot2=vec3(sin(vec3(t+1.047,t+2.094,t)));float colorAvg2=(abs(colorDot2.r)+abs(colorDot2.g)+abs(colorDot2.b))/3.;colorDot2/=colorAvg2;float fastScrollExtrude=smoothstep(mask.x,mask.y,dot(normalize(fastScrollNoise-0.5),colorDot));float fastScrollExtrude2=smoothstep(mask.x,mask.y,dot(normalize(fastScrollNoise-0.5),colorDot2));return vec2(circularIn(fastScrollExtrude),circularIn(fastScrollExtrude2));}vec2 rotate2d(vec2 v,float a){float c=cos(a);float s=sin(a);return mat2(c,-s,s,c)*v;}void main(){vUv=uv;vPos=position;vNormal=normalize(normalMatrix*normal);vec4 pos=vec4(position,1.0);vec4 ndc=projectionMatrix*modelViewMatrix*pos;vec2 uvScreen=(ndc.xy/ndc.w+1.0)/2.0;vec4 flow=texture2D(tFlow,uvScreen);float extrude=mix(flow.b,flow.a,0.5);vec2 fastScrollNoise=getFastScrollNoise(uTime,uvScreen+vec2(0.,-uScreenScroll),tMaskNoise,vec4(SCROLL_EXTRUDE_SPEED,SCROLL_EXTRUDE_NOISE_SIZE,SCROLL_EXTRUDE_MASK));float fastScrollExtrude=fastScrollNoise.r*SCROLL_EXTRUDE_STRENGTH;extrude=mix(extrude,fastScrollExtrude,uFastScroll)*uOpacity;pos.z*=mix(0.05,1.0,extrude);pos.xy*=1.004;vec4 mPos=modelMatrix*pos;vec3 center=vec3(0);float deformStrength=5.5*min(1.0,abs(uScrollSpeed));vec2 deformDiff=mPos.xy-center.xy;vec3 deformOrigin=center+vec3(0.0,0.0,0.0);mPos.xyz-=deformOrigin;float deformY=max(-1.0,min(1.0,deformDiff.x*deformStrength));mPos.xyz+=deformOrigin;vec4 mvPos=viewMatrix*mPos;vEye=(modelMatrix*vec4(position,1.)).xyz-cameraPosition;gl_Position=projectionMatrix*mvPos;}`;
const T_e = `precision highp float;
#define GLSLIFY 1
#define PI 3.141592653589793
varying vec2 vUv;uniform float uGradientStrength;uniform sampler2D tPlaster;uniform float uTextureStrength;highp float rand(const in vec2 uv){const highp float a=12.9898,b=78.233,c=43758.5453;highp float dt=dot(uv.xy,vec2(a,b)),sn=mod(dt,PI);return fract(sin(sn)*c);}void main(){vec3 color=vec3(0);float alpha=1.0;
#ifdef AUSTIN_WHITE
gl_FragColor=vec4(1.0);return;
#endif
color+=vec3(0.54504);vec2 uvPlaster=vUv/1.0;float plaster=texture2D(tPlaster,uvPlaster).g;color=mix(color,color*plaster,uTextureStrength);vec2 uv=vUv+rand(vUv)*0.01;float gradient=mix(1.0,0.5,length(uv-vec2(0.0,0.8)));color+=gradient*0.7*uGradientStrength;color=color*0.6+0.4;gl_FragColor.rgb=color;gl_FragColor.a=alpha;}`;
const I_e = `#define GLSLIFY 1
attribute vec2 uv;attribute vec3 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1);}`;

// config values injected as #defines (bundle helper `tr`): numbers as floats, {min,max} as vec2, {r,g,b} as vec3 /255
const fl = (n) => { const s = String(+n); return /[.e]/.test(s) ? s : s + '.0'; };
const def = (v) => (typeof v === 'number' ? fl(v) : 'r' in v ? `vec3(${fl(v.r / 255)},${fl(v.g / 255)},${fl(v.b / 255)})` : `vec2(${fl(v.min)},${fl(v.max)})`);

// ---------------------------------------------------------------- assets
const b64bytes = (s) => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; };
const loadImg = (b64, mime) => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = `data:${mime};base64,${b64}`; });
async function gunzip(b64) { const s = new Blob([b64bytes(b64)]).stream().pipeThrough(new DecompressionStream('gzip')); return new Uint8Array(await new Response(s).arrayBuffer()); }
function tex(im, { srgb = false, wrap = THREE.RepeatWrapping, flipY = false } = {}) {
  const t = new THREE.Texture(im); t.wrapS = t.wrapT = wrap; t.flipY = flipY; if (srgb) t.encoding = THREE.sRGBEncoding; t.needsUpdate = true; return t;
}

// ---------------------------------------------------------------- the background
export async function start(W) {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches; if (RM) return null;     // standing rule: reduced motion keeps the page still
  const mobile = matchMedia('(pointer: coarse)').matches && !matchMedia('(pointer: fine)').matches;
  const isIG = W.kind === 'ig';
  const cv = document.createElement('canvas'); cv.className = 'world world2'; cv.setAttribute('aria-hidden', 'true'); document.body.prepend(cv);
  let renderer; try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: false, alpha: false, powerPreference: 'high-performance' }); } catch (e) { cv.remove(); return null; }
  const dpr = Math.min(devicePixelRatio || 1, 2); renderer.setPixelRatio(dpr); renderer.setClearColor(K.renderer.clearColor, 1);
  const cfg = K.relief;

  // shared uniforms (D_e.createReliefScene)
  const U = { uResolution: { value: new THREE.Vector2() }, uAspect: { value: 1 }, uDPR: { value: dpr }, uTime: { value: 0 }, uScroll: { value: 0 }, uScreenScroll: { value: 0 }, uScrollSpeed: { value: 0 },
    uTransition: { value: 0 }, uTextureStrength: { value: cfg.extrude.textureStrength }, uGradientStrength: { value: cfg.extrude.gradientStrength }, uFastScroll: { value: 0 }, uSwitchColorFastScroll: { value: 0 },
    uOpacity: { value: 1 }, uSwitchColorTransition: { value: 0 } };
  const [plasterIm, maskIm, attIm] = await Promise.all([loadImg(W.plaster[0], W.plaster[1]), loadImg(W.maskNoise[0], W.maskNoise[1]), loadImg(W.att[0], W.att[1])]);
  const tPlaster = { value: tex(plasterIm) }, tMaskNoise = { value: tex(maskIm) }, tAtt = { value: tex(attIm, { wrap: THREE.MirroredRepeatWrapping }) };

  const flowmap = new Flowmap(renderer, { tNoise: tMaskNoise, uTime: U.uTime });
  flowmap.setDissipation(cfg.flowmap.dissipation); flowmap.setFalloff(cfg.flowmap.falloff); flowmap.setAlpha(cfg.flowmap.alpha);
  const fluidOn = isIG && !mobile;                                // desktop only (Uo.deviceConfig); Austin worlds: off, the sheen is colour
  const fluid = fluidOn ? new Fluid(renderer, K.fluidFlowmap) : null;
  const black = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1); black.needsUpdate = true;
  const tFluid = { value: black };

  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(cfg.camera.fov, 1, cfg.camera.near, cfg.camera.far); camera.position.z = cfg.camera.distance;
  // the background plane (renderOrder -1, no depth): same base grey as level 0
  { const s = new THREE.Mesh(new Vy(), new THREE.RawShaderMaterial({ vertexShader: I_e, fragmentShader: T_e, uniforms: { uGradientStrength: U.uGradientStrength, tPlaster, uTextureStrength: U.uTextureStrength }, depthWrite: false, depthTest: false }));
    if (!isIG) s.material.defines = { AUSTIN_WHITE: 1 };
    s.frustumCulled = false; s.renderOrder = -1; scene.add(s); }

  const defines = { SHOW_EFFECT_FLUID: 0, SHOW_EFFECT_COLORS: 0, SHOW_EFFECT_LINES: 0,
    EFFECT_AMPLITUDE: def(fluidOn ? cfg.fluidEffect.amplitude : 0), EFFECT_SHADOW_STRENGTH: def(cfg.fluidEffect.shadowStrength), EFFECT_FLUID_MAGNITUDE: def(cfg.fluidEffect.fluidMagnitude),
    EFFECT_FLUID_RED_COEF: def(cfg.fluidEffect.fluidRedCoef), EFFECT_FLUID_GREEN_COEF: def(cfg.fluidEffect.fluidGreenCoef), EFFECT_FLUID_BLUE_COEF: def(cfg.fluidEffect.fluidBlueCoef),
    EFFECT_LINES_SPEED: def(cfg.fluidEffect.linesSpeed), EFFECT_LINES_SCALE: def(cfg.fluidEffect.linesScale), EFFECT_LINES_STRENGTH: def(cfg.fluidEffect.linesStrength), EFFECT_LINES_WAVE_LENGTH: def(cfg.fluidEffect.linesWaveLength),
    EFFECT_BASE_COLOR: def(cfg.fluidEffect.baseColor), EFFECT_BASE_THRESHOLD: def(cfg.fluidEffect.baseThreshold), EFFECT_HUE_SHIFT: def(cfg.fluidEffect.hueShift), EFFECT_COLOR_RANGE: def(cfg.fluidEffect.colorRange),
    CHROMATIC_FRESNEL_SHARPNESS: def(cfg.chromaticMask.fresnelSharpness), CHROMATIC_FRESNEL_OPACITY: def(cfg.chromaticMask.fresnelOpacity), CHROMATIC_SHADOW_RANGE: def(cfg.chromaticMask.shadowRange), CHROMATIC_SHADOW_OPACITY: def(cfg.chromaticMask.shadowOpacity),
    SCROLL_EXTRUDE_NOISE_SIZE: def(cfg.scrollExtrude.noiseSize), SCROLL_EXTRUDE_SPEED: def(cfg.scrollExtrude.speed), SCROLL_EXTRUDE_MASK: def(cfg.scrollExtrude.mask), SCROLL_EXTRUDE_STRENGTH: def(cfg.scrollExtrude.strength) };
  if (!isIG) { defines.AUSTIN_LINEAR_BAKE = 1; defines.AUSTIN_WHITE = 1; }
  const material = (bake1, bake2) => new THREE.ShaderMaterial({ vertexShader: S_e, fragmentShader: C_e, defines: { ...defines }, extensions: { derivatives: true },
    uniforms: { ...U, tMaskNoise: tAtt, tFlow: flowmap.uniform, tPlaster, tFluidFlowmap: tFluid, uBrightnessFactor: { value: isIG ? (mobile ? 0.5 : 0.6) : 0.75 }, uBrightnessOffset: { value: mobile ? 0.6 : 0.4 },
      tBake1: { value: bake1 }, tBake2: { value: bake2 } } });

  // the sections: IG's six panels from their model, or Austin's panels built from height maps
  const sections = []; let sectionsPerLine = 1;
  if (isIG) {
    const raw = await gunzip(W.geo); const meta = W.meta;
    const ims = await Promise.all(W.tex.map((t) => loadImg(t, 'image/webp'))); const texs = ims.map((im) => tex(im, { srgb: true }));
    const rows = [];
    meta.meshes.forEach((m) => {
      const g = new THREE.BufferGeometry(); const q = new Uint16Array(raw.buffer, m.o, m.n * 3), qu = new Uint16Array(raw.buffer, m.o2, m.n * 2);
      const P = new Float32Array(m.n * 3), UV = new Float32Array(m.n * 2);
      for (let i = 0; i < m.n; i++) for (let k = 0; k < 3; k++) P[i * 3 + k] = m.min[k] + q[i * 3 + k] / 65535 * (m.max[k] - m.min[k]);
      for (let i = 0; i < m.n; i++) for (let k = 0; k < 2; k++) UV[i * 2 + k] = m.uvmin[k] + qu[i * 2 + k] / 65535 * (m.uvmax[k] - m.uvmin[k]);
      g.setAttribute('position', new THREE.BufferAttribute(P, 3)); g.setAttribute('uv', new THREE.BufferAttribute(UV, 2));
      g.setIndex(new THREE.BufferAttribute(m.i32 ? new Uint32Array(raw.buffer, m.o3, m.tri * 3) : new Uint16Array(raw.buffer, m.o3, m.tri * 3), 1));
      const mesh = new THREE.Mesh(g, material(texs[meta.textures[m.map]], texs[meta.textures[m.emis]])); mesh.position.set(...m.t); mesh.frustumCulled = false;
      const a = Math.round(m.t[1]); if (!rows.includes(a)) rows.push(a); mesh.renderOrder = rows.indexOf(a); sections.push(mesh); scene.add(mesh);
    });
  } else {
    const MX = W.mx, MY = W.my, PWU = 13.2, PHU = Hv;
    const cvs = document.createElement('canvas'); const ctx = cvs.getContext('2d', { willReadFrequently: true });
    const read = (im, w, h) => { cvs.width = w; cvs.height = h; ctx.drawImage(im, 0, 0, w, h); return ctx.getImageData(0, 0, w, h).data; };
    // one shared index buffer for the grid
    const idx = new Uint16Array((MX - 1) * (MY - 1) * 6); let k = 0;
    for (let y = 0; y < MY - 1; y++) for (let x = 0; x < MX - 1; x++) { const a = y * MX + x; idx[k++] = a; idx[k++] = a + MX; idx[k++] = a + 1; idx[k++] = a + 1; idx[k++] = a + MX; idx[k++] = a + MX + 1; }
    const index = new THREE.BufferAttribute(idx, 1);
    for (let p = 0; p < W.panels.length; p++) {
      const pan = W.panels[p];
      const [hIm, ...L] = await Promise.all([loadImg(pan.h, 'image/webp'), ...pan.l.map((s) => loadImg(s, 'image/webp'))]);
      const hd = read(hIm, MX, MY), P = new Float32Array(MX * MY * 3), UV = new Float32Array(MX * MY * 2);
      for (let y = 0; y < MY; y++) for (let x = 0; x < MX; x++) { const i = y * MX + x, u = x / (MX - 1), v = y / (MY - 1);
        P[i * 3] = (u - 0.5) * PWU; P[i * 3 + 1] = (0.5 - v) * PHU; P[i * 3 + 2] = hd[i * 4] / 255 * W.depth; UV[i * 2] = u; UV[i * 2 + 1] = v; }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(P, 3)); g.setAttribute('uv', new THREE.BufferAttribute(UV, 2)); g.setIndex(index);
      // pack the five levels (+ height in level 0's slot) into two RGB textures, as IG packs theirs: bake1 = (l5,l4,l3), bake2 = (l2,l1,h)
      const w = L[0].naturalWidth, h = L[0].naturalHeight, ch = [hIm, ...L].map((im) => read(im, w, h));
      const pack = (r, gg, b) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); const id = x.createImageData(w, h);
        for (let i = 0; i < w * h; i++) { id.data[i * 4] = r[i * 4]; id.data[i * 4 + 1] = gg[i * 4]; id.data[i * 4 + 2] = b[i * 4]; id.data[i * 4 + 3] = 255; } x.putImageData(id, 0, 0); return c; };
      const t1 = tex(pack(ch[5], ch[4], ch[3]), { wrap: THREE.ClampToEdgeWrapping }), t2 = tex(pack(ch[2], ch[1], ch[0]), { wrap: THREE.ClampToEdgeWrapping });
      const mesh = new THREE.Mesh(g, material(t1, t2)); mesh.position.set(0, -p * Hv, 0); mesh.frustumCulled = false; mesh.renderOrder = p; sections.push(mesh); scene.add(mesh);
    }
  }


  const pointer = new Pointer(isIG);
  const state = { frames: 0, cameraZoom: 1, viewportH: 1, scrollLast: 0, fast: false, fastProgress: 0, lastY: scrollY, smoothY: scrollY };
  const resize = () => {
    const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false);
    U.uResolution.value.set(w * dpr, h * dpr); U.uAspect.value = w / h; flowmap.aspect = w / h; camera.aspect = w / h;
    const a = CB * (Hv - 0.1) / U.uAspect.value, l = cfg.camera.distance; camera.fov = Math.min(cfg.camera.fov, 2 * Math.atan(a / (2 * l)) * 180 / Math.PI); camera.updateProjectionMatrix();
    state.viewportH = 2 * Math.tan(camera.fov * Math.PI / 360) * cfg.camera.distance;   // bundle vl(camera).height at z = 0
  };
  resize(); addEventListener('resize', resize);

  // phantom cursor (D_e.triggerRandomMouseMovement / loopRandomMouseMovement)
  const dirs = (prev) => { const t = prev || new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2); const n = t.angle() + (Math.random() - 0.5) * 2 * Math.PI * 0.8, s = lerp(0.7, 0.9, Math.random()); return { start: t, end: new THREE.Vector2(Math.cos(n) * s, Math.sin(n) * s) }; };
  let phantom = []; let phantomT = 0;
  const loopPhantom = () => {
    flowmap.velocity2.set(1, 1); const n = Math.floor(Math.random() * 3) + 1; let prev = null, t0 = 0; phantom = [];
    for (let i = 0; i < n; i++) { const o = !(i === n - 1) && Math.random() < 0.7, dur = o ? lerp(0.8, 1, Math.random()) : lerp(0.7, 0.8, Math.random()); const d = dirs(prev);
      const ex = rough({ strength: o ? 3 : 2, points: Math.floor(dur * 12), template: o ? 'power2.out' : 'none' }), ey = rough({ strength: o ? 3 : 2, points: Math.floor(dur * 12), template: o ? 'power2.out' : 'none' });
      phantom.push({ t0, dur, d, ex, ey }); t0 += dur; prev = d.end; }
    phantom.end = t0; phantom.rest = lerp(1, 3, Math.random()); phantomT = 0;
  };
  loopPhantom();
  const stepPhantom = (dt) => { phantomT += dt; const s = phantom.find((p) => phantomT >= p.t0 && phantomT < p.t0 + p.dur);
    if (s) { const k = (phantomT - s.t0) / s.dur; flowmap.mouse2.set(lerp(s.d.start.x / 2 + 0.5, s.d.end.x / 2 + 0.5, s.ex(k)), lerp(s.d.start.y / 2 + 0.5, s.d.end.y / 2 + 0.5, s.ey(k))); }
    else if (phantomT >= phantom.end) { flowmap.mouse2.set(-1, -1); if (phantomT >= phantom.end + phantom.rest) loopPhantom(); } };

  // footer switch (F_e._onFooterInViewport): IG's black render under its footer; on for the IG copy only
  const foot = document.querySelector('footer');
  if (isIG && foot && 'IntersectionObserver' in window) new IntersectionObserver((es) => es.forEach((e) => tween(U.uSwitchColorTransition, 'value', e.isIntersecting ? 1 : 0, 1.2, 'sine.inOut'))).observe(foot);

  // fast scroll mode (home scroll component: progress integrator with hysteresis), desktop only
  const scrollSpeedUnit = () => 2.5 / innerHeight;   // see BACKGROUND-CODE-STUDY.md: IG's smooth-scroll speed units, calibrated
  const FIXED = new URLSearchParams(location.search).has('bgfixed');   // test hook: step 1/60 s per frame (gate frames on a slow machine)
  let last = performance.now(), visible = !document.hidden, raf = 0;
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } });
  function frame(now) {
    raf = 0; if (!visible) return;
    if (window.__BG2HOLD) { last = now; raf = requestAnimationFrame(frame); return; }      // test hook: freeze for a screenshot
    const ms = FIXED ? 1000 / 60 : Math.min(100, now - last); last = now; const dt = ms / 1000; state.frames++;
    pointer.tick(ms); flowmap.tick(ms); stepTweens(dt); stepPhantom(dt);
    // smoothed scroll (IG reads its smooth-scroller); speed for the fast-mode integrator
    state.smoothY += (scrollY - state.smoothY) * Math.min(1, 0.12 * ms / 16);
    const speed = Math.abs(scrollY - state.lastY) * scrollSpeedUnit() * (16 / Math.max(1, ms)); state.lastY = scrollY;
    if (!mobile) {
      const fm = K.scroll.fastMode, sm = K.scroll.slowMode; let c = speed - fm.fastOffsetSpeed; c *= c < 0 ? fm.fastFactorSlowDown : fm.fastFactorSpeedUp; let h = speed - sm.slowOffsetSpeed; h *= h < 0 ? sm.slowFactorSlowDown : sm.slowFactorSpeedUp;
      state.fastProgress = scrollY > 0 ? clamp(state.fastProgress + (state.fast ? h : c), 0, 1) : 0;
      if (state.fastProgress >= fm.fastTrigger && !state.fast) { state.fast = true; tween(U.uFastScroll, 'value', 1, 1.25, 'power2.out'); }
      if (state.fastProgress <= sm.slowTrigger && state.fast) { state.fast = false; tween(U.uFastScroll, 'value', 0, 1, 'sine.out'); }
    }
    // D_e.update
    U.uTime.value += dt; U.uScroll.value = -state.smoothY / (innerHeight * dpr) * cfg.scroll.speed;
    scene.position.y = U.uScroll.value * -Hv;
    U.uScreenScroll.value = scene.position.y * cfg.camera.fastModeZoom / state.viewportH;
    const L = sections.length / sectionsPerLine * Hv, half = L * 0.5;
    sections.forEach((o) => { const y = o.position.y + scene.position.y; if (y < -half) o.position.y += L; if (y > half) o.position.y -= L; });
    let sd = U.uScreenScroll.value - state.scrollLast; sd = Math.min(0.2, Math.abs(sd)) * Math.sign(sd); state.scrollLast = U.uScreenScroll.value;
    flowmap.mouse.lerp(pointer.normalFlip, cfg.flowmap.mouseEase); flowmap.velocity.lerp(pointer.velocity, pointer.velocity.length() ? 0.1 : 0.04);
    flowmap.update(-sd); U.uScrollSpeed.value += (sd * 5 - U.uScrollSpeed.value) * 0.04;
    camera.zoom = lerp(cfg.camera.slowModeZoom, cfg.camera.fastModeZoom, U.uFastScroll.value) * state.cameraZoom; camera.updateProjectionMatrix();
    if (fluid) { fluid.tick(); tFluid.value = fluid.uniform.value || black; }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  return { renderer, flowmap, uniforms: U, state, canvas: cv, scene, camera, sections };
}
window.BG2 = { start };

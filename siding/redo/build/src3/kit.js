/* Austin hero kit: a full-screen world made of real siding materials (owner-confirmed essence, 2026-11-03).
   - real profiles: Dutch-lap and bevel boards (extruded cross-sections), board-and-batten, tapered cedar shakes, nails;
   - real material look: procedural fibre-cement cedar grain and cedar streaks as colour + bump, PBR, studio environment
     light (RoomEnvironment), a soft-shadow key light, ACES tone mapping, fog toward the cream page for depth;
   - Pieces: every piece is an instance with a home transform and a spring (S0089: gesture motion is a spring); torn on
     load, assembled in install order, pushed like water by the cursor, repaired when it leaves;
   - RippleWall: the page background is a siding wall whose courses lift and curl along the cursor's trail
     (materials pack "siding ripple trail"; trail points emitted by distance, S1323).
   No allocation in the loops; one InstancedMesh per geometry+material (S0319); everything pauses offscreen/hidden. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export { THREE };
export const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
let seed = 2009;
export const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
export const reseed = (s) => { seed = s; };
export const CREAM = '#F3F1EB';

/* ---------------- stage ---------------- */
export function stage(canvas, { exposure = 1.0, shadow = 2048 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = exposure;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(CREAM, 1);
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8cfbf, 0.55));
  const key = new THREE.DirectionalLight(0xfff1dc, 2.4);
  key.castShadow = true; key.shadow.mapSize.set(shadow, shadow); key.shadow.bias = -0.0004; key.shadow.normalBias = 0.03; key.shadow.radius = 4;
  scene.add(key, key.target);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 600);
  return { renderer, scene, camera, key };
}

/* ---------------- textures ---------------- */
function canvasTex(w, h, draw, srgb, rep = [1, 1]) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; return t;
}
function streaks(g, w, h, n, col, wmin, wmax, wave) {   // grain runs along canvas Y (= along a board's length)
  for (let i = 0; i < n; i++) {
    const x = rnd() * w, a = 0.25 + rnd() * 0.75; g.strokeStyle = col(a); g.lineWidth = wmin + rnd() * (wmax - wmin);
    g.beginPath(); g.moveTo(x, -10); const k = wave * (rnd() - 0.5);
    g.bezierCurveTo(x + k, h * 0.33, x - k, h * 0.66, x + k * 0.5, h + 10); g.stroke();
  }
}
function fibreCement(g, w, h) {      // painted fibre cement with embossed cedar grain: mostly flat, fine grain, speckle
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h);
  streaks(g, w, h, 160, (a) => `rgba(0,0,0,${0.035 * a})`, 0.6, 2.2, 14);
  streaks(g, w, h, 40, (a) => `rgba(255,255,255,${0.5 * a})`, 0.5, 1.4, 10);
  for (let i = 0; i < 2200; i++) { g.fillStyle = `rgba(0,0,0,${0.035 * rnd()})`; g.fillRect(rnd() * w, rnd() * h, 1.2, 1.2); }
}
function cedar(g, w, h) {            // split cedar: warm, streaky, dark grain lines and lighter splits
  const grd = g.createLinearGradient(0, 0, w, 0);
  grd.addColorStop(0, '#9A6236'); grd.addColorStop(0.5, '#AE7444'); grd.addColorStop(1, '#8E5832');
  g.fillStyle = grd; g.fillRect(0, 0, w, h);
  streaks(g, w, h, 90, (a) => `rgba(78,40,18,${0.28 * a})`, 0.8, 3.2, 26);
  streaks(g, w, h, 50, (a) => `rgba(236,178,120,${0.22 * a})`, 0.8, 2.6, 20);
  streaks(g, w, h, 14, (a) => `rgba(60,30,14,${0.35 * a})`, 1.5, 4, 8);
}
function stone(g, w, h) {
  g.fillStyle = '#BDB3A3'; g.fillRect(0, 0, w, h);
  let y = 0; while (y < h) { const rh = 18 + rnd() * 26; let x = -rnd() * 40;
    while (x < w) { const rw = 30 + rnd() * 70; g.fillStyle = `hsl(${32 + rnd() * 10},${10 + rnd() * 10}%,${62 + rnd() * 16}%)`;
      g.fillRect(x + 2, y + 2, rw - 4, rh - 4); x += rw; } y += rh; }
}

export function materials() {
  const fcMap = canvasTex(256, 1024, fibreCement, true, [3, 1]), fcBump = canvasTex(256, 1024, fibreCement, false, [3, 1]);
  const cdMap = canvasTex(256, 512, cedar, true), cdBump = canvasTex(256, 512, cedar, false);
  const stMap = canvasTex(512, 256, stone, true, [3, 1]);
  const S = (o) => new THREE.MeshStandardMaterial(o);
  return {
    blue: S({ color: '#4E7398', map: fcMap, bumpMap: fcBump, bumpScale: 1.4, roughness: 0.6 }),
    cream: S({ color: '#E3D7BC', map: fcMap, bumpMap: fcBump, bumpScale: 1.4, roughness: 0.62 }),
    trim: S({ color: '#F5F2EA', roughness: 0.55 }),
    cedar: S({ color: '#ffffff', map: cdMap, bumpMap: cdBump, bumpScale: 2.2, roughness: 0.78 }),
    nail: S({ color: '#A3A8AD', metalness: 0.9, roughness: 0.3 }),
    glass: S({ color: '#1F2C38', metalness: 0.15, roughness: 0.05, envMapIntensity: 1.6 }),
    door: S({ color: '#2C4D6C', roughness: 0.45 }),
    wrap: S({ color: '#E6E2D8', roughness: 0.92 }),
    deck: S({ color: '#D4C4A2', roughness: 0.9 }),
    stone: S({ color: '#ffffff', map: stMap, roughness: 0.95 }),
    wall: S({ color: '#F4F0E6', map: fcMap, bumpMap: fcBump, bumpScale: 1.0, roughness: 0.7 }),
  };
}

/* ---------------- geometries (unit sizes; origin bottom-centre-back unless noted) ---------------- */
function extrudeX(shape) {   // profile in (thickness, height), extruded along X with unit length, centred on X
  const g = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false, curveSegments: 8 });
  g.rotateY(-Math.PI / 2); g.translate(0.5, 0, 0); g.computeVertexNormals(); return g;
}
export const GEO = {
  dutch: (() => { const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(1, 0); s.lineTo(1, 0.5);
    s.quadraticCurveTo(0.96, 0.66, 0.46, 0.7); s.lineTo(0.3, 0.97); s.lineTo(0.24, 1); s.lineTo(0, 1); s.lineTo(0, 0); return extrudeX(s); })(),
  bevel: (() => { const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(1, 0); s.lineTo(0.92, 0.12); s.lineTo(0.22, 1); s.lineTo(0, 1); s.lineTo(0, 0); return extrudeX(s); })(),
  shake: (() => { const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(1, 0); s.lineTo(0.95, 0.06); s.lineTo(0.25, 1); s.lineTo(0, 1); s.lineTo(0, 0); return extrudeX(s); })(),
  box: new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0.5),
  boxc: new THREE.BoxGeometry(1, 1, 1),
  nail: (() => { const shank = new THREE.CylinderGeometry(0.05, 0.05, 1, 10).translate(0, 0.5, 0);
    const tip = new THREE.ConeGeometry(0.05, 0.12, 10).rotateX(Math.PI).translate(0, -0.06, 0);
    const head = new THREE.CylinderGeometry(0.17, 0.17, 0.05, 18).translate(0, 1.02, 0);
    return mergeGeometries([shank.toNonIndexed(), tip.toNonIndexed(), head.toNonIndexed()]); })(),
};

/* ---------------- pieces with springs ---------------- */
const _v = new THREE.Vector3(), _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _m = new THREE.Matrix4(),
  _right = new THREE.Vector3(), _up = new THREE.Vector3(), _fwd = new THREE.Vector3(), _push = new THREE.Vector3(), _c = new THREE.Color();

export class Pieces {
  constructor(scene, camera) { this.scene = scene; this.camera = camera; this.groups = new Map(); this.items = []; this.t = 0; this.zone = null; }
  add(geo, mat, pos, quat, scale, o = {}) {
    const key = mat ? geo.uuid + mat.uuid : 'mesh';
    if (!this.groups.has(key)) this.groups.set(key, { geo, mat, list: [], meshes: !mat });
    const g = this.groups.get(key);
    const it = { g, idx: g.list.length, hp: pos.clone(), hq: quat.clone(), s: scale.clone(), off: new THREE.Vector3(), vel: new THREE.Vector3(),
      rot: new THREE.Vector3(), rv: new THREE.Vector3(), n: o.n ? o.n.clone().normalize() : null, order: o.order || 0, float: !!o.float,
      k: o.k || (o.float ? 34 : 150), rel: 0, ph: rnd() * 6.283, amp: o.amp || 0, spd: 0.25 + rnd() * 0.35, tint: o.tint ?? (1 + (rnd() - 0.5) * (o.vary || 0)), r: o.radius || 1 };
    g.list.push(it); this.items.push(it); return it;
  }
  addMesh(mesh, o = {}) {   // a unique mesh (e.g. a photo-textured board) driven by the same springs
    const it = this.add(GEO.boxc, null, mesh.position, mesh.quaternion, mesh.scale, o); it.mesh = mesh; return it;
  }
  build() {
    for (const g of this.groups.values()) {
      if (g.meshes) continue;
      const im = new THREE.InstancedMesh(g.geo, g.mat, g.list.length);
      im.castShadow = true; im.receiveShadow = true; im.instanceMatrix.setUsage(THREE.DynamicDrawUsage); im.frustumCulled = false;
      g.list.forEach((it, i) => im.setColorAt(i, _c.setRGB(it.tint, it.tint, it.tint)));
      im.instanceColor.needsUpdate = true; g.im = im; this.scene.add(im);
    }
    this.compose(0);
  }
  tear(centre, { spread = 1, release = 50, base = 150, floatFar = 2.2, avoid } = {}) {
    const keep = avoid ? avoid() : null, VW = this.camera.view ? this.camera.view.fullWidth : 1, VH = this.camera.view ? this.camera.view.fullHeight : 1;
    for (const it of this.items) {
      _v.copy(it.hp).sub(centre); const L = _v.length() || 1;
      const m = it.float ? (14 + rnd() * 16) * floatFar : (4 + rnd() * 9) * spread;
      it.off.set(_v.x / L * m + (rnd() - 0.5) * 6 * spread, _v.y / L * m * 0.6 + (rnd() - 0.4) * 5 * spread, _v.z / L * m + (2 + rnd() * 5) * spread);
      if (keep && !it.float) {   // the torn house never sits over the headline: pieces that would are flung right and up instead
        for (let k = 0; k < 4; k++) { _p.copy(it.hp).add(it.off).project(this.camera); const sx = (_p.x + 1) / 2 * VW, sy = (1 - _p.y) / 2 * VH;
          if (sx < keep.x0 || sx > keep.x1 || sy < keep.y0 || sy > keep.y1) break; it.off.x = Math.abs(it.off.x) + 8; it.off.y += 3; } }
      it.rot.set((rnd() - 0.5) * 3, (rnd() - 0.5) * 3, (rnd() - 0.5) * 3); it.vel.set(0, 0, 0); it.rv.set(0, 0, 0);
      it.rel = it.float ? 120 + rnd() * 900 : base + it.order * release + rnd() * 90;
    }
    this.t = 0;
  }
  release(step = 22) { for (const it of this.items) it.rel = this.t + (it.float ? 0 : it.order * step); }
  snap() { for (const it of this.items) { it.off.set(0, 0, 0); it.vel.set(0, 0, 0); it.rot.set(0, 0, 0); it.rv.set(0, 0, 0); it.rel = 0; } }
  burst(px, py, VW, VH, R = 300, power = 1) {
    this.basis(VH);
    for (const it of this.items) {
      _p.copy(it.hp).add(it.off).project(this.camera); const sx = (_p.x + 1) / 2 * VW, sy = (1 - _p.y) / 2 * VH;
      const dx = sx - px, dy = sy - py, d = Math.hypot(dx, dy) || 1; if (d > R) continue;
      const f = (1 - d / R) * power, w = this.wpp(it);
      _push.set(0, 0, 0).addScaledVector(_right, dx / d * 900 * w * f).addScaledVector(_up, -dy / d * 900 * w * f).addScaledVector(_fwd, 6 * f);
      this.constrain(it, 7 * f); it.vel.add(_push); it.rv.x += (rnd() - 0.5) * 6 * f; it.rv.z += (rnd() - 0.5) * 6 * f;
    }
  }
  basis(VH) { _right.setFromMatrixColumn(this.camera.matrixWorld, 0); _up.setFromMatrixColumn(this.camera.matrixWorld, 1); _fwd.setFromMatrixColumn(this.camera.matrixWorld, 2); this.VH = VH; }
  wpp(it) { _v.copy(it.hp).add(it.off).sub(this.camera.position); const d = _v.dot(_fwd) * -1; return 2 * Math.max(1, d) * Math.tan(this.camera.fov * Math.PI / 360) / this.VH; }
  constrain(it, lift) {   // a house piece is never pushed into its own face; it lifts off it instead
    if (!it.n) return; const into = _push.dot(it.n); if (into < 0) _push.addScaledVector(it.n, -into); _push.addScaledVector(it.n, lift);
  }
  step(dt, ptr, VW, VH) {
    this.t += dt * 1000; this.basis(VH);
    const inZone = ptr.inside && (!this.zone || (ptr.x > this.zone.x0 && ptr.x < this.zone.x1 && ptr.y > this.zone.y0 && ptr.y < this.zone.y1));
    for (const it of this.items) {
      if (this.t < it.rel) { it.off.addScaledVector(it.vel, dt); it.vel.multiplyScalar(Math.pow(0.3, dt)); continue; }
      if (ptr.inside && (it.float || inZone)) {
        _p.copy(it.hp).add(it.off).project(this.camera);
        const sx = (_p.x + 1) / 2 * VW, sy = (1 - _p.y) / 2 * VH, dx = sx - ptr.x, dy = sy - ptr.y, d = Math.hypot(dx, dy), R = 175 * it.r;
        if (d < R && d > 0.01) {
          const f = Math.pow(1 - d / R, 2), w = this.wpp(it);
          _push.set(0, 0, 0).addScaledVector(_right, (dx / d * 2400 + ptr.vx * 3.4) * w * f * dt).addScaledVector(_up, (-dy / d * 2400 - ptr.vy * 3.4) * w * f * dt);
          if (it.float) _push.addScaledVector(_fwd, 2.5 * f * dt); else this.constrain(it, 26 * f * dt);
          it.vel.add(_push); it.rv.x += (dy / d) * 4 * f * dt; it.rv.z += (dx / d) * 4 * f * dt;
        }
      }
      const soft = !it.float && inZone, k = soft ? 5 : it.k, c = soft ? 2.2 : 2 * (it.float ? 0.55 : 0.76) * Math.sqrt(k);
      it.vel.x += (-k * it.off.x - c * it.vel.x) * dt; it.vel.y += (-k * it.off.y - c * it.vel.y) * dt; it.vel.z += (-k * it.off.z - c * it.vel.z) * dt;
      it.rv.x += (-k * it.rot.x - c * it.rv.x) * dt; it.rv.y += (-k * it.rot.y - c * it.rv.y) * dt; it.rv.z += (-k * it.rot.z - c * it.rv.z) * dt;
      it.off.addScaledVector(it.vel, dt); it.rot.addScaledVector(it.rv, dt);
    }
  }
  compose(time) {
    const s = time * 0.001;
    for (const g of this.groups.values()) {
      if (g.meshes) { for (const it of g.list) { _e.set(it.rot.x, it.rot.y, it.rot.z); it.mesh.position.copy(it.hp).add(it.off); it.mesh.quaternion.setFromEuler(_e).premultiply(it.hq); } continue; }
      for (const it of g.list) {
        _p.copy(it.hp).add(it.off); _e.set(it.rot.x, it.rot.y, it.rot.z);
        if (it.float && it.amp && !RM) { const a = it.amp; _p.x += Math.sin(s * it.spd + it.ph) * a; _p.y += Math.cos(s * it.spd * 1.3 + it.ph) * a * 0.8;
          _e.x += Math.sin(s * it.spd * 0.7 + it.ph) * 0.12; _e.z += Math.cos(s * it.spd * 0.9 + it.ph) * 0.1; }
        _q.setFromEuler(_e).premultiply(it.hq); _m.compose(_p, _q, it.s); g.im.setMatrixAt(it.idx, _m);
      }
      g.im.instanceMatrix.needsUpdate = true;
    }
  }
  lift() { let t = 0; for (const it of this.items) if (!it.float) t += Math.abs(it.off.x) + Math.abs(it.off.y) + Math.abs(it.off.z); return t; }
}

/* ---------------- helpers for laying real materials ---------------- */
export const qBasis = (X, Y) => { const Z = new THREE.Vector3().crossVectors(X, Y).normalize(); const Yn = new THREE.Vector3().crossVectors(Z, X).normalize();
  return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X.clone().normalize(), Yn, Z)); };

/* a loose piece of real material, randomly oriented, for the floating halo */
export function loosePiece(P, M, pos, kind, o = {}) {
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler((rnd() - 0.5) * 1.0, (rnd() - 0.5) * 1.1, rnd() * 6.28));   // mostly face-on, three-quarter turns, as drawn
  const f = { float: true, amp: o.amp ?? 0.25 + rnd() * 0.35, radius: 1.2, vary: 0.06 };
  if (kind === 'blue' || kind === 'cream') return P.add(GEO.dutch, M[kind], pos, q, new THREE.Vector3(2.6 + rnd() * 2.6, 0.85, 0.14), f);
  if (kind === 'bb') return P.add(GEO.box, M.blue, pos, q, new THREE.Vector3(1.1, 3 + rnd() * 2.4, 0.1), f);
  if (kind === 'shake') return P.add(GEO.shake, M.cedar, pos, q, new THREE.Vector3(0.8 + rnd() * 0.8, 1.9, 0.12), { ...f, tint: 0.7 + rnd() * 0.35 });
  if (kind === 'trim') return P.add(GEO.box, M.trim, pos, q, new THREE.Vector3(0.36, 3.4 + rnd() * 2, 0.07), f);
  return P.add(GEO.nail, M.nail, pos, q, new THREE.Vector3(0.6, 0.6, 0.6), { ...f, vary: 0 });
}

/* place n loose pieces around a screen-space focus, never over keep-out rects (copy, header), at varied depth */
export function halo(P, M, camera, VW, VH, n, { keep = [], focus, kinds, near = 8, far = 46, allow }) {
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(); let placed = 0, tries = 0;
  while (placed < n && tries++ < n * 60) {
    const sx = rnd() * VW, sy = rnd() * VH;
    if (keep.some((r) => sx > r.x0 && sx < r.x1 && sy > r.y0 && sy < r.y1)) continue;
    if (allow && !allow(sx, sy)) continue;
    if (focus) { const dx = (sx - focus.x) / focus.rx, dy = (sy - focus.y) / focus.ry, d = Math.hypot(dx, dy);
      if (d < 0.98) continue;                                   // keep the subject clear
      if (rnd() > Math.exp(-Math.max(0, d - 0.9) * (focus.tight || 1.6))) continue; }   // denser close around it
    ndc.set(sx / VW * 2 - 1, -(sy / VH * 2 - 1)); ray.setFromCamera(ndc, camera);
    const dist = near + Math.pow(rnd(), 1.4) * (far - near);
    loosePiece(P, M, ray.ray.at(dist, new THREE.Vector3()), kinds[Math.floor(rnd() * kinds.length)]); placed++;
  }
  return placed;
}

/* ---------------- the rippling siding wall (page background) ---------------- */
export class RippleWall {
  constructor(scene, camera, mat, { z = -16, exposure = 1.0 } = {}) {
    this.scene = scene; this.camera = camera; this.mat = mat; this.z = z; this.exp = exposure; this.trail = []; this.pres = 0;
    this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -z); this.ray = new THREE.Raycaster(); this.hit = new THREE.Vector3(); this.last = null; this.acc = 0; this.ptr = null;
  }
  layout(quiet = []) {
    if (this.im) { this.scene.remove(this.im); this.im.dispose(); }
    const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, y]) => { this.ray.setFromCamera(new THREE.Vector2(x, y), this.camera); return this.ray.ray.intersectPlane(this.plane, new THREE.Vector3()); });
    const x0 = Math.min(...corners.map((c) => c.x)) - 3, x1 = Math.max(...corners.map((c) => c.x)) + 3, y0 = Math.min(...corners.map((c) => c.y)) - 2, y1 = Math.max(...corners.map((c) => c.y)) + 2;
    this.boards = [];
    for (let y = y0; y < y1; y += this.exp) {
      let x = x0 - rnd() * 5;
      while (x < x1) { const L = 4 + rnd() * 5.5; this.boards.push({ x: x + L / 2, y, L, quiet: 1, a: 0 }); x += L; }
    }
    // quiet zones (behind copy): boards there barely move
    const v = new THREE.Vector3();
    for (const b of this.boards) { v.set(b.x, b.y + this.exp / 2, this.z).project(this.camera);
      const sx = (v.x + 1) / 2, sy = (1 - v.y) / 2; b.quiet = quiet.some((r) => sx > r.x0 && sx < r.x1 && sy > r.y0 && sy < r.y1) ? 0.25 : 1; }
    this.im = new THREE.InstancedMesh(GEO.dutch, this.mat, this.boards.length);
    this.im.receiveShadow = true; this.im.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.im.frustumCulled = false;
    this.boards.forEach((b, i) => this.im.setColorAt(i, _c.setRGB(1, 1, 1).multiplyScalar(0.985 + rnd() * 0.03)));
    this.scene.add(this.im); this.update(0, true);
  }
  pointer(nx, ny, now) {
    if (nx === null) { this.ptr = null; this.last = null; return; }
    this.ray.setFromCamera(new THREE.Vector2(nx, ny), this.camera);
    const h = this.ray.ray.intersectPlane(this.plane, this.hit); if (!h) return;
    if (this.last) { const moved = Math.hypot(h.x - this.last.x, h.y - this.last.y); this.acc += moved; let guard = 0;
      while (this.acc >= 0.9 && guard++ < 8) { this.acc -= 0.9; const t = moved > 1e-6 ? Math.min(1, guard * 0.9 / moved) : 0;
        this.trail.push({ x: this.last.x + (h.x - this.last.x) * t, y: this.last.y + (h.y - this.last.y) * t, t: now }); }
      if (this.trail.length > 70) this.trail.splice(0, this.trail.length - 70); }
    this.last = { x: h.x, y: h.y }; this.ptr = this.last;
  }
  active() { return this.trail.length > 0 || this.pres > 0.002; }
  update(now, force) {
    if (!this.im) return;
    this.trail = this.trail.filter((p) => now - p.t < 1900);
    this.pres += ((this.ptr ? 1 : 0) - this.pres) * 0.08;
    if (!force && !this.active() && !this.dirty) return; this.dirty = this.active();
    const P = this.ptr || this.lastPtr; if (this.ptr) this.lastPtr = this.ptr;
    this.boards.forEach((b, i) => {
      let a = 0, sx = 0; const cy = b.y + this.exp / 2;
      for (const p of this.trail) {
        const age = (now - p.t) / 1000, dx = b.x - p.x, dy = cy - p.y, d = Math.hypot(dx * 0.55, dy), r = age * 6.5;
        const ring = Math.exp(-((d - r) * (d - r)) / 1.6) * Math.exp(-age * 2.1);
        a += ring * 0.55; sx += ring * Math.sign(dx) * 0.05;
      }
      if (P && this.pres > 0.002) { const dx = b.x - P.x, dy = cy - P.y; a += Math.exp(-(dx * dx * 0.25 + dy * dy) / 5) * this.pres * 1.1; }
      a = Math.min(a, 1.6) * b.quiet; b.a += (a - b.a) * 0.25;
      _p.set(b.x, b.y, this.z + b.a * 0.55); _e.set(b.a * 0.42, 0, sx * b.quiet); _q.setFromEuler(_e);
      _m.compose(_p, _q, _v.set(b.L, this.exp * 1.16, 0.11)); this.im.setMatrixAt(i, _m);
    });
    this.im.instanceMatrix.needsUpdate = true;
  }
}

/* ---------------- runtime: loop, pointer, lifecycle ---------------- */
export function run({ hero, canvas, renderer, scene, camera, pieces, wall, onResize, onFrame }) {
  const ptr = { x: 0, y: 0, vx: 0, vy: 0, inside: false, seen: false };
  let VW = 1, VH = 1, last = 0, visible = true, running = false, restoreAt = 0;
  function resize() { const r = canvas.getBoundingClientRect(); VW = r.width; VH = r.height;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75)); renderer.setSize(VW, VH, false); camera.aspect = VW / VH; onResize(VW, VH); camera.updateMatrixWorld(true); }
  function frame(t) {
    const dt = Math.min(1 / 30, last ? (t - last) / 1000 : 1 / 60); last = t;
    if (restoreAt && t > restoreAt) { restoreAt = 0; pieces.release(); }
    pieces.step(dt, ptr, VW, VH); pieces.compose(t); if (wall) wall.update(t); if (onFrame) onFrame(t, dt);
    ptr.vx *= 0.82; ptr.vy *= 0.82; renderer.render(scene, camera);
  }
  function start() { if (!running && visible && !RM) { running = true; last = 0; renderer.setAnimationLoop(frame); } }
  function stop() { running = false; renderer.setAnimationLoop(null); }
  const local = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  if (!RM) {
    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return; const q = local(e);
      if (ptr.seen) { ptr.vx = (q.x - ptr.x) * 30 + ptr.vx * 0.5; ptr.vy = (q.y - ptr.y) * 30 + ptr.vy * 0.5; }
      const was = pieces.zone && ptr.inside && ptr.x > pieces.zone.x0 && ptr.x < pieces.zone.x1 && ptr.y > pieces.zone.y0 && ptr.y < pieces.zone.y1;
      ptr.x = q.x; ptr.y = q.y; ptr.seen = true; ptr.inside = true;
      const now = pieces.zone && q.x > pieces.zone.x0 && q.x < pieces.zone.x1 && q.y > pieces.zone.y0 && q.y < pieces.zone.y1;
      if (was && !now) pieces.release();
      if (wall) wall.pointer(q.x / VW * 2 - 1, -(q.y / VH * 2 - 1), performance.now());
    });
    hero.addEventListener('pointerleave', () => { if (ptr.inside) pieces.release(); ptr.inside = false; ptr.seen = false; if (wall) wall.pointer(null); });
    hero.addEventListener('click', (e) => { if (e.target.closest('a,button')) return; const q = local(e);
      pieces.burst(q.x, q.y, VW, VH, e.pointerType === 'mouse' ? 300 : 230); if (e.pointerType !== 'mouse') restoreAt = performance.now() + 900; });
  }
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? start() : stop(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { resize(); if (!running) { pieces.compose(0); renderer.render(scene, camera); } }, 140); });
  resize();
  return { ptr, start, stop, frame, size: () => ({ VW, VH }), resize,
    render: () => { pieces.compose(performance.now()); if (wall) wall.update(performance.now(), true); renderer.render(scene, camera); } };
}

/* audit hooks shared by both versions */
export function hooks(api, pieces, wall, extra = {}) {
  window.__hero = {
    seek(ms) { api.stop(); pieces.tear(extra.centre, extra.tearOpts); const n = Math.round(ms / (1000 / 60)); const { VW, VH } = api.size();
      const p = { inside: false }; for (let i = 0; i < n; i++) pieces.step(1 / 60, p, VW, VH); api.render(); return { t: Math.round(pieces.t), lift: Math.round(pieces.lift()) }; },
    stir(x, y, vx, vy, frames) { const { VW, VH } = api.size(); const p = { x, y, vx, vy, inside: true };
      for (let i = 0; i < frames; i++) { p.vx = vx; p.vy = vy; p.x += vx / 60; p.y += vy / 60; pieces.step(1 / 60, p, VW, VH);
        if (wall) { wall.pointer(p.x / VW * 2 - 1, -(p.y / VH * 2 - 1), performance.now() - (frames - i) * 16); } }
      if (wall) wall.update(performance.now(), true); api.render(); },
    leave(ms) { const { VW, VH } = api.size(); pieces.release(); const p = { inside: false }; const n = Math.round(ms / (1000 / 60));
      for (let i = 0; i < n; i++) pieces.step(1 / 60, p, VW, VH); if (wall) wall.pointer(null); api.render(); },
    lift: () => pieces.lift(), zone: () => pieces.zone, stop: () => api.stop(),
    timeRender() { const t0 = performance.now(); api.render(); return Math.round(performance.now() - t0); },
    count: () => ({ items: pieces.items.length, wall: wall && wall.boards ? wall.boards.length : 0 }),
  };
}

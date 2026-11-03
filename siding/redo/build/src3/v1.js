/* HERO A, "the house assembles" (heroes sheet, Hero 3's spirit, full screen).
   A craftsman house made only of real pieces: steel-blue board-and-batten on the main gable, cedar shakes in the gable
   peak and on both roofs, a cream Dutch-lap wing, real windows (casing, sash, meeting rail, muntins, sill), a panelled
   door, corner boards, rake and fascia trim, a stone plinth. House wrap and roof deck are the skeleton that stays.
   On load every piece is torn out into space and lands in true install order (walls bottom-up, trim, windows, gable
   shakes, roof eave to ridge). The cursor peels pieces off their faces like water; leaving repairs the house.
   A halo of loose real materials floats around it; the page behind is a living siding wall. */
import { THREE, RM, rnd, reseed, stage, materials, GEO, Pieces, qBasis, halo, RippleWall, run, hooks } from './kit.js';

const hero = document.querySelector('.hero'), canvas = hero.querySelector('canvas');
const mobile = () => innerWidth <= 820;
const { renderer, scene, camera, key } = stage(canvas, { exposure: 1.02, shadow: mobile() ? 1024 : 2048 });
scene.fog = new THREE.Fog('#F3F1EB', 70, 170);
const M = materials();
const P = new Pieces(scene, camera);
reseed(2018);

/* ---------- the house, in feet ---------- */
const house = new THREE.Group(); scene.add(house);
house.rotation.y = 0.5; house.updateMatrixWorld(true);
const HM = house.matrixWorld, HQ = new THREE.Quaternion().setFromRotationMatrix(HM);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const W = (v) => v.clone().applyMatrix4(HM);
const NQ = (n) => n.clone().applyQuaternion(HQ);
const QL = (q) => HQ.clone().multiply(q);
const ID = new THREE.Quaternion();
const add = (geo, mat, pos, q, s, o) => P.add(geo, mat, W(pos), QL(q), s, { ...o, n: o.n ? NQ(o.n) : null });

const MW = 16, MD = 14, ME = 10, MR = 17;           // main: width, depth, eave, ridge (front gable faces +z)
const WX0 = 8, WX1 = 21, WZ0 = -6, WZ1 = 4, WE = 9, WR = 13.5;  // wing to the right, set back
const front = V(0, 0, 1), left = V(-1, 0, 0);

// skeleton (static): wrap, decks, plinth
const stat = (geo, mat, pos, q, s) => { const m = new THREE.Mesh(geo, mat); m.position.copy(pos); m.quaternion.copy(q); m.scale.copy(s); m.castShadow = m.receiveShadow = true; house.add(m); return m; };
stat(GEO.boxc, M.wrap, V(0, ME / 2, 0), ID, V(MW - 0.1, ME, MD - 0.1));
stat(GEO.boxc, M.wrap, V((WX0 + WX1) / 2, WE / 2, (WZ0 + WZ1) / 2), ID, V(WX1 - WX0, WE, WZ1 - WZ0 - 0.1));
const gab = new THREE.Shape(); gab.moveTo(-MW / 2, 0); gab.lineTo(MW / 2, 0); gab.lineTo(0, MR - ME); gab.closePath();
const gm = new THREE.Mesh(new THREE.ExtrudeGeometry(gab, { depth: MD - 0.1, bevelEnabled: false }), M.wrap); gm.position.set(0, ME, -MD / 2 + 0.05); gm.castShadow = gm.receiveShadow = true; house.add(gm);
const wgab = new THREE.Shape(); wgab.moveTo(-WZ1, 0); wgab.lineTo(-WZ0, 0); wgab.lineTo(-(WZ0 + WZ1) / 2, WR - WE); wgab.closePath();
const wgm = new THREE.Mesh(new THREE.ExtrudeGeometry(wgab, { depth: WX1 - WX0, bevelEnabled: false }), M.wrap); wgm.rotation.y = Math.PI / 2; wgm.position.set(WX0, WE, 0); wgm.castShadow = wgm.receiveShadow = true; house.add(wgm);
stat(GEO.boxc, M.stone, V(0, -0.45, 0), ID, V(MW + 0.6, 0.9, MD + 0.6));
stat(GEO.boxc, M.stone, V((WX0 + WX1) / 2 + 0.3, -0.45, (WZ0 + WZ1) / 2), ID, V(WX1 - WX0 + 0.6, 0.9, WZ1 - WZ0 + 0.6));
const ground = new THREE.Mesh(new THREE.PlaneGeometry(36, 24), new THREE.ShadowMaterial({ opacity: 0.2 })); ground.rotation.x = -Math.PI / 2; ground.position.set(6.5, -0.92, -1); ground.receiveShadow = true; house.add(ground);

// openings
const MAINF = [[-6.4, -2.6, 2.4, 8.2, 'win'], [-1.3, 1.9, 0, 7.6, 'door'], [3.0, 6.6, 2.4, 8.2, 'win']];
const MAINL = [[-3.2, 0.6, 2.6, 7.6, 'win']];                    // on the left wall, x along -z
const WINGF = [[10.2, 13.6, 2.4, 7.0, 'win'], [15.6, 19.0, 2.4, 7.0, 'win']];
const hits = (ops, a, b, y0, y1) => ops.some((o) => a < o[1] + 0.25 && b > o[0] - 0.25 && y0 < o[3] + 0.25 && y1 > o[2] - 0.05);

/* board-and-batten on a face: boards 1 ft, battens over every seam, split around openings */
function bnb(face, span, ops, top, ord) {
  for (let x = span[0]; x < span[1] - 0.01; x += 1) {
    const segs = []; let y = 0; const yTop = top(x + 0.5);
    const cuts = ops.filter((o) => x + 1 > o[0] - 0.22 && x < o[1] + 0.22).map((o) => [o[2] - (o[4] === 'door' ? 0 : 0.35), o[3] + 0.45]).sort((a, b) => a[0] - b[0]);
    for (const [c0, c1] of cuts) { if (c0 > y + 0.1) segs.push([y, c0]); y = Math.max(y, c1); }
    if (yTop > y + 0.1) segs.push([y, yTop]);
    for (const [y0, y1] of segs) {
      const h = y1 - y0;
      if (face === 'front') add(GEO.box, M.blue, V(x + 0.5, y0, MD / 2), ID, V(0.97, h, 0.06), { n: front, order: ord + y0 * 0.6, vary: 0.04 });
      else add(GEO.box, M.blue, V(-MW / 2, y0, -(x + 0.5)), new THREE.Quaternion().setFromAxisAngle(V(0, 1, 0), -Math.PI / 2), V(0.97, h, 0.06), { n: left, order: ord + y0 * 0.6, vary: 0.04 });
      if (x > span[0] + 0.01) {
        if (face === 'front') add(GEO.box, M.blue, V(x, y0, MD / 2 + 0.06), ID, V(0.24, h, 0.08), { n: front, order: ord + 6 + y0 * 0.6, vary: 0.03 });
        else add(GEO.box, M.blue, V(-MW / 2 - 0.06, y0, -x), new THREE.Quaternion().setFromAxisAngle(V(0, 1, 0), -Math.PI / 2), V(0.24, h, 0.08), { n: left, order: ord + 6 + y0 * 0.6, vary: 0.03 });
      }
    }
  }
}
bnb('front', [-MW / 2, MW / 2], MAINF, () => ME, 0);
bnb('left', [-MD / 2, MD / 2], MAINL.map((o) => [o[0], o[1], o[2], o[3], o[4]]), () => ME, 0);

/* Dutch lap on the wing front: 7" exposure, staggered joints, split around windows */
const EXP = 0.6, NL = Math.round(WE / EXP);
for (let r = 0; r < NL; r++) {
  const y0 = r * EXP; let x = WX0 - rnd() * 3;
  while (x < WX1) {
    const L = 3.5 + rnd() * 5; let a = Math.max(WX0 + 0.2, x), b = Math.min(WX1 - 0.2, x + L);
    for (const o of WINGF) if (y0 < o[3] + 0.3 && y0 + EXP > o[2] - 0.3 && a < o[1] + 0.3 && b > o[0] - 0.3) {
      if (a < o[0] - 0.3) add(GEO.dutch, M.cream, V((a + o[0] - 0.3) / 2, y0, WZ1), ID, V(o[0] - 0.3 - a, EXP * 1.16, 0.085), { n: front, order: r * 0.6, vary: 0.03 });
      a = o[1] + 0.3; }
    if (b - a > 0.3) add(GEO.dutch, M.cream, V((a + b) / 2, y0, WZ1), ID, V(b - a - 0.01, EXP * 1.16, 0.085), { n: front, order: r * 0.6, vary: 0.03 });
    x += L;
  }
}

/* trim: corner boards, fascia, rakes, window and door casings */
const T = (pos, s, q = ID, ord = 11, n = front) => add(GEO.boxc, M.trim, pos, q, s, { n, order: ord });
T(V(-MW / 2 + 0.2, ME / 2, MD / 2 + 0.08), V(0.42, ME, 0.1)); T(V(MW / 2 - 0.2, ME / 2, MD / 2 + 0.08), V(0.42, ME, 0.1));
T(V(-MW / 2 - 0.08, ME / 2, MD / 2 - 0.2), V(0.1, ME, 0.42), ID, 11, left);
T(V(WX1 - 0.2, WE / 2, WZ1 + 0.08), V(0.42, WE, 0.1));
const ra = Math.atan2(MR - ME + 0.4, MW / 2 + 1), rl = Math.hypot(MW / 2 + 1, MR - ME + 0.4);
for (const sg of [-1, 1]) T(V(sg * (MW / 2 + 1) / 2, ME - 0.2 + (MR - ME + 0.4) / 2, MD / 2 + 1.05), V(rl, 0.55, 0.16), new THREE.Quaternion().setFromAxisAngle(V(0, 0, 1), -sg * ra), 13);
T(V(-MW / 2 - 1.0, ME - 0.25, 0), V(0.16, 0.55, MD + 2), ID, 13, left);
T(V((WX0 + WX1) / 2 + 0.5, WE - 0.25, WZ1 + 1.0), V(WX1 - WX0 + 1, 0.5, 0.16), ID, 13);
function opening(o, face) {
  const [a, b, y0, y1, k] = o, w = b - a, h = y1 - y0, cx = (a + b) / 2, cy = (y0 + y1) / 2;
  const onL = face === 'left', z0 = face === 'wing' ? WZ1 : MD / 2, n = onL ? left : front;
  const P3 = (x, y, d) => (onL ? V(-MW / 2 - d, y, -x) : V(x, y, z0 + d));
  const Q = onL ? new THREE.Quaternion().setFromAxisAngle(V(0, 1, 0), -Math.PI / 2) : ID;
  const ord = 14 + rnd() * 2, S = (x, y, d, sx, sy, sz, m = M.trim, o2 = 0) => add(GEO.boxc, m, P3(x, y, d), Q, V(sx, sy, sz), { n, order: ord + o2 });
  S(cx, y1 + 0.28, 0.12, w + 0.9, 0.55, 0.14);                     // head casing
  S(a - 0.22, cy - (k === 'door' ? 0 : 0.1), 0.1, 0.42, h + 0.2, 0.12); S(b + 0.22, cy - (k === 'door' ? 0 : 0.1), 0.1, 0.42, h + 0.2, 0.12);
  if (k === 'win') {
    S(cx, y0 - 0.12, 0.2, w + 1.0, 0.22, 0.42);                     // sill
    S(cx, cy, -0.02, w, h, 0.08, M.glass, 1);
    S(cx, y0 + 0.15, 0.05, w, 0.3, 0.12, M.trim, 1.2); S(cx, y1 - 0.15, 0.05, w, 0.3, 0.12, M.trim, 1.2);
    S(a + 0.12, cy, 0.05, 0.24, h, 0.12, M.trim, 1.2); S(b - 0.12, cy, 0.05, 0.24, h, 0.12, M.trim, 1.2);
    S(cx, cy, 0.07, w, 0.2, 0.14, M.trim, 1.3);                      // meeting rail (double-hung)
    for (const yy of [y0 + h * 0.25, y1 - h * 0.25]) S(cx, yy, 0.06, w - 0.3, 0.08, 0.06, M.trim, 1.4);
    S(cx, cy, 0.06, 0.08, h - 0.4, 0.06, M.trim, 1.4);
  } else {
    S(cx, cy, 0.0, w, h, 0.16, M.door, 1);
    S(cx, y1 - 1.4, 0.06, w - 0.9, 1.6, 0.04, M.glass, 1.2);
    for (const yy of [y0 + 1.4, y0 + 3.6]) S(cx, yy, 0.09, w - 0.9, 1.6, 0.03, M.door, 1.3);
    S(b - 0.45, cy - 0.3, 0.2, 0.12, 0.5, 0.12, M.nail, 1.5);
  }
}
MAINF.forEach((o) => opening(o, 'front')); MAINL.forEach((o) => opening(o, 'left')); WINGF.forEach((o) => opening(o, 'wing'));

/* cedar shakes: gable peak (vertical wall) and both roofs, courses lapped, joints offset, butts tilted out */
function shakeCourse(origin, X, Y, Z, length, u, ord, width = [0.6, 1.3], L = 1.6, clip = null) {
  const q0 = qBasis(X, Y), th = Math.atan2(0.09, L), tilt = new THREE.Quaternion().setFromAxisAngle(V(1, 0, 0), -th);
  const q = q0.clone().multiply(tilt);
  let a = -rnd() * 0.6;
  while (a < length) {
    const w = width[0] + rnd() * (width[1] - width[0]); const c = a + w / 2;
    if (c > 0 && c < length && (!clip || clip(c))) {
      const pos = origin.clone().addScaledVector(X, c).addScaledVector(Y, u).addScaledVector(Z, L * Math.sin(th) + 0.02);
      P.add(GEO.shake, M.cedar, W(pos), QL(q), V(w - 0.04, L, 0.07), { n: NQ(Z), order: ord, tint: 0.62 + rnd() * 0.42 });
    }
    a += w;
  }
}
// gable peak shakes on the main front, above the eave line, clipped by the rakes
for (let r = 0; r < 11; r++) { const y = ME + 0.15 + r * 0.6; const half = (MR - y) * (MW / 2) / (MR - ME) - 0.3;
  if (half > 0.4) shakeCourse(V(-half, y, MD / 2), V(1, 0, 0), V(0, 1, 0), V(0, 0, 1), half * 2, 0, 18 + r * 0.5, [0.55, 1.1], 1.1); }
// main roof: both slopes, eave to ridge
const run_ = MW / 2 + 1, rise = (MR - ME + 0.4) * (run_ / (MW / 2 + 1)), slen = Math.hypot(run_, rise);
for (const sg of [-1, 1]) {
  const Y = V(-sg * run_, rise, 0).normalize(), X = V(0, 0, -sg), Z = new THREE.Vector3().crossVectors(X, Y).normalize();
  const eave = V(sg * run_, ME - 0.2, sg * (MD / 2 + 1.1));
  for (let r = 0; r * 0.9 < slen - 0.6; r++) shakeCourse(eave, X, Y, Z, MD + 2.2, r * 0.9, 24 + r * 0.7);
}
// wing roof: front slope (ridge along x)
{ const Y = V(0, WR - WE + 0.3, -(WZ1 - WZ0) / 2 - 1).normalize(), X = V(1, 0, 0), Z = new THREE.Vector3().crossVectors(X, Y).normalize();
  const len = Math.hypot(WR - WE + 0.3, (WZ1 - WZ0) / 2 + 1), eave = V(WX0, WE - 0.2, WZ1 + 1);
  for (let r = 0; r * 0.9 < len - 0.5; r++) shakeCourse(eave, X, Y, Z, WX1 - WX0 + 1, r * 0.9, 24 + r * 0.7); }
// static roof decks under the shakes
for (const sg of [-1, 1]) { const d = new THREE.Mesh(GEO.boxc, M.deck); d.position.set(sg * run_ / 2, ME - 0.2 + rise / 2, 0); d.scale.set(slen, 0.12, MD + 2.2); d.rotation.z = -sg * Math.atan2(rise, run_); d.castShadow = d.receiveShadow = true; house.add(d); }
{ const d = new THREE.Mesh(GEO.boxc, M.deck), len = Math.hypot(WR - WE + 0.3, (WZ1 - WZ0) / 2 + 1); d.position.set((WX0 + WX1) / 2 + 0.5, WE - 0.2 + (WR - WE + 0.3) / 2, WZ1 + 1 - ((WZ1 - WZ0) / 2 + 1) / 2);
  d.scale.set(WX1 - WX0 + 1, 0.12, len); d.rotation.x = Math.atan2(WR - WE + 0.3, (WZ1 - WZ0) / 2 + 1); d.castShadow = d.receiveShadow = true; house.add(d); }

/* ---------- framing, halo, wall ---------- */
const box = new THREE.Box3().setFromObject(house); const centre = box.getCenter(new THREE.Vector3());
let wall = new RippleWall(scene, camera, M.wall, { z: -24, exposure: 1.05 });
function frameView(VW, VH) {
  const m = VW <= 820, tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const needW = 40, fracW = m ? 0.98 : 0.6, needH = 26, fracH = m ? 0.36 : 0.8;
  const d = Math.max(needW / fracW / (2 * tanH * camera.aspect), needH / fracH / (2 * tanH));
  camera.position.set(centre.x - d * 0.18, centre.y + d * 0.1, centre.z + d); camera.lookAt(centre.x, centre.y - 0.5, centre.z);
  scene.fog.near = d * 0.95; scene.fog.far = d * 2.3;
  const tx = m ? 0.5 : 0.67, ty = m ? 0.24 : 0.53; camera.setViewOffset(VW, VH, -(tx - 0.5) * VW, -(ty - 0.5) * VH, VW, VH); camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
  key.position.set(centre.x - 30, centre.y + 45, centre.z + 40); key.target.position.copy(centre);
  Object.assign(key.shadow.camera, { left: -40, right: 40, top: 40, bottom: -30, near: 10, far: 160 }); key.shadow.camera.updateProjectionMatrix();
  // the cursor zone: the house's screen footprint
  const pts = []; for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) pts.push(new THREE.Vector3(x, y, z).project(camera));
  const xs = pts.map((p) => (p.x + 1) / 2 * VW), ys = pts.map((p) => (1 - p.y) / 2 * VH);
  P.zone = { x0: Math.min(...xs) - 40, x1: Math.max(...xs) + 40, y0: Math.min(...ys) - 40, y1: Math.max(...ys) + 30 };
  const copy = document.querySelector('.copy').getBoundingClientRect(), hr = hero.getBoundingClientRect();
  wall.layout([{ x0: (copy.left - hr.left - 30) / VW, x1: (copy.right - hr.left + 30) / VW, y0: (copy.top - hr.top - 30) / VH, y1: (copy.bottom - hr.top + 30) / VH }]);
}

let built = false;
const api = run({ hero, canvas, renderer, scene, camera, pieces: P, wall, onResize: (VW, VH) => {
  frameView(VW, VH);
  if (!built) {
    built = true;
    const c = document.querySelector('.copy').getBoundingClientRect(), h = document.querySelector('.hdr').getBoundingClientRect(), hr = hero.getBoundingClientRect();
    const keep = [{ x0: c.left - hr.left - 90, x1: c.right - hr.left + 70, y0: c.top - hr.top - 70, y1: c.bottom - hr.top + 70 }, { x0: 0, x1: VW, y0: 0, y1: h.bottom - hr.top + 40 }];
    const z = P.zone; reseed(77);
    halo(P, M, camera, VW, VH, VW <= 820 ? 20 : 72, { keep, focus: { x: (z.x0 + z.x1) / 2, y: (z.y0 + z.y1) / 2, rx: (z.x1 - z.x0) / 2, ry: (z.y1 - z.y0) / 2 },
      kinds: ['blue', 'blue', 'blue', 'cream', 'cream', 'cream', 'shake', 'shake', 'shake', 'nail', 'bb'], near: camera.position.distanceTo(centre) * 0.78, far: camera.position.distanceTo(centre) * 1.3 });
    P.build();
  }
} });
const tearOpts = { spread: 1, release: 34, base: 160, avoid: () => { const c = document.querySelector('.copy').getBoundingClientRect(), h = hero.getBoundingClientRect(); return { x0: c.left - h.left - 30, x1: c.right - h.left + 30, y0: c.top - h.top - 30, y1: c.bottom - h.top + 30 }; } };
hooks(api, P, wall, { centre, tearOpts });
if (RM) { P.snap(); api.render(); hero.classList.add('built'); }
else { P.tear(centre, tearOpts); api.render(); api.start(); }

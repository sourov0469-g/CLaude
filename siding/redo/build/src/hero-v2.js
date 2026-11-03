/* HERO V2, "the exploded house" (real 3D, three.js r160 from the CDN; heroes sheet: exploded house, wall over water).
   A house built from its real pieces: steel-blue lap courses split around the openings with staggered joints, corner
   boards, window and door casings, glass, board-and-batten in the gable, rake trim, and shingles laid in courses on
   both roof slopes. The house wrap and the roof deck are the skeleton that stays. On load every piece hangs exploded in
   space and flies home in true install order: siding bottom-up, then trim, then the roof from eave to ridge. Moving
   through the house pushes pieces off it toward you like water; when the pointer leaves, the house repairs itself.
   Per S1344 / S0319: one unit box geometry, instanced meshes per material, PBR materials, key + hemisphere light,
   capped DPR, no allocation in the loop, the loop stops when everything has settled. */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';

const AP = window.AP, RM = AP.RM;
const hero = document.querySelector('.hero'), cv = hero.querySelector('canvas.stage');
let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
catch (e) { hero.classList.add('nogl'); throw e; }
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.02;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(28, 1, 0.5, 120);
const house = new THREE.Group(); house.rotation.y = -0.46; scene.add(house);

scene.add(new THREE.HemisphereLight(0xffffff, 0xd9d1c0, 1.05));
const key = new THREE.DirectionalLight(0xfff4e2, 2.3); key.position.set(-9, 15, 11); key.castShadow = true;
key.shadow.mapSize.set(1024, 1024); Object.assign(key.shadow.camera, { left: -11, right: 11, top: 11, bottom: -4, near: 1, far: 50 });
key.shadow.bias = -0.0006; key.shadow.normalBias = 0.02; scene.add(key);
const fill = new THREE.DirectionalLight(0xdfe8f2, 0.55); fill.position.set(10, 6, -6); scene.add(fill);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.13 }));
ground.rotation.x = -Math.PI / 2; ground.position.y = -0.26; ground.receiveShadow = true; scene.add(ground);

const mat = (c, r = 0.7, m = 0, extra = {}) => new THREE.MeshStandardMaterial({ color: new THREE.Color(c), roughness: r, metalness: m, ...extra });
const M = {
  siding: mat('#396791', 0.6), trim: mat('#F5F2EA', 0.72), shingle: mat('#4B5259', 0.92), glass: mat('#2A3946', 0.18, 0.15, { emissive: new THREE.Color('#16212b'), emissiveIntensity: 0.4 }),
  door: mat('#2A4E6E', 0.55), wrap: mat('#E7E2D7', 0.95), deck: mat('#CDBE9F', 0.96), found: mat('#CFC9BD', 0.95), batten: mat('#3F6F99', 0.6),
};

/* ---------- the house, in real proportions (units ~ feet / 4) ---------- */
const W = 9, D = 6.4, HW = 5.0, HR = 7.9, T = 0.07;
let s = 2009; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
const parts = { siding: [], trim: [], shingle: [], glass: [], door: [], batten: [] };
const add = (kind, px, py, pz, sx, sy, sz, rx = 0, ry = 0, rz = 0, order = 0) => parts[kind].push({ p: [px, py, pz], s: [sx, sy, sz], r: [rx, ry, rz], order });

// static skeleton: wrap (front gable end + side), roof deck, foundation
const box = new THREE.BoxGeometry(1, 1, 1);
function stat(m, px, py, pz, sx, sy, sz, rx = 0, ry = 0, rz = 0) { const o = new THREE.Mesh(box, m); o.position.set(px, py, pz); o.scale.set(sx, sy, sz); o.rotation.set(rx, ry, rz); o.castShadow = o.receiveShadow = true; house.add(o); return o; }
stat(M.wrap, 0, HW / 2, 0, W, HW, D);
const gable = new THREE.Shape(); gable.moveTo(-W / 2, 0); gable.lineTo(W / 2, 0); gable.lineTo(0, HR - HW); gable.closePath();
const gGeo = new THREE.ExtrudeGeometry(gable, { depth: D, bevelEnabled: false });
const gMesh = new THREE.Mesh(gGeo, M.wrap); gMesh.position.set(0, HW, -D / 2); gMesh.castShadow = gMesh.receiveShadow = true; house.add(gMesh);
stat(M.found, 0, -0.13, 0, W + 0.2, 0.26, D + 0.2);
const OVH = 0.45, slope = Math.atan2(HR - (HW - 0.22), W / 2 + OVH), LS = Math.hypot(W / 2 + OVH, HR - (HW - 0.22)), LZ = D + 0.7;
for (const sg of [-1, 1]) stat(M.deck, sg * (W / 2 + OVH) / 2, (HR + HW - 0.22) / 2, 0, LS, 0.08, LZ, 0, 0, -sg * slope);

// openings (front: two windows and a door; right side: one window)
const FRONT = [[-3.3, -1.7, 1.5, 3.8, 'win'], [-0.55, 0.55, 0, 3.4, 'door'], [1.7, 3.3, 1.5, 3.8, 'win']];
const SIDE = [[-0.9, 0.9, 1.5, 3.8, 'win']];
const NC = 14, CH = HW / NC;
function courses(face, span, openings, order0) {
  for (let c = 0; c < NC; c++) {
    const y0 = c * CH, y1 = y0 + CH;
    let free = [[span[0], span[1]]];
    for (const o of openings) if (o[3] > y0 + 0.01 && o[2] < y1 - 0.01) {
      const a = o[0] - 0.16, b = o[1] + 0.16; free = free.flatMap(([u, v]) => (b <= u || a >= v) ? [[u, v]] : [[u, a], [b, v]].filter(([p, q]) => q - p > 0.08));
    }
    const stagger = rnd() * 1.4;
    for (const [u, v] of free) {
      let x = u - stagger * (u === span[0] ? 1 : 0);
      while (x < v - 0.05) {
        const len = 1.6 + rnd() * 1.5, a = Math.max(u, x), b = Math.min(v, x + len);
        if (b - a > 0.12) {
          const mid = (a + b) / 2, yc = y0 + CH / 2;
          if (face === 'front') add('siding', mid, yc, D / 2 + T / 2 + 0.02, b - a - 0.012, CH * 1.1, T, -0.13, 0, 0, order0 + c);
          else add('siding', W / 2 + T / 2 + 0.02, yc, -mid, T, CH * 1.1, b - a - 0.012, 0, 0, 0.13, order0 + c);
        }
        x += len;
      }
    }
  }
}
courses('front', [-W / 2 + 0.18, W / 2 - 0.18], FRONT, 0);
courses('side', [-D / 2 + 0.18, D / 2 - 0.18], SIDE, 0);
// corner boards (outside corners: front-left, front-right on both faces, back-right)
add('trim', -W / 2 + 0.09, HW / 2, D / 2 + 0.07, 0.2, HW, 0.08, 0, 0, 0, NC + 1);
add('trim', W / 2 - 0.09, HW / 2, D / 2 + 0.07, 0.2, HW, 0.08, 0, 0, 0, NC + 1);
add('trim', W / 2 + 0.07, HW / 2, D / 2 - 0.09, 0.08, HW, 0.2, 0, 0, 0, NC + 1);
add('trim', W / 2 + 0.07, HW / 2, -D / 2 + 0.09, 0.08, HW, 0.2, 0, 0, 0, NC + 1);
// window and door casings, sashes, glass
function opening(face, o) {
  const [a, b, y0, y1, k] = o, w = b - a, h = y1 - y0, cx = (a + b) / 2, cy = (y0 + y1) / 2;
  const P = (x, y, z) => face === 'front' ? [x, y, D / 2 + z] : [W / 2 + z, y, -x];
  const S = (sx, sy, sz) => face === 'front' ? [sx, sy, sz] : [sz, sy, sx];
  const piece = (kind, x, y, z, sx, sy, sz, ord) => { const p = P(x, y, z), q = S(sx, sy, sz); add(kind, p[0], p[1], p[2], q[0], q[1], q[2], 0, 0, 0, ord); };
  const ord = NC + 2 + rnd() * 2;
  piece('trim', cx, y1 + 0.1, 0.1, w + 0.5, 0.2, 0.08, ord);                         // head casing
  piece('trim', a - 0.1, cy, 0.1, 0.2, h, 0.08, ord); piece('trim', b + 0.1, cy, 0.1, 0.2, h, 0.08, ord);   // jambs
  if (k === 'win') {
    piece('trim', cx, y0 - 0.06, 0.13, w + 0.6, 0.12, 0.2, ord);                     // sill, projecting
    piece('glass', cx, cy, 0.0, w - 0.02, h - 0.02, 0.04, ord + 0.5);
    piece('trim', cx, cy, 0.05, w, 0.12, 0.06, ord + 0.6);                           // meeting rail of a double-hung
    piece('trim', cx, cy + h / 4, 0.055, 0.05, h / 2 - 0.1, 0.04, ord + 0.7); piece('trim', cx, cy - h / 4, 0.055, 0.05, h / 2 - 0.1, 0.04, ord + 0.7);
  } else {
    piece('door', cx, cy, 0.03, w - 0.02, h - 0.02, 0.08, ord + 0.5);
    piece('glass', cx, y1 - 0.55, 0.075, w - 0.42, 0.5, 0.02, ord + 0.7);
  }
}
FRONT.forEach((o) => opening('front', o)); SIDE.forEach((o) => opening('side', o));
// gable: board-and-batten, rake trim
const NB = 15, bw = W / NB, GH = HR - HW;
for (let i = 0; i < NB; i++) {
  const x = -W / 2 + bw * (i + 0.5), h = GH * (1 - Math.abs(x) / (W / 2)) - 0.12;
  if (h > 0.15) { add('siding', x, HW + h / 2 + 0.04, D / 2 + 0.045, bw - 0.01, h, 0.06, 0, 0, 0, NC + 4 + i * 0.12);
    if (i < NB - 1) { const xb = -W / 2 + bw * (i + 1), hb = GH * (1 - Math.abs(xb) / (W / 2)) - 0.16; if (hb > 0.15) add('batten', xb, HW + hb / 2 + 0.04, D / 2 + 0.1, 0.1, hb, 0.06, 0, 0, 0, NC + 5 + i * 0.12); } }
}
const rakeA = Math.atan2(GH + 0.25, W / 2 + OVH), rakeL = Math.hypot(W / 2 + OVH, GH + 0.25);
for (const sg of [-1, 1]) add('trim', sg * (W / 2 + OVH) / 2, HW - 0.12 + (GH + 0.25) / 2, D / 2 + 0.36, rakeL, 0.3, 0.1, 0, 0, -sg * rakeA, NC + 7);
add('trim', W / 2 + OVH - 0.02, HW - 0.24, 0, 0.1, 0.3, LZ, 0, 0, 0, NC + 7);   // fascia along the side eave
// roof: shingle courses from eave to ridge on both slopes, joints offset half a tab every other course
const EXP = 0.36, NR = Math.floor(LS / EXP), TAB = 0.92;
for (const sg of [-1, 1]) for (let r = 0; r < NR; r++) {
  const u = LS - (r + 0.5) * EXP;   // distance down the slope from the ridge
  const x = sg * u * Math.cos(slope), y = HR - u * Math.sin(slope) + 0.07;
  const off = (r % 2) * TAB / 2;
  for (let z = -LZ / 2 - off; z < LZ / 2 - 0.05; z += TAB) {
    const z0 = Math.max(-LZ / 2, z), z1 = Math.min(LZ / 2, z + TAB);
    if (z1 - z0 > 0.12) add('shingle', x, y, (z0 + z1) / 2, EXP * 1.35, 0.035, z1 - z0 - 0.02, 0, 0, -sg * slope - sg * 0.025, NC + 8 + r * 0.42);
  }
}
for (let z = -LZ / 2 + 0.3; z < LZ / 2 - 0.35; z += 0.6) add('shingle', 0, HR + 0.05, z, 0.5, 0.06, 0.58, 0, 0, 0, NC + 9 + NR * 0.42);

/* ---------- instancing and per-piece physics state ---------- */
const groups = [];
const centre = new THREE.Vector3(0, HR / 2, 0);
for (const [kind, list] of Object.entries(parts)) {
  if (!list.length) continue;
  const im = new THREE.InstancedMesh(box, M[kind], list.length); im.castShadow = true; im.receiveShadow = true;
  im.instanceMatrix.setUsage(THREE.DynamicDrawUsage); house.add(im);
  // per-piece tone: shingles vary like real asphalt tabs (+-7%), boards barely (+-2%), trim not at all
  const vary = kind === 'shingle' ? 0.07 : (kind === 'siding' || kind === 'batten') ? 0.02 : 0;
  if (vary) { const col = new THREE.Color(); for (let i = 0; i < list.length; i++) { col.setRGB(1, 1, 1).multiplyScalar(1 - vary + rnd() * vary * 2); im.setColorAt(i, col); } im.instanceColor.needsUpdate = true; }
  const n = list.length, st = { im, list, n,
    home: list.map((q) => new THREE.Vector3(...q.p)), hq: list.map((q) => new THREE.Quaternion().setFromEuler(new THREE.Euler(...q.r))),
    sc: list.map((q) => new THREE.Vector3(...q.s)), off: new Float32Array(n * 3), vel: new Float32Array(n * 3), rot: new Float32Array(n * 3), rv: new Float32Array(n * 3),
    rel: new Float32Array(n), order: list.map((q) => q.order), scr: new Float32Array(n * 2), nrm: new Float32Array(n * 3) };
  // each piece's face normal (house-local): the push may lift a board out of its own wall or roof slope, never into it
  st.home.forEach((h, i) => { let nx = 0, ny = 0, nz = 1;
    if (kind === 'shingle' && h.y > HW) { const sg = Math.sign(h.x) || 1; nx = sg * Math.sin(slope); ny = Math.cos(slope); nz = 0; }
    else if (h.x > W / 2 - 0.05 && h.z < D / 2 - 0.05) { nx = 1; nz = 0; }
    st.nrm[i * 3] = nx; st.nrm[i * 3 + 1] = ny; st.nrm[i * 3 + 2] = nz; });
  groups.push(st);
}
const total = groups.reduce((a, g) => a + g.n, 0);

function tear() {
  s = 1983;
  for (const g of groups) for (let i = 0; i < g.n; i++) {
    const h = g.home[i], dx = h.x - centre.x, dy = h.y - centre.y, dz = h.z - centre.z, L = Math.hypot(dx, dy, dz) || 1;
    const m = 1.0 + rnd() * 2.3;
    g.off[i * 3] = dx / L * m + (rnd() - 0.5) * 1.4; g.off[i * 3 + 1] = dy / L * m * 0.42 + (rnd() - 0.45) * 0.9; g.off[i * 3 + 2] = dz / L * m + 0.5 + rnd() * 1.5;
    g.off[i * 3 + 1] = Math.min(HR + 1.4 - h.y, Math.max(-0.35 - h.y, g.off[i * 3 + 1]));   // never below the ground, never into the header
    for (let k = 0; k < 3; k++) { g.rot[i * 3 + k] = (rnd() - 0.5) * 1.7; g.vel[i * 3 + k] = (rnd() - 0.5) * 0.3; g.rv[i * 3 + k] = (rnd() - 0.5) * 0.3; }
    g.rel[i] = 120 + g.order[i] * 36 + rnd() * 90;
  }
}

/* ---------- framing: the house sits right of centre on desktop, top of the stage on mobile ---------- */
let VW = 0, VH = 0, mobile = false;
function frame() {
  const r = cv.getBoundingClientRect(); VW = r.width; VH = r.height; mobile = VW <= 820;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75)); renderer.setSize(VW, VH, false);
  camera.aspect = VW / VH;
  const tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const needH = mobile ? 10.2 : 9.6, frac = mobile ? 0.62 : 0.50, needW = 12.4, fracW = mobile ? 0.86 : 0.50;
  const d = Math.max(needH / frac / (2 * tanH), needW / fracW / (2 * tanH * camera.aspect));
  camera.position.set(-1.2, 3.6 + d * 0.11, d); camera.lookAt(0.2, 3.7, 0);
  const tx = mobile ? 0.5 : 0.64, ty = mobile ? 0.56 : 0.355;
  camera.setViewOffset(VW, VH, -(tx - 0.5) * VW, -(ty - 0.5) * VH, VW, VH);
  camera.updateProjectionMatrix();
  // project every home position once, for screen-space interaction
  camera.updateMatrixWorld(true); house.updateMatrixWorld(true); const v = new THREE.Vector3();
  for (const g of groups) for (let i = 0; i < g.n; i++) { v.copy(g.home[i]).applyMatrix4(house.matrixWorld).project(camera); g.scr[i * 2] = (v.x + 1) / 2 * VW; g.scr[i * 2 + 1] = (1 - v.y) / 2 * VH; }
  // world units per pixel at the house, for converting pointer motion
  pxw = (2 * d * tanH) / VH;
  rightV.set(1, 0, 0).applyQuaternion(camera.quaternion); upV.set(0, 1, 0).applyQuaternion(camera.quaternion); fwdV.set(0, 0, 1).applyQuaternion(camera.quaternion);
  invQ.copy(house.quaternion).invert();
}
let pxw = 0.02; const rightV = new THREE.Vector3(), upV = new THREE.Vector3(), fwdV = new THREE.Vector3(), invQ = new THREE.Quaternion();

/* ---------- physics ---------- */
const mtx = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), pos = new THREE.Vector3(), push = new THREE.Vector3();
let simT = 0, mode = 'build', running = false, lastT = 0, restoreAt = 0;
const ptr = { x: 0, y: 0, vx: 0, vy: 0, inside: false, seen: false };
function step(dt) {
  simT += dt * 1000;
  const stirring = ptr.inside && mode !== 'build';
  let busy = false;
  for (const g of groups) for (let i = 0; i < g.n; i++) {
    const j = i * 3;
    if (stirring) {
      const sx = g.scr[i * 2] + g.off[j] / pxw * 0.6, sy = g.scr[i * 2 + 1] - g.off[j + 1] / pxw * 0.6;
      const dx = sx - ptr.x, dy = sy - ptr.y, d = Math.hypot(dx, dy), R = mobile ? 110 : 165;
      if (d < R && d > 0.01) {
        const f = Math.pow(1 - d / R, 2);
        // the push, in camera space: away from the hand, along its motion, and up out of the wall toward the viewer
        const px = (dx / d) * 10 + ptr.vx * pxw * 3.6, py = -(dy / d) * 10 - ptr.vy * pxw * 3.6, pz = 9;
        push.set(0, 0, 0).addScaledVector(rightV, px).addScaledVector(upV, py).multiplyScalar(f * dt).applyQuaternion(invQ);
        const nx = g.nrm[j], ny = g.nrm[j + 1], nz = g.nrm[j + 2], into = push.x * nx + push.y * ny + push.z * nz;
        if (into < 0) { push.x -= into * nx; push.y -= into * ny; push.z -= into * nz; }          // never into the wall
        const out = pz * f * dt; push.x += nx * out; push.y += ny * out; push.z += nz * out;      // lift off the face
        g.vel[j] += push.x; g.vel[j + 1] += push.y; g.vel[j + 2] += push.z;
        g.rv[j] += (dy / d) * 3 * f * dt; g.rv[j + 2] += (dx / d) * 3 * f * dt;
      }
    }
    const released = simT >= g.rel[i];
    const k = stirring ? 5 : (released ? 150 : 0), c = stirring ? 2.4 : (released ? 2 * 0.78 * Math.sqrt(150) : 1.2);
    for (let a = 0; a < 3; a++) {
      g.vel[j + a] += (-k * g.off[j + a] - c * g.vel[j + a]) * dt; g.off[j + a] += g.vel[j + a] * dt;
      if (stirring && Math.abs(g.off[j + a]) > 2.6) { g.off[j + a] = Math.sign(g.off[j + a]) * 2.6; g.vel[j + a] *= -0.3; }   // stay in view
      g.rv[j + a] += (-k * g.rot[j + a] - c * g.rv[j + a]) * dt; g.rot[j + a] += g.rv[j + a] * dt;
    }
    if (!released || Math.abs(g.off[j]) + Math.abs(g.off[j + 1]) + Math.abs(g.off[j + 2]) > 0.004 || Math.abs(g.rot[j]) + Math.abs(g.rot[j + 1]) + Math.abs(g.rot[j + 2]) > 0.002 ||
        Math.abs(g.vel[j]) + Math.abs(g.vel[j + 1]) + Math.abs(g.vel[j + 2]) > 0.01) busy = true;
  }
  if (mode === 'build' && !busy) mode = 'settled';
  ptr.vx *= 0.82; ptr.vy *= 0.82;
  return busy || stirring;
}
function compose() {
  for (const g of groups) {
    for (let i = 0; i < g.n; i++) {
      const j = i * 3; pos.copy(g.home[i]); pos.x += g.off[j]; pos.y += g.off[j + 1]; pos.z += g.off[j + 2];
      e.set(g.rot[j], g.rot[j + 1], g.rot[j + 2]); q.setFromEuler(e).premultiply(g.hq[i]);
      mtx.compose(pos, q, g.sc[i]); g.im.setMatrixAt(i, mtx);
    }
    g.im.instanceMatrix.needsUpdate = true;
  }
}
function snap() { for (const g of groups) { g.off.fill(0); g.vel.fill(0); g.rot.fill(0); g.rv.fill(0); } }
function render() { compose(); renderer.render(scene, camera); }
function loop(t) {
  const dt = Math.min(1 / 30, lastT ? (t - lastT) / 1000 : 1 / 60); lastT = t;
  if (restoreAt && t > restoreAt) { restoreAt = 0; ptr.inside = false; release(); }
  const busy = step(dt); render();
  if (!busy) { snap(); render(); renderer.setAnimationLoop(null); running = false; hero.classList.add('built'); }
}
function run() { if (!running && visible) { running = true; lastT = 0; renderer.setAnimationLoop(loop); } }
function release() {   // the house repairs itself in install order: siding bottom-up, trim, then the roof
  for (const g of groups) for (let i = 0; i < g.n; i++) g.rel[i] = simT + g.order[i] * 24;
  run();
}

/* ---------- input ---------- */
let visible = true;
new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (!visible) { renderer.setAnimationLoop(null); running = false; } else if (mode !== 'settled' || ptr.inside) run(); }).observe(cv);
document.addEventListener('visibilitychange', () => { if (document.hidden) { renderer.setAnimationLoop(null); running = false; } else run(); });
const local = (ev) => { const r = cv.getBoundingClientRect(); return { x: ev.clientX - r.left, y: ev.clientY - r.top }; };
let zone = { x0: 0, y0: 0, x1: 0, y1: 0 };
function computeZone() {   // the house's screen footprint, padded
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const g of groups) for (let i = 0; i < g.n; i++) { const x = g.scr[i * 2], y = g.scr[i * 2 + 1]; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  zone = { x0: x0 - 50, y0: y0 - 60, x1: x1 + 50, y1: y1 + 40 };
  const z = hero.querySelector('.zone'); if (z) Object.assign(z.style, { left: zone.x0 + 'px', top: zone.y0 + 'px', width: (zone.x1 - zone.x0) + 'px', height: (zone.y1 - zone.y0) + 'px' });
}
const inZone = (p) => p.x > zone.x0 && p.x < zone.x1 && p.y > zone.y0 && p.y < zone.y1;
if (!RM) {
  hero.addEventListener('pointermove', (ev) => {
    if (ev.pointerType !== 'mouse' || mode === 'build') return;
    const p = local(ev), was = ptr.inside;
    if (ptr.seen) { ptr.vx = (p.x - ptr.x) * 30 + ptr.vx * 0.5; ptr.vy = (p.y - ptr.y) * 30 + ptr.vy * 0.5; }
    ptr.x = p.x; ptr.y = p.y; ptr.seen = true; ptr.inside = inZone(p);
    if (ptr.inside) run(); else if (was) release();
  });
  hero.addEventListener('pointerleave', () => { if (ptr.inside) { ptr.inside = false; release(); } ptr.seen = false; });
  hero.addEventListener('click', (ev) => {
    const p = local(ev); if (!inZone(p) || mode === 'build' || ev.target.closest('a,button')) return;
    for (const g of groups) for (let i = 0; i < g.n; i++) {
      const dx = g.scr[i * 2] - p.x, dy = g.scr[i * 2 + 1] - p.y, d = Math.hypot(dx, dy) || 1, R = mobile ? 170 : 280;
      if (d < R) { const f = 1 - d / R; push.set(0, 0, 0).addScaledVector(rightV, dx / d * 8).addScaledVector(upV, -dy / d * 8 + 2).addScaledVector(fwdV, 9).multiplyScalar(f).applyQuaternion(invQ);
        const j = i * 3, nx = g.nrm[j], ny = g.nrm[j + 1], nz = g.nrm[j + 2], into = push.x * nx + push.y * ny + push.z * nz;
        if (into < 0) { push.x -= into * nx; push.y -= into * ny; push.z -= into * nz; }
        push.x += nx * 6 * f; push.y += ny * 6 * f; push.z += nz * 6 * f;
        g.vel[j] += push.x; g.vel[j + 1] += push.y; g.vel[j + 2] += push.z; g.rv[j] += (rnd() - 0.5) * 5 * f; g.rv[j + 2] += (rnd() - 0.5) * 5 * f; }
    }
    ptr.inside = ev.pointerType === 'mouse' && inZone(p);
    if (!ptr.inside) restoreAt = performance.now() + 900;
    mode = mode === 'build' ? mode : 'stir'; run();
  });
}

/* ---------- boot ---------- */
frame(); computeZone();
if (RM) { snap(); mode = 'settled'; render(); hero.classList.add('built'); }
else { tear(); render(); run(); }
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { frame(); computeZone(); if (!running) render(); }, 120); });

window.__hero = {
  seek(ms) { tear(); mode = 'build'; simT = 0; renderer.setAnimationLoop(null); running = false; const n = Math.round(ms / (1000 / 60)); for (let i = 0; i < n; i++) step(1 / 60); render(); return { mode, simT: Math.round(simT), pieces: total }; },
  stir(x, y, vx, vy, frames) { ptr.inside = true; ptr.x = x; ptr.y = y; mode = 'stir'; for (let i = 0; i < frames; i++) { ptr.vx = vx; ptr.vy = vy; ptr.x += vx / 60; ptr.y += vy / 60; step(1 / 60); } render(); },
  leave(ms, again) { ptr.inside = false; if (!again) release(); renderer.setAnimationLoop(null); running = false; const n = Math.round(ms / (1000 / 60)); for (let i = 0; i < n; i++) step(1 / 60); render(); },
  lift() { let t = 0; for (const g of groups) for (let i = 0; i < g.off.length; i++) t += Math.abs(g.off[i]); return t * 10; },
  panel() { return { x: zone.x0 + 50, y: zone.y0 + 60, w: zone.x1 - zone.x0 - 100, h: zone.y1 - zone.y0 - 100 }; },
  count: () => total, info: () => renderer.info.render,
  debug() { const o = { n: 0, ox: 0, oy: 0, oz: 0, rot: 0 }; for (const g of groups) for (let i = 0; i < g.n; i++) { const j = i * 3; const L = Math.abs(g.off[j]) + Math.abs(g.off[j + 1]) + Math.abs(g.off[j + 2]);
    if (L > 0.3) { o.n++; o.ox += g.off[j]; o.oy += g.off[j + 1]; o.oz += g.off[j + 2]; o.rot += Math.abs(g.rot[j]) + Math.abs(g.rot[j + 2]); } } for (const k of ['ox', 'oy', 'oz', 'rot']) o[k] = +(o[k] / Math.max(1, o.n)).toFixed(2); return o; },
};

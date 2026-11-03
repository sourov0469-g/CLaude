/* HERO B, "the real house, torn and rebuilt" (heroes sheet, Hero 1's spirit, full screen).
   The firm's own photograph of a finished job fills the screen. Its gable wall is cut into the real lap boards it is
   made of (course lines run to the wall's measured vanishing point, staggered joints, windows left whole). On load the
   boards are torn off, showing the house wrap underneath, and a burst of real materials flies out around the house; the
   boards fly home bottom course first. The cursor stirs the boards and the loose materials like water; leaving repairs
   the wall. Every piece casts a real shadow on the photograph. */
import { THREE, RM, rnd, reseed, stage, materials, Pieces, halo, run, hooks } from './kit.js';

const hero = document.querySelector('.hero'), canvas = hero.querySelector('canvas');
const { renderer, scene, camera, key } = stage(canvas, { exposure: 1.0, shadow: innerWidth <= 820 ? 1024 : 2048 });
const M = materials(), P = new Pieces(scene, camera);
const D = window.PHOTO_BOARDS, IMG = new Image();
const CAM_D = 60;
let k = 1, plane, board0 = [], ready = false, built = false, api;

IMG.onload = () => {
  // the base: the photograph with the gable wall replaced by house wrap (what you see behind a lifted board)
  const c = document.createElement('canvas'); c.width = D.w; c.height = D.h; const g = c.getContext('2d');
  g.drawImage(IMG, 0, 0);
  g.save(); g.beginPath(); D.wall.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.clip();
  g.fillStyle = '#E9E7E1'; g.fillRect(0, 0, D.w, D.h);
  g.strokeStyle = 'rgba(120,124,128,.16)'; g.lineWidth = 1;
  for (let x = 660; x < 1350; x += 46) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 6, D.h); g.stroke(); }          // studs behind the wrap
  g.fillStyle = 'rgba(70,76,82,.45)'; for (let y = 160; y < 640; y += 26) for (let x = 660; x < 1350; x += 46) { g.beginPath(); g.arc(x + 3, y + (x - 652) * 0.05, 1.3, 0, 6.28); g.fill(); }
  g.fillStyle = 'rgba(57,103,145,.10)'; g.font = '600 15px Inter, sans-serif';
  for (let y = 190; y < 640; y += 120) for (let x = 700; x < 1330; x += 210) g.fillText('HOUSE WRAP', x, y + (x - 652) * 0.12);
  g.restore();
  for (const [x0, y0, x1, y1] of D.holes) { const m = 24; g.drawImage(IMG, x0 - m, y0 - m, x1 - x0 + 2 * m, y1 - y0 + 2 * m, x0 - m, y0 - m, x1 - x0 + 2 * m, y1 - y0 + 2 * m); }
  const baseTex = new THREE.CanvasTexture(c); baseTex.colorSpace = THREE.SRGBColorSpace; baseTex.anisotropy = 8;
  const photoTex = new THREE.Texture(IMG); photoTex.colorSpace = THREE.SRGBColorSpace; photoTex.anisotropy = 8; photoTex.needsUpdate = true;

  plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: baseTex, toneMapped: false }));
  scene.add(plane);
  const catcher = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShadowMaterial({ opacity: 0.34 }));
  catcher.receiveShadow = true; catcher.position.z = 0.02; scene.add(catcher); plane.userData.catcher = catcher;
  // the boards: each its own extruded polygon, textured with the photo where it sits (unlit, so the photo stays true)
  const bmat = new THREE.MeshBasicMaterial({ map: photoTex, toneMapped: false });
  const edge = new THREE.MeshBasicMaterial({ color: '#B8B1A2', toneMapped: false });
  for (const b of D.boards) {
    const cx = b.p.reduce((a, p) => a + p[0], 0) / b.p.length, cy = b.p.reduce((a, p) => a + p[1], 0) / b.p.length;
    board0.push({ b, cx, cy, mats: [bmat, edge] });
  }
  ready = true; start();
};
IMG.src = window.PHOTO_SRC;

function layout(VW, VH) {
  const m = VW <= 820, tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  camera.position.set(0, 0, CAM_D); camera.lookAt(0, 0, 0); camera.clearViewOffset(); camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
  const H = 2 * CAM_D * tanH, Wv = H * camera.aspect;
  let pw, ph, px, py;
  if (!m) { pw = Math.max(Wv, H * D.w / D.h); ph = pw * D.h / D.w; px = 0; py = (ph - H) / 2 * 0.86; }   // full bleed, roof kept in frame
  else { ph = H * 0.6; pw = ph * D.w / D.h; px = -(1000 - D.w / 2) * (pw / D.w); py = H / 2 - ph / 2; }   // top 60%, centred on the gable
  k = pw / D.w; plane.scale.set(pw, ph, 1); plane.position.set(px, py, 0);
  plane.userData.catcher.scale.set(pw, ph, 1); plane.userData.catcher.position.set(px, py, 0.02);
  key.position.set(px - 14, py + 22, 80); key.target.position.set(px, py, 0);
  Object.assign(key.shadow.camera, { left: -pw * 0.7, right: pw * 0.7, top: ph * 0.7, bottom: -ph * 0.7, near: 10, far: 160 }); key.shadow.camera.updateProjectionMatrix();
  return { px, py, pw, ph };
}
const toWorld = (L, x, y) => new THREE.Vector3(L.px + (x - D.w / 2) * k, L.py - (y - D.h / 2) * k, 0);

function start() {
  if (api || !ready) return;
  api = run({ hero, canvas, renderer, scene, camera, pieces: P, wall: null, onResize: (VW, VH) => {
    const L = layout(VW, VH);
    if (!built) {
      built = true;
      for (const o of board0) {
        // a board with real thickness, built in photo pixels then scaled to the world, pivot at its centre
        const s = new THREE.Shape(); o.b.p.forEach(([x, y], i) => (i ? s.lineTo(x - o.cx, -(y - o.cy)) : s.moveTo(x - o.cx, -(y - o.cy))));
        const geo = new THREE.ExtrudeGeometry(s, { depth: 3, bevelEnabled: false });
        const pos = geo.attributes.position, uv = geo.attributes.uv;
        for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + o.cx) / D.w, 1 - (-pos.getY(i) + o.cy) / D.h);
        geo.translate(0, 0, -3); geo.scale(k, k, k);
        const mesh = new THREE.Mesh(geo, o.mats); mesh.castShadow = true; mesh.position.copy(toWorld(L, o.cx, o.cy)).setZ(0.06); scene.add(mesh);
        P.addMesh(mesh, { order: 40 - o.b.c, n: new THREE.Vector3(0, 0, 1), k: 150 });
      }
      const c = document.querySelector('.copy').getBoundingClientRect(), h = document.querySelector('.hdr').getBoundingClientRect(), hr = hero.getBoundingClientRect();
      const keep = [{ x0: c.left - hr.left - 70, x1: c.right - hr.left + 60, y0: c.top - hr.top - 60, y1: c.bottom - hr.top + 60 }, { x0: 0, x1: VW, y0: 0, y1: h.bottom - hr.top + 30 }, { x0: 0, x1: VW, y0: VH * 0.66, y1: VH }];
      // the burst: loose real materials around the house, denser at the wall's edges
      const wc = toWorld(L, 1000, 380).project(camera), fx = (wc.x + 1) / 2 * VW, fy = (1 - wc.y) / 2 * VH;
      reseed(1984);
      halo(P, M, camera, VW, VH, VW <= 820 ? 12 : 30, { keep, allow: VW <= 820 ? null : (x, y) => (y < VH * 0.34 && x > VW * 0.38) || (x > VW * 0.84 && y < VH * 0.64),
        kinds: ['blue', 'blue', 'cream', 'cream', 'cream', 'shake', 'shake', 'nail', 'nail', 'bb', 'trim'], near: 44, far: 57 });
      P.build();
      const bx = [], by = []; for (const it of P.items) if (it.mesh) { const v = it.hp.clone().project(camera); bx.push((v.x + 1) / 2 * VW); by.push((1 - v.y) / 2 * VH); }
      P.zone = { x0: Math.min(...bx) - 60, x1: Math.max(...bx) + 60, y0: Math.min(...by) - 60, y1: Math.max(...by) + 60 };
      centre = toWorld(L, 1000, 380);
    }
  } });
  hooks(api, P, null, { centre, tearOpts });
  if (RM) { P.snap(); api.render(); hero.classList.add('built'); } else { P.tear(centre, tearOpts); api.render(); api.start(); }
}
let centre = new THREE.Vector3();
const tearOpts = { spread: 0.9, release: 46, base: 220, floatFar: 1.4, avoid: () => { const c = document.querySelector('.copy').getBoundingClientRect(), h = hero.getBoundingClientRect(); return { x0: c.left - h.left - 30, x1: c.right - h.left + 30, y0: c.top - h.top - 30, y1: c.bottom - h.top + 30 }; } };

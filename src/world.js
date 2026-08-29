/* ==========================================================================
   THE WORLD
   A single continuous daylight model of the PizzaBurg story. Fourteen zones
   are laid out along +X; advancing a slide flies the camera to the next
   waypoint rather than cutting. Everything is built from primitives and
   canvas textures so the whole deck stays one offline file.
   ========================================================================== */

const World = (function () {
  const T = window.THREE;

  const PAPER = 0xf3ece1;      // the air, and the fog
  const GROUND = 0xdfd2bd;
  const PLASTER = 0xf0e6d8;
  const CLAY = 0xd9a184;
  const WOOD = 0xc79a6a;
  const SLATE = 0x9a9088;
  const STEEL = 0xd2d4d6;
  const RED = 0xe23b2e;
  const DEEPRED = 0xa82418;
  const AMBER = 0xf0a830;
  const BASIL = 0x4e7a5b;
  const INK = 0x3a332d;

  let renderer, scene, camera, root;
  let dust, sun;
  let running = false, reduced = false, ready = false, still = false;
  const updaters = [];
  const clock = { t: 0, last: 0 };

  /* current camera state — tweened by GSAP, read every frame */
  const rig = {
    px: 0, py: 15, pz: 62, tx: 0, ty: 9, tz: 0, fov: 40,
    /* bezier control point, used to make moves arc instead of slide */
    cx: 0, cy: 0, cz: 0, u: 1,
    /* start + end of the current flight */
    ax: 0, ay: 0, az: 0, bx: 0, by: 0, bz: 0,
    atx: 0, aty: 0, atz: 0, btx: 0, bty: 0, btz: 0,
  };
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

  /* ---------------------------------------------------------------- utils */

  const mat = (color, o = {}) => new T.MeshStandardMaterial({
    color, roughness: o.rough === undefined ? 0.82 : o.rough,
    metalness: o.metal === undefined ? 0.02 : o.metal,
    emissive: o.emissive === undefined ? 0x000000 : o.emissive,
    emissiveIntensity: o.ei === undefined ? 1 : o.ei,
    transparent: !!o.opacity, opacity: o.opacity === undefined ? 1 : o.opacity,
    side: o.side || T.FrontSide, flatShading: !!o.flat, map: o.map || null,
  });

  function box(w, h, d, color, o = {}) {
    const m = new T.Mesh(new T.BoxGeometry(w, h, d), o.material || mat(color, o));
    if (o.pos) m.position.set(o.pos[0], o.pos[1], o.pos[2]);
    if (o.rot) m.rotation.set(o.rot[0], o.rot[1], o.rot[2]);
    return m;
  }

  function cyl(rt, rb, h, seg, color, o = {}) {
    const m = new T.Mesh(new T.CylinderGeometry(rt, rb, h, seg, 1, !!o.open), o.material || mat(color, o));
    if (o.pos) m.position.set(o.pos[0], o.pos[1], o.pos[2]);
    if (o.rot) m.rotation.set(o.rot[0], o.rot[1], o.rot[2]);
    return m;
  }

  function ball(r, color, o = {}) {
    const m = new T.Mesh(new T.SphereGeometry(r, o.seg || 20, (o.seg || 20) / 2), o.material || mat(color, o));
    if (o.pos) m.position.set(o.pos[0], o.pos[1], o.pos[2]);
    return m;
  }

  /* A soft blob of shadow. Cheaper and calmer than a real shadow map, and it
     keeps the light palette from going muddy. */
  let shadowTex = null;
  function shadowTexture() {
    if (shadowTex) return shadowTex;
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const rg = g.createRadialGradient(64, 64, 2, 64, 64, 62);
    rg.addColorStop(0, 'rgba(74,54,36,0.78)');
    rg.addColorStop(0.5, 'rgba(74,54,36,0.32)');
    rg.addColorStop(1, 'rgba(74,54,36,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
    shadowTex = new T.CanvasTexture(c);
    return shadowTex;
  }

  function contact(x, z, r, opacity = 1, y = 0.02) {
    const m = new T.Mesh(
      new T.PlaneGeometry(r * 2, r * 2),
      new T.MeshBasicMaterial({ map: shadowTexture(), transparent: true, opacity, depthWrite: false })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, y, z);
    return m;
  }

  /* Painted facade: warm plaster with rows of windows. */
  const facadeCache = {};
  function facadeTexture(key, opts) {
    if (facadeCache[key]) return facadeCache[key];
    const c = document.createElement('canvas');
    c.width = 256; c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = opts.wall; g.fillRect(0, 0, 256, 512);
    /* faint horizontal banding so the plaster is not dead flat */
    for (let y = 0; y < 512; y += 4) {
      g.fillStyle = `rgba(0,0,0,${(Math.sin(y * 0.7) + 1) * 0.008})`;
      g.fillRect(0, y, 256, 2);
    }
    const cols = opts.cols || 3, rows = opts.rows || 6;
    const wpad = 256 / (cols + 1);
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const x = wpad * (col + 0.5) + wpad * 0.25;
        const y = 44 + r * (440 / rows);
        const w = wpad * 0.5, h = (440 / rows) * 0.52;
        g.fillStyle = opts.frame || '#cbbca6';
        g.fillRect(x - 3, y - 3, w + 6, h + 6);
        g.fillStyle = opts.glass || '#b9cbd6';
        g.fillRect(x, y, w, h);
        /* a highlight so glass reads as glass */
        g.fillStyle = 'rgba(255,255,255,0.35)';
        g.beginPath(); g.moveTo(x, y + h); g.lineTo(x + w, y); g.lineTo(x + w, y + h * 0.25); g.lineTo(x + w * 0.3, y + h);
        g.closePath(); g.fill();
        /* mullion */
        g.fillStyle = opts.frame || '#cbbca6';
        g.fillRect(x + w / 2 - 1, y, 2, h);
      }
    }
    const tex = new T.CanvasTexture(c);
    tex.colorSpace = T.SRGBColorSpace;
    facadeCache[key] = tex;
    return tex;
  }

  /* Flat text drawn onto a plane — used for the handful of in-world signs. */
  function signTexture(text, o = {}) {
    const c = document.createElement('canvas');
    const pad = 24;
    c.width = 512; c.height = o.tall ? 256 : 128;
    const g = c.getContext('2d');
    g.fillStyle = o.bg || '#e23b2e';
    if (o.round) {
      const r = 28;
      g.beginPath();
      g.moveTo(r, 0); g.lineTo(c.width - r, 0); g.quadraticCurveTo(c.width, 0, c.width, r);
      g.lineTo(c.width, c.height - r); g.quadraticCurveTo(c.width, c.height, c.width - r, c.height);
      g.lineTo(r, c.height); g.quadraticCurveTo(0, c.height, 0, c.height - r);
      g.lineTo(0, r); g.quadraticCurveTo(0, 0, r, 0); g.fill();
    } else {
      g.fillRect(0, 0, c.width, c.height);
    }
    g.fillStyle = o.fg || '#fff';
    g.font = `700 ${o.size || 74}px Poppins, Inter, system-ui, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, c.width / 2, c.height / 2 + (o.dy || 0));
    const tex = new T.CanvasTexture(c);
    tex.colorSpace = T.SRGBColorSpace;
    return tex;
  }

  /* A pinned photographic print, floating in the model. */
  function printPlane(src, w, o = {}) {
    const g = new T.Group();
    const tex = Media.texture(src);
    const ar = o.ar || 1.5;
    const h = w / ar;
    const border = w * 0.045;
    g.add(box(w + border * 2, h + border * 2, 0.18, 0xfffaf2, { rough: 0.95 }));
    const img = new T.Mesh(
      new T.PlaneGeometry(w, h),
      new T.MeshBasicMaterial({ map: tex, toneMapped: false })
    );
    img.position.z = 0.11;
    g.add(img);
    if (o.pos) g.position.set(o.pos[0], o.pos[1], o.pos[2]);
    if (o.rot) g.rotation.set(o.rot[0], o.rot[1], o.rot[2]);
    return g;
  }

  /* A small standing person, at model scale. */
  function figure(color, scale = 1) {
    const g = new T.Group();
    const m = mat(color, { rough: 0.9 });
    const body = new T.Mesh(new T.CapsuleGeometry(0.32, 0.9, 4, 10), m);
    body.position.y = 0.95;
    g.add(body);
    const head = new T.Mesh(new T.SphereGeometry(0.28, 14, 10), m);
    head.position.y = 1.72;
    g.add(head);
    g.scale.setScalar(scale);
    return g;
  }

  /* --------------------------------------------------------------- lights */

  /* A vertical gradient standing in for sky. Flat colour behind a light scene
     reads as an unfinished render; a gradient reads as air. */
  function skyTexture() {
    const c = document.createElement('canvas');
    c.width = 8; c.height = 256;
    const g = c.getContext('2d');
    const lg = g.createLinearGradient(0, 0, 0, 256);
    lg.addColorStop(0.00, '#dfe8ee');
    lg.addColorStop(0.34, '#f2ecdf');
    lg.addColorStop(0.56, '#f6ecd9');
    lg.addColorStop(0.72, '#efe0c9');
    lg.addColorStop(1.00, '#e2d0b6');
    g.fillStyle = lg; g.fillRect(0, 0, 8, 256);
    const tex = new T.CanvasTexture(c);
    tex.colorSpace = T.SRGBColorSpace;
    tex.mapping = T.EquirectangularReflectionMapping;
    return tex;
  }

  function makeEnvironment() {
    /* A gradient sky baked into an env map. Without this, standard materials
       in a bright scene read as flat paint. */
    const c = document.createElement('canvas');
    c.width = 64; c.height = 128;
    const g = c.getContext('2d');
    const lg = g.createLinearGradient(0, 0, 0, 128);
    lg.addColorStop(0, '#fffaf0');
    lg.addColorStop(0.42, '#f6ead8');
    lg.addColorStop(0.55, '#e8dcc9');
    lg.addColorStop(1, '#c8b9a4');
    g.fillStyle = lg; g.fillRect(0, 0, 64, 128);
    /* a warm sun blob so highlights have somewhere to come from */
    const sg = g.createRadialGradient(44, 26, 1, 44, 26, 22);
    sg.addColorStop(0, 'rgba(255,246,220,1)');
    sg.addColorStop(1, 'rgba(255,246,220,0)');
    g.fillStyle = sg; g.fillRect(0, 0, 64, 64);
    const tex = new T.CanvasTexture(c);
    tex.mapping = T.EquirectangularReflectionMapping;
    tex.colorSpace = T.SRGBColorSpace;
    const pmrem = new T.PMREMGenerator(renderer);
    const env = pmrem.fromEquirectangular(tex).texture;
    pmrem.dispose(); tex.dispose();
    return env;
  }

  /* =========================================================== zone builds */

  const Z = {};

  /* --- 1. the street ----------------------------------------------------- */
  Z.street = function (g) {
    const road = box(46, 0.4, 120, 0xdcd3c6, { pos: [0, 0.2, -20] });
    g.add(road);
    /* pavement kerbs */
    g.add(box(3, 1.1, 120, 0xe6ddd0, { pos: [-21, 0.5, -20] }));
    g.add(box(3, 1.1, 120, 0xe6ddd0, { pos: [21, 0.5, -20] }));

    const specs = [
      { w: 15, h: 21, x: -26, wall: '#e9dcc6', cols: 3, rows: 6 },
      { w: 13, h: 16, x: -12.5, wall: '#e2d0bb', cols: 3, rows: 4 },
      { w: 17, h: 19, x: 2, wall: '#f2e7d6', cols: 4, rows: 5, hero: true },
      { w: 12, h: 24, x: 16.5, wall: '#e6d8c4', cols: 3, rows: 7 },
      { w: 14, h: 15, x: 29, wall: '#ddd0bd', cols: 3, rows: 4 },
    ];

    specs.forEach((s, i) => {
      const tex = facadeTexture('f' + i, { wall: s.wall, cols: s.cols, rows: s.rows });
      const m = mat(0xffffff, { map: tex, rough: 0.92 });
      const b = box(s.w, s.h, 14, 0xffffff, { material: m, pos: [s.x, s.h / 2, -14] });
      g.add(b);
      /* plain sides so the window texture does not wrap oddly */
      g.add(box(s.w + 0.1, s.h, 0.2, 0xe4d8c6, { pos: [s.x, s.h / 2, -21.1] }));
      /* roof cap */
      g.add(box(s.w + 0.8, 0.7, 14.8, 0xcfc2ae, { pos: [s.x, s.h + 0.3, -14] }));
      g.add(contact(s.x, -14, s.w * 0.85, 0.85));

      if (s.hero) {
        /* the PizzaBurg shopfront */
        const front = -14 + 7.05;
        g.add(box(s.w - 1.2, 6.4, 0.3, 0xf7f2e8, { pos: [s.x, 3.4, front] }));
        /* glazing */
        const glass = new T.Mesh(
          new T.PlaneGeometry(s.w - 2.6, 4.6),
          new T.MeshPhysicalMaterial({ color: 0xd8e6ec, roughness: 0.08, metalness: 0, transmission: 0.55, transparent: true, opacity: 0.85 })
        );
        glass.position.set(s.x, 3.3, front + 0.2);
        g.add(glass);
        /* the sign band */
        const signMat = new T.MeshBasicMaterial({ map: signTexture('PizzaBurg', { size: 96, round: false }), toneMapped: false });
        const sign = new T.Mesh(new T.PlaneGeometry(11, 2.75), signMat);
        sign.position.set(s.x, 8.4, front + 0.25);
        g.add(sign);
        g.add(box(11.8, 3.4, 0.5, 0xfbf6ec, { pos: [s.x, 8.4, front + 0.02] }));
        /* awning */
        const aw = box(13, 0.4, 3.4, RED, { pos: [s.x, 6.9, front + 1.8], rot: [-0.22, 0, 0] });
        g.add(aw);
        /* the roundel from the wall inside the real outlet */
        const roundel = new T.Mesh(
          new T.CircleGeometry(1.9, 40),
          new T.MeshStandardMaterial({ color: DEEPRED, roughness: 0.5, emissive: DEEPRED, emissiveIntensity: 0.25 })
        );
        roundel.position.set(s.x + 6.4, 4.6, front + 0.3);
        g.add(roundel);
        const ring = new T.Mesh(new T.RingGeometry(1.95, 2.35, 44), new T.MeshBasicMaterial({ color: 0xffe9b8, transparent: true, opacity: 0.75 }));
        ring.position.copy(roundel.position); ring.position.z += 0.02;
        g.add(ring);
      }
    });

    /* street lamps */
    for (let i = 0; i < 4; i++) {
      const x = -18 + i * 12, z = -2;
      g.add(cyl(0.16, 0.2, 9, 8, SLATE, { pos: [x, 4.5, z] }));
      g.add(box(2.4, 0.3, 0.6, SLATE, { pos: [x + 1, 9, z] }));
      const bulb = ball(0.42, 0xfff2cf, { pos: [x + 2, 8.8, z], rough: 0.3, emissive: 0xffe9b0, ei: 0.7 });
      g.add(bulb);
    }

    /* a parked motorbike, because there was one in the room */
    const bike = new T.Group();
    bike.add(box(2.4, 0.5, 0.7, 0x4a4a4e, { pos: [0, 1.1, 0] }));
    bike.add(cyl(0.62, 0.62, 0.28, 18, 0x2e2e31, { pos: [-1.1, 0.65, 0], rot: [Math.PI / 2, 0, 0] }));
    bike.add(cyl(0.62, 0.62, 0.28, 18, 0x2e2e31, { pos: [1.1, 0.65, 0], rot: [Math.PI / 2, 0, 0] }));
    bike.position.set(-8, 0.3, 4);
    bike.rotation.y = 0.5;
    g.add(bike);
    g.add(contact(-8, 4, 2.6, 0.55));

    /* reference prints, pinned in the air above the block */
    g.add(printPlane('stock-storefront-pizzeria-sunny', 13, { ar: 3 / 2, pos: [-30, 17, 12], rot: [-0.08, 0.52, 0.03] }));
    g.add(printPlane('outlet-sign-alt', 9, { ar: 1000 / 898, pos: [31, 15, 10], rot: [-0.06, -0.55, -0.03] }));

    /* planters */
    [[10, 5], [14, 5]].forEach(([x, z]) => {
      g.add(box(2, 1.4, 2, CLAY, { pos: [x, 0.7, z] }));
      const leaf = mat(0x6f8f62, { rough: 0.95, flat: true });
      for (let i = 0; i < 5; i++) {
        const b = ball(0.7 + Math.random() * 0.35, 0x6f8f62, { seg: 8, material: leaf });
        b.position.set(x + (Math.random() - 0.5) * 1.2, 1.9 + Math.random() * 1.0, z + (Math.random() - 0.5) * 1.2);
        g.add(b);
      }
    });
  };

  /* --- 2. the map table -------------------------------------------------- */
  const BD_OUTLINE = [
    [88.7, 26.6], [89.4, 26.1], [89.85, 26.2], [90.4, 26.1], [91.0, 26.3], [92.0, 25.2],
    [92.6, 25.1], [92.4, 24.4], [91.6, 24.1], [91.4, 23.2], [91.9, 23.1], [92.4, 22.3],
    [92.6, 21.4], [92.15, 21.1], [91.9, 21.9], [91.5, 22.5], [90.9, 21.9], [90.6, 22.3],
    [90.2, 21.8], [89.9, 21.85], [89.6, 21.6], [89.1, 21.9], [88.9, 22.35], [88.7, 23.2],
    [88.1, 23.6], [88.7, 24.2], [88.1, 24.7], [88.4, 25.2], [88.1, 25.6],
  ];
  const CITIES = [
    ['Dhaka', 90.40, 23.81, 12], ['Chattogram', 91.83, 22.36, 2], ['Narayanganj', 90.50, 23.62, 1],
    ['Cumilla', 91.18, 23.46, 1], ['Rajshahi', 88.60, 24.37, 1], ['Feni', 91.40, 23.02, 1],
    ['Khulna', 89.57, 22.81, 1], ['Mymensingh', 90.40, 24.75, 1], ['Barishal', 90.37, 22.70, 1],
    ['Noakhali', 91.10, 22.87, 1],
  ];
  const MAP_S = 7.2, MAP_LON0 = 90.35, MAP_LAT0 = 23.9;
  const mapX = (lon) => (lon - MAP_LON0) * MAP_S;
  const mapZ = (lat) => -(lat - MAP_LAT0) * MAP_S;

  Z.map = function (g) {
    /* the table */
    g.add(box(64, 1.6, 46, WOOD, { pos: [0, 3.2, -6], rough: 0.7 }));
    g.add(box(60, 0.5, 42, 0xf6efe3, { pos: [0, 4.1, -6] }));
    [[-27, 12], [27, 12], [-27, -24], [27, -24]].forEach(([x, z]) => {
      g.add(box(1.6, 2.4, 1.6, WOOD, { pos: [x, 1.2, z], rough: 0.7 }));
    });
    g.add(contact(0, -6, 30, 0.7));

    /* the country, extruded as a clay model */
    const shape = new T.Shape();
    BD_OUTLINE.forEach((p, i) => {
      const x = mapX(p[0]), y = -mapZ(p[1]);
      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
    });
    shape.closePath();
    const geo = new T.ExtrudeGeometry(shape, { depth: 1.1, bevelEnabled: true, bevelSize: 0.22, bevelThickness: 0.22, bevelSegments: 2, curveSegments: 2 });
    const land = new T.Mesh(geo, mat(0xe4c9ae, { rough: 0.88 }));
    land.rotation.x = -Math.PI / 2;
    land.position.set(0, 4.4, -6);
    g.add(land);
    /* a thin halo so the coast reads against the table */
    const halo = new T.Mesh(geo, new T.MeshBasicMaterial({ color: 0xc9a98d, transparent: true, opacity: 0.3 }));
    halo.rotation.x = -Math.PI / 2;
    halo.position.set(0, 4.32, -6);
    halo.scale.set(1.02, 1.02, 1);
    g.add(halo);

    /* 22 pins — twelve clustered on Dhaka, ten scattered */
    const pins = [];
    const stemGeo = new T.CylinderGeometry(0.085, 0.085, 3.2, 6);
    const stemMat = mat(0xb6a893, { rough: 0.7 });
    const headGeo = new T.SphereGeometry(0.42, 14, 10);
    const headMat = mat(RED, { rough: 0.42, emissive: RED, ei: 0.22 });
    let k = 0;
    CITIES.forEach(([name, lon, lat, n]) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + k;
        const spread = n > 1 ? 1.05 + (i % 4) * 0.55 : 0;
        const px = mapX(lon) + Math.cos(a) * spread;
        const pz = mapZ(lat) - 6 + Math.sin(a) * spread;
        const grp = new T.Group();
        const stem = new T.Mesh(stemGeo, stemMat); stem.position.y = 1.6;
        const head = new T.Mesh(headGeo, headMat); head.position.y = 3.4;
        grp.add(stem, head);
        grp.position.set(px, 4.9, pz);
        grp.userData.base = 4.9;
        grp.userData.phase = k * 0.7;
        g.add(grp);
        pins.push(grp);
        k++;
      }
    });

    /* the Dhaka cluster gets a ring to show the concentration */
    const ring = new T.Mesh(new T.RingGeometry(2.6, 2.95, 60), new T.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0.4, side: T.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(mapX(90.40), 4.62, mapZ(23.81) - 6);
    g.add(ring);

    updaters.push((t) => {
      pins.forEach((p, i) => {
        p.position.y = p.userData.base + Math.sin(t * 1.1 + p.userData.phase) * 0.16;
      });
      ring.scale.setScalar(1 + Math.sin(t * 1.4) * 0.05);
    });

    /* pinned reference prints beside the table */
    g.add(printPlane('brand-card', 9, { ar: 1.59, pos: [-27, 12, 6], rot: [-0.16, 0.5, 0.04] }));
    g.add(printPlane('pizzaburg-sausage-carnival-pizza', 8, { ar: 1.4, pos: [27, 13, 4], rot: [-0.12, -0.5, -0.04] }));
  };

  /* --- 3. the meeting room ---------------------------------------------- */
  Z.meeting = function (g) {
    /* floor and two walls, open to the camera */
    g.add(box(34, 0.3, 28, 0xe8e0d2, { pos: [0, 0.15, -6] }));
    g.add(box(34, 14, 0.4, 0xf4ede0, { pos: [0, 7, -20] }));
    g.add(box(0.4, 14, 28, 0xefe7d9, { pos: [-17, 7, -6] }));

    /* the window wall — flat bright daylight, the way the room actually was */
    const winMat = new T.MeshBasicMaterial({ color: 0xfdf8ea });
    [-6.5, 1.5].forEach((x) => {
      const w = new T.Mesh(new T.PlaneGeometry(6, 6.4), winMat);
      w.position.set(x, 8, -19.7);
      g.add(w);
      /* grille, as in the photographs */
      const bars = new T.Group();
      for (let i = 1; i < 5; i++) bars.add(box(0.12, 6.4, 0.12, 0x3c4550, { pos: [x - 3 + i * 1.2, 8, -19.6] }));
      for (let i = 1; i < 5; i++) bars.add(box(6, 0.12, 0.12, 0x3c4550, { pos: [x, 5 + i * 1.28, -19.6] }));
      g.add(bars);
      g.add(box(6.6, 7, 0.25, 0xdfd6c6, { pos: [x, 8, -19.9] }));
    });

    /* the desk */
    g.add(box(16, 0.4, 6.4, 0xe4d5bf, { pos: [0, 3.4, -8], rough: 0.6 }));
    [[-7, -10.5], [7, -10.5], [-7, -5.5], [7, -5.5]].forEach(([x, z]) => g.add(box(0.5, 3.4, 0.5, 0xcbb99f, { pos: [x, 1.7, z] })));
    g.add(contact(0, -8, 9, 0.6));

    /* laptop */
    const lap = new T.Group();
    lap.add(box(2.6, 0.14, 1.8, 0x2b2b2e, { pos: [0, 0, 0] }));
    lap.add(box(2.6, 1.7, 0.12, 0x2b2b2e, { pos: [0, 0.85, -0.9], rot: [-0.22, 0, 0] }));
    lap.position.set(-2.6, 3.68, -8.4);
    lap.rotation.y = 0.35;
    g.add(lap);

    /* stack of files */
    for (let i = 0; i < 5; i++) {
      const c = [0xf2ead9, 0xe6dcc8, 0xd8ccb6, 0xf2ead9, 0xcbbfa8][i];
      g.add(box(3.2 - i * 0.06, 0.22, 2.3, c, { pos: [4.2, 3.72 + i * 0.24, -8.6], rot: [0, 0.08 * (i % 2 ? 1 : -1), 0] }));
    }

    /* the blue bottle from the footage */
    const bottle = new T.Group();
    bottle.add(cyl(0.42, 0.5, 2.6, 14, 0x62c8d8, { rough: 0.15, metal: 0.05, opacity: 0.72, pos: [0, 1.3, 0] }));
    bottle.add(cyl(0.24, 0.3, 0.6, 12, 0x2fa8bd, { pos: [0, 2.85, 0] }));
    bottle.position.set(6.6, 3.6, -6.6);
    g.add(bottle);

    /* notebook, open */
    g.add(box(2.2, 0.08, 1.6, 0xfdfaf1, { pos: [-6, 3.64, -6.8], rot: [0, 0.2, 0] }));

    /* chairs */
    [[-5, -3.6, 0.1], [1.5, -3.4, -0.05], [-11, -8, 1.4]].forEach(([x, z, ry]) => {
      const ch = new T.Group();
      ch.add(box(1.9, 0.25, 1.9, 0x8e3b34, { pos: [0, 1.9, 0] }));
      ch.add(box(1.9, 2.1, 0.25, 0x8e3b34, { pos: [0, 3, -0.85] }));
      [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].forEach(([a, b]) => ch.add(box(0.16, 1.9, 0.16, 0x5a5a5e, { pos: [a, 0.95, b] })));
      ch.position.set(x, 0, z); ch.rotation.y = ry;
      g.add(ch);
    });

    /* the group and the manager, at model scale */
    const people = [
      [-5, -3.6, 0x2c3038], [1.5, -3.4, 0x6d4d52], [-11.5, -7.6, 0x2c3038],
      [8.5, -12, 0xb8474a], [-13.5, -3, 0x8a7f74],
    ];
    people.forEach(([x, z, c]) => {
      const f = figure(c, 1.5);
      f.position.set(x, 0.3, z);
      f.rotation.y = Math.atan2(0 - x, -8 - z);
      g.add(f);
      g.add(contact(x, z, 1.4, 0.5));
    });

    /* the field prints, pinned in the air */
    g.add(printPlane('interview-wide', 11, { ar: 16 / 9, pos: [15, 9, -4], rot: [-0.05, -0.55, 0.02] }));
    g.add(printPlane('manager-card', 8, { ar: 1000 / 265, pos: [-15.5, 10.5, 1], rot: [-0.02, 0.6, -0.03] }));
  };

  /* --- 4. twenty-two identical units ------------------------------------ */
  Z.units = function (g) {
    g.add(box(74, 0.6, 52, 0xece3d4, { pos: [0, 0.3, -8] }));
    const COLS = 6, ROWS = 4, TOTAL = 22;
    const sx = 10.5, sz = 10.5;
    const bodies = [];
    for (let i = 0; i < TOTAL; i++) {
      const c = i % COLS, r = Math.floor(i / COLS);
      const x = (c - (COLS - 1) / 2) * sx;
      const z = (r - (ROWS - 1) / 2) * sz - 8;
      const u = new T.Group();
      u.add(box(6.4, 4.6, 6.4, PLASTER, { pos: [0, 2.3, 0] }));
      /* pitched roof */
      const roof = new T.Mesh(new T.ConeGeometry(5.1, 2.1, 4), mat(0xc9705d, { rough: 0.85 }));
      roof.rotation.y = Math.PI / 4; roof.position.y = 5.65;
      u.add(roof);
      /* the red band */
      u.add(box(5.2, 0.9, 0.2, RED, { pos: [0, 3.9, 3.25] }));
      /* door and window */
      u.add(box(1.5, 2.4, 0.16, 0x8f6f52, { pos: [-1.4, 1.2, 3.25] }));
      u.add(box(2.2, 1.6, 0.14, 0xc3d6dd, { pos: [1.3, 2.2, 3.25] }));
      u.position.set(x, 0.6, z);
      u.userData.i = i;
      g.add(u);
      g.add(contact(x, z, 4.6, 0.6));
      bodies.push(u);
    }

    g.add(printPlane('pizzaburg-meaty-onion-pizza', 10, { ar: 1.35, pos: [-42, 15, 8], rot: [-0.08, 0.55, 0.03] }));
    g.add(printPlane('table-pizzas', 9, { ar: 1200 / 1280, pos: [42, 15, 6], rot: [-0.08, -0.55, -0.03] }));

    /* a translucent sheet of demand rolling over the identical units */
    const wgeo = new T.PlaneGeometry(74, 52, 48, 34);
    const wave = new T.Mesh(wgeo, new T.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0.16, wireframe: true }));
    wave.rotation.x = -Math.PI / 2;
    wave.position.set(0, 9.4, -8);
    g.add(wave);
    const base = wgeo.attributes.position.array.slice();

    updaters.push((t) => {
      const p = wgeo.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const x = base[i * 3], y = base[i * 3 + 1];
        p.array[i * 3 + 2] = Math.sin(x * 0.14 + t * 0.9) * 1.9 + Math.cos(y * 0.19 - t * 0.6) * 1.5;
      }
      p.needsUpdate = true;
      /* every unit stays exactly the same height, whatever the wave says */
      bodies.forEach((u, i) => {
        const load = Math.sin(u.position.x * 0.14 + t * 0.9) + Math.cos((u.position.z + 8) * 0.19 - t * 0.6);
        u.children[2].material.emissive.setHex(load > 0.9 ? DEEPRED : 0x000000);
        u.children[2].material.emissiveIntensity = Math.max(0, load - 0.9) * 0.8;
      });
    });
  };

  /* --- 5. the kitchen pass ---------------------------------------------- */
  Z.kitchen = function (g) {
    g.add(box(40, 0.4, 34, 0xe2dccf, { pos: [0, 0.2, -8] }));
    g.add(box(40, 16, 0.5, 0xf1e8da, { pos: [0, 8, -25] }));

    /* the pass counter */
    g.add(box(26, 0.35, 5, STEEL, { pos: [0, 4.2, -4], rough: 0.28, metal: 0.55 }));
    g.add(box(25.4, 3.9, 4.6, 0xe7e4de, { pos: [0, 2.2, -4] }));
    g.add(contact(0, -4, 14, 0.55));
    /* heat lamps above the pass */
    for (let i = -2; i <= 2; i++) {
      g.add(cyl(0.06, 0.06, 4.4, 6, SLATE, { pos: [i * 5, 10.6, -4] }));
      const shade = new T.Mesh(new T.ConeGeometry(1.05, 1.1, 18, 1, true), mat(0xb8483c, { side: T.DoubleSide, rough: 0.55 }));
      shade.position.set(i * 5, 8.2, -4);
      g.add(shade);
      g.add(ball(0.3, 0xffdf9a, { pos: [i * 5, 7.7, -4], emissive: 0xffcf72, ei: 1.1, rough: 0.3 }));
    }

    /* the oven — a lathe arch with a warm mouth */
    const oven = new T.Group();
    const dome = new T.Mesh(new T.SphereGeometry(5.2, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xd5c3ab, { rough: 0.92 }));
    oven.add(dome);
    oven.add(cyl(5.6, 5.9, 1.4, 28, 0xbfae97, { pos: [0, 0.7, 0] }));
    const mouth = new T.Mesh(new T.CircleGeometry(1.9, 28), new T.MeshBasicMaterial({ color: 0xff9a3c }));
    mouth.position.set(0, 2.4, 5.05);
    oven.add(mouth);
    const glow = new T.Mesh(new T.CircleGeometry(3.4, 28), new T.MeshBasicMaterial({ color: 0xffb45c, transparent: true, opacity: 0.32 }));
    glow.position.set(0, 2.4, 5.12);
    oven.add(glow);
    oven.position.set(-13, 1.4, -16);
    g.add(oven);
    g.add(contact(-13, -16, 7, 0.6));

    /* dough station: a marble slab and three discs at stages of stretching */
    g.add(box(9, 0.4, 5, 0xf3efe6, { pos: [11, 4.2, -14], rough: 0.35 }));
    g.add(box(8.6, 3.9, 4.6, 0xdcd6cb, { pos: [11, 2.2, -14] }));
    [0, 1, 2].forEach((i) => {
      const r = 0.9 + i * 0.55;
      const d = cyl(r, r, 0.28 - i * 0.06, 26, 0xf0dcb4, { pos: [11 - 2.8 + i * 2.8, 4.55, -14], rough: 0.95 });
      g.add(d);
    });

    /* a stack of peels leaning on the wall */
    for (let i = 0; i < 4; i++) {
      const p = new T.Group();
      p.add(cyl(1.5, 1.5, 0.16, 22, 0x4b7c8a, { rot: [Math.PI / 2, 0, 0], pos: [0, 0, 0] }));
      p.add(box(0.5, 3.2, 0.14, WOOD, { pos: [0, -2.2, 0] }));
      p.position.set(19, 4, -22 + i * 0.5);
      p.rotation.z = -0.22 + i * 0.05;
      p.rotation.x = 0.12;
      g.add(p);
    }

    /* two cooks */
    [[-4, -10, 0xf2f0ec], [6, -10.5, 0xf2f0ec]].forEach(([x, z, c]) => {
      const f = figure(c, 1.6);
      f.position.set(x, 0.4, z);
      f.rotation.y = 0.3;
      g.add(f);
      g.add(contact(x, z, 1.5, 0.45));
    });

    g.add(printPlane('table-pizzas-alt', 9, { ar: 1100 / 1095, pos: [-21, 12, 2], rot: [-0.06, 0.62, 0.03] }));
    g.add(printPlane('pizza-left', 9, { ar: 1100 / 862, pos: [21, 12, 0], rot: [-0.06, -0.58, -0.03] }));
  };

  /* --- 6. the revolving door -------------------------------------------- */
  Z.door = function (g) {
    g.add(cyl(24, 24, 0.5, 64, 0xeae1d2, { pos: [0, 0.25, -6] }));

    /* the door itself */
    const drum = new T.Group();
    drum.position.set(0, 0, -6);
    const glassMat = new T.MeshPhysicalMaterial({ color: 0xcfe0e6, roughness: 0.1, transmission: 0.6, transparent: true, opacity: 0.6, side: T.DoubleSide });
    for (let i = 0; i < 4; i++) {
      const pane = new T.Mesh(new T.PlaneGeometry(5.4, 7.4), glassMat);
      pane.position.set(Math.cos(i * Math.PI / 2) * 2.7, 4.2, Math.sin(i * Math.PI / 2) * 2.7);
      pane.rotation.y = -i * Math.PI / 2 + Math.PI / 2;
      drum.add(pane);
      drum.add(box(0.18, 7.4, 0.18, SLATE, { pos: [Math.cos(i * Math.PI / 2) * 5.4, 4.2, Math.sin(i * Math.PI / 2) * 5.4] }));
    }
    drum.add(cyl(0.35, 0.35, 8, 10, SLATE, { pos: [0, 4, 0] }));
    drum.add(cyl(5.7, 5.7, 0.4, 40, 0xe0d6c6, { pos: [0, 8.2, 0] }));
    g.add(drum);
    g.add(contact(0, -6, 8, 0.6));

    /* inner ring: office staff, barely turning */
    const inner = new T.Group(); inner.position.set(0, 0, -6);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const f = figure(0x4d6a86, 1.35);
      f.position.set(Math.cos(a) * 9.5, 0.25, Math.sin(a) * 9.5);
      f.rotation.y = -a;
      inner.add(f);
    }
    g.add(inner);

    /* outer ring: floor and kitchen staff, turning steadily */
    const outer = new T.Group(); outer.position.set(0, 0, -6);
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const f = figure(0xc06a4e, 1.35);
      f.position.set(Math.cos(a) * 17, 0.25, Math.sin(a) * 17);
      f.rotation.y = -a;
      outer.add(f);
    }
    g.add(outer);

    /* the two rings, drawn on the floor */
    [[9.5, 0x4d6a86, 0.35], [17, 0xc06a4e, 0.35]].forEach(([r, c, o]) => {
      const ring = new T.Mesh(new T.RingGeometry(r - 0.12, r + 0.12, 90), new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, side: T.DoubleSide }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(0, 0.55, -6);
      g.add(ring);
    });

    g.add(printPlane('stock-delivery-rider-motorcycle-road', 11, { ar: 3 / 2, pos: [-24, 13, 12], rot: [-0.08, 0.6, 0.03] }));

    updaters.push((t) => {
      drum.rotation.y = t * 0.42;
      inner.rotation.y = t * 0.035;   // very low
      outer.rotation.y = t * 0.19;    // medium
    });
  };

  /* --- 7. the sixty-day bridge ------------------------------------------ */
  Z.bridge = function (g) {
    g.add(box(26, 4, 30, 0xe7ded0, { pos: [-27, 2, -6] }));
    g.add(box(26, 4, 30, 0xe7ded0, { pos: [27, 2, -6] }));
    g.add(contact(-27, -6, 15, 0.5, 0.06));
    g.add(contact(27, -6, 15, 0.5, 0.06));

    /* 60 slats */
    const slatGeo = new T.BoxGeometry(0.52, 0.3, 7);
    const slatMat = mat(WOOD, { rough: 0.85 });
    const slats = new T.InstancedMesh(slatGeo, slatMat, 60);
    const dummy = new T.Object3D();
    for (let i = 0; i < 60; i++) {
      dummy.position.set(-14 + (i / 59) * 28, 4, -6);
      dummy.updateMatrix();
      slats.setMatrixAt(i, dummy.matrix);
    }
    g.add(slats);

    /* the two cables */
    [-3.6, 3.6].forEach((z) => {
      const pts = [];
      for (let i = 0; i <= 40; i++) {
        const u = i / 40;
        pts.push(new T.Vector3(-15 + u * 30, 4 + 4.4 - Math.sin(u * Math.PI) * 3.4, -6 + z));
      }
      const curve = new T.CatmullRomCurve3(pts);
      const tube = new T.Mesh(new T.TubeGeometry(curve, 48, 0.09, 6), mat(0x8d8377, { rough: 0.6 }));
      g.add(tube);
      /* hangers */
      for (let i = 2; i < 39; i += 3) {
        const p = curve.getPoint(i / 40);
        g.add(cyl(0.035, 0.035, p.y - 4.15, 4, 0x8d8377, { pos: [p.x, (p.y + 4.15) / 2, p.z] }));
      }
    });
    /* towers */
    [-15, 15].forEach((x) => {
      [-3.6, 3.6].forEach((z) => g.add(box(0.5, 8.8, 0.5, 0xb7a894, { pos: [x, 8.4, -6 + z] })));
      g.add(box(1.2, 0.4, 8, 0xb7a894, { pos: [x, 12.7, -6] }));
    });

    /* day markers */
    const marks = [0, 10, 30, 50, 60];
    marks.forEach((d, i) => {
      const x = -14 + (d / 60) * 28;
      const post = cyl(0.12, 0.12, 2.4, 6, DEEPRED, { pos: [x, 5.4, -2] });
      g.add(post);
      const flag = new T.Mesh(
        new T.PlaneGeometry(2.6, 1.2),
        new T.MeshBasicMaterial({ map: signTexture('Day ' + d, { size: 62, bg: '#fdf7ec', fg: '#a82418', round: true }), transparent: true, toneMapped: false, side: T.DoubleSide })
      );
      flag.position.set(x + 1.3, 6.2, -2);
      g.add(flag);
    });

    /* a worker crossing */
    const walker = figure(0xc06a4e, 1.4);
    walker.position.set(-14, 4.2, -6);
    g.add(walker);
    /* and the replacement, coming the other way */
    const replacement = figure(0x4d6a86, 1.4);
    replacement.position.set(14, 4.2, -8.4);
    g.add(replacement);

    updaters.push((t) => {
      const u = (Math.sin(t * 0.22) + 1) / 2;
      walker.position.x = -14 + u * 28;
      walker.position.y = 4.2 + Math.abs(Math.sin(t * 3.4)) * 0.16;
      walker.rotation.y = Math.PI / 2;
      replacement.position.x = 14 - u * 22;
      replacement.rotation.y = -Math.PI / 2;
      const dm = new T.Object3D();
      for (let i = 0; i < 60; i++) {
        dm.position.set(-14 + (i / 59) * 28, 4 + Math.sin(t * 1.6 - i * 0.18) * 0.07, -6);
        dm.updateMatrix();
        slats.setMatrixAt(i, dm.matrix);
      }
      slats.instanceMatrix.needsUpdate = true;
    });
  };

  /* --- 8. the quarters --------------------------------------------------- */
  Z.quarters = function (g) {
    g.add(box(48, 0.5, 40, 0xe9e0d1, { pos: [0, 0.25, -8] }));
    /* a courtyard path */
    g.add(box(30, 0.1, 3, 0xdcd0bd, { pos: [0, 0.52, -8] }));

    const pavilions = [
      { x: -15, z: -14, kind: 'roof', tint: 0xd08a6e },
      { x: -5, z: -6, kind: 'bowl', tint: 0xe0b473 },
      { x: 6, z: -14, kind: 'cross', tint: 0x86a894 },
      { x: 16, z: -6, kind: 'cradle', tint: 0xc48fa4 },
    ];
    pavilions.forEach((p) => {
      const grp = new T.Group();
      grp.add(box(8.4, 0.6, 8.4, 0xf0e7d7, { pos: [0, 0.3, 0] }));
      /* four posts and a canopy */
      [[-3.6, -3.6], [3.6, -3.6], [-3.6, 3.6], [3.6, 3.6]].forEach(([a, b]) => grp.add(cyl(0.24, 0.28, 5.4, 8, 0xdccfba, { pos: [a, 3.3, b] })));
      const cap = new T.Mesh(new T.ConeGeometry(6.9, 2.4, 4), mat(p.tint, { rough: 0.88 }));
      cap.rotation.y = Math.PI / 4; cap.position.y = 7.2;
      grp.add(cap);

      if (p.kind === 'roof') {
        grp.add(box(3.4, 2.2, 3.4, PLASTER, { pos: [0, 1.7, 0] }));
        const r = new T.Mesh(new T.ConeGeometry(2.9, 1.5, 4), mat(0xc9705d));
        r.rotation.y = Math.PI / 4; r.position.y = 3.5; grp.add(r);
      }
      if (p.kind === 'bowl') {
        const pts = [];
        for (let i = 0; i <= 10; i++) { const u = i / 10; pts.push(new T.Vector2(0.2 + Math.sin(u * 1.5) * 1.7, u * 1.5)); }
        const bowl = new T.Mesh(new T.LatheGeometry(pts, 26), mat(0xf6f0e4, { rough: 0.5, side: T.DoubleSide }));
        bowl.position.y = 1.3; grp.add(bowl);
        grp.add(cyl(1.5, 1.5, 0.18, 24, 0xe8c98d, { pos: [0, 2.55, 0] }));
      }
      if (p.kind === 'cross') {
        grp.add(box(0.9, 3.4, 0.5, 0xf6f6f4, { pos: [0, 2.4, 0] }));
        grp.add(box(3.4, 0.9, 0.5, 0xf6f6f4, { pos: [0, 2.4, 0] }));
        grp.add(box(1.1, 3.6, 0.6, 0xdcece4, { pos: [0, 2.4, -0.1] }));
      }
      if (p.kind === 'cradle') {
        const pts = [];
        for (let i = 0; i <= 12; i++) { const u = (i / 12) * Math.PI; pts.push(new T.Vector3(Math.cos(u) * 1.7, 1.2 - Math.sin(u) * 1.1, 0)); }
        const arc = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 24, 0.16, 6), mat(0xd8b3c0));
        arc.position.y = 1.2; grp.add(arc);
        grp.add(ball(0.7, 0xfdf3e4, { pos: [0, 1.5, 0] }));
      }
      grp.position.set(p.x, 0.5, p.z);
      grp.userData.phase = p.x * 0.2;
      g.add(grp);
      g.add(contact(p.x, p.z, 6, 0.55));
    });

    /* a tree in the courtyard */
    g.add(cyl(0.5, 0.75, 6.5, 8, 0x8a6a4b, { pos: [-1, 3.2, 2] }));
    const canopyMat = mat(0x6f8f62, { rough: 0.95, flat: true });
    for (let i = 0; i < 9; i++) {
      const b = ball(1.6 + Math.random() * 1.2, 0x6f8f62, { seg: 10, material: canopyMat });
      b.position.set(-1 + (Math.random() - 0.5) * 4.2, 7.4 + Math.random() * 2.6, 2 + (Math.random() - 0.5) * 4.2);
      g.add(b);
    }
    g.add(contact(-1, 2, 4.4, 0.5));

    g.add(printPlane('stock-burger-fries-plate', 9, { ar: 3 / 2, pos: [-26, 13, 6], rot: [-0.08, 0.55, 0.03] }));
  };

  /* --- 9. the promotion ladder ------------------------------------------ */
  Z.ladder = function (g) {
    g.add(box(40, 0.5, 30, 0xe9e0d1, { pos: [0, 0.25, -6] }));
    const steps = [
      { y: 0, w: 11, solid: true, label: 'Trainee' },
      { y: 5, w: 11, solid: true, label: 'Kitchen staff' },
      { y: 10, w: 11, solid: false, label: 'Senior kitchen' },
      { y: 15, w: 11, solid: false, label: 'Shift supervisor' },
    ];
    steps.forEach((s, i) => {
      const x = -13 + i * 8.6;
      if (s.solid) {
        g.add(box(s.w, 1.2, 11, PLASTER, { pos: [x, s.y + 0.6, -6] }));
        g.add(box(s.w, s.y, 11, 0xe3d8c6, { pos: [x, s.y / 2, -6] }));
        g.add(contact(x, -6, 7, 0.4, 0.05));
      } else {
        /* the steps that do not exist yet, drawn as an outline */
        const geo = new T.BoxGeometry(s.w, 1.2, 11);
        const edge = new T.LineSegments(new T.EdgesGeometry(geo), new T.LineBasicMaterial({ color: DEEPRED, transparent: true, opacity: 0.65 }));
        edge.position.set(x, s.y + 0.6, -6);
        g.add(edge);
        const ghost = new T.Mesh(geo, new T.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0.07 }));
        ghost.position.set(x, s.y + 0.6, -6);
        g.add(ghost);
        const col = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(s.w, s.y, 11)), new T.LineBasicMaterial({ color: DEEPRED, transparent: true, opacity: 0.22 }));
        col.position.set(x, s.y / 2, -6);
        g.add(col);
      }
      const plate = new T.Mesh(
        new T.PlaneGeometry(6.6, 1.65),
        new T.MeshBasicMaterial({
          map: signTexture(s.label, { size: 52, bg: s.solid ? '#fdf8ee' : '#fdeceb', fg: s.solid ? '#3a332d' : '#a82418', round: true }),
          transparent: true, toneMapped: false, side: T.DoubleSide,
        })
      );
      plate.position.set(x, s.y + 2.6, 0.2);
      g.add(plate);
    });

    /* somebody standing on step two, looking up */
    const f = figure(0xc06a4e, 1.7);
    f.position.set(-13 + 8.6, 5.9, -3);
    f.rotation.y = -0.7;
    g.add(f);
  };

  /* --- 10. the review loop ----------------------------------------------- */
  Z.loop = function (g) {
    g.add(cyl(26, 26, 0.5, 64, 0xeae1d2, { pos: [0, 0.25, -6] }));

    const R = 14;
    const track = new T.Mesh(new T.TorusGeometry(R, 0.42, 12, 96, Math.PI * 1.72), mat(0xbfae97, { rough: 0.7 }));
    track.rotation.x = -Math.PI / 2;
    track.rotation.z = -Math.PI * 0.14;
    track.position.set(0, 4.5, -6);
    g.add(track);

    /* the missing piece of the loop: records */
    const gapGeo = new T.TorusGeometry(R, 0.42, 12, 22, Math.PI * 0.28);
    const gap = new T.Mesh(gapGeo, new T.MeshBasicMaterial({ color: DEEPRED, transparent: true, opacity: 0.28, wireframe: true }));
    gap.rotation.x = -Math.PI / 2;
    gap.rotation.z = -Math.PI * 0.14 + Math.PI * 1.72;
    gap.position.set(0, 4.5, -6);
    g.add(gap);

    const stations = [
      { a: 0.10, label: 'Monthly check', c: '#3a332d' },
      { a: 0.35, label: 'Gap found', c: '#3a332d' },
      { a: 0.60, label: 'Training given', c: '#3a332d' },
      { a: 0.85, label: 'Next check', c: '#3a332d' },
    ];
    stations.forEach((s) => {
      const ang = s.a * Math.PI * 2;
      const x = Math.cos(ang) * R, z = Math.sin(ang) * R - 6;
      g.add(cyl(0.42, 0.5, 4.4, 10, 0xd6c8b1, { pos: [x, 2.4, z] }));
      const plate = new T.Mesh(
        new T.PlaneGeometry(6.4, 1.6),
        new T.MeshBasicMaterial({ map: signTexture(s.label, { size: 50, bg: '#fdf8ee', fg: s.c, round: true }), transparent: true, toneMapped: false, side: T.DoubleSide })
      );
      plate.position.set(x, 6, z);
      plate.userData.billboard = true;
      g.add(plate);
      g.add(contact(x, z, 2.4, 0.45));
    });

    /* the carriage */
    const car = new T.Group();
    car.add(box(2.4, 1.3, 1.6, RED, { pos: [0, 0.9, 0], rough: 0.5 }));
    car.add(box(1.7, 0.9, 1.3, 0xfdf4e2, { pos: [0, 1.9, 0] }));
    g.add(car);

    /* a dashed hint of what should close the loop */
    const hint = new T.Group();
    for (let i = 0; i < 7; i++) {
      const a = (1.74 + i * 0.036) * Math.PI;
      const d = box(1.5, 0.3, 0.3, DEEPRED, { pos: [Math.cos(a) * R, 4.5, Math.sin(a) * R - 6], rot: [0, -a, 0], opacity: 0.55 });
      hint.add(d);
    }
    g.add(hint);

    g.add(printPlane('stock-pizza-margherita-overhead', 9, { ar: 3 / 2, pos: [-27, 14, 10], rot: [-0.08, 0.55, 0.03] }));

    updaters.push((t) => {
      const a = (t * 0.24) % (Math.PI * 2);
      car.position.set(Math.cos(a) * R, 4.6, Math.sin(a) * R - 6);
      car.rotation.y = -a + Math.PI / 2;
      hint.children.forEach((d, i) => { d.material.opacity = 0.2 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2.4 - i * 0.5)); });
    });
  };

  /* --- 11. the hall of law ----------------------------------------------- */
  const LAW_COLUMNS = [
    { sec: 's.5', status: 'unknown' },
    { sec: 's.23', status: 'match' },
    { sec: 's.24', status: 'missing' },
    { sec: 's.26', status: 'unknown' },
    { sec: 's.27', status: 'match' },
    { sec: 's.45–50', status: 'partial' },
    { sec: '2009 HC', status: 'missing' },
    { sec: 'Hours', status: 'unknown' },
  ];
  Z.law = function (g) {
    g.add(box(58, 1.4, 32, 0xefe8da, { pos: [0, 0.7, -8] }));
    g.add(box(54, 0.6, 28, 0xf4eee2, { pos: [0, 1.7, -8] }));
    g.add(contact(0, -8, 30, 0.5, 0.06));

    const statusColor = { match: BASIL, partial: AMBER, unknown: 0xc0b6a6, missing: DEEPRED };

    LAW_COLUMNS.forEach((c, i) => {
      const x = -24.5 + i * 7;
      const missing = c.status === 'missing';
      /* base always survives, even where the column does not exist */
      g.add(box(3.6, 0.7, 3.6, 0xe4dccc, { pos: [x, 2.35, -12] }));

      if (!missing) {
        const col = cyl(1.28, 1.45, 13, 20, 0xf3ecdf, { pos: [x, 9.2, -12], rough: 0.9 });
        g.add(col);
        /* fluting, cheaply: eight thin boxes around the shaft */
        for (let f = 0; f < 10; f++) {
          const a = (f / 10) * Math.PI * 2;
          g.add(box(0.16, 12.4, 0.16, 0xe6dccb, { pos: [x + Math.cos(a) * 1.33, 9.2, -12 + Math.sin(a) * 1.33] }));
        }
        g.add(box(3.4, 0.9, 3.4, 0xf6f0e4, { pos: [x, 16, -12] }));
      } else {
        /* only the outline of the column that should be here */
        const edges = new T.LineSegments(
          new T.EdgesGeometry(new T.CylinderGeometry(1.28, 1.45, 13, 12)),
          new T.LineBasicMaterial({ color: DEEPRED, transparent: true, opacity: 0.55 })
        );
        edges.position.set(x, 9.2, -12);
        g.add(edges);
      }

      /* status lamp on the base */
      const lamp = ball(0.42, statusColor[c.status], { pos: [x, 3, -9.6], emissive: statusColor[c.status], ei: 0.6, rough: 0.35 });
      lamp.userData.status = c.status;
      g.add(lamp);

      const plate = new T.Mesh(
        new T.PlaneGeometry(4.6, 1.15),
        new T.MeshBasicMaterial({
          map: signTexture(c.sec, { size: 54, bg: missing ? '#fdeceb' : '#fdf8ee', fg: missing ? '#a82418' : '#3a332d', round: true }),
          transparent: true, toneMapped: false, side: T.DoubleSide,
        })
      );
      plate.position.set(x, 3.4, -8.2);
      plate.rotation.x = -0.5;
      g.add(plate);
    });

    /* architrave, broken over the two gaps */
    LAW_COLUMNS.forEach((c, i) => {
      if (c.status === 'missing') return;
      const x = -24.5 + i * 7;
      g.add(box(7, 1.6, 4.4, 0xf1e9dc, { pos: [x, 17.3, -12] }));
    });

    /* the back wall of the hall */
    g.add(box(56, 22, 0.8, 0xf4eee2, { pos: [0, 11, -20] }));

    updaters.push((t) => {
      g.traverse((o) => {
        if (o.userData && o.userData.status === 'missing' && o.material && o.material.emissiveIntensity !== undefined) {
          o.material.emissiveIntensity = 0.4 + Math.sin(t * 2.6) * 0.35;
        }
      });
    });
  };

  /* --- 12. the ledger ---------------------------------------------------- */
  Z.ledger = function (g) {
    g.add(box(52, 0.5, 36, 0xe9e0d1, { pos: [0, 0.25, -8] }));
    /* an open book, two tilted pages on a lectern */
    const lect = new T.Group();
    lect.position.set(0, 0, -8);
    lect.add(box(26, 1.2, 16, WOOD, { pos: [0, 5, 0], rough: 0.7 }));
    [[-11, -6], [11, -6], [-11, 6], [11, 6]].forEach(([a, b]) => lect.add(box(1, 5, 1, WOOD, { pos: [a, 2.5, b] })));

    const pageMat = mat(0xfdf9ef, { rough: 0.96 });
    [-1, 1].forEach((side) => {
      const page = box(12.4, 0.3, 15, 0xfdf9ef, { material: pageMat, pos: [side * 6.4, 6.1, 0], rot: [0, 0, -side * 0.09] });
      lect.add(page);
      /* ruled lines: filled on the left page, blank on the right */
      for (let i = 0; i < 14; i++) {
        const filled = side < 0 || i < 3;
        const w = filled ? 8 + Math.sin(i * 2.1) * 2 : 0;
        if (w <= 0) {
          lect.add(box(9.6, 0.02, 0.06, 0xe0d6c2, { pos: [side * 6.4, 6.28, -6.6 + i * 1.02] }));
        } else {
          lect.add(box(w, 0.03, 0.16, 0x6f635a, { pos: [side * 6.4 - (9.6 - w) / 2, 6.3, -6.6 + i * 1.02], opacity: 0.75 }));
        }
      }
    });
    g.add(lect);
    g.add(contact(0, -8, 16, 0.55));

    /* loose pages lifting off the desk */
    const loose = [];
    for (let i = 0; i < 9; i++) {
      const p = box(4.4, 0.08, 5.6, 0xfdf9ef, { pos: [(Math.random() - 0.5) * 34, 9 + Math.random() * 9, -8 + (Math.random() - 0.5) * 22] });
      p.rotation.set(Math.random() * 0.6 - 0.3, Math.random() * 3, Math.random() * 0.6 - 0.3);
      p.userData.phase = Math.random() * 7;
      p.userData.y0 = p.position.y;
      g.add(p);
      loose.push(p);
    }
    updaters.push((t) => {
      loose.forEach((p) => {
        p.position.y = p.userData.y0 + Math.sin(t * 0.6 + p.userData.phase) * 0.8;
        p.rotation.y += 0.0016;
      });
    });
  };

  /* --- 13. the workshop --------------------------------------------------- */
  Z.workshop = function (g) {
    g.add(box(46, 0.5, 34, 0xe9e0d1, { pos: [0, 0.25, -8] }));
    /* drafting table, tilted */
    const table = new T.Group();
    table.position.set(0, 0, -10);
    table.add(box(28, 0.6, 15, 0xf3ecdd, { pos: [0, 6.4, 0], rot: [-0.3, 0, 0], rough: 0.75 }));
    table.add(box(28, 0.35, 1.2, WOOD, { pos: [0, 4.35, 6.6], rot: [-0.3, 0, 0] }));
    [[-12, -4], [12, -4], [-12, 4], [12, 4]].forEach(([a, b]) => table.add(box(0.8, 5.6, 0.8, 0x8d8377, { pos: [a, 2.8, b] })));
    g.add(table);
    g.add(contact(0, -10, 16, 0.55));

    /* ten blueprint cards standing in a fan */
    const cards = [];
    for (let i = 0; i < 10; i++) {
      const urgent = i < 2;
      const c = new T.Group();
      c.add(box(4.4, 6, 0.16, urgent ? 0xfdeae8 : 0xeef3f6, { rough: 0.92 }));
      c.add(box(4.4, 0.9, 0.2, urgent ? RED : 0x6f8ba3, { pos: [0, 2.5, 0.03] }));
      /* ruled lines to suggest a drawing */
      for (let l = 0; l < 5; l++) c.add(box(2.4 + (l % 2) * 0.9, 0.09, 0.2, urgent ? 0xd9a49d : 0xb9c8d4, { pos: [-0.4, 1.1 - l * 0.85, 0.03] }));
      const a = (i - 4.5) * 0.13;
      c.position.set(Math.sin(a) * 22, 9.4 + Math.cos(i * 1.1) * 0.5, -22 + Math.cos(a) * 4);
      c.rotation.set(-0.08, -a, (i % 2 ? 1 : -1) * 0.035);
      c.userData.phase = i * 0.8;
      c.userData.y0 = c.position.y;
      g.add(c);
      cards.push(c);
    }
    updaters.push((t) => {
      cards.forEach((c) => { c.position.y = c.userData.y0 + Math.sin(t * 0.8 + c.userData.phase) * 0.32; });
    });

    /* tools on the table */
    g.add(box(6, 0.14, 0.5, 0xe2c98f, { pos: [-7, 7.1, -6.5], rot: [-0.3, 0.2, 0] }));
    g.add(cyl(0.18, 0.18, 3.4, 8, RED, { pos: [7, 7.4, -7], rot: [-0.3, 0, 0.3] }));
  };

  /* --- 14. the rooftop --------------------------------------------------- */
  Z.rooftop = function (g) {
    g.add(box(44, 1.2, 34, 0xe6dccb, { pos: [0, 8, -8] }));
    /* parapet */
    [[0, 9.2, -25.4, 44, 1.2], [0, 9.2, 9.4, 44, 1.2]].forEach(([x, y, z, w]) => g.add(box(w, 2.6, 1.2, 0xdfd4c1, { pos: [x, y, z] })));
    g.add(box(1.2, 2.6, 34, 0xdfd4c1, { pos: [-22.4, 9.2, -8] }));
    g.add(box(1.2, 2.6, 34, 0xdfd4c1, { pos: [22.4, 9.2, -8] }));
    /* the building under it */
    g.add(box(44, 16, 34, 0xece2d1, { pos: [0, 0, -8] }));

    /* a water tank, because every Dhaka roof has one */
    g.add(cyl(2.4, 2.4, 3.6, 16, 0x8fb3c4, { pos: [-15, 12.4, -19], rough: 0.6 }));
    [[-16.4, -20.4], [-13.6, -20.4], [-16.4, -17.6], [-13.6, -17.6]].forEach(([a, b]) => g.add(box(0.35, 3, 0.35, SLATE, { pos: [a, 10.1, b] })));

    /* a string of lights across the roof */
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const u = i / 24;
      pts.push(new T.Vector3(-20 + u * 40, 15.5 - Math.sin(u * Math.PI) * 2.6, -18 + Math.sin(u * 3) * 1.5));
    }
    const wire = new T.CatmullRomCurve3(pts);
    g.add(new T.Mesh(new T.TubeGeometry(wire, 40, 0.05, 5), mat(0x6e6459)));
    const bulbs = [];
    for (let i = 1; i < 24; i += 2) {
      const p = wire.getPoint(i / 24);
      const b = ball(0.28, 0xfff0c4, { pos: [p.x, p.y - 0.35, p.z], emissive: 0xffd98a, ei: 1.1, rough: 0.3 });
      g.add(b); bulbs.push(b);
    }
    g.add(cyl(0.2, 0.24, 8, 8, SLATE, { pos: [-20, 12, -18] }));
    g.add(cyl(0.2, 0.24, 8, 8, SLATE, { pos: [20, 12, -18] }));

    /* the skyline, receding */
    for (let i = 0; i < 26; i++) {
      const h = 8 + Math.abs(Math.sin(i * 2.7)) * 26;
      const x = -70 + i * 5.6 + Math.sin(i) * 2;
      const z = -46 - Math.abs(Math.cos(i * 1.7)) * 22;
      const shade = 0xd8cdba - (i % 3) * 0x060606;
      g.add(box(4.6 + (i % 3), h, 5, shade, { pos: [x, h / 2 - 2, z] }));
    }

    /* six of us, on the roof */
    const crowd = [
      [-7, -6, 0x2c3038], [-4.2, -6.4, 0x6d4d52], [-1.4, -6, 0x8a5a44],
      [1.4, -6.5, 0xb8474a], [4.2, -6, 0x3c4a5c], [7, -6.4, 0x53504a],
    ];
    crowd.forEach(([x, z, c]) => {
      const f = figure(c, 1.55);
      f.position.set(x, 8.6, z);
      g.add(f);
      g.add(contact(x, z, 1.4, 0.4, 8.65));
    });

    g.add(printPlane('team-group', 11, { ar: 1200 / 1600, pos: [16, 17, -2], rot: [-0.04, -0.5, 0.02] }));
    g.add(printPlane('team-group-alt', 8, { ar: 1000 / 1333, pos: [25, 15, -10], rot: [-0.04, -0.72, -0.03] }));
    g.add(printPlane('stock-rooftop-skyline-sunset-detailed', 12, { ar: 3 / 2, pos: [-18, 18, 0], rot: [-0.05, 0.55, -0.02] }));
  };

  /* ================================================================ engine */

  function build() {
    root = new T.Group();
    scene.add(root);

    /* the ground everything else stands on */
    const ground = new T.Mesh(
      new T.PlaneGeometry(ZONE_GAP * (ZONE_ORDER.length + 2), 400),
      mat(GROUND, { rough: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(ZONE_GAP * (ZONE_ORDER.length - 1) / 2, -0.02, -20);
    root.add(ground);

    ZONE_ORDER.forEach((id) => {
      const g = new T.Group();
      g.position.x = ZONES[id].x;
      if (Z[id]) {
        try { Z[id](g); } catch (e) { console.warn('zone ' + id + ' failed', e); }
      }
      g.userData.zone = id;
      root.add(g);
      ZONES[id].group = g;
    });

    /* dust in the light */
    const N = 700;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 150;
      pos[i * 3 + 1] = Math.random() * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 150;
    }
    const dg = new T.BufferGeometry();
    dg.setAttribute('position', new T.BufferAttribute(pos, 3));
    buildStack();

    dust = new T.Points(dg, new T.PointsMaterial({
      color: 0xffe9c0, size: 0.42, sizeAttenuation: true,
      transparent: true, opacity: 0.55, depthWrite: false, blending: T.AdditiveBlending,
    }));
    scene.add(dust);
  }

  /* ------------------------------------------------------- the record stack
     One object carries the whole argument. Every claim the manager made about
     practice drops a solid card onto the plinth. Every claim with no evidence
     behind it drops an outline of air with the same footprint. By the last
     slide the stack is visibly half missing, and that is the report. */
  let stack = null;
  const stackCards = [];

  function buildStack() {
    stack = new T.Group();
    /* the plinth */
    stack.add(box(6.4, 1.2, 7.6, 0xe2d7c4, { pos: [0, 0.6, 0], rough: 0.9 }));
    stack.add(box(5.6, 0.4, 6.8, 0xefe6d6, { pos: [0, 1.4, 0] }));
    stack.add(contact(0, 0, 5.4, 0.7));

    const cardGeo = new T.BoxGeometry(4.6, 0.16, 5.8);
    const cardMat = mat(0xfdf9ef, { rough: 0.96 });
    const edgeGeo = new T.EdgesGeometry(cardGeo);

    STACK_DROPS.forEach((d, i) => {
      const y = 1.75 + i * 0.34;
      let card;
      if (d.kind === 'solid') {
        card = new T.Mesh(cardGeo, cardMat);
        card.position.set(0, y, 0);
        /* a hairline of ink, so a filed card reads as written on */
        const ink = box(3.2, 0.02, 0.14, 0x8a7d70, { pos: [-0.4, y + 0.1, -1.4] });
        stack.add(ink);
        card.userData.ink = ink;
      } else {
        card = new T.LineSegments(edgeGeo, new T.LineBasicMaterial({ color: DEEPRED, transparent: true, opacity: 0.6 }));
        card.position.set(0, y, 0);
      }
      card.rotation.y = (i % 2 ? 1 : -1) * 0.035;
      card.visible = false;
      stack.add(card);
      stackCards.push(card);
    });

    scene.add(stack);
  }

  /* Show the first n cards, and park the stack in the zone we are visiting. */
  function setStack(n, zoneId) {
    if (!stack) return;
    const zx = (ZONES[zoneId] || ZONES.street).x;
    stack.position.set(zx - 31, 0, 15);
    stackCards.forEach((c, i) => {
      const want = i < n;
      if (want && !c.visible) {
        c.visible = true;
        if (c.userData.ink) c.userData.ink.visible = true;
        if (window.gsap && !reduced) {
          const y = c.position.y;
          window.gsap.fromTo(c.position, { y: y + 5 }, { y: y, duration: 0.7, ease: 'power3.out', delay: 0.35 });
        }
      } else if (!want && c.visible) {
        c.visible = false;
        if (c.userData.ink) c.userData.ink.visible = false;
      }
      if (c.userData.ink) c.userData.ink.visible = c.visible;
    });
  }

  /* --------------------------------------------------------------- public */

  function init(canvas) {
    if (!window.THREE) return false;
    let gl;
    try {
      renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
      gl = renderer.getContext();
    } catch (e) {
      return false;
    }
    if (!gl) return false;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.96;
    renderer.outputColorSpace = T.SRGBColorSpace;

    scene = new T.Scene();
    scene.background = skyTexture();
    scene.fog = new T.Fog(0xf0e7d8, 155, 430);

    camera = new T.PerspectiveCamera(rig.fov, window.innerWidth / window.innerHeight, 0.4, 900);

    scene.environment = makeEnvironment();

    scene.add(new T.HemisphereLight(0xf2f7ff, 0xd0b895, 0.62));
    sun = new T.DirectionalLight(0xfff0d2, 1.85);
    sun.position.set(60, 96, 46);
    scene.add(sun);
    const fill = new T.DirectionalLight(0xc9dcff, 0.26);
    fill.position.set(-60, 34, -70);
    scene.add(fill);
    const rim = new T.DirectionalLight(0xffd9a8, 0.4);
    rim.position.set(-20, 18, 80);
    scene.add(rim);

    build();
    ready = true;
    running = true;
    clock.last = performance.now();
    requestAnimationFrame(frame);
    return true;
  }

  /* Fly to a slide's waypoint. `instant` skips the flight (used for the
     overview grid, deep links and reduced motion). */
  function goTo(slide, instant) {
    if (!ready) return;

    /* the light moves through the day as the argument moves through the deck */
    const prog = SLIDES.indexOf(slide) / Math.max(1, SLIDES.length - 1);
    const az = Math.PI * (0.22 + prog * 0.56);
    const el2 = 0.95 - prog * 0.42;
    const target = { sx: Math.cos(az) * 110, sy: 40 + Math.sin(el2) * 78, sz: Math.sin(az) * 78 };
    if (window.gsap && !instant && !reduced) {
      window.gsap.to(sun.position, { x: target.sx, y: target.sy, z: target.sz, duration: 2.2, ease: 'power1.inOut' });
      window.gsap.to(sun.color, { r: 1, g: 0.95 - prog * 0.08, b: 0.86 - prog * 0.14, duration: 2.2 });
    } else {
      sun.position.set(target.sx, target.sy, target.sz);
    }

    /* one room in the deck is completely still, and it is the urgent one */
    still = !!slide.still;

    setStack(slide.stack || 0, slide.zone);
    const zx = (ZONES[slide.zone] || ZONES.street).x;
    const c = slide.cam;
    const target2 = {
      px: zx + c[0], py: c[1], pz: c[2],
      tx: zx + c[3], ty: c[4], tz: c[5],
      fov: slide.fov || 46,
    };

    if (instant || reduced || !window.gsap) {
      Object.assign(rig, target2, { u: 1 });
      apply();
      return;
    }

    /* Arc the move: park a control point above the midpoint so the camera
       swings through the world instead of sliding along a straight line. */
    const dist = Math.hypot(target2.px - rig.px, target2.pz - rig.pz);
    rig.ax = rig.px; rig.ay = rig.py; rig.az = rig.pz;
    rig.bx = target2.px; rig.by = target2.py; rig.bz = target2.pz;
    rig.atx = rig.tx; rig.aty = rig.ty; rig.atz = rig.tz;
    rig.btx = target2.tx; rig.bty = target2.ty; rig.btz = target2.tz;
    const arc = slide.arc === undefined ? 1 : slide.arc;
    rig.cx = (rig.ax + rig.bx) / 2;
    rig.cy = (rig.ay + rig.by) / 2 + (Math.min(28, dist * 0.16) + 4) * arc;
    rig.cz = (rig.az + rig.bz) / 2 + Math.min(22, dist * 0.1) * arc;
    rig.u = 0;

    const dur = Math.min(2.6, 1.0 + dist / 130) * (slide.slow ? 1.5 : 1);
    window.gsap.killTweensOf(rig);
    if (slide.recoil) {
      /* Section 24. Every other move lands. This one hits the missing step,
         pulls back, and never quite arrives — which is the argument. */
      window.gsap.to(rig, { u: 0.88, duration: dur * 0.72, ease: 'power3.out' });
      window.gsap.to(rig, { u: 0.74, duration: 0.5, ease: 'power2.inOut', delay: dur * 0.72 });
      window.gsap.to(rig, { u: 0.83, duration: 1.6, ease: 'power1.inOut', delay: dur * 0.72 + 0.5 });
    } else {
      window.gsap.to(rig, { u: 1, duration: dur, ease: slide.ease || 'power2.inOut' });
    }
    window.gsap.to(rig, { fov: target2.fov, duration: dur, ease: 'power2.inOut' });
  }

  function apply() {
    camera.position.set(rig.px, rig.py, rig.pz);
    camera.fov = rig.fov;
    camera.updateProjectionMatrix();
  }

  function frame(now) {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - clock.last) / 1000);
    clock.last = now;
    clock.t += dt;
    const t = clock.t;

    /* interpolate along the arc */
    if (rig.u < 1) {
      const u = rig.u, iu = 1 - u;
      const a = iu * iu, b = 2 * iu * u, c = u * u;
      rig.px = a * rig.ax + b * rig.cx + c * rig.bx;
      rig.py = a * rig.ay + b * rig.cy + c * rig.by;
      rig.pz = a * rig.az + b * rig.cz + c * rig.bz;
      rig.tx = rig.atx + (rig.btx - rig.atx) * u;
      rig.ty = rig.aty + (rig.bty - rig.aty) * u;
      rig.tz = rig.atz + (rig.btz - rig.atz) * u;
    }

    /* mouse parallax and a slow idle breath, both damped */
    pointer.sx += (pointer.x - pointer.sx) * Math.min(1, dt * 3.2);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(1, dt * 3.2);
    const calm = reduced || still;
    const amp = calm ? 0 : 1;
    const bob = calm ? 0 : Math.sin(t * 0.42) * 0.5;
    const sway = calm ? 0 : Math.cos(t * 0.31) * 0.6;

    camera.position.set(
      rig.px + pointer.sx * 3.4 * amp + sway,
      rig.py - pointer.sy * 2.1 * amp + bob,
      rig.pz + pointer.sy * 1.2 * amp
    );
    camera.fov = rig.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(rig.tx + pointer.sx * 0.7 * amp, rig.ty, rig.tz);

    if (!calm) for (let i = 0; i < updaters.length; i++) updaters[i](t);

    /* keep the dust around the camera and drifting up */
    if (dust) {
      dust.visible = !still;
      dust.position.set(camera.position.x, 0, camera.position.z);
      const p = dust.geometry.attributes.position;
      for (let i = 1; i < p.array.length; i += 3) {
        p.array[i] += dt * 0.5;
        if (p.array[i] > 40) p.array[i] = 0;
      }
      p.needsUpdate = true;
      dust.material.opacity = 0.4 + Math.sin(t * 0.6) * 0.12;
    }

    /* keep loop-zone plates facing the viewer */
    scene.traverse((o) => {
      if (o.userData && o.userData.billboard) o.quaternion.copy(camera.quaternion);
    });

    renderer.render(scene, camera);
  }

  function resize() {
    if (!ready) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  function setPointer(x, y) { pointer.x = x; pointer.y = y; }
  function setReduced(v) { reduced = v; }
  function pause(v) {
    if (v) { running = false; }
    else if (ready && !running) { running = true; clock.last = performance.now(); requestAnimationFrame(frame); }
  }

  return { init, goTo, resize, setPointer, setReduced, pause, isReady: () => ready };
})();

/* ==========================================================================
   THE BENCH
   One pizza, made across the whole deck. Slide one is flour on a marble
   counter; by slide thirteen a slice is lifting off a cut pie. Every slide
   advances the bench one step and moves the camera, so the room changes
   under the text without anyone narrating it.

   Everything is built from primitives — no models to load, so the finished
   page still runs offline from a USB stick.
   ========================================================================== */

const World = (function () {
  const T = window.THREE;

  const RED = 0xd8402f;
  const SAUCE = 0xb8321f;
  const CHEESE = 0xf2d489;
  const DOUGH_RAW = 0xf0dfbc;
  const DOUGH_BAKED = 0xd39a52;
  const CRUST_EDGE = 0xc98b45;
  const MARBLE = 0xf1ece2;
  const WOOD = 0x8a5f3c;
  const STEEL = 0xbfc4c8;

  let renderer, scene, camera, sun, oven, ovenGlow, dust;
  let running = false, reduced = false, ready = false, still = false;
  const clock = { t: 0, last: 0 };

  /* the pizza and everything on it */
  const P = {
    group: null, board: null, peel: null,
    base: null, rim: null, sauce: null,
    cheese: null, tops: null, slices: [], lifted: null,
    flour: null,
  };
  let stage = 'flour';
  const anim = { grow: 0, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 };

  const rig = {
    px: 0, py: 14, pz: 30, tx: 0, ty: 2, tz: 0, fov: 42,
    u: 1, ax: 0, ay: 0, az: 0, bx: 0, by: 0, bz: 0, cx: 0, cy: 0, cz: 0,
    atx: 0, aty: 0, atz: 0, btx: 0, bty: 0, btz: 0,
  };
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

  /* ---------------------------------------------------------------- utils */

  const mat = (color, o = {}) => new T.MeshStandardMaterial({
    color,
    roughness: o.rough === undefined ? 0.85 : o.rough,
    metalness: o.metal === undefined ? 0.02 : o.metal,
    emissive: o.emissive === undefined ? 0x000000 : o.emissive,
    emissiveIntensity: o.ei === undefined ? 1 : o.ei,
    transparent: o.opacity !== undefined,
    opacity: o.opacity === undefined ? 1 : o.opacity,
    side: o.side || T.FrontSide,
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

  function shadowTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const rg = g.createRadialGradient(64, 64, 2, 64, 64, 62);
    rg.addColorStop(0, 'rgba(60,40,24,0.55)');
    rg.addColorStop(0.5, 'rgba(60,40,24,0.22)');
    rg.addColorStop(1, 'rgba(60,40,24,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
    return new T.CanvasTexture(c);
  }

  function contact(x, z, r, opacity, y) {
    const m = new T.Mesh(
      new T.PlaneGeometry(r * 2, r * 2),
      new T.MeshBasicMaterial({ map: shadowTexture(), transparent: true, opacity: opacity, depthWrite: false })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, y === undefined ? 0.04 : y, z);
    return m;
  }

  /* Speckled marble for the counter, and scattered flour on top of it. */
  function marbleTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = '#f3eee5'; g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 46; i++) {
      g.strokeStyle = `rgba(150,140,126,${0.05 + Math.random() * 0.09})`;
      g.lineWidth = 0.6 + Math.random() * 2.4;
      g.beginPath();
      let x = Math.random() * 512, y = Math.random() * 512;
      g.moveTo(x, y);
      for (let k = 0; k < 7; k++) {
        x += (Math.random() - 0.5) * 150;
        y += (Math.random() - 0.5) * 110;
        g.lineTo(x, y);
      }
      g.stroke();
    }
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = `rgba(120,110,98,${Math.random() * 0.05})`;
      g.fillRect(Math.random() * 512, Math.random() * 512, 1.4, 1.4);
    }
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    t.wrapS = t.wrapT = T.RepeatWrapping;
    t.repeat.set(2, 2);
    return t;
  }

  /* a round sprite, so flour in the light is not a field of squares */
  function moteTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, 'rgba(255,255,255,1)');
    rg.addColorStop(0.35, 'rgba(255,246,224,0.7)');
    rg.addColorStop(1, 'rgba(255,246,224,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(c);
  }

  function flourTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    g.clearRect(0, 0, 256, 256);
    for (let i = 0; i < 1500; i++) {
      const x = 128 + (Math.random() - 0.5) * 210;
      const y = 128 + (Math.random() - 0.5) * 210;
      const d = Math.hypot(x - 128, y - 128) / 128;
      if (Math.random() < d * d) continue;
      g.fillStyle = `rgba(255,252,244,${0.25 + Math.random() * 0.6})`;
      g.beginPath();
      g.arc(x, y, 0.5 + Math.random() * 2.1, 0, 7);
      g.fill();
    }
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    return t;
  }

  /* ---------------------------------------------------------------- build */

  function buildKitchen() {
    /* the counter */
    const marble = marbleTexture();
    const top = box(78, 1.6, 34, 0xffffff, { material: mat(0xffffff, { rough: 0.42, metal: 0.02 }), pos: [-8, -0.8, 0] });
    top.material.map = marble;
    scene.add(top);
    scene.add(box(76, 8, 32, 0xe2d7c6, { pos: [-8, -5.6, -0.4], rough: 0.9 }));
    /* a lip of stainless along the front edge */
    scene.add(box(78, 0.35, 0.6, STEEL, { pos: [-8, 0.12, 17.1], rough: 0.3, metal: 0.65 }));

    /* a back wall with a shelf, so the room has a depth cue behind the bench */
    scene.add(box(96, 34, 1.2, 0xe9dcc6, { pos: [-10, 12, -22], rough: 0.96 }));
    scene.add(box(58, 0.8, 4.4, 0x9a6b45, { pos: [4, 11, -19.6], rough: 0.8 }));
    for (let i = 0; i < 9; i++) {
      const x = -18 + i * 5.4;
      scene.add(cyl(1.0, 1.15, 3.2 + (i % 3) * 0.9, 16, i % 2 ? 0xd9cbb4 : 0xc9b294,
        { pos: [x, 13.2 + (i % 3) * 0.45, -19.6], rough: 0.85 }));
    }
    /* a row of hanging pendants over the bench */
    for (let i = -1; i <= 1; i++) {
      scene.add(cyl(0.06, 0.06, 8, 6, 0x8b8378, { pos: [i * 15 - 4, 22, -2] }));
      const shade = new T.Mesh(new T.ConeGeometry(1.9, 2.0, 20, 1, true), mat(0xb8483c, { side: T.DoubleSide, rough: 0.55 }));
      shade.position.set(i * 15 - 4, 17.2, -2);
      scene.add(shade);
      scene.add(new T.Mesh(new T.SphereGeometry(0.5, 12, 8),
        new T.MeshBasicMaterial({ color: 0xffe9b8 })).translateX(i * 15 - 4).translateY(16.4).translateZ(-2));
    }

    /* flour dusted across the bench */
    P.flour = new T.Mesh(
      new T.PlaneGeometry(30, 30),
      new T.MeshBasicMaterial({ map: flourTexture(), transparent: true, opacity: 0.85, depthWrite: false })
    );
    P.flour.rotation.x = -Math.PI / 2;
    P.flour.position.set(0, 0.02, 0);
    scene.add(P.flour);

    /* the oven, off to the left */
    oven = new T.Group();
    oven.position.set(-26, 0, -6);
    oven.rotation.y = 0.42;
    const dome = new T.Mesh(
      new T.SphereGeometry(7.4, 30, 18, 0, Math.PI * 2, 0, Math.PI / 2),
      mat(0xd8c4a8, { rough: 0.94 })
    );
    dome.position.y = 1.6;
    oven.add(dome);
    oven.add(cyl(7.9, 8.4, 1.8, 30, 0xbda58c, { pos: [0, 0.9, 0], rough: 0.92 }));
    /* the mouth, and the fire behind it */
    const mouth = new T.Mesh(new T.CircleGeometry(2.7, 30), new T.MeshBasicMaterial({ color: 0x2a1408 }));
    mouth.position.set(0, 3.4, 7.2);
    oven.add(mouth);
    ovenGlow = new T.Mesh(
      new T.CircleGeometry(4.6, 30),
      new T.MeshBasicMaterial({ color: 0xff9c3a, transparent: true, opacity: 0.35, depthWrite: false })
    );
    ovenGlow.position.set(0, 3.4, 7.28);
    oven.add(ovenGlow);
    const fire = new T.PointLight(0xff8a30, 0, 52, 2);
    fire.position.set(-24, 4, 0);
    scene.add(fire);
    oven.userData.fire = fire;
    scene.add(oven);
    scene.add(contact(-26, -6, 12, 0.5));

    /* a few props so the bench reads as a working one */
    const bowl = cyl(2.1, 1.5, 1.5, 24, 0xcfd3d6, { pos: [14, 0.75, -5], rough: 0.32, metal: 0.55 });
    scene.add(bowl, contact(14, -5, 3, 0.4));
    const jar = cyl(1.1, 1.2, 3.4, 20, SAUCE, { pos: [17.5, 1.7, -1.5], rough: 0.5 });
    scene.add(jar, contact(17.5, -1.5, 2, 0.35));
    /* a flour tin and a stack of boxes, so the bench is a working one */
    scene.add(cyl(1.6, 1.6, 3.0, 20, 0xe6ded0, { pos: [21, 1.5, -6], rough: 0.6 }), contact(21, -6, 2.6, 0.4));
    for (let i = 0; i < 3; i++) {
      scene.add(box(7.2, 0.7, 7.2, i === 2 ? 0xd8402f : 0xe8dcc6, { pos: [26, 0.35 + i * 0.72, 5], rot: [0, 0.06 * i, 0], rough: 0.9 }));
    }
    scene.add(contact(26, 5, 6, 0.45));
  }

  function buildPizza() {
    P.group = new T.Group();
    P.group.position.set(0, 0.06, 0);
    scene.add(P.group);

    /* the wooden board the pizza rests on once it comes out */
    P.board = new T.Group();
    P.board.add(cyl(8.2, 8.2, 0.5, 46, WOOD, { pos: [0, 0.25, 0], rough: 0.72 }));
    P.board.add(box(3.4, 0.42, 5.6, WOOD, { pos: [0, 0.25, 11], rough: 0.72 }));
    P.board.visible = false;
    P.group.add(P.board);

    /* the peel */
    P.peel = new T.Group();
    P.peel.add(cyl(8.0, 8.0, 0.22, 44, STEEL, { pos: [0, 0.11, 0], rough: 0.34, metal: 0.6 }));
    P.peel.add(box(1.1, 0.2, 12, 0x9b6b42, { pos: [0, 0.11, 13], rough: 0.8 }));
    P.peel.visible = false;
    P.group.add(P.peel);

    /* the dough: a low cylinder that flattens and widens as it is worked */
    P.base = cyl(1, 1, 1, 56, DOUGH_RAW, { rough: 0.94 });
    P.group.add(P.base);

    /* the raised rim */
    P.rim = new T.Mesh(new T.TorusGeometry(1, 0.3, 12, 60), mat(DOUGH_RAW, { rough: 0.93 }));
    P.rim.rotation.x = Math.PI / 2;
    P.group.add(P.rim);

    /* sauce */
    P.sauce = new T.Mesh(new T.CircleGeometry(1, 56), mat(SAUCE, { rough: 0.62, side: T.DoubleSide }));
    P.sauce.rotation.x = -Math.PI / 2;
    P.sauce.visible = false;
    P.group.add(P.sauce);

    /* cheese: scattered soft discs */
    const cheeseGeo = new T.CylinderGeometry(0.52, 0.58, 0.16, 10);
    P.cheese = new T.InstancedMesh(cheeseGeo, mat(CHEESE, { rough: 0.66 }), 120);
    P.cheese.count = 0;
    P.group.add(P.cheese);
    P.cheeseSpots = [];
    for (let i = 0; i < 120; i++) {
      const a = i * 2.39996, r = Math.sqrt(i / 120) * 0.86;
      P.cheeseSpots.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, s: 0.7 + (i % 5) * 0.14, ry: a });
    }

    /* toppings: peppers, onion and meat, three instanced sets */
    const tops = [
      { n: 26, color: 0x5f8f4a, geo: new T.BoxGeometry(0.5, 0.16, 0.5) },          // green pepper
      { n: 22, color: 0xc0708f, geo: new T.TorusGeometry(0.34, 0.07, 6, 14) },     // onion
      { n: 30, color: 0xa8523c, geo: new T.CylinderGeometry(0.34, 0.34, 0.1, 12) },// meat
    ];
    P.tops = tops.map((t, ti) => {
      const m = new T.InstancedMesh(t.geo, mat(t.color, { rough: 0.78 }), t.n);
      m.count = 0;
      P.group.add(m);
      const spots = [];
      for (let i = 0; i < t.n; i++) {
        const a = (i * 2.39996) + ti * 1.1, r = Math.sqrt((i + 0.5) / t.n) * 0.8;
        spots.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, ry: a * 1.7, tilt: ti === 1 ? Math.PI / 2 : 0 });
      }
      return { mesh: m, spots: spots, n: t.n };
    });

    /* eight cut lines, revealed when the pizza is sliced */
    P.cuts = new T.Group();
    for (let i = 0; i < 8; i++) {
      const c = box(0.09, 0.06, 8.4, 0x8a5a30, { pos: [0, 0, 0], rot: [0, (i / 8) * Math.PI * 2, 0], opacity: 0 });
      P.cuts.add(c);
    }
    P.cuts.visible = false;
    P.group.add(P.cuts);

    /* the slice that lifts away at the end */
    const wedge = new T.Shape();
    wedge.moveTo(0, 0);
    wedge.absarc(0, 0, 8, -Math.PI / 8, Math.PI / 8, false);
    wedge.lineTo(0, 0);
    const wg = new T.ExtrudeGeometry(wedge, { depth: 0.42, bevelEnabled: false, curveSegments: 12 });
    wg.rotateX(-Math.PI / 2);
    P.lifted = new T.Group();
    const wedgeMesh = new T.Mesh(wg, mat(DOUGH_BAKED, { rough: 0.86 }));
    P.lifted.add(wedgeMesh);
    const wedgeTop = new T.Mesh(wg.clone().scale(0.9, 1, 0.9), mat(CHEESE, { rough: 0.6 }));
    wedgeTop.position.y = 0.3;
    P.lifted.add(wedgeTop);
    P.lifted.visible = false;
    P.group.add(P.lifted);

    P.shadow = contact(0, 0, 11, 0.55, 0.05);
    scene.add(P.shadow);
  }

  /* ---------------------------------------------------------------- stages
     One number per stage. Everything on the bench reads from these, so a
     slide change is just a set of tweens toward a new target. */

  const TARGETS = {
    flour:    { grow: 0.09, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    dough:    { grow: 0.16, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    stretch:  { grow: 0.55, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    base:     { grow: 1.00, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    sauce:    { grow: 1.00, sauce: 1, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    cheese:   { grow: 1.00, sauce: 1, cheese: 1, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    toppings: { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    peel:     { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 0, cut: 0, lift: 0, travel: 0.16, rise: 0.6 },
    oven:     { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 0.18, cut: 0, lift: 0, travel: 0.74, rise: 1 },
    bake:     { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 1, cut: 0, lift: 0, travel: 0.96, rise: 1 },
    out:      { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 1, cut: 0, lift: 0, travel: 0, rise: 0 },
    slice:    { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 1, cut: 1, lift: 0, travel: 0, rise: 0 },
    served:   { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 1, cut: 1, lift: 1, travel: 0, rise: 0 },
  };

  function setStage(name, instant) {
    stage = name;
    const t = TARGETS[name] || TARGETS.flour;
    if (instant || reduced || !window.gsap) {
      Object.assign(anim, t);
      applyStage();
      return;
    }
    window.gsap.killTweensOf(anim);
    window.gsap.to(anim, {
      grow: t.grow, sauce: t.sauce, cheese: t.cheese, tops: t.tops,
      bake: t.bake, cut: t.cut, lift: t.lift, travel: t.travel, rise: t.rise,
      duration: 1.5, ease: 'power2.inOut', onUpdate: applyStage,
    });
  }

  const dummy = new T.Object3D();
  const cA = new T.Color(), cB = new T.Color();

  function applyStage() {
    if (!P.base) return;
    const g = anim.grow;

    /* the dough: a tall ball at 0.16, a wide flat disc at 1 */
    const r = 1.6 + g * 6.4;
    const h = 2.6 - g * 2.14;
    P.base.scale.set(r, h, r);
    P.base.position.y = h * 0.5;
    P.base.visible = g > 0.02;

    /* the rim appears only once it is actually a base */
    const rimT = Math.max(0, (g - 0.55) / 0.45);
    P.rim.visible = rimT > 0.02;
    P.rim.scale.set(r * 0.99, r * 0.99, Math.max(0.001, rimT));
    P.rim.position.y = h * 0.86;

    /* baking browns the dough and the rim */
    cA.setHex(DOUGH_RAW); cB.setHex(DOUGH_BAKED);
    P.base.material.color.copy(cA).lerp(cB, anim.bake);
    cB.setHex(CRUST_EDGE);
    P.rim.material.color.copy(cA).lerp(cB, anim.bake * 1.1 > 1 ? 1 : anim.bake * 1.1);

    /* sauce */
    P.sauce.visible = anim.sauce > 0.02;
    P.sauce.scale.setScalar(Math.max(0.001, anim.sauce) * r * 0.88);
    P.sauce.position.y = h + 0.03;

    /* cheese, revealed a disc at a time */
    const cn = Math.round(anim.cheese * P.cheeseSpots.length);
    P.cheese.count = cn;
    if (cn) {
      for (let i = 0; i < cn; i++) {
        const s = P.cheeseSpots[i];
        dummy.position.set(s.x * r * 0.86, h + 0.09, s.z * r * 0.86);
        dummy.rotation.set(0, s.ry, 0);
        dummy.scale.setScalar(s.s * (1 + anim.bake * 0.12));
        dummy.updateMatrix();
        P.cheese.setMatrixAt(i, dummy.matrix);
      }
      P.cheese.instanceMatrix.needsUpdate = true;
      cA.setHex(CHEESE); cB.setHex(0xe8b45c);
      P.cheese.material.color.copy(cA).lerp(cB, anim.bake);
    }

    /* toppings */
    P.tops.forEach((set) => {
      const n = Math.round(anim.tops * set.n);
      set.mesh.count = n;
      for (let i = 0; i < n; i++) {
        const s = set.spots[i];
        dummy.position.set(s.x * r * 0.84, h + 0.2, s.z * r * 0.84);
        dummy.rotation.set(s.tilt, s.ry, 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        set.mesh.setMatrixAt(i, dummy.matrix);
      }
      if (n) set.mesh.instanceMatrix.needsUpdate = true;
    });

    /* cut lines */
    P.cuts.visible = anim.cut > 0.02;
    P.cuts.position.y = h + 0.34;
    P.cuts.children.forEach((c, i) => {
      c.material.opacity = Math.max(0, Math.min(1, anim.cut * 8 - i * 0.6));
      c.scale.z = r / 8.4;
    });

    /* the peel carries it to the oven; the board catches it coming out */
    P.peel.visible = anim.travel > 0.02 && anim.bake < 0.98;
    P.board.visible = anim.bake > 0.55 && anim.travel < 0.5;
    P.shadow.material.opacity = 0.55 * (1 - anim.rise);

    /* the finished slice lifting away */
    P.lifted.visible = anim.lift > 0.02;
    if (P.lifted.visible) {
      P.lifted.position.set(0, h + 0.34 + anim.lift * 5.5, 0);
      P.lifted.rotation.set(-anim.lift * 0.42, 0.3, 0);
      P.lifted.scale.setScalar(r / 8);
    }

    /* the journey into the oven and back */
    /* the run to the oven mouth, and back out to the board */
    const tr = Math.min(1, anim.travel);
    /* before it is worked, the ball sits over by the oven end of the bench */
    const wait = Math.max(0, (0.16 - anim.grow) / 0.16);
    P.group.position.x = -23.2 * Math.sin(tr * Math.PI * 0.5) - wait * 15;
    P.group.position.z = 0.7 * tr;
    P.group.position.y = 0.06 + anim.rise * 3.5;
    P.group.rotation.y = tr * 0.42;

    if (ovenGlow) {
      ovenGlow.material.opacity = 0.34 + anim.bake * 0.56;
      ovenGlow.material.color.setRGB(1, 0.62 - anim.bake * 0.1, 0.24);
      oven.userData.fire.intensity = 14 + anim.bake * 46;
    }
    if (P.flour) P.flour.material.opacity = 0.85 - g * 0.35;
  }

  /* ------------------------------------------------------------------ init */

  function init(canvas) {
    if (!window.THREE) return false;
    try {
      renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      if (!renderer.getContext()) return false;
    } catch (e) { return false; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.outputColorSpace = T.SRGBColorSpace;

    scene = new T.Scene();
    camera = new T.PerspectiveCamera(rig.fov, window.innerWidth / window.innerHeight, 0.4, 400);

    scene.add(new T.HemisphereLight(0xfff5e6, 0xb59a7c, 0.95));
    sun = new T.DirectionalLight(0xfff1d8, 2.1);
    sun.position.set(26, 40, 22);
    scene.add(sun);
    const fill = new T.DirectionalLight(0xdce9ff, 0.35);
    fill.position.set(-30, 18, -26);
    scene.add(fill);

    buildKitchen();
    buildPizza();
    applyStage();

    /* flour in the light */
    const N = 420;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = Math.random() * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 44;
    }
    const dg = new T.BufferGeometry();
    dg.setAttribute('position', new T.BufferAttribute(pos, 3));
    dust = new T.Points(dg, new T.PointsMaterial({
      color: 0xfff3d8, size: 0.42, sizeAttenuation: true, map: moteTexture(),
      transparent: true, opacity: 0.5, depthWrite: false, blending: T.AdditiveBlending,
    }));
    scene.add(dust);

    ready = true; running = true;
    clock.last = performance.now();
    requestAnimationFrame(frame);
    return true;
  }

  /* ---------------------------------------------------------------- moving
     Each slide gets its own vantage on the bench: close over the dough while
     it is being worked, wide when it travels to the oven, low and level when
     it is served. The text always sits on the left, so the camera keeps the
     action to the right of frame. */

  const VANTAGE = {
    flour:    { p: [-6, 19, 40], t: [-29, 3.0, -4], fov: 40 },
    dough:    { p: [4, 14, 33], t: [-7.5, 1.6, 0], fov: 40 },
    stretch:  { p: [2, 10, 27], t: [-6.5, 1.2, 0], fov: 42 },
    base:     { p: [6, 18, 34], t: [-7.0, 0.8, 0], fov: 40 },
    sauce:    { p: [1, 13, 29], t: [-6.5, 0.9, 0], fov: 42 },
    cheese:   { p: [4, 11, 27], t: [-6.5, 1.0, 0], fov: 42 },
    toppings: { p: [-1, 17, 31], t: [-7.0, 0.9, 0], fov: 40 },
    peel:     { p: [3, 13, 31], t: [-11.5, 2.6, -1], fov: 42 },
    oven:     { p: [-9, 12, 33], t: [-33, 3.4, -4], fov: 44 },
    bake:     { p: [-17, 9, 26], t: [-33, 3.6, -5], fov: 42 },
    out:      { p: [6, 17, 34], t: [-7.0, 1.0, 0], fov: 40 },
    slice:    { p: [2, 13, 29], t: [-6.5, 1.0, 0], fov: 42 },
    served:   { p: [3, 10, 30], t: [-6.5, 2.6, 0], fov: 42 },
  };

  function goTo(slide, instant) {
    if (!ready) return;

    still = !!slide.still;
    setStage(slide.stage || 'flour', instant);

    /* the light warms and drops as the deck runs, like an afternoon shift */
    const prog = Math.max(0, SLIDES.indexOf(slide)) / Math.max(1, SLIDES.length - 1);
    const lx = 26 - prog * 46, ly = 46 - prog * 16, lz = 22 + prog * 8;
    if (window.gsap && !instant && !reduced) {
      window.gsap.to(sun.position, { x: lx, y: ly, z: lz, duration: 2, ease: 'power1.inOut' });
      window.gsap.to(sun.color, { r: 1, g: 0.945 - prog * 0.06, b: 0.85 - prog * 0.12, duration: 2 });
    } else {
      sun.position.set(lx, ly, lz);
    }

    const v = VANTAGE[slide.stage] || VANTAGE.flour;
    const target = {
      px: v.p[0], py: v.p[1], pz: v.p[2],
      tx: v.t[0], ty: v.t[1], tz: v.t[2],
      fov: slide.fov || v.fov || 42,
    };

    if (instant || reduced || !window.gsap) {
      Object.assign(rig, target, { u: 1 });
      return;
    }

    rig.ax = rig.px; rig.ay = rig.py; rig.az = rig.pz;
    rig.bx = target.px; rig.by = target.py; rig.bz = target.pz;
    rig.atx = rig.tx; rig.aty = rig.ty; rig.atz = rig.tz;
    rig.btx = target.tx; rig.bty = target.ty; rig.btz = target.tz;

    const dist = Math.hypot(target.px - rig.px, target.pz - rig.pz) || 1;
    const arc = slide.arc === undefined ? 1 : slide.arc;
    rig.cx = (rig.ax + rig.bx) / 2;
    rig.cy = (rig.ay + rig.by) / 2 + (2.5 + dist * 0.3) * arc;
    rig.cz = (rig.az + rig.bz) / 2 + 3 * arc;
    rig.u = 0;

    const dur = (1.2 + Math.min(1.2, dist / 22)) * (slide.slow ? 1.5 : 1);
    window.gsap.killTweensOf(rig);
    window.gsap.to(rig, { u: 1, duration: dur, ease: slide.ease || 'power2.inOut' });
    window.gsap.to(rig, { fov: target.fov, duration: dur, ease: 'power2.inOut' });
  }

  function frame(now) {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - clock.last) / 1000);
    clock.last = now;
    clock.t += dt;
    const t = clock.t;

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

    pointer.sx += (pointer.x - pointer.sx) * Math.min(1, dt * 3.2);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(1, dt * 3.2);

    const calm = reduced || still;
    const amp = calm ? 0 : 1;
    const bob = calm ? 0 : Math.sin(t * 0.42) * 0.26;
    const sway = calm ? 0 : Math.cos(t * 0.3) * 0.32;

    camera.position.set(
      rig.px + pointer.sx * 2.2 * amp + sway,
      rig.py - pointer.sy * 1.4 * amp + bob,
      rig.pz + pointer.sy * 0.7 * amp
    );
    camera.fov = rig.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(rig.tx + pointer.sx * 0.5 * amp, rig.ty, rig.tz);

    /* the backdrop drifts the other way, which is what sells the depth */
    const root = document.documentElement;
    root.style.setProperty('--bdx', (-pointer.sx * 14 - sway * 2).toFixed(2) + 'px');
    root.style.setProperty('--bdy', (-pointer.sy * 9 - bob * 2).toFixed(2) + 'px');

    /* the fire breathes */
    if (ovenGlow && !calm) {
      const flicker = 1 + Math.sin(t * 9.3) * 0.05 + Math.sin(t * 3.1) * 0.04;
      ovenGlow.scale.setScalar(flicker);
      oven.userData.fire.intensity = (6 + anim.bake * 26) * flicker;
    }

    if (dust) {
      dust.visible = !still;
      const p = dust.geometry.attributes.position;
      for (let i = 1; i < p.array.length; i += 3) {
        p.array[i] += dt * 0.5;
        if (p.array[i] > 22) p.array[i] = 0;
      }
      p.needsUpdate = true;
      dust.material.opacity = 0.34 + Math.sin(t * 0.6) * 0.12;
    }

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
    if (v) running = false;
    else if (ready && !running) { running = true; clock.last = performance.now(); requestAnimationFrame(frame); }
  }

  return { init: init, goTo: goTo, resize: resize, setPointer: setPointer, setReduced: setReduced, pause: pause, isReady: function () { return ready; } };
})();

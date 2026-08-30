/* ==========================================================================
   THE GIVING SCALE
   The same PizzaBurg kitchen the HRM deck is set in, with one new thing on
   the counter: a brass-and-oak market balance. One pan carries plain stone
   cost weights; the other starts empty. Across sixteen slides small tokens —
   a lantern, a gift, an apron, a leaf, a split slice, a return loop, a cap,
   a rescue basket — settle onto the good pan one at a time, and the beam
   tips further every time.

   The tilt is not keyframed. Every tick applyStage() adds up what is
   actually sitting on each pan and derives the beam angle from the
   difference, then hangs the chains and the pans off that angle. The
   argument the deck is making is the same one the geometry is making.

   Everything is lathed, extruded or drawn onto a canvas at runtime — no
   models to load, so the finished page still runs offline from a USB stick.
   ========================================================================== */

const World = (function () {
  const T = window.THREE;
  const V2 = function (x, y) { return new T.Vector2(x, y); };

  /* PizzaBurg's own palette, sampled off the card and the outlet sign */
  const BRAND = 0xe23b2e;
  const BRAND_DEEP = 0xa82418;
  const CREAM = 0xf6f0e2;

  const CHEESE = 0xf0cf85;
  const WOOD = 0x8a5f3c;
  const WOOD_PALE = 0xb98a5c;
  const STEEL = 0xc3c8cc;

  /* the scale's own tokens */
  const BRASS = 0xc9a227;
  const STONE_GREY = 0x8a8a86;
  const PAN_TERRACOTTA = 0xb5622f;
  const LEAF_YOUNG = 0x8fae6e;
  const WARM_GLOW = 0xffb35c;
  const COIN_GOLD = 0xd8b34a;
  const CAP_NAVY = 0x2b3550;
  const HOOK_DIM = 0xcbb9a0;

  let renderer, scene, camera, sun, oven, ovenGlow, fire, dust;
  let running = false, reduced = false, ready = false, still = false;
  const clock = { t: 0, last: 0 };

  /* The scale is modelled in its own small units — a beam 4.4 across, pans of
     r0.75 — because that is the size a real bench balance is drawn at. The
     room is not: the counter is 80 units wide and the oven 17 across. So the
     whole group is built at those honest proportions and then scaled once.

     4.4 × 2.6 puts the beam at 11.4 units. At the calibration vantage —
     ramadan, 46 units out at fov 34 — that lands the beam between 0.47 and
     0.69 of frame width: right of centre, clear of the 54ch text column,
     and the same band the pizza deck keeps its own subject in. Going
     smaller does not buy framing (the leftmost tip only moves 0.02 across a
     15% shrink, because the tight idea vantages aim right of the post, not
     at it) and it does cost token legibility: a 0.16-unit token is already
     only about 20px wide on a 1920 frame at the closest stage. */
  const SCALE_UP = 2.6;

  const PIVOT_Y = 3.2;      /* where the beam crosses the post, in scale units */
  const BEAM_HALF = 2.2;    /* half of the 4.4 beam */
  const CHAIN_LEN = 1.6;    /* drop from beam end to pan floor */
  const CHAIN_SPLAY = 0.5;  /* the two strands of a chain part this far in z */
  const PAN_RIM_Y = 0.20;   /* where a strand meets the pan */

  const S = {
    group: null, beamBar: null, beamPivot: null,
    costPan: null, goodPan: null, stones: null,
    chainL: null, chainR: null,
    gaugeArc: null, gaugeTick: null, plaque: null, hook: null, glow: null,
    lantern: null, gift: null, apron: null, leaf: null,
    meal: null, green: null, cap: null, rescue: null,
  };

  /* one dedicated 0→1 flag per token, plus the two running tallies. Nothing
     here is ever reused by a second object, which is what makes jumping
     straight to slide eleven behave exactly like walking there. */
  const anim = {
    costWeight: 6,
    lanternOn: 0, giftOn: 0, apronOn: 0, leafOn: 0,
    mealOn: 0, greenOn: 0, capOn: 0, rescueOn: 0,
    hookOn: 0, plaqueOn: 0, revealGlow: 0,
    beamAngle: 0,
  };

  const rig = {
    px: 0, py: 14, pz: 30, tx: 0, ty: 2, tz: 0, fov: 42,
    u: 1, ax: 0, ay: 0, az: 0, bx: 0, by: 0, bz: 0, cx: 0, cy: 0, cz: 0,
    atx: 0, aty: 0, atz: 0, btx: 0, bty: 0, btz: 0,
  };
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

  /* ---------------------------------------------------------------- utils */

  function mat(color, o) {
    o = o || {};
    return new T.MeshStandardMaterial({
      color: color,
      roughness: o.rough === undefined ? 0.85 : o.rough,
      metalness: o.metal === undefined ? 0.02 : o.metal,
      map: o.map || null,
      alphaMap: o.alphaMap || null,
      transparent: !!o.transparent,
      opacity: o.opacity === undefined ? 1 : o.opacity,
      side: o.side || T.FrontSide,
      emissive: o.emissive === undefined ? 0x000000 : o.emissive,
      emissiveIntensity: o.ei === undefined ? 1 : o.ei,
      depthWrite: o.depthWrite === undefined ? true : o.depthWrite,
      polygonOffset: !!o.offset,
      polygonOffsetFactor: o.offset || 0,
      polygonOffsetUnits: o.offset ? 1 : 0,
    });
  }

  function put(m, pos, rot) {
    if (pos) m.position.set(pos[0], pos[1], pos[2]);
    if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
    return m;
  }

  function box(w, h, d, color, o) {
    o = o || {};
    return put(new T.Mesh(new T.BoxGeometry(w, h, d), o.material || mat(color, o)), o.pos, o.rot);
  }

  function cyl(rt, rb, h, seg, color, o) {
    o = o || {};
    return put(new T.Mesh(new T.CylinderGeometry(rt, rb, h, seg, 1, !!o.open), o.material || mat(color, o)), o.pos, o.rot);
  }

  function lathe(profile, seg, color, o) {
    o = o || {};
    const pts = profile.map(function (p) { return V2(Math.max(0.0001, p[0]), p[1]); });
    return put(new T.Mesh(new T.LatheGeometry(pts, seg || 48), o.material || mat(color, o)), o.pos, o.rot);
  }

  function extrude(shape, depth, color, o) {
    o = o || {};
    const g = new T.ExtrudeGeometry(shape, {
      depth: depth, bevelEnabled: !!o.bevel, bevelSize: o.bevel || 0,
      bevelThickness: o.bevel || 0, bevelSegments: 1, curveSegments: o.curve || 16,
    });
    return put(new T.Mesh(g, o.material || mat(color, o)), o.pos, o.rot);
  }

  /* A cylinder built h units tall, then stretched and aimed between two
     points. The chains need this every tick, not once at setup. */
  const UP = new T.Vector3(0, 1, 0);
  const vA = new T.Vector3(), vB = new T.Vector3(), vD = new T.Vector3();

  function span(mesh, ax, ay, az, bx, by, bz, unit) {
    vA.set(ax, ay, az); vB.set(bx, by, bz);
    vD.subVectors(vB, vA);
    const len = vD.length() || 0.0001;
    mesh.position.addVectors(vA, vB).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(UP, vD.divideScalar(len));
    mesh.scale.set(1, len / unit, 1);
  }

  let shadowTex = null;
  function shadowTexture() {
    if (shadowTex) return shadowTex;
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const rg = g.createRadialGradient(64, 64, 2, 64, 64, 62);
    rg.addColorStop(0, 'rgba(58,38,22,0.6)');
    rg.addColorStop(0.5, 'rgba(58,38,22,0.24)');
    rg.addColorStop(1, 'rgba(58,38,22,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
    shadowTex = new T.CanvasTexture(c);
    return shadowTex;
  }

  function contact(x, z, r, opacity, y) {
    const m = new T.Mesh(
      new T.PlaneGeometry(r * 2, r * 2),
      new T.MeshBasicMaterial({ map: shadowTexture(), transparent: true, opacity: opacity, depthWrite: false })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, y === undefined ? 0.05 : y, z);
    return m;
  }

  function tex(canvas, o) {
    o = o || {};
    const t = new T.CanvasTexture(canvas);
    t.colorSpace = T.SRGBColorSpace;
    t.anisotropy = 4;
    if (o.repeat) { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(o.repeat[0], o.repeat[1]); }
    return t;
  }

  function canvas(size) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    return c;
  }

  /* -------------------------------------------------------------- textures */

  function marbleTexture() {
    const c = canvas(512), g = c.getContext('2d');
    g.fillStyle = '#eae2d4'; g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 40; i++) {
      g.strokeStyle = 'rgba(148,138,124,' + (0.04 + Math.random() * 0.08) + ')';
      g.lineWidth = 0.6 + Math.random() * 2.6;
      g.beginPath();
      let x = Math.random() * 512, y = Math.random() * 512;
      g.moveTo(x, y);
      for (let k = 0; k < 8; k++) {
        x += (Math.random() - 0.5) * 150; y += (Math.random() - 0.5) * 120;
        g.lineTo(x, y);
      }
      g.stroke();
    }
    for (let i = 0; i < 3000; i++) {
      g.fillStyle = 'rgba(120,110,98,' + (Math.random() * 0.05) + ')';
      g.fillRect(Math.random() * 512, Math.random() * 512, 1.4, 1.4);
    }
    return tex(c, { repeat: [3, 1.6] });
  }

  /* Cream subway tile with a PizzaBurg red band — the backsplash. */
  function tileTexture() {
    const c = canvas(512), g = c.getContext('2d');
    g.fillStyle = '#efe6d4'; g.fillRect(0, 0, 512, 512);
    const w = 128, h = 64;
    for (let r = 0; r < 512 / h; r++) {
      for (let i = -1; i < 512 / w + 1; i++) {
        const x = i * w + (r % 2 ? w / 2 : 0), y = r * h;
        const band = r === 4;
        g.fillStyle = band ? '#d8402f' : (r % 3 === 0 ? '#f6f0e2' : '#eadfca');
        g.fillRect(x + 2, y + 2, w - 4, h - 4);
        const sg = g.createLinearGradient(x, y, x, y + h);
        sg.addColorStop(0, 'rgba(255,255,255,0.30)');
        sg.addColorStop(1, 'rgba(0,0,0,0.07)');
        g.fillStyle = sg; g.fillRect(x + 2, y + 2, w - 4, h - 4);
      }
    }
    return tex(c, { repeat: [5, 1] });
  }

  /* The floor: large warm tiles with a grout line and a little speckle, so a
     wide shot of the room has something under it. */
  function floorTexture() {
    const c = canvas(512), g = c.getContext('2d');
    g.fillStyle = '#9a8b78'; g.fillRect(0, 0, 512, 512);
    const n = 2, s2 = 512 / n;
    for (let r = 0; r < n; r++) {
      for (let i = 0; i < n; i++) {
        const v = 0.94 + ((r + i) % 2) * 0.08;
        g.fillStyle = 'rgb(' + Math.round(214 * v) + ',' + Math.round(199 * v) + ',' + Math.round(176 * v) + ')';
        g.fillRect(i * s2 + 4, r * s2 + 4, s2 - 8, s2 - 8);
      }
    }
    for (let i = 0; i < 5200; i++) {
      const a = Math.random() * 0.1;
      g.fillStyle = (Math.random() < 0.5 ? 'rgba(120,98,74,' : 'rgba(255,250,240,') + a + ')';
      g.fillRect(Math.random() * 512, Math.random() * 512, 2.4, 2.4);
    }
    return tex(c, { repeat: [18, 14] });
  }

  /* Fired-brick for the oven dome. */
  function brickTexture() {
    const c = canvas(512), g = c.getContext('2d');
    g.fillStyle = '#c9a884'; g.fillRect(0, 0, 512, 512);
    const w = 74, h = 34;
    for (let r = 0; r < 512 / h + 1; r++) {
      for (let i = -1; i < 512 / w + 1; i++) {
        const x = i * w + (r % 2 ? w / 2 : 0), y = r * h;
        const v = 0.82 + Math.random() * 0.3;
        g.fillStyle = 'rgb(' + Math.round(196 * v) + ',' + Math.round(150 * v) + ',' + Math.round(112 * v) + ')';
        g.fillRect(x + 3, y + 3, w - 6, h - 6);
      }
    }
    for (let i = 0; i < 2200; i++) {
      g.fillStyle = 'rgba(90,64,42,' + (Math.random() * 0.09) + ')';
      g.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
    return tex(c, { repeat: [4, 2] });
  }

  /* The PizzaBurg wordmark, for box lids and cups. */
  function wordmarkTexture(bg, wide) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = wide ? 256 : 512;
    const g = c.getContext('2d');
    g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height);
    const cy = c.height / 2;
    g.fillStyle = '#e23b2e';
    const bw = 372, bh = 96;
    g.fillRect((512 - bw) / 2, cy - bh / 2, bw, bh);
    g.fillStyle = '#ffffff';
    g.font = '700 68px Poppins, Inter, system-ui, sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('PizzaBurg', 256, cy + 2);
    if (!wide) {
      g.fillStyle = 'rgba(60,44,30,0.4)';
      g.font = '600 26px Inter, system-ui, sans-serif';
      g.fillText('BEWARE — IS ADDICTIVE!', 256, cy + 96);
    }
    return tex(c);
  }

  /* The backlit roundel that hangs in a PizzaBurg outlet: BEWARE ·
     PIZZABURG · IS ADDICTIVE! Drawn once, then lit from behind. */
  function roundelTexture() {
    const c = canvas(512), g = c.getContext('2d');
    g.clearRect(0, 0, 512, 512);
    const cx = 256, cy = 256;

    g.fillStyle = '#c62a1c';
    g.beginPath(); g.arc(cx, cy, 246, 0, 7); g.fill();
    g.globalCompositeOperation = 'destination-out';
    g.beginPath(); g.arc(cx, cy, 198, 0, 7); g.fill();
    g.globalCompositeOperation = 'source-over';

    /* the banner across the middle */
    g.fillStyle = '#c62a1c';
    g.fillRect(24, 214, 464, 84);

    /* the dashes in the ring */
    g.strokeStyle = '#c62a1c'; g.lineWidth = 30; g.lineCap = 'butt';
    for (let i = 0; i < 2; i++) {
      const base = i ? Math.PI * 0.16 : Math.PI * 1.16;
      g.beginPath(); g.arc(cx, cy, 222, base, base + Math.PI * 0.2); g.stroke();
      g.beginPath(); g.arc(cx, cy, 222, base + Math.PI * 0.46, base + Math.PI * 0.66); g.stroke();
    }

    g.fillStyle = '#fdf6e6';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = '800 74px Poppins, Inter, system-ui, sans-serif';
    g.fillText('PIZZABURG', cx, cy + 4);
    g.fillStyle = '#c62a1c';
    g.font = '700 40px Inter, system-ui, sans-serif';
    g.fillText('BEWARE', cx, cy - 150);
    g.fillText('IS ADDICTIVE!', cx, cy + 158);
    return tex(c);
  }

  function moteTexture() {
    const c = canvas(64), g = c.getContext('2d');
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, 'rgba(255,255,255,1)');
    rg.addColorStop(0.35, 'rgba(255,246,224,0.65)');
    rg.addColorStop(1, 'rgba(255,246,224,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(c);
  }

  /* Carroll's four tiers, engraved on the plaque bolted to the post. It is
     read at a distance, so the tiers carry the shape and the words are only
     there for anyone who walks up to the screen. */
  function plaqueTexture() {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 288;
    const g = c.getContext('2d');
    g.fillStyle = '#f6f0e2'; g.fillRect(0, 0, 512, 288);
    g.strokeStyle = 'rgba(168,36,24,0.55)'; g.lineWidth = 6;
    g.strokeRect(11, 11, 490, 266);

    const tiers = ['PHILANTHROPIC', 'ETHICAL', 'LEGAL', 'ECONOMIC'];
    const apex = 256, top = 44, h = 52;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let i = 0; i < 4; i++) {
      const y0 = top + i * h, y1 = y0 + h - 7;
      const w0 = 34 + i * 60, w1 = 34 + (i + 1) * 60;
      g.beginPath();
      g.moveTo(apex - w0, y0); g.lineTo(apex + w0, y0);
      g.lineTo(apex + w1, y1); g.lineTo(apex - w1, y1);
      g.closePath();
      g.fillStyle = i % 2 ? 'rgba(226,59,46,0.16)' : 'rgba(226,59,46,0.28)';
      g.fill();
      g.strokeStyle = '#a82418'; g.lineWidth = 2.4; g.stroke();
      g.fillStyle = '#8e2016';
      g.font = '700 ' + (i < 2 ? 17 : 20) + 'px Inter, system-ui, sans-serif';
      g.fillText(tiers[i], apex, (y0 + y1) / 2 + 1);
    }
    return tex(c);
  }

  /* ------------------------------------------------------------- the room */

  function buildKitchen() {
    /* the counter */
    const top = new T.Mesh(new T.BoxGeometry(80, 1.7, 36), mat(0xc9bda6, { rough: 0.32, metal: 0.02, map: marbleTexture() }));
    top.position.set(-8, -0.85, 0);
    scene.add(top);
    scene.add(box(78, 9, 34, 0xc2ad8c, { pos: [-8, -6.2, -0.4], rough: 0.92 }));
    scene.add(box(78, 2.6, 34.4, 0xa8916d, { pos: [-8, -10.0, -0.4], rough: 0.94 }));
    scene.add(box(80, 0.4, 0.7, STEEL, { pos: [-8, 0.15, 18.1], rough: 0.26, metal: 0.7 }));
    scene.add(box(80, 0.5, 0.34, BRAND_DEEP, { pos: [-8, -1.15, 18.32], rough: 0.72 }));

    /* the floor the whole room stands on — without it the counter floats */
    const floor = new T.Mesh(
      new T.PlaneGeometry(300, 220),
      mat(0xa2917a, { rough: 0.62, metal: 0.03, map: floorTexture() })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(-10, -11.4, 10);
    scene.add(floor);
    /* a skirting where the wall meets it */
    scene.add(box(140, 1.6, 1.2, 0xbca88a, { pos: [-10, -10.6, -21.6], rough: 0.9 }));

    /* the tiled backsplash and a shelf of jars */
    const wall = new T.Mesh(new T.PlaneGeometry(140, 26), mat(0xe9ddc6, { rough: 0.52, map: tileTexture() }));
    wall.position.set(-10, 9, -21.4);
    scene.add(wall);
    scene.add(box(180, 70, 1.4, 0xc3b096, { pos: [-10, 18, -22.4], rough: 0.96 }));

    const shelf = box(64, 1.2, 6.4, WOOD, { pos: [2, 12, -18.4], rough: 0.72 });
    scene.add(shelf);
    for (let i = 0; i < 5; i++) {
      scene.add(box(0.9, 2.8, 5.6, 0x6f4a2d, { pos: [-28 + i * 15, 10.9, -18.6], rough: 0.76 }));
    }
    const jarProfile = [
      [0.00, 0.00], [0.92, 0.00], [1.00, 0.14], [1.00, 2.30], [0.86, 2.62],
      [0.86, 2.86], [1.02, 2.94], [1.02, 3.30], [0.84, 3.42], [0.00, 3.46],
    ];
    for (let i = 0; i < 8; i++) {
      const x = -22 + i * 6.2, s = 0.85 + (i % 3) * 0.22;
      const j = lathe(jarProfile, 22, i % 2 ? 0xe7dcc6 : 0xd9c6a8, { rough: 0.34, metal: 0.05 });
      j.scale.set(s, s, s);
      j.position.set(x, 12.45, -18.8);
      scene.add(j);
    }

    /* the roundel, backlit, exactly where it hangs in their outlet */
    const roundel = new T.Mesh(
      new T.PlaneGeometry(10.5, 10.5),
      new T.MeshStandardMaterial({
        map: roundelTexture(), transparent: true,
        emissive: 0xff5a3a, emissiveIntensity: 0.55, roughness: 0.5,
      })
    );
    roundel.position.set(-26.5, 19.4, -21.2);
    scene.add(roundel);
    /* the halo it throws on the tiles behind it */
    const halo = new T.Mesh(
      new T.CircleGeometry(8.0, 40),
      new T.MeshBasicMaterial({ color: 0xffb27a, transparent: true, opacity: 0.3, depthWrite: false })
    );
    halo.position.set(-26.5, 19.4, -21.35);
    scene.add(halo);
    const roundelLight = new T.PointLight(0xff7a48, 16, 46, 2);
    roundelLight.position.set(-26.5, 19.4, -16);
    scene.add(roundelLight);

    /* the wordmark, on a panel beside it */
    const mark = new T.Mesh(
      new T.PlaneGeometry(12.5, 6.2),
      mat(0xffffff, { rough: 0.7, map: wordmarkTexture('#f7f1e3', true) })
    );
    mark.position.set(2.5, 20.6, -21.2);
    scene.add(mark);

    /* a menu board, in the brand's own red and cream */
    const board = box(15, 9, 0.5, CREAM, { pos: [-44, 15, -21], rough: 0.85 });
    scene.add(board);
    scene.add(box(15.8, 1.9, 0.6, BRAND, { pos: [-44, 18.6, -21], rough: 0.6 }));
    for (let i = 0; i < 5; i++) {
      scene.add(box(9 - (i % 2) * 2.6, 0.5, 0.6, 0xcfc3ad, { pos: [-45 - (i % 2) * 1.3, 16.6 - i * 1.5, -20.9], rough: 0.9 }));
    }

    /* the ceiling the pendants hang from */
    const ceil = new T.Mesh(new T.PlaneGeometry(220, 160), mat(0xcdbb9f, { rough: 0.95 }));
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(-10, 30, 6);
    scene.add(ceil);

    /* pendant lamps over the bench */
    const shadeProfile = [
      [0.00, 2.10], [0.22, 2.06], [0.60, 1.72], [1.30, 0.62], [1.86, 0.06],
      [1.90, 0.00], [1.80, 0.00], [1.24, 0.56], [0.54, 1.66], [0.16, 2.00], [0.00, 2.02],
    ];
    [-24, -4, 16].forEach(function (x) {
      const g2 = new T.Group();
      g2.add(cyl(0.07, 0.07, 9.6, 6, 0x5b544c, { pos: [0, 26.6, 0], rough: 0.8 }));
      g2.add(cyl(0.75, 0.75, 0.35, 14, 0x5b544c, { pos: [0, 29.8, 0], rough: 0.6, metal: 0.3 }));
      const shade = lathe(shadeProfile, 28, BRAND, { rough: 0.42, side: T.DoubleSide });
      shade.position.y = 20;
      g2.add(shade);
      const bulb = new T.Mesh(new T.SphereGeometry(0.52, 14, 10),
        new T.MeshBasicMaterial({ color: 0xfff0c8 }));
      bulb.position.y = 19.7;
      g2.add(bulb);
      const pl = new T.PointLight(0xffdca0, 9, 34, 2);
      pl.position.y = 19.4;
      g2.add(pl);
      g2.position.set(x, 0, -3);
      scene.add(g2);
    });

    buildOven();
    buildProps();
  }

  function buildOven() {
    oven = new T.Group();
    oven.position.set(-30, 0, -6);
    oven.rotation.y = 0.34;

    /* a lathed dome on a thick base, in fired brick */
    const brick = brickTexture();
    const domeProfile = [
      [8.60, 0.00], [8.60, 1.90], [8.30, 2.30], [8.05, 3.60], [7.60, 5.20],
      [6.70, 6.90], [5.40, 8.35], [3.70, 9.45], [1.90, 10.05], [0.90, 10.20], [0.00, 10.25],
    ];
    const dome = lathe(domeProfile, 44, 0xa9714a, { rough: 0.93, map: brick });
    oven.add(dome);
    /* the plinth it stands on */
    oven.add(cyl(9.1, 9.6, 1.6, 34, 0x8e6c4a, { pos: [0, 0.8, 0], rough: 0.9 }));
    /* a chimney */
    oven.add(cyl(0.95, 1.15, 3.2, 16, 0x9c7d5c, { pos: [0.4, 11.4, -0.6], rough: 0.9 }));
    oven.add(cyl(1.25, 1.05, 0.5, 16, 0x9c8168, { pos: [0.4, 13.2, -0.6], rough: 0.9 }));

    /* the front face, with a real arched mouth cut out of it */
    const face = new T.Shape();
    face.absarc(0, 4.2, 7.4, 0, Math.PI * 2, false);
    const arch = new T.Path();
    arch.moveTo(-2.9, 0.4);
    arch.lineTo(-2.9, 3.4);
    arch.absarc(0, 3.4, 2.9, Math.PI, 0, true);
    arch.lineTo(2.9, 0.4);
    arch.closePath();
    face.holes.push(arch);
    const faceGeo = new T.ExtrudeGeometry(face, { depth: 1.5, bevelEnabled: true, bevelSize: 0.18, bevelThickness: 0.18, bevelSegments: 2, curveSegments: 24 });
    const faceMesh = new T.Mesh(faceGeo, mat(0xb08a63, { rough: 0.9 }));
    faceMesh.position.set(0, 0, 7.2);
    oven.add(faceMesh);

    /* a band of PizzaBurg red around the arch */
    const trimMat = mat(BRAND, { rough: 0.42 });
    const archBand = new T.Mesh(new T.TorusGeometry(3.2, 0.3, 10, 34, Math.PI), trimMat);
    archBand.position.set(0, 3.4, 8.78);
    oven.add(archBand);
    [-3.2, 3.2].forEach(function (x) {
      oven.add(put(new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 3.1, 10), trimMat), [x, 1.85, 8.78]));
    });
    oven.add(put(new T.Mesh(new T.BoxGeometry(7.6, 0.44, 0.6), trimMat), [0, 0.32, 8.78]));

    /* the cavity, and the fire in it */
    const cave = cyl(6.6, 6.6, 9, 26, 0x2a1a10, { pos: [0, 4, 1], rot: [Math.PI / 2, 0, 0], open: true, side: T.BackSide, rough: 1 });
    oven.add(cave);
    oven.add(new T.Mesh(new T.CircleGeometry(6.4, 26), mat(0x33200f, { rough: 1 })).translateY(4).translateZ(-3.6));

    ovenGlow = new T.Mesh(
      new T.PlaneGeometry(9, 7),
      new T.MeshBasicMaterial({ color: 0xff8c2a, transparent: true, opacity: 0.5, depthWrite: false })
    );
    ovenGlow.position.set(0, 3.4, 4.6);
    oven.add(ovenGlow);

    /* embers on the oven floor */
    for (let i = 0; i < 9; i++) {
      const e = box(0.5 + Math.random(), 0.16, 0.5, 0xff7420, { pos: [-4 + Math.random() * 8, 0.75, -1 + Math.random() * 4], rough: 0.7, emissive: 0xff5a10, ei: 1.6 });
      oven.add(e);
    }

    /* the oven is never the subject in this deck, so it just idles warm */
    fire = new T.PointLight(0xff8830, 26, 56, 2);
    fire.position.set(-28, 4.5, 0);
    scene.add(fire);

    scene.add(oven);
    scene.add(contact(-30, -6, 14, 0.55));
  }

  function buildProps() {
    /* a stainless mixing bowl */
    const bowlProfile = [
      [0.00, 0.00], [1.10, 0.06], [1.90, 0.42], [2.34, 1.10], [2.46, 1.76],
      [2.60, 1.88], [2.44, 1.96], [2.20, 1.30], [1.76, 0.62], [1.00, 0.24], [0.00, 0.18],
    ];
    const bowl = lathe(bowlProfile, 32, 0xd2d7da, { rough: 0.22, metal: 0.72 });
    bowl.position.set(18, 0, -8);
    bowl.scale.setScalar(1.5);
    scene.add(bowl, contact(18, -8, 4.4, 0.42));

    /* a sauce tin */
    const tinProfile = [
      [0.00, 0.00], [1.55, 0.00], [1.62, 0.14], [1.62, 3.40], [1.72, 3.52],
      [1.72, 3.76], [1.55, 3.86], [0.00, 3.88],
    ];
    const tin = lathe(tinProfile, 26, BRAND_DEEP, { rough: 0.4, metal: 0.35 });
    tin.position.set(24, 0, -3);
    scene.add(tin, contact(24, -3, 2.6, 0.36));

    /* a stack of PizzaBurg boxes */
    const lid = wordmarkTexture('#f6f0e2', true);
    for (let i = 0; i < 3; i++) {
      const b = new T.Mesh(
        new T.BoxGeometry(9, 0.8, 9),
        [mat(CREAM, { rough: 0.9 }), mat(CREAM, { rough: 0.9 }), mat(0xffffff, { rough: 0.88, map: lid }),
         mat(CREAM, { rough: 0.9 }), mat(CREAM, { rough: 0.9 }), mat(CREAM, { rough: 0.9 })]
      );
      b.position.set(30, 0.4 + i * 0.84, 7);
      b.rotation.y = 0.05 * i;
      scene.add(b);
    }
    scene.add(contact(30, 7, 7, 0.45));

    /* a branded cup, like the ones in the group's photographs */
    const cupProfile = [
      [0.00, 0.00], [1.05, 0.00], [1.10, 0.12], [1.52, 3.40], [1.62, 3.62],
      [1.50, 3.70], [1.42, 3.44], [1.00, 0.20], [0.00, 0.16],
    ];
    const cup = lathe(cupProfile, 26, 0xfcf8f0, { rough: 0.6 });
    cup.position.set(12, 0, -12);
    scene.add(cup);
    const band = cyl(1.35, 1.24, 1.1, 26, BRAND, { pos: [12, 1.4, -12], rough: 0.5 });
    scene.add(band, contact(12, -12, 2.4, 0.34));

    /* an apron on a hook by the oven */
    const apron = box(5.4, 7.4, 0.3, BRAND, { pos: [-45, 13, -20.6], rot: [0.04, 0, 0.05], rough: 0.86 });
    scene.add(apron);
    scene.add(cyl(0.22, 0.22, 1.2, 8, 0x8b8378, { pos: [-45, 17.2, -20.2], rot: [Math.PI / 2, 0, 0] }));

    /* a red stool tucked under the counter lip */
    const stool = new T.Group();
    stool.add(cyl(2.2, 2.0, 0.7, 24, BRAND, { pos: [0, 6.2, 0], rough: 0.6 }));
    [[-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3]].forEach(function (a) {
      stool.add(cyl(0.18, 0.24, 6, 8, 0x6f665c, { pos: [a[0], 3, a[1]], rough: 0.5, metal: 0.4 }));
    });
    stool.position.set(6, -8, 15);
    scene.add(stool);

    /* a rolling pin, resting where the dough gets worked */
    const pinProfile = [
      [0.00, 0.00], [0.30, 0.00], [0.30, 1.10], [0.62, 1.40], [0.70, 1.70],
      [0.70, 6.30], [0.62, 6.60], [0.30, 6.90], [0.30, 8.00], [0.00, 8.00],
    ];
    const pin = lathe(pinProfile, 18, WOOD_PALE, { rough: 0.62 });
    pin.rotation.z = Math.PI / 2;
    pin.position.set(14, 0.7, 9);
    scene.add(pin, contact(14, 9, 4.6, 0.34));
  }

  /* --------------------------------------------------------- the weights */

  /* Eight tokens, eight slots, eight flags. The two food weights count for
     more than the rest — feeding people is the heaviest thing on the pan,
     and the beam should say so without anyone pointing it out. */
  const TOKENS = [
    { key: 'lantern', flag: 'lanternOn', w: 1.4 },
    { key: 'gift',    flag: 'giftOn',    w: 1.4 },
    { key: 'apron',   flag: 'apronOn',   w: 1.4 },
    { key: 'leaf',    flag: 'leafOn',    w: 1.4 },
    { key: 'meal',    flag: 'mealOn',    w: 2.1 },
    { key: 'green',   flag: 'greenOn',   w: 1.4 },
    { key: 'cap',     flag: 'capOn',     w: 1.4 },
    { key: 'rescue',  flag: 'rescueOn',  w: 2.1 },
  ];
  const TOKEN_Y = 0.07;   /* the pan's inner floor */

  /* Ramadan: a small pierced lantern with a warm core. */
  function makeLantern() {
    const g = new T.Group();
    g.add(lathe([
      [0.00, 0.00], [0.070, 0.000], [0.078, 0.012], [0.110, 0.060],
      [0.098, 0.118], [0.062, 0.150], [0.062, 0.160], [0.000, 0.160],
    ], 16, CREAM, { rough: 0.5, emissive: WARM_GLOW, ei: 0.85 }));
    g.add(cyl(0.026, 0.034, 0.030, 10, BRASS, { pos: [0, 0.175, 0], rough: 0.34, metal: 0.7 }));
    g.add(cyl(0.084, 0.084, 0.016, 12, BRASS, { pos: [0, 0.006, 0], rough: 0.34, metal: 0.7 }));
    return g;
  }

  /* Christmas: a wrapped box with a cream cross-ribbon. */
  function makeGift() {
    const g = new T.Group();
    g.add(box(0.160, 0.140, 0.160, BRAND, { pos: [0, 0.070, 0], rough: 0.62 }));
    g.add(box(0.170, 0.146, 0.030, CREAM, { pos: [0, 0.070, 0], rough: 0.6 }));
    g.add(box(0.030, 0.146, 0.170, CREAM, { pos: [0, 0.070, 0], rough: 0.6 }));
    [-0.36, 0.36].forEach(function (r) {
      g.add(box(0.052, 0.020, 0.030, CREAM, { pos: [Math.sin(r) * 0.05, 0.148, 0], rot: [0, 0, r], rough: 0.6 }));
    });
    return g;
  }

  /* Welfare: a flat apron disc with two neck straps, lying on edge. */
  function makeApron() {
    const g = new T.Group();
    const body = lathe([
      [0.000, 0.000], [0.060, 0.000], [0.084, 0.006], [0.090, 0.015],
      [0.084, 0.024], [0.060, 0.030], [0.000, 0.030],
    ], 22, WOOD_PALE, { rough: 0.78 });
    /* stand the disc up so it reads as cloth: after the quarter turn the
       lathe's own z is what runs vertically, so that is the axis to stretch */
    body.rotation.x = -Math.PI / 2;
    body.scale.set(1, 1, 1.12);
    body.position.y = 0.100;
    g.add(body);
    [-0.045, 0.045].forEach(function (x) {
      g.add(box(0.012, 0.070, 0.010, WOOD_PALE, { pos: [x, 0.195, 0], rot: [0, 0, x * 2.4], rough: 0.78 }));
    });
    return g;
  }

  /* Environment: one leaf, for the paper wrap that replaced the plastic. */
  function makeLeaf() {
    const s = new T.Shape();
    s.moveTo(-0.080, 0);
    s.quadraticCurveTo(-0.010, 0.060, 0.080, 0);
    s.quadraticCurveTo(-0.010, -0.060, -0.080, 0);
    const g = new T.Group();
    const blade = extrude(s, 0.016, LEAF_YOUNG, { rough: 0.66, curve: 14 });
    blade.rotation.x = -Math.PI / 2.4;
    blade.position.y = 0.062;
    g.add(blade);
    g.add(box(0.008, 0.062, 0.008, 0x6d8a52, { pos: [-0.062, 0.030, 0.020], rot: [0.5, 0, 0.4], rough: 0.7 }));
    return g;
  }

  /* Idea 1 — buy one give one: two slices, cut apart, facing each other.
     Extruded sectors rather than partial lathes: a lathe stopped short of a
     full turn leaves both cut faces open, and at this size the hollow shows. */
  function makeMeal() {
    const wedge = new T.Shape();
    wedge.moveTo(0, 0);
    wedge.absarc(0, 0, 0.120, -Math.PI / 8, Math.PI / 8, false);
    wedge.lineTo(0, 0);
    const g = new T.Group();
    [-1, 1].forEach(function (side) {
      const w = new T.Group();
      const base = extrude(wedge, 0.026, CREAM, { rough: 0.8, curve: 10 });
      base.rotation.x = -Math.PI / 2;
      w.add(base);
      const top = extrude(wedge, 0.012, BRAND, { rough: 0.55, curve: 10 });
      top.rotation.x = -Math.PI / 2;
      top.scale.set(0.86, 0.86, 1);
      top.position.y = 0.028;
      w.add(top);
      w.rotation.y = side > 0 ? 0 : Math.PI;
      w.position.set(side * 0.052, 0.006, side * 0.030);
      g.add(w);
    });
    return g;
  }

  /* Idea 2 — the green return: a loop that comes back on itself. */
  function makeGreen() {
    const a0 = Math.PI * 0.18, a1 = Math.PI * 1.72;
    const ring = new T.Shape();
    ring.absarc(0, 0, 0.090, a0, a1, false);
    ring.absarc(0, 0, 0.062, a1, a0, true);
    const g = new T.Group();
    /* the loop stands on its own inner group: the token's own origin has to
       stay on the pan floor, because applyStage drives that y directly */
    const inner = new T.Group();
    inner.position.y = 0.098;
    inner.add(extrude(ring, 0.024, LEAF_YOUNG, { rough: 0.5, metal: 0.2, curve: 20 }));
    const head = new T.Shape();
    head.moveTo(0, 0.042);
    head.lineTo(-0.038, -0.026);
    head.lineTo(0.038, -0.026);
    head.closePath();
    const tip = extrude(head, 0.024, LEAF_YOUNG, { rough: 0.5, metal: 0.2, curve: 4 });
    tip.position.set(Math.cos(a1) * 0.076, Math.sin(a1) * 0.076, 0);
    tip.rotation.z = a1;
    inner.add(tip);
    g.add(inner);
    return g;
  }

  /* Idea 3 — the student fund: a mortarboard with a gold tassel button. */
  function makeCap() {
    const g = new T.Group();
    g.add(cyl(0.050, 0.056, 0.052, 14, CAP_NAVY, { pos: [0, 0.026, 0], rough: 0.7 }));
    g.add(box(0.160, 0.020, 0.160, CAP_NAVY, { pos: [0, 0.062, 0], rot: [0, 0.5, 0], rough: 0.66 }));
    g.add(cyl(0.014, 0.014, 0.012, 10, COIN_GOLD, { pos: [0, 0.078, 0], rough: 0.34, metal: 0.6 }));
    g.add(cyl(0.007, 0.007, 0.070, 6, COIN_GOLD, { pos: [0.048, 0.056, 0.030], rot: [0.35, 0, 0.5], rough: 0.5, metal: 0.4 }));
    return g;
  }

  /* Idea 4 — food rescue: a basket with the evening's surplus in it. */
  function makeRescue() {
    const g = new T.Group();
    g.add(lathe([
      [0.000, 0.000], [0.068, 0.000], [0.074, 0.010], [0.130, 0.140],
      [0.124, 0.148], [0.066, 0.014], [0.000, 0.012],
    ], 20, WOOD_PALE, { rough: 0.82 }));
    [[-0.045, 0.020], [0.040, -0.030], [0.010, 0.048]].forEach(function (p, i) {
      g.add(box(0.046, 0.042, 0.046, CHEESE, { pos: [p[0], 0.132 + (i % 2) * 0.028, p[1]], rot: [0, i * 0.7, 0.12], rough: 0.7 }));
    });
    return g;
  }

  const MAKERS = {
    lantern: makeLantern, gift: makeGift, apron: makeApron, leaf: makeLeaf,
    meal: makeMeal, green: makeGreen, cap: makeCap, rescue: makeRescue,
  };

  /* ---------------------------------------------------------- the balance */

  /* the pan: a shallow bowl with a real lip, so the tokens sit in something */
  const PAN_PROFILE = [
    [0.000, 0.060], [0.300, 0.030], [0.550, 0.062], [0.720, 0.180], [0.750, 0.230],
    [0.750, 0.252], [0.716, 0.206], [0.545, 0.088], [0.298, 0.056], [0.000, 0.086],
  ];

  function makePan(color) {
    const g = new T.Group();
    g.add(lathe(PAN_PROFILE, 34, color, { rough: 0.68, side: T.DoubleSide }));
    return g;
  }

  function buildScale() {
    S.group = new T.Group();
    S.group.position.set(0, 0, 0);
    S.group.scale.setScalar(SCALE_UP);
    scene.add(S.group);

    /* post and pivot */
    S.group.add(cyl(0.60, 0.72, 0.14, 26, WOOD, { pos: [0, 0.07, 0], rough: 0.7 }));
    S.group.add(cyl(0.50, 0.60, 0.30, 24, BRASS, { pos: [0, 0.15, 0], rough: 0.36, metal: 0.7 }));
    S.group.add(cyl(0.16, 0.22, 3.20, 20, BRASS, { pos: [0, 1.60, 0], rough: 0.34, metal: 0.7 }));
    S.beamPivot = new T.Mesh(new T.SphereGeometry(0.14, 16, 12), mat(BRASS, { rough: 0.28, metal: 0.8 }));
    S.beamPivot.position.set(0, PIVOT_Y, 0);
    S.group.add(S.beamPivot);

    /* the beam itself — oak, with brass caps at the ends */
    S.beamBar = box(4.40, 0.16, 0.28, WOOD, { pos: [0, PIVOT_Y, 0], rough: 0.62 });
    S.group.add(S.beamBar);
    [-1, 1].forEach(function (side) {
      S.beamBar.add(box(0.16, 0.20, 0.32, BRASS, { pos: [side * BEAM_HALF, 0, 0], rough: 0.34, metal: 0.7 }));
    });

    /* the empty hook: a bare ring on the good side of the beam, hung there
       on the gap slide and taken away again when the first idea fills it */
    S.hook = lathe([
      [0.0850, 0.0000], [0.0956, 0.0106], [0.1000, 0.0000],
      [0.0956, -0.0106], [0.0850, -0.0150], [0.0744, -0.0106],
      [0.0700, 0.0000], [0.0744, 0.0106], [0.0850, 0.0150],
    ], 16, HOOK_DIM, { rough: 0.8, transparent: true, opacity: 0.9 });
    S.hook.rotation.x = Math.PI / 2;
    S.hook.position.set(1.10, -0.17, 0);
    S.beamBar.add(S.hook);

    /* the two chains. Each is two strands; every endpoint is recomputed in
       applyStage, never fixed here, or the pans tear off the beam ends. */
    const chainMat = mat(STEEL, { rough: 0.3, metal: 0.65 });
    S.chainL = []; S.chainR = [];
    for (let i = 0; i < 2; i++) {
      S.chainL.push(cyl(0.02, 0.02, CHAIN_LEN, 6, STEEL, { material: chainMat }));
      S.chainR.push(cyl(0.02, 0.02, CHAIN_LEN, 6, STEEL, { material: chainMat }));
      S.group.add(S.chainL[i], S.chainR[i]);
    }

    /* the pans */
    S.costPan = makePan(STONE_GREY);
    S.goodPan = makePan(PAN_TERRACOTTA);
    S.group.add(S.costPan, S.goodPan);

    /* six plain stones, four down and two on top; one lifts off at the
       environment stage, so the top-right slot is deliberately last */
    S.stoneSlots = [
      [-0.14, 0.10, -0.14], [0.14, 0.10, -0.14], [-0.14, 0.10, 0.14],
      [0.14, 0.10, 0.14], [-0.14, 0.28, 0.00], [0.14, 0.28, 0.00],
    ];
    S.stones = new T.InstancedMesh(
      new T.BoxGeometry(0.22, 0.18, 0.22), mat(STONE_GREY, { rough: 0.88 }), S.stoneSlots.length
    );
    S.stones.count = 0;
    S.costPan.add(S.stones);

    /* the eight tokens, laid out on a golden angle so no two crowd */
    TOKENS.forEach(function (tk, i) {
      const a = i * 2.39996;
      const r = Math.sqrt((i + 0.55) / TOKENS.length) * 0.44;
      const m = MAKERS[tk.key]();
      m.position.set(Math.cos(a) * r, TOKEN_Y, Math.sin(a) * r);
      /* only a small turn each: three of the tokens are flat shapes and go
         unreadable if they are allowed to face away from the camera */
      m.rotation.y = ((i % 3) - 1) * 0.34;
      m.visible = false;
      S.goodPan.add(m);
      S[tk.key] = m;
      tk.slot = m.position.clone();
    });

    /* the plaque bolted to the post: Carroll's pyramid, the frame the whole
       argument is hung on */
    S.plaque = new T.Mesh(
      new T.PlaneGeometry(0.90, 0.50),
      mat(0xffffff, { rough: 0.72, map: plaqueTexture(), transparent: true })
    );
    S.plaque.position.set(0, 2.20, 0.24);
    S.plaque.visible = false;
    S.group.add(S.plaque);

    /* the gauge: an engraved arc behind the post and a tick that rides the
       beam, so the tilt is readable from the back of a room */
    const arc = new T.Shape();
    arc.absarc(0, 0, 1.10, Math.PI * 0.24, Math.PI * 0.76, false);
    arc.absarc(0, 0, 1.02, Math.PI * 0.76, Math.PI * 0.24, true);
    S.gaugeArc = extrude(arc, 0.05, HOOK_DIM, { rough: 0.74, curve: 26, pos: [0, 3.40, -0.30] });
    S.group.add(S.gaugeArc);
    for (let i = -2; i <= 2; i++) {
      const th = Math.PI / 2 + i * 0.12;
      S.group.add(box(0.018, 0.10, 0.02, HOOK_DIM, {
        pos: [Math.cos(th) * 0.96, 3.40 + Math.sin(th) * 0.96, -0.235],
        rot: [0, 0, th - Math.PI / 2], rough: 0.74,
      }));
    }
    S.gaugeTick = box(0.02, 0.18, 0.02, BRASS, { pos: [0, 4.46, -0.20], rough: 0.3, metal: 0.7, emissive: BRASS, ei: 0.2 });
    S.group.add(S.gaugeTick);

    /* the payoff light, dark until the reveal */
    S.glow = new T.PointLight(WARM_GLOW, 0, 60, 2);
    S.glow.position.set(0, 4.5, 1.5);
    S.group.add(S.glow);

    scene.add(contact(0, 0, 3.6, 0.5));
  }

  /* ------------------------------------------------------------- the steps */

  const TARGETS = {
    open:        { costWeight: 6, lanternOn: 0, giftOn: 0, apronOn: 0, leafOn: 0, mealOn: 0, greenOn: 0, capOn: 0, rescueOn: 0, hookOn: 0, plaqueOn: 0, revealGlow: 0 },
    framework:   { costWeight: 6, lanternOn: 0, giftOn: 0, apronOn: 0, leafOn: 0, mealOn: 0, greenOn: 0, capOn: 0, rescueOn: 0, hookOn: 0, plaqueOn: 1, revealGlow: 0 },
    ramadan:     { costWeight: 6, lanternOn: 1, giftOn: 0, apronOn: 0, leafOn: 0, mealOn: 0, greenOn: 0, capOn: 0, rescueOn: 0, hookOn: 0, plaqueOn: 1, revealGlow: 0 },
    christmas:   { costWeight: 6, lanternOn: 1, giftOn: 1, apronOn: 0, leafOn: 0, mealOn: 0, greenOn: 0, capOn: 0, rescueOn: 0, hookOn: 0, plaqueOn: 1, revealGlow: 0 },
    welfare:     { costWeight: 6, lanternOn: 1, giftOn: 1, apronOn: 1, leafOn: 0, mealOn: 0, greenOn: 0, capOn: 0, rescueOn: 0, hookOn: 0, plaqueOn: 1, revealGlow: 0 },
    environment: { costWeight: 5, lanternOn: 1, giftOn: 1, apronOn: 1, leafOn: 1, mealOn: 0, greenOn: 0, capOn: 0, rescueOn: 0, hookOn: 0, plaqueOn: 1, revealGlow: 0 },
    gap:         { costWeight: 5, lanternOn: 1, giftOn: 1, apronOn: 1, leafOn: 1, mealOn: 0, greenOn: 0, capOn: 0, rescueOn: 0, hookOn: 1, plaqueOn: 1, revealGlow: 0 },
    idea1:       { costWeight: 5, lanternOn: 1, giftOn: 1, apronOn: 1, leafOn: 1, mealOn: 1, greenOn: 0, capOn: 0, rescueOn: 0, hookOn: 0, plaqueOn: 1, revealGlow: 0 },
    idea2:       { costWeight: 5, lanternOn: 1, giftOn: 1, apronOn: 1, leafOn: 1, mealOn: 1, greenOn: 1, capOn: 0, rescueOn: 0, hookOn: 0, plaqueOn: 1, revealGlow: 0 },
    idea3:       { costWeight: 5, lanternOn: 1, giftOn: 1, apronOn: 1, leafOn: 1, mealOn: 1, greenOn: 1, capOn: 1, rescueOn: 0, hookOn: 0, plaqueOn: 1, revealGlow: 0 },
    idea4:       { costWeight: 5, lanternOn: 1, giftOn: 1, apronOn: 1, leafOn: 1, mealOn: 1, greenOn: 1, capOn: 1, rescueOn: 1, hookOn: 0, plaqueOn: 1, revealGlow: 0 },
    fullreveal:  { costWeight: 5, lanternOn: 1, giftOn: 1, apronOn: 1, leafOn: 1, mealOn: 1, greenOn: 1, capOn: 1, rescueOn: 1, hookOn: 0, plaqueOn: 1, revealGlow: 1 },
  };

  /* the eight token flags get the bounce; the tallies and the fittings do not */
  const REVEAL_KEYS = ['lanternOn', 'giftOn', 'apronOn', 'leafOn', 'mealOn', 'greenOn', 'capOn', 'rescueOn'];
  const STEADY_KEYS = ['costWeight', 'hookOn', 'plaqueOn', 'revealGlow'];

  function setStage(name, instant) {
    const t = TARGETS[name] || TARGETS.open;
    if (instant || reduced || !window.gsap) {
      Object.keys(t).forEach(function (k) { anim[k] = t[k]; });
      applyStage();
      return;
    }
    window.gsap.killTweensOf(anim);

    const steady = { duration: 1.6, ease: 'power2.inOut', onUpdate: applyStage };
    STEADY_KEYS.forEach(function (k) { steady[k] = t[k]; });
    window.gsap.to(anim, steady);

    /* a touch of overshoot, so a new token settles onto the pan rather than
       simply existing there */
    const reveal = { duration: 1.6, ease: 'back.out(1.7)', onUpdate: applyStage };
    REVEAL_KEYS.forEach(function (k) { reveal[k] = t[k]; });
    window.gsap.to(anim, reveal);
  }

  /* The beam is derived, not animated. k and the clamp are picked so the
     opening reads about −13° (plainly cost-heavy) and the last idea lands
     just short of the 0.30 rad limit — the clamp is a guard rail, not the
     shape of the curve. Sign: rotation about +z lifts the +x end, and the
     cost pan is on −x, so a positive angle is a cost-heavy beam. */
  const TORQUE_K = 0.039;
  const TILT_MAX = 0.30;

  const dummy = new T.Object3D();

  function applyStage() {
    if (!S.beamBar) return;

    /* what is actually on the good pan. The reveal flags overshoot past 1 on
       the bounce; the tally clamps them so the beam never bounces with them. */
    let good = 0;
    TOKENS.forEach(function (tk) {
      const f = anim[tk.flag];
      const clamped = f < 0 ? 0 : (f > 1 ? 1 : f);
      good += clamped * tk.w;
      const m = S[tk.key];
      if (!m) return;
      m.visible = f > 0.01;
      m.scale.setScalar(f);
      m.position.y = tk.slot.y + (1 - clamped) * 0.34;
    });

    const raw = (anim.costWeight - good) * TORQUE_K;
    const a = raw < -TILT_MAX ? -TILT_MAX : (raw > TILT_MAX ? TILT_MAX : raw);
    anim.beamAngle = a;

    S.beamBar.rotation.z = a;

    /* both beam ends, then the pans hanging plumb under them */
    const ca = Math.cos(a) * BEAM_HALF, sa = Math.sin(a) * BEAM_HALF;
    const rx = ca, ry = PIVOT_Y + sa;      /* good side, +x */
    const lx = -ca, ly = PIVOT_Y - sa;     /* cost side, −x */

    S.goodPan.position.set(rx, ry - CHAIN_LEN, 0);
    S.costPan.position.set(lx, ly - CHAIN_LEN, 0);

    hang(S.chainR, rx, ry, S.goodPan.position.y);
    hang(S.chainL, lx, ly, S.costPan.position.y);

    /* the cost stack: whole stones only, so the 6→5 drop is a fact, not a fade */
    const n = Math.max(0, Math.min(S.stoneSlots.length, Math.round(anim.costWeight)));
    S.stones.count = n;
    for (let i = 0; i < n; i++) {
      const s = S.stoneSlots[i];
      dummy.position.set(s[0], s[1], s[2]);
      dummy.rotation.set(0, i * 0.31, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      S.stones.setMatrixAt(i, dummy.matrix);
    }
    if (n) S.stones.instanceMatrix.needsUpdate = true;

    /* the gauge tick rides the beam: it leans toward whichever pan is low */
    S.gaugeTick.position.set(-Math.sin(a) * 1.06, 3.40 + Math.cos(a) * 1.06, -0.20);
    S.gaugeTick.rotation.z = a;

    S.hook.visible = anim.hookOn > 0.01;
    S.hook.scale.setScalar(Math.max(0.001, anim.hookOn));
    S.hook.material.opacity = 0.9 * Math.min(1, anim.hookOn);

    S.plaque.visible = anim.plaqueOn > 0.01;
    S.plaque.scale.set(Math.max(0.001, anim.plaqueOn), Math.max(0.001, anim.plaqueOn), 1);
    S.plaque.material.opacity = Math.min(1, anim.plaqueOn);

    S.glow.intensity = anim.revealGlow * 10;
  }

  function hang(pair, ex, ey, panY) {
    for (let i = 0; i < 2; i++) {
      const z = i ? CHAIN_SPLAY : -CHAIN_SPLAY;
      span(pair[i], ex, ey, 0, ex, panY + PAN_RIM_Y, z, CHAIN_LEN);
    }
  }

  /* ------------------------------------------------------------------ init */

  function environment() {
    const c = canvas(64), g = c.getContext('2d');
    const lg = g.createLinearGradient(0, 0, 0, 64);
    lg.addColorStop(0, '#fffaf0');
    lg.addColorStop(0.45, '#f3e8d4');
    lg.addColorStop(1, '#c8ab84');
    g.fillStyle = lg; g.fillRect(0, 0, 64, 64);
    const sg = g.createRadialGradient(44, 16, 1, 44, 16, 22);
    sg.addColorStop(0, 'rgba(255,248,226,1)');
    sg.addColorStop(1, 'rgba(255,248,226,0)');
    g.fillStyle = sg; g.fillRect(0, 0, 64, 64);
    const t = new T.CanvasTexture(c);
    t.mapping = T.EquirectangularReflectionMapping;
    t.colorSpace = T.SRGBColorSpace;
    const pm = new T.PMREMGenerator(renderer);
    const env = pm.fromEquirectangular(t).texture;
    pm.dispose(); t.dispose();
    return env;
  }

  function init(cv) {
    if (!window.THREE) return false;
    try {
      renderer = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
      if (!renderer.getContext()) return false;
    } catch (e) { return false; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.80;
    renderer.outputColorSpace = T.SRGBColorSpace;

    scene = new T.Scene();
    camera = new T.PerspectiveCamera(rig.fov, window.innerWidth / window.innerHeight, 0.4, 400);
    scene.environment = environment();
    scene.environmentIntensity = 0.34;

    scene.add(new T.HemisphereLight(0xffeed6, 0x6f5334, 0.30));
    sun = new T.DirectionalLight(0xffeccd, 3.3);
    sun.position.set(34, 62, 40);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -70; sun.shadow.camera.right = 55;
    sun.shadow.camera.top = 62; sun.shadow.camera.bottom = -30;
    sun.shadow.camera.near = 6; sun.shadow.camera.far = 190;
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.7;
    scene.add(sun);
    const fill = new T.DirectionalLight(0xbdd4f2, 0.26);
    fill.position.set(-40, 22, -30);
    scene.add(fill);

    /* depth: the far end of the room falls away into the warm paper colour */
    scene.fog = new T.Fog(0xf2e9db, 96, 210);

    buildKitchen();
    buildScale();
    applyStage();

    scene.traverse(function (o) {
      if (!o.isMesh || !o.material) return;
      const m = Array.isArray(o.material) ? o.material[0] : o.material;
      if (m.isMeshBasicMaterial || m.transparent && m.depthWrite === false) return;
      o.castShadow = true;
      o.receiveShadow = true;
    });

    const N = 420;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 48;
    }
    const dg = new T.BufferGeometry();
    dg.setAttribute('position', new T.BufferAttribute(pos, 3));
    dust = new T.Points(dg, new T.PointsMaterial({
      color: 0xfff3d8, size: 0.42, sizeAttenuation: true, map: moteTexture(),
      transparent: true, opacity: 0.5, depthWrite: false, blending: T.AdditiveBlending,
    }));
    scene.add(dust);

    /* the immersive pass layers its lighting, atmosphere and wall on top of
       all of the above. It is optional: without it the room still reads. */
    if (window.Enrich) window.Enrich.build(enrichContext());

    /* Two more optional layers, given the identical context: the grove beyond
       the window, and the kitchen at work behind the scale. Each is built the
       same way and each is allowed to be absent. */
    if (window.Grove || window.Life) {
      const ctx = enrichContext();
      if (window.Grove) window.Grove.build(ctx);
      if (window.Life) window.Life.build(ctx);
    }

    ready = true; running = true;
    clock.last = performance.now();
    requestAnimationFrame(frame);
    return true;
  }

  /* Everything an optional layer needs to build itself into this room. One
     definition, so the enrichment, the grove and the kitchen all see the same
     palette, the same helpers and the same anchors on the scale. */
  function enrichContext() {
    return {
      THREE: T, scene: scene, renderer: renderer, camera: camera,
      colors: {
        BRAND: BRAND, BRAND_DEEP: BRAND_DEEP, CREAM: CREAM, BRASS: BRASS,
        STONE_GREY: STONE_GREY, PAN_TERRACOTTA: PAN_TERRACOTTA,
        LEAF_YOUNG: LEAF_YOUNG, WARM_GLOW: WARM_GLOW, COIN_GOLD: COIN_GOLD,
        CAP_NAVY: CAP_NAVY, HOOK_DIM: HOOK_DIM,
      },
      anchors: {
        scale: S.group, beamBar: S.beamBar, costPan: S.costPan, goodPan: S.goodPan,
        gaugeArc: S.gaugeArc, gaugeTick: S.gaugeTick,
        weights: {
          lantern: S.lantern, gift: S.gift, apron: S.apron, leaf: S.leaf,
          meal: S.meal, green: S.green, cap: S.cap, rescue: S.rescue,
          hook: S.hook,
        },
      },
      mat: mat, box: box, cyl: cyl, lathe: lathe, tex: tex, canvas: canvas,
    };
  }

  /* ---------------------------------------------------------------- moving */

  /* The text column owns the left half, so every vantage aims left of the
     scale: that puts the beam and both pans in the right third of frame,
     clear of the type and above the aside card. The deck opens wide and
     closes wider; the middle stages sit in close on the pans, where the
     tokens are only a fraction of a metre across.

     The target x values are solved, not eyeballed. Projecting the beam pivot
     through each camera puts it at a fraction of frame width: 0.61 on a plain
     slide, 0.66 where an aside card also wants the right column. Aiming only
     a unit or two left of the post — which is where these vantages started —
     walks the scale steadily into the type as the deck progresses, until by
     the idea slides it sits dead centre under the bullets. */
  const VANTAGE_SCALE = {
    open:        { p: [16, 13, 54], t: [-8, 3.6, 0],     fov: 37 },
    framework:   { p: [14, 15, 50], t: [-3.7, 5.2, 0],   fov: 35 },
    ramadan:     { p: [11, 11, 45], t: [-5.4, 4.6, 1.2], fov: 34 },
    christmas:   { p: [11, 11, 43], t: [-5.3, 4.6, 0.8], fov: 34 },
    welfare:     { p: [10, 10, 42], t: [-4.8, 4.2, 1.2], fov: 33 },
    environment: { p: [10, 10, 40], t: [-4.7, 4.2, 0.8], fov: 33 },
    gap:         { p: [9, 13, 42],  t: [-3.3, 6.0, -1],  fov: 35 },
    idea1:       { p: [9, 10, 39],  t: [-4.5, 4.0, 1],   fov: 33 },
    idea2:       { p: [10, 12, 40], t: [-5.6, 5.4, -1],  fov: 34 },
    idea3:       { p: [9, 9, 37],   t: [-4.1, 3.8, 1],   fov: 32 },
    idea4:       { p: [10, 10, 38], t: [-4.8, 4.2, 0],   fov: 33 },
    fullreveal:  { p: [17, 14, 50], t: [-7.7, 5.5, 0],   fov: 37 },
  };

  function goTo(slide, instant) {
    if (!ready) return;
    still = !!slide.still;
    setStage(slide.stage || 'open', instant);
    const st = slide.stage || 'open', now = !!(instant || reduced);
    if (window.Enrich) window.Enrich.apply(st, now);
    if (window.Grove) window.Grove.apply(st, now);
    if (window.Life) window.Life.apply(st, now);

    const prog = Math.max(0, SLIDES.indexOf(slide)) / Math.max(1, SLIDES.length - 1);
    const lx = 26 - prog * 50, ly = 48 - prog * 18, lz = 24 + prog * 8;
    if (window.gsap && !instant && !reduced) {
      window.gsap.to(sun.position, { x: lx, y: ly, z: lz, duration: 2, ease: 'power1.inOut' });
      window.gsap.to(sun.color, { r: 1, g: 0.945 - prog * 0.05, b: 0.86 - prog * 0.11, duration: 2 });
    } else {
      sun.position.set(lx, ly, lz);
    }

    const v = slide.cam || VANTAGE_SCALE[slide.stage] || VANTAGE_SCALE.open;
    const target = { px: v.p[0], py: v.p[1], pz: v.p[2], tx: v.t[0], ty: v.t[1], tz: v.t[2], fov: slide.fov || v.fov || 42 };

    if (instant || reduced || !window.gsap) {
      Object.keys(target).forEach(function (k) { rig[k] = target[k]; });
      rig.u = 1;
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

    const root = document.documentElement;
    root.style.setProperty('--bdx', (-pointer.sx * 14 - sway * 2).toFixed(2) + 'px');
    root.style.setProperty('--bdy', (-pointer.sy * 9 - bob * 2).toFixed(2) + 'px');

    if (ovenGlow && !calm) {
      const flicker = 1 + Math.sin(t * 9.3) * 0.06 + Math.sin(t * 3.1) * 0.045;
      ovenGlow.scale.set(flicker, 1 + (flicker - 1) * 0.5, 1);
      fire.intensity = 26 * flicker;
    }

    if (dust) {
      dust.visible = !still;
      const p = dust.geometry.attributes.position;
      for (let i = 1; i < p.array.length; i += 3) {
        p.array[i] += dt * 0.5;
        if (p.array[i] > 24) p.array[i] = 0;
      }
      p.needsUpdate = true;
      dust.material.opacity = 0.32 + Math.sin(t * 0.6) * 0.12;
    }

    const layerState = { beamAngle: anim.beamAngle, calm: calm };
    if (window.Enrich) window.Enrich.frame(t, dt, layerState);
    if (window.Grove) window.Grove.frame(t, dt, layerState);
    if (window.Life) window.Life.frame(t, dt, layerState);

    renderer.render(scene, camera);
  }

  function resize() {
    if (!ready) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  return {
    init: init, goTo: goTo, resize: resize,
    setPointer: function (x, y) { pointer.x = x; pointer.y = y; },
    setReduced: function (v) { reduced = v; },
    pause: function (v) {
      if (v) running = false;
      else if (ready && !running) { running = true; clock.last = performance.now(); requestAnimationFrame(frame); }
    },
    isReady: function () { return ready; },
  };
})();

/* ==========================================================================
   THE BENCH
   One pizza, made across the whole deck. Slide one is flour and a resting
   dough ball; by slide thirteen a slice is lifting off a cut pie. Every slide
   advances the bench one step and moves the camera, so the room changes under
   the text without anyone narrating it.

   Everything is lathed, extruded or drawn onto a canvas at runtime — no models
   to load, so the finished page still runs offline from a USB stick.
   ========================================================================== */

const World = (function () {
  const T = window.THREE;
  const V2 = function (x, y) { return new T.Vector2(x, y); };

  /* PizzaBurg's own palette, sampled off the card and the outlet sign */
  const BRAND = 0xe23b2e;
  const BRAND_DEEP = 0xa82418;
  const CREAM = 0xf6f0e2;

  const SAUCE = 0xb0301c;
  const CHEESE = 0xf0cf85;
  const DOUGH = 0xf2e1bd;
  const DOUGH_BAKED = 0xc07a33;
  const WOOD = 0x8a5f3c;
  const WOOD_PALE = 0xb98a5c;
  const STEEL = 0xc3c8cc;

  let renderer, scene, camera, sun, oven, ovenGlow, fire, dust;
  let running = false, reduced = false, ready = false, still = false;
  const clock = { t: 0, last: 0 };

  const P = {
    group: null, crust: null, sauce: null, cheese: null,
    tops: [], board: null, peel: null, lifted: null, flour: null, shadow: null,
  };
  const anim = { grow: 0, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 };

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

  /* Dough: warm, uneven, with the blistered spots that brown in the oven. */
  function doughTexture() {
    const c = canvas(512), g = c.getContext('2d');
    g.fillStyle = '#f4e6c6'; g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * 512, y = Math.random() * 512, r = 3 + Math.random() * 16;
      const rg = g.createRadialGradient(x, y, 0, x, y, r);
      const dark = Math.random() < 0.4;
      rg.addColorStop(0, dark ? 'rgba(176,126,62,0.5)' : 'rgba(255,248,224,0.55)');
      rg.addColorStop(1, 'rgba(255,248,224,0)');
      g.fillStyle = rg;
      g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
    }
    for (let i = 0; i < 1400; i++) {
      g.fillStyle = 'rgba(150,110,60,' + (Math.random() * 0.07) + ')';
      g.fillRect(Math.random() * 512, Math.random() * 512, 1.6, 1.6);
    }
    return tex(c, { repeat: [2, 2] });
  }

  /* Sauce, with a wobbly hand-ladled edge and a spiral of the spoon. */
  function sauceTexture() {
    const c = canvas(512), g = c.getContext('2d');
    const cx = 256, cy = 256;
    g.clearRect(0, 0, 512, 512);
    g.beginPath();
    for (let a = 0; a <= 360; a++) {
      const r = 232 + Math.sin(a * 0.11) * 7 + Math.sin(a * 0.043) * 9 + Math.sin(a * 0.31) * 3;
      const rad = a * Math.PI / 180;
      const x = cx + Math.cos(rad) * r, y = cy + Math.sin(rad) * r;
      a === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    g.closePath();
    const rg = g.createRadialGradient(cx - 30, cy - 30, 20, cx, cy, 240);
    rg.addColorStop(0, '#c8402a');
    rg.addColorStop(0.65, '#b0301c');
    rg.addColorStop(1, '#93250f');
    g.fillStyle = rg; g.fill();
    /* the spoon spiral */
    g.strokeStyle = 'rgba(150,52,28,0.5)'; g.lineWidth = 9;
    g.beginPath();
    for (let i = 0; i < 260; i++) {
      const a = i * 0.13, r = 18 + i * 0.82;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    g.stroke();
    for (let i = 0; i < 500; i++) {
      const a = Math.random() * 7, r = Math.random() * 228;
      g.fillStyle = 'rgba(90,26,12,' + (Math.random() * 0.16) + ')';
      g.beginPath(); g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1 + Math.random() * 4, 0, 7); g.fill();
    }
    return tex(c);
  }

  /* Cheese: overlapping melted pools, not a flat disc of yellow. */
  function cheeseTexture() {
    const c = canvas(512), g = c.getContext('2d');
    g.clearRect(0, 0, 512, 512);
    const cx = 256, cy = 256;
    for (let i = 0; i < 190; i++) {
      const a = i * 2.39996, rr = Math.sqrt(i / 190) * 218;
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      const r = 22 + Math.random() * 26;
      const rg = g.createRadialGradient(x - r * 0.25, y - r * 0.3, r * 0.1, x, y, r);
      rg.addColorStop(0, 'rgba(250,229,168,0.92)');
      rg.addColorStop(0.68, 'rgba(236,199,120,0.86)');
      rg.addColorStop(1, 'rgba(228,186,104,0)');
      g.fillStyle = rg;
      g.beginPath();
      g.ellipse(x, y, r, r * (0.72 + Math.random() * 0.4), Math.random() * 7, 0, 7);
      g.fill();
    }
    /* toasted patches */
    for (let i = 0; i < 34; i++) {
      const a = Math.random() * 7, rr = Math.random() * 210;
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr, r = 7 + Math.random() * 15;
      const rg = g.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, 'rgba(184,116,44,0.62)');
      rg.addColorStop(1, 'rgba(184,116,44,0)');
      g.fillStyle = rg;
      g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
    }
    return tex(c);
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

  function flourTexture() {
    const c = canvas(256), g = c.getContext('2d');
    for (let i = 0; i < 1800; i++) {
      const x = 128 + (Math.random() - 0.5) * 220, y = 128 + (Math.random() - 0.5) * 220;
      const d = Math.hypot(x - 128, y - 128) / 128;
      if (Math.random() < d * d) continue;
      g.fillStyle = 'rgba(255,252,244,' + (0.2 + Math.random() * 0.6) + ')';
      g.beginPath(); g.arc(x, y, 0.5 + Math.random() * 2.2, 0, 7); g.fill();
    }
    return new T.CanvasTexture(c);
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
    scene.add(box(80, 1.5, 0.5, BRAND, { pos: [-8, -0.85, 18.3], rough: 0.6 }));

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

    /* flour scattered where the dough gets worked */
    P.flour = new T.Mesh(
      new T.PlaneGeometry(32, 32),
      new T.MeshBasicMaterial({ map: flourTexture(), transparent: true, opacity: 0.8, depthWrite: false })
    );
    P.flour.rotation.x = -Math.PI / 2;
    P.flour.position.set(-2, 0.03, 0);
    scene.add(P.flour);

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
    const dome = lathe(domeProfile, 44, 0xc08d5f, { rough: 0.93, map: brick });
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
    const faceMesh = new T.Mesh(faceGeo, mat(0xc9a87f, { rough: 0.9 }));
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
      new T.MeshBasicMaterial({ color: 0xff8c2a, transparent: true, opacity: 0.55, depthWrite: false })
    );
    ovenGlow.position.set(0, 3.4, 4.6);
    oven.add(ovenGlow);

    /* embers on the oven floor */
    for (let i = 0; i < 9; i++) {
      const e = box(0.5 + Math.random(), 0.16, 0.5, 0xff7420, { pos: [-4 + Math.random() * 8, 0.75, -1 + Math.random() * 4], rough: 0.7, emissive: 0xff5a10, ei: 1.6 });
      oven.add(e);
    }

    fire = new T.PointLight(0xff8830, 0, 56, 2);
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

  /* ------------------------------------------------------------- the pizza */

  /* the cross-section of a pizza: a thin field with a puffed cornicione */
  const CRUST_PROFILE = [
    [0.000, 0.055], [0.520, 0.058], [0.720, 0.072], [0.820, 0.130],
    [0.888, 0.240], [0.940, 0.312], [0.992, 0.298], [1.020, 0.212],
    [1.018, 0.108], [0.972, 0.032], [0.800, 0.008], [0.440, 0.003], [0.000, 0.000],
  ];

  function buildPizza() {
    P.group = new T.Group();
    P.group.position.set(0, 0.06, 0);
    scene.add(P.group);

    /* the board it lands on after the oven */
    P.board = new T.Group();
    const boardProfile = [
      [0.00, 0.00], [8.20, 0.00], [8.60, 0.22], [8.60, 0.54], [8.20, 0.76], [0.00, 0.78],
    ];
    P.board.add(lathe(boardProfile, 44, WOOD, { rough: 0.66 }));
    const handle = new T.Shape();
    handle.moveTo(-1.7, 0); handle.lineTo(-1.4, 6.4);
    handle.absarc(0, 6.4, 1.4, Math.PI, 0, true);
    handle.lineTo(1.7, 0); handle.closePath();
    P.board.add(put(new T.Mesh(
      new T.ExtrudeGeometry(handle, { depth: 0.72, bevelEnabled: false, curveSegments: 12 }),
      mat(WOOD, { rough: 0.66 })
    ), [0, 0, 0], [-Math.PI / 2, 0, 0]).translateZ(-0.78));
    P.board.children[1].position.set(0, 0, 8.2);
    P.board.position.y = -0.78;   /* its top surface is the pizza's ground */
    P.board.visible = false;
    P.group.add(P.board);

    /* the peel: a rounded blade tapering into a long handle */
    const peelShape = new T.Shape();
    peelShape.absarc(0, 0, 8.4, -Math.PI * 0.74, Math.PI * 0.74, false);
    peelShape.lineTo(-7.2, 1.25);
    peelShape.lineTo(-20, 0.95);
    peelShape.lineTo(-20, -0.95);
    peelShape.lineTo(-7.2, -1.25);
    peelShape.closePath();
    const peelGeo = new T.ExtrudeGeometry(peelShape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 1, curveSegments: 30 });
    peelGeo.rotateX(-Math.PI / 2);
    P.peel = new T.Mesh(peelGeo, mat(STEEL, { rough: 0.3, metal: 0.62 }));
    P.peel.position.y = -0.34;    /* likewise: the blade sits under the base */
    P.peel.visible = false;
    P.group.add(P.peel);

    /* the crust */
    P.crust = lathe(CRUST_PROFILE, 76, DOUGH, { rough: 0.9, map: doughTexture() });
    P.group.add(P.crust);

    /* sauce and cheese, each a textured disc that grows into place */
    P.sauce = new T.Mesh(new T.CircleGeometry(1, 64), mat(0xffffff, {
      map: sauceTexture(), transparent: true, rough: 0.56, depthWrite: false,
    }));
    P.sauce.rotation.x = -Math.PI / 2;
    P.sauce.renderOrder = 1;
    P.sauce.visible = false;
    P.group.add(P.sauce);

    P.cheese = new T.Mesh(new T.CircleGeometry(1, 64), mat(0xffffff, {
      map: cheeseTexture(), transparent: true, rough: 0.4, depthWrite: false,
    }));
    P.cheese.rotation.x = -Math.PI / 2;
    P.cheese.renderOrder = 2;
    P.cheese.visible = false;
    P.group.add(P.cheese);

    /* toppings, each a proper little object */
    const pepProfile = [
      [0.00, 0.115], [0.46, 0.118], [0.70, 0.110], [0.85, 0.086],
      [0.94, 0.046], [0.96, 0.000], [0.60, 0.000], [0.00, 0.000],
    ];
    const pepGeo = new T.LatheGeometry(pepProfile.map(function (p) { return V2(Math.max(0.0001, p[0]), p[1]); }), 20);

    const stripGeo = new T.TorusGeometry(0.42, 0.085, 5, 12, Math.PI * 0.62);
    stripGeo.scale(1, 1, 0.55); stripGeo.rotateX(Math.PI / 2);

    const ringGeo = new T.TorusGeometry(0.36, 0.05, 5, 18, Math.PI * 1.35);
    ringGeo.scale(1, 1, 0.5); ringGeo.rotateX(Math.PI / 2);

    const mushGeo = new T.SphereGeometry(0.3, 12, 7, 0, Math.PI * 2, 0, Math.PI / 2);
    mushGeo.scale(1, 0.62, 1);

    const sets = [
      { geo: pepGeo, color: 0xa03222, n: 14, rough: 0.46, y: 0.00, s: 1.34 },
      { geo: stripGeo, color: 0x4a8433, n: 20, rough: 0.58, y: 0.04, s: 1.35 },
      { geo: ringGeo, color: 0xc27f9c, n: 15, rough: 0.56, y: 0.04, s: 1.4 },
      { geo: mushGeo, color: 0xd2bd9c, n: 11, rough: 0.8, y: 0.00, s: 1.5 },
    ];
    P.tops = sets.map(function (s, si) {
      const m = new T.InstancedMesh(s.geo, mat(s.color, { rough: s.rough }), s.n);
      m.count = 0;
      m.renderOrder = 3;
      P.group.add(m);
      const spots = [];
      for (let i = 0; i < s.n; i++) {
        const a = i * 2.39996 + si * 1.31;
        const rr = Math.sqrt((i + 0.6) / s.n) * 0.82;
        spots.push({ x: Math.cos(a) * rr, z: Math.sin(a) * rr, ry: a * 1.9, y: s.y, s: (s.s || 1) * (0.92 + ((i * 7) % 5) * 0.05) });
      }
      return { mesh: m, spots: spots, n: s.n };
    });

    /* the cut lines */
    P.cuts = new T.Group();
    for (let i = 0; i < 8; i++) {
      P.cuts.add(box(0.075, 0.05, 8.6, 0x93602f, { pos: [0, 0, 0], rot: [0, (i / 8) * Math.PI * 2, 0], transparent: true, opacity: 0 }));
    }
    P.cuts.visible = false;
    P.group.add(P.cuts);

    /* the slice that lifts away at the end */
    const wedge = new T.Shape();
    wedge.moveTo(0, 0);
    wedge.absarc(0, 0, 8, -Math.PI / 8.6, Math.PI / 8.6, false);
    wedge.lineTo(0, 0);
    const wg = new T.ExtrudeGeometry(wedge, { depth: 0.5, bevelEnabled: false, curveSegments: 14 });
    wg.rotateX(-Math.PI / 2);
    P.lifted = new T.Group();
    P.lifted.add(new T.Mesh(wg, mat(DOUGH_BAKED, { rough: 0.84 })));
    const wgTop = wg.clone();
    wgTop.scale(0.93, 1, 0.93);
    const topMesh = new T.Mesh(wgTop, mat(0xffffff, { rough: 0.42, map: P.cheese.material.map, transparent: true }));
    topMesh.position.y = 0.34;
    P.lifted.add(topMesh);
    P.lifted.visible = false;
    P.group.add(P.lifted);

    P.shadow = contact(0, 0, 12, 0.5, 0.06);
    scene.add(P.shadow);
  }

  /* ------------------------------------------------------------- the steps */

  const TARGETS = {
    flour:    { grow: 0.09, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    dough:    { grow: 0.17, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    stretch:  { grow: 0.56, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    base:     { grow: 1.00, sauce: 0, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    sauce:    { grow: 1.00, sauce: 1, cheese: 0, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    cheese:   { grow: 1.00, sauce: 1, cheese: 1, tops: 0, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    toppings: { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 0, cut: 0, lift: 0, travel: 0, rise: 0 },
    peel:     { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 0, cut: 0, lift: 0, travel: 0.16, rise: 0.62 },
    oven:     { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 0.2, cut: 0, lift: 0, travel: 0.76, rise: 1 },
    bake:     { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 1, cut: 0, lift: 0, travel: 0.97, rise: 1 },
    out:      { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 1, cut: 0, lift: 0, travel: 0, rise: 0 },
    slice:    { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 1, cut: 1, lift: 0, travel: 0, rise: 0 },
    served:   { grow: 1.00, sauce: 1, cheese: 1, tops: 1, bake: 1, cut: 1, lift: 1, travel: 0, rise: 0 },
  };

  function setStage(name, instant) {
    const t = TARGETS[name] || TARGETS.flour;
    if (instant || reduced || !window.gsap) {
      Object.keys(t).forEach(function (k) { anim[k] = t[k]; });
      applyStage();
      return;
    }
    window.gsap.killTweensOf(anim);
    window.gsap.to(anim, {
      grow: t.grow, sauce: t.sauce, cheese: t.cheese, tops: t.tops,
      bake: t.bake, cut: t.cut, lift: t.lift, travel: t.travel, rise: t.rise,
      duration: 1.6, ease: 'power2.inOut', onUpdate: applyStage,
    });
  }

  const dummy = new T.Object3D();
  const cA = new T.Color(), cB = new T.Color();

  function applyStage() {
    if (!P.crust) return;
    const g = anim.grow;

    /* a ball at 0.17, a full base at 1: the crust scales wide and settles low */
    const R = 1.9 + g * 6.4;
    const H = (2.4 - g * 1.62) / (g < 0.3 ? 1 : 1);
    P.crust.scale.set(R, H, R);
    P.crust.visible = g > 0.02;

    /* the field the sauce sits on rises with the crust profile */
    const fieldY = 0.055 * H;

    cA.setHex(DOUGH); cB.setHex(DOUGH_BAKED);
    P.crust.material.color.copy(cA).lerp(cB, anim.bake);

    P.sauce.visible = anim.sauce > 0.02;
    if (P.sauce.visible) {
      P.sauce.scale.setScalar(R * 0.845 * Math.min(1, anim.sauce * 1.15));
      P.sauce.position.y = fieldY + 0.025;
      P.sauce.material.opacity = Math.min(1, anim.sauce * 1.6);
      P.sauce.material.color.setRGB(1, 1 - anim.bake * 0.12, 1 - anim.bake * 0.16);
    }

    P.cheese.visible = anim.cheese > 0.02;
    if (P.cheese.visible) {
      P.cheese.scale.setScalar(R * 0.795 * (0.94 + anim.cheese * 0.06));
      P.cheese.position.y = fieldY + 0.07;
      P.cheese.material.opacity = Math.min(0.88, anim.cheese * 1.35);
      P.cheese.material.color.setRGB(1, 1 - anim.bake * 0.06, 1 - anim.bake * 0.14);
      P.cheese.material.roughness = 0.42 - anim.bake * 0.16;
    }

    P.tops.forEach(function (set) {
      const n = Math.round(anim.tops * set.n);
      set.mesh.count = n;
      for (let i = 0; i < n; i++) {
        const s = set.spots[i];
        dummy.position.set(s.x * R * 0.80, fieldY + s.y + 0.16, s.z * R * 0.80);
        dummy.rotation.set(0, s.ry, 0);
        dummy.scale.setScalar(s.s * (1 + anim.bake * 0.06));
        dummy.updateMatrix();
        set.mesh.setMatrixAt(i, dummy.matrix);
      }
      if (n) set.mesh.instanceMatrix.needsUpdate = true;
    });

    P.cuts.visible = anim.cut > 0.02;
    P.cuts.renderOrder = 4;
    P.cuts.position.y = fieldY + 0.34;
    P.cuts.children.forEach(function (c, i) {
      c.material.opacity = Math.max(0, Math.min(0.85, anim.cut * 8 - i * 0.55));
      c.scale.z = R / 8.6;
    });

    P.peel.visible = anim.travel > 0.02 && anim.bake < 0.98;
    P.board.visible = anim.bake > 0.5 && anim.travel < 0.4;
    P.shadow.material.opacity = 0.5 * (1 - anim.rise);
    P.shadow.scale.setScalar(Math.max(0.2, R / 8));

    P.lifted.visible = anim.lift > 0.02;
    if (P.lifted.visible) {
      P.lifted.position.set(anim.lift * 2.4, fieldY + 0.3 + anim.lift * 7.2, anim.lift * 1.2);
      P.lifted.rotation.set(-anim.lift * 0.62, 0.28, anim.lift * 0.2);
      P.lifted.scale.setScalar(R / 8);
    }

    /* the run to the oven mouth and back to the board */
    const tr = Math.min(1, anim.travel);
    const wait = Math.max(0, (0.17 - g) / 0.17);
    P.group.position.x = -28.2 * Math.sin(tr * Math.PI * 0.5) - wait * 16;
    P.group.position.z = 2.6 * tr;
    P.group.position.y = 0.06 + anim.rise * 3.6;
    P.group.rotation.y = tr * 0.34;

    if (ovenGlow) {
      ovenGlow.material.opacity = 0.42 + anim.bake * 0.42;
      fire.intensity = 16 + anim.bake * 48;
    }
    if (P.flour) P.flour.material.opacity = 0.8 - g * 0.36;
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
    buildPizza();
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

    ready = true; running = true;
    clock.last = performance.now();
    requestAnimationFrame(frame);
    return true;
  }

  /* ---------------------------------------------------------------- moving */

  /* The text column owns the left half, so every vantage aims about nine
     units left of the subject: that puts the pizza — or the oven — in the
     upper right, clear of the type and above the aside card. */
  const VANTAGE = {
    flour:    { p: [16, 22, 66], t: [-10, 5.0, 0], fov: 36 },
    dough:    { p: [14, 21, 64], t: [-11, 4.5, 0], fov: 36 },
    stretch:  { p: [10, 20, 62], t: [-12, 4.2, 0], fov: 37 },
    base:     { p: [13, 22, 64], t: [-11, 4.2, 0], fov: 36 },
    sauce:    { p: [8, 19, 60],  t: [-12, 4.0, 0], fov: 37 },
    cheese:   { p: [11, 20, 62], t: [-11, 4.0, 0], fov: 37 },
    toppings: { p: [6, 21, 63],  t: [-12, 4.0, 0], fov: 36 },
    peel:     { p: [4, 20, 62],  t: [-17, 5.0, 0], fov: 37 },
    oven:     { p: [0, 18, 58],  t: [-28, 7.0, 0], fov: 37 },
    bake:     { p: [-4, 17, 55], t: [-30, 7.0, 0], fov: 37 },
    out:      { p: [8, 21, 63],  t: [-12, 4.5, 0], fov: 36 },
    slice:    { p: [11, 19, 58], t: [-10, 4.2, 0], fov: 37 },
    served:   { p: [13, 17, 54], t: [-8, 5.0, 0],  fov: 38 },
  };

  function goTo(slide, instant) {
    if (!ready) return;
    still = !!slide.still;
    setStage(slide.stage || 'flour', instant);

    const prog = Math.max(0, SLIDES.indexOf(slide)) / Math.max(1, SLIDES.length - 1);
    const lx = 26 - prog * 50, ly = 48 - prog * 18, lz = 24 + prog * 8;
    if (window.gsap && !instant && !reduced) {
      window.gsap.to(sun.position, { x: lx, y: ly, z: lz, duration: 2, ease: 'power1.inOut' });
      window.gsap.to(sun.color, { r: 1, g: 0.945 - prog * 0.05, b: 0.86 - prog * 0.11, duration: 2 });
    } else {
      sun.position.set(lx, ly, lz);
    }

    const v = slide.cam || VANTAGE[slide.stage] || VANTAGE.flour;
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
      fire.intensity = (16 + anim.bake * 48) * flicker;
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

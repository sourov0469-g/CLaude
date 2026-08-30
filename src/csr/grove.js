/* ==========================================================================
   ROOTS & RINGS
   The group's first idea for this deck was a tree that grows as the giving
   grows. It is a good idea and a bad foreground: a canopy filling out beside
   a balance beam reads as a second argument, and the beam's tilt is the only
   argument this deck is making. So the tree is put outside, in daylight, and
   a window is cut into the back wall to see it through.

   That buys three things at once. The tree is structurally unable to crowd
   the scale, because a wall stands between them. The depth of the room
   doubles, because there is now something beyond it. And the two light
   shafts enrich.js already throws across the counter finally have a source.

   Where the aperture sits was solved against the vantage table rather than
   eyeballed. Projecting the scale through all twelve cameras onto the plane
   of the back wall puts its silhouette inside x -18..7.5; the tightest
   frustum (idea3) reaches x 19.8 on that same plane. So the opening starts
   at x 10.4 — always clear of the pans — and runs right, off the edge of
   frame on the close stages, which is what makes it read as a room that
   continues rather than a picture hung on a wall.
   ========================================================================== */

(function () {
  /* a local copy, used only if data.js has not been concatenated ahead of us */
  const GROVE_STAGES = [
    'open', 'framework', 'ramadan', 'christmas', 'welfare', 'environment',
    'gap', 'idea1', 'idea2', 'idea3', 'idea4', 'fullreveal',
  ];

  /* --------------------------------------------------------- architecture */

  /* the room's own back wall, from world.js: a tiled plane at z -21.4 with a
     rendered slab behind it, so the reveal is about 1.7 deep */
  const WALL_Z = -21.4;
  const REV_FRONT = -21.38;
  const REV_BACK = -23.14;
  const REV_MID = (REV_FRONT + REV_BACK) / 2;
  const REV_DEPTH = REV_FRONT - REV_BACK;

  /* The opening. The head stops at 9.0 because the shelf bracket at x 17
     hangs down to 9.5 and a bracket cutting across the crown looks like a
     mistake; the sill sits at 1.2 because the counter top hides the wall
     below about -0.6 from every vantage, so anything lower is spent. */
  const AP_X0 = 10.4;
  const AP_X1 = 29.0;
  const AP_Y0 = 1.2;
  const AP_Y1 = 9.0;
  const MULLION_X = 21.0;   /* right of the tree, so only the transom crosses it */
  const TRANSOM_Y = 7.4;

  /* -------------------------------------------------------------- outside */

  /* Grade is level with the sill, so the bed reads as pressed up against the
     glass and the ground plane needs no visible near edge. The tree stands
     12.6 beyond the wall: near enough to fill its light, far enough that the
     jambs crop it. */
  const GRADE = 1.18;
  const TREE = [15.4, GRADE, -34];
  const SKY_Z = -62;        /* the plate the ground runs back to meet */

  /* palette. Everything out here is held below the scale in saturation: the
     brass, the terracotta pan and the brand red are the only fully saturated
     things in this deck and they all live indoors. */
  const BARK = 0x6b5a46;
  const BARK_DARK = 0x574a3a;
  const LEAF_FULL = 0x7d9c5e;
  const LEAF_DULL = 0x8e8b6b;   /* where the canopy lands at gap */
  const FRAME_PAINT = 0xd6cfbc;
  const REVEAL_LIME = 0xdcd6c6;
  const SILL_STONE = 0xc4bdac;
  const CASING_OAK = 0xb9a98c;

  /* one leaf slot per instance; growth never adds or removes the mesh, only
     how many of these slots are drawn and how big each one is */
  const MAX_LEAVES = 256;
  const LEAF_STRIDE = 9;
  const CROWN_Y = 3.3;                /* the fork, in tree-local */
  const CANOPY_C = [0, 1.4, 0];       /* crown-local */
  const CANOPY_R = [3.6, 2.0, 2.9];

  /* One spotlight, and only one. The room already carries thirteen and the
     sun lights the garden anyway; this exists to pull the tree back toward
     cool against that warm key. Coned to 24 degrees and capped at 40 units,
     it cannot reach the post, which sits 47.5 away and 55 degrees off axis. */
  const KEY_BASE = 58;

  /* ---------------------------------------------------------------- table */

  /* One entry per stage, read straight off the stage name. grow drives the
     leaf count, the leaf size and the shell radius together; vigour drives
     only colour. Splitting them is what lets gap stall the tree without
     stripping it: the canopy loses a little of its fill and most of its
     green, which is a cold snap, where a bare tree would be a season.

     sky is a multiply over the painted plate, not a replacement for it, so
     it lives near white: the gradient already carries the colour and a tint
     down at half value would turn daylight into dusk on every slide. gap is
     the one entry allowed to pull it properly down and grey. */
  const GROVE = {
    open:        { grow: 0.16, vigour: 0.50, light: 0.60, sky: 0xd4dae2 },
    framework:   { grow: 0.24, vigour: 0.60, light: 0.82, sky: 0xe6ecf2 },
    ramadan:     { grow: 0.34, vigour: 0.62, light: 0.66, sky: 0xe2dcd8 },
    christmas:   { grow: 0.44, vigour: 0.60, light: 0.78, sky: 0xdee8f0 },
    welfare:     { grow: 0.54, vigour: 0.68, light: 0.88, sky: 0xecefec },
    environment: { grow: 0.68, vigour: 0.82, light: 0.94, sky: 0xe4efe6 },
    gap:         { grow: 0.64, vigour: 0.26, light: 0.40, sky: 0xb2b8be },
    idea1:       { grow: 0.74, vigour: 0.62, light: 0.86, sky: 0xf0eade },
    idea2:       { grow: 0.82, vigour: 0.78, light: 0.92, sky: 0xe2f0e8 },
    idea3:       { grow: 0.88, vigour: 0.76, light: 0.90, sky: 0xdee6f2 },
    idea4:       { grow: 0.94, vigour: 0.80, light: 0.96, sky: 0xf2e8dc },
    fullreveal:  { grow: 1.00, vigour: 0.92, light: 1.05, sky: 0xf8f2e4 },
  };

  /* --------------------------------------------------------- module state */

  let T = null, ctx = null, built = false;
  let scene = null;

  let treeGroup, crown, canopy, shadowDecal;
  let groundMesh, skyPlate, glassPane;
  let keySpot, keyTarget;

  let leaf = null;
  let dummy = null, vDir = null, vA = null, vB = null, vD = null;
  let cA = null, cB = null;
  let AXIS_X = null, AXIS_Y = null, AXIS_Z = null;

  const live = {
    grow: 0.16, vigour: 0.50, light: 0.60,
    skyR: 1, skyG: 1, skyB: 1,
  };

  /* ---------------------------------------------------------------- utils */

  function order() {
    return (typeof STAGE_ORDER !== 'undefined' && STAGE_ORDER.length) ? STAGE_ORDER : GROVE_STAGES;
  }

  function clamp01(v) {
    return v < 0 ? 0 : (v > 1 ? 1 : v);
  }

  /* a fixed-seed generator, used only while building. The canopy has to be
     the same canopy on every load or a deep link would land on a different
     tree than the one the presenter rehearsed against. */
  let seed = 0x2f6e2b1;
  function rnd() {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 8) / 16777216;
  }

  /* Leaf slots are filled in bit-reversed order. A Fibonacci sphere walks
     its points from one pole to the other, so taking the first N of them
     would grow the canopy from the bottom up; reversing the index means any
     prefix is spread over the whole crown, which is what makes a low count
     read as a sparse tree rather than half a tree. */
  function bitrev8(i) {
    let r = 0;
    for (let b = 0; b < 8; b++) r = (r << 1) | ((i >> b) & 1);
    return r;
  }

  /* ------------------------------------------------------------- textures */

  /* Bark, drawn as growth rings. The centre of the rings sits far off the
     left edge of the canvas, so the arcs crossing it are near-parallel and
     wrap round the trunk as vertical grain — the rings are literally what is
     drawn, which is the half of the name the trunk is carrying. */
  function barkTexture() {
    const c = ctx.canvas(256), g = c.getContext('2d');
    g.fillStyle = '#6b5a46';
    g.fillRect(0, 0, 256, 256);
    const cx = -520, cy = 128;
    for (let r = 500; r < 810; r += 2.5 + rnd() * 5) {
      g.strokeStyle = 'rgba(38,28,20,' + (0.06 + rnd() * 0.18).toFixed(3) + ')';
      g.lineWidth = 0.7 + rnd() * 2.4;
      g.beginPath();
      g.arc(cx, cy, r, -0.52, 0.52);
      g.stroke();
      if (rnd() < 0.3) {
        g.strokeStyle = 'rgba(176,158,132,' + (0.05 + rnd() * 0.10).toFixed(3) + ')';
        g.lineWidth = 0.6 + rnd() * 1.1;
        g.beginPath();
        g.arc(cx, cy - 2, r + 2, -0.52, 0.52);
        g.stroke();
      }
    }
    for (let i = 0; i < 1400; i++) {
      g.fillStyle = 'rgba(30,22,16,' + (rnd() * 0.08).toFixed(3) + ')';
      g.fillRect(rnd() * 256, rnd() * 256, 1.6, 2.6);
    }
    return ctx.tex(c, { repeat: [3, 2] });
  }

  /* The garden floor. One canvas stretched over the whole plane rather than
     tiled, so the aerial gradient — hazier at the far edge, darker underfoot
     — survives; a repeat would have printed the same haze four times. */
  function groundTexture() {
    const c = ctx.canvas(512), g = c.getContext('2d');
    const lg = g.createLinearGradient(0, 0, 0, 512);
    lg.addColorStop(0, '#c6cec6');
    lg.addColorStop(0.42, '#9dab8d');
    lg.addColorStop(1, '#79876a');
    g.fillStyle = lg;
    g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 760; i++) {
      const y = rnd() * 512, s = 3 + (y / 512) * 16;
      const dark = rnd() < 0.55;
      g.fillStyle = (dark ? 'rgba(58,68,46,' : 'rgba(198,203,178,') + (0.05 + rnd() * 0.14).toFixed(3) + ')';
      g.beginPath();
      g.ellipse(rnd() * 512, y, s, s * 0.55, rnd() * 3, 0, 6.3);
      g.fill();
    }
    /* three bare patches of bed, so the ground is not one flat green */
    for (let i = 0; i < 3; i++) {
      g.fillStyle = 'rgba(104,88,66,0.20)';
      g.beginPath();
      g.ellipse(90 + rnd() * 330, 300 + rnd() * 190, 60 + rnd() * 60, 26 + rnd() * 24, 0, 0, 6.3);
      g.fill();
    }
    return ctx.tex(c);
  }

  /* The daylight plate: cooler and a stop brighter than the room, which is
     the whole reason the window reads as depth rather than as a lamp. It is
     kept pale and hazy rather than white — a hard bright rectangle beside a
     dark beam would win the frame, and the beam has to win the frame.

     The band of distant foliage near the horizon is painted, not built. It
     is the only thing telling the eye the garden has a far side, and it
     costs no geometry to say so. */
  function skyTexture() {
    const c = ctx.canvas(512), g = c.getContext('2d');
    const lg = g.createLinearGradient(0, 0, 0, 512);
    lg.addColorStop(0, '#b6cee2');
    lg.addColorStop(0.40, '#d2dfe7');
    lg.addColorStop(0.68, '#e6ebe6');
    lg.addColorStop(1, '#f2ede0');
    g.fillStyle = lg;
    g.fillRect(0, 0, 512, 512);

    /* two soft banks of cloud, high enough that the window head crops them */
    for (let i = 0; i < 22; i++) {
      g.fillStyle = 'rgba(255,255,255,' + (0.03 + rnd() * 0.05).toFixed(3) + ')';
      g.beginPath();
      g.ellipse(rnd() * 512, 40 + rnd() * 130, 60 + rnd() * 110, 12 + rnd() * 18, 0, 0, 6.3);
      g.fill();
    }
    /* the treeline, sitting just above where the ground plane cuts in */
    for (let i = 0; i < 150; i++) {
      const x = rnd() * 512, s = 10 + rnd() * 26;
      g.fillStyle = 'rgba(118,134,128,' + (0.10 + rnd() * 0.16).toFixed(3) + ')';
      g.beginPath();
      g.ellipse(x, 276 + rnd() * 16, s, s * 0.62, 0, 0, 6.3);
      g.fill();
    }
    const hz = g.createLinearGradient(0, 240, 0, 300);
    hz.addColorStop(0, 'rgba(238,240,234,0)');
    hz.addColorStop(1, 'rgba(238,240,234,0.62)');
    g.fillStyle = hz;
    g.fillRect(0, 240, 512, 60);
    return ctx.tex(c);
  }

  function shadowTexture() {
    const c = ctx.canvas(128), g = c.getContext('2d');
    const rg = g.createRadialGradient(64, 64, 3, 64, 64, 62);
    rg.addColorStop(0, 'rgba(42,44,34,0.72)');
    rg.addColorStop(0.48, 'rgba(42,44,34,0.28)');
    rg.addColorStop(1, 'rgba(42,44,34,0)');
    g.fillStyle = rg;
    g.fillRect(0, 0, 128, 128);
    return new T.CanvasTexture(c);
  }

  /* ------------------------------------------------------------ the hole */

  /* The back wall is world.js's, and it is two meshes: a tiled plane and the
     rendered slab standing behind it. Both are re-cut here rather than
     rebuilt, so the tile texture, the shadow flags and the material all
     survive; only the outline changes. Missing either one costs nothing —
     the tree is simply not seen, and nothing throws. */
  function cutWall() {
    let tile = null, slab = null;
    scene.traverse(function (n) {
      if (!n.isMesh || !n.geometry || !n.geometry.parameters) return;
      const p = n.geometry.parameters, kind = n.geometry.type;
      if (!tile && kind === 'PlaneGeometry' && p.width >= 100 && p.height >= 20 &&
          Math.abs(n.position.z - WALL_Z) < 1.2 && Math.abs(n.rotation.x) < 0.01) tile = n;
      if (!slab && kind === 'BoxGeometry' && p.width >= 150 && p.height >= 50 &&
          n.position.z < WALL_Z) slab = n;
    });

    if (tile) {
      const p = tile.geometry.parameters, w = p.width, h = p.height;
      const outline = new T.Shape();
      outline.moveTo(-w / 2, -h / 2);
      outline.lineTo(w / 2, -h / 2);
      outline.lineTo(w / 2, h / 2);
      outline.lineTo(-w / 2, h / 2);
      outline.closePath();
      outline.holes.push(aperturePath(tile.position.x, tile.position.y));
      const geo = new T.ShapeGeometry(outline, 1);
      /* ShapeGeometry hands back raw xy as uv; the tile texture is a repeat
         wrap and expects the plane's own 0..1, so it is recomputed here */
      const pos = geo.attributes.position, uv = geo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
      }
      uv.needsUpdate = true;
      tile.geometry.dispose();
      tile.geometry = geo;
    }

    if (slab) {
      const p = slab.geometry.parameters, w = p.width, h = p.height, d = p.depth;
      const outline = new T.Shape();
      outline.moveTo(-w / 2, -h / 2);
      outline.lineTo(w / 2, -h / 2);
      outline.lineTo(w / 2, h / 2);
      outline.lineTo(-w / 2, h / 2);
      outline.closePath();
      outline.holes.push(aperturePath(slab.position.x, slab.position.y));
      const geo = new T.ExtrudeGeometry(outline, {
        depth: d, bevelEnabled: false, curveSegments: 1,
      });
      geo.translate(0, 0, -d / 2);
      slab.geometry.dispose();
      slab.geometry = geo;
    }
  }

  /* the opening, expressed in a mesh's own local xy */
  function aperturePath(ox, oy) {
    const h = new T.Path();
    h.moveTo(AP_X0 - ox, AP_Y0 - oy);
    h.lineTo(AP_X1 - ox, AP_Y0 - oy);
    h.lineTo(AP_X1 - ox, AP_Y1 - oy);
    h.lineTo(AP_X0 - ox, AP_Y1 - oy);
    h.closePath();
    return h;
  }

  /* --------------------------------------------------------- the joinery */

  /* A hole is not a window. What makes it read as one is the thickness: a
     lined reveal, a stone sill deep enough to catch light on its top face, a
     casing standing proud of the tiles, and bars crossing the glass. */
  function buildOpening() {
    const w = AP_X1 - AP_X0, h = AP_Y1 - AP_Y0;
    const cx = (AP_X0 + AP_X1) / 2, cy = (AP_Y0 + AP_Y1) / 2;
    const g = new T.Group();

    /* the reveal, limewashed a shade cooler than the tile so the daylight
       read starts before the eye is through the wall */
    g.add(ctx.box(0.12, h + 0.24, REV_DEPTH, REVEAL_LIME, { pos: [AP_X0 + 0.06, cy, REV_MID], rough: 0.86 }));
    g.add(ctx.box(0.12, h + 0.24, REV_DEPTH, REVEAL_LIME, { pos: [AP_X1 - 0.06, cy, REV_MID], rough: 0.86 }));
    g.add(ctx.box(w + 0.24, 0.12, REV_DEPTH, REVEAL_LIME, { pos: [cx, AP_Y1 - 0.06, REV_MID], rough: 0.86 }));

    /* the sill: a stone slab running the full reveal and 0.8 proud into the
       room, its top face flush with the bottom of the opening so the bed
       outside carries straight on from it */
    g.add(ctx.box(w + 0.9, 0.34, 2.70, SILL_STONE, { pos: [cx, AP_Y0 - 0.17, -21.90], rough: 0.66 }));

    /* the casing. The jambs stop on the sill rather than running past it,
       which is both how a window is trimmed and the only way two pale
       materials here avoid interpenetrating. */
    const jy = (AP_Y0 + AP_Y1 + 0.34) / 2, jh = h + 0.34;
    g.add(ctx.box(0.34, jh, 0.22, CASING_OAK, { pos: [AP_X0 - 0.17, jy, WALL_Z + 0.11], rough: 0.74 }));
    g.add(ctx.box(0.34, jh, 0.22, CASING_OAK, { pos: [AP_X1 + 0.17, jy, WALL_Z + 0.11], rough: 0.74 }));
    g.add(ctx.box(w + 0.68, 0.34, 0.22, CASING_OAK, { pos: [cx, AP_Y1 + 0.17, WALL_Z + 0.11], rough: 0.74 }));

    /* One mullion and one transom, and where they fall is deliberate. The
       mullion stands right of everything the tree ever projects to, so no
       bar runs down the trunk; the transom crosses the crown, which breaks
       the canopy silhouette and stops it reading as a second round mass
       beside the pans. */
    g.add(ctx.box(0.22, h, 0.34, FRAME_PAINT, { pos: [MULLION_X, cy, REV_FRONT - 0.22], rough: 0.7 }));
    g.add(ctx.box(w, 0.20, 0.34, FRAME_PAINT, { pos: [cx, TRANSOM_Y, REV_FRONT - 0.22], rough: 0.7 }));

    /* the glass. Barely there — enough for the pane to catch the room, not
       enough to grey out what is behind it. */
    glassPane = new T.Mesh(
      new T.PlaneGeometry(w, h),
      new T.MeshBasicMaterial({
        color: 0xcfe2ee, transparent: true, opacity: 0.06,
        depthWrite: false, side: T.DoubleSide, fog: false,
      })
    );
    glassPane.position.set(cx, cy, REV_FRONT - 0.30);
    g.add(glassPane);

    scene.add(g);
  }

  /* ------------------------------------------------------------- outdoors */

  function buildOutside() {
    /* The ground and the sky plate are unlit on purpose. Every light in this
       room is warm and stage-driven, and a daylight plate that took the
       room's colour would stop being daylight; painting them flat is the one
       reliable way to keep outside cooler than inside on all twelve slides.
       Both are fully hidden by the wall except through the opening. */
    groundMesh = new T.Mesh(
      new T.PlaneGeometry(96, 48),
      new T.MeshBasicMaterial({ map: groundTexture(), fog: false })
    );
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.set(20, GRADE, -47.1);
    scene.add(groundMesh);

    skyPlate = new T.Mesh(
      new T.PlaneGeometry(64, 40),
      new T.MeshBasicMaterial({ map: skyTexture(), fog: false })
    );
    skyPlate.position.set(22, 4, SKY_Z);
    scene.add(skyPlate);

    /* The tree does take light, or it would have no form. Decay is 1 rather
       than 2 so a lamp thirty units from its subject needs a sane number;
       the cone is tight enough that it lights the crown and the trunk and
       nothing else in the room. */
    keyTarget = new T.Object3D();
    keyTarget.position.set(TREE[0], TREE[1] + 3.4, TREE[2]);
    keySpot = new T.SpotLight(0xd8e6f0, 0, 40, 0.42, 0.7, 1);
    keySpot.castShadow = false;
    keySpot.position.set(34, 22, -30);
    keySpot.target = keyTarget;
    scene.add(keySpot, keyTarget);
  }

  /* ---------------------------------------------------------------- tree */

  /* one blade, five vertices and four triangles, creased down the spine so
     it does not vanish edge on. At this distance a leaf is six pixels and a
     clump of foliage rather than a leaf, which is what the width is for. */
  function leafGeometry() {
    const pos = new Float32Array([
      0.00, 0.00, 0.00,
      -0.30, 0.40, -0.05,
      0.00, 0.46, 0.07,
      0.30, 0.40, -0.05,
      0.00, 1.00, 0.00,
    ]);
    const col = new Float32Array([
      0.62, 0.62, 0.62,
      0.86, 0.86, 0.86,
      1.00, 1.00, 1.00,
      0.86, 0.86, 0.86,
      1.00, 1.00, 0.96,
    ]);
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(pos, 3));
    g.setAttribute('color', new T.BufferAttribute(col, 3));
    g.setIndex([0, 3, 2, 0, 2, 1, 2, 3, 4, 1, 2, 4]);
    g.computeVertexNormals();
    return g;
  }

  /* a tapered limb, aimed between two points the way world.js aims a chain */
  function limb(mat, ax, ay, az, bx, by, bz, r0, r1) {
    vA.set(ax, ay, az);
    vB.set(bx, by, bz);
    vD.subVectors(vB, vA);
    const len = vD.length() || 0.0001;
    const m = new T.Mesh(new T.CylinderGeometry(r1, r0, len, 6), mat);
    m.position.addVectors(vA, vB).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(AXIS_Y, vD.divideScalar(len));
    return m;
  }

  function buildTree() {
    const bark = ctx.mat(BARK, { rough: 0.92, map: barkTexture() });
    const barkPlain = ctx.mat(BARK_DARK, { rough: 0.94 });

    treeGroup = new T.Group();
    treeGroup.position.set(TREE[0], TREE[1], TREE[2]);
    scene.add(treeGroup);

    /* the trunk, closed at both ends so the buried foot never shows a hole */
    treeGroup.add(ctx.lathe([
      [0.00, -0.40], [1.05, -0.30], [0.95, 0.10], [0.76, 0.60], [0.63, 1.40],
      [0.55, 2.30], [0.49, 3.10], [0.42, 3.70], [0.26, 4.05], [0.00, 4.12],
    ], 16, BARK, { material: bark }));

    /* five buttresses, each a fin extruded flat and then spun about the
       trunk. They are 0.3 of the visible height of the tree and they are the
       only thing that stops the trunk reading as a post pushed into a lawn. */
    const fin = new T.Shape();
    fin.moveTo(0.00, 1.55);
    fin.lineTo(0.62, 0.92);
    fin.lineTo(1.55, 0.38);
    fin.lineTo(2.55, 0.04);
    fin.lineTo(2.55, -0.34);
    fin.lineTo(0.00, -0.34);
    fin.closePath();
    const finGeo = new T.ExtrudeGeometry(fin, { depth: 0.32, bevelEnabled: false, curveSegments: 1 });
    finGeo.translate(0, 0, -0.16);
    for (let i = 0; i < 5; i++) {
      const m = new T.Mesh(finGeo, barkPlain);
      m.rotation.y = i * 1.2566 + 0.35;
      m.scale.set(0.82 + (i % 3) * 0.16, 0.86 + (i % 2) * 0.22, 1);
      treeGroup.add(m);
    }

    /* Everything above the fork lives in one group so the sway is a single
       rotation on a single node: a trunk that bends is a rubber tree. */
    crown = new T.Group();
    crown.position.set(0, CROWN_Y, 0);
    treeGroup.add(crown);

    /* two levels, four boughs forking into eight. Any more and the branches
       start reading through the canopy at full leaf. */
    for (let i = 0; i < 4; i++) {
      const a = i * 1.5708 + 0.42;
      const tx = Math.cos(a) * 1.55, tz = Math.sin(a) * 1.55;
      crown.add(limb(barkPlain, Math.cos(a) * 0.18, 0.35, Math.sin(a) * 0.18, tx, 1.65, tz, 0.30, 0.17));
      for (let k = -1; k <= 1; k += 2) {
        const b = a + k * 0.52;
        crown.add(limb(barkPlain, tx, 1.65, tz, Math.cos(b) * 2.60, 2.35, Math.sin(b) * 2.60, 0.16, 0.08));
      }
    }

    /* one InstancedMesh, built once at full count. Growth moves count, scale
       and colour; it never swaps a mesh, because a canopy that is replaced
       between stages cannot survive being jumped into from a grid. */
    const leafMat = ctx.mat(LEAF_FULL, { rough: 0.80, side: T.DoubleSide });
    leafMat.vertexColors = true;
    canopy = new T.InstancedMesh(leafGeometry(), leafMat, MAX_LEAVES);
    canopy.frustumCulled = false;
    crown.add(canopy);

    leaf = new Float32Array(MAX_LEAVES * LEAF_STRIDE);
    for (let i = 0; i < MAX_LEAVES; i++) {
      const j = bitrev8(i);
      const yv = 1 - ((j + 0.5) / MAX_LEAVES) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - yv * yv));
      const th = j * 2.399963;
      /* the underside is squashed, so no leaf hangs below the fork it grew
         from and the crown keeps a flat-bottomed, wind-shaped silhouette */
      const dy = yv < 0 ? yv * 0.55 : yv;
      const shell = 0.66 + rnd() * 0.34;
      const o = i * LEAF_STRIDE;
      leaf[o] = Math.cos(th) * ring * CANOPY_R[0] * shell + (rnd() - 0.5) * 0.34;
      leaf[o + 1] = dy * CANOPY_R[1] * shell + (rnd() - 0.5) * 0.26;
      leaf[o + 2] = Math.sin(th) * ring * CANOPY_R[2] * shell + (rnd() - 0.5) * 0.34;
      vDir.set(Math.cos(th) * ring, dy + 0.55, Math.sin(th) * ring).normalize();
      leaf[o + 3] = vDir.x;
      leaf[o + 4] = vDir.y;
      leaf[o + 5] = vDir.z;
      leaf[o + 6] = rnd() * 6.283;
      leaf[o + 7] = 0.82 + rnd() * 0.46;
      leaf[o + 8] = rnd() * 6.283;
      /* per-leaf tone, set once. The stage tint is a material colour on top
         of this, so one scalar still moves the whole canopy. */
      const v = 0.80 + rnd() * 0.32;
      cA.setRGB(v * (0.94 + rnd() * 0.12), v, v * (0.88 + rnd() * 0.10));
      canopy.setColorAt(i, cA);
    }
    if (canopy.instanceColor) canopy.instanceColor.needsUpdate = true;

    /* the tree is not in the sun's shadow map — the ceiling plane covers the
       garden and would have put the whole thing in shade — so its footing is
       a decal, laid a hair above the grade */
    shadowDecal = new T.Mesh(
      new T.PlaneGeometry(1, 1),
      new T.MeshBasicMaterial({
        map: shadowTexture(), transparent: true, opacity: 0.3,
        depthWrite: false, fog: false,
      })
    );
    shadowDecal.rotation.x = -Math.PI / 2;
    shadowDecal.position.set(0.5, 0.03, 0.7);
    treeGroup.add(shadowDecal);
  }

  /* --------------------------------------------------------------- writing */

  function applyLive() {
    if (!built) return;
    const g = clamp01(live.grow);

    canopy.count = Math.max(6, Math.round(MAX_LEAVES * Math.pow(g, 1.3)));
    cA.setHex(LEAF_DULL);
    cB.setHex(LEAF_FULL);
    canopy.material.color.copy(cA).lerp(cB, clamp01(live.vigour));

    keySpot.intensity = KEY_BASE * live.light;

    skyPlate.material.color.setRGB(live.skyR, live.skyG, live.skyB);
    /* the bed takes the same tint pulled down and toward green, so sky and
       ground can never drift apart across a tween */
    groundMesh.material.color.setRGB(live.skyR * 0.86, live.skyG * 0.93, live.skyB * 0.80);
    glassPane.material.opacity = 0.03 + 0.045 * clamp01(live.light);

    const s = 4.6 * (0.74 + 0.26 * g);
    shadowDecal.scale.set(s, s, 1);
    shadowDecal.material.opacity = (0.13 + 0.22 * g) * clamp01(live.light + 0.25);
  }

  /* Every leaf matrix is rewritten here rather than in apply(), so the pose
     is only ever a function of live.grow and the absolute clock — a tween, a
     pause and a jump all land on the same canopy. */
  function writeCanopy(t, calm) {
    if (!built) return;
    const g = clamp01(live.grow);
    const rf = 0.86 + 0.14 * g;
    const sf = 0.42 + 0.58 * g;
    const sh = calm ? 0 : 1;

    crown.rotation.z = sh * (Math.sin(t * 0.29) * 0.016 + Math.sin(t * 0.61 + 1.3) * 0.008);
    crown.rotation.x = sh * Math.cos(t * 0.23) * 0.012;

    for (let i = 0; i < MAX_LEAVES; i++) {
      const o = i * LEAF_STRIDE, ph = leaf[o + 8];
      dummy.position.set(
        CANOPY_C[0] + leaf[o] * rf,
        CANOPY_C[1] + leaf[o + 1] * rf,
        CANOPY_C[2] + leaf[o + 2] * rf
      );
      vDir.set(leaf[o + 3], leaf[o + 4], leaf[o + 5]);
      dummy.quaternion.setFromUnitVectors(AXIS_Y, vDir);
      dummy.rotateOnAxis(AXIS_Y, leaf[o + 6]);
      dummy.rotateOnAxis(AXIS_X, sh * Math.sin(t * 1.35 + ph) * 0.20);
      dummy.rotateOnAxis(AXIS_Z, sh * Math.cos(t * 0.95 + ph) * 0.14);
      dummy.scale.setScalar(leaf[o + 7] * sf);
      dummy.updateMatrix();
      canopy.setMatrixAt(i, dummy.matrix);
    }
    canopy.instanceMatrix.needsUpdate = true;
  }

  /* ------------------------------------------------------------------ api */

  function build(c) {
    if (built || !c || !c.THREE || !c.scene) return;
    ctx = c;
    T = c.THREE;
    scene = c.scene;

    dummy = new T.Object3D();
    vDir = new T.Vector3();
    vA = new T.Vector3();
    vB = new T.Vector3();
    vD = new T.Vector3();
    cA = new T.Color();
    cB = new T.Color();
    AXIS_X = new T.Vector3(1, 0, 0);
    AXIS_Y = new T.Vector3(0, 1, 0);
    AXIS_Z = new T.Vector3(0, 0, 1);

    cutWall();
    buildOpening();
    buildOutside();
    buildTree();

    built = true;
    apply('open', true);
    writeCanopy(0, true);
  }

  /* a pure lookup, the same shape enrich.js uses: nothing here reads what
     stage came before, so a deep link into idea3 lands on the right tree on
     the first frame */
  function apply(stage, instant) {
    if (!built) return;
    const idx = order().indexOf(stage);
    const name = order()[idx < 0 ? 0 : idx] || 'open';
    const s = GROVE[name] || GROVE.open;

    const target = { grow: s.grow, vigour: s.vigour, light: s.light };
    cA.setHex(s.sky);
    target.skyR = cA.r;
    target.skyG = cA.g;
    target.skyB = cA.b;

    if (instant || !window.gsap) {
      Object.keys(target).forEach(function (k) { live[k] = target[k]; });
      applyLive();
      return;
    }

    window.gsap.killTweensOf(live);
    /* slower than the room's 1.6: a tree filling out faster than the mood
       changes would read as an effect rather than a season */
    target.duration = 2.1;
    target.ease = 'power2.inOut';
    target.onUpdate = applyLive;
    window.gsap.to(live, target);
  }

  function frame(t, dt, state) {
    if (!built) return;
    writeCanopy(t, !!(state && state.calm));
  }

  window.Grove = { build: build, apply: apply, frame: frame };
})();

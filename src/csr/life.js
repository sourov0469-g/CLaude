/* ==========================================================================
   THE KITCHEN AT WORK
   Small, continuous labour in the room the balance stands in: a peel working
   the oven mouth, smoke off the chimney, two staff behind the counter, a
   ticket rail and a stack of boxes that grows as the deck runs.

   Everything here is background. The beam's computed tilt is the argument,
   so this file obeys three rules without exception. Nothing stands between a
   camera and the scale — the bench worker sits at x 12, clear right of the
   pans on every vantage, and the second is pushed out to x -23 where he
   clears the cost pan by a comfortable margin. Nothing is louder than the
   tokens: one muted red apron, and no second saturated colour anywhere. And
   every motion is read straight off the absolute clock, never accumulated,
   so a deep link into idea3 lands mid-loop rather than at the start of one.

   Two things this file deliberately does not do. There is no third figure at
   the pass: the window the grove cuts into the back wall runs from x 10.4
   and the tree stands behind x 15.4, and a body there would be a hard dark
   silhouette across the one thing that window exists to show. So the worker
   and the boxes are held left of x 14, where they cover the jamb and the near
   glass and leave the tree its own light, and the rail hangs above the
   window's head where it crosses tile rather than sky.

   And there is no customer. Everything in front of the counter is either
   inside its footprint or close enough to the camera to fill two-thirds of
   the frame, so the order is told by the props instead: a pad on the counter,
   slips on the rail, and a stack of boxes that grows as the deck runs.
   ========================================================================== */

(function () {
  /* palette additions — kept low in chroma, so the only red that carries is
     the apron, and even that is sunk two steps below BRAND */
  const TROUSER = 0x494f58;
  const SHIRT = 0xd6cbb6;
  const APRON_RED = 0x9d3325;
  const SKIN = 0xa8825e;
  const CAP_SLATE = 0x6f747e;
  const PEEL_WOOD = 0x8e7355;
  const PEEL_GRIP = 0x4a4038;
  const RAIL_STEEL = 0x9aa0a4;
  const SLIP_CREAM = 0xe4dbc6;
  const BOX_CREAM = 0xe6ddca;

  /* ------------------------------------------------------------- the oven */

  /* world.js stands the oven at x -30, z -6, turned 0.34 toward the room, so
     the mouth and the chimney are derived from that turn rather than typed
     in twice: move the oven and the peel still lines up with the arch. */
  const OVEN_X = -30, OVEN_Z = -6, OVEN_RY = 0.34;
  const AX = Math.sin(OVEN_RY), AZ = Math.cos(OVEN_RY);
  const MOUTH_X = OVEN_X + 8.6 * AX;
  const MOUTH_Z = OVEN_Z + 8.6 * AZ;
  const MOUTH_Y = 1.70;                 /* the height a loaded peel rides at */
  const CHIM_X = OVEN_X + 0.4 * AZ - 0.6 * AX;
  const CHIM_Z = OVEN_Z - 0.4 * AX - 0.6 * AZ;
  const CHIM_Y = 13.6;

  /* One full bake, in one loop: dough in, peel back out empty, a long dwell
     while it cooks, then in again and out with the finished pizza. Twenty-
     seven seconds is slow enough that a viewer registers it without ever
     being pulled left toward it. */
  const PEEL_PERIOD = 27;
  const PEEL_OUT = 3.4, PEEL_IN = -5.2;
  const PEEL_REST = 0.45;               /* the phase a stilled deck parks on */
  const SMOKE_N = 12;

  /* ------------------------------------------------------------- the staff */

  /* The counter top is a slab at y 0 and the floor is 11.4 below it, so a
     figure standing behind the counter is cut off at the waist by the slab
     itself from every vantage in the deck. That is the whole reason these two
     stand where they do: only head, shoulders and the top of an apron ever
     read, which is a fifth of frame height against the scale's third. Depth
     is not free either — z -19.3 is the one lane wide enough to clear the
     counter's back edge in front and the window's stone sill behind. */
  const FLOOR = -11.4;
  const STAFF_Z = -19.3;
  const STAFF = [
    /* the bench: nearest thing this deck has to a foreground worker, kneading */
    { x: 12.1, ry: 0.12, bob: [1.45, 0.34], turn: [0.37, 0.10], lean: [1.45, 0.055] },
    /* the oven: far left, read through the type, so he is a silhouette that
       turns toward the fire and back and nothing more */
    { x: -23.0, ry: -0.48, bob: [0.70, 0.12], turn: [0.23, 0.30], lean: [0.70, 0.022] },
  ];

  /* ----------------------------------------------------------- the service */

  /* the rail hangs off the shelf above the window's head, so the slips flutter
     against tile rather than against the sky */
  const RAIL_X = 13.7, RAIL_Y = 10.75, RAIL_Z = -16.2;
  const TICKETS = 7;
  const TICKET_X0 = 11.9, TICKET_DX = 0.62;

  /* the free pocket of counter behind the cup and in front of the back edge.
     Everything else on this side of the room is already spoken for. */
  const BOX_MAX = 6;
  const BOX_X = 11.6, BOX_Z = -15.8, BOX_Y0 = 0.36, BOX_STEP = 0.74;
  /* hand-stacked, not machine-stacked: a little offset and yaw per box */
  const BOX_JITTER = [
    [0.00, 0.00, 0.05], [-0.16, 0.12, -0.07], [0.10, -0.14, 0.03],
    [-0.08, 0.06, -0.04], [0.14, 0.10, 0.08], [-0.05, -0.09, -0.02],
  ];

  /* --------------------------------------------------------- the per-stage */

  /* One scalar for how hard the kitchen is working, one for how many boxes
     have gone out. Both are pure lookups on the stage name: the kitchen does
     the same job all deck, swells a little into the reveal, and all but stops
     at gap, where the room is meant to feel like it is holding its breath. */
  const ACTIVITY = {
    open: 0.55, framework: 0.62, ramadan: 0.70, christmas: 0.74,
    welfare: 0.70, environment: 0.70, gap: 0.22, idea1: 0.80,
    idea2: 0.80, idea3: 0.82, idea4: 0.86, fullreveal: 1.00,
  };
  const BOXES = {
    open: 1, framework: 2, ramadan: 2, christmas: 3,
    welfare: 3, environment: 3, gap: 3, idea1: 4,
    idea2: 4, idea3: 5, idea4: 5, fullreveal: 6,
  };

  /* --------------------------------------------------------- module state */

  let T = null, ctx = null, built = false;
  let scene = null, camera = null;

  let staffFigures, peelGroup, peelPizza, smokePuffs;
  let ticketStation, ticketSlips, boxStack;

  let dummy = null, scratchColor = null;

  const live = { busy: 0.55, stack: 1 };

  /* ---------------------------------------------------------------- utils */

  function clamp01(v) {
    return v < 0 ? 0 : (v > 1 ? 1 : v);
  }

  function smooth(v) {
    const k = clamp01(v);
    return k * k * (3 - 2 * k);
  }

  function lerp(a, b, k) {
    return a + (b - a) * k;
  }

  /* three's merge utility is an addon and only the core build is vendored, so
     the walk is done here: each part is baked into the group's space once and
     its colour rides along as a vertex colour. A whole figure, or the whole
     ticket station, is then one geometry and one draw call. */
  function bake(parts) {
    let total = 0, i, v;
    const flat = [];
    for (i = 0; i < parts.length; i++) {
      const p = parts[i];
      const g = p.geo.index ? p.geo.toNonIndexed() : p.geo.clone();
      const q = p.pos || [0, 0, 0], r = p.rot || [0, 0, 0];
      dummy.position.set(q[0], q[1], q[2]);
      dummy.rotation.set(r[0], r[1], r[2]);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      g.applyMatrix4(dummy.matrix);
      flat.push(g);
      total += g.attributes.position.count;
    }
    const pos = new Float32Array(total * 3);
    const nor = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    let o = 0;
    for (i = 0; i < parts.length; i++) {
      const n = flat[i].attributes.position.count;
      pos.set(flat[i].attributes.position.array, o * 3);
      nor.set(flat[i].attributes.normal.array, o * 3);
      scratchColor.setHex(parts[i].color);
      for (v = 0; v < n; v++) {
        const w = (o + v) * 3;
        col[w] = scratchColor.r; col[w + 1] = scratchColor.g; col[w + 2] = scratchColor.b;
      }
      o += n;
    }
    const out = new T.BufferGeometry();
    out.setAttribute('position', new T.BufferAttribute(pos, 3));
    out.setAttribute('normal', new T.BufferAttribute(nor, 3));
    out.setAttribute('color', new T.BufferAttribute(col, 3));
    return out;
  }

  function vertexMat() {
    const m = ctx.mat(0xffffff, { rough: 0.78 });
    m.vertexColors = true;
    return m;
  }

  /* ------------------------------------------------------------- textures */

  /* Small enough on screen to be a coin, so it is drawn as one: a rim, a
     field of sauce kept off the brand red, and four blots of cheese. */
  function pizzaTexture() {
    const c = ctx.canvas(128), g = c.getContext('2d');
    g.clearRect(0, 0, 128, 128);
    g.fillStyle = '#c9a468';
    g.beginPath(); g.arc(64, 64, 64, 0, 7); g.fill();
    g.fillStyle = '#a8542c';
    g.beginPath(); g.arc(64, 64, 52, 0, 7); g.fill();
    g.fillStyle = 'rgba(240,207,133,0.85)';
    [[52, 50, 13], [78, 58, 11], [58, 84, 12], [82, 84, 9]].forEach(function (b) {
      g.beginPath(); g.arc(b[0], b[1], b[2], 0, 7); g.fill();
    });
    return ctx.tex(c);
  }

  function puffTexture() {
    const c = ctx.canvas(64), g = c.getContext('2d');
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, 'rgba(255,246,232,0.85)');
    rg.addColorStop(0.45, 'rgba(226,214,198,0.30)');
    rg.addColorStop(1, 'rgba(200,190,176,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(c);
  }

  /* --------------------------------------------------------------- builds */

  /* One body, instanced per station. They wear the same uniform because they
     work in the same kitchen, and the variety that matters at this distance
     is where they stand and how they move, not what they are made of. */
  function figureParts() {
    return [
      { geo: new T.BoxGeometry(3.2, 8.6, 2.1), color: TROUSER, pos: [0, 4.3, 0] },
      { geo: new T.BoxGeometry(4.2, 6.6, 2.5), color: SHIRT, pos: [0, 11.9, 0] },
      { geo: new T.BoxGeometry(3.5, 6.2, 0.3), color: APRON_RED, pos: [0, 11.0, 1.34] },
      { geo: new T.BoxGeometry(0.9, 4.4, 1.0), color: SHIRT, pos: [-2.05, 12.3, 0.55], rot: [-0.35, 0, 0] },
      { geo: new T.BoxGeometry(0.9, 4.4, 1.0), color: SHIRT, pos: [2.05, 12.3, 0.55], rot: [-0.35, 0, 0] },
      { geo: new T.CylinderGeometry(0.42, 0.42, 0.9, 8), color: SKIN, pos: [0, 15.6, 0] },
      { geo: new T.SphereGeometry(1.28, 10, 8), color: SKIN, pos: [0, 16.9, 0] },
      { geo: new T.CylinderGeometry(1.36, 1.44, 0.5, 12), color: CAP_SLATE, pos: [0, 17.86, 0] },
      { geo: new T.BoxGeometry(1.6, 0.16, 0.95), color: CAP_SLATE, pos: [0, 17.66, 1.15] },
    ];
  }

  function buildStaff() {
    staffFigures = new T.InstancedMesh(bake(figureParts()), vertexMat(), STAFF.length);
    staffFigures.castShadow = false;
    staffFigures.frustumCulled = false;
    scene.add(staffFigures);
  }

  /* The peel runs along the oven's own axis, which puts its handle out past
     the left edge of frame on every close vantage and behind the text column
     on the two wide ones — so the hand that works it is never asked for. */
  function buildOvenWork() {
    peelGroup = new T.Group();
    peelGroup.position.set(MOUTH_X, MOUTH_Y, MOUTH_Z);
    peelGroup.rotation.set(-0.045, OVEN_RY, 0);
    scene.add(peelGroup);

    peelGroup.add(new T.Mesh(bake([
      { geo: new T.BoxGeometry(3.6, 0.16, 3.4), color: PEEL_WOOD, pos: [0, 0, 0] },
      { geo: new T.BoxGeometry(1.1, 0.14, 1.7), color: PEEL_WOOD, pos: [0, 0.02, 2.5] },
      { geo: new T.CylinderGeometry(0.20, 0.22, 10.4, 8), color: PEEL_WOOD, pos: [0, 0.12, 8.2], rot: [Math.PI / 2, 0, 0] },
      { geo: new T.CylinderGeometry(0.30, 0.28, 1.2, 8), color: PEEL_GRIP, pos: [0, 0.12, 13.9], rot: [Math.PI / 2, 0, 0] },
    ]), vertexMat()));

    peelPizza = new T.Mesh(
      new T.CircleGeometry(1.45, 20),
      ctx.mat(0xffffff, { rough: 0.84, map: pizzaTexture() })
    );
    peelPizza.rotation.x = -Math.PI / 2;
    peelPizza.position.set(0, 0.13, 0.1);
    peelGroup.add(peelPizza);

    /* Additive, so the fade is carried by the instance colour and a spent
       puff costs nothing rather than sitting there as a grey patch. Lit this
       way it reads as smoke catching the fire under it, which is the only
       way it would be visible against a dark ceiling at all. */
    smokePuffs = new T.InstancedMesh(
      new T.PlaneGeometry(1, 1),
      new T.MeshBasicMaterial({
        map: puffTexture(), transparent: true, opacity: 0.5,
        depthWrite: false, blending: T.AdditiveBlending, fog: false,
      }),
      SMOKE_N
    );
    smokePuffs.frustumCulled = false;
    scratchColor.setRGB(0, 0, 0);
    for (let i = 0; i < SMOKE_N; i++) smokePuffs.setColorAt(i, scratchColor);
    scene.add(smokePuffs);
  }

  /* rail, its two droppers off the shelf, the pad and a pencil: one static
     mesh, because none of it ever moves and all of it is small */
  function buildService() {
    ticketStation = new T.Mesh(bake([
      { geo: new T.CylinderGeometry(0.09, 0.09, 4.6, 8), color: RAIL_STEEL, pos: [RAIL_X, RAIL_Y, RAIL_Z], rot: [0, 0, Math.PI / 2] },
      { geo: new T.CylinderGeometry(0.06, 0.06, 0.9, 6), color: RAIL_STEEL, pos: [RAIL_X - 2.0, RAIL_Y + 0.45, RAIL_Z] },
      { geo: new T.CylinderGeometry(0.06, 0.06, 0.9, 6), color: RAIL_STEEL, pos: [RAIL_X + 2.0, RAIL_Y + 0.45, RAIL_Z] },
      /* the pad, out on the open counter where nothing else stands */
      { geo: new T.BoxGeometry(1.9, 0.14, 2.5), color: SLIP_CREAM, pos: [12.6, 0.07, -6.5], rot: [0, 0.18, 0] },
      { geo: new T.CylinderGeometry(0.07, 0.07, 1.5, 6), color: PEEL_GRIP, pos: [12.9, 0.2, -8.0], rot: [0, 0.4, Math.PI / 2] },
    ]), vertexMat());
    ticketStation.castShadow = false;
    scene.add(ticketStation);

    /* anchored at the top edge so the flutter reads as a hinge on the rail */
    const slip = new T.PlaneGeometry(0.8, 1.5);
    slip.translate(0, -0.75, 0);
    ticketSlips = new T.InstancedMesh(
      slip, ctx.mat(SLIP_CREAM, { rough: 0.9, side: T.DoubleSide }), TICKETS
    );
    ticketSlips.castShadow = false;
    ticketSlips.frustumCulled = false;
    scene.add(ticketSlips);

    boxStack = new T.InstancedMesh(
      new T.BoxGeometry(4.2, 0.72, 4.2), ctx.mat(BOX_CREAM, { rough: 0.9 }), BOX_MAX
    );
    boxStack.castShadow = false;
    scene.add(boxStack);
  }

  /* -------------------------------------------------------------- placing */

  function placeStaff(amp, t) {
    for (let i = 0; i < STAFF.length; i++) {
      const f = STAFF[i], ph = i * 1.7;
      dummy.position.set(
        f.x,
        FLOOR + Math.sin(t * f.bob[0] + ph) * f.bob[1] * amp,
        STAFF_Z
      );
      dummy.rotation.set(
        Math.sin(t * f.lean[0] + ph + 0.5) * f.lean[1] * amp,
        f.ry + Math.sin(t * f.turn[0] + ph) * f.turn[1] * amp,
        0
      );
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      staffFigures.setMatrixAt(i, dummy.matrix);
    }
    staffFigures.instanceMatrix.needsUpdate = true;
  }

  /* how far the paddle sits past the mouth plane at this point in the bake.
     Negative is inside the oven. */
  function peelSlide(p) {
    if (p < 0.10) return PEEL_OUT;
    if (p < 0.22) return lerp(PEEL_OUT, PEEL_IN, smooth((p - 0.10) / 0.12));
    if (p < 0.32) return lerp(PEEL_IN, PEEL_OUT, smooth((p - 0.22) / 0.10));
    if (p < 0.62) return PEEL_OUT;
    if (p < 0.72) return lerp(PEEL_OUT, PEEL_IN, smooth((p - 0.62) / 0.10));
    if (p < 0.84) return lerp(PEEL_IN, PEEL_OUT, smooth((p - 0.72) / 0.12));
    return PEEL_OUT;
  }

  function placePeel(amp, t) {
    /* a stilled deck parks the peel in the dwell, empty and outside; a quiet
       stage keeps the loop running but shortens its travel, which is cheaper
       to read than a slowed clock and stays a pure function of t */
    const p = amp <= 0 ? PEEL_REST : (t / PEEL_PERIOD) % 1;
    const s = PEEL_OUT + (peelSlide(p) - PEEL_OUT) * (amp <= 0 ? 1 : amp);
    peelGroup.position.set(MOUTH_X + AX * s, MOUTH_Y, MOUTH_Z + AZ * s);

    /* dough rides in and is left there; the peel comes back for it later and
       carries the baked one out to the bench */
    const raw = p < 0.24, done = p >= 0.72 && p < 0.96;
    peelPizza.visible = amp > 0 && (raw || done);
    if (peelPizza.visible) {
      if (raw) peelPizza.material.color.setRGB(0.80, 0.76, 0.66);
      else peelPizza.material.color.setRGB(1, 0.96, 0.90);
    }
  }

  function placeSmoke(amp, t) {
    for (let i = 0; i < SMOKE_N; i++) {
      let p = (t * 0.052 + i / SMOKE_N) % 1;
      if (p < 0) p += 1;
      const rise = p * 11.5;
      dummy.position.set(
        CHIM_X + Math.sin(p * 2.6 + i * 1.9) * 0.8 + rise * 0.16,
        CHIM_Y + rise,
        CHIM_Z + Math.cos(p * 2.1 + i * 1.3) * 0.6 - rise * 0.05
      );
      if (camera) dummy.quaternion.copy(camera.quaternion);
      dummy.scale.setScalar(1.5 + p * 5.2);
      dummy.updateMatrix();
      smokePuffs.setMatrixAt(i, dummy.matrix);

      /* squared, so a puff arrives soft rather than switching on at the cap */
      const env = Math.sin(p * Math.PI);
      const k = env * env * 0.5 * amp;
      scratchColor.setRGB(k * 0.46, k * 0.40, k * 0.34);
      smokePuffs.setColorAt(i, scratchColor);
    }
    smokePuffs.instanceMatrix.needsUpdate = true;
    if (smokePuffs.instanceColor) smokePuffs.instanceColor.needsUpdate = true;
  }

  function placeTickets(amp, t) {
    for (let i = 0; i < TICKETS; i++) {
      const ph = i * 0.83;
      dummy.position.set(TICKET_X0 + i * TICKET_DX, RAIL_Y - 0.05, RAIL_Z);
      dummy.rotation.set(
        0.06 + Math.sin(t * 1.15 + ph) * 0.14 * amp,
        (i % 2 ? 0.06 : -0.05) + Math.sin(t * 0.63 + ph * 1.7) * 0.20 * amp,
        Math.sin(t * 0.90 + ph) * 0.05 * amp
      );
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      ticketSlips.setMatrixAt(i, dummy.matrix);
    }
    ticketSlips.instanceMatrix.needsUpdate = true;
  }

  /* --------------------------------------------------------------- writing */

  function applyLive() {
    if (!built) return;
    for (let i = 0; i < BOX_MAX; i++) {
      const g = clamp01(live.stack - i), j = BOX_JITTER[i];
      dummy.position.set(
        BOX_X + j[0], BOX_Y0 + i * BOX_STEP + (1 - g) * 0.6, BOX_Z + j[1]
      );
      dummy.rotation.set(0, j[2], 0);
      dummy.scale.setScalar(Math.max(0.0001, g));
      dummy.updateMatrix();
      boxStack.setMatrixAt(i, dummy.matrix);
    }
    boxStack.instanceMatrix.needsUpdate = true;
  }

  /* ------------------------------------------------------------------ api */

  function build(c) {
    if (built || !c || !c.THREE || !c.scene) return;
    ctx = c;
    T = c.THREE;
    scene = c.scene;
    camera = c.camera;

    dummy = new T.Object3D();
    scratchColor = new T.Color();

    buildStaff();
    buildOvenWork();
    buildService();

    built = true;
    apply('open', true);
    frame(0, 0, null);
  }

  function apply(stage, instant) {
    if (!built) return;
    const target = {
      busy: ACTIVITY[stage] === undefined ? ACTIVITY.open : ACTIVITY[stage],
      stack: BOXES[stage] === undefined ? BOXES.open : BOXES[stage],
    };

    if (instant || !window.gsap) {
      live.busy = target.busy;
      live.stack = target.stack;
      applyLive();
      return;
    }

    window.gsap.killTweensOf(live);
    target.duration = 1.4;
    target.ease = 'power2.inOut';
    target.onUpdate = applyLive;
    window.gsap.to(live, target);
  }

  function frame(t, dt, state) {
    if (!built) return;
    /* one amplitude for the whole kitchen: zero on a stilled deck, a quarter
       at gap, full into the reveal. Nothing else reads the stage. */
    const amp = (state && state.calm) ? 0 : live.busy;
    placeStaff(amp, t);
    placePeel(amp, t);
    placeSmoke(amp, t);
    placeTickets(amp, t);
  }

  window.Life = { build: build, apply: apply, frame: frame };
})();

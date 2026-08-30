/* ==========================================================================
   THE IMMERSIVE PASS
   Mood, atmosphere and a growing wall, wrapped around the balance scale but
   never touching it. The beam's computed tilt is the one read this deck
   exists to show, so nothing in this file moves the beam, the pans or the
   weights, and one light — beamSpot — is deliberately held outside the mood
   system so the tilt stays legible under every colour the room takes on.

   Three stage-keyed lookup tables do the work, shaped exactly like the
   deck's VANTAGE table: MOOD, ATMOS, ROOM_ITEMS. Every value is derivable
   from the stage name alone, so a deep link straight into idea3 resolves the
   right light, fog, dust and wall on the first frame with no history.
   ========================================================================== */

(function () {
  /* a local copy, used only if data.js has not been concatenated ahead of us */
  const ENRICH_STAGES = [
    'open', 'framework', 'ramadan', 'christmas', 'welfare', 'environment',
    'gap', 'idea1', 'idea2', 'idea3', 'idea4', 'fullreveal',
  ];

  /* palette additions — the nine hexes this pass introduces */
  const DUSK_SLATE = 0x232a3d;
  const TASK_WHITE = 0xfff2d9;
  const FROST_TEAL = 0x7fc6c9;
  const GAP_ASH = 0x4a5568;
  const REVEAL_GOLD = 0xffe9b0;
  const DUST_GOLD = 0xffd98a;
  const DUST_COOL = 0xb9c4c9;
  const FOG_DUSK = 0x3a2420;
  const STRAP_LEATHER = 0x6b4a32;  /* the tab a medallion hangs from */
  const GAUGE_BRONZE = 0x584627;   /* the gauge arc, sunk into the post assembly */

  const LEAF_DRY = 0x8a8449;   /* the olive the plants fall toward at gap */

  /* ------------------------------------------------------------------ mood */

  /* MOOD owns the fog colour. It does not touch fog distance — that is
     ATMOS's, and splitting them this way is the whole reason neither table
     can fight the other. */
  const MOOD = {
    open:        { keyColor: 0x8fa2c4, keyIntensity: 0.7, rimColor: DUSK_SLATE,  rimIntensity: 0.55, fogColor: FOG_DUSK,   exposure: 0.62 },
    framework:   { keyColor: 0xfff0dc, keyIntensity: 1.5, rimColor: 0xcfd8e6,    rimIntensity: 0.55, fogColor: 0xe8dcc8,   exposure: 0.86 },
    ramadan:     { keyColor: 0xffb35c, keyIntensity: 2.2, rimColor: 0x7a6a92,    rimIntensity: 0.60, fogColor: 0x4a2f22,   exposure: 0.80 },
    christmas:   { keyColor: 0xffd9a8, keyIntensity: 2.0, rimColor: FROST_TEAL,  rimIntensity: 0.90, fogColor: 0x2f3a3f,   exposure: 0.82 },
    welfare:     { keyColor: TASK_WHITE, keyIntensity: 2.4, rimColor: 0xb8c2cc,  rimIntensity: 0.60, fogColor: 0x40342a,   exposure: 0.84 },
    environment: { keyColor: 0xbcd39a, keyIntensity: 2.1, rimColor: 0x8fae6e,    rimIntensity: 0.90, fogColor: 0x2f3a2c,   exposure: 0.84 },
    gap:         { keyColor: GAP_ASH,  keyIntensity: 0.35, rimColor: GAP_ASH,    rimIntensity: 0.30, fogColor: GAP_ASH,    exposure: 0.54 },
    idea1:       { keyColor: 0xffc27a, keyIntensity: 2.6, rimColor: 0xffa860,    rimIntensity: 0.70, fogColor: 0x4a3222,   exposure: 0.86 },
    idea2:       { keyColor: 0x9fd8bc, keyIntensity: 2.4, rimColor: 0x6fb8b0,    rimIntensity: 0.85, fogColor: 0x2c3a34,   exposure: 0.86 },
    idea3:       { keyColor: 0x9aaad0, keyIntensity: 2.6, rimColor: 0x2b3550,    rimIntensity: 1.00, fogColor: DUSK_SLATE, exposure: 0.82 },
    idea4:       { keyColor: 0xe23b2e, keyIntensity: 3.2, rimColor: 0xff7a4a,    rimIntensity: 1.10, fogColor: 0x3a1c18,   exposure: 0.88 },
    fullreveal:  { keyColor: REVEAL_GOLD, keyIntensity: 3.4, rimColor: 0xffb35c, rimIntensity: 1.20, fogColor: 0x5a3a26,   exposure: 0.98 },
  };

  /* how hard the key light breathes, per stage. idea4 is the fastest and
     widest pulse in the deck; gap barely moves at all. */
  const KEY_PULSE = {
    open: [0.30, 0.03], framework: [0.34, 0.02], ramadan: [1.90, 0.16],
    christmas: [0.70, 0.07], welfare: [0.42, 0.04], environment: [0.50, 0.05],
    gap: [0.22, 0.02], idea1: [0.62, 0.06], idea2: [0.72, 0.06],
    idea3: [0.46, 0.04], idea4: [2.60, 0.18], fullreveal: [0.55, 0.07],
  };

  /* where the roving key light stands over. at gap it hangs over the empty
     hook instead of a weight, which is what makes the dip read as an absence
     rather than a dimmer switch. */
  const KEY_AIM = {
    open: 'beamBar', framework: 'beamBar', ramadan: 'lantern', christmas: 'gift',
    welfare: 'apron', environment: 'leaf', gap: 'hook', idea1: 'meal',
    idea2: 'green', idea3: 'cap', idea4: 'rescue', fullreveal: 'goodPan',
  };

  /* ------------------------------------------------------------- atmosphere */

  /* ATMOS owns fog near/far. Never the colour. */
  const ATMOS = {
    open:        { fogNear: 72, fogFar: 170, dustDensity: 0.30, dustTint: DUST_COOL, skyTint: 0x5c6478, shaftIntensity: 0.05 },
    framework:   { fogNear: 66, fogFar: 190, dustDensity: 0.42, dustTint: 0xd6d2c8, skyTint: 0x9aa0a8, shaftIntensity: 0.18 },
    ramadan:     { fogNear: 72, fogFar: 200, dustDensity: 0.50, dustTint: 0xe8c898, skyTint: 0xb08a6a, shaftIntensity: 0.30 },
    christmas:   { fogNear: 74, fogFar: 202, dustDensity: 0.55, dustTint: 0xd8d4c4, skyTint: 0x9ab0b4, shaftIntensity: 0.32 },
    welfare:     { fogNear: 78, fogFar: 206, dustDensity: 0.58, dustTint: 0xe4d6bc, skyTint: 0xb4a892, shaftIntensity: 0.36 },
    environment: { fogNear: 80, fogFar: 208, dustDensity: 0.60, dustTint: 0xd4dcc0, skyTint: 0xa8b898, shaftIntensity: 0.40 },
    gap:         { fogNear: 66, fogFar: 160, dustDensity: 0.72, dustTint: DUST_COOL, skyTint: 0x555f70, shaftIntensity: 0.06 },
    idea1:       { fogNear: 84, fogFar: 214, dustDensity: 0.66, dustTint: DUST_GOLD, skyTint: 0xd0a274, shaftIntensity: 0.55 },
    idea2:       { fogNear: 88, fogFar: 220, dustDensity: 0.70, dustTint: 0xcfe4cf, skyTint: 0xa8c4b4, shaftIntensity: 0.62 },
    idea3:       { fogNear: 90, fogFar: 222, dustDensity: 0.72, dustTint: 0xc8cee0, skyTint: 0x8c96b4, shaftIntensity: 0.66 },
    idea4:       { fogNear: 92, fogFar: 226, dustDensity: 0.80, dustTint: 0xffc39a, skyTint: 0xd08a70, shaftIntensity: 0.78 },
    fullreveal:  { fogNear: 96, fogFar: 240, dustDensity: 0.92, dustTint: DUST_GOLD, skyTint: 0xe8c48c, shaftIntensity: 1.00 },
  };

  /* -------------------------------------------------------------- the wall */

  /* Indices into STAGE_ORDER. Each medallion lands on the same stage its own
     weight lands on the pan, so the wall is a second, slower reading of the
     same tally. Hook 4 is the middle of the rail and never mints a medallion:
     on the gap slide its strap hangs empty, which is the wall's way of saying
     the thing that is missing rather than omitting it. */
  const ROOM_ITEMS = {
    rail:         { revealAt: 0 },
    pot:          { revealAt: 0 },
    medLantern:   { revealAt: 2,  hook: 0, icon: 0 },
    medGift:      { revealAt: 3,  hook: 1, icon: 1 },
    medApron:     { revealAt: 4,  hook: 2, icon: 2 },
    medLeaf:      { revealAt: 5,  hook: 3, icon: 3 },
    gapHook:      { onlyDuring: 6, hook: 4 },
    medMeal:      { revealAt: 7,  hook: 5, icon: 4 },
    medGreen:     { revealAt: 8,  hook: 6, icon: 5 },
    medCap:       { revealAt: 9,  hook: 7, icon: 6 },
    medRescue:    { revealAt: 10, hook: 8, icon: 7 },
    banner:       { revealAt: 11 },
  };

  /* the order the hooks fill in, so what hangs on the rail is always a prefix
     of this list no matter how the deck is entered */
  const MED_ORDER = ['medLantern', 'medGift', 'medApron', 'medLeaf', 'medMeal', 'medGreen', 'medCap', 'medRescue'];

  /* the back wall the room already has sits at z = -21.4; everything here
     stands just in front of it, below the shelf line and above the counter */
  const WALL_Z = -20.9;
  const RAIL_Y = 10.4;
  const HOOK_X0 = -12.4;
  const HOOK_DX = 2.6;

  /* The hanging chain, solved rather than eyeballed. The strap starts inside
     the peg's eye at STRAP_TOP and ends 0.12 below the disc's top edge, so
     peg, strap and disc always overlap: there is no camera angle and no point
     in the tween where a medallion can read as floating. The lean tips the
     disc's face down toward a camera that sits four units off the counter. */
  const MED_R = 0.85;
  const MED_TILT = 0.20;
  const MED_Y = 8.42;
  const MED_Z = WALL_Z + 0.22;
  const STRAP_TOP = RAIL_Y - 0.60;
  const STRAP_Z = WALL_Z + 0.12;
  const STRAP_LEN = STRAP_TOP - (MED_Y + MED_R * Math.cos(MED_TILT) - 0.12);

  /* hook slot -> the medallion that hangs there. slot 4 stays undefined, and
     that hole is the gap marker. */
  const HOOK_MED = [];
  MED_ORDER.forEach(function (k) { HOOK_MED[ROOM_ITEMS[k].hook] = k; });

  /* one plant, on the counter to the right of the scale where the text column
     never reaches. Two read as clutter; one reads as a room. */
  const POT_X = 7.6;
  const POT_Z = -13.5;
  const POT_S = 1.55;
  const BLADES = 9;

  /* --------------------------------------------------------- module state */

  /* the scale's own palette. ctx.colors supplies these; the fallbacks only
     exist so a missing key can never reach Color.setHex as undefined. */
  const COLORS = {
    BRAND: 0xe23b2e, BRAND_DEEP: 0xa82418, CREAM: 0xf6f0e2,
    BRASS: 0xc9a227, STONE_GREY: 0x8a8a86, PAN_TERRACOTTA: 0xb5622f,
    LEAF_YOUNG: 0x8fae6e, WARM_GLOW: 0xffb35c, COIN_GOLD: 0xd8b34a,
    CAP_NAVY: 0x2b3550, HOOK_DIM: 0xcbb9a0,
  };

  let T = null, ctx = null, built = false;
  let renderer = null, scene = null, camera = null;

  let beamSpot, beamSpotTarget, moodKeyLight, moodKeyTarget, rimLightMood;
  let skyDome, lightShaftLeft, lightShaftRight, vignetteGrainQuad;
  let dustMoteField;
  const dustBands = [];

  let railBar, hookInstances, strapInstances, medallionInstances, medallionIcons;
  let potMesh, bladeInstances;
  let rollerBanner, rollerDrop;
  const wallGlowPoints = [];
  let gaugeFaceMats = [], gaugeTickMats = [];

  let dummy = null, scratchColor = null, scratchColor2 = null, scratchVec = null, scratchDir = null;
  let iconBase = null;
  let stageNow = 'open';

  /* every animatable scalar lives here, tweened as one object the way
     world.js tweens its own anim{} */
  const live = {
    keyR: 1, keyG: 1, keyB: 1, keyI: 0.7,
    kx: 0, ky: 10, kz: 6, tx: 0, ty: 3.2, tz: 0,
    rimR: 1, rimG: 1, rimB: 1, rimI: 0.55,
    fogR: 1, fogG: 1, fogB: 1, fogNear: 46, fogFar: 150,
    dust: 0.30, dustR: 1, dustG: 1, dustB: 1,
    skyR: 1, skyG: 1, skyB: 1, shaft: 0.05,
    exposure: 0.62, roomGrow: 0.18, reveal: 0,
  };
  /* one 0→1 per wall item, keyed by ROOM_ITEMS */
  const grow = {};

  /* ---------------------------------------------------------------- utils */

  function order() {
    return (typeof STAGE_ORDER !== 'undefined' && STAGE_ORDER.length) ? STAGE_ORDER : ENRICH_STAGES;
  }

  function stageIndex(stage) {
    const i = order().indexOf(stage);
    return i < 0 ? 0 : i;
  }

  function hookX(i) {
    return HOOK_X0 + i * HOOK_DX;
  }

  /* is this item showing at this stage index? onlyDuring items appear on
     exactly one stage and vanish again — the wall's echo of hookOn */
  function itemAmount(key, idx) {
    const it = ROOM_ITEMS[key];
    if (!it) return 0;
    if (it.onlyDuring !== undefined) return idx === it.onlyDuring ? 1 : 0;
    return idx >= it.revealAt ? 1 : 0;
  }

  function litCount(idx) {
    let n = 0;
    MED_ORDER.forEach(function (k) { n += itemAmount(k, idx); });
    return n;
  }

  /* ------------------------------------------------------------- textures */

  function moteTexture() {
    const c = ctx.canvas(64), g = c.getContext('2d');
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, 'rgba(255,255,255,1)');
    rg.addColorStop(0.34, 'rgba(255,246,224,0.6)');
    rg.addColorStop(1, 'rgba(255,246,224,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(c);
  }

  /* one gradient, generated once. per-stage warmth is a colour multiply on
     the material, never a redraw. */
  function skyTexture() {
    const c = ctx.canvas(256), g = c.getContext('2d');
    const lg = g.createLinearGradient(0, 0, 0, 256);
    lg.addColorStop(0, '#f6f0e2');
    lg.addColorStop(0.42, '#d8c3a4');
    lg.addColorStop(0.78, '#9a5a44');
    lg.addColorStop(1, '#a82418');
    g.fillStyle = lg; g.fillRect(0, 0, 256, 256);
    return ctx.tex(c);
  }

  /* a soft-edged slab of light: bright down the middle, gone at the sides,
     fading out along its length */
  function shaftTexture() {
    const c = ctx.canvas(128), g = c.getContext('2d');
    g.clearRect(0, 0, 128, 128);
    const lg = g.createLinearGradient(0, 0, 128, 0);
    lg.addColorStop(0, 'rgba(255,236,200,0)');
    lg.addColorStop(0.42, 'rgba(255,240,210,0.55)');
    lg.addColorStop(0.58, 'rgba(255,240,210,0.55)');
    lg.addColorStop(1, 'rgba(255,236,200,0)');
    g.fillStyle = lg; g.fillRect(0, 0, 128, 128);
    const vg = g.createLinearGradient(0, 0, 0, 128);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(0.3, 'rgba(0,0,0,0.35)');
    vg.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-out';
    g.fillStyle = vg; g.fillRect(0, 0, 128, 128);
    g.globalCompositeOperation = 'source-over';
    return new T.CanvasTexture(c);
  }

  /* the filmic edge: a darkened border plus a little grain, drawn once and
     held in front of the camera. no EffectComposer — only three's core is
     bundled, and a quad costs one draw call. */
  function grainTexture() {
    const c = ctx.canvas(256), g = c.getContext('2d');
    g.clearRect(0, 0, 256, 256);
    const rg = g.createRadialGradient(128, 128, 60, 128, 128, 190);
    rg.addColorStop(0, 'rgba(24,16,10,0)');
    rg.addColorStop(0.62, 'rgba(24,16,10,0.16)');
    rg.addColorStop(1, 'rgba(18,12,8,0.62)');
    g.fillStyle = rg; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 5200; i++) {
      const a = Math.random() * 0.05;
      g.fillStyle = (Math.random() < 0.5 ? 'rgba(255,244,224,' : 'rgba(20,14,8,') + a + ')';
      g.fillRect(Math.random() * 256, Math.random() * 256, 1.6, 1.6);
    }
    return new T.CanvasTexture(c);
  }

  /* the eight medallion icons, baked flat into one 3x3 atlas so nine discs
     stay one InstancedMesh and the icons stay one extra quad mesh. Drawn
     with the canvas 2D api — silhouettes, never photographs. */
  function drawMedallionIcon(g, k, S) {
    const h = S / 2, R = S * 0.30;
    g.save();
    g.translate(h, h);
    g.fillStyle = '#f6f0e2';
    g.strokeStyle = '#f6f0e2';
    g.lineCap = 'round';
    g.lineJoin = 'round';
    if (k === 0) {
      /* crescent */
      g.beginPath(); g.arc(0, 0, R, 0, 7); g.fill();
      g.globalCompositeOperation = 'destination-out';
      g.beginPath(); g.arc(R * 0.42, -R * 0.18, R * 0.86, 0, 7); g.fill();
      g.globalCompositeOperation = 'source-over';
    } else if (k === 1) {
      /* gift box */
      g.fillRect(-R, -R * 0.5, R * 2, R * 1.5);
      g.fillRect(-R * 1.1, -R * 0.78, R * 2.2, R * 0.4);
      g.globalCompositeOperation = 'destination-out';
      g.fillRect(-R * 0.16, -R * 0.78, R * 0.32, R * 1.78);
      g.globalCompositeOperation = 'source-over';
      g.lineWidth = R * 0.2;
      g.beginPath();
      g.arc(-R * 0.34, -R * 0.98, R * 0.34, 0, 7);
      g.arc(R * 0.34, -R * 0.98, R * 0.34, 0, 7);
      g.stroke();
    } else if (k === 2) {
      /* apron */
      g.beginPath();
      g.moveTo(-R * 0.34, -R * 0.86);
      g.lineTo(R * 0.34, -R * 0.86);
      g.lineTo(R * 0.46, -R * 0.2);
      g.lineTo(R * 0.7, R * 0.16);
      g.lineTo(R * 0.7, R);
      g.lineTo(-R * 0.7, R);
      g.lineTo(-R * 0.7, R * 0.16);
      g.lineTo(-R * 0.46, -R * 0.2);
      g.closePath(); g.fill();
      g.lineWidth = R * 0.14;
      g.beginPath();
      g.moveTo(-R * 0.3, -R * 0.86); g.lineTo(0, -R * 1.18); g.lineTo(R * 0.3, -R * 0.86);
      g.stroke();
    } else if (k === 3) {
      /* leaf */
      g.beginPath();
      g.moveTo(0, -R * 1.05);
      g.quadraticCurveTo(R * 0.95, -R * 0.1, 0, R * 1.05);
      g.quadraticCurveTo(-R * 0.95, -R * 0.1, 0, -R * 1.05);
      g.fill();
      g.globalCompositeOperation = 'destination-out';
      g.lineWidth = R * 0.12;
      g.beginPath(); g.moveTo(0, -R * 0.9); g.lineTo(0, R * 0.9); g.stroke();
      g.globalCompositeOperation = 'source-over';
    } else if (k === 4) {
      /* a bowl with two curls of steam — the shared meal */
      g.beginPath();
      g.moveTo(-R, R * 0.06);
      g.arc(0, R * 0.06, R, 0, Math.PI, false);
      g.closePath(); g.fill();
      g.fillRect(-R * 1.16, -R * 0.14, R * 2.32, R * 0.2);
      g.lineWidth = R * 0.14;
      [-R * 0.42, R * 0.42].forEach(function (x) {
        g.beginPath();
        g.moveTo(x, -R * 0.4);
        g.quadraticCurveTo(x + R * 0.28, -R * 0.72, x, -R * 1.04);
        g.stroke();
      });
    } else if (k === 5) {
      /* a return arrow — the green loop */
      g.lineWidth = R * 0.26;
      g.beginPath(); g.arc(0, 0, R * 0.76, Math.PI * 0.72, Math.PI * 2.1); g.stroke();
      g.beginPath();
      g.moveTo(-R * 0.28, -R * 0.9);
      g.lineTo(-R * 0.88, -R * 0.56);
      g.lineTo(-R * 0.24, -R * 0.18);
      g.closePath(); g.fill();
    } else if (k === 6) {
      /* graduation cap, in the same navy the cap weight uses */
      g.fillStyle = '#2b3550';
      g.strokeStyle = '#2b3550';
      g.beginPath();
      g.moveTo(0, -R * 0.86); g.lineTo(R * 1.12, -R * 0.28);
      g.lineTo(0, R * 0.3); g.lineTo(-R * 1.12, -R * 0.28);
      g.closePath(); g.fill();
      g.fillRect(-R * 0.56, -R * 0.06, R * 1.12, R * 0.66);
      g.lineWidth = R * 0.12;
      g.beginPath();
      g.moveTo(R * 0.92, -R * 0.2); g.lineTo(R * 0.92, R * 0.62);
      g.stroke();
      g.beginPath(); g.arc(R * 0.92, R * 0.74, R * 0.16, 0, 7); g.fill();
    } else {
      /* life ring — the rescue basket's wall echo */
      g.lineWidth = R * 0.42;
      g.beginPath(); g.arc(0, 0, R * 0.78, 0, 7); g.stroke();
      g.lineWidth = R * 0.16;
      for (let i = 0; i < 4; i++) {
        const a = i * Math.PI / 2 + Math.PI / 4;
        g.beginPath();
        g.moveTo(Math.cos(a) * R * 0.5, Math.sin(a) * R * 0.5);
        g.lineTo(Math.cos(a) * R * 1.06, Math.sin(a) * R * 1.06);
        g.stroke();
      }
    }
    g.restore();
  }

  function medallionAtlas() {
    const c = ctx.canvas(768), g = c.getContext('2d');
    g.clearRect(0, 0, 768, 768);
    for (let k = 0; k < 8; k++) {
      g.save();
      g.translate((k % 3) * 256, Math.floor(k / 3) * 256);
      drawMedallionIcon(g, k, 256);
      g.restore();
    }
    return ctx.tex(c);
  }

  /* the roller banner's cloth: a deep brand field with a cream band, dark
     enough that the oak beam still silhouettes against it at fullreveal */
  function bannerTexture() {
    const c = ctx.canvas(512), g = c.getContext('2d');
    g.fillStyle = '#a82418'; g.fillRect(0, 0, 512, 512);
    g.fillStyle = '#f6f0e2'; g.fillRect(0, 96, 512, 12);
    g.fillRect(0, 400, 512, 12);
    g.fillStyle = '#f6f0e2';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = '800 132px Poppins, Inter, system-ui, sans-serif';
    g.fillText('CSR', 256, 214);
    g.font = '600 44px Inter, system-ui, sans-serif';
    g.fillStyle = 'rgba(246,240,226,0.82)';
    g.fillText('PIZZABURG', 256, 320);
    return ctx.tex(c);
  }

  /* ------------------------------------------------------------ the lights */

  function buildLights() {
    const c = ctx.colors;

    /* The one light that never changes. Everything else in this file can be
       recoloured, dimmed or moved; this cannot, because it is what keeps the
       beam's tilt and the grey-vs-terracotta pan read legible under every
       mood the room takes on. */
    beamSpot = new T.SpotLight(TASK_WHITE, 34, 34, 0.62, 0.5, 1.5);
    beamSpot.castShadow = false;
    beamSpotTarget = new T.Object3D();
    scratchVec.set(0, 3.2, 0);
    if (ctx.anchors.beamBar) ctx.anchors.beamBar.getWorldPosition(scratchVec);
    beamSpotTarget.position.copy(scratchVec);
    beamSpot.position.set(scratchVec.x + 2.4, scratchVec.y + 9.5, scratchVec.z + 7.5);
    beamSpot.target = beamSpotTarget;
    scene.add(beamSpot, beamSpotTarget);

    moodKeyLight = new T.SpotLight(0xffffff, 0, 46, 0.72, 0.62, 1.5);
    moodKeyLight.castShadow = false;
    moodKeyTarget = new T.Object3D();
    moodKeyTarget.position.copy(scratchVec);
    moodKeyLight.target = moodKeyTarget;
    moodKeyLight.position.set(scratchVec.x - 1.2, scratchVec.y + 6.5, scratchVec.z - 3.2);
    scene.add(moodKeyLight, moodKeyTarget);

    /* opposite the camera, so it edges the beam rather than filling it. kept
       separate from the room's own neutral fill light. */
    rimLightMood = new T.DirectionalLight(0xffffff, 0);
    rimLightMood.castShadow = false;
    rimLightMood.position.set(-26, 16, -30);
    scene.add(rimLightMood);

    /* two lamps washing the rail, dark until the reveal */
    [[-8.4, 9.4, -19.2], [5.2, 9.4, -19.2]].forEach(function (p) {
      const pl = new T.PointLight(REVEAL_GOLD, 0, 26, 2);
      pl.position.set(p[0], p[1], p[2]);
      scene.add(pl);
      wallGlowPoints.push(pl);
    });

    /* The gauge is the only geometry this file borrows rather than builds, so
       it is the only place this file writes to someone else's material. It
       keeps every vertex world.js gave it; what changes is the read. Left in
       HOOK_DIM cream the arc is the brightest thing behind the beam at forty
       units out, and a pale ring attached to nothing reads as a stray shape
       rather than an instrument. Sunk to bronze it belongs to the post, and
       the rider — the one part that actually carries the number — becomes the
       thing that catches the eye. */
    gaugeFaceMats = [];
    gaugeTickMats = [];
    if (ctx.anchors.gaugeArc) {
      ctx.anchors.gaugeArc.traverse(function (n) {
        if (n.isMesh && n.material && n.material.color) gaugeFaceMats.push(n.material);
      });
    }
    if (ctx.anchors.gaugeTick) {
      ctx.anchors.gaugeTick.traverse(function (n) {
        if (n.isMesh && n.material && n.material.color) gaugeTickMats.push(n.material);
      });
    }
    /* the engraved ticks are siblings of the arc rather than children of it
       and world.js exposes no anchor for them, so they are matched by where
       they sit and the colour they were given. A miss here costs nothing. */
    if (ctx.anchors.scale) {
      ctx.anchors.scale.children.forEach(function (n) {
        if (!n.isMesh || !n.material || !n.material.color) return;
        if (n === ctx.anchors.gaugeArc || n === ctx.anchors.gaugeTick) return;
        if (n.material.color.getHex() !== c.HOOK_DIM) return;
        if (n.position.z >= 0 || Math.abs(n.position.y - 3.4) > 1.4) return;
        gaugeFaceMats.push(n.material);
      });
    }
    gaugeFaceMats.forEach(function (m) {
      m.color.setHex(GAUGE_BRONZE);
      m.roughness = 0.44;
      m.metalness = 0.58;
      if (m.emissive) m.emissive.setHex(c.BRASS);
    });
    gaugeTickMats.forEach(function (m) {
      m.color.setHex(c.BRASS);
      m.roughness = 0.28;
      m.metalness = 0.72;
      if (m.emissive) m.emissive.setHex(c.WARM_GLOW);
    });
  }

  /* -------------------------------------------------------- the atmosphere */

  function buildAtmosphere() {
    const sprite = moteTexture();

    /* the whole mote field, so the three bands share one handle */
    dustMoteField = new T.Group();
    scene.add(dustMoteField);

    /* three depth bands, same sprite, different size, opacity and speed —
       the parallax between them is what sells the room's depth */
    const specs = [
      { n: 120, size: 0.62, opacity: 0.52, speed: 0.55, spread: [54, 34], y0: -2, span: 30, sway: 0.34 },
      { n: 170, size: 0.40, opacity: 0.40, speed: 0.36, spread: [96, 62], y0: -4, span: 38, sway: 0.22 },
      { n: 160, size: 0.26, opacity: 0.26, speed: 0.20, spread: [150, 96], y0: -6, span: 46, sway: 0.13 },
    ];
    specs.forEach(function (s, bi) {
      const pos = new Float32Array(s.n * 3);
      const base = new Float32Array(s.n * 3);
      for (let i = 0; i < s.n; i++) {
        base[i * 3] = -8 + (Math.random() - 0.5) * s.spread[0];
        base[i * 3 + 1] = Math.random() * s.span;
        base[i * 3 + 2] = 2 + (Math.random() - 0.5) * s.spread[1];
        pos[i * 3] = base[i * 3];
        pos[i * 3 + 1] = s.y0 + base[i * 3 + 1];
        pos[i * 3 + 2] = base[i * 3 + 2];
      }
      const geo = new T.BufferGeometry();
      geo.setAttribute('position', new T.BufferAttribute(pos, 3));
      const pts = new T.Points(geo, new T.PointsMaterial({
        color: 0xffffff, size: s.size, sizeAttenuation: true, map: sprite,
        transparent: true, opacity: s.opacity, depthWrite: false, blending: T.AdditiveBlending,
      }));
      pts.frustumCulled = false;
      pts.name = ['dustBandNear', 'dustBandMid', 'dustBandFar'][bi];
      dustMoteField.add(pts);
      dustBands.push({ pts: pts, base: base, n: s.n, y0: s.y0, span: s.span, speed: s.speed, sway: s.sway, opacity: s.opacity });
    });

    /* the sky. big enough that the widest closing vantage still sits inside
       it, and translucent so the page's own backdrop still reads through. */
    skyDome = new T.Mesh(
      new T.SphereGeometry(150, 24, 16),
      new T.MeshBasicMaterial({
        map: skyTexture(), side: T.BackSide, fog: false,
        transparent: true, opacity: 0.52, depthWrite: false,
      })
    );
    skyDome.position.set(-10, 6, 6);
    skyDome.renderOrder = -1;
    scene.add(skyDome);

    /* two slabs of window light. geometry and position are fixed for the
       life of the deck; only opacity is stage-driven. */
    const shaftTex = shaftTexture();
    const shaftMat = function () {
      return new T.MeshBasicMaterial({
        map: shaftTex, color: 0xffe6bc, transparent: true, opacity: 0,
        depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide, fog: false,
      });
    };
    lightShaftLeft = new T.Mesh(new T.PlaneGeometry(13, 40), shaftMat());
    lightShaftLeft.position.set(-19, 13, -9);
    lightShaftLeft.rotation.set(0.18, 0.42, 0.40);
    lightShaftLeft.renderOrder = 4;
    lightShaftRight = new T.Mesh(new T.PlaneGeometry(10, 38), shaftMat());
    lightShaftRight.position.set(7, 14, -12);
    lightShaftRight.rotation.set(0.14, -0.34, 0.30);
    lightShaftRight.renderOrder = 4;
    scene.add(lightShaftLeft, lightShaftRight);

    /* Kept deliberately faint: the page already lays a static #grain and
       #vignette over the canvas in CSS. This one earns its place only by
       tracking the 3D camera, so it wants to be felt, not seen — at full
       strength all three stack and flatten the brand reds out of the room. */
    vignetteGrainQuad = new T.Mesh(
      new T.PlaneGeometry(1, 1),
      new T.MeshBasicMaterial({
        map: grainTexture(), transparent: true, opacity: 0.28,
        depthWrite: false, depthTest: false, fog: false,
      })
    );
    vignetteGrainQuad.frustumCulled = false;
    vignetteGrainQuad.renderOrder = 999;
    scene.add(vignetteGrainQuad);
  }

  /* ------------------------------------------------------- the growing wall */

  function buildRail() {
    const c = ctx.colors;

    railBar = ctx.cyl(0.14, 0.14, 22, 12, c.BRASS, {
      pos: [hookX(4), RAIL_Y, WALL_Z], rot: [0, 0, Math.PI / 2], rough: 0.34, metal: 0.72,
    });
    scene.add(railBar);

    /* nine lathed pegs, built once and never rebuilt — only the rail's own
       reveal scales them. They arrive with the rail and stay, so a strap
       always has something to hang from and the slots still waiting on a
       medallion read as places the wall has left open. */
    const hookProfile = [
      [0.00, 0.00], [0.09, 0.00], [0.09, 0.62], [0.05, 0.72], [0.00, 0.74],
    ];
    const hookGeo = new T.LatheGeometry(
      hookProfile.map(function (p) { return new T.Vector2(Math.max(0.0001, p[0]), p[1]); }), 10
    );
    hookInstances = new T.InstancedMesh(hookGeo, ctx.mat(c.BRASS, { rough: 0.36, metal: 0.7 }), 9);
    hookInstances.castShadow = false;
    scene.add(hookInstances);

    /* the straps. Anchored at the top so scale.y reads as length, which is
       what lets one of them hang empty on the gap slide. */
    const strapGeo = new T.BoxGeometry(0.11, 1, 0.05);
    strapGeo.translate(0, -0.5, 0);
    strapInstances = new T.InstancedMesh(strapGeo, ctx.mat(STRAP_LEATHER, { rough: 0.72 }), 9);
    strapInstances.castShadow = false;
    scene.add(strapInstances);

    /* eight discs in one InstancedMesh, one per earned medallion. A slot with
       nothing earned in it holds no disc at all — a blank one would be the
       same lie as an empty frame. */
    medallionInstances = new T.InstancedMesh(
      new T.CircleGeometry(MED_R, 28), ctx.mat(c.BRASS, { rough: 0.40, metal: 0.55 }), MED_ORDER.length
    );
    medallionInstances.castShadow = false;
    scene.add(medallionInstances);

    /* the eight icons, as one merged quad mesh reading one baked atlas. a
       per-instance texture would need a shader patch; a merged mesh gets the
       same one-extra-draw-call result with plain core three. The vertices
       hold offsets from their disc's centre, not world positions, so they can
       be re-placed with the disc's lean and settle every frame. */
    const quads = MED_ORDER.length;
    const pos = new Float32Array(quads * 12);
    const uv = new Float32Array(quads * 8);
    const idx = [];
    iconBase = new Float32Array(quads * 12);
    for (let q = 0; q < quads; q++) {
      const item = ROOM_ITEMS[MED_ORDER[q]], sz = 0.60;
      const p = [[-sz, -sz], [sz, -sz], [sz, sz], [-sz, sz]];
      for (let v = 0; v < 4; v++) {
        iconBase[q * 12 + v * 3] = p[v][0];
        iconBase[q * 12 + v * 3 + 1] = p[v][1];
        iconBase[q * 12 + v * 3 + 2] = 0;
      }
      const col = item.icon % 3, row = Math.floor(item.icon / 3);
      const u0 = col / 3, v0 = 1 - (row + 1) / 3, d = 1 / 3;
      const uvs = [[u0, v0], [u0 + d, v0], [u0 + d, v0 + d], [u0, v0 + d]];
      for (let v = 0; v < 4; v++) {
        uv[q * 8 + v * 2] = uvs[v][0];
        uv[q * 8 + v * 2 + 1] = uvs[v][1];
      }
      idx.push(q * 4, q * 4 + 1, q * 4 + 2, q * 4, q * 4 + 2, q * 4 + 3);
    }
    const ig = new T.BufferGeometry();
    ig.setAttribute('position', new T.BufferAttribute(pos, 3));
    ig.setAttribute('uv', new T.BufferAttribute(uv, 2));
    ig.setIndex(idx);
    medallionIcons = new T.Mesh(ig, new T.MeshBasicMaterial({
      map: medallionAtlas(), transparent: true, depthWrite: false,
    }));
    medallionIcons.frustumCulled = false;
    medallionIcons.renderOrder = 3;
    scene.add(medallionIcons);
  }

  /* One leaf blade, built by hand: seven rings of three columns, narrow at
     the base, widest a third of the way up, arced forward and creased down
     the spine so the fold catches the key light. The vertex colours are what
     make it read as a leaf rather than a spike at forty units out — they sink
     the base into shadow and warm the tip. They multiply the material colour,
     so the wilt at gap still comes off one scalar. */
  function bladeGeometry() {
    const RINGS = 7, ARC = 1.02, R = 1 / ARC;
    const pos = new Float32Array(RINGS * 9);
    const col = new Float32Array(RINGS * 9);
    const idx = [];
    for (let r = 0; r < RINGS; r++) {
      const t = r / (RINGS - 1), ang = t * ARC;
      const cy = Math.sin(ang) * R, cz = (1 - Math.cos(ang)) * R;
      const ny = -Math.sin(ang), nz = Math.cos(ang);
      const w = Math.sin(Math.pow(t, 0.62) * Math.PI) * 0.34 + 0.015;
      const crease = w * 0.42;
      const shade = 0.44 + 0.56 * Math.pow(t, 0.8);
      const cr = Math.min(1, shade * (0.90 + 0.24 * t));
      const cb = Math.min(1, shade * (1.02 - 0.26 * t));
      for (let k = 0; k < 3; k++) {
        const o = (r * 3 + k) * 3;
        const mid = k === 1 ? crease : 0;
        pos[o] = (k - 1) * w;
        pos[o + 1] = cy + ny * mid;
        pos[o + 2] = cz + nz * mid;
        col[o] = cr; col[o + 1] = shade; col[o + 2] = cb;
      }
      if (r < RINGS - 1) {
        for (let k = 0; k < 2; k++) {
          const p0 = r * 3 + k;
          idx.push(p0, p0 + 3, p0 + 4, p0, p0 + 4, p0 + 1);
        }
      }
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(pos, 3));
    g.setAttribute('color', new T.BufferAttribute(col, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  function buildPlant() {
    const c = ctx.colors;

    const potProfile = [
      [0.00, 0.00], [0.52, 0.00], [0.60, 0.10], [0.74, 1.05], [0.86, 1.22],
      [0.86, 1.40], [0.72, 1.44], [0.62, 1.16], [0.48, 0.16], [0.00, 0.12],
    ];
    potMesh = ctx.lathe(potProfile, 20, c.PAN_TERRACOTTA, { pos: [POT_X, 0, POT_Z], rough: 0.82 });

    /* a disc of soil, or the pot reads as an empty bowl the blades pass
       through. It rides the pot, so one scale drives both. */
    const soil = new T.Mesh(new T.CircleGeometry(0.66, 20), ctx.mat(0x3b2a1c, { rough: 0.95 }));
    soil.rotation.x = -Math.PI / 2;
    soil.position.y = 1.26;
    potMesh.add(soil);
    scene.add(potMesh);

    /* nine blades, fanned on the golden angle so no two overlap the same way.
       The count never changes: a plant that sheds leaves between stages reads
       as a bug, so the wilt at gap is length, droop and colour only. */
    const bladeMat = ctx.mat(c.LEAF_YOUNG, { rough: 0.62, side: T.DoubleSide });
    bladeMat.vertexColors = true;
    bladeInstances = new T.InstancedMesh(bladeGeometry(), bladeMat, BLADES);
    bladeInstances.castShadow = false;
    scene.add(bladeInstances);
  }

  function buildBanner() {
    const c = ctx.colors;

    rollerBanner = ctx.cyl(0.18, 0.18, 7.9, 12, c.BRASS, {
      pos: [-2, 6.6, WALL_Z - 0.1], rot: [0, 0, Math.PI / 2], rough: 0.36, metal: 0.7,
    });
    rollerBanner.visible = false;
    scene.add(rollerBanner);

    /* anchored at its top edge so scale.y reads as a shade unrolling */
    const dropGeo = new T.PlaneGeometry(7.6, 4.8);
    dropGeo.translate(0, -2.4, 0);
    rollerDrop = new T.Mesh(dropGeo, ctx.mat(0xffffff, { rough: 0.82, map: bannerTexture(), side: T.DoubleSide }));
    rollerDrop.position.set(-2, 6.6, WALL_Z - 0.04);
    rollerDrop.scale.y = 0.0001;
    rollerDrop.visible = false;
    scene.add(rollerDrop);
  }

  /* --------------------------------------------------------------- writing */

  function applyLive() {
    if (!built) return;

    moodKeyLight.color.setRGB(live.keyR, live.keyG, live.keyB);
    moodKeyLight.intensity = live.keyI;
    moodKeyLight.position.set(live.kx, live.ky, live.kz);
    moodKeyTarget.position.set(live.tx, live.ty, live.tz);

    rimLightMood.color.setRGB(live.rimR, live.rimG, live.rimB);
    rimLightMood.intensity = live.rimI;

    if (scene.fog) {
      scene.fog.color.setRGB(live.fogR, live.fogG, live.fogB);
      scene.fog.near = live.fogNear;
      scene.fog.far = live.fogFar;
    }
    if (renderer) renderer.toneMappingExposure = live.exposure;

    dustBands.forEach(function (b) {
      b.pts.material.opacity = b.opacity * live.dust;
      b.pts.material.color.setRGB(live.dustR, live.dustG, live.dustB);
    });
    skyDome.material.color.setRGB(live.skyR, live.skyG, live.skyB);
    lightShaftLeft.material.opacity = live.shaft * 0.55;
    lightShaftRight.material.opacity = live.shaft * 0.42;

    wallGlowPoints.forEach(function (pl) { pl.intensity = live.reveal * 7; });
  }

  function applyWall() {
    if (!built) return;

    railBar.visible = grow.rail > 0.02;
    railBar.scale.set(grow.rail, 1, grow.rail);

    for (let i = 0; i < 9; i++) {
      dummy.position.set(hookX(i), RAIL_Y - 0.66, WALL_Z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(Math.max(0.0001, grow.rail));
      dummy.updateMatrix();
      hookInstances.setMatrixAt(i, dummy.matrix);

      /* the strap grows out of the peg's eye and shortens by exactly the
         distance its disc still has left to settle, so the two stay joined
         through the whole landing */
      const gs = HOOK_MED[i] ? grow[HOOK_MED[i]] : grow.gapHook;
      dummy.position.set(hookX(i), STRAP_TOP, STRAP_Z);
      dummy.scale.set(
        Math.max(0.0001, gs), Math.max(0.0001, STRAP_LEN - (1 - gs) * 0.55), Math.max(0.0001, gs)
      );
      dummy.updateMatrix();
      strapInstances.setMatrixAt(i, dummy.matrix);
    }
    hookInstances.instanceMatrix.needsUpdate = true;
    strapInstances.instanceMatrix.needsUpdate = true;

    /* medallions settle the last half-unit as they land */
    for (let q = 0; q < MED_ORDER.length; q++) {
      const g = grow[MED_ORDER[q]];
      dummy.position.set(hookX(ROOM_ITEMS[MED_ORDER[q]].hook), MED_Y + (1 - g) * 0.55, MED_Z);
      dummy.rotation.set(MED_TILT, 0, 0);
      dummy.scale.setScalar(Math.max(0.0001, g));
      dummy.updateMatrix();
      medallionInstances.setMatrixAt(q, dummy.matrix);
    }
    medallionInstances.instanceMatrix.needsUpdate = true;

    /* the icons ride their discs: same lean, same settle, same growth, and a
       hair proud of the brass so they never z-fight it */
    const ct = Math.cos(MED_TILT), st = Math.sin(MED_TILT);
    const ip = medallionIcons.geometry.attributes.position;
    for (let q = 0; q < MED_ORDER.length; q++) {
      const g = grow[MED_ORDER[q]];
      const x = hookX(ROOM_ITEMS[MED_ORDER[q]].hook), y = MED_Y + (1 - g) * 0.55;
      for (let v = 0; v < 4; v++) {
        const o = q * 12 + v * 3;
        const dy = iconBase[o + 1] * g;
        ip.array[o] = x + iconBase[o] * g;
        ip.array[o + 1] = y + dy * ct;
        ip.array[o + 2] = MED_Z + dy * st + 0.014;
      }
    }
    ip.needsUpdate = true;

    potMesh.visible = grow.pot > 0.02;
    potMesh.scale.setScalar(POT_S * Math.max(0.0001, grow.pot));

    /* one vigour scalar drives the whole plant. At gap the blades shorten,
       flop further out and drain toward olive; the colour only ever travels
       part of the way, because a plant that goes fully dead upstages the beam
       it is meant to sit behind. */
    const vig = live.roomGrow;
    const pg = Math.max(0.0001, grow.pot);
    const rim = 0.30 * POT_S, lip = 1.30 * POT_S * pg;
    for (let k = 0; k < BLADES; k++) {
      const ang = k * 2.39996;
      dummy.position.set(POT_X + Math.cos(ang) * rim, lip, POT_Z + Math.sin(ang) * rim);
      dummy.rotation.set(0, Math.PI / 2 - ang, 0);
      dummy.scale.set(
        (1.28 + (k % 3) * 0.20) * pg,
        (2.05 + (k % 4) * 0.26) * (0.74 + 0.26 * vig) * pg,
        (1.00 + (k % 3) * 0.22) * (1.46 - 0.46 * vig) * pg
      );
      dummy.updateMatrix();
      bladeInstances.setMatrixAt(k, dummy.matrix);
    }
    bladeInstances.instanceMatrix.needsUpdate = true;
    scratchColor.setHex(ctx.colors.LEAF_YOUNG);
    scratchColor2.setHex(LEAF_DRY);
    bladeInstances.material.color.copy(scratchColor).lerp(scratchColor2, (1 - vig) * 0.72);

    rollerBanner.visible = grow.banner > 0.02;
    rollerDrop.visible = grow.banner > 0.02;
    rollerDrop.scale.y = Math.max(0.0001, grow.banner);
  }

  /* ------------------------------------------------------------------ api */

  function build(c) {
    if (built || !c || !c.THREE || !c.scene) return;
    /* a shallow copy, so filling in palette defaults below never writes back
       into world.js's own ctx object */
    ctx = Object.assign({}, c);
    T = c.THREE;
    scene = c.scene;
    renderer = c.renderer;
    camera = c.camera;
    ctx.colors = Object.assign({}, COLORS, c.colors || {});
    if (!ctx.anchors) ctx.anchors = {};
    if (!ctx.anchors.weights) ctx.anchors.weights = {};

    dummy = new T.Object3D();
    scratchColor = new T.Color();
    scratchColor2 = new T.Color();
    scratchVec = new T.Vector3();
    scratchDir = new T.Vector3();

    Object.keys(ROOM_ITEMS).forEach(function (k) { grow[k] = 0; });

    buildLights();
    buildAtmosphere();
    buildRail();
    buildPlant();
    buildBanner();

    built = true;
    apply('open', true);
  }

  /* a pure lookup. nothing here reads what stage came before, which is what
     lets a deep link into idea3 land on the right room on frame one. */
  function apply(stage, instant) {
    if (!built) return;
    const idx = stageIndex(stage);
    stageNow = order()[idx] || 'open';
    const m = MOOD[stageNow] || MOOD.open;
    const a = ATMOS[stageNow] || ATMOS.open;

    /* where the key light stands: over the good weight that lit most
       recently, or over the empty hook while gap is on screen */
    const aimName = KEY_AIM[stageNow] || 'beamBar';
    let aim = ctx.anchors.weights[aimName] || ctx.anchors[aimName] || ctx.anchors.beamBar;
    if (!aim) scratchVec.set(0, 3.2, 0);
    else aim.getWorldPosition(scratchVec);

    const lit = litCount(idx);
    const target = {
      keyI: m.keyIntensity,
      kx: scratchVec.x - 1.2, ky: scratchVec.y + 6.4, kz: scratchVec.z - 3.4,
      tx: scratchVec.x, ty: scratchVec.y, tz: scratchVec.z,
      rimI: m.rimIntensity,
      fogNear: a.fogNear, fogFar: a.fogFar,
      dust: a.dustDensity, shaft: a.shaftIntensity,
      exposure: m.exposure,
      roomGrow: (0.18 + 0.82 * (lit / MED_ORDER.length)) * (idx === 6 ? 0.62 : 1),
      reveal: idx >= 11 ? 1 : 0,
    };
    scratchColor.setHex(m.keyColor);
    target.keyR = scratchColor.r; target.keyG = scratchColor.g; target.keyB = scratchColor.b;
    scratchColor.setHex(m.rimColor);
    target.rimR = scratchColor.r; target.rimG = scratchColor.g; target.rimB = scratchColor.b;
    scratchColor.setHex(m.fogColor);
    target.fogR = scratchColor.r; target.fogG = scratchColor.g; target.fogB = scratchColor.b;
    scratchColor.setHex(a.dustTint);
    target.dustR = scratchColor.r; target.dustG = scratchColor.g; target.dustB = scratchColor.b;
    scratchColor.setHex(a.skyTint);
    target.skyR = scratchColor.r; target.skyG = scratchColor.g; target.skyB = scratchColor.b;

    const wall = {};
    Object.keys(ROOM_ITEMS).forEach(function (k) { wall[k] = itemAmount(k, idx); });

    if (instant || !window.gsap) {
      Object.keys(target).forEach(function (k) { live[k] = target[k]; });
      Object.keys(wall).forEach(function (k) { grow[k] = wall[k]; });
      applyLive();
      applyWall();
      return;
    }

    window.gsap.killTweensOf(live);
    window.gsap.killTweensOf(grow);
    target.duration = 1.6;
    target.ease = 'power2.inOut';
    target.onUpdate = applyLive;
    window.gsap.to(live, target);
    wall.duration = 1.6;
    wall.ease = 'power2.out';
    wall.onUpdate = applyWall;
    window.gsap.to(grow, wall);
  }

  function frame(t, dt, state) {
    if (!built) return;
    const calm = !!(state && state.calm);

    /* drift is read straight off the absolute clock, so a jump, a pause or a
       backgrounded tab can never leave the bands out of step with each other */
    if (!calm) {
      dustBands.forEach(function (b) {
        const arr = b.pts.geometry.attributes.position.array;
        for (let i = 0; i < b.n; i++) {
          const o = i * 3;
          let y = (b.base[o + 1] + t * b.speed) % b.span;
          if (y < 0) y += b.span;
          arr[o] = b.base[o] + Math.sin(t * 0.21 + b.base[o]) * b.sway;
          arr[o + 1] = b.y0 + y;
          arr[o + 2] = b.base[o + 2];
        }
        b.pts.geometry.attributes.position.needsUpdate = true;
      });
    }

    const pulse = KEY_PULSE[stageNow] || KEY_PULSE.open;
    moodKeyLight.intensity = live.keyI * (calm ? 1 : 1 + Math.sin(t * pulse[0]) * pulse[1]);
    lightShaftLeft.material.opacity = live.shaft * 0.55 * (calm ? 1 : 1 + Math.sin(t * 0.24) * 0.16);
    lightShaftRight.material.opacity = live.shaft * 0.42 * (calm ? 1 : 1 + Math.cos(t * 0.19) * 0.16);
    wallGlowPoints.forEach(function (pl, i) {
      pl.intensity = live.reveal * 7 * (calm ? 1 : 1 + Math.sin(t * 1.4 + i * 2.1) * 0.14);
    });

    /* the gauge burns hotter the further the beam is off level — the one
       place where the lighting rig reads the data rather than decorating it */
    const off = Math.min(1, Math.abs((state && state.beamAngle) || 0) / 0.34);
    for (let i = 0; i < gaugeFaceMats.length; i++) {
      gaugeFaceMats[i].emissiveIntensity = 0.03 + off * 0.14;
    }
    for (let i = 0; i < gaugeTickMats.length; i++) {
      gaugeTickMats[i].emissiveIntensity = 0.30 + off * 2.4;
    }

    /* the vignette rides just past the near plane, sized to the frustum */
    if (camera) {
      const d = 1.2;
      camera.getWorldDirection(scratchDir);
      vignetteGrainQuad.position.copy(camera.position).addScaledVector(scratchDir, d);
      vignetteGrainQuad.quaternion.copy(camera.quaternion);
      const h = 2 * Math.tan(camera.fov * Math.PI / 360) * d;
      vignetteGrainQuad.scale.set(h * camera.aspect * 1.02, h * 1.02, 1);
    }
  }

  window.Enrich = { build: build, apply: apply, frame: frame };
})();

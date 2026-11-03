/* THE WORLD BEHIND THE WHITE (upgrade brief §2). The page ground is pure white; underneath sits an illustrated world of
   the firm's trades at work, revealed only around the cursor, the way Immersive Garden reveals its relief:
   - a soft-edged window follows the eased pointer (S1324 numbers: pointer ease .1, radius 260 px, core 40 %, feather to 0),
     with a short trail painted by distance (S1323) and a slower hide than show (IG: show fast, sink back slowly);
   - the window's edge bends the world like water and carries a faint lime rim (IG applyFluidEffect, tinted to the brand);
   - five scenes, one per page region, each in three parallax planes (far / mid / near) that shift with scroll and with
     one damped pointer target split by opposing, unequal amounts (S1330: 0.055 per 60 Hz frame, dt-corrected);
   - scenes cross-fade as the visitor descends; at rest the canvas is empty and the loop stops (nothing runs unseen);
   - touch: no cursor, so a gentle reveal travels with scrolling and fades when the page stops.
   Figures are drawn as pictograms on pivots (S0489: arcs and pivots, phases out of step), in deep green, lime and ink.
   WebGL1, no library. DPR capped at 1.25. Reduced motion: the world stays hidden (the page is still and white). */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (RM) return;
  const G = '#0E3B2C', G2 = '#2E5A47', LIME = '#B5DB6E', LIME_L = '#EAF4D6', GL = '#E2ECE5', INK = '#16191D', PALE = '#F1F6EE';
  const PW = 1600, PH = 1400;                               // plane drawing size (taller than a viewport: room for parallax)

  /* ---------- drawing kit ---------- */
  const r2 = (v) => Math.round(v * 10) / 10;
  const dir = (deg) => [Math.sin(deg * Math.PI / 180), Math.cos(deg * Math.PI / 180)];   // 0 = straight down, 180 = straight up
  // a worker as a pictogram on pivots: hip at (x, y); angles in degrees from straight down, positive = forward (facing f)
  function worker(x, y, s, f, p) {
    const P = Object.assign({ lean: 0, ua: [20, -20], fa: [40, -10], th: [15, -12], sh: [-5, 5], hat: LIME, vest: true }, p);
    const fx = (v) => v * f;
    const torso = dir(180 + P.lean), hipX = 0, hipY = 0, top = [hipX + fx(torso[0] * 50), hipY + torso[1] * 50];
    const head = [top[0] + fx(torso[0] * 25), top[1] + torso[1] * 25];
    const limb = (o, a1, a2, l1, l2) => { const d1 = dir(a1), e = [o[0] + fx(d1[0] * l1), o[1] + d1[1] * l1], d2 = dir(a2); return [o, e, [e[0] + fx(d2[0] * l2), e[1] + d2[1] * l2]]; };
    const arms = [limb(top, P.ua[0], P.fa[0], 30, 28), limb(top, P.ua[1], P.fa[1], 30, 28)];
    const legs = [limb([hipX, hipY], P.th[0], P.sh[0], 40, 42), limb([hipX, hipY], P.th[1], P.sh[1], 40, 42)];
    const pl = (pts, w, c) => `<path d="M${pts.map((q) => r2(q[0]) + ' ' + r2(q[1])).join('L')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
    let s1 = `<g transform="translate(${x} ${y}) scale(${s})">`;
    s1 += pl(legs[1], 13, G2) + pl(arms[1], 10, G2);                                                     // far limbs, lighter
    s1 += pl(legs[0], 13, G) + pl([[hipX, hipY], top], 24, G);
    if (P.vest) s1 += pl([[hipX + fx(torso[0] * 12), hipY + torso[1] * 12], [top[0] - fx(torso[0] * 8), top[1] - torso[1] * 8]], 16, LIME);
    s1 += `<circle cx="${r2(head[0])}" cy="${r2(head[1])}" r="12.5" fill="${G}"/>`;
    if (P.hat) s1 += `<path d="M${r2(head[0] - 14)} ${r2(head[1] - 3)}a14 13 0 0 1 28 0z" fill="${P.hat}"/><path d="M${r2(head[0] - 16)} ${r2(head[1] - 3)}h32" stroke="${P.hat}" stroke-width="3.5" stroke-linecap="round"/>`;
    s1 += pl(arms[0], 10, G) + `<circle cx="${r2(arms[0][2][0])}" cy="${r2(arms[0][2][1])}" r="5.5" fill="${G}"/></g>`;
    const T = (q) => [x + q[0] * s, y + q[1] * s];
    return { svg: s1, hands: [T(arms[0][2]), T(arms[1][2])], head: T(head), feet: [T(legs[0][2]), T(legs[1][2])] };
  }
  const board = (a, b, w, c = G, cap = LIME) => `<path d="M${r2(a[0])} ${r2(a[1])}L${r2(b[0])} ${r2(b[1])}" stroke="${c}" stroke-width="${w}" stroke-linecap="butt"/><path d="M${r2(a[0])} ${r2(a[1] - w * .38)}L${r2(b[0])} ${r2(b[1] - w * .38)}" stroke="${cap}" stroke-width="${w * .2}"/>`;
  const ladder = (x1, y1, x2, y2, c = G, w = 5) => { const n = Math.round(Math.hypot(x2 - x1, y2 - y1) / 34), dx = 16; let s = `<path d="M${x1 - dx} ${y1}L${x2 - dx} ${y2}M${x1 + dx} ${y1}L${x2 + dx} ${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
    for (let i = 1; i < n; i++) { const t = i / n, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t; s += `<path d="M${r2(x - dx)} ${r2(y)}h${dx * 2}" stroke="${c}" stroke-width="${w - 1}"/>`; } return s; };
  const laps = (x, y, w, h, step, c, sw = 2) => { let s = ''; for (let yy = y + step; yy < y + h; yy += step) s += `<path d="M${x} ${yy}h${w}" stroke="${c}" stroke-width="${sw}"/>`; return s; };
  const battens = (x, y, w, h, step, c, sw = 2) => { let s = ''; for (let xx = x + step; xx < x + w; xx += step) s += `<path d="M${xx} ${y}v${h}" stroke="${c}" stroke-width="${sw}"/>`; return s; };
  const house = (x, y, w, h, roofH, fill, line, kind = 'lap') => `<path d="M${x} ${y + roofH}L${x + w / 2} ${y}L${x + w} ${y + roofH}V${y + roofH + h}H${x}Z" fill="${fill}"/>` +
    (kind === 'lap' ? laps(x, y + roofH, w, h, 26, line) : battens(x, y + roofH, w, h, 30, line)) + `<path d="M${x - 14} ${y + roofH + 8}L${x + w / 2} ${y - 6}L${x + w + 14} ${y + roofH + 8}" fill="none" stroke="${line}" stroke-width="5" stroke-linejoin="round"/>`;
  const win = (x, y, w, h, frame = G, glass = LIME_L) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${glass}" stroke="${frame}" stroke-width="6"/><path d="M${x} ${y + h / 2}h${w}M${x + w / 2} ${y}v${h}" stroke="${frame}" stroke-width="4"/>`;
  const sawhorse = (x, y) => `<path d="M${x - 50} ${y}L${x - 30} ${y - 46}L${x - 10} ${y}M${x + 10} ${y}L${x + 30} ${y - 46}L${x + 50} ${y}M${x - 40} ${y - 46}H${x + 40}" stroke="${G}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  const stack = (x, y, n, w = 220) => { let s = ''; for (let i = 0; i < n; i++) s += `<rect x="${x + (i % 2) * 6}" y="${y - i * 11}" width="${w}" height="10" rx="2" fill="${i % 3 ? GL : LIME}" stroke="${G}" stroke-width="2.5"/>`; return s; };
  const ground = (y, c = GL) => `<path d="M0 ${y}H${PW}" stroke="${c}" stroke-width="4"/>` + Array.from({ length: 12 }, (_, i) => `<path d="M${60 + i * 130} ${y + 14}h${40 + (i * 37) % 50}" stroke="${GL}" stroke-width="3" stroke-linecap="round"/>`).join('');
  const scaffold = (x, y, w, h, levels, c) => { let s = ''; for (let i = 0; i <= Math.round(w / 180); i++) s += `<path d="M${x + i * 180} ${y}v${h}" stroke="${c}" stroke-width="6"/>`;
    for (let l = 0; l < levels; l++) { const yy = y + l * (h / levels); s += `<rect x="${x - 10}" y="${yy}" width="${w + 20}" height="12" fill="${PALE}" stroke="${c}" stroke-width="4"/>`; }
    for (let i = 0; i < Math.round(w / 180); i++) s += `<path d="M${x + i * 180} ${y + h}L${x + (i + 1) * 180} ${y + h / levels}" stroke="${c}" stroke-width="3" opacity=".6"/>`; return s; };
  const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PW} ${PH}" width="${PW}" height="${PH}">${inner}</svg>`;

  /* ---------- the five scenes (far, mid, near) ---------- */
  function scene(i) {
    const Y = 1060;                                                                                       // ground line
    if (i === 0) { // the siding crew: a long lap board lifted to the wall, a nailer on the scaffold, a cut at the horses
      const a = worker(470, Y - 84, 1.9, 1, { lean: -6, ua: [168, 160], fa: [176, 170], th: [14, -14] }), b = worker(860, Y - 84, 1.9, -1, { lean: -4, ua: [166, 158], fa: [178, 168], th: [10, -12] });
      const c = worker(1180, 548 - 132, 1.6, -1, { lean: 10, ua: [120, 30], fa: [150, 70], th: [8, -10] });
      const d = worker(1400, Y - 84, 1.7, -1, { lean: 30, ua: [70, 40], fa: [60, 80], th: [20, -40], sh: [-10, 60] });
      return [svg(house(-60, 120, 1720, 840, 330, PALE, GL) + win(220, 640, 150, 190, GL, '#fff') + win(1230, 640, 150, 190, GL, '#fff') + ground(Y + 4)),
        svg(scaffold(980, 548, 520, 512, 2, '#9BB8A6') + ladder(320, Y, 420, 560, '#9BB8A6') + sawhorse(1330, Y) + sawhorse(1530, Y) + stack(1300, Y - 52, 1, 260) + stack(60, Y - 8, 6, 230)),
        svg(a.svg + b.svg + board([a.hands[0][0] - 60, a.hands[0][1] + 6], [b.hands[0][0] + 60, b.hands[0][1] + 4], 22) + c.svg + `<path d="M${r2(c.hands[0][0])} ${r2(c.hands[0][1])}l-26 -14" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>` + d.svg)];
    }
    if (i === 1) { // colour and trim: a painter on the ladder cutting in the trim, a swatch fan held up, cans on the ground
      const a = worker(872, 470, 1.6, 1, { lean: -8, ua: [165, 20], fa: [150, 10], th: [-6, 22], sh: [4, -6] });
      const b = worker(560, Y - 84, 1.8, 1, { lean: 0, ua: [120, 20], fa: [160, 30], th: [6, -8] });
      let fan = ''; for (let k = 0; k < 7; k++) fan += `<rect x="-12" y="-120" width="24" height="120" rx="6" fill="${[LIME, '#7FA43E', GL, G2, '#C6BEB0', '#575B59', '#E0E0D8'][k]}" stroke="${G}" stroke-width="2" transform="rotate(${-54 + k * 18})"/>`;
      return [svg(`<path d="M120 1060V420L560 160L1000 420V1060Z" fill="${PALE}"/>` + battens(120, 420, 880, 640, 44, GL) + `<path d="M1000 1060V520H1560V1060" fill="${PALE}"/>` + laps(1000, 520, 560, 540, 26, GL) + ground(Y + 4)),
        svg(ladder(820, Y, 900, 430, '#9BB8A6') + `<path d="M100 420L560 150L1020 420" fill="none" stroke="#9BB8A6" stroke-width="18" stroke-linejoin="round"/>` + `<rect x="1180" y="${Y - 70}" width="60" height="70" rx="6" fill="${GL}" stroke="${G}" stroke-width="4"/><rect x="1252" y="${Y - 56}" width="50" height="56" rx="6" fill="${LIME}" stroke="${G}" stroke-width="4"/>`),
        svg(a.svg + `<path d="M${r2(a.hands[0][0])} ${r2(a.hands[0][1])}l18 -22" stroke="${G}" stroke-width="8" stroke-linecap="round"/><rect x="${r2(a.hands[0][0] + 12)}" y="${r2(a.hands[0][1] - 40)}" width="18" height="14" rx="3" fill="${LIME}"/>` +
          b.svg + `<g transform="translate(${r2(b.hands[0][0] + 6)} ${r2(b.hands[0][1])})">${fan}</g>`)];
    }
    if (i === 2) { // fitting a window: two carry the unit to the opening, a third checks it with a level
      const a = worker(560, Y - 84, 1.8, 1, { lean: 8, ua: [96, 70], fa: [120, 100], th: [24, -20] }), b = worker(900, Y - 84, 1.8, -1, { lean: 8, ua: [96, 70], fa: [120, 100], th: [-10, 26] });
      const c = worker(1290, Y - 84, 1.8, -1, { lean: 0, ua: [150, 140], fa: [100, 90], th: [6, -8] });
      const wx = a.hands[0][0], wy = a.hands[0][1] - 150;
      return [svg(`<rect x="-20" y="260" width="1640" height="800" fill="${PALE}"/>` + laps(-20, 260, 1640, 800, 30, GL) + `<rect x="1080" y="520" width="190" height="300" fill="#fff" stroke="${GL}" stroke-width="10"/>` + ground(Y + 4)),
        svg(`<rect x="1074" y="514" width="202" height="312" fill="none" stroke="#9BB8A6" stroke-width="6" stroke-dasharray="14 10"/>` + `<path d="M1040 260V1060M1310 260V1060" stroke="#9BB8A6" stroke-width="5" opacity=".7"/>` + stack(80, Y - 8, 3, 260)),
        svg(a.svg + b.svg + win(r2(wx), r2(wy), r2(b.hands[0][0] - wx), 170) + c.svg + `<rect x="${r2(c.hands[0][0] - 74)}" y="${r2(c.hands[0][1] - 10)}" width="96" height="14" rx="3" fill="${LIME}" stroke="${G}" stroke-width="3"/><circle cx="${r2(c.hands[0][0] - 26)}" cy="${r2(c.hands[0][1] - 3)}" r="3.5" fill="${G}"/>`)];
    }
    if (i === 3) { // the roofing crew: two lay shingle courses up the plane, one climbs with a bundle on the shoulder
      const a = worker(620, 560, 1.5, 1, { lean: 24, ua: [40, 20], fa: [20, 10], th: [92, 84], sh: [-88, -92] }), b = worker(960, 470, 1.5, 1, { lean: 30, ua: [50, 30], fa: [24, 14], th: [94, 86], sh: [-90, -94] });
      const c = worker(1330, 760, 1.6, -1, { lean: -4, ua: [170, 40], fa: [200, 10], th: [-12, 40], sh: [5, 10] });
      let rows = ''; for (let k = 0; k < 9; k++) { const y = 300 + k * 52; rows += `<path d="M${200 + k * 20} ${y}H${1500 - k * 4}" stroke="${GL}" stroke-width="3"/>`; for (let x = 220 + (k % 2) * 40; x < 1480; x += 80) rows += `<path d="M${x} ${y}v${-24}" stroke="${GL}" stroke-width="2"/>`; }
      return [svg(`<path d="M120 780L520 230H1520L1560 780Z" fill="${PALE}"/>` + rows + `<path d="M120 780H1560V1060H120Z" fill="#fff"/>` + laps(120, 780, 1440, 280, 26, GL) + ground(Y + 4)),
        svg(`<path d="M520 230H1520" stroke="#9BB8A6" stroke-width="16" stroke-linecap="round"/>` + ladder(1280, Y, 1360, 640, '#9BB8A6') + `<path d="M120 780L520 230" stroke="#9BB8A6" stroke-width="8"/>` + Array.from({ length: 6 }, (_, k) => `<rect x="${380 + k * 120}" y="${590 - k * 30}" width="80" height="22" fill="${k % 2 ? LIME : GL}" stroke="${G}" stroke-width="3" transform="skewX(-20)"/>`).join('')),
        svg(a.svg + b.svg + c.svg + `<rect x="${r2(c.head[0] - 6)}" y="${r2(c.head[1] - 6)}" width="76" height="26" rx="4" fill="${LIME}" stroke="${G}" stroke-width="3" transform="rotate(-8 ${r2(c.head[0])} ${r2(c.head[1])})"/>` +
          `<rect x="${r2(a.hands[0][0] - 10)}" y="${r2(a.hands[0][1] - 8)}" width="60" height="16" fill="${G}" transform="skewX(-20)"/>`)];
    }
    // 4: the street: a gutter hung from the ladder, a downspout held, the project manager walking the job with the owner
    const a = worker(470, 560, 1.6, 1, { lean: -2, ua: [176, 150], fa: [178, 160], th: [-14, 26], sh: [4, 10] });
    const b = worker(260, Y - 84, 1.7, 1, { lean: 0, ua: [160, 30], fa: [175, 20], th: [6, -8] });
    const pm = worker(1060, Y - 84, 1.75, -1, { lean: 0, ua: [60, 10], fa: [110, 20], th: [16, -14] }), owner = worker(1230, Y - 84, 1.75, -1, { lean: 0, ua: [-10, 30], fa: [-30, 10], th: [-12, 14], hat: null, vest: false });
    return [svg(house(40, 240, 640, 540, 280, PALE, GL) + house(760, 360, 520, 460, 240, PALE, GL, 'bnb') + house(1320, 300, 360, 520, 260, PALE, GL) + ground(Y + 4)),
      svg(ladder(420, Y, 480, 520, '#9BB8A6') + `<rect x="900" y="${Y - 120}" width="300" height="110" rx="10" fill="#fff" stroke="#9BB8A6" stroke-width="5"/><circle cx="960" cy="${Y - 6}" r="24" fill="#fff" stroke="#9BB8A6" stroke-width="6"/><circle cx="1140" cy="${Y - 6}" r="24" fill="#fff" stroke="#9BB8A6" stroke-width="6"/>` + stack(920, Y - 132, 3, 260)),
      svg(a.svg + `<path d="M${r2(a.hands[1][0] - 200)} ${r2(a.hands[1][1] + 8)}H${r2(a.hands[0][0] + 160)}" stroke="${G}" stroke-width="16" stroke-linecap="round"/><path d="M${r2(a.hands[1][0] - 200)} ${r2(a.hands[1][1] + 2)}H${r2(a.hands[0][0] + 160)}" stroke="${LIME}" stroke-width="4"/>` +
        b.svg + `<path d="M${r2(b.hands[0][0])} ${r2(b.hands[0][1] - 40)}v120" stroke="${G}" stroke-width="14" stroke-linecap="round"/>` +
        pm.svg + `<rect x="${r2(pm.hands[0][0] - 30)}" y="${r2(pm.hands[0][1] - 40)}" width="34" height="44" rx="4" fill="#fff" stroke="${G}" stroke-width="4"/><path d="M${r2(pm.hands[0][0] - 24)} ${r2(pm.hands[0][1] - 28)}h22M${r2(pm.hands[0][0] - 24)} ${r2(pm.hands[0][1] - 18)}h18" stroke="${LIME}" stroke-width="3"/>` + owner.svg)];
  }
  const SCENE_OF = { top: 0, services: 0, colours: 1, windows: 2, reviews: 2, process: 3, try: 3, area: 4, booking: 4 };

  /* ---------- WebGL ---------- */
  const cv = document.createElement('canvas'); cv.className = 'world'; cv.setAttribute('aria-hidden', 'true'); document.body.prepend(cv);
  const gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) { cv.remove(); return; }
  const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0,1);}';
  const FS = `precision mediump float;varying vec2 v;
  uniform sampler2D m,a0,a1,a2,b0,b1,b2;uniform vec2 res,ms;uniform vec3 oy,ox;uniform float mixv,cover,top;
  vec4 over(vec4 s,vec4 d){return s+d*(1.-s.a);}
  vec4 plane(sampler2D t,vec2 uv,float dx,float dy){vec2 q=vec2((uv.x*res.x-.5*res.x)/cover+.5*${PW}.,(uv.y*res.y)/cover+top)/vec2(${PW}.,${PH}.);q+=vec2(dx,dy)/(cover*vec2(${PW}.,${PH}.));
    if(q.x<0.||q.x>1.||q.y<0.||q.y>1.)return vec4(0.);return texture2D(t,q);}
  void main(){float mk=texture2D(m,v).r;float e=1./ms.x;float gx=texture2D(m,v+vec2(e,0)).r-texture2D(m,v-vec2(e,0)).r;float gy=texture2D(m,v+vec2(0,e)).r-texture2D(m,v-vec2(0,e)).r;
    vec2 uv=v-vec2(gx,gy)*.035;float r=smoothstep(.04,.62,mk);
    vec4 A=over(plane(a2,uv,ox.z,oy.z),over(plane(a1,uv,ox.y,oy.y),plane(a0,uv,ox.x,oy.x)));
    vec4 B=over(plane(b2,uv,ox.z,oy.z),over(plane(b1,uv,ox.y,oy.y),plane(b0,uv,ox.x,oy.x)));
    vec4 c=mix(A,B,mixv);float rim=smoothstep(.02,.2,mk)*(1.-smoothstep(.2,.5,mk));
    vec4 lime=vec4(vec3(.71,.86,.43)*.16*rim,.16*rim);gl_FragColor=over(c*r,lime);}`;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.remove(); return; }
  gl.useProgram(pr); const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const ap = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);
  const U = (n) => gl.getUniformLocation(pr, n);
  const tex = () => { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4)); return t; };
  const mT = tex(), slots = [[tex(), tex(), tex()], [tex(), tex(), tex()]];
  ['m', 'a0', 'a1', 'a2', 'b0', 'b1', 'b2'].forEach((n, i) => gl.uniform1i(U(n), i));
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  // scene rasteriser: SVG planes -> canvases -> textures (only two scenes resident at a time)
  const cache = {};
  function raster(i) { if (cache[i]) return cache[i]; const tw = Math.min(1800, Math.round(innerWidth * Math.min(devicePixelRatio || 1, 1.25)) + 200), th = Math.round(tw * PH / PW);
    cache[i] = Promise.all(scene(i).map((s) => new Promise((res) => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'); c.width = tw; c.height = th; c.getContext('2d').drawImage(im, 0, 0, tw, th); res(c); };
      im.onerror = () => res(null); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s); }))); return cache[i]; }
  const upload = (slot, planes) => planes.forEach((c, k) => { if (!c) return; gl.activeTexture(gl.TEXTURE1 + slot * 3 + k); gl.bindTexture(gl.TEXTURE_2D, slots[slot][k]); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c); });
  const bindAll = () => { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, mT); for (let s = 0; s < 2; s++) for (let k = 0; k < 3; k++) { gl.activeTexture(gl.TEXTURE1 + s * 3 + k); gl.bindTexture(gl.TEXTURE_2D, slots[s][k]); } };

  /* ---------- the reveal mask (CPU, low resolution, uploaded while it lives) ---------- */
  const mc = document.createElement('canvas'), mx = mc.getContext('2d');
  let W = 0, H = 0, dpr = 1, MW = 160, MH = 100;
  function size() { dpr = Math.min(devicePixelRatio || 1, 1.25); W = innerWidth; H = innerHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); gl.viewport(0, 0, cv.width, cv.height);
    MW = 160; MH = Math.max(60, Math.round(160 * H / W)); mc.width = MW; mc.height = MH; mx.fillStyle = '#000'; mx.fillRect(0, 0, MW, MH); kick(); }
  const R0 = () => (FINE ? (W < 1100 ? 200 : 260) : 150);              // S1324: 260 desktop, 140–220 compact
  function stamp(x, y, rad, a) { const X = x / W * MW, Y = y / H * MH, Rr = rad / W * MW; const gr = mx.createRadialGradient(X, Y, 0, X, Y, Rr);
    [[0, 1], [.4, 1], [.6, .75], [.75, .4], [.88, .12], [1, 0]].forEach(([o, al]) => gr.addColorStop(o, `rgba(255,255,255,${al * a})`)); mx.fillStyle = gr; mx.fillRect(X - Rr, Y - Rr, Rr * 2, Rr * 2); }

  /* ---------- state ---------- */
  const ptr = { x: -1, y: -1, ex: -1, ey: -1, lx: -1, ly: -1, on: false, last: 0 }, damp = { x: 0, y: 0, tx: 0, ty: 0 };
  let raf = 0, t0 = 0, live = 0, scrollV = 0, lastY = scrollY, mixv = 0, cur = -1, want = 0, fading = false, energy = 0;
  function sceneAt() { const yc = innerHeight / 2; let best = 0; document.querySelectorAll('main > .slot > section, .ft').forEach((s) => { const r = s.getBoundingClientRect(); if (r.top <= yc && r.bottom >= yc) { const id = s.id || (s.classList.contains('ft') ? 'booking' : 'top');
      best = SCENE_OF[id] ?? (s.classList.contains('hero') ? 0 : best); } }); return best; }
  function region() { // scroll progress through the band of the page that belongs to the current scene
    const ids = Object.keys(SCENE_OF).filter((k) => SCENE_OF[k] === cur); let a = Infinity, b = -Infinity;
    ids.forEach((id) => { const n = id === 'top' ? document.querySelector('main .hero') : document.getElementById(id); if (!n) return; const r = n.getBoundingClientRect(); a = Math.min(a, r.top + scrollY); b = Math.max(b, r.bottom + scrollY); });
    if (cur === 4) { const f = document.querySelector('.ft'); if (f) b = Math.max(b, f.getBoundingClientRect().bottom + scrollY); }
    return a === Infinity ? 0 : Math.max(0, Math.min(1, (scrollY + innerHeight / 2 - a) / Math.max(1, b - a))); }
  async function goScene(i) { if (i === want && (cur === i || fading)) return; want = i;
    const planes = await raster(i); if (want !== i) return;
    if (cur < 0) { upload(0, planes); cur = i; mixv = 0; kick(); return; }
    upload(1, planes); fading = true; const st = performance.now();
    const step = () => { const k = Math.min(1, (performance.now() - st) / 700); mixv = k * k * (3 - 2 * k); kick(); if (k < 1) requestAnimationFrame(step); else { upload(0, planes); mixv = 0; cur = i; fading = false; } }; requestAnimationFrame(step);
    // prefetch neighbours so the next cross-fade starts at once
    [i - 1, i + 1].forEach((n) => { if (n >= 0 && n < 5) raster(n); }); }

  function frame(now) { raf = 0; const dt = Math.min(1 / 30, t0 ? (now - t0) / 1000 : 1 / 60); t0 = now;
    // hide slower than show: fade the whole mask a little each frame
    const keep = Math.pow(0.972, dt * 60); mx.globalCompositeOperation = 'destination-out'; mx.fillStyle = `rgba(0,0,0,${1 - keep})`; mx.fillRect(0, 0, MW, MH); mx.globalCompositeOperation = 'lighter';
    if (FINE && ptr.on) {
      const e = 1 - Math.pow(1 - 0.1, dt * 60); if (ptr.ex < 0) { ptr.ex = ptr.x; ptr.ey = ptr.y; } ptr.ex += (ptr.x - ptr.ex) * e; ptr.ey += (ptr.y - ptr.ey) * e;
      const idle = (now - ptr.last) / 1000, pres = Math.max(0, 1 - Math.max(0, idle - 1.6) / 1.2);       // a still cursor lets the world sink back after ~2 s
      if (pres > 0) stamp(ptr.ex, ptr.ey, R0(), 0.2 * pres);
      if (ptr.lx >= 0) { const d = Math.hypot(ptr.x - ptr.lx, ptr.y - ptr.ly), n = Math.min(12, Math.floor(d / (R0() * 0.22))); for (let k = 1; k <= n; k++) stamp(ptr.lx + (ptr.x - ptr.lx) * k / n, ptr.ly + (ptr.y - ptr.ly) * k / n, R0() * 0.62, 0.16); if (n) { ptr.lx = ptr.x; ptr.ly = ptr.y; } } else { ptr.lx = ptr.x; ptr.ly = ptr.y; }
      if (pres > 0) live = now;
    }
    if (!FINE && Math.abs(scrollV) > 0.5) { const y = scrollY, px = W * (0.5 + 0.34 * Math.sin(y / 520)), py = H * (0.4 + 0.22 * Math.sin(y / 380 + 1.3)); stamp(px, py, R0() * 1.3, Math.min(0.22, Math.abs(scrollV) / 260)); live = now; }
    scrollV *= Math.pow(0.85, dt * 60);
    // damped pointer parallax target (S1330)
    const a = 1 - Math.pow(1 - 0.055, dt * 60); damp.x += (damp.tx - damp.x) * a; damp.y += (damp.ty - damp.y) * a;
    // draw
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, mT); gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, mc);
    const cover = Math.max(W / PW, (H * 1.18) / PH), slack = PH * cover - H, rp = region();
    gl.uniform2f(U('res'), W, H); gl.uniform2f(U('ms'), MW, MH); gl.uniform1f(U('cover'), cover); gl.uniform1f(U('top'), Math.max(0, slack / cover) * 0.5);
    const k = [0.35, 0.65, 1.0]; gl.uniform3f(U('oy'), ...k.map((f, j) => ((rp - 0.5) * slack * f * 0.9 + [-5, 8, 16][j] * damp.y)));
    gl.uniform3f(U('ox'), ...[-8, 10, 22].map((f) => f * damp.x)); gl.uniform1f(U('mixv'), mixv);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    const still = Math.abs(damp.tx - damp.x) + Math.abs(damp.ty - damp.y) < 0.002;
    if (now - live < 3200 || !still || fading) raf = requestAnimationFrame(frame); else { mx.globalCompositeOperation = 'source-over'; mx.fillStyle = '#000'; mx.fillRect(0, 0, MW, MH); gl.clear(gl.COLOR_BUFFER_BIT); t0 = 0; }
  }
  function kick() { if (!raf && !document.hidden) raf = requestAnimationFrame(frame); }
  addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; ptr.x = e.clientX; ptr.y = e.clientY; if (!ptr.on) { ptr.on = true; ptr.ex = ptr.x; ptr.ey = ptr.y; ptr.lx = -1; } ptr.last = performance.now();
    damp.tx = e.clientX / W * 2 - 1; damp.ty = e.clientY / H * 2 - 1; kick(); }, { passive: true });
  document.addEventListener('pointerleave', () => { ptr.on = false; ptr.lx = -1; damp.tx = damp.ty = 0; kick(); });
  addEventListener('blur', () => { ptr.on = false; ptr.lx = -1; damp.tx = damp.ty = 0; kick(); });
  addEventListener('scroll', () => { scrollV += scrollY - lastY; lastY = scrollY; const s = sceneAt(); if (s !== want) goScene(s); kick(); }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { t0 = 0; kick(); } });
  addEventListener('resize', () => { for (const k in cache) delete cache[k]; const c = cur; cur = -1; want = -1; size(); goScene(c < 0 ? sceneAt() : c); });
  size(); bindAll(); goScene(sceneAt());
  window.__world = { scene: (i) => goScene(i), poke: (x, y) => { ptr.x = x; ptr.y = y; ptr.on = true; ptr.ex = x; ptr.ey = y; ptr.lx = -1; ptr.last = performance.now(); kick(); }, svg: scene };
})();

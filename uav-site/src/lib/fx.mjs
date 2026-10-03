// Layered decorative SVG scenes (background / middle / foreground), deliberately sparse:
// one quiet element per layer. Purely decorative: aria-hidden, no meaning carried.
// Motion is CSS (always-on, paused offscreen) + GSAP depth (mouse and scroll); both are
// switched off under prefers-reduced-motion, leaving a composed still.

const rnd = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const f = (n) => Math.round(n * 10) / 10;

const layer = (cls, depth, speed, inner, vb = '0 0 1200 600') =>
  `<svg class="fx-l ${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" data-depth="${depth}" data-speed="${speed}" focusable="false">${inner}</svg>`;

/** Seamless sine contour: period 600, drifts 600 units per loop. */
function waves(ys, seed) {
  const r = rnd(seed);
  return ys.map((y, i) => {
    const a = f(22 + r() * 26) * (i % 2 ? -1 : 1), dur = f(90 + r() * 60);
    return `<g class="fx-drift" style="--dur:${dur}s;--dir:${i % 2 ? 1 : -1}"><path d="M-60 ${y} q150 ${a} 300 0 t300 0 t300 0 t300 0 t300 0" class="fx-line"/></g>`;
  }).join('');
}
const plus = (x, y, s = 9, cls = '') => `<path class="fx-plus ${cls}" d="M${x - s} ${y}H${x + s}M${x} ${y - s}V${y + s}"/>`;
const ring = (x, y, r, d) => `<circle class="fx-pulse" cx="${x}" cy="${y}" r="${r}" style="--d:${d}s"/>`;

function contours() {
  const path = 'M-20 440C170 350 280 470 440 390S700 220 880 290 1100 200 1230 120';
  const mid = `<path class="fx-flight" d="${path}" data-flight/><g class="fx-drone" data-drone-mark><path d="M-8 0h16M0 -8v16" class="fx-plus"/><circle r="3.5" class="fx-dot"/></g>`;
  return layer('fx-bg', 0.012, -0.05, waves([150, 330, 500], 7)) + layer('fx-mid', 0.03, -0.1, mid) + layer('fx-fg', 0.05, -0.16, plus(1090, 470, 10, 'fx-plus--dim'));
}

function scan() {
  let dots = '';
  for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) dots += plus(110 + i * 122 + (j % 2) * 60, 150 + j * 115, 4, 'fx-plus--dim');
  const mid = `<defs><linearGradient id="fxscan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CC9865" stop-opacity="0"/><stop offset="1" stop-color="#CC9865" stop-opacity=".2"/></linearGradient></defs><g class="fx-scan"><rect x="-20" y="40" width="1240" height="110" fill="url(#fxscan)"/><path class="fx-plus" d="M-20 150H1220"/></g>`;
  const marks = [[360, 380], [770, 262]].map(([x, y], i) => `<g class="fx-flag" style="--d:${i * 1.6}s"><rect x="${x - 15}" y="${y - 15}" width="30" height="30"/>${plus(x, y, 5)}</g>`).join('');
  return layer('fx-bg', 0.012, -0.04, dots) + layer('fx-mid', 0.03, -0.09, mid) + layer('fx-fg', 0.05, -0.16, marks);
}

function grid() {
  let bg = '';
  for (let i = -4; i <= 4; i++) bg += `<path class="fx-line" d="M${600 + i * 55} 140L${600 + i * 230} 620"/>`;
  for (let j = 0; j < 4; j++) bg += `<path class="fx-line" d="M-20 ${210 + j * j * 22 + j * 40}H1220"/>`;
  const pts = [[300, 440], [560, 380], [830, 470], [1000, 340]], base = [640, 250];
  const mid = pts.map(([x, y], i) => `<path class="fx-flight fx-flight--thin" d="M${base[0]} ${base[1]}L${x} ${y}" style="--i:${i}"/>`).join('') +
    pts.map(([x, y], i) => `<g class="fx-gcp" style="--d:${i * 0.8}s"><circle cx="${x}" cy="${y}" r="10"/>${plus(x, y, 15)}</g>`).join('') +
    `<path class="fx-tri" d="M${base[0] - 12} ${base[1] + 10}L${base[0]} ${base[1] - 14}L${base[0] + 12} ${base[1] + 10}Z"/>`;
  return layer('fx-bg', 0.012, -0.04, bg) + layer('fx-mid', 0.03, -0.09, mid) + layer('fx-fg', 0.05, -0.16, ring(base[0], base[1], 24, 0));
}

function mesh() {
  const r = rnd(11), cols = 8, rows = 4, pts = [];
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) pts.push([f(70 + i * 130 + (r() - 0.5) * 60), f(90 + j * 112 + (r() - 0.5) * 56)]);
  const at = (i, j) => pts[j * (cols + 1) + i];
  let edges = '';
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const a = at(i, j), b = at(i + 1, j), c = at(i, j + 1), d = at(i + 1, j + 1);
    edges += `M${a}L${b}L${c}ZM${b}L${d}L${c}Z`;
  }
  const bg = `<g class="fx-sway"><path class="fx-line" d="${edges.replace(/,/g, ' ')}"/></g>`;
  const mid = `<g class="fx-sway fx-sway--b">` + pts.filter((_, i) => i % 7 === 0).map(([x, y], i) => `<circle class="fx-vertex" cx="${x}" cy="${y}" r="3.5" style="--d:${i * 0.7}s"/>`).join('') + `</g>`;
  const cube = (x, y, s, d) => `<g class="fx-float" style="--d:${d}s;transform-origin:${x}px ${y}px"><path class="fx-line fx-line--strong" d="M${x} ${y - s}L${x + s * 0.87} ${y - s / 2}V${y + s / 2}L${x} ${y + s}L${x - s * 0.87} ${y + s / 2}V${y - s / 2}ZM${x - s * 0.87} ${y - s / 2}L${x} ${y}L${x + s * 0.87} ${y - s / 2}M${x} ${y}V${y + s}"/></g>`;
  return layer('fx-bg', 0.012, -0.04, bg) + layer('fx-mid', 0.03, -0.09, mid) + layer('fx-fg', 0.06, -0.18, cube(1040, 160, 32, 0));
}

function time() {
  const cx = 900, cy = 300;
  let bg = '';
  for (let i = 0; i < 3; i++) bg += `<circle class="fx-expand" cx="${cx}" cy="${cy}" r="${90 + i * 20}" style="--d:${i * 2.3}s"/>`;
  bg += `<circle class="fx-line" cx="${cx}" cy="${cy}" r="190"/><circle class="fx-line" cx="${cx}" cy="${cy}" r="320"/>`;
  let ticks = '';
  for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 2, r1 = i % 5 ? 262 : 252; ticks += `M${f(cx + Math.cos(a) * r1)} ${f(cy + Math.sin(a) * r1)}L${f(cx + Math.cos(a) * 270)} ${f(cy + Math.sin(a) * 270)}`; }
  const mid = `<g class="fx-spin" style="transform-origin:${cx}px ${cy}px"><path class="fx-line fx-line--strong" d="${ticks}"/></g>`;
  const dots = [0, 1, 2, 3, 4].map((i) => { const a = -Math.PI / 2 + i * 0.52 - 0.5; return `<circle class="fx-stage" cx="${f(cx + Math.cos(a) * 380)}" cy="${f(cy + Math.sin(a) * 380)}" r="5" style="--d:${i * 0.8}s"/>`; }).join('');
  return layer('fx-bg', 0.012, -0.04, bg) + layer('fx-mid', 0.03, -0.09, mid) + layer('fx-fg', 0.05, -0.16, dots);
}

function frame() {
  const bg = `<path class="fx-line" d="M400 0V600M800 0V600M0 200H1200M0 400H1200"/>`;
  const focus = `<g class="fx-focus"><circle cx="640" cy="300" r="44" class="fx-line fx-line--strong"/><path class="fx-line fx-line--strong" d="M640 238V258M640 342V362M578 300H598M682 300H702"/><circle cx="640" cy="300" r="3" class="fx-dot"/></g>`;
  return layer('fx-bg', 0.012, -0.04, bg) + layer('fx-mid', 0.035, -0.09, focus) + layer('fx-fg', 0.05, -0.16, `<g class="fx-brackets"><path class="fx-line fx-line--strong" d="M70 130V70H130M1070 70H1130V130M1130 470V530H1070M130 530H70V470"/></g>`);
}

const variants = { contours, scan, grid, mesh, time, frame };
export const fx = (variant = 'contours', cls = '') => `<div class="fx ${cls}" aria-hidden="true" data-fx="${variant}">${(variants[variant] || contours)()}</div>`;

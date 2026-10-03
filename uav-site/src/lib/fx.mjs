// Layered decorative SVG scenes (background / middle / foreground). Purely decorative:
// aria-hidden, no meaning carried. Motion is CSS (always-on) + GSAP depth (mouse and scroll),
// both switched off under prefers-reduced-motion by the motion layer / stylesheet.

const rnd = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const f = (n) => Math.round(n * 10) / 10;

const layer = (cls, depth, speed, inner, vb = '0 0 1200 600') =>
  `<svg class="fx-l ${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" data-depth="${depth}" data-speed="${speed}" focusable="false">${inner}</svg>`;

/** Seamless sine contour: period 600, drifts 600 units per loop. */
function waves(n, y0, y1, seed) {
  const r = rnd(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const y = f(y0 + ((y1 - y0) * i) / (n - 1));
    const a = f(18 + r() * 34) * (i % 2 ? -1 : 1);
    const dur = f(70 + r() * 70);
    out += `<g class="fx-drift" style="--dur:${dur}s;--dir:${i % 2 ? 1 : -1}"><path d="M-60 ${y} q150 ${a} 300 0 t300 0 t300 0 t300 0 t300 0" class="fx-line${i % 3 === 0 ? ' fx-line--strong' : ''}"/></g>`;
  }
  return out;
}

const plus = (x, y, s = 9, cls = '') => `<path class="fx-plus ${cls}" d="M${x - s} ${y}H${x + s}M${x} ${y - s}V${y + s}"/>`;
const ring = (x, y, r, d, cls = '') => `<circle class="fx-pulse ${cls}" cx="${x}" cy="${y}" r="${r}" style="--d:${d}s"/>`;

function contours() {
  const bg = waves(9, 70, 540, 7);
  const path = 'M-20 430C150 330 260 470 420 380S690 190 860 270 1090 180 1230 90';
  const mid = `<path class="fx-flight" d="${path}" data-flight/>` +
    [[420, 380], [860, 270], [1090, 165], [150, 360]].map(([x, y], i) => ring(x, y, 7, i * 0.9)).join('') +
    `<g class="fx-drone" data-drone-mark><path d="M-9 0h18M0 -9v18" class="fx-plus"/><circle r="4" class="fx-dot"/></g>`;
  const fg = plus(130, 120, 11) + plus(1040, 470, 11) + plus(700, 520, 8, 'fx-plus--dim') + ring(1110, 150, 16, 1.4) + ring(90, 500, 12, 2.2) +
    `<circle cx="640" cy="90" r="3" class="fx-dot"/><circle cx="260" cy="520" r="3" class="fx-dot"/><circle cx="980" cy="330" r="2.5" class="fx-dot"/>`;
  return layer('fx-bg', 0.012, -0.05, bg) + layer('fx-mid', 0.03, -0.12, mid) + layer('fx-fg', 0.06, -0.2, fg);
}

function scan() {
  let bg = '';
  for (let i = 0; i < 6; i++) {
    const k = i * 58;
    bg += `<path class="fx-line${i % 2 ? '' : ' fx-line--strong'}" d="M${130 + k} 560L600 ${120 + k * 0.78}L${1070 - k} 560" style="--i:${i}"/>`;
  }
  const mid = `<rect class="fx-scan" x="-20" y="60" width="1240" height="90" rx="0"/><path class="fx-line" d="M-20 560H1220" style="opacity:.5"/>`;
  const marks = [[330, 400], [610, 300], [820, 440], [500, 470]].map(([x, y], i) => `<g class="fx-flag" style="--d:${i * 0.8}s"><rect x="${x - 14}" y="${y - 14}" width="28" height="28"/>${plus(x, y, 5)}</g>`).join('');
  return layer('fx-bg', 0.012, -0.05, bg) + layer('fx-mid', 0.03, -0.1, mid) + layer('fx-fg', 0.06, -0.2, marks);
}

function grid() {
  let bg = '';
  for (let i = -6; i <= 6; i++) bg += `<path class="fx-line" d="M${600 + i * 40} 120L${600 + i * 190} 620"/>`;
  for (let j = 0; j < 7; j++) bg += `<path class="fx-line" d="M${-20 - j * 6} ${160 + j * j * 14 + j * 28}H${1220 + j * 6}"/>`;
  const pts = [[260, 420], [520, 360], [760, 470], [980, 330], [420, 520], [900, 540]];
  const base = [610, 250];
  const mid = pts.map(([x, y], i) => `<path class="fx-flight fx-flight--thin" d="M${base[0]} ${base[1]}L${x} ${y}" style="--i:${i}"/>`).join('') +
    pts.map(([x, y], i) => `<g class="fx-gcp" style="--d:${i * 0.5}s"><circle cx="${x}" cy="${y}" r="11"/>${plus(x, y, 17)}</g>`).join('') +
    `<path class="fx-tri" d="M${base[0] - 12} ${base[1] + 10}L${base[0]} ${base[1] - 14}L${base[0] + 12} ${base[1] + 10}Z"/>`;
  const fg = ring(base[0], base[1], 26, 0) + ring(base[0], base[1], 26, 1.2) + plus(90, 110, 11) + plus(1110, 500, 11);
  return layer('fx-bg', 0.012, -0.04, bg) + layer('fx-mid', 0.03, -0.1, mid) + layer('fx-fg', 0.06, -0.2, fg);
}

function mesh() {
  const r = rnd(11), cols = 11, rows = 6, pts = [];
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) pts.push([f(60 + i * 108 + (r() - 0.5) * 54), f(60 + j * 96 + (r() - 0.5) * 50)]);
  const at = (i, j) => pts[j * (cols + 1) + i];
  let edges = '';
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const a = at(i, j), b = at(i + 1, j), c = at(i, j + 1), d = at(i + 1, j + 1);
    edges += `M${a}L${b}L${c}ZM${b}L${d}L${c}Z`;
  }
  const bg = `<g class="fx-sway"><path class="fx-line" d="${edges.replace(/,/g, ' ')}"/></g>`;
  const mid = `<g class="fx-sway fx-sway--b">` + pts.filter((_, i) => i % 5 === 0).map(([x, y], i) => `<circle class="fx-vertex" cx="${x}" cy="${y}" r="3.5" style="--d:${(i % 6) * 0.45}s"/>`).join('') + `</g>`;
  const cube = (x, y, s, d) => `<g class="fx-float" style="--d:${d}s;transform-origin:${x}px ${y}px"><path class="fx-line fx-line--strong" d="M${x} ${y - s}L${x + s * 0.87} ${y - s / 2}V${y + s / 2}L${x} ${y + s}L${x - s * 0.87} ${y + s / 2}V${y - s / 2}ZM${x - s * 0.87} ${y - s / 2}L${x} ${y}L${x + s * 0.87} ${y - s / 2}M${x} ${y}V${y + s}"/></g>`;
  return layer('fx-bg', 0.012, -0.05, bg) + layer('fx-mid', 0.03, -0.1, mid) + layer('fx-fg', 0.07, -0.22, cube(1030, 150, 34, 0) + cube(160, 470, 24, 1.6) + cube(760, 520, 18, 0.8));
}

function time() {
  const cx = 880, cy = 300;
  let bg = '';
  for (let i = 0; i < 6; i++) bg += `<circle class="fx-expand" cx="${cx}" cy="${cy}" r="${70 + i * 18}" style="--d:${i * 1.15}s"/>`;
  for (let i = 0; i < 4; i++) bg += `<circle class="fx-line${i === 1 ? ' fx-line--strong' : ''}" cx="${cx}" cy="${cy}" r="${150 + i * 105}"/>`;
  let ticks = '';
  for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 2, r1 = i % 5 ? 272 : 262; ticks += `M${f(cx + Math.cos(a) * r1)} ${f(cy + Math.sin(a) * r1)}L${f(cx + Math.cos(a) * 282)} ${f(cy + Math.sin(a) * 282)}`; }
  const mid = `<g class="fx-spin" style="transform-origin:${cx}px ${cy}px"><path class="fx-line fx-line--strong" d="${ticks}"/></g>`;
  const dots = [0, 1, 2, 3, 4].map((i) => { const a = -Math.PI / 2 + i * 0.52 - 0.5; return `<circle class="fx-stage" cx="${f(cx + Math.cos(a) * 390)}" cy="${f(cy + Math.sin(a) * 390)}" r="6" style="--d:${i * 0.7}s"/>`; }).join('');
  return layer('fx-bg', 0.012, -0.04, bg) + layer('fx-mid', 0.03, -0.1, mid) + layer('fx-fg', 0.06, -0.2, dots + plus(110, 130, 11) + plus(560, 540, 9));
}

function frame() {
  const bg = `<path class="fx-line" d="M400 0V600M800 0V600M0 200H1200M0 400H1200"/>` + `<g class="fx-brackets"><path class="fx-line fx-line--strong" d="M70 130V70H130M1070 70H1130V130M1130 470V530H1070M130 530H70V470"/></g>`;
  const focus = `<g class="fx-focus"><circle cx="600" cy="300" r="46" class="fx-line fx-line--strong"/><path class="fx-line fx-line--strong" d="M600 236V256M600 344V364M536 300H556M644 300H664"/><circle cx="600" cy="300" r="3" class="fx-dot"/></g>`;
  return layer('fx-bg', 0.012, -0.04, bg) + layer('fx-mid', 0.035, -0.1, focus) + layer('fx-fg', 0.06, -0.2, plus(1020, 140, 11) + ring(190, 450, 14, 1) + plus(980, 480, 8, 'fx-plus--dim'));
}

const variants = { contours, scan, grid, mesh, time, frame };
export const fx = (variant = 'contours', cls = '') => `<div class="fx ${cls}" aria-hidden="true" data-fx="${variant}">${(variants[variant] || contours)()}</div>`;

import { site, services, img, arrow, faqSection, cta, serviceLd, crumbLd, faqLd } from '../lib/site.mjs';
import { phero, btn, related, iconCards, secHead } from '../lib/blocks.mjs';

const s = services[2];
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: '3D modelling', path: s.path }];

/* ----- isometric "capture -> georeference -> model" graphic, generated so the geometry is exact ----- */
function isoSvg() {
  const W = 180, H = 90, cx = 230;
  const P = (cy, u, v, h = 0) => [cx + (u - v) * W, cy + (u + v - 1) * H - h];
  const pt = (a) => a.map((n) => n.toFixed(1)).join(',');
  const poly = (cy, pts, h = 0) => pts.map(([u, v]) => pt(P(cy, u, v, h))).join(' ');
  const base = (cy) => poly(cy, [[0, 0], [1, 0], [1, 1], [0, 1]]);
  const grid = (cy, n) => {
    let d = '';
    for (let i = 1; i < n; i++) {
      const t = i / n;
      d += `M${pt(P(cy, t, 0))}L${pt(P(cy, t, 1))}M${pt(P(cy, 0, t))}L${pt(P(cy, 1, t))}`;
    }
    return d;
  };
  const c1 = 100, c2 = 235, c3 = 370;
  // layer 1: flight grid + dashed path
  const path1 = [[.12, .1], [.12, .9], [.3, .9], [.3, .1], [.5, .1], [.5, .9], [.7, .9], [.7, .1], [.88, .1], [.88, .9]].map(([u, v]) => pt(P(c1, u, v))).join(' L');
  // layer 2: photographic ground with building footprints
  const blocks = [[.12, .15, .22, .28], [.42, .1, .18, .3], [.68, .18, .2, .22], [.14, .6, .26, .26], [.52, .58, .3, .28]];
  const foot = (cy, b, h, fill, stroke) => {
    const [u, v, du, dv] = b;
    const top = [[u, v], [u + du, v], [u + du, v + dv], [u, v + dv]];
    const left = [[u, v + dv], [u + du, v + dv]];
    const lf = `${pt(P(cy, u, v + dv))} ${pt(P(cy, u + du, v + dv))} ${pt(P(cy, u + du, v + dv, h))} ${pt(P(cy, u, v + dv, h))}`;
    const rf = `${pt(P(cy, u + du, v))} ${pt(P(cy, u + du, v + dv))} ${pt(P(cy, u + du, v + dv, h))} ${pt(P(cy, u + du, v, h))}`;
    return (h ? `<polygon points="${lf}" fill="#d8cbb7" stroke="#CC9865" stroke-width=".8"/><polygon points="${rf}" fill="#b8a487" stroke="#CC9865" stroke-width=".8"/>` : '') + `<polygon points="${poly(cy, top, h)}" fill="${fill}" stroke="${stroke}" stroke-width=".9"/>`;
  };
  const l2 = blocks.map((b, i) => foot(c2, b, 0, ['#e5dfd2', '#d9d2c3', '#ece6da', '#dfd8c9', '#e2dccf'][i], '#a99a82')).join('');
  const l3 = blocks.map((b, i) => foot(c3, b, [26, 40, 20, 32, 48][i], '#f7f3ea', '#CC9865')).join('');
  const dash = (a, b) => `<line class="p-dash" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
  const corners = (cy) => [P(cy, 0, 1), P(cy, 1, 0), P(cy, 1, 1)];
  const k1 = corners(c1), k2 = corners(c2), k3 = corners(c3);
  const links = [0, 1, 2].map((i) => dash(k1[i], k2[i]) + dash(k2[i], k3[i])).join('');
  const lab = (cy, text) => `<text class="label" x="${P(cy, 1, 0)[0] + 16}" y="${P(cy, 1, 0)[1] + 4}">${text}</text>`;
  return `<svg class="iso" viewBox="0 0 640 470" role="img" aria-labelledby="iso-t"><title id="iso-t">Three stacked layers: aerial capture, georeferenced imagery, and the finished 3D model</title>
<g aria-hidden="true">${links}
<g class="iso-layer l3"><polygon points="${base(c3)}" fill="#ece5d8" stroke="#CC9865" stroke-width="1.2"/>${l3}</g>
<g class="iso-layer l2"><polygon points="${base(c2)}" fill="#e8e1d3" stroke="#CC9865" stroke-width="1.2"/>${l2}<path d="${grid(c2, 8)}" stroke="#fff" stroke-opacity=".55" stroke-width=".7" fill="none"/></g>
<g class="iso-layer l1"><polygon points="${base(c1)}" fill="rgba(255,255,255,.72)" stroke="#CC9865" stroke-width="1.2"/><path d="${grid(c1, 6)}" stroke="#CC9865" stroke-opacity=".5" stroke-width=".8" fill="none"/><path d="M${path1}" class="p-dash" style="stroke-opacity:.95"/>${[[.12, .1], [.88, .9]].map(([u, v]) => `<circle cx="${P(c1, u, v)[0].toFixed(1)}" cy="${P(c1, u, v)[1].toFixed(1)}" r="3.4" fill="#8F6244"/>`).join('')}</g>
${lab(c1, 'AERIAL CAPTURE')}${lab(c2, 'GEOREFERENCED')}${lab(c3, '3D MODEL')}</g></svg>`;
}

/* ----- procedural mesh overlay (seeded so builds are identical) ----- */
function meshPath() {
  let seed = 11; const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const cols = 15, rows = 11, pts = [];
  for (let r = 0; r <= rows; r++) { pts[r] = []; for (let c = 0; c <= cols; c++) { const j = (r === 0 || c === 0 || r === rows || c === cols) ? 0 : 1; pts[r][c] = [(c / cols) * 100 + (rnd() - .5) * 4.2 * j, (r / rows) * 75 + (rnd() - .5) * 4.2 * j]; } }
  let d = ''; const f = (p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1);
  for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
    if (c < cols) d += `M${f(pts[r][c])}L${f(pts[r][c + 1])}`;
    if (r < rows) d += `M${f(pts[r][c])}L${f(pts[r + 1][c])}`;
    if (r < rows && c < cols) d += `M${f(pts[r][c])}L${f(pts[r + 1][c + 1])}`;
  }
  return d;
}

const faqs = [
  { q: 'What can a 3D model be used for?', a: 'Our georeferenced 3D models support measurements and calculations, remote inspection and CAD/BIM-related workflows. The exact output is agreed for your project before capture.' },
  { q: 'Is a 3D model the same as an aerial survey?', a: 'They overlap. A model represents a structure or area in 3D; an aerial survey covers a wider site, from construction sites to farmland. We will recommend which suits your brief.' },
  { q: 'What should I tell you about the model I need?', a: 'The site, what the model needs to help you inspect or measure, and how you plan to use it. You do not need to choose a technical method first.' }
];

export default function page() {
  const hero = phero({
    items: crumbs,
    kicker: 'Drone service &middot; 3D modelling',
    title: 'Turn aerial capture into a model you can inspect remotely.',
    lead: 'Interactive, georeferenced 3D models of roofs, buildings and sites, for remote inspection, measurement and CAD/BIM-related work.',
    actions: btn('/contact/?service=3d-modelling', 'Request a 3D modelling quote') + btn('#model', 'What a model is for', 'ghost'),
    media: isoSvg()
  });

  const body = `${hero}

<section class="sec sec--paper" id="model" aria-labelledby="mod-h"><span class="seam"></span><div class="wrap split split--wide-media">
<div data-reveal>
<div class="mesh bracket bracket--light" data-mesh>${img('3d-model', { pos: '50% 50%' })}
<div class="mesh-over" aria-hidden="true"><svg viewBox="0 0 100 75" preserveAspectRatio="none"><path d="${meshPath()}"/></svg></div>
<div class="mesh-line" aria-hidden="true"></div>
<div class="mesh-labels" aria-hidden="true"><span>Photograph</span><span>3D mesh</span></div>
<input type="range" min="0" max="100" value="50" aria-label="Drag to compare the photograph with a 3D mesh overlay"></div>
<p class="cap">Drag to compare. Illustrative mesh overlay on a stock aerial photograph.</p>
</div>
<div data-reveal style="--d:100ms">
<p class="kicker">From photographs to model</p>
<h2 class="h2" id="mod-h">A model you can measure, inspect and share.</h2>
<div class="prose"><p>Overlapping aerial photographs of a roof, building or site are processed into a 3D representation. Because the model is georeferenced, it supports measurements and calculations, and lets you inspect a structure remotely.</p><p>For larger areas we also capture full aerial surveys, from construction sites to farmland.</p></div>
<div class="btn-row" style="margin-top:32px">${btn('/contact/?service=3d-modelling', 'Discuss a model')}</div>
</div>
</div></section>

<section class="sec sec--dark" id="uses" aria-labelledby="use-h"><span class="seam"></span><div class="wrap">
${secHead('What a model is for', 'Answers you can get without going back to site.', 'The same model serves several teams, so agree its purpose before capture.', 'use-h')}
${iconCards([
  { icon: 'eye', title: 'Remote inspection', text: 'Review a structure or site from any angle without another visit.' },
  { icon: 'ruler', title: 'Measurement and calculations', text: 'Take dimensions and run calculations from a georeferenced model.' },
  { icon: 'build', title: 'CAD and BIM-related use', text: 'Digitised models can feed CAD and BIM workflows.' },
  { icon: 'layers', title: 'Project record', text: 'A detailed record of how a structure or site stood on the day.' }
], { dark: true })}
</div></section>

<section class="sec sec--warm" id="brief" aria-labelledby="brief-h"><span class="seam"></span><div class="wrap split split--top">
<div data-reveal><p class="kicker">Agree before capture</p><h2 class="h2" id="brief-h">Four questions that shape the model.</h2><div class="prose"><p>Answering these first keeps the flight focused and the output useful.</p></div></div>
<dl class="spec" data-reveal style="--d:80ms"><div><dt>Purpose</dt><dd>What must the model help you inspect, measure or communicate?</dd></div><div><dt>Coverage</dt><dd>Which structure, roof or site area needs to be represented?</dd></div><div><dt>Output</dt><dd>What format or downstream workflow do you expect?</dd></div><div><dt>Accuracy</dt><dd>Is there a positional or measurement requirement to agree?</dd></div></dl>
</div></section>

${faqSection({ id: 'faq', title: '3D modelling questions, answered.', lead: 'If you know the site and what the model must do, that is enough to start.', items: faqs, bg: 'paper' })}

${related('3d-modelling', ['rtk-mapping', 'roof-inspections', 'aerial-monitoring'], { title: 'Pair a model with another view.', lead: 'A current map or a roof inspection can sit alongside a model when the brief needs both.' })}

${cta({ title: 'Need a 3D view of a site or structure?', text: 'Tell us the site and what the model needs to help you with. We will reply with a free quote.', query: '3d-modelling' })}`;

  return {
    path: s.path,
    title: '3D modelling and aerial surveys in Cheshire | UAV Aerial Solutions',
    description: 'Interactive, georeferenced 3D models and aerial surveys for remote inspection, measurement and CAD/BIM-related work. UAV Aerial Solutions, Macclesfield, Cheshire.',
    jsonld: [serviceLd(s, 'Interactive, georeferenced 3D models and wider aerial surveys for remote inspection, measurement and CAD/BIM-related workflows.'), crumbLd(crumbs), faqLd(faqs)],
    body
  };
}

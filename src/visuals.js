/* ==========================================================================
   VISUALS
   One builder per diagram type. Each returns a DOM node and marks the pieces
   it wants animated with .rv so the slide timeline can stagger them in.
   Nothing here invents a number: where the report only has a word
   ("medium", "very low"), the diagram shows a word.
   ========================================================================== */

function el(tag, props, kids) {
  const n = document.createElement(tag);
  if (props) for (const k in props) {
    if (k === 'class') n.className = props[k];
    else if (k === 'html') n.innerHTML = props[k];
    else if (k === 'text') n.textContent = props[k];
    else if (k === 'style') n.setAttribute('style', props[k]);
    else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), props[k]);
    else if (props[k] !== null && props[k] !== undefined) n.setAttribute(k, props[k]);
  }
  if (kids) (Array.isArray(kids) ? kids : [kids]).forEach((c) => {
    if (c === null || c === undefined || c === false) return;
    n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return n;
}

function svg(tag, props, kids) {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (props) for (const k in props) if (props[k] !== null && props[k] !== undefined) n.setAttribute(k, props[k]);
  if (kids) (Array.isArray(kids) ? kids : [kids]).forEach((c) => n.appendChild(c));
  return n;
}

const card = (kids, cls) => el('div', { class: 'vcard ' + (cls || '') }, kids);
const vtitle = (t) => el('p', { class: 'vtitle rv', text: t });

const VIS = {};

/* ------------------------------------------------------------ photography */

VIS.photo = function (v) {
  const name = Media.pick.apply(null, [].concat(v.src, v.alt || []));
  return card(
    el('figure', { class: 'photo rv' }, [
      el('img', { src: Media.src(name), alt: v.caption || '', loading: 'eager', decoding: 'async' }),
      v.caption ? el('figcaption', { text: v.caption }) : null,
    ]),
    'bare'
  );
};

VIS.video = function (v) {
  const url = Media.video(v.src);
  if (!url) return VIS.photo({ src: v.poster, caption: v.caption });
  const vid = el('video', {
    src: url, poster: v.poster ? Media.src(v.poster) : null,
    muted: 'muted', loop: 'loop', playsinline: 'playsinline', autoplay: 'autoplay', preload: 'auto',
  });
  vid.muted = true;
  return card(
    el('figure', { class: 'photo rv', style: 'text-align:center' }, [
      el('div', { class: 'phoneframe' }, vid),
      v.caption ? el('figcaption', { text: v.caption }) : null,
    ]),
    'bare'
  );
};

VIS.team = function () {
  const wrap = el('div', { class: 'teamwrap' }, [
    el('figure', { class: 'photo rv', style: 'margin:0' }, [
      el('img', { src: Media.src('team-group'), alt: 'Group NEXIX at PizzaBurg head office' }),
    ]),
    el('ul', { class: 'teamlist' }, PRESENTERS.map((p, i) =>
      el('li', { class: 'rv' }, [
        el('span', { class: 'tn', text: p.name }),
        el('span', { class: 'ti', text: p.id }),
      ])
    )),
  ]);
  return card(wrap, 'bare');
};

/* ------------------------------------------------------------- block A --- */

VIS.objectives = function () {
  return card([
    vtitle('What we set out to find'),
    el('ol', { class: 'objlist' }, OBJECTIVES.map((o, i) =>
      el('li', { class: 'rv' }, [el('i', { text: String(i + 1).padStart(2, '0') }), el('span', { text: o })])
    )),
  ]);
};

VIS.timeline = function () {
  const max = 22;
  return card([
    vtitle('Growth · 2018 to 2026'),
    el('div', { class: 'tl' }, TIMELINE.map((t) =>
      el('div', { class: 'tlrow rv' }, [
        el('div', { class: 'tlwhen', text: t.when }),
        el('div', { class: 'tlbar' }, el('i', { style: '--w:' + (t.n / max * 100) + '%' })),
        el('div', { class: 'tln', text: t.n + (t.n === 1 ? ' shop' : ' shops') }),
        el('div', { class: 'tlwhat', text: t.what }),
      ])
    )),
  ]);
};

VIS.scope = function () {
  const col = (title, items, cls) => el('div', { class: 'scopecol ' + cls }, [
    el('h4', { class: 'rv', text: title }),
    el('ul', {}, items.map((i) => el('li', { class: 'rv', text: i }))),
  ]);
  return card(el('div', { class: 'scopegrid' }, [
    col('Inside the study', SCOPE.inside, 'in'),
    col('Outside it', SCOPE.outside, 'out'),
  ]));
};

/* ------------------------------------------------------------- block B --- */

VIS.verify = function () {
  return card([
    vtitle('His answers against outside sources'),
    el('div', { class: 'rowlist' }, VERIFY_ROWS.map((r) =>
      el('div', { class: 'row rv vrow' }, [
        el('div', { class: 'lbl', text: r.point }),
        el('div', { class: 'val', text: r.said }),
        el('div', { class: 'val dim', text: r.source }),
        el('span', { class: 'tag match', text: r.result }),
      ])
    )),
    el('p', { class: 'vfoot rv', text: 'The outlet number is the useful one. It is exact, it is checkable, and nobody guesses 22 by accident.' }),
  ]);
};

VIS.units = function () {
  const grid = el('div', { class: 'unitgrid' });
  for (let i = 0; i < 22; i++) grid.appendChild(el('span', { class: 'unit rv' }));
  return card([
    vtitle('22 outlets · one fixed headcount each'),
    grid,
    el('div', { class: 'unitkey rv' }, [
      el('span', {}, [el('i', { class: 'k1' }), '12 in Dhaka — a shop can borrow a cook']),
      el('span', {}, [el('i', { class: 'k2' }), '10 elsewhere — nobody nearby to borrow from']),
    ]),
  ]);
};

VIS.tradeoff = function () {
  return card([
    el('div', { class: 'tohead rv' }, [
      el('span', { text: '' }),
      el('span', { class: 'gain', text: 'What it buys' }),
      el('span', { class: 'give', text: 'What it costs' }),
    ]),
    el('div', { class: 'rowlist' }, TRADEOFF_ROWS.map((r) =>
      el('div', { class: 'row rv torow' }, [
        el('div', { class: 'lbl', text: r.area }),
        el('div', { class: 'val gain', text: r.gain }),
        el('div', { class: 'val give', text: r.give }),
      ])
    )),
  ]);
};

VIS.drift = function () {
  const W = 520, H = 210;
  const need = [];
  const fixed = [];
  for (let i = 0; i <= 48; i++) {
    const x = 40 + (i / 48) * (W - 70);
    const t = i / 48;
    need.push([x, H - 40 - (28 + t * 74 + Math.sin(t * 7) * 12)]);
    fixed.push([x, H - 40 - 52]);
  }
  const path = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const s = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'driftsvg rv', preserveAspectRatio: 'xMidYMid meet' }, [
    svg('line', { x1: 40, y1: H - 40, x2: W - 26, y2: H - 40, stroke: '#ddd0bd', 'stroke-width': 1.5 }),
    svg('line', { x1: 40, y1: 18, x2: 40, y2: H - 40, stroke: '#ddd0bd', 'stroke-width': 1.5 }),
    svg('path', { d: path(need), fill: 'none', stroke: '#e23b2e', 'stroke-width': 2.6, 'stroke-linecap': 'round', class: 'draw' }),
    svg('path', { d: path(fixed), fill: 'none', stroke: '#6b615a', 'stroke-width': 2.2, 'stroke-dasharray': '7 5', 'stroke-linecap': 'round', class: 'draw' }),
    svg('text', { x: W - 30, y: 34, 'text-anchor': 'end', class: 'dlab red' }, [document.createTextNode('what the shop needs')]),
    svg('text', { x: W - 30, y: H - 52, 'text-anchor': 'end', class: 'dlab' }, [document.createTextNode('the number set on opening day')]),
    svg('text', { x: 40, y: H - 18, class: 'dax' }, [document.createTextNode('opening day')]),
    svg('text', { x: W - 26, y: H - 18, 'text-anchor': 'end', class: 'dax' }, [document.createTextNode('today')]),
  ]);
  return card([
    vtitle('The gap nobody is measuring'),
    s,
    el('p', { class: 'vfoot rv', text: 'Illustrative. The report has no outlet-level demand figures — that is precisely the point.' }),
  ]);
};

/* ------------------------------------------------------------- block C --- */

VIS.funnel = function () {
  return card([
    vtitle('The hiring process, one day end to end'),
    el('div', { class: 'steps' }, HIRING_STEPS.map((s, i) =>
      el('div', { class: 'step rv s-' + s.status }, [
        el('span', { class: 'sn', text: String(i + 1) }),
        el('div', {}, [
          el('div', { class: 'st' }, [el('b', { text: s.step }), el('span', { class: 'tag ' + s.status, text: s.status === 'best' ? 'strongest' : s.status === 'weak' ? 'weak point' : s.status === 'unknown' ? 'not described' : 'sound' })]),
          el('div', { class: 'sw', text: s.what }),
          el('div', { class: 'sc', text: s.note }),
        ]),
      ])
    )),
  ]);
};

VIS.worktest = function () {
  const rows = [
    { n: 'Watch them do the job', w: 3, note: 'A cook cooks. You see speed, heat, order, hygiene.' },
    { n: 'Ask about past experience', w: 2, note: 'Job related, but past work does not prove present skill.' },
    { n: 'Read the certificate', w: 1, note: 'Cheapest to check, and the weakest signal of all.' },
  ];
  return card([
    vtitle('How well each method predicts the work'),
    el('div', { class: 'wt' }, rows.map((r) =>
      el('div', { class: 'wtrow rv' }, [
        el('div', { class: 'wtn', text: r.n }),
        el('div', { class: 'wtbars' }, [0, 1, 2].map((i) => el('i', { class: i < r.w ? 'on' : '' }))),
        el('div', { class: 'wtc', text: r.note }),
      ])
    )),
    el('p', { class: 'vfoot rv', text: 'Ordinal, not measured. Work samples out-predict interviews and credentials for hands-on jobs.' }),
  ]);
};

VIS.leak = function () {
  return card([
    vtitle('Where the value drains out'),
    el('div', { class: 'leak' }, [
      el('div', { class: 'lkrow rv ok' }, [el('b', { text: 'The test is right' }), el('span', { text: 'It is the real task, judged as it happens.' })]),
      el('div', { class: 'lkarrow rv', html: '&#8595;' }),
      el('div', { class: 'lkrow rv bad' }, [el('b', { text: 'The marking is not' }), el('span', { text: 'No scoring sheet was described to us.' })]),
      el('div', { class: 'lkarrow rv', html: '&#8595;' }),
      el('div', { class: 'lkout' }, [
        el('div', { class: 'lkbox rv' }, [el('b', { text: 'Manager A' }), el('span', { text: 'hires the confident one' })]),
        el('div', { class: 'lkbox rv' }, [el('b', { text: 'Manager B' }), el('span', { text: 'hires the careful one' })]),
        el('div', { class: 'lkbox rv' }, [el('b', { text: 'Manager A, short-staffed' }), el('span', { text: 'hires whoever turned up' })]),
      ]),
      el('div', { class: 'lkfix rv' }, [el('b', { text: 'The fix costs one page.' }), el('span', { text: 'Tasks, what to look for, a score out of five, and the minimum that gets an offer.' })]),
    ]),
  ]);
};

VIS.rings = function () {
  const S = 300, c = S / 2;
  const ring = (r, cls, dash) => svg('circle', { cx: c, cy: c, r: r, fill: 'none', 'stroke-width': 10, class: cls, 'stroke-dasharray': dash });
  const dots = (r, n, cls) => {
    const g = svg('g', { class: cls });
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      g.appendChild(svg('circle', { cx: c + Math.cos(a) * r, cy: c + Math.sin(a) * r, r: 5.2 }));
    }
    return g;
  };
  const s = svg('svg', { viewBox: `0 0 ${S} ${S}`, class: 'ringsvg rv' }, [
    ring(118, 'rtrack'), ring(74, 'rtrack'),
    dots(118, 20, 'rfloor spin-slowish'),
    dots(74, 8, 'roffice spin-crawl'),
  ]);
  return card([
    el('div', { class: 'ringwrap' }, [
      s,
      el('div', { class: 'ringkey' }, [
        el('div', { class: 'rk rv' }, [el('i', { class: 'office' }), el('b', { text: 'Office staff' }), el('span', { class: 'lvl low', text: 'very low' }), el('em', { text: 'Fewer similar jobs nearby. They know the company’s way. A growing chain offers promotion.' })]),
        el('div', { class: 'rk rv' }, [el('i', { class: 'floor' }), el('b', { text: 'Floor and kitchen' }), el('span', { class: 'lvl med', text: 'medium' }), el('em', { text: 'Another employer within walking distance. Hard hours. Many are students.' })]),
      ]),
    ]),
    el('p', { class: 'vfoot rv', text: 'His words, not a measurement. The report has no turnover percentages — and that is one of its findings.' }),
  ]);
};

VIS.days60 = function () {
  return card([
    vtitle('How the 60 days could be used'),
    el('div', { class: 'd60' }, NOTICE_STAGES.map((s, i) =>
      el('div', { class: 'd60row rv' }, [
        el('span', { class: 'd60d', text: 'Day ' + s.day }),
        el('span', { class: 'd60dot' }),
        el('div', {}, [el('b', { text: s.title }), el('span', { text: s.body })]),
      ])
    )),
    el('p', { class: 'vfoot rv', text: 'The overlap and the exit interview are our recommendation, not current practice.' }),
  ]);
};

/* ------------------------------------------------------------- block D --- */

const WICON = {
  roof: 'M4 13 L14 5 L24 13 M7 12 v10 h14 v-10',
  bowl: 'M4 12 h20 a10 10 0 0 1 -20 0 Z M14 12 v-6',
  cross: 'M11 4 h6 v7 h7 v6 h-7 v7 h-6 v-7 h-7 v-6 h7 Z',
  cradle: 'M5 15 a9 9 0 0 1 18 0 M3 17 h22 M8 21 l2 3 M20 21 l-2 3',
};

VIS.welfare = function () {
  return card(el('div', { class: 'welgrid' }, WELFARE_ITEMS.map((w) =>
    el('div', { class: 'wel rv' }, [
      svg('svg', { viewBox: '0 0 28 28', class: 'welic' }, [svg('path', { d: WICON[w.icon], fill: 'none', stroke: 'currentColor', 'stroke-width': 1.9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })]),
      el('b', { text: w.name }),
      el('div', { class: 'wl' }, [el('span', { class: 'wtag', text: 'for the worker' }), el('span', { text: w.worker })]),
      el('div', { class: 'wl' }, [el('span', { class: 'wtag co', text: 'for the company' }), el('span', { text: w.company })]),
    ])
  )));
};

VIS.ladder = function () {
  return card([
    vtitle('A promotion path — two steps exist, two do not'),
    el('div', { class: 'ladder' }, LADDER_STEPS.map((s, i) =>
      el('div', { class: 'lstep rv ' + s.state, style: '--h:' + (28 + i * 26) + 'px' }, [
        el('span', { class: 'lname', text: s.name }),
        el('span', { class: 'ltag', text: s.state === 'now' ? 'exists' : 'proposed' }),
      ])
    )),
    el('p', { class: 'vfoot rv', text: 'Herzberg: housing and meals remove complaints. Only a visible way up creates drive.' }),
  ]);
};

VIS.cadence = function () {
  const bar = (label, n, cls, note) => el('div', { class: 'cad rv ' + cls }, [
    el('div', { class: 'cadl' }, [el('b', { text: label }), el('span', { text: note })]),
    el('div', { class: 'cadticks' }, Array.from({ length: 12 }, (_, i) => el('i', { class: i < n || n === 12 ? 'on' : '' }))),
  ]);
  return card([
    vtitle('Reviews in a year'),
    bar('PizzaBurg', 12, 'good', 'Every month. Feedback lands while the shift is still remembered.'),
    bar('Most firms this size', 1, 'meh', 'Once a year. By then nobody can remember the shift in question.'),
    bar('Much of the restaurant trade', 0, 'bad', 'Floor staff are often never formally reviewed at all.'),
  ]);
};

VIS.unanswered = function () {
  return card([
    el('div', { class: 'qgrid' }, [
      el('div', { class: 'q rv' }, [
        el('span', { class: 'qm', text: '?' }),
        el('b', { text: 'What is actually measured' }),
        el('span', { text: 'Nothing suggested a fixed list. A general impression twelve times a year is more frequent guesswork, not more accuracy.' }),
      ]),
      el('div', { class: 'q rv' }, [
        el('span', { class: 'qm', text: '?' }),
        el('b', { text: 'Is any of it written down' }),
        el('span', { text: 'Without a record you cannot compare two months, prove a pattern of poor work, or tell whether training helped.' }),
      ]),
    ]),
    el('p', { class: 'vfoot rv', text: 'Nobody told us forms do not exist. Nobody mentioned them either.' }),
  ]);
};

VIS.loopviz = function () {
  const S = 300, c = S / 2, R = 100;
  const nodes = [
    { a: -90, t: 'Monthly check' }, { a: 0, t: 'Gap found' },
    { a: 90, t: 'Training given' }, { a: 180, t: 'Next check' },
  ];
  const kids = [
    svg('circle', { cx: c, cy: c, r: R, fill: 'none', stroke: '#ddd0bd', 'stroke-width': 12 }),
    svg('circle', { cx: c, cy: c, r: R, fill: 'none', stroke: '#e23b2e', 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-dasharray': (2 * Math.PI * R * 0.80) + ' ' + (2 * Math.PI * R), transform: `rotate(-96 ${c} ${c})`, class: 'loopdash' }),
  ];
  nodes.forEach((n) => {
    const a = n.a * Math.PI / 180;
    kids.push(svg('circle', { cx: c + Math.cos(a) * R, cy: c + Math.sin(a) * R, r: 9, class: 'lnode' }));
  });
  const s = svg('svg', { viewBox: `0 0 ${S} ${S}`, class: 'loopsvg rv' }, kids);
  return card([
    el('div', { class: 'loopwrap' }, [
      s,
      el('ol', { class: 'looplist' }, [
        el('li', { class: 'rv' }, [el('b', { text: 'Monthly check' }), el('span', { text: 'happens anyway — no extra cost' })]),
        el('li', { class: 'rv' }, [el('b', { text: 'It finds the gap' }), el('span', { text: 'the step most companies skip entirely' })]),
        el('li', { class: 'rv' }, [el('b', { text: 'Training is given' }), el('span', { text: 'aimed at a real weakness, not a budget' })]),
        el('li', { class: 'rv' }, [el('b', { text: 'Next check tests it' }), el('span', { text: 'the loop proves its own worth' })]),
        el('li', { class: 'rv gap' }, [el('b', { text: 'The break' }), el('span', { text: 'without records, no two months can be compared' })]),
      ]),
    ]),
  ]);
};

/* ------------------------------------------------------------- block E --- */

VIS.grounds = function () {
  return card(el('div', { class: 'rowlist' }, GROUNDS.map((gr) =>
    el('div', { class: 'row rv grow' }, [
      el('div', {}, [el('div', { class: 'lbl', text: gr.name }), el('div', { class: 'val', text: gr.why })]),
      el('div', { class: 'val law', text: gr.law }),
    ])
  )));
};

VIS.section24 = function () {
  return card([
    vtitle('Section 24 · the five compulsory steps'),
    el('div', { class: 's24' }, S24_STEPS.map((s) =>
      el('div', { class: 's24s rv' }, [
        el('span', { class: 's24n', text: s.n }),
        el('div', {}, [el('b', { text: s.title }), el('span', { text: s.body })]),
      ])
    )),
    el('div', { class: 's24warn rv' }, [
      el('b', { text: 'Miss any one of them' }),
      el('span', { text: 'and the Labour Court can cancel the dismissal on procedure alone — without ever reaching the facts.' }),
    ]),
  ]);
};

VIS.harassment = function () {
  return card(el('div', { class: 'hgap' }, [
    el('div', { class: 'hside has rv' }, [
      el('span', { class: 'hlab', text: 'What PizzaBurg has' }),
      el('b', { text: 'A rule' }),
      el('span', { text: 'Sexual harassment is named as a ground for dismissal. Many chains do not name it at all.' }),
    ]),
    el('div', { class: 'hbridge rv' }, [el('span', { text: 'no machinery' })]),
    el('div', { class: 'hside needs rv' }, [
      el('span', { class: 'hlab', text: 'What the law requires' }),
      el('b', { text: 'A complaint committee' }),
      el('span', { text: 'BNWLA v. Government of Bangladesh (2009): outside members, a woman heading it where possible, fixed time limits, confidentiality — binding on every workplace until Parliament legislates.' }),
    ]),
    el('div', { class: 'hcost rv' }, [
      el('div', {}, [el('b', { text: 'She' }), el('span', { text: 'has nowhere proper to take a complaint' })]),
      el('div', {}, [el('b', { text: 'He' }), el('span', { text: 'gets no fair process to answer one' })]),
      el('div', {}, [el('b', { text: 'The company' }), el('span', { text: 'can be attacked from either direction' })]),
    ]),
  ]));
};

VIS.scorecard = function () {
  return card([
    el('div', { class: 'schead rv' }, [
      el('span', { text: 'Section' }), el('span', { text: 'What the law asks' }), el('span', { text: 'What we found' }), el('span', { text: '' }),
    ]),
    el('div', { class: 'rowlist' }, SCORECARD.map((r) =>
      el('div', { class: 'row rv scrow ' + r.status }, [
        el('div', { class: 'lbl', text: r.sec }),
        el('div', { class: 'val', text: r.asks }),
        el('div', { class: 'val dim', text: r.found }),
        el('span', { class: 'tag ' + r.status, text: r.priority }),
      ])
    )),
  ]);
};

VIS.findings = function () {
  const col = (t, items, cls) => el('div', { class: 'fcol ' + cls }, [
    el('h4', { class: 'rv', text: t }),
    el('ol', {}, items.map((i) => el('li', { class: 'rv', text: i }))),
  ]);
  return card(el('div', { class: 'fgrid' }, [
    col('What we were told', FINDINGS.told, 'told'),
    col('What we concluded', FINDINGS.concluded, 'con'),
  ]));
};

/* ------------------------------------------------------------- block F --- */

VIS.swot = function () {
  const q = (t, items, cls) => el('div', { class: 'sq rv ' + cls }, [
    el('h4', { text: t }),
    el('ul', {}, items.map((i) => el('li', { text: i }))),
  ]);
  return card(el('div', { class: 'swot' }, [
    q('Strengths', SWOT.strengths, 's'),
    q('Weaknesses', SWOT.weaknesses, 'w'),
    q('Opportunities', SWOT.opportunities, 'o'),
    q('Threats', SWOT.threats, 't'),
  ]));
};

VIS.recs = function (v) {
  const from = v.from || 0;
  const slice = RECOMMENDATIONS.slice(from, from + 5);
  return card(el('div', { class: 'recs' }, slice.map((r, i) =>
    el('div', { class: 'rec rv ' + (r.urgency === 'Urgent' ? 'urgent' : r.urgency === 'High' ? 'high' : 'med') }, [
      el('div', { class: 'rhead' }, [
        el('span', { class: 'rn', text: String(from + i + 1) }),
        el('b', { text: r.title }),
        el('span', { class: 'tag ' + (r.urgency === 'Urgent' ? 'urgent' : r.urgency === 'High' ? 'partial' : 'unknown'), text: r.urgency }),
      ]),
      el('div', { class: 'rgain', text: r.gain }),
      el('div', { class: 'rmeta' }, [
        el('span', { text: 'Cost ' + r.cost }), el('span', { text: r.time }), el('span', { class: 'ref', text: 'Report ' + r.n }),
      ]),
    ])
  )));
};

VIS.matrix = function () {
  const ux = { Urgent: 3, High: 2, Medium: 1 };
  const cx = { 'Very low': 0, 'Low': 1, 'Low–medium': 2 };
  const W = 460, H = 300, pad = 46;
  const px = (c) => pad + (cx[c] / 2) * (W - pad - 30);
  const py = (u) => H - pad - ((ux[u] - 1) / 2) * (H - pad - 26);
  const kids = [
    svg('line', { x1: pad, y1: H - pad, x2: W - 16, y2: H - pad, stroke: '#ddd0bd', 'stroke-width': 1.5 }),
    svg('line', { x1: pad, y1: 16, x2: pad, y2: H - pad, stroke: '#ddd0bd', 'stroke-width': 1.5 }),
    svg('text', { x: W - 16, y: H - pad + 20, 'text-anchor': 'end', class: 'dax' }, [document.createTextNode('more it costs →')]),
    svg('text', { x: pad - 10, y: 22, 'text-anchor': 'end', class: 'dax', transform: `rotate(-90 ${pad - 10} 22)` }, [document.createTextNode('more urgent →')]),
  ];
  RECOMMENDATIONS.forEach((r, i) => {
    const x = px(r.cost) + ((i % 4) - 1.5) * 13;
    const y = py(r.urgency) + ((i % 3) - 1) * 13;
    const urgent = r.urgency === 'Urgent';
    kids.push(svg('circle', { cx: x, cy: y, r: urgent ? 15 : 11, class: 'mdot ' + (urgent ? 'u' : r.urgency === 'High' ? 'h' : 'm') }));
    kids.push(svg('text', { x: x, y: y + 4, 'text-anchor': 'middle', class: 'mlab' }, [document.createTextNode(String(i + 1))]));
  });
  return card([
    vtitle('Ten suggestions, plotted'),
    svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'mxsvg rv' }, kids),
    el('div', { class: 'mxkey rv' }, [
      el('span', {}, [el('i', { class: 'u' }), '1 Committee + firing procedure']),
      el('span', {}, [el('i', { class: 'h' }), '2 Central records']),
      el('span', {}, [el('i', { class: 'm' }), 'Everything else is a page and a decision']),
    ]),
  ]);
};

function buildVisual(v) {
  if (!v) return el('div');
  const fn = VIS[v.kind];
  if (!fn) return el('div', { class: 'vcard bare' });
  try { return fn(v); } catch (e) { console.warn('visual ' + v.kind + ' failed', e); return el('div'); }
}

VIS.refs = function () {
  const groups = [
    { t: 'Law', items: ['Bangladesh Labour Act 2006 (Act XLII of 2006), as amended 2013, 2018', 'Bangladesh Labour Rules 2015, as amended', 'BNWLA v. Government of Bangladesh, WP 5916/2008, 14 BLC (HCD) 694 (2009)'] },
    { t: 'Primary source', items: ['Datta, R. (2026). HRM practices of PizzaBurg. Interview by Group NEXIX, 26 Aug 2026, Dhaka. Handwritten notes.'] },
    { t: 'Theory', items: ['Maslow, A. H. (1943). A theory of human motivation. Psychological Review, 50(4).', 'Herzberg, F. (1968). One more time: how do you motivate employees? HBR, 46(1).', 'Schmidt, F. L., & Hunter, J. E. (1998). Psychological Bulletin, 124(2).', 'Sackett, P. R., Zhang, C., Berry, C. M., & Lievens, F. (2022). Journal of Applied Psychology.', 'Dessler, G. (2020). Human resource management (16th ed.). Pearson.'] },
    { t: 'Company and industry', items: ['Bangladesh Bureau of Statistics (2021). Hotel and Restaurant Survey.', 'Riyasad, N. (2020, September). New Age. Dhaka Socials (2026, May 5).', 'Mordor Intelligence (2026). Bangladesh foodservice market.'] },
  ];
  return card([
    el('div', { class: 'refgrid' }, groups.map((g) =>
      el('div', { class: 'refcol rv' }, [
        el('h4', { text: g.t }),
        el('ul', {}, g.items.map((i) => el('li', { text: i }))),
      ])
    )),
    el('p', { class: 'vfoot rv', text: 'Prepared for a class report, not as legal advice. A labour practitioner should confirm anything raised here.' }),
  ]);
};

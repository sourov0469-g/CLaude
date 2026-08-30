/* ==========================================================================
   CSR PANELS
   Three shapes the HRM deck never needed — Carroll’s pyramid, the
   described/not-evidenced ledger, and the impact-against-effort plot — plus a
   recaptioned roster. VIS is already declared in src/visuals.js; this file
   only adds to it, and reuses el/svg/rich/panel/ptitle/buildMedia unchanged.
   ========================================================================== */

/* --------------------------------------------------------------- pyramid --
   A tier’s place in PYRAMID is its place in the drawing, so the array runs
   apex first — philanthropic down to economic — and the CSS widens and darkens
   each step toward the base the model actually rests on. */

VIS.pyramid = function () {
  return panel([
    ptitle('Carroll’s four tiers'),
    el('div', { class: 'pyramid' }, PYRAMID.map(function (t, i) {
      return el('div', { class: 'tier t' + (i + 1) }, [
        el('b', { text: t.tier }),
        t.gloss ? el('span', { text: t.gloss }) : null,
      ]);
    })),
    el('p', { class: 'pfoot', text: 'Carroll (1991) — a lens we chose, not a source of PizzaBurg facts.' }),
  ], 'rv');
};

/* --------------------------------------------------------------- compare --
   The HRM deck’s two-column ledger, re-pointed at the gap: what the sources
   describe on the left, what none of them evidence on the right. The right
   column is an absence of reporting, not an accusation, and the foot says so. */

function cmpColumn(tone, head, items) {
  return el('div', { class: 'cmpcol ' + tone }, [
    el('h4', { text: head }),
    el('ul', {}, items.map(function (s) { return el('li', {}, rich(s)); })),
  ]);
}

VIS.compare = function () {
  return el('div', { class: 'cmp rv' }, [
    cmpColumn('yes', 'Described to us', GAPCOMPARE.has),
    cmpColumn('no', 'Not evidenced', GAPCOMPARE.missing),
    el('p', { class: 'pfoot', text: 'Our own reading of the four sourced practices — “not evidenced” means we found no report of it, not that it is absent.' }),
  ]);
};

/* ---------------------------------------------------------------- matrix --
   Placement, not a chart. Each idea carries its own two numbers and the dot is
   put where they say: left from effort, bottom from impact, both handed to the
   CSS as custom properties. The label rides above its dot and flips below when
   the dot sits too high to leave room, or sideways when it hugs an edge. */

VIS.matrix = function () {
  const plot = el('div', { class: 'mtx' }, [
    el('span', { class: 'mquad tl', text: 'do first' }),
    el('span', { class: 'mquad tr', text: 'plan for later' }),
    el('span', { class: 'maxis y', text: 'Impact →' }),
    el('span', { class: 'maxis x', text: 'Effort →' }),
  ]);

  MATRIX.forEach(function (m) {
    const at = '--x:' + Math.round(m.effort * 100) + '%; --y:' + Math.round(m.impact * 100) + '%;';
    const lx = m.effort <= 0.16 ? '-8px' : (m.effort >= 0.84 ? 'calc(-100% + 8px)' : '-50%');
    const ly = m.impact >= 0.82 ? 'calc(100% + 14px)' : '-14px';
    plot.appendChild(el('i', { class: 'mdot', style: at }));
    plot.appendChild(el('span', {
      class: 'mlbl', style: at + ' --lx:' + lx + '; --ly:' + ly + ';', text: m.name,
    }));
  });

  return panel([
    ptitle('Impact against effort'),
    el('div', { class: 'mtxwrap' }, plot),
    el('p', { class: 'pfoot', text: 'Our own qualitative ranking — PizzaBurg gave us no financial data to work from.' }),
  ], 'rv');
};

/* ------------------------------------------------------------------ team --
   The HRM deck’s roster panel, recaptioned. The clip was filmed on that
   earlier site visit and it shows the manager as well as the six of us, so the
   caption says both rather than letting it read as a photograph taken for this
   study by a team of seven. */

VIS.team = function () {
  const head = buildMedia({
    kind: 'video', src: 'team-pan-12s', poster: 'pb-team-office',
    caption: 'Group NEXIX with PizzaBurg HR manager Ranjan Datta · from our earlier HRM site visit',
  });
  return el('div', { class: 'teamwrap panel rv' }, [
    head,
    el('ul', { class: 'teamlist' }, PRESENTERS.map(function (p) {
      return el('li', {}, [
        el('span', { class: 'tn', text: p.name }),
        el('span', { class: 'ti', text: p.id }),
      ]);
    })),
  ]);
};

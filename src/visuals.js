/* ==========================================================================
   VISUALS
   One builder per aside. Each returns a DOM node; anything marked .rv is
   staggered in by the slide timeline. Nothing here invents a number — where
   the report has only a word ("medium", "very low"), the panel shows a word.
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
  if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(function (c) {
    if (c === null || c === undefined || c === false) return;
    n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return n;
}

function svg(tag, props, kids) {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (props) for (const k in props) if (props[k] !== null && props[k] !== undefined) n.setAttribute(k, props[k]);
  if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(function (c) { n.appendChild(c); });
  return n;
}

/* **bold** in the source copy, rendered without pulling in a markdown parser */
function rich(str) {
  const frag = document.createDocumentFragment();
  String(str).split(/(\*\*[^*]+\*\*)/).forEach(function (part) {
    if (!part) return;
    if (part.slice(0, 2) === '**' && part.slice(-2) === '**') {
      frag.appendChild(el('b', { text: part.slice(2, -2) }));
    } else {
      frag.appendChild(document.createTextNode(part));
    }
  });
  return frag;
}

const panel = function (kids, cls) { return el('div', { class: 'panel ' + (cls || '') }, kids); };
const ptitle = function (t) { return el('p', { class: 'ptitle', text: t }); };

const VIS = {};

/* ---------------------------------------------------------------- media --
   Every picture in the deck is the group's own, and they were taken on
   several different phones in several different lights. The .frame wrapper
   carries one warm grade so they read as a single set.

   Eleven of the twenty-two stills, and both clips, were shot with the phone
   held upright. A fixed landscape frame threw most of those away — the 9:16
   ones lost about three quarters — so the frame takes its shape FROM the
   media. Only the extremes are pulled in: a 9:16 shot settles at 0.72, near
   3:4, which the column can still hold without becoming a chimney. */

const AR_MIN = 0.72;
const AR_MAX = 1.9;

/* `rank` settles which source gets the last word: a poster only stands in for
   a clip the browser may refuse to decode, so the clip outranks it. `live` is
   false for the synchronous read during buildSlide, when there is no layout to
   disturb yet, and true for the load events that arrive afterwards. */
function frameRatio(fig, w, h, rank, live) {
  if (!w || !h || +(fig.dataset.arRank || 0) > rank) return;
  fig.dataset.arRank = rank;
  const was = fig.style.getPropertyValue('--ar');
  fig.style.setProperty('--ar', Math.min(AR_MAX, Math.max(AR_MIN, w / h)).toFixed(4));
  if (live && was !== fig.style.getPropertyValue('--ar') && window.Deck && Deck.refit) Deck.refit();
}

/* Every source is an inlined data URI, so an img is often already decoded
   before it reaches the document; a clip only reports its size on metadata.
   Both paths have to be covered or the default 16/10 sticks. */
function sizeFrame(fig, node, rank) {
  const video = node.tagName === 'VIDEO';
  const read = function (live) {
    frameRatio(fig, video ? node.videoWidth : node.naturalWidth,
      video ? node.videoHeight : node.naturalHeight, rank, live);
  };
  read(false);
  node.addEventListener(video ? 'loadedmetadata' : 'load', function () { read(true); });
}

function buildMedia(m, small) {
  if (!m) return null;
  const cls = 'shot rv' + (small ? ' small' : '') + (m.fit === 'contain' ? ' contain' : '')
    + (m.tone ? ' ' + m.tone : '');
  const url = m.kind === 'video' ? Media.video(m.src) : '';

  let inner;
  if (m.kind === 'video' && url) {
    const vid = el('video', {
      src: url, poster: m.poster ? Media.src(m.poster) : null,
      muted: 'muted', loop: 'loop', playsinline: 'playsinline', autoplay: 'autoplay', preload: 'auto',
    });
    vid.muted = true;
    inner = vid;
  } else {
    const src = m.kind === 'video' ? m.poster : m.src;
    inner = el('img', { src: Media.src(src), alt: m.caption || '', loading: 'eager', decoding: 'async' });
  }

  const fig = el('figure', { class: cls }, [
    el('div', { class: 'frame' }, inner),
    m.caption ? el('figcaption', { text: m.caption }) : null,
  ]);
  sizeFrame(fig, inner, 2);
  /* a browser missing the codec shows the poster in place of the clip, and the
     posters are portrait too, so the poster sizes the frame until (or unless)
     the clip's own metadata arrives */
  if (inner.tagName === 'VIDEO' && m.poster) {
    const probe = new Image();
    sizeFrame(fig, probe, 1);
    probe.src = Media.src(m.poster);
  }
  return fig;
}

/* --------------------------------------------------------------- outlets -- */

VIS.outlets = function () {
  const grid = el('div', { class: 'dots' });
  for (let i = 0; i < 22; i++) {
    grid.appendChild(el('span', { class: 'dot' + (i < 12 ? ' on' : '') }));
  }
  return panel([
    ptitle('22 outlets · ten cities and towns'),
    grid,
    el('div', { class: 'legend' }, [
      el('span', {}, [el('i', { class: 'a' }), '12 in Dhaka']),
      el('span', {}, [el('i', { class: 'b' }), '10 across nine other towns']),
    ]),
  ], 'rv');
};

/* -------------------------------------------------------------- turnover -- */

VIS.turnover = function () {
  return panel([
    el('div', { class: 'twogrid' }, TURNOVER.map(function (r) {
      return el('div', { class: 'tcard ' + r.tone }, [
        el('span', { class: 'tgrp', text: r.grp }),
        el('span', { class: 'tlvl', text: r.lvl }),
        el('span', { class: 'tbody', text: r.body }),
      ]);
    })),
    el('p', { class: 'pfoot', text: 'No figures given — these are the manager’s own words.' }),
  ], 'rv');
};

/* --------------------------------------------------------------- welfare -- */

const WICON = {
  roof: 'M4 13 L14 5 L24 13 M7 12 v10 h14 v-10',
  bowl: 'M4 12 h20 a10 10 0 0 1 -20 0 Z M14 12 v-6',
  cross: 'M11 4 h6 v7 h7 v6 h-7 v7 h-6 v-7 h-7 v-6 h7 Z',
  cradle: 'M5 15 a9 9 0 0 1 18 0 M3 17 h22 M8 21 l2 3 M20 21 l-2 3',
};

VIS.welfare = function () {
  return el('div', { class: 'welgrid rv' }, WELFARE.map(function (w) {
    return el('div', { class: 'wel' }, [
      svg('svg', { viewBox: '0 0 28 28', class: 'welic' }, [
        svg('path', { d: WICON[w.icon], fill: 'none', stroke: 'currentColor', 'stroke-width': 1.9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      ]),
      el('b', { text: w.name }),
      el('span', { text: w.body }),
    ]);
  }));
};

/* ------------------------------------------------------------------ loop -- */

VIS.loop = function () {
  return panel([
    ptitle('Reviews feed directly into training'),
    el('ol', { class: 'steps' }, LOOP.map(function (s) {
      return el('li', {}, [
        el('span', { class: 'sn', text: s.n }),
        el('div', {}, [el('b', { text: s.t }), el('span', { text: s.b })]),
      ]);
    })),
  ], 'rv');
};

/* ------------------------------------------------------------------ recs -- */

VIS.recs = function () {
  return el('div', { class: 'recs rv' }, [
    el('div', { class: 'rgroup first' }, [
      el('h4', {}, [el('span', { class: 'pill', text: 'Do first' }), 'urgent, near-zero cost']),
      el('ol', {}, RECS.first.map(function (r) { return el('li', {}, rich(r)); })),
    ]),
    el('div', { class: 'rgroup then' }, [
      el('h4', {}, [el('span', { class: 'pill alt', text: 'Then' }), 'over the next few months']),
      el('ol', {}, RECS.then.map(function (r) { return el('li', {}, rich(r)); })),
    ]),
  ]);
};

/* ------------------------------------------------------------------ team -- */

VIS.team = function () {
  /* the pan across the whole group, shot at the end of the interview */
  const head = buildMedia({
    kind: 'video', src: 'team-pan-12s', poster: 'pb-team-office',
    caption: 'Group NEXIX with Mr. Ranjan Datta · after the interview',
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

function buildAside(v) {
  if (!v) return null;
  const fn = VIS[v.kind];
  if (!fn) return null;
  try { return fn(v); } catch (e) { console.warn('aside ' + v.kind + ' failed', e); return null; }
}

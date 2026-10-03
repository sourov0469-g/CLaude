// Reusable page blocks for inner pages.
import { site, services, img, arrow, crumbs } from './site.mjs';
import { icon } from './icons.mjs';

export function phero({ items, kicker, title, lead, actions = '', media = '', dark = false, strip = [], mediaFirst = false }) {
  const stripHtml = strip.length ? `<div class="phero-strip"><div class="wrap"><ul>${strip.map((t, i) => `<li><i>0${i + 1}</i>${t}</li>`).join('')}</ul></div></div>` : '';
  return `<section class="phero${dark ? ' phero--dark' : ''}" aria-labelledby="page-h1"><div class="wrap phero-grid"><div class="phero-copy" data-reveal="fade">${crumbs(items)}<p class="kicker">${kicker}</p><h1 class="h1" id="page-h1">${title}</h1><p class="lead">${lead}</p>${actions ? `<div class="btn-row">${actions}</div>` : ''}</div>${media ? `<div class="phero-media" data-reveal style="--d:120ms">${media}</div>` : ''}</div>${stripHtml}</section>`;
}

export const btn = (href, label, kind = '') => `<a class="btn${kind ? ' btn--' + kind : ''}" href="${href}">${label}${kind === '' || kind === 'light' ? ' ' + arrow : ''}</a>`;

/** Three related-service cards (icon style, no photography). */
export function related(currentSlug, picks, { title = 'Other ways to see the same site.', lead = 'Each service is agreed around the decision you need to make.' } = {}) {
  const list = picks.map((s) => services.find((x) => x.slug === s));
  return `<section class="sec sec--warm2" aria-labelledby="rel-h"><span class="seam"></span><div class="wrap"><div class="sec-head sec-head--split" data-reveal><div><p class="kicker">Other drone services</p><h2 class="h2" id="rel-h" style="margin-top:18px">${title}</h2></div><p class="lead">${lead}</p></div><div class="cards cards--3">${list
    .map((s, i) => `<article class="icard icard--link" data-reveal style="--d:${i * 70}ms"><span class="ico-wrap">${icon[s.icon]()}</span><h3 class="h3">${s.name}</h3><p>${s.short}</p><a class="tlink" href="${s.path}">${s.explore} ${arrow}</a></article>`)
    .join('')}</div></div></section>`;
}

/** Numbered use-case / feature cards with an icon. */
export function iconCards(items, { cols = 4, dark = false } = {}) {
  return `<div class="cards cards--${cols}">${items
    .map((it, i) => `<article class="icard${dark ? ' icard--dark' : ''}" data-reveal style="--d:${i * 70}ms"><span class="ico-wrap">${icon[it.icon]()}</span><h3 class="h3">${it.title}</h3><p>${it.text}</p></article>`)
    .join('')}</div>`;
}

export function steps(items, { row = false, cols = 4, mt = 0 } = {}) {
  return `<ol class="steps${row ? ' steps--row' : ''}" style="--cols:${cols}${mt ? `;margin-top:${mt}px` : ''}">${items
    .map((it, i) => `<li class="step" data-reveal style="--d:${i * 70}ms"><span class="step-n">0${i + 1}</span><h3 class="h3">${it.title}</h3><p>${it.text}</p></li>`)
    .join('')}</ol>`;
}

export const secHead = (kicker, title, lead, id, split = true) =>
  `<div class="sec-head${split ? ' sec-head--split' : ''}" data-reveal><div><p class="kicker">${kicker}</p><h2 class="h2"${id ? ` id="${id}"` : ''} style="margin-top:18px">${title}</h2></div>${lead ? `<p class="lead">${lead}</p>` : ''}</div>`;

// Site-wide facts and reusable components. Every business fact here comes from the
// current public site (uavaerialsolutions.co.uk). Nothing else is claimed.
import { icon } from './icons.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const imgManifest = JSON.parse(fs.readFileSync(path.join(here, '..', 'img', 'out', 'manifest.json'), 'utf8'));

export const site = {
  name: 'UAV Aerial Solutions',
  origin: 'https://www.uavaerialsolutions.co.uk',
  phone: '07780 947875',
  phoneHref: 'tel:+447780947875',
  email: 'terry.snape@uavaerialsolutions.co.uk',
  area: 'Macclesfield, Cheshire',
  instagram: 'https://www.instagram.com/uavaerialsolutions2023',
  facebook: 'https://www.facebook.com/profile.php?id=100091092785493',
  geo: { lat: 53.25371, lon: -2.14928 },
  year: 2026,
  updated: '2026-10-03'
};

export const services = [
  { slug: 'roof-inspections', explore: 'Explore roof inspections', path: '/services/roof-inspections/', name: 'Roof inspections', short: 'Commercial and residential roofs, imaged in detail.', icon: 'roof', type: 'Drone roof inspection', query: 'roof-inspection' },
  { slug: 'rtk-mapping', explore: 'Explore mapping', path: '/services/rtk-mapping/', name: 'RTK & 2D mapping', short: 'Orthomosaic maps from RTK-supported capture.', icon: 'map', type: 'RTK and orthomosaic drone mapping', query: 'rtk-mapping' },
  { slug: '3d-modelling', explore: 'Explore 3D modelling', path: '/services/3d-modelling/', name: '3D modelling', short: 'Georeferenced models for remote inspection.', icon: 'cube', type: 'Drone 3D modelling and aerial survey', query: '3d-modelling' },
  { slug: 'aerial-monitoring', explore: 'Explore monitoring', path: '/services/aerial-monitoring/', name: 'Aerial monitoring', short: 'Repeat capture that keeps progress visible.', icon: 'layers', type: 'Drone progress monitoring', query: 'aerial-monitoring' },
  { slug: 'aerial-photography-videography', explore: 'Explore photo &amp; video', path: '/services/aerial-photography-videography/', name: 'Photography & video', short: 'Aerial stills and video for projects and property.', icon: 'camera', type: 'Aerial photography and videography', query: 'aerial-photography-videography' }
];

export const nav = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services/', mega: true },
  { label: 'Process', path: '/process-deliverables/' },
  { label: 'About', path: '/about/' }
];

/* ---------- helpers ---------- */
export const img = (key, o = {}) => {
  const m = imgManifest[key];
  if (!m) throw new Error('Unknown image key ' + key);
  const loading = o.eager ? '' : ' loading="lazy"';
  const fp = o.priority ? ' fetchpriority="high"' : '';
  const pos = o.pos ? ` style="object-position:${o.pos}"` : '';
  const cls = o.cls ? ` class="${o.cls}"` : '';
  const alt = o.alt !== undefined ? o.alt : m.alt;
  return `<img${cls} src="{{IMG:${key}}}" width="${m.w}" height="${m.h}" alt="${alt}"${loading}${fp} decoding="async"${pos}>`;
};

export const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&rsquo;/g, '\u2019').replace(/&lsquo;/g, '\u2018').replace(/&middot;/g, '\u00b7').replace(/\s+/g, ' ').trim();
export const stock = '<span class="stock">Stock photo</span>';

export const arrow = icon.arrow;
export const emailText = site.email.replace('@', '@<wbr>');

/* ---------- JSON-LD ---------- */
export const businessLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': site.origin + '/#business',
  name: site.name,
  url: site.origin + '/',
  telephone: '+447780947875',
  email: site.email,
  image: site.origin + '/assets/og/home.jpg',
  logo: site.origin + '/assets/img/logo.png',
  description: 'Drone roof inspections, RTK and 2D mapping, 3D modelling, aerial monitoring, and aerial photography and videography from Macclesfield, Cheshire.',
  address: { '@type': 'PostalAddress', addressLocality: 'Macclesfield', addressRegion: 'Cheshire', addressCountry: 'GB' },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lon },
  areaServed: { '@type': 'AdministrativeArea', name: 'Cheshire' },
  sameAs: [site.instagram, site.facebook]
});
export const serviceLd = (s, description) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  serviceType: s.type,
  description,
  url: site.origin + s.path,
  provider: { '@id': site.origin + '/#business' },
  areaServed: { '@type': 'AdministrativeArea', name: 'Cheshire' }
});
export const crumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: site.origin + it.path }))
});
export const faqLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: stripTags(i.q), acceptedAnswer: { '@type': 'Answer', text: stripTags(i.a) } }))
});

/* ---------- components ---------- */
export function crumbs(items, dark) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items
    .map((it, i) => (i === items.length - 1 ? `<li><span aria-current="page">${it.name}</span></li>` : `<li><a href="${it.path}">${it.name}</a></li>`))
    .join('')}</ol></nav>`;
}

export function faq(items, id, dark) {
  return `<div class="faq" data-faq>${items
    .map((it, i) => `<div class="faq-item"><h3 class="faq-q"><button class="faq-btn" type="button" id="${id}-b${i}" aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="${id}-p${i}"><span>${it.q}</span><span class="faq-ico" aria-hidden="true"></span></button></h3><div class="faq-a${i === 0 ? ' is-open' : ''}" id="${id}-p${i}" role="region" aria-labelledby="${id}-b${i}"><div><p>${it.a}</p></div></div></div>`)
    .join('')}</div>`;
}

export function faqSection({ id, kicker = 'Practical questions', title, lead, items, dark = false, bg = 'paper' }) {
  return `<section class="sec ${dark ? 'sec--dark' : 'sec--' + bg}" id="${id}" aria-labelledby="${id}-h"><span class="seam"></span><div class="wrap faq-wrap"><div class="sticky" data-reveal><p class="kicker">${kicker}</p><h2 class="h2" id="${id}-h" style="margin:18px 0 18px">${title}</h2>${lead ? `<p class="lead">${lead}</p>` : ''}</div><div data-reveal style="--d:80ms">${faq(items, id)}</div></div></section>`;
}

export function cta({ kicker = 'Start with a brief', title = 'Tell us what you need to see from above.', text = 'Send the site, the question you need answered and how you will use the result. We will reply with a free quote.', query = '', primary = 'Request a free quote' } = {}) {
  const href = '/contact/' + (query ? `?service=${query}` : '');
  return `<section class="cta" aria-labelledby="cta-h"><svg class="cta-lines" viewBox="0 0 600 220" aria-hidden="true" preserveAspectRatio="none"><path d="M0 170C70 110 120 190 200 140S320 40 420 90 560 70 600 30"/><path d="M0 200C80 150 140 215 230 170S340 80 440 125 570 108 600 74" opacity=".5"/></svg><div class="wrap cta-grid"><div data-reveal><p class="kicker">${kicker}</p><h2 class="h2" id="cta-h">${title}</h2><p style="margin-top:20px">${text}</p></div><div class="cta-side" data-reveal style="--d:90ms"><a class="btn btn--light" href="${href}">${primary} ${arrow}</a><a class="btn btn--ghost-light" href="${site.phoneHref}">Call ${site.phone}</a><a class="tlink" href="mailto:${site.email}" style="align-self:flex-start;color:var(--on-dark)">${emailText}</a></div></div></section>`;
}

export function megaMenu() {
  const items = services
    .map((s) => `<a class="mega-item" href="${s.path}" data-nav="${s.path}"><span class="ico-wrap">${icon[s.icon]()}</span><span><strong>${s.name}</strong><small>${s.short}</small></span><span class="go" aria-hidden="true">→</span></a>`)
    .join('');
  const help = `<a class="mega-item mega-item--help" href="/contact/"><span class="ico-wrap">${icon.help()}</span><span><strong>Not sure which?</strong><small>Describe the site and we will suggest the right output.</small></span><span class="go" aria-hidden="true">→</span></a>`;
  return `<div class="mega" id="mega-services" data-mega-panel><div class="mega-panel"><div class="mega-intro"><p class="kicker">Drone services</p><p class="mega-title">Choose the output, not the aircraft.</p><p>Five services, each agreed around the decision you need to make.</p><svg class="mega-trace" viewBox="0 0 220 90" aria-hidden="true"><path d="M2 70C40 20 80 80 118 42c30-30 62-22 100 6" fill="none" stroke="#CC9865" stroke-width="1"/><circle cx="2" cy="70" r="3" fill="#CC9865"/><circle cx="218" cy="48" r="3" fill="#CC9865"/></svg><a class="mega-all" href="/services/" data-nav="/services/">All services ${arrow}</a></div><div class="mega-list">${items}${help}</div></div></div>`;
}

export function header() {
  const logo = `<img src="{{IMG:_logo}}" width="${imgManifest._logo.w}" height="${imgManifest._logo.h}" alt="UAV Aerial Solutions" decoding="async">`;
  const links = nav
    .map((n) =>
      n.mega
        ? `<li class="has-mega" data-mega><button class="mega-btn" type="button" id="mega-btn" aria-expanded="false" aria-controls="mega-services">Services ${icon.chev}</button>${megaMenu()}</li>`
        : `<li><a class="nav-link" href="${n.path}" data-nav="${n.path}">${n.label}</a></li>`
    )
    .join('');
  const mSub = services.map((s) => `<a href="${s.path}" data-nav="${s.path}">${icon[s.icon]()}<span>${s.name}</span></a>`).join('');
  return `<a class="skip" href="#main">Skip to main content</a>
<header class="site-header" data-header>
<div class="wrap bar">
<a class="brand" href="/" aria-label="UAV Aerial Solutions, home">${logo}</a>
<nav class="primary" aria-label="Primary"><ul>${links}</ul></nav>
<a class="nav-tel" href="${site.phoneHref}" aria-label="Call ${site.phone}">${site.phone}</a>
<a class="btn nav-cta" href="/contact/" data-nav="/contact/">Get a free quote ${arrow}</a>
<button class="burger" type="button" aria-expanded="false" aria-controls="m-menu" aria-label="Open menu"><i></i><i></i><i></i></button>
</div>
<span class="nav-progress" aria-hidden="true"></span>
</header>
<div class="m-menu" id="m-menu" role="dialog" aria-modal="true" aria-label="Site menu" data-m-menu>
<div class="m-top"><a class="brand" href="/" aria-label="UAV Aerial Solutions, home">${logo}</a><button class="m-close" type="button" aria-label="Close menu">${icon.close}</button></div>
<div class="m-scroll" data-lenis-prevent>
<ul class="m-nav">
<li class="stagger" style="--i:0"><a class="m-link" href="/" data-nav="/"><span class="num">01</span><span class="label">Home</span></a></li>
<li class="stagger" style="--i:1"><button class="m-sub-btn" type="button" aria-expanded="false" aria-controls="m-services"><span class="num">02</span><span class="label">Services</span><span class="plus" aria-hidden="true"></span></button><div class="m-sub" id="m-services"><div><ul><li><a class="all" href="/services/" data-nav="/services/"><span>Services overview</span></a></li>${services.map((s) => `<li><a href="${s.path}" data-nav="${s.path}">${icon[s.icon]()}<span>${s.name}</span></a></li>`).join('')}</ul></div></div></li>
<li class="stagger" style="--i:2"><a class="m-link" href="/process-deliverables/" data-nav="/process-deliverables/"><span class="num">03</span><span class="label">Process</span></a></li>
<li class="stagger" style="--i:3"><a class="m-link" href="/about/" data-nav="/about/"><span class="num">04</span><span class="label">About</span></a></li>
<li class="stagger" style="--i:4"><a class="m-link" href="/contact/" data-nav="/contact/"><span class="num">05</span><span class="label">Contact</span></a></li>
</ul>
<div class="m-foot">
<a class="btn btn--light btn--block stagger" style="--i:5" href="/contact/">Get a free quote ${arrow}</a>
<div class="m-contact stagger" style="--i:6"><a href="${site.phoneHref}">${icon.phone()}<span>${site.phone}</span></a><a href="mailto:${site.email}">${icon.mail()}<span>${emailText}</span></a></div>
<p class="m-meta stagger" style="--i:7">${site.area}. Free quotes.</p>
</div>
</div>
</div>`;
}

export function footer() {
  const svc = services.map((s) => `<li><a href="${s.path}">${s.name}</a></li>`).join('');
  return `<footer class="site-footer"><div class="wrap">
<div class="foot-grid">
<div class="foot-brand"><a href="/" aria-label="UAV Aerial Solutions, home"><img src="{{IMG:_logo}}" width="${imgManifest._logo.w}" height="${imgManifest._logo.h}" alt="UAV Aerial Solutions" loading="lazy" decoding="async"></a><p>Drone roof inspections, mapping, 3D modelling, monitoring and aerial media from ${site.area}.</p></div>
<div class="foot-col"><h2>Services</h2><ul>${svc}</ul></div>
<div class="foot-col"><h2>Explore</h2><ul><li><a href="/">Home</a></li><li><a href="/services/">All services</a></li><li><a href="/process-deliverables/">Process &amp; deliverables</a></li><li><a href="/about/">About</a></li><li><a href="/contact/">Contact</a></li></ul></div>
<div class="foot-col foot-contact"><h2>Get in touch</h2><a href="${site.phoneHref}">${icon.phone()}<span>${site.phone}</span></a><a href="mailto:${site.email}">${icon.mail()}<span>${emailText}</span></a><p class="foot-contact-area" style="display:flex;gap:12px;align-items:center;min-height:40px;font-size:.9375rem">${icon.pin()}<span>${site.area}</span></p>
<div class="foot-social"><a href="${site.instagram}" target="_blank" rel="noopener noreferrer" aria-label="UAV Aerial Solutions on Instagram (opens in a new tab)">${icon.instagram}</a><a href="${site.facebook}" target="_blank" rel="noopener noreferrer" aria-label="UAV Aerial Solutions on Facebook (opens in a new tab)">${icon.facebook}</a></div></div>
</div>
<p class="foot-mark" aria-hidden="true">UAV Aerial Solutions</p>
<div class="foot-base"><p>&copy; ${site.year} ${site.name}</p><ul><li><a href="/privacy-cookies/#privacy">Privacy</a></li><li><a href="/privacy-cookies/#cookies">Cookies</a></li><li><a href="/privacy-cookies/#terms">Terms</a></li></ul></div>
</div></footer>`;
}

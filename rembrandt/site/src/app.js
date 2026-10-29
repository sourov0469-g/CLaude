/* Rembrandt Roofing "In Good Light": motion core, light, estimate engine. Runs A–C, default versions. */
(() => {
'use strict';
const d = document, H = d.documentElement, W = window;
const $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => [...r.querySelectorAll(s)];
const P = new URLSearchParams(location.search);
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const calm = () => H.classList.contains('calm');
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const small = () => innerWidth < 640;
const E = { out: 'cubic-bezier(0.23,1,0.32,1)', surface: 'cubic-bezier(0.22,1,0.36,1)', light: 'cubic-bezier(0.16,1,0.3,1)', move: 'cubic-bezier(0.77,0,0.175,1)', ink: 'cubic-bezier(0.55,0.08,0.21,0.92)', over: 'cubic-bezier(0.34,1.56,0.64,1)' };
const G = () => W.gsap;
const dl = (W.dataLayer = W.dataLayer || []);
const track = (event, data = {}) => dl.push({ event, ...data });
let booted = false;
setTimeout(() => { if (!booted) H.dataset.motionFailed = 'true'; }, 4000); // watchdog boot (West London pattern)

/* ---------------- motion mode toggle (§3.7) ---------------- */
$$('[data-motion-set]').forEach(b => {
  b.setAttribute('aria-pressed', String((b.dataset.motionSet === 'calm') === calm()));
  b.addEventListener('click', () => {
    try { localStorage.setItem('rr-motion', b.dataset.motionSet); sessionStorage.setItem('rr-y', String(scrollY)); } catch (e) {}
    const u = new URL(location.href); u.searchParams.delete('motion'); location.replace(u);
  });
});
try { const y = sessionStorage.getItem('rr-y'); if (y) { sessionStorage.removeItem('rr-y'); requestAnimationFrame(() => scrollTo(0, +y)); } } catch (e) {}

/* ---------------- time, office state, real sun (§3.11) ---------------- */
const NY = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: false });
function nyParts(date = new Date()) { const o = {}; NY.formatToParts(date).forEach(p => o[p.type] = p.value); return { day: o.weekday, h: +o.hour % 24, m: +o.minute }; }
const HOLIDAYS = ['01-01', '05-25', '07-04', '09-07', '11-26', '11-27', '12-24', '12-25']; // invented office closures, logged in BUILD-NOTE
function office(date = new Date()) {
  const p = nyParts(date); const md = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', month: '2-digit', day: '2-digit' }).format(date);
  const weekday = !['Sat', 'Sun'].includes(p.day) && !HOLIDAYS.includes(md);
  const mins = p.h * 60 + p.m; const open = weekday && mins >= 540 && mins < 1020;
  return { open, weekday, beforeFour: weekday && mins < 960 && mins >= 0, day: p.day, mins };
}
function nextOpenPhrase(o) {
  if (o.weekday && o.mins < 540) return 'at 9 this morning';
  if (o.day === 'Fri' && o.mins >= 1020 || o.day === 'Sat' || o.day === 'Sun') return 'Monday at 9';
  return 'tomorrow at 9';
}
function updateOffice() {
  const o = office();
  $$('[data-office]').forEach(el => el.classList.toggle('is-open', o.open));
  $$('[data-office-text]').forEach(el => el.textContent = o.open ? 'Open now, until 5' : 'Closed. Text us');
  $$('[data-office-short]').forEach(el => el.textContent = o.open ? 'Open until 5' : 'Text us');
  $$('[data-office-long]').forEach(el => el.textContent = o.open ? 'We\'re in. The office is open until 5 pm today.' : `The office is closed right now. Text us and we'll call you ${nextOpenPhrase(o)}.`);
  const promise = $('[data-promise]');
  if (promise) promise.textContent = o.open && o.beforeFour ? 'Send it before 4 pm and Rachel calls you back today.' : `Rachel calls you back ${nextOpenPhrase(o)}. Mon to Fri, 9 to 5.`;
  return o;
}
// NOAA solar position (declination, equation of time, hour angle)
function sun(date = new Date(), lat = 39.5523, lon = -84.2333) {
  const rad = Math.PI / 180, jd = date.getTime() / 86400000 + 2440587.5, T = (jd - 2451545) / 36525;
  const L0 = (280.46646 + T * (36000.76983 + T * 0.0003032)) % 360, M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const C = Math.sin(M * rad) * (1.914602 - T * (0.004817 + 0.000014 * T)) + Math.sin(2 * M * rad) * (0.019993 - 0.000101 * T) + Math.sin(3 * M * rad) * 0.000289;
  const om = 125.04 - 1934.136 * T, lam = L0 + C - 0.00569 - 0.00478 * Math.sin(om * rad);
  const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60, eps = eps0 + 0.00256 * Math.cos(om * rad);
  const dec = Math.asin(Math.sin(eps * rad) * Math.sin(lam * rad)) / rad;
  const y = Math.tan(eps / 2 * rad) ** 2;
  const eot = 4 / rad * (y * Math.sin(2 * L0 * rad) - 2 * e * Math.sin(M * rad) + 4 * e * y * Math.sin(M * rad) * Math.cos(2 * L0 * rad) - 0.5 * y * y * Math.sin(4 * L0 * rad) - 1.25 * e * e * Math.sin(2 * M * rad));
  const utcMin = date.getUTCHours() * 60 + date.getUTCMinutes() + date.getUTCSeconds() / 60;
  let ha = (utcMin + eot + 4 * lon) / 4 - 180; if (ha < -180) ha += 360;
  const zen = Math.acos(Math.sin(lat * rad) * Math.sin(dec * rad) + Math.cos(lat * rad) * Math.cos(dec * rad) * Math.cos(ha * rad)) / rad;
  let az = Math.acos(clamp((Math.sin(lat * rad) * Math.cos(zen * rad) - Math.sin(dec * rad)) / (Math.cos(lat * rad) * Math.sin(zen * rad)), -1, 1)) / rad;
  az = ha > 0 ? (az + 180) % 360 : (540 - az) % 360;
  return { az, el: 90 - zen };
}
const NYT = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' });
function updateHeroLight(first) {
  const s = sun(), t = $('[data-live-time]');
  if (t) { t.textContent = NYT.format(new Date()).toLowerCase(); t.dateTime = new Date().toISOString(); }
  const hero = $('[data-hero-media]'), note = $('[data-light-note]'), sweep = $('[data-sweep]');
  const night = s.el < -1 || P.get('sun') === 'night';
  if (hero && night && !hero.querySelector('.night-plate')) {
    const im = new Image(); im.className = 'night-plate'; im.alt = ''; im.decoding = 'async';
    im.src = 'assets/img/night-1080.jpg'; im.srcset = 'assets/img/night-1080.webp 1080w, assets/img/night-1920.webp 1920w'; im.sizes = '100vw'; // src fallback: valid markup, and no blank plate without AVIF
    Object.assign(im.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', opacity: '0', transition: `opacity 1100ms ${E.light}` });
    im.onload = () => requestAnimationFrame(() => im.style.opacity = '1');
    hero.querySelector('picture').after(im);
    if (note) note.textContent = 'It\'s dark in Springboro right now, so this is the porch light. The light on this page follows the real sun.';
    const o = office(); const deck = $('[data-deck]');
    if (deck && !o.open) deck.insertAdjacentHTML('beforeend', ` <span style="display:block;margin-top:.6em;font-style:normal;font-family:var(--mona);font-size:1rem">We're closed now. Text us and we'll call you ${nextOpenPhrase(o)}.</span>`);
  }
  if (sweep && first) {
    // azimuth 90 (east) .. 270 (west) mapped to the sweep's end position; low sun = warmer, stronger
    const x = night ? -60 : clamp((s.az - 90) / 180, 0, 1) * 60 - 20;
    const warm = night ? 0 : clamp(1 - s.el / 45, 0.25, 1);
    sweep.style.setProperty('--sweep', '-60%');
    sweep.style.opacity = '0';
    requestAnimationFrame(() => {
      if (calm()) { sweep.style.setProperty('--sweep', x + '%'); sweep.style.opacity = String(0.55 * warm); return; }
      sweep.animate([{ transform: 'translateX(-60%)', opacity: 0 }, { transform: `translateX(${x}%)`, opacity: 0.85 * warm, offset: 0.7 }, { transform: `translateX(${x}%)`, opacity: 0.55 * warm }], { duration: small() ? 900 : 1100, easing: E.light, fill: 'forwards' });
    });
  }
  return s;
}

/* ---------------- NWS storm watch (§3.11; A3) ---------------- */
const SAME = ['039017', '039057', '039113', '039165'], UGC = ['OHC017', 'OHC057', 'OHC113', 'OHC165'];
async function stormWatch() {
  let alerts = null;
  try { const c = JSON.parse(sessionStorage.getItem('rr-nws') || 'null'); if (c && Date.now() - c.t < 600000) alerts = c.a; } catch (e) {}
  if (!alerts) {
    try {
      const ac = new AbortController(); const to = setTimeout(() => ac.abort(), 3000);
      const r = await fetch('https://api.weather.gov/alerts/active?area=OH', { headers: { Accept: 'application/geo+json' }, signal: ac.signal });
      clearTimeout(to); if (!r.ok) return;
      const j = await r.json();
      alerts = (j.features || []).map(f => f.properties).filter(p => {
        const g = p.geocode || {}; const ours = (g.SAME || []).some(s => SAME.includes(s)) || (g.UGC || []).some(s => UGC.includes(s));
        const ev = p.event || '';
        return ours && (ev === 'Severe Thunderstorm Warning' || ev === 'Tornado Warning' || (/warning/i.test(ev) && /hail/i.test(p.description || '')));
      }).map(p => ({ event: p.event, area: p.areaDesc, ends: p.ends || p.expires }));
      try { sessionStorage.setItem('rr-nws', JSON.stringify({ t: Date.now(), a: alerts })); } catch (e) {}
    } catch (e) { return; }
  }
  if (P.get('nws') === 'test') alerts = [{ event: 'Severe Thunderstorm Warning', area: 'Warren, OH; Montgomery, OH', ends: new Date(Date.now() + 3600e3).toISOString(), test: true }];
  if (!alerts || !alerts.length) return;
  const a = alerts[0];
  const counties = a.area.split(';').map(s => s.trim().replace(/, OH$/, '')).filter(c => ['Warren', 'Montgomery', 'Greene', 'Butler'].includes(c));
  const until = a.ends ? ' until ' + NYT.format(new Date(a.ends)).toLowerCase() : '';
  const txt = `${a.test ? 'TEST: ' : ''}${a.event} for ${counties.join(' and ') || 'our area'} County${counties.length > 1 ? 'ies' : ''}${until} (National Weather Service). Stay off your roof. When it passes: (937) 746-7377.`.replace('Countyies', 'counties');
  const b = $('[data-storm-banner]'); if (b) { $('[data-storm-text]', b).textContent = txt; b.hidden = false; $('[data-storm-dismiss]', b).onclick = () => b.hidden = true; }
  const live = $('[data-storm-live]'); if (live) live.textContent = txt.replace(' When it passes: (937) 746-7377.', ' When it passes:');
}

/* ---------------- estimate state + attribution (§3.5) ---------------- */
const SIT = { storm: 'storm damage', leak: 'a leak', old: 'an old roof', claim: 'an insurance claim', check: 'a roof check' };
const est = (() => { try { return JSON.parse(localStorage.getItem('rr-estimate')) || {}; } catch (e) { return {}; } })();
const saveEst = () => { try { localStorage.setItem('rr-estimate', JSON.stringify(est)); } catch (e) {} syncSms(); };
function syncSms() {
  const body = `Hi Rembrandt, ${SIT[est.situation] || 'a roof question'}${est.zip ? ' in ' + est.zip : ''}. My name is ${est.name || ''}`;
  $$('[data-sms]').forEach(a => a.href = 'sms:+19377467377?&body=' + encodeURIComponent(body));
}
(function attribution() {
  try {
    const k = 'rr-attr', now = { t: Date.now(), ref: d.referrer ? new URL(d.referrer).hostname : '', page: location.pathname };
    ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid', 'msclkid'].forEach(x => { if (P.get(x)) now[x] = P.get(x); });
    now.medium = now.gclid || now.msclkid ? 'cpc' : /chatgpt|perplexity|gemini|copilot|claude/.test(now.ref) ? 'ai_referral' : /google|bing|duckduckgo|yahoo/.test(now.ref) ? 'organic' : now.ref ? 'referral' : 'direct';
    const a = JSON.parse(localStorage.getItem(k) || '{}');
    if (!a.first && now.medium !== 'direct') a.first = now;
    if (now.medium !== 'direct') a.last = now;
    a.pages = (a.pages || 0) + 1; localStorage.setItem(k, JSON.stringify(a));
  } catch (e) {}
})();
d.addEventListener('click', e => {
  const a = e.target.closest('a[href^="tel:"],a[href^="sms:"],[data-cta]'); if (!a) return;
  track(a.href && a.href.startsWith('tel:') ? 'call_tap' : a.href && a.href.startsWith('sms:') ? 'text_tap' : 'cta', { cta: a.dataset.cta || '' });
});

/* hero chips -> state */
$$('[data-chips] input').forEach(i => { if (est.situation === i.value) i.checked = true; i.addEventListener('change', () => { est.situation = i.value; saveEst(); const s = $('#f-sit'); if (s) s.value = i.value; }); });
$$('[data-adds]').forEach(a => a.addEventListener('click', () => { est.services = [...new Set([...(est.services || []), a.dataset.adds])]; saveEst(); }));
syncSms();

/* ---------------- ZIP coverage (shared by S5 and S11) ---------------- */
let zipData = null, townData = null;
async function loadZips() {
  if (!zipData) { const [z, t] = await Promise.all([fetch('assets/data/zips.json').then(r => r.json()), fetch('assets/data/towns.json').then(r => r.json())]); zipData = z; townData = t.towns; }
}
async function zipAnswer(zip) {
  if (!/^\d{5}$/.test(zip)) return null;
  try { await loadZips(); } catch (e) { return { ok: false, text: 'We couldn\'t check that just now. Call (937) 746-7377 and we\'ll tell you.' }; }
  const z = zipData[zip];
  if (!z || z[0] > 25) return { ok: false, text: 'That\'s outside our usual area. Call us and we\'ll tell you straight.' };
  const town = townData.find(t => t.name === z[1]);
  const facts = town && town.yearBuilt ? ` Half the homes in ${z[1]} were built before ${town.yearBuilt}.` : '';
  const dist = z[0] < 1.5 ? `${z[1]} is home. Our office is right here.` : town && Math.abs(town.mi - z[0]) < 3 ? `${z[1]} is about ${Math.round(z[0])} miles from us.` : `You're about ${Math.round(z[0])} miles from our office, near ${z[1]}.`;
  return { ok: true, town: z[1], mi: z[0], text: `Yes. ${dist}${facts}` };
}

/* ======================================================================
   Everything below needs the DOM ready; GSAP is optional (defer order).
   ====================================================================== */
function boot() {
  booted = true; H.dataset.motionFailed = String(!G() && !calm());
  const live = () => {
    updateOffice(); setInterval(updateOffice, 60000);
    updateHeroLight(true); setInterval(() => d.visibilityState === 'visible' && updateHeroLight(false), 300000);
    stormWatch();
    sentLine();
    const today = $('[data-today]'); if (today) today.textContent = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());
  };
  // core steps run as separate tasks (the hero headline first) so no boot task blocks input for long
  const core = [casts, splitLines, header, live, reveals, seams, cursor, conductorStart, paper]; // the estimate engine is core: a fast click on Send must never fall through to the no-JS form
  const idle = W.requestIdleCallback || (f => setTimeout(f, 1));
  const later = [storm, lampSection, layers, install, signature, work, towns, claim, faqLinks];
  const step = () => { const f = later.shift(); if (f) { f(); kick(); idle(step, { timeout: 300 }); } else readyDone(); };
  const next = () => { const f = core.shift(); if (f) { f(); setTimeout(next, 0); } else idle(step, { timeout: 300 }); };
  next();
}

/* ---------------- S0 header, drawer, phone carry ---------------- */
function header() {
  const hdr = $('.hdr'), bar = $('[data-bbar]'), fp = $('[data-fpill]'), heroCta = $('[data-hero-cta]');
  let lastY = scrollY, acc = 0;
  addEventListener('scroll', () => {
    const y = scrollY, dy = y - lastY; lastY = y;
    hdr.classList.toggle('is-solid', y > innerHeight * 0.6);
    if (y < 120) { hdr.classList.remove('is-hidden'); acc = 0; return; }
    if (dy > 0) { acc = 0; hdr.classList.add('is-hidden'); } else { acc -= dy; if (acc >= 8) hdr.classList.remove('is-hidden'); }
  }, { passive: true });
  let carried = false;
  new IntersectionObserver((_e) => { const en = _e[_e.length - 1];
    const on = !en.isIntersecting && en.boundingClientRect.top < 0;
    bar.classList.toggle('is-on', on);
    if (on && !carried && fine && !calm() && innerWidth >= 1024) { // FLIP the header pill into the floating pill
      const a = $('.hdr .pill').getBoundingClientRect(); fp.classList.add('is-on'); const b = fp.getBoundingClientRect();
      fp.animate([{ transform: `translate(${a.left - b.left}px,${a.top - b.top}px) scale(${a.width / b.width},${a.height / b.height})`, opacity: .4 }, { transform: 'none', opacity: 1 }], { duration: 400, easing: E.move });
      carried = true;
    } else fp.classList.toggle('is-on', on);
    if (!on) carried = false;
  }).observe(heroCta);
  const foot = $('.ftr');
  new IntersectionObserver((_e) => { const en = _e[_e.length - 1]; if (en.intersectionRatio >= 0.5) { bar.classList.remove('is-on'); fp.classList.remove('is-on'); } }, { threshold: [0, 0.5] }).observe($('.ftr .dir') || foot);
  // S0 V1: the 1px rule under the bar takes the ground colour of the chapter beneath it (two layers crossfaded, opacity only)
  const rule = d.createElement('span'); rule.className = 'hdr-rule'; rule.setAttribute('aria-hidden', 'true'); rule.innerHTML = '<i class="dk"></i><i class="lt"></i>'; hdr.append(rule);
  const grounds = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) hdr.dataset.ground = en.target.classList.contains('on-plaster') ? 'light' : 'dark'; }), { rootMargin: `-${64}px 0px -${Math.max(0, innerHeight - 66)}px 0px` });
  $$('main > section, .ftr').forEach(s => grounds.observe(s)); API.grounds = grounds;
  const drawer = $('[data-drawer]'), main = $('#main'); let btn = null;
  const close = () => { drawer.classList.remove('is-open'); if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.focus({ preventScroll: true }); } main.inert = false; };
  const open = b => { btn = b; drawer.classList.add('is-open'); b && b.setAttribute('aria-expanded', 'true'); main.inert = true; $('a', drawer).focus({ preventScroll: true }); };
  d.addEventListener('click', e => { const b = e.target.closest('[data-menu]'); if (b) open(b); });
  API.menu = { open, close };
  $('[data-menu-close]').addEventListener('click', close);
  drawer.addEventListener('click', e => { if (e.target.closest('nav a')) close(); });
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) close(); });
  $('[data-photos-jump]')?.addEventListener('click', () => setTimeout(() => $('#f-photos')?.focus({ preventScroll: true }), 600));
}

/* ---------------- cast shadows (§3.2) + conductor (§3.1) ---------------- */
const SUN = { hero: [12, 12, 8, 8], storm: [12, 12, 2, 2], inspect: [15, 25, 4, 10], layers: [25, 40, 10, 22], estimate: [40, 55, 22, 38], install: [55, 80, 38, 58], signature: [90, 90, 72, 72], work: [95, 106, 70, 63], reviews: [106, 117, 63, 56], people: [117, 128, 56, 49], towns: [128, 139, 49, 42], insurance: [139, 145, 42, 36], faq: [145, 150, 36, 30], close: [150, 160, 30, 12], footer: [160, 168, 12, 6] };
const hosts = [];
function casts(root = d) {
  const fresh = [];
  $$('.cast-host', root).forEach(el => {
    if (el.dataset.cast) return; el.dataset.cast = '1';
    const c = d.createElement('span'); c.className = 'cast'; c.setAttribute('aria-hidden', 'true');
    c.dataset.t = el.textContent.trim(); el.appendChild(c); // text drawn by ::before so contrast checkers skip the shadow
    const sec = el.closest('[data-chapter]');
    const h = { el, c, ch: sec ? sec.dataset.chapter : 'hero', sec, grow: calm() ? 1 : 0, vis: false }; hosts.push(h); fresh.push(h);
  });
  const io = new IntersectionObserver(es => es.forEach(en => { const h = hosts.find(h => h.el === en.target); if (h) h.vis = en.isIntersecting; }), { rootMargin: '20% 0px' });
  fresh.forEach(h => io.observe(h.el));
}
function sectionProgress(sec) { const r = R(sec), vh = innerHeight; return clamp((vh - r.top) / (r.height + vh), 0, 1); }
function sunFor(ch, p) { const s = SUN[ch] || SUN.hero; return calm() ? [(s[0] + s[1]) / 2, (s[2] + s[3]) / 2] : [lerp(s[0], s[1], p), lerp(s[2], s[3], p)]; }
function shadowTransform(th, ph, g) {
  // sun-vector cast: length follows 1/tan(elevation) (long at low sun, short at noon), side flips across noon; no skew (multi-line safe)
  const k = clamp(1 / Math.tan(ph * Math.PI / 180) * 0.12, 0.18, 1.0) * g;
  const side = clamp((90 - th) / 78, -1, 1); // +1 = light from the left, shadow falls right
  const len = k * 0.06; // em
  return `translate(${(side * len).toFixed(3)}em, ${(len * 0.5).toFixed(3)}em)`;
}
const subs = []; // per-frame subscribers: fn(dt)
const seen = new Set(); // every element ever measured through R(): read together at frame start, before any writes (no forced layout mid-frame)
let rc = new Map(); const R = el => { let r = rc.get(el); if (!r) { r = el.getBoundingClientRect(); rc.set(el, r); seen.add(el); } return r; };
let rafOn = false, lastT = 0, scrollDirty = true;
function conductorStart() {
  addEventListener('scroll', () => { scrollDirty = true; kick(); }, { passive: true });
  addEventListener('resize', () => { scrollDirty = true; kick(); });
  kick();
}
function kick() { if (!rafOn) { rafOn = true; requestAnimationFrame(frame); } }
let busy = 0;
function frame(t) {
  const dt = lastT ? Math.min(64, t - lastT) : 16; lastT = t; rc = new Map(); for (const el of seen) { if (el.isConnected) R(el); else seen.delete(el); }
  if (scrollDirty) {
    scrollDirty = false;
    for (const h of hosts) if (h.vis && h.el.isConnected) { const [th, ph] = sunFor(h.ch, h.sec ? sectionProgress(h.sec) : 0); h.c.style.transform = shadowTransform(th, ph, h.grow); }
  }
  busy = 0;
  for (const f of subs) if (f(dt, t)) busy++;
  if (busy) requestAnimationFrame(frame); else { rafOn = false; lastT = 0; }
}

/* ---------------- reveal grammar (§3.3) ---------------- */
function splitLines(root = d) {
  const io = new IntersectionObserver(_e => _e.forEach(en => { if (en.isIntersecting) { io.unobserve(en.target); splitOne(en.target); } }), { rootMargin: '60% 0px' });
  $$('[data-split]', root).forEach(el => { if (el.dataset.splitDone) return; if (el.id === 'h1' || calm() || !G()) splitOne(el); else io.observe(el); });
  hosts.forEach(h => { if (!h.el.hasAttribute('data-split') || calm() || !G()) h.grow = 1; });
}
function splitOne(el) {
  {
    if (calm() || !G()) { el.style.visibility = 'visible'; return; }
    const cast = $('.cast', el); if (cast) cast.remove();
    if (el.dataset.splitDone) return; el.dataset.splitDone = '1'; // one split per element, even if observer entries batch up
    const text = el.textContent.trim();
    // wrap words, keep inline markup (e.g. <u>) by splitting text nodes only
    const words = [];
    const walk = n => { [...n.childNodes].forEach(c => { if (c.nodeType === 3) { const parts = c.textContent.split(/(\s+)/); const f = d.createDocumentFragment(); parts.forEach(p => { if (/^\s+$/.test(p) || !p) f.append(p); else { const s = d.createElement('span'); s.className = 'w'; s.style.display = 'inline-block'; s.textContent = p; f.append(s); words.push(s); } }); c.replaceWith(f); } else if (c.nodeType === 1) walk(c); }); };
    walk(el);
    const lines = []; let top = null;
    words.forEach(w => { const tt = w.offsetTop; if (top === null || Math.abs(tt - top) > 4) { lines.push([]); top = tt; } lines[lines.length - 1].push(w); });
    el.innerHTML = '';
    lines.forEach(ws => { const line = d.createElement('span'); line.className = 'line'; line.setAttribute('aria-hidden', 'true'); const inner = d.createElement('span'); let u = null;
      // inline <u> markup is rebuilt per line, so underlined words never get pulled across a line break
      ws.forEach((w, i) => { const inU = !!w.closest('u'), nextU = i < ws.length - 1 && !!ws[i + 1].closest('u');
        if (inU) { if (!u) { u = d.createElement('u'); inner.append(u); } u.append(w); if (nextU) u.append(' '); } else { u = null; inner.append(w); }
        if (i < ws.length - 1 && !(inU && nextU)) inner.append(' '); });
      line.append(inner); if (el.lastChild) el.append(' '); el.append(line); }); // space between lines keeps raw text readable ("in good", not "ingood")
    const sr = d.createElement('span'); sr.className = 'sr-only'; sr.textContent = text; el.append(sr); el.dataset.text = text;
    if (el.classList.contains('cast-host')) { const c = d.createElement('span'); c.className = 'cast'; c.setAttribute('aria-hidden', 'true'); $$('.line', el).forEach(l => { const ln = d.createElement('span'), t = d.createElement('span'); ln.className = 'line'; t.dataset.t = l.textContent; ln.append(t); c.append(ln); }); el.append(c); const h = hosts.find(h => h.el === el); if (h) h.c = c; }
    const inners = $$(':scope > .line > span', el);
    G().set(inners, { yPercent: 110 }); el.style.visibility = 'visible';
    const host = hosts.find(h => h.el === el);
    const run = () => {
      G().to(inners, { yPercent: 0, duration: small() ? 0.72 : 0.9, ease: 'power4.out', stagger: 0.09, delay: el.id === 'h1' ? 0.2 : 0 });
      if (host) G().to(host, { grow: 1, duration: 0.9, delay: 0.15 + (el.id === 'h1' ? 0.2 : 0), ease: 'power4.out', onUpdate: () => { scrollDirty = true; kick(); } });
    };
    if (el.id === 'h1') run(); else { const io = new IntersectionObserver((_e) => { const en = _e[_e.length - 1]; if (en.isIntersecting) { io.disconnect(); run(); } }, { rootMargin: '0px 0px -18% 0px' }); io.observe(el); }
  }
}
function reveals(root = d) {
  if (calm()) { $$('.reveal-img', root).forEach(e => e.classList.add('is-in')); return; }
  H.classList.add('motion');
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -12% 0px' });
  $$('.reveal-img', root).forEach(e => io.observe(e));
}
function seams() {
  if (calm()) return;
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && en.boundingClientRect.top > 0) { en.target.classList.add('glint'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -40% 0px' });
  $$('.seam').forEach(s => io.observe(s));
}

/* ---------------- cursor (§3.8) ---------------- */
function cursor() {
  if (!fine || calm() || !G()) return;
  const r = $('[data-cursor]'); const qx = G().quickTo(r, 'x', { duration: 0.35, ease: 'power3' }), qy = G().quickTo(r, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    qx(e.clientX); qy(e.clientY);
    const t = e.target;
    const lamp = t.closest && t.closest('[data-hero-media],[data-lampbox]');
    const hide = t.closest && (t.closest('a[href^="tel:"],p,h1,h2,h3,label,input,select,textarea,summary,li') && !lamp);
    r.classList.toggle('is-lamp', !!lamp && !t.closest('a,button'));
    r.classList.toggle('is-on', !hide);
  }, { passive: true });
  d.addEventListener('pointerleave', () => r.classList.remove('is-on'));
}

/* ---------------- S2 storm stage ---------------- */
function storm() {
  const stage = $('[data-storm-stage]'); if (!stage || calm()) return;
  const sec = $('#storm'), beats = $$('[data-beat]', stage), layers = $$('.storm-layer', stage), cv = $('[data-rain]', stage), flash = $('[data-flash]', stage), stain = $('[data-stain]', stage), pauseBtn = $('[data-pause]', stage);
  const T = [0, 0.2, 0.38, 0.56, 0.74]; // beat starts (plan: 0.12/0.30/0.48/0.66/0.84 thresholds, first beat shown from entry)
  let cur = -1, flashed = false, visible = false, paused = false, ctx = cv.getContext('2d');
  if (!ctx) { sec.classList.add('no-canvas'); }
  // wind tabs
  const tabsEl = $('[data-tabs]', stage); let tabs = [];
  if (tabsEl) { const txt = tabsEl.textContent; tabsEl.textContent = ''; const line = d.createElement('span'); line.className = 'tabs-line'; line.setAttribute('aria-hidden', 'true');
    txt.split(/(\s)/).forEach(ch => { if (ch === ' ') { line.append(' '); return; } [...ch].forEach(c => { const s = d.createElement('span'); s.className = 'tab'; s.textContent = c; line.append(s); tabs.push(s); }); });
    tabsEl.append(line); const sr = d.createElement('span'); sr.className = 'sr-only'; sr.textContent = txt; tabsEl.append(sr); }
  let lastScroll = scrollY, vel = 0, gusting = false;
  function gust(strength) {
    if (gusting || !G()) return; gusting = true;
    const lift = clamp(strength, 10, 38);
    G().to(tabs, { rotationX: lift, '--crease': 0.55, duration: 0.65, ease: 'power3.out', stagger: 0.045, onComplete() {
      G().to(tabs, { rotationX: 0, '--crease': 0, duration: 0.65, ease: 'power3.out', stagger: 0.045, onComplete() { gusting = false; } }); } });
  }
  // rain + rain-written headline
  const DPR = Math.min(devicePixelRatio || 1, 1.25); let Wc = 0, Hc = 0, drops = [], hail = [], parts = null, partsT = 0;
  let quality = 1;
  function size() { Wc = cv.clientWidth; Hc = cv.clientHeight; cv.width = Wc * DPR; cv.height = Hc * DPR; ctx && ctx.setTransform(DPR, 0, 0, DPR, 0, 0); seed(); }
  function seed() { const n = Math.round((small() ? 120 : 300) * quality); drops = Array.from({ length: n }, () => ({ x: Math.random() * Wc * 1.3, y: Math.random() * Hc, v: 0.9 + Math.random() * 0.8, l: 10 + Math.random() * 16 })); hail = Array.from({ length: 40 }, () => ({ x: Math.random() * Wc, y: -Math.random() * Hc, v: 0.6 + Math.random() * 0.5, b: 0 })); }
  function buildParticles() {
    const h2 = $('#storm-title'); if (!h2 || !ctx) return;
    const r = h2.getBoundingClientRect(), cr = cv.getBoundingClientRect(); const cs = getComputedStyle(h2);
    const off = d.createElement('canvas'); off.width = Math.ceil(r.width); off.height = Math.ceil(r.height); const o = off.getContext('2d');
    o.fillStyle = '#fff'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; try { o.fontStretch = 'semi-expanded'; o.letterSpacing = cs.letterSpacing; } catch (e) {}
    const label = h2.dataset.text || h2.firstChild.textContent || h2.textContent; const txt = label.trim(); o.textAlign = 'left'; const mw = o.measureText(txt).width; o.fillText(txt, Math.max(0, (off.width - mw) / 2), off.height / 2 + 2);
    const data = o.getImageData(0, 0, off.width, off.height).data, step = small() ? 4 : 3, pts = [];
    for (let y = 0; y < off.height; y += step) for (let x = 0; x < off.width; x += step) if (data[(y * off.width + x) * 4 + 3] > 40) pts.push([x + r.left - cr.left, y + r.top - cr.top]);
    const max = small() ? 900 : 2400; const stride = Math.max(1, Math.ceil(pts.length / max));
    parts = pts.filter((_, i) => i % stride === 0).map((p, i) => { const seed = ((i * 9301 + 49297) % 233280) / 233280, depth = 0.45 + (((i * 233 + 97) % 1000) / 1000) * 0.9; return { tx: p[0], ty: p[1], sy: -12 - depth * 30 - seed * Hc * 0.22, delay: seed * 420, dur: 1600 * (0.45 + depth * 0.3) }; });
    partsT = performance.now(); sec.classList.add('rain-text');
  }
  let frames = [], acc = 0;
  function draw(dt, now) {
    if (!visible || paused || d.hidden || !ctx) return false;
    acc += dt; if (acc < 24) return true; // ≤40 fps (#41 caps)
    const step = acc / 16.7; acc = 0;
    frames.push(dt); if (frames.length > 60) frames.shift();
    if (frames.length === 60 && quality > 0.5) { const m = [...frames].sort((a, b) => a - b)[30]; if (m > 24) { quality = 0.5; seed(); track('quality_step', { where: 'storm', rung: 1 }); } }
    const p = stageP(); const ang = (8 + 16 * clamp(p / 0.6, 0, 1)) * Math.PI / 180, sx = Math.sin(ang), cy = Math.cos(ang);
    ctx.clearRect(0, 0, Wc, Hc);
    ctx.strokeStyle = 'rgba(200,214,232,0.32)'; ctx.lineWidth = 1; ctx.beginPath();
    for (const r of drops) { r.x += sx * 14 * r.v * step; r.y += cy * 14 * r.v * step; if (r.y > Hc) { r.y = -20; r.x = Math.random() * Wc * 1.3 - Wc * 0.15; } if (r.x > Wc + 40) r.x = -20; ctx.moveTo(r.x, r.y); ctx.lineTo(r.x - sx * r.l, r.y - cy * r.l); }
    ctx.stroke();
    if (p > 0.38 && p < 0.74) { ctx.fillStyle = 'rgba(236,233,228,0.85)'; const roof = Hc * 0.42;
      for (const h of hail) { h.y += 9 * h.v * step; if (h.b === 0 && h.y > roof + Math.random() * Hc * 0.2) { h.b = 1; h.vy = -3; } if (h.b) { h.vy += 0.5 * step; h.y += h.vy * step; if (h.y > Hc) { h.y = -20; h.b = 0; h.x = Math.random() * Wc; } } ctx.fillRect(h.x, h.y, 2.2, 2.2); } }
    if (parts) { const t = now - partsT; let done = true; ctx.fillStyle = 'rgba(236,233,228,0.95)';
      for (const q of parts) { const k = clamp((t - q.delay) / q.dur, 0, 1); if (k < 1) done = false; const e = k ** 1.7; const y = lerp(q.sy, q.ty, e); ctx.globalAlpha = 0.55 + 0.45 * k; ctx.fillRect(q.tx, y, 1.6, 1.6); }
      ctx.globalAlpha = 1; if (done && t > 2400) { parts = null; sec.classList.remove('rain-text'); } }
    return true;
  }
  function stageP() { const r = R(stage); return clamp(-r.top / (r.height - innerHeight), 0, 1); }
  subs.push((dt, now) => {
    if (!visible) return false;
    const p = stageP();
    let i = 0; for (let k = 0; k < T.length; k++) if (p >= T[k]) i = k;
    if (i !== cur) { beats.forEach((b, k) => b.classList.toggle('is-on', k === i)); cur = i;
      if (i === 2 && !flashed) { flashed = true; flash.animate([{ opacity: 0 }, { opacity: 0.18, offset: 0.4 }, { opacity: 0 }], { duration: 180, easing: 'linear' }); }
      if (i === 4) { stain.classList.add('is-on'); $$('[data-ring]', stain).forEach((c, k) => c.animate([{ opacity: 0, transform: 'scale(.4)' }, { opacity: 0.8, transform: 'scale(1)' }], { duration: 1200, delay: k * 1200, easing: E.out, fill: 'forwards' })); }
      else stain.classList.remove('is-on');
    }
    layers.forEach(l => l.style.transform = `translate3d(0,${(-(p - 0.5) * (+l.dataset.depth) * (small() ? 40 : 80)).toFixed(1)}px,0)`);
    const sy = scrollY; vel = lerp(vel, Math.abs(sy - lastScroll), 0.3); lastScroll = sy;
    if (i === 2 && vel > 6) gust(vel * 0.9);
    draw(dt, now);
    return true;
  });
  new IntersectionObserver((_e) => { const en = _e[_e.length - 1]; visible = en.isIntersecting; if (visible) { if (!Wc) size(); kick(); } }, { rootMargin: '10% 0px' }).observe(stage);
  new IntersectionObserver((_e) => { const en = _e[_e.length - 1]; if (en.isIntersecting && !parts && !sec.dataset.rained) { sec.dataset.rained = '1'; if (!Wc) size(); buildParticles(); kick(); } }, { threshold: 0.6 }).observe($('#storm-title'));
  addEventListener('resize', () => { if (visible) size(); });
  pauseBtn.addEventListener('click', () => { paused = !paused; pauseBtn.setAttribute('aria-pressed', String(paused)); pauseBtn.textContent = paused ? 'Play rain' : 'Pause rain'; if (paused && ctx) ctx.clearRect(0, 0, Wc, Hc); kick(); });
}

/* ---------------- S3 the lamp ---------------- */
function lampSection() {
  const box = $('[data-lampbox]'); if (!box) return;
  const hots = $$('[data-hot]', box), hint = $('[data-lamp-hint]', box), tools = $('[data-lamp-tools]');
  const lamp = { x: 0.3, y: 0.45, tx: 0.3, ty: 0.45 }; let mode = 'css', gl = null, near = hots.map(() => 0), lastPointer = 0;
  const dim = $('[data-dim]', box);
  dim.style.cssText = 'position:absolute;left:-100%;top:-100%;width:300%;height:300%;background:radial-gradient(circle at 50% 50%, rgba(24,17,13,0) 0, rgba(24,17,13,.18) 6.6%, rgba(10,8,6,.78) 14.6%);will-change:transform';
  const setCss = () => { dim.style.transform = `translate3d(${((lamp.x - 0.5) * 33.333).toFixed(3)}%,${((lamp.y - 0.5) * 33.333).toFixed(3)}%,0)`; };
  setCss();
  const found = h => { if (!h.classList.contains('found')) { h.classList.add('found'); track('hotspot_found', { n: hots.indexOf(h) + 1 }); } };
  hots.forEach((h, i) => h.addEventListener('focus', () => { const r = box.getBoundingClientRect(), hr = h.getBoundingClientRect(); lamp.tx = (hr.left + hr.width / 2 - r.left) / r.width; lamp.ty = (hr.top + hr.height / 2 - r.top) / r.height; found(h); kick(); }));
  if (calm()) { hots.forEach(found); lamp.x = lamp.tx = 0.55; lamp.y = lamp.ty = 0.55; setCss(); hint.textContent = 'Three spots of damage, lit and circled'; }
  box.addEventListener('pointermove', e => { if (e.pointerType === 'touch') return; const r = box.getBoundingClientRect(); lamp.tx = (e.clientX - r.left) / r.width; lamp.ty = (e.clientY - r.top) / r.height; lastPointer = performance.now(); hint.style.opacity = 0; kick(); });
  let visible = false;
  new IntersectionObserver((_e) => { const en = _e[_e.length - 1]; visible = en.isIntersecting; if (visible) kick(); }, { rootMargin: '10% 0px' }).observe(box);
  // WebGL relight (A2: kept only if it initialises with the real textures; otherwise the CSS lamp is the shipped path)
  const tryGl = () => {
    if (P.get('nogl') === '1' || !('WebGLRenderingContext' in W)) return;
    const img = $('[data-macro]', box);
    const go = () => import('./lamp.js').then(m => m.createLamp(box, img.currentSrc || img.src, small() ? 'assets/img/macro-height-1024.webp' : 'assets/img/macro-height-1600.webp', P.get('gl') === 'force')).then(g => { if (!g) return; gl = g; mode = 'gl'; dim.style.display = 'none'; tools.style.visibility = 'visible'; kick(); }).catch(() => {});
    img.complete ? go() : img.addEventListener('load', go, { once: true });
  };
  new IntersectionObserver((_e, io) => { const en = _e[_e.length - 1]; if (en.isIntersecting) { io.disconnect(); tryGl(); } }, { rootMargin: '60% 0px' }).observe(box);
  $('[data-drop]')?.addEventListener('click', () => { if (gl) { gl.drop(0.25 + Math.random() * 0.5, 0.25 + Math.random() * 0.5); kick(); } });
  $('[data-clear]')?.addEventListener('click', () => { gl && gl.clear(); kick(); });
  box.addEventListener('click', e => { if (!gl || e.target.closest('[data-hot]')) return; const r = box.getBoundingClientRect(); gl.drop((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); kick(); });
  subs.push(dt => {
    if (!visible) return false;
    if (!fine || performance.now() - lastPointer > 4000) { // touch / idle: scroll drives the lamp
      const r = R(box); const p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
      if (!fine || !lastPointer) { lamp.tx = 0.12 + p * 0.76; lamp.ty = 0.45 + Math.sin(p * Math.PI) * 0.12; }
    }
    const k = calm() ? 1 : 1 - Math.pow(1 - 0.08, dt / 16.7);
    lamp.x += (lamp.tx - lamp.x) * k; lamp.y += (lamp.ty - lamp.y) * k;
    const moving = Math.abs(lamp.tx - lamp.x) + Math.abs(lamp.ty - lamp.y) > 0.0008;
    const r = R(box);
    hots.forEach((h, i) => { const hx = parseFloat(h.style.left) / 100, hy = parseFloat(h.style.top) / 100; const dpx = Math.hypot((hx - lamp.x) * r.width, (hy - lamp.y) * r.height); near[i] = dpx < 90 ? near[i] + dt : 0; if (near[i] > 300) found(h); });
    if (mode === 'gl') { const busy = gl.render(lamp.x, lamp.y, dt); if (!gl.failed) return moving || busy; mode = 'css'; gl = null; dim.style.display = ''; tools.style.visibility = 'hidden'; } // watchdog handed back: still image + CSS lamp
    setCss(); return moving;
  });
}

/* ---------------- S4 exploded roof (Silo explode engine) ---------------- */
let layersSeen = false;
function layers() {
  const stage = $('[data-layers-stage]'); if (!stage) return;
  const plies = $$('[data-ply]', stage), tags = $$('[data-tag]', stage), leaders = $$('[data-leader]', stage), stack = $('[data-stack]', stage);
  const GAP = 46, N = plies.length;
  if (calm() || !G()) { tags.forEach(t => t.classList.add('is-on')); leaders.forEach(l => l.classList.add('is-on')); layersSeen = true; return; }
  const st = { ex: 0 }; let target = 0, tween = null, visible = false;
  const apply = () => {
    const sc = stack.clientWidth / 760;
    plies.forEach((pl, i) => { const local = clamp(st.ex * 1.6 - i * 0.09, 0, 1); const y = lerp(-(i - 3) * 3, -(i - 3) * GAP, local) * sc; pl.style.transform = `translate3d(0,${y.toFixed(1)}px,${(i * 22 * local).toFixed(1)}px)`;
      const on = local > 0.92; tags[i].classList.toggle('is-on', on); leaders[i].classList.toggle('is-on', on); });
    if (st.ex > 0.9) layersSeen = true;
  };
  apply();
  const tilt = { x: 0, y: 0 }; const qx = G().quickTo(tilt, 'x', { duration: 0.5, ease: 'power3', onUpdate: () => stack.style.transform = `rotateX(${tilt.y.toFixed(2)}deg) rotateY(${tilt.x.toFixed(2)}deg)` }), qy = G().quickTo(tilt, 'y', { duration: 0.5, ease: 'power3' });
  if (fine) stage.addEventListener('pointermove', e => { qx((e.clientX / innerWidth - 0.5) * 8); qy(-(e.clientY / innerHeight - 0.5) * 8); }, { passive: true });
  new IntersectionObserver((_e) => { const en = _e[_e.length - 1]; visible = en.isIntersecting; if (visible) kick(); }).observe(stage);
  subs.push(() => {
    if (!visible) return false;
    const r = R(stage); const p = clamp(-r.top / (r.height - innerHeight), 0, 1);
    let tgt = clamp((p - 0.05) / 0.6, 0, 1);
    if (tgt > 0 && tgt < 0.3 && tgt < st.ex) tgt = 0; // magnetic close within 0.3
    if (!fine) stack.style.transform = `rotateX(${(p * 4 - 2).toFixed(2)}deg)`;
    if (Math.abs(tgt - target) > 0.002) {
      const closing = tgt < target; target = tgt; tween && tween.kill();
      tween = G().to(st, { ex: tgt, duration: closing ? 0.6 : Math.max(0.35, Math.abs(tgt - st.ex)), ease: closing ? 'expo.out' : 'power2.out', onUpdate: apply });
    }
    return false;
  });
}

/* ---------------- S5 the paper: the estimate engine ---------------- */
let paperOn = false;
// a Send pressed before the deferred boot reaches the paper must not fall through to the no-JS mailto form
d.addEventListener('submit', e => { if (!paperOn && e.target.matches && e.target.matches('[data-paper]')) { e.preventDefault(); e.stopImmediatePropagation(); paper(); const f = e.target; setTimeout(() => f.requestSubmit(), 0); } }, true); // resubmit once the current submit dispatch has ended
function paper() {
  const form = $('[data-paper]'); if (!form || paperOn) return; paperOn = true;
  const f = { name: $('#f-name'), zip: $('#f-zip'), sit: $('#f-sit'), phone: $('#f-phone'), time: $('#f-time') };
  const ans = $('[data-zip-answer]'), items = $$('[data-item]'), prog = $$('[data-progress] i'), count = $('[data-stepcount]'), send = $('[data-send]'), result = $('[data-result]'), stamp = $('[data-stamp]');
  // restore saved answers
  if (est.name) f.name.value = est.name; if (est.zip) f.zip.value = est.zip; if (est.phone) f.phone.value = est.phone; if (est.situation) f.sit.value = est.situation; if (est.bestTime) f.time.value = est.bestTime;
  if (est.name || est.phone) { result.hidden = false; result.textContent = 'We kept your answers from last time. Check them and send when ready.'; }
  let started = false;
  const valid = { name: v => v.trim().length > 1, zip: v => /^\d{5}$/.test(v), phone: v => v.replace(/\D/g, '').length >= 10 };
  const msg = { name: 'Please add your name, so Rachel knows who to ask for.', zip: 'A 5-digit ZIP, please. It tells us if you are in our area.', phone: 'A phone number with area code, please, like (937) 555-0123.' };
  const setErr = (k, on) => { const el = f[k]; el.setAttribute('aria-invalid', String(!!on)); const e = $(`[data-err="${k}"]`); e.textContent = on ? msg[k] : ''; e.setAttribute('role', on ? 'alert' : ''); };
  const steps = () => [valid.name(f.name.value), valid.zip(f.zip.value), true, valid.phone(f.phone.value)];
  const updateSteps = () => { const s = steps(); prog.forEach((p, i) => p.classList.toggle('done', s[i])); const n = Math.min(4, s.filter(Boolean).length + (s.every(Boolean) ? 0 : 1)); count.textContent = s.every(Boolean) ? 'All four parts done. Ready to sign.' : `Step ${n} of 4`; };
  ['name', 'zip', 'phone'].forEach(k => {
    f[k].addEventListener('blur', () => { if (f[k].value) setErr(k, !valid[k](f[k].value)); });
    f[k].addEventListener('input', () => { est[k] = f[k].value; saveEst(); if (f[k].getAttribute('aria-invalid') === 'true' && valid[k](f[k].value)) setErr(k, false); updateSteps(); if (!started) { started = true; track('estimate_start'); } });
  });
  f.sit.addEventListener('change', () => { est.situation = f.sit.value; saveEst(); });
  f.time.addEventListener('change', () => { est.bestTime = f.time.value; saveEst(); });
  const checkZip = async () => { const a = await zipAnswer(f.zip.value); if (!a) { ans.textContent = ''; return; } ans.textContent = a.text; ans.classList.toggle('out', !a.ok); est.inArea = a.ok; est.town = a.town || ''; saveEst(); };
  f.zip.addEventListener('input', () => { f.zip.value = f.zip.value.replace(/\D/g, '').slice(0, 5); if (f.zip.value.length === 5) checkZip(); else ans.textContent = ''; });
  if (f.zip.value.length === 5) checkZip();
  updateSteps();
  // squares helper
  const foot = $('#f-foot'), pitch = $('#f-pitch'), out = $('[data-squares]');
  const sq = () => { const ft = parseFloat(foot.value.replace(/[^\d.]/g, '')); if (!ft) { out.textContent = ''; return; } const n = Math.round(ft * parseFloat(pitch.value) / 100); out.textContent = `About ${n} squares. The real number comes from a tape on your roof.`; est.squares = n; saveEst(); };
  foot.addEventListener('input', sq); pitch.addEventListener('change', sq);
  // photos: resize on device, upload one by one (stubbed, A5)
  const phIn = $('[data-photos]'), phList = $('[data-ph-list]'); est.photos = 0;
  phIn.addEventListener('change', async () => {
    const files = [...phIn.files].slice(0, 3); phList.innerHTML = ''; let ok = 0;
    for (const [i, file] of files.entries()) {
      const li = d.createElement('li'); li.innerHTML = `<span>Photo ${i + 1}</span><progress max="100" value="0"></progress><span data-s>Preparing…</span>`; phList.append(li);
      const bar = $('progress', li), st = $('[data-s]', li);
      try {
        const blob = await resizePhoto(file); st.textContent = `${Math.round(blob.size / 1024)} KB, sending…`;
        await fakeUpload(p => bar.value = p, P.get('photos') === 'fail-one' && i === 1);
        st.textContent = 'Sent'; ok++;
      } catch (e) { st.textContent = 'Didn\'t send'; st.className = 'bad'; }
    }
    est.photos = ok; saveEst();
    if (ok < files.length) { const li = d.createElement('li'); li.innerHTML = `<span>${ok} of ${files.length} photos sent. Bring the ${files.length - ok === 1 ? 'other one' : 'others'} to the inspection.</span>`; phList.append(li); }
  });
  // carrier: the layer labels land as line items (vector ledger)
  const landAll = () => items.forEach(i => { i.classList.remove('pending'); i.classList.add('landed'); });
  if (!calm()) items.forEach(i => i.classList.add('pending'));
  let landed = false;
  new IntersectionObserver((_e, io) => { const en = _e[_e.length - 1];
    if (!en.isIntersecting || landed) return; landed = true; io.disconnect();
    const tags = $$('[data-tag]');
    if (calm() || !layersSeen || !tags.length || !('animate' in Element.prototype)) { landAll(); return; }
    items.forEach((it, i) => {
      const tag = tags[i]; const from = tag.getBoundingClientRect(), to = $('.what', it).getBoundingClientRect();
      if (from.bottom < -200 || from.top > innerHeight + 200) { setTimeout(() => { it.classList.remove('pending'); it.classList.add('landed'); }, i * 60); return; }
      const ghost = $('b', tag).cloneNode(true); Object.assign(ghost.style, { position: 'fixed', left: from.left + 'px', top: from.top + 'px', margin: 0, zIndex: 40, fontFamily: 'var(--mona)', fontWeight: 600, fontSize: '.875rem', color: 'var(--ink-900)', pointerEvents: 'none', whiteSpace: 'nowrap' });
      d.body.append(ghost);
      ghost.animate([{ transform: 'none' }, { transform: `translate(${to.left - from.left}px,${to.top - from.top}px)` }], { duration: 700, delay: i * 60, easing: E.move, fill: 'forwards' }).onfinish = () => { ghost.remove(); it.classList.remove('pending'); it.classList.add('landed'); };
    });
  }, { rootMargin: '0px 0px -40% 0px' }).observe($('[data-items]'));
  // paper tooth lit by the sun (5 baked azimuths)
  const tooth = k => form.style.setProperty('--tooth', `url(${new URL(`assets/img/paper-lit-${k}.webp`, location.href)})`);
  tooth(0); let tk = 0;
  subs.push(() => { const sec = $('#estimate'); const r = R(sec); if (r.bottom < 0 || r.top > innerHeight) return false; const k = clamp(Math.floor(sectionProgress(sec) * 5), 0, 4); if (k !== tk && !calm()) { tk = k; tooth(k); } return false; });
  // submit (stubbed client-side, A5): ?submit=error | fail-once ; offline -> error
  let attempts = 0;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const bad = ['name', 'zip', 'phone'].filter(k => !valid[k](f[k].value)); ['name', 'zip', 'phone'].forEach(k => setErr(k, bad.includes(k)));
    if (bad.length) { f[bad[0]].focus(); track('estimate_error', { kind: 'validation', fields: bad.join(',') }); return; }
    Object.assign(est, { name: f.name.value, zip: f.zip.value, phone: f.phone.value, situation: f.sit.value, bestTime: f.time.value }); saveEst();
    await submit();
  });
  async function submit() {
    attempts++; send.classList.add('is-pending'); send.disabled = true; $$('input,select', form).forEach(i => i.readOnly = true);
    const ring = $('.ring circle', send); ring.style.strokeDashoffset = '113'; requestAnimationFrame(() => { ring.style.transition = 'stroke-dashoffset 1100ms linear'; ring.style.strokeDashoffset = '20'; });
    const mode = P.get('submit');
    const fail = !navigator.onLine || mode === 'error' || (mode === 'fail-once' && attempts === 1);
    await new Promise(r => setTimeout(r, 1200));
    if (fail) return failed();
    ring.style.transition = 'stroke-dashoffset 200ms linear'; ring.style.strokeDashoffset = '0';
    await new Promise(r => setTimeout(r, 220));
    send.classList.remove('is-pending'); $('[data-send-label]', send).textContent = 'Sent'; track('estimate_submit', { photos: est.photos || 0, inArea: !!est.inArea });
    const o = office(); const when = o.open && o.beforeFour ? 'today by 5 pm' : nextOpenPhrase(o);
    const ref = 'RR-' + Date.now().toString(36).slice(-6).toUpperCase();
    $('[data-stamp-sub]').textContent = `Rachel will call you ${when}.`;
    result.hidden = false; result.innerHTML = `<p style="max-width:none"><strong>Received.</strong> Rachel will call ${esc(est.phone)} ${when}. Your reference is <strong>${ref}</strong>.</p><p style="max-width:none">Storm damage right now? Call <a class="phone" href="tel:+19377467377">(937) 746-7377</a>.</p>`;
    stampIt();
    try { localStorage.removeItem('rr-estimate'); localStorage.setItem('rr-sent', JSON.stringify({ ref, when, t: Date.now() })); } catch (e) {}
    sentLine();
  }
  function failed() {
    send.classList.remove('is-pending'); send.disabled = false; $$('input,select', form).forEach(i => i.readOnly = false);
    track('estimate_error', { kind: 'send', attempt: attempts });
    const waits = [2, 4, 8]; const w = waits[attempts - 1];
    result.hidden = false;
    if (w) {
      let left = w; result.innerHTML = `<div class="err-box"><p style="max-width:none">We couldn't send that. Your answers are saved. Trying again in <span data-left>${left}</span> s, or call <a class="phone" href="tel:+19377467377">(937) 746-7377</a>.</p></div>`;
      const iv = setInterval(() => { left--; const s = $('[data-left]', result); if (s) s.textContent = left; if (left <= 0) { clearInterval(iv); submit(); } }, 1000);
    } else {
      const ref = 'RR-' + Date.now().toString(36).slice(-6).toUpperCase();
      result.innerHTML = `<div class="err-box"><p style="max-width:none">We still couldn't send it. Your answers are saved on this device. Please call <a class="phone" href="tel:+19377467377">(937) 746-7377</a> and give this reference: <strong>${ref}</strong> <button type="button" class="btn btn-line" data-copy style="min-height:36px;margin-left:8px">Copy</button></p></div>`;
      $('[data-copy]', result).onclick = e => { navigator.clipboard && navigator.clipboard.writeText(ref); e.target.textContent = 'Copied'; };
      $('[data-send-label]', send).textContent = 'Try again'; attempts = 0;
    }
  }
  function stampIt() {
    stamp.classList.add('is-on');
    if (calm()) { stamp.style.transform = 'rotate(-3deg)'; return; }
    stamp.animate([{ transform: 'rotate(-8deg) scale(1.35)', opacity: 0 }, { transform: 'rotate(-3deg) scale(1)', opacity: 0.92 }], { duration: 280, easing: E.over, fill: 'forwards' });
    form.animate([{ transform: 'none' }, { transform: 'translateY(2px)' }, { transform: 'none' }], { duration: 260, delay: 200, easing: E.out });
    const spread = d.createElement('span'); Object.assign(spread.style, { position: 'absolute', inset: '0', border: '2px solid currentColor', borderRadius: '6px', pointerEvents: 'none' }); stamp.append(spread);
    spread.animate([{ transform: 'scale(1)', opacity: 0.3 }, { transform: 'scale(1.08)', opacity: 0 }], { duration: 400, delay: 220, easing: E.out, fill: 'forwards' });
    const gl = $('[data-glare]'); gl.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(600px)' }], { duration: 650, delay: 520, easing: E.light, fill: 'forwards' });
    navigator.vibrate && navigator.vibrate(8);
  }
}
function sentLine() { // S14 carries the request state from the S5 stamp
  let s = null; try { s = JSON.parse(localStorage.getItem('rr-sent')); } catch (e) {}
  const el = $('[data-sent]'); if (!el || !s || Date.now() - s.t > 7 * 864e5) return;
  el.hidden = false; el.textContent = `We have your request (${s.ref}). Rachel will call you ${s.when}.`;
}
const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
async function resizePhoto(file) {
  const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const c = d.createElement('canvas'), enc = q => new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error('encode')), 'image/jpeg', q));
  // §8: each photo ≤ 400 KB after resize. Long side 1600, then step quality down, then size down (very noisy photos)
  for (let side = 1600; ; side = Math.round(side * 0.8)) {
    const s = Math.min(1, side / Math.max(bmp.width, bmp.height)); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height); // re-encoding drops EXIF, including location
    for (const q of [0.8, 0.7, 0.6, 0.5]) { const b = await enc(q); if (b.size <= 400 * 1024 || side < 640) return b; }
  }
}
function fakeUpload(onp, fail) { return new Promise((res, rej) => { let p = 0; const iv = setInterval(() => { p += 9 + Math.random() * 12; onp(Math.min(100, p)); if (fail && p > 55) { clearInterval(iv); rej(new Error('upload')); } if (p >= 100) { clearInterval(iv); res(); } }, 110); }); }

/* ---------------- S6 install day ---------------- */
function install() {
  const stage = $('[data-install-stage]'); if (!stage) return;
  const steps = $$('[data-step]', stage), fill = $('[data-rail] i'), marks = $$('[data-rail] b'), dots = $$('[data-dots] b');
  if (calm()) return;
  let cur = -1, visible = false;
  const show = i => {
    steps.forEach((s, k) => {
      const img = $('figure', s), txt = $('figure + div', s);
      if (k === i) { s.classList.add('is-on'); s.style.opacity = 1; img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: E.out, fill: 'both' }); txt.animate([{ opacity: 0, transform: `translateY(${small() ? 50 : 100}px)` }, { opacity: 1, transform: 'none' }], { duration: 700, easing: E.out, fill: 'both' }); }
      else if (k === cur) { const a = s.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateY(${small() ? -50 : -100}px)` }], { duration: 450, easing: E.out, fill: 'both' }); a.onfinish = () => { if (cur !== k) s.classList.remove('is-on'); }; }
    });
    marks.forEach((m, k) => m.classList.toggle('on', k <= i)); dots.forEach((m, k) => m.classList.toggle('on', k === i)); cur = i;
  };
  new IntersectionObserver((_e) => { const en = _e[_e.length - 1]; visible = en.isIntersecting; if (visible) kick(); }).observe(stage);
  subs.push(() => { if (!visible) return false; const r = R(stage); const p = clamp(-r.top / (r.height - innerHeight), 0, 1); fill.style.transform = `scaleY(${p.toFixed(3)})`; const i = Math.min(3, Math.floor(p * 4 * 0.999)); if (i !== cur) show(i); return false; });
  show(0);
}

/* ---------------- S7 signature + seal ---------------- */
function signature() {
  const path = $('[data-sig-path]'), seal = $('[data-seal]'); if (!path) return;
  const L = path.getTotalLength(); path.style.strokeDasharray = L; path.style.strokeDashoffset = calm() ? 0 : L;
  if (calm()) { seal && seal.classList.add('is-on'); return; }
  new IntersectionObserver((_e, io) => { const en = _e[_e.length - 1];
    if (!en.isIntersecting) return; io.disconnect();
    const a = path.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 1600, easing: E.ink, fill: 'forwards' });
    a.onfinish = () => { if (!seal) return; seal.classList.add('is-on'); seal.animate([{ transform: 'scale(1.2)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 260, easing: E.over, fill: 'forwards' });
      const ring = $('[data-seal-ring]', seal); const spin = ring.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 40000, iterations: Infinity });
      new IntersectionObserver(_e => _e[_e.length - 1].isIntersecting ? spin.play() : spin.pause()).observe(seal); };
  }, { rootMargin: '0px 0px -30% 0px' }).observe(path.closest('[data-sig]'));
}

/* ---------------- S8 plates: masked title drift + before/after ---------------- */
function work() {
  const t = $('[data-mask-title]');
  if (t && CSS.supports('background-clip', 'text') === false && CSS.supports('-webkit-background-clip', 'text') === false) H.classList.add('no-clip');
  if (t && t.dataset.bg) { const io = new IntersectionObserver((_e) => { if (_e[_e.length - 1].isIntersecting) { io.disconnect(); t.style.backgroundImage += `,url(${t.dataset.bg})`; } }, { rootMargin: '150% 0px' }); io.observe(t); } // photo fetched near, not at first style pass
  if (t && !calm()) {
    let vis = false, clock = 0, px = 0, py = 0; new IntersectionObserver((_e) => { const en = _e[_e.length - 1]; vis = en.isIntersecting; if (vis) kick(); }).observe(t);
    if (fine) t.addEventListener('pointermove', e => { const r = t.getBoundingClientRect(); px = ((e.clientX - r.left) / r.width - 0.5) * -2; py = ((e.clientY - r.top) / r.height - 0.5) * -2; });
    t.addEventListener('pointerleave', () => { px = py = 0; });
    let x = 50, y = 55;
    let accT = 0;
    subs.push(dt => { if (!vis) return false; clock += dt / 1000; accT += dt; if (accT < 48) return true; const k = 1 - Math.exp(-accT / 1000 / 0.18); accT = 0; const sx = small() ? 0.5 : 1;
      x += (50 + (Math.sin(clock * 0.21) * 1.8 + px * 2.6) * sx - x) * k; y += (55 + (Math.cos(clock * 0.17) * 1.8 * 0.6 + py * 2.6) * sx - y) * k;
      t.style.backgroundPosition = `${x.toFixed(2)}% ${y.toFixed(2)}%`; return true; });
  }
  const ba = $('[data-ba]'); if (!ba) return; const range = $('[data-ba-range]', ba);
  const set = v => ba.style.setProperty('--pos', v + '%');
  range.addEventListener('input', () => set(range.value));
  if (calm()) return;
  new IntersectionObserver((_e, io) => { const en = _e[_e.length - 1]; if (!en.isIntersecting) return; io.disconnect(); // one-time hint 40→26→56→40 (Oslo otmBaHint)
    const t0 = performance.now(); const k = [[0, 50], [0.15, 40], [0.45, 26], [0.8, 56], [1, 50]];
    const step = now => { const p = clamp((now - t0) / 1600, 0, 1); let v = 50; for (let i = 1; i < k.length; i++) if (p <= k[i][0]) { const a = k[i - 1], b = k[i], u = (p - a[0]) / (b[0] - a[0]); const e = u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2; v = lerp(a[1], b[1], e); break; } set(v.toFixed(1)); if (p < 1 && range.value == 50) requestAnimationFrame(step); };
    requestAnimationFrame(step); }, { threshold: 0.6 }).observe(ba);
}

/* ---------------- S11 towns ---------------- */
function towns() {
  const form = $('[data-zipform]'), out = $('[data-zip-out]'), svg = $('[data-rings] svg'); if (!form) return;
  const arc = svg && $('[data-arc]', svg);
  if (svg && !calm()) {
    const circles = $$('.ring', svg); circles.forEach(c => { const L = 2 * Math.PI * c.r.baseVal.value; c.style.strokeDasharray = L; c.style.strokeDashoffset = L; });
    const towns = $$('[data-town]', svg); towns.forEach(t => t.style.opacity = 0);
    new IntersectionObserver((_e, io) => { const en = _e[_e.length - 1]; if (!en.isIntersecting) return; io.disconnect();
      circles.forEach((c, i) => c.animate([{ strokeDashoffset: c.style.strokeDashoffset }, { strokeDashoffset: 0 }], { duration: 1200, delay: i * 150, easing: E.ink, fill: 'forwards' }));
      towns.forEach((t, i) => t.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 300 + i * 20, easing: E.out, fill: 'forwards' })); }, { threshold: 0.3 }).observe(svg);
  }
  form.addEventListener('submit', async e => {
    e.preventDefault(); const z = $('#z-in').value.trim(); const a = await zipAnswer(z);
    out.textContent = a ? a.text : 'Please enter a 5-digit ZIP.';
    if (!a || !svg) return;
    $$('.town', svg).forEach(t => t.classList.remove('lit'));
    const g = a.ok && $(`[data-town="${CSS.escape(a.town)}"]`, svg);
    if (g && a.town !== 'Springboro') { const dot = $('circle', g); const x = dot.cx.baseVal.value, y = dot.cy.baseVal.value, C = 410; const mx = (C + x) / 2 + (y - C) * 0.18, my = (C + y) / 2 - (x - C) * 0.18;
      arc.setAttribute('d', `M${C} ${C} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x} ${y}`); arc.style.opacity = 1; const L = arc.getTotalLength(); arc.style.strokeDasharray = L;
      if (calm()) arc.style.strokeDashoffset = 0; else arc.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 700, easing: E.ink, fill: 'forwards' });
      $('.town', g).classList.add('lit'); }
    est.zip = z; saveEst();
  });
}
function claim() { if (calm()) { $$('.csteps li').forEach(l => l.classList.add('is-on')); return; } const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-on'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -50% 0px' }); $$('.csteps li').forEach(l => io.observe(l)); }
function faqLinks() { const open = () => { const el = location.hash && d.getElementById(decodeURIComponent(location.hash.slice(1))); if (el && el.tagName === 'DETAILS') el.open = true; }; open(); addEventListener('hashchange', open); }
// §8: GSAP is fetched after the first paint; full motion boots once it lands (or fails), calm boots at once
// public surface for the 1|2|3 switcher and the alternate versions (versions.js, loaded after the defaults are live)
let readyDone; const ready = new Promise(r => readyDone = r);
const API = W.RR = { d, H, W, P, $, $$, clamp, lerp, calm, small, E, G, R, subs, kick, track, est, saveEst, syncSms, zipAnswer, loadZips, towns: () => townData, office, nextOpenPhrase, sun, NYT, esc: s => esc(s), sectionProgress, sunFor, ready,
  enhance(root) { casts(root); splitLines(root); reveals(root); scrollDirty = true; kick(); }, refresh() { scrollDirty = true; kick(); } };
ready.then(() => { if (!d.querySelector('[data-chapter]')) return; (W.requestIdleCallback || setTimeout)(() => import('./versions.js').catch(() => {})); });
const withGsap = f => { if (W.gsap) return f(); const s = d.createElement('script'); s.src = 'js/gsap.min.js'; if (!calm()) s.onload = s.onerror = () => f(); d.head.append(s); if (calm()) f(); };
const start = () => requestAnimationFrame(() => setTimeout(() => withGsap(boot), 0)); // after the first frame: reuse the browser's own layout
if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start); else start();
})();

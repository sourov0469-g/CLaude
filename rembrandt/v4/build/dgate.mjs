// Run D gate (PLAN §10): every ?v= version and combination renders, the page is refreshed after a switch, nothing jumps,
// storm mode works end to end, and the switcher's URL / keyboard / clean / showcase / calm / no-JS contracts hold.
// Usage: node dgate.mjs [--only=render,jump,...] ; starts serve.mjs on :8767 itself. Report: reports/dgate.json
import { createRequire } from 'node:module'; import { spawn } from 'node:child_process';
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const { chromium } = createRequire(import.meta.url)('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.SITE || path.resolve(here, '../../site');
const { ORDER } = await import(path.join(SITE, 'src/versions/order.js'));
const PORT = 8767, BASE = `http://localhost:${PORT}/`;
const only = (process.argv.find(a => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const want = t => !only.length || only.includes(t);
const WIDTHS = [[1440, 900], [375, 667]];
const server = spawn(process.execPath, [path.join(here, 'serve.mjs'), String(PORT)], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 600));

const results = []; let fails = 0;
const check = (group, name, ok, info = '') => { results.push({ group, name, ok, info }); if (!ok) fails++; console.log(`${ok ? 'ok  ' : 'FAIL'} [${group}] ${name}${info ? '  ' + info : ''}`); };
const IGNORE = /Failed to load resource|ERR_TUNNEL|weather\.gov|net::ERR/;
async function open(ctx, query = '') {
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if ((m.type() === 'error' || m.type() === 'warning') && !IGNORE.test(m.text())) errs.push(m.type() + ': ' + m.text().slice(0, 160)); });
  await p.goto(BASE + (query ? '?' + query : '') , { waitUntil: 'load' });
  await p.waitForFunction(() => window.RR && window.RR.swap, null, { timeout: 15000 }).catch(() => errs.push('switcher never started'));
  // put an element's top at a viewport fraction and wait until content-visibility sections stop moving it
  await p.evaluate(() => { window.__place = async (el, frac, extra = 0) => { for (let i = 0, still = 0; i < 14 && still < 2; i++) { const dy = el.getBoundingClientRect().top - innerHeight * frac + extra; if (Math.abs(dy) < 1) still++; else { still = 0; window.scrollBy({ top: dy, behavior: 'instant' }); } await new Promise(r => requestAnimationFrame(() => setTimeout(r, 60))); } return el.getBoundingClientRect().top; }; });
  return { p, errs };
}
const settle = (p, ms = 250) => p.waitForTimeout(ms);
// scroll the whole page (or one element) in steps so every subscriber runs at least once along the way
async function sweep(p, sel = null, step = 0.7) {
  await p.evaluate(async ([sel, step]) => {
    const vh = innerHeight; let y0 = 0, y1 = document.documentElement.scrollHeight - vh;
    if (sel) { const el = document.querySelector(sel); const r = el.getBoundingClientRect(); y0 = Math.max(0, scrollY + r.top - vh); y1 = Math.min(y1, scrollY + r.bottom); }
    for (let y = y0; y <= y1 + 1; y += vh * step) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => requestAnimationFrame(() => setTimeout(r, 40))); }
  }, [sel, step]);
}
const secSel = k => k === 'header' ? '.hdr' : k === 'footer' ? '.ftr' : `section[data-chapter="${k}"]`;
// text that runs past the viewport edge, outside any element that scrolls or clips sideways on purpose
const clippedText = (p, sel) => p.evaluate(sel => {
  const root = document.querySelector(sel); if (!root) return ['(no section)']; const W = innerWidth, out = [];
  const scroller = el => { for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const s = getComputedStyle(a); if (/auto|scroll|hidden|clip/.test(s.overflowX) && a !== document.querySelector('main') && a.tagName !== 'FOOTER') { const r = a.getBoundingClientRect(); if (r.left >= -1 && r.right <= W + 1) return true; } } return false; };
  for (const el of root.querySelectorAll('*')) {
    if (el.closest('.vpill,svg,[aria-hidden="true"],template,.sr-only')) continue;
    const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()); if (!own) continue;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    if ((r.right > W + 1 || r.left < -1) && !scroller(el)) out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} "${el.textContent.trim().slice(0, 30)}" ${Math.round(r.left)}..${Math.round(r.right)}`);
  }
  return out.slice(0, 6);
}, sel);

const browser = await chromium.launch();
try {
  // ---------------- 1. every version on its own, both widths
  if (want('render')) for (const [w, h] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    for (const key of ORDER) for (const n of [2, 3]) {
      const { p, errs } = await open(ctx, `v=${key}:${n}&nws=off`);
      const applied = await p.waitForFunction(([k, n]) => window.RR.versions && window.RR.versions[k] === n, [key, n], { timeout: 8000 }).then(() => true, () => false);
      await sweep(p, key === 'header' ? null : secSel(key)); await settle(p, 300);
      const info = await p.evaluate(([sel, k, n]) => {
        const s = document.querySelector(sel), r = s.getBoundingClientRect();
        const pill = s.querySelector(':scope > .vpill [aria-pressed="true"]');
        const imgs = [...s.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0 && i.currentSrc).map(i => i.currentSrc.split('/').pop());
        return { h: Math.round(r.height), text: s.textContent.replace(/\s+/g, ' ').trim().length, pill: pill && +pill.dataset.v, url: new URL(location.href).searchParams.get('v'), broken: imgs };
      }, [secSel(key), key, n]);
      const clip = await clippedText(p, secSel(key));
      const ok = applied && !errs.length && info.h > 40 && info.text > 30 && info.pill === n && info.url === `${key}:${n}` && !info.broken.length && !clip.length;
      check(`render ${w}`, `${key}:${n}`, ok, ok ? `h ${info.h}` : JSON.stringify({ applied, errs: errs.slice(0, 3), ...info, clip }));
      await p.close();
    }
    await ctx.close();
  }

  // ---------------- 2. no jump: switch by pill (and by key) with the section part-way up the screen
  if (want('jump')) for (const [w, h] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const { p, errs } = await open(ctx, 'nws=off');
    let worst = 0; const bad = [], clamped = [];
    for (const key of ORDER.filter(k => k !== 'header')) for (const where of ['top', 'mid']) {
      for (const n of [2, 3, 1]) {
        await p.evaluate(([sel, where]) => { const s = document.querySelector(sel), r = s.getBoundingClientRect();
          return window.__place(s, where === 'top' ? 0.25 : 0, where === 'top' ? 0 : Math.min(r.height * 0.5, r.height - innerHeight * 0.6)); }, [secSel(key), where]);
        await settle(p, 120);
        const before = await p.evaluate(sel => document.querySelector(sel).getBoundingClientRect().top, secSel(key));
        const done = p.evaluate(() => new Promise(r => document.addEventListener('rr:version', r, { once: true })));
        await p.evaluate(([sel, n]) => document.querySelector(sel).querySelector(`:scope > .vpill [data-v="${n}"]`).click(), [secSel(key), n]);
        await Promise.race([done, p.waitForTimeout(3000)]); await settle(p, 150);
        const { after, atEnd } = await p.evaluate(sel => ({ after: document.querySelector(sel).getBoundingClientRect().top, atEnd: scrollY >= document.documentElement.scrollHeight - innerHeight - 1 }), secSel(key));
        const dlt = Math.abs(after - before);
        if (dlt > 2 && atEnd && after > before) clamped.push(`${key}@${where}->${n}`); // the page got shorter below the view: the browser clamps, nothing to scroll to
        else { worst = Math.max(worst, dlt); if (dlt > 2) bad.push(`${key}@${where}->${n}: ${Math.round(before)}→${Math.round(after)}`); }
      }
    }
    check(`jump ${w}`, 'pill switches keep the section top (32 versions × top/mid × 3 swaps)', !bad.length && !errs.length, `worst ${worst.toFixed(1)}px${clamped.length ? `, clamped at page end: ${clamped.join(' ')}` : ''} ${bad.slice(0, 5).join('; ')} ${errs.slice(0, 2).join(' ')}`);
    // keyboard: "2" switches the section nearest the 40% line; typing in an input never switches
    const kb = await p.evaluate(async () => { const s = document.querySelector('section[data-chapter="towns"]'); document.activeElement && document.activeElement.blur(); return window.__place(s, 0.3); });
    await p.keyboard.press('2'); await settle(p, 700);
    const kbAfter = await p.evaluate(() => ({ v: window.RR.versions.towns, top: document.querySelector('section[data-chapter="towns"]').getBoundingClientRect().top }));
    check(`jump ${w}`, 'key 2 switches the section at the 40% line, no jump', kbAfter.v === 2 && Math.abs(kbAfter.top - kb) <= 2, JSON.stringify(kbAfter));
    const field = await p.evaluate(() => { const i = [...document.querySelectorAll('main input[type=text], main input[type=tel], main input:not([type])')].find(i => i.offsetParent && getComputedStyle(i).visibility !== 'hidden'); i.scrollIntoView({ block: 'center', behavior: 'instant' }); i.focus(); return document.activeElement === i ? (i.id || i.name || i.className) : 'not focused'; });
    const v0 = await p.evaluate(() => JSON.stringify(window.RR.versions)); await p.keyboard.press('3'); await settle(p, 400);
    check(`jump ${w}`, 'keys are ignored while typing in a field', v0 === await p.evaluate(() => JSON.stringify(window.RR.versions)), 'field ' + field);
    await p.close(); await ctx.close();
  }

  // ---------------- 3. refresh after switch: a later sticky stage reads the same state at the same relative position
  if (want('refresh')) for (const [w, h] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const probe = async (p) => { await p.evaluate(async () => { const s = document.querySelector('[data-install-stage]'); const r = s.getBoundingClientRect(); window.scrollTo({ top: scrollY + r.top + (r.height - innerHeight) * 0.625, behavior: 'instant' }); }); await settle(p, 500);
      return p.evaluate(() => ({ step: [...document.querySelectorAll('[data-install-stage] [data-step]')].findIndex(s => s.classList.contains('is-on')), marks: document.querySelectorAll('[data-rail] b.on').length })); };
    const a = await open(ctx, 'nws=off'); await sweep(a.p, null, 1.5); const s1 = await probe(a.p); await a.p.close();
    const b = await open(ctx, 'nws=off'); await sweep(b.p, null, 1.5);
    for (const [k, n] of [['storm', 3], ['inspect', 2], ['layers', 2], ['estimate', 3]]) await b.p.evaluate(([k, n]) => window.RR.swap(k, n), [k, n]);
    const s2 = await probe(b.p);
    check(`refresh ${w}`, 'S6 stage state after upstream switches matches a fresh load', s1.step === s2.step && s1.marks === s2.marks && s1.step === 2 && !b.errs.length, JSON.stringify({ fresh: s1, switched: s2, errs: b.errs.slice(0, 2) }));
    await b.p.close(); await ctx.close();
  }

  // ---------------- 4. combinations: all 2s, all 3s, seeded mixes; the whole page scrolled
  if (want('combo')) {
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const combos = { 'all-2': ORDER.map(k => `${k}:2`), 'all-3': ORDER.map(k => `${k}:3`) };
    for (let i = 0; i < 6; i++) combos['mix-' + (i + 1)] = ORDER.map(k => `${k}:${1 + Math.floor(rnd() * 3)}`).filter(s => !s.endsWith(':1'));
    for (const [w, h] of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h } });
      for (const [name, list] of Object.entries(combos)) {
        const { p, errs } = await open(ctx, 'nws=off&v=' + list.join(','));
        const want2 = Object.fromEntries(list.map(s => s.split(':')).map(([k, n]) => [k, +n]));
        const applied = await p.waitForFunction(m => Object.entries(m).every(([k, n]) => window.RR.versions[k] === n), want2, { timeout: 15000 }).then(() => true, () => false);
        await sweep(p); await settle(p, 300);
        const geo = await p.evaluate(sels => { let prev = -Infinity, issues = [];
          sels.forEach(([k, sel]) => { if (k === 'header') return; const s = document.querySelector(sel); if (!s) { issues.push(k + ' missing'); return; } const r = s.getBoundingClientRect(), top = r.top + scrollY, bot = r.bottom + scrollY; if (r.height < 40) issues.push(`${k} h ${Math.round(r.height)}`); if (top < prev - 1) issues.push(`${k} overlaps previous by ${Math.round(prev - top)}px`); prev = bot; });
          return { issues, url: new URL(location.href).searchParams.get('v'), H: document.documentElement.scrollHeight }; }, ORDER.map(k => [k, secSel(k)]));
        const urlOk = geo.url === list.join(',');
        check(`combo ${w}`, `${name} (${list.length} switched)`, applied && !errs.length && !geo.issues.length && urlOk, `page ${geo.H}px ${geo.issues.join('; ')} ${errs.slice(0, 3).join(' | ')}${urlOk ? '' : ' url=' + geo.url}`);
        await p.close();
      }
      await ctx.close();
    }
  }

  // ---------------- 5. storm mode (§3.12)
  if (want('storm')) for (const [w, h] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const state = p => p.evaluate(() => ({ on: document.documentElement.classList.contains('storm-mode'), storm: window.RR.versions.storm, faq: window.RR.versions.faq, panel: !!document.querySelector('[data-nh]'), panelAfterHero: document.querySelector('section[data-chapter="hero"]').nextElementSibling?.matches('.nexthour, [data-nexthour], section:has([data-nh])') ?? false, url: location.search, sms: [...document.querySelectorAll('.nexthour a[href^="sms:"], [data-nh] ~ * a[href^="sms:"]')].length }));
    let { p, errs } = await open(ctx, 'storm=1&nws=off'); await p.waitForFunction(() => document.documentElement.classList.contains('storm-mode') && window.RR.versions.storm === 's', null, { timeout: 8000 }).catch(() => {});
    let s = await state(p);
    check(`storm ${w}`, '?storm=1 re-composes the page', s.on && s.storm === 's' && s.faq === 3 && s.panel && s.panelAfterHero && /storm=1/.test(s.url), JSON.stringify(s));
    await sweep(p); await settle(p);
    const tick = await p.evaluate(async () => { const c = document.querySelector('[data-nh] input'); c.click(); await new Promise(r => setTimeout(r, 50)); return { done: c.closest('li').classList.contains('done'), saved: sessionStorage.getItem('rr-nexthour') }; });
    check(`storm ${w}`, 'next-hour items tick and persist for the session', tick.done && /true/.test(tick.saved || ''), JSON.stringify(tick));
    await p.evaluate(() => document.querySelector('[data-storm-exit]').click()); await settle(p, 900);
    s = await state(p);
    check(`storm ${w}`, '"Show the whole story" leaves storm mode', !s.on && s.storm === 1 && s.faq === 1 && !s.panel && !/storm=1/.test(s.url) && !errs.length, JSON.stringify(s) + ' ' + errs.slice(0, 2).join(' '));
    await p.close();
    ({ p, errs } = await open(ctx, 'nws=off'));
    await p.evaluate(() => sessionStorage.removeItem('rr-storm'));
    const y0 = await p.evaluate(() => scrollY);
    await p.evaluate(() => { const i = [...document.querySelectorAll('[data-chips] input')].find(i => i.value === 'storm'); (i.labels[0] || i).click(); });
    await p.waitForFunction(() => document.documentElement.classList.contains('storm-mode'), null, { timeout: 8000 }).catch(() => {}); await settle(p, 600);
    s = await state(p); const y1 = await p.evaluate(() => scrollY);
    check(`storm ${w}`, 'the "A storm came through" chip enters storm mode without moving the hero', s.on && s.storm === 's' && Math.abs(y1 - y0) < 2 && !errs.length, JSON.stringify({ ...s, y0, y1 }));
    await p.close();
    ({ p, errs } = await open(ctx, 'nws=off&v=storm:2,faq:2&storm=1')); await settle(p, 1200);
    await p.evaluate(() => document.querySelector('[data-storm-exit]')?.click()); await settle(p, 900);
    s = await state(p);
    check(`storm ${w}`, 'leaving storm mode restores the versions chosen before it', s.storm === 2 && s.faq === 2 && /v=storm:2,faq:2/.test(s.url), JSON.stringify(s));
    await p.close();
    ({ p, errs } = await open(ctx, 'nws=off')); await sweep(p, null, 1.5);
    const held = await p.evaluate(async () => { const s = document.querySelector('section[data-chapter="towns"]'); const before = await window.__place(s, 0.3); await window.RR.storm.enter('test'); await new Promise(r => setTimeout(r, 300)); return { before: Math.round(before), after: Math.round(s.getBoundingClientRect().top), storm: window.RR.versions.storm }; });
    check(`storm ${w}`, 'entering storm mode deep in the page keeps the reader where they are', held.storm === 's' && Math.abs(held.after - held.before) <= 2 && !errs.length, JSON.stringify(held));
    await p.close();
    ({ p, errs } = await open(ctx, 'nws=test')); await settle(p, 2500);
    s = await state(p);
    const banner = await p.evaluate(() => { const b = document.querySelector('[data-storm-banner]'); return b && !b.hidden ? b.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) : null; });
    check(`storm ${w}`, '?nws=test: the warning banner arms storm mode', !!banner && s.on, JSON.stringify({ banner, on: s.on }));
    await p.close(); await ctx.close();
  }

  // ---------------- 6. URL, clean, showcase, H, unknown keys, lazy templates
  if (want('ui')) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    let { p, errs } = await open(ctx, 'nws=off'); const reqs = []; p.on('request', r => reqs.push(r.url()));
    await settle(p, 2500);
    check('ui', 'templates are not fetched until a switch', !reqs.some(u => /versions\.html/.test(u)));
    await p.evaluate(() => document.querySelector('section[data-chapter="work"] > .vpill [data-v="2"]').click()); await settle(p, 900);
    check('ui', 'first switch fetches versions.html once', reqs.filter(u => /versions\.html/.test(u)).length === 1);
    await p.keyboard.press('h'); const off = await p.evaluate(() => document.documentElement.classList.contains('vp-off') && getComputedStyle(document.querySelector('.vpill')).display === 'none');
    await p.keyboard.press('h'); const on = await p.evaluate(() => !document.documentElement.classList.contains('vp-off'));
    check('ui', 'H hides and shows the pills', off && on);
    const ttl = await p.evaluate(() => document.querySelector('section[data-chapter="storm"] > .vpill [data-v="2"]').title);
    check('ui', 'pill tooltips name the version', ttl === '2: The year in one roof', ttl);
    await p.close();
    ({ p, errs } = await open(ctx, 'clean=1&v=hero:3&nws=off')); await settle(p, 1500);
    const cl = await p.evaluate(() => ({ pills: document.querySelectorAll('.vpill').length, hero: window.RR.versions.hero }));
    await p.evaluate(() => { document.activeElement?.blur(); return window.__place(document.querySelector('section[data-chapter="reviews"]'), 0.3); }); await settle(p, 200);
    await p.keyboard.press('3'); await settle(p, 800);
    check('ui', '?clean=1: no pills, ?v still applied, presenter keys still switch', cl.pills === 0 && cl.hero === 3 && await p.evaluate(() => window.RR.versions.reviews === 3), JSON.stringify(cl));
    await p.close();
    ({ p, errs } = await open(ctx, 'showcase=1&nws=off')); await settle(p, 1500);
    await p.evaluate(() => document.querySelector('.vindex-btn').click());
    await p.evaluate(() => document.querySelector('.vindex-panel [data-k="install"][data-n="3"]').click()); await settle(p, 1200);
    const sc = await p.evaluate(() => ({ v: window.RR.versions.install, url: location.search, inView: Math.abs(document.querySelector('section[data-chapter="install"]').getBoundingClientRect().top) < 120 }));
    check('ui', '?showcase=1: the Versions index switches and scrolls to the section', sc.v === 3 && /install:3/.test(sc.url) && sc.inView, JSON.stringify(sc));
    await p.close();
    ({ p, errs } = await open(ctx, 'v=bogus:2,hero:9,storm:2,towns:2:3&nws=off')); await settle(p, 1500);
    const uk = await p.evaluate(() => ({ storm: window.RR.versions.storm, hero: window.RR.versions.hero, url: new URL(location.href).searchParams.get('v') }));
    check('ui', 'unknown or malformed ?v entries are ignored', uk.storm === 2 && uk.hero === 1 && uk.url === 'storm:2' && !errs.length, JSON.stringify(uk) + errs.join(' '));
    await p.close(); await ctx.close();
  }

  // ---------------- 7. calm mode with alternates
  if (want('calm')) for (const [w, h] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    for (const n of [2, 3]) {
      const { p, errs } = await open(ctx, 'nws=off&v=' + ORDER.map(k => `${k}:${n}`).join(','));
      await p.waitForFunction(n => Object.values(window.RR.versions).every(v => v === n), n, { timeout: 15000 }).catch(() => {});
      await sweep(p); await settle(p, 300);
      const c = await p.evaluate(() => ({ calm: document.documentElement.classList.contains('calm'), hidden: [...document.querySelectorAll('main h2, main h3, main p')].filter(e => { const s = getComputedStyle(e); return e.offsetParent && (+s.opacity < 0.99 || s.visibility === 'hidden'); }).map(e => e.textContent.trim().slice(0, 30)).slice(0, 5), tall: [...document.querySelectorAll('main section')].filter(s => s.getBoundingClientRect().height > innerHeight * 4.5).map(s => s.dataset.chapter) }));
      check(`calm ${w}`, `all-${n} in calm`, c.calm && !errs.length && !c.hidden.length && !c.tall.length, JSON.stringify(c) + ' ' + errs.slice(0, 2).join(' | '));
      await p.close();
    }
    await ctx.close();
  }

  // ---------------- 8. no-JS: defaults complete, no switcher
  if (want('nojs')) {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 667 }, javaScriptEnabled: false });
    const p = await ctx.newPage(); await p.goto(BASE, { waitUntil: 'load' });
    const nj = await p.evaluate(() => ({ pills: document.querySelectorAll('.vpill').length, sections: document.querySelectorAll('main section[data-chapter]').length, tpl: document.querySelectorAll('template').length, form: !!document.querySelector('form#estimate-form, #estimate form') }));
    check('nojs', 'no pills, every default section present, the estimate is a plain form', nj.pills === 0 && nj.sections >= 14 && nj.form, JSON.stringify(nj));
    await ctx.close();
  }
} finally {
  await browser.close(); server.kill();
  fs.mkdirSync(path.join(here, 'reports'), { recursive: true });
  fs.writeFileSync(path.join(here, 'reports', `dgate${only.length ? '-' + only.join('-') : ''}.json`), JSON.stringify({ when: new Date().toISOString(), fails, results }, null, 1));
  console.log(`\n${results.length - fails}/${results.length} passed`);
  process.exitCode = fails ? 1 : 0;
}

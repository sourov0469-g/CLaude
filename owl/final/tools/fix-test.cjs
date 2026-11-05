// Fix-phase checks for ONE version of ONE section, run on the finished homepage (owl-roofing.html, NEW mode).
//   node fix-test.cjs <section id> <version> <out dir relative to owl/final>
// Generic checks (every version): axe WCAG 2.1 A/AA in the four muted palettes, the facts lock, no skeleton, SHARPNESS
// (no image or video shown larger than its pixels allow), DISTINCT MEDIA (no file in two sections; nothing twice on screen),
// no sideways scroll and 44 px controls at 1440/768/390, reduced motion, no errors.
// Version-specific behaviour lives in tools/fix-checks/<section>-v<version>.cjs  ({ extra(p, rec, ctx), reduced(p, rec, ctx) }).
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const F = 'file://' + path.resolve(__dirname, '../' + (process.env.PAGE || 'owl-roofing.html'));
const [SEC, V, OUTD] = process.argv.slice(2); const OUT = path.resolve(__dirname, '..', OUTD || 'gates/fix/tmp'); fs.mkdirSync(OUT, { recursive: true });
const QV = SEC && V ? SEC + '=' + V : '';
const url = q => F + '?' + [QV, q || ''].filter(Boolean).join('&');
const res = []; const rec = (name, ok, info) => { res.push({ name, ok: !!ok, info: info || '' }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + name + (info ? ' | ' + info : '')); };
const specFile = path.join(__dirname, 'fix-checks', SEC + '-v' + V + '.cjs'); const spec = fs.existsSync(specFile) ? require(specFile) : {};
const PALS = ['shingle', 'navy', 'hearth', 'stone'];

// in-page: every image/video in a section with the scale it is shown at (1 = pixel for pixel), honouring object-fit
const MEASURE = s => { const sec = document.getElementById(s), out = [];
  sec.querySelectorAll('img, video').forEach(e => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
    if (r.width < 60 || r.height < 60 || cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;
    const nw = e.tagName === 'VIDEO' ? e.videoWidth : e.naturalWidth, nh = e.tagName === 'VIDEO' ? e.videoHeight : e.naturalHeight; if (!nw || !nh) return;
    const fit = cs.objectFit, sx = r.width / nw, sy = r.height / nh, k = fit === 'cover' ? Math.max(sx, sy) : fit === 'contain' || fit === 'scale-down' ? Math.min(sx, sy) : Math.max(sx, sy);
    out.push({ el: e.tagName.toLowerCase() + (e.className ? '.' + String(e.className).split(' ')[0] : ''), nw, nh, rw: Math.round(r.width), rh: Math.round(r.height), k: +k.toFixed(3) }); });
  return out; };
// in-page: every shown medium on the page, by section, with a content key (hash input)
const MEDIA = () => { const out = []; document.querySelectorAll('main > section').forEach(sec => sec.querySelectorAll('img, video').forEach(e => {
    const cs = getComputedStyle(e), r = e.getBoundingClientRect(); const src = e.currentSrc || e.src || e.getAttribute('src') || '';
    if (!src || src.startsWith('data:image/gif;base64,R0lGOD') || src.startsWith('data:image/svg')) return;
    out.push({ sec: sec.id, tag: e.tagName.toLowerCase(), cls: String(e.className), src: src.length > 200 ? src.slice(0, 60) + '#' + src.length + '#' + src.slice(-200) : src, shown: r.width > 30 && r.height > 30 && cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.05, rect: [Math.round(r.top + scrollY), Math.round(r.left)] });
    if (e.poster) out.push({ sec: sec.id, tag: 'poster', cls: '', src: e.poster.slice(0, 60) + '#' + e.poster.length + '#' + e.poster.slice(-200), shown: false, rect: [0, 0] }); })); return out; };

(async () => { const b = await chromium.launch(); const errs = [];
  const open = async (q, o) => { const p = await b.newPage(Object.assign({ viewport: { width: 1440, height: 900 } }, o || {})); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); await p.route('https://**', r => r.abort()); await p.goto(url(q)); await p.waitForTimeout(1500); return p; };
  const settle = async p => { await p.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start', behavior: 'instant' }), SEC); await p.evaluate(s => { const e = document.getElementById(s); scrollTo(0, e.offsetTop + Math.max(0, e.offsetHeight - innerHeight)); }, SEC); await p.waitForTimeout(1800); await p.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start', behavior: 'instant' }), SEC); await p.waitForTimeout(1500); };
  let p = await open();
  rec('the switcher shows this version: ' + SEC + ' V' + V, await p.evaluate(([s, v]) => window.RESET.versions[s] && window.RESET.versions[s].cur === +v && !!document.getElementById(s), [SEC, V]));
  for (const pal of PALS) {
    await p.evaluate(pal => document.documentElement.dataset.pal = pal, pal); await p.addScriptTag({ content: AXE }); await settle(p);
    if (spec.beforeAxe) await spec.beforeAxe(p);
    const ax = await p.evaluate(async s => { const r = await axe.run(document.getElementById(s), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(x => x.id + '(' + x.nodes.length + ':' + x.nodes[0].target.join(' ') + ')'); }, SEC);
    rec('axe WCAG 2.1 A/AA, palette ' + pal + ': 0 violations', ax.length === 0, ax.join(' '));
  }
  await p.evaluate(() => document.documentElement.dataset.pal = 'shingle');
  rec('facts lock: only (651) 977-6027; no Master Elite, A+, Accredited, lifetime; reviews only as 5.0 · 90+', await p.evaluate(s => { const e = document.getElementById(s), cl = e.cloneNode(true); cl.querySelectorAll('script, style, template').forEach(x => x.remove()); const t = e.innerText + ' ' + cl.textContent + ' ' + [...e.querySelectorAll('[aria-label], img[alt]')].map(x => x.getAttribute('aria-label') || x.alt).join(' '); return !/867-2961|Master Elite|A\+|Accredited|lifetime/i.test(t) && [...e.querySelectorAll('a[href^="tel:"]')].every(a => a.getAttribute('href') === 'tel:+16519776027') && !/\b[0-4]\.\d\s*(stars?|·)/.test(t) && !/\d{3}\)\s*\d{3}-\d{4}/.test(t.replace(/\(651\)\s*977-6027/g, '')); }, SEC));
  rec('no skeleton: no kicker + h2 + lede opening, no Book + Call button row', await p.evaluate(s => { const e = document.getElementById(s); return !e.querySelector('.kick') && !(e.querySelector('a[href="#book"]') && e.querySelector('a[href^="tel:"].btn-line')); }, SEC));
  // distinct media: no file in two sections, and nothing shown twice at once
  const media = await p.evaluate(MEDIA); const key = m => crypto.createHash('sha1').update(m.src).digest('hex').slice(0, 10);
  const by = {}; media.forEach(m => { const k = key(m); (by[k] = by[k] || new Set()).add(m.sec); });
  const cross = Object.entries(by).filter(([k, s]) => s.size > 1).map(([k, s]) => k + ' in ' + [...s].join('+'));
  const mine = cross.filter(c => c.includes(' in ') && c.split(' in ')[1].split('+').includes(SEC)), rest = cross.filter(c => !mine.includes(c));
  rec('distinct media: nothing this section shows appears in any other section (this version with every other section\'s best)', mine.length === 0, mine.join('; ') + (rest.length ? ' | elsewhere, for their own gates: ' + rest.join('; ') : ' | page-wide: no repeats'));
  const twice = {}; media.filter(m => m.sec === SEC && m.shown).forEach(m => { const k = key(m); twice[k] = (twice[k] || 0) + 1; });
  rec('distinct media: nothing in this section is shown twice at once', Object.values(twice).every(n => n === 1), JSON.stringify(twice));
  await p.close();
  if (spec.extra) { const q = await open(); try { await spec.extra(q, rec, { SEC, V, url, open }); } catch (e) { rec('version checks ran', false, e.message.split('\n')[0]); } await q.close(); }
  // sharpness: at 1440 (DPR 1) and 390 (DPR 2), every image and video is shown at no more than ~1.1x its own pixels
  for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) { const q = await open('', { viewport: { width: w, height: h }, deviceScaleFactor: dpr });
    const seen = []; for (const f of (spec.sharpAt || [0, .5, .99])) { await q.evaluate(([s, f]) => { const e = document.getElementById(s); scrollTo(0, e.offsetTop + Math.max(0, e.offsetHeight - innerHeight) * f); }, [SEC, f]); await q.waitForTimeout(1300); if (spec.beforeSharp) await spec.beforeSharp(q, f); seen.push(...await q.evaluate(MEASURE, SEC)); }
    const soft = seen.filter(m => m.k * dpr > 1.12); const uniq = [...new Map(seen.map(m => [m.el + m.nw, m])).values()];
    rec('sharp at ' + w + ' (DPR ' + dpr + '): no image or video shown larger than its pixels (' + uniq.length + ' media measured)', soft.length === 0 && uniq.length > 0 || (uniq.length === 0 && spec.noMedia), soft.length ? soft.slice(0, 3).map(m => m.el + ' ' + m.nw + 'px shown at ' + (m.k * dpr).toFixed(2) + 'x').join('; ') : uniq.map(m => m.el + ' ' + (m.k * dpr).toFixed(2) + 'x').slice(0, 6).join(', '));
    await q.close(); }
  for (const w of [1440, 768, 390]) { const q = await open('', { viewport: { width: w, height: 900 } }); await q.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start', behavior: 'instant' }), SEC); await q.waitForTimeout(500);
    if (spec.beforeLayout) await spec.beforeLayout(q);
    const ov = await q.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    rec('no sideways scroll at ' + w, ov <= 0, ov + ' px');
    const sm = await q.evaluate(s => [...document.getElementById(s).querySelectorAll('a[href], button, [role=radio], input')].concat([...document.querySelectorAll('.rbar a, .rbar button, .callpill')]).filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 40) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[aria-hidden="true"]') && !e.closest('[inert]') && !e.closest('.gate.gone'); }).map(e => (e.className || e.tagName) + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)), SEC);
    rec('controls at least 44 px at ' + w, sm.length === 0, sm.join('; ')); await q.close(); }
  const rm = await open('', { reducedMotion: 'reduce' });
  if (spec.reduced) { try { await spec.reduced(rm, rec, { SEC, V }); } catch (e) { rec('reduced-motion checks ran', false, e.message.split('\n')[0]); } }
  const loops = await rm.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.getTiming().iterations === Infinity).length);
  rec('reduced motion: no looping animation', loops === 0, loops + ' looping'); await rm.close();
  rec('no page or console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  const pass = res.filter(r => r.ok).length; console.log('TOTAL ' + pass + '/' + res.length + ' passed');
  fs.writeFileSync(path.join(OUT, 'checks-' + SEC + '-v' + V + '.json'), JSON.stringify({ section: SEC, version: +V, total: res.length, passed: pass, results: res }, null, 1)); await b.close(); })();

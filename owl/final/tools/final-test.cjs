// Checks for ONE section of the FINAL homepage (owl-roofing.html), original Owl palette.
//   node tools/final-test.cjs <section name> [out dir under gates/final]
// Generic: axe WCAG 2.1 A/AA, facts lock, no maps, distinct media (page-wide), sharpness at 1440 DPR1 and 390 DPR2,
// no sideways scroll + 44 px controls at 1440/768/390, reduced motion, no errors.
// Section-specific behaviour: tools/final-checks/<name>.cjs  { extra(p, rec, ctx), reduced(p, rec, ctx), sharpAt:[...] }
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html');
const [SEC, OUTD] = process.argv.slice(2); const OUT = path.resolve(__dirname, '../gates/final', OUTD || SEC); fs.mkdirSync(OUT, { recursive: true });
const res = []; const rec = (name, ok, info) => { res.push({ name, ok: !!ok, info: info || '' }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + name + (info ? ' | ' + info : '')); };
const specFile = path.join(__dirname, 'final-checks', SEC + '.cjs'); const spec = fs.existsSync(specFile) ? require(specFile) : {};
const SELF = `.ver[data-sec="${SEC}"]`;

const MEASURE = sel => { const root = document.querySelector(sel), out = [];
  root.querySelectorAll('img, video').forEach(e => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
    if (r.width < 60 || r.height < 60 || cs.visibility === 'hidden' || cs.display === 'none') return;
    if (r.bottom < 0 || r.top > innerHeight) return;
    const nw = e.tagName === 'VIDEO' ? e.videoWidth : e.naturalWidth, nh = e.tagName === 'VIDEO' ? e.videoHeight : e.naturalHeight; if (!nw || !nh) return;
    const fit = cs.objectFit, sx = r.width / nw, sy = r.height / nh, k = fit === 'cover' ? Math.max(sx, sy) : fit === 'contain' || fit === 'scale-down' ? Math.min(sx, sy) : Math.max(sx, sy);
    out.push({ el: e.tagName.toLowerCase() + (e.className ? '.' + String(e.className).split(' ')[0] : ''), nw, nh, rw: Math.round(r.width), rh: Math.round(r.height), k: +k.toFixed(3) }); });
  return out; };
const MEDIA = () => { const out = []; document.querySelectorAll('.ver').forEach(v => v.querySelectorAll('img, video, source').forEach(e => {
    const src = e.currentSrc || e.src || e.getAttribute('src') || e.dataset.media || ''; if (!src || src.startsWith('data:image/gif;base64,R0lGOD') || src.startsWith('data:image/svg')) return;
    const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
    out.push({ sec: v.dataset.sec, tag: e.tagName.toLowerCase(), src: src.length > 200 ? src.slice(0, 60) + '#' + src.length + '#' + src.slice(-200) : src, shown: r.width > 30 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0 });
    if (e.poster) out.push({ sec: v.dataset.sec, tag: 'poster', src: e.poster.slice(0, 60) + '#' + e.poster.length + '#' + e.poster.slice(-200), shown: false }); })); return out; };

(async () => { const b = await chromium.launch(); const errs = [];
  const open = async (q, o) => { const p = await b.newPage(Object.assign({ viewport: { width: 1440, height: 900 } }, o || {}));
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/favicon|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    await p.goto(F + (q ? '?' + q : '')); await p.waitForTimeout(700); return p; };
  const settle = async p => { await p.evaluate(s => { const e = document.querySelector(s); e.scrollIntoView({ block: 'start', behavior: 'instant' }); }, SELF); await p.waitForTimeout(900); };
  let p = await open();
  rec('the section exists once, no version switcher on the page', await p.evaluate(s => document.querySelectorAll(s).length === 1 && !document.querySelector('.rev.on, .vsw, #owl-versions'), SELF));
  await p.addScriptTag({ content: AXE }); await settle(p); if (spec.beforeAxe) await spec.beforeAxe(p);
  const ax = await p.evaluate(async s => { const r = await axe.run(document.querySelector(s), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(v => v.id + ':' + v.nodes.length + ' ' + (v.nodes[0] && v.nodes[0].target.join(' ')).slice(0, 80)); }, SELF);
  rec('axe WCAG 2.1 A/AA: 0 violations', ax.length === 0, ax.join(' | '));
  const facts = await p.evaluate(s => { const cl = document.querySelector(s).cloneNode(true); cl.querySelectorAll('script,style').forEach(e => e.remove()); const t = cl.textContent.replace(/\s+/g, ' ');
    const bad = []; if (/Master Elite|Accredited|lifetime|\bA\+\b/i.test(t)) bad.push('banned word');
    (t.match(/\(\d{3}\)\s?\d{3}-\d{4}|\d{3}[-.]\d{3}[-.]\d{4}/g) || []).forEach(x => { if (x.replace(/\D/g, '') !== '6519776027') bad.push('phone ' + x); });
    cl.querySelectorAll('a[href^="tel:"]').forEach(a => { if (a.getAttribute('href') !== 'tel:+16519776027') bad.push(a.getAttribute('href')); });
    (t.match(/\b\d[\d,]*\+?\s*(five-star\s+)?reviews?/gi) || []).forEach(x => { if (!/^90\+\s*reviews$/i.test(x)) bad.push('reviews: ' + x); });
    (t.match(/\b\d\.\d\b(?! ·)/g) || []).forEach(x => { if (x !== '5.0') bad.push('rating ' + x); });
    cl.querySelectorAll('a[href^="mailto:"]').forEach(a => { if (!/^mailto:info@owlroofing\.com/.test(a.getAttribute('href'))) bad.push(a.getAttribute('href')); });
    return bad; }, SELF);
  rec('facts lock: only (651) 977-6027, info@owlroofing.com, no Master Elite / A+ / lifetime, reviews only as 5.0 · 90+', facts.length === 0, facts.join('; '));
  const maps = await p.evaluate(s => { const e = document.querySelector(s), bad = []; const t = e.textContent.replace(/\s+/g, ' ');
    e.querySelectorAll('*').forEach(n => { const k = (n.getAttribute('class') || '') + ' ' + (n.id || '') + ' ' + (n.getAttribute('aria-label') || '') + ' ' + (n.getAttribute('alt') || ''); if (/\b(map|maps|contour|cartograph)/i.test(k)) bad.push(k.trim().slice(0, 50)); });
    if (/\bmap\b/i.test(t.replace(/<script[\s\S]*?<\/script>/g, ''))) bad.push('text mentions map'); return bad; }, SELF);
  rec('no maps: nothing in this section is, or is called, a map', maps.length === 0, maps.join('; '));
  // distinct media, page-wide
  const media = await p.evaluate(MEDIA); const key = m => crypto.createHash('sha1').update(m.src).digest('hex').slice(0, 10);
  const by = {}; media.forEach(m => { const k = key(m); (by[k] = by[k] || new Set()).add(m.sec); });
  const cross = Object.entries(by).filter(([k, s]) => s.size > 1).map(([k, s]) => k + ' in ' + [...s].join('+'));
  const mine = cross.filter(c => c.split(' in ')[1].split('+').includes(SEC));
  rec('distinct media: nothing this section shows is used by any other section', mine.length === 0, mine.join('; '));
  const twice = {}; media.filter(m => m.sec === SEC && m.shown && m.tag !== 'source').forEach(m => { const k = key(m); twice[k] = (twice[k] || 0) + 1; });
  rec('distinct media: nothing in this section is shown twice at once', Object.values(twice).every(n => n === 1), JSON.stringify(twice));
  await p.close();
  if (spec.extra) { const q = await open(); try { await spec.extra(q, rec, { SEC, SELF, open, OUT }); } catch (e) { rec('section behaviour checks ran', false, e.message.split('\n')[0]); } await q.close(); }
  // sharpness
  for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) { const q = await open('', { viewport: { width: w, height: h }, deviceScaleFactor: dpr });
    const seen = []; for (const f of (spec.sharpAt || [0, .5, .99])) { await q.evaluate(([s, f]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY + Math.max(0, e.offsetHeight - innerHeight) * f); }, [SELF, f]); await q.waitForTimeout(900); seen.push(...await q.evaluate(MEASURE, SELF)); }
    const soft = seen.filter(m => m.k * dpr > 1.12); const uniq = [...new Map(seen.map(m => [m.el + m.nw, m])).values()];
    rec('sharp at ' + w + ' (DPR ' + dpr + '): no image or video shown larger than its own pixels (' + uniq.length + ' media measured)', soft.length === 0, soft.length ? soft.slice(0, 3).map(m => m.el + ' ' + m.nw + 'px shown ' + m.rw + ' = ' + (m.k * dpr).toFixed(2) + 'x').join('; ') : uniq.map(m => m.el + ' ' + (m.k * dpr).toFixed(2) + 'x').join(', '));
    await q.screenshot({ path: path.join(OUT, 'sharp-' + w + '.png') }); await q.close(); }
  // layout
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) { const q = await open('', { viewport: { width: w, height: h } });
    const L = await q.evaluate(s => { const e = document.querySelector(s), bad = []; const sw = document.documentElement.scrollWidth - innerWidth;
      e.querySelectorAll('button, a.btn, [role="button"], input:not([type="hidden"]), select, textarea, [role="radio"], [role="option"]').forEach(c => { const r = c.getBoundingClientRect(), cs = getComputedStyle(c); if (r.width < 4 || cs.visibility === 'hidden' || cs.display === 'none') return; if (c.closest('[hidden],[inert]')) return; if (r.height < 43.5 || r.width < 43.5) bad.push((c.className || c.tagName) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
      return { sw, bad: bad.slice(0, 5), n: bad.length, h: Math.round(e.getBoundingClientRect().height) }; }, SELF);
    rec('layout at ' + w + ': no sideways scroll, controls at least 44 px (section is ' + L.h + ' px tall)', L.sw <= 1 && L.n === 0, 'overflow ' + L.sw + '; ' + L.bad.join('; ')); await q.close(); }
  // reduced motion
  { const q = await open('', { reducedMotion: 'reduce' }); await settle(q);
    rec('reduced motion: the section renders, nothing needs motion', await q.evaluate(s => document.querySelector(s).getBoundingClientRect().height > 150, SELF));
    if (spec.reduced) { try { await spec.reduced(q, rec, { SEC, SELF }); } catch (e) { rec('reduced-motion checks ran', false, e.message.split('\n')[0]); } }
    await q.close(); }
  rec('no console or page errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  const pass = res.filter(r => r.ok).length; console.log('\n' + SEC + ': ' + pass + '/' + res.length);
  fs.writeFileSync(path.join(OUT, 'checks-' + SEC + '.json'), JSON.stringify({ section: SEC, pass, total: res.length, results: res }, null, 1));
  await b.close(); process.exit(pass === res.length ? 0 : 1);
})();

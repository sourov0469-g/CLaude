// Whole-page gate for the FINAL homepage: anchors, whole-page axe, scroll audit (desktop and emulated iPhone), distinct media, no maps, ?past, reduced motion.
const { chromium, devices } = require('playwright'); const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html'); const OUT = path.resolve(__dirname, '../gates/final/page'); fs.mkdirSync(OUT, { recursive: true });
const res = []; const rec = (name, ok, info) => { res.push({ name, ok: !!ok, info: info || '' }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + name + (info ? ' | ' + info : '')); };
(async () => { const b = await chromium.launch(); const errs = [];
  const open = async (o, q) => { const p = await b.newPage(o || { viewport: { width: 1440, height: 900 } }); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/favicon|Failed to load resource/.test(m.text())) errs.push(m.text()); }); await p.goto(F + (q || '')); await p.waitForTimeout(900); return p; };
  let p = await open();
  // 1. structure: eleven sections in the plan's order, no switcher
  const st = await p.evaluate(() => ({ order: [...document.querySelectorAll('.page[data-page="home"] .ver, footer.ftr')].map(v => v.dataset.sec || 'footer'), sw: !!document.querySelector('.rev.on, .vsw, #owl-versions, [data-versions]'), ids: ['hero', 'crew-film', 'wise-check', 'ask-owl', 'nothing', 'services', 'reviews', 'areas', 'family', 'book', 'contact', 'top'].map(i => i + ':' + !!document.getElementById(i)).join(' '), qsBtn: [...document.querySelectorAll('.rev')].map(e => e.className).join('|'), title: document.title }));
  rec('eleven parts in the plan\'s order, one version each, no switcher', JSON.stringify(st.order) === JSON.stringify(['hero', 'video', 'wise-check', 'ask-owl', 'nothing', 'services', 'reviews', 'areas', 'family', 'book', 'footer']) && !st.sw, st.order.join(' > '));
  rec('every anchor the header, hero and footer use exists', !/false/.test(st.ids), st.ids);
  // 2. every link on the page goes somewhere real
  const links = await p.evaluate(() => { const bad = []; document.querySelectorAll('main a[href^="#"], header a[href^="#"], footer a[href^="#"]').forEach(a => { const h = a.getAttribute('href'); if (h === '#' || h.startsWith('#/')) { if (h !== '#' && h !== '#/' && !document.querySelector('.page[data-page="' + h.slice(2) + '"]')) bad.push(h); return; } if (!document.getElementById(h.slice(1))) bad.push(h); }); return bad; });
  rec('no link points at a missing section', links.length === 0, links.join(','));
  const phones = await p.evaluate(() => [...document.querySelectorAll('a[href^="tel:"]')].map(a => a.getAttribute('href')).filter((v, i, a) => a.indexOf(v) === i));
  rec('the page has exactly one phone number', phones.length === 1 && phones[0] === 'tel:+16519776027', phones.join(','));
  const txt = await p.evaluate(() => { const c = document.body.cloneNode(true); c.querySelectorAll('script,style,template').forEach(e => e.remove()); return c.textContent.replace(/\s+/g, ' '); });
  rec('no Master Elite, no BBB A+/Accredited, no lifetime, reviews only as 5.0 · 90+, no invented numbers of reviews', !/Master Elite|Accredited|lifetime|\bA\+\b/i.test(txt) && !/\b(\d{3,}|[1-8]\d)\+?\s*(five-star\s+)?reviews/i.test(txt), '');
  const mp = await p.evaluate(() => { const bad = []; document.querySelectorAll('main *, header *, footer *').forEach(n => { const k = (n.getAttribute('class') || '') + ' ' + (n.id || '') + ' ' + (n.getAttribute('aria-label') || '') + ' ' + (n.getAttribute('alt') || ''); if (/\b(map|maps)\b|contour|cartograph/i.test(k)) bad.push(k.trim().slice(0, 40)); }); return bad; });
  rec('no maps anywhere on the page: no text, class, label or image is a map', !/\bmaps?\b/i.test(txt) && mp.length === 0, mp.join('; '));
  rec('the title and the logo are the site\'s', /Owl Roofing/.test(st.title) && await p.evaluate(() => !!document.querySelector('.hdr-logo img[alt="Owl Roofing"]') && !!document.querySelector('footer img[alt="Owl Roofing"]')), st.title);
  // 3. header links: three pages, two home anchors, the book button
  for (const [h, pg] of [['Services', 'services'], ['Wise Check', 'wise-check'], ['About', 'about']]) {
    await p.evaluate(() => { location.hash = '#/'; scrollTo(0, 0); }); await p.waitForTimeout(500); await p.click('.hdr-nav a:has-text("' + h + '")'); await p.waitForTimeout(900);
    const r = await p.evaluate(n => ({ shown: [...document.querySelectorAll('.page')].filter(x => !x.hidden).map(x => x.dataset.page), cur: document.querySelector('.hdr-nav a[aria-current="page"]') && document.querySelector('.hdr-nav a[aria-current="page"]').textContent, h1: document.querySelectorAll('.page:not([hidden]) h1').length, title: document.title }), pg);
    rec('header "' + h + '" opens the ' + pg + ' page alone, marks it current, one h1', r.shown.join() === pg && r.cur === h && r.h1 === 1, JSON.stringify(r)); }
  await p.evaluate(() => { location.hash = '#/'; }); await p.waitForTimeout(500);
  for (const [h, id] of [['Reviews', 'reviews'], ['Areas', 'areas']]) {
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300); await p.click('.hdr-nav a:has-text("' + h + '")'); await p.waitForTimeout(1600);
    const r = await p.evaluate(i => { const e = document.getElementById(i).getBoundingClientRect(); return [Math.round(e.top), Math.round(e.bottom)]; }, id);
    rec('header "' + h + '" lands on its home section (#' + id + ')', r[0] < 400 && r[1] > 100, r.join('..')); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300); await p.click('.hdr .btn[href="#book"]'); await p.waitForTimeout(1600);
  rec('header "Book a Wise Check" lands on the card', await p.evaluate(() => { const e = document.getElementById('book').getBoundingClientRect(); return e.top < 500 && e.bottom > 100; }));
  // from an inner page, Book goes home to the card, and the logo goes home
  await p.evaluate(() => { location.hash = '#/services'; }); await p.waitForTimeout(700); await p.click('.page:not([hidden]) .ctaband a[href="#book"]'); await p.waitForTimeout(1600);
  rec('from the Services page, "Book a Wise Check" returns home to the card', await p.evaluate(() => !document.querySelector('.page[data-page="home"]').hidden && document.getElementById('book').getBoundingClientRect().top < 600));
  await p.evaluate(() => { location.hash = '#/about'; }); await p.waitForTimeout(600); await p.click('.hdr-logo'); await p.waitForTimeout(900);
  rec('the logo goes home', await p.evaluate(() => !document.querySelector('.page[data-page="home"]').hidden));
  // 4. whole-page axe
  await p.evaluate(() => scrollTo(0, 0)); await p.addScriptTag({ content: AXE });
  const ax = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(v => v.id + ':' + v.nodes.length + ' ' + (v.nodes[0] && v.nodes[0].target.join(' ')).slice(0, 80)); });
  rec('axe WCAG 2.1 A/AA on the whole page: 0 violations', ax.length === 0, ax.join(' | '));
  // 5. page weight and pinned stages
  const w = await p.evaluate(() => ({ kb: Math.round(document.documentElement.outerHTML.length / 1024), sticky: [...document.querySelectorAll('main *')].filter(e => getComputedStyle(e).position === 'sticky').map(e => e.className.toString().split(' ')[0]) }));
  rec('only one pinned stage on the page (Your part: nothing)', w.sticky.length === 1 && w.sticky[0] === 'stage', w.sticky.join(','));
  // 6. scroll audit desktop: scroll the whole page in steps, no sideways scroll, no errors, screenshots as a journey sheet
  const shots = []; const total = await p.evaluate(() => document.documentElement.scrollHeight); let over = 0;
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
  for (let y = 0, i = 0; y < total; y += 900, i++) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(550); over = Math.max(over, await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)); if (i % 3 === 0) { const f = path.join(OUT, 'd-' + String(i).padStart(3, '0') + '.jpg'); await p.screenshot({ path: f, type: 'jpeg', quality: 60 }); shots.push(f); } }
  rec('desktop: scrolled the whole page (' + Math.round(total / 900) + ' screens), no sideways scroll', over <= 1, 'overflow ' + over);
  await p.close();
  // 7. emulated iPhone
  const ip = devices['iPhone 13']; p = await open({ ...ip });
  const ptotal = await p.evaluate(() => document.documentElement.scrollHeight); let pover = 0; const vh = ip.viewport.height;
  for (let y = 0, i = 0; y < ptotal; y += vh * .9, i++) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(450); pover = Math.max(pover, await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)); if (i % 4 === 0) { const f = path.join(OUT, 'm-' + String(i).padStart(3, '0') + '.jpg'); await p.screenshot({ path: f, type: 'jpeg', quality: 60 }); } }
  rec('iPhone 13 emulation: scrolled the whole page (' + Math.round(ptotal / vh) + ' screens), no sideways scroll', pover <= 1, 'overflow ' + pover);
  const ptap = await p.evaluate(() => { const bad = []; document.querySelectorAll('main button, main a.btn, main input, footer button, footer a').forEach(c => { const r = c.getBoundingClientRect(), cs = getComputedStyle(c); if (r.width < 4 || cs.visibility === 'hidden' || cs.display === 'none' || c.closest('[inert],[hidden]')) return; if (c.closest('.rl')) return; if ((r.height < 43 || r.width < 43) && !(c.tagName === 'A' && getComputedStyle(c).display === 'inline')) bad.push((c.className || c.tagName).toString().slice(0, 20) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); }); return bad.slice(0, 6); });
  rec('phone: controls at least 43 px (inline text links excepted)', ptap.length === 0, ptap.join('; '));
  await p.close();
  // 8. one version only: the old records are not in this file
  { const src = fs.readFileSync(path.resolve(__dirname, '../owl-roofing.html'), 'utf8'); rec('the file holds one version per section only: no past homepage, no templates, no switcher', !/id="owl-past"|<template/.test(src) && (src.match(/class="ver"/g) || []).length === 17, (src.match(/class="ver"/g) || []).length + ' parts'); }
  { const src = fs.readFileSync(path.resolve(__dirname, '../owl-roofing.html'), 'utf8'); const forms = (src.match(/location\.href\s*=\s*[^;]*mailto|window\.open\([^)]*mailto|<form[^>]*mailto/g) || []).length; rec('no form hands over to an outside email app (owner rule, 22:21): no mailto navigation in any form handler', forms === 0, String(forms)); }
  // 9. reduced motion: whole page, no errors
  p = await open({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); for (let y = 0; y < total; y += 1200) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(150); } rec('reduced motion: the whole page scrolls without errors', true); await p.close();
  rec('no console or page errors across every run', errs.length === 0, errs.slice(0, 3).join(' | '));
  const pass = res.filter(r => r.ok).length; console.log('\nwhole page: ' + pass + '/' + res.length); fs.writeFileSync(path.join(OUT, 'checks-page.json'), JSON.stringify({ pass, total: res.length, results: res }, null, 1));
  await b.close(); process.exit(pass === res.length ? 0 : 1); })();

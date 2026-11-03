// Deep QA · measured mobile audit. Per page at a phone width (touch-emulated, motion on, the page scrolled through):
//  targets   visible interactive controls smaller than 44x44 (inline links inside running text are listed apart)
//  type      visible text smaller than 13px
//  wide      elements whose right edge passes the screen (even when body clips them)
//  links     anchors with an empty, '#', or in-page target that does not exist
//  errors    page errors
// Usage: node qa_mobile.js [width]
const { chromium } = require('playwright');
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const W = +(process.argv[2] || 390);
(async () => {
  const b = await chromium.launch();
  for (const [n, f] of Object.entries(PAGES)) {
    const ctx = await b.newContext({ viewport: { width: W, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 140)));
    await p.goto('file:///home/user/CLaude/remodeling/site/' + f); await p.waitForTimeout(1200);
    await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); } scrollTo(0, 0); });
    await p.waitForTimeout(800);
    const r = await p.evaluate(() => {
      const vis = e => { const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false; for (let a = e; a; a = a.parentElement) { const s = getComputedStyle(a); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return false; if (a.hasAttribute('hidden') || a.inert) return false; } return true; };
      const lab = e => ((e.closest('section[id]') || e.closest('footer,header,.mbar,.sheet') || { id: '?' }).id || (e.closest('footer') ? 'footer' : e.closest('header') ? 'header' : e.closest('.mbar') ? 'mbar' : '?')) + ' ' + e.tagName.toLowerCase() + '.' + String(e.className.baseVal !== undefined ? e.className.baseVal : e.className).split(' ')[0] + ' "' + (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 28) + '"';
      const small = [], inline = [];
      document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], [tabindex="0"], label.gs__chip, summary').forEach(e => {
        if (!vis(e) || e.closest('.sheet') || e.closest('.skip')) return;
        const r = e.getBoundingClientRect();
        if (r.width >= 44 && r.height >= 44) return;
        const t = e.tagName;
        // an inline link inside running text: listed apart (WCAG allows it), still reviewed
        if (t === 'A' && getComputedStyle(e).display === 'inline' && e.parentElement && /^(P|LI|DD|SPAN|FIGCAPTION)$/.test(e.parentElement.tagName)) { inline.push(lab(e) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); return; }
        if (t === 'INPUT' && (e.type === 'radio' || e.type === 'checkbox')) { const l = e.closest('label'); if (l) { const q = l.getBoundingClientRect(); if (q.height >= 44 || (q.height >= 36 && q.width >= 44)) return; } }
        small.push(lab(e) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
      });
      const type = new Set();
      document.querySelectorAll('body *').forEach(e => {
        if (!vis(e) || e.closest('svg') || e.closest('.sheet') || e.closest('[aria-hidden="true"]')) return;
        if (![...e.childNodes].some(c => c.nodeType === 3 && c.nodeValue.trim().length > 1)) return;
        const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 13) type.add(lab(e) + ' ' + fs + 'px');
      });
      const wide = [];
      document.querySelectorAll('main *, footer *').forEach(e => { if (!vis(e) || e.closest('.pk__rail, .pj__rows, .pj__row, [class*="marquee"], .sr-only')) return; const r = e.getBoundingClientRect(); if (r.right > innerWidth + 2 && r.width > 4) { let clipped = false; for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const s = getComputedStyle(a); if (/(hidden|clip|auto|scroll)/.test(s.overflowX)) { const q = a.getBoundingClientRect(); if (q.right <= innerWidth + 2) { clipped = true; break; } } } if (!clipped) wide.push(lab(e) + ' right ' + Math.round(r.right)); } });
      const links = [];
      document.querySelectorAll('a').forEach(a => { const h = a.getAttribute('href'); if (h === null || h === '' || h === '#') links.push(lab(a) + ' href=' + h); else if (h.charAt(0) === '#' && h.length > 1 && !document.getElementById(h.slice(1)) && h !== '#top') links.push(lab(a) + ' missing ' + h); });
      return { small, inline, type: [...type], wide: wide.slice(0, 25), links };
    });
    console.log(`\n== ${n} @${W}: small ${r.small.length} | inline ${r.inline.length} | type<13 ${r.type.length} | wide ${r.wide.length} | links ${r.links.length} | errors ${errs.length}`);
    r.small.forEach(x => console.log('  target ' + x));
    r.type.slice(0, 40).forEach(x => console.log('  type   ' + x));
    r.wide.forEach(x => console.log('  wide   ' + x));
    r.links.forEach(x => console.log('  link   ' + x));
    errs.forEach(x => console.log('  error  ' + x));
    await ctx.close();
  }
  await b.close();
})();

// Shared checks for the inner-page tests (Windows, Our work). Each page test passes its scope selector and route.
const { chromium } = require('playwright'); const fs = require('fs');
const lum = (c) => { const [r, g, b] = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
const cr = (a, b) => { const x = lum(a), y = lum(b); return +((Math.max(x, y) + .05) / (Math.min(x, y) + .05)).toFixed(2); };
const R = []; const ok = (n, c, d) => { R.push([c ? 'PASS' : 'FAIL', n, d === undefined ? '' : d]); };
async function open(b, url, w = 1440, h = 900, extra = {}) { const ctx = await b.newContext({ viewport: { width: w, height: h }, ...extra }); const p = await ctx.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push(m.text()); }); p.ctx = ctx; await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(900); return p; }
const to = async (p, sel, off = 90) => { await p.evaluate(([s, o]) => { const el = document.querySelector(s); scrollTo({ top: scrollY + el.getBoundingClientRect().top - o, behavior: 'instant' }); }, [sel, off]); await p.waitForTimeout(450); };
// links, maps, fonts, targets, overflow, contrast inside `scope`
async function audit(p, scope, route) {
  return p.evaluate(([scope, route]) => {
    const root = document.querySelector(scope); const out = {};
    const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.hrefs = Array.from(root.querySelectorAll('a[href]')).map(a => a.getAttribute('href'));
    out.outside = out.hrefs.filter(h => !/^(#|tel:|mailto:)/.test(h));
    const routes = ['/', '/siding', '/windows', '/roofing', '/our-work', '/contact'];
    out.badAnchors = out.hrefs.filter(h => h.startsWith('#')).filter(h => { if (h.startsWith('#/')) { const [pg, an] = h.slice(2).split('/'); if (!['siding', 'windows', 'roofing', 'our-work', 'contact', ''].includes(pg)) return true; if (an) return !document.getElementById(an) && !document.getElementById(pg + '-' + an); return false; } return !document.getElementById(h.slice(1)); });
    out.srcExt = Array.from(root.querySelectorAll('[src]')).map(e => e.getAttribute('src')).filter(s => /^https?:/.test(s));
    const text = root.innerText + ' ' + Array.from(root.querySelectorAll('[aria-label],[alt],title')).map(e => (e.getAttribute('aria-label') || '') + ' ' + (e.getAttribute('alt') || '') + ' ' + e.textContent).join(' ');
    out.mapWord = /\bmaps?\b/i.test(text) || !!root.querySelector('[class*="map"],[id*="map"]'); out.text = root.innerText;
    // fonts
    const fam = new Set(); root.querySelectorAll('*').forEach(e => { if (!vis(e)) return; if (!e.childNodes.length) return; const has = Array.from(e.childNodes).some(n => n.nodeType === 3 && n.textContent.trim()); if (has) fam.add(getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '').trim()); }); out.fonts = [...fam];
    out.ctrlFont = Array.from(root.querySelectorAll('button,input')).filter(vis).map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '').trim()).filter(f => !/Inter|Montserrat/.test(f));
    // targets
    out.small = Array.from(root.querySelectorAll('button,input[type=range],input[type=search],a.btn,a.callx,[role=slider],[role=radio]')).filter(vis).filter(e => { const r = e.getBoundingClientRect(); return r.width < 43.5 || r.height < 43.5; }).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)).slice(0, 8);
    // overflow
    const W = innerWidth; out.docOver = document.documentElement.scrollWidth - W; out.over = Array.from(root.querySelectorAll('*')).filter(vis).filter(e => { const r = e.getBoundingClientRect(); if (r.right <= W + 1 && r.left >= -1) return false; let a = e.parentElement; while (a && a !== root) { const o = getComputedStyle(a).overflowX; if (o === 'auto' || o === 'hidden' || o === 'scroll' || o === 'clip') return false; a = a.parentElement; } return true; }).map(e => e.className.baseVal !== undefined ? 'svg' : e.className).slice(0, 6);
    // contrast (approximate: text colour against the nearest opaque ancestor background, blending translucent layers; skipped on photos and art-only grounds)
    const parse = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(',').map(x => parseFloat(x)); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; };
    const bgOf = (e) => { const stack = []; let a = e; while (a) { const cs = getComputedStyle(a); const c = parse(cs.backgroundColor); if (cs.backgroundImage !== 'none' && /url\(/.test(cs.backgroundImage)) return null; if (c && c[3] > 0) { stack.push(c); if (c[3] >= .99) break; } a = a.parentElement; } let base = [241, 245, 241]; for (let i = stack.length - 1; i >= 0; i--) { const c = stack[i]; base = base.map((v, k) => k < 3 ? v * (1 - c[3]) + c[k] * c[3] : 0).slice(0, 3); } return base; };
    const lumf = (c) => { const [r, g, b] = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
    let min = 99, minEl = '', n = 0; const skip = /(^|\s)(po-cm|po-bdg|po-cil|po-dtag|pw-wl|pw-flag|po-c)(\s|$)/;
    root.querySelectorAll('*').forEach(e => { if (!vis(e) || e.closest('svg') || e.closest('dialog:not([open])')) return; const has = Array.from(e.childNodes).some(x => x.nodeType === 3 && x.textContent.trim()); if (!has) return; if (e.closest('.po-cm,.po-bdg,.po-cil,.po-dtag,.pw-wl,.pw-vh,.btn,.po-rg.on')) return; const cs = getComputedStyle(e); const fg = parse(cs.color); const bg = bgOf(e); if (!fg || !bg) return; const f = fg[3] < 1 ? fg.slice(0, 3).map((v, k) => v * fg[3] + bg[k] * (1 - fg[3])) : fg.slice(0, 3); const a = lumf(f), b = lumf(bg); const r = (Math.max(a, b) + .05) / (Math.min(a, b) + .05); n++; if (r < min) { min = r; minEl = e.className + ':' + e.textContent.trim().slice(0, 24); } });
    out.minContrast = +min.toFixed(2); out.minEl = minEl; out.contrastN = n;
    return out;
  }, [scope, route]);
}
function report(title, extra) {
  const f = R.filter(r => r[0] === 'FAIL').length; console.log(R.map(r => r.join(' | ')).join('\n')); console.log(`\n${title}: ${R.length - f} of ${R.length} checks pass`, f ? `(${f} FAIL)` : ''); return f;
}
module.exports = { chromium, fs, ok, R, open, to, audit, report, cr };

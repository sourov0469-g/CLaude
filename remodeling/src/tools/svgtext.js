// REBRAND: contrast of SVG <text> as rendered (p6qa leaves SVG text unmeasured) [S0071 measure the rendered pair].
// For each visible SVG text in every visible version: its fill against the first painted thing under its centre
// (an SVG shape fill, else the nearest CSS background), WCAG 2 ratio; large = rendered >= 24px, or >= 18.67px at >= 700.
// usage: FILE=... SECS=a,b SLOTS=1,2 OUT=file node tools/svgtext.js
const { chromium } = require('playwright'); const fs = require('fs');
const FILE = process.env.FILE, SECS = process.env.SECS.split(','), SLOTS = (process.env.SLOTS || '1,2,3,4,5').split(',');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await p.goto(FILE); await p.waitForTimeout(1500);
  let n = 0; const low = [];
  for (const s of SECS) for (const v of SLOTS) {
    const ok = await p.evaluate(([s, v]) => { const el = document.querySelector('#' + s + ' .ver[data-v="' + v + '"]'); if (!el) return false; EZ.activate(s, v); return true; }, [s, v]);
    if (!ok) continue; await p.waitForTimeout(300);
    const r = await p.evaluate(([s, v]) => {
      const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
      const rgba = c => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
      const L = c => { const f = x => { x /= 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); }; return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2]); };
      const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
      const ver = document.querySelector('#' + s + ' .ver[data-v="' + v + '"]'); const out = []; let n = 0;
      ver.querySelectorAll('svg text').forEach(t => {
        const cs = getComputedStyle(t); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0 || !t.textContent.trim()) return;
        if (t.closest('[aria-hidden="true"]') && !t.closest('svg[aria-hidden="true"]')) return;
        const q = t.getBoundingClientRect(); if (q.width < 2 || q.height < 2) return;
        const fg = rgba(cs.fill); if (fg[3] < .5) return;
        // the painted thing under the text: walk the stack under its centre, skipping the text itself and transparent layers
        // off-screen text cannot be hit-tested: bring it into view first
        if (q.top < 0 || q.bottom > innerHeight) { if (window.EZ && EZ.lenis) EZ.lenis.scrollTo(t, { immediate: true, offset: -innerHeight / 3, force: true }); else t.scrollIntoView({ block: 'center' }); }
        // sample where the glyphs are: the middle character's position (text on a path has its box centre elsewhere)
        const q2 = t.getBoundingClientRect(); let x = q2.left + q2.width / 2, y = q2.top + q2.height / 2;
        try { const nC = t.getNumberOfChars(); if (nC) { const i = Math.floor(nC / 2), pt = t.getStartPositionOfChar(i), ex = t.getExtentOfChar(i), m = t.getScreenCTM();
          const sp = new DOMPoint(pt.x + ex.width / 2, ex.y + ex.height / 2).matrixTransform(m); x = sp.x; y = sp.y; } } catch (e) {}
        // a halo (stroke painted under the fill) is the text's own background
        const sw = parseFloat(cs.strokeWidth) || 0, halo = cs.stroke !== 'none' && sw >= 2 && /stroke/.test(cs.paintOrder || '');
        let bg = halo ? rgba(cs.stroke) : null;
        const scrollIntoView = 0;
        if (!bg) for (const e of document.elementsFromPoint(x, y)) {
          if (e === t || t.contains(e)) continue;
          const ecs = getComputedStyle(e);
          // an open path or a line paints no fill area (only its stroke): it is not the ground behind the text
          const open = (e.tagName === 'line' || e.tagName === 'polyline' || (e.tagName === 'path' && !/[zZ]/.test(e.getAttribute('d') || '')));
          const c = e instanceof SVGElement && e.tagName !== 'svg' ? (e.tagName === 'text' || open ? null : rgba(ecs.fill === 'none' ? 'transparent' : ecs.fill)) : rgba(ecs.backgroundColor);
          if (c && c[3] >= .5) { bg = c; break; }
        }
        if (!bg) { const sec = ver.closest('section'); bg = rgba(getComputedStyle(sec).backgroundColor); }
        n++;
        const px = parseFloat(cs.fontSize) * (t.getScreenCTM() ? Math.hypot(t.getScreenCTM().a, t.getScreenCTM().b) : 1), wt = +cs.fontWeight || 400;
        const large = px >= 24 || (px >= 18.67 && wt >= 700), need = large ? 3 : 4.5, r = ratio(fg, bg);
        if (r < need) out.push(t.textContent.trim().slice(0, 24) + ' ' + r.toFixed(2) + ' < ' + need + ' (' + px.toFixed(0) + 'px)');
      });
      return { n, out };
    }, [s, v]);
    n += r.n; r.out.forEach(x => low.push(s + v + ': ' + x));
  }
  const res = `svg text measured ${n} | below its threshold ${low.length}\n${low.join('\n')}\n`;
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, res); console.log(res); await b.close();
})();

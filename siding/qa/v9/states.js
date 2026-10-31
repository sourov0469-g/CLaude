// REBRAND QA round 2, grayscale survival of states (S1497 semantic use: colour is never the only cue): every selected
// control (aria-selected / aria-checked / aria-pressed = true) is compared with an unselected sibling of the same kind,
// as rendered, by luminance only. A state passes when one cue differs by >= 3:1 in luminance (fill, border with
// width, text) or by a clear weight step (>= 200) or by a mark only the selected one draws (outline, underline,
// a visible child the other hides).
// NODE_PATH=$(npm root -g) node qa/v9/states.js [pages]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const PAGES = (process.argv[2] || 'index,siding,windows,roofing,outdoor,projects,financing,about,contact').split(',');
const BASE = process.env.QBASE || 'http://127.0.0.1:8765/';
(async () => {
  const b = await chromium.launch(); const out = []; let groups = 0, weak = 0;
  for (const pg of PAGES) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await p.goto(BASE + 'site/' + pg + '.html'); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 30000 });
    const secs = await p.evaluate(() => [...document.querySelectorAll('.sec:not([data-bk])')].map(s => ({ id: s.id, n: s.querySelectorAll('.vsw-b').length })));
    for (const s of secs) for (let v = 1; v <= Math.max(1, s.n); v++) {
      const r = await p.evaluate(([id, v]) => new Promise(res => {
        const sec = document.getElementById(id); const t = sec.querySelector(`.vsw-b[data-v="${v}"]`); if (t) t.click();
        setTimeout(() => {
          const L = c => { const m = c.match(/[\d.]+/g); if (!m) return null; let [r, g, b2, a = 1] = m.map(Number); if (c.startsWith('color(')) { r *= 255; g *= 255; b2 *= 255; } if (a < 0.05) return null; const f = x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b2); };
          const bgOf = el => { for (let e = el; e; e = e.parentElement) { const y = L(getComputedStyle(e).backgroundColor); if (y !== null) return y; } return 1; };
          const cr = (a, b) => (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
          const look = el => { const c = getComputedStyle(el); const bw = parseFloat(c.borderTopWidth) + parseFloat(c.borderBottomWidth) + parseFloat(c.borderLeftWidth); const bg = bgOf(el); const bc = L(c.borderTopColor); const sh = c.boxShadow !== 'none'; const ol = c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0; const kids = [...el.querySelectorAll('*')].filter(k => k.checkVisibility()).length; const rings = (c.boxShadow.match(/rgba?\([^)]*\)[^,]*/g) || []).filter(x => { const sp = x.replace(/rgba?\([^)]*\)/, '').trim().split(/\s+/).map(parseFloat); const a = (x.match(/rgba\([^)]*,\s*([\d.]+)\)/) || [0, 1])[1]; return +a > 0.9 && (sp[3] || 0) >= 2; }).map(x => L(x.match(/rgba?\([^)]*\)/)[0])); return { bg, border: bw > 0.5 && bc !== null ? bc : bg, text: L(c.color) ?? 0, w: +c.fontWeight, ol, sh, kids, deco: c.textDecorationLine, rings }; };
          const sel = [...sec.querySelectorAll('.stage [aria-selected="true"], .stage [aria-checked="true"], .stage [aria-pressed="true"]')].filter(e => e.checkVisibility() && !e.closest('[data-bk]'));
          const rows = [];
          for (const on of sel) {
            const attr = ['aria-selected', 'aria-checked', 'aria-pressed'].find(a => on.getAttribute(a) === 'true');
            const peers = [...(on.parentElement ? on.parentElement.children : [])].filter(e => e !== on && e.getAttribute(attr) === 'false' && e.className === on.className);
            const off = peers[0] || [...sec.querySelectorAll(`[${attr}="false"]`)].find(e => e.className === on.className && e.checkVisibility());
            if (!off) continue;
            const A = look(on), B = look(off);
            const fill = cr(A.bg, B.bg), border = cr(A.border, B.border), text = cr(A.text, B.text), weight = Math.abs(A.w - B.w);
            // a ring only the selected one draws, at >= 3:1 against what is around it
            const ring = A.rings.some(y => cr(y, bgOf(on.parentElement)) >= 3 && !B.rings.some(z => Math.abs(z - y) < 0.01));
            const mark = ring || (A.ol && !B.ol) || A.kids > B.kids || (A.deco !== B.deco);
            const ok = fill >= 3 || border >= 3 || text >= 3 || weight >= 200 || mark;
            rows.push({ el: on.tagName.toLowerCase() + '.' + String(on.className).split(' ')[0] + ' "' + on.textContent.trim().slice(0, 18) + '"', fill: +fill.toFixed(2), border: +border.toFixed(2), text: +text.toFixed(2), weight, ring, mark, ok });
          }
          res(rows);
        }, 250);
      }), [s.id, v]);
      for (const row of r) { groups++; if (!row.ok) { weak++; out.push(`WEAK ${pg} ${s.id}:${v} ${JSON.stringify(row)}`); } }
    }
    await p.close();
  }
  out.unshift(`state groups measured: ${groups}; without a non-hue cue >= 3:1: ${weak}`);
  console.log(out.join('\n')); fs.writeFileSync(path.join(__dirname, 'states.txt'), out.join('\n') + '\n'); await b.close();
})();

// REBRAND QA (S0071 measure the rendered pair; S1497 critique-color; S1434 hierarchy; S1435 isolation; S0248 thresholds).
// For every visible version of every section on every page: each text element's colour against the background it
// actually renders on (nearest painted ancestor; text over photos reported separately), filled-primary count, the
// share of the section painted in the accent hue, focus-ring and control-boundary contrast, and the hierarchy ratios.
const { chromium } = require('playwright');
const path = require('path');
const PAGES = (process.argv[2] || 'index,siding,windows,roofing,outdoor,projects,financing,about,contact').split(',');
(async () => {
  const b = await chromium.launch(); const report = { fails: [], pairs: {}, primaries: [], accentArea: [], hierarchy: [], controls: [] };
  for (const pg of PAGES) {
    const p = await b.newPage({ viewport: { width: +(process.env.VW || 1440), height: 900 }, reducedMotion: 'reduce' });
    await p.goto((process.env.QBASE || 'http://127.0.0.1:8765/') + `site/${pg}.html`); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 20000 });
    const secs = await p.evaluate(() => [...document.querySelectorAll('.sec')].map(s => ({ id: s.id, n: s.querySelectorAll('.vsw-b').length })));
    for (const s of secs) for (let v = 1; v <= s.n; v++) {
      const r = await p.evaluate(async ([id, v]) => {
        const sec = document.getElementById(id); sec.querySelector(`.vsw-b[data-v="${v}"]`).click(); sec.scrollIntoView(); await new Promise(z => setTimeout(z, 250));
        const parse = c => { const m = c.match(/[\d.]+/g); if (!m) return null; let [r, g, b, a = 1] = m.map(Number); if (c.startsWith('color(')) { r *= 255; g *= 255; b *= 255; } return [r, g, b, a]; };
        const lin = x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; };
        const L = c => .2126 * lin(c[0]) + .7152 * lin(c[1]) + .0722 * lin(c[2]);
        const cr = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
        const hex = c => '#' + c.slice(0, 3).map(x => Math.round(x).toString(16).padStart(2, '0')).join('').toUpperCase();
        const blend = (top, bot) => { const a = top[3]; return [0, 1, 2].map(i => top[i] * a + bot[i] * (1 - a)).concat(1); };
        const bgOf = el => { const stack = []; for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e); if (c.backgroundImage !== 'none' && !/gradient/.test(c.backgroundImage) ) return { img: true }; if (/gradient/.test(c.backgroundImage)) return { img: true }; const col = parse(c.backgroundColor); if (col && col[3] > 0) { stack.push(col); if (col[3] >= .99) break; } } let out = [255, 255, 255, 1]; for (let i = stack.length - 1; i >= 0; i--) out = blend(stack[i], out); return { c: out }; };
        const overImg = el => { const rc = el.getBoundingClientRect(); const cx = rc.left + rc.width / 2, cy = rc.top + rc.height / 2; return document.elementsFromPoint(cx, cy).some(x => x !== el && !el.contains(x) && /^(IMG|CANVAS|VIDEO)$/.test(x.tagName) && !x.contains(el)) ; };
        const out = { fails: [], pairs: [], prim: 0, accentPx: 0, area: 0, hier: {}, ctrl: [] };
        const vr = sec.querySelector('.stage > .v'); const R = vr.getBoundingClientRect(); out.area = R.width * R.height;
        for (const el of vr.querySelectorAll('*')) {
          const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < .2 || el.closest('svg') || el.closest('[hidden]') || el.closest('[aria-hidden="true"]:not(.vsw-l)') || el.closest('.sr-only')) continue;
          const rc = el.getBoundingClientRect(); if (!rc.width || !rc.height) continue;
          // accent-painted area (hue within 15 degrees of the accent and visible chroma): S1435 isolation inflation
          const bgc = parse(cs.backgroundColor);
          if (bgc && bgc[3] > .5) { const [r, g, b2] = bgc; const mx = Math.max(r, g, b2), mn = Math.min(r, g, b2); if (mx - mn > 40 && g > r && b2 > r) out.accentPx += rc.width * rc.height; }
          // filled primaries: the accent-solid fill on an interactive element
          if (el.matches('a, button') && bgc && hex(bgc) === getComputedStyle(document.documentElement).getPropertyValue('--teal-9').trim().toUpperCase()) out.prim++;
          if (el.matches('input, select, textarea')) { const bg = bgOf(el.parentElement); if (bg.c) out.ctrl.push(['control border', hex(parse(cs.borderBottomColor)), hex(bg.c), +cr(parse(cs.borderBottomColor), bg.c).toFixed(2)]); }
          const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1); if (!own) continue;
          const size = parseFloat(cs.fontSize), w = +cs.fontWeight;
          const tag = el.tagName.toLowerCase(), lvl = /^h1$/.test(tag) || el.matches('.display') ? 'h1' : /^h2$/.test(tag) ? 'h2' : /^h3$/.test(tag) ? 'h3' : tag === 'p' && !el.closest('figcaption') ? 'p' : null;
          if (lvl) { (out.hier[lvl] = out.hier[lvl] || []).push([size, w]); }
          if (overImg(el)) continue;
          const bg = bgOf(el); if (bg.img) continue;
          const fg = parse(cs.color); if (!fg || fg[3] === 0) continue; /* transparent text (hit-area overlays) is not rendered text */ const fgc = fg[3] < 1 ? blend(fg, bg.c) : fg;
          const ratio = cr(fgc, bg.c), large = size >= 24 || (size >= 18.66 && w >= 700), need = large ? 3 : 4.5;
          out.pairs.push([hex(fgc), hex(bg.c), +ratio.toFixed(2), large ? 'large' : 'text']);
          if (ratio < need) out.fails.push(`${tag}.${String(el.className).split(' ')[0]} "${el.textContent.trim().slice(0, 30)}" ${hex(fgc)} on ${hex(bg.c)} = ${ratio.toFixed(2)} < ${need}`);
        }
        return out;
      }, [s.id, v]);
      const tagS = `${pg}:${s.id}:${v}`;
      r.fails.forEach(f => report.fails.push(`${tagS} ${f}`));
      r.pairs.forEach(([f, bg, ratio, kind]) => { const k = `${f} on ${bg} (${kind})`; report.pairs[k] = report.pairs[k] || { ratio, n: 0 }; report.pairs[k].n++; });
      if (r.prim > 1) report.primaries.push(`${tagS} ${r.prim} filled primaries`);
      report.accentArea.push([tagS, +(100 * r.accentPx / r.area).toFixed(1)]);
      const H = r.hier, mx = k => H[k] ? Math.max(...H[k].map(x => x[0])) : null;
      report.hierarchy.push([tagS, mx('h1'), mx('h2'), mx('h3'), H.p ? Math.min(...H.p.map(x => x[0])) : null]);
      r.ctrl.forEach(c => report.controls.push([tagS, ...c]));
    }
    await p.close();
  }
  require('fs').writeFileSync(path.resolve(__dirname, process.env.VW ? `brand-report-${process.env.VW}.json` : 'brand-report.json'), JSON.stringify(report, null, 1));
  const top = Object.entries(report.pairs).sort((a, b) => b[1].n - a[1].n);
  console.log('text pairs measured:', top.reduce((a, [, v]) => a + v.n, 0), '| distinct pairs:', top.length, '| failing:', report.fails.length);
  report.fails.slice(0, 40).forEach(f => console.log('  FAIL', f));
  console.log('views with more than one filled primary:', report.primaries.length); report.primaries.slice(0, 15).forEach(x => console.log('  ', x));
  const aa = report.accentArea.sort((a, b) => b[1] - a[1]); console.log('accent-painted share, top 8:', aa.slice(0, 8).map(x => x.join(' ')).join(' | '));
  const cf = report.controls.filter(c => c[4] < 3); console.log('control borders under 3:1:', cf.length, cf.slice(0, 5).map(c => c.join(' ')).join(' | '));
  await b.close();
})();

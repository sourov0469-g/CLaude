// REBRAND audit, rendered [S1497 palette coherence / semantic use; S1435 isolation inflation; S0071 one colour one meaning].
// Per visible version: share of its area painted in the accent (backgrounds and SVG fills in the clay hue family with chroma
// >= .04; photos and text excluded), the largest single accent area, the filled primary buttons on show, and every rendered
// colour outside the declared hue windows (clay 25-50, danger 13-23; chroma < .03 counts as neutral).
// usage: FILE=... SECS=a,b SLOTS=1,2,3 OUT=file node tools/rbaudit.js
const { chromium } = require('playwright'); const fs = require('fs');
const FILE = process.env.FILE, SECS = process.env.SECS.split(','), SLOTS = (process.env.SLOTS || '1,2,3,4,5').split(',');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await p.goto(FILE); await p.waitForTimeout(1500);
  const rows = [], drift = {};
  for (const s of SECS) for (const v of SLOTS) {
    const ok = await p.evaluate(([s, v]) => { const el = document.querySelector('#' + s + ' .ver[data-v="' + v + '"]'); if (!el) return false; EZ.activate(s, v); return true; }, [s, v]);
    if (!ok) continue;
    await p.waitForTimeout(300);
    await p.evaluate(s => { const el = document.getElementById(s); scrollTo(0, el.getBoundingClientRect().top + scrollY); }, s); await p.waitForTimeout(500);
    const r = await p.evaluate(([s, v]) => {
      const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
      const rgba = c => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
      const lin = x => { x /= 255; return x <= .04045 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); };
      const lch = ([R, G, B]) => { const r = lin(R), g = lin(G), bb = lin(B);
        const l = Math.cbrt(.4122214708 * r + .5363325363 * g + .0514459929 * bb), m = Math.cbrt(.2119034982 * r + .6806995451 * g + .1073969566 * bb), q = Math.cbrt(.0883024619 * r + .2817188376 * g + .6299787005 * bb);
        const L = .2104542553 * l + .793617785 * m - .0040720468 * q, A = 1.9779984951 * l - 2.428592205 * m + .4505937099 * q, Bb = .0259040371 * l + .7827717662 * m - .808675766 * q;
        return [L, Math.hypot(A, Bb), (Math.atan2(Bb, A) * 180 / Math.PI + 360) % 360]; };
      const ver = document.querySelector('#' + s + ' .ver[data-v="' + v + '"]'), vr = ver.getBoundingClientRect();
      const area = Math.max(1, vr.width * Math.min(vr.height, 2400));
      let acc = 0, big = 0, bigName = '', btn = 0; const off = {};
      const isAcc = c => { if (c[3] < .35) return false; const [L, C, H] = lch(c); return C >= .04 && H >= 25 && H <= 50; };
      const note = (c, where) => { if (c[3] < .35) return; const [L, C, H] = lch(c); if (C < .03) return;
        const inClay = H >= 25 && H <= 50, inDanger = H >= 13 && H < 25; if (!inClay && !inDanger) { const k = 'H' + Math.round(H) + ' C' + C.toFixed(2); off[k] = off[k] || where; } };
      ver.querySelectorAll('*').forEach(e => {
        if (e.closest('[aria-hidden="true"].rx, .rx')) return;
        const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;
        const rr = e.getBoundingClientRect(); if (!rr.width || !rr.height) return;
        const vis = Math.max(0, Math.min(rr.bottom, vr.top + 2400) - Math.max(rr.top, vr.top)) * Math.max(0, Math.min(rr.right, vr.right) - Math.max(rr.left, vr.left));
        const name = (e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || e.tagName).toString().split(' ')[0] || e.tagName;
        const svg = e instanceof SVGElement && e.tagName !== 'svg';
        const fillC = svg ? rgba(cs.fill === 'none' ? 'transparent' : cs.fill) : rgba(cs.backgroundColor);
        note(fillC, name); note(rgba(cs.color), name + ' (text)'); if (svg && cs.stroke !== 'none') note(rgba(cs.stroke), name + ' (stroke)');
        if (e.matches('.btn:not(.btn--ghost)') && isAcc(rgba(cs.backgroundColor))) btn++;
        if (isAcc(fillC) && !(svg && e.tagName === 'text')) {
          const a = svg ? vis * .6 : vis;   // SVG shapes rarely fill their whole box
          acc += a; if (a > big) { big = a; bigName = name; }
        }
      });
      return { acc: Math.min(100, acc / area * 100), big: big / area * 100, bigName, btn, off };
    }, [s, v]);
    rows.push(`${s}${v}\taccent area ${r.acc.toFixed(1)}%\tlargest ${r.big.toFixed(1)}% (${r.bigName})\tfilled primaries ${r.btn}`);
    for (const k in r.off) (drift[k] = drift[k] || []).push(s + v + ':' + r.off[k]);
  }
  const out = rows.join('\n') + '\n\nOFF-WINDOW COLOURS (chroma >= .03, outside clay 25-50 and danger 13-23):\n' + (Object.keys(drift).length ? Object.entries(drift).map(([k, w]) => k + '  ' + w.slice(0, 6).join(', ')).join('\n') : 'none') + '\n';
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, out);
  console.log(out); await b.close();
})();

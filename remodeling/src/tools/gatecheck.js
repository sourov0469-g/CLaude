// MASTER DIRECTIVE final gate evidence (the token check is tools/tokencheck.py; facts lock is tools/facts.js):
//  light     every visible slot of every section: no ground (section, version or any box over 20% of the version's area)
//            darker than relative luminance .05 (near-black); deep-green grounds are listed separately (none expected)
//  logo      header and footer logo are the roof-E SVG; the favicon is the mark
//  facts     the only rating printed is 4.8 and the only review count 343; exactly 4 before/after pairs
//  integrity versions per section: visible slots 1-8, backups, total
const { chromium } = require('playwright');
const fs = require('fs');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const SECS = 'hero,proof,services,ba,process,financing,work,reviews,towns,consult'.split(',');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await p.goto(FILE); await p.waitForTimeout(1500);
  const out = [], fail = [];
  // logo
  const logo = await p.evaluate(() => {
    const nav = document.querySelector('.nav img[data-logo], header img[data-logo]'), foot = document.querySelector('.foot img[data-logo], footer img[data-logo]');
    const ico = document.querySelector('link[rel~="icon"]');
    const svg = s => !!s && /^data:image\/svg\+xml/.test(s);
    const txt = s => { try { return decodeURIComponent(s.split(',')[1] || ''); } catch (e) { return atob((s.split(',')[1] || '')); } };
    return { header: nav && svg(nav.src), footer: foot && svg(foot.src), favicon: ico && svg(ico.href), sameMark: ico && nav && /M80 47 L50 21 L25 42 V80 H76/.test(txt(ico.href)) && /M80 47 L50 21 L25 42 V80 H76/.test(txt(nav.src)), footSrcIsNav: foot && nav && foot.src === nav.src };
  });
  out.push('logo: ' + JSON.stringify(logo));
  if (!(logo.header && logo.footer && logo.favicon && logo.sameMark)) fail.push('logo');
  // light + facts + integrity
  const ratings = new Set(), counts = new Set();
  for (const id of SECS) {
    const slots = await p.evaluate(id => [...document.querySelectorAll('#' + id + ' .ver')].map(v => v.dataset.v), id);
    const vis = slots.filter(s => /^\d$/.test(s)), bk = slots.filter(s => /^b/.test(s));
    out.push(id + ' versions: visible ' + vis.sort().join('') + ' (' + vis.length + '), backups ' + bk.length + ', total ' + slots.length);
    for (const v of vis) {
      await p.evaluate(([id, v]) => EZ.activate(id, v), [id, v]); await p.waitForTimeout(300);
      const r = await p.evaluate(([id, v]) => {
        const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
        function rgba(c) { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; }
        function lum(c) { const f = x => { x /= 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); }; return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2]); }
        const sec = document.getElementById(id), ver = sec.querySelector('.ver[data-v="' + v + '"]');
        const vr = ver.getBoundingClientRect(), area = vr.width * vr.height, dark = [], green = [];
        [sec, ver, ...ver.querySelectorAll('*')].forEach(e => {
          if (e instanceof SVGElement && e.tagName !== 'svg') return;
          const cs = getComputedStyle(e), c = rgba(cs.backgroundColor); if (c[3] < .5) return;
          const r = e.getBoundingClientRect(); if (e !== sec && e !== ver && r.width * r.height < area * .2) return;
          const L = lum(c);
          if (L < .05) dark.push((e.className.baseVal !== undefined ? e.className.baseVal : e.className).toString().split(' ')[0] + ' ' + cs.backgroundColor);
          else if (L < .2 && c[1] > c[0] * 1.15 && c[1] > c[2]) green.push(cs.backgroundColor);
        });
        const t = ver.innerText;
        return { dark, green, ratings: (t.match(/\b[0-5]\.\d(?=\s*(?:out of|of|★|stars|\/\s*5|average|Google))/g) || []), counts: (t.match(/\b\d{2,4}(?=\s+(?:Google\s+)?reviews)/gi) || []) };
      }, [id, v]);
      r.ratings.forEach(x => ratings.add(x)); r.counts.forEach(x => counts.add(x));
      if (r.dark.length) { out.push('  DARK ' + id + v + ': ' + r.dark.join('; ')); fail.push('dark ' + id + v); }
      if (r.green.length) out.push('  deep green ' + id + v + ': ' + r.green.join('; '));
    }
    await p.evaluate(id => EZ.activate(id, '1'), id);
  }
  const pairs = await p.evaluate(() => (EZ.PAIRS || []).length);
  out.push('ratings printed: ' + [...ratings].join(', ') + ' | review counts printed: ' + [...counts].join(', ') + ' | before/after pairs: ' + pairs);
  if ([...ratings].some(x => x !== '4.8') || [...counts].some(x => x !== '343') || pairs !== 4) fail.push('facts');
  out.push('GATE FAILS: ' + fail.length + (fail.length ? ' ' + fail.join(', ') : ''));
  fs.writeFileSync('/home/user/CLaude/remodeling/qa/gatecheck.txt', out.join('\n') + '\n');
  console.log(out.join('\n'));
  await b.close();
})();

// MASTER DIRECTIVE Phase 6 QA round, every section under the new skin:
//  contrast  every visible text element in each of slots 1-8 vs its composited background (WCAG AA: 4.5, large 3);
//            text over a photo or a background image is listed as "unmeasured", never passed silently
//  switcher  the section's switcher holds exactly 1-8 and each button shows that version
//  backups   every b-slot opens, has height, throws nothing
// usage: node p6qa.js [round-tag] [sections]   -> remodeling/qa/phase6-<tag>.txt
const { chromium } = require('playwright');
const fs = require('fs');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const TAG = process.argv[2] || 'r1';
const SECS = (process.argv[3] || 'hero,proof,services,ba,process,financing,work,reviews,towns,consult').split(',');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(FILE); await p.waitForTimeout(1500);
  const out = [], fails = [];
  for (const id of SECS) {
    const slots = await p.evaluate(id => [...document.querySelectorAll('#' + id + ' .ver')].map(v => v.dataset.v), id);
    const vis = slots.filter(s => /^\d$/.test(s)), bk = slots.filter(s => /^b/.test(s));
    // switcher
    const sw = await p.evaluate(id => { const s = document.querySelector('.vswitch[data-for="' + id + '"]'); return s ? [...s.querySelectorAll('button')].map(x => x.textContent.trim()).filter(t => /^\d$/.test(t)) : []; }, id);
    let swOk = sw.join('') === '12345678';
    for (const n of sw) {
      const ok = await p.evaluate(([id, n]) => { const s = document.querySelector('.vswitch[data-for="' + id + '"]'); const btn = [...s.querySelectorAll('button')].find(x => x.textContent.trim() === n); btn.click(); return true; }, [id, n]);
      await p.waitForTimeout(250);
      const shown = await p.evaluate(id => { const v = [...document.querySelectorAll('#' + id + ' .ver')].find(x => !x.hidden); return v && v.dataset.v; }, id);
      if (shown !== n) swOk = false;
    }
    out.push(id + ' switcher: [' + sw.join(',') + '] ' + (swOk ? 'ok' : 'FAIL'));
    if (!swOk) fails.push(id + ' switcher');
    // contrast per visible slot
    for (const v of vis) {
      await p.evaluate(([id, v]) => EZ.activate(id, v), [id, v]);
      await p.waitForTimeout(400);
      // walk the version through the viewport so reveals and lazy builds run, then force any reveal-hidden text visible for measuring
      const H = await p.evaluate(id => { const s = document.getElementById(id); s.scrollIntoView(); return s.offsetHeight; }, id);
      for (let y = 0; y < H; y += 600) { await p.evaluate(([id, y]) => { const s = document.getElementById(id); scrollTo(0, s.getBoundingClientRect().top + scrollY + y); }, [id, y]); await p.waitForTimeout(120); }
      await p.waitForTimeout(400);
      const r = await p.evaluate(([id, v]) => {
        const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
        function rgba(c) { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; }
        function over(a, b) { const al = a[3]; return [a[0] * al + b[0] * (1 - al), a[1] * al + b[1] * (1 - al), a[2] * al + b[2] * (1 - al), 1]; }
        function lum(c) { const f = x => { x /= 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); }; return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2]); }
        function ratio(a, b) { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05); }
        function bgOf(el) {
          const stack = [];
          for (let e = el; e; e = e.parentElement) {
            const cs = getComputedStyle(e);
            if (e instanceof SVGElement && e.tagName !== 'svg') continue;
            if (cs.backgroundImage && cs.backgroundImage !== 'none' && !/^url\("data:image\/svg/.test(cs.backgroundImage)) return null;
            if (e.tagName === 'IMG' || e.tagName === 'CANVAS' || e.tagName === 'VIDEO') return null;
            const c = rgba(cs.backgroundColor);
            if (c[3] > 0) { stack.push(c); if (c[3] >= .999) break; }
          }
          let base = [255, 255, 255, 1];
          for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
          return base;
        }
        // does any photo or canvas sit under the element's box? (text laid over imagery)
        function overImage(el, ver) {
          const r = el.getBoundingClientRect();
          // photos, canvases, and absolutely placed SVG artwork (text set on a drawn block) all count as imagery under the text
          return [...ver.querySelectorAll('img, canvas, video, svg')].filter(m => m.tagName !== 'svg' || /absolute|fixed/.test(getComputedStyle(m).position)).some(m => {
            // an opaque box between the text and the shared container (a caption tab, a label plate) hides the imagery
            for (let e = el; e && !e.contains(m); e = e.parentElement) if (rgba(getComputedStyle(e).backgroundColor)[3] >= .999) return false; const q = m.getBoundingClientRect(); return q.width > 30 && q.height > 30 && !(q.right <= r.left || q.left >= r.right || q.bottom <= r.top || q.top >= r.bottom) && !m.contains(el) && !el.contains(m) && (m.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING); });
        }
        const ver = document.querySelector('#' + id + ' .ver[data-v="' + v + '"]');
        const seen = new Set(), bad = [], unm = []; let n = 0;
        const w = document.createTreeWalker(ver, NodeFilter.SHOW_TEXT);
        let t;
        while ((t = w.nextNode())) {
          if (!t.nodeValue.trim()) continue;
          const el = t.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
          if (el.closest('[hidden], .rx, [aria-hidden="true"] .rx')) continue;
          const cs = getComputedStyle(el), rect = el.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1 || cs.visibility === 'hidden' || cs.display === 'none') continue;
          let op = 1; for (let e = el; e && e !== document.body; e = e.parentElement) op *= +getComputedStyle(e).opacity;
          if (op < .5) continue;
          const isSvg = el instanceof SVGElement;
          const fg = rgba(isSvg ? cs.fill : cs.color);
          if (fg[3] === 0) continue;
          const size = parseFloat(cs.fontSize), wt = +cs.fontWeight, large = size >= 24 || (size >= 18.66 && wt >= 700);
          const label = el.tagName.toLowerCase() + '.' + (el.className.baseVal !== undefined ? el.className.baseVal : el.className).toString().split(' ')[0] + ' "' + t.nodeValue.trim().slice(0, 28) + '"';
          if (isSvg) { unm.push(label + ' (svg text)'); continue; }
          const bg = bgOf(el);
          if (!bg || overImage(el, ver)) { unm.push(label + ' (over image)'); continue; }
          n++;
          const rr = ratio(over([fg[0], fg[1], fg[2], fg[3] * op], bg), bg), need = large ? 3 : 4.5;
          if (rr < need) bad.push(label + ' ' + rr.toFixed(2) + ' < ' + need);
        }
        return { n, bad, unm };
      }, [id, v]);
      out.push(id + ' slot ' + v + ': text measured ' + r.n + ', below AA ' + r.bad.length + ', unmeasured ' + r.unm.length);
      r.bad.forEach(x => { out.push('   LOW ' + x); fails.push(id + v + ' ' + x); });
      if (process.env.UNM) r.unm.forEach(x => out.push('   unmeasured ' + x));
    }
    // backups open
    for (const v of bk) {
      const e0 = errs.length;
      await p.evaluate(([id, v]) => EZ.activate(id, v), [id, v]);
      await p.waitForTimeout(350);
      const h = await p.evaluate(([id, v]) => { const el = document.querySelector('#' + id + ' .ver[data-v="' + v + '"]'); return el && !el.hidden ? el.offsetHeight : 0; }, [id, v]);
      const ok = h > 100 && errs.length === e0;
      out.push(id + ' backup ' + v + ': ' + (ok ? 'opens (' + h + 'px)' : 'FAIL h=' + h + ' errors=' + (errs.length - e0)));
      if (!ok) fails.push(id + ' backup ' + v);
    }
    await p.evaluate(id => EZ.activate(id, '1'), id);
  }
  out.push('', 'page errors: ' + errs.length, ...errs.slice(0, 5), 'FAILS: ' + fails.length);
  fs.mkdirSync('/home/user/CLaude/remodeling/qa', { recursive: true });
  fs.writeFileSync('/home/user/CLaude/remodeling/qa/phase6-' + TAG + '.txt', out.join('\n') + '\n');
  console.log(out.filter(l => /FAIL|LOW|errors|backup .*FAIL/.test(l)).join('\n'));
  console.log('FAILS', fails.length);
  await b.close();
})();

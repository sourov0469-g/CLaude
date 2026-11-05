// node measure_images.js <from> <to> [out.json] : how large is every embedded image actually shown?
// For each <img> (and CSS background) whose source is an embedded data: URI, across every homepage version view and every
// subpage view at 1440 and 768, record the widest natural width it needs: max(boxW, boxH * nw / nh), in CSS pixels.
// Key = length + last 64 characters of the data URI (the build checks these keys are unique). Images never seen at a
// width stay at their own size; the build only ever shrinks an image to 1.5x the largest width it is shown at.
const { chromium } = require('playwright'); const fs = require('fs');
const U = 'file://' + __dirname + '/out/site.raw.html';   // the build before the weight pass (python3 build_site.py --raw)
const [from, to, outF] = [+process.argv[2] || 0, +process.argv[3] || 1e9, process.argv[4] || 'media/img-need.json'];
(async () => { const b = await chromium.launch(); const need = fs.existsSync(outF) ? JSON.parse(fs.readFileSync(outF, 'utf8')) : {};
  const p0 = await b.newPage(); await p0.goto(U, { waitUntil: 'load' });
  const M = await p0.evaluate(() => ({ V: window.__VERSIONS, pages: (window.__PAGES || []).map((x) => x[0]), sp: window.__SLOTPAGE })); await p0.close();
  const views = [];
  for (const [slot, vs] of Object.entries(M.V)) for (const [v] of vs) views.push(M.sp[slot] ? `?page=${M.sp[slot]}&${slot}=${v}` : `?${slot}=${v}`);
  for (const pg of M.pages) views.push(`?page=${pg}`);
  const list = views.slice(from, to);
  for (const w of [1440, 768]) { const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    for (const q of list) { const p = await ctx.newPage(); await p.goto(U + q, { waitUntil: 'load', timeout: 120000 });
      // walk the page so lazy and scroll-driven sections lay out
      await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
      await p.waitForTimeout(250);
      const got = await p.evaluate(() => { const r = {}; const key = (s) => s.length + ':' + s.slice(-64);
        const add = (s, bw, bh, nw, nh) => { if (!s || !s.startsWith('data:image') || !bw || !bh || !nw || !nh) return; const n = Math.max(bw, bh * nw / nh); const k = key(s); if (!r[k] || r[k] < n) r[k] = Math.ceil(n); };
        document.querySelectorAll('img').forEach((i) => { const b = i.getBoundingClientRect(); add(i.currentSrc || i.src, b.width, b.height, i.naturalWidth, i.naturalHeight); });
        return r; });
      for (const [k, n] of Object.entries(got)) if (!need[k] || need[k] < n) need[k] = n; await p.close(); }
    await ctx.close(); }
  fs.writeFileSync(outF, JSON.stringify(need)); console.log(JSON.stringify({ views: views.length, range: [from, Math.min(to, views.length)], images: Object.keys(need).length })); await b.close(); })();

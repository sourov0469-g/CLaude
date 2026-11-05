// Every image and video the default homepage shows (NEW mode), per section, with repeats flagged. Media are identified by content hash.
const { chromium } = require('playwright'); const path = require('path'); const crypto = require('crypto'); const fs = require('fs');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(F); await p.waitForTimeout(2500);
  const rows = await p.evaluate(() => { const out = [];
    const sec = e => { const s = e.closest('main > section'); return s ? s.id : (e.closest('header') ? 'header' : 'page'); };
    document.querySelectorAll('img').forEach(e => out.push({ sec: sec(e), kind: 'img', cls: e.className, alt: e.alt, src: e.currentSrc || e.src }));
    document.querySelectorAll('video').forEach(e => { out.push({ sec: sec(e), kind: 'video', cls: e.className, alt: e.getAttribute('aria-label') || '', src: e.currentSrc || e.src || e.getAttribute('src') || '(set later: ' + (e.dataset.media || 'RESET_MEDIA') + ')' }); if (e.poster) out.push({ sec: sec(e), kind: 'poster', cls: '', alt: '', src: e.poster }); });
    document.querySelectorAll('main *').forEach(e => { const bg = getComputedStyle(e).backgroundImage; if (bg && bg.startsWith('url(')) out.push({ sec: sec(e), kind: 'css-bg', cls: e.className, alt: '', src: bg.slice(5, -2) }); });
    return out; });
  // scroll section 3 so its film loads, then record what it plays
  const v3 = await p.evaluate(async () => { const s = document.getElementById('nothing'); scrollTo(0, s.offsetTop + 400); await new Promise(r => setTimeout(r, 1500)); const v = s.querySelector('video'); return v.currentSrc || v.src; });
  rows.push({ sec: 'nothing', kind: 'video', cls: 'scrub (after load)', alt: '', src: v3 });
  const v1 = await p.evaluate(() => { const v = document.querySelector('#top video'); return v.currentSrc || v.src; });
  rows.forEach(r => { r.hash = r.src && r.src.startsWith('data:') ? crypto.createHash('sha1').update(r.src).digest('hex').slice(0, 10) : (r.src || '').slice(0, 60); r.bytes = r.src ? r.src.length : 0; delete r.src; });
  const by = {}; rows.forEach(r => { (by[r.hash] = by[r.hash] || []).push(r.sec + ':' + r.kind); });
  rows.forEach(r => { r.placements = by[r.hash].length; r.where = [...new Set(by[r.hash])].join(' + '); });
  fs.writeFileSync(path.join(__dirname, 'media-map.json'), JSON.stringify(rows, null, 1));
  const seen = new Set(); rows.filter(r => r.bytes > 2000).forEach(r => { const k = r.hash + r.sec + r.kind; if (seen.has(k)) return; seen.add(k); console.log([r.sec, r.kind, r.cls.slice(0, 18), (r.alt || '').slice(0, 40), r.hash, Math.round(r.bytes / 1024) + 'KB', r.placements > 1 ? 'REPEAT x' + r.placements + ' (' + r.where + ')' : ''].join(' | ')); });
  await b.close(); })();

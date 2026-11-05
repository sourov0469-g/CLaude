// The owner's rule in its strictest form: load EVERY version of EVERY section and hash every image and video it can show.
// Pass = no file (by content) belongs to two different sections, so no combination of switched versions can repeat one.
const { chromium } = require('playwright'); const path = require('path'); const crypto = require('crypto'); const fs = require('fs');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html');
const V = { top: 4, finder: 3, nothing: 3, numbers: 3, people: 3, towns: 3, call: 3 };
(async () => { const b = await chromium.launch(); const own = {}, rows = [];
  for (const [sec, n] of Object.entries(V)) for (let v = 1; v <= n; v++) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.goto(F + '?' + sec + '=' + v); await p.waitForTimeout(1200);
    // walk the section so lazy media load, then read every src (img, video, poster) and every film the section can ask for
    await p.evaluate(async s => { const e = document.getElementById(s); for (const f of [0, .25, .5, .75, 1]) { scrollTo({ top: e.offsetTop + Math.max(0, e.offsetHeight - innerHeight) * f, behavior: 'instant' }); await new Promise(r => setTimeout(r, 250)); } }, sec);
    const extra = [];
    if (sec === 'finder' && v === 1) { await p.evaluate(() => document.getElementById('finder').scrollIntoView({ behavior: 'instant' })); await p.click('#finder .pill >> nth=0'); await p.waitForTimeout(1500);
      for (let k = 0; k < 6; k++) { await p.evaluate(k => document.querySelectorAll('.rbar .dock button')[k].click(), k); await p.waitForTimeout(500); extra.push(await p.evaluate(() => document.querySelector('#finder .arch img').currentSrc)); } }
    const media = await p.evaluate(s => { const e = document.getElementById(s), out = []; const html = e.outerHTML;
      e.querySelectorAll('img').forEach(i => out.push(i.currentSrc || i.src));
      e.querySelectorAll('video').forEach(x => { if (x.poster) out.push(x.poster); });
      Object.keys(window.RESET_MEDIA || {}).forEach(k => { if (e.querySelector('script') === null) return; });
      return { srcs: out.filter(Boolean), films: [...new Set((html.match(/RESET\.video\('([a-z]+)'\)/g) || []).map(m => m.slice(13, -2)))].map(k => ({ k, d: (window.RESET_MEDIA[k] || '').slice(-400) + (window.RESET_MEDIA[k] || '').length })) }; }, sec);
    // the inline scripts were stamped into the DOM, but the film keys live in the version's script text: read them from the template too
    const films = await p.evaluate(([s, v]) => { const t = [...document.querySelectorAll('main > template.rv')].find(x => x.dataset.sec === s && +x.dataset.v === v); const src = t ? t.innerHTML : document.getElementById(s).outerHTML; return [...new Set((src.match(/RESET\.video\('([a-z]+)'\)/g) || []).map(m => m.slice(13, -2)))].map(k => ({ k, d: (window.RESET_MEDIA[k] || '').length + ':' + (window.RESET_MEDIA[k] || '').slice(-300) })); }, [sec, v]);
    media.srcs.push(...extra);
    const keys = media.srcs.filter(s => !s.startsWith('data:image/gif;base64,R0lGOD') && !s.startsWith('data:image/svg')).map(s => ({ h: crypto.createHash('sha1').update(s).digest('hex').slice(0, 10), what: 'image' }))
      .concat(films.map(f => ({ h: crypto.createHash('sha1').update(f.d).digest('hex').slice(0, 10), what: 'film:' + f.k })));
    keys.forEach(k => { (own[k.h] = own[k.h] || { what: k.what, secs: new Set(), where: [] }); own[k.h].secs.add(sec); own[k.h].where.push(sec + ' v' + v); });
    rows.push({ sec, v, images: keys.filter(k => k.what === 'image').length, films: films.map(f => f.k) });
    await p.close(); }
  const shared = Object.entries(own).filter(([h, o]) => o.secs.size > 1).map(([h, o]) => ({ h, what: o.what, where: o.where }));
  const out = { versions: rows, distinctFiles: Object.keys(own).length, sharedAcrossSections: shared, pass: shared.length === 0 };
  fs.writeFileSync(path.join(__dirname, 'media-all.json'), JSON.stringify(out, null, 1));
  rows.forEach(r => console.log(r.sec + ' v' + r.v + ': ' + r.images + ' images' + (r.films.length ? ', films ' + r.films.join('+') : '')));
  console.log('distinct files: ' + out.distinctFiles + ' | shared across sections: ' + (shared.length ? JSON.stringify(shared) : 'none') + ' | ' + (out.pass ? 'PASS' : 'FAIL'));
  await b.close(); })();

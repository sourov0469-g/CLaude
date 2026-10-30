// usage: node rxcheck.js [width]  -> coverage + uniqueness of reactions across all 30 versions and chrome
// An interactive element is covered when it, or the label / field wrapper it sits in, carries data-rx.
const { chromium } = require('playwright');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const SECS = (process.env.SECS || 'hero,proof,services,ba,process,financing,work,reviews,towns,consult').split(',');
const SEL = 'a[href],button,input:not([type=hidden]),select,textarea,[role=radio],[role=tab],[tabindex="0"]';
(async () => {
  const w = +(process.argv[2] || 1440);
  const b = await chromium.launch();
  const seen = new Map(), missing = [], bad = [];
  // SLOTS env (e.g. 4,5,6,7,8) checks further slots; a section without that slot falls back and is skipped
  for (const v of (process.env.SLOTS || '1,2,3').split(',').map(Number)) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(FILE + '?' + SECS.map(s => s + '=' + v).join('&'));
    await p.waitForTimeout(1500);
    // walk the page so lazily built controls exist
    const H = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(120); }
    await p.waitForTimeout(600);
    const r = await p.evaluate(([SEL, v]) => {
      const out = [];
      document.querySelectorAll(SEL).forEach(e => {
        const ver = e.closest('.ver');
        if (ver && ver.hidden) return;
        if (ver && ver.dataset.v !== String(v)) return;
        if (!ver && v > 1) return;                     // chrome counted once
        if (e.closest('.rx')) return;
        const host = e.closest('[data-rx]');
        const near = host && (host === e || host.contains(e) && (host.tagName === 'LABEL' || host.matches('.c-f, .rx-host')));
        const where = ver ? ver.closest('section').id + ver.dataset.v : (e.closest('.vswitch') ? e.closest('.vswitch').dataset.for + ':switch' : 'chrome');
        const name = (e.getAttribute('aria-label') || e.textContent || e.value || e.name || e.type || '').trim().replace(/\s+/g, ' ').slice(0, 30);
        out.push({ valid: near ? EZ.rxValid(host.dataset.rx) : false, where, tag: e.tagName.toLowerCase() + (e.type && e.tagName === 'INPUT' ? '/' + e.type : ''), name, rx: near ? host.dataset.rx : null });
      });
      return out;
    }, [SEL, v]);
    for (const e of r) {
      if (!e.rx) { missing.push(e); continue; }
      if (!e.valid) bad.push(e);
      if (e.rx.startsWith('native:')) { seen.set(e.rx + '@' + e.where + e.name, [e]); continue; }
      if (!seen.has(e.rx)) seen.set(e.rx, []);
      seen.get(e.rx).push(e);
    }
    await p.close();
  }
  await b.close();
  const dups = [...seen].filter(([k, l]) => l.length > 1 && !k.startsWith('native:') && k !== 'phone');   // AUDIT-01 D.5: every tel: link shares one signature by design
  // a radio group's wrapper label and its input are one control: collapse exact same element counted twice
  console.log('elements', [...seen.values()].reduce((a, l) => a + l.length, 0) + missing.length, 'covered', [...seen.values()].reduce((a, l) => a + l.length, 0), 'missing', missing.length, 'duplicate specs', dups.length);
  bad.forEach(e => console.log('INVALID', e.where, e.name, e.rx));
  missing.forEach(e => console.log('MISSING', e.where, e.tag, e.name));
  dups.forEach(([k, l]) => console.log('DUP', k, l.map(e => e.where + ':' + e.name).join(' | ')));
  if (process.env.DUMP) require('fs').writeFileSync(process.env.DUMP, JSON.stringify([...seen].map(([k, l]) => l.map(e => ({ ...e, rx: e.rx }))).flat(), null, 1));
})();

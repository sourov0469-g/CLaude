const { chromium } = require('playwright');
const SECS = ['hero', 'proof', 'services', 'work', 'built', 'colour', 'near', 'reviews', 'money', 'book'];
(async () => { const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto('file:///home/user/CLaude/siding/homepage-standalone.html?v=1111111111', { waitUntil: 'load' }); await p.waitForTimeout(500);
  const out = [];
  for (const s of SECS) for (const v of [1, 2, 3]) {
    await p.evaluate(s => { const el = document.getElementById(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 80); }, s);
    await p.locator(`#${s} .vsw-b[data-v="${v}"]`).click(); await p.waitForTimeout(250);
    const r = await p.evaluate(s => {
      const sec = document.getElementById(s);
      const all = gsap.globalTimeline.getChildren(true, true, false);
      let max = 0, n = 0, k10 = 0;
      all.forEach(t => { if (!t.scrollTrigger) return; const tg = [].concat(t.targets ? t.targets() : []); if (!tg.some(e => e && e.nodeType === 1 && sec.contains(e))) return;
        if (t.vars.data === 'k10') { k10++; return; } n++; max = Math.max(max, (t.vars.duration || 0.5) / t.timeScale()); });
      return { n, k10, max: +max.toFixed(3) };
    }, s);
    out.push(`${s}${v} entrances ${r.n}, longest per element ${r.max}s, k10 ${r.k10}`);
  }
  const over = out.filter(l => +l.split('longest per element ')[1].split('s')[0] > 0.301);
  console.log(out.join('\n')); console.log('OVER 0.3:', over.length ? over.join(' | ') : 'none'); await b.close(); })();

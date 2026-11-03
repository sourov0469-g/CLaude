// Deep QA · every section at a device size, as the visitor meets it (motion on, touch on phones): the section's top is
// scrolled to just under the header, then one screen (two for sections taller than 1.6 screens) is captured and the
// captures are laid out as one sheet per page for review.
// Usage: node qa_sections.js <width> <height> <outDir>
const { chromium } = require('playwright'); const { execFileSync } = require('child_process'); const fs = require('fs');
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const [W, H, OUT] = [+process.argv[2], +process.argv[3], process.argv[4]]; fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  for (const [n, f] of Object.entries(PAGES)) {
    const ctx = await b.newContext(Object.assign({ viewport: { width: W, height: H } }, W < 600 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}));
    const p = await ctx.newPage(); await p.goto('file:///home/user/CLaude/remodeling/site/' + f); await p.waitForTimeout(1300);
    const ids = await p.evaluate(() => [...document.querySelectorAll('section.sec[id]')].map(s => s.id).concat(['__foot']));
    const shots = [];
    for (const id of ids) {
      const info = await p.evaluate(id => { const e = id === '__foot' ? document.querySelector('.foot') : document.getElementById(id); const sp = e.parentElement.classList.contains('pin-spacer') ? e.parentElement : e; const r = sp.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height, nav: document.querySelector('.nav').getBoundingClientRect().height }; }, id);
      const screens = info.h > H * 1.6 ? 2 : 1;
      for (let s = 0; s < screens; s++) {
        const y = Math.max(0, info.top - info.nav + s * (H - info.nav - 40));
        // walk to it, so scroll-driven pieces play in order
        let cur = await p.evaluate(() => scrollY); while (Math.abs(cur - y) > 1) { cur += Math.sign(y - cur) * Math.min(400, Math.abs(y - cur)); await p.evaluate(v => scrollTo(0, v), cur); await p.waitForTimeout(30); }
        await p.waitForTimeout(1300);
        const name = `${OUT}/${n}-${W}-${String(shots.length).padStart(2, '0')}-${id}.png`; await p.screenshot({ path: name }); shots.push(name);
      }
    }
    await ctx.close();
    execFileSync('python3', ['-c', `
from PIL import Image
ns=${JSON.stringify(shots)}
tw=${W < 600 ? 260 : W < 1000 ? 300 : 420}
ims=[Image.open(x).convert('RGB') for x in ns]; ims=[i.resize((tw,int(i.height*tw/i.width))) for i in ims]
cols=${W < 600 ? 7 : W < 1000 ? 5 : 4}; rows=(len(ims)+cols-1)//cols; th=ims[0].height
s=Image.new('RGB',(cols*(tw+6),rows*(th+6)),'#c33')
for i,im in enumerate(ims): s.paste(im,((i%cols)*(tw+6),(i//cols)*(th+6)))
s.save('${OUT}/sheet-${n}-${W}.jpg',quality=82)
`]);
    console.log(n, W, shots.length, 'shots');
  }
  await b.close();
})();

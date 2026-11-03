// Mobile visual audit · every frame of every page as a phone visitor scrolls it (touch, motion on). The page is walked
// down in small steps so scroll-driven pieces play in order; a frame is captured every STEP px; frames are laid out
// eight to a sheet (two rows of four) at a size that can be read.
// Usage: node qa_frames.js <round> [page,page] [width] [height]
const { chromium } = require('playwright'); const { execFileSync } = require('child_process'); const fs = require('fs');
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const round = process.argv[2] || '1', only = (process.argv[3] || '').split(',').filter(Boolean);
const W = +(process.argv[4] || 390), H = +(process.argv[5] || 844), STEP = Math.round(H * .77);
const OUT = `/home/user/CLaude/qa/mobile/r${round}`; fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  for (const [n, f] of Object.entries(PAGES)) {
    if (only.length && !only.includes(n)) continue;
    const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 120)));
    await p.goto('file:///home/user/CLaude/remodeling/site/' + f); await p.waitForTimeout(1500);
    const shots = []; let y = 0;
    for (;;) {
      const max = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
      const target = Math.min(y, max);
      let cur = await p.evaluate(() => scrollY);
      while (Math.abs(cur - target) > 1) { cur += Math.sign(target - cur) * Math.min(60, Math.abs(target - cur)); await p.evaluate(v => scrollTo(0, v), cur); await p.waitForTimeout(16); }
      await p.waitForTimeout(1100);
      const name = `${OUT}/${n}-${String(shots.length).padStart(2, '0')}.png`; await p.screenshot({ path: name }); shots.push(name);
      if (target >= max) break; y += STEP;
    }
    await ctx.close();
    execFileSync('python3', ['-c', `
from PIL import Image
import os
ns=${JSON.stringify(shots)}; tw=300
ims=[Image.open(x).convert('RGB') for x in ns]; ims=[i.resize((tw,int(i.height*tw/i.width))) for i in ims]; th=ims[0].height
for k in range(0,len(ims),8):
    ch=ims[k:k+8]; s=Image.new('RGB',(4*(tw+8),2*(th+8)),'#c33')
    for i,im in enumerate(ch): s.paste(im,((i%4)*(tw+8),(i//4)*(th+8)))
    s.save('${OUT}/${n}-sheet%d.jpg'%(k//8),quality=84)
for x in ns: os.remove(x)
`]);
    console.log(n, shots.length, 'frames', errs.length ? 'ERRORS ' + errs.join(' | ') : '');
  }
  await b.close();
})();

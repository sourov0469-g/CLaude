/* Area gate screenshots -> gate/area-*.png|jpg (then a contact sheet). node tools/area_shots.js */
const { chromium } = require('playwright'); const { execSync } = require('child_process');
const F = 'file:///home/user/CLaude/siding/redo/final/out/' + (process.env.F || 'final-area.html'); const G = '/home/user/CLaude/siding/redo/final/gate/';
(async () => {
  const b = await chromium.launch();
  async function open(w, h, extra = {}) { const c = await b.newContext({ viewport: { width: w, height: h }, ...extra }); const p = await c.newPage(); await p.goto(F); await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' }); p.c = c; return p; }
  const toBoard = (p, dy) => p.evaluate((dy) => scrollTo({ top: scrollY + document.querySelector('.ar-board').getBoundingClientRect().top + dy, behavior: 'instant' }), dy);
  const through = async (p) => { const H = await p.evaluate(() => document.querySelector('.ar-board').getBoundingClientRect().height); for (let y = -100; y < H; y += 250) { await toBoard(p, y); await p.waitForTimeout(80); } await p.waitForTimeout(1200); };
  let p = await open(1440, 900);
  await toBoard(p, -300); await p.waitForTimeout(1800); await p.screenshot({ path: G + 'area-1440-top.png' });
  await through(p); await toBoard(p, 20); await p.mouse.move(1412, 450); await p.waitForTimeout(1800); await p.screenshot({ path: G + 'area-1440-board.png' });
  await p.click('.ar-sign[data-town="Cedar Park"]'); await p.mouse.move(1412, 450); await p.waitForTimeout(1300); await p.screenshot({ path: G + 'area-1440-town.png' });
  await p.click('.ar-sign[data-town="Cedar Park"]'); await p.mouse.move(1412, 450); await p.click('.ar-chip[data-t="Siding"]'); await p.mouse.move(1412, 450); await p.waitForTimeout(900); await p.screenshot({ path: G + 'area-1440-chip.png' });
  await p.click('.ar-chip[data-t="all"]'); await p.mouse.move(1412, 450);
  await p.hover('.ar-c:nth-child(7) .ar-card'); await p.waitForTimeout(900); await p.screenshot({ path: G + 'area-1440-hover.png' });
  await p.click('.ar-c:nth-child(7) .ar-card'); await p.waitForTimeout(1000); await p.screenshot({ path: G + 'area-1440-viewer.png' });
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  await p.evaluate(() => document.querySelector('#ar-q').scrollIntoView({ block: 'center', behavior: 'instant' })); await p.fill('#ar-q', 'ro'); await p.waitForTimeout(400); await p.screenshot({ path: G + 'area-1440-finder.png' });
  await p.c.close();
  p = await open(1440, 900, { reducedMotion: 'reduce' }); await toBoard(p, 20); await p.waitForTimeout(900); await p.screenshot({ path: G + 'area-1440-reduced.png' }); await p.c.close();
  p = await open(1024, 768); await through(p); await toBoard(p, 200); await p.waitForTimeout(800); await p.screenshot({ path: G + 'area-1024.png' }); await p.c.close();
  p = await open(390, 844, { hasTouch: true, isMobile: true }); await toBoard(p, -140); await p.waitForTimeout(1500); await p.screenshot({ path: G + 'area-390-top.png' });
  await p.tap('.ar-sign[data-town="Round Rock"]'); await p.waitForTimeout(1300); await p.screenshot({ path: G + 'area-390-town.png' });
  await p.tap('.ar-sign[data-town="Round Rock"]'); await through(p); await p.waitForTimeout(400); await p.screenshot({ path: G + 'area-390-board.png' });
  await p.evaluate(() => { const l = document.querySelectorAll('.ar-c')[1]; l.scrollIntoView({ block: 'center', behavior: 'instant' }); }); await p.waitForTimeout(500);
  await p.tap('.ar-c:nth-child(2) .ar-card'); await p.waitForTimeout(1000); await p.screenshot({ path: G + 'area-390-viewer.png' }); await p.c.close();
  await b.close();
  execSync(`python3 - <<'E'
from PIL import Image
G='${G}'
def sheet(names,out,cols,w,gap=14,bg=(232,238,233)):
    ims=[Image.open(G+n).convert('RGB') for n in names]
    s=[im.resize((w,int(im.height*w/im.width))) for im in ims]
    rows=[s[i:i+cols] for i in range(0,len(s),cols)]
    H=sum(max(i.height for i in r)+gap for r in rows)+gap; W=cols*w+(cols+1)*gap
    S=Image.new('RGB',(W,H),bg); y=gap
    for r in rows:
        x=gap
        for im in r: S.paste(im,(x,y)); x+=w+gap
        y+=max(i.height for i in r)+gap
    S.save(G+out,quality=82)
sheet(['area-1440-top.png','area-1440-board.png','area-1440-town.png','area-1440-chip.png','area-1440-hover.png','area-1440-viewer.png'],'area-states-1440.jpg',2,900)
sheet(['area-390-top.png','area-390-town.png','area-390-board.png','area-390-viewer.png'],'area-phone-390.jpg',4,360)
E`);
})();

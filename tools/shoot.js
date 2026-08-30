/* Screenshot a built deck at a list of slides, and report console errors.
   Usage: node tools/shoot.js [hrm|csr] [slideIndex ...]
   The deck name may also come from DECK; it defaults to hrm. */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const PAGES = { hrm: 'index.html', csr: 'csr.html' };
const argv = process.argv.slice(2);
const deck = PAGES[argv[0]] ? argv.shift() : (PAGES[process.env.DECK] ? process.env.DECK : 'hrm');

const OUT = process.env.SHOT_DIR || '/tmp/claude-0/-home-user-CLaude/199bdc8b-ecfc-53a6-b005-f066b4962a21/scratchpad/shots/' + deck;
const FILE = 'file://' + path.resolve(__dirname, '..', PAGES[deck]);
const want = argv.map(Number).filter((n) => !isNaN(n));
const W = Number(process.env.SHOT_W || 1600);
const H = Number(process.env.SHOT_H || 900);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage', '--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  await page.goto(FILE, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT, '00-entry.png') });

  await page.click('#entry-go');
  await page.waitForTimeout(2600);

  const list = want.length ? want : [0];
  for (const i of list) {
    await page.evaluate((n) => window.Deck.go(n, true), i);
    await page.waitForTimeout(2700);
    const id = await page.evaluate(() => SLIDES[Deck.current()].id);
    await page.screenshot({ path: path.join(OUT, String(i).padStart(2, '0') + '-' + id + '.png') });
  }

  const info = await page.evaluate(() => ({
    slides: SLIDES.length,
    missing: Media.missing(),
    webgl: World.isReady(),
    body: document.body.className,
  }));
  info.deck = deck;
  console.log(JSON.stringify(info, null, 2));
  if (errors.length) { console.log('\n--- console ---'); errors.slice(0, 40).forEach((e) => console.log(e)); }
  else console.log('\nno console errors');
  await browser.close();
})().catch((e) => { console.error('FATAL', e); process.exit(1); });

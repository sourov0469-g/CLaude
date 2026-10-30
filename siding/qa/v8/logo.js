// Final gate, logo: the new mark in the header, the footer and the favicon.
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('file://' + require('path').resolve(__dirname, '../../homepage-standalone.html')); await p.waitForTimeout(800);
  console.log(JSON.stringify(await p.evaluate(() => {
    const mark = el => !!el && !!el.querySelector('svg.brand-mark path[d^="M3.50 40.00L32.00 4.50"]');
    const fav = document.querySelector('link[rel="icon"]').href, svg = atob(fav.split(',')[1] || '');
    return { header: mark(document.querySelector('header .hd-logo')), headerName: document.querySelector('header .brand-n').textContent, footer: mark(document.querySelector('footer .ft-logo')), footerName: document.querySelector('footer .brand-n').textContent + ' / ' + document.querySelector('footer .brand-d').textContent, favicon: fav.startsWith('data:image/svg+xml') && svg.includes('M3.50 40.00L32.00 4.50'), oldLogoImgs: document.querySelectorAll('img[src*="LOGO"], img[data-asrc*="LOGO"]').length };
  }), null, 1)); await b.close(); })();

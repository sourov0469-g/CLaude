// Renders src/img/out/og-home.jpg (1200x630) in Chromium with the brand fonts.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs');
const root = path.resolve(__dirname, '..');
const u = (p) => 'file://' + path.join(root, p);
const html = `<!doctype html><meta charset=utf-8><style>
@font-face{font-family:M;font-weight:400 800;src:url(${u('src/fonts/manrope-400-800.woff2')})}
@font-face{font-family:P;font-weight:400;src:url(${u('src/fonts/poppins-400.woff2')})}
@font-face{font-family:P;font-weight:600;src:url(${u('src/fonts/poppins-600.woff2')})}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;position:relative;overflow:hidden;background:#FAF9F6}
.ph{position:absolute;right:0;top:0;width:560px;height:630px;background:url(${u('src/img/client/c01-roof-hero.jpg')}) 36% 50%/cover}
.pn{position:absolute;left:0;top:0;width:660px;height:630px;background:#FAF9F6;padding:56px 64px;border-right:4px solid #CC9865}
.pn img{width:210px;display:block}
h1{font:400 64px/1.04 M;letter-spacing:-.035em;color:#242E32;margin-top:56px}
p{font:400 24px/1.5 P;color:#576065;margin-top:28px;max-width:520px}
.k{font:600 15px P;letter-spacing:.16em;text-transform:uppercase;color:#8F6244;position:absolute;left:64px;bottom:52px}
</style><div class=ph></div><div class=pn><img src="${u('src/img/out/logo.png')}"><h1>Clearer answers<br>from above.</h1><p>Drone roof inspections, mapping, 3D models and monitoring.</p><div class=k>Macclesfield &middot; Cheshire</div></div>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  fs.writeFileSync('/tmp/og.html', html);
  await p.goto('file:///tmp/og.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(root, 'src/img/out/og-home.jpg'), type: 'jpeg', quality: 86 });
  await b.close();
})();

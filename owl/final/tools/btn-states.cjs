// node btn-states.cjs <beforeHtml> <afterHtml> <outdir>  → one strip per button family: before row, after row; rest · hover 140ms · hover 700ms · pressed · keyboard focus
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { execSync } = require('child_process');
const [BEF, AFT, OUTd] = process.argv.slice(2); const OUT = path.resolve(OUTd); fs.mkdirSync(OUT, { recursive: true });
const FAM = [
  ['primary-cta', '?hero=13', '.ver[data-sec="hero"][data-v="13"] .ctas .btn-amber'],
  ['call-button', '?hero=13', '.ver[data-sec="hero"][data-v="13"] .ctas a[href^="tel:"]'],
  ['hero-tab-cta', '?hero=11', '.ver[data-sec="hero"][data-v="11"] .btn-tab'],
  ['header-book', '', '.hdr .btn'],
  ['header-phone', '', '.hdr .hdr-tel'],
  ['film-button', '?video=12', '.ver[data-sec="video"][data-v="12"] .full'],
  ['version-control', '?video=13', '.ver[data-sec="video"][data-v="13"] .shake'],
  ['trouble-spot', '?explore=11', '.ver[data-sec="explore"][data-v="11"] .spot'],
  ['form-chip', '?booking=8', '.ver[data-sec="booking"][data-v="8"] .chips button'],
  ['secondary-line', '?video=13', '.ver[data-sec="video"][data-v="13"] .acts .btn-line']];
(async () => { const b = await chromium.launch();
  for (const [name, q, sel] of FAM) { const rows = [];
    for (const [which, file] of [['before', BEF], ['after', AFT]]) {
      const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); await p.route('https://**', r => r.abort());
      await p.goto('file://' + path.resolve(file) + q); await p.addStyleTag({ content: '.owlc{display:none!important}' }); await p.waitForTimeout(1300);
      if (name === 'form-chip') await p.evaluate(() => { const v = document.querySelector('.ver[data-sec="booking"][data-v="8"]'); if (v) { v.querySelectorAll('.st').forEach((s, i) => { s.classList.toggle('on', i === 3); s.removeAttribute('inert'); }); } });
      const loc = p.locator(sel).first(); await loc.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
      const bb = await loc.boundingBox(); if (!bb) { console.log(name, which, 'not found'); await p.close(); continue; }
      const clip = { x: Math.max(0, bb.x - 26), y: Math.max(0, bb.y - 22), width: bb.width + 52, height: bb.height + 44 };
      const shots = []; const sh = async (t) => { const f = path.join(OUT, `${name}-${which}-${t}.png`); await p.screenshot({ path: f, clip }); shots.push(f); };
      await p.mouse.move(2, 2); await p.waitForTimeout(300); await sh('1rest');
      await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 2 }); await p.waitForTimeout(140); await sh('2hover140');
      await p.waitForTimeout(560); await sh('3hover700');
      await p.mouse.down(); await p.waitForTimeout(90); await sh('4pressed'); await p.mouse.move(2, 2); await p.mouse.up(); await p.waitForTimeout(500);
      await p.evaluate(() => document.activeElement && document.activeElement.blur()); await loc.focus(); await p.keyboard.press('Shift'); await p.waitForTimeout(400); await sh('5focus');
      rows.push(shots); await p.close(); }
    if (rows.length === 2) { const py = `from PIL import Image, ImageDraw
rows=${JSON.stringify(rows)}
ims=[[Image.open(f) for f in r] for r in rows]; w=max(i.width for r in ims for i in r); h=max(i.height for r in ims for i in r)
lab=['rest','hover 140 ms','hover 700 ms','pressed','keyboard focus']
o=Image.new('RGB',(130+5*(w+12),40+2*(h+12)),'#F1EFE6'); d=ImageDraw.Draw(o)
for j,t in enumerate(lab): d.text((130+j*(w+12)+6,12),t,fill='#17111D')
for r,(name,row) in enumerate(zip(['BEFORE','AFTER'],ims)):
  d.text((10,40+r*(h+12)+h//2),name,fill='#17111D')
  for j,im in enumerate(row): o.paste(im,(130+j*(w+12),40+r*(h+12)))
o.save('${path.join(OUT, name)}.png')
import os
for r in rows:
  for f in r: os.remove(f)`; fs.writeFileSync(path.join(OUT, '_s.py'), py); execSync('python3 ' + path.join(OUT, '_s.py')); console.log(name, 'ok'); }
  }
  try { fs.unlinkSync(path.join(OUT, '_s.py')); } catch (e) {} await b.close(); })();

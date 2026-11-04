// Homepage button audit: node btn-audit.cjs <fromV> <toV> <tag>  → gates/buttons/audit-<tag>-<from>-<to>.json
// For every visible control in every section at ?all=N: does hover move something (not just recolour)? does press respond? does keyboard focus show a ring?
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [from, to, tag] = process.argv.slice(2); const OUT = path.resolve(__dirname, '../gates/buttons'); fs.mkdirSync(OUT, { recursive: true });
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html');
(async () => { const b = await chromium.launch(); const rows = [];
  for (let v = +from; v <= +to; v++) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.route('https://**', r => r.abort());
    await p.goto(F + '?all=' + v); await p.waitForTimeout(1500);
    const n = await p.evaluate(v => { let i = 0; document.querySelectorAll('.ver:not([hidden])').forEach(ver => { if (ver.dataset.v !== String(v)) return;
      ver.querySelectorAll('a[href], button, [role="button"], [role="slider"], [role="tab"]').forEach(e => { if (e.closest('[inert],[hidden]')) return; const r = e.getBoundingClientRect(); if (!r.width || !r.height) return; e.dataset.au = i++; e.dataset.ausec = ver.dataset.sec; }); }); return i; }, v);
    const snap = (i) => p.evaluate(i => { const e = document.querySelector('[data-au="' + i + '"]'); if (!e) return null; const o = {}; const nodes = [e, ...e.querySelectorAll('*')].slice(0, 16);
      nodes.forEach((nd, k) => { for (const ps of [null, '::before', '::after']) { const s = getComputedStyle(nd, ps); if (ps && (s.content === 'none' || s.content === '')) continue; const key = k + (ps || '');
        o[key] = { m: [s.transform, s.translate, s.scale, s.clipPath, s.backgroundPosition, s.backgroundSize, s.strokeDashoffset, s.width === 'auto' ? '' : (ps ? s.width : '')].join('|'), c: [s.color, s.backgroundColor, s.backgroundImage.slice(0, 60), s.borderColor, s.opacity, s.boxShadow.slice(0, 60)].join('|'), f: [s.outlineStyle, s.outlineWidth, s.boxShadow.slice(0, 80)].join('|') }; } }); return o; }, i);
    const cmp = (A, B, f) => Object.keys(A).some(k => B[k] && A[k][f] !== B[k][f]);
    for (let i = 0; i < n; i++) { try {
      const meta = await p.evaluate(i => { const e = document.querySelector('[data-au="' + i + '"]'); e.scrollIntoView({ block: 'center', behavior: 'instant' }); return { sec: e.dataset.ausec, label: (e.getAttribute('aria-label') || e.innerText || e.value || '').trim().replace(/\s+/g, ' ').slice(0, 40), cls: (e.className && e.className.baseVal === undefined ? e.className : '').toString().slice(0, 50), tag: e.tagName }; }, i);
      await p.mouse.move(2, 2); await p.waitForTimeout(140); const rest = await snap(i); if (!rest) continue;
      const bb = await p.locator('[data-au="' + i + '"]').boundingBox(); if (!bb) continue;
      await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(320); const hov = await snap(i);
      await p.mouse.down(); await p.waitForTimeout(90); const prs = await snap(i); await p.mouse.move(2, 2); await p.mouse.up(); await p.waitForTimeout(60);
      await p.keyboard.press('Escape'); await p.evaluate(() => document.activeElement && document.activeElement.blur());
      await p.locator('[data-au="' + i + '"]').focus(); await p.keyboard.press('Shift'); await p.waitForTimeout(160); const foc = await snap(i); await p.evaluate(() => document.activeElement && document.activeElement.blur());
      const hoverMotion = cmp(rest, hov, 'm'), hoverColour = cmp(rest, hov, 'c'), press = cmp(hov, prs, 'm') || cmp(hov, prs, 'c'), focus = cmp(rest, foc, 'f') || cmp(rest, foc, 'c');
      rows.push({ v, ...meta, hoverMotion, hoverColour, press, focus, plain: !hoverMotion });
    } catch (e) { rows.push({ v, i, error: e.message.slice(0, 80) }); } }
    await p.close(); console.log('v' + v, n, 'controls');
  }
  fs.writeFileSync(path.join(OUT, `audit-${tag}-${from}-${to}.json`), JSON.stringify(rows, null, 1));
  const ok = rows.filter(r => !r.error); console.log(tag, 'controls', ok.length, '| no hover motion', ok.filter(r => r.plain).length, '| no press', ok.filter(r => !r.press).length, '| no focus ring', ok.filter(r => !r.focus).length);
  await b.close(); })();

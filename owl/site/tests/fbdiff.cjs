const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const pg = process.argv[3];
const grab = async (block) => { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); if (block) await p.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await p.goto('file://' + process.argv[2] + '#/' + pg, { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const r = await p.evaluate((pg) => { const out = {}; let i = 0; for (const e of document.querySelectorAll(`.owl-header *, .page[data-page="${pg}"] .sec:first-child .ver:not([hidden]) *`)) { if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue; const r = e.getBoundingClientRect(); if (r.top > 900) continue;
    out[i++] = { k: e.tagName + '.' + (typeof e.className === 'string' ? e.className : '') + ' "' + e.textContent.trim().slice(0, 30) + '"', w: Math.round(r.width), h: Math.round(r.height), f: getComputedStyle(e).fontFamily.split(',')[0] + ' ' + getComputedStyle(e).fontWeight }; } return out; }, pg); await ctx.close(); return r; };
const fb = await grab(true), web = await grab(false);
Object.keys(web).map(k => ({ ...web[k], fw: fb[k] && fb[k].w, fh: fb[k] && fb[k].h })).filter(x => Math.abs(x.w - x.fw) > 2 || x.h !== x.fh).forEach(x => console.log(`${x.k.padEnd(60)} ${x.f.padEnd(16)} web ${x.w}x${x.h}  fallback ${x.fw}x${x.fh}`));
await b.close(); })();

// node btn-rules.cjs <name> <url> <selector-regex>  → prints CSS rules whose selector matches (same-origin or readable sheets only)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [name, url, re] = process.argv.slice(2);
(async () => { const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' })).newPage();
  try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) {} await p.waitForTimeout(5000);
  const rules = await p.evaluate(re => { const R = new RegExp(re), out = []; for (const sh of document.styleSheets) { let cr; try { cr = sh.cssRules; } catch (e) { continue; } const walk = (list) => { for (const r of list) { if (r.cssRules && !r.selectorText) walk(r.cssRules); else if (r.selectorText && R.test(r.selectorText)) out.push(r.cssText.slice(0, 400)); } }; walk(cr); } return out.slice(0, 40); }, re);
  fs.writeFileSync(path.resolve(__dirname, '../gates/buttons/study', name + '-rules.txt'), rules.join('\n')); console.log(rules.join('\n').slice(0, 3800)); await b.close(); })();

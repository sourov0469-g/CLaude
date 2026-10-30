// R3 final: backup B<n> vs the pre-round V<n>, compared as mounted DOM (prefix rename undone) plus the computed style
// of every element (colour, font, size, weight, position box). Reduced motion, 1440 and 375.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [OLD, NEW] = process.argv.slice(2); const IDS = ['hero', 'proof', 'work', 'family', 'how', 'area', 'call'];
const b = await chromium.launch(); const out = []; let bad = 0;
const grab = async (file, q, id, w) => { const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage(); await p.goto('file://' + file + '?v=' + q); await p.waitForTimeout(1500); await p.evaluate(id => document.getElementById(id).scrollIntoView(), id); await p.waitForTimeout(800);
  const r = await p.evaluate(id => { const root = document.querySelector(`#${id} .stage`).firstElementChild, top = root.getBoundingClientRect().top; const norm = s => s.replace(/\bb(hx|pv|wv|fm|hw|tw|cl)(?=[\w-])/g, '$1').replace(/tpl-[a-z]+-b\d/g, '');
    const els = [root, ...root.querySelectorAll('*')].filter(e => !e.classList.contains('ic-arc') && e.getBoundingClientRect().width > 0 && !e.closest('.vh')); const tpl = root.cloneNode(true); tpl.querySelectorAll('.ic-arc').forEach(a => a.remove()); return { head: root.outerHTML.slice(0, 120), html: norm(tpl.innerHTML).replace(/\s(style)="[^"]*"/g, ''), css: els.map(e => { const c = getComputedStyle(e), r = e.getBoundingClientRect(); return [c.color, c.backgroundColor, c.fontSize, c.fontWeight, c.fontFamily, c.opacity, c.display, Math.round(r.left), Math.round(r.top - top), Math.round(r.width), Math.round(r.height)].join('|'); }) }; }, id);
  await ctx.close(); return r; };
for (const w of [1440, 375]) for (const id of IDS) for (const n of [1, 2, 3]) {
  const o = await grab(OLD, id + n, id, w), nn = await grab(NEW, id + 'b' + n, id, w);
  const cssDiff = o.css.length !== nn.css.length ? -1 : o.css.filter((x, i) => x !== nn.css[i]).length;
  const same = o.html === nn.html && cssDiff === 0; if (!same) bad++;
  let at = ` [${o.head.slice(0,60)} | ${nn.head.slice(0,60)}]`; if (o.html !== nn.html) { let i = 0; while (o.html[i] === nn.html[i]) i++; at = ` html@${i}: «${o.html.slice(i - 30, i + 40)}» vs «${nn.html.slice(i - 30, i + 40)}»`; }
  if (cssDiff) { const i = o.css.findIndex((x, k) => x !== nn.css[k]); at += ` css[${i}] ${o.css[i]} vs ${nn.css[i]}`; }
  out.push(`${same ? 'same' : 'DIFF'} ${id} V${n}/B${n} @${w}: elements ${o.css.length}/${nn.css.length}, style rows differing ${cssDiff}${at}`);
}
console.log(out.join('\n') + `\nDIFFERING ${bad}/42`); await b.close();

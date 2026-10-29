// Stand-ins for the graded photographs, which are not in this repository (17 MB of variants).
// Each is a labelled SVG at the photo's real proportions: taken from the width and height attributes of the <img>
// that uses it and the width in its filename, so layout and image decode behave as they would with the real file.
// Shared by serve.mjs (local testing) and standalone.mjs (the one-file preview).
import fs from 'node:fs'; import path from 'node:path';

export function loadRatios(site) {
  const ratio = {};
  for (const page of ['index.html', 'versions.html']) {
    const html = fs.readFileSync(path.join(site, page), 'utf8');
    for (const pic of html.matchAll(/<picture[\s\S]*?<\/picture>|<img\b[^>]*>/g)) {
      const img = pic[0].match(/<img\b[^>]*>/)?.[0] || '';
      const w = +(img.match(/\bwidth="(\d+)"/) || [])[1], h = +(img.match(/\bheight="(\d+)"/) || [])[1];
      if (!w || !h) continue;
      for (const u of pic[0].matchAll(/assets\/img\/([a-z0-9-]+?)(?:-\d{3,4})?\.(?:avif|webp|jpe?g|png)/g)) ratio[u[1]] ??= w / h;
    }
  }
  return ratio;
}
const DEFAULT = { night: 16 / 9, 'macro-height': 1, macro: 16 / 10, 'paper-lit': 1, paper: 1, og: 1200 / 630 };

export function standinSvg(rel, ratio) {
  const name = path.basename(rel).replace(/\.[a-z0-9]+$/, '');
  const m = name.match(/^(.*?)(?:-(\d{3,4}))?$/), base = m[1], w = +(m[2] || 1200);
  const r = ratio[base] || Object.entries(DEFAULT).find(([k]) => base.startsWith(k))?.[1] || 3 / 2;
  const h = Math.round(w / r);
  const dark = /night|storm|macro|hero|dusk|age|house|stain/.test(base), paper = /paper|tooth/.test(base);
  const a = paper ? '#e6e2dc' : dark ? '#4a3d33' : '#9a9088', b = paper ? '#ddd8d1' : dark ? '#1f1813' : '#5d5650';
  const fs2 = Math.max(12, Math.round(w / 40));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/>${paper ? '' : `<text x="${fs2}" y="${h - fs2}" font-family="system-ui,sans-serif" font-size="${fs2}" fill="#fff" fill-opacity=".55">photo placeholder: ${base}</text>`}</svg>`;
}

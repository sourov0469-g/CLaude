import { def, d, $, $$, E, calm, small, clamp, lerp, sub, stageP, esc } from './registry.js';
const RR = window.RR;

// ---------- S4 V2 "Core sample": a 160px lens (120px phones) at scale 2 travels down the section with scroll; the layer under it is named
def('layers', 2, {
  init(sec) {
    const stage = $('[data-core-stage]', sec), col = $('[data-core-col]', sec), lens = $('[data-lens]', sec), inner = $('[data-lens-in]', sec), items = $$('[data-core]', sec);
    const svg = $('.core-svg', col), bands = [10, 28, 74, 88, 102, 118, 130, 170]; // band edges in core units (viewBox 0 0 220 200)
    let y = 0, cur = -1;
    const render = p => {
      const sr = svg.getBoundingClientRect(), cr = col.getBoundingClientRect(), k = sr.height / 200, D = lens.offsetWidth;
      const u = lerp(14, 166, p), cx = sr.left - cr.left + sr.width / 2, cy = sr.top - cr.top + u * k;
      lens.style.transform = `translate3d(${(cx - D / 2).toFixed(1)}px,${(cy - D / 2).toFixed(1)}px,0)`;
      inner.style.width = sr.width + 'px'; inner.style.height = sr.height + 'px';
      inner.style.transform = `translate(${(D / 2 - (sr.width / 2) * 2).toFixed(1)}px,${(D / 2 - u * k * 2).toFixed(1)}px) scale(2)`;
      let i = 0; for (let b = 0; b < bands.length - 1; b++) if (u >= bands[b]) i = b;
      if (i !== cur) { cur = i; items.forEach((li, k2) => li.classList.toggle('on', k2 === i)); }
    };
    if (calm()) { sec.classList.add('core-calm'); items.forEach(li => li.classList.add('on')); requestAnimationFrame(() => render(0.5)); return; }
    sub(stage, dt => { const t = stageP(stage); y = lerp(y, t, 1 - Math.pow(1 - 0.2, dt / 16.7)); render(y); return Math.abs(t - y) > 0.001; });
    requestAnimationFrame(() => render(0));
  }
});

// ---------- S4 V3 "Choose what goes on top": one SVG house, zones refilled (240ms), radio groups per zone; writes estimate.colors
const PAL = {
  roof: [['Onyx Black', '#2b2b2d'], ['Estate Gray', '#56595d'], ['Driftwood', '#6e6455'], ['Brownwood', '#4e3d31'], ['Teak', '#6a5442'], ['Sierra Gray', '#6f7276'], ['Desert Tan', '#8b7a64'], ['Quarry Gray', '#4b4f53']],
  siding: [['Arctic White', '#ecebe6'], ['Light Mist', '#d8dad5'], ['Pearl Gray', '#b6b8b2'], ['Monterey Taupe', '#8a7f6c'], ['Boothbay Blue', '#6f8796'], ['Iron Gray', '#4b4f52']],
  trim: [['White', '#f3f2ee'], ['Almond', '#e6dbc4'], ['Black', '#26282a']],
  gutters: [['White', '#f1f0ec'], ['Almond', '#e2d6bd'], ['Dark Bronze', '#4a3b2f'], ['Black', '#26282a']],
  door: [['Black', '#232425'], ['Brick Red', '#7a2e22'], ['Navy', '#23324a'], ['Sage', '#7d8a6e']]
};
const DEF = { roof: 'Driftwood', siding: 'Light Mist', trim: 'White', gutters: 'White', door: 'Black' };
def('layers', 3, {
  init(sec) {
    const chosen = Object.assign({}, DEF, RR.est.colors || {});
    const sum = $('[data-studio-sum]', sec);
    const paint = (zone, name, anim) => {
      const hex = (PAL[zone].find(p => p[0] === name) || PAL[zone][0])[1];
      $$(`[data-zone="${zone}"]`, sec).forEach(g => { g.style.transition = anim && !calm() ? 'fill 240ms cubic-bezier(.23,1,.32,1)' : 'none'; g.style.fill = hex; });
    };
    const write = () => {
      RR.est.colors = { ...chosen }; RR.saveEst();
      sum.textContent = `Shingles: ${chosen.roof}. Siding: ${chosen.siding}. Trim: ${chosen.trim}. Gutters: ${chosen.gutters}. Door: ${chosen.door}.`;
      const line = d.querySelector('[data-color-line]'); if (line) line.textContent = `Owens Corning TruDefinition Duration, ${chosen.roof}`;
    };
    $$('[data-zonepick]', sec).forEach(fs => {
      const zone = fs.dataset.zonepick, row = d.createElement('div'); row.className = 'sw-row';
      PAL[zone].forEach(([name, hex], i) => {
        const id = `sw-${zone}-${i}`;
        row.insertAdjacentHTML('beforeend', `<label class="sw" for="${id}"><input type="radio" id="${id}" name="sw-${zone}" value="${esc(name)}"${chosen[zone] === name ? ' checked' : ''}><span class="chip-c" style="background:${hex}"></span><span class="nm">${esc(name)}</span></label>`);
      });
      fs.append(row);
      row.addEventListener('change', e => { chosen[zone] = e.target.value; paint(zone, chosen[zone], true); write(); });
      paint(zone, chosen[zone], false);
    });
    write();
  }
});

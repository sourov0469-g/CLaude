import { def, d, $, $$, E, calm, small, clamp, lerp, sub, esc } from './registry.js';
const RR = window.RR;
const townsP = async () => { await RR.loadZips(); return RR.towns(); };
const facts = t => `${t.name} is ${t.mi ? `about ${Math.round(t.mi)} miles from our office` : 'home: our office is right here'}, in ${t.county} County. Half its homes were built before ${t.yearBuilt}.`;

// ---------- S11 V2 "Your town's roofs": decade bar (B25034), segments grow in order (stagger .06, 400ms --ease-out)
def('towns', 2, {
  async init(sec) {
    const towns = await townsP(), sel = $('[data-tr-town]', sec), bar = $('[data-decades]', sec), key = $('[data-decade-key]', sec), fact = $('[data-tr-fact]', sec), mean = $('[data-tr-mean]', sec);
    sel.innerHTML = towns.map(t => `<option>${esc(t.name)}</option>`).join('');
    const pick = name => {
      const t = towns.find(x => x.name === name) || towns[0]; const dec = [...t.decades].reverse(); // oldest first
      bar.innerHTML = dec.map(([lab, pct], i) => `<i style="flex-basis:${pct}%" class="d${i}" title="${lab}: ${pct}%"></i>`).join('');
      key.innerHTML = dec.filter(x => x[1] >= 3).map(([lab, pct]) => `<li><b>${pct}%</b> ${lab === 'before 1940' ? 'before 1940' : 'in the ' + lab}</li>`).join('');
      fact.textContent = facts(t) + ` ${t.pre1980}% of its ${t.homes.toLocaleString('en-US')} homes went up before 1980.`;
      mean.textContent = t.yearBuilt < 1980 ? 'Most houses here are on their second or third roof by now. Older homes can hide two layers of shingles or tired decking, which is why we check every deck board and show you the soft ones first.'
        : t.yearBuilt < 2000 ? 'Many roofs here are reaching or passing the 20-year mark. Some are still the first roof on the house; the inspection tells you which.'
        : 'Many homes here are newer, and many roofs are still the first one. Storm damage, not age, is the usual reason we get called.';
      if (!calm()) $$('i', bar).forEach((s, i) => s.animate([{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: 400, delay: i * 60, easing: E.out, fill: 'backwards' }));
    };
    sel.addEventListener('change', () => pick(sel.value));
    const guess = RR.est.town && towns.some(t => t.name === RR.est.town) ? RR.est.town : 'Springboro'; sel.value = guess; pick(guess);
    const f = $('[data-tr-zip]', sec), out = $('[data-tr-out]', sec);
    f.addEventListener('submit', async e => { e.preventDefault(); const z = $('#tr-zip', sec).value.trim(), a = await RR.zipAnswer(z); out.textContent = a ? a.text : 'Please enter a 5-digit ZIP.'; if (a && a.ok) { RR.est.zip = z; RR.est.town = a.town; RR.saveEst(); sel.value = a.town; pick(a.town); } });
  }
});

// ---------- S11 V3 "Roofline of towns": two <textPath> copies one path-length apart, 40 u/s (28 phones), pause on hover/focus (0.6s), scroll boost (EMA, ±400 u/s, τ .18s)
def('towns', 3, {
  async init(sec) {
    const towns = await townsP(), svg = $('[data-tline-svg]', sec), pa = $('[data-rl-pa]', sec), pb = $('[data-rl-pb]', sec), line = $('[data-rl-line]', sec), out = $('[data-tline-out]', sec), list = $('[data-tline-list]', sec), btn = $('[data-tline-pause]', sec);
    const narrow = small(); const id = narrow ? 'rl-narrow' : 'rl-wide';
    [pa, pb].forEach(p => p.setAttribute('href', '#' + id)); line.setAttribute('href', '#' + id);
    const path = svg.querySelector('#' + id), L = path.getTotalLength();
    const txt = towns.map(t => t.name).join('\u2003\u2003') + '\u2003\u2003';
    // names at reading size; one lap of the list (T) is longer than the path, so two copies T apart always cover it
    if (narrow) svg.setAttribute('viewBox', '0 0 800 300');
    [pa, pb].forEach(p => { p.textContent = txt; p.parentElement.style.fontSize = narrow ? '30px' : '26px'; });
    let T = Math.max(L, pa.parentElement.getComputedTextLength() || L);
    [pa, pb].forEach(p => { p.parentElement.setAttribute('textLength', T.toFixed(1)); p.parentElement.setAttribute('lengthAdjust', 'spacing'); });
    list.innerHTML = towns.map(t => `<li><button type="button" data-town="${esc(t.name)}">${esc(t.name)}</button></li>`).join('');
    list.addEventListener('click', e => { const b = e.target.closest('[data-town]'); if (!b) return; const t = towns.find(x => x.name === b.dataset.town); out.textContent = 'Yes. ' + facts(t); RR.est.town = t.name; RR.saveEst(); });
    let off = 0;
    const put = () => { pa.setAttribute('startOffset', (off - T).toFixed(1)); pb.setAttribute('startOffset', off.toFixed(1)); };
    put();
    if (calm()) { btn.hidden = true; return; }
    const base = narrow ? 28 : 40; let v = base, target = base, paused = false, boost = 0, lastY = scrollY;
    const hold = on => { target = on || paused ? 0 : base; window.RR.kick(); };
    svg.addEventListener('pointerenter', () => hold(true)); svg.addEventListener('pointerleave', () => hold(false));
    list.addEventListener('focusin', () => hold(true)); list.addEventListener('focusout', () => hold(false));
    btn.addEventListener('click', () => { paused = !paused; btn.setAttribute('aria-pressed', String(paused)); btn.textContent = paused ? 'Play the names' : 'Pause the names'; hold(false); });
    sub(sec, dt => {
      const s = dt / 1000, y = scrollY, vel = clamp((y - lastY) / Math.max(s, 0.001), -400, 400); lastY = y;
      boost += (vel * 0.5 - boost) * (1 - Math.exp(-s / 0.18));
      v += (target - v) * (1 - Math.exp(-s / 0.2)); // speed eases to the target over ~0.6s
      off = (off + (v + (paused ? 0 : boost)) * s) % T; if (off < 0) off += T; put();
      return !paused || Math.abs(v) > 0.5 || Math.abs(boost) > 0.5;
    });
  }
});

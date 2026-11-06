/* PAGE — Roofing (#/roofing). Drawn in the browser from geometry: a roof laid course by course or panel by panel (four kinds), a price rail you can read like a ruler, a pitch you choose with the
   published warranty rule, GAF's "fewer than 2%" as a hundred dots, a storm claim you walk along three lanes, and a new roof laid from the eaves up over a real before/after.
   Only published numbers. Reduced motion: every state snaps, nothing runs on its own. */
window.FPRoofing = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let P; const $ = (s, r) => (r || P).querySelector(s), $$ = (s, r) => [...(r || P).querySelectorAll(s)];
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), f1 = (v) => Math.round(v * 10) / 10;
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const H = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), X = (r) => '#' + r.map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => { const A = H(a), B = H(b); return X(A.map((v, i) => v + (B[i] - v) * t)); };
  function radio(g, cb) {
    const bs = [...g.querySelectorAll('[role=radio]')];
    const set = (b, focus, silent) => { bs.forEach((x) => { const on = x === b; x.setAttribute('aria-checked', on); x.tabIndex = on ? 0 : -1; }); if (focus) b.focus(); if (!silent && cb) cb(b); };
    bs.forEach((b) => { b.addEventListener('click', () => set(b)); b.addEventListener('keydown', (e) => { let d = 0; if (e.key === 'ArrowRight' || e.key === 'ArrowDown') d = 1; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') d = -1; else return; e.preventDefault(); set(bs[(bs.indexOf(b) + d + bs.length) % bs.length], true); }); });
    return { bs, set: (i, silent) => set(bs[i], false, silent) };
  }
  function tween(from, to, ms, fn, done) { if (RM) { fn(to); done && done(); return; } const t0 = performance.now(); const step = (t) => { const u = clamp((t - t0) / ms), e = 1 - Math.pow(1 - u, 3); fn(from + (to - from) * e); if (u < 1) requestAnimationFrame(step); else done && done(); }; requestAnimationFrame(step); }
  const poly = (a, fill, ex = '') => `<polygon points="${a.map((p) => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="${fill}" ${ex}/>`;

  /* ---------- opener: lay a roof ---------- */
  const KIND = {
    shingle: ['Shingle roofing: laminate and designer shingles go on course by course, from the eaves up. Installing a new shingle roof usually takes 1 to 3 days, depending on the roof size, complexity and weather. Many styles and colors are available.', 'courses'],
    seam: ['Standing seam: sleek, vertical panels with excellent durability.', 'panels'],
    screw: ['Screw-down panels: cost-effective, with a more visible fastener system.', 'panels'],
    mshingle: ['Metal shingles: they mimic traditional roofing styles with the benefits of metal.', 'courses'],
  };
  function roof() {
    const s = $('#rf-roof'), EY = 300, RY = 90, N = 12, CH = (EY - RY) / N, xl = (y) => 40 + (EY - y) / (EY - RY) * 90, xr = (y) => 520 - (EY - y) / (EY - RY) * 90; let kind = 'shingle';
    const deck = () => { let d = poly([[40, EY], [520, EY], [430, RY], [130, RY]], '#D9C9A5', 'stroke="#8C7648" stroke-width="1"'); for (let i = 1; i < 5; i++) d += `<path d="M${f1(xl(EY - i * 42))} ${EY - i * 42}H${f1(xr(EY - i * 42))}" stroke="#8C7648" stroke-width="1" opacity=".5"/>`; return d; };
    const courses = (metal) => { let g = ''; for (let i = 0; i < N; i++) { const yb = EY - i * CH, yt = yb - CH, tone = metal ? mix('#8FA19B', hash(i) > .5 ? '#ffffff' : '#000000', .05 + hash(i + 4) * .07) : mix('#58625D', hash(i) > .5 ? '#ffffff' : '#000000', .04 + hash(i + 4) * .08);
        let tabs = ''; const w = metal ? 44 : 34; for (let k = -1; k < 20; k++) { const x = 40 + k * w + (i % 2) * w / 2 + 12; if (x > xl(yt) + 4 && x < xr(yt) - 4) tabs += `<path d="M${f1(x)} ${f1(yt + 3)}V${f1(yb - 2)}" stroke="${metal ? '#42524D' : '#1F2623'}" stroke-width="${metal ? 1.6 : 1.3}" opacity=".6"/>`; }
        g += `<g class="rf-ts" data-i="${i}">${poly([[xl(yb), yb], [xr(yb), yb], [xr(yt), yt], [xl(yt), yt]], tone, 'class="f" stroke="none"')}${tabs}<path d="M${f1(xl(yb))} ${f1(yb - .8)}H${f1(xr(yb))}" stroke="#0A120E" stroke-width="2.4" opacity=".4"/><path d="M${f1(xl(yt))} ${f1(yt + .8)}H${f1(xr(yt))}" stroke="#fff" stroke-width="1" opacity="${metal ? .45 : .16}"/></g>`; } return g; };
    const panels = (screw) => { let g = ''; for (let i = 0; i < N; i++) { const b0 = 40 + i * 40, b1 = b0 + 40, t0 = 130 + i * 25, t1 = t0 + 25, tone = mix(screw ? '#8A9A95' : '#A7B3AE', hash(i + 2) > .5 ? '#ffffff' : '#000000', .03 + hash(i) * .05); let d = '';
        if (screw) { for (const fr of [.3, .65]) d += `<path d="M${f1(b0 + 40 * fr)} ${EY}L${f1(t0 + 25 * fr)} ${RY}" stroke="#5E6E69" stroke-width="2.4" opacity=".55"/>`; for (let j = 1; j < 7; j++) { const y = EY - j * 30, u = (EY - y) / (EY - RY); for (const fr of [.15, .5, .85]) d += `<circle cx="${f1(b0 + 40 * fr + (t0 - b0 + (25 - 40) * fr) * u)}" cy="${y}" r="2.1" fill="#26302B"/>`; } }
        else d = `<path d="M${b0 + 20} ${EY}L${t0 + 12.5} ${RY}" stroke="#fff" stroke-width="1.2" opacity=".28"/>`;
        g += `<g class="rf-tp" data-i="${i}">${poly([[b0, EY], [b1, EY], [t1, RY], [t0, RY]], tone, 'class="f" stroke="none"')}${d}<path d="M${b1} ${EY}L${t1} ${RY}" stroke="${screw ? '#2E3B36' : '#E9EFEC'}" stroke-width="${screw ? 1.4 : 3.2}" opacity="${screw ? .6 : .85}"/><path d="M${b1 + 1.6} ${EY}L${t1 + 1.6} ${RY}" stroke="#0A120E" stroke-width="1.2" opacity=".28"/></g>`; } return g; };
    const draw = () => {
      let b = `<defs><linearGradient id="rfSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE3F1"/><stop offset="1" stop-color="#EEF5F4"/></linearGradient><pattern id="rfLap" width="20" height="14" patternUnits="userSpaceOnUse"><path d="M0 13h20" stroke="#0E2A20" stroke-width="2" opacity=".35"/></pattern></defs><rect width="560" height="400" rx="22" fill="url(#rfSky)"/><ellipse cx="280" cy="396" rx="250" ry="12" fill="#0E3B2C" opacity=".14"/>`;
      b += `<rect x="70" y="300" width="420" height="88" fill="#C9C3B2"/><rect x="70" y="300" width="420" height="88" fill="url(#rfLap)" opacity=".5"/><rect x="110" y="322" width="84" height="66" fill="#2B3A33"/><rect x="318" y="322" width="102" height="50" fill="#F4F6F2" stroke="#B9C3BA"/><rect x="326" y="330" width="86" height="34" fill="#CFE3F1"/><path d="M369 330v34M326 347h86" stroke="#F4F6F2" stroke-width="4"/>`;
      b += deck();
      b += kind === 'shingle' ? courses(false) : kind === 'mshingle' ? courses(true) : panels(kind === 'screw');
      b += `<g class="rf-ts" data-i="12">${poly([[126, RY - 6], [434, RY - 6], [430, RY + 5], [130, RY + 5]], kind === 'shingle' ? '#2C3330' : '#5E6E69')}</g>`;
      b += `<rect x="372" y="44" width="40" height="86" fill="#B4684B" stroke="#7C432E"/><rect x="368" y="38" width="48" height="9" fill="#8E8A80"/>`;
      b += `<rect x="30" y="296" width="500" height="10" rx="3" fill="#F1F3EE"/><rect x="30" y="304" width="500" height="3" fill="#0E2A20" opacity=".16"/>`;
      s.innerHTML = b; apply(+$('#rf-lay').value);
    };
    const apply = (n) => { n = Math.round(n); const cls = kind === 'seam' || kind === 'screw' ? '.rf-tp' : '.rf-ts'; $$(cls, s).forEach((g) => { const i = +g.dataset.i; if (i === 12) return; g.classList.toggle('on', i < n); g.classList.toggle('cur', i === n - 1); }); const cap = $('.rf-ts[data-i="12"]', s); if (cap) cap.classList.toggle('on', n >= 12); const rg = $('#rf-lay'); rg.value = n; rg.style.setProperty('--v', n / 12 * 100 + '%'); $('#rf-lout').textContent = n + ' of 12 ' + KIND[kind][1]; rg.setAttribute('aria-valuetext', n + ' of 12 ' + KIND[kind][1] + ' laid'); };
    $('#rf-lay').addEventListener('input', (e) => apply(+e.target.value));
    radio($('.rf-seg4'), (b) => { kind = b.dataset.k; $('#rf-lread').textContent = KIND[kind][0]; $('#rf-lay').value = 12; draw(); apply(12); });
    draw(); $('#rf-lread').textContent = KIND.shingle[0];
    let ran = false; const io = new IntersectionObserver((en) => { if (en[0].isIntersecting && !ran) { ran = true; if (!RM) { apply(0); setTimeout(() => tween(0, 12, 2400, apply), 350); } io.disconnect(); } }, { threshold: .35 }); io.observe(s);
  }

  /* ---------- two roofs: the price rail ---------- */
  const RAIL = {
    shingle: { mh: [5, 20], md: [10, 15], med: '$10k–$15k', half: 'Middle half of priced jobs: $5k–$20k', n: 204, name: 'shingle', f: [['210', 'documented shingle roofing jobs'], ['204', 'priced shingle roofing jobs, median band $10k–$15k'], ['$5k–$20k', 'where the middle half of those 204 priced jobs landed'], ['1 to 3 days', 'to install a new shingle roof, usually (our FAQ)']] },
    metal: { mh: [15, 40], md: [20, 25], med: '$20k–$25k', half: 'Middle half of priced jobs: $15k–$40k', n: 29, name: 'metal', f: [['31', 'documented metal roofing jobs'], ['29', 'priced metal roofing jobs, median band $20k–$25k'], ['$15k–$40k', 'where the middle half of those 29 priced jobs landed'], ['Lifetime', 'Austin Pro workmanship warranty on labor; manufacturer’s warranty typically 30 to 50 years']] },
  };
  function two() {
    let cur = 'shingle'; const mh = $('#rf-mh'), md = $('#rf-md'), ax = $('#rf-axis'), pin = $('#rf-pin');
    const ticks = $$('.rf-tick li'); const show = (k) => { cur = k; const r = RAIL[k]; mh.style.left = r.mh[0] * 2 + '%'; mh.style.width = (r.mh[1] - r.mh[0]) * 2 + '%'; md.style.left = r.md[0] * 2 + '%'; md.style.width = (r.md[1] - r.md[0]) * 2 + '%';
      $('#rf-med').textContent = r.med; $('#rf-midh').textContent = r.half; $('#rf-rf').innerHTML = r.f.map(([b, t]) => `<li><b>${b}</b> ${t}</li>`).join(''); $$('.rf-bars li').forEach((l) => l.classList.toggle('dim', l.dataset.k !== k)); $$('.rf-phs').forEach((p) => { p.hidden = p.dataset.r !== k; }); $('#rf-axr') && ($('#rf-axr').textContent = ''); };
    radio($('.rf-rk').parentElement, (b) => show(b.dataset.r)); show('shingle');
    const read = (e) => { const r = ax.getBoundingClientRect(), v = clamp((e.clientX - r.left) / r.width, 0, 1) * 50, d = Math.round(v), R = RAIL[cur]; pin.style.left = v * 2 + '%'; const o = $('#rf-axr'); if (!o) return; const lab = '$' + d + 'k'; o.textContent = lab + ': ' + (d >= R.md[0] && d <= R.md[1] ? 'inside the median band' : d >= R.mh[0] && d <= R.mh[1] ? 'inside the middle half, outside the median band' : 'outside the middle half') + ' of our priced ' + R.name + ' roofing jobs (' + R.n + ').'; };
    let down = false; ax.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || down) read(e); }); ax.addEventListener('pointerdown', (e) => { down = true; read(e); }); addEventListener('pointerup', () => { down = false; });
  }

  /* ---------- pitch ---------- */
  function pitch() {
    const s = $('#rf-psvg'); let p = 6, cur = 6;
    const draw = (rise) => {
      const HS = 180, CX = 260, WT = 214, WB = 300, apex = WT - HS * rise / 12, lx = 60, rx = 460, ey = WT + 20 * rise / 12;
      let b = `<rect width="520" height="330" rx="20" fill="#E9F0F1"/><ellipse cx="260" cy="318" rx="220" ry="9" fill="#0E3B2C" opacity=".14"/>`;
      b += `<rect x="80" y="${WT}" width="360" height="${WB - WT + 14}" fill="#C9C3B2"/><rect x="80" y="${WT}" width="360" height="${WB - WT + 14}" fill="url(#rfLap2)" opacity=".5"/><rect x="118" y="244" width="62" height="70" fill="#2B3A33"/><rect x="300" y="238" width="86" height="44" fill="#F4F6F2" stroke="#B9C3BA"/><rect x="307" y="245" width="72" height="30" fill="#CFE3F1"/>`;
      b += poly([[lx, ey], [CX, apex - 2], [rx, ey], [rx, ey + 12], [CX, apex + 10], [lx, ey + 12]], '#2C3330');
      b += `<g>${poly([[80, WT], [CX, apex + 10], [440, WT]], '#58625D', 'opacity=".001"')}</g>`;
      // shingle courses on both slopes
      let cs = ''; const n = 7; for (let i = 0; i < n; i++) { const u = i / n, v = (i + 1) / n; const y0 = ey + 12 - (ey + 12 - (apex + 10)) * u, y1 = ey + 12 - (ey + 12 - (apex + 10)) * v; const xa0 = lx + (CX - lx) * u, xa1 = lx + (CX - lx) * v, xb0 = rx - (rx - CX) * u, xb1 = rx - (rx - CX) * v; cs += poly([[xa0, y0], [xb0, y0], [xb1, y1], [xa1, y1]], 'none', `stroke="#0A120E" stroke-opacity=".28" stroke-width="1.6"`); }
      b += `<g opacity=".9">${poly([[lx, ey + 12], [CX, apex + 10], [rx, ey + 12], [rx, ey], [CX, apex - 2], [lx, ey]], '#58625D')}${cs}</g><path d="M${lx} ${ey}L${CX} ${apex - 2}L${rx} ${ey}" fill="none" stroke="#1F2623" stroke-width="3" stroke-linejoin="round"/>`;
      // rise over run triangle
      const tx = 318, ty = 118, rl = 100, ri = rl * rise / 12; b += `<g><path d="M${tx} ${ty + 0}h${rl}v${-ri}z" fill="rgba(181,219,110,.55)" stroke="#0E3B2C" stroke-width="2.2" stroke-linejoin="round" transform="translate(0 0)"/><path d="M${tx + rl - 10} ${ty}v-10h10" fill="none" stroke="#0E3B2C" stroke-width="1.6"/><text x="${tx + rl / 2}" y="${ty + 22}" text-anchor="middle" font-size="14" font-weight="800" fill="#16191D">12 in run</text><text x="${tx + rl + 8}" y="${ty - ri / 2 + 5}" font-size="14" font-weight="800" fill="#16191D">${Math.round(rise)} in rise</text></g>`;
      b += `<text x="30" y="40" font-size="15" font-weight="800" fill="#16191D">Pitch ${Math.round(rise * 10) / 10 === Math.round(rise) ? Math.round(rise) : f1(rise)}/12</text>`;
      if (rise <= 3.05) b += `<g><rect x="30" y="52" width="132" height="26" rx="13" fill="#B5DB6E"/><text x="96" y="70" text-anchor="middle" font-size="13" font-weight="800" fill="#16191D">3/12 or less</text></g>`;
      s.innerHTML = `<defs><pattern id="rfLap2" width="20" height="14" patternUnits="userSpaceOnUse"><path d="M0 13h20" stroke="#0E2A20" stroke-width="2" opacity=".35"/></pattern></defs>` + b;
    };
    const TXT = (n) => n <= 3 ? `${n}/12 is a 3/12 pitch or less: the published labor warranty on a shingle roof is 2 years.` : `${n}/12 is above 3/12: the published labor warranty on laminate or designer shingles is 5 years.` + (n === 8 ? ' A published job at this pitch: a steep 8/12 roof on a Fairview home in Round Rock, GAF Timberline HDZ shingles, finished in a single day with the Golden Pledge Warranty in place.' : '');
    const set = (n) => { p = n; $('#rf-pread').textContent = TXT(n) + ' Ask at your free inspection which applies to your roof.'; $('#rf-w2').className = 'rf-wc ' + (n <= 3 ? 'on' : 'off'); $('#rf-w5').className = 'rf-wc ' + (n <= 3 ? 'off' : 'on'); tween(cur, n, 500, draw); cur = n; };
    radio($('.rf-seg6'), (b) => set(+b.dataset.p)); draw(6); set(6);
  }

  /* ---------- a hundred dots ---------- */
  function gaf() { const g = $('#rf-dg'); g.innerHTML = Array.from({ length: 100 }, (_, i) => `<i class="${i === 44 ? 'a' : i === 45 ? 'h' : ''}" style="--d:${(i * 7) % 100}"></i>`).join(''); }

  /* ---------- the storm claim, in three lanes ---------- */
  function storm() {
    const s = $('#rf-tl'), D = JSON.parse($('.rf-stl').dataset.steps), LY = [62, 150, 238], LANE = [0, 1, 1, 1, 1], XS = [210, 345, 480, 615, 740]; let cur = 0;
    let b = `<defs><marker id="rfArr" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto"><path d="M1 1L7 4.5L1 8" fill="none" stroke="#3E5A4A" stroke-width="1.6"/></marker></defs>`;
    ['You', 'Austin Pro', 'Your insurer'].forEach((t, i) => { b += `<rect x="8" y="${LY[i] - 36}" width="784" height="72" rx="16" fill="${i === 1 ? 'rgba(181,219,110,.22)' : 'rgba(255,255,255,.5)'}" stroke="#D5E1D7"/><text x="22" y="${LY[i] + 5}" font-size="15" font-weight="800" fill="#16191D">${t}</text>`; });
    const pts = XS.map((x, i) => [x, LY[LANE[i]]]); let path = `M${pts[0][0]} ${pts[0][1]}`; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], mx = (x0 + x1) / 2; path += `C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`; }
    b += `<path d="${path}" fill="none" stroke="#B9C9BD" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 9"/><path id="rfProg" d="${path}" pathLength="1" fill="none" stroke="#0E3B2C" stroke-width="5" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1" style="transition:stroke-dashoffset .7s cubic-bezier(.2,.8,.2,1)"/>`;
    // supporting marks: you at the adjuster visit, the insurer lane at steps 3 and 4
    b += `<g stroke="#3E5A4A" stroke-width="1.6" fill="none" stroke-dasharray="4 4"><path d="M480 ${LY[1] - 18}V${LY[0] + 14}" /><path d="M480 ${LY[1] + 18}V${LY[2] - 14}" marker-end="url(#rfArr)"/><path d="M615 ${LY[1] + 18}V${LY[2] - 14}" marker-end="url(#rfArr)"/><path d="M615 ${LY[2] - 22}V${LY[1] + 22}" /></g>`;
    b += `<g font-size="12.5" font-weight="700" fill="#26302B"><text x="488" y="${LY[0] + 4}">you, if you’d like</text><text x="488" y="${LY[2] + 4}">your adjuster</text><text x="623" y="${LY[2] + 4}">estimate and photos</text></g>`;
    XS.forEach((x, i) => { b += `<g class="rf-nd" data-i="${i}"><circle cx="${x}" cy="${LY[LANE[i]]}" r="17" fill="#fff" stroke="#0E3B2C" stroke-width="2.4"/><text x="${x}" y="${LY[LANE[i]] + 5}" text-anchor="middle" font-size="14" font-weight="800" fill="#16191D">${i + 1}</text>${(() => { const w = D[i][0].replace(/^Then /, '').split(' '), m = Math.ceil(w.length / 2), ls = [w.slice(0, m).join(' '), w.slice(m).join(' ')], y0 = LY[LANE[i]] + (i === 0 ? 38 : -42); return ls.map((t, k) => `<text x="${x}" y="${y0 + k * 15}" text-anchor="middle" font-size="13" font-weight="800" fill="#16191D">${t}</text>`).join(''); })()}</g>`; });
    b += `<g id="rfTok" style="transition:transform .65s cubic-bezier(.3,1.4,.4,1);transform:translate(${XS[0]}px,${LY[0]}px)"><circle r="23" fill="#B5DB6E" stroke="#0E3B2C" stroke-width="3"/><path d="M-12 5L0 -9L12 5" fill="none" stroke="#0E3B2C" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-8 5V12H8V5" fill="none" stroke="#0E3B2C" stroke-width="2.4" stroke-linejoin="round"/></g>`;
    s.innerHTML = b; const tok = $('#rfTok'), prog = $('#rfProg'), bs = $$('.rf-sb');
    const go = (i, snap) => { cur = i; tok.style.transform = `translate(${XS[i]}px,${LY[LANE[i]]}px)`; prog.style.strokeDashoffset = String(1 - i / 4); bs.forEach((x, j) => { x.setAttribute('aria-checked', j === i); x.tabIndex = j === i ? 0 : -1; x.classList.toggle('done', j < i); }); $$('.rf-nd', s).forEach((n, j) => { n.querySelector('circle').setAttribute('fill', j <= i ? '#B5DB6E' : '#fff'); }); $('#rf-stk').textContent = 'Step ' + (i + 1) + ' of 5 · ' + D[i][1]; $('#rf-sth').textContent = D[i][0]; $('#rf-stp').textContent = D[i][2]; };
    bs.forEach((x, i) => { x.addEventListener('click', () => go(i)); x.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0; if (d) { e.preventDefault(); const j = clamp(i + d, 0, 4); go(j); bs[j].focus(); } }); });
    let drag = false; const near = (e) => { const r = s.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 800; let k = 0, m = 1e9; XS.forEach((v, i) => { if (Math.abs(v - x) < m) { m = Math.abs(v - x); k = i; } }); return k; };
    s.addEventListener('pointerdown', (e) => { drag = true; try { s.setPointerCapture(e.pointerId); } catch (_) {} const k = near(e); if (k !== cur) go(k); }); s.addEventListener('pointermove', (e) => { if (drag) { const k = near(e); if (k !== cur) go(k); } }); const end = () => { drag = false; }; s.addEventListener('pointerup', end); s.addEventListener('pointercancel', end);
    go(0);
  }

  /* ---------- a new roof laid from the eaves up ---------- */
  function pair() {
    const st = $('#rf-pst'), rg = $('#rf-prange'), out = $('#rf-pout'); const set = (n) => { n = Math.round(clamp(n, 0, 12)); const l = n / 12 * 100; st.style.setProperty('--b', l + '%'); st.style.setProperty('--e', (100 - l) + '%'); st.classList.toggle('live', n > 0 && n < 12); out.textContent = n + ' of 12'; rg.value = n; rg.style.setProperty('--v', l + '%'); rg.setAttribute('aria-valuetext', n + ' of 12 courses laid'); };
    rg.addEventListener('input', () => set(+rg.value)); let drag = false; const xp = (e) => { const r = st.getBoundingClientRect(); return (e.clientX - r.left) / r.width * 12; };
    st.addEventListener('pointerdown', (e) => { drag = true; try { st.setPointerCapture(e.pointerId); } catch (_) {} set(xp(e)); }); st.addEventListener('pointermove', (e) => { if (drag) set(xp(e)); }); const end = () => { drag = false; }; st.addEventListener('pointerup', end); st.addEventListener('pointercancel', end);
    set(0); let ran = false; const io = new IntersectionObserver((en) => { if (en[0].isIntersecting && !ran) { ran = true; if (!RM) tween(0, 12, 2600, set, () => setTimeout(() => tween(12, 4, 900, set), 700)); io.disconnect(); } }, { threshold: .5 }); io.observe(st);
  }

  /* ---------- parallax + in-view ---------- */
  function life() {
    const secs = $$('.rf-s'), bgs = secs.map((s) => [s, s.querySelector('.rf-bg')]); let tk = false;
    const par = () => { tk = false; if (P.hidden) return; const vh = innerHeight; bgs.forEach(([s, bg]) => { const r = s.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; const p = clamp((r.top + r.height / 2 - vh / 2) / (vh * .9), -1, 1), a = bg.firstElementChild, z = bg.lastElementChild; a.style.setProperty('--py', (p * -26).toFixed(1) + 'px'); if (z !== a) z.style.setProperty('--py', (p * -48).toFixed(1) + 'px'); }); };
    if (!RM) { addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(par); } }, { passive: true }); addEventListener('resize', par); document.addEventListener('fpage', par); }
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('rf-seen'); io.unobserve(x.target); } }), { threshold: .12 });
    secs.forEach((s) => (RM ? s.classList.add('rf-seen') : io.observe(s)));
  }

  function wire() { P = document.getElementById('pg-roofing'); if (!P || !P.querySelector('#rf-roof')) return; roof(); two(); pitch(); gaf(); storm(); pair(); life(); }
  return { wire };
})();

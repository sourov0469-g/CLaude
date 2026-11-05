/* SECTION 5 — Windows. One window drawn in elevation from geometry (frame mitres, sash rails, glass reflection + Low-E, grilles, screen mesh, an interior with
   curtains, a picture and a lamp), five kinds, springs on every moving part. The visitor can drag the sash, turn the lock, tilt, crank, slide; change the maker's
   published frame colour, the grille, Low-E, the screen; and move the sun from 7 am to 11 pm (sky, tint, lamp glow). "From inside" shows the hardware.
   Reduced motion: every value snaps; nothing runs on its own. Touch: a hit area over the window takes the drag; the rest of the stage still scrolls. */
window.FWin = (function () {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, t) => a + (b - a) * t;
  const H = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), X = (r) => '#' + r.map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => { const A = H(a), B = H(b); return X(A.map((v, i) => v + (B[i] - v) * t)); }, lite = (c, t) => mix(c, '#ffffff', t), dark = (c, t) => mix(c, '#000000', t);
  const f1 = (v) => (Math.round(v * 10) / 10);
  const pts = (a) => a.map((p) => f1(p[0]) + ',' + f1(p[1])).join(' ');
  const poly = (a, fill, ex = '') => `<polygon points="${pts(a)}" fill="${fill}" ${ex}/>`;
  const KIND = {
    single: { name: 'Single hung', how: 'The lower sash slides up inside the frame; the upper sash stays where it is.', box: [200, 40, 240, 400] },
    double: { name: 'Double hung', how: 'Both sashes slide up and down in their own tracks, so you can open from the top, the bottom, or both.', box: [200, 40, 240, 400] },
    casement: { name: 'Casement', how: 'Hinged at the side. A crank pushes the sash out, like a small door, and it opens all the way to the air.', box: [215, 40, 210, 400] },
    slider: { name: 'Slider', how: 'One sash slides sideways along a track past the other. Wide, low openings.', box: [110, 110, 420, 280] },
    picture: { name: 'Picture', how: 'Fixed glass in a frame. It does not open: all view, no moving parts.', box: [130, 70, 380, 340] },
  };
  const KF = [[7, '#B8D0EC', '#FCE2C6', '#FFC890', .10, 0], [10, '#8DBBEA', '#DCEBF8', '#FFFFFF', 0, 0], [13, '#74AAE6', '#D3E7F8', '#FFFFFF', 0, 0], [17, '#8FB0DC', '#FFD9A8', '#FFC27A', .12, 0],
    [19.5, '#6B6FB0', '#F4A37C', '#FF9A60', .22, .3], [21, '#2A3262', '#5A5686', '#4560A8', .36, .8], [23, '#0A1028', '#1B2142', '#2A3A80', .46, 1]];
  function sky(t) {
    let i = 0; while (i < KF.length - 2 && t > KF[i + 1][0]) i++;
    const a = KF[i], b = KF[i + 1], u = clamp((t - a[0]) / (b[0] - a[0])); return { top: mix(a[1], b[1], u), bot: mix(a[2], b[2], u), tint: mix(a[3], b[3], u), ta: lerp(a[4], b[4], u), glow: lerp(a[5], b[5], u) };
  }
  const fmt = (t) => { let h = Math.floor(t), m = Math.round((t - h) * 60); if (m === 60) { h++; m = 0; } const ap = h >= 12 && h < 24 ? 'pm' : 'am', hh = h % 12 || 12; return hh + (m ? ':' + String(m).padStart(2, '0') : ':00') + ' ' + ap; };

  /* ---- drawing parts */
  function rim(q, tx, ty, c) {
    const n = { tl: [q.tl[0] + tx, q.tl[1] + ty], tr: [q.tr[0] - tx, q.tr[1] + ty], br: [q.br[0] - tx, q.br[1] - ty], bl: [q.bl[0] + tx, q.bl[1] - ty] };
    let s = poly([q.tl, q.tr, n.tr, n.tl], lite(c, .16)) + poly([q.tr, q.br, n.br, n.tr], dark(c, .12)) + poly([q.bl, n.bl, n.br, q.br], dark(c, .22)) + poly([q.tl, n.tl, n.bl, q.bl], lite(c, .03));
    s += `<path d="M${q.tl}L${n.tl}M${q.tr}L${n.tr}M${q.br}L${n.br}M${q.bl}L${n.bl}" stroke="${dark(c, .4)}" stroke-opacity=".38" stroke-width=".9" fill="none"/>`;
    s += poly([q.tl, q.tr, q.br, q.bl], 'none', `stroke="${dark(c, .45)}" stroke-opacity=".55" stroke-width=".9"`) + poly([n.tl, n.tr, n.br, n.bl], 'none', `stroke="${dark(c, .55)}" stroke-opacity=".5" stroke-width="1.3"`);
    s += `<path d="M${q.tl[0] + 1.5},${q.tl[1] + 1.2}H${q.tr[0] - 1.5}" stroke="#fff" stroke-opacity=".5" stroke-width="1" fill="none"/>`;
    return { s, n };
  }
  const bil = (n, u, v) => { const a = [lerp(n.tl[0], n.tr[0], u), lerp(n.tl[1], n.tr[1], u)], b = [lerp(n.bl[0], n.br[0], u), lerp(n.bl[1], n.br[1], u)]; return [lerp(a[0], b[0], v), lerp(a[1], b[1], v)]; };
  function gridBars(n, kind, c) {
    if (kind === 'none') return '';
    const w = n.tr[0] - n.tl[0], h = n.bl[1] - n.tl[1], ls = [];
    if (kind === 'colonial') { const cs = Math.max(2, Math.round(w / 92)), rs = Math.max(2, Math.round(h / 92)); for (let i = 1; i < cs; i++) ls.push([bil(n, i / cs, 0), bil(n, i / cs, 1)]); for (let j = 1; j < rs; j++) ls.push([bil(n, 0, j / rs), bil(n, 1, j / rs)]); }
    else { const a = Math.min(.24, 36 / w), b = Math.min(.24, 36 / h); ls.push([bil(n, a, 0), bil(n, a, 1)], [bil(n, 1 - a, 0), bil(n, 1 - a, 1)], [bil(n, 0, b), bil(n, 1, b)], [bil(n, 0, 1 - b), bil(n, 1, 1 - b)]); }
    const d = ls.map((l) => `M${f1(l[0][0])},${f1(l[0][1])}L${f1(l[1][0])},${f1(l[1][1])}`).join('');
    return `<path d="${d}" stroke="${dark(c, .35)}" stroke-opacity=".45" stroke-width="6.4" fill="none" transform="translate(.7,1.2)"/><path d="${d}" stroke="${lite(c, .02)}" stroke-width="5" fill="none"/><path d="${d}" stroke="#fff" stroke-opacity=".45" stroke-width="1" fill="none" transform="translate(-1,-1.2)"/>`;
  }

  function wire(root) {
    const s = root.querySelector('.wn'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const COL = JSON.parse(s.querySelector('.wn-in').dataset.col), svg = s.querySelector('.wn-svg'), gSt = s.querySelector('.wn-st'), gDy = s.querySelector('.wn-dy'), hit = s.querySelector('.wn-hit');
    const insetBox = s.querySelector('.wn-inset'), insetLab = insetBox.querySelector('p'), insetSvg = insetBox.querySelector('svg'), stage = s.querySelector('.wn-stage'), tag = s.querySelector('.wn-tag'), hint = s.querySelector('.wn-hint');
    const kinds = [...s.querySelectorAll('.wn-k')], brands = [...s.querySelectorAll('.wn-b')], grids = [...s.querySelectorAll('.wn-g')], swBox = s.querySelector('.wn-sw');
    const bOpen = s.querySelector('.wn-open'), bLock = s.querySelector('.wn-lock'), bTilt = s.querySelector('.wn-tilt'), bLow = s.querySelector('.wn-lowe'), bScr = s.querySelector('.wn-scr'), bReset = s.querySelector('.wn-reset');
    const time = s.querySelector('.wn-time'), tl = s.querySelector('.wn-tl'), cn = s.querySelector('.wn-cn'), live = s.querySelector('.wn-live'), kn = s.querySelector('.wn-kn'), how = s.querySelector('.wn-how'), fixed = s.querySelector('.wn-fixed');
    const rngs = {}; s.querySelectorAll('.wn-r').forEach((l) => { rngs[l.dataset.r] = { l, i: l.querySelector('input') }; });
    const S = { kind: 'single', brand: 'NT Windows', ci: 0, grid: 'none', lowe: true, screen: false, time: 13, locked: true, tilt: false };
    const sp = (x = 0) => ({ x, v: 0, t: x });
    const P = { lo: sp(), up: sp(), tilt: sp(), ang: sp(), sl: sp(), lock: sp(1) };
    let G = null, raf = 0, last = 0, sx = 320, sxT = 320, ptr = false, drag = null, sw = null, said = false, swapT = 0;
    const colr = () => COL[S.brand][S.ci][1], cname = () => COL[S.brand][S.ci][0];
    const say = (m) => { live.textContent = m; };
    const SK = () => sky(S.time);
    const pt = (e) => { const m = svg.getScreenCTM(); if (!m) return { x: 0, y: 0 }; const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()); return { x: p.x, y: p.y }; };

    /* ---- the static layer: wall, casing, interior, frame */
    function geometry() {
      const [fx, fy, fw, fh] = KIND[S.kind].box, FT = S.kind === 'picture' ? 18 : 15;
      G = { fx, fy, fw, fh, FT, ix: fx + FT, iy: fy + FT, iw: fw - 2 * FT, ih: fh - 2 * FT, ST: 12.5 };
      G.sw = G.iw / 2 + 8; G.sh = G.ih / 2 + 8; G.travel = G.ih / 2 - 12; G.stravel = G.iw / 2 - 10;
    }
    function drawStatic() {
      geometry(); const g = G, k = SK(), c = colr(), glow = k.glow;
      const wallC = '#9DAC9E'; let d = '<defs>';
      d += `<linearGradient id="wnSky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="540"><stop stop-color="${k.top}"/><stop offset="1" stop-color="${k.bot}"/></linearGradient>`;
      d += '<linearGradient id="wnStk" x1="0" x2="1"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>';
      d += '<pattern id="wnMesh" width="2.6" height="2.6" patternUnits="userSpaceOnUse"><path d="M0 0H2.6M0 0V2.6" stroke="#18201B" stroke-opacity=".34" stroke-width=".55"/></pattern>';
      d += '<radialGradient id="wnGlow"><stop stop-color="#FFD58A" stop-opacity=".95"/><stop offset=".35" stop-color="#FFB45A" stop-opacity=".45"/><stop offset="1" stop-color="#FF9A3A" stop-opacity="0"/></radialGradient>';
      d += '<radialGradient id="wnVig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#0A1611" stop-opacity="0"/><stop offset="1" stop-color="#0A1611" stop-opacity=".34"/></radialGradient>';
      d += `<clipPath id="wnClipI"><rect x="${g.ix}" y="${g.iy}" width="${g.iw}" height="${g.ih}"/></clipPath></defs>`;
      let s = d + `<rect width="640" height="540" fill="${wallC}"/>`;
      for (let y = 0, i = 0; y < 540; y += 27, i++) s += `<rect y="${y}" width="640" height="27" fill="${i % 2 ? '#98A89A' : '#A2B1A3'}"/><rect y="${y + 25.4}" width="640" height="1.6" fill="#243229" opacity=".22"/><rect y="${y}" width="640" height="1.2" fill="#fff" opacity=".18"/>`;
      const cz = 21, casing = '#E8E6DD';
      s += `<rect x="${g.fx - cz + 5}" y="${g.fy - cz + 7}" width="${g.fw + 2 * cz}" height="${g.fh + 2 * cz + 10}" rx="2" fill="#1C2A21" opacity=".2"/>`;
      s += `<rect x="${g.fx - cz}" y="${g.fy - cz}" width="${g.fw + 2 * cz}" height="${g.fh + 2 * cz}" fill="${casing}"/><rect x="${g.fx - cz}" y="${g.fy - cz}" width="${g.fw + 2 * cz}" height="3" fill="#fff" opacity=".7"/><rect x="${g.fx - 4}" y="${g.fy - 4}" width="${g.fw + 8}" height="${g.fh + 8}" fill="#CFCCC0"/>`;
      s += `<path d="M${g.fx - cz},${g.fy - cz}H${g.fx + g.fw + cz}V${g.fy + g.fh + cz}H${g.fx - cz}Z" fill="none" stroke="#7E8478" stroke-opacity=".55" stroke-width="1"/>`;
      s += `<polygon points="${g.fx - cz - 10},${g.fy + g.fh + cz} ${g.fx + g.fw + cz + 10},${g.fy + g.fh + cz} ${g.fx + g.fw + cz + 10},${g.fy + g.fh + cz + 11} ${g.fx - cz - 10},${g.fy + g.fh + cz + 11}" fill="#DEDBD0" stroke="#7E8478" stroke-opacity=".5"/><rect x="${g.fx - cz - 10}" y="${g.fy + g.fh + cz + 11}" width="${g.fw + 2 * cz + 20}" height="7" fill="#1C2A21" opacity=".22"/>`;
      // interior
      const iw = g.iw, ih = g.ih, ix = g.ix, iy = g.iy, b0 = mix('#F1EADB', '#5A5064', glow), b1 = mix('#E1D6BF', '#3A3346', glow);
      s += `<g clip-path="url(#wnClipI)"><defs><linearGradient id="wnBack" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${b0}"/><stop offset="1" stop-color="${b1}"/></linearGradient></defs><rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" fill="url(#wnBack)"/>`;
      const fy0 = iy + ih * .9; s += `<rect x="${ix}" y="${fy0}" width="${iw}" height="${ih * .16 + 2}" fill="${mix('#C7AD8C', '#5A4636', glow)}"/><rect x="${ix}" y="${fy0 - 6}" width="${iw}" height="6" fill="${mix('#F6F2E8', '#7C7088', glow)}"/>`;
      s += `<rect x="${ix + iw * .4}" y="${iy + ih * .13}" width="${iw * .22}" height="${ih * .16}" fill="${mix('#7F6B4F', '#3A3042', glow)}"/><rect x="${ix + iw * .4 + 4}" y="${iy + ih * .13 + 4}" width="${iw * .22 - 8}" height="${ih * .16 - 8}" fill="${mix('#BCD2D8', '#506078', glow)}"/><path d="M${ix + iw * .4 + 4},${iy + ih * .29 - 4}l${iw * .06},-${ih * .06}l${iw * .04},${ih * .03}l${iw * .05},-${ih * .05}l${iw * .03},${ih * .08}Z" fill="${mix('#5F8B6E', '#2A3A4A', glow)}"/>`;
      const cur = mix('#C2D3BC', '#3F4D4A', glow), cur2 = mix('#A9BEA3', '#2F3B39', glow);
      for (const side of [0, 1]) { const w = iw * .2, x0 = side ? ix + iw - w : ix; for (let i = 0; i < 5; i++) s += `<rect x="${x0 + i * w / 5}" y="${iy}" width="${w / 5 + .5}" height="${ih * .9}" fill="${i % 2 ? cur : cur2}"/>`; s += `<path d="M${x0},${iy}H${x0 + w}" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>`; }
      const lx = ix + iw * .7, ly = fy0; G.lamp = [lx, ly - ih * .13];
      s += `<rect x="${lx - 12}" y="${ly - 6}" width="24" height="6" rx="2" fill="${mix('#5B4A3A', '#2B2420', glow)}"/><rect x="${lx - 1.6}" y="${ly - ih * .11}" width="3.2" height="${ih * .11}" fill="${mix('#7B6A58', '#3A3028', glow)}"/><polygon points="${lx - 17},${ly - ih * .11} ${lx + 17},${ly - ih * .11} ${lx + 11},${ly - ih * .2} ${lx - 11},${ly - ih * .2}" fill="${mix('#F2E2BD', '#FFD58A', glow)}"/></g>`;
      // fixed frame
      const q = { tl: [g.fx, g.fy], tr: [g.fx + g.fw, g.fy], br: [g.fx + g.fw, g.fy + g.fh], bl: [g.fx, g.fy + g.fh] }, r = rim(q, g.FT, g.FT, c);
      s += r.s + `<rect x="${g.fx + g.fw / 2 - 14}" y="${g.fy + g.fh - g.FT + 5}" width="28" height="3.4" rx="1.7" fill="${dark(c, .6)}" opacity=".7"/>`;
      gSt.innerHTML = s;
      // hit area (HTML, so touch-action works) over the operable opening
      const L = (g.fx - 12) / 640 * 100, T = (g.fy - 12) / 540 * 100, W = (g.fw + 24) / 640 * 100, Hh = (g.fh + 24) / 540 * 100;
      hit.style.cssText = `left:${L}%;top:${T}%;width:${W}%;height:${Hh}%;display:${S.kind === 'picture' ? 'none' : 'block'}`;
    }

    /* ---- the glass */
    let gid = 0;
    function glass(n, c) {
      const k = SK(), ro = .66 - .48 * k.glow, id = 'wnG' + (gid++), p = pts([n.tl, n.tr, n.br, n.bl]);
      let s = `<clipPath id="${id}"><polygon points="${p}"/></clipPath><g clip-path="url(#${id})"><rect width="640" height="540" fill="url(#wnSky)" opacity="${ro.toFixed(2)}"/>`;
      s += `<path d="M0 392q40-26 80-8t80 2 80-16 90 8 90-10 80 12 70-6V540H0Z" fill="#2D4A38" opacity="${(ro * .42).toFixed(2)}"/><path d="M0 410q50-14 100 0t110-6 120 8 110-8 100 6V540H0Z" fill="#1F3528" opacity="${(ro * .3).toFixed(2)}"/>`;
      if (S.lowe) s += `<rect width="640" height="540" fill="#78C3B1" opacity=".13"/>`;
      const o = (.42 * (1 - k.glow) + .08).toFixed(2); s += `<polygon points="${sx - 20},0 ${sx + 28},0 ${sx - 56},540 ${sx - 118},540" fill="url(#wnStk)" opacity="${o}"/><polygon points="${sx + 40},0 ${sx + 52},0 ${sx - 34},540 ${sx - 46},540" fill="#fff" opacity="${(o * .55).toFixed(2)}"/></g>`;
      const ins = { tl: [n.tl[0] + 3.2, n.tl[1] + 3.2], tr: [n.tr[0] - 3.2, n.tr[1] + 3.2], br: [n.br[0] - 3.2, n.br[1] - 3.2], bl: [n.bl[0] + 3.2, n.bl[1] - 3.2] };
      s += poly([ins.tl, ins.tr, ins.br, ins.bl], 'none', `stroke="${S.lowe ? '#5FB4A0' : '#9AA7A0'}" stroke-opacity=".7" stroke-width="1"`);
      s += poly([n.tl, n.tr, n.br, n.bl], 'none', 'stroke="#10201A" stroke-opacity=".35" stroke-width="1"') + gridBars(n, S.grid, c);
      return s;
    }
    const quad = (x, y, w, h) => ({ tl: [x, y], tr: [x + w, y], br: [x + w, y + h], bl: [x, y + h] });
    const mesh = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#wnMesh)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" opacity=".07"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#18201B" stroke-opacity=".5" stroke-width="2"/>`;

    function drawDyn() {
      gid = 0; const g = G, c = colr(), k = SK(); let s = '';
      if (S.kind === 'single' || S.kind === 'double') {
        const dbl = S.kind === 'double', up = dbl ? P.up.x : 0, uy = g.iy + up * g.travel;
        const qU = quad(g.ix, uy, g.iw, g.sh), rU = rim(qU, g.ST, g.ST, c);
        const ly = g.iy + g.ih - g.sh - P.lo.x * g.travel, tt = P.tilt.x * (1 - P.lo.x), sI = 9 * tt, dy = 20 * tt;
        const qL = { tl: [g.ix + sI, ly + dy], tr: [g.ix + g.iw - sI, ly + dy], br: [g.ix + g.iw, ly + g.sh], bl: [g.ix, ly + g.sh] };
        const rL = rim(qL, g.ST, g.ST * (1 - .25 * tt), c);
        s += glass(rU.n, c) + rU.s;
        s += `<path d="M${g.ix},${ly + dy - 3}H${g.ix + g.iw}" stroke="#0A1611" stroke-opacity="${(.12 + .1 * P.lo.x).toFixed(2)}" stroke-width="5" fill="none"/>`;
        s += glass(rL.n, c) + rL.s;
        if (S.screen) s += mesh(g.ix, g.iy + g.ih / 2, g.iw, g.ih / 2);
      } else if (S.kind === 'casement') {
        const th = P.ang.x * 78 * Math.PI / 180, kk = Math.cos(th), d = Math.sin(th), sc = 1 + .1 * d, ex = g.ix + g.iw * kk, grow = g.ih * (sc - 1) / 2;
        if (S.screen) s += mesh(g.ix, g.iy, g.iw, g.ih);
        const q = { tl: [g.ix, g.iy], tr: [ex, g.iy - grow], br: [ex, g.iy + g.ih + grow], bl: [g.ix, g.iy + g.ih] }, r = rim(q, Math.max(3.2, g.ST * kk), g.ST * (1 + .2 * d * .5), c);
        s += glass(r.n, c) + r.s;
      } else if (S.kind === 'slider') {
        const sl = P.sl.x, fxx = g.ix, mw = g.sw;
        const qF = quad(fxx, g.iy, mw, g.ih), rF = rim(qF, g.ST, g.ST, c), mx = g.ix + g.iw - mw - sl * g.stravel, qM = quad(mx, g.iy, mw, g.ih), rM = rim(qM, g.ST, g.ST, c);
        s += glass(rF.n, c) + rF.s;
        s += `<path d="M${mx - 3},${g.iy}V${g.iy + g.ih}" stroke="#0A1611" stroke-opacity="${(.12 + .12 * sl).toFixed(2)}" stroke-width="5" fill="none"/>` + glass(rM.n, c) + rM.s;
        if (S.screen) s += mesh(g.ix + g.iw / 2, g.iy, g.iw / 2, g.ih);
        s += `<rect x="${g.ix}" y="${g.iy + g.ih - 3}" width="${g.iw}" height="3" fill="${dark(c, .45)}" opacity=".75"/>`;
      } else {
        const q = quad(g.ix, g.iy, g.iw, g.ih), r = rim(q, 9, 9, c); s += glass(r.n, c) + r.s;
      }
      // light: tint, lamp glow, vignette
      s += `<rect width="640" height="540" fill="${k.tint}" opacity="${k.ta.toFixed(2)}" style="mix-blend-mode:multiply"/>`;
      if (k.glow > .02) s += `<g clip-path="url(#wnClipI)" style="mix-blend-mode:screen"><circle cx="${G.lamp[0]}" cy="${G.lamp[1]}" r="${G.iw * .5}" fill="url(#wnGlow)" opacity="${(k.glow * .9).toFixed(2)}"/></g>`;
      s += '<rect width="640" height="540" fill="url(#wnVig)"/>';
      gDy.innerHTML = s;
    }

    /* ---- From inside: the hardware (rebuilt as the springs move) */
    function drawInset() {
      const c = colr(), kd = S.kind; let s = '<rect width="220" height="150" fill="#2A332D"/>';
      const lk = P.lock.x, lab = S.locked ? 'Locked' : 'Unlocked';
      if (kd === 'single' || kd === 'double') {
        const tt = P.tilt.x, lo = P.lo.x;
        s += `<rect x="0" y="52" width="220" height="40" fill="${c}"/><rect x="0" y="52" width="220" height="5" fill="${lite(c, .35)}" opacity=".7"/><rect x="0" y="86" width="220" height="6" fill="${dark(c, .3)}"/><rect x="0" y="0" width="220" height="52" fill="#9AB5C7" opacity=".5"/><rect x="0" y="92" width="220" height="58" fill="#B9CFDA" opacity=".5"/>`;
        s += `<rect x="86" y="44" width="48" height="10" rx="2" fill="#C9CFCB" stroke="#586059" stroke-width=".8"/>`; // keeper on the upper rail
        const a = lk * 0; s += `<g data-act="lock" style="cursor:pointer" transform="translate(110 68)"><circle r="14" fill="#E4E7E2" stroke="#4E5750" stroke-width="1"/><g transform="rotate(${(1 - lk) * 90})"><rect x="-26" y="-5" width="52" height="10" rx="5" fill="#F1F3F0" stroke="#4E5750" stroke-width="1"/><circle cx="20" cy="0" r="2.4" fill="#4E5750"/></g><circle r="3.4" fill="#4E5750"/></g>`;
        for (const sd of [-1, 1]) s += `<rect x="${sd < 0 ? 12 + 10 * tt : 196 - 10 * tt - 12}" y="62" width="14" height="12" rx="3" fill="#DDE1DC" stroke="#586059" stroke-width=".8"/>`;
        s += `<text x="110" y="124" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">${lab}${tt > .5 ? ', tilted in' : ''}</text><text x="110" y="140" text-anchor="middle" fill="#B5DB6E" font-size="9.5">Turn the lever · latches slide for tilt</text>`;
      } else if (kd === 'casement') {
        const th = P.ang.x * 78, rad = th * Math.PI / 180, hx = 36, hy = 46, L = 92;
        s += `<rect x="${hx - 6}" y="${hy + 6}" width="${L + 28}" height="12" fill="#58635B"/><rect x="${hx - 6}" y="${hy + 6}" width="8" height="12" fill="#8C978F"/>`;
        s += `<path d="M${hx},${hy}L${hx + L},${hy}" stroke="#fff" stroke-opacity=".28" stroke-dasharray="3 3"/><path d="M${hx + L},${hy}A${L},${L} 0 0 0 ${hx + L * Math.cos(rad)},${hy - L * Math.sin(rad) * .0}" fill="none"/>`;
        s += `<g transform="translate(${hx} ${hy + 6})"><rect x="0" y="-5" width="${L}" height="6" fill="${c}" stroke="${dark(c, .5)}" stroke-width=".8" transform="rotate(${-th})"/></g><circle cx="${hx}" cy="${hy + 6}" r="3.4" fill="#fff"/>`;
        s += `<g data-act="lock" style="cursor:pointer"><g transform="translate(166 100)"><circle r="21" fill="#E4E7E2" stroke="#4E5750"/><g transform="rotate(${P.ang.x * 540})"><rect x="-3" y="-17" width="6" height="19" rx="3" fill="#F1F3F0" stroke="#4E5750"/><circle cy="-17" r="5" fill="#C9CFCB" stroke="#4E5750"/></g><circle r="4" fill="#4E5750"/></g></g>`;
        s += `<text x="12" y="116" fill="#fff" font-size="11" font-weight="700">${lab}</text><text x="12" y="132" fill="#B5DB6E" font-size="9.5">${Math.round(P.ang.x * 100)}% open · the crank turns</text>`;
      } else if (kd === 'slider') {
        const sl = P.sl.x, tr = 70;
        s += `<rect x="14" y="44" width="192" height="3" fill="#58635B"/><rect x="14" y="62" width="192" height="3" fill="#58635B"/>`;
        s += `<rect x="16" y="50" width="96" height="8" fill="${c}" stroke="${dark(c, .5)}" stroke-width=".8"/><rect x="${106 - sl * tr + 2}" y="66" width="96" height="8" fill="${lite(c, .06)}" stroke="${dark(c, .5)}" stroke-width=".8"/>`;
        s += `<g data-act="lock" style="cursor:pointer" transform="translate(172 108)"><rect x="-26" y="-14" width="52" height="28" rx="6" fill="#E4E7E2" stroke="#4E5750"/><g transform="rotate(${S.locked ? 0 : -60})"><rect x="-4" y="-10" width="8" height="${S.locked ? 20 : 16}" rx="3" fill="#F1F3F0" stroke="#4E5750"/><path d="M0 -10 l10 -4" stroke="#4E5750" stroke-width="2.4" stroke-linecap="round"/></g></g>`;
        s += `<text x="12" y="106" fill="#fff" font-size="11" font-weight="700">${lab}</text><text x="12" y="122" fill="#B5DB6E" font-size="9.5">${Math.round(sl * 100)}% open · hook latch</text>`;
      } else {
                const L = S.lowe; s += `<rect x="70" y="30" width="6" height="92" fill="#BFE0EC" opacity=".8"/><rect x="108" y="30" width="6" height="92" fill="#BFE0EC" opacity=".8"/><rect x="76" y="30" width="32" height="6" fill="#8D9992"/><rect x="76" y="116" width="32" height="6" fill="#8D9992"/><rect x="60" y="24" width="64" height="5" fill="${c}"/><rect x="60" y="123" width="64" height="5" fill="${c}"/>`;
        if (L) s += `<rect x="107" y="30" width="1.6" height="92" fill="#5FD0B5"/>`;
        s += `<text x="26" y="86" fill="#fff" font-size="8.5" text-anchor="middle">outside</text><text x="156" y="86" fill="#fff" font-size="8.5" text-anchor="middle">inside</text><path d="M30 60 h34M58 55l6 5-6 5" stroke="#FFD58A" stroke-width="2" fill="none" stroke-linecap="round"/>`;
        if (L) s += `<path d="M64 60 l-10 6" stroke="#5FD0B5" stroke-width="1.6" stroke-dasharray="3 2"/>`;
        s += `<text x="110" y="144" text-anchor="middle" fill="#B5DB6E" font-size="9.5">${L ? 'Low-E coat on the inner pane' : 'Plain double pane'}</text>`;
      }
      insetSvg.innerHTML = s; insetLab.textContent = kd === 'single' || kd === 'double' ? 'From inside' : kd === 'picture' ? 'Through the glass' : 'From above';
    }

    /* ---- text, tag, ranges */
    function sync() {
      const k = KIND[S.kind]; kn.textContent = k.name; how.textContent = k.how; cn.textContent = S.brand + ' · ' + cname();
      tag.firstElementChild.textContent = k.name; tag.lastElementChild.textContent = cname();
      tl.textContent = fmt(S.time); time.setAttribute('aria-valuetext', fmt(S.time));
      const hung = S.kind === 'single' || S.kind === 'double', op = S.kind !== 'picture';
      for (const key of Object.keys(rngs)) { const on = (key === 'lo' && hung) || (key === 'up' && S.kind === 'double') || (key === 'ang' && S.kind === 'casement') || (key === 'sl' && S.kind === 'slider'); rngs[key].l.hidden = !on; }
      rngs.lo.l.firstElementChild.textContent = S.kind === 'double' ? 'Lower sash' : 'Sash';
      bOpen.hidden = bLock.hidden = !op; bTilt.hidden = !hung; fixed.hidden = op; bScr.hidden = !op; insetBox.hidden = false;
      bLock.setAttribute('aria-pressed', String(S.locked)); bLock.lastElementChild.textContent = S.locked ? 'Locked' : 'Unlocked'; bLock.classList.toggle('on', S.locked);
      bTilt.setAttribute('aria-pressed', String(S.tilt)); bLow.setAttribute('aria-pressed', String(S.lowe)); bScr.setAttribute('aria-pressed', String(S.screen));
      const o = openness(); bOpen.setAttribute('aria-pressed', String(o > .005)); bOpen.lastElementChild.textContent = o > .005 ? 'Close' : 'Open';
      for (const key of Object.keys(rngs)) rngs[key].i.value = Math.round(P[key].t * 100);
      tilted();
    }
    const tilted = () => { bTilt.disabled = !hung() || P.lo.t > .005 || S.locked; };
    const hung = () => S.kind === 'single' || S.kind === 'double';
    function openness() { return S.kind === 'single' ? P.lo.t : S.kind === 'double' ? Math.max(P.lo.t, P.up.t) : S.kind === 'casement' ? P.ang.t : S.kind === 'slider' ? P.sl.t : 0; }

    /* ---- springs */
    function step(dt) {
      let moving = false;
      for (const p of Object.values(P)) {
        if (RM) { p.x = p.t; p.v = 0; continue; }
        const a = (p.t - p.x) * 170 - p.v * 21; p.v += a * dt; p.x += p.v * dt;
        if (Math.abs(p.t - p.x) < .0007 && Math.abs(p.v) < .004) { p.x = p.t; p.v = 0; } else moving = true;
      }
      return moving;
    }
    function frame(ts) {
      raf = 0; const dt = Math.min(.034, (ts - (last || ts)) / 1000 || .016); last = ts;
      let moving = step(dt); const d = sxT - sx; if (Math.abs(d) > .4 && !RM) { sx += d * Math.min(1, dt * 7); moving = true; } else sx = sxT;
      drawDyn(); drawInset(); if (moving) raf = requestAnimationFrame(frame); else last = 0;
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const set = (k, v, snap) => { P[k].t = clamp(v); if (snap || RM) { P[k].x = P[k].t; P[k].v = 0; } kick(); };

    /* ---- actions */
    function lockTo(on, then) {
      S.locked = on; P.lock.t = on ? 1 : 0; if (RM) P.lock.x = P.lock.t; kick(); sync();
      if (then) setTimeout(then, RM ? 0 : 260);
    }
    function shake() { bLock.classList.remove('shake'); void bLock.offsetWidth; bLock.classList.add('shake'); insetBox.classList.remove('shake'); void insetBox.offsetWidth; insetBox.classList.add('shake'); }
    function openAll() {
      const go = () => { if (S.kind === 'single') set('lo', .55); else if (S.kind === 'double') { set('lo', .5); set('up', .32); } else if (S.kind === 'casement') set('ang', .86); else if (S.kind === 'slider') set('sl', .58); sync(); say(KIND[S.kind].name + ' opened.'); };
      if (S.locked) lockTo(false, go); else go();
    }
    function closeAll() { set('lo', 0); set('up', 0); set('ang', 0); set('sl', 0); S.tilt = false; set('tilt', 0); setTimeout(() => lockTo(true), RM ? 0 : 520); sync(); say(KIND[S.kind].name + ' closed and locked.'); }
    bOpen.addEventListener('click', () => { if (openness() > .005) closeAll(); else openAll(); hideHint(); });
    bLock.addEventListener('click', () => { if (S.locked) { lockTo(false); say('Unlocked.'); } else if (openness() > .005) { shake(); say('Close it first, then lock it.'); } else { lockTo(true); say('Locked.'); } });
    insetSvg.addEventListener('pointerdown', (e) => { if (e.target.closest('[data-act="lock"]')) { e.preventDefault(); bLock.click(); } });
    bTilt.addEventListener('click', () => { S.tilt = !S.tilt; set('tilt', S.tilt ? 1 : 0); sync(); say(S.tilt ? 'Sash tilted in.' : 'Sash tilted back.'); });
    bLow.addEventListener('click', () => { S.lowe = !S.lowe; drawDyn(); drawInset(); sync(); say(S.lowe ? 'Low-E glass on.' : 'Low-E glass off.'); });
    bScr.addEventListener('click', () => { S.screen = !S.screen; drawDyn(); sync(); say(S.screen ? 'Insect screen on.' : 'Insect screen off.'); });
    for (const [key, o] of Object.entries(rngs)) o.i.addEventListener('input', () => {
      if (S.locked && +o.i.value > 0) { lockTo(false); }
      if (key === 'lo' && +o.i.value > 2 && S.tilt) { S.tilt = false; set('tilt', 0); }
      set(key, +o.i.value / 100, true); const op = openness(); bOpen.setAttribute('aria-pressed', String(op > .005)); bOpen.lastElementChild.textContent = op > .005 ? 'Close' : 'Open'; tilted(); hideHint();
      if (key === 'lo' || key === 'up') say(Math.round(+o.i.value) + '% open.');
    });
    grids.forEach((b) => b.addEventListener('click', () => { S.grid = b.dataset.g; grids.forEach((x) => { x.setAttribute('aria-checked', String(x === b)); x.tabIndex = x === b ? 0 : -1; }); drawDyn(); say(b.textContent + '.'); }));
    time.addEventListener('input', () => { S.time = +time.value; drawStatic(); drawDyn(); drawInset(); tl.textContent = fmt(S.time); time.setAttribute('aria-valuetext', fmt(S.time)); sxT = sx = 100 + (S.time - 7) / 16 * 440; hideHint(); });
    function buildSwatches() {
      swBox.innerHTML = COL[S.brand].map(([n, h], i) => `<button type="button" role="radio" class="wn-c" data-i="${i}" aria-checked="${i === S.ci}" aria-label="${n}" title="${n}" tabindex="${i === S.ci ? 0 : -1}" style="--c:${h}"><i></i></button>`).join('');
    }
    function pickColour(i) { S.ci = i; swBox.querySelectorAll('.wn-c').forEach((b, j) => { b.setAttribute('aria-checked', String(j === i)); b.tabIndex = j === i ? 0 : -1; }); drawStatic(); drawDyn(); drawInset(); minis(); sync(); say(S.brand + ' ' + cname() + '.'); }
    swBox.addEventListener('click', (e) => { const b = e.target.closest('.wn-c'); if (b) pickColour(+b.dataset.i); });
    function roving(box, sel, pick, cols) {
      box.addEventListener('keydown', (e) => {
        const items = [...box.querySelectorAll(sel)]; const i = items.indexOf(document.activeElement); if (i < 0) return;
        const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0; if (!d) return; e.preventDefault();
        const j = (i + d + items.length) % items.length; items[j].focus(); pick(items[j]);
      });
    }
    roving(swBox, '.wn-c', (b) => pickColour(+b.dataset.i)); roving(s.querySelector('.wn-brands'), '.wn-b', (b) => b.click()); roving(s.querySelector('.wn-seg'), '.wn-g', (b) => b.click()); roving(s.querySelector('.wn-kinds'), '.wn-k', (b) => b.click());
    brands.forEach((b) => b.addEventListener('click', () => { S.brand = b.dataset.b; s.querySelectorAll('.wn-bar').forEach((x) => x.classList.toggle('on', x.dataset.b === S.brand)); S.ci = 0; brands.forEach((x) => { x.setAttribute('aria-checked', String(x === b)); x.tabIndex = x === b ? 0 : -1; }); buildSwatches(); drawStatic(); drawDyn(); drawInset(); minis(); sync(); say(S.brand + ' colours, ' + COL[S.brand].length + ' published.'); }));
    function chooseKind(k, quiet) {
      if (k === S.kind) return; S.kind = k; kinds.forEach((x) => { const on = x.dataset.k === k; x.setAttribute('aria-checked', String(on)); x.tabIndex = on ? 0 : -1; });
      for (const p of Object.values(P)) { p.t = 0; p.x = 0; p.v = 0; } P.lock.t = P.lock.x = 1; S.locked = true; S.tilt = false;
      const go = () => { drawStatic(); drawDyn(); drawInset(); sync(); stage.classList.remove('swap'); };
      if (RM) go(); else { stage.classList.add('swap'); clearTimeout(swapT); swapT = setTimeout(go, 170); }
      if (!quiet) say(KIND[k].name + '. ' + KIND[k].how);
    }
    kinds.forEach((b) => b.addEventListener('click', () => chooseKind(b.dataset.k)));
    bReset.addEventListener('click', () => { Object.assign(S, { brand: 'NT Windows', ci: 0, grid: 'none', lowe: true, screen: false, time: 13, locked: true, tilt: false }); for (const p of Object.values(P)) { p.t = 0; if (RM) p.x = 0; } P.lock.t = 1; if (RM) P.lock.x = 1;
      s.querySelectorAll('.wn-bar').forEach((x, i) => x.classList.toggle('on', i === 0)); brands.forEach((x, i) => { x.setAttribute('aria-checked', String(i === 0)); x.tabIndex = i === 0 ? 0 : -1; }); grids.forEach((x, i) => { x.setAttribute('aria-checked', String(i === 0)); x.tabIndex = i === 0 ? 0 : -1; }); time.value = 13; buildSwatches(); sxT = sx = 320; drawStatic(); kick(); sync(); minis(); say('Reset.'); });

    /* ---- direct manipulation */
    function hideHint() { if (!said) { said = true; hint.classList.add('off'); } }
    hit.addEventListener('pointerdown', (e) => {
      if (S.kind === 'picture') return; const p = pt(e), g = G; hideHint();
      if (S.locked) { shake(); say('Locked. Turn the lock first, or press Open.'); return; }
      let w = null; if (hung()) w = p.y > g.iy + g.ih / 2 ? 'lo' : S.kind === 'double' ? 'up' : null; else if (S.kind === 'casement') w = 'ang'; else w = 'sl';
      if (!w) { say('On a single hung the upper sash is fixed.'); return; }
      drag = { w, y0: p.y, x0: p.x, v0: P[w].t, id: e.pointerId }; try { hit.setPointerCapture(e.pointerId); } catch (_) {} e.preventDefault(); hit.classList.add('grab');
      if (w === 'lo' && S.tilt) { S.tilt = false; set('tilt', 0); sync(); }
    });
    hit.addEventListener('pointermove', (e) => { if (!drag) return; const p = pt(e), g = G; let v;
      if (drag.w === 'lo') v = drag.v0 - (p.y - drag.y0) / g.travel; else if (drag.w === 'up') v = drag.v0 + (p.y - drag.y0) / g.travel;
      else if (drag.w === 'ang') { const k = clamp((p.x - g.ix) / g.iw, Math.cos(78 * Math.PI / 180), 1); v = Math.acos(k) / (78 * Math.PI / 180); } else v = drag.v0 - (p.x - drag.x0) / g.stravel;
      set(drag.w, v, true); sync(); });
    const end = () => { if (drag) { drag = null; hit.classList.remove('grab'); } }; hit.addEventListener('pointerup', end); hit.addEventListener('pointercancel', end); hit.addEventListener('lostpointercapture', end);
    stage.addEventListener('pointermove', (e) => { if (RM) return; const p = pt(e); if (p.x >= 0 && p.x <= 640) { sxT = p.x; ptr = true; kick(); } });
    stage.addEventListener('pointerleave', () => { ptr = false; sxT = 100 + (S.time - 7) / 16 * 440; kick(); });

    /* ---- thumbnails (the five kinds, in the chosen frame colour) */
    function minis() {
      const c = colr(), gl = '#CFE3F2', gl2 = '#9CC1DC';
      const F = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${c}" stroke="${dark(c, .45)}" stroke-width="1"/><rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h - 8}" fill="${gl}"/>`;
      const ar = (d) => `<path d="${d}" stroke="#0E3B2C" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      const M = {
        single: F(15, 6, 34, 52) + `<rect x="19" y="10" width="26" height="20" fill="${gl}"/><rect x="19" y="26" width="26" height="22" fill="${gl2}" opacity=".75"/><rect x="17" y="30" width="30" height="4" fill="${c}" stroke="${dark(c, .45)}" stroke-width=".8"/>` + ar('M32 52V42M28 46l4-4 4 4'),
        double: F(15, 6, 34, 52) + `<rect x="17" y="30" width="30" height="4" fill="${c}" stroke="${dark(c, .45)}" stroke-width=".8"/>` + ar('M32 22v6M29 24l3-3 3 3M32 40v6M29 44l3 3 3-3'),
        casement: F(15, 6, 34, 52).replace(`fill="${gl}"`, 'fill="#5B6F66" opacity=".5"') + `<polygon points="19,10 35,6 35,58 19,54" fill="${gl2}" stroke="${dark(c, .45)}" stroke-width="2.4"/>` + ar('M24 32h14M34 28l4 4-4 4'),
        slider: F(6, 16, 52, 32) + `<rect x="10" y="20" width="24" height="24" fill="${gl2}" stroke="${c}" stroke-width="2"/><rect x="30" y="20" width="24" height="24" fill="${gl}" stroke="${c}" stroke-width="2"/>` + ar('M44 33H34M38 29l-4 4 4 4'),
        picture: F(10, 10, 44, 44) + `<polygon points="16,40 30,16 38,16 22,40" fill="#fff" opacity=".5"/>`,
      };
      s.querySelectorAll('.wn-k').forEach((b) => { b.querySelector('svg').innerHTML = M[b.dataset.k]; });
    }

    /* ---- parallax for the background art, and the first draw */
    const bg = s.querySelector('.wn-bg'); let tick = false;
    const par = () => { tick = false; const r = s.getBoundingClientRect(), p = clamp((r.top + r.height / 2 - innerHeight / 2) / (innerHeight * .9), -1, 1); bg.firstElementChild.style.setProperty('--py', (p * -24).toFixed(1) + 'px'); bg.lastElementChild.style.setProperty('--py', (p * -60).toFixed(1) + 'px'); };
    if (!RM) addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(par); } }, { passive: true }); par();
    if ('IntersectionObserver' in window && !RM) { const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { s.classList.add('wn-seen'); io.disconnect(); } }, { threshold: .15 }); io.observe(s); } else s.classList.add('wn-seen');
    sxT = sx = 100 + (S.time - 7) / 16 * 440; buildSwatches(); drawStatic(); drawDyn(); drawInset(); minis(); sync();
    window.__win = { S, P, set, kick, chooseKind, get G() { return G; } };
  }
  return { wire };
})();

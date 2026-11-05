/* VISUALISER N (new-versions addendum, pass 4) — "Torn between two". Reference: MERSI (the split cover: two halves moving
   independently, a seam, a central label naming what meets there). One drawn house split by a draggable seam: the left
   half wears one ColorPlus colour, the right half another, under the same Arctic White trim. Each half has its own rail;
   the rails move in opposite directions to bring a choice to the seam. The 17 published ColorPlus colours for Austin
   (the list A–M use). Configurator only (Visualiser); nothing game-like. */
window.Vis9 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const CP = [['Arctic White', '#E0E0D8'], ['Cobble Stone', '#C6BEB0'], ['Navajo Beige', '#D5C9B2'], ['Khaki Brown', '#A28F7D'], ['Timber Bark', '#7B7064'],
    ['Rich Espresso', '#5F5A55'], ['Mountain Sage', '#706F5E'], ['Light Mist', '#B6BAB5'], ['Pearl Gray', '#B2AEA9'], ['Gray Slate', '#898A87'], ['Boothbay Blue', '#778184'],
    ['Evening Blue', '#5F696D'], ['Deep Ocean', '#49545C'], ['Aged Pewter', '#7D7974'], ['Night Gray', '#6A6D6F'], ['Iron Gray', '#575B59'], ['Countrylane Red', '#714D47']];
  const TRIM = '#F1F0EA', A0 = 10, B0 = 0;
  const lap = () => { let s = ''; for (let y = 104; y < 470; y += 15) s += `<rect x="100" y="${y}" width="600" height="2"/>`; return s; };
  const win = (x, y) => `<rect x="${x - 8}" y="${y - 8}" width="86" height="106" fill="${TRIM}"/><rect x="${x}" y="${y}" width="70" height="90" fill="#A9C0C8"/><rect x="${x + 33}" y="${y}" width="4" height="90" fill="${TRIM}"/><rect x="${x}" y="${y + 43}" width="70" height="4" fill="${TRIM}"/><rect x="${x - 14}" y="${y + 98}" width="98" height="8" fill="${TRIM}"/>`;
  const house = () => `<svg class="vnhouse" viewBox="40 60 720 440" aria-hidden="true">
      <defs><clipPath id="vnWall"><path d="M110 470V250L400 92L690 250V470Z"/></clipPath><clipPath id="vnLeft"><rect class="vncl" x="0" y="0" width="400" height="500"/></clipPath></defs>
      <rect x="60" y="470" width="680" height="14" rx="4" fill="#E4EAE5"/>
      <g clip-path="url(#vnWall)"><rect class="vnb" x="0" y="0" width="800" height="500" fill="${CP[B0][1]}"/><rect class="vna" x="0" y="0" width="800" height="500" fill="${CP[A0][1]}" clip-path="url(#vnLeft)"/>
        <g fill="rgba(10,22,17,.16)">${lap()}</g></g>
      <rect x="110" y="250" width="10" height="220" fill="${TRIM}"/><rect x="680" y="250" width="10" height="220" fill="${TRIM}"/>
      <path d="M96 258L400 84L704 258" fill="none" stroke="${TRIM}" stroke-width="10"/><path d="M78 262L400 76L722 262L706 272L400 98L94 272Z" fill="#363C40"/>
      ${win(180, 300)}${win(550, 300)}<rect x="370" y="160" width="60" height="60" rx="30" fill="${TRIM}"/><circle cx="400" cy="190" r="22" fill="#A9C0C8"/>
      <rect x="356" y="340" width="88" height="130" fill="${TRIM}"/><rect x="366" y="350" width="68" height="120" fill="#0E3B2C"/><circle cx="424" cy="410" r="3.5" fill="#E9E6DE"/>
    </svg>`;
  const rail = (side, order, sel) => `<div class="vnrail vn-${side}" role="radiogroup" aria-label="${side === 'a' ? 'Left half colour' : 'Right half colour'}"><div class="vntrack">${order.map((i) =>
    `<button type="button" role="radio" class="vnsw" data-i="${i}" aria-checked="${i === sel}" tabindex="${i === sel ? 0 : -1}"><i style="background:${CP[i][1]}"></i><span>${CP[i][0]}</span></button>`).join('')}</div></div>`;
  const ORD = CP.map((_, i) => i), REV = ORD.slice().reverse();

  const N = () => `<section class="sec vnN" id="colours" aria-labelledby="vnN-h">
    <div class="vnhd"><h2 class="sec-h" id="vnN-h" data-split>Torn between two?</h2>
      <p class="sec-p">Put both on the house. Choose a ColorPlus colour for each half, then drag the seam to give either one more of the wall.</p></div>
    <div class="vnstage" data-solid>
      ${rail('a', ORD, A0)}
      <div class="vnwrap">${house()}
        <div class="vnseam" role="slider" tabindex="0" aria-label="Seam between the two colours" aria-valuemin="20" aria-valuemax="80" aria-valuenow="50" aria-valuetext="${CP[A0][0]} on the left 50% of the house, ${CP[B0][0]} on the right"><i aria-hidden="true"></i></div>
        <p class="vnlabel" aria-hidden="true"><span class="vnla">${CP[A0][0]}</span><b>|</b><span class="vnlb">${CP[B0][0]}</span></p>
      </div>
      ${rail('b', REV, B0)}
    </div>
    <div class="vnbar" data-solid>
      <p class="vnread" aria-live="polite">Left: <b>${CP[A0][0]}</b>, ColorPlus. Right: <b>${CP[B0][0]}</b>, ColorPlus. Trim in Arctic White, the ColorPlus trim colour.</p>
      <button type="button" class="vnswap">Swap sides</button>
      <div class="vncta"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
        <p>Screens show colour a little differently; see real samples at the free inspection.</p></div>
    </div></section>`;

  function wire(root) {
    const s = root.querySelector('.vnN'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, PH = matchMedia('(max-width:1000px)');
    const wrap = s.querySelector('.vnwrap'), seam = s.querySelector('.vnseam'), clip = s.querySelector('.vncl'), A = s.querySelector('.vna'), B = s.querySelector('.vnb');
    const la = s.querySelector('.vnla'), lb = s.querySelector('.vnlb'), read = s.querySelector('.vnread');
    const R = { a: { el: s.querySelector('.vn-a'), sel: A0 }, b: { el: s.querySelector('.vn-b'), sel: B0 } };
    let pct = 50, drag = false;
    // the seam: a percentage of the house's width (the svg spans the wrap's full width; its viewBox starts at x 40, 720 wide)
    const lab = s.querySelector('.vnlabel');
    // the label rides the seam but never leaves the house
    const place = () => { const W = wrap.clientWidth, lw = lab.offsetWidth, x = Math.max(lw / 2 + 6, Math.min(W - lw / 2 - 6, W * pct / 100)); lab.style.left = (W ? x : pct * W / 100) + 'px'; };
    // 20–80: the wall runs 10–90% of the drawing, so each colour always keeps at least an eighth of it
    const setSeam = (v) => { pct = Math.max(20, Math.min(80, v)); seam.style.left = pct + '%'; place();
      clip.setAttribute('width', 40 + 7.2 * pct); seam.setAttribute('aria-valuenow', Math.round(pct)); seam.setAttribute('aria-valuetext', `${CP[R.a.sel][0]} on the left ${Math.round(pct)}% of the house, ${CP[R.b.sel][0]} on the right`); };
    const center = (side) => { const r = R[side], t = r.el.querySelector('.vntrack'), b = r.el.querySelector(`.vnsw[data-i="${r.sel}"]`); if (!b) return;
      const ax = PH.matches ? 'X' : 'Y', size = PH.matches ? r.el.clientWidth : r.el.clientHeight, off = PH.matches ? b.offsetLeft + b.offsetWidth / 2 : b.offsetTop + b.offsetHeight / 2;
      t.style.transition = RM ? 'none' : 'transform .6s cubic-bezier(.22,1,.36,1)'; t.style.transform = `translate${ax}(${(size / 2 - off).toFixed(1)}px)`; };
    const roll = (el, txt) => { if (el.textContent === txt) return; if (RM) { el.textContent = txt; place(); return; } el.classList.add('vnout'); setTimeout(() => { el.textContent = txt; place(); el.classList.remove('vnout'); el.classList.add('vnin'); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('vnin'))); }, 180); };
    const paint = (say) => { A.setAttribute('fill', CP[R.a.sel][1]); B.setAttribute('fill', CP[R.b.sel][1]); roll(la, CP[R.a.sel][0]); roll(lb, CP[R.b.sel][0]); setSeam(pct);
      if (say !== false) read.innerHTML = `Left: <b>${CP[R.a.sel][0]}</b>, ColorPlus. Right: <b>${CP[R.b.sel][0]}</b>, ColorPlus. Trim in Arctic White, the ColorPlus trim colour.`; };
    const pick = (side, i, focus) => { const r = R[side]; r.sel = i; r.el.querySelectorAll('.vnsw').forEach((b) => { const on = +b.dataset.i === i; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus({ preventScroll: true }); });
      center(side); paint(); };
    Object.entries(R).forEach(([side, r]) => { const bs = [...r.el.querySelectorAll('.vnsw')];
      bs.forEach((b, k) => { b.addEventListener('click', () => pick(side, +b.dataset.i));
        b.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; let n = -1;
          if (d) n = (k + d + bs.length) % bs.length; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = bs.length - 1;
          if (n >= 0) { e.preventDefault(); pick(side, +bs[n].dataset.i, true); } }); }); });
    // drag the seam (pointer capture), keys, double-click to centre
    const fromX = (x) => { const r = wrap.getBoundingClientRect(); return ((x - r.left) / r.width) * 100; };
    seam.addEventListener('pointerdown', (e) => { drag = true; seam.setPointerCapture(e.pointerId); s.classList.add('vndrag'); });
    seam.addEventListener('pointermove', (e) => { if (drag) setSeam(fromX(e.clientX)); });
    const up = () => { drag = false; s.classList.remove('vndrag'); }; seam.addEventListener('pointerup', up); seam.addEventListener('pointercancel', up);
    // a tap or click on the house moves the seam there (on click, so a finger scrolling past the house never moves it)
    wrap.addEventListener('click', (e) => { if (e.target === seam || seam.contains(e.target)) return; setSeam(fromX(e.clientX)); });
    seam.addEventListener('dblclick', () => setSeam(50));
    seam.addEventListener('keydown', (e) => { const d = { ArrowRight: 2, ArrowUp: 2, ArrowLeft: -2, ArrowDown: -2, PageUp: 10, PageDown: -10 }[e.key];
      if (d) { e.preventDefault(); setSeam(pct + d); } else if (e.key === 'Home') { e.preventDefault(); setSeam(20); } else if (e.key === 'End') { e.preventDefault(); setSeam(80); } });
    s.querySelector('.vnswap').addEventListener('click', () => { const a = R.a.sel; pick('a', R.b.sel); pick('b', a); });
    const all = () => { center('a'); center('b'); place(); }; addEventListener('resize', all); PH.addEventListener('change', all);
    paint(false); setSeam(50); requestAnimationFrame(all);
  }
  return { M: N, N, wire, CP };
})();

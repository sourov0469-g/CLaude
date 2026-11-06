/* PAGE — Siding (#/siding). Everything interactive is drawn here from geometry: a wall that hangs itself, the HardiePlank lap profile to scale, 415 priced jobs as dots, board and batten, a gable,
   an eave cut, a layered wall you step through, a price histogram you scrub, a before/after wipe. Only published numbers. Reduced motion: every state snaps, nothing runs on its own. */
window.FPSiding = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let P; const $ = (s, r) => (r || P).querySelector(s), $$ = (s, r) => [...(r || P).querySelectorAll(s)];
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), f1 = (v) => Math.round(v * 10) / 10;
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const H = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), X = (r) => '#' + r.map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => { const A = H(a), B = H(b); return X(A.map((v, i) => v + (B[i] - v) * t)); }, lite = (c, t) => mix(c, '#ffffff', t), dark = (c, t) => mix(c, '#000000', t);
  function radio(g, cb) {
    const bs = [...g.querySelectorAll('[role=radio]')];
    const set = (b, focus, silent) => { bs.forEach((x) => { const on = x === b; x.setAttribute('aria-checked', on); x.tabIndex = on ? 0 : -1; }); if (focus) b.focus(); if (!silent && cb) cb(b); };
    bs.forEach((b) => { b.addEventListener('click', () => set(b)); b.addEventListener('keydown', (e) => { let d = 0; if (e.key === 'ArrowRight' || e.key === 'ArrowDown') d = 1; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') d = -1; else return; e.preventDefault(); set(bs[(bs.indexOf(b) + d + bs.length) % bs.length], true); }); });
    return { bs, set: (i, silent) => set(bs[i], false, silent) };
  }
  function tween(from, to, ms, fn, done) { if (RM) { fn(to); done && done(); return; } const t0 = performance.now(); const step = (t) => { const u = clamp((t - t0) / ms), e = 1 - Math.pow(1 - u, 3); fn(from + (to - from) * e); if (u < 1) requestAnimationFrame(step); else done && done(); }; requestAnimationFrame(step); }

  /* ---------- opener: the wall that hangs itself ---------- */
  function hero() {
    const s = $('#ps-hang'), N = 12, X0 = 40, X1 = 440, YB = 400, ch = 340 / N; let b = '';
    b += `<defs><linearGradient id="psSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE3F1"/><stop offset="1" stop-color="#EAF3F6"/></linearGradient><pattern id="psHg" width="90" height="${ch}" patternUnits="userSpaceOnUse"><path d="M0 7h34M44 7h40M12 13h50M0 19h26M38 19h50" stroke="#0E2A20" stroke-opacity=".13" stroke-width="1"/></pattern></defs>`;
    b += `<ellipse cx="240" cy="418" rx="236" ry="14" fill="#0E3B2C" opacity=".16"/><rect x="0" y="400" width="480" height="30" rx="10" fill="#8FB27B"/><path d="M0 402h480" stroke="#6E9660" stroke-width="3"/>`;
    b += `<rect x="${X0}" y="60" width="${X1 - X0}" height="340" fill="#DCD2B8"/>`;
    for (let i = 0; i < N; i++) {
      const y = YB - (i + 1) * ch, c = mix('#A5B8A6', hash(i + 3) > .5 ? '#ffffff' : '#000000', .035 + hash(i) * .05);
      b += `<g class="ps-bd" style="--i:${i}"><rect x="${X0}" y="${f1(y)}" width="${X1 - X0}" height="${f1(ch)}" fill="${c}"/><rect x="${X0}" y="${f1(y)}" width="${X1 - X0}" height="${f1(ch)}" fill="url(#psHg)" transform="translate(${hash(i + 9) * -30} 0)"/><rect x="${X0}" y="${f1(y)}" width="${X1 - X0}" height="1.6" fill="#fff" opacity=".4"/><rect x="${X0}" y="${f1(y + ch - 3.4)}" width="${X1 - X0}" height="3.4" fill="#0E2A20" opacity=".22"/></g>`;
    }
    b += `<g class="ps-hw"><rect x="40" y="60" width="12" height="340" fill="#F2F4EF"/><rect x="428" y="60" width="12" height="340" fill="#F2F4EF"/>`;
    b += `<rect x="246" y="146" width="130" height="150" rx="3" fill="#F4F6F2" stroke="#B9C3BA"/><rect x="259" y="159" width="104" height="124" fill="url(#psSky)"/><path d="M311 159v124M259 221h104" stroke="#F4F6F2" stroke-width="6"/><path d="M262 280L296 162" stroke="#fff" stroke-width="10" opacity=".35"/><rect x="238" y="294" width="146" height="10" rx="2" fill="#E6EAE3" stroke="#B9C3BA"/>`;
    b += `<rect x="78" y="236" width="74" height="164" rx="3" fill="#F4F6F2" stroke="#B9C3BA"/><rect x="88" y="246" width="54" height="154" fill="#2B3A33"/><circle cx="132" cy="326" r="4" fill="#B5DB6E"/></g>`;
    b += `<rect x="24" y="22" width="432" height="14" rx="3" fill="#2A332E"/><rect x="24" y="36" width="432" height="22" fill="#F1F3EE"/><rect x="24" y="52" width="432" height="6" fill="#0E2A20" opacity=".12"/>`;
    s.innerHTML = b;
    const go = () => { P.querySelector('.ps-wallfig').classList.remove('ps-go'); void s.getBoundingClientRect(); P.querySelector('.ps-wallfig').classList.add('ps-go'); };
    $('#ps-replay').addEventListener('click', go); P.querySelector('.ps-wallfig').classList.add('ps-go');
    document.addEventListener('fpage', (e) => { if (e.detail === 'siding' && !RM) go(); });
  }

  /* ---------- lap siding, to scale ---------- */
  const DIM = { board: ['Board: <b>8.25 in</b> wide. Also made 5.25 in, 6.25 in and 7.25 in wide.', 0], exposure: ['Exposure: <b>7 in</b>, the part of each board you see.', 1], length: ['Length: <b>12 ft</b>.', 2], thick: ['Thickness: <b>5/16 in</b>.', 3] };
  let TEX = 'cedar', setCourse = () => {};
  function lap() {
    const s = $('.ps-lapst'), S = 18, t = 5 / 16 * S, X0 = 66, BH = 8.25 * S, EX = 7 * S; let b = '';
    b += `<defs><linearGradient id="psBd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#D3DCCF"/><stop offset="1" stop-color="#A9BAA7"/></linearGradient><linearGradient id="psSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
<pattern id="psGr" width="120" height="18.9" patternUnits="userSpaceOnUse"><path d="M0 4.5h44M54 4.5h60M14 9.4h70M92 9.4h28M0 14.4h30M40 14.4h72" stroke="#0E2A20" stroke-opacity=".17" stroke-width="1.1"/></pattern>
<clipPath id="psMg"><circle cx="222" cy="404" r="48"/></clipPath></defs>`;
    // section view
    b += `<text x="66" y="30" font-size="12.5" font-weight="700" fill="#4B5A52">Cut through three boards, to scale</text>`;
    b += `<rect x="36" y="40" width="26" height="440" fill="#D9C9A5"/><rect x="62" y="40" width="3.4" height="440" fill="#BFD3DE"/><text transform="rotate(-90 52 300)" x="52" y="304" text-anchor="middle" font-size="11" font-weight="600" fill="#5A4B2A">wall sheathing and house wrap</text>`;
    for (let k = 2; k >= 0; k--) { const y = 62 + k * EX; b += `<polygon points="${X0},${y} ${X0 + t},${y} ${X0 + 2 * t},${y + BH} ${X0 + t},${y + BH}" fill="url(#psBd)" stroke="#43584A" stroke-width=".9" stroke-linejoin="round"/><polygon points="${X0 + t},${y + BH} ${X0 + 2 * t},${y + BH} ${X0 + 2 * t},${y + BH - 2} ${X0 + t + .4},${y + BH - 6}" fill="#fff" opacity=".35"/>`; }
    const yb = (k) => 62 + k * EX + BH;
    b += `<g class="ps-dm" data-d="board"><path class="ln" d="M78 ${yb(0) - 0.001}"/><path d="M${X0 + 44} 188H126M${X0 + 44} 336.5H126" stroke="#2D3C34" stroke-width=".8" stroke-dasharray="3 3"/><path class="ln" d="M120 188v148.5M115 188h10M115 336.5h10"/><rect class="pill" x="128" y="250" width="80" height="26" rx="13"/><text class="tx" x="168" y="268" text-anchor="middle">8.25 in board</text></g>`;
    b += `<g class="ps-dm" data-d="exposure"><path d="M80 ${yb(0)}H178M80 ${yb(1)}H178" stroke="#2D3C34" stroke-width=".8" stroke-dasharray="3 3"/><path class="ln" d="M170 ${yb(0)}v${EX}M165 ${yb(0)}h10M165 ${yb(1)}h10"/><rect class="pill" x="180" y="${(yb(0) + yb(1)) / 2 - 13 + 70}" width="70" height="26" rx="13"/><text class="tx" x="215" y="${(yb(0) + yb(1)) / 2 + 5 + 70}" text-anchor="middle">7 in exposed</text></g>`;
    b += `<g class="ps-dm" data-d="thick"><path d="M${X0 + 1.5 * t} ${yb(2) - 1}L190 392" stroke="#2D3C34" stroke-width="1" /><circle cx="222" cy="404" r="48" fill="#F6FAF6" stroke="#2D3C34" stroke-width="1.6"/><g clip-path="url(#psMg)"><polygon points="205,372 221,372 233,426 217,426" fill="url(#psBd)" stroke="#43584A" stroke-width="1.4"/><path class="ln" d="M217 436h16M217 431v10M233 431v10"/></g><rect class="pill" x="188" y="446" width="72" height="24" rx="12"/><text class="tx" x="224" y="463" text-anchor="middle">5/16 in</text><text x="224" y="388" text-anchor="middle" font-size="10" fill="#4B5A52" font-weight="600">enlarged</text></g>`;
    const b1 = b; b = '';
    const EW = 388.8, EC = 18.9, EX0 = 350, GY = 470, NC = 20;
    b += `<text x="${EX0}" y="508" font-size="12.5" font-weight="700" fill="#4B5A52">A 12 ft wall of courses, 7 in each</text>`;
    b += `<rect x="${EX0}" y="${GY - NC * EC}" width="${EW}" height="${NC * EC}" fill="#E4D9BC"/><path d="M${EX0 - 8} ${GY}H${EX0 + EW + 8}" stroke="#4B5A52" stroke-width="2"/>`;
    for (let i = 0; i < NC; i++) {
      const y = GY - (i + 1) * EC, c = mix('#A9BBA9', hash(i + 5) > .5 ? '#ffffff' : '#000000', .03 + hash(i + 2) * .06);
      b += `<g class="ps-crs on" data-i="${i}"><rect class="f" x="${EX0}" y="${f1(y)}" width="${EW}" height="${EC}" fill="${c}" stroke="none"/><rect class="ps-grain" x="${EX0}" y="${f1(y)}" width="${EW}" height="${EC}" fill="url(#psGr)"/><rect class="ps-sheen" x="${EX0}" y="${f1(y)}" width="${EW}" height="${EC}" fill="url(#psSh)"/><rect x="${EX0}" y="${f1(y + EC - 2.2)}" width="${EW}" height="2.2" fill="#0E2A20" opacity=".24"/></g>`;
    }
    // ruler (7 in per course) and the 12 ft board ruler
    let rl = `<path d="M338 ${GY - NC * EC}V${GY}" stroke="#2D3C34" stroke-width="1.4"/>`; for (let i = 0; i <= NC; i++) rl += `<path d="M${i % 5 ? 332 : 326} ${f1(GY - i * EC)}H338" stroke="#2D3C34" stroke-width="1.2"/>`;
    b += `<g opacity=".7">${rl}</g>`;
    b += `<g class="ps-dm" data-d="exposure"><path class="ln" d="M312 ${GY - EC}v${EC}M307 ${GY - EC}h10M307 ${GY}h10"/><rect class="pill" x="270" y="${GY - EC - 18}" width="36" height="22" rx="11"/><text class="tx" x="288" y="${GY - EC - 3}" text-anchor="middle">7 in</text></g>`;
    let fr = `<path d="M${EX0} ${GY + 8}H${EX0 + EW}" stroke="#2D3C34" stroke-width="1.4"/>`; for (let i = 0; i <= 12; i++) fr += `<path d="M${f1(EX0 + i * EW / 12)} ${GY + 8}v${i % 6 ? 6 : 11}" stroke="#2D3C34" stroke-width="1.2"/>`;
    b += `<g class="ps-dm" data-d="length"><path class="ln" d="M${EX0} 66H${EX0 + EW}M${EX0} 59v14M${EX0 + EW} 59v14"/><rect class="pill" x="${EX0 + EW / 2 - 56}" y="50" width="112" height="26" rx="13"/><text class="tx" x="${EX0 + EW / 2}" y="68" text-anchor="middle">12 ft long</text><g opacity=".75">${fr}</g><text x="${EX0}" y="${GY + 30}" font-size="11" fill="#4B5A52" font-weight="600" text-anchor="middle">0</text><text x="${EX0 + EW / 2}" y="${GY + 30}" font-size="11" fill="#4B5A52" font-weight="600" text-anchor="middle">6 ft</text><text x="${EX0 + EW}" y="${GY + 30}" font-size="11" fill="#4B5A52" font-weight="600" text-anchor="middle">12 ft</text></g>`;
    $('#ps-lapsvg').innerHTML = b1; $('#ps-lapel').innerHTML = b; $$('.ps-lapsvg', s).forEach((v) => v.classList.add('ps-tex-cedar'));
    const crs = $$('.ps-crs', s), rng = $('#ps-course'), out = $('#ps-ncour');
    setCourse = (n) => { n = Math.round(n); crs.forEach((c, i) => { c.classList.toggle('on', i < n); c.classList.toggle('cur', i === n - 1); }); out.textContent = n; rng.value = n; rng.style.setProperty('--v', (n / NC * 100) + '%'); rng.setAttribute('aria-valuetext', n + ' of 20 courses hung'); };
    rng.addEventListener('input', () => setCourse(+rng.value));
    const dm = radio($('.ps-seg4'), (btn) => { const d = btn.dataset.d; $$('.ps-dm', s).forEach((g) => g.classList.toggle('on', g.dataset.d === d)); $('#ps-dimread').innerHTML = DIM[d][0]; });
    dm.set(0); $$('.ps-dm', s).forEach((g) => g.classList.toggle('on', g.dataset.d === 'board')); $('#ps-dimread').innerHTML = DIM.board[0];
    radio($('.ps-seg2', P.querySelector('.ps-lap')), (btn) => { TEX = btn.dataset.t; document.querySelectorAll('#pg-siding .ps-lapsvg,#pg-siding .ps-bbsvg').forEach((v) => { v.classList.toggle('ps-tex-smooth', TEX === 'smooth'); v.classList.toggle('ps-tex-cedar', TEX !== 'smooth'); }); });
    setCourse(20);
    let ran = false; const io = new IntersectionObserver((en) => { if (en[0].isIntersecting && !ran) { ran = true; if (!RM) { setCourse(0); setTimeout(() => tween(0, 20, 2200, setCourse), 350); } io.disconnect(); } }, { threshold: .35 }); io.observe(s);
  }

  /* ---------- 415 dots ---------- */
  function dots() {
    const box = $('#ps-dots'); box.innerHTML = Array.from({ length: 415 }, (_, i) => `<i style="--d:${Math.round(i * 1.4)}"></i>`).join('');
    const ds = [...box.children], T = { lap: [301, 'of 415 priced jobs used the 8.25 in board'], bb: [27, 'of 415 priced jobs went board and batten'], cedar: [286, 'of 415 priced jobs chose Select Cedarmill'], smooth: [36, 'of 415 priced jobs chose Smooth'] };
    let cur = 0; const show = (k) => { const [n, t] = T[k]; ds.forEach((d, i) => d.classList.toggle('on', i < n)); $('#ps-dots-t').textContent = t; const el = $('#ps-dotb'); tween(cur, n, 700, (v) => { el.textContent = Math.round(v); }); cur = n; };
    radio($('.ps-chips', P.querySelector('.ps-dotc')), (b) => show(b.dataset.k)); const first = $('.ps-dotc'); let seen = false;
    const io = new IntersectionObserver((en) => { if (en[0].isIntersecting && !seen) { seen = true; show('lap'); io.disconnect(); } }, { threshold: .3 }); io.observe(first); $('#ps-dotb').textContent = '301';
  }

  /* ---------- board and batten ---------- */
  function bb() {
    const s = $('#ps-bbsvg'); let h = 8, step = 2;
    const draw = () => {
      const PX = 36, H0 = h * PX, GY = 410, X0 = 60, W = 432, top = GY - H0; let b = '';
      b += `<defs><pattern id="psGv" width="14" height="120" patternUnits="userSpaceOnUse"><path d="M3 6v40M8 30v70M12 0v28M5 60v40" stroke="#0E2A20" stroke-opacity=".16" stroke-width="1.1"/></pattern><linearGradient id="psBt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FAFBF8"/><stop offset="1" stop-color="#DCE2DA"/></linearGradient></defs>`;
      b += `<rect x="${X0}" y="${top}" width="${W}" height="${H0}" fill="#E1D6BA"/><path d="M${X0 - 12} ${GY}H${X0 + W + 12}" stroke="#4B5A52" stroke-width="2"/>`;
      for (let i = 0; i < 3; i++) { const x = X0 + i * 144; b += `<g class="ps-pn" style="transition-delay:${i * 90}ms"><rect x="${x}" y="${top}" width="144" height="${H0}" fill="${i % 2 ? '#B8C6BA' : '#BECBC0'}" stroke="#7F9183" stroke-width=".8"/><rect class="ps-grain" x="${x}" y="${top}" width="144" height="${H0}" fill="url(#psGv)"/></g>`; }
      for (let j = 0; j <= 9; j++) b += `<rect class="ps-bt" style="--i:${j}" x="${f1(X0 + j * 48 - 3.75)}" y="${top}" width="7.5" height="${H0}" fill="url(#psBt)" stroke="#8C9C90" stroke-width=".7"/>`;
      const dm = (y) => `stroke="#2D3C34" stroke-width="1.5" fill="none"`;
      b += `<g class="ps-bdim p"><path ${dm()} d="M${X0} ${GY + 22}H${X0 + 144}M${X0} ${GY + 16}v12M${X0 + 144} ${GY + 16}v12"/><rect x="${X0 + 4}" y="${GY + 8}" width="136" height="26" rx="13" fill="#B5DB6E"/><text x="${X0 + 72}" y="${GY + 26}" text-anchor="middle" font-size="14.5" font-weight="800" fill="#16191D">4 ft HardiePanel</text></g>`;
      b += `<g class="ps-bdim"><path ${dm()} d="M${X0 + 144} ${top - 14}H${X0 + 192}M${X0 + 144} ${top - 20}v12M${X0 + 192} ${top - 20}v12"/><rect x="${X0 + 106}" y="${top - 50}" width="150" height="26" rx="13" fill="#B5DB6E"/><text x="${X0 + 181}" y="${top - 32}" text-anchor="middle" font-size="14.5" font-weight="800" fill="#16191D">16 in on center</text><path d="M${X0 + 240} ${top - 4}L${X0 + 262} ${top - 22}" stroke="#2D3C34" stroke-width="1.2"/><text x="${X0 + 266}" y="${top - 20}" font-size="14.5" font-weight="800" fill="#16191D">2.5 in batten</text></g>`;
      b += `<g class="ps-bdim p"><path ${dm()} d="M30 ${top}V${GY}M24 ${top}h12M24 ${GY}h12"/><text transform="rotate(-90 20 ${(top + GY) / 2})" x="20" y="${(top + GY) / 2}" text-anchor="middle" font-size="14.5" font-weight="800" fill="#16191D">${h} ft panel</text></g>`;
      s.innerHTML = b; s.dataset.s = step;
    };
    draw();
    const bs = radio($('.ps-seg3', P.querySelector('.ps-bb')), (b) => { step = +b.dataset.s; s.dataset.s = step; });
    radio($('.ps-ht', P.querySelector('.ps-bb')).parentElement, (b) => { h = +b.dataset.h; draw(); });
    bs.set(2, true);
    const pl = $('#ps-plan'), px = 5; let p = `<rect x="30" y="52" width="${48 * px}" height="8" fill="#BECBC0" stroke="#7F9183" stroke-width=".8"/><rect x="30" y="60" width="${48 * px}" height="9" fill="#E1D6BA"/>`;
    for (let j = 0; j <= 3; j++) p += `<rect x="${30 + j * 80 - 6.25}" y="43" width="12.5" height="9" fill="#F3F5F1" stroke="#8C9C90" stroke-width=".8"/>`;
    p += `<path d="M30 34H110M30 28v12M110 28v12" stroke="#2D3C34" stroke-width="1.3" fill="none"/><text x="70" y="23" text-anchor="middle" font-size="11.5" font-weight="800" fill="#16191D">16 in on center</text><path d="M190 36l0-10" stroke="#2D3C34" stroke-width="1.2"/><text x="190" y="20" text-anchor="middle" font-size="11.5" font-weight="800" fill="#16191D">2.5 in</text><text x="30" y="88" font-size="11" font-weight="600" fill="#4B5A52">Plan view, to scale: one 4 ft panel</text>`;
    pl.innerHTML = p;
  }

  /* ---------- gable accents ---------- */
  function gable() {
    const s = $('#ps-gsvg'), R = $('#ps-gread');
    const T = { lap: 'Lap siding throughout: the 8.25 in HardiePlank board is what 301 of our 415 priced jobs used.', bb: 'Board and batten as an accent: our siding FAQ says most jobs are lap “with board and batten as an accent”. 27 of 415 priced jobs went board and batten.', shake: 'Our published pages and job files give no count and no specification for shingle or shake siding, so we draw none and claim nothing. If you want a gable accent, ask at the free inspection.' };
    const draw = (m) => {
      let b = `<defs><clipPath id="psGc"><polygon points="40,132 170,32 300,132"/></clipPath><pattern id="psHatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><path d="M0 0v9" stroke="#0E3B2C" stroke-opacity=".16" stroke-width="2"/></pattern></defs>`;
      b += `<rect x="0" y="244" width="340" height="26" rx="8" fill="#8FB27B"/><ellipse cx="170" cy="250" rx="150" ry="8" fill="#0E3B2C" opacity=".14"/><rect x="40" y="132" width="260" height="118" fill="#A5B8A6"/>`;
      let l = ''; for (let y = 132; y < 250; y += 14) l += `<path d="M40 ${y + 12.5}H300" stroke="#0E2A20" stroke-opacity=".28" stroke-width="2.2"/><path d="M40 ${y + .6}H300" stroke="#fff" stroke-opacity=".3"/>`;
      b += l; b += `<polygon points="40,132 170,32 300,132" fill="#A5B8A6"/>`;
      if (m === 'lap') { let g = ''; for (let y = 32; y < 132; y += 14) g += `<path d="M30 ${y + 12.5}H310" stroke="#0E2A20" stroke-opacity=".28" stroke-width="2.2"/><path d="M30 ${y + .6}H310" stroke="#fff" stroke-opacity=".3"/>`; b += `<g clip-path="url(#psGc)">${g}</g>`; }
      if (m === 'bb') { let g = '<rect x="30" y="20" width="290" height="120" fill="#C4D0C5"/>'; for (let x = 40; x <= 300; x += 16) g += `<rect x="${x - 1.6}" y="20" width="3.6" height="120" fill="#F4F6F2" stroke="#8C9C90" stroke-width=".5"/>`; b += `<g clip-path="url(#psGc)">${g}</g>`; }
      if (m === 'shake') b += `<polygon points="40,132 170,32 300,132" fill="url(#psHatch)" stroke="#0E3B2C" stroke-width="2.4" stroke-dasharray="7 6"/><text x="170" y="102" text-anchor="middle" font-size="13" font-weight="800" fill="#0E3B2C">No published spec</text><text x="170" y="119" text-anchor="middle" font-size="11.5" font-weight="600" fill="#3E4A44">ask at the inspection</text>`;
      b += `<path d="M40 132L170 32L300 132" fill="none" stroke="#F2F4EF" stroke-width="7" stroke-linejoin="round"/><path d="M30 138L170 30L310 138" fill="none" stroke="#2A332E" stroke-width="7" stroke-linejoin="round" opacity=".92"/><path d="M40 132L170 32L300 132" fill="none" stroke="#F2F4EF" stroke-width="5" stroke-linejoin="round"/>`;
      b += `<rect x="40" y="132" width="8" height="118" fill="#F2F4EF"/><rect x="292" y="132" width="8" height="118" fill="#F2F4EF"/><rect x="130" y="160" width="80" height="62" rx="2" fill="#F4F6F2" stroke="#B9C3BA"/><rect x="138" y="168" width="64" height="46" fill="#CFE3F1"/><path d="M170 168v46M138 191h64" stroke="#F4F6F2" stroke-width="4"/>`;
      s.innerHTML = b; R.textContent = T[m];
    };
    radio($('.ps-gseg'), (b) => draw(b.dataset.g)); draw('lap');
  }

  /* ---------- trim, soffit, fascia: a cut through the eave ---------- */
  function trim() {
    const s = $('#ps-trsvg'); let m = 'full', pt = 'soffit';
    const TX = { siding: 'Siding faces: the boards you see. We replace by the full wall or the whole house. Lap or board and batten, painted on site or ColorPlus.', soffit: 'Soffit: the underside of the roof overhang. We replace soffit and fascia, which protect your roof’s edges and your home’s ventilation, usually in the same job as the siding.', fascia: 'Fascia: the board along the roof’s edge. Replaced in the same job for ventilation and a clean line. On our Rob Roy job the paint scope covered fascia and soffit up to 24 inches.', trim: 'Corners and trim: HardieTrim battens are 2.5 in wide; ColorPlus comes with Arctic White trim; James Hardie’s trim carries 15 years (our FAQ). Frieze: our published pages don’t describe it separately, so we say no more. Ask at your free inspection.' };
    const geo = { fascia: '<rect x="330" y="104" width="15" height="80"/>', soffit: '<rect x="121" y="170" width="209" height="9"/>', frieze: '<rect x="121" y="179" width="10" height="26"/>' };
    const old = (g) => `<g class="ps-old ps-edge" fill="url(#psWeath)" stroke="#6B5B43" stroke-width="1">${g}</g>`;
    let b = `<defs><pattern id="psWeath" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(18)"><rect width="14" height="14" fill="#B6A586"/><path d="M0 4h14M0 10h9" stroke="#6B5B43" stroke-opacity=".5" stroke-width="1.2"/></pattern><linearGradient id="psNw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBFCFA"/><stop offset="1" stop-color="#DDE3DB"/></linearGradient><linearGradient id="psBw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#D3DCCF"/><stop offset="1" stop-color="#A9BAA7"/></linearGradient><marker id="psAr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M1 7L4 1L7 7" fill="none" stroke="#3F7A4C" stroke-width="1.6"/></marker></defs>`;
    b += `<rect x="0" y="414" width="640" height="16" fill="#8FB27B" opacity=".7"/>`;
    b += `<polygon points="96,150 330,150 330,170 121,170 121,206 96,206" fill="#E6DFC9" opacity=".7"/>`;
    b += `<rect x="100" y="126" width="18" height="288" fill="#D9C9A5" stroke="#8C7648" stroke-width=".8"/><rect x="118" y="126" width="3" height="288" fill="#BFD3DE"/>`;
    for (let y = 206; y < 400; y += 38) b += `<polygon points="121,${y} 129,${y} 138,${y + 44} 129,${y + 44}" fill="url(#psBw)" stroke="#43584A" stroke-width=".9" stroke-linejoin="round"/>`;
    b += `<polygon points="60,100 330,134 330,154 60,120" fill="#C9D3C9" stroke="#7F9183"/><polygon points="60,84 330,118 330,134 60,100" fill="#CBB88E" stroke="#8C7648" stroke-width=".8"/><path d="M52 80L352 118" stroke="#2F3A34" stroke-width="13" stroke-linecap="butt"/><path d="M52 78L352 116" stroke="#5E6F62" stroke-width="1.6" stroke-dasharray="10 6"/>`;
    const part = (id, g) => `<g class="ps-part" data-p="${id}" tabindex="-1"><g class="ps-new edge" fill="url(#psNw)" stroke="#7F9183" stroke-width="1">${g}</g>${old(g)}<g class="hl" data-p="${id}">${g.replace(/<rect /g, '<rect fill="none" ')}</g></g>`;
    b += part('soffit', geo.soffit) + part('fascia', geo.fascia) + part('frieze', geo.frieze);
    let vent = '', arr = ''; for (let i = 0; i < 5; i++) vent += `<rect x="${150 + i * 36}" y="172.5" width="16" height="4" rx="2" fill="#0E3B2C" opacity=".6"/>`;
    for (let i = 0; i < 3; i++) arr += `<path class="ps-air" style="--i:${i}" d="M${168 + i * 72} 205V158" stroke="#3F7A4C" stroke-width="2.2" fill="none" marker-end="url(#psAr)"/>`;
    b += `<g class="ps-new edge">${vent}</g>${arr}`;
    b += `<g class="ps-part" data-p="siding"><g class="hl" data-p="siding"><rect fill="none" x="121" y="206" width="22" height="206"/></g></g>`;
    b += `<text x="392" y="268" font-size="12.5" font-weight="700" fill="#4B5A52">Corner, plan view</text>`;
    b += `<rect x="400" y="318" width="146" height="18" fill="#D9C9A5" stroke="#8C7648" stroke-width=".8"/><rect x="400" y="336" width="146" height="10" fill="url(#psBw)" stroke="#43584A" stroke-width=".8"/><rect x="546" y="340" width="18" height="76" fill="#D9C9A5" stroke="#8C7648" stroke-width=".8"/><rect x="564" y="346" width="10" height="70" fill="url(#psBw)" stroke="#43584A" stroke-width=".8"/>`;
    b += `<g class="ps-part" data-p="trim"><g class="ps-new edge" fill="url(#psNw)" stroke="#7F9183" stroke-width="1"><rect x="546" y="334" width="28" height="14"/></g>${old('<rect x="546" y="334" width="28" height="14"/>')}<g class="hl" data-p="trim"><rect fill="none" x="546" y="334" width="28" height="14"/><rect fill="none" x="121" y="179" width="10" height="26"/></g></g>`;
    const lab = (t, x, y, ax, ay, anchor) => `<path d="M${x} ${y}L${ax} ${ay}" stroke="#2D3C34" stroke-width="1.1"/><circle cx="${ax}" cy="${ay}" r="3" fill="#2D3C34"/><text x="${x + (anchor === 'end' ? -6 : 6)}" y="${y + 4}" text-anchor="${anchor || 'start'}" font-size="13.5" font-weight="800" fill="#16191D">${t}</text>`;
    b += lab('Fascia', 372, 92, 340, 130) + lab('Soffit', 372, 214, 300, 175) + lab('Frieze', 200, 248, 126, 196) + lab('Siding faces', 220, 300, 133, 300) + lab('Corner trim', 520, 394, 559, 344, 'end');
    s.innerHTML = b; s.dataset.m = m;
    const parts = $$('.ps-part', s), setPt = (p) => { pt = p; const key = p === 'trim' ? ['trim', 'frieze'] : [p]; $$('.hl', s).forEach((h) => h.classList.toggle('on', key.includes(h.dataset.p))); $('#ps-trread').textContent = TX[p]; };
    const pr = radio($('.ps-parts'), (b) => setPt(b.dataset.p));
    parts.forEach((g) => g.addEventListener('click', () => { const p = g.dataset.p === 'frieze' ? 'trim' : g.dataset.p; pr.set(pr.bs.findIndex((x) => x.dataset.p === p)); }));
    radio($('.ps-seg2', P.querySelector('.ps-trim')), (b) => { m = b.dataset.m; s.dataset.m = m; });
    setPt('soffit');
  }

  /* ---------- the wall, layer by layer ---------- */
  const STEPS = [
    ['Tear-off', 'The old siding comes off the whole wall', 'Tear-off, prep, house wrap and installation. We replace by the full wall or the whole house, so the old cladding is stripped rather than patched. At the free inspection we walk the exterior, check your current siding, flashing and moisture barriers, and tell you what we see.'],
    ['Sheathing', 'Sheathing is fixed where it needs it', 'Rotten sheathing found at tear-off gets replaced before new siding goes on. On our Rob Roy job some sheathing had softened, so the crew laid new 7/16-inch OSB wall sheathing as a flat, solid, dry base.'],
    ['House wrap', 'House wrap, flashed and sealed', 'House wrap goes up over the sheathing before any board does. James Hardie lasts for decades when it is flashed, sealed and gapped right by an Elite Preferred contractor.'],
    ['HardiePlank boards', 'HardiePlank lap goes up course by course', 'James Hardie fiber cement: lap boards 8.25 in wide, 7 in showing, usually primed Select Cedarmill. On our Rob Roy job the siding install ran three days, with careful layout to keep every course level.'],
    ['Trim', 'Trim, soffit and fascia in the same job', 'The edges where siding meets roof, replaced in the same job for ventilation and a clean line. Replacing them with the siding adds to the price and gives a cleaner finish.'],
    ['Paint or ColorPlus', 'Painted on site, or finished at the factory', 'A typical replacement takes 1 to 2 weeks, including paint. Size, complexity and weather move it. Choose a finish to see the wall in it.'],
  ];
  function layers() {
    const s = $('#ps-laysvg'), W = 224, Hh = 288, BX = 58, BY = 128, FIN = { paint: ['#2A4F43', 'Shown: Hunt Club (Sherwin-Williams SW 6468)'], cplus: ['#5F696D', 'Shown: Evening Blue (ColorPlus)'] }; let step = 0, fin = 'paint';
    const plate = (id, th, face, inner, lab) => `<g class="ps-ly" id="psL${id}"><polygon points="0,0 ${th},${-th * .5} ${W + th},${-th * .5} ${W},0" fill="${dark(face, .1)}" opacity=".9"/><polygon points="${W},0 ${W + th},${-th * .5} ${W + th},${Hh - th * .5} ${W},${Hh}" fill="${dark(face, .28)}"/><rect width="${W}" height="${Hh}" fill="${id === 'T' ? 'none' : face}"/><clipPath id="psC${id}"><rect width="${W}" height="${Hh}"/></clipPath><g clip-path="url(#psC${id})">${inner}</g><rect width="${W}" height="${Hh}" fill="none" stroke="rgba(14,42,32,.4)" stroke-width="1"/></g>`;
    let sp = ''; for (let i = 0; i < 70; i++) sp += `<rect x="${f1(hash(i) * W)}" y="${f1(hash(i + 70) * Hh)}" width="${f1(5 + hash(i + 9) * 11)}" height="${f1(2 + hash(i + 20) * 3)}" fill="${hash(i + 4) > .5 ? '#BBA57A' : '#E9DCB9'}" opacity=".55"/>`;
    sp += `<path d="M${W / 4} 0V${Hh}M${W / 2} 0V${Hh}M${W * .75} 0V${Hh}M0 ${Hh / 2}H${W}" stroke="#8C7648" stroke-width="1.5" opacity=".6"/><g class="ps-patch"><rect x="26" y="150" width="84" height="64" fill="#EFE3C2" stroke="#8CB84A" stroke-width="2.2"/><rect x="140" y="40" width="64" height="48" fill="#EFE3C2" stroke="#8CB84A" stroke-width="2.2"/></g>`;
    let wr = '<rect width="224" height="288" fill="#E7EEF0"/>'; for (let i = 0; i < 18; i++) wr += `<path d="M${f1(hash(i) * W)} ${f1(hash(i + 3) * Hh)}l${f1(20 + hash(i + 7) * 40)} ${f1(-18 - hash(i + 5) * 30)}" stroke="#B9CCD3" stroke-width="1.4" fill="none" opacity=".8"/>`;
    wr += `<path d="M0 144H${W}" stroke="#B9CCD3" stroke-width="1.6" stroke-dasharray="3 3"/>`;
    const CH = Hh / 10; let bd = '', old = '';
    for (let i = 0; i < 10; i++) { const y = Hh - (i + 1) * CH; bd += `<rect class="ps-bface" x="0" y="${f1(y)}" width="${W}" height="${f1(CH)}" fill="#E3E1D8"/><rect x="0" y="${f1(y)}" width="${W}" height="${f1(CH)}" fill="url(#psGr2)" opacity=".9"/><rect x="0" y="${f1(y + CH - 3)}" width="${W}" height="3" fill="#0E2A20" opacity=".25"/><rect x="0" y="${f1(y)}" width="${W}" height="1.5" fill="#fff" opacity=".45"/>`; }
    for (let i = 0; i < 9; i++) { const y = Hh - (i + 1) * (Hh / 9); old += `<rect x="0" y="${f1(y)}" width="${W}" height="${f1(Hh / 9)}" fill="${mix('#A99F8A', hash(i) > .5 ? '#000000' : '#ffffff', .08 + hash(i + 1) * .08)}"/><rect x="0" y="${f1(y + Hh / 9 - 3)}" width="${W}" height="3" fill="#0E2A20" opacity=".4"/><path d="M${f1(hash(i + 20) * W)} ${f1(y)}l${f1(6 + hash(i) * 10)} ${f1(Hh / 9)}" stroke="#4A3F2E" stroke-width="1.2" opacity=".7"/>`; }
    old += '<path d="M30 40q60 30 40 90t30 100" stroke="#6C5B3E" stroke-width="3" opacity=".25" fill="none"/>';
    const tr = `<rect x="0" y="0" width="${W}" height="14" fill="#F4F6F2"/><rect x="0" y="0" width="12" height="${Hh}" fill="#F4F6F2"/><rect x="${W - 12}" y="0" width="12" height="${Hh}" fill="#F4F6F2"/><rect x="64" y="86" width="96" height="116" fill="none" stroke="#F4F6F2" stroke-width="11"/><rect x="58" y="80" width="108" height="128" fill="none" stroke="#0E2A20" stroke-width="1" opacity=".3"/><rect x="0" y="${Hh - 8}" width="${W}" height="8" fill="#F4F6F2"/>`;
    s.innerHTML = `<defs><pattern id="psGr2" width="120" height="${f1(CH)}" patternUnits="userSpaceOnUse"><path d="M0 6h44M54 6h60M14 12h70M92 12h28M0 18h30M40 18h72" stroke="#0E2A20" stroke-opacity=".14" stroke-width="1.1"/></pattern></defs><g transform="translate(${BX} ${BY})">${plate('S', 12, '#D9C9A5', sp, 'Sheathing')}${plate('W', 3, '#E7EEF0', wr, 'House wrap')}${plate('B', 11, '#E3E1D8', bd, 'Boards')}${plate('T', 7, '#F4F6F2', tr, 'Trim')}${plate('O', 12, '#A99F8A', old, 'Old siding')}</g><g id="psLeg"></g><text x="${BX}" y="40" id="psLbl" font-size="14" font-weight="800" fill="#16191D"></text><text x="${BX}" y="424" id="psShown" font-size="12" font-weight="600" fill="#4B5A52"></text>`;
    const L = { S: $('#psLS', s), W: $('#psLW', s), B: $('#psLB', s), T: $('#psLT', s), O: $('#psLO', s) }, ORD = ['S', 'W', 'B', 'T'];
    const place = (k, state, idx) => { // state: hidden | stack | active | gone
      const g = L[k]; const cx = idx * 34, cy = -idx * 22; let x = cx, y = cy, o = 1;
      if (state === 'hidden') { x = cx + 120; y = cy - 50; o = 0; } else if (state === 'active') { x += 26; y -= 10; } else if (state === 'gone') { x = cx + 170; y = cy - 90; o = 0; }
      g.style.transform = `translate(${x}px,${y}px)`; g.style.opacity = o;
    };
    const render = () => {
      ORD.forEach((k, i) => { const stepOf = i + 1; // S active at 1, W at 2, B at 3, T at 4; paint tints B at 5
        let st; if (step < stepOf) st = (step === 0 && k === 'S') ? 'stack' : 'hidden'; else if (step === stepOf) st = 'active'; else st = 'stack';
        if (step === 5 && k === 'B') st = 'active'; place(k, st, i); });
      place('O', step === 0 ? 'active' : 'gone', 2);
      const LG = [['T', 'Trim', '#F4F6F2'], ['B', 'Boards', '#CFCBBE'], ['W', 'House wrap', '#E7EEF0'], ['S', 'Sheathing', '#D9C9A5'], ['O', 'Old siding', '#A99F8A']]; const act = ['O', 'S', 'W', 'B', 'T', 'B'][step];
      $('#psLeg', s).innerHTML = LG.map(([k, t, c], i) => { const vis = k === 'O' ? step === 0 : (k === 'S' ? true : ORD.indexOf(k) + 1 <= (step === 5 ? 4 : step)); return `<g transform="translate(446 ${150 + i * 34})" opacity="${vis ? 1 : .22}"><rect width="16" height="16" rx="4" fill="${c}" stroke="#2D3C34" stroke-width="1"/><text x="24" y="13" font-size="13" font-weight="${k === act ? 800 : 600}" fill="#16191D">${t}</text></g>`; }).join('');
      $$('.ps-patch', s).forEach((p) => { p.style.opacity = step === 1 ? 1 : 0; p.style.transition = 'opacity .5s'; });
      $$('.ps-bface', s).forEach((r) => { r.style.transition = 'fill .6s'; r.setAttribute('fill', step >= 5 ? FIN[fin][0] : '#E3E1D8'); });
      $('#psLbl', s).textContent = ['The old siding, weathered', 'New sheathing where it softened', 'House wrap', 'HardiePlank lap boards', 'Trim', 'Finished: ' + (fin === 'paint' ? 'painted on site' : 'ColorPlus')][step];
      $('#psShown', s).textContent = step >= 5 ? FIN[fin][1] : '';
      $('#ps-prog').style.width = (step / 5 * 100) + '%';
      $('#ps-stk').textContent = 'Step ' + (step + 1) + ' of 6'; $('#ps-sth').textContent = STEPS[step][1]; $('#ps-stp').textContent = STEPS[step][2];
      const x = $('#ps-stx'); x.innerHTML = '';
      if (step === 5) { x.append(document.getElementById('ps-fintpl').content.cloneNode(true)); wireFin(x); }
      $$('button', $('#ps-steps')).forEach((b, i) => { b.setAttribute('aria-checked', i === step); b.tabIndex = i === step ? 0 : -1; b.classList.toggle('done', i < step); });
      $('#ps-prev').disabled = step === 0; $('#ps-next').disabled = step === 5; $('#ps-next').textContent = step === 4 ? 'Finish it' : 'Next layer';
    };
    function wireFin(x) {
      const tabs = $$('.ps-ft', x), show = (f) => { fin = f; tabs.forEach((t) => { const on = t.dataset.f === f; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; }); $$('.ps-fp', x).forEach((p) => { p.hidden = p.dataset.f !== f; }); $$('.ps-bface', s).forEach((r) => r.setAttribute('fill', FIN[f][0])); $('#psShown', s).textContent = FIN[f][1]; $('#psLbl', s).textContent = 'Finished: ' + (f === 'paint' ? 'painted on site' : 'ColorPlus'); };
      tabs.forEach((t) => { t.addEventListener('click', () => show(t.dataset.f)); t.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const o = tabs.find((y) => y !== t); show(o.dataset.f); o.focus(); } }); }); show(fin);
    }
    const ol = $('#ps-steps'); ol.innerHTML = STEPS.map((st, i) => `<li><button type="button" role="radio" aria-checked="false" tabindex="-1" data-i="${i}"><i>${i + 1}</i>${st[0]}</button></li>`).join('');
    const bs = $$('button', ol); const go = (i, focus) => { step = clamp(i, 0, 5); render(); if (focus) bs[step].focus(); };
    bs.forEach((b, i) => { b.addEventListener('click', () => go(i)); b.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); go(i + 1, true); } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1, true); } }); });
    $('#ps-next').addEventListener('click', () => go(step + 1)); $('#ps-prev').addEventListener('click', () => go(step - 1)); render();
  }

  /* ---------- the price histogram ---------- */
  const BANDS = [['Under $2k', 12], ['$2k–$5k', 33], ['$5k–$10k', 70], ['$10k–$15k', 107], ['$15k–$20k', 92], ['$20k–$25k', 53], ['$25k–$30k', 22], ['$30k–$40k', 19], ['$40k–$50k', 4], ['$50k–$60k', 1], ['$60k–$75k', 2]];
  const CITY = [['Austin', 279, '$15k–$20k'], ['Round Rock', 56, '$10k–$15k'], ['Cedar Park', 16, '$10k–$15k'], ['Pflugerville', 14, '$5k–$10k'], ['Leander', 9, '$10k–$15k'], ['Buda', 6, '$15k–$20k']];
  const EXA = { '$5k–$10k': 'A job in this band: East Oak Hill, Austin · James Hardie 8.25″ Select Cedar Mill (siding portion).', '$10k–$15k': 'A job in this band: Block House Creek, Leander · James Hardie Select Cedar Mill 8.25″ (siding portion).', '$15k–$20k': 'A job in this band: Anderson Mill West, Cedar Park · James Hardie 8.25″ Primed Select Cedar Mill (siding portion).', '$20k–$25k': 'A job in this band: Northwest Hills, Austin · James Hardie Select Cedar Mill 8.25″ (siding portion).' };
  function cost() {
    const bars = $$('.ps-bar'), box = $('#ps-bars'), wrap = $('.ps-chwrap'); bars.forEach((b, i) => b.querySelector('.ps-bv').style.setProperty('--k', i));
    let cur = 3; const sel = (i, focus) => { cur = clamp(i, 0, 10); bars.forEach((b, j) => { b.setAttribute('aria-checked', j === cur); b.tabIndex = j === cur ? 0 : -1; }); const [bd, n] = BANDS[cur]; $('#ps-rdk').textContent = cur === 3 ? 'Median band' : 'Band'; $('#ps-rdb').textContent = bd; $('#ps-rdc').textContent = n; $('#ps-rdx').textContent = EXA[bd] || (cur === 3 ? '' : ''); if (focus) bars[cur].focus(); };
    bars.forEach((b, i) => { b.addEventListener('click', () => sel(i)); b.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); sel(cur + 1, true); } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); sel(cur - 1, true); } else if (e.key === 'Home') { e.preventDefault(); sel(0, true); } else if (e.key === 'End') { e.preventDefault(); sel(10, true); } }); });
    const at = (e) => { const r = box.getBoundingClientRect(), col = getComputedStyle(box).flexDirection === 'column'; return clamp(Math.floor(((col ? e.clientY - r.top : e.clientX - r.left) / (col ? r.height : r.width)) * 11), 0, 10); };
    let down = false; wrap.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || down) { const i = at(e); if (i !== cur) sel(i); } });
    wrap.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') { down = true; sel(at(e)); } }); addEventListener('pointerup', () => { down = false; }); addEventListener('pointercancel', () => { down = false; });
    sel(3);
    // cities (optional marker, click again to clear)
    const chips = $$('.ps-chip'), rc = $('#ps-rdcity'); let cc = -1;
    const setCity = (i) => { cc = i; chips.forEach((c, j) => { c.setAttribute('aria-checked', j === i); c.tabIndex = (i < 0 ? j === 0 : j === i) ? 0 : -1; }); bars.forEach((b) => b.classList.remove('city')); if (i < 0) { rc.textContent = ''; return; } const [n, k, m] = CITY[i]; const bi = BANDS.findIndex((x) => x[0] === m); bars[bi].classList.add('city'); rc.textContent = n + ': ' + k + ' priced siding jobs, median band ' + m + '.'; };
    chips.forEach((c, i) => { c.addEventListener('click', () => setCity(cc === i ? -1 : i)); c.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0; if (!d) return; e.preventDefault(); const j = (i + d + chips.length) % chips.length; setCity(j); chips[j].focus(); }); });
    chips[0].tabIndex = 0;
    // icons for the six levers
    const LI = ['<path d="M8 40V18l16-10 16 10v22z"/><path class="a" d="M8 45h32M44 18v22"/>', '<rect x="8" y="14" width="32" height="22" rx="2"/><path class="a" d="M17 14l4 8-5 5 6 9"/>', '<path d="M6 40V16h14v24z"/><path class="a" d="M24 40V16h18v24z"/>', '<path d="M6 22l18-12 18 12"/><path class="a" d="M10 27h28v6H10z"/>', '<path d="M10 11h26v10H10z"/><path class="a" d="M36 16h6v10H24v7"/><path d="M21 33h5v10h-5z"/>', '<path d="M8 14h32M8 22h32M8 30h32"/><path class="a" d="M16 8v34M28 8v34M38 8v34"/>'];
    $$('.ps-lic').forEach((el) => { el.innerHTML = LI[+el.dataset.l]; });
  }

  /* ---------- before / after ---------- */
  function ba() {
    const st = $('#ps-ba'), D = JSON.parse(st.dataset.p), tabs = $$('.ps-tab'), hnd = $('#ps-hnd'), imA = $('.ps-after', st), imB = $('.ps-bef img', st); let pos = 50, cur = 0;
    const setP = (p) => { pos = clamp(p, 0, 100); st.style.setProperty('--p', pos + '%'); hnd.setAttribute('aria-valuenow', Math.round(pos)); hnd.setAttribute('aria-valuetext', Math.round(pos) + ' percent before'); };
    const show = (i, focus) => { cur = i; const d = D[i]; imA.src = d.a; imA.alt = d.aa; imB.src = d.b; imB.alt = d.ba; $('#ps-bap').textContent = d.place; $('#ps-bai').textContent = d.when + ' · ' + d.inst; $('#ps-babl').textContent = d.bl; $('#ps-bab').textContent = d.band; tabs.forEach((t, j) => { t.setAttribute('aria-selected', j === i); t.tabIndex = j === i ? 0 : -1; }); st.setAttribute('aria-labelledby', 'ps-tab' + i); setP(50); if (focus) tabs[i].focus(); };
    tabs.forEach((t, i) => { t.addEventListener('click', () => show(i)); t.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0; if (d) { e.preventDefault(); show((i + d + tabs.length) % tabs.length, true); } }); });
    let drag = false; const xp = (e) => { const r = st.getBoundingClientRect(); return (e.clientX - r.left) / r.width * 100; };
    st.addEventListener('pointerdown', (e) => { drag = true; try { st.setPointerCapture(e.pointerId); } catch (_) {} setP(xp(e)); });
    st.addEventListener('pointermove', (e) => { if (drag) setP(xp(e)); }); const end = () => { drag = false; }; st.addEventListener('pointerup', end); st.addEventListener('pointercancel', end);
    hnd.addEventListener('keydown', (e) => { const k = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageUp: 15, PageDown: -15 }[e.key]; if (k) { e.preventDefault(); setP(pos + k); } else if (e.key === 'Home') { e.preventDefault(); setP(0); } else if (e.key === 'End') { e.preventDefault(); setP(100); } });
    show(0);
    let ran = false; const io = new IntersectionObserver((en) => { if (en[0].isIntersecting && !ran) { ran = true; if (!RM) tween(50, 18, 700, setP, () => tween(18, 82, 1100, setP, () => tween(82, 50, 700, setP))); io.disconnect(); } }, { threshold: .5 }); io.observe(st);
  }

  /* ---------- built for Texas icons ---------- */
  function texas() {
    const IC = ['<path class="d w" d="M8 38c8-8 12 8 24 0s16 8 24 0"/><circle class="a" cx="46" cy="14" r="6"/><path class="a" d="M46 2v3M46 23v3M34 14h3M55 14h3M38 6l2 2M54 6l-2 2"/><path class="x" d="M10 54L54 10"/>',
      '<path class="d" d="M32 8c10 14 16 22 16 30a16 16 0 0 1-32 0c0-8 6-16 16-30z"/><path class="x" d="M10 54L54 10"/>',
      '<path class="d" d="M34 6c4 10 14 14 14 30a14 14 0 0 1-28 0c0-8 4-12 8-16 0 6 4 8 6 8-2-8-2-14 0-22z"/><path class="x" d="M10 54L54 10"/>',
      '<ellipse class="d" cx="32" cy="36" rx="9" ry="13"/><path d="M23 30l-10-6M23 38l-12 2M23 45l-10 8M41 30l10-6M41 38l12 2M41 45l10 8M28 24l-4-10M36 24l4-10"/><path class="x" d="M10 54L54 10"/>',
      '<circle class="d" cx="32" cy="32" r="24"/><text x="32" y="40" text-anchor="middle" font-size="22" font-weight="800" fill="#0E3B2C" stroke="none" style="font-family:var(--display)">30</text><path class="a" d="M14 56h36"/>'];
    $$('.ps-tic').forEach((el) => { el.innerHTML = IC[+el.dataset.ic]; });
  }

  /* ---------- parallax + in-view ---------- */
  function life() {
    const secs = $$('.ps-s'), bgs = secs.map((s) => [s, s.querySelector('.ps-bg')]); let tk = false;
    const par = () => { tk = false; if (P.hidden) return; const vh = innerHeight; bgs.forEach(([s, bg]) => { const r = s.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; const p = clamp((r.top + r.height / 2 - vh / 2) / (vh * .9), -1, 1), a = bg.firstElementChild, z = bg.lastElementChild; a.style.setProperty('--py', (p * -26).toFixed(1) + 'px'); if (z !== a) z.style.setProperty('--py', (p * -48).toFixed(1) + 'px'); }); };
    if (!RM) { addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(par); } }, { passive: true }); addEventListener('resize', par); document.addEventListener('fpage', par); }
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('ps-seen'); io.unobserve(x.target); } }), { threshold: .12 });
    secs.forEach((s) => (RM ? s.classList.add('ps-seen') : io.observe(s)));
  }

  function wire() { P = document.getElementById('pg-siding'); if (!P || !P.querySelector('#ps-hang')) return; hero(); lap(); dots(); bb(); gable(); trim(); layers(); cost(); ba(); texas(); life(); }
  return { wire };
})();

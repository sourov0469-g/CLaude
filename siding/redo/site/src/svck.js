/* SERVICES K — "Run the reel" (Scout Motors: film-roll evidence). Each trade is a reel of the firm's own published job
   photos; the strip runs through a fixed gate (native scroll with snap, mouse drag, arrow keys, ‹ › buttons) and the frame
   in the gate is projected above with its record and a link to the job's page. A new trade rewinds the strip. Photos
   already present at runtime are reused by reference (window.__JOBS); the rest come from window.__SVCK.emb. */
window.SvcK = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D = () => window.__SVCK || { reels: [], ph: {}, emb: {} };
  function src(r) {
    const [g, k] = r.split(':');
    if (g === 'J') return ((window.__JOBS || [])[+k] || {}).src;
    return D().emb[k];
  }
  const pad = (n) => String(n).padStart(2, '0');

  function k(s) {
    const d = D(), strip = s.querySelector('.strip'), pj = s.querySelector('.scw'), cap = s.querySelector('figcaption');
    let r = 0, f = 0;
    const frames = () => [...strip.querySelectorAll('.fr')];
    function fill() { frames().forEach((b) => { const p = d.ph[b.dataset.i]; const im = b.querySelector('img'); if (p && !im.src) im.src = src(p.r) || ''; }); }

    function project(i, anim) {
      const p = d.ph[frames()[i].dataset.i]; if (!p) return;
      // whatever is on screen (the last image) is what the new frame replaces; anything older is dropped at once
      const all = [...pj.querySelectorAll('.pj')], old = all.pop(); all.forEach((x) => x.remove());
      const im = document.createElement('img'); im.className = 'pj'; im.alt = p.alt; im.decoding = 'async'; im.src = src(p.r) || '';
      if (anim && !RM) { im.classList.add('adv'); old.after(im); const done = () => { im.classList.remove('adv'); old.isConnected && old.remove(); }; im.addEventListener('animationend', done, { once: true }); setTimeout(done, 600); }
      else old.replaceWith(im);
      cap.querySelector('.cp').textContent = p.p; cap.querySelector('.cw').textContent = `${p.w} · ${p.t}`; cap.querySelector('.jl').href = p.h;
      s.querySelector('.tc').innerHTML = `REEL <b>${pad(r + 1)}</b> · FRAME <b>${pad(i + 1)}</b>`;
      frames().forEach((b, k2) => { b.setAttribute('aria-pressed', k2 === i); b.tabIndex = k2 === i ? 0 : -1; });
      f = i;
    }
    const center = (i, smooth) => { const b = frames()[i]; if (!b) return; const li = b.parentElement; strip.scrollTo({ left: li.offsetLeft - (strip.clientWidth - li.offsetWidth) / 2, behavior: smooth && !RM ? 'smooth' : 'auto' }); };
    function select(i, focus) { i = Math.max(0, Math.min(frames().length - 1, i)); if (i !== f) project(i, true); center(i, true); if (focus) frames()[i].focus({ preventScroll: true }); }

    // the frame nearest the gate after the strip settles is the one projected
    let t = 0, lock = 0;
    const settle = () => { if (Date.now() < lock) return; const mid = strip.getBoundingClientRect().left + strip.clientWidth / 2; let best = 0, bd = 1e9;
      frames().forEach((b, i) => { const rc = b.parentElement.getBoundingClientRect(), dd = Math.abs(rc.left + rc.width / 2 - mid); if (dd < bd) { bd = dd; best = i; } }); if (best !== f) project(best, true); };
    strip.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(settle, 140); }, { passive: true });

    strip.addEventListener('click', (e) => { const b = e.target.closest('.fr'); if (b) select(frames().indexOf(b)); });
    strip.addEventListener('keydown', (e) => { const i = frames().indexOf(e.target.closest('.fr')); if (i < 0) return;
      const n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: frames().length - 1 }[e.key]; if (n === undefined) return; e.preventDefault(); select(n, true); });
    s.querySelectorAll('.go').forEach((b) => b.addEventListener('click', () => select(f + +b.dataset.go)));

    // mouse drag-to-scroll (touch and trackpads scroll natively)
    let x0 = null, sl = 0, moved = false;
    strip.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button) return; x0 = e.clientX; sl = strip.scrollLeft; moved = false; });
    addEventListener('pointermove', (e) => { if (x0 === null) return; const dx = e.clientX - x0; if (!moved && Math.abs(dx) > 5) { moved = true; strip.classList.add('drag'); } if (moved) strip.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { if (x0 === null) return; x0 = null; if (moved) { strip.classList.remove('drag'); settle(); center(f, true); } });
    strip.addEventListener('dragstart', (e) => e.preventDefault());

    // a new reel: rewind, then load the trade's frames
    function reel(k2) {
      if (k2 === r) return; const R = d.reels[k2]; r = k2;
      s.querySelectorAll('.rb').forEach((b, i) => b.setAttribute('aria-pressed', i === k2));
      lock = Date.now() + 700; strip.scrollTo({ left: 0, behavior: RM ? 'auto' : 'smooth' });
      setTimeout(() => {
        strip.innerHTML = R.f.map((i, n) => { const p = d.ph[i]; return `<li style="--k:${n}"><button type="button" class="fr" data-i="${i}" aria-pressed="${!n}" tabindex="${n ? -1 : 0}" aria-label="Frame ${n + 1}: ${p.p}, ${p.w}"><img alt="" decoding="async"><span class="ec" aria-hidden="true"><b>${pad(n + 1)}A</b> ${p.w.toUpperCase()} · ${p.p.split(',')[0].toUpperCase()}</span></button></li>`; }).join('');
        strip.setAttribute('aria-label', `Film strip: ${R.t}, ${R.f.length} frames. Arrow keys move through the frames.`);
        strip.classList.remove('swap'); void strip.offsetWidth; strip.classList.add('swap'); strip.scrollLeft = 0; fill(); f = -1; project(0, true);
        s.querySelector('.rl').innerHTML = `REEL <b>${pad(k2 + 1)}</b> · <span class="rt">${R.t.toUpperCase()}</span> · <span class="rn">${R.n}</span> DOCUMENTED JOBS · <span class="rfc">${R.f.length}</span> FRAMES`;
        s.querySelector('.cn').textContent = R.n; s.querySelector('.ctt').textContent = R.t.toLowerCase(); s.querySelector('.cf').textContent = R.f.length;
      }, RM ? 0 : 320);
    }
    s.querySelectorAll('.rb').forEach((b) => b.addEventListener('click', () => reel(+b.dataset.r)));

    fill(); const p0 = d.ph[frames()[0].dataset.i]; pj.querySelector('.pj').src = src(p0.r) || ''; center(0, false);
  }
  function wire() { const s = document.querySelector('.slot[data-slot=services] .svk'); if (s) k(s); }
  return { wire };
})();

/* HERO K — "Before | After, on the seam". MERSI's split-slider rebuilt on the firm's six documented before/after
   pairs: before on the left half, after on the right (stacked on phones). On each change the two halves wipe in
   opposite directions (clip-path inset) while the centre plate rolls the job's record in sync. No autoplay, as on
   MERSI: buttons, arrow keys on the frame, or a swipe (the halves follow the finger, rubber-banded). */
window.Hero4 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = 900, EASE = 'cubic-bezier(.77,0,.18,1)';

  function k(s) {
    const D = JSON.parse(s.dataset.k || '[]'), N = D.length; if (!N) return;
    const fr = s.querySelector('.kfr'), halves = [...s.querySelectorAll('.kh')], rec = s.querySelector('.krec'), ct = s.querySelector('.kct b'), job = s.querySelector('.kjob');
    let i = 0, busy = false;
    const stack = () => matchMedia('(max-width: 860px)').matches;
    // opposing wipes: the before half reveals one way, the after half the other; reversed when going back
    const clipFrom = (half, d) => { const before = half.classList.contains('kb'), fwd = d > 0, a = before === fwd;
      return stack() ? (a ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)') : (a ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)'); };

    function go(d, j) {
      if (busy || N < 2) return; j = j === undefined ? (i + d + N) % N : j; if (j === i) return; busy = true;
      halves.forEach((h) => { const cur = h.querySelector(`.kim[data-i="${i}"]`), nx = h.querySelector(`.kim[data-i="${j}"]`);
        nx.removeAttribute('aria-hidden'); cur.setAttribute('aria-hidden', 'true');
        if (RM) { cur.classList.remove('on'); nx.classList.add('on'); return; }
        nx.style.transition = 'none'; nx.style.clipPath = clipFrom(h, d); nx.style.transform = 'scale(1.12)'; nx.classList.add('nx');
        nx.getBoundingClientRect();
        nx.style.transition = `clip-path ${DUR}ms ${EASE}, transform ${DUR + 300}ms cubic-bezier(.2,.8,.2,1)`; nx.style.clipPath = 'inset(0 0 0 0)'; nx.style.transform = 'scale(1)';
        setTimeout(() => { cur.classList.remove('on'); nx.classList.add('on'); nx.classList.remove('nx'); nx.style.cssText = ''; }, DUR + 40); });
      // the record rolls in sync
      const old = rec.querySelector('.kr.on'), r = D[j], el = document.createElement('span');
      el.className = 'kr dn' + (d < 0 ? ' rev' : ''); el.innerHTML = `<b></b><small></small>`; el.querySelector('b').textContent = r.p; el.querySelector('small').textContent = `${r.w} · ${r.t}`;
      rec.append(el); old.setAttribute('aria-hidden', 'true');
      if (RM) { old.remove(); el.className = 'kr on'; } else { el.getBoundingClientRect(); el.classList.remove('dn', 'rev'); el.classList.add('on'); old.classList.remove('on'); old.classList.add('up'); if (d < 0) old.classList.add('rev'); setTimeout(() => old.remove(), DUR + 40); }
      ct.textContent = String(j + 1).padStart(2, '0'); if (job) job.href = r.h; i = j;
      setTimeout(() => { busy = false; }, RM ? 0 : DUR + 60);
    }

    s.querySelectorAll('.kgo').forEach((b) => b.addEventListener('click', () => go(+b.dataset.go)));
    fr.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); go(d); } });
    // swipe / drag: the halves follow the pointer (at most 28 px), a 48 px travel changes the job
    let x0 = null, y0 = 0, dx = 0, pid = 0; const sts = [...s.querySelectorAll('.kst')];
    const move = (v) => sts.forEach((t) => (t.style.transform = v ? `translateX(${v}px)` : ''));
    fr.addEventListener('pointerdown', (e) => { if (e.button) return; x0 = e.clientX; y0 = e.clientY; dx = 0; pid = e.pointerId; });
    fr.addEventListener('pointermove', (e) => { if (x0 === null || e.pointerId !== pid) return; dx = e.clientX - x0;
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(e.clientY - y0)) { fr.classList.add('drag'); try { fr.setPointerCapture(pid); } catch (_) {} if (!RM) move(Math.max(-28, Math.min(28, dx * 0.3))); } });
    const end = () => { if (x0 === null) return; x0 = null; fr.classList.remove('drag'); move(0); if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1); dx = 0; };
    fr.addEventListener('pointerup', end); fr.addEventListener('pointercancel', () => { x0 = null; dx = 0; fr.classList.remove('drag'); move(0); });
    fr.addEventListener('dragstart', (e) => e.preventDefault());
  }

  function wire() { const h = document.querySelector('.slot[data-slot=hero] .hero'); if (h && h.matches('.hkv')) k(h); }
  return { wire };
})();

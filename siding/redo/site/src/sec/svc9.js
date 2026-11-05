/* SERVICES S — "Start from the problem" (upgrade plan S-A). Reference: Ever, the chooser above and the result re-flowing beneath.
   Six tiles, one per line of the firm's own inspection list; exactly one is open at a time and carries the firm's record for it.
   The markup (photos, counts, sentences) is built in build_site.py svcS(); this file only wires the choice. Picking a tile moves it to
   the head of the grid and opens it; the others glide to their new places (FLIP, transform only). One Book link exists in the section
   and moves into whichever tile is open. Arrow keys move between tiles; reduced motion swaps without animation. */
window.Svc9 = (function () {
  function wire(root) {
    const s = root.querySelector('.svS'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tiles = [...s.querySelectorAll('.svst')], btns = tiles.map((t) => t.querySelector('.svsb')), panels = tiles.map((t) => t.querySelector('.svsp'));
    const book = s.querySelector('.svsbook'), feat = s.querySelector('.svsfeat'), row = s.querySelector('.svsrow');
    let cur = 0;
    // background drift: the two drawn layers move at different speeds while the section crosses the screen
    const far = s.querySelector('.svsfar'), near = s.querySelector('.svsnear');
    if (!RM && far && near && 'IntersectionObserver' in window) {
      let on = false, tick = false;
      const upd = () => { tick = false; const r = s.getBoundingClientRect(), p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / (innerHeight * .9)));
        far.style.setProperty('--py', (p * -24).toFixed(1) + 'px'); near.style.setProperty('--py', (p * -64).toFixed(1) + 'px'); };
      const req = () => { if (on && !tick) { tick = true; requestAnimationFrame(upd); } };
      new IntersectionObserver((es) => { on = es.some((e) => e.isIntersecting); if (on) req(); }).observe(s);
      addEventListener('scroll', req, { passive: true }); addEventListener('resize', req);
    }
    function pick(i, byKey) {
      if (i === cur) { if (byKey) btns[i].focus(); return; }
      const old = cur, first = tiles.map((t) => t.getBoundingClientRect()), hadFocus = s.contains(document.activeElement);
      tiles[old].classList.remove('open'); btns[old].setAttribute('aria-expanded', 'false'); btns[old].removeAttribute('aria-disabled'); panels[old].hidden = true;
      cur = i; tiles[i].classList.add('open'); btns[i].setAttribute('aria-expanded', 'true'); btns[i].setAttribute('aria-disabled', 'true'); panels[i].hidden = false;
      panels[i].querySelector('.svsact').appendChild(book); s.dataset.open = i;
      // the old tile goes back into the row at its own place; the new one takes the head
      row.insertBefore(tiles[old], [...row.children].find((c) => +c.dataset.i > old && c !== tiles[i]) || null); feat.appendChild(tiles[i]);
      if (hadFocus || byKey) btns[i].focus({ preventScroll: true });
      const last = tiles.map((t) => t.getBoundingClientRect());
      if (!RM && tiles[0].animate) {
        const ease = 'cubic-bezier(.2,.8,.2,1)';
        tiles.forEach((t, k) => { const dx = first[k].left - last[k].left, dy = first[k].top - last[k].top;
          if (k === i) t.animate([{ opacity: .0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: ease });
          else if (dx || dy) t.animate(k === old ? [{ opacity: .0, transform: `translate(${dx}px,${dy}px)` }, { opacity: 1, transform: 'none' }] : [{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 440, easing: ease }); });
      }
      const top = tiles[i].getBoundingClientRect().top; if (top < 90) scrollBy({ top: top - 100, behavior: RM ? 'auto' : 'smooth' });
    }
    btns.forEach((b, k) => b.addEventListener('click', () => pick(k, false)));
    // arrow keys move between the six tiles (reading order of the page: the open one first, then the rest)
    s.addEventListener('keydown', (e) => { const b = e.target.closest && e.target.closest('.svsb'); if (!b) return;
      const order = [cur, ...tiles.map((_, k) => k).filter((k) => k !== cur)], at = order.indexOf(btns.indexOf(b)); let n = at;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (at + 1) % order.length; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (at + order.length - 1) % order.length;
      else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = order.length - 1; else return;
      e.preventDefault(); btns[order[n]].focus(); });
  }
  return { wire };
})();

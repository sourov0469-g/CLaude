/* HERO L — "In their own colours" (Cash App Brand Guidelines: colour as content). Eight documented jobs from the
   project finder's photo cards, newest first, each a full-height field of the colour of its work (sampled by
   tools/hl_sample.py). A field is a button: opening it widens it into the job's photo (taken from window.__JOBS at
   runtime, never embedded twice). One open at a time; roving arrows, Home/End, Escape. Not a configurator. */
window.Hero5 = (function () {
  function l(h) {
    if (h.dataset.w) return; h.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, J = window.__JOBS || [];
    const bd = h.querySelector('.lbd'), fs = [...h.querySelectorAll('.lf')], bs = fs.map((f) => f.querySelector('.lbt'));
    const vert = () => matchMedia('(max-width:1000px)').matches;
    const fill = (f) => { const im = f.querySelector('.lim'); if (!im.src) { const j = J[+f.dataset.j]; if (j && j.src) im.src = j.src; } im.hidden = false; };
    function set(k, focus) {
      fs.forEach((f, i) => { const on = i === k; f.classList.toggle('lop', on); bs[i].setAttribute('aria-expanded', on);
        f.querySelector('.lpn').hidden = !on; if (on) fill(f);
        const t = bs[i].querySelector('.vh'); t.textContent = t.textContent.replace(/ (Show|Hide) the photo\.$/, on ? ' Hide the photo.' : ' Show the photo.'); });
      bd.classList.toggle('lop', k >= 0); if (focus && k >= 0) bs[k].focus();
    }
    const rove = (i) => { bs.forEach((b, k) => { b.tabIndex = k === i ? 0 : -1; }); bs[i].focus(); };
    bs.forEach((b, i) => {
      b.addEventListener('click', () => { rove(i); set(fs[i].classList.contains('lop') ? -1 : i); });
      b.addEventListener('keydown', (e) => {
        const v = vert(), d = { ArrowRight: v ? 0 : 1, ArrowLeft: v ? 0 : -1, ArrowDown: v ? 1 : 0, ArrowUp: v ? -1 : 0 }[e.key];
        if (d) { e.preventDefault(); const n = (i + d + bs.length) % bs.length; rove(n); if (bd.classList.contains('lop')) set(n); }
        else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); const n = e.key === 'Home' ? 0 : bs.length - 1; rove(n); if (bd.classList.contains('lop')) set(n); }
        else if (e.key === 'Escape' && bd.classList.contains('lop')) { e.preventDefault(); set(-1); b.focus(); }
      });
    });
    // arrival: the fields rise into place left to right, 70 ms apart, once
    if (RM) h.classList.add('lgo'); else requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add('lgo')));
  }
  function wire() { const h = document.querySelector('.slot[data-slot=hero] .hero'); if (h && h.matches('.hlv')) l(h); }
  return { wire };
})();

/* The phone menu. The bar's Menu button (href="#menu") opens a sheet of the page's own sections; Escape, the backdrop, the close button or choosing a link closes it, and focus goes back. */
window.FNav = (function () {
  function init() {
    if (window.__nv) return; const btn = document.querySelector('.mbar a[href="#menu"]'); if (!btn) return;
    const ar = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    const L = [['#siding', 'Siding', '431 jobs'], ['#windows', 'Windows', '388 jobs'], ['#roofing', 'Roofing', 'GAF Master Elite'], ['#colours', 'Try a colour', 'on a real house'], ['#reviews', 'Reviews', '4.9 from 474'], ['#process', 'How it works', 'four steps'], ['#area', 'Our work', 'on your street'], ['#booking', 'Call or write', 'free inspection']];
    const el = document.createElement('div'); el.className = 'nv'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Menu'); el.hidden = false;
    el.innerHTML = `<div class="nv-bd"></div><div class="nv-sh"><div class="nv-hd"><b>Menu</b><button type="button" class="nv-x" aria-label="Close the menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><ul class="nv-l">${L.map(([h, n, s]) => `<li><a href="${h}">${n}<span>${s}</span>${ar}</a></li>`).join('')}</ul><div class="nv-c"><a class="call" href="tel:+15125500000"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>Call</a><a class="mail" href="mailto:info@austinprosiding.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>Email</a></div></div>`;
    document.body.append(el); window.__nv = el; const x = el.querySelector('.nv-x');
    const open = () => { el.classList.add('on'); btn.setAttribute('aria-expanded', 'true'); document.documentElement.style.overflow = 'hidden'; setTimeout(() => x.focus(), 30); };
    const close = (back) => { el.classList.remove('on'); btn.setAttribute('aria-expanded', 'false'); document.documentElement.style.overflow = ''; if (back) btn.focus(); };
    btn.setAttribute('role', 'button'); btn.setAttribute('aria-haspopup', 'dialog'); btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', (e) => { e.preventDefault(); el.classList.contains('on') ? close(true) : open(); });
    el.querySelector('.nv-bd').addEventListener('click', () => close(true)); x.addEventListener('click', () => close(true));
    el.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => close(false)));
    el.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(true); if (e.key === 'Tab') { const f = [...el.querySelectorAll('a,button')]; const i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } } });
    addEventListener('resize', () => { if (innerWidth > 860 && el.classList.contains('on')) close(false); });
  }
  return { init };
})();

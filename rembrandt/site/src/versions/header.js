import { def, d, H, $, $$, E, calm, small, R, clamp, kick } from './registry.js';
import { ORDER } from './order.js';

// ---------- S0 V2 "Chapter rail": numeral swap (240ms, --ease-out) + page progress line (scaleY)
def('header', 2, {
  init(sec) {
    const num = $('[data-rail-num]', sec), prog = $('[data-rail-prog]', sec), box = num.parentElement; let curN = 1;
    this.sub = () => {
      if (!sec.isConnected || !H.classList.contains('rail-on') || innerWidth < 1024) return false;
      const P = clamp(scrollY / Math.max(1, d.documentElement.scrollHeight - innerHeight), 0, 1);
      prog.style.transform = `scaleY(${P.toFixed(4)})`;
      const y = innerHeight * 0.4; let n = curN;
      ORDER.forEach((k, i) => { if (k === 'header') return; const s = k === 'footer' ? $('.ftr') : $(`section[data-chapter="${k}"]`); if (!s) return; const r = R(s); if (r.top <= y && r.bottom > y) n = i + 1; });
      if (n !== curN) {
        const old = num, nu = old.cloneNode(); nu.textContent = String(n).padStart(2, '0'); box.append(nu);
        if (calm()) old.remove(); else {
          old.animate([{ transform: 'none' }, { transform: 'translateY(-100%)' }], { duration: 240, easing: E.out, fill: 'forwards' }).onfinish = () => old.remove();
          nu.animate([{ transform: 'translateY(100%)' }, { transform: 'none' }], { duration: 240, easing: E.out });
        }
        curN = n; this.num = nu;
      }
      return false;
    };
    window.RR.subs.push((...a) => this.sub(...a));
  },
  on() { H.classList.add('rail-on'); window.RR.refresh(); },
  off() { H.classList.remove('rail-on'); }
});

// ---------- S0 V3 "Sign-painter overlay": circle of lamplight from the Menu button (700ms open, 450ms close), lines rise .06
def('header', 3, {
  init(sec) {
    const sheet = $('[data-signsheet]', sec), btn = $('[data-signmenu]', sec), main = $('#main');
    d.body.append(sheet); this.sheet = sheet; // fixed overlay must not live inside the transformed header
    const items = $$('li', sheet);
    const open = () => {
      const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      sheet.hidden = false; btn.setAttribute('aria-expanded', 'true'); main.inert = true; d.documentElement.style.overflow = 'hidden';
      if (!calm()) {
        sheet.animate([{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(150% at ${x}px ${y}px)` }], { duration: small() ? 560 : 700, easing: E.move });
        items.forEach((li, i) => li.animate([{ transform: 'translateY(40%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 600, delay: 160 + i * 60, easing: E.out, fill: 'backwards' }));
      }
      $('a', sheet).focus({ preventScroll: true });
    };
    const close = () => {
      if (sheet.hidden) return;
      const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      const done = () => { sheet.hidden = true; main.inert = false; d.documentElement.style.overflow = ''; btn.setAttribute('aria-expanded', 'false'); btn.focus({ preventScroll: true }); };
      if (calm()) return done();
      sheet.animate([{ clipPath: `circle(150% at ${x}px ${y}px)` }, { clipPath: `circle(0px at ${x}px ${y}px)` }], { duration: 450, easing: E.move }).onfinish = done;
    };
    this.close = close;
    btn.addEventListener('click', open);
    $('[data-signclose]', sheet).addEventListener('click', close);
    sheet.addEventListener('click', e => { if (e.target.closest('nav a')) close(); });
    sheet.addEventListener('keydown', e => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return; const f = $$('a,button', sheet), a = f[0], z = f[f.length - 1];
      if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
    });
  },
  off() { if (this.close && this.sheet && !this.sheet.hidden) { this.sheet.hidden = true; $('#main').inert = false; d.documentElement.style.overflow = ''; } }
});

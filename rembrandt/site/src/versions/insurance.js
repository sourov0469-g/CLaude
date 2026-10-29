import { def, d, $, $$, E, calm } from './registry.js';
const RR = window.RR;
// ---------- S12 V2 "The adjuster's checklist": ticks kept in localStorage; the box draws its check (200ms), the line strikes through (160ms); print + sms
def('insurance', 2, {
  init(sec) {
    const boxes = $$('[data-adj] input', sec); let saved = {}; try { saved = JSON.parse(localStorage.getItem('rr-claim') || '{}'); } catch (e) {}
    const sms = $('[data-adj-sms]', sec);
    const sync = () => {
      const st = {}; boxes.forEach(b => { st[b.value] = b.checked; b.closest('li').classList.toggle('done', b.checked); }); try { localStorage.setItem('rr-claim', JSON.stringify(st)); } catch (e) {}
      const lines = boxes.map(b => `${b.checked ? '[x]' : '[ ]'} ${b.closest('label').querySelector('span').childNodes[0].textContent.trim()}`);
      sms.href = 'sms:?&body=' + encodeURIComponent('Adjuster checklist (Rembrandt Roofing, (937) 746-7377):\n' + lines.join('\n'));
    };
    boxes.forEach(b => { b.checked = !!saved[b.value]; b.addEventListener('change', sync); });
    sync();
    $('[data-adj-print]', sec).addEventListener('click', () => { d.documentElement.classList.add('print-checklist'); window.print(); setTimeout(() => d.documentElement.classList.remove('print-checklist'), 500); });
  }
});
// ---------- S12 V3 "Your questions, answered by the office": one answer at a time, panel 400ms --ease-surface
def('insurance', 3, {
  init(sec) {
    const qs = $$('.oq-list button', sec), hint = $('[data-oq-hint]', sec);
    qs.forEach(q => q.addEventListener('click', () => {
      qs.forEach(o => { const on = o === q && o.getAttribute('aria-expanded') !== 'true'; o.setAttribute('aria-expanded', String(on)); const p = d.getElementById(o.getAttribute('aria-controls')); p.hidden = !on;
        if (on && !calm()) p.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: E.surface }); });
      hint.hidden = qs.some(o => o.getAttribute('aria-expanded') === 'true');
    }));
  }
});

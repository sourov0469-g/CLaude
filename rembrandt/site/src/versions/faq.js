import { def, d, $, $$, E, calm } from './registry.js';
// S13 V2: native <details>, grouped by the five hero situations (no-JS safe once shown).
def('faq', 2, { init() {} });
// S13 V3 "Find it by the picture": single-open, the answer opens beneath (300ms height)
def('faq', 3, {
  init(sec) {
    const bs = $$('[data-pics] button', sec);
    bs.forEach(b => b.addEventListener('click', () => {
      bs.forEach(o => { const on = o === b && o.getAttribute('aria-expanded') !== 'true'; o.setAttribute('aria-expanded', String(on)); const p = d.getElementById(o.getAttribute('aria-controls'));
        if (on) { p.hidden = false; if (!calm()) { const h = p.scrollHeight; p.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 300, easing: E.surface }); } } else p.hidden = true; });
    }));
  }
});

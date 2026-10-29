// Storm mode (PLAN §3.12): the page re-composes itself for an emergency, using the switcher machinery.
// Triggers: the "A storm came through" / "It's leaking" chips, an active NWS warning banner, or ?storm=1.
const RR = window.RR, { d, H, $, $$, P, calm, E, track } = RR;
export function stormMode({ swap, cur, sectionOf, templates }) {
  let on = false, prev = {}, panel = null, declined = false;
  try { declined = sessionStorage.getItem('rr-storm') === 'off'; } catch (e) {}
  async function enter(why) {
    if (on) return; on = true; H.classList.add('storm-mode');
    try { sessionStorage.setItem('rr-storm', 'on'); } catch (e) {}
    prev = { storm: cur.storm, faq: cur.faq };
    await swap('storm', 's', { silent: true, keep: false });
    await swap('faq', 3, { silent: true, keep: false });
    const hero = sectionOf('hero'), tpl = (await templates()).getElementById('tpl-nexthour');
    panel = d.importNode(tpl.content, true).firstElementChild; hero.after(panel);
    let ticks = {}; try { ticks = JSON.parse(sessionStorage.getItem('rr-nexthour') || '{}'); } catch (e) {}
    $$('[data-nh] input', panel).forEach(c => { c.checked = !!ticks[c.value]; c.closest('li').classList.toggle('done', c.checked);
      c.addEventListener('change', () => { ticks[c.value] = c.checked; c.closest('li').classList.toggle('done', c.checked); try { sessionStorage.setItem('rr-nexthour', JSON.stringify(ticks)); } catch (e) {} }); });
    const o = RR.office(); $('[data-nh-office]', panel).textContent = o.open ? 'We\'re in until 5 today. Call now, or text the photos and we\'ll call you back.' : `We're closed now. Text us; we'll call you ${RR.nextOpenPhrase(o)}.`;
    $('[data-storm-exit]', panel).addEventListener('click', exit);
    RR.syncSms(); RR.refresh();
    if (!calm()) panel.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: E.out });
    const u = new URL(location.href); u.searchParams.set('storm', '1'); history.replaceState(history.state, '', u.pathname + u.search.replace(/%3A/gi, ':').replace(/%2C/gi, ',') + u.hash);
    track('storm_mode', { why });
  }
  async function exit() {
    if (!on) return; on = false; H.classList.remove('storm-mode');
    try { sessionStorage.setItem('rr-storm', 'off'); } catch (e) {}
    const top = panel ? panel.getBoundingClientRect().top : 0;
    panel && panel.remove(); panel = null;
    await swap('storm', prev.storm || 1, { silent: true, keep: false });
    await swap('faq', prev.faq || 1, { silent: true, keep: false });
    const u = new URL(location.href); u.searchParams.delete('storm'); history.replaceState(history.state, '', u.pathname + u.search.replace(/%3A/gi, ':').replace(/%2C/gi, ',') + u.hash);
    sectionOf('storm')?.scrollIntoView({ block: 'start' }); RR.refresh();
    track('storm_mode_exit');
  }
  d.addEventListener('change', e => { const i = e.target; if (i.matches && i.matches('[data-chips] input') && (i.value === 'storm' || i.value === 'leak')) enter('chip'); });
  const banner = $('[data-storm-banner]');
  if (banner) new MutationObserver(() => { if (!banner.hidden && !declined) enter('nws'); }).observe(banner, { attributes: true, attributeFilter: ['hidden'] });
  if (P.get('storm') === '1') enter('url');
  else { try { if (sessionStorage.getItem('rr-storm') === 'on') enter('session'); } catch (e) {} }
  RR.storm = { enter, exit };
}

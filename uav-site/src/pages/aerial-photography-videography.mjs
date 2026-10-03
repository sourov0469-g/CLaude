import { site, services, img, arrow, faqSection, cta, serviceLd, crumbLd, faqLd } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { phero, btn, related, iconCards, secHead } from '../lib/blocks.mjs';

const s = services[4];
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Photography & video', path: s.path }];

const uses = [
  { key: 'photo-site', pos: '50% 50%', title: 'Site overview', text: 'High-level imagery that shows the layout and wider context of a site quickly.' },
  { key: 'photo-comms', pos: '50% 28%', title: 'Project communication', text: 'Stills or video clips for updates, reports and stakeholder communication.' },
  { key: 'photo-property', pos: '50% 50%', title: 'Property and assets', text: 'Aerial views of buildings, roofs, land or infrastructure that a ground-level photograph cannot show.' }
];

const faqs = [
  { q: 'Do you provide aerial photography and video?', a: 'Yes. We provide aerial photography and videography. Tell us whether the priority is project communication, property or site imagery, or presentation media.' },
  { q: 'What should I tell you about the shoot?', a: 'The site, what the imagery is for, the viewpoints you have in mind and whether you need stills, video or both. You do not need to choose a technical method first.' },
  { q: 'Where do you work?', a: 'We are based in Macclesfield and work across Cheshire. If your site is further afield, send us the location and we will tell you whether we can help.' }
];

export default function page() {
  const stage = uses
    .map((u, i) => `<div class="slide${i === 0 ? ' is-active' : ''}" id="ps-${i}" role="tabpanel" aria-labelledby="pt-${i}">${img(u.key, { pos: u.pos })}<div class="slide-cap"><b>${u.title}</b></div></div>`)
    .join('');
  const tabs = uses
    .map((u, i) => `<button class="tab" type="button" role="tab" id="pt-${i}" aria-controls="ps-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="t-n">0${i + 1}</span><span class="t-t">${u.title}</span><span class="t-d">${u.text}</span></button>`)
    .join('');

  const hero = phero({
    items: crumbs,
    kicker: 'Drone service &middot; Photography &amp; video',
    title: 'Show the site clearly from above.',
    lead: 'Aerial photography and video for projects, property and site presentation, planned around a clear brief.',
    actions: btn('/contact/?service=aerial-photography-videography', 'Discuss aerial media') + btn('#uses', 'Typical uses', 'ghost'),
    media: `<div class="duo"><div class="frame bracket frame--43">${img('photo-hero', { eager: true, priority: true, pos: '50% 55%' })}</div><div class="inset">${img('photo-inset', { eager: true, pos: '50% 50%' })}</div></div>`
  });

  const body = `${hero}

<section class="sec sec--warm2" id="uses" aria-labelledby="use-h"><span class="seam"></span><div class="wrap">
${secHead('Typical uses', 'Clear aerial imagery, shaped around how it will be used.', 'Aerial photography and video are agreed around the job, so the final material fits the project.', 'use-h')}
<div class="viewer viewer--side" data-viewer data-reveal>
<div class="stage bracket bracket--light"><div class="stage-slides" style="--ar:4/3">${stage}</div><span class="stage-count" aria-hidden="true">01 / 03</span><div class="stage-nav"><button type="button" data-prev aria-label="Previous image">${icon.prev}</button><button type="button" data-next aria-label="Next image">${icon.next}</button></div></div>
<div class="tabs" role="tablist" aria-label="Typical uses of aerial photography and video" aria-orientation="vertical">${tabs}</div>
<p class="viewer-live sr-only" aria-live="polite"></p>
</div>
<p class="note" style="margin-top:24px" data-reveal>Stock photography illustrates typical subjects and viewpoints.</p>
</div></section>

<section class="sec sec--dark" id="brief" aria-labelledby="brief-h"><span class="seam"></span><div class="wrap split split--top">
<div data-reveal><p class="kicker">The brief comes first</p><h2 class="h2" id="brief-h">Useful imagery starts with the intended use.</h2><p class="lead" style="margin-top:20px">Agree whether the priority is a wide site overview, specific assets, progress communication or presentation material before capture begins.</p></div>
<dl class="spec" data-reveal style="--d:80ms"><div><dt>Purpose</dt><dd>What is the imagery for: evidence, communication, presentation or a mix?</dd></div><div><dt>Viewpoints</dt><dd>Which angles, assets or areas need to be visible?</dd></div><div><dt>Format</dt><dd>Stills, video clips or both?</dd></div><div><dt>Context</dt><dd>Enough of the surroundings for the viewer to understand the site.</dd></div></dl>
</div></section>

<section class="sec sec--paper" id="formats" aria-labelledby="fmt-h"><span class="seam"></span><div class="wrap">
${secHead('Formats', 'Stills, video or both.', 'Tell us which fits the job and we will plan the shot list around it.', 'fmt-h')}
${iconCards([
  { icon: 'camera', title: 'Aerial stills', text: 'Photographs from the agreed viewpoints, for reports and presentations.' },
  { icon: 'video', title: 'Video clips', text: 'Aerial video clips flown to an agreed shot list, for updates and presentation.' },
  { icon: 'layers', title: 'Both', text: 'A combined set when the project needs photographs and video from the same visit.' }
], { cols: 3 })}
</div></section>

${faqSection({ id: 'faq', title: 'Photography and video questions, answered.', lead: 'If you know the site and what the imagery is for, that is enough to start.', items: faqs, bg: 'warm' })}

${related('aerial-photography-videography', ['roof-inspections', 'aerial-monitoring', 'rtk-mapping'], { title: 'More from the same project.', lead: 'Photography and video can sit alongside inspection, monitoring or mapping.' })}

${cta({ title: 'Need professional aerial photography or video?', text: 'Tell us the priority: project communication, property or site imagery, or presentation media. We will reply with a free quote.', query: 'aerial-photography-videography' })}`;

  return {
    path: s.path,
    title: 'Aerial photography & video in Cheshire | UAV Aerial Solutions',
    description: 'Aerial photography and video for project communication, property and site presentation across Cheshire. UAV Aerial Solutions, Macclesfield. Free quotes.',
    jsonld: [serviceLd(s, 'Aerial photography and videography for project communication, and property and site presentation.'), crumbLd(crumbs), faqLd(faqs)],
    body
  };
}

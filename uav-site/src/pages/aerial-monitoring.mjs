import { site, services, img, arrow, faqSection, cta, serviceLd, crumbLd, faqLd } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { phero, btn, related, iconCards, steps, secHead } from '../lib/blocks.mjs';

const s = services[3];
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Aerial monitoring', path: s.path }];

const visits = [
  { key: 'mon-1', pos: '50% 55%', label: 'Site clearance', text: 'The starting point: the plot cleared and ready for groundworks.' },
  { key: 'mon-2', pos: '55% 50%', label: 'Excavation', text: 'Groundworks under way, with the structure beginning to take shape.' },
  { key: 'mon-3', pos: '50% 92%', label: 'Structure begins', text: 'Foundations set and the first concrete frame going up.' },
  { key: 'mon-4', pos: '50% 55%', label: 'Frame rising', text: 'The frame rising floor by floor beside the cranes.' },
  { key: 'mon-5', pos: '50% 40%', label: 'Complete', text: 'The finished building, ready to record as completed work.' }
];

const faqs = [
  { q: 'Can you monitor construction or project progress?', a: 'Yes. We provide repeat aerial capture for construction and project-progress monitoring, giving you a consistent visual record as the site changes over time.' },
  { q: 'How often can you capture a site?', a: 'We agree the interval with you, based on what the project needs and what is practical for the site.' },
  { q: 'What do I need to tell you to get started?', a: 'The site, how often you would want capture and how you plan to use the record. You do not need to choose a technical method first.' }
];

export default function page() {
  const stage = visits
    .map((v, i) => `<div class="slide${i === 0 ? ' is-active' : ''}" id="vs-${i}" role="tabpanel" aria-labelledby="vt-${i}">${img(v.key, { pos: v.pos, eager: i === 0 })}<div class="slide-cap"><b>Visit ${i + 1}: ${v.label}</b>${v.text}</div></div>`)
    .join('');
  const tabs = visits
    .map((v, i) => `<button class="visit" type="button" role="tab" id="vt-${i}" aria-controls="vs-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">Visit ${i + 1}<span>${v.label}</span></button>`)
    .join('');
  const viewer = `<div class="viewer" data-viewer>
<div class="stage bracket bracket--light"><div class="stage-slides" style="--ar:4/3">${stage}</div><span class="stage-count" aria-hidden="true">01 / 05</span><div class="stage-nav"><button type="button" data-prev aria-label="Previous visit">${icon.prev}</button><button type="button" data-next aria-label="Next visit">${icon.next}</button></div></div>
<div class="visits" role="tablist" aria-label="Example sequence of five visits">${tabs}</div>
<p class="viewer-live sr-only" aria-live="polite"></p>
<p class="note">Stock photography shows typical stages. On a real project every visit is flown from the same agreed viewpoints.</p>
</div>`;

  const hero = phero({
    items: crumbs,
    kicker: 'Drone service &middot; Aerial monitoring',
    title: 'Keep the project visible as it changes.',
    lead: 'Repeat aerial capture from agreed viewpoints gives you a consistent visual record of progress, condition and completed work.',
    actions: btn('/contact/?service=aerial-monitoring', 'Discuss monitoring') + btn('#capture', 'How repeat capture works', 'ghost'),
    media: viewer
  });

  const body = `${hero}

<section class="sec sec--warm2" id="uses" aria-labelledby="use-h"><span class="seam"></span><div class="wrap">
${secHead('Use cases', 'Evidence first, presentation second.', 'The same flights can serve different purposes. The priority is agreed before capture.', 'use-h')}
${iconCards([
  { icon: 'build', title: 'Construction progress', text: 'Repeat aerial views that help teams see how a site is changing.' },
  { icon: 'clock', title: 'Maintenance record', text: 'A dated visual history of a roof, structure or site.' },
  { icon: 'check', title: 'Condition and completed work', text: 'A consistent record of condition, access and completed work.' },
  { icon: 'users', title: 'Stakeholder updates', text: 'Repeatable aerial views that make progress easy to review and discuss.' }
])}
</div></section>

<section class="sec sec--dark" id="capture" aria-labelledby="cap-h"><span class="seam"></span><div class="wrap">
${secHead('Repeatable capture', 'Progress is easier to review when each visit matches the last.', 'Agree the viewpoints, coverage and timing so every capture can be compared with the one before.', 'cap-h')}
${steps([
  { title: 'Cadence', text: 'Agree how often capture is useful for the project.' },
  { title: 'Coverage', text: 'Keep the core site or work area consistent between visits.' },
  { title: 'Record', text: 'Build a visual sequence that shows development over time.' },
  { title: 'Handover', text: 'Deliver each visit organised around the same viewpoints and coverage.' }
], { row: true, cols: 4 })}
</div></section>

${faqSection({ id: 'faq', title: 'Monitoring questions, answered.', lead: 'If you know the site and how often you need to see it, that is enough to start.', items: faqs, bg: 'paper' })}

${related('aerial-monitoring', ['rtk-mapping', 'roof-inspections', 'aerial-photography-videography'], { title: 'Services that suit a long-running site.', lead: 'Maps, roof inspections and aerial media often sit alongside repeat monitoring.' })}

${cta({ title: 'Need a repeatable visual record?', text: 'Tell us the site, how often you would want capture and how you plan to use the record. We will reply with a free quote.', query: 'aerial-monitoring' })}`;

  return {
    path: s.path,
    title: 'Drone progress monitoring in Cheshire | UAV Aerial Solutions',
    description: 'Repeat aerial capture for construction progress, maintenance records and stakeholder updates. UAV Aerial Solutions, Macclesfield, Cheshire. Free quotes.',
    jsonld: [serviceLd(s, 'Repeat aerial capture from agreed viewpoints for construction progress, maintenance records and stakeholder updates.'), crumbLd(crumbs), faqLd(faqs)],
    body
  };
}

import { site, services, img, arrow, faqSection, cta, serviceLd, crumbLd, faqLd, stock } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { phero, btn, related, iconCards, steps, secHead } from '../lib/blocks.mjs';

const s = services[0];
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Roof inspections', path: s.path }];

const slides = [
  { key: 'roof-g-coverings', pos: '50% 50%', title: 'Roof coverings', text: 'Surface condition across the roof: sheeting, membranes, staining and standing water.' },
  { key: 'roof-g-junctions', pos: '50% 45%', title: 'Junctions and upstands', text: 'Where the covering meets walls, upstands and flashings.' },
  { key: 'roof-g-drainage', pos: '50% 50%', title: 'Drainage', text: 'Outlets, gutters and falls, including debris and standing water around them.' },
  { key: 'roof-g-hard', pos: '50% 50%', title: 'Hard-to-reach areas', text: 'Pipework, roof-edge details and areas behind plant, photographed from the air to reduce the need for direct access.' }
];

const faqs = [
  { q: 'What will I receive?', a: 'Detailed photographs of the roof areas covered by your brief, as image files ready to use or pass on.' },
  { q: 'Does a drone inspection replace a roofing survey?', a: 'No. It gives you clear visual evidence and can reduce the need for close access, but where a specialist roofing, structural or engineering assessment is needed, the imagery supports that work rather than replacing it.' },
  { q: 'Do you inspect commercial and residential roofs?', a: 'Yes, both. Tell us the property type, the location and what you need to understand when you request a quote.' },
  { q: 'What should I include in my enquiry?', a: 'The roof&rsquo;s location, the type of property, any areas of concern and how you plan to use the images. You do not need to choose a technical method first.' }
];

export default function page() {
  const stage = slides
    .map((x, i) => `<div class="slide${i === 0 ? ' is-active' : ''}" id="rs-${i}" role="tabpanel" aria-labelledby="rt-${i}">${img(x.key, { pos: x.pos })}<div class="slide-cap"><b>${x.title}</b></div></div>`)
    .join('');
  const tabs = slides
    .map((x, i) => `<button class="tab" type="button" role="tab" id="rt-${i}" aria-controls="rs-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="t-n">0${i + 1}</span><span class="t-t">${x.title}</span><span class="t-d">${x.text}</span></button>`)
    .join('');

  const hero = phero({
    scene: 'scan',
    items: crumbs,
    kicker: 'Drone service &middot; Roof inspections',
    title: 'See the roof without the climb.',
    lead: 'Detailed aerial imagery of commercial and residential roofs: coverings, junctions, drainage and the areas that are hard to reach safely.',
    actions: btn('/contact/?service=roof-inspection', 'Request a roof inspection') + btn('#imagery', 'See what the imagery shows', 'ghost'),
    media: `<div class="frame bracket frame--43">${img('roof-hero', { eager: true, priority: true, pos: '50% 50%', layer: 'model', sizes: '(max-width:999px) 100vw, 52vw' })}</div>`,
    strip: ['Commercial and residential roofs', 'Macclesfield and Cheshire', 'Free quote']
  });

  const body = `${hero}

<section class="sec sec--warm2" id="imagery" aria-labelledby="img-h"><span class="seam"></span><div class="wrap">
${secHead('What the imagery shows', 'The parts of a roof that are hard to see from the ground.', 'Each inspection is tied to a question: a suspected defect, a maintenance review or a record of roof condition.', 'img-h')}
<div class="viewer viewer--side" data-viewer data-reveal>
<div class="stage bracket bracket--light"><div class="stage-slides" style="--ar:4/3">${stage}</div><span class="stage-count" aria-hidden="true">01 / 04</span><div class="stage-nav"><button type="button" data-prev aria-label="Previous image">${icon.prev}</button><button type="button" data-next aria-label="Next image">${icon.next}</button></div></div>
<div class="tabs" role="tablist" aria-label="What the imagery shows" aria-orientation="vertical">${tabs}</div>
<p class="viewer-live sr-only" aria-live="polite"></p>
</div>
</div></section>

<section class="sec sec--paper" id="receive" aria-labelledby="rec-h"><span class="seam"></span><div class="wrap">
${secHead('What you receive', 'Visual evidence for the next maintenance decision.', 'The imagery is tied to the roof areas and details you need to see, so it can feed a practical next step.', 'rec-h')}
${iconCards([
  { icon: 'eye', title: 'Agreed coverage', text: 'We confirm the roof areas and details that need to be visible before the flight.' },
  { icon: 'camera', title: 'Detailed photographs', text: 'Clear aerial photographs of those areas, including parts that are awkward to reach.' },
  { icon: 'file', title: 'Ready-to-use files', text: 'The image files, ready to use or pass on.' },
  { icon: 'check', title: 'Next steps', text: 'Use the images for maintenance planning, contractor briefing or a specialist survey.' }
])}
<p class="note" style="margin-top:32px;max-width:70ch" data-reveal>Drone imagery is a visual record. It supports, rather than replaces, a specialist roofing or structural assessment where one is needed.</p>
</div></section>

<section class="sec sec--warm" id="suitable" aria-labelledby="suit-h"><span class="seam"></span><div class="wrap">
${secHead('Suitable briefs', 'Commercial and residential roofs.', 'We inspect both. The approach is the same: agree what must be seen, then capture it.', 'suit-h')}
<div class="cards cards--2">
<article class="card" data-reveal><div class="card-media">${img('roof-commercial', { pos: '50% 50%' })}${stock}</div><div class="card-body"><span class="card-num">Commercial</span><h3 class="h3">Large and complex roofs</h3><p>Big roof areas, plant and multi-building sites. We currently support roof maintenance across a campus of more than 100 buildings for a Cheshire pharmaceutical client.</p><a class="tlink card-link" href="/contact/?service=roof-inspection">Discuss a commercial roof ${arrow}</a></div></article>
<article class="card" data-reveal style="--d:80ms"><div class="card-media">${img('roof-residential', { pos: '50% 50%' })}${stock}</div><div class="card-body"><span class="card-num">Residential</span><h3 class="h3">Houses and smaller buildings</h3><p>Pitched and flat roofs seen from above, so you can see the whole roof before deciding on repairs.</p><a class="tlink card-link" href="/contact/?service=roof-inspection">Discuss a home roof ${arrow}</a></div></article>
</div>
</div></section>

<section class="sec sec--dark" id="how" aria-labelledby="how-h"><span class="seam"></span><div class="wrap">
${secHead('How an inspection runs', 'Agree it, fly it, check it, hand it over.', 'The same sequence on every roof, whatever the size.', 'how-h')}
${steps([
  { title: 'Brief', text: 'The roof, the question and any areas of concern.' },
  { title: 'Fly', text: 'Capture the agreed areas methodically.' },
  { title: 'Check', text: 'Review the images against the brief.' },
  { title: 'Deliver', text: 'Hand over the image files.' }
], { row: true, cols: 4 })}
<a class="tlink" href="/process-deliverables/" style="margin-top:44px">See the full process ${arrow}</a>
</div></section>

${faqSection({ id: 'faq', title: 'Roof inspection questions, answered.', lead: 'If you know the roof and the question, that is enough to start.', items: faqs, bg: 'paper' })}

${related('roof-inspections', ['rtk-mapping', '3d-modelling', 'aerial-monitoring'])}

${cta({ title: 'Need a clearer view of a roof?', text: 'Tell us the site, what you need to understand and how you plan to use the result. We will reply with a free quote.', query: 'roof-inspection' })}`;

  return {
    path: s.path,
    title: 'Drone roof inspections in Cheshire | UAV Aerial Solutions',
    description: 'Detailed drone imagery of commercial and residential roofs, including hard-to-reach areas. Free quotes from UAV Aerial Solutions in Macclesfield, Cheshire.',
    jsonld: [serviceLd(s, 'Detailed aerial imagery of commercial and residential roofs, including hard-to-reach areas, to support maintenance decisions.'), crumbLd(crumbs), faqLd(faqs)],
    body
  };
}

import { site, services, img, arrow, faqSection, cta, crumbLd, faqLd, businessLd } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { phero, btn, steps, secHead, iconCards } from '../lib/blocks.mjs';

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Process & deliverables', path: '/process-deliverables/' }];

const faqs = [
  { q: 'What will I receive at the end?', a: 'The files agreed in the brief: photographs, video, an orthomosaic map or a 3D model, handed over with a clear note of what was captured and anything still outstanding.' },
  { q: 'What can delay or change a flight?', a: 'Weather, access, site conditions, airspace and other practical or regulatory considerations. If any of them affects the plan we will tell you and agree what changes.' },
  { q: 'Can the scope change once we have agreed it?', a: 'Yes. If a site condition materially changes the plan, we will explain it and agree any change with you before carrying on.' },
  { q: 'How do I get a quote?', a: 'Send the site, the question you need answered and how you will use the result. We reply with a free quote.' },
  { q: 'Where do you work?', a: 'We are based in Macclesfield and work across Cheshire. If your site is further afield, send us the location and we will tell you whether we can help.' }
];

const deliverables = [
  [0, 'Inspection photographs', 'Detailed aerial photographs of agreed roof, structure or site areas.'],
  [1, 'Orthomosaic maps', 'A stitched 2D view of the site for planning, progress review and CAD overlay.'],
  [2, 'Georeferenced 3D models', 'Interactive models for remote inspection, measurement and CAD/BIM-related use.'],
  [3, 'Progress records', 'Consistent repeat capture for construction, maintenance or project communication.'],
  [4, 'Aerial stills and video', 'Photographs or clips from agreed viewpoints, for communication and presentation.']
];

export default function page() {
  const hero = phero({
    items: crumbs,
    kicker: 'Process &amp; deliverables',
    title: 'From site question to usable output.',
    lead: 'Agree the question and the deliverable first. Then plan, prepare, capture, process and hand over what your project needs.',
    actions: btn('/contact/', 'Start your brief') + btn('#stages', 'See the five stages', 'ghost'),
    media: `<div class="frame bracket frame--45" style="max-height:620px;margin-inline:auto;max-width:520px">${img('process-hero', { eager: true, priority: true, pos: '50% 60%' })}</div>`
  });
  const tbl = deliverables
    .map(([i, name, text]) => `<tr data-reveal><th scope="row">${name}</th><td>${text}</td><td><a class="tlink" href="${services[i].path}">${services[i].name} ${arrow}</a></td></tr>`)
    .join('');

  const body = `${hero}

<section class="sec sec--warm" id="stages" aria-labelledby="st-h"><span class="seam"></span><div class="wrap split split--top">
<div data-reveal>
<p class="kicker">After you agree the brief</p>
<h2 class="h2" id="st-h">Five stages, in the same order every time.</h2>
<div class="prose"><p>The technical method changes by project. The sequence does not.</p></div>
<div class="frame bracket" style="margin-top:36px;aspect-ratio:4/3.2;max-width:520px">${img('process-pre', { pos: '50% 35%' })}</div>
</div>
<div data-reveal style="--d:80ms">${steps([
  { title: 'Plan', text: 'Confirm the site, purpose, coverage, deliverable and any constraints.' },
  { title: 'Prepare', text: 'Review access, site information and the practical considerations before capture.' },
  { title: 'Capture', text: 'Fly the agreed area and collect the imagery or mapping data the brief needs.' },
  { title: 'Process', text: 'Prepare the agreed photographs, video, orthomosaic or 3D model and check the output.' },
  { title: 'Deliver', text: 'Hand over the agreed files and explain anything you need in order to use them.' }
])}</div>
</div></section>

<section class="sec sec--paper" id="brief" aria-labelledby="brief-h"><span class="seam"></span><div class="wrap split split--top">
<div data-reveal><p class="kicker">Before capture</p><h2 class="h2" id="brief-h">Define the question, coverage and handover before flying.</h2><div class="prose"><p>A short brief prevents wasted capture and keeps the output tied to the decision your team needs to make.</p></div><div class="btn-row" style="margin-top:30px">${btn('/contact/', 'Start your brief')}</div></div>
<dl class="spec" data-reveal style="--d:80ms"><div><dt>Site</dt><dd>Where is the project and which area matters?</dd></div><div><dt>Question</dt><dd>What do you need to understand from the aerial view?</dd></div><div><dt>Output</dt><dd>Inspection imagery, mapping, a model, monitoring, photography or video?</dd></div><div><dt>Constraints</dt><dd>Are there access, timing or project considerations that affect capture?</dd></div><div><dt>Handover</dt><dd>Who will use the files and what do they need from them?</dd></div></dl>
</div></section>

<section class="sec sec--warm2" id="deliverables" aria-labelledby="del-h"><span class="seam"></span><div class="wrap">
${secHead('Common deliverables', 'Different formats answer different questions.', 'A useful deliverable is the one your project team can actually use.', 'del-h')}
<table class="compare"><caption class="sr-only">Common deliverables and the services that produce them</caption><thead><tr><th scope="col">Deliverable</th><th scope="col">What it is for</th><th scope="col">Service</th></tr></thead><tbody>${tbl}</tbody></table>
</div></section>

<section class="sec sec--dark" id="expect" aria-labelledby="exp-h"><span class="seam"></span><div class="wrap">
${secHead('What to expect', 'Before, during and after capture should stay clear.', 'The flight is one stage in a simple chain: agree the purpose, capture the brief, then hand over the agreed files.', 'exp-h')}
${iconCards([
  { icon: 'file', title: 'Agree the brief', text: 'Confirm the site, purpose, coverage, intended use and required deliverable.' },
  { icon: 'camera', title: 'Capture to the brief', text: 'Collect the agreed imagery or data, and flag any site condition that materially changes the plan.' },
  { icon: 'check', title: 'Hand over clearly', text: 'Deliver the agreed files and make clear what was captured, what changed and what remains outstanding.' }
], { cols: 3, dark: true })}
</div></section>

${faqSection({ id: 'faq', title: 'Straight answers before you request a quote.', lead: 'The technical method can be discussed once the brief is clear.', items: faqs, bg: 'paper' })}

${cta({ title: 'Ready to start with a brief?', text: 'Tell us the site and what you need to understand. We will reply with a free quote.' })}`;

  return {
    path: '/process-deliverables/',
    title: 'Drone survey process & deliverables | UAV Aerial Solutions',
    description: 'How a drone project runs, from brief to handover, and what you receive: inspection photographs, orthomosaic maps, 3D models and progress records.',
    jsonld: [businessLd(), crumbLd(crumbs), faqLd(faqs)],
    body
  };
}

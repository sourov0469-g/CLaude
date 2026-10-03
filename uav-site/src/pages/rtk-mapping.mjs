import { site, services, img, arrow, faqSection, cta, serviceLd, crumbLd, faqLd } from '../lib/site.mjs';
import { phero, btn, related, iconCards, steps, secHead } from '../lib/blocks.mjs';

const s = services[1];
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'RTK & 2D mapping', path: s.path }];

const faqs = [
  { q: 'What is an orthomosaic map?', a: 'An orthomosaic combines many overlapping aerial images into one detailed 2D view of a site. It is used for construction, infrastructure, progress review and CAD overlay work.' },
  { q: 'What does RTK mean for mapping?', a: 'RTK uses correction data to improve positional accuracy during capture, and can reduce the number of ground control points needed. With our DJI base station we quote 1–3&nbsp;cm accuracy; what is achievable on your project depends on the site, conditions and deliverable, so we agree the accuracy basis before capture.' },
  { q: 'What do you need from me to scope a map?', a: 'The site boundary or address, what the map will be used for and any positional requirement. You do not need to choose a technical method first.' }
];

export default function page() {
  const hero = phero({
    scene: 'grid',
    items: crumbs,
    dark: true,
    kicker: 'Drone service &middot; RTK &amp; 2D mapping',
    title: 'A current, high-detail map of your site.',
    lead: 'High-detail 2D orthomosaic maps from RTK-supported drone capture, for planning, analysis, progress review and CAD overlay.',
    actions: btn('/contact/?service=rtk-mapping', 'Request a mapping quote', 'light') + btn('#map', 'How the map comes together', 'ghost-light'),
    media: `<div class="frame bracket bracket--light frame--54">${img('rtk-hero', { eager: true, priority: true, pos: '50% 55%' })}</div>`,
    strip: ['Output: 2D orthomosaic map', 'Capture: RTK-supported with a DJI base station', 'Use: planning, progress review, CAD overlay']
  });

  const body = `${hero}

<section class="sec sec--paper" id="map" aria-labelledby="map-h"><span class="seam"></span><div class="wrap split split--wide-media split--rev">
<div data-reveal>
<p class="kicker">The orthomosaic</p>
<h2 class="h2" id="map-h">Aerial imagery organised into one usable map.</h2>
<div class="prose"><p>An orthomosaic combines many overlapping aerial images into a single, detailed 2D view of a site. It gives you a current picture that can be reviewed, compared over time and overlaid in CAD.</p></div>
${steps([
  { title: 'Brief', text: 'Define the site boundary, intended use and output.' },
  { title: 'Capture', text: 'Record overlapping imagery across the agreed area.' },
  { title: 'Process', text: 'Build the orthomosaic and check it against the brief.' },
  { title: 'Use', text: 'Planning, progress review, infrastructure review or CAD overlay.' }
], { cols: 4, mt: 36 })}
</div>
<div class="frame bracket gridover" data-reveal style="--d:100ms;aspect-ratio:4/3.2">${img('rtk-ortho', { pos: '50% 50%' })}</div>
</div></section>

<section class="sec sec--dark" id="accuracy" aria-labelledby="acc-h"><span class="seam"></span><div class="wrap split">
<div data-reveal>
<p class="kicker">RTK-supported capture</p>
<h2 class="h2" id="acc-h">Agree the accuracy requirement before capture.</h2>
<div class="prose"><p>RTK drones use correction data to improve positional accuracy, and often need fewer ground control points. On construction and infrastructure projects, small measurement errors can be expensive.</p><p>What is achievable depends on the site, the conditions and the deliverable, so we agree the accuracy basis with you first.</p></div>
<dl class="spec" style="margin-top:34px"><div><dt>Requirement</dt><dd>State the measurement or positional need before the job is scoped.</dd></div><div><dt>Method</dt><dd>Agree whether RTK-supported capture suits the intended output.</dd></div><div><dt>Conditions</dt><dd>Site, environment and processing setup can all affect the result.</dd></div></dl>
</div>
<div class="panel" data-reveal style="--d:100ms">
<p class="kicker">Quoted when mapping with our DJI base station</p>
<p class="big-num" aria-label="1 to 3 centimetres">1–3<small>cm</small></p>
<div class="scale" aria-hidden="true"><div class="scale-bar"></div><div class="scale-ticks"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="scale-band"></div><div class="scale-labels"><span>0</span><span>1 cm</span><span>2 cm</span><span>3 cm</span><span>4 cm</span><span>5 cm</span><span>6 cm</span></div></div>
<p class="fine" style="margin-top:20px">Indicative scale only. The accuracy basis for your project is agreed before capture.</p>
</div>
</div></section>

<section class="sec sec--warm" id="uses" aria-labelledby="use-h"><span class="seam"></span><div class="wrap">
${secHead('What the map is for', 'What the map is used for.', 'An up-to-date picture of the site supports faster decisions.', 'use-h')}
${iconCards([
  { icon: 'eye', title: 'Spot mistakes, track progress', text: 'Compare the site against plans and against earlier maps.' },
  { icon: 'ruler', title: 'CAD overlay', text: 'Use the map as a base layer in your CAD drawings.' },
  { icon: 'build', title: 'Construction and infrastructure', text: 'A current record of large construction and infrastructure sites.' },
  { icon: 'map', title: 'Urban and public-safety planning', text: 'A clear view of access, layout and surroundings.' }
])}
</div></section>

<section class="sec sec--paper" id="brief" aria-labelledby="brief-h"><span class="seam"></span><div class="wrap split split--top">
<div data-reveal><p class="kicker">Start with a brief</p><h2 class="h2" id="brief-h">What to include in your enquiry.</h2><div class="prose"><p>Three details are enough to scope a mapping job. We will ask for anything else.</p></div><div class="btn-row" style="margin-top:30px">${btn('/contact/?service=rtk-mapping', 'Request a mapping quote')}</div></div>
<dl class="spec" data-reveal style="--d:80ms"><div><dt>Site boundary</dt><dd>Which area does the map need to cover?</dd></div><div><dt>Intended use</dt><dd>Planning, progress review, infrastructure review or CAD overlay?</dd></div><div><dt>Output and accuracy</dt><dd>What format do you need, and is there a positional requirement?</dd></div></dl>
</div></section>

${faqSection({ id: 'faq', title: 'Mapping questions, answered.', lead: 'If you know the site and what the map must support, that is enough to start.', items: faqs, bg: 'warm' })}

${related('rtk-mapping', ['3d-modelling', 'roof-inspections', 'aerial-monitoring'], { title: 'From a map to the next question.', lead: 'Add a model for remote measurement, or repeat visits to track change.' })}

${cta({ title: 'Need a current 2D view of a site?', text: 'Tell us the site and what the map needs to support. We will reply with a free quote.', query: 'rtk-mapping' })}`;

  return {
    path: s.path,
    title: 'RTK drone mapping in Cheshire | UAV Aerial Solutions',
    description: 'High-detail 2D orthomosaic maps from RTK-supported drone capture for planning, progress review and CAD overlay. UAV Aerial Solutions, Macclesfield, Cheshire.',
    jsonld: [serviceLd(s, 'High-detail 2D orthomosaic mapping from RTK-supported drone capture, for planning, analysis, progress review and CAD overlay.'), crumbLd(crumbs), faqLd(faqs)],
    body
  };
}

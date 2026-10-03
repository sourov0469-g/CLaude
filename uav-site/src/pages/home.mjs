import { site, services, img, arrow, faqSection, cta, businessLd, faqLd } from '../lib/site.mjs';

const faqs = [
  { q: 'What can a drone roof inspection show?', a: 'Detailed imagery of roof coverings, junctions, drainage and other areas that are hard to reach. It gives you clear visual evidence to support maintenance decisions without routine close access to every part of the roof.' },
  { q: 'Do you inspect residential roofs as well as commercial?', a: 'Yes, both. Tell us the property type, the location and what you need to understand, and we will advise on the right approach.' },
  { q: 'How accurate is RTK mapping?', a: 'With our DJI base station we quote 1–3&nbsp;cm accuracy for mapping. What is achievable depends on the site, conditions and the deliverable, so we agree the accuracy requirement with you before capture.' },
  { q: 'Can you monitor a project over time?', a: 'Yes. We capture construction and project progress at agreed intervals from consistent viewpoints, so each visit can be compared with the last.' },
  { q: 'Where do you work?', a: 'We are based in Macclesfield and work across Cheshire. If your site is further afield, send us the location and we will tell you whether we can help.' }
];

const cards = [
  { s: services[0], key: 'home-svc-roof', pos: '50% 55%', text: 'Detailed aerial imagery of commercial and residential roofs, including the areas that are hard to reach safely.', link: 'See roof inspections', feature: true },
  { s: services[1], key: 'home-svc-rtk', pos: '50% 40%', text: 'Orthomosaic maps built from RTK-supported capture: a current, accurate view of the whole site.', link: 'See mapping' },
  { s: services[2], key: 'home-svc-3d', pos: '50% 60%', text: 'Georeferenced 3D models for remote inspection, measurement and CAD/BIM workflows.', link: 'See 3D modelling' },
  { s: services[3], key: 'home-svc-monitor', pos: '50% 50%', text: 'Repeat capture from agreed viewpoints, so progress and change are easy to compare.', link: 'See monitoring' },
  { s: services[4], key: 'home-svc-photo', pos: '50% 50%', text: 'Aerial stills and video for project updates, property and site presentation.', link: 'See photo &amp; video' }
];

export default function home() {
  const cardHtml = cards
    .map((c, i) => `<article class="card${c.feature ? ' card--feature' : ''}" data-reveal style="--d:${i * 70}ms"><div class="card-media">${img(c.key, { pos: c.pos })}</div><div class="card-body"><span class="card-num">0${i + 1}</span><h3 class="h3">${c.s.name}</h3><p>${c.text}</p><a class="tlink card-link" href="${c.s.path}">${c.link} ${arrow}</a></div></article>`)
    .join('');

  const body = `<section class="hero hero-load" aria-labelledby="home-h1">
<svg class="hero-lines" viewBox="0 0 760 360" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><path d="M0 250C90 170 150 290 250 220S400 90 520 150 700 120 760 60"/><path d="M0 285C100 215 165 320 265 255S410 130 530 188 705 160 760 105"/><path d="M0 320C110 262 180 352 280 292S420 172 540 226 710 200 760 150"/></svg>
<div class="wrap hero-top">
<div class="hero-copy">
<p class="kicker">Drone services &middot; Macclesfield &amp; Cheshire</p>
<h1 class="h1" id="home-h1">Clearer answers from above.</h1>
</div>
<div class="hero-lead-wrap">
<p class="lead hero-lead">Roof inspections, RTK mapping, 3D models and project monitoring from a certified, insured drone operator in Macclesfield.</p>
<div class="btn-row hero-actions"><a class="btn" href="/contact/">Request a free quote ${arrow}</a><a class="btn btn--ghost" href="#services">Explore services</a></div>
</div>
</div>
<div class="hero-stage">
<div class="hero-shadow"><div class="hero-plate">${img('home-hero-main', { eager: true, priority: true, pos: '46% 52%' })}</div></div>
<svg class="hero-edge" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style="overflow:visible"><path d="M0 19 L18.6 19 L34.4 0 L49.6 19 L100 19"/></svg>
<div class="hero-inset">${img('home-hero-inset', { eager: true })}</div>
</div>
</section>

<section class="facts" aria-label="Experience at a glance"><div class="wrap"><ul>
<li data-reveal><b>8 years</b><span>flying UAV systems</span></li>
<li data-reveal style="--d:60ms"><b>35 years</b><span>in Safe Systems of Work and risk assessment</span></li>
<li data-reveal style="--d:120ms"><b>Certified &amp; insured</b><span>drone operators</span></li>
<li data-reveal style="--d:180ms"><b>100+ buildings</b><span>in an ongoing roof-maintenance programme</span></li>
</ul></div></section>

<section class="sec sec--warm" id="services" aria-labelledby="services-h"><span class="seam"></span>
<div class="wrap">
<div class="sec-head sec-head--split" data-reveal>
<div><p class="kicker">Drone services</p><h2 class="h2" id="services-h" style="margin-top:18px">Five ways to see a site from above.</h2></div>
<p class="lead">Choose by the decision you need to make. The output is agreed before the drone leaves the ground.</p>
</div>
<div class="svc-grid">${cardHtml}</div>
<p class="center" style="margin-top:40px" data-reveal><a class="tlink" href="/services/">Compare all services ${arrow}</a></p>
</div>
</section>

<section class="sec sec--dark" id="how" aria-labelledby="how-h"><span class="seam"></span>
<div class="wrap split split--wide-media split--rev">
<div data-reveal>
<p class="kicker">How it works</p>
<h2 class="h2" id="how-h">A flight is only useful if the output answers the brief.</h2>
<p class="lead" style="margin-top:20px">We start with the question you need answered, capture the area that matters and hand over imagery, maps or models your team can use.</p>
<ol class="steps" style="margin-top:36px">
<li class="step"><span class="step-n">01</span><h3 class="h3">Brief</h3><p>Agree the site, the question and the output you need.</p></li>
<li class="step"><span class="step-n">02</span><h3 class="h3">Capture</h3><p>Fly the agreed area at the detail and coverage the job needs.</p></li>
<li class="step"><span class="step-n">03</span><h3 class="h3">Deliver</h3><p>Process and hand over the files, with anything outstanding made clear.</p></li>
</ol>
<a class="tlink" href="/process-deliverables/" style="margin-top:34px">See the full process ${arrow}</a>
</div>
<div class="frame bracket bracket--light" data-reveal style="--d:100ms;aspect-ratio:4/3.4">${img('home-process', { pos: '50% 50%' })}</div>
</div>
</section>

<section class="sec sec--paper" id="experience" aria-labelledby="exp-h"><span class="seam"></span>
<div class="wrap split">
<div class="frame bracket" data-reveal style="aspect-ratio:4/3.3">${img('home-case', { pos: '50% 55%' })}</div>
<div data-reveal style="--d:100ms">
<p class="kicker">Commercial experience</p>
<h2 class="h2" id="exp-h">Roof maintenance across 100+ buildings.</h2>
<div class="prose">
<p>For the last three years we have supported a large pharmaceutical client in Cheshire with its roof-maintenance strategy, across a campus of more than 100 buildings. The client is not named.</p>
<p>Flights are planned with site risk in mind, backed by 35 years in Safe Systems of Work and risk assessment.</p>
</div>
<a class="tlink" href="/about/">About UAV Aerial Solutions ${arrow}</a>
</div>
</div>
</section>

${faqSection({ id: 'faq', title: 'Straight answers before you ask for a quote.', lead: 'If you already know the site and the question, that is enough to start.', items: faqs, bg: 'warm' })}

${cta()}`;

  return {
    path: '/',
    nav: '/',
    title: 'Drone roof inspections & mapping, Cheshire | UAV Aerial Solutions',
    description: 'Roof inspections, RTK mapping, 3D models, project monitoring and aerial photography from a certified, insured drone operator in Macclesfield, Cheshire.',
    jsonld: [businessLd(), faqLd(faqs)],
    body
  };
}

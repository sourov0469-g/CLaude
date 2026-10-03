import { site, services, img, arrow, cta, businessLd, crumbLd } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { phero, btn, secHead } from '../lib/blocks.mjs';

const rows = [
  { s: services[0], text: 'Detailed aerial imagery of commercial and residential roofs, including the areas that are hard to reach safely.', best: 'Maintenance reviews, condition records, hard-to-reach areas.', get: 'Detailed photographs of the agreed roof areas.' },
  { s: services[1], text: 'A current 2D orthomosaic map of your site, with RTK-supported capture where the brief has a positional requirement.', best: 'Planning, progress review, CAD overlay, infrastructure.', get: 'An orthomosaic map, with the accuracy basis agreed first.' },
  { s: services[2], text: 'Interactive, georeferenced 3D models for remote inspection and measurement, plus wider aerial surveys of larger sites.', best: 'Remote inspection, calculations, CAD/BIM-related work.', get: 'A 3D model in the format your workflow needs.' },
  { s: services[3], text: 'Repeat capture from agreed viewpoints, so you can see how a site changes from one visit to the next.', best: 'Construction progress, maintenance records, stakeholder updates.', get: 'A consistent visual record, visit by visit.' },
  { s: services[4], text: 'Aerial photography and video that shows a site, project or property clearly, from the right viewpoints.', best: 'Project communication, property and site presentation.', get: 'Stills, video clips or both, to an agreed shot list.' }
];

const choose = [
  ['Is the roof in good condition?', 0, 'Roof inspection photographs'],
  ['What does the site look like right now?', 1, 'An orthomosaic map'],
  ['Can we measure or review it remotely?', 2, 'A georeferenced 3D model'],
  ['How is the project progressing?', 3, 'Repeat visual records'],
  ['Do we need clear images or video of the site?', 4, 'Aerial stills and video']
];

export default function page() {
  const rowsHtml = rows
    .map((r, i) => `<article class="row" id="${r.s.slug}" data-reveal><div class="row-head"><span class="ico-wrap">${icon[r.s.icon]()}</span><div><span class="card-num">0${i + 1}</span><h3 class="h3">${r.s.name}</h3></div></div><div><p class="lead">${r.text}</p></div><div class="row-actions"><dl><div><dt>Best for</dt><dd>${r.best}</dd></div><div><dt>You receive</dt><dd>${r.get}</dd></div></dl><a class="tlink" href="${r.s.path}" style="margin-top:20px">${r.s.name} ${arrow}</a></div></article>`)
    .join('');
  const tbl = choose
    .map(([q, i, out]) => `<tr data-reveal><th scope="row">${q}</th><td>${out}</td><td><a class="tlink" href="${services[i].path}">${services[i].name} ${arrow}</a></td></tr>`)
    .join('');

  const hero = phero({
    items: [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }],
    kicker: 'Drone services',
    title: 'Drone services for roofs, sites and projects.',
    lead: 'Five services, one approach: agree what you need to understand, then capture exactly that. Free quotes across Cheshire.',
    actions: btn('/contact/', 'Request a free quote') + btn('#compare', 'Which service do I need?', 'ghost'),
    media: `<ol class="index-list">${services.map((s, i) => `<li><a href="#${s.slug}" class="mega-item"><span class="ico-wrap">${icon[s.icon]()}</span><span><strong>${s.name}</strong><small>${s.short}</small></span><span class="go" aria-hidden="true">↓</span></a></li>`).join('')}</ol>`
  });

  const body = `${hero}
<section class="sec sec--white" aria-labelledby="svc-h" id="services"><span class="seam"></span><div class="wrap">
${secHead('What we do', 'From a roof question to usable aerial data.', 'Each service is scoped around the output you need. The exact scope is agreed before capture.', 'svc-h')}
<div class="rows">${rowsHtml}</div>
</div></section>

<section class="sec sec--warm" id="compare" aria-labelledby="cmp-h"><span class="seam"></span><div class="wrap">
${secHead('Choose by output', 'Start with the question, not the equipment.', 'You do not need to pick a method before you enquire. Explain the site and what you need to understand.', 'cmp-h')}
<table class="compare"><caption class="sr-only">Which service answers which question</caption><thead><tr><th scope="col">If you are asking</th><th scope="col">You need</th><th scope="col">Service</th></tr></thead><tbody>${tbl}</tbody></table>
</div></section>

<section class="sec sec--paper" id="coverage" aria-labelledby="cov-h"><span class="seam"></span><div class="wrap split split--wide-media">
<div data-reveal>
<p class="kicker">Coverage</p>
<h2 class="h2" id="cov-h">Based in Macclesfield, working across Cheshire.</h2>
<div class="prose"><p>Whether we can fly a site depends on its location, access, airspace, weather and other practical flight considerations. Send us the location and a short brief and we will tell you plainly whether we can help.</p></div>
<ul class="checks" style="margin-top:26px"><li>Site and access</li><li>Required output</li><li>Airspace and weather</li><li>Any other practical flight considerations</li></ul>
<div class="btn-row" style="margin-top:34px">${btn('/contact/', 'Check your site')}</div>
</div>
<div class="frame bracket" data-reveal style="--d:100ms;aspect-ratio:4/3.1">${img('services-coverage', { pos: '50% 60%' })}</div>
</div></section>

${cta({ title: 'Not sure which service fits?', text: 'Tell us the site and what you need to understand. We will recommend the right output and send a free quote.' })}`;

  return {
    path: '/services/',
    title: 'Drone services in Cheshire | UAV Aerial Solutions',
    description: 'Roof inspections, RTK and 2D mapping, 3D modelling, aerial monitoring and aerial photography and video across Cheshire from UAV Aerial Solutions, Macclesfield.',
    jsonld: [businessLd(), crumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }])],
    body
  };
}

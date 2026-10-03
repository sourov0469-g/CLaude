import { site, services, img, arrow, cta, businessLd, crumbLd, stock } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { phero, btn, secHead } from '../lib/blocks.mjs';

const rows = [
  { s: services[0], text: 'Detailed aerial imagery of commercial and residential roofs, including the areas that are hard to reach safely.', best: 'Maintenance reviews, condition records, hard-to-reach areas.', get: 'Aerial photographs of the roof areas in your brief.' },
  { s: services[1], text: 'A current 2D orthomosaic map of your site, using RTK capture where the job needs positional accuracy.', best: 'Planning, progress review, CAD overlay, infrastructure.', get: 'A 2D orthomosaic map.' },
  { s: services[2], text: 'Interactive, georeferenced 3D models for remote inspection and measurement, plus wider aerial surveys of larger sites.', best: 'Remote inspection, calculations, CAD/BIM-related work.', get: 'A georeferenced 3D model.' },
  { s: services[3], text: 'Repeat capture from agreed viewpoints, so you can see how a site changes from one visit to the next.', best: 'Construction progress, stakeholder updates, transparency.', get: 'Regular aerial updates on progress.' },
  { s: services[4], text: 'Aerial photography and video that shows a site, project or property clearly.', best: 'Project communication, property and site presentation.', get: 'Aerial photographs and video.' }
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
    scene: 'topo-farm',
    items: [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }],
    kicker: 'Drone services',
    title: 'Drone services for roofs, sites and projects.',
    lead: 'Five services, one approach: agree what you need to understand, then capture exactly that. Free quotes across Cheshire.',
    actions: btn('/contact/', 'Request a free quote') + btn('#compare', 'Which service do I need?', 'ghost'),
    media: `<div class="frame bracket frame--43">${img('services-coverage', { eager: true, priority: true, pos: '50% 55%' })}${stock}</div>`
  });

  const body = `${hero}
<section class="sec sec--white" aria-labelledby="svc-h" id="services"><span class="seam"></span><div class="wrap">
${secHead('What we do', 'From a roof question to usable aerial data.', 'Each service is scoped around the output you need. The exact scope is agreed before capture.', 'svc-h')}
<div class="rows">${rowsHtml}</div>
</div></section>

<section class="sec sec--warm" id="compare" aria-labelledby="cmp-h"><span class="seam"></span><div class="wrap">
${secHead('Choose by output', 'Explain the site. We will suggest the output.', 'You do not need to pick a method before you enquire. Start with the question you are asking.', 'cmp-h')}
<div class="chooser" data-chooser>
<div class="ch-q" role="tablist" aria-label="What are you asking?" aria-orientation="vertical">${choose.map(([q], i) => `<button class="ch-t${i === 0 ? ' is-on' : ''}" type="button" role="tab" id="ch-t${i}" aria-controls="ch-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="ch-n">0${i + 1}</span><span class="ch-qt">${q}</span></button>`).join('')}</div>
<div class="ch-a">${choose.map(([q, i, out], k) => { const r = rows[i]; return `<div class="ch-p${k === 0 ? ' is-on' : ''}" role="tabpanel" id="ch-p${k}" aria-labelledby="ch-t${k}" tabindex="0"><span class="ch-ico" aria-hidden="true">${icon[r.s.icon]()}</span><p class="ch-eyebrow">You need</p><h3 class="ch-title">${out}</h3><p class="ch-text">${r.text}</p><dl class="ch-dl"><div><dt>Best for</dt><dd>${r.best}</dd></div><div><dt>You receive</dt><dd>${r.get}</dd></div></dl><div class="btn-row">${btn(r.s.path, r.s.name)}${btn('/contact/?service=' + r.s.query, 'Get a quote', 'ghost')}</div></div>`; }).join('')}</div>
</div>
</div></section>

<section class="sec sec--paper" id="coverage" aria-labelledby="cov-h"><span class="seam"></span><div class="wrap split split--top">
<div data-reveal>
<p class="kicker">Coverage</p>
<h2 class="h2" id="cov-h">Based in Macclesfield, working across Cheshire.</h2>
<div class="prose"><p>Whether we can fly a site depends on a few practical things. Send us the location and a short brief and we will tell you plainly whether we can help.</p></div>
<div class="btn-row" style="margin-top:34px">${btn('/contact/', 'Check your site')}</div>
</div>
<dl class="spec" data-reveal style="--d:80ms"><div><dt>Site and access</dt><dd>Where the site is and how it can be reached.</dd></div><div><dt>Required output</dt><dd>Photographs, a map, a model, repeat visits or video.</dd></div><div><dt>Airspace and weather</dt><dd>Both affect whether and when a flight can go ahead.</dd></div><div><dt>Other considerations</dt><dd>Any other practical flight considerations on the day.</dd></div></dl>
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

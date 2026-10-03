import { site, services, img, arrow, cta, crumbLd, businessLd, stock } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { phero, btn, secHead } from '../lib/blocks.mjs';

const crumbs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }];

export default function page() {
  const hero = phero({
    scene: 'topo-town',
    items: crumbs,
    kicker: 'About UAV Aerial Solutions',
    title: 'Practical aerial data for the decisions that follow.',
    lead: 'Based in Macclesfield, we provide roof inspections, mapping, 3D modelling, project monitoring and aerial photography and video across Cheshire. We start with the site, the question and the output you need.',
    actions: btn('/contact/', 'Request a free quote') + btn('/services/', 'Explore services', 'ghost'),
    media: `<div class="frame bracket frame--43">${img('about-hero', { eager: true, priority: true, pos: '90% 30%' })}</div>`
  });
  const index = services.map((sv) => `<li><a class="mega-item" href="${sv.path}"><span class="ico-wrap">${icon[sv.icon]()}</span><span><strong>${sv.name}</strong><small>${sv.short}</small></span><span class="go" aria-hidden="true">→</span></a></li>`).join('');

  const body = `${hero}

<section class="facts" aria-label="Experience at a glance"><div class="wrap"><ul>
<li data-reveal><b>8 years</b><span>flying UAV systems</span></li>
<li data-reveal style="--d:60ms"><b>35 years</b><span>in Safe Systems of Work and risk assessment</span></li>
<li data-reveal style="--d:120ms"><b>Certified &amp; insured</b><span>drone operators</span></li>
<li data-reveal style="--d:180ms"><b>100+ buildings</b><span>on a client campus we support</span></li>
</ul></div></section>

<section class="sec sec--paper" id="experience" aria-labelledby="exp-h"><span class="seam"></span><div class="wrap split split--top">
<div data-reveal>
<p class="kicker">Commercial experience</p>
<h2 class="h2" id="exp-h">Three years on a large Cheshire campus.</h2>
<div class="prose"><p>For the last three years we have worked for a large pharmaceutical company in Cheshire on roof maintenance across a campus of more than 100 buildings. The client is not named.</p></div>
</div>
<dl class="spec" data-reveal style="--d:80ms"><div><dt>Setting</dt><dd>A multi-building campus in Cheshire with more than 100 buildings.</dd></div><div><dt>Work</dt><dd>Roof maintenance.</dd></div><div><dt>Experience</dt><dd>Three years with the same client.</dd></div></dl>
</div></section>

<section class="sec sec--warm" id="safety" aria-labelledby="saf-h"><span class="seam"></span><div class="wrap split split--wide-media split--rev">
<div data-reveal>
<p class="kicker">Safe systems of work</p>
<h2 class="h2" id="saf-h">35 years in Safe Systems of Work.</h2>
<div class="prose"><p>We bring 35 years&rsquo; experience in Safe Systems of Work and risk assessment to our drone work.</p></div>
<ul class="checks" style="margin-top:26px"><li>Certified and insured drone operators</li><li>8 years flying UAV systems</li></ul>
</div>
<div class="frame bracket frame--45" data-reveal style="--d:100ms;max-width:480px;justify-self:center">${img('about-sops', { pos: '50% 45%' })}${stock}</div>
</div></section>

<section class="sec sec--dark" id="aircraft" aria-labelledby="air-h"><span class="seam"></span><div class="wrap">
${secHead('Aircraft', 'Equipment on current projects.', 'We currently fly a DJI Matrice 4E and a DJI Mavic 4 Pro, and use a DJI base station for RTK mapping.', 'air-h')}
<div class="cards cards--2">
<figure class="aircraft" data-reveal><div class="frame">${img('about-matrice', { pos: '50% 50%' })}</div><figcaption>DJI Matrice 4E</figcaption></figure>
<figure class="aircraft" data-reveal style="--d:80ms"><div class="frame">${img('about-mavic', { pos: '50% 50%' })}</div><figcaption>DJI Mavic 4 Pro</figcaption></figure>
</div>
</div></section>

<section class="sec sec--paper" id="approach" aria-labelledby="app-h"><span class="seam"></span><div class="wrap split split--top">
<div data-reveal><p class="kicker">Our approach</p><h2 class="h2" id="app-h">Start with the brief, not the equipment.</h2><div class="prose"><p>A useful flight starts by defining the site, the area that matters and the decision the output needs to support. From there we match the capture method to the job.</p></div></div>
<ul class="index-list" data-reveal style="--d:80ms">${index}</ul>
</div></section>

${cta({ title: 'Ready to talk through a project?', text: 'Send the site and the question you need answered. We will reply with a free quote.' })}`;

  return {
    path: '/about/',
    title: 'About UAV Aerial Solutions | Drone operator in Macclesfield',
    description: 'A certified, insured Macclesfield drone operator with 8 years flying UAVs and 35 years in Safe Systems of Work, serving projects across Cheshire.',
    jsonld: [businessLd(), crumbLd(crumbs)],
    body
  };
}

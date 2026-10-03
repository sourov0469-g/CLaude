import { site, services, img, arrow, cta, crumbLd, businessLd } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { phero, btn, secHead } from '../lib/blocks.mjs';

const crumbs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }];

export default function page() {
  const hero = phero({
    items: crumbs,
    kicker: 'About UAV Aerial Solutions',
    title: 'Practical aerial data for the decisions that follow.',
    lead: 'Based in Macclesfield, we provide roof inspections, mapping, 3D modelling, project monitoring and aerial photography and video across Cheshire. We start with the site, the question and the output you need.',
    actions: btn('/contact/', 'Request a free quote') + btn('/services/', 'Explore services', 'ghost'),
    media: `<div class="frame bracket frame--43">${img('about-hero', { eager: true, priority: true, pos: '63% 28%' })}</div>`
  });
  const index = services.map((sv) => `<li><a class="mega-item" href="${sv.path}"><span class="ico-wrap">${icon[sv.icon]()}</span><span><strong>${sv.name}</strong><small>${sv.short}</small></span><span class="go" aria-hidden="true">→</span></a></li>`).join('');

  const body = `${hero}

<section class="facts" aria-label="Experience at a glance"><div class="wrap"><ul>
<li data-reveal><b>8 years</b><span>flying UAV systems</span></li>
<li data-reveal style="--d:60ms"><b>35 years</b><span>in Safe Systems of Work and risk assessment</span></li>
<li data-reveal style="--d:120ms"><b>Certified &amp; insured</b><span>drone operators</span></li>
<li data-reveal style="--d:180ms"><b>100+ buildings</b><span>in an ongoing roof-maintenance programme</span></li>
</ul></div></section>

<section class="sec sec--paper" id="experience" aria-labelledby="exp-h"><span class="seam"></span><div class="wrap split split--top">
<div data-reveal>
<p class="kicker">Commercial experience</p>
<h2 class="h2" id="exp-h">Supporting roof maintenance across a large Cheshire campus.</h2>
<div class="prose"><p>For the last three years we have supported a large pharmaceutical client in Cheshire with its roof-maintenance strategy. The campus has more than 100 buildings. The client is not named.</p><p>Large estates need consistency: what is captured, how it is recorded and how it is handed over should support decisions across many roofs, not just produce isolated images.</p></div>
</div>
<dl class="spec" data-reveal style="--d:80ms"><div><dt>Requirement</dt><dd>Keep roof condition and maintenance needs visible across a large commercial estate.</dd></div><div><dt>Setting</dt><dd>A multi-building campus in Cheshire with more than 100 buildings.</dd></div><div><dt>Role</dt><dd>Supporting the client&rsquo;s roof-maintenance strategy with aerial capture.</dd></div><div><dt>Experience</dt><dd>Three years with the same client.</dd></div></dl>
</div></section>

<section class="sec sec--warm" id="safety" aria-labelledby="saf-h"><span class="seam"></span><div class="wrap split split--wide-media split--rev">
<div data-reveal>
<p class="kicker">Safe systems of work</p>
<h2 class="h2" id="saf-h">Flights planned with site risk in mind.</h2>
<div class="prose"><p>We bring 35 years&rsquo; experience in Safe Systems of Work and risk assessment to the way flights are planned, from the first site question to the final handover.</p></div>
<ul class="checks" style="margin-top:26px"><li>Certified and insured drone operators</li><li>Flights planned around site risk</li><li>A clear brief before, during and after capture</li></ul>
</div>
<div class="frame bracket frame--45" data-reveal style="--d:100ms;max-width:480px;justify-self:center">${img('about-sops', { pos: '50% 45%' })}</div>
</div></section>

<section class="sec sec--dark" id="aircraft" aria-labelledby="air-h"><span class="seam"></span><div class="wrap">
${secHead('Aircraft', 'Equipment on current projects.', 'We currently fly a DJI Matrice 4E and a DJI Mavic 4 Pro, and use a DJI base station for RTK mapping.', 'air-h')}
<div class="cards cards--2">
<figure class="panel" data-reveal style="margin:0"><div class="frame frame--11" style="background:transparent;max-width:380px;margin-inline:auto">${img('about-matrice', { pos: '50% 50%' })}</div><figcaption class="h3" style="margin-top:20px">DJI Matrice 4E</figcaption></figure>
<figure class="panel" data-reveal style="margin:0;--d:80ms"><div class="frame" style="background:transparent;aspect-ratio:1/1;max-width:380px;margin-inline:auto;display:grid;align-items:center">${img('about-mavic', { pos: '50% 50%' })}</div><figcaption class="h3" style="margin-top:20px">DJI Mavic 4 Pro</figcaption></figure>
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

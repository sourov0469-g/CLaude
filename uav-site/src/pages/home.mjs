import { site, services, img, arrow, faqSection, cta, businessLd, faqLd } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { droneSvg } from '../lib/drone.mjs';

const chips = [...services.map((s) => s.name), 'Macclesfield &amp; Cheshire', 'Certified &amp; insured', 'Free quotes'];

const faqs = [
  { q: 'What can a drone roof inspection show?', a: 'Detailed imagery of roof coverings, junctions, drainage and other areas that are hard to reach. It gives you clear visual evidence to support maintenance decisions without routine close access to every part of the roof.' },
  { q: 'Do you inspect residential roofs as well as commercial?', a: 'Yes, both. Tell us the property type, the location and what you need to understand, and we will advise on the right approach.' },
  { q: 'How accurate is RTK mapping?', a: 'With our DJI base station we quote 1–3&nbsp;cm accuracy for mapping. What is achievable depends on the site, conditions and the deliverable, so we agree the accuracy requirement with you before capture.' },
  { q: 'Can you monitor a project over time?', a: 'Yes. We capture construction and project progress at agreed intervals from consistent viewpoints, so each visit can be compared with the last.' },
  { q: 'Where do you work?', a: 'We are based in Macclesfield and work across Cheshire. If your site is further afield, send us the location and we will tell you whether we can help.' }
];

const cards = [
  { s: services[0], key: 'home-svc-roof', pos: '50% 55%', text: 'Detailed aerial imagery of commercial and residential roofs, including the areas that are hard to reach safely.', link: 'See roof inspections' },
  { s: services[1], key: 'home-svc-rtk', pos: '50% 40%', text: 'Orthomosaic maps built from RTK-supported capture: a current, accurate view of the whole site.', link: 'See mapping' },
  { s: services[2], key: 'home-svc-3d', pos: '50% 60%', text: 'Georeferenced 3D models for remote inspection, measurement and CAD/BIM workflows.', link: 'See 3D modelling' },
  { s: services[3], key: 'home-svc-monitor', pos: '50% 50%', text: 'Repeat capture from agreed viewpoints, so progress and change are easy to compare.', link: 'See monitoring' },
  { s: services[4], key: 'home-svc-photo', pos: '50% 50%', text: 'Aerial stills and video for project updates, property and site presentation.', link: 'See photo &amp; video' }
];

export default function home() {
  const panels = cards
    .map((c, i) => `<a class="svc-p${i === 0 ? ' is-active' : ''}" href="${c.s.path}" data-cursor="Explore" style="--i:${i}"><span class="svc-media">${img(c.key, { pos: c.pos })}</span><span class="svc-num">0${i + 1}</span><span class="svc-vtitle" aria-hidden="true">${c.s.name}</span><span class="svc-body"><span class="svc-ico" aria-hidden="true">${icon[c.s.icon]()}</span><h3 class="h3">${c.s.name}</h3><p>${c.text}</p><span class="svc-go">${c.link} ${arrow}</span></span></a>`)
    .join('');

  const body = `<section class="hero hero-load" aria-labelledby="home-h1" data-drone-zone>
<div class="hero-bg" aria-hidden="true"><i class="hero-glow"></i><i class="hero-dots" data-speed="-0.08"></i></div>
<div class="wrap hero-grid">
<div class="hero-copy">
<p class="kicker">Drone services &middot; Macclesfield &amp; Cheshire</p>
<h1 class="h1" id="home-h1" data-split>Clearer answers from above.</h1>
<p class="lead hero-lead">Roof inspections, RTK mapping, 3D models and project monitoring from certified, insured drone operators in Macclesfield.</p>
<div class="btn-row hero-actions"><a class="btn" href="/contact/">Request a free quote ${arrow}</a><a class="btn btn--ghost" href="#services">Explore services</a></div>
</div>
<div class="vf-wrap" data-vf>
<div class="vf" data-cursor-none>
<div class="vf-in"><span class="vf-img" data-vf-img>${img('home-hero-main', { eager: true, priority: true, pos: '46% 52%' })}</span><i class="vf-grid"></i><i class="vf-flash"></i></div>
<i class="vf-br vf-br--tl"></i><i class="vf-br vf-br--tr"></i><i class="vf-br vf-br--bl"></i><i class="vf-br vf-br--br"></i>
<i class="vf-focus" data-vf-focus aria-hidden="true"><b></b><b></b><b></b><b></b></i>
<div class="vf-bar"><button class="hud-btn" type="button" data-capture><span class="hud-ico" aria-hidden="true"></span>Capture a frame</button><p class="hud-n"><b data-frames>00</b> frames captured<span class="sr-only" data-frames-live aria-live="polite"></span></p></div>
</div>
<div class="vf-thumb" data-vf-thumb>${img('home-hero-inset', { eager: true })}</div>
</div>
</div>
<div class="drone" data-drone aria-hidden="true">${droneSvg}<i class="drone-shadow"></i></div>
</section>

<section class="marquee" aria-label="Services and coverage" data-marquee><ul class="marquee-track">${chips.map((c) => `<li>${c}</li>`).join('')}</ul></section>

<section class="facts" aria-label="Experience at a glance" data-facts><div class="wrap"><ul>
<li data-reveal><b>8 years</b><span>flying UAV systems</span></li>
<li data-reveal style="--d:60ms"><b>35 years</b><span>in Safe Systems of Work and risk assessment</span></li>
<li data-reveal style="--d:120ms"><b>Certified &amp; insured</b><span>drone operators</span></li>
<li data-reveal style="--d:180ms"><b>100+ buildings</b><span>on a client campus we support</span></li>
</ul></div></section>

<section class="statement" aria-label="What we do"><div class="wrap"><p class="kicker">What we do</p><p class="statement-text" data-scrub-words>We fly the roofs that are hard to reach, map the sites that keep changing and hand over files your team can use.</p></div></section>

<section class="sec sec--warm" id="services" aria-labelledby="services-h"><span class="seam"></span>
<div class="wrap">
<div class="sec-head sec-head--split" data-reveal>
<div><p class="kicker">Drone services</p><h2 class="h2" id="services-h" style="margin-top:18px">Five ways to see a site from above.</h2></div>
<p class="lead">Choose by the decision you need to make. The output is agreed before the drone leaves the ground.</p>
</div>
<div class="svc-acc" data-acc>${panels}</div>
<p class="center" style="margin-top:40px" data-reveal><a class="tlink" href="/services/">Compare all services ${arrow}</a></p>
</div>
</section>

<section class="sec sec--dark sec--story" id="how" aria-labelledby="how-h"><span class="seam"></span>
<div class="wrap">
<div class="sec-head sec-head--split" data-reveal>
<div><p class="kicker">How it works</p><h2 class="h2" id="how-h" style="margin-top:18px">A flight is only useful if the output answers the brief.</h2></div>
<p class="lead">We start with the question you need answered, capture the area that matters and hand over imagery, maps or models your team can use.</p>
</div>
<div class="story" data-story><div class="story-track"><div class="story-sticky">
<ol class="steps steps--row story-steps" style="--cols:3">
<li class="step" data-story-step><span class="step-n">01</span><h3 class="h3">Brief</h3><p>Agree the site, the question and the output you need.</p></li>
<li class="step" data-story-step><span class="step-n">02</span><h3 class="h3">Capture</h3><p>Fly the agreed area at the detail and coverage the job needs.</p></li>
<li class="step" data-story-step><span class="step-n">03</span><h3 class="h3">Deliver</h3><p>Process and hand over the files you agreed.</p></li>
</ol>
<div class="story-visual" aria-hidden="true"><div class="story-bar"><i data-story-fill></i></div>
<svg viewBox="0 0 600 440" focusable="false">
<g class="sv-grid"><path d="M60 60H540M60 140H540M60 220H540M60 300H540M60 380H540M60 60V380M180 60V380M300 60V380M420 60V380M540 60V380"/></g>
<g class="sv-s1"><path class="sv-site" pathLength="1" d="M120 120L430 90L500 250L390 340L150 310Z"/><g class="sv-handles"><rect x="114" y="114" width="12" height="12"/><rect x="424" y="84" width="12" height="12"/><rect x="494" y="244" width="12" height="12"/><rect x="384" y="334" width="12" height="12"/><rect x="144" y="304" width="12" height="12"/></g><circle class="sv-q" cx="310" cy="215" r="26"/><path class="sv-qm" d="M300 206q2-12 12-10t0 14q-6 4-6 10M306 232v2"/></g>
<g class="sv-s2"><path class="sv-pass" pathLength="1" d="M140 140H470M470 140V176H150M150 176V212H480M480 212V248H160M160 248V284H430M430 284V320H190"/><g class="sv-dr"><rect x="-9" y="-9" width="18" height="18" rx="4"/><path d="M-16 0H-9M9 0H16M0 -16V-9M0 9V16"/></g></g>
<g class="sv-s3"><g class="sv-tiles"><rect x="130" y="110" width="110" height="80"/><rect x="240" y="110" width="110" height="80"/><rect x="350" y="110" width="110" height="80"/><rect x="130" y="190" width="110" height="80"/><rect x="240" y="190" width="110" height="80"/><rect x="350" y="190" width="110" height="80"/><rect x="170" y="270" width="110" height="70"/><rect x="280" y="270" width="110" height="70"/></g><g class="sv-chips"><g><rect x="60" y="392" width="140" height="32" rx="2"/><text x="130" y="413">Imagery</text></g><g><rect x="230" y="392" width="140" height="32" rx="2"/><text x="300" y="413">Maps</text></g><g><rect x="400" y="392" width="140" height="32" rx="2"/><text x="470" y="413">Models</text></g></g></g>
</svg></div>
</div></div></div>
<a class="tlink" href="/process-deliverables/" style="margin-top:40px">See the full process ${arrow}</a>
</div>
</section>

<section class="sec sec--paper sec--exp" id="experience" aria-labelledby="exp-h"><span class="seam"></span>
<p class="exp-num" aria-hidden="true" data-parallax-y>100+</p>
<div class="wrap split">
<div class="frame bracket" data-reveal style="aspect-ratio:4/3.3"><span class="px" data-parallax-img>${img('home-case', { pos: '50% 55%' })}</span></div>
<div data-reveal style="--d:100ms">
<p class="kicker">Commercial experience</p>
<h2 class="h2" id="exp-h">Three years on a 100+ building campus.</h2>
<div class="prose">
<p>For the last three years we have worked for a large pharmaceutical company in Cheshire on roof maintenance across a campus of more than 100 buildings. The client is not named.</p>
<p>We also bring 35 years in Safe Systems of Work and risk assessment to our drone work.</p>
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
    description: 'Roof inspections, RTK mapping, 3D models, project monitoring and aerial photography from certified, insured drone operators in Macclesfield, Cheshire.',
    jsonld: [businessLd(), faqLd(faqs)],
    body
  };
}

import { site, services, arrow, crumbLd, businessLd, emailText } from '../lib/site.mjs';
import { icon } from '../lib/icons.mjs';
import { crumbs as crumbsHtml } from '../lib/site.mjs';

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }];

const chips = [
  ['Roof inspection', 'Roof inspection'],
  ['RTK &amp; 2D mapping', 'RTK &amp; 2D mapping'],
  ['3D modelling', '3D modelling'],
  ['Aerial monitoring', 'Aerial monitoring'],
  ['Photography &amp; video', 'Photography &amp; video'],
  ['Not sure yet', 'Not sure yet']
];

export default function page() {
  const chipHtml = chips
    .map(([v, label], i) => `<label class="chip"><input type="radio" name="service" value="${v}"${i === chips.length - 1 ? ' checked' : ''}><span>${label}</span></label>`)
    .join('');

  const body = `<section class="phero" aria-labelledby="page-h1"><div class="wrap" style="padding-block:clamp(28px,4vw,56px) clamp(4px,1vw,12px)"><div class="phero-copy" data-reveal="fade" style="max-width:820px">${crumbsHtml(crumbs)}<p class="kicker">Contact</p><h1 class="h1" id="page-h1">Tell us what you need to see from above.</h1><p class="lead">Send the site, the question you need answered and how you will use the result. We will reply with a free quote.</p></div></div></section>

<section class="sec sec--paper" style="padding-top:clamp(32px,5vw,64px)" aria-label="Contact details and enquiry form"><div class="wrap contact-grid">
<div data-reveal>
<div class="contact-list">
<a href="${site.phoneHref}"><span class="ico-wrap">${icon.phone()}</span><small>Call</small><span>${site.phone}</span></a>
<a href="mailto:${site.email}"><span class="ico-wrap">${icon.mail()}</span><small>Email</small><span>${emailText}</span></a>
<div><span class="ico-wrap">${icon.pin()}</span><small>Based in</small><span>Macclesfield, Cheshire</span></div>
<a href="${site.instagram}" target="_blank" rel="noopener noreferrer"><span class="ico-wrap">${icon.instagram.replace('<svg ', '<svg class="ico" ')}</span><small>Instagram (opens in a new tab)</small><span>@uavaerialsolutions2023</span></a>
</div>
<h2 class="h3" style="margin:40px 0 16px">What to include</h2>
<ul class="checks"><li><b>The site.</b> A town or postcode is enough to start.</li><li><b>The question.</b> What do you need to understand?</li><li><b>The output.</b> Photographs, a map, a model, repeat visits or video.</li><li><b>Any constraints.</b> Access, timing or other project considerations.</li></ul>
<p class="fine" style="margin-top:28px">A photo or plan helps. Mention it in your message and we can ask for it.</p>
</div>

<div class="form-card" data-reveal style="--d:80ms" id="enquiry">
<h2 class="h3" id="form-h" style="margin-bottom:6px">Enquiry details</h2>
<p class="muted small" style="margin-bottom:26px">A few details are enough to start.</p>
<form class="form" data-contact novalidate aria-labelledby="form-h" action="mailto:${site.email}" method="post" enctype="text/plain">
<div class="hp" aria-hidden="true"><label>Leave this field empty<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label></div>
<div class="form-grid">
<div class="field"><label for="f-name">Name <span class="req" aria-hidden="true">*</span><span class="sr-only">(required)</span></label><input id="f-name" name="name" type="text" autocomplete="name" maxlength="120" required aria-required="true"></div>
<div class="field"><label for="f-loc">Site location</label><input id="f-loc" name="location" type="text" autocomplete="off" maxlength="160" placeholder="Town or postcode"></div>
<div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="200" aria-describedby="reach-hint"></div>
<div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="40" aria-describedby="reach-hint"></div>
</div>
<p class="hint" id="reach-hint" style="margin-top:-6px">Add an email address or a phone number so we can reply. One is enough.</p>
<fieldset class="field"><legend>What do you need?</legend><div class="chips">${chipHtml}</div></fieldset>
<div class="field"><label for="f-msg">What do you need to see or understand? <span class="req" aria-hidden="true">*</span><span class="sr-only">(required)</span></label><textarea id="f-msg" name="message" maxlength="1200" required aria-required="true" placeholder="Tell us about the site and what you need."></textarea></div>
<p class="small muted" style="margin-bottom:-6px">This opens your email app with the enquiry written for you. Prefer to talk? Call <a href="${site.phoneHref}" style="text-decoration:underline">${site.phone}</a>.</p>
<div><button class="btn" type="submit">Email my enquiry ${arrow}</button></div>
<div class="form-status" role="status" aria-live="polite"></div>
<p class="fine">Nothing is sent until you press Send in your email app. We use what you share to reply to your enquiry. See <a href="/privacy-cookies/#privacy" style="text-decoration:underline">Privacy</a>.</p>
</form>
</div>
</div></section>`;

  return {
    path: '/contact/',
    title: 'Contact UAV Aerial Solutions | Request a free drone quote',
    description: 'Request a free quote for drone roof inspections, mapping, 3D modelling or aerial photography in Cheshire. Call 07780 947875 or email us.',
    jsonld: [businessLd(), crumbLd(crumbs)],
    body
  };
}

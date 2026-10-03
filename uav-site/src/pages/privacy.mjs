import { site, crumbLd, crumbs as crumbsHtml } from '../lib/site.mjs';

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Privacy, cookies & terms', path: '/privacy-cookies/' }];

export default function page() {
  const body = `<section class="phero" aria-labelledby="page-h1"><div class="wrap" style="padding-block:clamp(40px,6vw,80px) clamp(24px,3vw,40px)"><div class="phero-copy" style="max-width:820px">${crumbsHtml(crumbs)}<p class="kicker">Website information</p><h1 class="h1" id="page-h1">Privacy, cookies &amp; website terms.</h1><p class="lead">How we handle enquiries, what this website stores on your device, and the basis on which service information on this website is provided.</p></div></div></section>

<section class="sec sec--paper" style="padding-top:clamp(24px,3vw,40px)"><div class="wrap legal">
<nav class="legal-nav" aria-label="On this page"><a href="#privacy">Privacy</a><a href="#cookies">Cookies &amp; website technology</a><a href="#terms">Website terms</a></nav>

<section class="legal-sec" id="privacy" aria-labelledby="privacy-h"><h2 class="h2" id="privacy-h">Privacy</h2>
<h3>Who we are</h3>
<p>UAV Aerial Solutions, Macclesfield, Cheshire, is responsible for the personal information you send us. You can reach us on <a href="${site.phoneHref}">${site.phone}</a> or at <a href="mailto:${site.email}">${site.email}</a>.</p>
<h3>Information you give us</h3>
<p>If you phone or email us, or use the enquiry form, you may give us your name, email address, telephone number, site location and details of your project.</p>
<h3>How the enquiry form works</h3>
<p>The form does not send anything from this website. When you press the button it opens your own email app with your message filled in, addressed to us. This also works if JavaScript is switched off. Nothing reaches us until you press Send in that app. The message then travels through your email provider and ours, under their own terms and privacy policies.</p>
<h3>How we use it</h3>
<p>We use it to reply to your enquiry, understand the work you need, prepare a quote and keep ordinary business records. We rely on taking steps at your request before a contract is made, and on our legitimate interest in running the business and answering enquiries. We do not sell your information.</p>
<h3>How long we keep it</h3>
<p>We keep enquiries for as long as we need them to deal with your request and any work that follows, and for normal business and legal record-keeping.</p>
<h3>Your rights</h3>
<p>Under UK data protection law you can ask to see, correct or delete the information we hold about you, and object to or ask us to restrict how we use it. Email <a href="mailto:${site.email}">${site.email}</a> and we will respond. You can also complain to the Information Commissioner&rsquo;s Office at <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer">ico.org.uk<span class="sr-only"> (opens in a new tab)</span></a>.</p>
<h3>Changes</h3>
<p>We will update this page if the way this website handles information changes. Last updated 3 October 2026.</p>
</section>

<section class="legal-sec" id="cookies" aria-labelledby="cookies-h"><h2 class="h2" id="cookies-h">Cookies &amp; website technology</h2>
<h3>Cookies and storage</h3>
<p>This website does not set cookies, does not store anything in your browser, and does not use analytics or advertising tools, so there is no cookie banner to accept.</p>
<h3>Fonts, scripts and images</h3>
<p>The fonts, scripts and images on this website are all delivered from the website itself. Browsing it does not load anything from third-party services.</p>
<h3>Hosting</h3>
<p>Our hosting provider may keep ordinary server logs, such as your IP address and the pages requested, so that the website can be delivered and kept secure.</p>
<h3>Links to other sites</h3>
<p>If you follow a link to another website, such as Instagram, Facebook or the Information Commissioner&rsquo;s Office, that site&rsquo;s own privacy and cookie policies apply.</p>
<h3>If this changes</h3>
<p>If analytics or similar tools are ever added, this page will be updated first.</p>
</section>

<section class="legal-sec" id="terms" aria-labelledby="terms-h"><h2 class="h2" id="terms-h">Website terms</h2>
<h3>Overview</h3>
<p>This website gives general information about the services offered by UAV Aerial Solutions. Project scope, deliverables, timing, access, accuracy requirements and commercial terms are agreed for each job.</p>
<h3>Website information</h3>
<p>Service descriptions explain typical uses and outputs. They are not a substitute for a project-specific quotation or scope, or for professional advice from any other discipline involved in your project.</p>
<h3>Accuracy and measurement</h3>
<p>Where mapping or positional accuracy matters, the required accuracy basis is agreed before capture. Any general accuracy statement on this website depends on the project setup, conditions, capture method and agreed deliverable.</p>
<h3>Site and flight constraints</h3>
<p>Drone operations can depend on weather, access, site conditions, airspace and other practical or regulatory considerations. A proposed date or method may need to change if those conditions require it.</p>
<h3>Photography</h3>
<p>Some photography on this website is licensed stock imagery used to illustrate typical sites and environments. It is not presented as evidence of a particular UAV Aerial Solutions project.</p>
<h3>Images and models</h3>
<p>Delivered imagery, maps and models should be used for the purpose agreed in the project scope. Aerial imagery does not by itself replace specialist structural, engineering, surveying or other professional assessment where that is required.</p>
<h3>Links to other sites</h3>
<p>Links to other websites are provided for convenience. We are not responsible for their content or availability.</p>
<h3>Contact</h3>
<p>For questions about a project or these website terms, email <a href="mailto:${site.email}">${site.email}</a>.</p>
</section>
</div></section>`;

  return {
    path: '/privacy-cookies/',
    title: 'Privacy, cookies & website terms | UAV Aerial Solutions',
    description: 'How UAV Aerial Solutions handles enquiries, what this website stores on your device, and the terms on which service information is provided.',
    jsonld: [crumbLd(crumbs)],
    body
  };
}

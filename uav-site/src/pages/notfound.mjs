import { services, arrow } from '../lib/site.mjs';
import { btn } from '../lib/blocks.mjs';
import { fx } from '../lib/fx.mjs';
import { droneSvg } from '../lib/drone.mjs';

export default function page() {
  const body = `<section class="sec sec--paper nf" aria-labelledby="page-h1">${fx('topo-town')}<div class="nf-drone" aria-hidden="true"><span class="nf-ret"><b></b><b></b><b></b><b></b></span><span class="nf-d">${droneSvg}</span></div><div class="wrap"><div style="max-width:640px"><p class="big-num" aria-hidden="true">404</p><p class="kicker" style="margin-top:20px">Page not found</p><h1 class="h1" id="page-h1" style="margin-top:18px">That page is not here.</h1><p class="lead" style="margin-top:20px">The link may be out of date, or the address may have been typed differently. These will get you back on track.</p><div class="btn-row" style="margin-top:30px">${btn('/', 'Back to the home page')}${btn('/services/', 'Browse services', 'ghost')}${btn('/contact/', 'Contact us', 'ghost')}</div></div></div></section>`;
  return {
    path: '/404/',
    noindex: true,
    title: 'Page not found | UAV Aerial Solutions',
    description: 'The page you were looking for could not be found. Browse UAV Aerial Solutions drone services or get in touch.',
    jsonld: [],
    body
  };
}

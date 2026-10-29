/* Silo site tracking. One file, loaded on every page.
   Keys are public by design (browser analytics). Empty key = that tool stays off,
   so this file is safe to ship before the accounts exist.
   PostHog: pageviews, session replay, and two product events.
   Meta pixel: PageView + InitiateCheckout. Purchase comes from Shopify's own
   pixel/Conversions API, never from here (no double counting). */
(function () {
  var CONFIG = {
    POSTHOG_KEY: 'phc_s3GgMkC4DHgLXamYfX73bTN5pYXsegCLdk777vcBsPUC',            // phc_… from PostHog → Project settings
    POSTHOG_HOST: 'https://us.i.posthog.com',
    META_PIXEL_ID: '2009048649787097'           // from Meta Events Manager → Silo Ads pixel
  };

  var ready = [];
  function whenPosthog(fn) { window.posthog && window.posthog.__loaded ? fn(window.posthog) : ready.push(fn); }

  if (CONFIG.POSTHOG_KEY) {
    var s = document.createElement('script');
    s.async = true;
    s.src = CONFIG.POSTHOG_HOST.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
    s.onload = function () {
      window.posthog.init(CONFIG.POSTHOG_KEY, {
        api_host: CONFIG.POSTHOG_HOST,
        defaults: '2025-05-24',
        capture_pageview: true,
        capture_pageleave: true,
        persistence: 'localStorage+cookie',
        loaded: function (ph) { ready.forEach(function (fn) { fn(ph); }); ready = []; }
      });
    };
    document.head.appendChild(s);
  }

  if (CONFIG.META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CONFIG.META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // checkout_started: any [sf-checkout] control on any page.
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[sf-checkout]') : null;
    if (!el) return;
    var props = { page: location.pathname };
    whenPosthog(function (ph) { ph.capture('checkout_started', props); });
    if (window.fbq) window.fbq('track', 'InitiateCheckout');
  }, true);

  // waitlist_signup: index.html dispatches this after /api/waitlist succeeds.
  // Product only — the email never goes to analytics.
  document.addEventListener('silo:waitlist', function (e) {
    var props = { product: (e.detail && e.detail.product) || 'unknown', page: location.pathname };
    whenPosthog(function (ph) { ph.capture('waitlist_signup', props); });
    if (window.fbq) window.fbq('track', 'Lead', { content_name: props.product });
  });
})();

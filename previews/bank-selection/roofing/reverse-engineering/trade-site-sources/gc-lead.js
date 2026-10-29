/* Green Conception: visitor source tracking, quote lead capture and resume helpers.
   Loaded on every page. Stores first and last non-direct touch in localStorage so
   quote leads and bookings carry the real source (Google Ads, Meta, organic, AI). */
(function(){
  var KEY = "gc_attr_v1";
  var CFG = window.GC_LEAD_CONFIG || {};
  function q(){ try{ return new URLSearchParams(location.search); }catch(e){ return { get:function(){return null;} }; } }
  function clip(v,n){ return v ? String(v).trim().slice(0, n||150) : ""; }
  function host(u){ try{ return new URL(u).hostname.replace(/^www\./,""); }catch(e){ return ""; } }
  function read(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {}; }catch(e){ return {}; } }
  function write(d){ try{ localStorage.setItem(KEY, JSON.stringify(d)); }catch(e){} }

  function classify(){
    var p = q(), ref = document.referrer || "", rh = host(ref), self = location.hostname.replace(/^www\./,"");
    if(rh === self || /greenconception\.com$/.test(rh)) rh = "";
    var t = {
      source: clip(p.get("utm_source")), medium: clip(p.get("utm_medium")), campaign: clip(p.get("utm_campaign")),
      content: clip(p.get("utm_content")), term: clip(p.get("utm_term")),
      gclid: clip(p.get("gclid"),200), gbraid: clip(p.get("gbraid"),200), wbraid: clip(p.get("wbraid"),200),
      fbclid: clip(p.get("fbclid"),200), msclkid: clip(p.get("msclkid"),200),
      ref: rh, landing: clip(location.pathname,200), ts: Date.now()
    };
    if(!t.source){
      if(t.gclid || t.gbraid || t.wbraid){ t.source = "google"; t.medium = "cpc"; }
      else if(t.msclkid){ t.source = "bing"; t.medium = "cpc"; }
      else if(t.fbclid){ t.source = "facebook"; t.medium = "social"; }
      else if(/(^|\.)google\./.test(rh)){ t.source = "google"; t.medium = "organic"; }
      else if(/(^|\.)(bing\.com|duckduckgo\.com|search\.yahoo\.com|yahoo\.com|ecosia\.org)$/.test(rh)){ t.source = rh.split(".")[0]; t.medium = "organic"; }
      else if(/(chatgpt\.com|openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai)$/.test(rh)){ t.source = rh; t.medium = "ai_referral"; }
      else if(/(facebook\.com|instagram\.com|t\.co|x\.com|linkedin\.com|youtube\.com|tiktok\.com|nextdoor\.com|yelp\.com)$/.test(rh)){ t.source = rh; t.medium = "social"; }
      else if(rh){ t.source = rh; t.medium = "referral"; }
      else { t.source = "direct"; t.medium = "none"; }
    }
    return t;
  }

  var d = read(), t = classify(), cta = clip(q().get("cta"),80);
  if(!d.first) d.first = t;
  if(t.source !== "direct" || !d.last) d.last = t;
  if(cta){ d.cta = cta; d.cta_page = clip(location.pathname,120); d.cta_ts = Date.now(); }
  d.pages = (d.pages||0) + 1;
  write(d);

  var GC = window.GC = window.GC || {};
  GC.attr = function(){ return read(); };
  // Source fields for Calendly links. URL utm values still win when present.
  GC.bookingSource = function(defCampaign){
    var a = read(), l = a.last || {}, p = q();
    return {
      utm_source: clip(p.get("utm_source"),250) || l.source || "website",
      utm_medium: clip(p.get("utm_medium"),250) || l.medium || "website",
      utm_campaign: clip(p.get("utm_campaign"),250) || l.campaign || defCampaign || "website"
    };
  };
  GC.ctaTag = function(){ var a = read(); return a.cta || ""; };
  GC.callbackText = CFG.callbackText || "A Green Conception specialist will call you from (800) 333-6695 within 5 minutes during business hours.";

  GC.submitLead = function(lead){
    var a = read();
    lead = lead || {};
    lead.attribution = { first: a.first || null, last: a.last || null, cta: a.cta || "", cta_page: a.cta_page || "", pages: a.pages || 0 };
    lead.page = location.pathname;
    lead.submitted_at = new Date().toISOString();
    try{ (window.dataLayer = window.dataLayer || []).push({ event: "quote_lead_submitted", quote_type: lead.quote_type || "", lead_source: (a.last||{}).source || "", lead_medium: (a.last||{}).medium || "", cta: a.cta || "", quote_id: lead.quote_id || "" }); }catch(e){}
    return fetch("/api/lead/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), keepalive: true })
      .then(function(r){ return r.json().catch(function(){ return { ok: r.ok }; }); })
      .then(function(res){
        // Meta Lead fires only after the lead form is accepted by the server.
        try{ if(res && res.ok !== false && typeof window.fbq === "function"){
          window.fbq("track", "Lead", { content_category: (lead.quote_type || "quote") + "_quote", content_name: "quote_form" }, { eventID: "lead_" + (lead.quote_id || Date.now()) });
        } }catch(e){}
        return res;
      })
      .catch(function(){ return { ok: false }; });
  };

  // Remember an in-progress quote so a returning visitor can pick it up again.
  GC.saveProgress = function(kind, info){ try{ localStorage.setItem("gc_resume_" + kind, JSON.stringify(Object.assign({ ts: Date.now() }, info))); }catch(e){} };
  GC.getProgress = function(kind, maxDays){
    try{ var v = JSON.parse(localStorage.getItem("gc_resume_" + kind)); if(!v || !v.ts) return null;
      if(Date.now() - v.ts > (maxDays||30)*864e5) return null; return v; }catch(e){ return null; }
  };
  GC.clearProgress = function(kind){ try{ localStorage.removeItem("gc_resume_" + kind); }catch(e){} };
})();

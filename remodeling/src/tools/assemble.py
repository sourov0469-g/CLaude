#!/usr/bin/env python3
"""FINALIZE · single-file assembly. Reads the five built pages from ../site and writes ONE file, ../site/elbaz-construction.html,
with in-file navigation:
  - each page is kept whole as a template (its own document, so its CSS and scripts stay isolated: no class collisions,
    a fresh runtime per page), shown in one full-viewport frame;
  - shared heavy blocks are stored once: the image store (the union of every page's images) and GSAP;
  - a small bridge is injected into every page: links to the other pages are handed to the shell, outside links open in
    a new tab, the consultation mail opens from the top window;
  - the shell swaps pages behind the logo's page-switch beat (the bracket closes into the room, then opens on the new
    page), keeps #/page in the address (back, forward and deep links work), and honours reduced motion.
The 104 inherited backups never reach the file (they are not in the built pages; checked here)."""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(HERE, "..", "..", "site")
PAGES = [("home", "elbaz-homepage.html"), ("kitchens", "kitchens.html"), ("bathrooms", "bathrooms.html"), ("renovation", "renovation.html"), ("contact", "contact.html")]
FILE = {f: k for k, f in PAGES}
SCR = "@@SCR@@"
CMT = "@@CMT@@"   # "<!--" inside a script element can switch the parser into double-escaped script data: neutralised too

def main():
    union, gsap_body, tpls, titles = {}, None, {}, {}
    for key, fn in PAGES:
        h = open(os.path.join(SITE, fn), encoding="utf-8").read()
        assert SCR not in h and CMT not in h and "/*@@" not in h, fn
        if re.search(r'<div class="ver[^"]*" data-v="b', h):
            sys.exit("backup version found in " + fn)
        titles[key] = re.search(r"<title>(.*?)</title>", h, re.S).group(1).strip()
        # the image store: keep the union once; the page keeps only the list of its own keys
        m = re.search(r'(<script id="img-store" type="application/json">)(.*?)(</script>)', h, re.S)
        store = json.loads(m.group(2))
        union.update(store)
        h = h[:m.start(2)] + "/*@@IMG:" + ",".join(sorted(store)) + "@@*/" + h[m.end(2):]
        # GSAP: identical in every page, stored once
        g = re.search(r"<script>(/\*!\s*\* GSAP .*?)</script>", h, re.S)
        if g:
            if gsap_body is None: gsap_body = g.group(1)
            assert g.group(1) == gsap_body, "GSAP differs in " + fn
            h = h[:g.start(1)] + "/*@@GSAP@@*/" + h[g.end(1):]
        bridge = ("<script>(function(){var FILE=" + json.dumps(FILE) + ";"
            "window.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';"
            "var m=h.match(/^([a-z-]+\\.html)(#.*)?$/);if(m&&FILE[m[1]]){e.preventDefault();e.stopPropagation();parent.postMessage({ezgo:FILE[m[1]],hash:(m[2]||'').slice(1)},'*');return;}"
            "if(/^https?:/.test(h)&&!a.target){a.target='_blank';a.rel='noopener';}},true);"
            "function mail(){if(window.EZ){EZ.consultMail=function(u){try{top.location.href=u;}catch(x){location.href=u;}};}}"
            "mail();window.addEventListener('load',mail);})();</script>")
        h = h.replace("</body>", bridge + "</body>", 1)
        tpls[key] = h.replace("</script", SCR).replace("<!--", CMT)
    shell_logo = ('<svg class="sw__mk" viewBox="0 0 48 48" aria-hidden="true"><path class="sw__br" d="M38 7.5 H10 V40.5 H38"/>'
                  '<path class="sw__cl" d="M38 40.5 V7.5"/><rect class="sw__tile" x="16" y="19" width="14" height="10"/></svg>')
    out = ['<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
           '<title>' + titles["home"] + '</title><meta name="description" content="Elbaz Construction: licensed design-build remodeler for kitchens, bathrooms and whole homes across Miami-Dade, Broward and Palm Beach.">',
           '<style>html,body{margin:0;height:100%;background:#FAF6F1;overflow:hidden}#pg{position:fixed;inset:0;width:100%;height:100%;border:0;display:block;background:#FAF6F1}'
           '.sw{position:fixed;inset:0;z-index:5;display:grid;place-items:center;background:#F5EEE6;opacity:0;visibility:hidden;transition:opacity .22s cubic-bezier(.22,1,.36,1),visibility 0s linear .22s}'
           '.sw.is-on{opacity:1;visibility:visible;transition:opacity .18s cubic-bezier(.22,1,.36,1),visibility 0s}'
           '.sw__mk{width:72px;height:72px;overflow:visible}.sw__br,.sw__cl{fill:none;stroke:#1F1A17;stroke-width:4.5;stroke-linecap:square}'
           '.sw__cl{stroke-dasharray:34;stroke-dashoffset:34;transition:stroke-dashoffset .26s cubic-bezier(.38,.005,.215,1)}.sw.is-on .sw__cl{stroke-dashoffset:0}'
           '.sw__tile{fill:#A45540;transform-box:fill-box;transform-origin:50% 50%;transition:transform .26s cubic-bezier(.38,.005,.215,1)}.sw.is-on .sw__tile{transform:translateX(-3px)}'
           '@media (prefers-reduced-motion:reduce){.sw,.sw.is-on,.sw__cl,.sw__tile{transition:none}}</style></head><body>',
           '<iframe id="pg" title="Elbaz Construction"></iframe><div class="sw" aria-hidden="true">' + shell_logo + '</div>',
           '<script id="imgs" type="application/json">' + json.dumps(union, separators=(",", ":")).replace("</", "<\\/") + '</script>',
           '<script id="b-gsap" type="text/plain">' + gsap_body.replace("</script", SCR) + '</script>']
    for key, _ in PAGES:
        out.append('<script id="p-' + key + '" type="text/plain">' + tpls[key] + '</script>')
    out.append("""<script>(function () {
  var TITLES = """ + json.dumps(titles) + """, cache = {}, frame = document.getElementById('pg'), sw = document.querySelector('.sw'), cur = null;
  var IMGS = JSON.parse(document.getElementById('imgs').textContent), GS = document.getElementById('b-gsap').textContent.split('""" + SCR + """').join('</scr' + 'ipt');
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function build(id) {
    if (cache[id]) return cache[id];
    var t = document.getElementById('p-' + id).textContent.split('""" + SCR + """').join('</scr' + 'ipt').split('""" + CMT + """').join('<!' + '--');
    t = t.replace(/\\/\\*@@IMG:([^@]*)@@\\*\\//, function (_, ks) { var o = {}; ks.split(',').forEach(function (k) { if (k && IMGS[k]) o[k] = IMGS[k]; }); return JSON.stringify(o).replace(/<\\//g, '<\\\\/'); });
    t = t.replace('/*@@GSAP@@*/', function () { return GS; });
    return (cache[id] = t);
  }
  function land(hash) {
    var w = frame.contentWindow, d = frame.contentDocument; if (!d) return;
    document.title = TITLES[cur] || document.title;
    if (hash) { var el = d.getElementById(hash); if (el) setTimeout(function () { if (w.EZ && w.EZ.scrollTo) w.EZ.scrollTo(el); else el.scrollIntoView(); }, 60); }
    try { w.focus(); } catch (x) {}
  }
  function go(id, hash, push) {
    if (!TITLES[id]) id = 'home';
    if (push) history.pushState(null, '', '#/' + id + (hash ? '/' + hash : ''));
    if (id === cur) { land(hash); return; }
    var first = cur === null; cur = id;
    function swap() { frame.onload = function () { land(hash); requestAnimationFrame(function () { sw.classList.remove('is-on'); }); }; frame.srcdoc = build(id); }
    if (first || still) { swap(); return; }
    sw.classList.add('is-on');                       // the page-switch beat: the bracket closes into the room
    setTimeout(swap, 260);
  }
  function route(push) { var m = location.hash.match(/^#\\/([a-z]+)(?:\\/([\\w-]+))?/); go(m ? m[1] : 'home', m && m[2], push); }
  window.addEventListener('message', function (e) { if (e.data && e.data.ezgo) go(e.data.ezgo, e.data.hash, true); });
  window.addEventListener('popstate', function () { route(false); });
  route(false);
})();</script></body></html>""")
    dest = os.path.join(SITE, "elbaz-construction.html")
    html = "".join(out)
    open(dest, "w", encoding="utf-8").write(html)
    print("wrote", dest, round(len(html.encode()) / 1e6, 2), "MB;", len(union), "images; pages:", ", ".join(k for k, _ in PAGES))

if __name__ == "__main__":
    main()

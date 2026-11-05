#!/usr/bin/env python3
"""Build the finished homepage, owl-roofing.html: ONE file holding two homepages.

  NEW  (the default): the seven reset sections, the new best version of each section of OWL-RESET-MAP.md.
  PAST (records):     the whole homepage as it stood before the 2026-11-05 reset, with every version, every
                      in-file backup and the inner pages, exactly as src/ builds it. Kept as an inert <template>:
                      never removed, never overwritten, never run unless asked for.

Which one is shown is decided once, before anything renders:
  - ?past, or any link meant for the past page (?review, ?all, ?hero=12 and the other section keys,
    or an inner-page route such as #/services), opens PAST;
  - everything else opens NEW.
The new page links to the past one ("Past versions, kept as records"); the past page carries a chip back.
Images that appear in both are stored once (window.OWLA), as before.
"""
import os, re, sys
FINAL = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(FINAL, 'owl-roofing.html')

PAST_KEYS = ['past', 'review', 'all', 'hero', 'video', 'explore', 'wise', 'wrap', 'services', 'reviews', 'area', 'family', 'booking',
             'svchero', 'svcsteps', 'pnhero', 'pnpasses', 'abhero', 'abvalues', 'wchero', 'wcparts']
PAST_ROUTES = ['services', 'protect-your-nest', 'about', 'wise-check']


def part(html, tag):
    m = re.search(r'<%s[^>]*>(.*)</%s>' % (tag, tag), html, flags=re.S)
    if not m:
        sys.exit('no <%s> found' % tag)
    return m.group(1)


def main():
    import importlib.util
    def load(name, path):
        spec = importlib.util.spec_from_file_location(name, path); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m
    past_build = load('past_build', os.path.join(FINAL, 'src', 'build.py'))
    new_build = load('new_build', os.path.join(FINAL, 'reset', 'build.py'))

    past = past_build.build_raw()
    new = new_build.build_raw()

    # head: the shared base (fonts, base.css, base.js) once, plus the palette and RESET set-up the new page needs
    head = part(new, 'head')
    reset_css = new_build.resolve(new_build.read('reset/reset.css'))
    assert reset_css in head, 'reset.css not found in the new head'
    head = head.replace(reset_css, '')                       # reset.css travels with the NEW body only
    mode = ('<script>(function(){var q=new URLSearchParams(location.search),k=%s,r=%s,h=location.hash.replace(/^#\\/?/,"").split(/[/#?]/)[0];'
            'var past=k.some(function(x){return q.has(x);})||r.indexOf(h)>-1;document.documentElement.dataset.mode=past?"past":"new";})();</script>'
            % (repr(PAST_KEYS).replace("'", '"'), repr(PAST_ROUTES).replace("'", '"')))
    head = head.replace('<script>', mode + '\n<script>', 1)

    past_body = part(past, 'body')
    new_body = part(new, 'body')

    # the switch: the new page's closing line links to the records; the past page carries a chip back
    end = '<span>We Give a Hoot</span>\n</footer>'
    assert end in new_body, 'closing line not found in section 7'
    new_body = new_body.replace(end, '<span>We Give a Hoot</span>\n <a class="pastlink" href="?past">Past versions, kept as records</a>\n</footer>', 1)
    chip = ('<style>.pastchip{position:fixed;left:12px;bottom:12px;z-index:9999;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;'
            'border-radius:999px;background:#17111D;color:#fff;font:700 14px/1 Inter,system-ui,sans-serif;text-decoration:none;box-shadow:0 10px 24px -10px rgba(0,0,0,.6)}'
            '.pastchip:focus-visible{outline:3px solid #EAA221;outline-offset:3px}</style>'
            '<a class="pastchip" href="?" aria-label="You are viewing past versions, kept as records. Back to the new homepage.">Past versions · records · back to the new homepage</a>')

    body = ('<body>\n'
            '<!-- PAST: every homepage version before the 2026-11-05 reset, kept as records. Never removed, never overwritten. Open with ?past -->\n'
            '<template id="owl-past" data-record="past homepage, all versions, kept as records">\n' + past_body + '\n' + chip + '\n</template>\n'
            '<!-- NEW: the finished homepage, the new best version of each section (see GATE-RESET-*.md) -->\n'
            '<template id="owl-new" data-record="new homepage, the bests">\n<style>\n' + reset_css + '\n</style>\n' + new_body + '\n</template>\n'
            '<script>(function(){var t=document.getElementById(document.documentElement.dataset.mode==="past"?"owl-past":"owl-new");'
            'document.body.appendChild(t.content.cloneNode(true));})();</script>\n'
            '</body>')

    html_open = re.search(r'<html[^>]*>', new).group(0)
    html = '<!doctype html>\n' + html_open + '\n<head>' + head + '</head>\n' + body + '\n</html>\n'
    html = past_build.dedupe(html)
    # videos too: a film used by the past records and the new page (Owl's crew film) is stored once
    import collections
    vids = [u for u, n in collections.Counter(re.findall(r'data:video/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{20000,}', html)).items() if n > 1]
    if vids:
        vkeys = {u: 'v%d' % i for i, u in enumerate(vids)}
        for u, k in vkeys.items():
            html = html.replace("'%s'" % u, 'OWLA["%s"]' % k).replace('"%s"' % u, 'OWLA["%s"]' % k)
        vstore = '<script>window.OWLA=window.OWLA||{};' + ''.join('OWLA.%s="%s";' % (k, u) for u, k in vkeys.items()) + '</script>'
    else:
        vstore = ''
    # the shared image store must exist before the head's own scripts look anything up
    m = re.search(r'<script>window\.OWLA=\{.*?\};</script>', html, flags=re.S)
    if m:
        html = html[:m.start()] + html[m.end():]
        html = html.replace('<head>', '<head>' + m.group(0) + vstore, 1)
    else:
        html = html.replace('<head>', '<head>' + vstore, 1)
    open(OUT, 'w', encoding='utf-8').write(html)
    print('wrote %s (%.2f MB): NEW by default, PAST kept inside as records' % (OUT, len(html.encode()) / 1e6))


if __name__ == '__main__':
    main()

"""FINAL (owner's picks): keep ONE version of a home section and remove the others from its markup, its CSS and its JS.

usage: python3 tools/keep_version.py <section> <keep>      e.g.  python3 tools/keep_version.py financing 2

- markup: every `.ver[data-v=N]` block other than <keep> leaves (with the comment just above it); the kept one becomes data-v="1"
- CSS: rules whose selectors all belong to a removed version's class prefix leave (selectors are pruned one by one;
  empty @media blocks and the section comments that headed only removed rules go too)
- JS: every `N: { init: ... }` definition other than <keep> leaves (with its comment); the kept one becomes `1:`
The section then has one version, so the header shows no switch for it (chrome.css: .vswitch[data-count="1"]).
"""
import os, re, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def ver_blocks(html):
    """[(start, end, v, prefix)] for each top-level .ver block, end exclusive (balanced <div>)."""
    out = []
    for m in re.finditer(r'<div class="ver ([\w-]+)[^"]*" data-v="(\w+)">', html):
        depth, i = 0, m.start()
        for t in re.finditer(r'<div\b|</div>', html[m.start():]):
            depth += 1 if t.group(0) == '<div' else -1
            if depth == 0:
                out.append((m.start(), m.start() + t.end(), m.group(2), m.group(1)))
                break
    return out


def strip_html(html, keep):
    blocks = ver_blocks(html)
    prefixes = [b[3] for b in blocks if b[2] != keep]
    for s, e, v, p in reversed(blocks):
        if v == keep:
            html = html[:s] + html[s:e].replace('data-v="%s"' % v, 'data-v="1"', 1) + html[e:]
            continue
        # the comment(s) and blank lines just above the block go with it
        head = html[:s]
        m = re.search(r'(\n[ \t]*\n)?(([ \t]*<!--(?:(?!-->).)*?-->[ \t]*\n)+)?[ \t]*$', head, re.S)
        s2 = m.start() if m else s
        html = html[:s2] + html[e:]
    # retired-version notes left behind
    html = re.sub(r'\n[ \t]*<!-- \(Retired[^>]*?-->[ \t]*(?=\n)', '', html)
    return html, prefixes


# ---------------- CSS ----------------
def css_tokens(css):
    """top-level items: ('c', text) comments, ('r', sel, body) rules, ('a', head, inner) at-rule blocks, ('s', text) other."""
    i, n, out = 0, len(css), []
    while i < n:
        if css[i].isspace():
            j = i
            while j < n and css[j].isspace():
                j += 1
            out.append(('w', css[i:j])); i = j; continue
        if css.startswith('/*', i):
            j = css.index('*/', i) + 2
            out.append(('c', css[i:j])); i = j; continue
        # a rule or at-rule: read up to the matching brace (or ';' for a statement)
        j, depth = i, 0
        while j < n:
            ch = css[j]
            if css.startswith('/*', j):
                j = css.index('*/', j) + 2; continue
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    j += 1; break
            elif ch == ';' and depth == 0:
                j += 1; break
            j += 1
        text = css[i:j]
        if '{' in text:
            head, body = text.split('{', 1)
            body = body[:body.rindex('}')]
            out.append(('a' if head.strip().startswith('@') and not head.strip().startswith('@font-face') else 'r', head, body))
        else:
            out.append(('s', text))
        i = j
    return out


def css_strip(css, prefixes):
    if not prefixes:
        return css
    pat = re.compile(r'\.(?:%s)(?:__[\w-]+)?(?![\w-])' % '|'.join(map(re.escape, prefixes)))
    kf = re.compile(r'@keyframes\s+(?:%s)[-_]' % '|'.join(map(re.escape, prefixes)))

    def split_sel(head):
        parts, depth, cur = [], 0, ''
        for ch in head:
            if ch in '([':
                depth += 1
            elif ch in ')]':
                depth -= 1
            if ch == ',' and depth == 0:
                parts.append(cur); cur = ''
            else:
                cur += ch
        parts.append(cur)
        return parts

    def walk(css):
        toks = css_tokens(css)
        kept = []
        for t in toks:
            if t[0] == 'r':
                sels = split_sel(t[1])
                good = [s for s in sels if not pat.search(s)]
                if not good:
                    kept.append(('x',)); continue
                if len(good) < len(sels):
                    head = ','.join(good)
                    lead = re.match(r'\s*', sels[0]).group(0)
                    t = ('r', lead + head.strip() + ' ', t[2])
                kept.append(t)
            elif t[0] == 'a':
                if kf.search(t[1]):
                    kept.append(('x',)); continue
                if t[1].strip().startswith('@keyframes'):
                    kept.append(t); continue
                inner = walk(t[2])
                if not re.sub(r'/\*.*?\*/', '', inner, flags=re.S).strip():
                    kept.append(('x',)); continue
                kept.append(('a', t[1], inner))
            else:
                kept.append(t)
        # comments that head only removed rules leave too: a comment followed (past whitespace/comments) by a removed item
        res = []
        for idx, t in enumerate(kept):
            if t[0] == 'c':
                j = idx + 1
                while j < len(kept) and kept[j][0] in ('w', 'c'):
                    j += 1
                if j >= len(kept) or kept[j][0] == 'x':
                    res.append(('x',)); continue
            res.append(t)
        s = ''
        for t in res:
            if t[0] == 'x':
                continue
            if t[0] in ('w', 'c', 's'):
                s += t[1]
            else:
                s += t[1] + '{' + t[2] + '}'
        return s

    out = re.sub(r'\n[ \t]+(?=\n)', '\n', walk(css))
    return re.sub(r'\n{3,}', '\n\n', out)


# ---------------- JS ----------------
def strip_js(js, keep):
    # the version definitions are the keys of the object passed to EZ.section(id, { ... }); the object closes at the
    # last "  });" of the file
    start = re.search(r"EZ\.section\('[\w-]+',\s*\{", js).end()
    end_obj = js.rindex('\n  });') + 1
    locs = [(mm.start(1), mm.group(1)) for mm in re.finditer(r"(?m)^[ \t]*(\d+): \{ init: function", js)]
    il = re.search(r"EZ\.section\('[\w-]+', \{ (\d+): \{ init: function", js)
    if il:
        locs = sorted(locs + [(il.start(1), il.group(1))])
    locs = [x for x in locs if start - 2 <= x[0] < end_obj]
    LC = r'(?:[ \t]*/\*(?:(?!\*/).)*?\*/[ \t]*\n|[ \t]*//[^\n]*\n|[ \t]*\n)+'
    spans = []
    for idx, (p, v) in enumerate(locs):
        q = locs[idx + 1][0] if idx + 1 < len(locs) else end_obj
        if idx + 1 < len(locs):   # the next definition's leading comment (and blank lines) stay with it
            cm = re.search(r'\n(' + LC + r')[ \t]*$', js[p:q], re.S)
            if cm:
                q = p + cm.start(1)
        p2 = p
        if js[max(0, p - 60):p].find('EZ.section(') < 0:   # its own leading comment goes with it
            om = re.search(r'\n(' + LC + r')[ \t]*$', js[start:p], re.S)
            p2 = start + om.start(1) if om else p - (len(js[:p]) - len(js[:p].rstrip(' \t')))
        spans.append((p2, q, v, p))
    for p2, q, v, p in reversed(spans):
        if v == keep:
            js = js[:p] + '1' + js[p + len(v):]
        else:
            js = js[:p2] + js[q:]
    js = re.sub(r'\} \},(\s*\n\s*\}\);\n\}\)\(\);)', r'} }\1', js)
    return js


def main():
    sid, keep = sys.argv[1], sys.argv[2]
    hp = os.path.join(HERE, 'sections', sid + '.html')
    cp = os.path.join(HERE, 'css', 'sections', sid + '.css')
    jp = os.path.join(HERE, 'js', 'sections', sid + '.js')
    html, prefixes = strip_html(open(hp).read(), keep)
    html = html.replace('id="%s-h-%s"' % (sid, keep), 'id="%s-h"' % sid)   # the kept heading takes the section's own id
    css = css_strip(open(cp).read(), prefixes)
    js = strip_js(open(jp).read(), keep)
    open(hp, 'w').write(html)
    open(cp, 'w').write(css)
    open(jp, 'w').write(js)
    print(sid, 'kept', keep, 'removed prefixes', prefixes)


if __name__ == '__main__':
    main()

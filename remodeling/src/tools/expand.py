#!/usr/bin/env python3
"""OWNER MASTER DIRECTIVE Phase 5 helper.
  expand.py backup  <sec> <first_bk>                    move every visible version to hidden backups b<first_bk>.. in order;
                                                         only its slot name changes (data-v + hidden, JS key), nothing else
  expand.py improve <sec> <bk> <old> <new> <slot>       copy backup <bk> into visible <slot> under class prefix <new>
                                                         (HTML block ids suffixed -i, CSS rules naming <old>, JS def)
New visible blocks are inserted before the first backup block, in slot order."""
import re, sys, os, subprocess
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cmd, sec = sys.argv[1], sys.argv[2]
hp = os.path.join(HERE, 'sections', sec + '.html'); cp = os.path.join(HERE, 'css', 'sections', sec + '.css'); jp = os.path.join(HERE, 'js', 'sections', sec + '.js')
H, C, J = open(hp).read(), open(cp).read(), open(jp).read()

def block(h, v):
    m = re.search(r'<div class="ver [^"]*" data-v="' + re.escape(v) + r'"[^>]*>', h)
    if not m: raise SystemExit('no block ' + v)
    i = m.start(); depth = 0
    for t in re.finditer(r'<div\b|</div>', h[i:]):
        depth += 1 if t.group(0) == '<div' else -1
        if depth == 0: return i, i + t.end()

def defspan(s, key):
    m = re.search(r'\n(\s*)' + re.escape(key) + r': \{ init: function', s)
    if not m: raise SystemExit('def ' + key + ' not found')
    i = m.start() + 1
    # the def ends where the next sibling def (or the section map's close) begins at the same indent
    nxt = re.search(r'\n    (?:/\*.*?\*/\s*)*[0-9a-z]+: \{ init: function|\n  \}\);', s[m.end():], re.S)
    end = m.end() + nxt.start()
    body = s[i:end].rstrip()
    if not body.endswith(','): body += ','
    return i, end, body

if cmd == 'backup':
    k = int(sys.argv[3])
    vis = re.findall(r'<div class="ver [^"]*" data-v="(\d)"', H)
    for n, v in enumerate(vis):
        nb = 'b%d' % (k + n)
        H = re.sub(r'(<div class="ver [^"]*" data-v=")' + v + r'"( hidden)?>', lambda m: m.group(1) + '@@' + nb + '" hidden>', H, count=1)
        J = re.sub(r'\n(\s*)' + v + r': \{ init: function', '\n\\g<1>@@' + nb + ': { init: function', J, count=1)
    # placeholders are '@@', which never occurs in this code (the first version used '__' and stripped real BEM '__b' names)
    H = H.replace('data-v="@@b', 'data-v="b'); J = J.replace('@@b', 'b')
    open(hp, 'w').write(H); open(jp, 'w').write(J)
    print('backed up', vis, '->', ['b%d' % (k + n) for n in range(len(vis))])

elif cmd == 'improve':
    bk, old, new, slot = sys.argv[3:7]
    rn = lambda t: re.sub(r'(?<![\w-])' + re.escape(old) + r'(?=__|[\s."\'\-:{,)\]]|$)', new, t)
    i, j = block(H, bk)
    blk = rn(H[i:j])
    blk = re.sub(r'data-v="' + bk + '" hidden>', 'data-v="' + slot + '"' + (' hidden' if slot != '1' else '') + '>', blk, count=1)
    for d in re.findall(r'\sid="([^"]+)"', blk):
        blk = re.sub(r'(\s(?:id|for|aria-controls|aria-describedby|aria-labelledby)=")' + re.escape(d) + r'"', r'\g<1>' + d + '-i"', blk)
        blk = blk.replace('href="#' + d + '"', 'href="#' + d + '-i"').replace("url(#" + d + ")", "url(#" + d + "-i)")
    first_bk = re.search(r'<div class="ver [^"]*" data-v="b\d"', H).start()
    # keep visible blocks in slot order: insert before the first visible block with a higher slot, else before the backups
    later = [m.start() for m in re.finditer(r'<div class="ver [^"]*" data-v="(\d)"', H) if int(m.group(1)) > int(slot)]
    at = min(later) if later else first_bk
    H = H[:at] + '<!-- slot ' + slot + ' · Phase 5 improved version of ' + bk + ' (.' + old + ' -> .' + new + ') -->\n  ' + blk + '\n\n  ' + H[at:]
    pat = re.compile(r'(?<![\w-])' + re.escape(old) + r'(?=__|[\s.:{,\[]|$)')
    out = []
    def rules(text):
        i = 0; n = len(text)
        while i < n:
            j = text.find('{', i)
            if j < 0: break
            depth = 0; k = j
            while k < n:
                if text[k] == '{': depth += 1
                elif text[k] == '}':
                    depth -= 1
                    if depth == 0: break
                k += 1
            yield text[i:j].strip(), text[j + 1:k]; i = k + 1
    for sel, body in rules(re.sub(r'/\*.*?\*/', '', C, flags=re.S)):
        if sel.startswith('@media') or sel.startswith('@supports'):
            inner = [rn(s2) + ' {' + rn(b2) + '}' for s2, b2 in rules(body) if pat.search(s2)]
            if inner: out.append(sel + ' {\n  ' + '\n  '.join(inner) + '\n}')
        elif sel.startswith('@keyframes'): continue
        elif pat.search(sel): out.append(rn(sel) + ' {' + rn(body) + '}')
    C += '\n\n/* ---------- slot ' + slot + ' · Phase 5 improved version of ' + bk + ' (.' + old + ' -> .' + new + '); improvements follow ---------- */\n' + '\n'.join(out) + '\n'
    a, b, body = defspan(J, bk)
    d = rn(body)
    d = re.sub(r'^(\s*)' + re.escape(bk) + r': \{', r'\g<1>' + slot + ': {', d, count=1)
    m = re.search(r"EZ\.section\('" + re.escape(sec) + r"', \{\n", J)
    J = J[:m.end()] + '    /* slot ' + slot + ' · Phase 5 improved version of ' + bk + ' */\n' + d + '\n\n' + J[m.end():]
    open(hp, 'w').write(H); open(cp, 'w').write(C); open(jp, 'w').write(J)
    r = subprocess.run(['node', '--check', jp], capture_output=True, text=True)
    print('improved', bk, '->', slot, 'as .' + new, '' if not r.returncode else 'WARNING JS: ' + r.stderr[:300])

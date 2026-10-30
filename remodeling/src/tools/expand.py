#!/usr/bin/env python3
"""OWNER MASTER DIRECTIVE Phase 5 helper.
  expand.py backup  <sec> <first_bk>                    move every visible version to hidden backups b<first_bk>.. in order;
                                                         only its slot name changes (data-v + hidden, JS key), nothing else
  expand.py improve <sec> <bk> <old> <new> <slot>       copy backup <bk> into visible <slot> under class prefix <new>
                                                         (HTML block ids suffixed -i, CSS rules naming <old>, JS def)
  expand.py record  <sec> <slot> <old> <new> <bk>       copy visible <slot> into hidden backup <bk> under class prefix <new> as the
                                                         release record (ids suffixed -r); used by the inner pages, whose
                                                         sections had no earlier versions to keep
New visible blocks are inserted before the first backup block, in slot order; records go to the end of the section."""
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

elif cmd in ('improve', 'record'):
    # improve: backup <src> -> visible slot <dst>; record: visible slot <src> -> backup <dst> (the release record)
    if cmd == 'improve': src, old, new, dst = sys.argv[3:7]; sfx = '-i'
    else: src, old, new, dst = sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6]; sfx = '-r'
    rn = lambda t: re.sub(r'(?<![\w-])' + re.escape(old) + r'(?=__|[\s."\'\-:{,)\]]|$)', new, t)
    i, j = block(H, src)
    blk = rn(H[i:j])
    vis = not dst.startswith('b')
    blk = re.sub(r'data-v="' + src + '"( hidden)?>', 'data-v="' + dst + '"' + ('' if dst == '1' else ' hidden') + '>', blk, count=1)
    for d in re.findall(r'\sid="([^"]+)"', blk):
        nd = (d[:-4] + sfx + '-err') if d.endswith('-err') else d + sfx   # keep the validator's "<input id>-err" pairing
        blk = re.sub(r'(\s(?:id|for|aria-controls|aria-describedby|aria-labelledby)=")' + re.escape(d) + r'"', r'\g<1>' + nd + '"', blk)
        blk = blk.replace('href="#' + d + '"', 'href="#' + nd + '"').replace("url(#" + d + ")", "url(#" + nd + ")")
    note = ('Phase 5 improved version of ' + src) if cmd == 'improve' else ('release record of slot ' + src)
    if vis:
        first_bk = re.search(r'<div class="ver [^"]*" data-v="b\d+"', H).start()
        later = [m.start() for m in re.finditer(r'<div class="ver [^"]*" data-v="(\d)"', H) if int(m.group(1)) > int(dst)]
        at = min(later) if later else first_bk
    else:
        at = H.rindex('</section>')
    H = H[:at] + '<!-- ' + dst + ' · ' + note + ' (.' + old + ' -> .' + new + ') -->\n  ' + blk + '\n\n' + ('  ' if vis else '') + H[at:]
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
        elif sel.startswith('@keyframes'):
            if pat.search(sel): out.append(rn(sel) + ' {' + rn(body) + '}')
        elif pat.search(sel): out.append(rn(sel) + ' {' + rn(body) + '}')
    C += '\n\n/* ---------- ' + dst + ' · ' + note + ' (.' + old + ' -> .' + new + ') ---------- */\n' + '\n'.join(out) + '\n'
    a, b, body = defspan(J, src)
    d = rn(body)
    d = re.sub(r'^(\s*)' + re.escape(src) + r': \{', r'\g<1>' + dst + ': {', d, count=1)
    for d0 in re.findall(r"'#([\w-]+)'", d):   # ids named in the script follow the markup
        if re.search(r'\sid="' + re.escape(d0) + sfx + '"', blk): d = d.replace("'#" + d0 + "'", "'#" + d0 + sfx + "'")
    if vis:
        m = re.search(r"EZ\.section\('" + re.escape(sec) + r"', \{\n", J)
        J = J[:m.end()] + '    /* slot ' + dst + ' · ' + note + ' */\n' + d + '\n\n' + J[m.end():]
    else:
        m = list(re.finditer(r'\n  \}\);', J))[-1]
        head = J[:m.start()].rstrip()
        if not head.endswith(','): head += ','
        J = head + '\n\n    /* ' + dst + ' · ' + note + ' */\n' + d.rstrip().rstrip(',') + J[m.start():]
    open(hp, 'w').write(H); open(cp, 'w').write(C); open(jp, 'w').write(J)
    r = subprocess.run(['node', '--check', jp], capture_output=True, text=True)
    print(cmd, src, '->', dst, 'as .' + new, '' if not r.returncode else 'WARNING JS: ' + r.stderr[:300])

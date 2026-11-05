"""SECTION 6 — Reviews. Version B ("Hanging tags", the ported section, upgraded in place: kit background, count-up 4.9, a gust of wind now and then, a reader
dialog you can step through) followed by Version C ("Read at reading pace") carrying ONE review only: the single best, shown big, its words lighting as you scroll.
The chosen review is a verbatim, complete (not cut) published review, index 27 of reviews.json (Megan Randolph, 344 characters)."""
import html, json, os, re
import parts_ported as PP
e = html.escape
HERE = os.path.dirname(os.path.abspath(__file__)); WORK = os.path.join(HERE, '..', '..', 'work'); PRE = os.path.join(HERE, '..', 'prep', 'backgrounds')
REPLACES = ['rev2']   # B keeps its own module ('reviews'); the old C reader is replaced
CSS = 'rev.css'; JS = 'rev.js'; GLOBAL = 'FRev'
BEST = 27
KEYS = ['Build quality was top notch,', 'install was fast and efficient.', 'pricing was very competitive!']


def art(f, cls, tag):
    s = open(os.path.join(PRE, f)).read().replace(' xmlns="http://www.w3.org/2000/svg"', '')
    s = re.sub(r'id="(\w+)"', lambda m: f'id="{tag}{m.group(1)}"', s); s = re.sub(r'url\(#(\w+)\)', lambda m: f'url(#{tag}{m.group(1)})', s); s = re.sub(r'href="#(\w+)"', lambda m: f'href="#{tag}{m.group(1)}"', s)
    return s.replace('<svg ', f'<svg class="{cls}" aria-hidden="true" focusable="false" ', 1)


def best():
    R = json.load(open(os.path.join(WORK, 'data', 'reviews.json'), encoding='utf-8')); r = R[BEST]
    assert r['name'] == 'Megan Randolph' and len(r['text']) == 344 and r['text'].rstrip().endswith('for your next project!'), r   # complete, not cut at 421
    assert all(k in r['text'] for k in KEYS)
    return r


def markup(S, contact, cal):
    r = best(); text = r['text']
    B = PP.route(S['reviewsB'], contact)
    B = B.replace('<section class="sec rvB" id="reviews" aria-labelledby="rvB-h">', '<section class="sec rvB" id="reviews" aria-labelledby="rvB-h"><div class="rv-bg" aria-hidden="true">' + art('reviews-far.svg', 'rv-far', 'rvf') + art('reviews-near.svg', 'rv-near', 'rvn') + '</div>', 1)
    assert 'rv-bg' in B
    # words, with the three published phrases marked (a design emphasis inside the verbatim quote)
    marks = set()
    for k in KEYS:
        a = text.index(k); marks.update(range(a, a + len(k)))
    words, pos = [], 0
    for w in text.split(' '):
        i = text.index(w, pos); pos = i + len(w); words.append((w, any(c in marks for c in range(i, i + len(w)))))
    W = ''.join(f'<span class="w{" k" if k else ""}" aria-hidden="true">{e(w)}</span> ' for w, k in words)
    C = f'''<section class="rc" id="reviews-read" aria-labelledby="rc-h" data-n="{len(words)}"><div class="rc-pin"><div class="rc-bg" aria-hidden="true">{art('reviews-far.svg', 'rc-far', 'rcf')}{art('reviews-near.svg', 'rc-near', 'rcn')}</div>
<div class="rc-top"><h2 class="rc-h" id="rc-h">One review, read slowly.</h2><p class="rc-rate"><span class="rc-stars" aria-hidden="true">{'<svg viewBox="0 0 20 20"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>' * 5}</span><b>4.9</b> from 474 Google reviews</p></div>
<figure class="rc-fig"><svg class="rc-qm" viewBox="0 0 120 96" aria-hidden="true" focusable="false"><path d="M8 88V50C8 26 22 10 46 6M70 88V50C70 26 84 10 108 6" pathLength="100" fill="none" stroke="#B5DB6E" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>
<blockquote class="rc-q"><p class="rc-sr">{e(text)}</p><p class="rc-vis" aria-hidden="true">{W}</p></blockquote>
<figcaption class="rc-by"><span class="rc-line" aria-hidden="true"></span><b>{e(r['name'])}</b><span>{e(r['source'])}</span></figcaption></figure>
<div class="rc-foot"><button type="button" class="rc-all">Show the whole review</button><p class="rc-note">Published on Google, shown word for word. We chose one that is complete, not cut.</p><div class="rc-meter" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="none" stroke="rgba(14,59,44,.14)" stroke-width="6"/><circle class="rc-ring" cx="32" cy="32" r="27" fill="none" stroke="#0E3B2C" stroke-width="6" stroke-linecap="round" transform="rotate(-90 32 32)" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/></svg><span class="rc-pc">0%</span><small>read</small></div></div></div></section>'''
    return B + C

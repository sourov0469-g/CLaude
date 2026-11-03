"""Phase 9: compare repeat.js frames. For each anchor: d2 vs d3 (repeatability) and u1 vs d3 (reversibility).
A pixel differs when any channel differs by more than 32 (above JPEG noise). Reports the share of differing pixels
and the bounding box of the difference, so a reader can see where it is. Usage: python3 repeat_diff.py <dir>..."""
import sys, os, json, glob
from PIL import Image, ImageChops

def diff(a, b):
    A, B = Image.open(a).convert('RGB'), Image.open(b).convert('RGB')
    d = ImageChops.difference(A, B).convert('L').point(lambda v: 255 if v > 32 else 0)
    box = d.getbbox(); hist = d.histogram()
    return round(100 * hist[255] / (A.width * A.height), 2), box

out = []
for root in sys.argv[1:]:
    run = json.load(open(os.path.join(root, 'run.json')))
    for a in run['anchors']:
        base = os.path.join(root, f"{a['id']}__{a['k']}__")
        if not os.path.exists(base + 'd3.jpg'): continue
        rep, rbox = diff(base + 'd2.jpg', base + 'd3.jpg')
        rev, vbox = diff(base + ('d0.jpg' if os.path.exists(base + 'd0.jpg') else 'u1.jpg'), base + 'd3.jpg')
        amb = diff(base + 'd3.jpg', base + 'd3b.jpg')[0] if os.path.exists(base + 'd3b.jpg') else 0
        out.append({'ambient': amb, 'page': run['page'], 'w': run['W'], 'v': run['V'], 'id': a['id'], 'k': a['k'], 'repeat': rep, 'repeat_box': rbox, 'reverse': rev, 'reverse_box': vbox, 'dir': root})
    print(run['page'], run['W'], 'v%d' % run['V'], 'errors', len(run['errors']), run['errors'][:2])
json.dump(out, open('/home/user/CLaude/qa/finalize/phase9/repeat-summary.json' if len(sys.argv) > 1 else '/dev/null', 'w'), indent=1)
for r in out:
    r['verdict'] = 'ambient' if r['ambient'] > 0.5 else ('FAIL' if r['repeat'] > 0.5 or r['reverse'] > 0.5 else 'ok')
json.dump(out, open('/home/user/CLaude/qa/finalize/phase9/repeat-summary.json', 'w'), indent=1)
for r in out:
    if r['verdict'] != 'ok':
        print(f"  {r['verdict']:7} {r['page']:10} {r['w']} v{r['v']} {r['id']:18} {r['k']:4} repeat {r['repeat']:5}% {r['repeat_box']}  reverse {r['reverse']:5}% {r['reverse_box']}")
print('anchors compared:', len(out), '| ok:', sum(r['verdict'] == 'ok' for r in out), '| ambient (moving at rest, checked by eye):', sum(r['verdict'] == 'ambient' for r in out), '| FAIL:', sum(r['verdict'] == 'FAIL' for r in out))

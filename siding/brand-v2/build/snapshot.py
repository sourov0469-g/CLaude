"""Snapshot committed section versions into build/backups/ before they are replaced (addendum: superseded versions go to
hidden in-file backups, never deleted). Each backup is a file {sid}-v{n}-r{rev}.html; build_site.py wraps it in a
<template class="bk">. Images inside a backup are reduced to data-img references, so a backup adds no image weight.
Run: python3 -I brand-v2/build/snapshot.py home-6:2 windows-1:1 ...   (rev is the next free number)"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import build_site  # noqa: E402

BK = os.path.join(HERE, 'backups')


def versions():
    out = {}
    for pid, _title, secs in build_site.PAGES:
        for i, fn in enumerate(secs):
            _t, v1, v2, _c, _j = fn()
            out[f'{pid}-{i + 1}'] = {'1': v1, '2': v2}
    return out


def strip_images(h):
    return re.sub(r'data-key="([^"]+)" src="data:[^"]+"', r'data-img="\1"', h)


if __name__ == '__main__':
    os.makedirs(BK, exist_ok=True)
    allv = versions()
    for arg in sys.argv[1:]:
        sid, v = arg.split(':')
        rev = 1 + len([f for f in os.listdir(BK) if f.startswith(f'{sid}-v{v}-r')])
        p = os.path.join(BK, f'{sid}-v{v}-r{rev}.html')
        open(p, 'w', encoding='utf-8').write(strip_images(allv[sid][v]))
        print('saved', os.path.relpath(p, HERE), len(allv[sid][v]) // 1024, 'KB before strip')

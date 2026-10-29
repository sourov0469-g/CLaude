"""Download the client's own images (photos, logo, credential badges) from austinprosiding.com and its Sanity CDN.

Run with `python3 -I fetch_assets.py`. Files land in site/assets/img. Images are the client's material, used as served
(cropped to a common frame, re-encoded as WebP); none are generated or retouched.
"""
import io, json, os, re, subprocess, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, 'work', 'data')
DL = os.path.join(ROOT, 'work', 'dl')
IMG = os.path.join(ROOT, 'site', 'assets', 'img')
LIVE = 'https://www.austinprosiding.com'
SANITY = 'https://cdn.sanity.io/images/tjkllgsw/production/'
os.makedirs(DL, exist_ok=True)


def get(url, name):
    path = os.path.join(DL, name)
    if not os.path.exists(path) or os.path.getsize(path) == 0:
        subprocess.run(['curl', '-sS', '--fail', '--max-time', '60', '-o', path, url], check=True)
    return path


def load(path):
    im = Image.open(path)
    im.load()
    if im.mode in ('RGB', 'RGBA'):
        return im
    return im.convert('RGBA' if im.mode in ('P', 'LA', 'PA') or 'transparency' in im.info else 'RGB')


def save_webp(im, out, q=74):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, 'WEBP', quality=q, method=6)


def sanity(url_or_file, w, h, fit='crop'):
    """Build a Sanity URL that keeps the firm's own rect crop (if any) and asks for w x h WebP."""
    if url_or_file.startswith('http'):
        base, _, query = url_or_file.partition('?')
        rect = re.search(r'rect=([\d,]+)', query)
        q = (f'rect={rect.group(1)}&' if rect else '') + f'w={w}&h={h}&fit={"scale" if rect else fit}&fm=webp&q=80'
        return f'{base}?{q}'
    return f'{SANITY}{url_or_file}?w={w}&h={h}&fit={fit}&fm=webp&q=80'


def pair_set(pid, side, src, sizes):
    for w in sizes:
        h = w * 5 // 8
        tmp = get(sanity(src, w, h), f'{pid}{side}-{w}.webp')
        im = load(tmp)
        if im.size != (w, h):
            im = im.resize((w, h), Image.LANCZOS)
        save_webp(im, os.path.join(IMG, 'pairs', f'{pid}{side}-{w}.webp'))


def main():
    home = json.load(open(os.path.join(DATA, 'pairs.json')))
    svc = json.load(open(os.path.join(DATA, 'svcpairs.json')))
    photos = json.load(open(os.path.join(DATA, 'photos.json')))

    for i, p in enumerate(home):
        pair_set(f'home{i}', 'b', p['bu'], (720, 1280))
        pair_set(f'home{i}', 'a', p['au'], (720, 1280))
    for key in ('siding', 'windows'):
        for i, p in enumerate(svc[key]):
            pair_set(f'{key}{i}', 'b', p['before']['src'], (720, 1280))
            pair_set(f'{key}{i}', 'a', p['after']['src'], (720, 1280))
    rob = svc['siding'][1]
    assert rob['place'].startswith('Rob Roy')
    pair_set('robroy-', 'b', rob['before']['src'], (800, 1600))
    pair_set('robroy-', 'a', rob['after']['src'], (800, 1600))

    for i, p in enumerate(photos):
        for w, h in ((640, 480), (1400, 1050)):
            tmp = get(sanity(p['img'], w, h), f'photo{i}-{w}.webp')
            im = load(tmp)
            if im.size != (w, h):
                im = im.resize((w, h), Image.LANCZOS)
            save_webp(im, os.path.join(IMG, 'photos', f'p{i}-{w}.webp'), q=72)

    # APS-4867 site photos (square, as the job page shows them)
    for i, p in enumerate(json.load(open(os.path.join(DATA, 'job4867.json')))):
        for w in (480, 960):
            im = load(get(sanity(p['img'], w, w), f'job4867-{i}-{w}.webp'))
            if im.size != (w, w):
                im = im.resize((w, w), Image.LANCZOS)
            save_webp(im, os.path.join(IMG, 'job', f'4867-{i}-{w}.webp'), q=72)

    # Logos and badges, as served.
    logo = load(get(LIVE + '/images/65246f239b165c29151e6f9f_AP_HORIZONTAL-LOGO_COLOR-V2-p-1080.png', 'logo-color.png'))
    logo.save(os.path.join(IMG, 'logo-color.png'), optimize=True)
    save_webp(logo, os.path.join(IMG, 'logo-color.webp'), q=90)
    white = load(get(LIVE + '/images/AP_HORIZONTAL-LOGO_WHT-p-500.avif', 'logo-white.avif'))
    save_webp(white, os.path.join(IMG, 'logo-white.webp'), q=90)
    fav = load(get(LIVE + '/images/favicon.png', 'favicon.png'))
    fav.save(os.path.join(IMG, 'favicon.png'), optimize=True)
    for c in ('andersen-certified-premier', 'bbb-a-plus', 'gaf-master-elite', 'guildmaster-service-excellence',
              'hardie-elite-preferred', 'hardie-presidents-club-2025', 'nextdoor-fave-2025'):
        im = load(get(f'{LIVE}/images/creds/{c}.webp', f'cred-{c}.webp'))
        save_webp(im, os.path.join(IMG, f'{c}.webp'), q=88)
        print(c, im.size)
    print('logo', logo.size, 'white', white.size)


if __name__ == '__main__':
    main()

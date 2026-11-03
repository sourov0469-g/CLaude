import json, os
from build3 import page, module, s3, HERE
from build import photo


def heroB():
    data = json.load(open(os.path.join(HERE, 'assets', 'photo3-boards.json')))
    js = f'window.PHOTO_BOARDS={json.dumps(data)};window.PHOTO_SRC="{photo("photo3-1400.webp", 1400, 90)}";\n' + module(s3('v2.js'))
    fade = '<div class="fade b"></div>'
    return page('Austin Pro: hero B, the real house torn and rebuilt', 'Built for Austin weather.',
                'Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house.',
                'A finished Austin Pro job: a two-storey house whose lap siding tears off board by board and rebuilds itself.', js, fade).replace('<section class="hero"', '<section class="hero b"')

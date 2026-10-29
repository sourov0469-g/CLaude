# Epilogue (OFL) for v5: one variable family, wght 300-900, Basic Latin plus the punctuation the copy uses.
# Usage: venv/bin/python fonts.py <path to Epilogue[wght].ttf>   (source: github.com/google/fonts, ofl/epilogue)
import io, sys, pathlib
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

src = sys.argv[1]
out = pathlib.Path(__file__).resolve().parent.parent / 'assets' / 'fonts' / 'epilogue.woff2'
f = instantiateVariableFont(TTFont(src), {'wght': (300, 900)})
buf = io.BytesIO(); f.save(buf); buf.seek(0); f = TTFont(buf)  # reload so the subsetter sees a clean glyph order
text = ''.join(chr(c) for c in range(0x20, 0x7f)) + '’‘“”·–…→←★© •×'
opts = subset.Options(); opts.flavor = 'woff2'; opts.layout_features = ['kern', 'liga', 'tnum', 'lnum', 'case']
opts.name_IDs = ['*']; opts.notdef_outline = True
s = subset.Subsetter(opts); s.populate(text=text); s.subset(f)
f.flavor = 'woff2'; f.save(out)
print(out, out.stat().st_size, 'bytes')

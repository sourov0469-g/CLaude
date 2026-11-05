"""FINAL SECTION STUB — Footer. Until rebuilt this returns the ported section's markup (routed to internal links only) and keeps the old module.
To replace: build markup here, write src/foot.css and src/foot.js (window.FFoot = {wire(root)}), and list the old module keys in REPLACES so the old CSS/JS drop out."""
import parts_ported as PP
REPLACES = []      # keys of parts_ported.MODS this section replaces
CSS = 'foot.css'  # files in final/src (optional)
JS = 'foot.js'
GLOBAL = 'FFoot'   # window.<GLOBAL>.wire(document) is called at boot when JS exists


def markup(S, contact, cal):
    return PP.route(S['footer'], contact)

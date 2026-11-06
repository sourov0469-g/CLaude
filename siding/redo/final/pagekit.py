"""Shared helpers for the inner pages (one file, hash-routed). Every page module defines: NAME (route), TITLE (nav label), CSS / JS (files in src/), GLOBAL (window.<GLOBAL>.wire(root)),
markup(ctx) -> the page's <section>s (NO <main>; the build wraps it). ctx = {contact, cal, icons}. Pages are hidden until routed to: do DOM building in wire(); do anything that needs layout
when the page is shown (listen for the 'fpage' event on document: detail === NAME)."""
import html, json, os, re
e = html.escape
HERE = os.path.dirname(os.path.abspath(__file__)); WORK = os.path.join(HERE, '..', '..', 'work'); PRE = os.path.join(HERE, '..', 'prep', 'backgrounds')
PAGES = [('siding', 'Siding'), ('windows', 'Windows'), ('roofing', 'Roofing'), ('our-work', 'Our work'), ('contact', 'Contact')]
PHONE = '(512) 550-0000'; PHONE_HREF = 'tel:+15125500000'; MAIL = 'info@austinprosiding.com'; ADDR = '7801 N Lamar Blvd Suite C70, Austin TX 78752'
HOURS = 'Mon–Fri 8–8 · Sat 8–6 · Sun 12–5'
CONTACT_PAGE = '#/contact'


def art(f, cls, tag):
    """Inline one of the kit's background SVGs with its ids renamed (so two copies never clash)."""
    s = open(os.path.join(PRE, f)).read().replace(' xmlns="http://www.w3.org/2000/svg"', '')
    s = re.sub(r'id="(\w+)"', lambda m: f'id="{tag}{m.group(1)}"', s); s = re.sub(r'url\(#(\w+)\)', lambda m: f'url(#{tag}{m.group(1)})', s); s = re.sub(r'href="#(\w+)"', lambda m: f'href="#{tag}{m.group(1)}"', s)
    return s.replace('<svg ', f'<svg class="{cls}" aria-hidden="true" focusable="false" ', 1)


def data(name):
    return json.load(open(os.path.join(WORK, 'data', name), encoding='utf-8'))

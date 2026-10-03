"""SOCIAL stage: read the public Facebook / Instagram / YouTube / LinkedIn pages a roofer links to.
Best-effort: platforms often show a login wall; those are recorded as 'blocked' rather than guessed."""
import asyncio
import re

from lxml import html as lh

import db
import scoring_run
from net import fetch

PLATFORMS = ("facebook", "instagram", "youtube", "linkedin")


def parse_count(s):
    s = (s or "").strip().replace(",", "").replace(" ", "")
    m = re.fullmatch(r"([\d.]+)([KkMmBb]?)", s)
    if not m:
        return None
    mult = {"": 1, "k": 1e3, "m": 1e6, "b": 1e9}[m.group(2).lower()]
    try:
        return int(float(m.group(1)) * mult)
    except ValueError:
        return None


NUM = r"([\d][\d.,]*\s?[KkMm]?)"


def parse_profile(platform, body, content_type=""):
    """-> {'status': 'ok'|'blocked'|'empty', 'followers', 'likes', 'posts', 'title'}"""
    text = body.decode("utf-8", "ignore") if isinstance(body, (bytes, bytearray)) else (body or "")
    if not text.strip():
        return {"status": "empty"}
    try:
        doc = lh.fromstring(text)
    except Exception:
        return {"status": "empty"}
    og = lambda p: (doc.xpath(f"string(//meta[@property='{p}']/@content)") or "").strip()
    title = og("og:title") or " ".join((doc.xpath("string(//title)") or "").split())
    desc = og("og:description") or (doc.xpath("string(//meta[@name='description']/@content)") or "").strip()
    blob = f"{title} {desc}"
    low = blob.lower()
    out = {"status": "ok", "title": title[:90]}
    if re.search(r"log in|sign up|login|join facebook|see photos|create an account", low) and not re.search(r"\blikes?\b|followers|subscribers|posts", low):
        return {"status": "blocked", "title": title[:90]}
    m = re.search(NUM + r"\s+followers", blob, re.I)
    if m:
        out["followers"] = parse_count(m.group(1))
    m = re.search(NUM + r"\s+likes?", blob, re.I)
    if m:
        out["likes"] = parse_count(m.group(1))
    m = re.search(NUM + r"\s+posts?", blob, re.I)
    if m:
        out["posts"] = parse_count(m.group(1))
    m = re.search(NUM + r"\s+subscribers", text, re.I)
    if m and platform == "youtube":
        out["followers"] = parse_count(m.group(1))
    m = re.search(NUM + r"\s+talking about this", blob, re.I)
    if m:
        out["engaged"] = parse_count(m.group(1))
    if len(out) <= 2:
        out["status"] = "blocked" if platform in ("facebook", "linkedin") else "empty"
    return out


def _socials_for(key):
    con = db.connect()
    try:
        p = scoring_run.load_profile(con, key)
    finally:
        con.close()
    return (p["contact"]["socials"] if p else {})


async def social(eng, lead):
    key = lead["lead_key"]
    socials = await asyncio.get_running_loop().run_in_executor(None, _socials_for, key)
    result = {}
    for plat in PLATFORMS:
        urls = socials.get(plat) or socials.get("x_twitter" if plat == "twitter" else plat)
        if not urls:
            continue
        r = await fetch(eng.session, urls[0], max_bytes=600_000)
        if r.status == 200 and r.body:
            info = parse_profile(plat, r.body)
        else:
            info = {"status": "blocked" if r.status in (401, 403, 429, 999) else "unreachable"}
        info["url"] = urls[0]
        result[plat] = info
    if result:
        eng.writer.data(key, "social", result)
    return {"status": "DONE", "label": "" if result else "no social links"}

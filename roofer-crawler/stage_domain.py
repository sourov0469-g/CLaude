"""DOMAIN stage: registration age / expiry / registrar / nameservers via public RDAP (no API key needed)."""
import asyncio
import os

import config
from net import fetch

DEAD_FLAGS = ("pending delete", "redemption period", "client hold", "server hold", "pendingdelete", "redemptionperiod", "clienthold", "serverhold")
_cache = {"bootstrap": None, "lock": None, "sem": None}


async def _bootstrap(eng):
    """TLD -> RDAP base URL (IANA bootstrap file), cached for the run."""
    override = os.environ.get("ROOFER_RDAP_BASE")
    if override:
        return {"*": override.rstrip("/") + "/"}
    if _cache["bootstrap"] is not None:
        return _cache["bootstrap"]
    if _cache["lock"] is None:
        _cache["lock"] = asyncio.Lock()
    async with _cache["lock"]:
        if _cache["bootstrap"] is None:
            r = await fetch(eng.session, "https://data.iana.org/rdap/dns.json", max_bytes=2_000_000)
            m = {}
            try:
                import json
                for services in json.loads(r.body.decode()).get("services", []):
                    for tld in services[0]:
                        m[tld.lower()] = services[1][0]
            except Exception:
                pass
            _cache["bootstrap"] = m
    return _cache["bootstrap"]


def parse_rdap(doc):
    out = {"status": [str(s).lower() for s in doc.get("status", [])][:6], "nameservers": [], "registrar": ""}
    for ev in doc.get("events", []):
        act = str(ev.get("eventAction", "")).lower()
        date = str(ev.get("eventDate", ""))[:10]
        if act == "registration":
            out["created"] = date
        elif act == "expiration":
            out["expires"] = date
        elif act in ("last changed", "last update of rdap database") and "updated" not in out:
            out["updated"] = date
    for ent in doc.get("entities", []):
        if "registrar" in [str(r).lower() for r in ent.get("roles", [])]:
            for item in (ent.get("vcardArray") or [None, []])[1]:
                if item and item[0] == "fn":
                    out["registrar"] = str(item[3])[:60]
    out["nameservers"] = [str(n.get("ldhName", "")).lower() for n in doc.get("nameservers", [])][:4]
    out["dead_flag"] = any(f in " ".join(out["status"]) for f in DEAD_FLAGS)
    return out


async def domain_intel(eng, lead):
    dom = lead.get("domain") or ""
    if not dom:
        return {"status": "DONE", "label": "no domain"}
    boot = await _bootstrap(eng)
    base = boot.get("*") or boot.get(dom.rsplit(".", 1)[-1])
    if not base:
        return {"status": "DONE", "label": "tld without RDAP"}
    if _cache["sem"] is None:
        _cache["sem"] = asyncio.Semaphore(8)          # be polite to registries
    async with _cache["sem"]:
        r = await fetch(eng.session, f"{base}domain/{dom}", max_bytes=400_000, accept_html=False)
        await asyncio.sleep(0.05)
    if r.status == 404:
        eng.writer.data(lead["lead_key"], "rdap", {"not_registered": True})
        return {"status": "DONE", "label": "domain not registered"}
    if r.status == 429:
        return {"status": "FAILED", "error": "rdap rate limited", "label": "rdap rate limited"}
    if r.status != 200 or not r.body:
        return {"status": "FAILED", "error": r.error or f"HTTP {r.status}"}
    import json
    try:
        data = parse_rdap(json.loads(r.body.decode("utf-8", "ignore")))
    except Exception as e:
        return {"status": "FAILED", "error": f"bad rdap json: {e}"}
    eng.writer.data(lead["lead_key"], "rdap", data)
    return {"status": "DONE"}

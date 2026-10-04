"""Command-line runner. The dashboard starts this as a background process.

    python crawler_runner.py --stage triage --mode normal
    python crawler_runner.py --stage deep --list deep --concurrency 800
    python crawler_runner.py --stage social|domain|search --list deep
Live control (power, pause, stop) happens through data/control.json, so no restart is ever needed.
"""
import argparse
import asyncio
import json
import os
import sys

import config
import db
import engine as eng_mod
from engine import Engine, write_control

STAGES = ("triage", "deep", "social", "domain", "search")


def get_handler(stage):
    if stage == "triage":
        from stage_site import triage
        return triage
    if stage == "deep":
        from stage_site import deep
        return deep
    if stage == "social":
        from stage_social import social
        return social
    if stage == "domain":
        from stage_domain import domain_intel
        return domain_intel
    if stage == "search":
        from stage_search import search
        return search
    raise SystemExit(f"unknown stage {stage}")


def main(argv=None):
    argv = list(sys.argv[1:] if argv is None else argv)
    if "--stage" in argv and "+" in argv[argv.index("--stage") + 1]:          # chained job, e.g. triage+deep or social+domain
        i = argv.index("--stage") + 1
        rc = 0
        for sub in argv[i].split("+"):
            rc = main(argv[:i] + [sub] + argv[i + 1:]) or rc
            if eng_mod.read_status().get("status") in ("STOPPED", "NETWORK_OUTAGE", "CRASHED"):
                break
        return rc
    ap = argparse.ArgumentParser()
    ap.add_argument("--stage", choices=STAGES, default="triage")
    ap.add_argument("--mode", default="normal")
    ap.add_argument("--concurrency", type=int, default=0)
    ap.add_argument("--auto", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--list", dest="list_name", default=None, help="restrict to a saved selection (e.g. 'deep')")
    ap.add_argument("--deep-pages", type=int, default=6)
    ap.add_argument("--parse-workers", type=int, default=0)
    ap.add_argument("--no-robots", action="store_true")
    ap.add_argument("--skip-nonroofers", action="store_true", help="optional: skip leads whose Google category is clearly another trade")
    ap.add_argument("--include-nonroofers", action="store_true", help=argparse.SUPPRESS)
    args = ap.parse_args(argv)

    config.ensure_dirs()
    db.init_db()
    if args.stage == "search":
        from stage_search import configured
        if not configured()[1]:
            print("No search API key configured (Settings -> Google search key).")
            return 2
    concurrency = args.concurrency or config.POWER_PRESETS.get(args.mode, config.DEFAULT_CUSTOM)
    concurrency = config.clamp_concurrency(concurrency)
    settings = {"obey_robots": not args.no_robots, "deep_pages": args.deep_pages, "parse_workers": args.parse_workers or None,
                "skip_nonroofers": bool(args.skip_nonroofers)}
    write_control(concurrency=concurrency, paused=False, stop=False, auto=bool(args.auto))
    rid = db.create_run(args.stage, "auto" if args.auto else args.mode, concurrency, args.limit)
    engine = Engine(args.stage, concurrency, auto=args.auto, limit=args.limit, settings=settings, list_name=args.list_name,
                    run_id=rid, handler=get_handler(args.stage))
    status = "CRASHED"
    try:
        if sys.platform == "win32":
            asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
        status = asyncio.run(engine.run())
    finally:
        db.end_run(rid, status, engine.last_error or engine.stop_reason, engine.processed)
        try:
            import scoring_run
            scoring_run.recompute_ranks()
        except Exception as e:
            print("rank recompute failed:", e)
        write_control(stop=False, paused=False)
    print(json.dumps({"status": status, "processed": engine.processed, "stats": dict(engine.stats)}))
    return 0 if status in ("COMPLETED", "STOPPED") else 1


if __name__ == "__main__":
    import multiprocessing
    multiprocessing.freeze_support()
    sys.exit(main())

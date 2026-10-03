"""Hostile-server robustness: nothing hangs, memory stays bounded, every lead gets a sensible result. Run: python tests/test_chaos.py"""
import csv, json, os, subprocess, sys, tempfile, time
from pathlib import Path
import psutil
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT)); sys.path.insert(0, str(ROOT / "tests"))
from chaos import Chaos


def check(c, m):
    if not c:
        raise AssertionError(m)
    print("  ok:", m)


srv = Chaos().start()
home = tempfile.mkdtemp()
env = dict(os.environ, ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/c.db", ROOFER_TEST_MODE="1", ROOFER_TOTAL_TIMEOUT="6", ROOFER_CONNECT_TIMEOUT="3",
           ROOFER_READ_TIMEOUT="4", ROOFER_TEST_HOSTMAP=json.dumps({"*": "127.0.0.1"}))
os.environ.update({k: env[k] for k in ("ROOFER_HOME", "ROOFER_CRAWLER_DB", "ROOFER_TEST_MODE", "ROOFER_TEST_HOSTMAP")})
kinds = ["hang", "reset", "garbage", "huge", "slowloris", "loop", "truncated", "gzipbomb", "bigheader", "binary", "crashme", "ok"]
PER = 12
with open(f"{home}/l.csv", "w", newline="") as f:
    w = csv.writer(f); w.writerow(["Business Name", "Website", "Business Categories", "State", "Review Count"])
    for k in kinds:
        for i in range(PER):
            w.writerow([f"{k} {i} Roofing", f"http://{k}-{i}.test:{srv.port}/", "Roofing contractor", "TX", 30])
import importer, db, config
importer.import_dataset(f"{home}/l.csv")
t0 = time.time()
p = subprocess.Popen([sys.executable, str(ROOT / "crawler_runner.py"), "--stage", "triage", "--concurrency", "200"], env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
peak = 0
while p.poll() is None:
    try:
        pr = psutil.Process(p.pid)
        rss = pr.memory_info().rss + sum(c.memory_info().rss for c in pr.children(recursive=True))
        peak = max(peak, rss)
    except Exception:
        pass
    if time.time() - t0 > 150:
        p.kill(); raise AssertionError("HANG: crawl did not finish within 150s")
    time.sleep(0.3)
out = p.stdout.read()
dt = time.time() - t0
print(f"   finished in {dt:.1f}s, peak memory (runner + parser processes) {peak/1e6:.0f} MB")
check(p.returncode == 0, "run exits cleanly despite hostile servers")
check(peak < 1.2e9, f"memory stayed bounded ({peak/1e6:.0f} MB) even with endless/gzip-bomb bodies")
con = db.connect()
done = con.execute("SELECT COUNT(*) FROM lead_stage WHERE stage='triage'").fetchone()[0]
check(done == len(kinds) * PER, f"every one of the {done} hostile leads got a result (nothing lost or stuck)")
res = {}
for r in con.execute("SELECT l.company_name n, s.site_state st FROM leads l JOIN scores s USING(lead_key)"):
    res.setdefault(r["n"].split()[0], {}).setdefault(r["st"], 0)
    res[r["n"].split()[0]][r["st"]] += 1
for k in kinds:
    print(f"   {k:10} -> {res.get(k)}")
check(set(res["hang"]) == {"TIMEOUT"} and set(res["slowloris"]) <= {"TIMEOUT", "UNREACHABLE", "DEAD_CONNECT"}, "hanging / slow-loris servers end as unreachable/timeout (bounded by the total timeout)")
check(set(res["truncated"]) <= {"DEAD_CONNECT", "UNREACHABLE", "TIMEOUT"}, "truncated responses are a failed fetch, never a fake 'OK'")
check(set(res["reset"]) <= {"DEAD_CONNECT", "UNREACHABLE"} and set(res["garbage"]) <= {"DEAD_CONNECT", "UNREACHABLE", "TIMEOUT"}, "resets and non-HTTP garbage end as unreachable, not crashes")
check(set(res["huge"]) <= {"OK", "TIMEOUT", "UNREACHABLE"} and set(res["gzipbomb"]) <= {"OK", "TIMEOUT", "UNREACHABLE", "EMPTY"}, "endless / gzip-bomb bodies are capped, not swallowed whole")
check(set(res["loop"]) <= {"HTTP_ERROR", "UNREACHABLE"}, "redirect loop ends as an error")
check(set(res["binary"]) <= {"EMPTY", "UNREACHABLE"}, "binary 'HTML' is not mistaken for a real site")
check(res["ok"] == {"OK": PER}, "normal sites alongside the hostile ones were all read fine")
check(set(res["crashme"]) == {"EMPTY"}, f"pages that crash the parser are isolated and recorded as unreadable ({res['crashme']}); innocent leads unaffected")
st = json.loads(Path(home, "data", "status.json").read_text())
print("   status:", st["status"], "| errors:", st.get("errors"))
print("CHAOS TESTS PASSED")

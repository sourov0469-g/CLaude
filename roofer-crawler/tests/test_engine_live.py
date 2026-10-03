"""Engine stress: thousands of sites, live power change, safe stop, resume with no loss/duplication. Run: python tests/test_engine_live.py [sites]"""
import csv, json, os, subprocess, sys, tempfile, time
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT)); sys.path.insert(0, str(ROOT / "tests"))
from fakeweb import FakeWeb
N = int(sys.argv[1]) if len(sys.argv) > 1 else 3000


def check(c, m):
    if not c:
        raise AssertionError(m)
    print("  ok:", m)


web = FakeWeb(tls=False).start()
home = tempfile.mkdtemp()
env = dict(os.environ, ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/e.db", ROOFER_TEST_MODE="1", ROOFER_TOTAL_TIMEOUT="10",
           ROOFER_TEST_HOSTMAP=json.dumps({"*": "127.0.0.1", "dead": None}))
os.environ.update({k: env[k] for k in ("ROOFER_HOME", "ROOFER_CRAWLER_DB", "ROOFER_TEST_MODE", "ROOFER_TEST_HOSTMAP")})
with open(f"{home}/l.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Business Name", "Website", "Phone", "Business Categories", "State", "Review Count"])
    for i in range(N):
        kind = "good" if i % 3 else ("old" if i % 2 else "dead")
        w.writerow([f"R{i} Roofing", f"http://{kind}-{i}.test:{web.port}/", f"(512) {200 + i % 700:03d}-{i:04d}", "Roofing contractor", "TX", i % 150])
import importer, db, engine, config
importer.import_dataset(f"{home}/l.csv")
first = [r[0] for r in db.connect().execute("SELECT lead_key FROM leads")]
print(f"imported {len(first)}")

t0 = time.time()
p = subprocess.Popen([sys.executable, str(ROOT / "crawler_runner.py"), "--stage", "triage", "--concurrency", "100"], env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
time.sleep(4)
engine.write_control(concurrency=1500)                    # live power change, no restart
time.sleep(4)
st = engine.read_status()
print("  status mid-run:", {k: st.get(k) for k in ("requested", "effective", "active", "processed", "rate_per_min", "parse_workers")})
check(st.get("requested") == 1500, "live power change picked up (requested=1500)")
engine.write_control(stop=True)
out = p.communicate(timeout=120)[0]
check(p.returncode == 0, "safe stop exits cleanly")
done1 = db.connect().execute("SELECT COUNT(*) FROM lead_stage WHERE stage='triage'").fetchone()[0]
print(f"  after stop: {done1}/{N} done in {time.time()-t0:.1f}s")
check(0 < done1 < N or done1 == N, "some work persisted at stop")

t1 = time.time()
r = subprocess.run([sys.executable, str(ROOT / "crawler_runner.py"), "--stage", "triage", "--concurrency", "1500"], env=env, capture_output=True, text=True, timeout=600)
check(r.returncode == 0, "resume run exits cleanly")
con = db.connect()
done = con.execute("SELECT COUNT(*) FROM lead_stage WHERE stage='triage'").fetchone()[0]
dups = con.execute("SELECT COUNT(*) FROM (SELECT lead_key FROM lead_stage GROUP BY lead_key,stage HAVING COUNT(*)>1)").fetchone()[0]
if done != N:
    print("DIAG: stage statuses", {r[0]: r[1] for r in con.execute("SELECT status,COUNT(*) FROM lead_stage GROUP BY status")}, "done", done)
    print("DIAG: runner out:", r.stdout[-500:], r.stderr[-1500:])
    st = engine.read_status(); print("DIAG: status", st.get("status"), st.get("stats"), st.get("last_error"), "initial_pending", st.get("initial_pending"))
check(done == N and dups == 0, f"all {N} leads finished exactly once after resume")
states = {r[0]: r[1] for r in con.execute("SELECT site_state, COUNT(*) FROM scores GROUP BY site_state")}
print("  states:", states, f"| resume took {time.time()-t1:.1f}s -> {N/(time.time()-t1):.0f} sites/s")
check(states.get("OK", 0) == N - sum(1 for i in range(N) if not i % 3 and i % 2 == 0), "every live site (modern + old) read")
check(states.get("DEAD_DNS", 0) == sum(1 for i in range(N) if not i % 3 and i % 2 == 0), "dead domains confirmed by second-opinion recheck")
print("ENGINE LIVE TESTS PASSED")

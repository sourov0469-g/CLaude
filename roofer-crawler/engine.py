"""Async crawl engine shared by every stage (triage, deep, social, domain, search).

* N workers pull leads from a feeder that always serves the best prospects first
* live control via data/control.json  (change power / pause / stop WITHOUT restarting)
* parsing happens in a process pool, so CPU never starves the network loop
* resource saver (RAM / disk / DB backlog) lowers effective power, never blocks Start
* Auto mode ramps power up while the network is healthy and backs off on timeouts
* network-outage circuit breaker + second-opinion recheck for "dead" sites (no false 'site is down')
* all DB writes go through one batched writer thread
"""
import asyncio
import json
import os
import shutil
import sys
import time
import traceback
from collections import Counter, deque
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
from concurrent.futures.process import BrokenProcessPool

import aiohttp
import psutil

import config
import db
from net import SafeResolver
from urlutil import registrable_domain

STATUS_FILE = lambda: config.DATA / "status.json"
CONTROL_FILE = lambda: config.DATA / "control.json"
HANDLER_TIMEOUT = 150


def read_control():
    try:
        return json.loads(CONTROL_FILE().read_text(encoding="utf-8"))
    except Exception:
        return {}


def write_control(**updates):
    config.ensure_dirs()
    cur = read_control()
    cur.update(updates)
    tmp = CONTROL_FILE().with_suffix(".tmp")
    tmp.write_text(json.dumps(cur), encoding="utf-8")
    for attempt in range(6):                      # Windows refuses os.replace while another process has the file open for a moment
        try:
            os.replace(tmp, CONTROL_FILE())
            break
        except PermissionError:
            time.sleep(0.05 * (attempt + 1))
    return cur


def read_status():
    try:
        return json.loads(STATUS_FILE().read_text(encoding="utf-8"))
    except Exception:
        return {}


class ByteBudget:
    """Bounds the HTML bytes waiting to be parsed so 5,000 concurrent downloads can't exhaust RAM."""

    def __init__(self, cap):
        self.cap, self.used = cap, 0
        self._cond = asyncio.Condition()

    async def acquire(self, n):
        async with self._cond:
            await self._cond.wait_for(lambda: self.used == 0 or self.used + n <= self.cap)
            self.used += n

    async def release(self, n):
        async with self._cond:
            self.used = max(0, self.used - n)
            self._cond.notify_all()


def _raise_fd_limit():
    try:
        import resource
        soft, hard = resource.getrlimit(resource.RLIMIT_NOFILE)
        target = hard if hard != resource.RLIM_INFINITY else 1_000_000
        resource.setrlimit(resource.RLIMIT_NOFILE, (min(target, 1_000_000), hard))
        return resource.getrlimit(resource.RLIMIT_NOFILE)[0]
    except Exception:
        return None


def _keep_awake(on):
    if os.name != "nt":
        return
    try:
        import ctypes
        ctypes.windll.kernel32.SetThreadExecutionState(0x80000000 | (0x00000001 if on else 0))
    except Exception:
        pass


class NetworkOutage(Exception):
    pass


async def internet_ok():
    """True if the machine can reach the internet: direct TCP to well-known IPs (no DNS) and a DNS lookup."""
    if config.TEST_MODE:
        return True

    async def tcp(host):
        try:
            _, w = await asyncio.wait_for(asyncio.open_connection(host, 443), 4)
            w.close()
            return True
        except Exception:
            return False

    async def dns():
        try:
            await asyncio.wait_for(asyncio.get_running_loop().getaddrinfo("example.com", 443), 5)
            return True
        except Exception:
            return False
    res = await asyncio.gather(tcp("1.1.1.1"), tcp("8.8.8.8"), dns())
    return any(res[:2]) and res[2]


class Engine:
    def __init__(self, stage, requested, auto=False, limit=0, settings=None, list_name=None, run_id=None, handler=None):
        self.stage, self.requested, self.auto, self.limit = stage, max(1, int(requested)), auto, int(limit or 0)
        self.settings = settings or {}
        self.list_name = list_name
        self.run_id = run_id
        self.handler = handler
        self.auto_target = min(self.requested, 40) if auto else self.requested
        self.fd_limit = _raise_fd_limit()
        self.stats = Counter()
        self.errors = Counter()
        self.deferred = []
        self.seen = set()
        self.active = 0
        self.processed = 0
        self.done_times = deque()
        self.net_events = deque()
        self.paused = False
        self.stop_requested = False
        self.stop_reason = ""
        self.started = time.time()
        self.feeder_done = False
        self.phase = "main"
        self.effective = 0
        self.resource_note = ""
        self.last_error = ""
        self.initial_pending = 0
        self.t_status = 0.0
        self.parse_pending = 0
        self.window_attempts = deque()
        self.outage = False
        self.outage_probe_running = False

    # ------------------------------------------------------------------ setup / teardown
    async def _setup(self):
        loop = asyncio.get_running_loop()
        dns_threads = 64 if self.requested < 200 else 160 if self.requested < 1500 else 256
        loop.set_default_executor(ThreadPoolExecutor(max_workers=dns_threads, thread_name_prefix="dns"))
        n_workers = int(self.settings.get("parse_workers") or max(1, min(8, (os.cpu_count() or 2) - 1)))
        try:
            self.pool = ProcessPoolExecutor(max_workers=n_workers)
        except Exception:
            self.pool = ThreadPoolExecutor(max_workers=n_workers)
        self.parse_workers = n_workers
        vm = psutil.virtual_memory()
        cap = int(min(1.2 * 1024 ** 3, max(80 * 1024 ** 2, vm.available * 0.2)))
        self.budget = ByteBudget(cap)
        conn_limit = min(self.requested + 200, config.CUSTOM_UNLOCKED_MAX + 400)
        self.connector = aiohttp.TCPConnector(limit=conn_limit, limit_per_host=config.PER_HOST_LIMIT, ttl_dns_cache=900,
                                              use_dns_cache=True, resolver=SafeResolver(), enable_cleanup_closed=True,
                                              keepalive_timeout=10, force_close=False)
        timeout = aiohttp.ClientTimeout(total=config.TOTAL_TIMEOUT, connect=config.CONNECT_TIMEOUT, sock_read=config.READ_TIMEOUT)
        self.session = aiohttp.ClientSession(
            connector=self.connector, timeout=timeout, auto_decompress=True, max_line_size=16384, max_field_size=16384,
            headers={"User-Agent": self.settings.get("user_agent") or config.USER_AGENT,
                     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.9"})
        self.writer = db.Writer(score_fn=self._score_fn())

    @staticmethod
    def _score_fn():
        import scoring_run
        return scoring_run.score_lead

    async def _teardown(self):
        try:
            await self.session.close()
        except Exception:
            pass
        try:
            self.pool.shutdown(wait=False, cancel_futures=True)
        except Exception:
            pass
        await asyncio.get_running_loop().run_in_executor(None, self.writer.close)

    # ------------------------------------------------------------------ helpers for handlers
    async def parse(self, fn, *args, nbytes=0):
        """Run a CPU-heavy function in the process pool under the byte budget.
        If a worker process dies, innocent in-flight pages are retried on a rebuilt pool; a page that keeps killing workers
        is run alone in a throw-away process, and if that dies too it is recorded as unparseable (the lead is not lost)."""
        await self.budget.acquire(nbytes)
        self.parse_pending += 1
        loop = asyncio.get_running_loop()
        try:
            for attempt in range(2):
                try:
                    return await loop.run_in_executor(self.pool, fn, *args)
                except BrokenProcessPool:
                    self._rebuild_pool()
                    await asyncio.sleep(0.05 + 0.1 * attempt)
            solo = ProcessPoolExecutor(max_workers=1)
            try:
                return await loop.run_in_executor(solo, fn, *args)
            except BrokenProcessPool:
                self.errors["page crashed the parser"] += 1
                return {"url": args[1] if len(args) > 1 else "", "page_state": "UNPARSEABLE", "word_count": 0, "error": "parser crashed on this page"}
            finally:
                solo.shutdown(wait=False, cancel_futures=True)
        finally:
            self.parse_pending -= 1
            await self.budget.release(nbytes)

    def _rebuild_pool(self):
        if time.monotonic() - getattr(self, "_pool_rebuilt", 0) < 1.0:
            return                                          # another task already rebuilt it a moment ago
        self._pool_rebuilt = time.monotonic()
        self.errors["parser process restarted"] += 1
        try:
            self.pool.shutdown(wait=False, cancel_futures=True)
        except Exception:
            pass
        try:
            self.pool = ProcessPoolExecutor(max_workers=self.parse_workers)
        except Exception:
            self.pool = ThreadPoolExecutor(max_workers=self.parse_workers)

    def count(self, key, n=1):
        self.stats[key] += n

    def net_event(self, ok, domain, error_class=""):
        t = time.monotonic()
        networkish = (not ok) and error_class in ("DNS", "CONNECT", "TIMEOUT")
        self.net_events.append((t, ok, networkish, domain))
        self.window_attempts.append((t, error_class == "TIMEOUT" or error_class == "CONNECT"))
        while self.net_events and t - self.net_events[0][0] > config.NET_WINDOW_SECONDS:
            self.net_events.popleft()
        while self.window_attempts and t - self.window_attempts[0][0] > 20:
            self.window_attempts.popleft()
        if self.phase != "main" or ok or not networkish or self.outage_probe_running:
            return
        bad = [e for e in self.net_events if e[2]]
        if (len(bad) >= config.NET_FAILURE_THRESHOLD and len({e[3] for e in bad}) >= config.NET_MIN_DISTINCT_DOMAINS
                and len(bad) >= 0.9 * len(self.net_events)):
            # looks like an outage - but a resumed run legitimately starts with previously-failed sites, so verify for real
            self.outage_probe_running = True
            asyncio.get_running_loop().create_task(self._verify_outage())

    async def _verify_outage(self):
        try:
            if not await internet_ok():
                self.outage = True
        finally:
            self.outage_probe_running = False
            self.net_events.clear()

    # ------------------------------------------------------------------ power control
    def _timeout_ratio(self):
        n = len(self.window_attempts)
        return (sum(1 for _, bad in self.window_attempts if bad) / n) if n >= 30 else 0.0

    def _compute_effective(self, ctl):
        req = int(ctl.get("concurrency") or self.requested)
        self.requested = max(1, min(config.CUSTOM_UNLOCKED_MAX, req))
        self.auto = bool(ctl.get("auto", self.auto))
        t = self.auto_target if self.auto else self.requested
        if self.auto:
            t = min(t, self.requested)
        notes = []
        try:
            vm = psutil.virtual_memory()
            ram = vm.available / 1024 ** 3
            free = shutil.disk_usage(config.BASE).free / 1024 ** 3
            if ram < config.CRITICAL_RAM_GB:
                t = min(t, max(1, self.requested // 20))
                notes.append(f"RAM critical ({ram:.1f} GB free): power cut to {t}")
            elif ram < config.LOW_RAM_GB:
                t = min(t, max(1, self.requested // 4))
                notes.append(f"RAM low ({ram:.1f} GB free): power reduced to {t}")
            if free < 0.3:
                t = 1
                notes.append(f"Disk almost full ({free:.2f} GB): running at 1")
            elif free < config.LOW_DISK_GB:
                notes.append(f"Low disk ({free:.1f} GB free): warning only")
        except Exception:
            pass
        if self.writer.backlog() > 20000:
            t = min(t, 5)
            notes.append("Database writer is behind: slowed down to let it catch up")
        if self.fd_limit and t > self.fd_limit - 300:
            t = max(1, self.fd_limit - 300)
            notes.append(f"OS open-file limit ({self.fd_limit}) caps power at {t}")
        self.resource_note = " | ".join(notes)
        return max(1, int(t))

    def _auto_step(self):
        """AIMD: grow while healthy, shrink on timeouts/resets (local network saturation)."""
        ratio = self._timeout_ratio()
        cpu = psutil.cpu_percent(interval=None)
        if ratio > 0.30:
            self.auto_target = max(10, int(self.auto_target * 0.6))
        elif ratio < 0.12 and cpu < 88 and self.parse_pending < self.parse_workers * 40:
            self.auto_target = min(self.requested, int(self.auto_target * 1.25) + 5)

    # ------------------------------------------------------------------ run
    async def run(self):
        _keep_awake(True)
        status = "COMPLETED"
        await self._setup()
        try:
            counts = db.stage_counts(self.stage, self.list_name, self.settings.get("skip_nonroofers", True))
            self.initial_pending = counts["pending"]
            self.monitor_task = asyncio.create_task(self._monitor())
            await self._phase(self._db_batches(), allow_defer=True)
            if self.deferred and not self.stop_requested:
                self.phase = "recheck"
                leads = self.deferred
                self.deferred = []
                self.stats["rechecked"] = len(leads)
                await asyncio.sleep(min(15, 3 + len(leads) / 50))      # let the network/DNS settle, then give them a second chance
                try:
                    self.connector.clear_dns_cache()
                except Exception:
                    pass
                for ld in leads:
                    ld["_recheck"] = True
                it = iter(leads)
                await self._phase(self._list_batches(it), allow_defer=False)
            if self.stop_requested:
                status = "STOPPED"
        except NetworkOutage:
            status = "NETWORK_OUTAGE"
            self.stop_reason = "network outage"
            self.deferred = []
        except asyncio.CancelledError:
            status = "STOPPED"
            raise
        except Exception as e:
            status = "CRASHED"
            self.last_error = repr(e)
            traceback.print_exc()
        finally:
            self.phase = "finishing"
            self._write_status(status="FINISHING", force=True)
            if hasattr(self, "monitor_task"):
                self.monitor_task.cancel()
            await self._teardown()
            self._write_status(status=status, force=True)
            _keep_awake(False)
        return status

    def _db_batches(self):
        """Load the whole pending list once (best prospects first) and serve it from memory."""
        skip = self.settings.get("skip_nonroofers", True)
        state = {"it": None}

        async def gen(n):
            if state["it"] is None:
                rows = await asyncio.get_running_loop().run_in_executor(
                    None, lambda: db.pending_for_stage(self.stage, None, self.list_name, skip))
                if self.limit:
                    rows = rows[: self.limit]
                state["it"] = iter(rows)
            out = []
            for r in state["it"]:
                out.append(r)
                if len(out) >= n:
                    break
            return out
        return gen

    def _list_batches(self, it):
        async def gen(n):
            out = []
            for x in it:
                out.append(x)
                if len(out) >= n:
                    break
            return out
        return gen

    async def _phase(self, batch_fn, allow_defer):
        self.allow_defer = allow_defer
        self.feeder_done = False
        q = asyncio.Queue()
        workers = set()
        feeder = asyncio.create_task(self._feeder(q, batch_fn))
        try:
            await self._controller(q, workers, feeder)
        finally:
            for w in list(workers):
                if not w.done():
                    w.cancel()
            await asyncio.gather(*workers, return_exceptions=True)
            feeder.cancel()

    async def _feeder(self, q, batch_fn):
        try:
            while not self.stop_requested:
                if q.qsize() >= max(50, self.effective):
                    await asyncio.sleep(0.25)
                    continue
                rows = await batch_fn(max(200, min(2000, self.effective * 2)))
                if not rows:
                    break
                for r in rows:
                    q.put_nowait(r)
        finally:
            self.feeder_done = True
            q.put_nowait(None)

    async def _controller(self, q, workers, feeder):
        ramp_start = time.monotonic()
        last_auto = 0.0
        grace_deadline = None
        while True:
            ctl = read_control()
            self.paused = bool(ctl.get("paused"))
            if ctl.get("stop") and not self.stop_requested:
                self.stop_requested = True
                self.stop_reason = "user stop"
                grace_deadline = time.monotonic() + 25
            if self.outage:
                raise NetworkOutage()
            now = time.monotonic()
            if self.auto and now - last_auto >= 5:
                last_auto = now
                self._auto_step()
            target = 0 if self.paused else self._compute_effective(ctl)
            if self.paused:
                self._compute_effective(ctl)
            self.effective = target
            workers.difference_update({w for w in workers if w.done()})
            # slow-start: add at most ~10% of target (min 25) workers per second to avoid DNS/SYN stampedes.
            # Keep spawning while there is queued work, even after the feeder has finished loading it (the sentinel doesn't count).
            if not self.stop_requested:
                waiting = q.qsize() - (1 if self.feeder_done else 0)
                if not self.feeder_done:
                    waiting = max(waiting, 1)
                room = target - len(workers)
                spawn = max(0, min(room, waiting, max(25, target // 8)))
                for _ in range(spawn):
                    workers.add(asyncio.create_task(self._worker(q)))
            self._write_status()
            if self.stop_requested and grace_deadline and now > grace_deadline:
                return
            if (self.feeder_done or self.stop_requested) and not workers:
                return
            if feeder.done() and not feeder.cancelled() and feeder.exception():
                raise feeder.exception()
            await asyncio.sleep(0.5 if not self.paused else 1.0)

    async def _worker(self, q):
        while True:
            if self.stop_requested:
                return
            if self.paused:
                await asyncio.sleep(0.5)
                continue
            if self.active >= max(1, self.effective):
                return                      # power was lowered: surplus workers retire (controller respawns on demand)
            lead = await q.get()
            if lead is None:
                q.put_nowait(None)
                return
            await self._process(lead)

    async def _process(self, lead):
        self.active += 1
        key = lead["lead_key"]
        out = None
        try:
            out = await asyncio.wait_for(self.handler(self, lead), timeout=HANDLER_TIMEOUT)
        except asyncio.TimeoutError:
            out = {"status": "FAILED", "error": "handler timeout", "net_class": "TIMEOUT"}
        except asyncio.CancelledError:
            raise
        except Exception as e:
            self.last_error = f"{type(e).__name__}: {e}"[:200]
            self.errors["handler exception"] += 1
            traceback.print_exc()
            out = {"status": "FAILED", "error": self.last_error, "net_class": ""}
        finally:
            self.active -= 1
        if out is None:
            return
        nc = out.get("net_class", "")
        self.net_event(out.get("status") == "DONE" and not nc, registrable_domain(lead.get("website") or "") or key, nc)
        if out.get("defer") and self.allow_defer and not lead.get("_recheck"):
            self.deferred.append(lead)
            self.count("deferred")
            return
        self.writer.stage(key, self.stage, out.get("status", "DONE"), out.get("error"))
        self.processed += 1
        self.done_times.append(time.monotonic())
        self.stats[out.get("status", "DONE")] += 1
        if out.get("label"):
            self.errors[out["label"]] += 1

    # ------------------------------------------------------------------ monitoring
    async def _monitor(self):
        while True:
            await asyncio.sleep(2)
            self._write_status()

    def rate_per_min(self):
        t = time.monotonic()
        while self.done_times and t - self.done_times[0] > 90:
            self.done_times.popleft()
        if len(self.done_times) < 2:
            return 0.0
        span = max(5.0, t - self.done_times[0])
        return len(self.done_times) / span * 60

    def _write_status(self, status="RUNNING", force=False):
        t = time.monotonic()
        if not force and t - self.t_status < 1.0:
            return
        self.t_status = t
        rate = self.rate_per_min()
        remaining = max(0, self.initial_pending - self.processed - (len(self.deferred) if self.phase == "main" else 0))
        try:
            vm = psutil.virtual_memory()
            sysinfo = {"ram_available_gb": round(vm.available / 1024 ** 3, 2), "ram_used_pct": vm.percent, "cpu_pct": psutil.cpu_percent(interval=None)}
        except Exception:
            sysinfo = {}
        data = {
            "status": status, "stage": self.stage, "phase": self.phase, "pid": os.getpid(), "run_id": self.run_id,
            "requested": self.requested, "effective": self.effective, "auto": self.auto, "auto_target": self.auto_target,
            "active": self.active, "processed": self.processed, "initial_pending": self.initial_pending, "remaining": remaining,
            "rate_per_min": round(rate, 1), "eta_min": round(remaining / rate, 1) if rate > 1 else None,
            "paused": self.paused, "stopping": self.stop_requested, "deferred": len(self.deferred), "stats": dict(self.stats),
            "errors": dict(self.errors.most_common(8)), "resource_note": self.resource_note, "last_error": self.last_error,
            "timeout_ratio": round(self._timeout_ratio(), 3), "parse_pending": self.parse_pending, "parse_workers": getattr(self, "parse_workers", 0),
            "writer_backlog": self.writer.backlog() if hasattr(self, "writer") else 0,
            "writer_errors": self.writer.errors if hasattr(self, "writer") else 0, "started": self.started, "updated": time.time(),
            "fd_limit": self.fd_limit, **sysinfo,
        }
        try:
            tmp = STATUS_FILE().with_suffix(".tmp")
            tmp.write_text(json.dumps(data), encoding="utf-8")
            os.replace(tmp, STATUS_FILE())
        except Exception:
            pass

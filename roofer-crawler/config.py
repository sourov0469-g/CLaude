"""Central settings for the USA Roofer Lead Research Crawler (v5).

Everything tunable lives here or in scoring_config.json (scoring weights).
"""
import os
from pathlib import Path

BASE = Path(__file__).resolve().parent
HOME = Path(os.environ.get("ROOFER_HOME") or BASE)      # where data/uploads/output/logs live (tests point this at a temp dir)
DATA = HOME / "data"
UPLOADS = HOME / "uploads"
OUTPUT = HOME / "output"
LOGS = HOME / "logs"
BACKUPS = HOME / "backups"

APP_NAME = "USA Roofer Lead Research Crawler"

# ---- Power / concurrency -------------------------------------------------
# "Concurrency" = how many websites are being fetched at the same moment.
POWER_PRESETS = {
    "survival": 1,
    "gentle": 25,
    "work": 100,
    "normal": 250,
    "fast": 500,
    "full": 800,
    "turbo": 1000,
}
CUSTOM_NORMAL_MAX = 1000      # slider range normally offered
CUSTOM_UNLOCKED_MAX = 5000    # hard ceiling, only reachable via "unlock higher range"
CUSTOM_UNLOCK_STEPS = (2000, 3000, 5000)
DEFAULT_CUSTOM = 400

# ---- Crawl behaviour -----------------------------------------------------
DEPTHS = {
    # depth -> (pages per lead incl. homepage)
    "triage": 1,   # homepage only: fast, cheap, enough to judge website quality
    "standard": 4,  # + about/team, contact, reviews/projects
    "deep": 8,
}
DEFAULT_DEPTH = "triage"
MAX_BODY_BYTES = 1024 * 1024        # real homepages are 50-400 KB; bigger bodies are truncated, not swallowed
CONNECT_TIMEOUT = float(os.environ.get("ROOFER_CONNECT_TIMEOUT", 10))
TOTAL_TIMEOUT = float(os.environ.get("ROOFER_TOTAL_TIMEOUT", 25))
READ_TIMEOUT = float(os.environ.get("ROOFER_READ_TIMEOUT", 15))
MAX_REDIRECTS = 5
PER_HOST_LIMIT = 2
USER_AGENT = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/130.0 Safari/537.36")

# Resource saver (warn-only: never blocks Start, just lowers effective power).
LOW_RAM_GB = 1.0
CRITICAL_RAM_GB = 0.4
LOW_DISK_GB = 5.0
COMPACT_DISK_GB = 1.5

# Network-outage circuit breaker.
NET_WINDOW_SECONDS = 30
NET_FAILURE_THRESHOLD = 40
NET_MIN_DISTINCT_DOMAINS = 25

# Selection defaults for the funnel.
DEFAULT_TOP_N = 20000

TEST_MODE = os.environ.get("ROOFER_TEST_MODE") == "1"   # allows loopback targets in tests


def db_path():
    override = os.environ.get("ROOFER_CRAWLER_DB")
    return Path(override) if override else DATA / "research.db"


def clamp_concurrency(value, default=DEFAULT_CUSTOM):
    try:
        v = int(float(value))
    except (TypeError, ValueError):
        v = default
    return max(1, min(CUSTOM_UNLOCKED_MAX, v))


def ensure_dirs():
    for d in (DATA, UPLOADS, OUTPUT, LOGS, BACKUPS):
        d.mkdir(parents=True, exist_ok=True)

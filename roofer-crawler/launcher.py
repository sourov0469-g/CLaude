"""Starts the dashboard on a free local port and opens the browser (reuses a running instance of THIS folder)."""
import json
import os
import socket
import subprocess
import sys
import time
import urllib.request
import webbrowser
from pathlib import Path

BASE = Path(__file__).resolve().parent
HOST, START, END = "127.0.0.1", 8765, 8799
(BASE / "logs").mkdir(exist_ok=True)
(BASE / "data").mkdir(exist_ok=True)


def is_open(port):
    s = socket.socket()
    s.settimeout(0.25)
    try:
        return s.connect_ex((HOST, port)) == 0
    finally:
        s.close()


def ours(port):
    try:
        with urllib.request.urlopen(f"http://{HOST}:{port}/healthz", timeout=1) as r:
            d = json.loads(r.read())
        return Path(d.get("base", "")).resolve() == BASE
    except Exception:
        return False


for p in range(START, END + 1):
    if is_open(p) and ours(p):
        webbrowser.open(f"http://{HOST}:{p}")
        raise SystemExit(0)
port = next((p for p in range(START, END + 1) if not is_open(p)), None)
if port is None:
    raise SystemExit("No free port between 8765 and 8799.")
env = dict(os.environ, ROOFER_DASHBOARD_PORT=str(port))
log = open(BASE / "logs" / "dashboard.log", "ab", buffering=0)
kw = {"cwd": str(BASE), "stdout": log, "stderr": subprocess.STDOUT, "env": env}
if sys.platform.startswith("win"):
    kw["creationflags"] = subprocess.CREATE_NO_WINDOW
subprocess.Popen([sys.executable, str(BASE / "app.py")], **kw)
for _ in range(60):
    if is_open(port) and ours(port):
        webbrowser.open(f"http://{HOST}:{port}")
        break
    time.sleep(0.25)
else:
    print("Dashboard did not start. See logs/dashboard.log")

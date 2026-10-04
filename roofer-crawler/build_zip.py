"""Builds RooferLeadCollector_v5.zip (clean: no data, logs, venv or caches). Run: python build_zip.py"""
import os, zipfile
from pathlib import Path
ROOT = Path(__file__).resolve().parent
SKIP_DIRS = {"data", "uploads", "output", "logs", "backups", ".venv", "__pycache__", ".git"}
OUT = ROOT / "RooferLeadCollector_v5.zip"
if OUT.exists():
    OUT.unlink()
n = 0
with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for p in sorted(ROOT.rglob("*")):
        rel = p.relative_to(ROOT)
        if p.is_dir() or set(rel.parts) & SKIP_DIRS or p.suffix == ".pyc" or p.name in {OUT.name, "build_zip.py"}:
            continue
        z.write(p, Path("RooferLeadCollector") / rel)
        n += 1
print(f"{OUT.name}: {n} files, {OUT.stat().st_size/1024:.0f} KB")

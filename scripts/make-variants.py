"""
Make responsive WebP variants for every photo in public/img.

Usage:  python3 scripts/make-variants.py
Needs:  pip install pillow

Rule: each full-size file (e.g. hero/yorkie.webp, 800px wide) gets smaller copies named
yorkie-480.webp and (card photos only) yorkie-160.webp. The site picks the right one with srcset.
Re-run this after replacing any full-size photo.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "public" / "img"
JOBS = [
    ("hero", [480]),
    ("pups", [480, 160]),
    (".", [480]),  # about.webp
]
for folder, widths in JOBS:
    for src in sorted((ROOT / folder).glob("*.webp")):
        stem = src.stem
        if stem[-4:-3] == "-" and stem[-3:].isdigit():  # already a variant
            continue
        im = Image.open(src).convert("RGB")
        for w in widths:
            h = round(im.height * w / im.width)
            out = src.with_name(f"{stem}-{w}.webp")
            im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=74, method=6)
            print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")

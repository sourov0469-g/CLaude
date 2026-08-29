#!/usr/bin/env python3
"""Turn the raw field photos from the PizzaBurg visit into web-sized WebP assets.

Every source image is oriented via EXIF, optionally cropped, resized to a
target width and written as WebP into assets/img/.
"""
import os
from PIL import Image, ImageOps, ImageFilter

SRC = "/root/.claude/uploads/199bdc8b-ecfc-53a6-b005-f066b4962a21"
OUT = "/home/user/CLaude/assets/img"
os.makedirs(OUT, exist_ok=True)


def load(name):
    im = Image.open(os.path.join(SRC, name + "-image.jpg"))
    return ImageOps.exif_transpose(im).convert("RGB")


def save(im, name, width, quality=76):
    if im.width != width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    path = os.path.join(OUT, name + ".webp")
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"{name:26s} {im.width}x{im.height}  {os.path.getsize(path)//1024} KB")


def crop_frac(im, l, t, r, b):
    """Crop by fractions of width/height."""
    w, h = im.size
    return im.crop((round(l * w), round(t * h), round(r * w), round(b * h)))


# --- hero: overhead pair of pizzas on wooden peels -------------------------
hero = load("7c03cdce")
save(crop_frac(hero, 0.02, 0.04, 0.98, 0.96), "hero-pizzas", 1920, 74)
save(crop_frac(hero, 0.06, 0.12, 0.62, 0.90), "pizza-left", 1100)

# --- the illuminated outlet sign ------------------------------------------
sign = load("6c3cec1c")
save(crop_frac(sign, 0.02, 0.10, 0.98, 0.88), "outlet-sign", 1200)
save(crop_frac(load("f59374e4"), 0.04, 0.20, 0.96, 0.82), "outlet-sign-alt", 1000)

# --- team ------------------------------------------------------------------
save(load("487ea358"), "team-group", 1200, 80)
save(load("17eb56e4"), "team-group-alt", 1000)
save(load("ce3bed5d"), "team-street", 1000)

# --- the interview itself ---------------------------------------------------
save(load("94baf6d6"), "interview-wide", 1600, 74)
save(crop_frac(load("02076971"), 0.30, 0.02, 1.00, 1.00), "interview-manager", 1200)
save(load("2dfc0a51"), "interview-team", 1400, 74)

# --- product ---------------------------------------------------------------
save(crop_frac(load("3ab51ffd"), 0.00, 0.12, 1.00, 0.72), "table-pizzas", 1200, 74)
save(crop_frac(load("f1118fb4"), 0.00, 0.10, 1.00, 0.66), "table-pizzas-alt", 1100, 74)

# --- the PizzaBurg card, straightened --------------------------------------
# The cards lie at 90 degrees in the photos; rotate so the printing reads level.
card = load("82931c73").rotate(90, expand=True, resample=Image.BICUBIC)
save(crop_frac(card, 0.11, 0.19, 0.85, 0.81), "brand-card", 1000, 84)

# --- the manager's card: name and title ONLY --------------------------------
# The lower half of the card carries a personal mobile number and an email
# address. We crop to the name/title block so those are never published.
mcard = load("04a0ad82").rotate(90, expand=True, resample=Image.BICUBIC)
save(crop_frac(mcard, 0.15, 0.28, 0.83, 0.52), "manager-card", 1000, 86)

print("\nwrote", len(os.listdir(OUT)), "files")

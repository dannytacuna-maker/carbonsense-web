"""Pull the best color topographic mark from the identity sheet."""
from __future__ import annotations

import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

ROOT = r"C:\Users\danny\Desktop\Daniel Acuna\CarbonSense\carbonsense-web\public\brand"
SHEET = os.path.join(ROOT, "identity-sheet-v2.jpg")
OUT = os.path.join(ROOT, "mark")
GEN = r"C:\Users\danny\.cursor\projects\c-Users-danny-Desktop-Daniel-Acuna-CarbonSense-carbonsense-web\assets\carbon-sense-mark.jpg"


def circularize(img: Image.Image, inset: float = 0.01) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))
    mask = Image.new("L", (side, side), 0)
    draw = ImageDraw.Draw(mask)
    pad = int(side * inset)
    draw.ellipse((pad, pad, side - pad - 1, side - pad - 1), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(max(1, side // 400)))
    out = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    out.paste(img, (0, 0))
    out.putalpha(mask)
    return out


def crop_circle(sheet: Image.Image, cx: int, cy: int, r: int, scale: int = 8) -> Image.Image:
    box = (cx - r, cy - r, cx + r, cy + r)
    crop = sheet.crop(box)
    crop = crop.resize((r * 2 * scale, r * 2 * scale), Image.Resampling.LANCZOS)
    return circularize(crop, inset=0.012)


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    sheet = Image.open(SHEET).convert("RGB")

    # Best filled color mark from green detection around horizontal lockup
    candidates = [
        ("from-sheet", 140, 128, 38),
        ("from-sheet-tight", 138, 130, 34),
        ("from-sheet-wide", 140, 128, 44),
    ]
    for name, cx, cy, r in candidates:
        mark = crop_circle(sheet, cx, cy, r, scale=10)
        path = os.path.join(OUT, f"{name}.png")
        mark.save(path)
        print("wrote", path, mark.size)

    # Primary: use the cleanest sheet crop as mark-color.png
    primary = crop_circle(sheet, 140, 128, 36, scale=12)
    primary.save(os.path.join(OUT, "mark-color.png"))
    print("primary mark-color", primary.size)

    # Also prepare generated topographic disc (matches sheet filled-gradient style)
    if os.path.exists(GEN):
        gen = Image.open(GEN).convert("RGBA")
        gen = circularize(gen, inset=0.01)
        # slight contrast for crisp contours
        rgb = gen.convert("RGB")
        rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
        rgb = ImageEnhance.Color(rgb).enhance(1.05)
        gen = circularize(rgb, inset=0.01)
        gen = gen.resize((1024, 1024), Image.Resampling.LANCZOS)
        gen_path = os.path.join(OUT, "mark-topo-fill.png")
        gen.save(gen_path)
        print("wrote", gen_path)

    # Favicon sizes from primary
    for size in (16, 32, 48, 180, 512):
        ico = primary.resize((size, size), Image.Resampling.LANCZOS)
        ico.save(os.path.join(OUT, f"favicon-{size}.png"))


if __name__ == "__main__":
    main()

from pathlib import Path

from PIL import Image

src = Path("public/brand/logo-mark.png")
img = Image.open(src).convert("RGBA")
w, h = img.size
pix = img.load()
cx, cy = (w - 1) / 2, (h - 1) / 2
r = min(w, h) / 2 - 0.5

out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
out_pix = out.load()

for y in range(h):
    for x in range(w):
        dx = x - cx
        dy = y - cy
        d = (dx * dx + dy * dy) ** 0.5
        r0, g0, b0, a0 = pix[x, y]
        if d > r:
            continue
        edge = max(0.0, min(1.0, r - d))
        if d > r * 0.92 and ((r0 + g0 + b0) < 18 or (r0 + g0 + b0) > 750):
            continue
        alpha = int(a0 * edge) if edge < 1 else a0
        if alpha < 8:
            continue
        out_pix[x, y] = (r0, g0, b0, alpha)

sizes = {
    "public/brand/favicon-16.png": 16,
    "public/brand/favicon-32.png": 32,
    "public/brand/favicon-48.png": 48,
    "public/brand/favicon-180.png": 180,
    "public/brand/favicon-512.png": 512,
    "public/favicon.png": 32,
}

for path, size in sizes.items():
    resized = out.resize((size, size), Image.Resampling.LANCZOS)
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    resized.save(path, optimize=True)
    print(f"wrote {path} ({size})")

print("done")

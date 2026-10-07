r"""
Значок сайта и картинка для соцсетей — из contenido.json (цвета, название, тексты) и шрифтов сайта.

  python imagenes.py      → plantilla\assets\: favicon.svg, favicon.ico, apple-touch-icon.png,
                            icon-192.png, icon-512.png, og.jpg (1200×630, превью в WhatsApp / соцсетях)
  потом python build.py

Нужен Pillow (есть в .venv oskal-hq). Запускать, когда поменялись цвета, название или слоган.
"""
import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "plantilla" / "assets"
FONTS = ASSETS / "fonts"
SITE = json.loads((ROOT / "contenido.json").read_text(encoding="utf-8"))
C = SITE["tema"]["colores"]
LANG = SITE["idioma_principal"]
NAME = SITE["negocio"]["nombre"]


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def strip_tags(s):
    import re
    return re.sub(r"<[^>]+>", " ", s).replace("  ", " ").strip()


def pearl(size, bg=None):
    """Жемчужина: радиальный градиент + золотое кольцо + блик (как логотип на сайте)."""
    k = 4  # рисуем крупнее и уменьшаем — гладкие края
    s = size * k
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0) if bg is None else rgb(bg) + (255,))
    stops = [(0, rgb(C["superficie"])), (.42, rgb(C["rosa"])), (.82, rgb(C["rosa_medio"])), (1, rgb(C["oro_claro"]))]
    r = s * 0.40 if bg else s * 0.47
    cx = cy = s / 2
    fx, fy = cx - r * 0.28, cy - r * 0.40   # центр блика, как cx=36% cy=30% в SVG
    px = img.load()
    for y in range(int(cy - r) - 1, int(cy + r) + 2):
        for x in range(int(cx - r) - 1, int(cx + r) + 2):
            if (x - cx) ** 2 + (y - cy) ** 2 > r * r:
                continue
            t = min(1.0, math.hypot(x - fx, y - fy) / (r * 1.56))
            for j in range(len(stops) - 1):
                if stops[j][0] <= t <= stops[j + 1][0]:
                    u = (t - stops[j][0]) / (stops[j + 1][0] - stops[j][0])
                    px[x, y] = mix(stops[j][1], stops[j + 1][1], u) + (255,)
                    break
    d = ImageDraw.Draw(img)
    w = max(2, round(s * 0.012))
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=rgb(C["oro"]) + (255,), width=w)
    # блик: маска (L) → поворот → размытие → светлый цвет по маске (без тёмной каймы)
    mask = Image.new("L", (s, s), 0)
    ex, ey, ew, eh = cx - r * 0.32, cy - r * 0.40, r * 0.30, r * 0.18
    ImageDraw.Draw(mask).ellipse((ex - ew, ey - eh, ex + ew, ey + eh), fill=190)
    mask = mask.rotate(32, center=(ex, ey), resample=Image.BICUBIC).filter(ImageFilter.GaussianBlur(s * 0.012))
    img.paste(Image.new("RGBA", (s, s), rgb(C["superficie"]) + (255,)), (0, 0), mask)
    return img.resize((size, size), Image.LANCZOS)


def favicon_svg():
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">'
        '<defs><radialGradient id="g" cx="36%" cy="30%" r="78%">'
        f'<stop offset="0" stop-color="{C["superficie"]}"/><stop offset=".42" stop-color="{C["rosa"]}"/>'
        f'<stop offset=".82" stop-color="{C["rosa_medio"]}"/><stop offset="1" stop-color="{C["oro_claro"]}"/>'
        '</radialGradient></defs>'
        f'<circle cx="14" cy="14" r="12.6" fill="url(#g)" stroke="{C["oro"]}" stroke-width=".9"/>'
        f'<ellipse cx="10" cy="9" rx="3.8" ry="2.3" transform="rotate(-32 10 9)" fill="{C["superficie"]}" opacity=".8"/>'
        '</svg>\n'
    )


def font(name, size, weight=None):
    f = ImageFont.truetype(str(FONTS / name), size)
    if weight:
        try:
            f.set_variation_by_axes([weight])
        except OSError:
            pass
    return f


def spaced(draw, xy, text, fnt, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking
    return x


def og_image():
    W, H, k = 1200, 630, 2
    img = Image.new("RGB", (W * k, H * k), rgb(C["fondo"]))
    # мягкий розовый ореол справа (круг + сильное размытие — без краёв)
    glow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(glow).ellipse((620, -120, 1260, 520), fill=235)
    glow = glow.filter(ImageFilter.GaussianBlur(120)).resize((W * k, H * k), Image.BICUBIC)
    img.paste(Image.new("RGB", (W * k, H * k), rgb(C["rosa"])), (0, 0), glow)

    d = ImageDraw.Draw(img)
    # арка с градиентом
    ax, ay, aw, ah = 790 * k, 92 * k, 300 * k, 446 * k
    arch = Image.new("L", (aw, ah), 0)
    da = ImageDraw.Draw(arch)
    da.ellipse((0, 0, aw, aw), fill=255)
    da.rounded_rectangle((0, aw // 2, aw, ah), radius=22 * k, fill=255)
    grad = Image.linear_gradient("L").resize((aw, ah))
    top, bottom = Image.new("RGB", (aw, ah), rgb(C["rosa"])), Image.new("RGB", (aw, ah), rgb(C["rosa_medio"]))
    fill = Image.composite(bottom, top, grad)
    # линия-арка со сдвигом
    line = Image.new("L", (aw + 4 * k, ah + 4 * k), 0)
    dl = ImageDraw.Draw(line)
    dl.arc((2 * k, 2 * k, aw + 2 * k, aw + 2 * k), 180, 360, fill=255, width=2 * k)
    dl.line((2 * k, aw // 2 + 2 * k, 2 * k, ah), fill=255, width=2 * k)
    dl.line((aw + 2 * k - 1, aw // 2 + 2 * k, aw + 2 * k - 1, ah), fill=255, width=2 * k)
    img.paste(Image.new("RGB", line.size, rgb(C["oro"])), (ax + 20 * k, ay - 22 * k), line)
    img.paste(fill, (ax, ay), arch)
    # блик-«искра»
    sx, sy, sr = ax + aw - 34 * k, ay + 120 * k, 16 * k
    d.polygon([(sx, sy - sr), (sx + sr * .22, sy - sr * .22), (sx + sr, sy), (sx + sr * .22, sy + sr * .22),
               (sx, sy + sr), (sx - sr * .22, sy + sr * .22), (sx - sr, sy), (sx - sr * .22, sy - sr * .22)], fill=rgb(C["oro"]))

    t = SITE["textos"]
    over = strip_tags(t["hero"]["antetitulo"][LANG]).upper()
    lema = strip_tags(t["hero"]["titulo"][LANG])
    x0 = 92 * k
    d.line((x0, 178 * k, x0 + 34 * k, 178 * k), fill=rgb(C["oro"]), width=2 * k)
    spaced(d, (x0 + 50 * k, 166 * k), over, font("jost-latin.woff2", 21 * k, 500), rgb(C["oro_texto"]), 5 * k)
    d.text((x0 - 6 * k, 196 * k), NAME, font=font("cormorant-garamond-italic-latin.woff2", 168 * k), fill=rgb(C["texto"]))
    d.text((x0, 398 * k), lema, font=font("cormorant-garamond-italic-latin.woff2", 52 * k), fill=rgb(C["rosa_texto"]))
    if SITE["sitio"].get("demo"):
        foot = {"es": "Diseño de ejemplo · Oskal Studio", "ca": "Disseny d’exemple · Oskal Studio", "en": "Sample design · Oskal Studio"}[LANG]
        spaced(d, (x0, 528 * k), foot.upper(), font("jost-latin.woff2", 17 * k, 500), rgb(C["texto_suave"]), 3 * k)
    return img.resize((W, H), Image.LANCZOS)


def grain(size=128, seed=7):
    """Плитка мягкого зерна (светлые и тёмные точки с малой прозрачностью) — фон заглушек и секций."""
    import random
    rnd = random.Random(seed)
    img = Image.new("LA", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(size):
            v = rnd.gauss(0, 1)
            px[x, y] = (255 if v > 0 else 40, int(min(255, abs(v) * 15)))
    return img.convert("RGBA")


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    grain().save(ASSETS / "grano.webp", "WEBP", lossless=True, method=6)
    (ASSETS / "grano.png").unlink(missing_ok=True)
    (ASSETS / "favicon.svg").write_text(favicon_svg(), encoding="utf-8")
    big = pearl(256)
    big.save(ASSETS / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    pearl(180, bg=C["fondo"]).convert("RGB").save(ASSETS / "apple-touch-icon.png", optimize=True)
    pearl(192, bg=C["fondo"]).convert("RGB").save(ASSETS / "icon-192.png", optimize=True)
    pearl(512, bg=C["fondo"]).convert("RGB").save(ASSETS / "icon-512.png", optimize=True)
    og_image().save(ASSETS / "og.jpg", quality=86, optimize=True, progressive=True)
    for f in ("grano.webp", "favicon.svg", "favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "og.jpg"):
        print(f"{f:22} {(ASSETS / f).stat().st_size // 1024 or 1} КБ")


if __name__ == "__main__":
    main()

r"""
Значок сайта и картинка для соцсетей — из contenido.json (цвета, название, тексты) и шрифтов сайта.

  python imagenes.py      → plantilla\assets\: favicon.svg, favicon.ico, apple-touch-icon.png,
                            icon-192.png, icon-512.png, og.jpg (1200×630, превью в WhatsApp / соцсетях), grano.webp
  потом python build.py

Нужен Pillow (есть в .venv oskal-hq). Запускать, когда поменялись цвета, название или слоган.
"""
import json
import math
import re
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


def strip_tags(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s)).strip()


# Знак как на сайте (_logo.html): терракотовый круг, ветка оливы светлым, одна олива.
LOGO_SVG = (
    '<circle cx="16" cy="16" r="15" fill="{disc}"/>'
    '<path d="M9 23c4-4 8-8 14-14" fill="none" stroke="{leaf}" stroke-width="1.2" stroke-linecap="round"/>'
    '<path d="M12.6 19.4c-.6-2.6.4-4.6 2.8-5.8.6 2.4-.4 4.6-2.8 5.8Z" fill="{leaf}"/>'
    '<path d="M14.2 17.8c2.6-.2 4.6.8 5.6 3-2.6.2-4.6-.8-5.6-3Z" fill="{leaf}"/>'
    '<path d="M18 14c-.6-2.6.3-4.6 2.6-5.8.7 2.4-.3 4.6-2.6 5.8Z" fill="{leaf}"/>'
    '<circle cx="11.4" cy="22.4" r="1.6" fill="{olive}"/>'
)


def favicon_svg():
    body = LOGO_SVG.format(disc=C["terracota"], leaf=C["superficie"], olive=C["oliva"])
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">{body}</svg>\n'


def leaf(d, cx, cy, length, angle, fill, k):
    """Листик-миндалина: многоугольник по двум дугам."""
    pts, a = [], math.radians(angle)
    for i in range(21):
        t = i / 20
        x, y = t * length, math.sin(t * math.pi) * length * 0.22
        pts.append((x, y))
    for i in range(20, -1, -1):
        t = i / 20
        x, y = t * length, -math.sin(t * math.pi) * length * 0.22
        pts.append((x, y))
    d.polygon([(cx + x * math.cos(a) - y * math.sin(a), cy + x * math.sin(a) + y * math.cos(a)) for x, y in pts], fill=fill)


def emblem(size, bg=None):
    """Знак растром (для .ico и иконок): круг + ветка оливы."""
    k = 8
    s = size * k
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0) if bg is None else rgb(bg) + (255,))
    d = ImageDraw.Draw(img)
    r = s * (0.40 if bg else 0.47)
    c = s / 2
    d.ellipse((c - r, c - r, c + r, c + r), fill=rgb(C["terracota"]))
    u = r / 15  # единица = 1 px знака 32×32
    ox, oy = c - 16 * u, c - 16 * u
    d.line((ox + 9 * u, oy + 23 * u, ox + 23 * u, oy + 9 * u), fill=rgb(C["superficie"]), width=max(1, round(1.3 * u)))
    for (x, y, ang) in ((12.6, 19.4, -64), (14.2, 17.8, 18), (18, 14, -62)):
        leaf(d, ox + x * u, oy + y * u, 6.4 * u, ang, rgb(C["superficie"]), k)
    d.ellipse((ox + 9.8 * u, oy + 20.8 * u, ox + 13 * u, oy + 24 * u), fill=rgb(C["oliva"]))
    return img.resize((size, size), Image.LANCZOS)


def font(name, size, weight=None, opsz=None):
    f = ImageFont.truetype(str(FONTS / name), size)
    try:
        axes = f.get_variation_axes()
        vals = []
        for ax in axes:
            n = ax.get("name", b"")
            n = n.decode() if isinstance(n, bytes) else str(n)
            if "eight" in n and weight:
                vals.append(weight)
            elif "ptical" in n and opsz:
                vals.append(opsz)
            else:
                vals.append(ax.get("default", ax["minimum"]))
        if vals:
            f.set_variation_by_axes(vals)
    except (OSError, AttributeError, KeyError):
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
    img = Image.new("RGB", (W * k, H * k), rgb(C["oscuro"]))
    # тёплый свет справа (как свеча в зале)
    glow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(glow).ellipse((700, 60, 1180, 560), fill=150)
    glow = glow.filter(ImageFilter.GaussianBlur(110)).resize((W * k, H * k), Image.BICUBIC)
    img.paste(Image.new("RGB", (W * k, H * k), rgb(C["terracota"])), (0, 0), glow)
    d = ImageDraw.Draw(img)
    # тонкая рамка
    m = 26 * k
    d.rounded_rectangle((m, m, W * k - m, H * k - m), radius=18 * k, outline=rgb(C["oro"]), width=k)
    # ветка оливы справа — линиями
    bx, by = 860 * k, 520 * k
    ex, ey = 1120 * k, 110 * k
    d.line((bx, by, ex, ey), fill=rgb(C["oro_claro"]), width=2 * k)
    for i in range(1, 6):
        t = i / 6
        x, y = bx + (ex - bx) * t, by + (ey - by) * t
        for side in (-1, 1):
            ang = math.degrees(math.atan2(ey - by, ex - bx)) + side * 48
            leaf(d, x, y, 70 * k, ang, rgb(C["oliva_claro"]), k)
    for (x, y) in ((930, 470), (975, 410)):
        d.ellipse(((x - 11) * k, (y - 15) * k, (x + 11) * k, (y + 15) * k), fill=rgb(C["oliva"]), outline=rgb(C["oro_claro"]), width=k)

    t = SITE["textos"]
    over = strip_tags(t["hero"]["antetitulo"][LANG]).upper()
    lema = strip_tags(t["hero"]["titulo"][LANG])
    x0 = 92 * k
    d.line((x0, 150 * k, x0 + 34 * k, 150 * k), fill=rgb(C["oro_claro"]), width=2 * k)
    spaced(d, (x0 + 50 * k, 138 * k), over, font("dm-sans-latin.woff2", 21 * k, 500), rgb(C["oro_claro"]), 5 * k)
    d.text((x0 - 4 * k, 170 * k), NAME, font=font("fraunces-italic-latin.woff2", 150 * k, 400, 144), fill=rgb(C["sobre_oscuro"]))
    d.text((x0, 372 * k), lema, font=font("fraunces-italic-latin.woff2", 50 * k, 400, 72), fill=rgb(C["terracota_claro"]))
    if SITE["sitio"].get("demo"):
        foot = {"es": "Diseño de ejemplo · Oskal Studio", "ca": "Disseny d’exemple · Oskal Studio",
                "en": "Sample design · Oskal Studio", "it": "Design di esempio · Oskal Studio"}[LANG]
        spaced(d, (x0, 512 * k), foot.upper(), font("dm-sans-latin.woff2", 17 * k, 500), rgb(C["sobre_oscuro"]), 3 * k)
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
    (ASSETS / "favicon.svg").write_text(favicon_svg(), encoding="utf-8")
    emblem(256).save(ASSETS / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    emblem(180, bg=C["fondo"]).convert("RGB").save(ASSETS / "apple-touch-icon.png", optimize=True)
    emblem(192, bg=C["fondo"]).convert("RGB").save(ASSETS / "icon-192.png", optimize=True)
    emblem(512, bg=C["fondo"]).convert("RGB").save(ASSETS / "icon-512.png", optimize=True)
    og_image().save(ASSETS / "og.jpg", quality=86, optimize=True, progressive=True)
    for f in ("grano.webp", "favicon.svg", "favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "og.jpg"):
        print(f"{f:22} {(ASSETS / f).stat().st_size // 1024 or 1} КБ")


if __name__ == "__main__":
    main()

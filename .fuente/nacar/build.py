#!/usr/bin/env python3
r"""
Сборка сайта из одного файла данных.

  contenido.json   ВСЁ содержимое: тексты на всех языках, цвета, шрифты, контакты,
                   часы, прайс, команда, отзывы, места под фото (+ запросы для ChatGPT)
  plantilla\       разметка (index.html, legal.html, style.css, script.js) и постоянные
                   файлы (assets\: шрифты, иконки, картинка для соцсетей)
  fotos\           настоящие фото — имена из FOTOS.md; нет фото — красивая заглушка
  site\            РЕЗУЛЬТАТ — руками не править: стирается и собирается заново

  python build.py                    собрать site\
  python build.py --salida <папка>   собрать в другую папку (например, 3_WEB клиента)

Страницы: главная и legal на каждом языке — основной язык в корне, остальные в <код>\
(es: index.html, ca\index.html, en\index.html). Без JS всё читается: тексты уже в HTML.
Только стандартная библиотека Python; Pillow (если есть) делает копии фото 800 px для телефона.
"""
import argparse
import hashlib
import html
import json
import re
import shutil
import sys
import urllib.parse
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TPL = ROOT / "plantilla"
DAYS = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"]
SCHEMA_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

LANG = {"cur": "es", "main": "es", "all": ["es"]}
WARNINGS: list[str] = []


# ---------------------------------------------------------------- данные с переводами

def is_translation(v) -> bool:
    """{"es": …, "ca": …} — текст на нескольких языках."""
    return isinstance(v, dict) and bool(v) and set(v) <= set(LANG["all"]) and LANG["main"] in v


def pick(v, path=""):
    if not is_translation(v):
        return v
    text = v.get(LANG["cur"])
    if text in (None, ""):
        WARNINGS.append(f"нет перевода [{LANG['cur']}]: {path}")
        text = v[LANG["main"]]
    return text


def wrap(v, path):
    if is_translation(v):
        return pick(v, path)
    if isinstance(v, dict):
        return Obj(v, path)
    if isinstance(v, list):
        return Arr(v, path)
    return v


class Missing:
    """Несуществующий ключ: пустая строка в HTML, ложь в {% if %}, предупреждение в конце."""

    def __init__(self, path):
        self._path = path

    def __bool__(self):
        return False

    def __str__(self):
        return ""

    def __iter__(self):
        return iter(())

    def __len__(self):
        return 0

    def __getattr__(self, k):
        if k.startswith("__"):
            raise AttributeError(k)
        return Missing(f"{self._path}.{k}")


class Obj:
    def __init__(self, d, path):
        self._d, self._path = d, path

    def __getattr__(self, k):
        if k.startswith("__"):
            raise AttributeError(k)
        if k in self._d:
            return wrap(self._d[k], f"{self._path}.{k}")
        WARNINGS.append(f"нет ключа: {self._path}.{k}")
        return Missing(f"{self._path}.{k}")

    __getitem__ = __getattr__

    def __contains__(self, k):
        return k in self._d

    def __bool__(self):
        return bool(self._d)

    def __len__(self):
        return len(self._d)

    def items(self):
        return [(k, wrap(v, f"{self._path}.{k}")) for k, v in self._d.items() if not k.startswith("_")]

    def get(self, k, default=None):
        return wrap(self._d[k], f"{self._path}.{k}") if k in self._d else default


class Arr:
    def __init__(self, a, path):
        self._a, self._path = a, path

    def __getitem__(self, i):
        return wrap(self._a[i], f"{self._path}[{i}]")

    def __iter__(self):
        return (wrap(v, f"{self._path}[{i}]") for i, v in enumerate(self._a))

    def __len__(self):
        return len(self._a)

    def __bool__(self):
        return bool(self._a)


def plain(v):
    """Обратно в обычные dict/list (для JSON), с переводом на текущий язык."""
    if isinstance(v, Obj):
        return {k: plain(x) for k, x in v.items()}
    if isinstance(v, Arr):
        return [plain(x) for x in v]
    if isinstance(v, Missing):
        return None
    if is_translation(v):
        return pick(v)
    if isinstance(v, dict):
        return {k: plain(x) for k, x in v.items() if not k.startswith("_")}
    if isinstance(v, list):
        return [plain(x) for x in v]
    return v


# ---------------------------------------------------------------- мини-шаблонизатор
# {{ выражение | фильтр | фильтр(арг) }}   — экранируется, кроме фильтра raw
# {% for x in список %} … {% endfor %}     — внутри loop.index, loop.index0, loop.first, loop.last, loop.length
# {% if усл %} … {% elif усл %} … {% else %} … {% endif %}
# {% set имя = выражение %}   {% include "файл" %}   {# комментарий #}
# Выражения — обычный Python (точки работают для ключей JSON).

TOKEN = re.compile(r"({{.*?}}|{%.*?%}|{#.*?#})", re.S)
_cache: dict[str, list] = {}


class Safe(str):
    pass


class Loop:
    def __init__(self, i, n):
        self.index0, self.index, self.length = i, i + 1, n
        self.first, self.last = i == 0, i == n - 1


def parse(src, name):
    # строки, где только {% … %}, не оставляют пустых строк в результате
    src = re.sub(r"^[ \t]*({%.*?%}|{#.*?#})[ \t]*\r?\n", r"\1", src, flags=re.M)
    tokens = TOKEN.split(src)
    pos = 0

    def block(ends):
        nonlocal pos
        nodes = []
        while pos < len(tokens):
            t = tokens[pos]
            pos += 1
            if not t or t.startswith("{#"):
                continue
            if t.startswith("{{"):
                nodes.append(("var", t[2:-2].strip()))
            elif t.startswith("{%"):
                tag = t[2:-2].strip()
                word = tag.split()[0]
                if word in ends:
                    return nodes, tag
                if word == "for":
                    m = re.match(r"for\s+(.+?)\s+in\s+(.+)$", tag, re.S)
                    body, _ = block({"endfor"})
                    nodes.append(("for", m.group(1), m.group(2), body))
                elif word == "if":
                    branches, cond, other = [], tag[2:].strip(), []
                    while True:
                        body, end = block({"elif", "else", "endif"})
                        branches.append((cond, body))
                        if end.startswith("elif"):
                            cond = end[4:].strip()
                            continue
                        if end == "else":
                            other, _ = block({"endif"})
                        break
                    nodes.append(("if", branches, other))
                elif word == "set":
                    m = re.match(r"set\s+(\w+)\s*=\s*(.+)$", tag, re.S)
                    nodes.append(("set", m.group(1), m.group(2)))
                elif word == "include":
                    nodes.append(("include", tag.split(None, 1)[1].strip().strip("'\"")))
                else:
                    raise SyntaxError(f"{name}: неизвестный тег {{% {tag} %}}")
            else:
                nodes.append(("text", t))
        if ends:
            raise SyntaxError(f"{name}: нет закрывающего {sorted(ends)}")
        return nodes, None

    return block(set())[0]


def load_tpl(name):
    if name not in _cache:
        _cache[name] = parse((TPL / name).read_text(encoding="utf-8"), name)
    return _cache[name]


def evaluate(expr, ctx):
    try:
        # шаблон — наш, не пользовательский; ctx в globals, чтобы работали генераторы списков;
        # фильтры доступны и как функции: tel(x), wa(x)
        return eval(expr, {"__builtins__": SAFE_BUILTINS, **FILTERS, **ctx})
    except Exception as e:
        raise RuntimeError(f"ошибка в выражении «{expr}»: {e}") from None


def split_filters(expr):
    parts, depth, quote, cur = [], 0, None, ""
    for ch in expr:
        if quote:
            quote = None if ch == quote else quote
        elif ch in "'\"":
            quote = ch
        elif ch in "([{":
            depth += 1
        elif ch in ")]}":
            depth -= 1
        elif ch == "|" and depth == 0:
            parts.append(cur.strip())
            cur = ""
            continue
        cur += ch
    parts.append(cur.strip())
    return parts[0], parts[1:]


def output(expr, ctx):
    head, filters = split_filters(expr)
    value = evaluate(head, ctx)
    for f in filters:
        m = re.match(r"(\w+)(?:\((.*)\))?$", f, re.S)
        if not m or m.group(1) not in FILTERS:
            raise RuntimeError(f"нет фильтра «{f}» в «{expr}»")
        args = evaluate(f"[{m.group(2)}]", ctx) if m.group(2) else []
        value = FILTERS[m.group(1)](value, *args)
    if isinstance(value, Safe):
        return value
    return html.escape("" if value is None else str(value), quote=True)


def render_nodes(nodes, ctx):
    out = []
    for n in nodes:
        kind = n[0]
        if kind == "text":
            out.append(n[1])
        elif kind == "var":
            out.append(output(n[1], ctx))
        elif kind == "for":
            names = [x.strip() for x in n[1].split(",")]
            items = list(evaluate(n[2], ctx))
            for i, item in enumerate(items):
                sub = dict(ctx)
                if len(names) == 1:
                    sub[names[0]] = item
                else:
                    sub.update(zip(names, item))
                sub["loop"] = Loop(i, len(items))
                out.append(render_nodes(n[3], sub))
        elif kind == "if":
            for cond, body in n[1]:
                if evaluate(cond, ctx):
                    out.append(render_nodes(body, ctx))
                    break
            else:
                out.append(render_nodes(n[2], ctx))
        elif kind == "set":
            ctx[n[1]] = evaluate(n[2], ctx)
        elif kind == "include":
            out.append(render_nodes(load_tpl(n[1]), ctx))
    return "".join(out)


SAFE_BUILTINS = {"len": len, "str": str, "int": int, "range": range, "enumerate": enumerate,
                 "min": min, "max": max, "any": any, "all": all, "zip": zip, "True": True,
                 "False": False, "None": None, "isinstance": isinstance, "list": list}


# ---------------------------------------------------------------- фильтры

def f_raw(v):
    return Safe("" if v is None else str(v))


def f_json(v):
    s = json.dumps(plain(v), ensure_ascii=False, separators=(",", ":"))
    return Safe(s.replace("</", "<\\/"))


def f_strip(v):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", str(v))).strip()


def f_url(v):
    return urllib.parse.quote(str(v), safe="")


def f_default(v, d):
    return v if v else d


SITE: dict = {}


def wa_url(text):
    num = re.sub(r"\D", "", SITE["negocio"].get("whatsapp", ""))
    if num and len(num) == 9:
        num = "34" + num
    base = f"https://wa.me/{num}" if num else "https://wa.me/"
    return f"{base}?text={urllib.parse.quote(str(text), safe='')}"


def tel_url(v):
    return "tel:+" + re.sub(r"\D", "", str(v)) if str(v).strip().startswith("+") else "tel:" + re.sub(r"\D", "", str(v))


def fmt_price(v):
    """35 → «35 €» (es, ca) / «€35» (en); 35.5 → «35,50 €»."""
    if v in (None, ""):
        return ""
    n = float(v)
    s = f"{n:.0f}" if n.is_integer() else f"{n:.2f}"
    if LANG["cur"] == "en":
        return f"€{s}"
    return s.replace(".", ",") + " €"


def fmt_minutes(v):
    """75 → «1 h 15 min»."""
    if not v:
        return ""
    v = int(v)
    h, m = divmod(v, 60)
    if h and m:
        return f"{h} h {m} min"
    if h:
        return f"{h} h"
    return f"{m} min"


def f_photo(slot, cls="", loading="lazy", sizes="100vw", priority=False):
    """Фото из fotos/ или заглушка в цветах сайта (если файла ещё нет)."""
    info = SITE["fotos"].get(slot)
    if info is None:
        raise RuntimeError(f"нет места под фото «{slot}» в contenido.json → fotos")
    alt = pick(info.get("alt", ""), f"fotos.{slot}.alt")
    name = info["archivo"]
    raiz = CTX_PAGE["raiz"]
    pos = info.get("encuadre", "50% 50%")
    # encuadre — кадр на компьютере, encuadre_movil — на телефоне (CSS берёт --pos-m до 960 px)
    style = f'--pos:{pos};--pos-m:{info.get("encuadre_movil", pos)}'
    ready = PHOTO_READY.get(name)
    if ready:
        small = ready["small"]
        srcset = f' srcset="{raiz}img/{small[0]} {small[1]}w, {raiz}img/{ready["src"]} {ready["w"]}w" sizes="{sizes}"' if small else ""
        prio = ' fetchpriority="high"' if priority else ""
        img = (f'<img class="foto {cls}" src="{raiz}img/{ready["src"]}"{srcset} width="{ready["w"]}" height="{ready["h"]}" '
               f'alt="{html.escape(alt)}" loading="{loading}" decoding="async"{prio} style="{style}">')
        mob = ready.get("movil")
        if mob:  # recorte vertical para el teléfono (más ligero y nítido que recortar la foto ancha)
            img = (f'<picture class="foto-pic"><source media="(max-width: {MOVIL_MAX}px)" srcset="{raiz}img/{mob[0]}" '
                   f'width="{mob[1]}" height="{mob[2]}">{img}</picture>')
        return Safe(img)
    tag = html.escape(pick(SITE["textos"]["ui"]["foto_ejemplo"], "textos.ui.foto_ejemplo"))
    motif = info.get("motivo", "hoja")
    tone = info.get("tono", "rosa")
    shape = "h" if info["ancho"] > info["alto"] else ("v" if info["alto"] > info["ancho"] else "c")
    return Safe(
        f'<div class="ph ph--{tone} ph--{shape} {cls}" role="img" aria-label="{html.escape(alt)}" data-foto="{name}">'
        f'<svg class="ph__m" aria-hidden="true" focusable="false"><use href="#m-{motif}"/></svg>'
        f'<span class="ph__tag">{tag}</span></div>'
    )


def f_fields(v):
    """{titular}, {nif}, {email}… в текстах legal → данные из negocio."""
    n = SITE["negocio"]
    values = {**n["legal"], "email": n.get("email", ""), "telefono": n.get("telefono", ""),
              "nombre": n["nombre"], "ciudad": n["direccion"]["ciudad"]}
    s = str(v)
    for k, x in values.items():
        if not k.startswith("_"):
            s = s.replace("{" + k + "}", html.escape(str(pick(x, "negocio.legal." + k))))
    return s


TAG_RE = re.compile(r"(<[^>]+>)")


def f_words(v):
    """Заголовок → слова в <span class="w"><span class="wi" style="--i:N">…</span></span>
    (для появления по словам); теги <em>, <br> остаются. Без JS слова просто видны."""
    out, i = [], 0
    for part in TAG_RE.split(str(v)):
        if not part:
            continue
        if part.startswith("<"):
            out.append(part)
            continue
        for tok in re.split(r"(\s+)", part):
            if not tok:
                continue
            if tok.isspace():
                out.append(" ")
                continue
            out.append(f'<span class="w"><span class="wi" style="--i:{i}">{html.escape(tok, quote=False)}</span></span>')
            i += 1
    return Safe("".join(out))


def f_number(v, dec=0):
    """3500 → «3500» (es, ca: без точки до 10 000, как Intl) / «3,500» (en); 4.9 → «4,9» / «4.9»."""
    n = float(v)
    s = f"{n:,.{int(dec)}f}"
    if LANG["cur"] in ("es", "ca"):
        s = s.replace(",", "§").replace(".", ",").replace("§", ".")
        if abs(n) < 10000:
            s = s.replace(".", "")
    return s


FILTERS = {"raw": f_raw, "json": f_json, "strip": f_strip, "url": f_url, "default": f_default,
           "wa": wa_url, "tel": tel_url, "precio": fmt_price, "duracion": fmt_minutes, "foto": f_photo,
           "campos": f_fields, "palabras": f_words, "numero": f_number,
           "upper": lambda v: str(v).upper(), "lower": lambda v: str(v).lower()}
CTX_PAGE: dict = {}
PHOTO_READY: dict = {}  # archivo → {"src", "w", "h", "small": (имя, ширина) | None, "movil": (имя, w, h) | None}
MOVIL_MAX = 700  # до этой ширины экрана — вертикальный recorte «movil» (если есть)


def hero_preload(raiz):
    """<link rel=preload> для фото с «precargar»: true — первая картинка грузится сразу, без очереди."""
    out = []
    for slot, info in SITE["fotos"].items():
        ready = None if slot.startswith("_") or not info.get("precargar") else PHOTO_READY.get(info["archivo"])
        if not ready:
            continue
        mob = ready.get("movil")
        if mob:
            out.append(f'<link rel="preload" as="image" href="{raiz}img/{mob[0]}" media="(max-width: {MOVIL_MAX}px)" fetchpriority="high">')
            small = ready.get("small")
            srcset = f' imagesrcset="{raiz}img/{small[0]} {small[1]}w, {raiz}img/{ready["src"]} {ready["w"]}w" imagesizes="100vw"' if small else ""
            out.append(f'<link rel="preload" as="image" href="{raiz}img/{ready["src"]}"{srcset} media="(min-width: {MOVIL_MAX + 1}px)" fetchpriority="high">')
        else:
            out.append(f'<link rel="preload" as="image" href="{raiz}img/{ready["src"]}" fetchpriority="high">')
    return Safe("\n".join(out))


def prepare_photos(site, out):
    """fotos/<имя>.(webp|jpg|png) → site/img/<имя>.webp (+ <имя>-640.webp для телефона)."""
    photos_dir = ROOT / "fotos"
    if not photos_dir.exists():
        return
    try:
        from PIL import Image
    except ImportError:
        Image = None
    for slot, info in site["fotos"].items():
        if slot.startswith("_"):
            continue
        stem = Path(info["archivo"]).stem
        found = next((photos_dir / (stem + e) for e in (".webp", ".jpg", ".jpeg", ".png")
                      if (photos_dir / (stem + e)).exists()), None)
        if not found:
            continue
        (out / "img").mkdir(exist_ok=True)
        dest, small, mob = out / "img" / (stem + ".webp"), None, None
        if Image:
            with Image.open(found) as im:
                im = im.convert("RGB")
                if info.get("movil"):
                    # «movil»: [ancho, alto] — recorte vertical para el teléfono, centrado en encuadre_movil (x %)
                    mw, mh = info["movil"]
                    cw = min(im.width, round(im.height * mw / mh))
                    cx = float(str(info.get("encuadre_movil", info.get("encuadre", "50% 50%"))).split()[0].rstrip("%")) / 100
                    left = min(max(0, round(im.width * cx - cw / 2)), im.width - cw)
                    crop = im.crop((left, 0, left + cw, im.height)).resize((mw, mh), Image.LANCZOS)
                    mname = stem + "-m.webp"
                    crop.save(out / "img" / mname, "WEBP", quality=72, method=6)
                    mob = (mname, mw, mh)
                if im.width > 1600:
                    im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
                im.save(dest, "WEBP", quality=82, method=6)
                w, h = im.size
                if w > 900:
                    name = stem + "-640.webp"
                    im.resize((640, round(h * 640 / w)), Image.LANCZOS).save(out / "img" / name, "WEBP", quality=80, method=6)
                    small = (name, 640)
        elif found.suffix == ".webp":
            shutil.copy2(found, dest)
            w, h = info["ancho"], info["alto"]
        else:
            WARNINGS.append(f"{found.name}: нужен Pillow, чтобы сделать WebP — пока заглушка")
            continue
        PHOTO_READY[info["archivo"]] = {"src": dest.name, "w": w, "h": h, "small": small, "movil": mob}


# ---------------------------------------------------------------- вычисляемое

def hex_rgb(h):
    h = h.lstrip("#")
    return " ".join(str(int(h[i:i + 2], 16)) for i in (0, 2, 4))


def theme_css(site):
    t = site["tema"]
    lines = [":root{"]
    # схема для браузера: «тёмный режим для сайтов» (Opera, Chrome на телефоне) не перекрашивает сайт
    lines.append(f"  color-scheme:{t.get('esquema', 'light')};")
    for k, v in t["colores"].items():
        if k.startswith("_"):
            continue
        var = k.replace("_", "-")
        lines.append(f"  --{var}:{v}; --{var}-rgb:{hex_rgb(v)};")
    f = t["fuentes"]
    lines.append(f"  --font-titulos:\"{f['titulos']}\",\"{f['titulos']} Fallback\",{f['titulos_respaldo']};")
    lines.append(f"  --font-texto:\"{f['texto']}\",\"{f['texto']} Fallback\",{f['texto_respaldo']};")
    for k, v in t.get("medidas", {}).items():
        if not k.startswith("_"):
            lines.append(f"  --{k.replace('_', '-')}:{v};")
    lines.append("}")
    faces = []
    for a in f["archivos"]:
        faces.append(
            f"@font-face{{font-family:\"{a['familia']}\";src:url(fonts/{a['archivo']}) format(\"woff2\");"
            f"font-weight:{a['peso']};font-style:{a['estilo']};font-display:swap;"
            f"unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,"
            f"U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}}"
        )
    for fb in f.get("respaldos", []):
        faces.append(
            f"@font-face{{font-family:\"{fb['familia']} Fallback\";src:{', '.join('local(' + chr(34) + x + chr(34) + ')' for x in fb['local'])};"
            f"size-adjust:{fb['size_adjust']};ascent-override:{fb['ascent']};descent-override:{fb['descent']};"
            f"line-gap-override:0%}}"
        )
    return "\n".join(faces) + "\n" + "\n".join(lines) + "\n"


def to_min(hhmm):
    h, m = hhmm.split(":")
    return int(h) * 60 + int(m)


def hours_rows(site):
    """7 строк по дням (пн…вс) для таблицы часов."""
    h = site["negocio"]["horario"]
    t = site["textos"]["horario"]
    rows = []
    for i, d in enumerate(DAYS):
        spans = h.get(d, [])
        text = "  ·  ".join(f"{a}–{b}" for a, b in spans) if spans else pick(t["cerrado"])
        rows.append({"dia": pick(t["dias"][i]), "js": (i + 1) % 7, "texto": text, "cerrado": not spans})
    return rows


def hours_summary(site):
    """Короткая строка «Mar–Vie 10:00–20:00 · Sáb 9:00–15:00» — группы одинаковых дней."""
    h = site["negocio"]["horario"]
    short = site["textos"]["horario"]["dias_cortos"]
    groups = []
    for i, d in enumerate(DAYS):
        spans = h.get(d, [])
        if not spans:
            continue
        key = tuple(map(tuple, spans))
        if groups and groups[-1][2] == key and groups[-1][1] == i - 1:
            groups[-1][1] = i
        else:
            groups.append([i, i, key])
    parts = []
    for a, b, key in groups:
        days = pick(short[a]) if a == b else f"{pick(short[a])}–{pick(short[b])}"
        times = ", ".join(f"{x}–{y}" for x, y in key)
        parts.append(f"{days} {times}")
    return " · ".join(parts)


def jsonld(site, page_url):
    n = site["negocio"]
    d = n["direccion"]
    spec = {}
    for i, day in enumerate(DAYS):
        for a, b in n["horario"].get(day, []):
            spec.setdefault((a, b), []).append(SCHEMA_DAYS[i])
    data = {
        "@context": "https://schema.org",
        "@type": n["tipo_schema"],
        "name": n["nombre"],
        "description": pick(site["textos"]["seo"]["descripcion"]),
        "url": page_url,
        "image": site["sitio"]["url"] + "og.jpg",
        "telephone": n["telefono"],
        "email": n.get("email") or None,
        "priceRange": n.get("rango_precios") or None,
        "address": {"@type": "PostalAddress", "streetAddress": d["calle"], "postalCode": d["cp"],
                    "addressLocality": d["ciudad"], "addressRegion": d["region"], "addressCountry": d["pais"]},
        "geo": {"@type": "GeoCoordinates", "latitude": n["geo"]["lat"], "longitude": n["geo"]["lon"]},
        "hasMap": maps_url(site),
        "openingHoursSpecification": [
            {"@type": "OpeningHoursSpecification", "dayOfWeek": days, "opens": a, "closes": b}
            for (a, b), days in spec.items()
        ],
        "sameAs": [u for u in n.get("redes", {}).values() if u] or None,
    }
    data = {k: v for k, v in data.items() if v is not None}
    return json.dumps(data, ensure_ascii=False, indent=2).replace("</", "<\\/")


def maps_url(site):
    g = site["negocio"]["geo"]
    return f"https://www.google.com/maps/dir/?api=1&destination={g['lat']},{g['lon']}"


def page_path(lang, page):
    folder = "" if lang == LANG["main"] else f"{lang}/"
    return f"{folder}{'index.html' if page == 'index' else page + '.html'}"


def page_url(site, lang, page):
    folder = "" if lang == LANG["main"] else f"{lang}/"
    return site["sitio"]["url"] + folder + ("" if page == "index" else page + ".html")


def js_data(site, lang):
    n = site["negocio"]
    t = site["textos"]
    return {
        "lang": lang,
        "demo": bool(site["sitio"].get("demo")),
        "tz": n.get("zona_horaria", "Europe/Madrid"),
        "horario": {str((i + 1) % 7): n["horario"].get(d, []) for i, d in enumerate(DAYS)},
        "festivos": n.get("festivos", []),
        "mapa": {"lat": n["geo"]["lat"], "lon": n["geo"]["lon"], "zoom": n["geo"].get("zoom", 16),
                 "nombre": n["nombre"], "dir": f"{n['direccion']['calle']}, {n['direccion']['ciudad']}"},
        "wa_base": wa_url("").split("?")[0],
        "t": plain(Obj(t["js"], "textos.js")),
        "dias": [pick(x) for x in t["horario"]["dias_semana_js"]],
    }


# ---------------------------------------------------------------- сборка

def main():
    ap = argparse.ArgumentParser(description="Собрать сайт из contenido.json")
    ap.add_argument("--salida", help="куда собрать (по умолчанию — sitio.salida из contenido.json)")
    args = ap.parse_args()

    site = json.loads((ROOT / "contenido.json").read_text(encoding="utf-8"))
    out = Path(args.salida or (ROOT / site["sitio"].get("salida", "site"))).resolve()
    if out == ROOT or ROOT.is_relative_to(out):
        raise RuntimeError(f"папка сборки {out} совпадает с исходниками или выше их — поменяй sitio.salida")
    SITE.update(site)
    LANG["all"] = site["idiomas"]
    LANG["main"] = site["idioma_principal"]
    if not site["sitio"]["url"].endswith("/"):
        site["sitio"]["url"] += "/"

    # чистим прошлую сборку; .git, .gitignore и netlify.toml не трогаем (в 3_WEB клиента это корень git)
    out.mkdir(parents=True, exist_ok=True)
    for p in out.iterdir():
        if p.name.startswith(".") or p.name == "netlify.toml":
            continue
        shutil.rmtree(p) if p.is_dir() else p.unlink()
    # постоянные файлы: шрифты, иконки, картинка для соцсетей
    shutil.copytree(TPL / "assets", out, dirs_exist_ok=True)

    prepare_photos(site, out)

    (out / "style.css").write_text(theme_css(site) + (TPL / "style.css").read_text(encoding="utf-8"), encoding="utf-8")
    shutil.copy2(TPL / "script.js", out / "script.js")
    # версия файлов в ссылках (style.css?v=…): браузер не возьмёт старую копию из кеша
    asset_v = hashlib.md5((out / "style.css").read_bytes() + (out / "script.js").read_bytes()).hexdigest()[:8]

    pages = ["index", "legal"]
    for lang in site["idiomas"]:
        LANG["cur"] = lang
        root_rel = "" if lang == LANG["main"] else "../"
        for page in pages:
            ctx = {k: wrap(v, k) for k, v in site.items() if not k.startswith("_")}
            CTX_PAGE.clear()
            CTX_PAGE.update(raiz=root_rel)
            url = page_url(site, lang, page)
            ctx.update(
                lang=lang,
                pagina=page,
                raiz=root_rel,
                url_pagina=url,
                alternos=[{"lang": l, "url": page_url(site, l, page), "href": root_rel + page_path(l, page),
                           "nombre": site["idioma_nombres"][l]} for l in site["idiomas"]],
                url_x_default=page_url(site, LANG["main"], page),
                href_inicio=root_rel + page_path(lang, "index"),
                href_legal=root_rel + page_path(lang, "legal"),
                og_locale=site["og_locale"][lang],
                og_locales_alt=[site["og_locale"][l] for l in site["idiomas"] if l != lang],
                jsonld=jsonld(site, url),
                horario_filas=hours_rows(site),
                horario_resumen=hours_summary(site),
                url_mapa=maps_url(site),
                datos_js=js_data(site, lang),
                fuentes_precarga=[a["archivo"] for a in site["tema"]["fuentes"]["archivos"] if a.get("precargar")],
                anio=date.today().year,
                precarga_img=hero_preload(root_rel),
                asset_v=asset_v,
            )
            for k in ("alternos", "horario_filas", "og_locales_alt", "fuentes_precarga"):
                ctx[k] = wrap(ctx[k], k)
            html_out = render_nodes(load_tpl(f"{page}.html"), ctx)
            dest = out / page_path(lang, page)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(html_out, encoding="utf-8")
        LANG["cur"] = LANG["main"]

    write_seo_files(site, out)
    write_fotos_md(site)

    seen = set()
    for w in WARNINGS:
        if w not in seen:
            seen.add(w)
            print("  ! " + w)
    files = sorted(p.relative_to(out).as_posix() for p in out.rglob("*") if p.is_file())
    print(f"Готово: {out}  ({len(files)} файлов, страниц: {len(pages) * len(site['idiomas'])})")
    missing = [i["archivo"] for k, i in site["fotos"].items() if not k.startswith("_") and i["archivo"] not in PHOTO_READY]
    if missing:
        print(f"Фото пока заглушки ({len(missing)}): {', '.join(missing)} — см. FOTOS.md")


def write_seo_files(site, out):
    s = site["sitio"]
    if not s.get("en_raiz", True):
        # демо в подпапке чужого сайта: robots.txt, sitemap.xml и _headers работают только в корне домена —
        # не создаём (noindex — метатегом в каждой странице)
        write_manifest(site, out)
        return
    if s.get("noindex"):
        robots = "# Borrador / diseño de ejemplo: no indexar\nUser-agent: *\nDisallow: /\n"
    else:
        robots = f"User-agent: *\nAllow: /\n\nSitemap: {s['url']}sitemap.xml\n"
    (out / "robots.txt").write_text(robots, encoding="utf-8")

    today = date.today().isoformat()
    urls = []
    for lang in site["idiomas"]:
        alts = "".join(
            f'\n    <xhtml:link rel="alternate" hreflang="{l}" href="{page_url(site, l, "index")}"/>'
            for l in site["idiomas"]
        )
        urls.append(f"  <url>\n    <loc>{page_url(site, lang, 'index')}</loc>\n    <lastmod>{today}</lastmod>{alts}\n  </url>")
    (out / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
        + "\n".join(urls) + "\n</urlset>\n", encoding="utf-8")

    write_manifest(site, out)
    # Netlify: заголовки кеша и безопасности (тот же файл работает и у клиента)
    (out / "_headers").write_text(
        "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n"
        "  Permissions-Policy: camera=(), microphone=(), geolocation=()\n"
        + ("  X-Robots-Tag: noindex, nofollow\n" if s.get("noindex") else "")
        + "/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n"
        "/img/*\n  Cache-Control: public, max-age=604800\n", encoding="utf-8")


def write_manifest(site, out):
    n = site["negocio"]
    c = site["tema"]["colores"]
    LANG["cur"] = LANG["main"]
    manifest = {
        "name": f"{n['nombre']} · {pick(site['textos']['marca']['tipo'])}",
        "short_name": n["nombre"],
        "start_url": "./",
        "display": "browser",
        "background_color": c["fondo"],
        "theme_color": c["fondo"],
        "icons": [
            {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
        ],
    }
    (out / "site.webmanifest").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


def write_fotos_md(site):
    """FOTOS.md — места под фото и готовые запросы для ChatGPT (из contenido.json)."""
    LANG["cur"] = "es"
    f = site["fotos"]
    lines = [
        f"# Фото — {site['negocio']['nombre']}",
        "",
        "Файл собирается сам из `contenido.json` → `fotos` (не править руками).",
        "",
        "**Как заменить заглушки:** сгенерировать фото по запросу ниже → сохранить в `fotos\\` с именем из таблицы "
        "(расширение любое: `hero.png`, `hero.jpg` или `hero.webp` — сборка сама сделает WebP и копию 640 px для телефона) "
        "→ `python build.py`. Фото настоящего клиента — только после `fotos.py` (WebP до 200 КБ).",
        "",
        "| # | Файл | Где на сайте | Формат ChatGPT | На сайте |",
        "|---|---|---|---|---|",
    ]
    for i, (slot, info) in enumerate((k, v) for k, v in f.items() if not k.startswith("_")):
        lines.append(f"| {i + 1} | `{info['archivo']}` | {info['donde']} | {info['ancho']}×{info['alto']} | "
                     f"{'есть' if info['archivo'] in PHOTO_READY else 'заглушка'} |")
    lines += ["", "## Общие правила для всех запросов", "", f.get("_reglas", ""), "", "## Запросы (на английском, копировать целиком)", ""]
    for i, (slot, info) in enumerate((k, v) for k, v in f.items() if not k.startswith("_")):
        lines += [f"### {i + 1}. `{info['archivo']}` — {info['donde']}", "", "```", info["prompt"], "```", ""]
        if info.get("nota"):
            lines += [info["nota"], ""]
    (ROOT / "FOTOS.md").write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, SyntaxError, KeyError) as e:
        print(f"ОШИБКА: {e}", file=sys.stderr)
        sys.exit(1)

r"""
Главная oskalstudio.com: блоки «Trabajos» (proyectos.json) и «Opiniones» (opiniones.json).

  python portada.py               вставляет готовый HTML в index.html и переводы в script.js (между метками
                                  <portada…>), из скриншотов capturas\<captura>.png делает
                                  images\<captura>-480.webp, <captura>.webp (720), <captura>-1080.webp
  python portada.py --captura ID  сначала снимает скриншот сайта проекта ID (Edge без окна, нужен Node),
                                  потом всё то же
  python portada.py --comprobar   только проверяет файлы, ничего не пишет

Python из oskal-hq\.venv (нужен Pillow для картинок). Как добавить проект или отзыв —
КАК_ДОБАВИТЬ_ПРОЕКТ.md в oskal-hq.
"""
import argparse
import html
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parents[1]
INDEX, SCRIPT, IMAGES = RAIZ / "index.html", RAIZ / "script.js", RAIZ / "images"
CAPTURAS = AQUI / "capturas"
LANGS = ["es", "ca", "en", "ru"]
EXT = ' target="_blank" rel="noopener"'

# Подзаголовок блока Trabajos — сам по числу проектов
SUB = {
    "es": ({1: "Un proyecto real", 2: "Dos proyectos reales"}, {1: "un diseño de ejemplo", 2: "dos diseños de ejemplo"},
           "{r} y {e}. Ábrelos: funcionan como una web de verdad."),
    "ca": ({1: "Un projecte real", 2: "Dos projectes reals"}, {1: "un disseny d'exemple", 2: "dos dissenys d'exemple"},
           "{r} i {e}. Obre'ls: funcionen com una web de veritat."),
    "en": ({1: "One real project", 2: "Two real projects"}, {1: "one sample design", 2: "two sample designs"},
           "{r} and {e}. Open them — they work just like a real website."),
    "ru": ({1: "Один реальный проект", 2: "Два реальных проекта"}, {1: "один пример дизайна", 2: "два примера дизайна"},
           "{r} и {e}. Открой их — они работают как настоящие сайты."),
}
STARS = {"es": "{n} de 5 estrellas", "ca": "{n} de 5 estrelles", "en": "{n} out of 5 stars", "ru": "{n} из 5 звёзд"}
UI = {  # тексты интерфейса — уже есть в script.js (только ключи)
    "real": ("work_real", "Proyecto real"), "reales": ("work_reals", "Proyectos reales"),
    "demos": ("work_demos", "Diseños de ejemplo"), "web": ("w_cta_web", "Ver web"), "demo": ("w_cta_demo", "Ver demo"),
    "google": ("op_google", "Ver en Google"), "todas": ("op_all", "Ver todas en Google"),
    "prev": ("op_prev", "Opinión anterior"), "next": ("op_next", "Opinión siguiente"), "lista": ("op_list", "Opiniones de clientes"),
}
GOOGLE_SVG = ('<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>'
              '<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>'
              '<path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z"/>'
              '<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>')
ERRORES: list = []


def esc(s):
    return html.escape(str(s), quote=True)


def clave(pid):
    return re.sub(r"[^a-z0-9]", "_", pid.lower())


def error(msg):
    ERRORES.append(msg)


# ---------------------------------------------------------------- проверка

def comprobar(proy, opin):
    reales, ejemplos = proy.get("reales", []), proy.get("ejemplos", [])
    if not 1 <= len(reales) <= 2:
        error(f"reales: нужно 1 или 2 проекта, сейчас {len(reales)}")
    if not 1 <= len(ejemplos) <= 2:
        error(f"ejemplos: нужно 1 или 2 демо, сейчас {len(ejemplos)}")
    ids = set()
    for grupo, lista in (("reales", reales), ("ejemplos", ejemplos)):
        for p in lista:
            pid = p.get("id", "")
            if not re.fullmatch(r"[a-z0-9-]+", pid):
                error(f"{grupo}: id «{pid}» — только латиница, цифры и дефис")
            if pid in ids:
                error(f"{grupo}: id «{pid}» повторяется")
            ids.add(pid)
            for campo in ("nombre", "url", "dominio", "captura"):
                if not p.get(campo):
                    error(f"{pid}: нет поля «{campo}»")
            textos = ["nicho", "alt"] + (["plan"] if grupo == "ejemplos" else [])
            for campo in textos:
                for l in LANGS:
                    if not (p.get(campo) or {}).get(l):
                        error(f"{pid}: нет «{campo}» на языке {l}")
            if grupo == "reales" and p.get("plan"):
                error(f"{pid}: у реальных проектов тариф и цену не показываем — убери «plan»")
    for n, o in enumerate(opin.get("opiniones", []), 1):
        for campo in ("texto", "idioma", "autor", "estrellas"):
            if not o.get(campo):
                error(f"отзыв {n}: нет поля «{campo}»")
        if not 1 <= int(o.get("estrellas") or 0) <= 5:
            error(f"отзыв {n}: estrellas — от 1 до 5")
    if not opin.get("opiniones"):
        error("opiniones.json: нет ни одного отзыва")
    if not opin.get("google"):
        error("opiniones.json: нет ссылки google")


# ---------------------------------------------------------------- картинки

def captura(p):
    """Скриншот сайта проекта: Edge без окна, окно 1440×900, верх страницы 1440×6000 → capturas\\<captura>.png"""
    url = p.get("captura_url") or p["url"]
    if not url.startswith("http"):
        sys.exit(f"{p['id']}: для скриншота нужна полная ссылка — поле captura_url")
    node = shutil.which("node")
    if not node:
        sys.exit("Нет Node.js — скриншот не снять. Положи PNG сам в capturas\\ (см. инструкцию).")
    CAPTURAS.mkdir(exist_ok=True)
    out = CAPTURAS / f"{p['captura']}.png"
    print(f"Скриншот {url} …")
    subprocess.run([node, str(AQUI / "captura.mjs"), url, str(out), p.get("captura_css", "")], check=True)


def quitar_vacios(im, minimo=400, deja=160):
    """Сжимает длинные однотонные полосы (≥ minimo px) до deja px. Для страниц, где на снимке
    «высота экрана» растягивается и под блоком остаётся пустота (captura_vacios в proyectos.json)."""
    from PIL import Image, ImageStat
    g = im.convert("L").resize((240, im.height))
    filas = [ImageStat.Stat(g.crop((0, y, 240, y + 1))) for y in range(im.height)]
    tramos, ini, media = [], None, 0
    for y in range(im.height + 1):
        ok = y < im.height and filas[y].stddev[0] < 5
        if ok and ini is not None and abs(filas[y].mean[0] - media) > 12:  # другой цвет — новая полоса
            if y - ini >= minimo:
                tramos.append((ini, y))
            ini = None
        if ok and ini is None:
            ini, media = y, filas[y].mean[0]
        if not ok and ini is not None:
            if y - ini >= minimo:
                tramos.append((ini, y))
            ini = None
    if not tramos:
        return im
    partes, pos = [], 0
    for a, b in tramos:
        partes.append(im.crop((0, pos, im.width, a + deja // 2)))
        pos = b - deja // 2
    partes.append(im.crop((0, pos, im.width, im.height)))
    out = Image.new("RGB", (im.width, sum(x.height for x in partes)))
    y = 0
    for x in partes:
        out.paste(x, (0, y)); y += x.height
    print(f"  пустые полосы сжаты: {', '.join(f'{b - a} px' for a, b in tramos)}")
    return out


def imagenes(proy, opin):
    """capturas\\<c>.png (новее готовых) → images\\<c>-480.webp, <c>.webp (720), <c>-1080.webp"""
    nombres = {p["captura"] for g in ("reales", "ejemplos") for p in proy[g]}
    vacios = {p["captura"] for g in ("reales", "ejemplos") for p in proy[g] if p.get("captura_vacios")}
    nombres |= {o["web"]["captura"] for o in opin.get("opiniones", []) if o.get("web")}
    for c in sorted(nombres):
        png = CAPTURAS / f"{c}.png"
        dest = IMAGES / f"{c}.webp"
        if png.exists() and (not dest.exists() or png.stat().st_mtime > dest.stat().st_mtime):
            try:
                from PIL import Image
            except ImportError:
                sys.exit("Нужен Pillow: запусти Python из oskal-hq\\.venv")
            with Image.open(png) as im:
                im = im.convert("RGB")
                if c in vacios:
                    im = quitar_vacios(im)
                h = min(im.height, round(im.width * 3000 / 720))  # верх страницы в пропорции 720 × 3000
                im = im.crop((0, 0, im.width, h))
                for w, suf, q in ((1080, "-1080", 76), (720, "", 80), (480, "-480", 80)):
                    if im.width >= w:
                        im.resize((w, round(h * w / im.width)), Image.LANCZOS).save(IMAGES / f"{c}{suf}.webp", "WEBP", quality=q, method=6)
            print(f"  картинки: {c} (480 / 720 / 1080)")
        for suf in ("", "-480"):
            if not (IMAGES / f"{c}{suf}.webp").exists():
                error(f"нет картинки images/{c}{suf}.webp — положи скриншот в capturas\\{c}.png или запусти --captura")


def medida(nombre):
    try:
        from PIL import Image
        with Image.open(IMAGES / nombre) as im:
            return im.size
    except Exception:
        return (720, 3000)


def img(c, alt, k, sizes):
    w, h = medida(f"{c}.webp")
    src = [f"images/{c}-480.webp 480w", f"images/{c}.webp 720w"]
    if (IMAGES / f"{c}-1080.webp").exists():
        src.append(f"images/{c}-1080.webp 1080w")
    return (f'<img src="images/{c}.webp" srcset="{", ".join(src)}" sizes="{sizes}" width="{w}" height="{h}" '
            f'loading="lazy" decoding="async" alt="{esc(alt)}" data-i18n-alt="pj_{k}_alt">')


# ---------------------------------------------------------------- HTML: Trabajos

def tarjeta(p, demo, sizes):
    k = clave(p["id"])
    ui = UI["demo"] if demo else UI["web"]
    plan = (f'\n        <p class="work-plan" data-i18n="pj_{k}_plan">{esc(p["plan"]["es"])}</p>') if demo else ""
    return f'''<article class="work">
    <a class="work-frame" href="{esc(p["url"])}"{EXT} style="--dur:10s">
        <div class="browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><span class="browser-url">{esc(p["dominio"])}</span></div>
        <div class="work-shot">{img(p["captura"], p["alt"]["es"], k, sizes)}</div>
    </a>
    <div class="work-info">
        <h4 class="work-name">{esc(p["nombre"])}</h4>
        <p class="work-niche" data-i18n="pj_{k}_nicho">{esc(p["nicho"]["es"])}</p>{plan}
        <a class="btn btn-md btn-outline-auto work-btn" href="{esc(p["url"])}"{EXT}><span data-i18n="{ui[0]}">{ui[1]}</span><svg width="16" height="16" aria-hidden="true"><use href="#i-out"/></svg></a>
    </div>
</article>'''


def sangria(texto, n):
    return "\n".join((" " * n + l) if l.strip() else l for l in texto.split("\n"))


ENLACE = '''<div class="work-link" aria-hidden="true">
    <svg viewBox="0 0 72 24" width="72" height="24" focusable="false"><line x1="0" y1="12" x2="72" y2="12"/><circle class="wl-n" cx="8" cy="12" r="2.6"/><circle class="wl-halo" cx="36" cy="12" r="8"/><circle class="wl-n wl-red" cx="36" cy="12" r="3.4"/><circle class="wl-n wl-n3" cx="64" cy="12" r="2.6"/></svg>
</div>'''


def html_trabajos(proy):
    reales, ejemplos = proy["reales"], proy["ejemplos"]
    uno = len(reales) == 1
    s_grande = "(max-width: 640px) calc(100vw - 80px), (max-width: 1100px) 700px, 360px"
    s_par = "(max-width: 640px) calc(100vw - 80px), (max-width: 1100px) 340px, 320px"
    titulo = UI["real"] if uno else UI["reales"]
    filas = []
    for grupo, lista, tit, gid, demo in (("real", reales, titulo, "wg-real", False), ("demo", ejemplos, UI["demos"], "wg-demo", True)):
        sizes = s_grande if (grupo == "real" and uno) else s_par
        cards = "\n".join(sangria(tarjeta(p, demo, sizes), 8) for p in lista)
        filas.append(f'''<div class="work-group work-group--{grupo} reveal" role="group" aria-labelledby="{gid}">
    <h3 class="work-group-title" id="{gid}" data-i18n="{tit[0]}">{tit[1]}</h3>
    <div class="work-row work-row--{len(lista)}">
{cards}
    </div>
</div>''')
    cuerpo = filas[0] + "\n" + ENLACE + "\n" + filas[1]
    return f'<div class="work-layout work-layout--r{len(reales)}">\n{sangria(cuerpo, 4)}\n</div>'


# ---------------------------------------------------------------- HTML: Opiniones

def iniciales(nombre):
    partes = [x for x in re.split(r"\s+", nombre.strip()) if x]
    return "".join(x[0] for x in partes[:2]).upper()


def estrellas(o):
    n = int(o["estrellas"])
    return f'<p class="review-stars" role="img" aria-label="{esc(STARS["es"].format(n=n))}" data-i18n-label="op_stars_{n}">{"★" * n}{"☆" * (5 - n)}</p>'


def autor(o):
    emp = f'\n        <span>{esc(o["empresa"])}</span>' if o.get("empresa") else ""
    return f'''<figcaption class="review-author">
    <span class="review-avatar" aria-hidden="true">{esc(iniciales(o["autor"]))}</span>
    <span class="review-meta">
        <strong>{esc(o["autor"])}</strong>{emp}
    </span>
</figcaption>'''


def boton_google(url, ui):
    return (f'<a class="review-google" href="{esc(url)}"{EXT}>\n    {GOOGLE_SVG}\n    <span data-i18n="{ui[0]}">{ui[1]}</span>\n'
            f'    <svg width="14" height="14" aria-hidden="true"><use href="#i-out"/></svg>\n</a>')


def html_opiniones(opin):
    ops, google = opin["opiniones"], opin["google"]
    if len(ops) == 1:
        o = ops[0]
        web = ""
        if o.get("web"):
            w = o["web"]
            ww, hh = medida(f'{w["captura"]}-480.webp')
            web = f'''
<a class="review-site" href="{esc(w["url"])}"{EXT} aria-label="{esc((o.get("empresa") or o["autor"]) + " — " + w["dominio"])}">
    <div class="browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><span class="browser-url">{esc(w["dominio"])}</span></div>
    <div class="review-shot"><img src="images/{w["captura"]}-480.webp" width="{ww}" height="{hh}" loading="lazy" decoding="async" alt=""></div>
</a>'''
        cuerpo = f'''<div class="review-body">
{sangria(estrellas(o), 4)}
    <blockquote class="review-quote" lang="{esc(o["idioma"])}"><p>{esc(o["texto"])}</p></blockquote>
{sangria(autor(o), 4)}
{sangria(boton_google(o.get("enlace") or google, UI["google"]), 4)}
</div>{web}'''
        return f'<figure class="review reveal{"" if web else " review--solo"}">\n{sangria(cuerpo, 4)}\n</figure>'

    def card(o):
        return f'''<figure class="review-card">
{sangria(estrellas(o), 4)}
    <blockquote class="review-card-quote" lang="{esc(o["idioma"])}"><p>{esc(o["texto"])}</p></blockquote>
{sangria(autor(o), 4)}
</figure>'''

    if len(ops) <= 3:
        cards = "\n".join(sangria(card(o), 4) for o in ops)
        return (f'<div class="reviews-grid reviews-grid--{len(ops)} reveal">\n{cards}\n</div>\n'
                f'<p class="reviews-more">\n{sangria(boton_google(google, UI["google"]), 4)}\n</p>')
    cards = "\n".join(sangria(card(o), 8) for o in ops)
    puntos = "".join(f'<button class="rc-dot" type="button" aria-label="{i}/{len(ops)}"></button>' for i in range(1, len(ops) + 1))
    return f'''<div class="reviews-carousel reveal" data-carousel>
    <div class="rc-track" tabindex="0" role="region" aria-label="{UI["lista"][1]}" data-i18n-label="{UI["lista"][0]}">
{cards}
    </div>
    <div class="rc-nav">
        <button class="rc-btn rc-prev" type="button" aria-label="{UI["prev"][1]}" data-i18n-label="{UI["prev"][0]}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
        <div class="rc-dots">{puntos}</div>
        <button class="rc-btn rc-next" type="button" aria-label="{UI["next"][1]}" data-i18n-label="{UI["next"][0]}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>
</div>
<p class="reviews-more">
{sangria(boton_google(google, UI["todas"]), 4)}
</p>'''


# ---------------------------------------------------------------- переводы

def textos(proy, opin):
    """{lang: [(ключ, текст)]} — то, что пишется между /* <portada> */ и /* </portada> */ в script.js"""
    out = {}
    nr, ne = len(proy["reales"]), len(proy["ejemplos"])
    for l in LANGS:
        r, e, plantilla = SUB[l]
        filas = [("work_sub", plantilla.format(r=r.get(nr, ""), e=e.get(ne, "")))]
        for p in proy["reales"] + proy["ejemplos"]:
            k = clave(p["id"])
            filas.append((f"pj_{k}_nicho", p["nicho"][l]))
            if p.get("plan"):
                filas.append((f"pj_{k}_plan", p["plan"][l]))
            filas.append((f"pj_{k}_alt", p["alt"][l]))
        for n in sorted({int(o["estrellas"]) for o in opin["opiniones"]}):
            filas.append((f"op_stars_{n}", STARS[l].format(n=n)))
        out[l] = filas
    return out


# ---------------------------------------------------------------- запись

def entre(texto, ini, fin, nuevo, donde):
    i, j = texto.find(ini), texto.find(fin)
    if i < 0 or j < 0 or j < i:
        sys.exit(f"Не нашёл метки {ini} … {fin} в {donde} — их убрали? Верни их (см. README.md здесь).")
    return texto[:i + len(ini)] + nuevo + texto[j:]


def escribir(proy, opin):
    t = INDEX.read_text(encoding="utf-8")
    t = entre(t, "<!-- <portada:proyectos> -->", "<!-- </portada:proyectos> -->", "\n" + sangria(html_trabajos(proy), 4) + "\n    ", "index.html")
    t = entre(t, "<!-- <portada:opiniones> -->", "<!-- </portada:opiniones> -->", "\n" + sangria(html_opiniones(opin), 4) + "\n    ", "index.html")
    sub = textos(proy, opin)["es"][0][1]
    t, n = re.subn(r'(<p class="section-sub" data-i18n="work_sub">)[^<]*(</p>)', lambda m: m.group(1) + esc(sub) + m.group(2), t)
    if n != 1:
        error("index.html: не нашёл подзаголовок data-i18n=\"work_sub\"")
    INDEX.write_text(t, encoding="utf-8")

    s = SCRIPT.read_text(encoding="utf-8")
    ini, fin = "/* <portada> — lo escribe .fuente/portada/portada.py; no editar a mano */", "/* </portada> */"
    for l, filas in textos(proy, opin).items():
        bloque = s.find(f"\n  {l}: {{")
        if bloque < 0:
            sys.exit(f"script.js: нет словаря языка {l}")
        i = s.find(ini, bloque)
        j = s.find(fin, bloque)
        if i < 0 or j < 0:
            sys.exit(f"script.js: нет меток <portada> в словаре {l}")
        lineas = "".join(f"\n    {k}:{json.dumps(v, ensure_ascii=False)}," for k, v in filas)
        s = s[:i + len(ini)] + lineas + "\n    " + s[j:]
    SCRIPT.write_text(s, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description="Trabajos y Opiniones de la portada desde proyectos.json y opiniones.json")
    ap.add_argument("--captura", metavar="ID", help="снять скриншот проекта ID (Edge без окна)")
    ap.add_argument("--comprobar", action="store_true", help="только проверить, ничего не писать")
    a = ap.parse_args()
    proy = json.loads((AQUI / "proyectos.json").read_text(encoding="utf-8"))
    opin = json.loads((AQUI / "opiniones.json").read_text(encoding="utf-8"))
    comprobar(proy, opin)
    if ERRORES:
        sys.exit("Ошибки в файлах:\n  - " + "\n  - ".join(ERRORES))
    if a.captura:
        p = next((p for g in ("reales", "ejemplos") for p in proy[g] if p["id"] == a.captura), None)
        if not p:
            sys.exit(f"Нет проекта с id «{a.captura}»")
        captura(p)
    if not a.comprobar:
        imagenes(proy, opin)
    if ERRORES:
        sys.exit("Ошибки:\n  - " + "\n  - ".join(ERRORES))
    if a.comprobar:
        print("Файлы в порядке.")
        return
    escribir(proy, opin)
    if ERRORES:
        sys.exit("Ошибки:\n  - " + "\n  - ".join(ERRORES))
    print(f"Готово: реальных {len(proy['reales'])}, демо {len(proy['ejemplos'])}, отзывов {len(opin['opiniones'])} "
          f"→ index.html и script.js обновлены.")


if __name__ == "__main__":
    main()

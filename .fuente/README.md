# Исходники сайта студии: демо и главная

С 09.10.2026 всё в `main` — это живой сайт oskalstudio.com (автодеплой: каждый push в `main` = деплой Netlify).
Папка на компьютере: `C:\Users\User\Desktop\Sitios\Sitio Oskal studio`. Точка отката до слияния — тег `pre-ejemplos`.

| Что | Исходники (здесь) | Готовое (публикуется) | Адрес |
|---|---|---|---|
| Салон красоты «Nácar» | `.fuente/nacar/` | `ejemplos/nacar/` | https://oskalstudio.com/ejemplos/nacar/ |
| Траттория «Da Livia» | `.fuente/trattoria/` | `ejemplos/trattoria/` | https://oskalstudio.com/ejemplos/trattoria/ |
| Главная: Trabajos и Opiniones | `.fuente/portada/` | `index.html`, `script.js`, `images/` | https://oskalstudio.com/ |

- Папка `.fuente` начинается с точки — Netlify её не публикует.
- Демо: всё содержимое — в `contenido.json`; после правки `python build.py` в папке демо (Python из `oskal-hq\.venv`).
  Шаблоны ниш для клиентов сделаны из этих демо: `oskal-hq\plantillas\web\belleza\` и `hosteleria\`.
- Главная: проекты и отзывы — `.fuente/portada/proyectos.json` и `opiniones.json` → `python .fuente/portada/portada.py`
  (см. `.fuente/portada/README.md` и `КАК_ДОБАВИТЬ_ПРОЕКТ.md` в oskal-hq). Руками внутри меток `<portada…>` не править.
- Как править: локально (сервер «ejemplos» из `oskal-hq\.claude\launch.json` → http://localhost:8781/), проверить,
  и только по команде Ильи — коммит и push в `main` (один push = один деплой, тратит кредиты Netlify).
- На всех страницах демо — `noindex`.

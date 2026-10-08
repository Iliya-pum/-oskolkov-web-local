# Исходники демо-сайтов (ветка `ejemplos`)

Демо для портфолио Oskal Studio живут в ветке `ejemplos` репозитория сайта студии:

| Демо | Исходники (здесь) | Готовый сайт (публикуется) | Предпросмотр ветки |
|---|---|---|---|
| Салон красоты «Nácar» | `.fuente/nacar/` | `ejemplos/nacar/` | https://ejemplos--luxury-twilight-e94f76.netlify.app/ejemplos/nacar/ |
| Траттория | `.fuente/trattoria/` | `ejemplos/trattoria/` | https://ejemplos--luxury-twilight-e94f76.netlify.app/ejemplos/trattoria/ |

- Папка `.fuente` начинается с точки — Netlify её не публикует; публикуется только собранное в `ejemplos/`.
- Всё содержимое демо — в `contenido.json`; после правки: `python build.py` в папке демо (Python из `oskal-hq\.venv`).
- **Главная** (`index.html` в корне) правится в этой ветке. Блоки «Trabajos» и «Opiniones» — из файлов данных
  `.fuente/portada/proyectos.json` и `opiniones.json`: поправил → `python .fuente/portada/portada.py`
  (см. `.fuente/portada/README.md` и `КАК_ДОБАВИТЬ_ПРОЕКТ.md` в oskal-hq). Руками внутри меток `<portada…>` не править.
- В `main` — только по прямой команде Ильи (это живой сайт oskalstudio.com с автодеплоем).
- На всех страницах демо — `noindex`.
- Рабочая папка ветки на компьютере: `C:\Users\User\Desktop\Sitios\oskal-studio-ejemplos` (git worktree; основная папка `Sitio Oskal studio` остаётся на `main`).

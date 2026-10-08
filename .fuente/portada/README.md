# Главная: проекты и отзывы из файлов данных

| Файл | Что это |
|---|---|
| `proyectos.json` | блок «Trabajos»: `reales` (1–2 настоящих сайта, без цены) и `ejemplos` (1–2 демо, с тарифом) |
| `opiniones.json` | блок «Opiniones»: настоящие отзывы как есть + ссылка на Google |
| `portada.py` | сборка: вставляет HTML в `index.html` и переводы в `script.js` (между метками `<portada…>`), делает картинки |
| `captura.mjs` | скриншот сайта по ссылке (Edge / Chrome без окна; запускает `portada.py --captura ID`) |
| `capturas/` | PNG-скриншоты — исходники картинок (в git не идут) |

```
python portada.py                 собрать (Python из oskal-hq\.venv)
python portada.py --captura ID    снять скриншот проекта ID и собрать
python portada.py --comprobar     только проверить файлы
```

Скриншот: `captura_css` — стили только для снимка (прилипающие блоки), `captura_vacios: true` — сжать пустые полосы.

Раскладка сама: 1 реальный проект — одна крупная карточка («Proyecto real»), 2 — две рядом («Proyectos reales»);
отзывы: 1 — большая карточка, 2–3 — в ряд, 4 и больше — карусель + «Ver todas en Google».
Пошагово для Ильи — `КАК_ДОБАВИТЬ_ПРОЕКТ.md` в oskal-hq.

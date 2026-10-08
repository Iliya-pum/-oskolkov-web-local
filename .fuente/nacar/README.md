# Демо «Nácar» — салон красоты (портфолио Oskal Studio)

Вымышленный салон в Жироне, стиль «нежный люкс»: крем, пудровый розовый, тёмное какао, золото, перламутр;
Cormorant Garamond + Jost. Языки es / ca / en. **Будущий шаблон ниши Belleza** — после утверждения Ильёй
переезжает в `oskal-hq\plantillas\web\belleza\`.

Ветка `ejemplos` репозитория сайта студии. Исходники — здесь (`.fuente/nacar/`, не публикуются),
готовый сайт — `ejemplos/nacar/`. Предпросмотр ветки:
**https://ejemplos--luxury-twilight-e94f76.netlify.app/ejemplos/nacar/**
(пуш ветки — по команде Ильи; в `main` — только по прямой команде, это живой oskalstudio.com).

## Что где

| Файл | Что это |
|---|---|
| `contenido.json` | **всё содержимое**: тексты es / ca / en, цвета, шрифты, контакты, часы, прайс, цифры, преимущества, бренды, команда, отзывы, FAQ, места под фото и запросы для ChatGPT, какие блоки включены |
| `plantilla\` | разметка: `index.html`, `legal.html`, общие куски `_head`, `_nav`, `_pie`, `_logo`, `_sprite` (значки и тонкие рисунки), `style.css` (только `var(--…)`), `script.js`; `assets\` — шрифты (OFL), favicon, `og.jpg`, зерно `grano.webp` |
| `fotos\` | настоящие фото — имена из `FOTOS.md` (`hero.png` / `.jpg` / `.webp`); нет фото — заглушка: градиент в цветах салона + узор + зерно |
| `build.py` | сборка: `contenido.json` + `plantilla\` + `fotos\` → `sitio.salida` (здесь `../../ejemplos/nacar`) |
| `imagenes.py` | favicon, `og.jpg` и зерно — из цветов, названия и слогана (Pillow) |
| `FOTOS.md` | 16 мест под фото и запросы для ChatGPT; собирается сам из `contenido.json` |

## Как поменять что-то

1. Поправить `contenido.json` (тексты — сразу на всех языках; цвета — `tema.colores`; блок не нужен — `secciones`).
2. `C:\Users\User\Desktop\oskal-hq\.venv\Scripts\python.exe build.py` — пересобирает все страницы в `ejemplos/nacar/`.
   Поменялись цвета, название или слоган — сначала `imagenes.py`.
3. Посмотреть: локальный сервер «ejemplos» (`oskal-hq\.claude\launch.json`) → `/ejemplos/nacar/`.
4. Коммит в ветку `ejemplos`.

## Что умеет

- **Первый экран на всю ширину:** фото (или перламутровая заглушка) с медленным зумом, двойная золотая рамка, нить жемчуга и ветка с параллаксом, вращающийся знак, заголовок по словам, живая плашка «открыто / закрыто» (время Мадрида).
- **Блоки:** бегущая строка услуг; цифры со счётом (помечены «ejemplo»); услуги (карточки приподнимаются, рамка, «desde» — самая дешёвая полноценная услуга, доплаты `suplemento` не считаются); «Por qué Nácar»; прайс по вкладкам с «Reservar» у строк; **большое «до / после»** на тёмном фоне (палец, мышь, клавиатура); галерея с увеличением; бренды (вымышленные); команда; отзывы-лента со звёздами и оценкой (помечены); «Tarjeta regalo» (выбор суммы, 3D-наклон); лента Instagram (6 фото); запись → WhatsApp (имя и телефон обязательные); FAQ; часы, карта OSM (по прокрутке, без cookies), контакты; `legal.html`.
- **Анимации:** заголовки по словам, фото раскрываются маской, параллакс декора, счёт цифр; `prefers-reduced-motion` выключает всё.
- **Демо-режим** (`sitio.demo: true`): плашка «Diseño de ejemplo — negocio ficticio», пометки «ejemplo»; номер и Instagram вымышленные — кнопки показывают окно-пример. У клиента: `demo: false`, свой номер и ссылка Instagram.
- **Скорость:** класс появления ставится в `<head>` до отрисовки; дальние секции — `content-visibility: auto`; свои шрифты.
- **SEO:** title, description, canonical, hreflang, Open Graph с `og.jpg`, JSON-LD `BeautySalon`; в демо — `noindex`.

## Замер скорости (07.10.2026, Lighthouse 13.5, локально, сжатие как на Netlify)

Телефон: Performance 94–97, Accessibility 100. Компьютер: 100 / 100.
Best Practices 81 и SEO 66 — только локальный `http` и `noindex` демо.

## Сайт клиента из этого демо (когда станет шаблоном)

Скопировать `contenido.json`, `plantilla\`, `build.py`, `imagenes.py` → заполнить `contenido.json` из `INFORME.md` и
`2_PREPARADO\` (тексты, контакты, данные legal, `demo: false`, номер WhatsApp, адрес сайта, `en_raiz: true`) →
фото из `2_PREPARADO\web-fotos\` в `fotos\` → `imagenes.py` → `build.py --salida <3_WEB клиента>`.
Подробная инструкция (`COMO_USAR.md`) — при переносе в `plantillas\web\belleza\`.

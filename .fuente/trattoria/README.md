# Демо «Da Livia» — траттория (портфолио Oskal Studio)

Вымышленная итальянская траттория в Барри Велл (Жирона), стиль «тёплый вечер в траттории»: крем, тёмная олива,
терракота, винный акцент; Fraunces + DM Sans. Языки es / ca / en / it — меняется всё, включая меню (названия блюд
остаются итальянскими, описания переведены). **Будущий шаблон ниши Hostelería** — после утверждения Ильёй
переезжает в `oskal-hq\plantillas\web\hosteleria\`.

Ветка `ejemplos` репозитория сайта студии. Исходники — здесь (`.fuente/trattoria/`, не публикуются),
готовый сайт — `ejemplos/trattoria/`. Предпросмотр ветки:
**https://ejemplos--luxury-twilight-e94f76.netlify.app/ejemplos/trattoria/**
(в `main` — только по прямой команде Ильи, это живой oskalstudio.com).

## Что где

| Файл | Что это |
|---|---|
| `contenido.json` | **всё содержимое**: тексты на 4 языках, цвета, шрифты, контакты, часы, меню по разделам (Antipasti / Pizze / Pasta / Dolci / Vini), фирменные блюда, история («La casa»), цифры, отзывы, места под фото и запросы для ChatGPT, место под ролик в шапке, какие блоки включены |
| `plantilla\` | разметка: `index.html`, `legal.html`, куски `_head`, `_nav`, `_pie` (с плашкой Oskal Studio), `_logo`, `_sprite` (значки и рисунки линией для заглушек), `style.css` (только `var(--…)`), `script.js`; `assets\` — шрифты (OFL), `lib\` — GSAP 3.13 + ScrollTrigger + Lenis 1.3 (свои копии), favicon, `og.jpg`, зерно |
| `fotos\` | настоящие фото — имена из `FOTOS.md`; нет фото — заглушка (градиент + узор + рисунок + зерно). `hero.mp4` — ролик в шапку (необязательно) |
| `build.py` | сборка: `contenido.json` + `plantilla\` + `fotos\` → `sitio.salida` (здесь `../../ejemplos/trattoria`) |
| `imagenes.py` | favicon, иконки, `og.jpg` и зерно — из цветов, названия и слогана (Pillow) |
| `FOTOS.md` | 11 мест под фото и запросы для ChatGPT; собирается сам из `contenido.json` |

## Как поменять что-то

1. Поправить `contenido.json` (тексты — сразу на всех языках; блюдо — строка в `carta`; цвета — `tema.colores`; блок не нужен — `secciones`).
2. `C:\Users\User\Desktop\oskal-hq\.venv\Scripts\python.exe build.py` — пересобирает все 8 страниц.
   Поменялись цвета, название или слоган — сначала `imagenes.py`.
3. Посмотреть: локальный сервер «ejemplos» (`oskal-hq\.claude\launch.json`) → `/ejemplos/trattoria/`.
4. Коммит в ветку `ejemplos`.

## Что умеет

- **Шапка:** фото (или тёплая «вечерняя» заглушка) на весь экран, заголовок собирается по буквам, живая плашка «Abierto ahora / Cerrado» (время Мадрида, учитывает обед и ужин), место под ролик (`video_portada`).
- **Блоки:** бегущая строка; **лента фирменных блюд, которую двигает вертикальная прокрутка** (секция закрепляется, счётчик 01/06, кнопка «Reservar y probarlo»); **«La casa»** — фото закреплено и меняется по главам (3 главы); цифры со счётом; **меню по вкладкам** с плавной сменой (блюда въезжают по одному, значки «вегетарианское» / «острое», вино — бокал / бутылка); отзывы со звёздами (помечены «de ejemplo»); бронь стола → WhatsApp (имя и телефон обязательные, день, час обеда/ужина, число гостей, комментарий про аллергии); часы, «Cómo llegar» (пешком / на машине / на поезде), карта OSM.
- **Движение:** GSAP + ScrollTrigger + Lenis (плавная прокрутка колесом; на телефоне — родная прокрутка пальцем, 60 fps); маски, параллакс, лёгкий 3D-наклон карточек мышью. Библиотеки грузятся **при первом жесте или когда страница уже спокойна** — первый экран от них не зависит. `prefers-reduced-motion` — библиотеки не грузятся вообще, лента листается пальцем.
- **Демо-режим** (`sitio.demo: true`): плашка «Diseño de ejemplo — negocio ficticio», окно-пример вместо WhatsApp и звонка, внизу плашка Oskal Studio «desde 600 €» (по `smeta.py`).
- **SEO:** title, description, canonical, hreflang (4 языка), Open Graph с `og.jpg`, JSON-LD `Restaurant` (кухня, брони); в демо — `noindex`.

## Замер скорости (07.10.2026, Lighthouse 13.5, локально, сжатие как на Netlify)

Телефон: Performance 93–95, Accessibility 100. Компьютер: 100 / 100.
Best Practices 81 и SEO 66 — только локальный `http` и `noindex` демо.

## Сайт клиента из этого демо (когда станет шаблоном)

Скопировать `contenido.json`, `plantilla\`, `build.py`, `imagenes.py` → заполнить `contenido.json` из `INFORME.md` и
`2_PREPARADO\` (меню, тексты, контакты, данные legal, `demo: false`, номер WhatsApp, адрес сайта, `en_raiz: true`) →
фото из `2_PREPARADO\web-fotos\` в `fotos\` → `imagenes.py` → `build.py --salida <3_WEB клиента>`.

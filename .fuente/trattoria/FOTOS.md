# Фото — Da Livia

Файл собирается сам из `contenido.json` → `fotos` (не править руками).

**Как заменить заглушки:** сгенерировать фото по запросу ниже → сохранить в `fotos\` с именем из таблицы (расширение любое: `hero.png`, `hero.jpg` или `hero.webp` — сборка сама сделает WebP и копию 640 px для телефона) → `python build.py`. Фото настоящего клиента — только после `fotos.py` (WebP до 200 КБ).

| # | Файл | Где на сайте | Формат ChatGPT | На сайте |
|---|---|---|---|---|
| 1 | `hero.webp` | Первый экран на всю ширину (лёгкий параллакс); слева поверх — текст. Место под ролик — video_portada | 1536×1024 | есть |
| 2 | `plato-1.webp` | Лента «Platos de la casa» — Tagliatelle al ragù | 1024×1536 | есть |
| 3 | `plato-2.webp` | Лента «Platos de la casa» — Pizza tartufata | 1024×1536 | есть |
| 4 | `plato-3.webp` | Лента «Platos de la casa» — Burrata pugliese | 1024×1536 | есть |
| 5 | `plato-4.webp` | Лента «Platos de la casa» — Cacio e pepe | 1024×1536 | есть |
| 6 | `plato-5.webp` | Лента «Platos de la casa» — Pappardelle al cinghiale | 1024×1536 | есть |
| 7 | `plato-6.webp` | Лента «Platos de la casa» — Tiramisù della nonna | 1024×1536 | есть |
| 8 | `casa-1.webp` | «La casa» — глава 1: тетрадь рецептов нонны | 1024×1536 | есть |
| 9 | `casa-2.webp` | «La casa» — глава 2: свежая паста по утрам | 1024×1536 | есть |
| 10 | `casa-3.webp` | «La casa» — глава 3: дровяная печь | 1024×1536 | есть |
| 11 | `reserva.webp` | Фон блока «Reservar mesa» (тёмный, поверх — форма) | 1536×1024 | заглушка |

## Общие правила для всех запросов

- Делать **в одном чате ChatGPT, по порядку** — так свет и цвет будут одинаковыми (тёплый вечер, крем, тёмная олива, терракота, вино).
- Каждый запрос — целиком, он самодостаточный (стиль уже внутри).
- Получилось «пластиково» или слишком глянцево — ответить: `Make it look like a real camera photo: natural textures, softer and less contrasty light, lower saturation, no glossy finish, keep everything else.`
- Еда: без лишнего блеска, порция как в ресторане, без надписей на тарелках и бутылках; руки — 5 пальцев, лица — не видны.
- Скачать PNG, назвать как в таблице (`hero.png` можно — сборка сама сделает WebP), положить в `fotos\`, запустить `python build.py`.
- Ролик в шапку (необязательно): `hero.mp4` в `fotos\` — см. `video_portada` в contenido.json.
- Для сайта настоящего клиента — только его фото (после `fotos.py`), эти — только для демо.

## Запросы (на английском, копировать целиком)

### 1. `hero.webp` — Первый экран на всю ширину (лёгкий параллакс); слева поверх — текст. Место под ролик — video_portada

```
Photorealistic wide interior photo of a cosy Italian trattoria in an old stone building in Girona, Spain, at dusk. On the right half: an exposed warm stone wall, three small wooden tables with cream linen napkins, short candles in glass holders, a carafe of red wine and two glasses, a dark olive-green painted wall with wooden shelves of wine bottles (no readable labels), warm low pendant lights. The left half: calmer, darker stone and soft shadow — empty space for text. Warm evening light, golden candle glow, deep shadows, no people. Eye-level, straight-on composition. Colours: cream, dark olive green, terracotta, deep wine red, warm gold. Real materials and textures (stone, linen, old wood, glass), true-to-life colours, subtle film grain, like a food-magazine interior photo on a full-frame camera with a 35 mm lens. Not a 3D render, no glossy CGI look, no text, no logos, no watermark. Horizontal 3:2, 1536×1024. File name: hero.webp
```

### 2. `plato-1.webp` — Лента «Platos de la casa» — Tagliatelle al ragù

```
Photorealistic food photo: a plate of fresh egg tagliatelle with rich Bolognese ragù and freshly grated parmigiano, in a cream ceramic plate with a thin terracotta rim, on a rustic dark wooden table with a crumpled cream linen napkin and a fork. Warm evening side light from the left, deep olive-green background softly out of focus, a glass of red wine partly visible at the edge. 45-degree angle, 50 mm lens look, shallow depth of field, natural textures (pasta ribbons, sauce, cheese), restaurant-size portion, true-to-life colours, subtle film grain. Not glossy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: plato-1.webp
```

### 3. `plato-2.webp` — Лента «Platos de la casa» — Pizza tartufata

```
Photorealistic food photo: a Neapolitan-style pizza with black truffle cream, melted fior di latte and sliced mushrooms, puffy leopard-spotted crust with real char marks, served on a round wooden board on a rustic table. Warm evening light, soft glow of a wood-fired oven out of focus in the dark olive background. Seen from a high 60-degree angle, 50 mm lens look, shallow depth of field, natural textures, true-to-life colours, subtle film grain. Not glossy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: plato-2.webp
```

### 4. `plato-3.webp` — Лента «Platos de la casa» — Burrata pugliese

```
Photorealistic food photo: a whole creamy burrata just cut open, surrounded by colourful seasonal tomatoes (red, yellow, dark), fresh basil leaves, flaky salt and a drizzle of green olive oil, on a cream ceramic plate on a rustic wooden table with a cream linen napkin. Warm evening side light, dark olive-green background out of focus. 45-degree angle, 50 mm lens look, shallow depth of field, natural textures, true-to-life colours, subtle film grain. Not glossy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: plato-3.webp
```

### 5. `plato-4.webp` — Лента «Platos de la casa» — Cacio e pepe

```
Photorealistic food photo: a twisted nest of tonnarelli cacio e pepe, glossy creamy pecorino sauce and plenty of coarse black pepper, in a shallow cream ceramic bowl on a rustic wooden table, a small block of pecorino and a pepper mill softly out of focus. Warm evening side light, dark olive-green background. 45-degree angle, 50 mm lens look, shallow depth of field, natural textures, true-to-life colours, subtle film grain. Not greasy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: plato-4.webp
```

### 6. `plato-5.webp` — Лента «Platos de la casa» — Pappardelle al cinghiale

```
Photorealistic food photo: wide fresh pappardelle ribbons with a dark, rustic wild boar ragù cooked in red wine, a sprig of rosemary, in a cream ceramic plate with a terracotta rim on a dark wooden table, a glass of deep red wine beside it. Warm evening light, dark wine-red and olive background out of focus. 45-degree angle, 50 mm lens look, shallow depth of field, natural textures, true-to-life colours, subtle film grain. Not glossy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: plato-5.webp
```

### 7. `plato-6.webp` — Лента «Platos de la casa» — Tiramisù della nonna

```
Photorealistic food photo: a generous square of homemade tiramisù showing clear layers of mascarpone cream and coffee-soaked savoiardi, dusted with cocoa, on a small cream plate with a dessert spoon, an espresso cup on a saucer behind it, on a rustic wooden table. Warm evening side light, terracotta and dark olive background out of focus. 45-degree angle, 50 mm lens look, shallow depth of field, natural textures, true-to-life colours, subtle film grain. Not glossy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: plato-6.webp
```

### 8. `casa-1.webp` — «La casa» — глава 1: тетрадь рецептов нонны

```
Photorealistic close-up: the hands of a woman in her fifties (face not visible) turning the pages of an old handwritten Italian recipe notebook with worn edges and a few flour marks, on a floured wooden kitchen table, a rolling pin and a small bowl of eggs nearby. The handwriting is illegible and blurred (no readable words). Warm soft window light, cream and terracotta tones, dark olive kitchen background out of focus. Real skin texture, exactly five fingers on each hand. 50 mm lens look, shallow depth of field, true-to-life colours, subtle film grain, quiet documentary style. Not glossy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: casa-1.webp
```

### 9. `casa-2.webp` — «La casa» — глава 2: свежая паста по утрам

```
Photorealistic close-up in a small restaurant kitchen in the morning: a cook’s hands (face not visible) cutting a rolled sheet of fresh yellow egg pasta into tagliatelle with a knife on a large floured wooden board, a few nests of finished tagliatelle on the side, a well of flour and eggs in the background. Soft morning window light, cream and warm yellow tones, dark olive background. Real skin and flour texture, exactly five fingers on each hand. 50 mm lens look, shallow depth of field, true-to-life colours, subtle film grain. Not glossy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: casa-2.webp
```

### 10. `casa-3.webp` — «La casa» — глава 3: дровяная печь

```
Photorealistic photo of a domed brick wood-fired pizza oven glowing inside with flames and embers on the left, a pizzaiolo’s hand and forearm (face not visible) sliding a pizza on a long metal peel into the oven. Warm firelight on the brick arch, dark surroundings, a stack of holm-oak logs at the bottom. Real textures (brick, ash, flour), slight motion of flames, true-to-life colours, subtle film grain, 35 mm lens look. Not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: casa-3.webp
```

### 11. `reserva.webp` — Фон блока «Reservar mesa» (тёмный, поверх — форма)

```
Photorealistic photo of a small restaurant terrace on a quiet stone-paved square in the old town of Girona at blue hour: a few wooden tables with cream tablecloths, candles in glass, wine glasses, warm string lights above, old stone façades with green wooden shutters, no people or only distant blurred silhouettes. Deep blue sky, warm golden light from the tables, cinematic but natural. 35 mm lens look, true-to-life colours, subtle film grain. Not CGI, no text, no logos, no readable signs. Horizontal 3:2, 1536×1024. File name: reserva.webp
```

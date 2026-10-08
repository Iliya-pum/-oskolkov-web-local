# Фото — Nácar

Файл собирается сам из `contenido.json` → `fotos` (не править руками).

**Как заменить заглушки:** сгенерировать фото по запросу ниже → сохранить в `fotos\` с именем из таблицы (расширение любое: `hero.png`, `hero.jpg` или `hero.webp` — сборка сама сделает WebP и копию 640 px для телефона) → `python build.py`. Фото настоящего клиента — только после `fotos.py` (WebP до 200 КБ).

| # | Файл | Где на сайте | Формат ChatGPT | На сайте |
|---|---|---|---|---|
| 1 | `hero.webp` | Первый экран на всю ширину (медленный зум); слева поверх — текст | 1536×1024 | есть |
| 2 | `servicio-cabello.webp` | Услуги — карточка «Cabello» | 1024×1536 | есть |
| 3 | `servicio-unas.webp` | Услуги — карточка «Uñas» | 1024×1536 | есть |
| 4 | `servicio-estetica.webp` | Услуги — карточка «Estética» | 1024×1536 | есть |
| 5 | `antes.webp` | До / после — «Antes» (большой слайдер; пара с №6) | 1536×1024 | есть |
| 6 | `despues.webp` | До / после — «Después» (правка №5) | 1536×1024 | есть |
| 7 | `galeria-recogido.webp` | Галерея — высокое фото слева | 1024×1536 | есть |
| 8 | `galeria-detalle.webp` | Галерея — квадрат, вверху | 1024×1024 | есть |
| 9 | `galeria-pestanas.webp` | Галерея — квадрат, вверху | 1024×1024 | есть |
| 10 | `galeria-lavado.webp` | Галерея — широкое фото внизу | 1536×1024 | есть |
| 11 | `ig-1.webp` | Instagram — 1 | 1024×1024 | есть |
| 12 | `ig-2.webp` | Instagram — 2 | 1024×1024 | есть |
| 13 | `ig-3.webp` | Instagram — 3 | 1024×1024 | есть |
| 14 | `ig-4.webp` | Instagram — 4 | 1024×1024 | есть |
| 15 | `ig-5.webp` | Instagram — 5 | 1024×1024 | есть |
| 16 | `ig-6.webp` | Instagram — 6 | 1024×1024 | есть |

## Общие правила для всех запросов

- Делать **в одном чате ChatGPT, по порядку** — так свет и цвет будут одинаковыми. №6 — сразу после №5: это правка той же картинки (иначе «до» и «после» будут разными людьми).
- Каждый запрос — целиком, он самодостаточный (стиль уже внутри).
- Получилось «пластиково» или слишком глянцево — ответить: `Make it look like a real camera photo: natural skin and hair texture, softer and less contrasty light, lower saturation, no glossy finish, keep everything else.`
- Руки: проверить пальцы (5 на руке) и ногти; лица — без сходства с реальными людьми.
- Скачать PNG, назвать как в таблице (`hero.png` можно — сборка сама сделает WebP), положить в `fotos\`, запустить `python build.py`.
- Для сайта настоящего клиента — только его фото (после `fotos.py`), эти — только для демо.

## Запросы (на английском, копировать целиком)

### 1. `hero.webp` — Первый экран на всю ширину (медленный зум); слева поверх — текст

```
Photorealistic wide interior photo of a small boutique beauty salon in an old stone building in Girona, Spain, on a quiet morning. On the right third of the frame: a tall arched mirror with a thin brass frame on a warm cream plaster wall, one powder-pink velvet styling chair in front of it, a small travertine side table with a glass vase of dried flowers and pampas grass, light oak floor. The left two thirds: calm, softly lit cream wall and floor with gentle shadows — empty space for text. Soft natural window light from the left, long gentle shadows, no people. Eye-level, straight-on composition. Colours: cream, powder pink, warm brass, light oak. Real materials and textures (lime plaster, velvet pile, stone), true-to-life colours, subtle film grain, like an interiors-magazine photo shot on a full-frame camera with a 35 mm lens. Not a 3D render, no glossy CGI look, no text, no logos, no watermark. Horizontal 3:2, 1536×1024. File name: hero.webp
```

### 2. `servicio-cabello.webp` — Услуги — карточка «Cabello»

```
Photorealistic close-up in a boutique hair salon: a hairstylist’s hands styling a woman’s long brunette hair into soft waves with a round brush and a hairdryer, seen from behind and slightly to the side, the client’s face not visible. Soft natural daylight from a window, warm cream wall softly out of focus, a hint of a powder-pink salon cape. Real hair texture with a few flyaways, natural skin on the hands, short neat nails. 50 mm lens look, shallow depth of field, true-to-life colours, subtle film grain, quiet editorial documentary style. Not glossy, not a 3D render, no text, no logos. Vertical 2:3, 1024×1536. File name: servicio-cabello.webp
```

### 3. `servicio-unas.webp` — Услуги — карточка «Uñas»

```
Photorealistic close-up of a manicure in progress at a beauty salon: a manicurist applying nude-pink polish to a client’s hand resting on a folded cream linen towel, two small unlabelled glass bottles of polish and a little brass dish nearby. Soft window light from the upper left, gentle shadows. Natural skin texture with fine lines and real cuticles, realistic proportions, exactly five fingers on each hand. 45-degree top-down angle, 50 mm macro lens look, shallow depth of field, warm cream and powder-pink palette, subtle film grain, true-to-life colours. Not glossy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: servicio-unas.webp
```

### 4. `servicio-estetica.webp` — Услуги — карточка «Estética»

```
Photorealistic photo of a facial treatment in a calm beauty salon room: a woman lying on a treatment bed with a soft cream towel wrapped around her hair, eyes closed, relaxed; a beauty therapist’s hands gently applying cream to her cheeks. Natural window light, warm cream walls, a touch of powder-pink linen, a small vase of dried flowers far in the background, out of focus. Real skin with pores and natural texture, no heavy make-up, no retouching. Seen from slightly above, from the head of the bed. 50 mm lens look, shallow depth of field, subtle film grain, true-to-life colours, quiet editorial mood. Not glossy, not CGI, no text, no logos. Vertical 2:3, 1024×1536. File name: servicio-estetica.webp
```

### 5. `antes.webp` — До / после — «Antes» (большой слайдер; пара с №6)

```
Photorealistic photo for a hair salon before/after comparison — the BEFORE shot. A woman seen from behind, sitting in a salon chair, with long dark brown hair that is flat, dull and slightly frizzy, one even colour, no shine. She wears a plain cream salon cape. The woman is exactly in the centre of the frame, with plain warm cream wall on both sides; soft even daylight from a window on the left. Camera at shoulder height, straight from behind; the hair fills the centre from the crown to the ends. Real hair texture, natural and unstyled, no retouching. Editorial documentary style, true-to-life colours, subtle film grain. Not glossy, not CGI, no text. Horizontal 3:2, 1536×1024. File name: antes.webp
```

Сразу после этого запроса — №6 в том же чате.

### 6. `despues.webp` — До / после — «Después» (правка №5)

```
Now edit the previous image to create the AFTER shot. Keep exactly the same woman, pose, framing, camera position, cape, background and light — change only the hair: a soft honey-caramel balayage on the dark brown base, brighter around the face and towards the ends, healthy natural shine, loose soft waves. Realistic hair texture, natural, not glossy or plastic, no text. Same size: horizontal 3:2, 1536×1024. File name: despues.webp
```

### 7. `galeria-recogido.webp` — Галерея — высокое фото слева

```
Photorealistic photo of a bridal low bun seen from behind: a soft, textured chignon at the nape of the neck with a few loose face-framing strands and three small pearl hair pins, warm light-brown hair. The woman wears an off-white silk dress with an open back; only the back of her head, neck and shoulders are visible. Soft natural window light, cream background softly out of focus. 85 mm lens look, shallow depth of field, real hair texture with flyaways, natural skin, subtle film grain. Elegant, quiet, editorial — not glossy, not CGI, no text. Vertical 2:3, 1024×1536. File name: galeria-recogido.webp
```

### 8. `galeria-detalle.webp` — Галерея — квадрат, вверху

```
Photorealistic still life in a boutique beauty salon: unlabelled amber glass bottles of hair oil and skincare, a wooden round brush, a pair of brass hairdressing scissors and a small vase of dried flowers on a travertine shelf against a warm cream plaster wall. Soft natural morning light with gentle shadows. Straight-on, eye-level, 50 mm lens look, true-to-life colours in cream, powder pink and warm brass, subtle film grain. Real materials with small imperfections, nothing that looks staged. Not a 3D render, no text, no logos, no brand names. Square 1:1, 1024×1024. File name: galeria-detalle.webp
```

### 9. `galeria-pestanas.webp` — Галерея — квадрат, вверху

```
Photorealistic close-up of a woman’s closed eye right after a lash lift and tint: naturally curled dark lashes, a groomed eyebrow, real skin texture with fine lines and pores, no make-up. Soft daylight, the edge of a cream towel at the side of the frame. Macro lens look, shallow depth of field, true-to-life colours, subtle film grain. Calm, clean and editorial — not glossy, not retouched, not CGI, no text. Square 1:1, 1024×1024. File name: galeria-pestanas.webp
```

### 10. `galeria-lavado.webp` — Галерея — широкое фото внизу

```
Photorealistic photo of the wash area in a boutique hair salon: two cream ceramic backwash basins with powder-pink velvet chairs, brass taps, rolled cream towels on an oak shelf, a large green plant in the corner. One client relaxing with her head back in the basin, eyes closed and peaceful, a stylist’s hands massaging her scalp with foam. Warm natural light from a side window, calm atmosphere. Eye-level, 35 mm lens look, true-to-life colours, subtle film grain, real textures. Editorial interior style — not glossy, not CGI, no text, no logos. Horizontal 3:2, 1536×1024. File name: galeria-lavado.webp
```

### 11. `ig-1.webp` — Instagram — 1

```
Photorealistic close-up of glossy honey-caramel balayage waves catching soft window light, seen from behind over the shoulder, cream background. Real hair texture with a few flyaways, natural shine, not plastic. 85 mm lens look, shallow depth of field, warm cream and honey palette, subtle film grain. No face, no text, no logos. Square 1:1, 1024×1024. File name: ig-1.webp
```

### 12. `ig-2.webp` — Instagram — 2

```
Photorealistic top-down photo of a woman’s hands with a fresh nude-pink manicure holding a small ceramic coffee cup on a travertine table, a sprig of dried flowers beside it. Soft morning light, gentle shadows, natural skin with fine lines, exactly five fingers on each hand. 50 mm lens look, cream and powder-pink palette, subtle film grain. Not glossy, no text, no logos. Square 1:1, 1024×1024. File name: ig-2.webp
```

### 13. `ig-3.webp` — Instagram — 3

```
Photorealistic still life in a beauty salon: dried peonies and pampas grass in a matte cream ceramic vase next to the edge of an arched brass mirror, on a travertine shelf. Soft natural light, long gentle shadows on a cream plaster wall. 50 mm lens look, true-to-life colours, subtle film grain, quiet and elegant. No text, no logos. Square 1:1, 1024×1024. File name: ig-3.webp
```

### 14. `ig-4.webp` — Instagram — 4

```
Photorealistic close-up of a hairstylist’s hands placing a small pearl hair comb into a soft bridal updo, seen from behind; warm light-brown hair, off-white silk at the shoulders. Soft window light, cream background out of focus. 85 mm lens look, shallow depth of field, real hair texture, natural skin, subtle film grain. No face, no text, no logos. Square 1:1, 1024×1024. File name: ig-4.webp
```

### 15. `ig-5.webp` — Instagram — 5

```
Photorealistic macro photo of a drop of golden facial serum falling from a glass dropper onto a cream linen surface, an unlabelled amber bottle softly out of focus behind. Warm natural light, true-to-life colours, subtle film grain, elegant and calm. No text, no logos, no brand names. Square 1:1, 1024×1024. File name: ig-5.webp
```

### 16. `ig-6.webp` — Instagram — 6

```
Photorealistic photo of a cream gift box tied with a powder-pink satin ribbon, a small blank gift card with a thin gold border tucked under the ribbon, on a powder-pink velvet chair. Soft natural light, gentle shadows, true-to-life colours, subtle film grain, elegant and quiet. No text on the card, no logos. Square 1:1, 1024×1024. File name: ig-6.webp
```

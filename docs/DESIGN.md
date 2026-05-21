# DESIGN.md — Дизайн-контракт лендинга «Доброе Начало»

**Версия:** 2.0
**Дата:** 2026-05-20
**Назначение:** единый источник истины по визуальным правилам. Перед сборкой каждой секции LLM сверяется с этим документом, чтобы не «галлюцинировать» дизайн с нуля.

> **Изменения v2.0 относительно v1.0:** новая палитра Premium (ivory + smoky beige + indigo-soft); голубой `#A0EBFF` и кремовый `#FFDCB4` переведены из фонов в decorative-палитру (только SVG-иконки OfferCards); добавлено правило именования Tailwind 4; `SocialIcons mode="contacts"` теперь включает VK; обновлены сетки (Additional Classes 7 кружков, Team 5 ключевых); добавлен 2GIS-рейтинг в RatingBadge.

---

## 1. Палитра (v2.0 Premium — CSS custom properties)

Палитра задаётся в `src/styles/global.css` внутри `@theme { ... }`. Tailwind 4 автоматически генерирует утилиты из этих токенов (см. §1.3).

### 1.1 Фоны (5 токенов)

```css
--color-bg:          #FAF8F4;  /* ivory — основной фон страницы */
--color-bg-soft:     #F1ECE3;  /* smoky beige — отбивки, тёплые секции */
--color-bg-warm:     #FFFFFF;  /* белый — акцентные карточки/секции */
--color-bg-mute:     #E8E3D9;  /* приглушённый беж — разделители, footer-light */
--color-indigo-soft: #DDE0EE;  /* мягкий индиго — фон School, выделения */
```

### 1.2 Акценты и текст

```css
--color-cta:          #FF9664;  /* оранжевый CTA */
--color-cta-dark:     #E07A4A;  /* hover/active */
--color-indigo:       #464682;  /* индиго основной (текст на светлом, фон footer) */
--color-indigo-dark:  #33335E;  /* индиго тёмный (заголовки, footer-background) */
--color-indigo-muted: #6E78B4;  /* индиго приглушённый (декор, иконки) */
--color-ink:          #2B2A29;  /* основной текст */
--color-text-muted:   #6B6B6B;  /* приглушённый текст, подписи */
--color-border:       #E5E7EB;  /* границы карточек, разделители */
```

### 1.3 Правило именования Tailwind 4 (КРИТИЧНО)

Tailwind 4 формирует утилиту как `<prefix>-<full-token-name>`, **без сокращений**. Имя токена идёт целиком после префикса.

| CSS-переменная | Tailwind-утилита |
|---|---|
| `--color-bg` | `bg-bg`, `text-bg` |
| `--color-bg-soft` | `bg-bg-soft`, `text-bg-soft` |
| `--color-indigo-soft` | `bg-indigo-soft`, `text-indigo-soft` |
| `--color-cta` | `bg-cta`, `text-cta`, `border-cta` |
| `--color-indigo-dark` | `bg-indigo-dark`, `text-indigo-dark` |

❌ **Неправильно:** `bg-soft`, `text-muted` (это сокращения, Tailwind 4 их не сгенерирует).
✅ **Правильно:** `bg-bg-soft`, `text-text-muted`.

### 1.4 Decorative-палитра (НЕ для фонов)

Цвета используются **только** в кастомных SVG-иконках секции OfferCards (4 карточки направлений). В Tailwind-токены фонов **не выносятся**.

| HEX | Применение |
|---|---|
| `#A0EBFF` | заливка декора в SVG-иконках OfferCards |
| `#FFDCB4` | заливка декора в SVG-иконках OfferCards |

### 1.5 Legacy (запрещено к использованию в v2.0)

Палитра v1.x (`bg-soft = #A0EBFF`, `bg-warm = #FFDCB4` как фоны секций) — устарела. При миграции 11 из 16 секций меняют фон, ~15 точечных правок в `.astro` файлах.

**Запрещено:** красный вне бренда, неоновые цвета, градиенты в иконках соцсетей.

---

## 2. Контраст и правила использования цвета

### 2.1 CTA-кнопка

Оранжевый `#FF9664` фон + **тёмно-индиговый текст** `#464682` (контраст 4.51:1, AA). Белый текст на оранжевом запрещён (контраст 2.85:1 — fail). Альтернатива для AAA: текст `#33335E` (`indigo-dark`).

### 2.2 Чередование фонов секций (v2.0)

Базовый ритм по странице — чередование ivory ↔ soft beige ↔ white, с акцентом indigo-soft для School и indigo-dark для Footer/Hero overlay.

| Фон | Применение |
|---|---|
| `bg-bg` (#FAF8F4 ivory) | OfferCards, WhyUs, Reviews, FAQ — основной ритм |
| `bg-bg-soft` (#F1ECE3 beige) | Philosophy, Kindergarten, Summer, HowToEnroll — тёплые секции |
| `bg-bg-warm` (#FFFFFF) | Team, Additional Classes — «акцентные карточные» |
| `bg-indigo-soft` (#DDE0EE) | School — единственная секция с холодным акцентом |
| `bg-bg-mute` (#E8E3D9) | разделители, тонкие отбивки |
| `bg-indigo-dark` (#33335E) | Footer, Hero overlay |

**Правило:** не более двух одинаковых фонов подряд. Между двумя «цветными» секциями (beige / indigo-soft) — ivory или white.

### 2.3 Текст на фонах (проверенный контраст)

| Текст | Фон | Контраст | Класс |
|---|---|---|---|
| `#2B2A29` (ink) | `#FAF8F4` (ivory) | 15:1 (AAA) | `text-ink bg-bg` |
| `#464682` (indigo) | `#F1ECE3` (beige) | 7:1 (AAA) | `text-indigo bg-bg-soft` |
| `#2B2A29` (ink) | `#DDE0EE` (indigo-soft) | 13:1 (AAA) | `text-ink bg-indigo-soft` |
| `#FFFFFF` | `#33335E` (indigo-dark) | 12:1 (AAA) | `text-bg-warm bg-indigo-dark` |
| `#FFFFFF` opacity 0.75 | `#33335E` | ≈9:1 (AAA) | подписи в footer |

---

## 3. Типографика

**Шрифты:** Manrope Variable (body, sans), Cormorant Garamond 400/600 (display, serif). Self-hosted через fontsource.

| Роль | Шрифт | Размер | Line-height | Применение |
|---|---|---|---|---|
| Hero H1 | Cormorant 600 | `clamp(2.5rem, 5vw, 4.5rem)` | 1.05 | один на странице |
| H2 секции | Cormorant 600 | `clamp(2rem, 4vw, 3rem)` | 1.15 | заголовок секции |
| H3 подзаголовок | Cormorant 600 | `clamp(1.5rem, 3vw, 2rem)` | 1.25 | блоки внутри секции |
| Eyebrow | Manrope 500, uppercase, tracking-wider | 0.875rem | 1.2 | надзаголовок над H2 |
| Lead | Manrope 400 | 1.125rem (text-lg) | 1.6 | вводный абзац под H2 |
| Body | Manrope 400 | 1rem | 1.6 | основной текст |
| Small | Manrope 400 | 0.875rem | 1.5 | подписи, метаданные |

H1/H2/H3 — `letter-spacing: -0.01em` (задано в `global.css`).

---

## 4. Сетка и отступы

**Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (1280px max, отступы 16/24/32 по брейкпоинтам).

**Вертикальные отступы секций:** `py-16 md:py-20 lg:py-24` (64/80/96px). Исключение — Hero (`py-20 lg:py-28`), Philosophy (увеличенный вертикальный padding под текст директора).

**Сетки внутри секций (v2.0):**

| Секция | Desktop (lg) | Tablet (md) | Mobile (sm) |
|---|---|---|---|
| Offer Cards (4) | 4×1 | 2×2 | 1×4 |
| Why Us (6) | 3×2 | 2×3 | 1×6 |
| Additional Classes (7) | 3+3+1 | 2×3+1 | 1×7 |
| Team featured (5) | **3+2** (центрировано) | 2×2+1 | 1×5 |
| School Life (8–12) | masonry 4 кол | 3 кол | 2 кол / 1 кол |

**Team 3+2 на десктопе:** первый ряд — 3 карточки в `grid-cols-3`, второй — 2 карточки в `grid-cols-2 max-w-2/3 mx-auto` (центрирование, чтобы избежать «сосисочного» эффекта 5×1). Tablet `2×2+1` — последняя карточка центрируется. Mobile — стандартный stack.

**Gap:** `gap-6 md:gap-8` (24/32px) внутри сеток секций.

---

## 5. Компоненты — правила

### Logo
- Везде используем `variant="compact"` (знак + текст). `mark` — только favicon. `full` (со слоганом) — резерв.
- Высота: 40px в Header, 48px в Footer, до 120px в Hero (если показываем).
- На индиго-фоне нужна светлая версия — pending от клиента (`logo-compact-white.svg`). Пока используем `variant="mark"` в Footer на индиго.

### Button
- Три варианта: `primary` (оранжевый+индиго-текст+shadow-cta), `secondary` (белый+индиго-обводка), `ghost` (прозрачный).
- Главный CTA всегда `primary size="lg"`. Вторичные — `secondary` или `ghost`.
- Иконка слева от текста через `gap-2` (уже в base).

### Card
- Фон `bg-bg-warm` (белый), `radius-md` (16px), `shadow-card`, hover — `shadow-card-hover` + лёгкий transform (lift).
- Внутренние отступы: `p-6 md:p-8`.

### ExpandableBlock
- Нативный `<details>/<summary>`, без JS.
- Заголовок summary — Manrope 600, иконка-стрелка справа (rotate на open).

### SectionHeading
- Структура: `[eyebrow]` → `<h2>` → `[lead]`.
- Выравнивание по умолчанию — по центру (`text-center max-w-3xl mx-auto`). В детальных секциях (School, Kindergarten, Summer) — слева.

### RatingBadge
- Звезда (оранжевая) + значение + источник + (count).
- **Двойной режим (v2.0):** показывает обе оценки — `4,7 ★ Яндекс.Карты` и `5,0 ★ 2ГИС`, суммарно `43+ отзыва`.
- На светлом — индиго-текст. На индиго — белый.
- Кликабельная: Яндекс ведёт на `site.rating.yandexUrl`, 2ГИС — на `site.rating.twoGisUrl`.

### SocialIcons
- Два режима через prop `mode` (v2.0):
  - `channels` (Footer) — TG-канал, Макс, VK
  - `contacts` (Header, Hero, Kindergarten/School/Summer CTA, Contacts) — TG-менеджер, Макс, **VK** (3 иконки, VK добавлен в v2.0)
- Иконки в брендовых цветах: TG `#229ED9`, Макс `#0077FF`, VK `#0077FF`. Плоские, без градиентов. Размер по prop `size`.
- Имя «Макс» — пишем кириллицей (бренд-требование).

---

## 6. Иконки

**Библиотека:** `astro-icon` + `@iconify-json/lucide` (установлены в `astro.config.mjs`). Используются через `<Icon name="lucide:..." />`.

**Правило выбора между Lucide и кастомным SVG:**

- **Lucide через `<Icon>`** — для контурных утилитарных иконок (UI-элементы, чипы, состояния, шаги enrollment). Цвет через `currentColor` (обычно `text-cta` или `text-indigo`). Размеры через Tailwind (`w-4 h-4`, `w-5 h-5`, `w-6 h-6`).
- **Кастомный inline SVG** — для:
  - залитых форм (звезда в `RatingBadge` — `fill="currentColor"`);
  - брендовых иконок соцсетей (TG, Макс, VK — в `src/icons/`, плоские брендовые цвета);
  - декоративных иконок OfferCards (см. ниже).

**OfferCards — кастомные line-icons 24×24, stroke 1.5.** Используют decorative-палитру `#A0EBFF` и `#FFDCB4` (см. §1.4) как заливку декора. Сюжеты: домик с солнцем (сад), открытая книга (школа), палатка (лето), шахматный конь (кружки).

**WhyUs — Lucide-иконки:** `eye` (внимание к каждому), `infinity` (единый путь), `heart-handshake` (педагоги видят), `salad` (питание от нутрициолога — НЕ `utensils-crossed`), `home` (семейная атмосфера), `sprout` (корни и крылья).

**Уже подключённые Lucide-иконки (минимум):** `phone`, `menu`, `users`, `star`, `eye`, `infinity`, `heart-handshake`, `salad`, `home`, `sprout`, `clipboard-list`, `door-open`, `file-text`.

**Эмодзи в текстах (`texts.md`)** — заменяются на Lucide-иконки на этапе сборки соответствующих секций.

---

## 7. Изображения

- Импорт через `astro:assets` (компонент `<Image>`).
- Форматы: AVIF приоритет, WebP fallback, JPG только если нужно.
- Responsive widths: `[400, 800, 1200, 1600]`, sizes — по контексту секции.
- Hero: `loading="eager"` + `fetchpriority="high"`. Остальные: `loading="lazy"`.
- Alt-текст: из `metadata.json` (поле `description`); если пусто — формируем по контексту секции, для декоративных `alt=""`.

---

## 8. Островки (client-side JS)

Только два:
- `ReviewSlider` (секция Reviews) — `client:visible`. Embla + минимальный JS на стрелки.
- `Lightbox` (секция School Life) — `client:idle`. Лёгкое решение (glightbox или собственный ~3KB).

Всё остальное — ноль JS. Аккордеоны = `<details>`, навигация = якоря + `scroll-behavior: smooth`.

---

## 9. Что точно НЕ делаем

- Не дублируем визуал текущего сайта `dobroenachalo.ru`.
- Не используем мультяшных детей-иллюстраций.
- Не используем красный/неон/градиенты в фирменной графике.
- Не пишем текст белым на оранжевом (контраст fail).
- Не используем сторонние JS-фреймворки (React/Vue/Svelte).
- Не используем legacy-фоны `#A0EBFF` / `#FFDCB4` как фоны секций (только декор OfferCards SVG).
- Не сокращаем Tailwind-токены (`bg-soft` ❌ → `bg-bg-soft` ✅).

---

## 10. Тон визуала

«По-московски стильно, модно, молодёжно» (формулировка заказчика): премиальная типографика, много воздуха, минимум декоративных элементов, фокус на типографике и фото. Сдержанность важнее украшательства. Палитра Premium (ivory + smoky beige + indigo-soft) поддерживает этот тон лучше, чем «детская» комбинация голубой+кремовый.

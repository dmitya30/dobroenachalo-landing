# Blueprint.md — Архитектурная карта проекта «Доброе Начало»

**Версия:** 2.0
**Дата:** 2026-05-20
**Назначение:** снимок текущей архитектуры реализованного лендинга. Используется новым диалогом разработки для быстрого входа в проект без чтения кода. Все формулировки — в настоящем времени, описывают то, что **уже существует** в репо.

> **История версий:** v0.1 (2026-05-14) — план разработки до старта. Реализация прошла в Диалогах №1–3, после чего в Диалоге №4 (фидбэк заказчицы) запущена волна рефакторинга v2.0. Этот документ — снимок состояния на старте волны v2.0 (документация уже переписана, код в процессе).

---

## 1. Стек и версии

- **Astro 6.3.3** в режиме `output: 'static'`, нулевой client-side JS по умолчанию.
- **Tailwind CSS 4** через `@tailwindcss/vite`, конфигурация через CSS-директивы `@theme` в `src/styles/global.css` (CSS-first, без `tailwind.config.js`).
- **TypeScript** в режиме `strict: true`, для типизации контент-коллекций и пропсов компонентов.
- **Node.js 22 LTS** (зафиксировано в `.nvmrc`), для локальной разработки и CI.
- **pnpm 11** + `pnpm-workspace.yaml` (моно-каталог из одного пакета).

**Подключённые пакеты:**
- `@astrojs/sitemap` — генерация `sitemap.xml`
- `astro-icon` + `@iconify-json/lucide` — иконки
- `sharp` — оптимизация изображений (встроен в Astro 6)
- `embla-carousel` — слайдер для секции Reviews
- `@fontsource-variable/manrope` + `@fontsource/cormorant-garamond` (700) — self-hosted шрифты, локально лежат в `src/assets/fonts/`

**Не используется:**
- React/Vue/Svelte интеграции (всё на `.astro`)
- CMS (Decap, Sanity, Strapi)
- Серверные интеграции (`@astrojs/node`, `@astrojs/vercel`)
- Формы обратной связи (вся конверсия идёт через `tel:` и мессенджеры)

---

## 2. Структура каталогов (фактическое состояние репо)

```
dobroenachalo-landing/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD → GitHub Pages
├── .vscode/                        # extensions.json, launch.json
├── .nvmrc                          # 22
├── .gitignore
├── README.md
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
├── docs/                           # вся документация проекта (см. §13)
│   ├── Blueprint.md                # этот файл
│   ├── CONTEXT.md
│   ├── DESIGN.md
│   ├── PROGRESS.md
│   ├── DECISIONS.md
│   ├── DECISIONS-archive-v1.md
│   ├── texts.md                    # тексты v2.0 (130 КБ)
│   ├── texts-v1.1.md               # архив предыдущей версии текстов
│   ├── Dialog-1.md                 # исторический артефакт (диалог 1)
│   └── Handoff.md                  # исторический артефакт передачи
├── public/
│   ├── apple-touch-icon.png
│   ├── favicon.svg
│   └── og-image.jpg                # 1200×630
└── src/
    ├── assets/                     # обрабатывается astro:assets
    │   ├── additional-classes/     # 4 фото
    │   ├── fonts/                  # cormorant 700 + manrope variable (woff2)
    │   ├── hero/                   # 1 фото (pending новое от клиента)
    │   ├── kindergarten/           # 3 фото
    │   ├── logo/                   # logo-compact.svg, logo-full.svg, logo-mark.svg
    │   ├── philosophy/             # 1 фото
    │   ├── school/                 # 3 фото
    │   ├── school-life/            # 8 фото
    │   ├── summer-camp/            # 3 фото
    │   └── team/                   # team-01..13.jpg (нужно дополнить до ~16)
    ├── components/
    │   ├── SchemaOrg.astro         # глобальный JSON-LD, подключается в BaseLayout
    │   ├── islands/                # пустая (резерв; client-side JS встроен в секции)
    │   ├── sections/               # 16 секций лендинга
    │   │   ├── Header.astro
    │   │   ├── Hero.astro
    │   │   ├── OfferCards.astro
    │   │   ├── WhyUs.astro
    │   │   ├── Philosophy.astro
    │   │   ├── Kindergarten.astro
    │   │   ├── School.astro
    │   │   ├── SummerCamp.astro
    │   │   ├── AdditionalClasses.astro
    │   │   ├── Team.astro
    │   │   ├── Reviews.astro       # Embla внутри + <script>
    │   │   ├── SchoolLife.astro    # vanilla lightbox внутри + <script>
    │   │   ├── HowToEnroll.astro
    │   │   ├── FAQ.astro
    │   │   ├── Contacts.astro
    │   │   └── Footer.astro
    │   └── ui/                     # 7 переиспользуемых UI
    │       ├── Button.astro
    │       ├── Card.astro
    │       ├── ExpandableBlock.astro
    │       ├── Logo.astro
    │       ├── RatingBadge.astro
    │       ├── SectionHeading.astro
    │       └── SocialIcons.astro
    ├── content/                    # 6 контент-коллекций (см. §4)
    │   ├── camp-sessions/          # 12 .json + _examples/
    │   ├── classes/                # 5 .json + _examples/ (v2.0 → +2 = 7)
    │   ├── faq/                    # 8 .json + _examples/ (v2.0 → +2 = 10)
    │   ├── reviews/                # 9 .json + _examples/
    │   ├── school-life/            # подписи к фото
    │   └── team/                   # 11 .json (v2.0 → дополнить до ~16)
    ├── content.config.ts           # типизация коллекций через Zod (Astro 5+ путь)
    ├── data/
    │   └── site.ts                 # глобальные константы (телефон, юр.данные, координаты, SEO)
    ├── env.d.ts
    ├── icons/                      # кастомные SVG
    │   ├── max.svg
    │   ├── telegram.svg
    │   ├── vk.svg
    │   └── offer/                  # декоративные SVG для OfferCards (см. §7)
    ├── layouts/
    │   └── BaseLayout.astro        # <html>, <head>, SEO, SchemaOrg
    ├── pages/
    │   ├── index.astro             # главная и единственная страница
    │   └── robots.txt.ts           # динамический endpoint (PRODUCTION env)
    └── styles/
        └── global.css              # @import "tailwindcss" + @theme {…}
```

**Принципы организации:**
- Секции лежат в `components/sections/`, а не в `pages/` — лендинг одностраничный, `index.astro` просто собирает их.
- `SchemaOrg.astro` — на верхнем уровне `components/`, потому что это глобальный head-блок, не UI и не секция.
- `Logo.astro` — отдельный UI-компонент (variants: `compact` / `mark` / `full`), используется в Header и Footer.
- `src/components/islands/` оставлена пустой как резерв. По факту client-side JS реализован inline `<script>`-ами внутри `Reviews.astro` (Embla) и `SchoolLife.astro` (lightbox). Нативный браузерный JS, без `client:*` директив.
- `src/content.config.ts` лежит на уровне `src/` (правильный путь для Astro 5+), не внутри `content/`.
- 6 содержательных коллекций (camp-sessions, classes, faq, reviews, school-life, team) дают редактирование через `.json` без правки кода.

---

## 3. Карта компонентов под 16 секций

| # | Секция | Компонент | Использует UI | Контент-источник |
|---|---|---|---|---|
| 1 | Header | `Header.astro` | Logo, Button, SocialIcons (contacts) | `site.ts` |
| 2 | Hero | `Hero.astro` | Button, RatingBadge, SocialIcons (contacts) | `site.ts` + asset |
| 3 | Offer Cards | `OfferCards.astro` | Card | inline в секции |
| 4 | Why Us | `WhyUs.astro` | — | inline (6 плиток, Lucide-иконки) |
| 5 | Philosophy | `Philosophy.astro` | SectionHeading | inline + asset |
| 6 | Kindergarten | `Kindergarten.astro` | ExpandableBlock, Button, SocialIcons | inline |
| 7 | School | `School.astro` | ExpandableBlock, Button, SocialIcons | inline |
| 8 | Summer Camp (id `#camp`) | `SummerCamp.astro` | ExpandableBlock, Button, SocialIcons | `content/camp-sessions/` |
| 9 | Additional Classes | `AdditionalClasses.astro` | Card, ExpandableBlock | `content/classes/` |
| 10 | Team | `Team.astro` | Card, ExpandableBlock | `content/team/` |
| 11 | Reviews | `Reviews.astro` | RatingBadge, inline Embla `<script>` | `content/reviews/` |
| 12 | School Life | `SchoolLife.astro` | inline lightbox `<script>` | `content/school-life/` |
| 13 | How To Enroll | `HowToEnroll.astro` | Button, SocialIcons | inline (4 шага) |
| 14 | FAQ | `FAQ.astro` | ExpandableBlock | `content/faq/` |
| 15 | Contacts | `Contacts.astro` | Button, SocialIcons (contacts) | `site.ts` + iframe Я.Карт |
| 16 | Footer | `Footer.astro` | Logo, SocialIcons (channels) | `site.ts` |

> Секция Summer Camp переименована из «Лагерь» в «Доброе лето» (v2.0), но HTML id `#camp` и якоря сохранены для обратной совместимости ссылок.

**UI-компоненты (`src/components/ui/`):**

- **`Button.astro`** — props: `variant` (primary/secondary/ghost), `size` (sm/md/lg), `href`, `icon`, `label`. Primary = оранжевый `#FF9664` + индиго-текст `#464682` (контраст AA). Mobile-scale: на <640px `lg` уменьшается до `text-base`.
- **`Card.astro`** — базовая обёртка с тенью, радиусом, паддингами. Slots для заголовка/тела/футера.
- **`ExpandableBlock.astro`** — нативный `<details>/<summary>`, ноль JS. Props: `summary`, `defaultOpen`.
- **`Logo.astro`** — props: `variant` (`compact` / `mark` / `full`). Высота: 40px в Header, 48px в Footer, до 120px в Hero. Светлая версия для индиго-фона Footer pending от клиента.
- **`RatingBadge.astro`** — двойной рейтинг (v2.0): `4,7 ★ Яндекс.Карты` + `5,0 ★ 2ГИС`, суммарно `43+ отзывов`. Кликабельные ссылки на оба источника.
- **`SectionHeading.astro`** — `[eyebrow]` → `<h2>` → `[lead]`. По умолчанию центр, в детальных секциях — слева.
- **`SocialIcons.astro`** — два режима:
  - `contacts` (Header, Hero, CTA-блоки секций, Contacts) — TG-менеджер + Макс + **VK** (3 иконки, VK добавлен в v2.0)
  - `channels` (Footer) — TG-канал + Макс + VK
  - Брендовые цвета: TG `#229ED9`, Макс `#0077FF`, VK `#0077FF`. Плоские, без градиентов.

**Глобальные компоненты (`src/components/`):**

- **`SchemaOrg.astro`** — JSON-LD блок (EducationalOrganization + LocalBusiness + AggregateRating + 5×Review + FAQPage), подключается в `BaseLayout.astro`.

**Client-side JS (фактически):**

Папка `src/components/islands/` пуста. Весь интерактив реализован inline `<script>`-ами внутри двух секций:
- `Reviews.astro` — Embla Carousel, lazy-init через IntersectionObserver, ~2 КБ.
- `SchoolLife.astro` — vanilla lightbox, ~3 КБ.

Аккордеоны = `<details>`, навигация = якорные ссылки + `scroll-behavior: smooth`. Никаких `client:*` директив на странице.

---

## 4. Контент-модель (Astro Content Collections)

Конфигурация в `src/content.config.ts` (путь для Astro 5+). Каждая коллекция типизирована через Zod, записи — отдельные `.json` файлы.

| Коллекция | Кол-во (v2.0) | Назначение |
|---|---|---|
| `camp-sessions` | 12 | 12 летних смен 2026 (порядок, даты, тема, описание) |
| `classes` | 5 → 7 | Кружки и секции (после v2.0 +Хореография, +Психолог) |
| `faq` | 8 → 10 | Вопросы для FAQ-секции (после v2.0 +После 4 класса, +Школа летом) |
| `reviews` | 9 | Отзывы (5 featured для слайдера + 4 short для chips) |
| `school-life` | (подписи) | Подписи к фото для масonry-галереи |
| `team` | 11 → ~16 | Команда (после v2.0 +Комкова, +Паломанова, +Ревенко и др.) |

В каждой коллекции есть служебная подпапка `_examples/` с шаблоном записи (для удобства добавления новых файлов через GitHub UI).

**Ключевые поля схемы:**
- `reviews`: `author`, `role`, `text`, `rating`, `source` (`yandex`/`2gis`/`vk`/`direct`), `featured: boolean` (≈5 в основной слайдер), `short: boolean` (для облака коротких цитат)
- `team`: `order`, `name`, `role`, `bio`, `photo`, `featured: boolean` (5 ключевых карточек в Team-сетке 3+2)
- `classes`: `order`, `title`, `icon`, `ageRange`, `trainer`, `schedule`, `pricing` (объект с `trial`/`single`/`package`)
- `camp-sessions`: `order`, `title`, `dateStart`, `dateEnd`, `month` (`june`/`july`/`august`), `description`, `highlights`

**Преимущество:** клиент или Дмитрий могут править контент через GitHub-интерфейс без знания Astro — обычный текстовый редактор по `.json`.

---

## 5. Дизайн-токены

Полное описание — в `DESIGN.md` v2.0 (раздел 1). Здесь — короткая выжимка для быстрой ориентации:

**Палитра v2.0 Premium** (CSS custom properties в `src/styles/global.css`, блок `@theme`):

```css
/* Фоны */
--color-bg:          #FAF8F4;   /* ivory — основной */
--color-bg-soft:     #F1ECE3;   /* smoky beige */
--color-bg-warm:     #FFFFFF;   /* белый акцент */
--color-bg-mute:     #E8E3D9;   /* приглушённый беж */
--color-indigo-soft: #DDE0EE;   /* мягкий индиго (School) */

/* Акценты и текст */
--color-cta:          #FF9664;
--color-cta-dark:     #E07A4A;
--color-indigo:       #464682;
--color-indigo-dark:  #33335E;
--color-indigo-muted: #6E78B4;
--color-ink:          #2B2A29;
--color-text-muted:   #6B6B6B;
--color-border:       #E5E7EB;
```

**Tailwind 4 naming (КРИТИЧНО):** утилита = `<prefix>-<full-token-name>`. `--color-bg-soft` → `bg-bg-soft`, **не** `bg-soft`.

**Шрифты:** Manrope Variable (body) + Cormorant Garamond 700 (display, не 600 — финальное решение Диалога №3 для устранения FOUT). Self-hosted, кириллические сабсеты лежат в `src/assets/fonts/`.

**Декоративная палитра (только OfferCards SVG):** `#A0EBFF` и `#FFDCB4`. Эти цвета **не** используются как фоны секций (в v1.x использовались — это устаревший подход).

---

## 6. Ассеты и оптимизация изображений

**Стратегия:** все фото проекта импортируются через `astro:assets`:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero/hero-01-08-05-375.jpg';
---
<Image src={heroImage} alt="..." widths={[400, 800, 1200, 1600]}
       sizes="(max-width: 768px) 100vw, 1200px"
       format="avif" fallbackFormat="webp"
       loading="eager" fetchpriority="high" />
```

- **Форматы:** AVIF (приоритет) → WebP (fallback) → JPG (только если нужно).
- **Responsive widths:** `[400, 800, 1200, 1600]`, для Hero убран вариант 1920 (по итогам Lighthouse-оптимизации).
- **Loading:** Hero — `eager` + `fetchpriority="high"`. Остальные — `lazy`.
- **Quality:** Hero — `75` (по итогам оптимизации).
- **Именование:** `kebab-case` со смысловым префиксом секции (`kindergarten-01-…`, `team-04-gogoleva-natalya.jpg`).
- **Воркфлоу:** лучшие исходники → ресайз до ≤2400px по длинной стороне → `src/assets/<section>/` → импорт в компоненте.

Фактический объём: ~25 фото распределены по 8 подпапкам секций. Pending от клиента: новый Hero, портрет директора (Philosophy), портреты для расширения Team, ~8–12 фото для School Life (wfolio katyamiseleva + Я.Диск), кадры Doброго лета.

---

## 7. Иконки

**Lucide через `astro-icon`** — для контурных утилитарных иконок (UI, чипы, шаги enrollment, WhyUs-плитки). Цвет через `currentColor`, размеры через Tailwind.

Используемые Lucide-иконки (минимум):
- WhyUs (6 плиток): `eye`, `infinity`, `heart-handshake`, `salad`, `home`, `sprout`
- HowToEnroll (шаги): `phone`, `users`, `clipboard-list`, `door-open`, `file-text`
- Общие UI: `menu`, `star`

**Кастомные SVG (`src/icons/`):**
- `telegram.svg`, `max.svg`, `vk.svg` — брендовые иконки соцсетей (плоские, без градиентов)
- `src/icons/offer/` — декоративные SVG-иконки для OfferCards (4 карточки направлений: сад/школа/лето/кружки), используют decorative-палитру `#A0EBFF` / `#FFDCB4`

Иконка телефона в кастомных SVG **отсутствует** — телефон идёт через Lucide `phone`.

Эмодзи в `texts.md` — заменяются на Lucide-иконки при сборке секций.

---

## 8. SEO и Schema.org

**`BaseLayout.astro`** генерирует в `<head>`:
- Базовые meta: charset, viewport, title, description, canonical, lang `ru`
- Open Graph: type, url, title, description, image (1200×630), locale `ru_RU`
- Twitter Card: `summary_large_image` (используется для превью в VK/TG)
- Geo-meta: координаты школы из `site.ts`
- iOS web-app meta
- Нормализация `BASE_URL` для корректных абсолютных ссылок (стейджинг на `dmitya30.github.io/dobroenachalo-landing/`, прод на `dobroenachalo.ru`)

**Описания и тексты meta — без запретных слов v2.0** («сосновый лес», «380 м от МЦД», «Выготский — Эльконин — Давыдов», «Альт*»).

**`SchemaOrg.astro`** (4.3 КБ, JSON-LD блок):
- `EducationalOrganization` + `LocalBusiness` с адресом, телефоном, координатами, `sameAs` (TG-канал, VK)
- `AggregateRating` 4.7 на 43+ отзыва
- 5 × `Review` (отдельные отзывы из коллекции `reviews`)
- `FAQPage` с 8 → 10 вопросами (после v2.0)
- Прошёл validator.schema.org

**`sitemap.xml`** — через `@astrojs/sitemap`, без дублей URL.
**`robots.txt`** — динамический endpoint `src/pages/robots.txt.ts`, в продакшене (`PRODUCTION=1`) разрешает индексацию, на стейджинге блокирует.

---

## 9. Аналитика (Yandex.Metrica)

**Статус:** не подключена. ID счётчика ждём от клиента (блокер). Подключение планируется в Диалоге №5 (Post-refactor).

**14 целей (полный список — в `DECISIONS.md` v2.0):**
1. `phone_click` — клик по `tel:+79858543655`
2. `telegram_click` — клик по иконке Telegram
3. `max_click` — клик по иконке Макс
4. `vk_click` — клик по иконке VK
5. `cta_hero` — клик по главному CTA в Hero
6. `cta_trial_day` — все CTA «Записаться на пробный день»
7. `cta_summer` — клик «Забронировать смену»
8. `expand_pricing_kindergarten` / `expand_pricing_school` — раскрытие прайсов
9. `expand_summer_month` — раскрытие месяца в календаре лета
10. `expand_team` — раскрытие полного состава команды
11. `external_reviews_click` — клик на Я.Карты/2ГИС
12. `scroll_to_reviews` / `scroll_to_contacts` — Intersection Observer
13. `scroll_50` / `scroll_75` / `scroll_100` — глубина
14. `time_on_page_60s` — время на странице

Включение Карты скроллинга, Вебвизора, Целей — в интерфейсе Метрики после установки счётчика. Сниппет Метрики клиент пришлёт **целиком готовым** (Яндекс может не принять кастомно собранный код).

---

## 10. CI/CD и деплой

**`.github/workflows/deploy.yml`** (1 КБ):
- Триггеры: `push` в `main`, ручной `workflow_dispatch`
- Шаги: checkout → pnpm setup → Node 22 → `pnpm install --frozen-lockfile` → `pnpm run check` (astro check + tsc) → `pnpm run build` → `actions/upload-pages-artifact` → `actions/deploy-pages`
- Permissions: `contents:read`, `pages:write`, `id-token:write`
- Environment: `github-pages`

**`astro.config.mjs`** (813 байт):
- `site` зависит от env (стейджинг vs прод)
- `output: 'static'`
- Интеграции: `sitemap`
- Image: Sharp service
- `inlineStylesheets: 'auto'`

**Стейджинг (текущий):** `https://dmitya30.github.io/dobroenachalo-landing/`, `noindex={true}` в `index.astro`, `PRODUCTION` env не выставлен.

**Прод (плановый, Диалог №5):**
- `public/CNAME` = `dobroenachalo.ru`
- DNS: A-записи apex на IP GitHub Pages + CNAME `www → dmitya30.github.io`
- HTTPS — автоматический Let's Encrypt от GitHub
- GH Actions env: `SITE_URL=https://dobroenachalo.ru`, `SITE_BASE=/`, `PRODUCTION=1`
- Снять `noindex={true}` в `index.astro`

---

## 11. Производительность (фактическое состояние)

**Lighthouse, стейджинг (конец Диалога №3):**

| | Mobile | Desktop |
|---|---|---|
| Performance | **79** | **82** |
| Accessibility | **95** | **95** |
| Best Practices | **100** | **100** |
| SEO | 66¹ | 66¹ |
| LCP | 2.1 с | 0.9 с |
| TBT | 830 мс | 360 мс |
| CLS | 0 | 0 |

¹ Стейджинг с `noindex`. После переключения на `dobroenachalo.ru` ожидается **100**.

**Потолок 79/82 принят.** Дальнейшая оптимизация ломала UX или давала отрицательный эффект (см. PROGRESS.md §«Известные мелочи»). Причины потолка: 16 секций + Embla + Lightbox + iframe Я.Карт.

**Что уже сделано для производительности:**
- Hero: `fetchpriority="high"`, quality 75, удалён вариант 1920
- Preload критических кириллических woff2 (Manrope + Cormorant 700)
- Cormorant 600 → 700 (устранил FOUT-флэш)
- Embla lazy-init через IntersectionObserver
- Critical CSS инлайнится Astro автоматически
- AVIF + WebP fallback на всех изображениях

**После рефакторной волны v2.0** метрики будут перемеряны. Новая палитра/тексты/компоненты не должны существенно повлиять на Performance.

---

## 12. Доступность (a11y)

**Достигнуто WCAG 2.1 AA, Lighthouse Accessibility = 95/95.**

- Контраст: 13:1 ink на ivory (AAA), 7:1 indigo на beige (AAA), 4.51:1 CTA (AA — согласовано)
- Семантические теги: `<header>`, `<main>`, `<section aria-labelledby>`, `<nav>`, `<footer>`
- Аккордеоны на нативных `<details>/<summary>`
- Кнопки — `<button>` или `<a>` (не `<div onclick>`)
- Видимые фокус-стили (`:focus-visible`)
- `prefers-reduced-motion` — анимации отключаются
- Skip-link «Перейти к содержимому» в самом верху
- `<html lang="ru">`
- Минимальный размер тач-таргета 44×44px на мобильных (включая 24×24 hit-area для точек слайдера)
- Все `<img>` с осмысленным `alt`, декоративные — `alt=""`

**Принятые мелочи:** heading order (намеренное использование `<h3>` для акцентов вне иерархии), CTA contrast 4.51:1 (формально AA).

---

## 13. Onboarding для нового диалога

**Что передаёт оркестратор в новый диалог:**

1. **Первое сообщение** — правила работы LLM в проекте (отдельный документ, не в репо, передаётся каждый раз).
2. **Второе сообщение** — конкретная задача сессии.
3. **Доступ к репо** — `https://github.com/dmitya30/dobroenachalo-landing` (читать через raw.githubusercontent.com или GitHub API).

**Источники истины (порядок приоритета):**

1. **Последние сообщения клиента** в текущем диалоге
2. **Клиентские docx** (`SAJT.docx`, `SAJT_Detskiy_sad.docx`, `SAJT_Lager.docx`) — если приложены
3. **Внутренние документы** в `docs/`:
   - `CONTEXT.md` v2.0 — бизнес-факты, цены, команда, контакты
   - `DESIGN.md` v2.0 — палитра, типографика, компоненты, сетки
   - `Blueprint.md` v2.0 — этот файл, архитектурная карта
   - `PROGRESS.md` v2.0 — что готово, что в работе, что впереди
   - `DECISIONS.md` v2.0 — журнал решений, запреты, регламент
   - `texts.md` v2.0 — финальные тексты 16 секций
   - `src/data/site.ts` — глобальные константы
4. **Текущий сайт** `dobroenachalo.ru` — для сверки фактов
5. **Код проекта** — последний резерв, читать только при необходимости

**Историческое (не для текущей работы):**
- `docs/DECISIONS-archive-v1.md` — старые решения, переписаны в v2.0
- `docs/texts-v1.1.md` — архив текстов
- `docs/Dialog-1.md` — артефакт первого диалога
- `docs/Handoff.md` — точка передачи между диалогами планирования и разработки

**Регламент коммитов:**
- Каждая секция / документ — отдельный коммит. Формат: `content(<section>): …`, `style(<scope>): …`, `docs(<file>): …`, `feat(<scope>): …`
- `PROGRESS.md` и `DECISIONS.md` обновляются раз в 3–4 секции или на смене фазы
- **Tailwind 4 цветовые утилиты:** `<prefix>-<полное-имя-токена>`. `--color-bg-soft` → `bg-bg-soft`, **не** `bg-soft`
- **Запрещённые слова (v2.0):** «лагерь» (→ «лето»/«смены»), «формат», «кислород», «шумный двор», «бор/сосны», «МЦД», «380 м», «Альтики», «АльтСкул», «Альткэмп», триада «Выготский — Эльконин — Давыдов», «готовку на территории», «без телефонов и компьютеров» (мягче)
- **Фактчекинг:** на стороне клиента. Используем точные клиентские формулировки даже при стилистических разногласиях.

---

## 14. Открытые блокеры и риски

Полный актуальный список — в `PROGRESS.md` v2.0 §«🚧 Открытые блокеры». Здесь — выжимка по категориям.

**Тексты от клиента (pending):**
- Расписания дня (сад × 3 группы, школа)
- Меню детского сада
- Уточнение по программе SMART CLASS / Ясюкова Л.А.
- Подтверждение состава кружков (Рондо, Лыжи, Вокал, Акробатика)
- Статус образовательной лицензии

**Фото от клиента (pending):**
- Hero, Philosophy (портрет директора), Kindergarten, School (главное + 3 атмосферных, wfolio/katyamiseleva), Summer, портреты для расширения Team, School Life (8–12 шт.)
- Светлая версия логотипа для индиго-фона Footer

**Юридическое:**
- Согласие родителей на использование фото детей в School Life
- Согласие педагогов: `team-12.jpg`, `team-13.jpg`

**Техническое от клиента:**
- ID Яндекс.Метрики и готовый сниппет счётчика

**Не-блокеры (можно релизить без):**
- Полный набор фото команды — для отсутствующих плейсхолдер с инициалами
- Точное содержание FAQ-вопроса о лицензии — формулировка-заглушка

**Открытые риски:**
- **Перерасход контекста LLM при больших сессиях.** Решение: декомпозиция задач (документация → палитра → контент по секциям, отдельными диалогами при необходимости), регулярное обновление `PROGRESS.md` после каждых 3–4 коммитов.
- **Pending-контент тормозит финальный QA.** Решение: реализуем секции с плейсхолдерами и помечаем их в `PROGRESS.md`, заменяем по мере прихода материалов от клиента.

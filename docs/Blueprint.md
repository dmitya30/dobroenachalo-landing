# Astro Project Blueprint v0.1
## Передаточный артефакт для диалога фронтенд-разработки

**Проект:** Лендинг частной школы-сада «Доброе Начало»
**Домен:** dobroenachalo.ru
**Дата:** 2026-05-14
**Автор:** оркестрация в этом диалоге, передача в новый диалог разработки

---

## 1. Стек и версии

**Astro 5.x** (последняя стабильная) - выбран ради нулевого client-side JS по умолчанию, отличного DX, нативной интеграции с Tailwind и `astro:assets`. Режим **`output: 'static'`** - подтверждено, серверной логики нет.

**Tailwind CSS 4.x** - через официальный плагин `@tailwindcss/vite` (новый способ интеграции в Tailwind 4, без `tailwind.config.js`, конфиг через CSS-директивы `@theme`).

**TypeScript** - `strict: true`, для типизации контент-коллекций и пропсов компонентов.

**Node.js 20.x LTS** - для локальной разработки и CI.

**Менеджер пакетов** - `pnpm` (быстрее, экономит место, стабильнее в CI).

**Дополнительные пакеты:**
- `@astrojs/sitemap` - генерация sitemap.xml
- `astro-icon` или `lucide-astro` - иконки (выбор в диалоге разработки, склоняюсь к `astro-icon` для гибкости с кастомными SVG)
- `@astrojs/check` + `typescript` - типпроверка в CI
- `sharp` - оптимизация изображений (встроен в Astro 5)

**Что НЕ используем:**
- React/Vue/Svelte интеграции - не нужны, всё на `.astro` компонентах
- CMS (Decap, Sanity, Strapi) - подтверждено, без CMS на старте
- Серверные интеграции (`@astrojs/node`, `@astrojs/vercel`)
- Формы обратной связи

---

## 2. Структура каталогов

```
dobroenachalo/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD → gh-pages
├── public/
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   ├── og-image.jpg                # 1200×630 для соцсетей
│   ├── robots.txt
│   └── CNAME                       # dobroenachalo.ru
├── raw-assets/                     # ИСХОДНИКИ, не в build (gitignored или в .astroignore)
│   ├── flyers/                     # 5 листовок
│   ├── reviews/                    # 11 отзывов (txt/md)
│   ├── telegram-photos/            # выгрузка из TG
│   ├── yandex-photos/              # выгрузка из Я.Карт
│   └── team-photos/                # портреты команды
├── src/
│   ├── assets/                     # обрабатываются astro:assets
│   │   ├── hero/
│   │   ├── kindergarten/
│   │   ├── school/
│   │   ├── camp/
│   │   ├── team/
│   │   ├── school-life/
│   │   └── logo/
│   ├── components/
│   │   ├── ui/                     # переиспользуемые
│   │   │   ├── Button.astro
│   │   │   ├── ExpandableBlock.astro
│   │   │   ├── Card.astro
│   │   │   ├── SectionHeading.astro
│   │   │   ├── RatingBadge.astro
│   │   │   └── SocialIcons.astro
│   │   ├── sections/               # 16 секций лендинга
│   │   │   ├── Header.astro
│   │   │   ├── Hero.astro
│   │   │   ├── OfferCards.astro
│   │   │   ├── WhyUs.astro
│   │   │   ├── Philosophy.astro
│   │   │   ├── Kindergarten.astro
│   │   │   ├── School.astro
│   │   │   ├── SummerCamp.astro
│   │   │   ├── AdditionalClasses.astro
│   │   │   ├── Team.astro
│   │   │   ├── Reviews.astro
│   │   │   ├── SchoolLife.astro
│   │   │   ├── HowToEnroll.astro
│   │   │   ├── FAQ.astro
│   │   │   ├── Contacts.astro
│   │   │   └── Footer.astro
│   │   └── islands/                # client-side JS, только при необходимости
│   │       ├── ReviewSlider.astro  # client:visible
│   │       └── Lightbox.astro      # client:idle
│   ├── content/                    # контент-коллекции (типизация через Zod)
│   │   ├── config.ts
│   │   ├── camp-sessions/          # 12 смен лагеря
│   │   ├── reviews/                # отзывы
│   │   ├── team/                   # команда
│   │   ├── faq/                    # вопросы
│   │   ├── classes/                # кружки
│   │   └── school-life/            # события школы для галереи
│   ├── data/
│   │   └── site.ts                 # глобальные константы (телефон, адрес, соцссылки)
│   ├── icons/                      # кастомные SVG (Telegram, MAX, VK)
│   │   ├── telegram.svg
│   │   ├── max.svg
│   │   └── vk.svg
│   ├── layouts/
│   │   └── BaseLayout.astro        # <html>, <head>, SEO, аналитика
│   ├── pages/
│   │   ├── index.astro             # главная (и единственная) страница
│   │   └── 404.astro               # на случай битых ссылок
│   ├── styles/
│   │   └── global.css              # @import "tailwindcss"; + @theme {…}
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── .gitignore
├── .nvmrc                          # 20
└── README.md
```

**Принципы организации:**
- `raw-assets/` отделена от `src/assets/`: первая - исходники любого размера, вторая - обработанные через `astro:assets`. В прод билд попадает только то, что импортировано в компоненты.
- Секции лежат в `components/sections/`, а не в `pages/`, потому что лендинг одностраничный. Главная страница `index.astro` - просто сборка из этих компонентов.
- `content/` - для всего повторяющегося структурированного контента (12 смен лагеря, отзывы и т.д.). Это даст редактирование через `.md`/`.json` без правки кода.

---

## 3. Карта компонентов под 16 секций

| # | Секция | Компонент | Использует UI | Контент-источник |
|---|---|---|---|---|
| 1 | Header | `Header.astro` | Button, SocialIcons | `site.ts` |
| 2 | Hero | `Hero.astro` | Button, RatingBadge | `site.ts` + asset |
| 3 | Offer cards | `OfferCards.astro` | Card | inline в секции |
| 4 | Why Us | `WhyUs.astro` | - | inline (6 плиток) |
| 5 | Philosophy | `Philosophy.astro` | SectionHeading | inline + asset |
| 6 | Kindergarten | `Kindergarten.astro` | ExpandableBlock, Button | inline |
| 7 | School | `School.astro` | ExpandableBlock, Button | inline |
| 8 | Summer Camp | `SummerCamp.astro` | ExpandableBlock, Button | `content/camp-sessions/` |
| 9 | Additional Classes | `AdditionalClasses.astro` | Card, ExpandableBlock | `content/classes/` |
| 10 | Team | `Team.astro` | Card, ExpandableBlock | `content/team/` |
| 11 | Reviews | `Reviews.astro` | ReviewSlider (island), RatingBadge | `content/reviews/` |
| 12 | School Life | `SchoolLife.astro` | Lightbox (island) | `content/school-life/` |
| 13 | How To Enroll | `HowToEnroll.astro` | Button | inline (3 шага) |
| 14 | FAQ | `FAQ.astro` | ExpandableBlock | `content/faq/` |
| 15 | Contacts | `Contacts.astro` | Button, SocialIcons | `site.ts` + iframe |
| 16 | Footer | `Footer.astro` | SocialIcons | `site.ts` |

**UI-компоненты (переиспользуемые):**

- **`Button.astro`** - props: `variant` (primary/secondary/ghost), `size` (sm/md/lg), `href`, `icon`, `label`. Primary = оранжевый на индиго, secondary = индиго на белом.
- **`ExpandableBlock.astro`** - нативный `<details>/<summary>` (без JS!). Принимает slot для контента, props: `summary`, `defaultOpen`.
- **`Card.astro`** - базовая обёртка с тенью, радиусом, паддингами. Slots для заголовка, тела, футера.
- **`SectionHeading.astro`** - единый стиль H2 + подзаголовок + опциональный лид.
- **`RatingBadge.astro`** - отображает «4,7 ★ Яндекс.Карты», кликабельный → ведёт в секцию reviews или на внешнюю ссылку.
- **`SocialIcons.astro`** - ряд из Telegram + MAX + VK + Phone. Принимает props `size`, `theme` (light/dark).

**Islands (client-side JS) - минимум:**
- **`ReviewSlider.astro`** с `client:visible` - горизонтальный слайдер. Можно нативно через CSS scroll-snap + минимальный JS для стрелок. ~2 KB.
- **`Lightbox.astro`** с `client:idle` - для галереи School Life. Можно взять минималистичный пакет (`yet-another-react-lightbox` не подходит из-за React; рассмотреть `glightbox` или собственное решение ~3 KB).

Всё остальное - нативный HTML/CSS. Аккордеоны = `<details>`, навигация = якорные ссылки + `scroll-behavior: smooth`.

---

## 4. Контент-модель (Astro Content Collections)

Файл `src/content/config.ts` - типизация через Zod:

```typescript
import { defineCollection, z } from 'astro:content';

const campSessions = defineCollection({
  type: 'data', // JSON/YAML
  schema: z.object({
    order: z.number(),
    title: z.string(),
    dateStart: z.string(), // "2026-06-01"
    dateEnd: z.string(),
    month: z.enum(['june', 'july', 'august']),
    description: z.string(),
    highlights: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const reviews = defineCollection({
  type: 'data',
  schema: z.object({
    author: z.string(),
    role: z.string(), // "мама ученика 2 класса"
    text: z.string(),
    rating: z.number().min(1).max(5).default(5),
    source: z.enum(['yandex', '2gis', 'vk', 'direct']),
    featured: z.boolean().default(false), // в основной слайдер
    short: z.boolean().default(false),    // короткая для "облака"
    date: z.string().optional(),
  }),
});

const team = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    photo: z.string().optional(),
    featured: z.boolean().default(false), // в 4 ключевых
  }),
});

const faq = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    question: z.string(),
    answer: z.string(),
  }),
});

const classes = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    icon: z.string(),
    ageRange: z.string(),
    trainer: z.string().optional(),
    schedule: z.string(),
    pricing: z.object({
      trial: z.string().optional(),
      single: z.string(),
      package: z.string().optional(),
    }),
    description: z.string().optional(),
  }),
});

export const collections = { campSessions, reviews, team, faq, classes };
```

Каждая запись - отдельный `.json` файл в подпапке. Пример `src/content/camp-sessions/01-energiya-sporta.json`:

```json
{
  "order": 1,
  "title": "Энергия спорта",
  "dateStart": "2026-06-01",
  "dateEnd": "2026-06-05",
  "month": "june",
  "description": "Спортивные игры, походы, командные приключения"
}
```

**Преимущество:** клиент или ты сможете править контент через GitHub-интерфейс без знания Astro - просто текстовый редактор. Это закрывает «зачем CMS» на 80%.

---

## 5. Дизайн-токены (Tailwind 4 через `@theme`)

`src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  /* Цвета бренда */
  --color-indigo: #3D3F7A;
  --color-indigo-dark: #2D2F5A;
  --color-orange: #F5A35B;
  --color-orange-dark: #E08840;
  --color-blue-soft: #BFE3EC;
  --color-cream: #FCE4CF;
  --color-white: #FFFFFF;

  /* Семантические алиасы */
  --color-bg: var(--color-white);
  --color-bg-soft: var(--color-blue-soft);
  --color-bg-warm: var(--color-cream);
  --color-text: var(--color-indigo);
  --color-text-muted: #5A5C8A;
  --color-cta: var(--color-orange);
  --color-cta-hover: var(--color-orange-dark);

  /* Типографика */
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "Manrope", -apple-system, system-ui, sans-serif;

  --font-size-hero: clamp(2.5rem, 5vw, 4.5rem);
  --font-size-h2: clamp(2rem, 4vw, 3rem);
  --font-size-h3: clamp(1.5rem, 3vw, 2rem);

  /* Радиусы */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  /* Тени */
  --shadow-card: 0 4px 20px rgba(61, 63, 122, 0.08);
  --shadow-card-hover: 0 8px 32px rgba(61, 63, 122, 0.12);

  /* Брейкпоинты (по умолчанию Tailwind, оставляем) */
  /* sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536 */

  /* Анимации */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Глобальные стили */
html { scroll-behavior: smooth; }
body { font-family: var(--font-body); color: var(--color-text); }
h1, h2, h3 { font-family: var(--font-display); }
```

**Загрузка шрифтов:** через `<link>` в `BaseLayout.astro`, fontsource или `unplugin-fonts`. Решение в диалоге разработки. Приоритет - self-hosted через `@fontsource/manrope` и `@fontsource/cormorant-garamond` (избегаем зависимости от Google Fonts).

**Точные HEX:** жду брендбук от клиента. Пока используем согласованную палитру из CONTEXT.md v1.1.

---

## 6. Ассеты и оптимизация изображений

**Стратегия:**

1. Все фото проекта импортируются через `astro:assets`:
   ```astro
   ---
   import { Image } from 'astro:assets';
   import heroImage from '../assets/hero/main.jpg';
   ---
   <Image src={heroImage} alt="..." widths={[400, 800, 1200, 1600]}
          sizes="(max-width: 768px) 100vw, 1200px"
          format="avif" fallbackFormat="webp" loading="lazy" />
   ```

2. **Форматы:** AVIF (приоритет) → WebP (fallback) → JPG (только если нужно).

3. **Размеры:** генерируем responsive srcset на 4 ширины (400, 800, 1200, 1600).

4. **Loading:**
   - Hero-изображение: `loading="eager"` + `fetchpriority="high"`
   - Остальные: `loading="lazy"`

5. **Именование:** `kebab-case`, осмысленные имена (`children-on-math-lesson.jpg`, не `IMG_1234.jpg`).

6. **Воркфлоу:** raw-assets → ручной отбор 30-50 лучших → ресайз до разумных исходных размеров (макс 2400px по длинной стороне) → размещение в `src/assets/` → импорт в компоненты.

**Где брать фото:**
- Telegram-канал @dobroenachalonahabino - 632 фото (приоритет)
- Яндекс.Карты галерея - 61 фото
- Сайт dobroenachalo.ru (`wp-content/uploads/`)
- VK (запросить экспорт у клиента, требует авторизации)

---

## 7. Иконки

**Стратегия:** комбинируем два источника.

**`astro-icon` + lucide** для стандартных иконок:
- Телефон, маркер на карте, часы, чек-марк, стрелки, плюс/минус для аккордеона
- Тематические эмодзи в `WhyUs.astro` заменяем на lucide (Trees, Users, Apple, Book, Train, Repeat)

**Кастомные SVG** для мессенджеров в `src/icons/`:
- `telegram.svg` - официальная иконка Telegram
- `max.svg` - официальная иконка MAX (взять с max.ru/brand или vk.com)
- `vk.svg` - официальная иконка VK

Все кастомные SVG - однотонные, цвет через `currentColor`, чтобы менять через Tailwind-классы.

---

## 8. SEO и Schema.org

**`BaseLayout.astro`** содержит в `<head>`:

```html
<!-- Базовые мета -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Доброе Начало - частная школа-сад в Нахабино | 2,5–11 лет</title>
<meta name="description" content="Частная школа-сад в сосновом лесу, 380 м от МЦД «Нахабино Ясное». Классы до 10 детей, программа Выготского - Эльконина - Давыдова. Рейтинг 4,7 на Яндекс.Картах." />
<link rel="canonical" href="https://dobroenachalo.ru/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://dobroenachalo.ru/" />
<meta property="og:title" content="Доброе Начало - частная школа-сад в Нахабино" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://dobroenachalo.ru/og-image.jpg" />
<meta property="og:locale" content="ru_RU" />

<!-- Twitter (для VK/TG превью) -->
<meta name="twitter:card" content="summary_large_image" />
```

**Schema.org JSON-LD** (один большой блок в `BaseLayout`):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://dobroenachalo.ru/#school",
      "name": "Доброе Начало",
      "description": "Частная школа-сад для детей 2,5–11 лет",
      "url": "https://dobroenachalo.ru/",
      "telephone": "+79858543655",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Пограничная, 12",
        "addressLocality": "деревня Чёрная",
        "addressRegion": "Московская область",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "...",  // уточнить по Я.Картам
        "longitude": "..."
      },
      "sameAs": [
        "https://t.me/dobroenachalonahabino",
        "https://vk.ru/dobroenachalo.nahabino"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "43",
        "bestRating": "5"
      }
    }
  ]
}
```

**Дополнительно:**
- `Review` элементы для каждого отзыва в слайдере (опционально, через `itemprop` атрибуты)
- `FAQPage` schema для секции FAQ
- `sitemap.xml` - генерируется автоматически через `@astrojs/sitemap`
- `robots.txt` - разрешаем всё, ссылка на sitemap

---

## 9. Аналитика (Yandex.Metrica)

Подключение в `BaseLayout.astro`, ID счётчика - запросить у клиента.

**Цели для отслеживания:**
1. `phone_click` - клик по любой ссылке `tel:+79858543655`
2. `telegram_click` - клик по иконке Telegram
3. `max_click` - клик по иконке MAX
4. `vk_click` - клик по иконке VK
5. `cta_hero` - клик по главному CTA в Hero
6. `cta_trial_day` - клики по CTA «Записаться на пробный день»
7. `cta_camp` - клик «Забронировать смену»
8. `expand_pricing_kindergarten` - раскрытие подробного прайса сада
9. `expand_pricing_school` - школы
10. `expand_camp_month` - раскрытие месяца в календаре лагеря
11. `expand_team` - раскрытие полной команды
12. `external_reviews_click` - клик «Все отзывы на Яндекс.Картах»
13. `scroll_to_section` - скролл до Reviews / Contacts (через Intersection Observer)
14. `scroll_50` / `scroll_75` / `scroll_100` - глубина скролла страницы

Включить Карту скроллинга, Вебвизор, Цели в интерфейсе Метрики после деплоя.

---

## 10. CI/CD и деплой

**`.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm run check    # astro check + tsc
      - run: pnpm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Домен:**
- Файл `public/CNAME` с содержимым `dobroenachalo.ru`
- В DNS у регистратора: `A` записи на IP GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) + `AAAA` для IPv6
- В настройках репозитория: Settings → Pages → Custom domain → `dobroenachalo.ru` → Enforce HTTPS
- HTTPS сертификат - автоматический Let's Encrypt от GitHub

**`astro.config.mjs`:**

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dobroenachalo.ru',
  output: 'static',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
```

---

## 11. Бюджет производительности

**Целевые метрики (Lighthouse mobile):**
- Performance: ≥ 95
- Accessibility: ≥ 95
- Best Practices: 100
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.0s
- CLS (Cumulative Layout Shift): < 0.05
- INP (Interaction to Next Paint): < 200ms
- TTFB: < 600ms (GH Pages CDN)

**Ограничения по размеру (на одну страницу, gzip):**
- HTML: < 30 KB
- CSS: < 25 KB
- JS: < 30 KB (только islands)
- Изображения первого экрана: < 200 KB

**Стратегия достижения:**
- Минимум JS - два island'а на всю страницу
- Critical CSS инлайнится автоматически Astro
- Изображения через `astro:assets` с AVIF
- Шрифты с `font-display: swap` + preload hero-шрифта
- Никаких сторонних виджетов (только Я.Карты iframe - lazy)
- Никаких рекламных скриптов

---

## 12. Доступность (a11y)

**Минимум - WCAG 2.1 AA:**
- Контраст текста: ≥ 4.5:1 (для обычного), ≥ 3:1 (для крупного). Проверить пары «индиго на креме», «белый на оранжевом».
- Все `<img>` имеют осмысленные `alt`, декоративные - `alt=""`
- Семантические теги: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- Каждая секция - `<section aria-labelledby="...">` с заголовком
- Аккордеоны на нативном `<details>/<summary>` (доступны из коробки)
- Кнопки - `<button>` или `<a>` (не `<div onclick>`)
- Видимые фокус-стили (`:focus-visible`)
- `prefers-reduced-motion` - убираем анимации при включённой настройке
- Skip-link «Перейти к содержимому» в самом верху
- Lang атрибут: `<html lang="ru">`
- Минимальный размер тач-таргета: 44×44px на мобиле

---

## 13. Чек-лист передачи в диалог разработки

На старте нового диалога фронтенд-разработки нужно передать:

**Документы:**
1. ✅ CONTEXT.md v1.1 (у пользователя на диске)
2. ✅ Texts v0.1 (16 секций, у пользователя на диске)
3. ✅ Этот Blueprint v0.1
4. ⏳ Листовки 1-5 (исходники WebP/JPG)
5. ⏳ 11 отзывов в исходниках с Яндекс.Карт
6. ⏳ Папка raw-assets с отобранными фото из Telegram/Я.Карт/сайта

**От клиента (запрошено / ждём):**
1. ⏳ SVG логотипа в исходнике
2. ⏳ Точные HEX бренд-цветов (брендбук)
3. ⏳ Deeplink MAX или username для `https://max.ru/<username>`
4. ⏳ ИНН/ОГРН для футера и schema.org
5. ⏳ Геокоординаты школы (можно снять с Я.Карт самим)
6. ⏳ ID Яндекс.Метрики
7. ⏳ Фото команды (13 портретов)
8. ⏳ Согласие на использование обезличенных цитат отзывов
9. ⏳ Подтверждение цены пробного дня - 2 900 ₽

**Стартовый промпт для нового диалога** (черновик):

> Стартуем фронтенд-разработку лендинга «Доброе Начало» (dobroenachalo.ru). Передаю три документа: CONTEXT.md v1.1, Texts v0.1, Astro Project Blueprint v0.1. Стек: Astro 5 static + Tailwind 4 + TypeScript, деплой на GitHub Pages. Задача этого диалога: пошагово развернуть проект по Blueprint - инициализация → дизайн-токены → UI-компоненты → секции → контент-коллекции → SEO → CI/CD. Начни с инициализации репозитория и базовой структуры; обсудим каждый шаг перед переходом к следующему.

---

## 14. Открытые блокеры и риски

**Блокеры (мешают релизу):**
- Логотип SVG - без него не финализировать Header/Footer
- Бренд-цвета - текущие согласованы, но финальный брендбук может сдвинуть
- Deeplink MAX - без него иконка ведёт на `https://max.ru/` (заглушка)

**Не-блокеры (можно релизить и без них):**
- ИНН/ОГРН - можно опубликовать, добавить позже
- Полный набор фото команды - для отсутствующих используем плейсхолдер с инициалами
- ID Метрики - добавляется в час по запросу

**Риски:**
- **Контекст-окно нового диалога**. Blueprint + CONTEXT + Texts уже ~25-30K токенов. При активной разработке (компоненты, отладка) есть риск сжатия. Решение: разбить разработку на 2 диалога - (1) каркас + UI-компоненты + дизайн-токены, (2) секции + контент + SEO + деплой.
- **GitHub Pages limits**: 1 GB репозиторий, 100 GB трафика/мес, 10 билдов/час. С запасом для нашей задачи.
- **Astro 5 - Tailwind 4 интеграция**. Tailwind 4 относительно свежий (стабильный релиз начала 2025), редкие edge-case баги в Astro-интеграции возможны. Решение: при проблемах откат на Tailwind 3.x.
- **Кириллические шрифты**. Manrope и Cormorant Garamond имеют кириллицу, но размер сабсета может быть большим. Решение: использовать `unicode-range` и подключать только кириллицу + латиницу.

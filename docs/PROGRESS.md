# PROGRESS.md — Журнал прогресса разработки

**Последнее обновление:** 2026-05-19
**Назначение:** живой снимок состояния проекта. Обновляется раз в 3–4 секции или на смене фазы. Источник истины «что готово / в работе / впереди».

---

## Текущий этап: Диалог №3 — все секции + SEO + Performance + визуальные доработки готовы. Следующее — кастомный домен и метрика.

### ✅ Готово

#### Стек и инфраструктура
- Astro 6.3.3 + Tailwind 4 + TypeScript strict + pnpm 11 (Node 22)
- CI/CD: GitHub Actions → GitHub Pages (стейджинг)
- Self-hosted шрифты Manrope Variable + Cormorant Garamond (400 + 700)
- 6 UI-компонентов (Button, Card, ExpandableBlock, SectionHeading, RatingBadge, SocialIcons)
- 6 контент-коллекций с Zod-схемами
- `src/data/site.ts` — все контакты, юр.данные, координаты, SEO
- Дизайн-токены `@theme` в `global.css`
- ~32 фото в `src/assets/`, реальные SVG логотипа и соцсетей
- Sharp, astro-icon, @iconify-json/lucide, Embla Carousel

#### Секции — 16 из 16
Header, Hero, OfferCards, WhyUs, Philosophy, Kindergarten, School, SummerCamp, AdditionalClasses, Team, Reviews (Embla, lazy-loaded), SchoolLife (vanilla lightbox), HowToEnroll, FAQ (нативные details), Contacts (Яндекс-карта iframe), Footer (2-column nav + label headings).

#### SEO-пакет
- BaseLayout: meta/OG/Twitter/canonical/geo/iOS, нормализация BASE_URL
- Брендовый favicon + apple-touch-icon + og-image 1200×630
- `SchemaOrg.astro`: EducationalOrganization + LocalBusiness + AggregateRating + 5 Review + FAQPage (validator.schema.org passes)
- `robots.txt` динамический endpoint (PRODUCTION env)
- sitemap без дублей URL

#### Performance
- Hero: fetchpriority=high, quality 75, drop 1920 variant
- Preload критических кириллических woff2 (Manrope + Cormorant 700)
- Cormorant 600 → 700 (устранил FOUT-флэш)
- Embla lazy-load через IntersectionObserver
- A11y: hit-area точек слайдера 24×24

#### Визуальные доработки (после Lighthouse)
- Team: портретный кроп фото на мобайле (aspect-[4/5] + absolute inset-0)
- CTA: сокращённые тексты + mobile-scale Button.lg (text-base на <640px)
- Footer: «Разделы» в 2 колонки, заголовки колонок как premium-label (text-sm uppercase tracking-wider)
- **Системный фикс**: исправлены неработавшие цветовые токены `bg-soft`/`bg-warm` → `bg-bg-soft`/`bg-bg-warm` в 5 секциях (Tailwind 4 naming)
- **Системный фикс**: каскад `h{1-4}.font-sans` для перебивания глобального display-шрифта

### 📊 Финальные метрики Lighthouse (стейджинг)

| | Mobile | Desktop |
|---|---|---|
| Performance | **79** | **82** |
| Accessibility | **95** | **95** |
| Best Practices | **100** | **100** |
| SEO | 66¹ | 66¹ |
| LCP | 2.1 с | 0.9 с |
| TBT | 830 мс | 360 мс |
| CLS | 0 | 0 |

¹ Стейджинг с `noindex`. После переключения на dobroenachalo.ru → 100.

### 🔧 В работе

— (нет активных задач)

### ⏭ Следующие шаги

1. **Кастомный домен dobroenachalo.ru** (без www):
   - `public/CNAME` с записью `dobroenachalo.ru`
   - DNS: A-записи apex на IP GitHub Pages + CNAME `www → dmitya30.github.io`
   - HTTPS (Let's Encrypt автоматом)
   - GH Actions workflow env: `SITE_URL=https://dobroenachalo.ru`, `SITE_BASE=/`, `PRODUCTION=1`
   - Снять `noindex={true}` в `index.astro`
2. **Yandex.Metrica** + 14 целей (ждём ID от клиента)
3. **Повторный Lighthouse на проде** — без noindex SEO=100, метрики могут улучшиться
4. **Финальная проверка** (после клиента) — фидбэк по контенту, фото

### ⏭ Следующая сессия (новый диалог)

**Приоритет 1 — Правка текстов по фидбэку заказчицы**
- Источник правок: конкретные тексты + транскрипт голосовых от заказчицы (приложит оркестратор в стартовом сообщении нового диалога).
- Работаем с: `docs/texts.md` (исходные тексты v0.1), контент-коллекции в `src/content/`, секции в `src/components/sections/`.
- Сверяем с: `CONTEXT.md` (бизнес-факты, цены, контакты — не противоречить), `DESIGN.md` (тон голоса).
- Регламент: каждая секция — отдельный коммит `content(<section>): ...`. После пакета правок — обновить `texts.md` до v0.2 (зафиксировать финальные тексты).

**Приоритет 2 — Yandex.Metrica + цели**
- Код счётчика клиент пришлёт **целиком**, готовым сниппетом (Яндекс может не принять кастомно собранный код — был прецедент).
- Интеграция: вставить в `BaseLayout.astro` перед `</head>` (с `<noscript>`-фоллбэком), вынести ID в `site.ts` или env.
- Цели (14 шт., список в DECISIONS.md): клики `tel:`, TG, MAX, VK, Я.Карты; CTA «Записаться» по секциям; открытие FAQ; открытие Lightbox; скролл >50%/>75%; время на странице >60с.
- Можно ставить на стейджинг (Metrica примет хиты, статистика начнёт собираться, после переезда на прод пересоздавать счётчик не нужно).

**Приоритет 3 — Кастомный домен dobroenachalo.ru** (детали в текущем разделе «Следующие шаги»)

**Приоритет 4 — Post-release**
- Яндекс.Вебмастер + Google Search Console (верификация, sitemap)
- Финальный Lighthouse на проде (ожидаем SEO 66 → 100)
- Опционально: Schema.org Course для AdditionalClasses, dynamic OG image

**Что НЕ в скоупе этой сессии**
- UTM-метки на внутренних кнопках (внутренние конверсии трекаем целями Metrica). UTM настраиваются клиентом на стороне Я.Директ при запуске рекламы.
- Чат-виджет (отказались).
- Любые перфоманс-оптимизации (потолок 79/82 принят, см. «Известные мелочи»).

### 🐛 Известные мелочи (приняты)

- **OfferCards: «скачут» элементы** — оставлено как есть
- **A11y: CTA contrast 4.51:1** — формально AA, цвет согласован
- **A11y: heading order** — намеренное использование `<h3>` для акцентов
- **Embla forced layout 360ms (desktop)** — особенность библиотеки
- **Mobile Performance ~79** — потолок для нашего стэка (16 секций + Embla + Lightbox + iframe-карта), дальнейшая оптимизация ломала UX или давала отрицательный эффект

### 🚧 Открытые блокеры

- ID Яндекс.Метрики — ждём от клиента
- Согласие родителей на фото `team-12.jpg` / `team-13.jpg`
- Светлая версия логотипа для индиго-фона Footer

### 📌 Регламент работы

- Каждый подтверждённый шаг → коммит. PROGRESS.md и DECISIONS.md обновляются раз в 3–4 секции или на смене фазы.
- **Порядок проверки правок**: сначала commit + push, потом замер Lighthouse (стейджинг видит только закоммиченную версию).
- Источники истины: CONTEXT.md (контент), DESIGN.md (визуал), Blueprint.md (архитектура), texts.md (тексты), DECISIONS.md (решения), site.ts (данные).
- **Tailwind 4 цветовые утилиты**: имя класса = `<prefix>-<полное-имя-токена>`. `--color-bg-soft` → `bg-bg-soft`, **не** `bg-soft`.

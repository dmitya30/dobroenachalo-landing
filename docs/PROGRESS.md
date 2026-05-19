# PROGRESS.md — Журнал прогресса разработки

**Последнее обновление:** 2026-05-19
**Назначение:** живой снимок состояния проекта. Обновляется раз в 3–4 секции или на смене фазы. Источник истины «что готово / в работе / впереди».

---

## Текущий этап: Диалог №3 — все секции + SEO + Performance готовы, остаются визуальные доработки и кастомный домен

### ✅ Готово (все диалоги)

#### Стек и инфраструктура
- Astro 6.3.3 + Tailwind 4 + TypeScript strict + pnpm 11 (Node 22)
- CI/CD: GitHub Actions → GitHub Pages (стейджинг)
- Self-hosted шрифты Manrope Variable + Cormorant Garamond (400 + 700)
- 6 UI-компонентов (Button, Card, ExpandableBlock, SectionHeading, RatingBadge, SocialIcons)
- 6 контент-коллекций с Zod-схемами, glob `[^_]*.json` (исключает `_examples/`)
- `src/data/site.ts` — все контакты, юр.данные ИП, координаты, SEO-метаданные
- Дизайн-токены в `global.css` (Tailwind 4 `@theme`)
- ~32 фото в 9 подпапках `src/assets/`
- Реальные SVG логотипа и соцсетей (TG/Макс/VK)
- Sharp, astro-icon, @iconify-json/lucide, Embla Carousel + autoplay

#### Секции — 16 из 16 (ВСЕ ГОТОВЫ)
1. **Header** — sticky, CTA «Позвонить», SocialIcons mode=contacts
2. **Hero** — H1 «Частная школа-сад в сосновом лесу под Москвой», 4 чипа, адаптивный градиент, fetchpriority=high
3. **OfferCards** — 4 карточки, кастомные SVG, голубой фон
4. **WhyUs** — 6 плиток Lucide, белый фон
5. **Philosophy** — founder story, кремовый фон
6. **Kindergarten** — лид+4 фичи / фото, прайс, expand, CTA
7. **School** — 6 фич сеткой, прайс + бейдж Выготского, голубой фон
8. **SummerCamp** — 12 смен в 3 expand по месяцам, прайс-сетка, кремовый фон
9. **AdditionalClasses** — 5 кружков 3+2, белый фон
10. **Team** — 4 ключевых + 12 в expand, белый фон
11. **Reviews** — Embla-слайдер (lazy-loaded), 5 длинных + 4 коротких отзыва, кремовый фон. **Интерактивный остров №1.**
12. **SchoolLife** — masonry 8 фото, vanilla-лайтбокс, белый фон. **Интерактивный остров №2.**
13. **HowToEnroll** — 3 шага, голубой фон
14. **FAQ** — 8 вопросов на нативных `<details>`, белый фон
15. **Contacts** — 4 блока + Яндекс-карта iframe, кремовый фон
16. **Footer** — 4 колонки, юр.данные

#### SEO-пакет
- BaseLayout: meta description/keywords/author/theme-color/canonical/geo/OG/Twitter Card, нормализация BASE_URL
- Брендовый favicon (mark) + apple-touch-icon 180×180 + og-image 1200×630
- `SchemaOrg.astro`: EducationalOrganization + LocalBusiness dual type + AggregateRating + 5 Review + FAQPage (validator.schema.org passes)
- `robots.txt` динамический endpoint (PRODUCTION env-переключатель)
- `sitemap-index.xml` + `sitemap-0.xml` через @astrojs/sitemap, без дублей URL

#### Performance — оптимизация
- Hero: fetchpriority=high, quality=75, drop 1920 variant
- Preload критических кириллических woff2 (Manrope + Cormorant 700) из `src/assets/fonts/`
- Cormorant вес 600 → 700 (устранил FOUT-флэш, улучшил читаемость инверсных заголовков)
- Embla lazy-load через IntersectionObserver (rootMargin 200px)
- A11y: hit-area точек слайдера расширен до 24×24

### 📊 Финальные метрики Lighthouse

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

**Целевые 95+/95+/100/100 на mobile-Performance не достигнуты** — потолок ~80 для лендинга с 16 секциями + Embla + Lightbox + iframe-картой на Lighthouse mobile-эмуляторе (4× CPU throttle). Реальные пользователи увидят значительно лучшие цифры. Подробное обоснование в DECISIONS.md §«Что попробовали и откатили».

### 🔧 В работе

— (нет активных задач, готовы перейти к следующей фазе)

### ⏭ Следующие шаги

1. **Визуальные баги** (фидбэк клиента с реальных устройств):
   - Текст в оранжевой CTA-кнопке переполняется на мобильных — укоротить или разрешить wrap
   - В некоторых секциях не применяется ожидаемый `bg-soft` (проверить классы)
   - Team: портретные фото на мобильных непропорционально кропятся
   - Footer: колонка «Разделы» выглядит непропорционально — разбить на 2 узких подколонки
   - Мобильные косячки HowToEnroll (нужны детали от клиента)
2. **Кастомный домен dobroenachalo.ru**:
   - `public/CNAME` с записью `dobroenachalo.ru` (без www)
   - DNS: A-записи на IP GitHub Pages для apex + CNAME `www → dmitya30.github.io`
   - HTTPS (Let's Encrypt автоматом)
   - В GH Actions workflow: env `SITE_URL=https://dobroenachalo.ru`, `SITE_BASE=/`, `PRODUCTION=1`
   - Снять `noindex={true}` в `index.astro` (или сделать дефолтом в BaseLayout)
3. **Yandex.Metrica** — ждём ID от клиента, 14 целей по DECISIONS
4. **Повторный Lighthouse на проде** — без noindex SEO=100, метрики Performance могут улучшиться (нет хэш-base в URL → короче пути)

### 🐛 Известные мелочи (приняты)

- **OfferCards: «скачут» элементы** из-за разной длины описаний (рецепты в DECISIONS)
- **A11y: CTA contrast 4.51:1** — формально AA, Lighthouse считает строже. Цвет согласован с заказчиком (DESIGN §1)
- **A11y: heading order** — намеренное использование `<h3>` для текстовых акцентов
- **Embla forced layout 360ms (desktop)** — особенность библиотеки, не оптимизируется на нашей стороне

### 🚧 Открытые блокеры

- ID Яндекс.Метрики — ждём от клиента
- Согласие родителей на фото `team-12.jpg` / `team-13.jpg` (в репо, не используются)
- Светлая версия логотипа для индиго-фона Footer (временно mark)

### 📌 Регламент работы

- Каждый подтверждённый шаг → коммит. **PROGRESS.md и DECISIONS.md обновляются раз в 3–4 секции или на смене фазы**.
- Перед сборкой секции — сверка с DESIGN.md и чтение текущих файлов из репо.
- Источники истины: CONTEXT.md (контент), DESIGN.md (визуал), Blueprint.md (архитектура), texts.md (тексты), DECISIONS.md (принятые решения).
- **Порядок проверки правок**: сначала commit + push, потом замер Lighthouse (на стейджинге доступна только закоммиченная версия).

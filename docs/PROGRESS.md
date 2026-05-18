# PROGRESS.md — Журнал прогресса разработки

**Последнее обновление:** 2026-05-18
**Назначение:** живой снимок состояния проекта. Обновляется раз в 3–4 секции. Источник истины «что готово / в работе / впереди».

---

## Текущий этап: Диалог №2 — секции собраны, переходим к SEO

### ✅ Готово (диалог №1)

- Astro 6.3.3 + Tailwind 4 + TypeScript strict + pnpm
- Структура каталогов по Blueprint
- `BaseLayout.astro` (с props title/description/noindex)
- 6 UI-компонентов: Button, Card, ExpandableBlock, SectionHeading, RatingBadge, SocialIcons
- 6 контент-коллекций (Zod-схемы): campSessions, reviews, team, faq, classes, schoolLife
- `src/data/site.ts` с реальными контактами и юр.данными ИП Беляковой
- Дизайн-токены в `global.css` (Tailwind 4 `@theme`)
- CI/CD: GitHub Actions → GitHub Pages
- Self-hosted шрифты Manrope + Cormorant Garamond

### ✅ Готово (диалог №2)

#### Базовая инфраструктура
- Реальные SVG соцсетей (TG/Макс/VK), режимы `channels`/`contacts` в SocialIcons
- 3 SVG логотипа от клиента в `src/assets/logo/`
- Палитра обновлена (HEX из SVG логотипа): `#464682`, `#FF9664`, `#A0EBFF`, `#FFDCB4`, `#6E78B4`, `#2B2A29`
- Контраст CTA AA 4.51:1 (оранжевый фон + индиго текст)
- ~32 фото в `src/assets/` (9 подпапок)
- Коллекции наполнены: camp-sessions 12 / faq 8 / team 16 / classes 5 / reviews 9 / school-life 8
- Glob-паттерн `'[^_]*.json'` во всех коллекциях (исключает `_examples/`)
- Sharp установлен, `astro-icon` + `@iconify-json/lucide` подключены
- Embla Carousel + autoplay-плагин установлены (для Reviews)

#### Секции готовы (16 из 16) — ВСЕ
- **1. Header** — CTA «Позвонить» + lucide:phone, режим contacts SocialIcons, BASE_URL для лого
- **2. Hero** — H1 «Частная школа-сад в сосновом лесу под Москвой», 4 чипа, адаптивный градиент, CTA + телефон + мессенджеры
- **3. OfferCards** — 4 кликабельные карточки, кастомные SVG, голубой фон, hover-lift
- **4. WhyUs** — 6 плиток с Lucide-иконками, Card variant `soft`, белый фон секции
- **5. Philosophy** — founder story ~180 слов, текст + фото, акцентная фраза, кремовый фон
- **6. Kindergarten** — лид+4 фичи / фото, прайс на виду, ExpandableBlock с распорядком, CTA
- **7. School** — лид + главное фото, 6 фич сеткой 3×2, прайс с бейджем Выготского-Эльконина-Давыдова, expand, CTA
- **8. SummerCamp** — лагерь 2026: 12 смен в трёх ExpandableBlock по месяцам, главное фото с бейджем «Раннее бронирование −5 000 ₽», прайс-сетка, кремовый фон
- **9. AdditionalClasses** — 5 кружков (3+2 ряд), 4 фото атмосферы, Lucide-иконки через маппинг, белый фон
- **10. Team** — 16 человек: 4 ключевых горизонтальных карточек + 12 в ExpandableBlock компактной сеткой, плейсхолдеры-инициалы для 5 человек без фото, белый фон
- **11. Reviews** — Embla-слайдер с 5 длинными отзывами, автоплей 6 сек, 3 цветные плашки рейтинга, 4 коротких цитаты, schema.org JSON-LD, кремовый фон. **Интерактивный остров №1.**
- **12. SchoolLife** — masonry-галерея 8 фото, hover-overlay, vanilla-лайтбокс, `import.meta.glob`, белый фон. **Интерактивный остров №2.**
- **13. HowToEnroll** — 3 шага на голубом фоне, CTA «Записаться на бесплатную экскурсию» + ссылки TG/Макс, якорь на FAQ
- **14. FAQ** — 8 вопросов из коллекции `faq` divided list на нативных `<details>` (без карточек), все свёрнуты, Lucide chevron-down, мини-CTA под списком (телефон + TG + Макс), белый фон
- **15. Contacts** — 4 иконочных блока (адрес/телефон/мессенджеры/часы) + Яндекс-карта iframe виджет, fallback-ссылка под картой, финальный CTA «Позвонить и записаться», кремовый фон
- **16. Footer** — 4 колонки (лого-mark / навигация / контакты / соцсети), юр.данные в подвале

#### `index.astro`
Собирает все 16 секций без заглушек. Лендинг полный, от Header до Footer.

### 🔧 В работе

— (переход к SEO-фазе)

### ⏭ Следующие шаги

1. **SEO-пакет** одним этапом:
   - `BaseLayout`: meta (description/keywords/robots), OG-теги, Twitter Card, canonical, favicon-набор
   - Schema.org JSON-LD: `EducationalOrganization` + `AggregateRating` + `Review` (часть уже в Reviews) + `FAQPage` (новое, в FAQ)
   - `sitemap.xml` (через `@astrojs/sitemap`)
   - `robots.txt` (статика в `public/`)
2. **Yandex.Metrica** + 14 целей (ждём ID от клиента)
3. **Баг мобильного HowToEnroll** (фикс перед Lighthouse)
4. **Lighthouse-аудит** → 95+/95+/100/100, оптимизация
5. **Custom domain dobroenachalo.ru**:
   - `public/CNAME` + DNS в кабинете регистратора
   - HTTPS (Let's Encrypt автоматом на GH Pages)
   - снять `base` в `astro.config.mjs`
   - снять `noindex` в `BaseLayout.astro`

### 🐛 Известные мелочи

- **OfferCards: «скачут» элементы** из-за разной длины описаний. Оставлено как есть (рецепты выравнивания — в DECISIONS).
- **Мобильные косячки в HowToEnroll** — выявлены клиентом на реальном устройстве (не в DevTools). Фикс в SEO-фазе перед Lighthouse.

### 🚧 Открытые блокеры

- ID Яндекс.Метрики — ждём от клиента
- Согласие родителей на фото `team-12.jpg` / `team-13.jpg` (сейчас не используются, лежат в репо)
- Светлая версия логотипа для индиго-фона Footer (временно mark)

### 📌 Регламент работы

- Каждый подтверждённый шаг → коммит. **PROGRESS.md и DECISIONS.md обновляются раз в 3–4 секции** (или на смене фазы — как сейчас).
- Каждое принятое решение → запись в DECISIONS.md (накапливаются в пачке).
- Перед сборкой секции — сверка с DESIGN.md.
- Источники истины:
  - Контент/цены/имена/контакты → CONTEXT.md, site.ts
  - Дизайн → DESIGN.md
  - Архитектура → Blueprint.md
  - Тексты → texts.md
  - Решения → DECISIONS.md

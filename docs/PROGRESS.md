# PROGRESS.md — Журнал прогресса разработки

**Последнее обновление:** 2026-05-18
**Назначение:** живой снимок состояния проекта. Обновляется раз в 3–4 секции. Источник истины «что готово / в работе / впереди».

---

## Текущий этап: Диалог №2 — секции и релиз

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

### ✅ Готово (диалог №2, текущий)

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

#### Секции готовы (13 из 16)
- **1. Header** — CTA «Позвонить» + lucide:phone, режим contacts SocialIcons, BASE_URL для лого
- **2. Hero** — H1 «Частная школа-сад в сосновом лесу под Москвой», 4 чипа, адаптивный градиент, CTA + телефон + мессенджеры
- **3. OfferCards** — 4 кликабельные карточки, кастомные SVG, голубой фон, hover-lift
- **4. WhyUs** — 6 плиток с Lucide-иконками (trees/users/utensils-crossed/book-open/train-front/infinity), Card variant `soft`, белый фон секции
- **5. Philosophy** — founder story ~180 слов, текст + фото, акцентная фраза, кремовый фон
- **6. Kindergarten** — лид+4 фичи / фото, прайс на виду, ExpandableBlock с распорядком, CTA
- **7. School** — лид + главное фото, 6 фич сеткой 3×2, прайс с бейджем Выготского-Эльконина-Давыдова, expand, CTA
- **8. SummerCamp** — лагерь 2026: 12 смен в трёх ExpandableBlock по месяцам (июнь раскрыт), главное фото с бейджем «Раннее бронирование −5 000 ₽», прайс-сетка, кремовый фон
- **9. AdditionalClasses** — 5 кружков (3+2 ряд), 4 фото атмосферы, Lucide-иконки через маппинг, белый фон
- **10. Team** — 16 человек (включая Ревенко-хореографа): 4 ключевых горизонтальных карточек (фото слева, текст справа), 12 в ExpandableBlock компактной сеткой 2/3/4 col, плейсхолдеры-инициалы для 5 человек без фото, `object-top` для портретов, белый фон
- **11. Reviews** — Embla-слайдер с 5 длинными отзывами (1/2 на экране), автоплей 6 сек, кнопки + точки, 3 цветные плашки рейтинга (Я/2ГИС/43+), 4 коротких цитаты ниже, schema.org JSON-LD (AggregateRating + 5 Review), кремовый фон. **Первый интерактивный остров.**
- **12. SchoolLife** — masonry-галерея 8 фото (CSS columns 1/2/3), hover-overlay с подписью и цветным чипом тега, vanilla-лайтбокс (Esc/←/→/click-outside, body scroll lock), `import.meta.glob` для оптимизации, белый фон. **Второй интерактивный остров.**
- **13. HowToEnroll** — 3 шага на голубом фоне: позвонить → бесплатная экскурсия → запись (с ценами пробных). Карточки с крупными номерами 01/02/03 и Lucide-иконками. CTA «Записаться на бесплатную экскурсию» + ссылки TG/Макс (брендовые SVG). Якорная ссылка на FAQ из шага 3.
- **16. Footer** — 4 колонки (лого-mark / навигация / контакты / соцсети), юр.данные в подвале

#### `index.astro`
Собирает Header + Hero + OfferCards + WhyUs + Philosophy + Kindergarten + School + SummerCamp + AdditionalClasses + Team + Reviews + SchoolLife + HowToEnroll + Footer. Заглушка только для FAQ + Contacts.

### 🔧 В работе

- Подготовка к FAQ (секция 14) — accordion из коллекции `faq` (8 вопросов).

### ⏭ Следующие шаги

1. Собрать 2 оставшиеся секции:
   - 14. FAQ (8 вопросов из коллекции, accordion на `<details>` или ExpandableBlock)
   - 15. Contacts (адрес, телефон, мессенджеры, часы, Яндекс-карта iframe)
2. SEO: meta, OG, schema.org (EducationalOrganization + FAQPage), sitemap, robots.txt
3. Yandex.Metrica + 14 целей (ждём ID)
4. Lighthouse-аудит, оптимизация до 95+/95+/100/100
5. Custom domain dobroenachalo.ru (CNAME, DNS, HTTPS, снять `base` в astro.config, снять `noindex`)

### 🐛 Известные мелочи

- **OfferCards: «скачут» элементы** из-за разной длины описаний. Оставлено как есть (рецепты выравнивания — в DECISIONS).
- **Мобильные косячки в HowToEnroll** — выявлены клиентом на реальном устройстве (не в DevTools). Поправим перед SEO-этапом.

### 🚧 Открытые блокеры

- ID Яндекс.Метрики — ждём от клиента
- Согласие родителей на фото `team-12.jpg` / `team-13.jpg` (сейчас не используются, лежат в репо)
- Светлая версия логотипа для индиго-фона Footer (временно mark)

### 📌 Регламент работы

- Каждый подтверждённый шаг → коммит. **PROGRESS.md и DECISIONS.md обновляются раз в 3–4 секции**.
- Каждое принятое решение → запись в DECISIONS.md (накапливаются в пачке).
- Перед сборкой секции — сверка с DESIGN.md.
- Источники истины:
  - Контент/цены/имена/контакты → CONTEXT.md, site.ts
  - Дизайн → DESIGN.md
  - Архитектура → Blueprint.md
  - Тексты → texts.md
  - Решения → DECISIONS.md

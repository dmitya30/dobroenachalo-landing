# PROGRESS.md — Журнал прогресса разработки

**Последнее обновление:** 2026-05-17
**Назначение:** живой снимок состояния проекта. Обновляется после каждого подтверждённого шага. Источник истины «что готово / в работе / впереди».

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

- **Иконки соцсетей**: реальные SVG TG/Макс/VK с брендовыми цветами, без градиентов; режимы `channels`/`contacts` в SocialIcons.astro
- **Логотип**: 3 SVG в `src/assets/logo/` (mark, compact, full) от клиента
- **Палитра обновлена**: HEX извлечены из SVG логотипа, токены в `global.css` соответствуют (`#464682`, `#FF9664`, `#A0EBFF`, `#FFDCB4`, добавлены `#6E78B4`, `#2B2A29`)
- **Кнопка CTA**: тёмно-индиговый текст на оранжевом (контраст AA 4.51:1)
- **Медиа-ассеты**: ~32 фото в `src/assets/` по 9 подпапкам (kindergarten, school, summer-camp, additional-classes, team, hero, philosophy, school-life, logo)
- **Контент-коллекции наполнены**:
  - camp-sessions: 12 JSON
  - faq: 8 JSON
  - team: 15 JSON (12 с фото, 3 без)
  - classes: 5 JSON
  - reviews: 9 JSON (5 длинных + 4 коротких)
  - school-life: 8 JSON
- **Документация в репозитории**: docs/ (Blueprint, CONTEXT, Handoff, Dialog-1, texts, DESIGN, PROGRESS, DECISIONS)
- **Sharp установлен**, локальный `pnpm build` проходит
- **Секции (черновые, не по дизайн-контракту):**
  - Header.astro
  - Hero.astro
  - Footer.astro
  - index.astro (собирает Header + Hero + Footer)

### 🔧 В работе

- Согласование DESIGN.md как источника истины
- Рефакторинг Header / Hero / Footer под утверждённый дизайн-контракт

### ⏭ Следующие шаги (по Handoff)

1. Рефакторинг Header/Hero/Footer по DESIGN.md (после утверждения)
2. Сборка 13 оставшихся секций: OfferCards, WhyUs, Philosophy, Kindergarten, School, SummerCamp, AdditionalClasses, Team, Reviews, SchoolLife, HowToEnroll, FAQ, Contacts
3. Два островка: ReviewSlider (client:visible), Lightbox (client:idle)
4. SEO: meta, OG, schema.org (EducationalOrganization + AggregateRating + FAQPage), sitemap, robots.txt
5. Yandex.Metrica + 14 целей (как только получим ID)
6. Lighthouse-аудит, оптимизация до 95+/95+/100/100
7. Переход на custom domain dobroenachalo.ru (CNAME, DNS, HTTPS, снять `base` в astro.config, снять `noindex`)

### 🚧 Открытые блокеры

- **ID Яндекс.Метрики** — ждём от клиента
- **Согласие родителей** на фото `team-13-zhenshchina-uchitel-sidit-za-stolom-na.jpg` (используется ли — решит клиент)
- **Светлая версия логотипа** для индиго-фона (Footer) — ждём от клиента или сделаем сами

### 📌 Регламент работы

- Каждый подтверждённый шаг → коммит + обновление PROGRESS.md
- Каждое принятое решение → запись в DECISIONS.md
- Перед сборкой секции — сверка с DESIGN.md
- Источники истины:
  - Контент/цены/имена/контакты → CONTEXT.md, site.ts
  - Дизайн → DESIGN.md
  - Архитектура → Blueprint.md
  - Тексты → texts.md
  - Решения → DECISIONS.md


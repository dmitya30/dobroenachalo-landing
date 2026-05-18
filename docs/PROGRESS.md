# PROGRESS.md — Журнал прогресса разработки

**Последнее обновление:** 2026-05-18
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
- **glob-паттерн коллекций исправлен:** `'**/*.json'` → `'[^_]*.json'` во всех 6 коллекциях. Исключает служебные папки/файлы, начинающиеся с `_` (`_examples/example.json` больше не попадает в выдачу `getCollection`).
- **Документация в репозитории**: docs/ (Blueprint, CONTEXT, Handoff, Dialog-1, texts, DESIGN, PROGRESS, DECISIONS)
- **Sharp установлен**, локальный `pnpm build` проходит
- **`astro-icon` + `@iconify-json/lucide` установлены** (интеграция в astro.config.mjs)
- **Иконки в Header / Hero — переведены на `<Icon name="lucide:..." />`**: phone, menu, users, trees, train-front
- **Звезда в RatingBadge — кастомный inline SVG с заливкой** (Lucide-звезда контурная, заливка через style не применилась)
- **Кастомные SVG для OfferCards в `src/icons/offer/`**: offer-kindergarten (лошадка-качалка), offer-school (учитель + дети), offer-camp (бегущие дети), offer-classes (шахматы), metod (резерв — девушка с портфелем, не используется)
- **Секции 1, 2, 3, 4, 5, 6, 7, 8, 9, 16 готовы по DESIGN.md:**
  - **Header.astro** — CTA «Позвонить» + иконка телефона, контакты-режим SocialIcons, BASE_URL для лого-ссылки
  - **Hero.astro** — H1 «Частная школа-сад в сосновом лесу под Москвой», 4 чипа (RatingBadge + 3 info), адаптивный градиент, CTA-блок с телефоном и мессенджерами
  - **OfferCards.astro** — 4 кликабельные карточки (Сад / Школа / Лагерь / Кружки), якорные ссылки, кастомные SVG-иконки, фон секции голубой (`bg-soft`), hover-lift
  - **WhyUs.astro** — 6 плиток (3×2 десктоп) с Lucide-иконками (trees, users, utensils-crossed, book-open, train-front, infinity), Card variant `soft` на белом фоне секции
  - **Philosophy.astro** — founder story (~180 слов) из texts.md §5, две колонки (текст + фото), кремовый фон (`bg-warm`), без CTA — блок доверия
  - **Kindergarten.astro** — детальный блок: лид + 4 фичи списком слева, главное фото справа (равные высоты), прайс на кремовом блоке (38 000 / 49 900 / 18 000 ₽), ExpandableBlock «Распорядок дня и атмосфера сада» (чипы расписания + 2 доп. фото), CTA-кнопка в конце
  - **School.astro** — детальный блок: лид + главное фото (вверху), 6 фич сеткой 3×2 (карточки на белом, на голубом фоне секции), прайс с бейджем Выготского-Эльконина-Давыдова, ExpandableBlock с доп. фото, CTA. Lucide-иконки: user-check, calculator, languages, home, drama, coins.
  - **SummerCamp.astro** — лагерь 2026: лид + главное фото с floating-бейджем «Раннее бронирование −5 000 ₽», календарь смен из коллекции `campSessions` в трёх ExpandableBlock по месяцам (июнь раскрыт, июль/август свёрнуты), 2 доп. фото атмосферы, прайс-сетка из 4 цен (24 000 / 19 000 / 21 000 / +5 000 ₽), CTA. Кремовый фон (`bg-warm`). Helper `formatRange` форматирует ISO-дату в «01–05 июня».
  - **AdditionalClasses.astro** — 5 кружков из коллекции `classes`: верхний ряд (Шахматы / Столярка / Акробатика) — 3 равных карточки; нижний ряд (Логопед / Подготовка к школе) — 2 равных во всю ширину. Сетка через `lg:grid-cols-6` + `col-span-2`/`col-span-3`. Под карточками — 4 квадратных фото атмосферы. Иконки Lucide через маппинг JSON-имён (`chess`→`crown`, `hammer`, `speech`→`mic`, `activity`, `book-open`). Белый фон секции.
  - **Footer.astro** — 4 колонки (лого-mark / навигация / контакты / соцсети), юр.данные в подвале
  - **index.astro** — собирает Header + Hero + OfferCards + WhyUs + Philosophy + Kindergarten + School + SummerCamp + AdditionalClasses + Footer, остальные секции = заглушка
- **RatingBadge расширен:** prop `variant: 'default' | 'on-dark'` для тёмных фонов

### 🔧 В работе

- Подготовка к секции Team (10, команда — 4 ключевых из коллекции + expandable со всеми 15)

### ⏭ Следующие шаги (по Handoff)

1. Сборка 6 оставшихся секций по Blueprint:
   - 10. Team (4 ключевых + expandable из коллекции)
   - 11. Reviews (+ island ReviewSlider, client:visible)
   - 12. SchoolLife (+ island Lightbox, client:idle)
   - 13. HowToEnroll (3 шага)
   - 14. FAQ (из коллекции)
   - 15. Contacts (карта + контакты)
2. Два островка: ReviewSlider, Lightbox
3. SEO: meta, OG, schema.org (EducationalOrganization + AggregateRating + FAQPage), sitemap, robots.txt
4. Yandex.Metrica + 14 целей (как только получим ID)
5. Lighthouse-аудит, оптимизация до 95+/95+/100/100
6. Переход на custom domain dobroenachalo.ru (CNAME, DNS, HTTPS, снять `base` в astro.config, снять `noindex`)

### 🐛 Известные мелочи (не блокеры)

- **OfferCards: «скачут» элементы внутри карточек** из-за разной длины заголовков/описаний. Решено оставить как есть (тексты действительно разные). Если потом захочется выровнять — см. DECISIONS «Выравнивание карточек».

### 🚧 Открытые блокеры

- **ID Яндекс.Метрики** — ждём от клиента
- **Согласие родителей** на фото `team-13-zhenshchina-uchitel-sidit-za-stolom-na.jpg` (используется ли — решит клиент)
- **Светлая версия логотипа** для индиго-фона (Footer) — ждём от клиента или сделаем сами

### 📌 Регламент работы

- Каждый подтверждённый шаг → коммит. **PROGRESS.md и DECISIONS.md обновляются раз в 3–4 секции** (а не каждый коммит) — для экономии контекстного окна диалога. Сами по себе коммиты остаются атомарными.
- Каждое принятое решение → запись в DECISIONS.md (накапливаются в пачке, пишутся одним блоком)
- Перед сборкой секции — сверка с DESIGN.md
- Источники истины:
  - Контент/цены/имена/контакты → CONTEXT.md, site.ts
  - Дизайн → DESIGN.md
  - Архитектура → Blueprint.md
  - Тексты → texts.md
  - Решения → DECISIONS.md

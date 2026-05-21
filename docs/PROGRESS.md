# PROGRESS.md — Журнал прогресса разработки

**Версия:** 2.1
**Последнее обновление:** 2026-05-21
**Назначение:** живой снимок состояния проекта. Обновляется раз в 3–4 секции или на смене фазы. Источник истины «что готово / в работе / впереди».

---

## Текущий этап: Диалог №4 — рефакторинг под фидбэк заказчицы v2.0

После завершения Диалога №3 («все 16 секций готовы, Lighthouse 79/82, далее — домен и метрика») заказчица прислала большой пакет правок: новые формулировки, обновлённые цены, расширенный состав команды, переименование «лагерь → лето», запрет ряда слов, новая палитра. Это запустило волну рефакторинга v2.0: переписаны 4 ключевых документа (`texts.md`, `DECISIONS.md`, `CONTEXT.md`, `DESIGN.md`), впереди — ~15 коммитов по секциям и палитре. Домен и метрика отложены до завершения рефакторинга.

---

### ✅ Готово

#### Диалог №1–3 (база, v1.x)

**Стек и инфраструктура**
- Astro 6.3.3 + Tailwind 4 + TypeScript strict + pnpm 11 (Node 22)
- CI/CD: GitHub Actions → GitHub Pages (стейджинг)
- Self-hosted шрифты Manrope Variable + Cormorant Garamond (400 + 700)
- 6 UI-компонентов (Button, Card, ExpandableBlock, SectionHeading, RatingBadge, SocialIcons)
- 6 контент-коллекций с Zod-схемами
- `src/data/site.ts` — все контакты, юр.данные, координаты, SEO
- Дизайн-токены `@theme` в `global.css` (палитра v1.x — голубой/кремовый как фоны)
- ~32 фото в `src/assets/`, реальные SVG логотипа и соцсетей
- Sharp, astro-icon, @iconify-json/lucide, Embla Carousel

**Секции — 16 из 16 (на текстах v0.1, палитре v1.x)**
Header, Hero, OfferCards, WhyUs, Philosophy, Kindergarten, School, SummerCamp, AdditionalClasses, Team, Reviews (Embla, lazy-loaded), SchoolLife (vanilla lightbox), HowToEnroll, FAQ (нативные details), Contacts (Яндекс-карта iframe), Footer (2-column nav + label headings).

**SEO-пакет**
- BaseLayout: meta/OG/Twitter/canonical/geo/iOS, нормализация BASE_URL
- Брендовый favicon + apple-touch-icon + og-image 1200×630
- `SchemaOrg.astro`: EducationalOrganization + LocalBusiness + AggregateRating + 5 Review + FAQPage (validator.schema.org passes)
- `robots.txt` динамический endpoint (PRODUCTION env)
- sitemap без дублей URL

**Performance**
- Hero: fetchpriority=high, quality 75, drop 1920 variant
- Preload критических кириллических woff2 (Manrope + Cormorant 700)
- Cormorant 600 → 700 (устранил FOUT-флэш)
- Embla lazy-load через IntersectionObserver
- A11y: hit-area точек слайдера 24×24

**Визуальные доработки (после Lighthouse)**
- Team: портретный кроп фото на мобайле (aspect-[4/5] + absolute inset-0)
- CTA: сокращённые тексты + mobile-scale Button.lg (text-base на <640px)
- Footer: «Разделы» в 2 колонки, заголовки колонок как premium-label (text-sm uppercase tracking-wider)
- Системный фикс: исправлены неработавшие цветовые токены `bg-soft`/`bg-warm` → `bg-bg-soft`/`bg-bg-warm` в 5 секциях (Tailwind 4 naming)
- Системный фикс: каскад `h{1-4}.font-sans` для перебивания глобального display-шрифта

#### Диалог №4 (рефакторинг v2.0 — документация)

- `docs/texts.md` v2.0 — переписан под фидбэк заказчицы (16 секций + палитра + журнал решений), ~119 КБ
- `docs/DECISIONS.md` v2.0 — обновлены источники истины, запреты, палитра, цены, состав команды, нейминг Tailwind 4
- `docs/DECISIONS-archive-v1.md` — создан и закоммичен (архив старых решений)
- `docs/CONTEXT.md` v2.0 — рефакторинг: убрана секция «География» (380м/МЦД), убран бренд «Альт*», обновлены цены/команда/палитра, расширен список запретов
- `docs/DESIGN.md` v2.0 — новая палитра Premium (ivory + smoky beige + indigo-soft), правило Tailwind 4 naming, `SocialIcons mode="contacts"` с VK, сетка Team 3+2, decorative-палитра для OfferCards

#### Диалог №4 (Фаза 1 — палитра v2.0 в коде, 2026-05-21)

5 коммитов, миграция всех 16 секций на palette v2.0:

- `style(palette): tokens + UI base — premium v2.0` — `global.css` (`@theme` переписан целиком), `Button.astro` (`cta-hover` → `cta-dark`), `RatingBadge.astro` (`hover:bg-cream` → `hover:bg-bg-mute`), `SchoolLife.astro` (тег `life`: `bg-indigo-soft` → `bg-indigo-muted`).
- `style(palette): OfferCards + Philosophy + Kindergarten — premium v2.0` — OfferCards на ivory с белыми карточками, Philosophy → beige, Kindergarten остаётся ivory (ритм Philosophy/Kindergarten/School = beige/ivory/indigo-soft).
- `style(palette): WhyUs + School + SummerCamp — premium v2.0` — WhyUs → white (разрывает дубль ivory с OfferCards), School → indigo-soft (главный «холодный» акцент), SummerCamp → beige.
- `style(palette): AdditionalClasses + Reviews — premium v2.0` — AdditionalClasses → white, Reviews → ivory с белыми карточками. Team и HowToEnroll корректны автоматически после смены значений токенов.
- `style(palette): Contacts + Footer — premium v2.0 complete` — Contacts → ivory (4 подложки иконок и контейнер карты → white), Footer → indigo-dark (#33335E, контраст с белым текстом 12:1 AAA).

**Системные изменения в токенах:**
- `--color-indigo-soft: #6E78B4` переименован в `--color-indigo-muted` (имя `indigo-soft` освобождено под новый фоновый `#DDE0EE`).
- Удалены `--color-blue-soft` и `--color-cream` из `@theme` (decorative-цвета `#A0EBFF` и `#FFDCB4` живут только в SVG-иконках OfferCards, зашиты HEX-ом).
- Дефолтный body-текст переведён с `indigo` на `ink` (`#2B2A29`).
- `--color-cta-hover` → `--color-cta-dark` (синхрон с DESIGN.md).

**Финальный ритм фонов (16 секций):** Header ivory → Hero indigo → OfferCards ivory → WhyUs white → Philosophy beige → Kindergarten ivory → School indigo-soft → SummerCamp beige → AdditionalClasses white → Team beige → Reviews ivory → SchoolLife ivory → HowToEnroll beige → FAQ ivory → Contacts ivory → Footer indigo-dark. Дублей подряд нет.

#### Финальные метрики Lighthouse (стейджинг, конец Диалога №3)

| | Mobile | Desktop |
|---|---|---|
| Performance | **79** | **82** |
| Accessibility | **95** | **95** |
| Best Practices | **100** | **100** |
| SEO | 66¹ | 66¹ |
| LCP | 2.1 с | 0.9 с |
| TBT | 830 мс | 360 мс |
| CLS | 0 | 0 |

¹ Стейджинг с `noindex`. После переключения на dobroenachalo.ru → ожидаем 100.

> Метрики будут перемеряны после завершения рефакторной волны v2.0 (новая палитра/тексты/компоненты не должны существенно повлиять на Performance, но проверим).

---

### 🔧 В работе

**Документация v2.0 — финализация**
- [x] `texts.md` v2.0
- [x] `DECISIONS.md` v2.0 + архив v1
- [x] `CONTEXT.md` v2.0
- [x] `DESIGN.md` v2.0
- [x] `Blueprint.md` v2.0
- [x] `PROGRESS.md` v2.1 (с фиксацией Фазы 1)

Документация v2.0 закрыта. Идёт волна рефакторинга кода.

---

### ⏭ Следующие шаги

#### Фаза 1 — Палитра ✅ Завершено 2026-05-21

5 коммитов, см. раздел «✅ Готово / Диалог №4 (Фаза 1 — палитра v2.0 в коде)» выше. Все 16 секций переведены на palette v2.0. Decorative-цвета остались только в SVG OfferCards. Lighthouse-замер отложен до финала проекта.

#### Фаза 2 — Контент по секциям (отдельный коммит на каждую)

Порядок повторяет нисходящий порядок секций на странице:

- [ ] `content(hero): v2.0 — H1 + slogan + 5 chips + multi-channel CTA + rating badge 4.7/5.0`
- [ ] `content(offer-cards): v2.0 — remove prices, rename «Лагерь» → «Доброе лето»`
- [ ] `content(why-us): v2.0 — 6 tiles verbatim, heading update`
- [ ] `content(philosophy): v2.0 — director text ~280 words + SMART CLASS / Ясюкова bold`
- [ ] `content(kindergarten): v2.0 — price 49 900, age 2–7, Vygotsky only, 4 advantages, FAQ 5Q`
- [ ] `content(school): v2.0 — subtitle, 5 advantages, programme + textbooks, 12 subjects, 6 sports`
- [ ] `content(summer-camp): v2.0 — «Доброе лето», 12 сессий, prices 29/24 + discounts, trial 6 400`
- [ ] `content(additional): v2.0 — 7 кружков (3+3+1 grid), новые педагоги, обновлённые цены`
- [ ] `content(team): v2.0 — 5 featured cards (3+2 grid), Галан → завуч, +Комкова, +Паломанова, +Ревенко`
- [ ] `content(school-life): v2.0 — heading update, photo briefs (фото pending от клиента)`
- [ ] `content(enrollment): v2.0 — 4 шага, trial day 2 900 ₽, требуемые документы`
- [ ] `content(faq): v2.0 — 8 базовых + 2 новых (после 4 класса, школа летом)`
- [ ] `content(header-footer): v2.0 — «Лагерь» → «Лето», +VK, «Макс» кириллицей, возраст 2–11`

> Регламент: каждая секция — отдельный коммит `content(<section>): ...`. После каждого пакета 3–4 коммитов — обновление `PROGRESS.md` и `DECISIONS.md`.

#### Фаза 3 — Сопутствующие задачи (параллельно или после фазы 2)

- [ ] Обновить контент-коллекцию `team` (5 ключевых + новые роли)
- [ ] Расширить `SocialIcons` — добавить VK в режим `contacts` (3 иконки вместо 2)
- [ ] Обновить `RatingBadge` — двойной рейтинг (Яндекс.Карты 4.7 + 2ГИС 5.0)
- [ ] Перевести SVG логотипа (variants, светлая версия для footer) — задача Дмитрию

#### Фаза 4 — Финальная проверка после рефакторинга

- [ ] Повторный замер Lighthouse на стейджинге (ожидаем сохранение 79/82 или улучшение)
- [ ] Визуальный QA всех 16 секций на трёх брейкпоинтах
- [ ] Согласование с клиентом по pending-контенту (расписания, меню, фото)

---

### ⏭ Post-refactor (следующая сессия / Диалог №5)

**Приоритет 1 — Кастомный домен dobroenachalo.ru** (без www)
- `public/CNAME` с записью `dobroenachalo.ru`
- DNS: A-записи apex на IP GitHub Pages + CNAME `www → dmitya30.github.io`
- HTTPS (Let's Encrypt автоматом)
- GH Actions env: `SITE_URL=https://dobroenachalo.ru`, `SITE_BASE=/`, `PRODUCTION=1`
- Снять `noindex={true}` в `index.astro`

**Приоритет 2 — Yandex.Metrica + 14 целей**
- ID счётчика ждём от клиента
- Код счётчика — целиком готовым сниппетом (Яндекс может не принять кастомно собранный код)
- Интеграция: `BaseLayout.astro` перед `</head>` + `<noscript>`-фоллбэк, ID в `site.ts` или env
- Цели: клики `tel:`, TG, MAX, VK, Я.Карты; CTA «Записаться» по секциям; открытие FAQ; открытие Lightbox; скролл >50%/>75%; время >60с
- Можно ставить ещё на стейджинге

**Приоритет 3 — Post-release**
- Яндекс.Вебмастер + Google Search Console (верификация, sitemap)
- Финальный Lighthouse на проде (ожидаем SEO 66 → 100)
- Опционально: Schema.org Course для AdditionalClasses, dynamic OG image

**Что НЕ в скоупе**
- UTM-метки на внутренних кнопках (внутренние конверсии — через цели Metrica)
- Чат-виджет (отказались)
- Дальнейшая оптимизация Performance (потолок 79/82 принят)

---

### 🚧 Открытые блокеры (v2.0)

**Тексты от клиента**
- Расписание дня в детском саду (3 возрастные группы)
- Меню детского сада (недельное или принципы питания)
- Уточнение по программе SMART CLASS / Ясюкова Л.А.
- Расписание дня в школе
- Подтверждение цен (сад 49 900 предпочтительнее, чем 38 000)
- Состав кружков: подтвердить «Рондо», «Лыжи», «Вокал», существование «Акробатики»
- Статус лицензии на образовательную деятельность

**Фото от клиента**
- Hero (главное фото первого экрана)
- Детский сад (атмосферные)
- Школа (главное + 3 атмосферных, включая wfolio/katyamiseleva)
- Доброе лето (лагерные кадры)
- Philosophy (портрет директора)
- Команда (портреты, ~16 человек)
- School Life (8–12 фото из wfolio и Яндекс.Диска)
- Светлая версия логотипа для индиго-фона Footer

**Юридическое**
- Согласие родителей на использование фото детей (особенно для School Life)
- Согласие педагогов: `team-12.jpg`, `team-13.jpg` (с Диалога №3)

**Техническое от клиента**
- ID Яндекс.Метрики
- Готовый сниппет счётчика Метрики

---

### 🐛 Известные мелочи (приняты, не правим)

- **OfferCards: «скачут» элементы** — оставлено как есть
- **A11y: CTA contrast 4.51:1** — формально AA, цвет согласован
- **A11y: heading order** — намеренное использование `<h3>` для акцентов
- **Embla forced layout 360ms (desktop)** — особенность библиотеки
- **Mobile Performance ~79** — потолок для стэка (16 секций + Embla + Lightbox + iframe-карта)

---

### 📌 Регламент работы

- Каждый подтверждённый шаг → коммит. `PROGRESS.md` и `DECISIONS.md` обновляются раз в 3–4 секции или на смене фазы.
- **Порядок проверки правок:** `pnpm build && pnpm preview` после каждой правки → визуальный QA → коммит. Пуш — пакетами по 2 коммита. Lighthouse-замер на стейджинге отложен до финала проекта.
- **Источники истины (приоритет, v2.0):**
  1. Последние сообщения клиента в чате
  2. Клиентские docx (`SAJT.docx`, `SAJT_Detskiy_sad.docx`, `SAJT_Lager.docx`)
  3. Внутренние документы: `CONTEXT.md`, `DESIGN.md`, `Blueprint.md`, `texts.md`, `DECISIONS.md`, `site.ts`
  4. Текущий сайт `dobroenachalo.ru`
- **Фактчекинг:** остаётся на клиенте. Используем точные клиентские формулировки даже при стилистических разногласиях.
- **Tailwind 4 цветовые утилиты:** имя класса = `<prefix>-<полное-имя-токена>`. `--color-bg-soft` → `bg-bg-soft`, **не** `bg-soft`.
- **Запрещённые слова (v2.0):** «лагерь» (только «лето»/«смены»), «формат», «кислород», «шумный двор», «бор/сосны», «МЦД», «380 м», «Альтики», «АльтСкул», «Альткэмп», триада «Выготский — Эльконин — Давыдов», «готовку на территории», «без телефонов и компьютеров» (мягче).

## Резюме диалога №1 (для оркестратора)

**Дата:** 2026-05-16
**Длительность:** один сеанс
**Репозиторий:** github.com/dmitya30/dobroenachalo-landing (публичный)
**Стейджинг:** https://dmitya30.github.io/dobroenachalo-landing/

### Что сделано

Развёрнут production-ready каркас лендинга на Astro 6.3 + Tailwind 4 + TypeScript strict, с автоматическим деплоем на GitHub Pages через Actions.

**Инфраструктура:** Node 22, pnpm 11.1.2, gh CLI настроен как git credential helper.

**Astro-проект:** static output, `site` и `base` через переменные окружения (на стейджинге `/dobroenachalo-landing`, перед релизом переключим на корень `dobroenachalo.ru`), sitemap-интеграция готова.

**Структура каталогов** по Blueprint раздел 2, с поправкой на Astro 6 (конфиг коллекций в `src/content.config.ts`, а не в `src/content/config.ts`). Добавлены секции `assets/philosophy` и `assets/classes`.

**Дизайн-токены:** в `src/styles/global.css` через Tailwind 4 `@theme`. Палитра, семантические алиасы, типографика с `clamp()` для адаптивных заголовков, радиусы, тени, focus-visible, `prefers-reduced-motion`. Шрифты self-hosted через fontsource (Manrope Variable + Cormorant Garamond 400/600). Точные HEX бренда - временные, ждём брендбук.

**Глобальные данные:** `src/data/site.ts` - единый источник истины. Контакты, адрес (геокоординаты пока null), TG/MAX/VK, рейтинг 4,7/43 с Я.Карт, юр.данные ИП Беляковой получены и вписаны (ИНН 550713957013, ОГРНИП 324508100220667, ИП Белякова И.Ю.). Поля под Метрику оставлены null.

**Layout:** `BaseLayout.astro` с props для title/description/noindex. Сейчас `noindex` по умолчанию `true` - снять перед релизом.

**UI-компоненты (6 шт.):** `Button` (3 варианта, 3 размера, авто-рендер a/button), `Card` (3 фона, опц. hover), `ExpandableBlock` (нативный details/summary, без JS), `SectionHeading` (eyebrow + h2 + lead), `RatingBadge` (потребляет site.rating), `SocialIcons` (TG/MAX/VK с inline SVG). Иконки соцсетей - placeholder, замена на официальные бренд-версии в диалоге №2.

**Контент-коллекции:** 6 коллекций со схемами Zod 4 в `src/content.config.ts` (campSessions, reviews, team, faq, classes, schoolLife) через новый Loader API (`glob`). В каждой папке - `_examples/example.json` для подсматривания структуры (loader их игнорирует). Реального наполнения нет - это задача этапа 2 диалога №2.

**CI/CD:** GitHub Actions workflow `.github/workflows/deploy.yml`, билд на push в main, деплой через actions/deploy-pages@v4. Read pnpm version из `packageManager` в `package.json` (одна точка истины). Tested end-to-end - четыре зелёных run.

### Открытые блокеры (унаследованы из Blueprint)

Ждём от клиента: SVG логотипа в исходнике, точные HEX бренд-цветов, ID Яндекс.Метрики. Геокоординаты школы - можем снять сами с Я.Карт в диалоге №2.

### Технические TODO для релиза (отметить в начале диалога №2)

Перед финальным переключением на custom domain в `astro.config.mjs` убрать `base` (или передать `SITE_BASE=""`) и поменять `site` на `https://dobroenachalo.ru`. В `BaseLayout` снять дефолтный `noindex: true`. В `SocialIcons` заменить placeholder-SVG на официальные бренд-иконки. По домену - возможна смена на новый (старый разраб «ушёл в закат»), решение в финале диалога №2.

### Расхождения с Blueprint, которые приняли

Astro 5 -> Astro 6 (актуальный мажор на 2026-05). Node 20 -> Node 22 (требование pnpm 11). `src/content/config.ts` -> `src/content.config.ts` (новое расположение в Astro 6). `z` импортируется из `astro/zod`, а не из `astro:content` (deprecation в 6.0). Структура схем коллекций и интерфейс компонентов соответствуют Blueprint.

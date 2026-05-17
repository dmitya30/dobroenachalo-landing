# Доброе Начало — лендинг

Одностраничный сайт частной школы-сада «Доброе Начало» (dobroenachalo.ru).

## Стек

- Astro 6 (static output)
- Tailwind CSS 4 (через @tailwindcss/vite)
- TypeScript strict
- pnpm
- Деплой: GitHub Pages + custom domain

## Локальная разработка

Требования: Node.js 20+ (см. `.nvmrc`), pnpm 10+.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # сборка в dist/
pnpm preview    # локальный preview prod-сборки
```

## Структура

- `src/components/ui/` — переиспользуемые UI-примитивы (Button, Card, ExpandableBlock и т.д.)
- `src/components/sections/` — 16 секций лендинга
- `src/components/islands/` — компоненты с client-side JS (минимум)
- `src/content/` — контент-коллекции (отзывы, команда, FAQ, смены лагеря)
- `src/data/site.ts` — глобальные константы (контакты, ссылки)
- `src/layouts/BaseLayout.astro` — общий layout
- `src/assets/` — оптимизируемые изображения (обрабатываются `astro:assets`)
- `src/icons/` — кастомные SVG
- `src/styles/global.css` — Tailwind + дизайн-токены
- `raw-assets/` — локальные исходники, **не в git**

## Документы проекта

Все ключевые документы — в `docs/`:

- `docs/CONTEXT.md` — бизнес-контекст, ЦА, цены, контакты, юр. данные
- `docs/Blueprint.md` — архитектура проекта, карта компонентов, SEO/CI/CD
- `docs/texts.md` — тексты 16 секций лендинга
- `docs/Handoff.md` — план диалога №2 (фронтенд-разработка)
- `docs/Dialog-1.md` — резюме диалога №1 (каркас)
- `docs/DESIGN.md` — дизайн-контракт (палитра, типографика, компоненты)
- `docs/PROGRESS.md` — журнал прогресса (обновляется каждым коммитом)
- `docs/DECISIONS.md` — журнал принятых решений

## Деплой

Push в `main` → GitHub Actions → GitHub Pages (custom domain).

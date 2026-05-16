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

Бизнес-контекст, тексты, дизайн-токены — в отдельных документах вне репозитория (CONTEXT.md, Texts, Blueprint).

## Деплой

Push в `main` → GitHub Actions → GitHub Pages (custom domain).

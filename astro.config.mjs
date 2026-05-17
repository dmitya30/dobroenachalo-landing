// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// На время разработки сайт публикуется в подпапку
// dmitya30.github.io/dobroenachalo-landing/.
// Перед переездом на custom domain dobroenachalo.ru (корень) — выставить SITE_BASE=""
// или просто убрать переменную в workflow.
const SITE_BASE = process.env.SITE_BASE ?? '/dobroenachalo-landing';
const SITE_URL = process.env.SITE_URL ?? 'https://dmitya30.github.io';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  output: 'static',
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});

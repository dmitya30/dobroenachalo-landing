// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Стейджинг: dmitya30.github.io/dobroenachalo-landing/
// Прод: dobroenachalo.ru/ — выставить в GH Actions env:
//   SITE_URL=https://dobroenachalo.ru
//   SITE_BASE=/
const SITE_BASE = process.env.SITE_BASE ?? '/dobroenachalo-landing/';
const SITE_URL = process.env.SITE_URL ?? 'https://dmitya30.github.io';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },
});

import type { APIRoute } from 'astro';

/**
 * Динамический robots.txt.
 *
 * Логика:
 * - Если переменная окружения PRODUCTION=1 — разрешаем индексацию
 *   (релизный режим, домен dobroenachalo.ru).
 * - Иначе — запрещаем индексацию полностью (стейджинг dmitya30.github.io).
 *
 * Дополнительно во всех случаях указываем ссылку на sitemap.
 */
export const GET: APIRoute = ({ site }) => {
  const isProd = process.env.PRODUCTION === '1';
  // site = https://dmitya30.github.io (без base), base = /dobroenachalo-landing/
  // На проде base = '/' → склейка даёт правильный URL в обоих случаях.
  const sitemapURL = new URL(
    `${import.meta.env.BASE_URL}sitemap-index.xml`,
    site
  ).toString();

  const body = isProd
    ? `User-agent: *
Allow: /

Sitemap: ${sitemapURL}
`
    : `# Staging environment — indexing forbidden
User-agent: *
Disallow: /

Sitemap: ${sitemapURL}
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

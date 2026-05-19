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
  const sitemapURL = new URL('sitemap-index.xml', site).toString();

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

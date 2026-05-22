import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Контент-коллекции для лендинга «Доброе Начало».
 * Astro 6 Content Layer API: каждая коллекция использует glob-loader,
 * наполнение — JSON-файлы в src/content/<collection>/.
 *
 * Наполнение коллекций — этап 2 диалога №2.
 */

const campSessions = defineCollection({
  loader: glob({ pattern: '[^_]*.json', base: './src/content/camp-sessions' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    dateStart: z.string(), // ISO "2026-06-01"
    dateEnd: z.string(),
    month: z.enum(['june', 'july', 'august']),
    description: z.string(),
    highlights: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '[^_]*.json', base: './src/content/reviews' }),
  schema: z.object({
    author: z.string(),
    role: z.string().optional(), // "мама ученика 2 класса" — по возможности
    text: z.string(),
    rating: z.number().min(1).max(5).default(5),
    source: z.enum(['yandex', '2gis', 'vk', 'direct']),
    /** В основной слайдер (длинные цитаты) */
    featured: z.boolean().default(false),
    /** В облако коротких цитат под слайдером */
    short: z.boolean().default(false),
    date: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '[^_]*.json', base: './src/content/team' }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
	/** Цитата для featured-карточек */
    quote: z.string().optional(),
    photo: z.string().optional(),
    /** В 4 ключевых на первом экране */
    featured: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '[^_]*.json', base: './src/content/faq' }),
  schema: z.object({
    order: z.number(),
    question: z.string(),
    answer: z.string(),
  }),
});

const classes = defineCollection({
  loader: glob({ pattern: '[^_]*.json', base: './src/content/classes' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    icon: z.string().optional(),
    ageRange: z.string(),
    trainer: z.string().optional(),
    schedule: z.string(),
    pricing: z.object({
      trial: z.string().optional(), // "бесплатно" или "1 000 ₽"
      single: z.string(),           // разовое
      package: z.string().optional(), // абонемент
    }),
    description: z.string().optional(),
  }),
});

const schoolLife = defineCollection({
  loader: glob({ pattern: '[^_]*.json', base: './src/content/school-life' }),
  schema: z.object({
    order: z.number(),
    image: z.string(),
    caption: z.string(),
    /** Сезон/событие для группировки */
    tag: z.string().optional(),
  }),
});

export const collections = {
  campSessions,
  reviews,
  team,
  faq,
  classes,
  schoolLife,
};

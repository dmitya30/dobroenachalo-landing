/**
 * Глобальные константы сайта.
 * Единый источник истины для контактов, соцссылок, юр. данных.
 * Используется в Header, Hero, Contacts, Footer, schema.org JSON-LD.
 */

export const site = {
  // --- Основные ---
  name: 'Доброе Начало',
  tagline: 'Частная семейная школа-сад',
  description:
    'Частная школа-сад в сосновом лесу, 380 м от МЦД «Нахабино Ясное». Классы до 10 детей, программа Выготского — Эльконина — Давыдова.',
  url: 'https://dobroenachalo.ru',

  // --- Контакты ---
  phone: {
    display: '+7 985 854-36-55',
    href: 'tel:+79858543655',
    raw: '+79858543655',
  },

  // --- Адрес ---
  address: {
    street: 'ул. Пограничная, 12',
    locality: 'деревня Чёрная',
    region: 'Московская область',
    district: 'г.о. Истра',
    postalCode: '',
    country: 'RU',
    nearestStation: 'МЦД «Нахабино Ясное», 380 м',
    // Геокоординаты: уточнить по Яндекс.Картам, подставим перед релизом
    geo: {
      latitude: 55.843212 as number | null,
      longitude: 37.132762 as number | null,
    },
    // Ссылка на Яндекс.Карты — для блока «Контакты» и социального пруфа
    yandexMapsUrl:
      'https://yandex.ru/maps/org/dobroye_nachalo/50312189561/',
  },

  // --- Социальные сети и мессенджеры ---
  social: {
    telegram: {
      label: 'Telegram',
      contact: 'https://t.me/dobroe_nachalo',
      channel: 'https://t.me/dobroenachalonahabino',
    },
    max: {
      label: 'MAX',
      url: 'https://max.ru/u/f9LHodD0cOJ4Y3AtgQvYoXjm-YAA_IqHlBGy76RYA6iWgx2XcoGmcgouxYc',
    },
    vk: {
      label: 'VK',
      url: 'https://vk.ru/dobroenachalo.nahabino',
    },
  },

  // --- Социальное доказательство ---
  rating: {
    value: 4.7,
    count: 43,
    bestRating: 5,
    source: 'Яндекс.Карты',
    sourceUrl:
      'https://yandex.ru/maps/org/dobroye_nachalo/50312189561/reviews/',
  },

  // --- Юр. данные (опционально, ждём от клиента) ---
  legal: {
    inn: '550713957013',
    ogrnip: '324508100220667',
    fullName: 'Индивидуальный предприниматель Белякова Ирина Юрьевна', // полное юр. наименование
  },

  // --- Аналитика (заполнится в диалоге №2) ---
  analytics: {
    yandexMetricaId: null as number | null,
  },

  // --- Возрастной диапазон (для Hero-плашек и schema.org) ---
  ageRange: {
    from: 2.5,
    to: 11,
  },

  // --- SEO / Open Graph ---
  seo: {
    locale: 'ru_RU',
    themeColor: '#FF9664',
    ogImage: '/og-image.jpg', // 1200x630, public/og-image.jpg
    ogImageWidth: 1200,
    ogImageHeight: 630,
    keywords: [
      'частная школа Нахабино',
      'детский сад деревня Чёрная',
      'частная школа-сад Истра',
      'школа Павловы Озёра',
      'программа Эльконина Давыдова',
      'летний лагерь Подмосковье 2026',
      'Доброе Начало Нахабино',
    ],
  },

  // --- Часы работы (для schema.org openingHoursSpecification) ---
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],

  // --- Основание организации ---
  foundingDate: '2025', // год ребрендинга «Альт» → «Доброе Начало»
} as const;

export type Site = typeof site;

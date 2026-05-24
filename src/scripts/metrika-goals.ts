/**
 * Метрика-цели: 15 шт.
 * Делегирование событий на document — работает на любых динамически отрисованных элементах.
 * Подключается из BaseLayout как отдельный <script>.
 */

declare global {
  interface Window {
    ym: (id: number, action: string, ...args: unknown[]) => void;
  }
}

const METRIKA_ID = 109277739;

function reachGoal(name: string): void {
  if (typeof window.ym === 'function') {
    window.ym(METRIKA_ID, 'reachGoal', name);
  }
}

// --- Цели 1–5: клики по каналам связи (делегирование) ---
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const link = target.closest('a') as HTMLAnchorElement | null;
  if (!link) return;

  const href = link.getAttribute('href') ?? '';

  if (href.startsWith('tel:'))                   reachGoal('click_phone');
  else if (href.includes('t.me/'))               reachGoal('click_telegram');
  else if (href.includes('max.ru/'))             reachGoal('click_max');
  else if (href.includes('vk.ru/') || href.includes('vk.com/')) reachGoal('click_vk');
  else if (href.includes('yandex.ru/maps'))      reachGoal('click_yandex_maps');

  // --- Цели 6–10: CTA по секциям (data-goal на Button) ---
  const goalEl = target.closest('[data-goal]') as HTMLElement | null;
  if (goalEl) {
    const goal = goalEl.dataset.goal;
    if (goal) reachGoal(goal);
  }
});

// --- Цель 11: открытие FAQ (любого <details> в секции #faq) ---
const faq = document.getElementById('faq');
if (faq) {
  const faqOpened = new WeakSet<HTMLDetailsElement>();
  faq.addEventListener('toggle', (e) => {
    const det = e.target as HTMLDetailsElement;
    if (det.tagName !== 'DETAILS' || !det.open || faqOpened.has(det)) return;
    faqOpened.add(det);
    reachGoal('faq_open');
  }, true);
}

// --- Цель 12: открытие lightbox SchoolLife ---
// (см. правку в SchoolLife.astro — там добавлен вызов reachGoal в функции openAt)

// --- Цели 13–14: скролл >50% и >75% ---
const scrollMarks: Array<{ threshold: number; goal: string; fired: boolean }> = [
  { threshold: 0.5,  goal: 'scroll_50', fired: false },
  { threshold: 0.75, goal: 'scroll_75', fired: false },
];

function checkScroll() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return;
  const ratio = scrollY / docHeight;

  for (const mark of scrollMarks) {
    if (!mark.fired && ratio >= mark.threshold) {
      mark.fired = true;
      reachGoal(mark.goal);
    }
  }

  if (scrollMarks.every((m) => m.fired)) {
    window.removeEventListener('scroll', onScroll);
  }
}

let scrollRaf = 0;
function onScroll() {
  if (scrollRaf) return;
  scrollRaf = window.requestAnimationFrame(() => {
    scrollRaf = 0;
    checkScroll();
  });
}
window.addEventListener('scroll', onScroll, { passive: true });

// --- Цель 15: время на странице > 60 с (только активная вкладка) ---
let timeSpent = 0;
let timeInterval: number | null = null;
let timeFired = false;

function startTimer() {
  if (timeFired || timeInterval !== null) return;
  timeInterval = window.setInterval(() => {
    timeSpent += 1;
    if (timeSpent >= 60 && !timeFired) {
      timeFired = true;
      reachGoal('time_60s');
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  if (timeInterval !== null) {
    clearInterval(timeInterval);
    timeInterval = null;
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') startTimer();
  else stopTimer();
});

if (document.visibilityState === 'visible') startTimer();

export {}; // make this a module

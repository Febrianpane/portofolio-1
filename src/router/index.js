import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PortfolioView from "../views/PortfolioView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Portfolio" },
  },
  // Redirect old routes to home with hash
  {
    path: "/about",
    redirect: "/#about",
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: PortfolioView,
    meta: { title: "Portfolio" },
  },
  {
    path: "/contact",
    redirect: "/#contact",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return new Promise((resolve) => {
        let tries = 0;
        const maxTries = 60; // ~3s
        const intervalMs = 50;
        const attempt = () => {
          const el = document.querySelector(to.hash);
          if (el) {
            const vw = window.innerWidth;
            const nav = document.querySelector('nav');
            const navHeight = vw < 480 ? 168 : (vw < 640 ? 148 : (vw < 768 ? 124 : (nav && nav.offsetHeight ? nav.offsetHeight : 80)));
            const targetEl = el.querySelector('[data-scroll-target]') || el;
            const desiredGap = -96;
            const top = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight + desiredGap;
            resolve({ left: 0, top, behavior: 'smooth' });
          } else if (tries++ < maxTries) {
            setTimeout(attempt, intervalMs);
          } else {
            resolve({ left: 0, top: 0 });
          }
        };
        attempt();
      });
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + " - Febrian Pane";
  next();
});

// Fallback: after navigation, if there's a hash, perform an offset scroll with smooth behavior
router.afterEach((to) => {
  if (!to.hash) return;
  // Delay to ensure view is rendered
  let tries = 0;
  const maxTries = 60; // up to ~3s
  const intervalMs = 50;
  const scrollWithOffset = () => {
    const el = document.querySelector(to.hash);
    if (!el) {
      if (tries++ < maxTries) return setTimeout(scrollWithOffset, intervalMs);
      return;
    }
    const vw = window.innerWidth;
    const nav = document.querySelector('nav');
    const navHeight = vw < 480 ? 168 : (vw < 640 ? 148 : (vw < 768 ? 124 : (nav && nav.offsetHeight ? nav.offsetHeight : 80)));
    const targetEl = el.querySelector('[data-scroll-target]') || el;
    const desiredGap = -96;
    const top = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight + desiredGap;
    window.scrollTo({ top, left: 0, behavior: 'smooth' });
  };
  setTimeout(scrollWithOffset, intervalMs);
});

export default router;

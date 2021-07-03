import { createRouter, createWebHistory } from "@ionic/vue-router";
import ClocksPage from "../pages/ClocksPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/clocks",
  },
  {
    path: "/clocks",
    name: "Clocks",
    component: ClocksPage,
  },
  {
    path: "/clocks/add",
    component: () => import("../pages/AddClockPage.vue"),
  },
  {
    path: "/clocks/:id/update",
    component: () => import("../pages/UpdateClockPage.vue"),
  },
  {
    path: "/clocks/:id/analytics",
    component: () => import("../pages/ClockAnalyticsPage.vue"),
  },
  {
    path: "/clocks/:id",
    // lazy loading
    component: () => import("../pages/ClockDetailsPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

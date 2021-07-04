import { createRouter, createWebHistory } from "@ionic/vue-router";
import ClocksPage from "../pages/ClocksPage.vue";
import AddClockPage from "../pages/AddClockPage.vue"
import UpdateClockPage from "../pages/UpdateClockPage.vue"
import ClockAnalyticsPage from "../pages/ClockAnalyticsPage.vue"
import ClockDetailsPage from "../pages/ClockDetailsPage.vue"

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
    component: AddClockPage,
  },
  {
    path: "/clocks/:id/update",
    component: UpdateClockPage,
  },
  {
    path: "/clocks/:id/analytics",
    component: ClockAnalyticsPage,
  },
  {
    path: "/clocks/:id",
    component: ClockDetailsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

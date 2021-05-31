import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/room/:id",
    name: "Room",
    component: () => import("../views/Room.vue"),
  },
  {
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;

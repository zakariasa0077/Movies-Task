import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/HomeView.vue"),
  },
  {
    path: "/add",
    name: "addMovie",
    component: () =>
      import(/* webpackChunkName: "add" */ "../views/addMovie.vue"),
  },
  {
    path: "/edit/:id",
    name: "editMovie",
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/editMovie.vue"),
  },
  {
    path: "/movie/:id",
    name: "showMovie",
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/showMovie.vue"),
  },
  {
    path: "/actors",
    name: "actors",
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/actors.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

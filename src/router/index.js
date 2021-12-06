import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import UplaodData from "../views/UploadData.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  { path: "/upload-data", component: UplaodData },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

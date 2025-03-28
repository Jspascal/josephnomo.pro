import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeSection.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutSection.vue"),
    },
    {
      path: "/skills",
      name: "skills",
      component: () => import("@/views/SkillsSection.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("@/views/ProjectsSection.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/views/BlogSection.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactSection.vue"),
    },
  ],
});

export default router;

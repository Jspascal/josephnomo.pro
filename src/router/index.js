import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeSection.vue";
import About from "../views/AboutSection.vue";
import Skills from "../views/SkillsSection.vue";
import Projects from "../views/ProjectsSection.vue";
import Experience from "../views/ExperienceSection.vue";
import Contact from "../views/ContactSection.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/skills",
    name: "Skills",
    component: Skills,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/experience",
    name: "Experience",
    component: Experience,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

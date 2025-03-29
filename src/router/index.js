import { createRouter, createWebHistory } from "vue-router";

// Use dynamic imports for code splitting
const HomeSection = () => import("@/sections/HomeSection.vue");
const AboutSection = () => import("@/sections/AboutSection.vue");
const SkillsSection = () => import("@/sections/SkillsSection.vue");
const ProjectsSection = () => import("@/sections/ProjectsSection.vue");
const ExperienceSection = () => import("@/sections/ExperienceSection.vue");
const BlogSection = () => import("@/sections/BlogSection.vue");
const ArticleView = () => import("@/views/ArticleView.vue");
const ContactSection = () => import("@/sections/ContactSection.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeSection,
  },
  {
    path: "/about",
    name: "About",
    component: AboutSection,
  },
  {
    path: "/skills",
    name: "Skills",
    component: SkillsSection,
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsSection,
  },
  {
    path: "/experience",
    name: "Experience",
    component: ExperienceSection,
  },
  {
    path: "/blog",
    name: "Blog",
    component: BlogSection,
    meta: { transition: "fade" },
  },
  {
    path: "/blog/:slug",
    name: "ArticleDetail",
    component: ArticleView,
    props: true,
    meta: { transition: "fade" },
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactSection,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;

import { createApp } from "vue";
import { createHead, useHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

const app = createApp(App);
const head = createHead();

app.use(head);
app.use(router);

app.provide(
  "useHead",
  useHead({
    title: "Joseph Nomo - Backend Developer & System Engineer",
    meta: [
      {
        name: "description",
        content: "Portfolio and technical articles by Joseph Nomo",
      },
      {
        property: "og:title",
        content: "Joseph Nomo - Backend Developer & System Engineer",
      },
      {
        property: "og:description",
        content: "Portfolio and technical articles by Joseph Nomo",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  })
);

app.mount("#app");

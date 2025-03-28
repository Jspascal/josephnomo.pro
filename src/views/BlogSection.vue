<template>
  <section class="portfolio">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-prefix">~/</span>portfolio
        </h2>
        <p class="section-description">
          Technical articles and case studies from my experience
        </p>
      </div>

      <div class="articles-grid">
        <article-card
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
          @click="openArticle(article)"
        />
      </div>

      <article-modal
        v-if="selectedArticle"
        :article="selectedArticle"
        @close="closeArticle"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import ArticleCard from "@/components/ArticleCard.vue";
import ArticleModal from "@/components/ArticleModal.vue";
import { onMounted } from "vue";
import { generateSEOMeta } from "@/services/seo";
import { useHead } from "@vueuse/head";
import { articlesData } from "@/data/articles";

const selectedArticle = ref(null);
const articles = ref(articlesData);

watch(selectedArticle, (article) => {
  useHead(generateSEOMeta(article));
});

const openArticle = (article) => {
  selectedArticle.value = article;
  document.body.classList.add("no-scroll");
};

const closeArticle = () => {
  selectedArticle.value = null;
  document.body.classList.remove("no-scroll");
};

onMounted(() => {
  document.title = "Portfolio - My Awesome Site";
});
</script>

<style scoped>
.portfolio {
  padding: 2rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-family: "Fira Code", monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: inline-block;
}

.title-prefix {
  color: var(--accent-primary);
}

.section-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>

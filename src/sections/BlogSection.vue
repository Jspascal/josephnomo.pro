<template>
  <section class="blog">
    <div class="container">
      <section-header
        title="blog"
        description="Technical articles and case studies from my experience"
      />

      <div v-if="loading" class="loading-container">
        <loading-spinner message="Loading articles..." />
      </div>

      <div v-else class="articles-grid">
        <router-link
          v-for="article in articles"
          :key="article.id"
          :to="{
            name: 'ArticleDetail',
            params: { slug: getArticleSlug(article) },
          }"
          class="article-link"
        >
          <article-card :article="article" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ArticleCard from "@/components/ArticleCard.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import { articlesData } from "@/data/articles";
import { generateSEOMeta } from "@/services/seo";
import { useHead } from "@vueuse/head";
import { slugify } from "@/utils/slug";

const articles = ref([]);
const loading = ref(true);

const getArticleSlug = (article) => {
  return slugify(article.title);
};

onMounted(async () => {
  useHead(generateSEOMeta(null));
  document.title = "Blog - Joseph Nomo";

  setTimeout(() => {
    articles.value = articlesData;
    loading.value = false;
  }, 300);
});
</script>

<style scoped>
.blog {
  padding: 2rem 0;
  min-height: 60vh;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.article-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>

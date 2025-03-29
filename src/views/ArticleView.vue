<template>
  <section class="article-detail">
    <div v-if="loading" class="loading-container">
      <loading-spinner message="Loading article..." />
    </div>

    <div v-else-if="article" class="container">
      <div class="article-header">
        <router-link to="/blog" class="back-link">
          <arrow-left-icon class="back-icon" />
          Back to Articles
        </router-link>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <div class="article-date">{{ article.date }}</div>
          <div class="article-tags">
            <span
              v-for="(tag, index) in article.tags"
              :key="index"
              class="article-tag"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div class="article-image-container">
        <lazy-image
          :src="article.image"
          :alt="article.title"
          :aspect-ratio="56.25"
        />
      </div>

      <div class="article-content" v-html="formattedContent"></div>

      <div class="article-footer">
        <div class="share-section">
          <h3 class="share-title">Share this article</h3>
          <div class="share-buttons">
            <a
              :href="twitterShareUrl"
              target="_blank"
              class="share-button twitter-share"
            >
              <twitter-icon class="share-icon" />
              Twitter
            </a>
            <a
              :href="linkedinShareUrl"
              target="_blank"
              class="share-button linkedin-share"
            >
              <linkedin-icon class="share-icon" />
              LinkedIn
            </a>
          </div>
        </div>

        <router-link to="/blog" class="more-articles-link">
          <arrow-left-icon class="back-icon" />
          View more articles
        </router-link>
      </div>
    </div>

    <div v-else class="not-found container">
      <h2>Article not found</h2>
      <p>The article you're looking for doesn't exist or has been removed.</p>
      <router-link to="/blog" class="back-link">
        <arrow-left-icon class="back-icon" />
        Back to Articles
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import { ArrowLeftIcon, TwitterIcon, LinkedinIcon } from "lucide-vue-next";
import { articlesData } from "@/data/articles";
import { generateSEOMeta } from "@/services/seo";
import { useHead } from "@vueuse/head";
import { getArticleBySlug } from "@/utils/slug";
import LazyImage from "@/components/common/LazyImage.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

const route = useRoute();
const slug = computed(() => route.params.slug);
const loading = ref(true);
const articleData = ref(null);

const article = computed(() => {
  return articleData.value;
});

const formattedContent = computed(() => {
  if (!article.value) return "";
  return marked(article.value.content);
});

const currentUrl = computed(() => {
  return `${window.location.origin}/blog/${slug.value}`;
});

const twitterShareUrl = computed(() => {
  if (!article.value) return "";
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    article.value.title
  )}&url=${encodeURIComponent(currentUrl.value)}`;
});

const linkedinShareUrl = computed(() => {
  if (!article.value) return "";
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    currentUrl.value
  )}`;
});

const loadArticle = async () => {
  loading.value = true;

  setTimeout(() => {
    articleData.value = getArticleBySlug(articlesData, slug.value);
    loading.value = false;

    if (articleData.value) {
      useHead(generateSEOMeta(articleData.value));
      document.title = `${articleData.value.title} - Joseph Nomo's Blog`;
    }
  }, 300);
};

watch(slug, () => {
  loadArticle();
});

onMounted(() => {
  loadArticle();
});
</script>

<style scoped>
.article-detail {
  padding: 2rem 0 4rem;
  min-height: 80vh;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.article-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--accent-primary);
  font-family: "Fira Code", monospace;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
  text-decoration: none;
}

.back-link:hover {
  color: var(--accent-secondary);
}

.back-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.article-title {
  font-family: "Fira Code", monospace;
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.article-date {
  font-family: "Fira Code", monospace;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.article-tag {
  font-family: "Fira Code", monospace;
  font-size: 0.75rem;
  color: var(--accent-primary);
  background-color: var(--bg-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.article-image-container {
  margin-bottom: 2.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-content {
  color: var(--text-primary);
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4),
.article-content :deep(h5),
.article-content :deep(h6) {
  font-family: "Fira Code", monospace;
  color: var(--text-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content :deep(h1) {
  font-size: 2rem;
}

.article-content :deep(h2) {
  font-size: 1.75rem;
}

.article-content :deep(h3) {
  font-size: 1.5rem;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}

.article-content :deep(pre) {
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
}

.article-content :deep(code) {
  font-family: "Fira Code", monospace;
  background-color: var(--bg-secondary);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.article-content :deep(pre code) {
  padding: 0;
  background-color: transparent;
}

.article-content :deep(blockquote) {
  border-left: 4px solid var(--accent-primary);
  padding-left: 1.5rem;
  margin-left: 0;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
}

.article-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.article-content :deep(th),
.article-content :deep(td) {
  border: 1px solid var(--border-color);
  padding: 0.75rem;
  text-align: left;
}

.article-content :deep(th) {
  background-color: var(--bg-secondary);
  font-weight: 600;
}

.article-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.share-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.share-title {
  font-family: "Fira Code", monospace;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.share-buttons {
  display: flex;
  gap: 1rem;
}

.share-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s;
}

.share-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.twitter-share {
  background-color: #1da1f2;
  color: white;
}

.twitter-share:hover {
  background-color: #0c85d0;
}

.linkedin-share {
  background-color: #0a66c2;
  color: white;
}

.linkedin-share:hover {
  background-color: #084e96;
}

.more-articles-link {
  display: inline-flex;
  align-items: center;
  color: var(--accent-primary);
  font-family: "Fira Code", monospace;
  transition: color 0.2s;
  text-decoration: none;
}

.more-articles-link:hover {
  color: var(--accent-secondary);
}

.not-found {
  padding: 4rem 0;
  text-align: center;
}

.not-found h2 {
  font-family: "Fira Code", monospace;
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 2rem;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

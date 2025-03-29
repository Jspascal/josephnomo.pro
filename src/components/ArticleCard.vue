<template>
  <div class="article-card">
    <div class="article-image">
      <lazy-image
        :src="article.image"
        :alt="article.title"
        :aspect-ratio="56.25"
      />
    </div>
    <div class="article-content">
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="article-date">{{ article.date }}</p>
      <p class="article-summary">{{ article.summary }}</p>
      <div class="article-tags">
        <span
          v-for="(tag, index) in article.tags"
          :key="index"
          class="article-tag"
        >
          #{{ tag }}
        </span>
      </div>
      <div class="article-read-more">
        <span class="read-more-text">Read more</span>
        <span class="read-more-icon">→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import LazyImage from "@/components/common/LazyImage.vue";
import { defineProps } from "vue";

defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.article-card {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.article-image {
  width: 100%;
  overflow: hidden;
}

.article-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.article-title {
  font-family: "Fira Code", monospace;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  line-height: 1.4;
}

.article-date {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.article-summary {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.article-tag {
  font-family: "Fira Code", monospace;
  font-size: 0.75rem;
  color: var(--accent-primary);
  background-color: var(--bg-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.article-read-more {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: var(--accent-primary);
}

.read-more-icon {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.article-card:hover .read-more-icon {
  transform: translateX(5px);
}
</style>

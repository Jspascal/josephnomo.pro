<template>
  <div class="article-card" @click="$emit('click')">
    <div class="terminal-card">
      <div class="card-header">
        <span class="command">$ cat article_preview.md</span>
      </div>
      <div class="card-content">
        <div class="article-image">
          <img :src="article.image" :alt="article.title" />
        </div>
        <h3 class="article-title">{{ article.title }}</h3>
        <div class="article-meta">
          <span class="article-date">{{ article.date }}</span>
        </div>
        <p class="article-summary">{{ article.summary }}</p>
        <div class="article-tags">
          <span v-for="(tag, index) in article.tags" :key="index" class="article-tag">
            #{{ tag }}
          </span>
        </div>
        <div class="article-read-more">
          <span class="read-more-text">Read more</span>
          <arrow-right-icon class="read-more-icon" size="16" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { ArrowRightIcon } from 'lucide-vue-next';

defineProps({
  article: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);
</script>

<style scoped>
.article-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.article-card:hover {
  transform: translateY(-5px);
}

.terminal-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  background-color: var(--bg-secondary);
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.command {
  font-family: 'Fira Code', monospace;
  color: var(--accent-primary);
  font-size: 0.875rem;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.article-image {
  margin-bottom: 1.25rem;
  border-radius: 0.375rem;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.article-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.article-meta {
  margin-bottom: 1rem;
}

.article-date {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-family: 'Fira Code', monospace;
}

.article-summary {
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
  line-height: 1.6;
  flex-grow: 1;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.article-tag {
  font-family: 'Fira Code', monospace;
  font-size: 0.75rem;
  color: var(--accent-primary);
  background-color: var(--bg-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.article-read-more {
  display: flex;
  align-items: center;
  color: var(--accent-primary);
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  margin-top: auto;
}

.read-more-text {
  margin-right: 0.5rem;
}

.read-more-icon {
  transition: transform 0.2s;
}

.article-card:hover .read-more-icon {
  transform: translateX(3px);
}
</style>

<template>
  <div class="article-modal-overlay" @click="$emit('close')">
    <div class="article-modal" @click.stop>
      <div class="modal-header">
        <h2>{{ article.title }}</h2>
      </div>
      
      <div class="modal-content">
        <div class="article-meta">
          <span class="article-date">{{ article.date }}</span>
          <span class="article-read-time">{{ article.readTime }}</span>
        </div>
        
        <div class="article-content markdown-body" v-html="formattedContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, onMounted } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import 'github-markdown-css';

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);

marked.setOptions({
  highlight: (code, language) => {
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(code, { language }).value;
      } catch (err) {
        console.error(err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
});

const formattedContent = computed(() => {
  return marked(props.article.content);
});

onMounted(() => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});
</script>

<style scoped>
.article-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
}

.article-modal {
  background-color: var(--bg-primary);
  border-radius: 0.5rem;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  background-color: var(--bg-secondary);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
  margin-right: 1rem;
}

.terminal-button {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: var(--text-secondary);
  opacity: 0.5;
}

.close-button {
  background-color: #ff5f56;
  opacity: 0.8;
  cursor: pointer;
}

.close-button:hover {
  opacity: 1;
}

.terminal-title {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal-content {
  padding: 2rem;
  overflow-y: auto;
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
  font-family: 'Fira Code', monospace;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.article-tag {
  font-family: 'Fira Code', monospace;
  font-size: 0.75rem;
  color: var(--accent-primary);
  background-color: var(--bg-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.article-content {
  color: var(--text-primary);
  line-height: 1.8;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4),
.article-content :deep(h5),
.article-content :deep(h6) {
  font-family: 'Fira Code', monospace;
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
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
}

.article-content :deep(code) {
  font-family: 'Fira Code', monospace;
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

@media (max-width: 768px) {
  .article-modal-overlay {
    padding: 1rem;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Add styles for code blocks */
:deep(pre) {
  background: var(--bg-secondary);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

:deep(code) {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Style inline code differently from code blocks */
:deep(:not(pre) > code) {
  background: var(--bg-secondary);
  padding: 0.2rem 0.4rem;
  border-radius: 0.3rem;
  font-size: 0.9em;
}

/* Add some spacing between elements */
:deep(pre code) {
  display: block;
  padding: 0;
}

/* Optional: Add a subtle border */
:deep(pre) {
  border: 1px solid var(--border-color);
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

.markdown-body pre {
  background-color: var(--bg-secondary);
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  margin-bottom: 1.5em;
  border: 1px solid var(--border-color);
}

.markdown-body code {
  font-family: 'Fira Code', monospace;
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  border-radius: 3px;
  color: var(--text-primary);
}

.markdown-body pre code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

/* Style inline code differently */
.markdown-body :not(pre) > code {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

/* Language label */
.markdown-body pre > code[class*="language-"] {
  position: relative;
}

.markdown-body pre > code[class*="language-"]::before {
  content: attr(class);
  position: absolute;
  top: -0.5em;
  right: 0.5em;
  font-size: 0.75em;
  color: var(--text-secondary);
  text-transform: uppercase;
}

/* Token colors for light mode */
@media (prefers-color-scheme: light) {
  .hljs-comment,
  .hljs-quote {
    color: #998;
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: #333;
    font-weight: bold;
  }

  .hljs-number,
  .hljs-literal,
  .hljs, 
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: #008080;
  }

  .hljs-string,
  .hljs-doctag {
    color: #d14;
  }

  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: #900;
    font-weight: bold;
  }

  .hljs-type,
  .hljs-class .hljs-title {
    color: #458;
    font-weight: bold;
  }

  .markdown-body {
    color: #24292e; /* GitHub's default text color for light mode */
  }
  
  .article-content :deep(h1),
  .article-content :deep(h2),
  .article-content :deep(h3),
  .article-content :deep(h4),
  .article-content :deep(h5),
  .article-content :deep(h6) {
    color: #24292e;
  }
}

/* Token colors for dark mode */
@media (prefers-color-scheme: dark) {
  .hljs-comment,
  .hljs-quote {
    color: #7f848e;
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: #ff7b72;
  }

  .hljs-number,
  .hljs-literal,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: #79c0ff;
  }

  .hljs-string,
  .hljs-doctag {
    color: #a5d6ff;
  }

  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: #d2a8ff;
    font-weight: bold;
  }

  .hljs-type,
  .hljs-class .hljs-title {
    color: #ff7b72;
    font-weight: bold;
  }

  .markdown-body {
    color: #c9d1d9; /* GitHub's default text color for dark mode */
  }
}

/* Improve link colors */
.markdown-body a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-body a:hover {
  text-decoration: underline;
}

/* Light mode styles */
@media (prefers-color-scheme: light) {
  .modal-header h2 {
    color: #1f2937;
    font-weight: 600;
  }

  .article-meta {
    color: #4b5563;
  }

  .markdown-body {
    color: #1f2937;
  }
  
  .article-content :deep(h1),
  .article-content :deep(h2),
  .article-content :deep(h3),
  .article-content :deep(h4),
  .article-content :deep(h5),
  .article-content :deep(h6) {
    color: #1f2937;
  }

  .article-content :deep(p) {
    color: #374151;
  }

  .article-date,
  .article-read-time {
    color: #6b7280;
  }
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .modal-header h2 {
    color: #f3f4f6;
  }

  .article-meta {
    color: #9ca3af;
  }

  .markdown-body {
    color: #e5e7eb;
  }

  .article-content :deep(h1),
  .article-content :deep(h2),
  .article-content :deep(h3),
  .article-content :deep(h4),
  .article-content :deep(h5),
  .article-content :deep(h6) {
    color: #f3f4f6;
  }

  .article-content :deep(p) {
    color: #d1d5db;
  }

  .article-date,
  .article-read-time {
    color: #9ca3af;
  }
}
</style>

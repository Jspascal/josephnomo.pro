<template>
  <div class="project-card">
    <div class="project-header">
      <h3 class="project-title">{{ project.title }}</h3>
      <div class="project-links">
        <a
          v-if="project.url"
          :href="project.url"
          target="_blank"
          class="project-link"
        >
          <external-link-icon class="link-icon" />
        </a>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          class="project-link"
        >
          <github-icon class="link-icon" />
        </a>
      </div>
    </div>

    <div class="project-content">
      <p class="project-description">{{ project.description }}</p>

      <div class="project-contributions">
        <h4 class="contributions-title">My Contributions:</h4>
        <ul class="contributions-list">
          <li
            v-for="(contribution, contIndex) in project.contributions"
            :key="contIndex"
          >
            <span class="contribution-marker">►</span> {{ contribution }}
          </li>
        </ul>
      </div>
    </div>

    <tech-tags :technologies="project.technologies" />
  </div>
</template>

<script setup>
import { GithubIcon, ExternalLinkIcon } from "lucide-vue-next";
import TechTags from "@/components/common/TechTags.vue";
import { defineProps } from "vue";

defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.project-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%; /* Ensure consistent height */
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.project-title {
  font-family: "Fira Code", monospace;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.project-links {
  display: flex;
  gap: 0.75rem;
}

.project-link {
  color: var(--text-secondary);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--bg-secondary);
}

.project-link:hover {
  color: var(--accent-primary);
  background-color: var(--bg-primary);
}

.link-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.project-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.project-content {
  flex-grow: 1; /* This makes the content take up available space */
  display: flex;
  flex-direction: column;
}

.project-contributions {
  margin-bottom: 1.5rem;
}

.contributions-title {
  font-family: "Fira Code", monospace;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1.5rem;
}

.contributions-title::before {
  content: "$";
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-family: "Fira Code", monospace;
}

.contributions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contributions-list li {
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
}

.contribution-marker {
  color: var(--accent-primary);
  margin-right: 0.75rem;
  flex-shrink: 0;
}
</style>

<template>
  <div class="tech-tags">
    <span v-for="(tech, index) in technologies" :key="index" class="tech-tag">
      {{ tech }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  technologies: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--border-color);
}

.tech-tag {
  background-color: var(--bg-secondary);
  color: var(--accent-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-family: "Fira Code", monospace;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.tech-tag:hover {
  background-color: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
}
</style>

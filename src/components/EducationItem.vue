<template>
  <div class="education-card">
    <div class="edu-period">{{ education.period }}</div>
    <div class="edu-content">
      <h4 class="edu-degree">{{ education.degree }}</h4>
      <div class="edu-school">{{ education.school }}</div>
      <p class="edu-description">{{ education.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  education: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.education-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.education-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.edu-period {
  font-family: "Fira Code", monospace;
  color: var(--accent-primary);
  font-size: 0.875rem;
  white-space: nowrap;
}

.edu-content {
  flex-grow: 1;
}

.edu-degree {
  font-family: "Fira Code", monospace;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.edu-school {
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.edu-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .education-card {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>

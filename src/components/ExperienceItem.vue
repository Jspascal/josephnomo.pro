<template>
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <terminal-card :command="`$ cat ${job.id}.json`">
        <div class="job-header">
          <h3 class="job-title">{{ job.title }}</h3>
          <div class="job-company">
            <span class="company-name">{{ job.company }}</span>
            <span class="job-period">{{ job.period }}</span>
          </div>
          <div class="job-location">{{ job.location }}</div>
        </div>

        <div class="job-description">
          <p>{{ job.description }}</p>

          <div
            v-if="job.responsibilities && job.responsibilities.length"
            class="responsibilities-section"
          >
            <h4 class="section-label">Key Responsibilities:</h4>
            <ul class="responsibility-list">
              <li
                v-for="(item, itemIndex) in job.responsibilities"
                :key="itemIndex"
              >
                <span class="list-marker">➤</span> {{ item }}
              </li>
            </ul>
          </div>

          <div
            v-if="job.achievements && job.achievements.length"
            class="achievements-section"
          >
            <h4 class="section-label">Achievements:</h4>
            <ul class="achievements-list">
              <li
                v-for="(achievement, achievementIndex) in job.achievements"
                :key="achievementIndex"
              >
                <span class="list-marker">►</span> {{ achievement }}
              </li>
            </ul>
          </div>
        </div>

        <tech-tags
          v-if="job.skills && job.skills.length"
          :technologies="job.skills"
        />
      </terminal-card>
    </div>
  </div>
</template>

<script setup>
import TerminalCard from "@/components/common/TerminalCard.vue";
import TechTags from "@/components/common/TechTags.vue";
import { defineProps } from "vue";

defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2.5rem;
  top: 1.5rem;
  width: 1rem;
  height: 1rem;
  background-color: var(--accent-primary);
  border-radius: 50%;
  border: 3px solid var(--bg-primary);
  z-index: 1;
}

.timeline-content {
  padding-left: 2rem;
}

.job-header {
  margin-bottom: 1.5rem;
}

.job-title {
  font-family: "Fira Code", monospace;
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.job-company {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.company-name {
  font-weight: 500;
  color: var(--text-secondary);
}

.job-period {
  font-family: "Fira Code", monospace;
  color: var(--accent-primary);
  font-size: 0.875rem;
}

.job-location {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.job-description {
  margin-bottom: 1.5rem;
}

.job-description p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.section-label {
  font-family: "Fira Code", monospace;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.responsibilities-section,
.achievements-section {
  margin-bottom: 1.5rem;
}

.responsibility-list,
.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsibility-list li,
.achievements-list li {
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
}

.list-marker {
  color: var(--accent-primary);
  margin-right: 0.75rem;
  flex-shrink: 0;
}
</style>

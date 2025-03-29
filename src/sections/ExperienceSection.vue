<template>
  <section class="experience">
    <div class="container">
      <section-header
        title="experience"
        description="My professional journey and work history"
      />

      <div class="timeline">
        <experience-item
          v-for="(job, index) in workExperience"
          :key="index"
          :job="job"
        />
      </div>

      <div class="education-section">
        <h3 class="section-subtitle">Education</h3>

        <div class="education-grid">
          <education-item
            v-for="(edu, index) in education"
            :key="index"
            :education="edu"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import ExperienceItem from "@/components/ExperienceItem.vue";
import EducationItem from "@/components/EducationItem.vue";
import { workExperienceData, educationData } from "@/data/experience";

const workExperience = ref(workExperienceData);
const education = ref(educationData);
</script>

<style scoped>
.experience {
  padding: 2rem 0;
}

.timeline {
  position: relative;
  margin-left: 2rem;
  margin-bottom: 4rem;
}

.timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background-color: var(--border-color);
}

.education-section {
  margin-top: 4rem;
}

.section-subtitle {
  font-family: "Fira Code", monospace;
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (max-width: 992px) {
  .education-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .timeline {
    margin-left: 1rem;
  }
}
</style>

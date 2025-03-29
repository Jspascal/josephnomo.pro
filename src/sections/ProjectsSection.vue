<template>
  <section class="projects">
    <div class="container">
      <section-header
        title="projects"
        description="A selection of my backend and system engineering projects"
      />

      <div class="projects-grid">
        <project-card
          v-for="(project, index) in projects"
          :key="index"
          :project="project"
        />
      </div>

      <div class="github-cta">
        <h3 class="cta-title">More Projects on GitHub</h3>
        <p class="cta-description">
          Check out my GitHub profile for more projects and contributions.
        </p>
        <primary-button href="https://github.com/Jspascal" external>
          <template #icon>
            <github-icon />
          </template>
          View GitHub Profile
        </primary-button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { GithubIcon } from "lucide-vue-next";
import SectionHeader from "@/components/common/SectionHeader.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import PrimaryButton from "@/components/common/PrimaryButton.vue";
import { projectsData } from "@/data/projects";

const projects = ref(projectsData);
</script>

<style scoped>
.projects {
  padding: 2rem 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.github-cta {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  padding: 2.5rem;
  text-align: center;
}

.cta-title {
  font-family: "Fira Code", monospace;
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.cta-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

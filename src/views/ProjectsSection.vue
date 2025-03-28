<template>
  <section class="projects">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-prefix">~/</span>projects
        </h2>
        <p class="section-description">
          A selection of my backend and system engineering projects
        </p>
      </div>

      <div class="projects-grid">
        <div
          class="project-card"
          v-for="(project, index) in projects"
          :key="index"
        >
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

          <div class="project-tech">
            <span
              class="tech-tag"
              v-for="(tech, techIndex) in project.technologies"
              :key="techIndex"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <div class="github-cta">
        <h3 class="cta-title">More Projects on GitHub</h3>
        <p class="cta-description">
          Check out my GitHub profile for more projects and contributions.
        </p>
        <a
          href="https://github.com/Jspascal"
          target="_blank"
          class="btn btn-primary"
        >
          <github-icon class="btn-icon" />
          View GitHub Profile
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { GithubIcon, ExternalLinkIcon } from "lucide-vue-next";
import { projectsData } from "@/data/projects";

const projects = ref(projectsData);
</script>

<style scoped>
.projects {
  padding: 2rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-family: "Fira Code", monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: inline-block;
}

.title-prefix {
  color: var(--accent-primary);
}

.section-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.project-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
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

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--card-border);
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

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-family: "Fira Code", monospace;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background-color: var(--accent-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--accent-secondary);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
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

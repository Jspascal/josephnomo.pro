<template>
  <section class="skills">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-prefix">~/</span>skills
        </h2>
        <p class="section-description">
          My technical expertise and proficiencies
        </p>
      </div>

      <div class="terminal-card main-card">
        <div class="card-header">
          <span class="command">$ ls -la ~/skills</span>
        </div>
        <div class="card-content">
          <div class="skills-grid">
            <div
              class="skill-category"
              v-for="(category, index) in skillCategories"
              :key="index"
            >
              <div class="category-header">
                <component :is="category.icon" class="category-icon" />
                <h3 class="category-title">{{ category.name }}</h3>
              </div>

              <div class="skill-groups">
                <div
                  class="skill-group"
                  v-for="(group, groupIndex) in category.groups"
                  :key="groupIndex"
                >
                  <h4 class="group-title">{{ group.level }}</h4>
                  <div class="skill-tags">
                    <div
                      v-for="(skill, skillIndex) in group.skills"
                      :key="skillIndex"
                      class="skill-tag"
                    >
                      {{ skill }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="terminal-card tools-card">
        <div class="card-header">
          <span class="command">$ cat tools-and-technologies.txt</span>
        </div>
        <div class="card-content">
          <div class="tools-section">
            <div class="tools-grid">
              <div
                v-for="(tool, index) in tools"
                :key="index"
                class="tool-item"
              >
                <span class="tool-name">{{ tool }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="terminal-card workflow-card">
        <div class="card-header">
          <span class="command">$ cat development-workflow.md</span>
        </div>
        <div class="card-content">
          <div class="workflow-section">
            <div class="workflow-steps">
              <div
                class="workflow-step"
                v-for="(step, index) in workflow"
                :key="index"
              >
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-content">
                  <h3 class="step-title">{{ step.title }}</h3>
                  <p class="step-description">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
// import { ServerIcon, DatabaseIcon, GitBranchIcon, TerminalIcon, CodeIcon, GlobeIcon, ExternalLinkIcon } from 'lucide-vue-next';
import { skillCategoriesData, toolsData, workflowData } from "@/data/skills";

const skillCategories = ref(skillCategoriesData);
const tools = ref(toolsData);
const workflow = ref(workflowData);
</script>

<style scoped>
.skills {
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

.terminal-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 2rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.terminal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: var(--bg-secondary);
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--card-border);
}

.command {
  font-family: "Fira Code", monospace;
  color: var(--accent-primary);
  font-size: 0.875rem;
}

.card-content {
  padding: 1.5rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
}

.skill-category {
  display: flex;
  flex-direction: column;
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
}

.category-icon {
  color: var(--accent-primary);
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
}

.category-title {
  font-family: "Fira Code", monospace;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.skill-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skill-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.group-title {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1rem;
}

.group-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.group-title:nth-child(1)::before,
.skill-group:nth-child(1) .group-title::before {
  background-color: #10b981; /* Green for Advanced */
}

.group-title:nth-child(2)::before,
.skill-group:nth-child(2) .group-title::before {
  background-color: #3b82f6; /* Blue for Intermediate */
}

.group-title:nth-child(3)::before,
.skill-group:nth-child(3) .group-title::before {
  background-color: #8b5cf6; /* Purple for Familiar */
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  transition: all 0.2s;
  border-left: 3px solid;
}

.skill-group:nth-child(1) .skill-tag {
  border-left-color: #10b981; /* Green for Advanced */
}

.skill-group:nth-child(2) .skill-tag {
  border-left-color: #3b82f6; /* Blue for Intermediate */
}

.skill-group:nth-child(3) .skill-tag {
  border-left-color: #8b5cf6; /* Purple for Familiar */
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tools-section {
  padding: 0.5rem;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.tool-item {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  transition: all 0.2s;
  border: 1px solid var(--border-color);
}

.tool-item:hover {
  background-color: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
}

/* Workflow Section */
.workflow-section {
  padding: 1rem 0;
}

.workflow-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.workflow-step {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 0.5rem;
  transition: transform 0.2s;
}

.workflow-step:hover {
  transform: translateX(5px);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--accent-primary);
  color: white;
  border-radius: 50%;
  font-family: "Fira Code", monospace;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  flex-grow: 1;
}

.step-title {
  font-family: "Fira Code", monospace;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.step-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 992px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>

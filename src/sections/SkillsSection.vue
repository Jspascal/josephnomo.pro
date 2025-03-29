<template>
  <section class="skills">
    <div class="container">
      <section-header
        title="skills"
        description="My technical expertise and proficiencies"
      />

      <div class="skills-container">
        <!-- Main Skills Categories -->
        <div
          v-for="(category, index) in skillCategories"
          :key="index"
          class="skill-category-card"
        >
          <div class="category-header">
            <component :is="category.icon" class="category-icon" />
            <h3 class="category-title">{{ category.name }}</h3>
          </div>

          <div class="skill-levels">
            <div
              v-for="(group, groupIndex) in category.groups"
              :key="groupIndex"
              class="skill-level"
            >
              <div class="level-header">
                <div
                  class="level-indicator"
                  :class="`level-${group.level.toLowerCase()}`"
                ></div>
                <h4 class="level-title">{{ group.level }}</h4>
              </div>

              <div class="skill-pills">
                <div
                  v-for="(skill, skillIndex) in group.skills"
                  :key="skillIndex"
                  class="skill-pill"
                  :class="`level-${group.level.toLowerCase()}-pill`"
                >
                  {{ skill }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools Section -->
        <div class="tools-section">
          <terminal-card command="$ cat tools-and-technologies.txt">
            <h3 class="tools-title">Tools & Technologies</h3>
            <div class="tools-grid">
              <div
                v-for="(tool, index) in tools"
                :key="index"
                class="tool-item"
              >
                <span class="tool-name">{{ tool }}</span>
              </div>
            </div>
          </terminal-card>
        </div>

        <!-- Workflow Section -->
        <div class="workflow-section">
          <terminal-card command="$ cat development-workflow.md">
            <h3 class="workflow-title">Development Workflow</h3>
            <div class="workflow-timeline">
              <div
                v-for="(step, index) in workflow"
                :key="index"
                class="workflow-step"
              >
                <div class="step-connector" v-if="index > 0"></div>
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-content">
                  <h3 class="step-title">{{ step.title }}</h3>
                  <p class="step-description">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </terminal-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import TerminalCard from "@/components/common/TerminalCard.vue";
import { skillCategoriesData, toolsData, workflowData } from "@/data/skills";

const skillCategories = ref(skillCategoriesData);
const tools = ref(toolsData);
const workflow = ref(workflowData);
</script>

<style scoped>
.skills {
  padding: 2rem 0 4rem;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

/* Make tools and workflow span full width */
.tools-section,
.workflow-section {
  grid-column: 1 / -1;
  margin-top: 1rem;
}

/* Skill Category Cards */
.skill-category-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.skill-category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed var(--border-color);
}

.category-icon {
  color: var(--accent-primary);
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 1rem;
}

.category-title {
  font-family: "Fira Code", monospace;
  font-size: 1.25rem;
  color: var(--text-primary);
  font-weight: 600;
}

/* Skill Levels */
.skill-levels {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
}

.skill-level {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.level-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.level-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

.level-advanced {
  background-color: #10b981; /* Green */
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.level-intermediate {
  background-color: #3b82f6; /* Blue */
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

.level-familiar {
  background-color: #8b5cf6; /* Purple */
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
}

.level-title {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Skill Pills */
.skill-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.skill-pill {
  padding: 0.5rem 0.875rem;
  border-radius: 2rem;
  font-family: "Fira Code", monospace;
  font-size: 0.8125rem;
  transition: all 0.2s;
  cursor: default;
}

.level-advanced-pill {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.level-intermediate-pill {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.level-familiar-pill {
  background-color: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.skill-pill:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.level-advanced-pill:hover {
  background-color: rgba(16, 185, 129, 0.2);
}

.level-intermediate-pill:hover {
  background-color: rgba(59, 130, 246, 0.2);
}

.level-familiar-pill:hover {
  background-color: rgba(139, 92, 246, 0.2);
}

/* Tools Section */
.tools-title,
.workflow-title {
  font-family: "Fira Code", monospace;
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.tool-item {
  background-color: var(--bg-secondary);
  color: var(--accent-primary);
  padding: 0.625rem 1rem;
  border-radius: 0.375rem;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  transition: all 0.2s;
  border: 1px solid var(--border-color);
}

.tool-item:hover {
  background-color: var(--accent-primary);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Workflow Section */
.workflow-timeline {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem 0;
}

.workflow-step {
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  position: relative;
}

.workflow-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 3rem;
  left: 1.25rem;
  width: 2px;
  height: calc(100% - 3rem);
  background-color: var(--accent-primary);
  z-index: 1;
}

.step-connector {
  display: none; /* Remove the old connector */
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
  margin-right: 1.5rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.step-content {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  padding: 1.25rem;
  flex-grow: 1;
  transition: transform 0.2s;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  .skills-container {
    grid-template-columns: 1fr;
  }
}
</style>

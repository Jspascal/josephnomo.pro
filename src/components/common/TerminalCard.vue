<template>
  <div class="terminal-card" :class="{ 'hover-effect': hoverEffect }">
    <div class="card-header">
      <div v-if="showButtons" class="terminal-buttons">
        <span class="terminal-button"></span>
        <span class="terminal-button"></span>
        <span class="terminal-button"></span>
      </div>
      <span class="command">{{ command }}</span>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  command: {
    type: String,
    required: true,
  },
  showButtons: {
    type: Boolean,
    default: false,
  },
  hoverEffect: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.terminal-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.terminal-card.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: var(--bg-secondary);
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
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

.command {
  font-family: "Fira Code", monospace;
  color: var(--accent-primary);
  font-size: 0.875rem;
}

.card-content {
  padding: 1.5rem;
}
</style>

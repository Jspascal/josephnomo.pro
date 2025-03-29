<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :href="href"
    :target="external ? '_blank' : undefined"
    class="btn btn-primary"
    :class="{ 'with-icon': $slots.icon }"
    :type="type"
    :disabled="disabled"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </component>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  external: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
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
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--accent-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--accent-secondary);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.with-icon {
  display: inline-flex;
  align-items: center;
}

.with-icon :deep(svg) {
  margin-right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
}
</style>

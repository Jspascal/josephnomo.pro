<template>
  <div class="loading-container" :class="{ 'is-fullpage': fullPage }">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div v-if="message" class="loading-message">{{ message }}</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  fullPage: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-container.is-fullpage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-primary);
  z-index: 1000;
}

.spinner {
  width: 40px;
  height: 40px;
  position: relative;
  margin-bottom: 1rem;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--accent-primary);
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1s;
}

.loading-message {
  font-family: "Fira Code", monospace;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>

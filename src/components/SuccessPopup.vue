<template>
  <transition name="popup">
    <div v-if="show" class="popup-overlay" @click="$emit('close')">
      <div class="popup-container" @click.stop>
        <div class="popup-terminal">
          <div class="popup-header">
            <div class="terminal-buttons">
              <span class="terminal-button"></span>
              <span class="terminal-button"></span>
              <span class="terminal-button"></span>
            </div>
            <div class="popup-title">message_status.log</div>
            <x-icon class="close-icon" @click="$emit('close')" />
          </div>
          <div class="popup-content">
            <check-circle-icon class="success-icon" />
            <h3 class="popup-message-title">Message Sent Successfully!</h3>
            <p class="popup-message">
              Thank you for reaching out. I'll get back to you as soon as
              possible.
            </p>
            <div class="popup-terminal-line">
              <span class="popup-prompt">$</span>
              <span class="popup-command"
                >echo "Message from {{ formData.name }} received."</span
              >
            </div>
            <div class="popup-output">
              Message from {{ formData.name }} received.
            </div>
            <button class="popup-btn" @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { CheckCircleIcon, XIcon } from "lucide-vue-next";
import { defineProps, defineEmits } from "vue";

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.popup-container {
  width: 100%;
  max-width: 500px;
}

.popup-terminal {
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--card-border);
}

.popup-header {
  background-color: var(--bg-secondary);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  position: relative;
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

.popup-title {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  flex-grow: 1;
  text-align: center;
}

.close-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
}

.close-icon:hover {
  color: var(--text-primary);
}

.popup-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.success-icon {
  width: 3rem;
  height: 3rem;
  color: #10b981; /* Green color */
  margin-bottom: 1rem;
}

.popup-message-title {
  font-family: "Fira Code", monospace;
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.popup-message {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.popup-terminal-line {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  width: 100%;
  text-align: left;
  margin-bottom: 0.5rem;
}

.popup-prompt {
  color: var(--accent-primary);
  margin-right: 0.5rem;
}

.popup-command {
  color: var(--text-primary);
}

.popup-output {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: #10b981; /* Green color */
  text-align: left;
  padding: 0 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

.popup-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-family: "Fira Code", monospace;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.popup-btn:hover {
  background-color: var(--accent-secondary);
}

/* Popup Animation */
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

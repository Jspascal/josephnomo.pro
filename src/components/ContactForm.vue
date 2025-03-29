<template>
  <div class="contact-form">
    <terminal-card command="$ vim message.txt">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="form-input"
            placeholder="Enter your name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="subject" class="form-label">Subject</label>
          <input
            type="text"
            id="subject"
            v-model="form.subject"
            class="form-input"
            placeholder="Enter subject"
            required
          />
        </div>

        <div class="form-group">
          <label for="message" class="form-label">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            class="form-textarea"
            placeholder="Enter your message"
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <loader-icon v-if="isSubmitting" class="btn-icon animate-spin" />
          <send-icon v-else class="btn-icon" />
          {{ isSubmitting ? "Sending..." : "Send Message" }}
        </button>
      </form>
    </terminal-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SendIcon, LoaderIcon } from "lucide-vue-next";
import TerminalCard from "@/components/common/TerminalCard.vue";
import { defineEmits } from "vue";

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);

const emit = defineEmits(["success"]);

const submitForm = async () => {
  isSubmitting.value = true;

  try {
    // TODO: Add api call here to a function I will make on digitalocean
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", form.value);

    emit("success", form.value);

    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-family: "Fira Code", monospace;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  color: var(--text-primary);
  font-family: "Inter", sans-serif;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.form-textarea {
  resize: vertical;
}

.submit-btn {
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

.submit-btn:hover:not(:disabled) {
  background-color: var(--accent-secondary);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

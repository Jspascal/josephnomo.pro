<template>
  <section class="not-found">
    <div class="container">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <h1 class="error-title">Page Not Found</h1>
        <p class="error-message">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div class="terminal-card">
          <div class="terminal-header">
            <div class="terminal-buttons">
              <span class="terminal-button"></span>
              <span class="terminal-button"></span>
              <span class="terminal-button"></span>
            </div>
            <div class="terminal-title">terminal</div>
          </div>
          <div class="terminal-content">
            <div class="terminal-line">
              <span class="prompt">$</span> find / -name "{{
                extractPathFromUrl()
              }}"
            </div>
            <div class="terminal-output">find: No such file or directory</div>
            <div class="terminal-line">
              <span class="prompt">$</span> echo "Redirecting to home..."
            </div>
            <div class="terminal-output">Redirecting to home...</div>
            <div class="terminal-line">
              <span class="prompt">$</span> <span class="cursor"></span>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <router-link to="/" class="btn-primary">
            <home-icon class="btn-icon" />
            Go to Homepage
          </router-link>
          <button @click="goBack" class="btn-secondary">
            <arrow-left-icon class="btn-icon" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { HomeIcon, ArrowLeftIcon } from "lucide-vue-next";
import { useHead } from "@vueuse/head";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const extractPathFromUrl = () => {
  return window.location.pathname.substring(1) || "page";
};

onMounted(() => {
  document.title = "404 - Page Not Found";

  useHead({
    title: "404 - Page Not Found",
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { httpEquiv: "Status", content: "404 Not Found" },
    ],
  });
});
</script>

<style scoped>
.not-found {
  padding: 4rem 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.error-code {
  font-family: "Fira Code", monospace;
  font-size: 8rem;
  font-weight: 700;
  color: var(--accent-primary);
  line-height: 1;
  margin-bottom: 1rem;
  text-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.error-title {
  font-family: "Fira Code", monospace;
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.error-message {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
}

.terminal-card {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: left;
  border: 1px solid var(--border-color);
}

.terminal-header {
  background-color: var(--bg-secondary);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
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

.terminal-title {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  flex-grow: 1;
  text-align: center;
}

.terminal-content {
  padding: 1.5rem;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
}

.terminal-line {
  display: flex;
  margin-bottom: 0.75rem;
}

.prompt {
  color: var(--accent-primary);
  margin-right: 0.75rem;
}

.terminal-output {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.cursor {
  display: inline-block;
  width: 0.5rem;
  height: 1rem;
  background-color: var(--accent-primary);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-family: "Fira Code", monospace;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--accent-primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: var(--accent-secondary);
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--bg-secondary);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

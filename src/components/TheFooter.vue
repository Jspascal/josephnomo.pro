<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} Joseph Nomo. All rights reserved.</p>
        </div>
        <div class="footer-links">
          <a href="https://github.com/Jspascal" target="_blank" class="footer-link">
            <github-icon class="footer-icon" />
          </a>
          <a href="https://www.linkedin.com/in/nomojoseph/" target="_blank" class="footer-link">
            <linkedin-icon class="footer-icon" />
          </a>
          <a href="mailto:contact@josephnomo.com" class="footer-link">
            <mail-icon class="footer-icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-vue-next';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer {
  padding: 2rem 0;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-copyright {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: var(--text-secondary);
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--accent-primary);
}

.footer-icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>


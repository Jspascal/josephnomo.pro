<template>
  <div class="contact-info">
    <terminal-card command="$ cat contact_info.json">
      <div class="info-item">
        <mail-icon class="info-icon" />
        <div class="info-details">
          <h3 class="info-title">Email</h3>
          <a href="mailto:contact@josephnomo.pro" class="info-value"
            >contact@josephnomo.pro</a
          >
        </div>
      </div>

      <div class="info-item">
        <phone-icon class="info-icon" />
        <div class="info-details">
          <h3 class="info-title">Phone</h3>
          <a href="tel:237691167177" class="info-value">237691167177</a>
        </div>
      </div>

      <div class="info-item">
        <map-pin-icon class="info-icon" />
        <div class="info-details">
          <h3 class="info-title">Location</h3>
          <span class="info-value">Douala - Cameroon</span>
        </div>
      </div>

      <div class="social-links">
        <h3 class="social-title">Connect with me</h3>
        <div class="social-grid">
          <a
            href="https://github.com/Jspascal"
            target="_blank"
            class="social-link"
          >
            <github-icon class="social-icon" />
            <span class="social-name">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/nomojoseph/"
            target="_blank"
            class="social-link"
          >
            <linkedin-icon class="social-icon" />
            <span class="social-name">LinkedIn</span>
          </a>
          <a
            href="https://x.com/CodeHacker237"
            target="_blank"
            class="social-link"
          >
            <twitter-icon class="social-icon" />
            <span class="social-name">Twitter</span>
          </a>
          <a
            href="https://web.facebook.com/josephnomo.0"
            target="_blank"
            class="social-link"
          >
            <facebook-icon class="social-icon" />
            <span class="social-name">Facebook</span>
          </a>
        </div>
      </div>
    </terminal-card>
  </div>
</template>

<script setup>
import {
  MailIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  PhoneIcon,
  FacebookIcon,
} from "lucide-vue-next";
import TerminalCard from "@/components/common/TerminalCard.vue";
</script>

<style scoped>
.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.info-icon {
  color: var(--accent-primary);
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  margin-top: 0.25rem;
}

.info-details {
  flex-grow: 1;
}

.info-title {
  font-family: "Fira Code", monospace;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.info-value {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.info-value:hover {
  color: var(--accent-primary);
}

.social-links {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px dashed var(--border-color);
}

.social-title {
  font-family: "Fira Code", monospace;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.social-link:hover {
  background-color: var(--bg-secondary);
  color: var(--accent-primary);
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
}

.social-name {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
}
</style>

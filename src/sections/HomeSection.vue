<template>
  <section class="home">
    <div class="container">
      <div class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="greeting">Hello, I'm</span>
            <span class="name">Joseph Nomo</span>
            <span class="role">Backend Developer</span>
          </h1>
          <p class="hero-description">
            I build robust backend systems and server infrastructure that power
            modern applications.
          </p>
          <div class="hero-actions">
            <primary-button to="/projects">View Projects</primary-button>
            <secondary-button to="/contact">Contact Me</secondary-button>
          </div>
        </div>
        <div class="hero-terminal">
          <terminal-card command="joseph@nomo:~" :show-buttons="true">
            <div class="terminal-body">
              <div class="terminal-line">
                <span class="prompt">$</span> cat skills.txt
              </div>
              <div class="terminal-output">
                <span class="skill-tag">Backend Development</span>
                <span class="skill-tag">System Architecture</span>
                <span class="skill-tag">Database Design</span>
                <span class="skill-tag">API Development</span>
                <span class="skill-tag">Server Management</span>
              </div>

              <div class="terminal-line">
                <span class="prompt">$</span> cat spotify-playlist
              </div>
              <div class="terminal-output">
                <div class="spotify-embed">
                  <iframe
                    style="border-radius: 12px"
                    src="https://open.spotify.com/embed/playlist/75j6aABzOEi30NvAvnajow?utm_source=generator"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  >
                  </iframe>
                </div>
              </div>

              <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="typing-text">get-in-touch</span>
                <span class="cursor"></span>
              </div>
            </div>
          </terminal-card>
        </div>
      </div>

      <div class="highlights">
        <div class="highlight-card">
          <server-icon class="highlight-icon" />
          <h3 class="highlight-title">Backend Development</h3>
          <p class="highlight-description">
            Building scalable and efficient server-side applications with modern
            technologies.
          </p>
        </div>

        <div class="highlight-card">
          <database-icon class="highlight-icon" />
          <h3 class="highlight-title">Database Architecture</h3>
          <p class="highlight-description">
            Designing optimized database schemas and implementing efficient data
            access patterns.
          </p>
        </div>

        <div class="highlight-card">
          <cpu-icon class="highlight-icon" />
          <h3 class="highlight-title">System Engineering</h3>
          <p class="highlight-description">
            Creating robust infrastructure and deployment pipelines for reliable
            applications.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ServerIcon, DatabaseIcon, CpuIcon } from "lucide-vue-next";
import TerminalCard from "@/components/common/TerminalCard.vue";
import PrimaryButton from "@/components/common/PrimaryButton.vue";
import SecondaryButton from "@/components/common/SecondaryButton.vue";
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 5rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-title {
  display: flex;
  flex-direction: column;
  font-family: "Fira Code", monospace;
}

.greeting {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.name {
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: 0.5rem;
}

.role {
  font-size: 1.5rem;
  color: var(--text-primary);
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 500px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.terminal-body {
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
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  padding-left: 1.5rem;
}

.skill-tag {
  display: inline-block;
  background-color: var(--bg-secondary);
  color: var(--accent-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.typing-text {
  color: var(--text-primary);
}

.cursor {
  display: inline-block;
  width: 0.5rem;
  height: 1rem;
  background-color: var(--accent-primary);
  margin-left: 0.25rem;
  animation: blink 1s step-end infinite;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.highlight-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.highlight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.highlight-icon {
  color: var(--accent-primary);
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1.25rem;
}

.highlight-title {
  font-family: "Fira Code", monospace;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.highlight-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.spotify-embed {
  margin: 1rem 0;
  width: 100%;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.spotify-embed iframe {
  display: block;
  width: 100%;
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

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .highlights {
    grid-template-columns: 1fr;
  }

  .spotify-embed {
    height: 250px;
  }

  .spotify-embed iframe {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .hero-title .name {
    font-size: 2.5rem;
  }

  .hero-title .role {
    font-size: 1.25rem;
  }
}
</style>

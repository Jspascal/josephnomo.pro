<template>
  <div class="app" :class="{ 'dark': isDarkMode }">
    <header class="header">
      <div class="container">
        <div class="logo">
          <span class="logo-text">Joseph Nomo</span>
          <span class="logo-cursor"></span>
        </div>
        <nav class="nav">
          <button @click="toggleDarkMode" class="theme-toggle">
            <sun-icon v-if="isDarkMode" class="icon" />
            <moon-icon v-else class="icon" />
          </button>
          <div class="nav-links">
            <router-link v-for="link in navLinks" :key="link.path" :to="link.path">
              {{ link.name }}
            </router-link>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-text">
            <span>© {{ new Date().getFullYear() }} Joseph Nomo</span>
          </div>
          <div class="social-links">
            <a href="https://github.com/Jspascal" target="_blank" class="social-link">
              <github-icon class="icon" />
            </a>
            <a href="https://www.linkedin.com/in/nomojoseph/" target="_blank" class="social-link">
              <linkedin-icon class="icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import { SunIcon, MoonIcon, GithubIcon, LinkedinIcon } from 'lucide-vue-next';

const isDarkMode = ref(true);
provide('isDarkMode', isDarkMode);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' }
];

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --accent-primary: #3b82f6;
  --accent-secondary: #60a5fa;
  --border-color: #e5e5e5;
  --card-bg: #ffffff;
  --card-border: #eaeaea;
}

.dark {
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --text-primary: #f0f0f0;
  --text-secondary: #a0a0a0;
  --accent-primary: #60a5fa;
  --accent-secondary: #93c5fd;
  --border-color: #333333;
  --card-bg: #1e1e1e;
  --card-border: #333333;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.logo-cursor {
  display: inline-block;
  width: 10px;
  height: 1.2rem;
  background-color: var(--accent-primary);
  margin-left: 5px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  font-family: 'Fira Code', monospace;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.95rem;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--accent-primary);
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.theme-toggle:hover {
  background-color: var(--bg-secondary);
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

main {
  flex: 1;
  padding: 3rem 0;
}

.footer {
  padding: 2rem 0;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: var(--text-secondary);
  transition: color 0.2s;
}

.social-link:hover {
  color: var(--accent-primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav {
    width: 100%;
    justify-content: space-between;
  }

  .nav-links {
    gap: 1rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
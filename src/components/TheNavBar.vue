<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-logo">
          <span class="logo-text">~/joseph_nomo</span>
        </router-link>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
        <router-link to="/" class="navbar-item" @click="closeMenu"
          >Home</router-link
        >
        <router-link to="/about" class="navbar-item" @click="closeMenu"
          >About</router-link
        >
        <router-link to="/projects" class="navbar-item" @click="closeMenu"
          >Projects</router-link
        >
        <router-link to="/skills" class="navbar-item" @click="closeMenu"
          >Skills</router-link
        >
        <router-link to="/blog" class="navbar-item" @click="closeMenu"
          >Blog</router-link
        >
        <router-link to="/contact" class="navbar-item" @click="closeMenu"
          >Contact</router-link
        >
      </div>

      <div class="navbar-actions">
        <button
          class="theme-toggle"
          @click="toggleTheme"
          aria-label="Toggle dark mode"
        >
          <sun-icon v-if="isDarkMode" class="theme-icon" />
          <moon-icon v-else class="theme-icon" />
        </button>

        <div class="navbar-burger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { SunIcon, MoonIcon } from "lucide-vue-next";
import { ThemeService } from "@/services/theme";

const isMenuOpen = ref(false);
const isDarkMode = ref(ThemeService.isDarkMode());

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;

  if (isMenuOpen.value) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.classList.remove("no-scroll");
};

const toggleTheme = () => {
  const newTheme = ThemeService.toggleTheme();
  isDarkMode.value = newTheme === "dark";
};

onMounted(() => {
  const theme = ThemeService.initTheme();
  isDarkMode.value = theme === "dark";
});
</script>

<style scoped>
.navbar {
  background-color: var(--bg-primary);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-color);
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: "Fira Code", monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.navbar-menu {
  display: flex;
  gap: 2rem;
}

.navbar-item {
  font-family: "Fira Code", monospace;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;
}

.navbar-item:hover,
.navbar-item.router-link-active {
  color: var(--accent-primary);
}

.navbar-item.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--accent-primary);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: var(--text-primary);
  transition: all 0.2s;
}

.theme-toggle:hover {
  background-color: var(--bg-secondary);
  color: var(--accent-primary);
}

.theme-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.navbar-burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.navbar-burger span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: var(--text-primary);
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .navbar-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--bg-primary);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 90;
  }

  .navbar-menu.is-active {
    transform: translateX(0);
  }

  .navbar-burger {
    display: flex;
    z-index: 100;
  }

  .navbar-item {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
}
</style>

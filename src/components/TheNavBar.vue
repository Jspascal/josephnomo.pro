<template>
  <header class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="logo">
          <span class="logo-prefix">~/</span>joseph_nomo
        </router-link>

        <button
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <menu-icon v-if="!mobileMenuOpen" class="menu-icon" />
          <x-icon v-else class="menu-icon" />
        </button>

        <nav class="nav-desktop" :class="{ active: mobileMenuOpen }">
          <ul class="nav-list">
            <li v-for="(item, index) in navItems" :key="index" class="nav-item">
              <router-link
                :to="item.path"
                class="nav-link"
                @click="closeMobileMenu"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>

          <div class="theme-toggle">
            <button
              @click="toggleTheme"
              class="theme-btn"
              aria-label="Toggle theme"
            >
              <sun-icon v-if="isDarkMode" class="theme-icon" />
              <moon-icon v-else class="theme-icon" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { SunIcon, MoonIcon, MenuIcon, XIcon } from "lucide-vue-next";
import { useMobile } from "@/hooks/use-mobile";

const isDarkMode = ref(false);
const mobileMenuOpen = ref(false);
const { isMobile } = useMobile();
const router = useRouter();

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  updateBodyScroll();
};

const closeMobileMenu = () => {
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
    updateBodyScroll();
  }
};

const updateBodyScroll = () => {
  if (mobileMenuOpen.value) {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add("no-scroll");
  } else {
    const scrollY = document.body.style.top;
    document.body.classList.remove("no-scroll");
    document.body.style.top = "";
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }
};

watch(
  () => router.currentRoute.value,
  () => {
    closeMobileMenu();
  }
);

watch(isMobile, (newValue) => {
  if (!newValue && mobileMenuOpen.value) {
    closeMobileMenu();
  }
});

const handleEscKey = (e) => {
  if (e.key === "Escape" && mobileMenuOpen.value) {
    closeMobileMenu();
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  }

  document.addEventListener("keydown", handleEscKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscKey);
  if (mobileMenuOpen.value) {
    document.body.classList.remove("no-scroll");
    document.body.style.top = "";
  }
});
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: "Fira Code", monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-prefix {
  color: var(--accent-primary);
  margin-right: 0.25rem;
}

.nav-desktop {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 1.5rem;
}

.nav-link {
  font-family: "Fira Code", monospace;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--accent-primary);
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--accent-primary);
}

.theme-toggle {
  margin-left: 2rem;
}

.theme-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.theme-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--accent-primary);
}

.theme-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-desktop {
    position: fixed;
    top: 4rem; /* Height of navbar */
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-primary);
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 99;
    overflow-y: auto;
  }

  .nav-desktop.active {
    transform: translateX(0);
  }

  .nav-list {
    flex-direction: column;
    width: 100%;
  }

  .nav-item {
    margin: 0;
    width: 100%;
    border-bottom: 1px solid var(--border-color);
  }

  .nav-link {
    display: block;
    padding: 1rem 0;
    font-size: 1.25rem;
  }

  .theme-toggle {
    margin: 2rem 0 0 0;
  }
}
</style>

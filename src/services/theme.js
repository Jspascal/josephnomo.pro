// Theme service to manage dark/light mode
export const ThemeService = {
  // Get current theme
  getTheme() {
    return localStorage.getItem("theme") || "light";
  },

  // Check if dark mode is active
  isDarkMode() {
    const savedTheme = this.getTheme();
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return savedTheme === "dark" || (!savedTheme && prefersDark);
  },

  // Set theme
  setTheme(theme) {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },

  // Toggle theme
  toggleTheme() {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
    return newTheme;
  },

  // Initialize theme based on saved preference or system preference
  initTheme() {
    const savedTheme = this.getTheme();
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      return "dark";
    } else {
      document.documentElement.classList.remove("dark");
      return "light";
    }
  },
};

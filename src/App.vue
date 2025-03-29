<template>
  <div class="app">
    <TheNavbar />
    <main class="main-content">
      <page-transition>
        <router-view />
      </page-transition>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import TheNavbar from "@/components/TheNavBar.vue";
import TheFooter from "@/components/TheFooter.vue";
import PageTransition from "@/components/common/PageTransition.vue";
import { ThemeService } from "@/services/theme";

onMounted(() => {
  ThemeService.initTheme();
});
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>

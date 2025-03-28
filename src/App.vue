<template>
  <div class="app">
    <TheNavbar />
    <main class="main-content">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from '@/components/TheNavBar.vue';
import TheFooter from '@/components/TheFooter.vue';
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


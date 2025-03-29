<template>
  <transition
    name="page"
    mode="out-in"
    @before-leave="beforeLeave"
    @enter="enter"
    @after-enter="afterEnter"
  >
    <slot></slot>
  </transition>
</template>

<script setup>
const beforeLeave = () => {
  document.documentElement.classList.add("is-page-transitioning");
};

const enter = () => {
  window.scrollTo(0, 0);
};

const afterEnter = () => {
  document.documentElement.classList.remove("is-page-transitioning");
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Prevent scrolling during page transitions */
html.is-page-transitioning {
  overflow-y: hidden;
}
</style>

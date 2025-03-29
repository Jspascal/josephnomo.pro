<template>
  <div
    class="lazy-image-container"
    :style="{
      paddingBottom: `${aspectRatio}%`,
      backgroundColor: placeholderColor || '#f0f0f0',
    }"
  >
    <img
      v-if="loaded"
      :src="src"
      :alt="alt"
      class="lazy-image"
      :class="{ 'is-loaded': loaded }"
      @load="onImageLoaded"
      loading="lazy"
    />
    <div v-else class="lazy-image-placeholder">
      <loading-spinner />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import { defineProps } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  aspectRatio: {
    type: Number,
    default: 56.25, // 16:9 aspect ratio by default
  },
  placeholderColor: {
    type: String,
    default: "",
  },
});

const loaded = ref(false);

const onImageLoaded = () => {
  loaded.value = true;
};

onMounted(() => {
  // Preload the image
  const img = new Image();
  img.src = props.src;

  if (img.complete) {
    loaded.value = true;
  } else {
    img.onload = () => {
      loaded.value = true;
    };
  }
});
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
}

.lazy-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image.is-loaded {
  opacity: 1;
}

.lazy-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

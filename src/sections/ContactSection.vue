<template>
  <section class="contact">
    <div class="container">
      <section-header title="contact" description="Get in touch with me" />

      <div class="contact-content">
        <contact-info />
        <contact-form @success="handleFormSuccess" />
      </div>
    </div>

    <success-popup
      :show="showPopup"
      :form-data="formData"
      @close="closePopup"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import ContactInfo from "@/components/ContactInfo.vue";
import ContactForm from "@/components/ContactForm.vue";
import SuccessPopup from "@/components/SuccessPopup.vue";

const showPopup = ref(false);
const formData = ref({});

const handleFormSuccess = (data) => {
  formData.value = data;
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
};
</script>

<style scoped>
.contact {
  padding: 2rem 0;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>

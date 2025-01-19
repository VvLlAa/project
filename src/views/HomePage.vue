<script setup lang="ts">
import FormContact from '@/components/form/FormContact.vue'
import ContactLists from '@/components/contacts/ContactLists.vue'
</script>

<template>
  <div class="home-page container">
    <FormContact/>
    <ContactLists/>
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}
</style>

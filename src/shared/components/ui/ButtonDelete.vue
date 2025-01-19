<script setup lang="ts">

</script>

<template>
  <button class="button-delete">
    <slot></slot>
  </button>
</template>

<style scoped>
.button-delete {
  padding: 8px 14px;
  background-color: var(--color-btn-delete);
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.4s;
}

.button-delete:hover {
  background-color: var(--color-btn-delete-hover);
}
</style>

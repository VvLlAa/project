<script setup lang="ts">

</script>

<template>
  <button class="button-b">
    <slot></slot>
  </button>
</template>

<style scoped>
.button-b{
  padding: 8px 14px;
  background-color: #333333;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.4s;
  z-index: 2;
}

.button-b:hover {
  background-color: var(--color-btn-hover);
}
</style>

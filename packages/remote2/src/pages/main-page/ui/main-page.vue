<script setup lang="ts">

</script>

<template>
  <div class="page-container">
    <h3>Я - главная страница микроприложения.</h3>
    <RouterView/>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

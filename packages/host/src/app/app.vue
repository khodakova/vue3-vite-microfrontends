<script setup lang="ts">
import Header from '../widgets/header/ui/header.vue';
import './styles/styles.scss'
</script>

<template>
  <div class="app-container">
    <Header/>
    <h1>Я - главное приложение (хост)</h1>
    <div>
      <RouterView/>
    </div>
  </div>

</template>

<style scoped>
.app-container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

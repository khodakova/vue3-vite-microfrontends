<script setup lang="ts">
import Header from '../widgets/header/ui/header.vue';
import './styles/styles.scss'
import { ProgressBar } from '../shared/ui/progress-bar';
import { ref } from 'vue';
import { getEmitter } from '../shared/config/mitt/get-emitter';
import Notification from '../shared/ui/notification/notification.vue';

const loading = ref(false);
const emitter = getEmitter()
emitter.on('loading', (loadingState) => {
  loading.value = loadingState;
});

</script>

<template>
  <div class="app-container">
    <ProgressBar :loading="loading"/>
    <Notification/>
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

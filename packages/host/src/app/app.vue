<script setup lang="ts">
import Header from '../widgets/header/ui/header.vue';
import './styles/styles.scss'
import { ProgressBar } from '../shared/ui/progress-bar';
import { ref } from 'vue';
import { getEmitter } from '../shared/config/mitt/get-emitter';
import Notification from '../shared/ui/notification/notification.vue';
import { useMfeComponent } from '../shared/lib/mfe/use-mfe-component';

const loading = ref(false);
const emitter = getEmitter()
emitter.on('loading', (loadingState) => {
  loading.value = loadingState;
});

const AsyncChatWidget = useMfeComponent({ mfeName: 'remote-1', componentName: 'chat-widget' })

</script>

<template>
  <div class="app">
    <ProgressBar :loading="loading"/>
    <Notification/>
    <Header/>
    <div class="app-container">
      <h1>Я - главное приложение (хост)</h1>
      <div>
        <RouterView/>
      </div>
    </div>
    <div class="chat-container">
      <Suspense>
        <template #fallback>
          loading
        </template>
        <AsyncChatWidget/>
      </Suspense>
    </div>
  </div>

</template>

<style scoped lang="scss">
.app {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &-container {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    border: 2px solid #72be00;
  }
}

.chat-container {
  position: fixed;
  right: 16px;
  bottom: 16px;
}
</style>

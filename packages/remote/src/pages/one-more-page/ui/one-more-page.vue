<script setup>
import {getEmitter} from "../../../shared/config/mitt/get-emitter";

const emitter = getEmitter()

const onShowNotification = () => {
  emitter.emit('showNotification', {message: 'Сообщение из remote-1'})
}

</script>

<template>
  <div class="flex-container">
    Я первая внутренняя страница микроприложения
    <button @click="onShowNotification" class="button">
      Вызвать эмиттер
    </button>
  </div>
</template>

<style scoped lang="scss">
.flex-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.button {
  padding: 12px;
  background-color: #2c81ff;
  color: white;
  border-radius: 8px;
  outline: none;
  border: none;
  width: 200px;

  &:hover {
    opacity: 0.9;
  }
}
</style>

<script setup>
import {getEmitter} from "../../../shared/config/mitt/get-emitter";

const emitter = getEmitter()

const onShowNotification = () => {
  emitter.emit('showNotification', {message: 'Сообщение из remote-1'})
}

</script>

<template>
  <div>
    Я первая внутренняя страница микроприложения
    <button @click="onShowNotification">
      show notification from host
    </button>
  </div>
</template>

<style scoped>

</style>

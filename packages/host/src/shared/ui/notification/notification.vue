<script setup>
import {getEmitter} from "../../config/mitt/get-emitter";
import {ref} from "vue";
import {generateUid} from "remote/src/shared/lib/generate-uid";

const _messages = ref([])
const _message = ref(null);

const emitter = getEmitter()
emitter.on('showNotification', ({message}) => {
  const uid = generateUid();
  _message.value = message;
  _messages.value = [..._messages.value, {message, id: uid}]

  setTimeout(() => {
    _messages.value = _messages.value.filter((x) => x.id !== uid)
  }, 3000)
});
</script>

<template>
  <div class="notifications">
    <TransitionGroup name="list">
      <div class="notification-container" v-for="notification in _messages" :key="notification.id">
        <div>
          {{ notification.message }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.notifications {
  position: fixed;
  right: 24px;
  top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification {
  &-container {
    width: 250px;
    background-color: white;
    border-radius: 8px;
    max-height: 80px;
    padding: 16px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    border: 1px solid #bbdbff;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

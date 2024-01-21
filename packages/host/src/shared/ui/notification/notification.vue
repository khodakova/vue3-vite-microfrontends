<script setup lang="ts">
import { getEmitter } from '../../config/mitt/get-emitter';
import { ref } from 'vue';
import { generateUid } from 'remote/src/shared/lib/generate-uid';
import NotificationBell from './notification-bell.svg';
import Cross from './cross.svg';

const _messages = ref<Array<{ id: string, message: string }>>([])
const _message = ref<string | null>(null);

const emitter = getEmitter()
emitter.on('showNotification', ({ message }) => {
  const uid = generateUid();
  _message.value = message;
  _messages.value = [..._messages.value, { message, id: uid }]

  setTimeout(() => {
    _messages.value = _messages.value.filter((x) => x.id !== uid)
  }, 3000)
});

const onClose = (id: string) => {
  _messages.value = _messages.value.filter((x) => x.id !== id)
}
</script>

<template>
  <div class="notifications">
    <TransitionGroup name="list">
      <div class="notification-container" v-for="notification in _messages" :key="notification.id">
        <NotificationBell class="notification-icon"/>
        <div class="notification-divider"/>
        <div class="notification-content">
          <p class="notification-header">Уведомление</p>
          <p>
            {{ notification.message }}
          </p>
        </div>
        <Cross class="notification-icon notification-close" @click="() => onClose(notification.id)"/>
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
    width: 300px;
    background-color: white;
    border-radius: 32px 0 0 32px;
    height: auto;
    padding: 16px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    border: 1px solid #bbdbff;
    display: flex;
    flex-direction: row;
    gap: 8px;
    position: relative;
    align-items: center;
  }

  &-divider {
    width: 1px;
    height: 100%;
    &:before {
      content: '';
      position: absolute;
      top: 16px;
      bottom: 16px;
      border-right: 1px solid #bbdbff;
    }
  }

  &-icon {
    color: #030378;
  }

  &-close {
    position: absolute;
    right: 8px;
    top: 8px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
  }

  &-header {
    font-size: 16px;
    font-weight: 600;
  }
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>

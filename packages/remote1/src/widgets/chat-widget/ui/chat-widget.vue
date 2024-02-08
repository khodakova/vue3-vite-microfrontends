<script setup lang="ts">
import { ref } from 'vue';
import Cross from './cross.svg';
import Chat from './chat-round.svg'

const _isOpen = ref(false);

const onToggle = () => {
  _isOpen.value = !_isOpen.value
}
</script>

<template>
  <Transition >
    <div class="chat-container" v-if="_isOpen">
      <Cross class="chat-close" @click="onToggle"/>
      <h4>Чат-менеджер</h4>
      <p>Этот бизнес находится в зоне ответственности remote-1</p>
      <p>Поэтому он не выносится компонентом в хостовое приложение, а остается в репозитории соответствующего ремоута</p>
      <p>Для этого в конфиге federation в exposes добавляется строка, которая регулирует возможность отдавать виджет
        "наружу"</p>
      <p class="code">
        exposes: {
        <br/>
        './chat-widget': './src/widgets/chat-widget/ui/chat-widget.vue',
        <br/>
        },
      </p>
    </div>
  </Transition>
  <button class="chat-btn" @click="onToggle" v-if="!_isOpen">
    <Chat/>
  </button>
</template>

<style scoped lang="scss">
.chat {
  &-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 2px solid blue;
    padding: 16px;
    width: 450px;
    background-color: white;
    box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    font-size: 14px;
  }

  &-btn {
    border-radius: 24px;
    width: 40px;
    height: 40px;
    background-color: white;
    outline: none;
    cursor: pointer;
    border: 2px solid blue;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &-close {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
}

.code {
  padding: 4px;
  background-color: #e4e8ef;
  border: 1px solid gray;
  border-radius: 8px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

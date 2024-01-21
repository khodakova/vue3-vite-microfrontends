<script setup lang="ts">
type Props = {
  loading: boolean,
}
defineProps<Props>();
</script>

<template>
  <div v-show="loading" class="progress-bar-wrapper">
    <div class="progress-bar-fill" />
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  &-wrapper {
    background-color: #b4c1e1;
    height: 4px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
  }
  &-fill {
    background-color: #2c81ff;
    position: absolute;
    bottom: 0;
    top: 0;
    width: 50%;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-name: progress-bar;
  }
}

@keyframes progress-bar {
  from {
    left: -50%;
  }
  to {
    left: 100%;
  }
}
</style>

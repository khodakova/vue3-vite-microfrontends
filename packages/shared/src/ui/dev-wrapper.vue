<script setup lang="ts">
import './styles.scss'
</script>

<template>
  <div class="app">
    <div class="header-container">
      <slot name="header"/>
    </div>
    <div class="app-container">
      <slot name="content"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;

  &-container {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
}

.header {
  &-container {
    position: relative;
    width: 100%;
    height: 60px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background-color: white;
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-image: repeating-linear-gradient(
            -45deg,
            #efefef 0,
            #efefef 25px,
            #e3e3e3 25px,
            #e3e3e3 50px
    );

  }
}
</style>

<script setup>
import {paths} from "../../../shared/config/paths";
</script>

<template>
  <div class="header-container">
    <nav class="header-content">
      <RouterLink :to="paths.REMOTE_1">Remote 1</RouterLink>
      <RouterLink :to="paths.REMOTE_2">Remote 2</RouterLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.header {
  &-container {
    width: 100%;
    height: 60px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background-color: white;
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-content {
    display: flex;
    gap: 16px;
  }
}
</style>

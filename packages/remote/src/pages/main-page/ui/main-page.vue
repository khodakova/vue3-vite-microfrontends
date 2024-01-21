<script setup lang="ts">
import {_paths} from '../../../shared/config/paths';

</script>

<template>
  <div class="page-container">
    <h2>Я - главная страница микроприложения.</h2>

    <p class="descr">Ссылки осуществляют переход по моим внутренним роутам.</p>
    <div class="link-container">
      <RouterLink :to="_paths.ONE_MORE" class="link">
        ONE MORE PAGE
      </RouterLink>
      <RouterLink :to="_paths.ANOTHER" class="link">
        ANOTHER PAGE
      </RouterLink>
    </div>

    <RouterView/>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link-container {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.link {
  /*text-decoration: none;*/
}

.descr {
  font-size: 18px;
}
</style>

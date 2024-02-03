<script setup lang="ts">

import { watchEffect } from 'vue';
import { _paths, _prefix, getAppPaths } from '../shared/config/paths';
import { updateState } from '../shared/lib/update-state';
import { _routeNames, getRouteNames } from '../shared/config/route-names';

const props = defineProps<{ baseUrl: string }>();

watchEffect(() => {
  // при изменении префикса обновляем роуты приложения
  _prefix.value = props.baseUrl ?? '';
  updateState(_routeNames, getRouteNames(_prefix.value));
  updateState(_paths, getAppPaths(_prefix.value));
});
</script>

<template>
  <div class="container">
    <h2>Я - микрофронтенд "remote-1"</h2>

    <div class="page-container">
      <p class="descr">Ссылки осуществляют переход по моим внутренним роутам.</p>
      <div class="link-container">
        <RouterLink :to="_paths.ONE_MORE" class="link">
          ONE MORE PAGE
        </RouterLink>
        <RouterLink :to="_paths.ANOTHER" class="link">
          ANOTHER PAGE
        </RouterLink>
      </div>
    </div>

    <RouterView/>
  </div>

</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  border: 2px solid blue;
  padding: 16px;
  gap: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.2);
}

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

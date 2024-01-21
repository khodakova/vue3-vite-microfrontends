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
    <h1>
      Это часть приложения - микрофронтенд Remote
    </h1>
    <RouterView/>
  </div>

</template>

<style scoped>
.container {
  border: 3px solid blue;
  padding: 16px;
  border-radius: 8px;
}
</style>

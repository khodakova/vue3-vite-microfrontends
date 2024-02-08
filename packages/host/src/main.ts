import { createApp } from 'vue';
import { App, router } from './app';
import axios from './shared/config/axios/axios';
import mitt from './shared/config/mitt/mitt';

const app = createApp(App);

app
  .use(axios, { baseUrl: '/' })
  .use(mitt)
  .use(router);

app.mount('#app');

import { createApp, h } from 'vue';
import { createDevApp } from 'dev-wrapper';
import { App, router } from './app';
import 'dev-wrapper/styles';

if (process.env.NODE_ENV === 'development') {
  const devApp = createDevApp({
    router,
    slots: {
      header: h('div', 'В эмулятор хэдера можно прокинуть какой-угодно контент'),
      content: h(App),
    },
  });
  devApp.mount('#app');
} else {
  const app = createApp(App);
  app.use(router);
  app.mount('#app');
}

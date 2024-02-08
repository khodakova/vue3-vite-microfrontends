import mitt from 'mitt';
import { App } from 'vue';

export type EmitterEvents = {
  loading: boolean,
  showNotification: { message: string },
}

export default {
  install: (app: App) => {
    const emitter = mitt<EmitterEvents>();
    app.provide('mitt', emitter);
    app.config.globalProperties.$emitter = emitter;
  },
};

import { createApp, h } from "vue"
import { App, router } from './app';
import { createDevApp } from 'dev-wrapper';
import 'dev-wrapper/styles'

if (process.env.NODE_ENV === 'development') {
    const devApp = createDevApp({
        router,
        slots: {
            header: h('<div>anything you need</div>'),
            content: App
        }
    });
    devApp.mount('#app')
} else {
    const app = createApp(App)
    app.use(router)

    app.mount("#app")
}

import { createApp } from "vue"
import { App, router } from './app';

const app = createApp(App)
app.use(router)

app.mount("#app")

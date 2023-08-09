import { createApp, defineAsyncComponent } from "vue"
import {App} from "./app";
// import { createPinia } from 'pinia'

const app = createApp(App)
// const pinia = createPinia()

// app.use(pinia)

app.mount("#app")

import "./assets/main.less"
import "bootstrap-icons/font/bootstrap-icons.css"

import { createApp } from "vue"
import App from "./App.vue"
import { createRouter } from "./router"
import { createLocalizer } from "./localizer"

const app = createApp(App)

const router = createRouter()

app.use(router)

const localizer = createLocalizer()

app.use(localizer)

app.mount("#app")

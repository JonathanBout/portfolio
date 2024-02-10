import "./assets/main.less"
import "bootstrap-icons/font/bootstrap-icons.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createLocalizer } from "./localizer"

const app = createApp(App)

app.use(router)

const localizer = createLocalizer()

app.use(localizer)

app.mount("#app")

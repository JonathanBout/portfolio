import "./assets/main.less"
import "bootstrap-icons/font/bootstrap-icons.css"
import "/node_modules/flag-icons/css/flag-icons.min.css"

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

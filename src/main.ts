import "./assets/main.less"
import "bootstrap-icons/font/bootstrap-icons.css"

import { createApp } from "vue"
import App from "./App.vue"
import { createRouter } from "./router"
import { createLocalizer } from "./localizer"
import { rev } from "virtual:gitrev"

const app = createApp(App)

const router = createRouter()

app.use(router)

app.provide("gitRev", rev === "untracked" ? rev : rev.slice(0, 7))

const localizer = createLocalizer()

app.use(localizer)

app.mount("#app")

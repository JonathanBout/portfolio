import "./assets/main.less"
import "bootstrap-icons/font/bootstrap-icons.css"
import versionHash from "/version-hash.txt?raw"

import { createApp } from "vue"
import App from "./App.vue"
import { createRouter } from "./router"
import { createLocalizer } from "./localizer"

const app = createApp(App)

const router = createRouter()

app.use(router)
app.provide("versionHash", versionHash === "untracked" ? "untracked" : versionHash.slice(0, 8))

const localizer = createLocalizer()

app.use(localizer)

app.mount("#app")

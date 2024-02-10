import "./assets/main.less"
import "bootstrap-icons/font/bootstrap-icons.css"
import { createI18n } from "vue-i18n"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import localizer from "./localizer"

import * as nl from "./locales/nl.json"
import * as en from "./locales/en.json"

const app = createApp(App)

app.use(localizer)
app.use(router)

let locale = window.location.host.match(/\.nl$/) ? "nl" : "en"

const preferredLocale = window.localStorage.getItem("locale")

if (!preferredLocale) {
  switch (window.navigator.language) {
    case null:
    case undefined:
      break
    case "nl":
      locale = "nl"
      break
    case "en":
      locale = "en"
      break
  }
} else {
  locale = preferredLocale
}

if (!window.location.host.match("localhost")) {
  if (locale === "nl") {
    if (!window.location.host.match(/\.nl$/)) {
      window.location.host = window.location.host.replace(/\.com$/, ".nl")
    }
  } else {
    if (!window.location.host.match(/\.com$/)) {
      window.location.host = window.location.host.replace(/\.nl$/, ".com")
    }
  }
}

const i18n = createI18n({
  locale,
  fallbackLocale: "en",
  messages: {
    nl: nl,
    en: en
  }
})

app.use(i18n)

app.provide("locale", locale)

app.mount("#app")

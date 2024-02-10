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

let locale: "nl" | "en" = window.location.host.match(/\.nl$/) ? "nl" : "en"

const query = new URLSearchParams(window.location.search)

if (query.get("changeLocale")) {
  console.log("changeLocale")
  window.localStorage.setItem("locale", locale)
  query.delete("changeLocale")

  window.location.search = query.toString()
} else {
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
    locale = preferredLocale as "nl" | "en"
  }
  if (!window.location.host.match("localhost")) {
    localizer.updateLocale(locale)
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

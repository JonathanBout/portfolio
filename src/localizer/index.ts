import { nl, en, common } from "./locales"

import { createI18n } from "vue-i18n"

type Localizer = { locale: "nl" | "en"; install: (app: any) => void }

function changeLanguage(newLanguage: "nl" | "en") {
  window.localStorage.setItem("locale", newLanguage)
  if (window.location.host.match("localhost")) {
    location.reload()
  } else {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("changeLocale", "true")
    const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()

    let newHost = window.location.origin
    if (newLanguage === "nl") {
      newHost = newHost.replace(/\.com/, ".nl")
    } else {
      newHost = newHost.replace(/\.nl/, ".com")
    }

    if (window.location.origin !== newHost) {
      window.location.href = newHost + newRelativePathQuery
    }
  }
}

/**
 * Create a Vue plugin that enables localization and provides a method to change the locale from within the app.
 * @returns a Vue localizer plugin
 */
export function createLocalizer(): Localizer {
  let locale: "nl" | "en" = window.location.host.match(/\.nl$/) ? "nl" : "en"

  const query = new URLSearchParams(window.location.search)

  if (query.get("changeLocale")) {
    window.localStorage.setItem("locale", locale)
    query.delete("changeLocale")

    window.location.search = query.toString()
  } else {
    const preferredLocale = window.localStorage.getItem("locale")

    if (!preferredLocale && window.navigator.language) {
      switch (window.navigator.language.split("-")[0]) {
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
      changeLanguage(locale)
    }
  }

  // return a Vue-plugin compatible object, with the locale and the install method.
  // The install method will be called by Vue when the plugin is used and will add the $updateLocale method to the globalProperties,
  // and initialize the i18n plugin with the correct locale and messages.
  return {
    locale,
    install: (app: any) => {
      app.config.globalProperties.$updateLocale = changeLanguage
      app.provide("locale", locale)
      const i18n = createI18n({
        locale: locale,
        fallbackLocale: "common",
        fallbackWarn: false,
        messages: {
          nl: nl,
          en: en
        },
        sharedMessages: {
          common
        }
      })
      app.use(i18n)
    }
  }
}

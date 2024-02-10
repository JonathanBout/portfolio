import { nl, en, common } from "./locales"

import { createI18n } from "vue-i18n"

export const LOCALES = ["nl", "en"] as const

export type Locale = (typeof LOCALES)[number]

export type Localizer = { locale: Locale; install: (app: any) => void }

function changeLanguage(newLanguage: Locale) {
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
  /**
   * Determine the locale to use. In order of priority:
   * 1. If the query parameter changeLocale is set, change the locale to the locale for the current domain
   * 2. If the locale is set in local storage, use that
   * 3. If the browser language is set to Dutch, use the Dutch locale
   * 4. If the browser language is set to English, use the English locale
   * 5. If none of the above, use the locale for the current domain (.com is English, .nl is Dutch)
   */
  let locale: Locale = window.location.host.match(/\.nl$/) ? "nl" : "en"

  const query = new URLSearchParams(window.location.search)

  if (query.get("changeLocale")) {
    window.localStorage.setItem("locale", locale)
    query.delete("changeLocale")

    window.location.search = query.toString()
  } else {
    const preferredLocale = window.localStorage.getItem("locale")

    if (!preferredLocale && window.navigator.language) {
      switch (window.navigator.language.split("-")[0] as Locale) {
        case "nl":
          locale = "nl"
          break
        case "en":
          locale = "en"
          break
      }
    } else {
      locale = preferredLocale as Locale
    }
    if (!window.location.host.match("localhost")) {
      // only update the locale and domain if the domain is not localhost,
      // otherwise we end up in an infinite loop of redirects
      changeLanguage(locale)
    }
    // @ts-ignore
    // set the lang attribute on the html element to the current locale for SEO purposes
    window.htmlRootElement.setAttribute("lang", locale)
  }

  /**
   * return a Vue-plugin compatible object, with the locale and the install method.
   * The install method will be called by Vue when the plugin is used and will add the $updateLocale method to the globalProperties,
   * and initialize the i18n plugin with the correct locale and messages.
   */
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
  } as Localizer
}

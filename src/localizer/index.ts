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
    /*
     * Determine the locale to use. In order of priority:
     * 1. If the query parameter changeLocale is set, change the locale to the locale for the current domain
     * 2. If the locale is set in local storage, use that
     * 3. If the browser language is set to Dutch, use the Dutch locale
     * 4. If the browser language is set to English, use the English locale
     * 5. If none of the above, use the locale for the current domain (.com is English, .nl is Dutch)
     */

    // if crawler is visiting the site, we don't want to change the locale or do any redirects
    let locale: Locale = window.location.host.match(/\.nl$/) ? "nl" : "en"

    const i18n = createI18n({
        locale: locale,
        fallbackLocale: "common",
        messages: {
            nl,
            en,
            common
        },
        legacy: false
    })

    if (navigator.userAgent.match(/bot|googlebot|crawler|spider|robot|crawling|InspectionTool/i)) {
        return {
            locale,
            install: (app: any) => {
                app.config.globalProperties.$updateLocale = () => {}
                app.provide("locale", locale)
                app.use(i18n)
            }
        }
    }

    const query = new URLSearchParams(window.location.search)

    if (query.get("changeLocale")) {
        window.localStorage.setItem("locale", locale)
        query.delete("changeLocale")

        window.location.search = query.toString()
    } else {
        let preferredLocale = window.localStorage.getItem("locale")

        if (!LOCALES.includes(preferredLocale as Locale)) {
            preferredLocale = null
        }

        if (!preferredLocale && window.navigator.language) {
            const navigatorLocale = window.navigator.language.split("-")[0] as Locale
            if (LOCALES.includes(navigatorLocale)) {
                locale = navigatorLocale
            }
        } else {
            locale = preferredLocale as Locale
        }
        if (!window.location.host.match("localhost")) {
            // only update the locale and domain if the domain is not localhost,
            // otherwise we end up in an infinite loop of redirects
            changeLanguage(locale)
        }
    }

    i18n.global.locale.value = locale

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
            app.use(i18n)
        }
    } as Localizer
}

import localizedStrings from "./locales"

import { createI18n } from "vue-i18n"

import { type Plugin as VuePlugin, type App as VueApp, type ComputedRef, type WritableComputedRef } from "vue"

export const LOCALES = ["nl", "en"] as const

export type Locale = (typeof LOCALES)[number]

/**
 * A type that represents a value that is localized in multiple languages.
 * The key is the locale, and the value is the localized value.
 * It uses the `Locale` type to ensure that all locales are present.
 * @template V the type of the localized value
 */
export type Localized<V = unknown> = { [K in Locale]: V }

export function localize<T>(localized: Localized<T>): T {
    return localized[currentLocale.value]
}

/**
 * A list of the domains for each locale the app supports.
 * @warn Do not use this in href attributes, as it won't work during development. For redirects, use the `changeLanguage` function.
 */
export const domainsByLocale: Localized<`https://${string}`> = {
    en: "https://jonathanbout.com",
    nl: "https://jonathanbout.nl"
}

const localizerPlugin = {
    install(app: VueApp) {
        app.provide("locale", currentLocale)
        app.use(i18n)
    }
} as VuePlugin

/**
 * Change the language of the site by setting the locale in local storage and reloading the page. This may also redirect to the other domain if the locale is changed.
 * @param newLanguage the new locale to set
 */
export function changeLanguage(newLanguage: Locale) {
    window.localStorage.setItem("locale", newLanguage)
    if (window.location.host.match("localhost")) {
        // if the domain is localhost, we can just reload the page and we don't want to redirect to a different domain
        location.reload()
    } else {
        // if the domain is not localhost, we may want to redirect to another domain.
        // add the changeLocale query parameter to the URL to prevent an infinite loop of redirects
        const searchParams = new URLSearchParams(window.location.search)
        searchParams.set("changeLocale", "true")

        // build the new path with the new query parameters
        const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()

        // get the new domain for the new language
        const newHost = domainsByLocale[newLanguage]

        // if the current domain is not the same as the new domain, redirect to the new domain
        if (window.location.origin.toLowerCase() !== newHost.toLowerCase()) {
            window.location.href = newHost + newRelativePathQuery
        }
    }
}

/**
 * Create a Vue plugin that enables localization and provides a method to change the locale from within the app.
 */
export function createLocalizer(): VuePlugin {
    /*
     * Determine the locale to use. In order of priority:
     * 1. If the visitor is a crawler or a bot, use the locale for the current domain
     * 2. If the query parameter changeLocale is set, change the locale to the locale for the current domain
     * 3. If the locale is set in local storage, use that
     * 4. If the browser language is set to Dutch, use the Dutch locale
     * 5. If the browser language is set to English, use the English locale
     * 6. If none of the above, use the locale for the current domain (.com is English, .nl is Dutch)
     */

    let locale: Locale = window.app.locale

    for (const loc of LOCALES) {
        if (window.location.origin.toLowerCase() === domainsByLocale[loc].toLowerCase()) {
            locale = loc
            break
        }
    }

    // if crawler is visiting the site, we don't want to change the locale or do any redirects
    if (
        navigator.userAgent.match(
            /bot|googleother|google-extended|mediapartners|apis-google|google-safety|bingpreview|microsoftpreview|crawler|spider|robot|crawling|inspectiontool/i
        )
    ) {
        currentLocale.value = locale

        return localizerPlugin
    }

    // if the query parameter changeLocale is set, change the locale to the locale for the current domain
    const query = new URLSearchParams(window.location.search)

    if (query.get("changeLocale")) {
        window.localStorage.setItem("locale", locale)
        query.delete("changeLocale")

        window.location.search = query.toString()
    } else {
        // if the locale is set in local storage, use that
        let preferredLocale = window.localStorage.getItem("locale")

        if (!LOCALES.includes(preferredLocale as Locale)) {
            preferredLocale = null
        }

        // if the locale is not set in local storage, try to determine the locale from the browser language
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

    currentLocale.value = locale

    /**
     * return a Vue-plugin compatible object, with the locale and the install method.
     * The install method will be called by Vue when the plugin is used,
     * and initializes the i18n plugin with the correct locale and messages.
     */
    return localizerPlugin
}

export const i18n = createI18n({
    locale: "en",
    fallbackLocale: ["common", "en"],
    messages: localizedStrings,
    legacy: false,
    fallbackWarn: import.meta.env.DEV,
    missingWarn: import.meta.env.DEV
})

export const currentLocale = i18n.global.locale as WritableComputedRef<Locale>
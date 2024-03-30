import { Plugin } from "vite"
import fs from "fs"

/*
 * This plugin is used to generate multiple index.html files for different locales.
 * The locales are defined in the seo-locales.json file.
 * The plugin replaces the [[localize:key]] and [[locale]] placeholders in the index.html file with the actual values.
 * This is to help search engine crawlers understand the different locales of the website and how they are structured.
 * The plugin will generate a new index.html file for each locale, with the locale appended to the filename like so: index.[locale].html
 */
class LocalizerPlugin implements Plugin {
    name = "localizer-plugin"

    async transformIndexHtml(html: string) {
        function doReplace(oldHtml: string, key: string, value: any) {
            if (typeof value === "string") {
                return oldHtml.replace(new RegExp(`[^\\\\]\\[\\[localize:${key}\\]\\]`, "g"), ('"' + value) as string)
            } else {
                for (const [innerKey, innerValue] of Object.entries(value)) {
                    let fullKey = innerKey
                    if (key !== "") {
                        fullKey = key + "." + innerKey
                    }
                    oldHtml = doReplace(oldHtml, fullKey, innerValue)
                }
                return oldHtml
            }
        }

        // load locales from seo-locales.json
        const json = JSON.parse(fs.readFileSync("./seo-locales.json", "utf8"))

        console.log(json)

        let commonKeys = Object.entries({})
        if (json["common"] !== undefined) {
            commonKeys = Object.entries(json["common"])
        }

        const allLocales = Object.keys(json).filter((locale) => locale !== "common")

        for (const locale of allLocales) {
            const newFileName = `dist/index.${locale}.html`
            let newHtml = html

            const pairs = Object.entries(json[locale]).concat(commonKeys)

            for (const [key, value] of pairs) {
                newHtml = doReplace(newHtml, key, value)
            }

            newHtml = newHtml.replace(/[^\\]\[\[locale\]\]/g, '"' + locale)

            newHtml = "<!-- This page search engine optimized for the '" + locale + "' locale -->\n" + newHtml

            fs.writeFileSync(newFileName, newHtml)
        }
    }
}

export default function localizerPlugin() {
    return new LocalizerPlugin()
}

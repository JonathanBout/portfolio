import { Plugin } from "vite"
import { OutputOptions, OutputBundle, EmittedAsset, OutputAsset } from "rollup"
import fs from "fs"
import { extname } from "path"

function getFiles(bundle: OutputBundle): { [key: string]: (OutputAsset | OutputBundle)[] } {
    const result = {} as ReturnType<typeof getFiles>
    for (const file of Object.values(bundle)) {
        const { fileName } = file
        const extension = extname(fileName).substring(1)

        result[extension] = (result[extension] || []).concat(file as OutputAsset)
    }

    return result
}

type LocaleData = string | { [key: string]: LocaleData }

function doReplace(oldHtml: string, key: string, value: LocaleData): string {
    if (typeof value === "string") {
        // match [[localize:key]] but not \[[localize:key]]
        return oldHtml.replace(new RegExp(`(?<!\\\\)\\[\\[localize:${key}\\]\\]`, "g"), value)
    } else {
        for (const [innerKey, innerValue] of Object.entries(value || {})) {
            let fullKey = innerKey
            if (key !== "") {
                fullKey = key + "." + innerKey
            }
            oldHtml = doReplace(oldHtml, fullKey, innerValue)
        }
        return oldHtml
    }
}

/*
 * This plugin is used to generate multiple index.html files for different locales.
 * The locales are defined in the static-locales.json file.
 * The plugin replaces the [[localize:key]] and [[locale]] placeholders in the index.html file with the actual values.
 * You can use a \ to escape the placeholder if you want to display it as is in the generated html file.
 * The plugin also adds a comment at the top of the generated index.html file to indicate the locale.
 * This is to help search engine crawlers understand the different locales of the website and how they are structured.
 * The plugin will generate a new index.html file for each locale, with the locale appended to the filename like so: index.[locale].html
 */
export default function localizerPlugin(): Plugin {
    return {
        name: "localizer",
        generateBundle: {
            order: "post",
            async handler(options: OutputOptions, bundle: OutputBundle) {
                // load locales from static-locales.json
                const json = JSON.parse(fs.readFileSync("./static-locales.json", "utf8"))
                const files = getFiles(bundle)

                const html = files.html[0].source.toString()

                let commonKeys = Object.entries({})
                if (json["common"] !== undefined) {
                    commonKeys = Object.entries(json["common"])
                }

                const allLocales = Object.keys(json).filter((locale) => locale !== "common")

                for (const locale of allLocales) {
                    const newFileName = `${locale}/index.html`
                    let newHtml = html

                    const pairs = Object.entries(json[locale]).concat(commonKeys) as [string, LocaleData][]

                    for (const [key, value] of pairs) {
                        newHtml = doReplace(newHtml, key, value)
                    }

                    // replace [[locale]] but not \[[locale]] with the actual locale
                    newHtml = newHtml.replace(/(?<!\\\\)\[\[locale\]\]/g, locale)

                    newHtml =
                        "<!-- This page is search engine optimized for the '" + locale + "' locale -->\n" + newHtml

                    const htmlFile: EmittedAsset = {
                        type: "asset",
                        source: newHtml,
                        name: "index.html - " + locale,
                        fileName: newFileName
                    }

                    this.emitFile(htmlFile)
                }
            }
        }
    }
}

import { Plugin } from "vite"
import { OutputOptions, OutputBundle, EmittedAsset, OutputAsset } from "rollup"
import fs from "fs"
import { extname } from "path"

function getFiles(bundle: OutputBundle): { [key: string]: (OutputAsset | OutputBundle)[] } {
    const result = {} as ReturnType<typeof getFiles>
    for (const file of Object.values(bundle)) {
        const { fileName } = file
        const extension = extname(fileName).substring(1)

        result[extension] = (result[extension] || []).concat(file as any)
    }

    return result
}

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

/*
 * This plugin is used to generate multiple index.html files for different locales.
 * The locales are defined in the seo-locales.json file.
 * The plugin replaces the [[localize:key]] and [[locale]] placeholders in the index.html file with the actual values.
 * This is to help search engine crawlers understand the different locales of the website and how they are structured.
 * The plugin will generate a new index.html file for each locale, with the locale appended to the filename like so: index.[locale].html
 */

export default function localizerPlugin(): Plugin {
    return {
        name: "localizer",
        generateBundle: {
            order: "post",
            async handler(options: OutputOptions, bundle: OutputBundle) {
                // load locales from seo-locales.json
                const json = JSON.parse(fs.readFileSync("./seo-locales.json", "utf8"))
                const files = getFiles(bundle)

                const html = files.html[0].source.toString()

                let commonKeys = Object.entries({})
                if (json["common"] !== undefined) {
                    commonKeys = Object.entries(json["common"])
                }

                const allLocales = Object.keys(json).filter((locale) => locale !== "common")

                for (const locale of allLocales) {
                    const newFileName = `index.${locale}.html`
                    let newHtml = html

                    const pairs = Object.entries(json[locale]).concat(commonKeys)

                    for (const [key, value] of pairs) {
                        newHtml = doReplace(newHtml, key, value)
                    }

                    newHtml = newHtml.replace(/[^\\]\[\[locale\]\]/g, '"' + locale)

                    newHtml = "<!-- This page search engine optimized for the '" + locale + "' locale -->\n" + newHtml

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

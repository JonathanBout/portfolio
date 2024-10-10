import { CSSColor, contrastingColor } from "@/util/color"
import backend from "@/backend"
export class TopLanguage {
    name: string = ""
    color: CSSColor = new CSSColor()
    size: number = 0
    count: number = 0

    get textColor() {
        return contrastingColor(this.color)
    }

    constructor(props: { [key: string]: unknown }) {
        Object.assign(this, props)
    }
}

export class TopLanguages implements Iterable<TopLanguage> {
    topLanguages: TopLanguage[] = []

    constructor(props: TopLanguage[]) {
        this.topLanguages = props
    }
    [Symbol.iterator](): Iterator<TopLanguage> {
        let index = 0
        return {
            next: () => {
                if (index < this.topLanguages.length) {
                    return { value: this.topLanguages[index++], done: false }
                } else {
                    return { value: null, done: true }
                }
            }
        }
    }

    totalSize() {
        return this.topLanguages.reduce((acc, lang) => acc + lang.size, 0)
    }

    push(lang: TopLanguage) {
        this.topLanguages.push(lang)
    }

    get length() {
        return this.topLanguages.length
    }
}

export class Stats {
    topLanguages: TopLanguages = new TopLanguages([])
    error: unknown = null
}

export async function getStats() {
    const stats = new Stats()
    try {
        console.debug("fetching stats")

        const response = await backend.get("/api/top-languages", { exclude_langs: "HLSL,ShaderLab" })

        const data = (await response.json()) as { [key: string]: unknown }[]

        console.debug("received stats", data)

        // fill the received data into the stats object
        for (const value of Object.values(data)) {
            const lang = new TopLanguage(value)
            // set the color separately, as it is a CSSColor object
            lang.color = CSSColor.fromString(value["color"] as string)
            stats.topLanguages.push(lang)
        }

        // filter out languages that are less than 0.5% of the total size
        const totalSize = stats.topLanguages.totalSize()
        stats.topLanguages.topLanguages = stats.topLanguages.topLanguages.filter(
            (lang) => lang.size / totalSize >= 0.005
        )

        // sort the languages by size
        stats.topLanguages.topLanguages = stats.topLanguages.topLanguages.sort((a, b) => b.size - a.size)
    } catch (err) {
        // if anything goes wrong, set the error property and log the error
        stats.error = err
        console.error(err)
    }

    return stats
}

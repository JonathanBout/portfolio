import { CSSColor, contrastingColor } from "@/util/color"

// empty, as it is on the same domain
const productionUrl = ""

function getPath(route: `/${string}` = "/") {
    let url = import.meta.env.PROD ? productionUrl : ((import.meta.env.VITE_BACKEND_URL as string) || "https://jonathanbout.com")

    if (url.endsWith("/")) {
        url = url.slice(0, -1)
    }

    return url + route
}


export class TopLanguage {
    name: string = ""
    color: CSSColor = new CSSColor()
    size: number = 0
    count: number = 0

    get textColor() {
        return contrastingColor(this.color)
    }

    constructor(props: { [key: string]: any }) {
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
    error: any = null
}

export async function getStats() {
    const stats = new Stats()
    try {
        const storedData = sessionStorage.getItem("stats")

        let data = storedData ? JSON.parse(storedData) : null

        if (!data) {
            const response = await fetch(getPath("/api/top-languages?exclude_langs=shaderlab,hlsl"))
            data = await response.json()
            sessionStorage.setItem("stats", JSON.stringify(data))
        }

        for (const valueorig of Object.values(data)) {
            const value = valueorig as any
            const lang = new TopLanguage(value as any)
            lang.color = CSSColor.fromString(value.color)
            stats.topLanguages.push(lang)
        }

        const totalSize = stats.topLanguages.totalSize()
        stats.topLanguages.topLanguages = stats.topLanguages.topLanguages.filter(
            (lang) => lang.size / totalSize >= 0.005
        )

        stats.topLanguages.topLanguages = stats.topLanguages.topLanguages.sort((a, b) => b.size - a.size)
    } catch (err) {
        stats.error = err
    }

    return stats
}

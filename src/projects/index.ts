import type { Locale } from "@/localizer"
import { CSSColor, contrastingColor } from "@/util/color"

export class Project {
    name: string | { [K in Locale]: string } = ""
    id: string = ""
    github?: string = undefined
    demo?: string = undefined
    description?: { [K in Locale]: string }
    tags: TagName[] = []

    constructor(args: { [K in keyof Project]?: Project[K] }) {
        Object.assign(this, args)
    }
}

export class Tag {
    name: string = ""
    url?: string = undefined
    color: string = "black"

    get parsedColor() {
        return CSSColor.fromString(this.color)
    }

    get textColor() {
        return contrastingColor(this.parsedColor)
    }
    iconUrl?: string = undefined

    constructor(args?: { name: string; url?: string; color: string; iconUrl?: string }) {
        Object.assign(this, args)
    }
}

const tags = {
    vue: new Tag({
        name: "Vue",
        color: "#1a1a1a",
        url: "https://vuejs.org",
        iconUrl: "/images/logos/vue.svg"
    }),
    nasaApi: new Tag({
        name: "NASA API",
        color: "white",
        url: "https://api.nasa.gov",
        iconUrl: "/images/logos/nasa.svg"
    }),
    docker: new Tag({
        name: "Docker",
        color: "#1d63ed",
        url: "https://www.docker.com",
        iconUrl: "/images/logos/docker.svg"
    }),
    apache: new Tag({
        name: "Apache",
        color: "#282661",
        url: "https://httpd.apache.org"
    }),
    ubuntu: new Tag({
        name: "Ubuntu",
        color: "#E95420",
        url: "https://ubuntu.com",
        iconUrl: "/images/logos/ubuntu.png"
    }),
    linux: new Tag({
        name: "Linux",
        color: "#000",
        url: "https://www.linux.org"
    }),
    mySQL: new Tag({
        name: "MySQL",
        color: "#00758F",
        url: "https://www.mysql.com"
    }),
    watchface: new Tag({
        name: "watchface",
        color: "purple"
    }),
    wfs: new Tag({
        name: "WatchFaceStudio",
        color: "pink",
        url: "https://developer.samsung.com/watch-face-studio/overview.html"
    }),
    wearOS: new Tag({
        name: "WearOS",
        color: "white",
        url: "https://wearos.google.com",
        iconUrl: "/images/logos/wearos.png"
    }),
    portfolio: new Tag({
        name: "portfolio",
        color: "white"
    }),
    internationalization: new Tag({
        name: "internationalization",
        color: "#f0db4f",
        url: "https://en.wikipedia.org/wiki/Internationalization"
    }),
    nginx: new Tag({
        name: "Nginx",
        color: "white",
        url: "https://www.nginx.com",
        iconUrl: "/images/logos/nginx.svg"
    })
}

type TagName = keyof typeof tags

const projects: Project[] = [
    new Project({
        name: {
            en: "Programmer Watchface",
            nl: "Developer-wijzerplaat"
        },
        id: "programmer-watchface",
        github: "https://github.com/jonathanbout/programmer-watchface",
        demo: "https://play.google.com/store/apps/details?id=com.jonathanbout.watchface.programmer",
        tags: ["watchface", "wfs", "wearOS"],
        description: {
            en: "A watchface for Wear OS that shows the current time, date, battery level and step count in a JSON format with Visual Studio Code theme colors.",
            nl: "Een wijzerplaat voor Wear OS die de huidige tijd, datum, batterijpercentage en stappenteller weergeeft als JSON met Visual Studio Code themakleuren."
        }
    }),
    new Project({
        name: "Webserver",
        id: "webserver",
        demo: "https://server01.jonathanbout.dev",
        tags: ["docker", "apache", "nginx", "ubuntu", "linux", "mySQL"],
        description: {
            en: "My own webserver, running Ubuntu on an Odroid N2+. Most of my web based projects are hosted on this server using Docker, and Apache's HTTPD implementation as a proxy. Within the containers I use Nginx when a server is needed.",
            nl: "Mijn eigen webserver, Ubuntu op een Odroid N2+. De meeste van mijn webprojecten worden gehost op deze server met behulp van Docker en Apache's HTTPD implementatie als proxy. Binnen de containers gebruik ik Nginx wanneer daar een server nodig is."
        }
    }),
    new Project({
        name: "NASA APOD Wrapper",
        id: "apod-wrapper",
        github: "https://github.com/jonathanbout/apod-web",
        demo: "https://apod.jonathanbout.com",
        description: {
            en: "A simple web app that fetches the Astronomy Picture of the Day from NASA's API and displays it in a clean, responsive layout.",
            nl: "Een simpele webapp die de Astronomy Picture of the Day van NASA's API ophaalt en deze in een nette, responsive layout weergeeft."
        },
        tags: ["vue", "nasaApi"]
    }),
    new Project({
        name: "Portfolio",
        id: "portfolio",
        github: "https://github.com/jonathanbout/portfolio",
        demo: "/",
        description: {
            en: "This website! My personal portfolio website, built with Vue.js. To support a broader audience, it's available in both English and Dutch using i18n and two domains.",
            nl: "Deze website! Mijn persoonlijke portfolio website, gebouwd met Vue.js. Om een breder publiek te ondersteunen, is deze beschikbaar in zowel het Engels als het Nederlands met behulp van i18n en twee domeinen."
        },
        tags: ["portfolio", "internationalization", "vue"]
    })
]

export default {
    projects,
    tags
}

import type { Locale } from "@/localizer"

export class Project {
    name: string | { [K in Locale]: string } = ""
    id: string = ""
    github?: string = undefined
    demo?: string = undefined
    description?: { [K in Locale]: string }
    tags: TagName[] = []
    allowPreview?: boolean = false

    constructor(args: { [K in keyof Project]?: Project[K] }) {
        Object.assign(this, args)
    }
}

export class Tag {
    name: string = ""
    url?: string = undefined
    color: string = ""
    textColor: string = ""
    iconUrl?: string = undefined

    constructor(args?: Tag) {
        Object.assign(this, args)
    }
}

const tags = {
    vue: new Tag({
        name: "Vue",
        color: "#1a1a1a",
        textColor: "white",
        url: "https://vuejs.org",
        iconUrl: "https://vuejs.org/logo.svg"
    }),
    nasaApi: new Tag({
        name: "NASA API",
        color: "white",
        textColor: "black",
        url: "https://api.nasa.gov",
        iconUrl: "https://api.nasa.gov/assets/img/favicons/favicon.ico"
    }),
    docker: new Tag({
        name: "Docker",
        color: "#1d63ed",
        textColor: "white",
        url: "https://www.docker.com",
        iconUrl: "/public/docker-mark-white.svg"
    }),
    apache: new Tag({
        name: "Apache",
        color: "#282661",
        textColor: "#fff",
        url: "https://httpd.apache.org"
    }),
    ubuntu: new Tag({
        name: "Ubuntu",
        color: "#E95420",
        textColor: "#fff",
        url: "https://ubuntu.com",
        iconUrl: "https://assets.ubuntu.com/v1/49a1a858-favicon-32x32.png"
    }),
    linux: new Tag({
        name: "Linux",
        color: "#000",
        textColor: "#fff",
        url: "https://www.linux.org"
    }),
    mySQL: new Tag({
        name: "MySQL",
        color: "#00758F",
        textColor: "#fff",
        url: "https://www.mysql.com"
    }),
    watchface: new Tag({
        name: "watchface",
        color: "purple",
        textColor: "#fff"
    }),
    wfs: new Tag({
        name: "WatchFaceStudio",
        color: "pink",
        textColor: "black",
        url: "https://developer.samsung.com/watch-face-studio/overview.html"
    }),
    wearOS: new Tag({
        name: "WearOS",
        color: "white",
        textColor: "black",
        url: "https://wearos.google.com",
        iconUrl: "https://wearos.google.com/static/img/favicon-32x32.png?cache=31a8ea0"
    }),
    portfolio: new Tag({
        name: "portfolio",
        color: "white",
        textColor: "black"
    }),
    localization: new Tag({
        name: "localization",
        color: "#f0db4f",
        textColor: "#000"
    }),
    nginx: new Tag({
        name: "Nginx",
        color: "white",
        textColor: "black",
        url: "https://www.nginx.com",
        iconUrl: "https://www.nginx.com/wp-content/uploads/2019/10/favicon-64x46.ico"
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
            nl: "Een wijzerplaat voor Wear OS die de huidige tijd, datum, batterijpercentage en stappenteller weergeeft in een JSON-formaat met Visual Studio Code themakleuren."
        }
    }),
    new Project({
        name: "Webserver",
        id: "webserver",
        demo: "https://server.jonathanbout.com",
        tags: ["docker", "apache", "nginx", "ubuntu", "linux", "mySQL"],
        description: {
            en: "My own webserver, running Ubuntu on an Odroid N2+. Most of my web based projects are hosted on this server using Docker and Apache, and inside the containers I use Nginx when a proxy is needed.",
            nl: "Mijn eigen webserver, Ubuntu op een Odroid N2+. De meeste van mijn webprojecten worden gehost op deze server met behulp van Docker en Apache, en binnen de containers gebruik ik Nginx wanneer een proxy nodig is."
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
        tags: ["vue", "nasaApi"],
        allowPreview: true
    }),
    new Project({
        name: "Portfolio",
        id: "portfolio",
        github: "https://github.com/jonathanbout/portfolio",
        demo: "https://jonathanbout.com",
        description: {
            en: "This website! My personal portfolio website, built with Vue.js. To support a broader audience, it's available in both English and Dutch using i18n and two domains.",
            nl: "Deze website! Mijn persoonlijke portfolio website, gebouwd met Vue.js. Om een breder publiek te ondersteunen, is deze beschikbaar in zowel het Engels als het Nederlands met behulp van i18n en twee domeinen."
        },
        tags: ["portfolio", "localization", "vue"]
    })
]

export default {
    projects,
    tags
}

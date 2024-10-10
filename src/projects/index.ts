import type { Localized } from "@/localizer"
import { CSSColor, contrastingColor } from "@/util/color"

export class Project {
    name: string | Localized<string> = ""
    id: string = ""
    github?: string = undefined
    playStore?: string = undefined
    demo?: string = undefined
    description?: Localized<string>
    image?: string = undefined
    images?: string[] = []
    tags: TagName[] = []
    timeframe?: { start: Date; end?: Date | "present" } = undefined

    constructor(args: { [K in keyof Project]?: Project[K] }) {
        Object.assign(this, args)
    }

    get url() {
        return this.demo ?? this.playStore ?? this.github
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
    debian: new Tag({
        name: "Debian",
        color: "white",
        url: "https://www.debian.org",
        iconUrl: "/images/logos/debian.svg"
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
    postgres: new Tag({
        name: "PostgreSQL",
        color: "#336791",
        url: "https://www.postgresql.org",
        iconUrl: "/images/logos/postgres.svg"
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
        url: "https://en.m.wikipedia.org/wiki/Internationalization_and_localization"
    }),
    nginx: new Tag({
        name: "Nginx",
        color: "white",
        url: "https://www.nginx.com",
        iconUrl: "/images/logos/nginx.svg"
    }),
    csharp: new Tag({
        name: "C#",
        color: "#68217A",
        url: "https://dot.net/csharp",
        iconUrl: "/images/logos/csharp.svg"
    }),
    aspnetcore: new Tag({
        name: "ASP.NET Core",
        color: "#512BD4",
        url: "https://asp.net",
        iconUrl: "/images/logos/dotnet.svg"
    }),
    websockets: new Tag({
        name: "Websockets",
        color: "#E95420"
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
        playStore: "https://play.google.com/store/apps/details?id=com.jonathanbout.watchface.programmer",
        tags: ["watchface", "wfs", "wearOS"],
        image: "/images/projects/programmer-watchface.webp",
        description: {
            en: "A watchface for Wear OS that shows the current time, date, battery level and step count in a JSON format with Visual Studio Code theme colors.",
            nl: "Een wijzerplaat voor Wear OS die de huidige tijd, datum, batterijpercentage en stappenteller weergeeft als JSON met Visual Studio Code themakleuren."
        },
        timeframe: {
            start: new Date(2024, 2),
            end: "present"
        }
    }),
    new Project({
        name: "Webserver",
        id: "webserver",
        demo: "https://server01.jonathanbout.dev",
        image: "/images/projects/server.webp",
        tags: ["docker", "apache", "nginx", "debian", "linux", "mySQL", "postgres"],
        description: {
            en: "My own webserver, running Debian on an Odroid N2+. All my web based projects are hosted on this server using Docker, and Apache's HTTPD implementation as a proxy. Within the containers I use Nginx when it contains just static files, for example with Vue.",
            nl: "Mijn eigen webserver, Debian op een Odroid N2+. Al mijn webprojecten worden gehost op deze server met behulp van Docker en Apache's HTTPD implementatie als proxy. Binnen de containers gebruik ik Nginx wanneer daar alleen statische bestanden staan, bijvoorbeeld met Vue."
        },
        timeframe: {
            start: new Date(2023, 7),
            end: "present"
        }
    }),
    new Project({
        name: "NASA APOD Wrapper",
        id: "apod-wrapper",
        github: "https://github.com/jonathanbout/apod-web",
        demo: "https://apod.jonathanbout.com",
        image: "/images/projects/apod.webp",
        description: {
            en: "A simple web app that fetches the Astronomy Picture of the Day from NASA's API and displays it in a clean, responsive layout.",
            nl: "Een simpele webapp die de Astronomy Picture of the Day van NASA's API ophaalt en deze in een nette, responsive layout weergeeft."
        },
        tags: ["vue", "nasaApi"],
        timeframe: {
            start: new Date(2024, 2),
            end: "present"
        }
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
        tags: ["portfolio", "internationalization", "vue"],
        timeframe: {
            start: new Date(2023, 8),
            end: "present"
        }
    }),
    new Project({
        name: {
            en: "Booking system for an airline",
            nl: "Boekingssysteem voor een vliegtuigmaatschappij"
        },
        id: "flight-booking-system",
        description: {
            en: "A flight booking system for a school project. It's a console application written in C# that allows users to book flights, view their bookings and cancel them. Because the console application itself wasn't very challenging, we also added an online check-in page with websockets.",
            nl: "Een vluchtboekingssysteem voor een schoolproject. Het is een console applicatie geschreven in C# waarmee gebruikers vluchten kunnen boeken, hun boekingen kunnen bekijken en annuleren. Omdat de console applicatie zelf niet erg uitdagend was, hebben we ook een online incheckpagina toegevoegd met websockets."
        },
        tags: ["csharp", "aspnetcore", "websockets"],
        timeframe: {
            start: new Date(2023, 3),
            end: new Date(2023, 6)
        },
        image: "/images/projects/rara.webp"
    })
]

export default {
    projects: projects.sort((a, b) =>
        b.timeframe?.start.toISOString() == a.timeframe?.start.toISOString()
            ? 0
            : (b.timeframe?.start.toISOString() ?? "") > (a.timeframe?.start.toISOString() ?? "")
              ? 1
              : -1
    ),
    tags
}

import type { Localized } from "@/localizer"
import { CSSColor, contrastingColor } from "@/util/color"

type IconLink = { bootstrapIcon: string; url: string; ariaLabel: string }

function githubLink(repo: `${string}/${string}`): IconLink {
    return { bootstrapIcon: "github", url: `https://github.com/${repo}`, ariaLabel: "projects.view-on-gh" }
}

function playStoreLink(appId: string): IconLink {
    return {
        bootstrapIcon: "google-play",
        url: `https://play.google.com/store/apps/details?id=${appId}`,
        ariaLabel: "projects.view-on-playstore"
    }
}

function nugetLink(packageId: string): IconLink {
    return {
        bootstrapIcon: "boxes",
        url: `https://www.nuget.org/packages/${packageId}`,
        ariaLabel: "projects.view-on-nuget"
    }
}

function demoLink(url: string): IconLink {
    return { bootstrapIcon: "link", url, ariaLabel: "projects.view-demo" }
}

export class Project {
    name: string | Localized<string> = ""
    id: string = ""
    description?: Localized<string>
    image?: string = undefined
    images?: string[] = []
    tags: TagName[] = []
    timeframe?: { start: Date; end?: Date | "present" | "maintenance" } = undefined
    url?: string = undefined
    iconLinks?: IconLink[] = undefined

    constructor(args: { [K in keyof Project]?: Project[K] }) {
        Object.assign(this, args)
        if (!this.url) {
            this.url = this.iconLinks?.[0]?.url ?? undefined
        }
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
        color: "#b84821"
    }),
    xunit: new Tag({
        name: "xUnit",
        color: "#68217a",
        url: "https://xunit.net"
    }),
    nunit: new Tag({
        name: "NUnit",
        color: "#005B0B",
        url: "https://nunit.org"
    })
}

type TagName = keyof typeof tags

const projects: Project[] = [
    new Project({
        name: {
            en: "Programmer Watchface",
            nl: "Developer-wijzerplaat"
        },
        iconLinks: [
            playStoreLink("com.jonathanbout.watchface.programmer"),
            githubLink("jonathanbout/programmer-watchface")
        ],
        id: "programmer-watchface",
        tags: ["watchface", "wfs", "wearOS"],
        images: [
            "/images/projects/watchface/Abyss.webp",
            "/images/projects/watchface/Dark-plus.webp",
            "/images/projects/watchface/Kimbie.webp",
            "/images/projects/watchface/Monokai.webp"
        ],
        description: {
            en: "A watchface for Wear OS that shows the current time, date, battery level and step count in a JSON format with Visual Studio Code theme colors.",
            nl: "Een wijzerplaat voor Wear OS die de huidige tijd, datum, batterijpercentage en stappenteller weergeeft als JSON met Visual Studio Code themakleuren."
        },
        timeframe: {
            start: new Date(2024, 2),
            end: "maintenance"
        }
    }),
    new Project({
        name: "Webserver",
        id: "webserver",
        iconLinks: [demoLink("https://server01.jonathanbout.dev")],
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
        iconLinks: [demoLink("https://apod.jonathanbout.com"), githubLink("jonathanbout/apod-web")],
        image: "/images/projects/apod.webp",
        description: {
            en: "A simple web app that fetches the Astronomy Picture of the Day from NASA's API and displays it in a clean, responsive layout.",
            nl: "Een simpele webapp die de Astronomy Picture of the Day van NASA's API ophaalt en deze in een nette, responsive layout weergeeft."
        },
        tags: ["vue", "nasaApi"],
        timeframe: {
            start: new Date(2024, 2),
            end: "maintenance"
        }
    }),
    new Project({
        name: "Portfolio",
        id: "portfolio",
        iconLinks: [githubLink("jonathanbout/portfolio"), demoLink("/")],
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
    }),
    new Project({
        name: "SimpleCDN",

        iconLinks: [
            nugetLink("SimpleCDN"),
            githubLink("jonathanbout/simplecdn"),
            demoLink("https://static.jonathanbout.dev")
        ],
        id: "cdn-server",
        image: "/images/projects/simple-cdn.png",
        tags: ["aspnetcore", "docker", "xunit", "nunit"],
        description: {
            en: "A simple Content Delivery Network (CDN) server that serves static files. It's built with ASP.NET Core and Docker. By using an in-memory cache, files that are requested often are available faster. To reduce the chance of bugs and to make it easier to maintain, I've written unit and integration tests for the most important parts of the code.",
            nl: "Een eenvoudig Content Delivery Network (CDN) server die statische bestanden levert, gebouwd met ASP.NET Core en Docker. Door een in-memory cache te gebruiken, zijn bestanden die vaak worden opgevraagd sneller beschikbaar. Om de kans op bugs te verkleinen en het onderhoud te vergemakkelijken, heb ik unit- en integratietests geschreven voor de belangrijkste delen van de code."
        },
        timeframe: {
            start: new Date(2024, 10),
            end: "present"
        }
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

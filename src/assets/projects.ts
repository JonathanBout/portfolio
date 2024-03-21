export class Project {
    name: string = ""
    id: string = ""
    github?: string = undefined
    demo?: string = undefined
    description: {
        en: string
        nl: string
    } = {
        en: "",
        nl: ""
    }
    tags: string[] = []
}

export class Tag {
    name: string = ""
    url?: string = undefined
    color: string = ""
    textColor: string = ""
}

export default {
    projects: [
        {
            name: "Webserver",
            id: "webserver",
            description: {
                en: "My own webserver, running Ubuntu on an Odroid N2+. Most of my web based projects are hosted on this server using Docker and Apache.",
                nl: "Mijn eigen webserver, Ubuntu op een Odroid N2+. De meeste van mijn webprojecten worden gehost op deze server met behulp van Docker en Apache."
            },
            demo: "https://server.jonathanbout.com",
            tags: ["Docker", "Apache", "Ubuntu", "Linux", "MySQL"]
        },
        {
            name: "NASA APOD Wrapper",
            id: "apod-wrapper",
            github: "https://github.com/jonathanbout/apod-web",
            demo: "https://apod.jonathanbout.com",
            description: {
                en: "A simple web app that fetches the Astronomy Picture of the Day from NASA's API and displays it in a clean, responsive layout.",
                nl: "Een simpele webapp die de Astronomy Picture of the Day van NASA's API ophaalt en deze in een nette, responsive layout weergeeft."
            },
            tags: ["Vue", "NASA API"]
        },
        {
            name: "Portfolio",
            id: "portfolio",
            github: "https://github.com/jonathanbout/portfolio",
            demo: "https://jonathanbout.com",
            description: {
                en: "This website! My personal portfolio website, built with Vue.js. To support a broader audience, it's available in both English and Dutch using i18n and two domains.",
                nl: "Deze website! Mijn persoonlijke portfolio website, gebouwd met Vue.js. Om een breder publiek te ondersteunen, is deze beschikbaar in zowel het Engels als het Nederlands met behulp van i18n en twee domeinen."
            },
            tags: ["Vue", "Portfolio"]
        }
    ] as Project[],
    tags: [
        {
            name: "Vue",
            color: "#41b883",
            textColor: "#213547",
            url: "https://vuejs.org"
        },
        {
            name: "NASA API",
            color: "#0032a0",
            textColor: "#fff",
            url: "https://api.nasa.gov"
        },
        {
            name: "Docker",
            color: "#1D63ED",
            textColor: "#fff",
            url: "https://www.docker.com"
        },
        {
            name: "Apache",
            color: "#282661",
            textColor: "#fff",
            url: "https://httpd.apache.org"
        },
        {
            name: "Ubuntu",
            color: "#E95420",
            textColor: "#fff",
            url: "https://ubuntu.com"
        },
        {
            name: "Linux",
            color: "#000",
            textColor: "#fff",
            url: "https://www.linux.org"
        },
        {
            name: "MySQL",
            color: "#00758F",
            textColor: "#fff",
            url: "https://www.mysql.com"
        }
    ] as Tag[]
}

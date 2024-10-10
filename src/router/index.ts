import { createRouter as createRouterInternal, createWebHistory, type RouteLocationNormalized } from "vue-router"
import HomeView from "../views/HomeView.vue"
import { domainsByLocale, type Locale, i18n } from "@/localizer"

const router = createRouterInternal({
    history: createWebHistory(import.meta.env.BASE_URL),
    // create some routes with RegEx
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            children: []
        },
        {
            path: "/projects",
            name: "projects",
            component: () => import("../views/projects/ProjectsView.vue"),
            meta: {
                title: "projects.title"
            }
        },
        {
            path: "/privacy",
            children: [
                {
                    path: "programmer-watchface",
                    meta: {
                        title: "Programmer Watchface Privacy Policy"
                    },
                    name: "watchface-privacy",
                    component: () => import("../views/privacy/WatchfacePrivacyPolicy.vue")
                }
            ]
        },
        {
            path: "/contact",
            name: "contact",
            component: () => import("../views/contact/ContactView.vue"),
            meta: {
                title: "contact.title"
            }
        },
        {
            path: "/:fullPath(.*)",
            name: "not-found",
            meta: {
                title: "errorPage.not-found-title"
            },
            component: () => import("../views/NotFoundView.vue")
        }
    ]
})

function setDocumentTitle(to: RouteLocationNormalized) {
    let title = "Jonathan Bout"

    if (typeof to.meta.title === "string") {
        title = i18n.global.t(to.meta.title).toString() + " • " + title
    }

    const elementsToSetTitle = document.querySelectorAll("[data-set-page-title]")

    for (const element of elementsToSetTitle) {
        const value = element.getAttribute("data-set-page-title") ?? "textContent"

        element.setAttribute(value, title)
    }

    const elementsToSetDomain = document.querySelectorAll("[data-set-domain]")

    for (const element of elementsToSetDomain) {
        const value = element.getAttribute("data-set-domain") ?? "href"

        element.setAttribute(value, location.hostname)
    }

    document.title = title
}

function updateLinks() {
    // set the canonical link to the current URL with https
    let linkElement = document.querySelector("link[rel=canonical]")

    if (!linkElement) {
        linkElement = document.createElement("link")
        linkElement.setAttribute("rel", "canonical")
        document.head.appendChild(linkElement)
    }

    const url = location.href.replace(/(?:#|\?).*$/, "").replace(/^http:\/\//, "https://")

    linkElement.setAttribute("href", url)

    // set the alternate links to the other domains to have the same path
    for (const key of Object.keys(domainsByLocale)) {
        const locale = key as Locale

        const element = document.querySelector(`link[rel=alternate][hreflang=${locale}]`)
        if (element) {
            element.setAttribute("href", domainsByLocale[locale] + location.pathname)
        } else {
            const link = document.createElement("link")
            link.setAttribute("rel", "alternate")
            link.setAttribute("hreflang", locale)
            link.setAttribute("href", domainsByLocale[locale] + location.pathname)
            document.head.appendChild(link)
        }
    }

    // set the x-default link to the English domain
    const element = document.querySelector("link[rel=alternate][hreflang=x-default]")
    if (element) {
        element.setAttribute("href", domainsByLocale.en + location.pathname)
    } else {
        const link = document.createElement("link")
        link.setAttribute("rel", "alternate")
        link.setAttribute("hreflang", "x-default")
        link.setAttribute("href", domainsByLocale.en + location.pathname)
        document.head.appendChild(link)
    }
}

function resetScroll() {
    window.scrollTo(0, 0)
}

router.beforeEach((to, from, next) => {
    setDocumentTitle(to)
    next()
})

updateLinks()

router.afterEach(setDocumentTitle)
router.afterEach(updateLinks)
router.afterEach(resetScroll)

export const createRouter = () => router

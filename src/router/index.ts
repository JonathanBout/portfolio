import { createRouter as createRouterInternal, createWebHistory, type RouteLocationNormalized } from "vue-router"
import HomeView from "../views/HomeView.vue"

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
            component: () => import("../views/projects/ProjectsView.vue")
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
            path: "/:fullPath(.*)",
            name: "not-found",
            component: () => import("../views/NotFoundView.vue")
        }
    ]
})

function setDocumentTitle(to: RouteLocationNormalized) {
    document.title = (to.meta.title || "Jonathan Bout") as string
}

function setCanonical() {
    let linkElement = document.querySelector("link[rel=canonical]")

    if (!linkElement) {
        linkElement = document.createElement("link")
        linkElement.setAttribute("rel", "canonical")
        document.head.appendChild(linkElement)
    }

    const url = location.href.replace(/(?:#|\?).*$/, "").replace(/^http:\/\//, "https://")

    linkElement.setAttribute("href", url)
}

function resetScroll() {
    window.scrollTo(0, 0)
}

router.beforeEach((to, from, next) => {
    setDocumentTitle(to)
    next()
})

setCanonical()

router.afterEach(setDocumentTitle)
router.afterEach(setCanonical)
router.afterEach(resetScroll)

export const createRouter = () => router

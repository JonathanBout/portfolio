import { createRouter as createRouterInternal, createWebHistory } from "vue-router"
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
                    component: () => import("../views/WatchfacePrivacyPolicy.vue")
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

const setDocumentTitle = (to: { meta: any }) => {
    document.title = (to.meta.title as string) || "Jonathan Bout"
}
router.beforeEach((to, from, next) => {
    setDocumentTitle(to)
    next()
})
router.afterEach(setDocumentTitle)

export const createRouter = () => router

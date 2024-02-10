import { createRouter, createWebHistory } from "vue-router"
import { HomeView, NotFoundView } from "../views"

const router = createRouter({
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
            path: "/:fullPath(.*)",
            name: "not-found",
            component: NotFoundView
        }
    ]
})

export default router

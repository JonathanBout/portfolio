import { createRouter, createWebHistory } from "vue-router"
import { HomeView } from "../views"

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
            path: "/projects",
            name: "projects",
            component: () => import("../views/ProjectsView.vue")
        },
        {
            path: "/:fullPath(.*)",
            name: "not-found",
            component: () => import("../views/NotFoundView.vue")
        }
    ]
})

export default router

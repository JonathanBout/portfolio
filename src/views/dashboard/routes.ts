import { type RouterOptions } from "vue-router"

export default {
    path: "/dash",
    name: "Dashboard Home",
    children: [
        {
            path: "/dash",
            name: "Dashboard",
            component: () => import("./DashboardLayout.vue"),
            children: [
                {
                    path: "",
                    component: () => import("./DashboardView.vue")
                },
                {
                    path: "cache",
                    component: () => import("./CacheView.vue")
                }
            ]
        },
        {
            path: "/dash/auth/login",
            name: "Dashboard Login",
            component: () => import("./authentication/LoginView.vue")
        }
    ]
} as RouterOptions["routes"][number]

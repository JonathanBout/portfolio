import { type RouterOptions } from "vue-router"

export default {
    path: "/dash",
    children: [
        {
            path: "/dash",
            component: () => import("./DashboardLayout.vue"),
            children: [
                {
                    path: "",
                    name: "Dashboard Home",
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

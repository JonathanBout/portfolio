import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import PrivacyPolicyJSONWatchfaceView from "../views/PrivacyPolicyJSONWatchfaceView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/json-watchface-privacy-policy",
      name: "JSON Watch Face Privacy Policy",
      component: PrivacyPolicyJSONWatchfaceView
    },
    {
      // fallback to 404 page
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue")
    }
  ]
})

export default router

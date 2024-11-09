import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import server, { type Route } from "."
import axios from "axios"
import { ref } from "vue"

axios.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (!err.response || !err.response.status || !err.config || err.config.isRetryRequest) {
            return Promise.reject(err)
        }

        const config = err.config as AxiosRequestConfig
        const response = err.response as AxiosResponse

        // if the response is a 401 and the request was not a refresh request, try to refresh the access token
        if (
            response.status === 401 &&
            (!config.url ||
                (!config.url.includes("/refresh") && !config.url.includes("/login") && !config.url.includes("/logout")))
        ) {
            if (await refreshAccessToken()) {
                return server.fetch(err.config)
            }
        }

        return Promise.reject(err)
    }
)

server.addHook((request) => {
    request.headers = request.headers || {}

    if (auth.accessToken.value) {
        request.headers.Authorization = `Bearer ${auth.accessToken.value}`
    }

    request.withCredentials = true

    return request
})

function notOk(response: AxiosResponse) {
    return response.status < 200 || response.status >= 300
}

function getAuthRoute(subPath: string): Route {
    return `/api/auth/${subPath.replace(/^\//, "")}` // remove leading slash on the subpath if present
}

async function requestAccessToken(email: string) {
    const response = await server.get(getAuthRoute("refresh"), { email })

    if (notOk(response)) {
        return false
    }

    auth.accessToken.value = response.data.accessToken

    console.debug("received access token")

    return true
}

async function refreshAccessToken() {
    const email = localStorage.getItem("user:email")

    if (!email) {
        return false
    }

    return requestAccessToken(email)
}

const auth = {
    accessToken: ref<string | null>(null),
    isAuthenticated: async () => {
        try {
            // sorry
            return !notOk(await server.get(getAuthRoute("check")))
        } catch (error) {
            return false
        }
    },
    login: async (email: string, password: string) => {
        const response = await server.post(getAuthRoute("login"), { email, password })

        if (notOk(response)) {
            return false
        }

        if (!(await requestAccessToken(email))) {
            return false
        }

        localStorage.setItem("user:email", email)

        return true
    },
    logout: async () => {
        auth.accessToken.value = null

        localStorage.removeItem("user:email")

        await server.post(getAuthRoute("logout"))
    }
}

export default auth

import axios, { type AxiosRequestConfig } from "axios"

// empty, as it is on the same domain
export type Route = `/${string}`
export type QueryParameters = { [key: string]: string | number | boolean }
export type Body = { [key: string]: unknown }

export type RequestHook = (request: AxiosRequestConfig) => AxiosRequestConfig

const productionUrl = "https://jonathanbout.com"
const hooks: RequestHook[] = []

function configuredBaseUrl() {
    let url = import.meta.env.VITE_BACKEND_URL || productionUrl

    if (url.endsWith("/")) {
        url = url.slice(0, -1)
    }

    return url
}

function getPath(route: Route = "/", query: QueryParameters = {}) {
    let url = configuredBaseUrl()

    let queryString = "?"

    for (const key in query) {
        let value = query[key].toString()

        queryString += `${key}=${value}&`
    }

    queryString = queryString.slice(0, -1)

    const fullUrl = url + route + queryString

    return fullUrl
}

async function fetch(options: AxiosRequestConfig = {}) {
    for (const hook of hooks) {
        options = hook(options)
    }

    const response = await axios.request(options)

    return response
}

export default {
    addHook(hook: RequestHook) {
        hooks.push(hook)
    },
    fetch,
    async get(route: Route, query: QueryParameters = {}) {
        return await fetch({
            method: "GET",
            url: getPath(route, query)
        })
    },
    async post(route: Route, body?: Body, query: QueryParameters = {}) {
        return await fetch({
            method: "POST",
            data: body && JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            url: getPath(route, query)
        })
    },
    getPath,
    async getBlob(route: Route, query: QueryParameters = {}) {
        const result = await fetch({
            method: "GET",
            url: getPath(route, query),
            responseType: "blob"
        })

        return URL.createObjectURL(result.data)
    },
    async getHealth(simple = false) {
        const result = await fetch({
            method: "GET",
            url: getPath("/api/_health", { simple })
        })

        console.debug("health", result.data)

        return result 
    }
}

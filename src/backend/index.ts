// empty, as it is on the same domain
const productionUrl = ""
export type Route = `/${string}`
export type QueryParameters = { [key: string]: string }
export type Body = { [key: string]: unknown }

function getPath(route: Route = "/", query: QueryParameters) {
    let url = import.meta.env.PROD
        ? productionUrl
        : (import.meta.env.VITE_BACKEND_URL as string) || "https://jonathanbout.com"

    if (url.endsWith("/")) {
        url = url.slice(0, -1)
    }

    let queryString = "?"

    for (const key in query) {
        queryString += `${key}=${query[key]}&`
    }

    queryString = queryString.slice(0, -1)

    return url + route + queryString
}


export default {
    async get(route: Route, query: QueryParameters = {}) {
        const fullUrl = new URL(getPath(route, query))

        return await fetch(fullUrl)
    },
    async post(route: Route, body: Body, query: QueryParameters = {}) {
        const fullUrl = new URL(getPath(route, query))

        return await fetch(fullUrl, {
            method: "POST",
            body: JSON.stringify(body)
        })
    },
}
// empty, as it is on the same domain
export type Route = `/${string}`
export type QueryParameters = { [key: string]: string }
export type Body = { [key: string]: unknown }

const productionUrl = ""

function configuredBaseUrl() {
    const url = import.meta.env.VITE_BACKEND_URL || productionUrl

    console.debug(`got base url ${url}`)

    return url
}

function getPath(route: Route = "/", query: QueryParameters) {
    let url = configuredBaseUrl()

    if (url.endsWith("/")) {
        url = url.slice(0, -1)
    }

    let queryString = "?"

    for (const key in query) {
        queryString += `${key}=${query[key]}&`
    }

    queryString = queryString.slice(0, -1)

    const fullUrl = url + route + queryString
    console.debug(`got path ${fullUrl}`)
    return fullUrl
}

async function fetch(route: Route, query: QueryParameters, options: RequestInit = {}) {
    const fullUrl = getPath(route, query)

    const response = await window.fetch(fullUrl, options)

    return response
}

export default {
    async get(route: Route, query: QueryParameters = {}) {
        return await fetch(route, query, {
            method: "GET"
        })
    },
    async post(route: Route, body: Body, query: QueryParameters = {}) {
        return await fetch(route, query, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

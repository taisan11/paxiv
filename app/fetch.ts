const PIXIV_DEFAULT_HEADERS = {
    "Accept": "application/json",
    "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
    "DNT": "1",
    "Referer": "https://www.pixiv.net/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36"
} as const

function normalizeHeaders(headers?: HeadersInit): Headers {
    return new Headers(headers)
}

async function _fetch(url: string | URL, init?: RequestInit, lang: string = "ja"): Promise<Response> {
    const formattedUrl = new URL(url)
    formattedUrl.searchParams.set("lang", lang)
    formattedUrl.searchParams.set("version", "8665b63a37a52408c102f586c91b13250ec0a1b2")

    const headers = normalizeHeaders(init?.headers)
    for (const [key, value] of Object.entries(PIXIV_DEFAULT_HEADERS)) {
        if (!headers.has(key)) {
            headers.set(key, value)
        }
    }

    const requestInit: RequestInit = {
        ...init,
        headers
    }

    if (import.meta.env.DEV) {
        return fetch(formattedUrl, requestInit)
    }

    const proxyUrl = "https://paxiv.taisan11.dev/proxy/" + formattedUrl
    const proxyResponse = await fetch(proxyUrl, requestInit)
    if (proxyResponse.ok) {
        return proxyResponse
    }

    return fetch(formattedUrl, requestInit)
}

export function withAuth(
    PHPSESSID?: string,
    CSRFToken?: string,
    UserID?: string,
    init: RequestInit = {}
): RequestInit {
    const headers = normalizeHeaders(init.headers)
    //色々bypass用
    headers.set("Origin", "https://www.pixiv.net")
    // headers.set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36")


    if (CSRFToken) {
        headers.set("X-Csrf-Token", CSRFToken)
    }

    if (UserID) {
        headers.set("x-user-id", UserID)
    }

    if (PHPSESSID) {
        const cookie = headers.get("Cookie")
        if (cookie && cookie.includes("PHPSESSID=")) {
            headers.set("Cookie", cookie)
        } else if (cookie) {
            headers.set("Cookie", `${cookie}; PHPSESSID=${PHPSESSID};`)
        } else {
            headers.set("Cookie", `PHPSESSID=${PHPSESSID};`)
        }
    }

    return {
        ...init,
        headers
    }
}

export { _fetch as fetch }

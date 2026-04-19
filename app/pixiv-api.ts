import type { Context } from "hono"
import { getCookie } from "hono/cookie"
import { fetch, withAuth } from "@/fetch"
import { cache } from "@/util"

interface PixivAuth {
    PHPSESSID?: string
    csrfToken?: string
    userId?: string
}

function getPixivAuth(c: Context): PixivAuth {
    const PHPSESSID = getCookie(c, "PHPSESSID")
    const csrfToken = getCookie(c, "X-Csrf-Token")
    const userId = getCookie(c, "userId")
    return { PHPSESSID, csrfToken, userId }
}

export async function fetchPixivJson<T>(
    c: Context,
    url: string,
    init?: RequestInit,
    cacheable: boolean = true
): Promise<T> {
    const auth = getPixivAuth(c)
    const requestInit = withAuth(auth.PHPSESSID, auth.csrfToken, auth.userId, init)
    const method = (requestInit.method ?? "GET").toUpperCase()
    const hasAuth = Boolean(auth.PHPSESSID || auth.csrfToken || auth.userId)
    const useSharedCache = cacheable && method === "GET" && !hasAuth

    const response = useSharedCache
        ? await cache(url, () => fetch(url, requestInit))
        : await fetch(url, requestInit)

    return response.json() as Promise<T>
}

import type { Context } from "hono"

export function url2imageURL(url: string, host: string): string {
    const i = new URL(url)
    if (i.hostname === "i.pximg.net") {
        return `/proxy/img${i.pathname}`
    }
    throw new Error("Invalid URL")
}

export const host = (c:Context) => c.env.HOST as string

const cachebase = caches.default;

export function cache(key: URL|string, value: Response):Response {
    cachebase.match(key).then((v) => {
        if (v) return v
        cachebase.put(key, value)
    })
    return value
}

export function deleteCache(key: URL|string) {
    cachebase.delete(key)
}
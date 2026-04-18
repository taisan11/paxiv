import type { Context } from "hono"

export function url2imageURL(url: string): string {
    if (!url) {return ""}
    const i = new URL(url)
    if (i.hostname === "i.pximg.net") {
        if (import.meta.env.DEV) {
            return `/proxy/img${i.pathname}`
        } else {
            return `https://paxiv.taisan11.deno.net/img${i.pathname}`
        }
    }
    throw new Error("Invalid URL")
}

// export const host = (c:Context) => c.env.HOST as string

const cachebase: Cache = (caches as unknown as { default: Cache }).default;

export async function cache(key: URL|string, value: Response): Promise<Response> {
    const cached = await cachebase.match(key);
    if (cached) return cached;
    await cachebase.put(key, value.clone());
    return value;
}

export function sanitizeHtml(html: string): string {
    return html
        // script/style タグとその内容を削除
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        // イベントハンドラ属性を削除
        .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
        // javascript: スキームを無効化
        .replace(/javascript\s*:/gi, '');
}

export function deleteCache(key: URL|string) {
    cachebase.delete(key)
}

export function normalizePixivMapValues<T>(value: Record<string, T | null> | T[] | null | undefined): T[] {
    if (!value) return []
    if (Array.isArray(value)) return value.filter((v): v is T => v !== null && v !== undefined)
    return Object.values(value).filter((v): v is T => v !== null && v !== undefined)
}

export function normalizePixivIdList(value: Record<string, unknown> | string[] | null | undefined): string[] {
    if (!value) return []
    if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string")
    return Object.keys(value)
}

export function paginateItems<T>(items: T[], currentPage: number, perPage: number): {
    page: number
    lastPage: number
    pagedItems: T[]
} {
    const lastPage = Math.max(1, Math.ceil(items.length / perPage))
    const safePage = Math.max(1, Math.min(Number.isFinite(currentPage) ? Math.floor(currentPage) : 1, lastPage))
    const start = (safePage - 1) * perPage
    return {
        page: safePage,
        lastPage,
        pagedItems: items.slice(start, start + perPage)
    }
}

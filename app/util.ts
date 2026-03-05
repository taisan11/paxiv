import type { Context } from "hono"

export function url2imageURL(url: string): string {
    if (!url) {return ""}
    const i = new URL(url)
    if (i.hostname === "i.pximg.net") {
        if (import.meta.env.DEV) {
            return `/proxy/img${i.pathname}`
        } else {
            return `https://paxiv-proxy-11.deno.dev/img${i.pathname}`
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
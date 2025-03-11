import { Hono } from "hono";
import {proxy} from "hono/proxy"

const cache = await caches.open("my-cache");
const app = new Hono();

app.all("/proxy/:url", async (c) => {
    const cacheResponse = await cache.match(c.req.raw);
    if (cacheResponse) {
        return cacheResponse;
    } else {
        const re = await proxy(`https://${c.req.param().url}`, c.req.raw);
        cache.put(c.req.raw, re);
        return re;
    }
})

app.get("/img/:path{.+\\.(png|jpg)}", async (c) => {
    const cache = await caches.open("image")
    const req = new Request(`http://i.pximg.net/${c.req.param('path')}`, {
        headers: {
            Referer: 'https://www.pixiv.net/',
        },
    })

    const res = await fetch(req)
    cache.put(req, res.clone())
    return c.body(await res.arrayBuffer())
})

export default app;
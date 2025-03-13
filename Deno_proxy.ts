import { Hono } from "hono";
import {proxy} from "hono/proxy"
import { cors } from "hono/cors";
import {etag} from "hono/etag"
import {logger} from "hono/logger"

const cache = await caches.open("my-cache");
const app = new Hono();

app.use(cors());
app.use(etag());
app.use(logger());

app.all("/proxy/:url{.+}", async (c) => {
    const cacheResponse = await cache.match(c.req.raw);
    if (cacheResponse) {
        return cacheResponse;
    } else {
        const re = await proxy(c.req.url.replace("https://paxiv-proxy-11.deno.dev/proxy/",""), c.req.raw);
        const cacheRequest = new Request(c.req.url, c.req);
        cache.put(cacheRequest, re);
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
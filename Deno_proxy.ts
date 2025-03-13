import { Hono } from "hono";
import {proxy} from "hono/proxy"
import { cors } from "hono/cors";
import {etag} from "hono/etag"

const cache = await caches.open("my-cache");
const app = new Hono();

app.use(cors());
app.use(etag());

app.all("/proxy/:url{.+}", async (c) => {
    const cacheResponse = await cache.match(c.req.raw);
    if (cacheResponse) {
        console.log(await cacheResponse.clone().text())
        return cacheResponse;
    } else {
        const re = await proxy(c.req.raw.url, c.req.raw);
        cache.put(c.req.raw, re);
        console.log(await re.clone().text())
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
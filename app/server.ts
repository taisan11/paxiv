import { createApp } from 'honox/server'
import { showRoutes } from 'hono/dev'
import {bodyLimit} from "hono/body-limit"
import {secureHeaders} from "hono/secure-headers"
import {etag} from "hono/etag"
import {cors} from "hono/cors"
import {proxy} from "hono/proxy"
import {cache} from "hono/cache"
import {logger} from "hono/logger"

const app = createApp()

app.use(logger())
app.use(bodyLimit({maxSize: 50 * 1024}))
app.use(secureHeaders())
app.use(cors({
  origin:"*",
  allowMethods:["GET"],
  maxAge:600
}))
app.use(etag())

app.get(
  '*',
  cache({
    cacheName: 'my-app',
    cacheControl: 'max-age=1209600',
  })
)

// Image proxy with cache
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

// Proxy with caching
app.all("/proxy/:url{.+}", async (c) => {
    const cache = await caches.open("my-cache");
    const url = c.req.url.replace(/https?:\/\/[^/]+\/proxy\//, "")
    const cacheRequest = new Request(url, c.req.raw.clone() as unknown as RequestInit);
    const cacheResponse = await cache.match(cacheRequest);
    if (cacheResponse) {
        return cacheResponse
    } else {
        const re = await proxy(url, c.req.raw);
        cache.put(cacheRequest, re.clone());
        return re;
    }
})

if (import.meta.env.DEV) {
  showRoutes(app, { verbose: true })
}

export default app

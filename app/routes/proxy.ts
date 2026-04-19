import { Hono } from "hono"

const app = new Hono()

app.get("/img/:path{.+\\.(png|jpg)}", async (c) => {
    const cache = await caches.open("image")
    const req = new Request(`http://i.pximg.net/${c.req.param('path')}`, {
        headers: {
            Referer: 'https://www.pixiv.net/',
        },
    })

    const cached = await cache.match(req)
    if (cached) {
        return cached
    }

    const res = await fetch(req)
    if (res.ok) {
        await cache.put(req, res.clone())
    }
    return res
})

export default app

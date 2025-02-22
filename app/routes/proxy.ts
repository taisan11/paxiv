import { Hono } from "hono"

const app = new Hono()

const cache = await caches.open("image")

app.get("/img/:path{.+\\.(png|jpg)}", async (c) => {
    const req = new Request(`http://i.pximg.net/${c.req.param('path')}`, {
        headers: {
            Referer: 'https://www.pixiv.net/',
        },
    })

    const res = await fetch(req)
    cache.put(req, res.clone())
    return c.body(await res.arrayBuffer())
})

export default app
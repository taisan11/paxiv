import { Hono } from "hono"

const app = new Hono()

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

export default app
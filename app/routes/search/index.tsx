import {createRoute} from "honox/factory"

export default createRoute((c) => {
    const current = new URL(c.req.url)
    return c.redirect(`/search/i${current.search}`)
})

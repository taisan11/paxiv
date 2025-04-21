import {createRoute} from "honox/factory"
import {UserIllusts} from "@/types"
import { url2imageURL,host,cache } from "@/util"
import {fetch} from "@/fetch"

export default createRoute(async (c) => {
    const userId = c.req.param('id')
    const seriesid = c.req.param('seriesid')
    return c.redirect(`/series/${seriesid}`)
})
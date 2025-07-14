import {createHono} from "honox/factory"
import {UserIllustsUnder} from "@/types"
import { cache } from "@/util"
import { fetch } from "@/fetch"

const app = createHono()

app.get("/Under/:id", async (c) => {
    const userIllustsUrl = `https://www.pixiv.net/touch/ajax/illust/user_illusts?user_id=${c.req.param("id")}`
    const userIllustsResp = cache(userIllustsUrl, await fetch(userIllustsUrl))
    const userIllustsData = await userIllustsResp.json() as UserIllustsUnder
    if (userIllustsData.error) {
        return c.json({ error: true, message: userIllustsData.message })
    }
    return c.json(userIllustsData.body.user_illust_ids)
})

export default app
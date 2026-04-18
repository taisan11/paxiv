import {createHono} from "honox/factory"
import {AjaxUserProfileAllResponse} from "@/types/ajax"
import { normalizePixivIdList } from "@/util"
import { fetchPixivJson } from "@/pixiv-api"

const app = createHono()

app.get("/Under/:id", async (c) => {
    const userIllustsUrl = `https://www.pixiv.net/ajax/user/${c.req.param("id")}/profile/all?sensitiveFilterMode=userSetting`
    const userIllustsData = await fetchPixivJson<AjaxUserProfileAllResponse>(c, userIllustsUrl)
    if (userIllustsData.error) {
        return c.json({ error: true, message: userIllustsData.message })
    }
    const ids = normalizePixivIdList(userIllustsData.body.illusts)
    return c.json(ids)
})

export default app

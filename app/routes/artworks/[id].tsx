import {createRoute} from "honox/factory"
import {illustdetails} from "@/types"
import { url2imageURL,host,cache } from "@/util"

export default createRoute(async (c) => {
    const illustId = c.req.param('id')
    const iluAPIurl = `https://www.pixiv.net/touch/ajax/illust/details?illust_id=${illustId}`
    const illustresp = cache(iluAPIurl,await fetch(iluAPIurl))
    const illustdata: illustdetails = await illustresp.json()
    return c.render(<>
        <h1>{illustdata.body.illust_details.title}</h1>
        <img loading="lazy" src={url2imageURL(illustdata.body.illust_details.url, host(c))} alt={illustdata.body.illust_details.alt} />
        <p>{illustdata.body.illust_details.meta.description}</p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <a href={`https://www.pixiv.net/artworks/${illustId}`} target="_blank">Pixivで見る</a>
            <a href={`https://www.pixiv.net/member_illust.php?mode=medium&illust_id=${illustId}`} target="_blank">Pixivでコメントする</a>
        </div>
    </>
    )
})
import {createRoute} from "honox/factory"
import {illustdetails} from "@/types"
import { url2imageURL, host, cache } from "@/util"
import { fetch } from "@/fetch"

export default createRoute(async (c) => {
    const illustId = c.req.param('id')
    const iluAPIurl = `https://www.pixiv.net/touch/ajax/illust/details?illust_id=${illustId}`
    const illustresp = cache(iluAPIurl, await fetch(iluAPIurl))
    const illustdata = await illustresp.json() as illustdetails
    return c.render(<>
        {illustdata.body.illust_details.manga_a ?
            illustdata.body.illust_details.manga_a
            .sort((a, b) => a.page - b.page)
            .map((manga, index) => (
                <>
                <img key={index} loading="lazy" src={url2imageURL(manga.url, host(c))} alt={manga.page.toString()} /><br/>
                </>
            ))
            :
            <img loading="lazy" src={url2imageURL(illustdata.body.illust_details.url, host(c))} alt={illustdata.body.illust_details.alt} />
        }
        <p dangerouslySetInnerHTML={{__html:illustdata.body.illust_details.comment_html}}></p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <a href={`https://www.pixiv.net/artworks/${illustId}`} target="_blank">Pixivで見る</a>
        </div>
    </>
    )
})
import {createRoute} from "honox/factory"
import {IllustDetails} from "@/types"
import { url2imageURL, cache, sanitizeHtml } from "@/util"
import { fetch } from "@/fetch"

export default createRoute(async (c) => {
    const illustId = c.req.param('id')
    const iluAPIurl = `https://www.pixiv.net/touch/ajax/illust/details?illust_id=${illustId}`
    const illustresp = await cache(iluAPIurl, await fetch(iluAPIurl))
    const illustdata = await illustresp.json() as IllustDetails
    if (illustdata.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{illustdata.message || "作品の取得に失敗しました。"}</p>
        </>)
    }
    return c.render(<>
        <h1 id="title">{illustdata.body.illust_details.title}</h1>
        {illustdata.body.illust_details.manga_a ?
            illustdata.body.illust_details.manga_a
            .sort((a, b) => a.page - b.page)
            .map((manga, index) => (
                <>
                <img key={index} loading="lazy" src={url2imageURL(manga.url)} alt={manga.page.toString()} /><br/>
                </>
            ))
            :
            <img loading="lazy" src={url2imageURL(illustdata.body.illust_details.url)} alt={illustdata.body.illust_details.alt} />
        }
        <p dangerouslySetInnerHTML={{__html:sanitizeHtml(illustdata.body.illust_details.comment_html)}}></p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <a href={`https://www.pixiv.net/artworks/${illustId}`} target="_blank">Pixivで見る</a>
        </div>
    </>
    )
})
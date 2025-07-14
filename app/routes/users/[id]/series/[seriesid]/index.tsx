import { createRoute } from "honox/factory"
import { seriesdetail, series_content } from "@/types/series"
import { url2imageURL, cache } from "@/util"
import { fetch } from "@/fetch"

export default createRoute(async (c) => {
    const seriesid = c.req.param('seriesid')
    const p = Number(c.req.query("p")) || 1
    const SeriDetailURL = `https://www.pixiv.net/touch/ajax/illust/series/${seriesid}`
    const SeriContentURL = `https://www.pixiv.net/touch/ajax/illust/series_content/${seriesid}?limit=10&last_order=${(p - 1) * 10}`
    const seriDetailResp = cache(SeriDetailURL, await fetch(SeriDetailURL))
    const seriDetailData = await seriDetailResp.json() as seriesdetail
    const seriContentResp = cache(SeriContentURL, await fetch(SeriContentURL))
    const seriContentData = await seriContentResp.json() as series_content
    return c.render(
        <>
            <h1>{seriDetailData.body.series.title}</h1>
            <p>合計{seriDetailData.body.series.total}個のイラスト</p>
            {seriContentData.body.series_contents.map((illust) => (
                <div key={illust.id} style={{ display: 'flex', flexDirection: 'row' }}>
                    <img loading="lazy" src={url2imageURL(illust.url)} alt={illust.title} />
                    <a href={`/artworks/${illust.id}`} target="_blank" rel="noopener noreferrer">{illust.title}</a>
                </div>
            ))}
            <div>
                {p > 1 && <a href={`?p=${p - 1}`} style={{ marginRight: '10px' }}>前に戻る</a>}
                {p < Math.ceil(Number(seriDetailData.body.series.total) / 10) && <a href={`?p=${p + 1}`}>次に進む</a>}
            </div>
        </>
    )
})
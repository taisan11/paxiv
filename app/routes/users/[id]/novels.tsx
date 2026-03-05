import {createRoute} from "honox/factory"
import {UserNovels} from "@/types/novel"
import {UserSeries} from "@/types/series"
import { url2imageURL, cache } from "@/util"
import {fetch} from "@/fetch"

export default createRoute(async (c) => {
    const userId = c.req.param('id')
    const p = Number(c.req.query("p")) || 1
    const NovAPIurl = `https://www.pixiv.net/touch/ajax/user/novels?id=${userId}&p=${p}`
    const SeriesAPIurl = `https://www.pixiv.net/touch/ajax/user/series?id=${userId}&p=${p}`
    const novelsresp = await cache(NovAPIurl,await fetch(NovAPIurl))
    const seriesresp = await cache(SeriesAPIurl,await fetch(SeriesAPIurl))
    const novelsdata = await novelsresp.json() as UserNovels
    const seriesdata = await seriesresp.json() as UserSeries
    return c.render(<>
        <h1>{novelsdata.body.meta.title}</h1>
        <h2>シリーズ</h2>
        {seriesdata.body.series.novels.map((series) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img loading="lazy" src={url2imageURL(series.cover.urls["128x128"])} alt={series.title} />
                <a href={`/series/${series.id}`} target="_blank">{series.title}</a>
            </div>
        ))}
        <p>合計{novelsdata.body.total}個の小説</p>
        <div class="list-base-grid">
        {novelsdata.body.novels.map((novel) => (
            <a href={`/novel/${novel.id}`} key={novel.id} class="list-base-item">
                <img loading="lazy" src={url2imageURL(novel.url)} alt={novel.title} class="list-base-img"/>
            </a>
        ))}
        </div>
        <div class="pagination">
        {p != 1 && <a href={`?p=${p - 1}`}>前に戻る</a>}{p != novelsdata.body.lastPage && <a href={`?p=${p + 1}`}>次に進む</a>}
        </div>
    </>
    )
})
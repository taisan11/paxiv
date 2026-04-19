import { createRoute } from "honox/factory"
import { AjaxIllustSeriesContentResponse, AjaxIllustSeriesDetailResponse } from "@/types/ajax"
import { url2imageURL, toLowResThumbnailURL } from "@/util"
import { fetchPixivJson } from "@/pixiv-api"
import { Pagination } from "@/components/Pagination"

export default createRoute(async (c) => {
    const seriesid = c.req.param('seriesid')
    const p = Number(c.req.query("p")) || 1
    const SeriDetailURL = `https://www.pixiv.net/ajax/illust/series/${seriesid}`
    const SeriContentURL = `https://www.pixiv.net/ajax/illust/series_content/${seriesid}?limit=10&last_order=${(p - 1) * 10}`

    const [seriDetailData, seriContentData] = await Promise.all([
        fetchPixivJson<AjaxIllustSeriesDetailResponse>(c, SeriDetailURL),
        fetchPixivJson<AjaxIllustSeriesContentResponse>(c, SeriContentURL)
    ])

    if (seriDetailData.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{seriDetailData.message || "シリーズ情報の取得に失敗しました。"}</p>
        </>)
    }

    if (seriContentData.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{seriContentData.message || "シリーズ作品の取得に失敗しました。"}</p>
        </>)
    }

    const items = seriContentData.body.series_contents ?? seriContentData.body.thumbnails?.illust ?? []
    const total = Number(seriDetailData.body.series.total)
    const lastPage = Number.isFinite(total) && total > 0 ? Math.ceil(total / 10) : p

    return c.render(
        <>
            <h1>{seriDetailData.body.series.title}</h1>
            <p>合計{seriDetailData.body.series.total}個のイラスト</p>
            {items.length === 0 ? (
                <p class="empty-state">表示できる作品がありません。</p>
            ) : (
                <div class="series-list">
                    {items.map((illust) => (
                        <a key={illust.id} class="series-item" href={`/artworks/${illust.id}`} target="_blank" rel="noopener noreferrer">
                            <img loading="lazy" src={url2imageURL(toLowResThumbnailURL(illust.url))} alt={illust.title} />
                            <span>{illust.title}</span>
                        </a>
                    ))}
                </div>
            )}
            <div>
                <Pagination currentPage={p} lastPage={lastPage} currentUrl={c.req.url} />
            </div>
        </>
    )
})

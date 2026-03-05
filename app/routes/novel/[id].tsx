import {createRoute} from "honox/factory"
import {NovelDetails} from "@/types/novel"
import { url2imageURL, cache, sanitizeHtml } from "@/util"
import {fetch} from "@/fetch"
import {Script} from "@/components/Script"

export default createRoute(async (c) => {
    const novelId = c.req.param('id')
    const NovAPIurl = `https://www.pixiv.net/touch/ajax/novel/details?novel_id=${novelId}`
    const Novelresp = await cache(NovAPIurl,await fetch(NovAPIurl))
    const NovelData = await Novelresp.json() as NovelDetails
    if (NovelData.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{NovelData.message || "小説の取得に失敗しました。"}</p>
        </>)
    }
    const details = NovelData.body.novel_details
    const series = details.series
    const prevWork = details.meta_for_nologin.zengo_id_works.prev
    const nextWork = details.meta_for_nologin.zengo_id_works.next
    const seriesPrev = series?.prev_novel
    const seriesNext = series?.next_novel

    return c.render(<>
        <Script src='/app/novel-settings.ts' />
        <a href={`/users/${details.author_details.user_id}`}>
            {details.author_details.user_name}
        </a>
        <h1 id="title">{details.title}</h1>
        <img loading="lazy" src={url2imageURL(details.url)} alt="表紙"/>
        <p dangerouslySetInnerHTML={{__html:sanitizeHtml(details.comment_html)}}></p>
        <hr />
        <div id="novel-text" class="novel-text">{details.text.split("\n").map((v, i)=>{
            if (v==="[newpage]") {return <hr key={i} />}
            return <p key={i}>{v}</p>
        })}</div>
        {(series || prevWork?.id || nextWork?.id) && (
            <div class="series-nav">
                {series && (
                    <a href={`https://www.pixiv.net/novel/series/${series.id}`} target="_blank" class="series-link">
                        📚 シリーズ: {series.title}
                    </a>
                )}
                <div class="series-prev-next">
                    {(seriesPrev || prevWork?.id) && (
                        <a href={seriesPrev ? `/novel/${seriesPrev.id}` : `/novel/${prevWork!.id}`} class="series-nav-btn">
                            ← {seriesPrev ? seriesPrev.title : prevWork!.title}
                        </a>
                    )}
                    {(seriesNext || nextWork?.id) && (
                        <a href={seriesNext ? `/novel/${seriesNext.id}` : `/novel/${nextWork!.id}`} class="series-nav-btn">
                            {seriesNext ? seriesNext.title : nextWork!.title} →
                        </a>
                    )}
                </div>
            </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <a href={`https://www.pixiv.net/novel/show.php?id=${novelId}`} target="_blank">Pixivで見る</a>
        </div>
    </>
    )
})
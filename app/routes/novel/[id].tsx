import {createRoute} from "honox/factory"
import {AjaxNovelDetailResponse} from "@/types/ajax"
import { url2imageURL, sanitizeHtml } from "@/util"
import { fetchPixivJson } from "@/pixiv-api"
import {Script} from "@/components/Script"

export default createRoute(async (c) => {
    const novelId = c.req.param('id')
    const NovAPIurl = `https://www.pixiv.net/ajax/novel/${novelId}`
    const NovelData = await fetchPixivJson<AjaxNovelDetailResponse>(c, NovAPIurl)
    if (NovelData.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{NovelData.message || "小説の取得に失敗しました。"}</p>
        </>)
    }
    const details = NovelData.body
    const seriesNavData = details.seriesNavData
    const prevWork = seriesNavData?.prev ?? null
    const nextWork = seriesNavData?.next ?? null
    const seriesId = seriesNavData?.seriesId ? String(seriesNavData.seriesId) : null

    return c.render(<>
        <Script src='/app/script/activity.ts' />
        <Script src='/app/script/novel-settings.ts' />
        <a href={`/users/${details.userId}`}>
            {details.userName}
        </a>
        <h1 id="title">{details.title}</h1>
        <div class="client-action-bar">
            <button
                id="bookmark-toggle"
                class="client-action-btn"
                data-bookmark-type="novel"
                data-item-id={details.id}
                data-item-title={details.title}
                type="button"
            >
                ブックマークする
            </button>
        </div>
        <img loading="lazy" src={url2imageURL(details.coverUrl)} alt="表紙"/>
        <p dangerouslySetInnerHTML={{__html:sanitizeHtml(details.description)}}></p>
        <hr />
        <div id="novel-text" class="novel-text">{details.content.split("\n").map((v, i)=>{
            if (v==="[newpage]") {return <hr key={i} />}
            return <p key={i}>{v}</p>
        })}</div>
        {(seriesId || prevWork?.id || nextWork?.id) && (
            <div class="series-nav">
                {seriesId && (
                    <a href={`https://www.pixiv.net/novel/series/${seriesId}`} target="_blank" rel="noopener noreferrer" class="series-link">
                        📚 シリーズ: {seriesNavData?.title}
                    </a>
                )}
                <div class="series-prev-next">
                    {prevWork?.id && (
                        <a href={`/novel/${String(prevWork.id)}`} class="series-nav-btn">
                            ← {prevWork.title}
                        </a>
                    )}
                    {nextWork?.id && (
                        <a href={`/novel/${String(nextWork.id)}`} class="series-nav-btn">
                            {nextWork.title} →
                        </a>
                    )}
                </div>
            </div>
        )}
        <div class="inline-links">
            <a href={`https://www.pixiv.net/novel/show.php?id=${novelId}`} target="_blank" rel="noopener noreferrer">Pixivで見る</a>
        </div>
    </>
    )
})

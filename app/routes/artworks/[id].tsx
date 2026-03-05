import {createRoute} from "honox/factory"
import {IllustDetails} from "@/types"
import { url2imageURL, cache, sanitizeHtml } from "@/util"
import { fetch } from "@/fetch"
import {Script} from "@/components/Script"

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

    const details = illustdata.body.illust_details
    const author = illustdata.body.author_details
    const series = details.series
    const prevWork = details.meta_for_nologin.zengo_id_works.prev
    const nextWork = details.meta_for_nologin.zengo_id_works.next
    const sortedPages = details.manga_a?.sort((a, b) => a.page - b.page) ?? null

    return c.render(<>
        <a href={`/users/${author.user_id}`}>{author.user_name}</a>
        <h1 id="title">{details.title}</h1>
        {sortedPages ? (
            <>
                <button id="open-manga-viewer" class="viewer-open-btn">📖 全画面で読む</button>
                {sortedPages.map((manga, index) => (
                    <>
                    <img key={index} loading="lazy" src={url2imageURL(manga.url)} alt={manga.page.toString()} /><br/>
                    </>
                ))}
                <div id="manga-viewer" class="manga-viewer">
                    <button class="viewer-close" id="close-viewer">✕</button>
                    <div class="viewer-scroll">
                        {sortedPages.map((manga, index) => (
                            <img key={index} src={url2imageURL(manga.url_big || manga.url)} alt={`${manga.page + 1}ページ`} class="viewer-img" loading="lazy" />
                        ))}
                        {/* ビューア情報ページ（最終ページ） */}
                        <div class="viewer-info-page">
                            <p class="viewer-info-author">
                                <a href={`/users/${author.user_id}`}>{author.user_name}</a>
                            </p>
                            <h2 class="viewer-info-title">{details.title}</h2>
                            {details.display_tags.length > 0 && (
                                <div class="viewer-info-tags">
                                    {details.display_tags.slice(0, 10).map(t => (
                                        <a href={`/search/m?q=${encodeURIComponent(t.tag)}`} key={t.tag} class="viewer-tag">{t.tag}</a>
                                    ))}
                                </div>
                            )}
                            {series && (
                                <a href={`/users/${series.user_id}/series/${series.id}`} class="viewer-series-link">
                                    📚 {series.title}
                                </a>
                            )}
                            <div class="viewer-prev-next">
                                {prevWork?.id && <a href={`/artworks/${prevWork.id}`} class="viewer-nav-btn">← 前の作品</a>}
                                {nextWork?.id && <a href={`/artworks/${nextWork.id}`} class="viewer-nav-btn">次の作品 →</a>}
                            </div>
                            <a href={`https://www.pixiv.net/artworks/${illustId}`} target="_blank" class="viewer-pixiv-link">Pixivで見る</a>
                        </div>
                    </div>
                </div>
                <Script src='/app/manga-viewer.ts' />
            </>
        ) : (
            <img loading="lazy" src={url2imageURL(details.url)} alt={details.alt} />
        )}
        <p dangerouslySetInnerHTML={{__html:sanitizeHtml(details.comment_html)}}></p>
        {/* シリーズナビゲーション */}
        {(series || prevWork?.id || nextWork?.id) && (
            <div class="series-nav">
                {series && (
                    <a href={`/users/${series.user_id}/series/${series.id}`} class="series-link">
                        📚 シリーズ: {series.title}
                    </a>
                )}
                <div class="series-prev-next">
                    {prevWork?.id && <a href={`/artworks/${prevWork.id}`} class="series-nav-btn">← {prevWork.title}</a>}
                    {nextWork?.id && <a href={`/artworks/${nextWork.id}`} class="series-nav-btn">{nextWork.title} →</a>}
                </div>
            </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <a href={`https://www.pixiv.net/artworks/${illustId}`} target="_blank">Pixivで見る</a>
        </div>
    </>
    )
})
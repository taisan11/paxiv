import {createRoute} from "honox/factory"
import {AjaxIllustDetailResponse, AjaxIllustPagesResponse} from "@/types/ajax"
import { url2imageURL, sanitizeHtml } from "@/util"
import { fetchPixivJson } from "@/pixiv-api"
import {Script} from "@/components/Script"

export default createRoute(async (c) => {
    const illustId = c.req.param('id')
    const iluAPIurl = `https://www.pixiv.net/ajax/illust/${illustId}`
    const iluPagesUrl = `https://www.pixiv.net/ajax/illust/${illustId}/pages`
    const illustdata = await fetchPixivJson<AjaxIllustDetailResponse>(c, iluAPIurl)
    if (illustdata.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{illustdata.message || "作品の取得に失敗しました。"}</p>
        </>)
    }

    const details = illustdata.body
    const seriesNavData = details.seriesNavData
    const prevWork = seriesNavData?.prev ?? null
    const nextWork = seriesNavData?.next ?? null
    const seriesId = seriesNavData?.seriesId ? String(seriesNavData.seriesId) : null
    const displayTags = details.tags.tags ?? []

    let pages: AjaxIllustPagesResponse["body"] | null = null
    if (details.pageCount > 1) {
        const pagesData = await fetchPixivJson<AjaxIllustPagesResponse>(c, iluPagesUrl)
        if (!pagesData.error) {
            pages = pagesData.body
        }
    }

    return c.render(<>
        <Script src='/app/script/activity.ts' />
        <a href={`/users/${details.userId}`}>{details.userName}</a>
        <h1 id="title">{details.title}</h1>
        <div class="client-action-bar">
            <button
                id="bookmark-toggle"
                class="client-action-btn"
                data-bookmark-type="artworks"
                data-item-id={details.id}
                data-item-title={details.title}
                type="button"
            >
                ブックマークする
            </button>
        </div>
        {pages ? (
            <>
                <button id="open-manga-viewer" class="viewer-open-btn">📖 全画面で読む</button>
                {pages.map((manga, index) => (
                    <>
                    <img key={index} loading="lazy" src={url2imageURL(manga.urls.small)} alt={(index + 1).toString()} /><br/>
                    </>
                ))}
                <div id="manga-viewer" class="manga-viewer">
                    <button class="viewer-close" id="close-viewer">✕</button>
                    <div class="viewer-scroll">
                        {pages.map((manga, index) => (
                            <img key={index} src={url2imageURL(manga.urls.original || manga.urls.regular)} alt={`${index + 1}ページ`} class="viewer-img" loading="lazy" />
                        ))}
                        {/* ビューア情報ページ（最終ページ） */}
                        <div class="viewer-info-page">
                            <p class="viewer-info-author">
                                <a href={`/users/${details.userId}`}>{details.userName}</a>
                            </p>
                            <h2 class="viewer-info-title">{details.title}</h2>
                            {displayTags.length > 0 && (
                                <div class="viewer-info-tags">
                                    {displayTags.slice(0, 10).map(t => (
                                        <a href={`/search/m?q=${encodeURIComponent(t.tag)}`} key={t.tag} class="viewer-tag">{t.tag}</a>
                                    ))}
                                </div>
                            )}
                            {seriesId && (
                                <a href={`/users/${details.userId}/series/${seriesId}`} class="viewer-series-link">
                                    📚 {seriesNavData?.title}
                                </a>
                            )}
                            <div class="viewer-prev-next">
                                {prevWork?.id && <a href={`/artworks/${String(prevWork.id)}`} class="viewer-nav-btn">← 前の作品</a>}
                                {nextWork?.id && <a href={`/artworks/${String(nextWork.id)}`} class="viewer-nav-btn">次の作品 →</a>}
                            </div>
                            <a href={`https://www.pixiv.net/artworks/${illustId}`} target="_blank" rel="noopener noreferrer" class="viewer-pixiv-link">Pixivで見る</a>
                        </div>
                    </div>
                </div>
                <Script src='/app/script/manga-viewer.ts' />
            </>
        ) : (
            <img loading="lazy" src={url2imageURL(details.urls.regular)} alt={details.title} />
        )}
        <p dangerouslySetInnerHTML={{__html:sanitizeHtml(details.description)}}></p>
        {/* シリーズナビゲーション */}
        {(seriesId || prevWork?.id || nextWork?.id) && (
            <div class="series-nav">
                {seriesId && (
                    <a href={`/users/${details.userId}/series/${seriesId}`} class="series-link">
                        📚 シリーズ: {seriesNavData?.title}
                    </a>
                )}
                <div class="series-prev-next">
                    {prevWork?.id && <a href={`/artworks/${String(prevWork.id)}`} class="series-nav-btn">← {prevWork.title}</a>}
                    {nextWork?.id && <a href={`/artworks/${String(nextWork.id)}`} class="series-nav-btn">{nextWork.title} →</a>}
                </div>
            </div>
        )}
        <div class="inline-links">
            <a href={`https://www.pixiv.net/artworks/${illustId}`} target="_blank" rel="noopener noreferrer">Pixivで見る</a>
        </div>
    </>
    )
})

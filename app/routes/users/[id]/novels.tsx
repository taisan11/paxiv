import {createRoute} from "honox/factory"
import {AjaxUserProfileAllResponse, AjaxUserNovelsByIdsResponse} from "@/types/ajax"
import { url2imageURL, normalizePixivIdList, paginateItems, toLowResThumbnailURL } from "@/util"
import { fetchPixivJson } from "@/pixiv-api"
import { Pagination } from "@/components/Pagination"
import { ThumbnailCard } from "@/components/ThumbnailCard"

export default createRoute(async (c) => {
    const userId = c.req.param('id')
    const p = Number(c.req.query("p")) || 1
    const profileAllUrl = `https://www.pixiv.net/ajax/user/${userId}/profile/all?sensitiveFilterMode=userSetting`
    const profileAllData = await fetchPixivJson<AjaxUserProfileAllResponse>(c, profileAllUrl)

    if (profileAllData.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{profileAllData.message || "小説一覧の取得に失敗しました。"}</p>
        </>)
    }

    const novelIds = normalizePixivIdList(profileAllData.body.novels)
    const perPage = 20
    const { page, lastPage, pagedItems: currentIds } = paginateItems(novelIds, p, perPage)

    let novels: NonNullable<AjaxUserNovelsByIdsResponse["body"][string]>[] = []
    if (currentIds.length > 0) {
        const params = new URLSearchParams()
        currentIds.forEach((id) => params.append("ids[]", id))
        const NovAPIurl = `https://www.pixiv.net/ajax/user/${userId}/novels?${params.toString()}`
        const novelsdata = await fetchPixivJson<AjaxUserNovelsByIdsResponse>(c, NovAPIurl)
        if (novelsdata.error) {
            return c.render(<>
                <h1>エラー</h1>
                <p>{novelsdata.message || "小説情報の取得に失敗しました。"}</p>
            </>)
        }
        novels = currentIds
            .map((id) => novelsdata.body[id] ?? null)
            .filter((v): v is NonNullable<typeof v> => v !== null)
    }

    return c.render(<>
        <h1>小説一覧</h1>
        <h2>シリーズ</h2>
        {profileAllData.body.novelSeries.length === 0 ? (
            <p class="empty-state">公開されているシリーズがありません。</p>
        ) : (
            <div class="series-list">
                {profileAllData.body.novelSeries.map((series) => (
                    <a key={series.id} class="series-item" href={`https://www.pixiv.net/novel/series/${series.id}`} target="_blank" rel="noopener noreferrer">
                        <img loading="lazy" src={url2imageURL(series.cover.urls["128x128"])} alt={series.title} />
                        <span>{series.title}</span>
                    </a>
                ))}
            </div>
        )}
        <p>合計{novelIds.length}個の小説</p>
        {novels.length === 0 ? (
            <p class="empty-state">表示できる小説がありません。</p>
        ) : (
            <div class="list-base-grid">
            {novels.map((novel) => (
                <ThumbnailCard
                    key={novel.id}
                    href={`/novel/${novel.id}`}
                    imageSrc={url2imageURL(toLowResThumbnailURL(novel.cover?.urls["240mw"] || novel.url || novel.cover?.urls["480mw"] || novel.cover?.urls.original || ""))}
                    title={novel.title}
                    xRestrict={novel.xRestrict}
                />
            ))}
            </div>
        )}
        <Pagination currentPage={page} lastPage={lastPage} currentUrl={c.req.url} />
    </>
    )
})

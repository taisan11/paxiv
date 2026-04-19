import {createRoute} from "honox/factory"
import {AjaxUserProfileAllResponse, AjaxUserIllustsByIdsResponse} from "@/types/ajax"
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
            <p>{profileAllData.message || "作品一覧の取得に失敗しました。"}</p>
        </>)
    }

    const illustIds = normalizePixivIdList(profileAllData.body.illusts)
    const perPage = 20
    const { page, lastPage, pagedItems: currentIds } = paginateItems(illustIds, p, perPage)

    let illusts: NonNullable<AjaxUserIllustsByIdsResponse["body"][string]>[] = []
    if (currentIds.length > 0) {
        const params = new URLSearchParams()
        currentIds.forEach((id) => params.append("ids[]", id))
        const iluAPIurl = `https://www.pixiv.net/ajax/user/${userId}/illusts?${params.toString()}`
        const illustsdata = await fetchPixivJson<AjaxUserIllustsByIdsResponse>(c, iluAPIurl)
        if (illustsdata.error) {
            return c.render(<>
                <h1>エラー</h1>
                <p>{illustsdata.message || "イラスト情報の取得に失敗しました。"}</p>
            </>)
        }
        illusts = currentIds
            .map((id) => illustsdata.body[id] ?? null)
            .filter((v): v is NonNullable<typeof v> => v !== null)
    }

    return c.render(<>
        <h1>イラスト一覧</h1>
        <p>合計{illustIds.length}個のイラスト</p>
        {illusts.length === 0 ? (
            <p class="empty-state">表示できるイラストがありません。</p>
        ) : (
            <div class="list-base-grid">
                {illusts.map((illust) => (
                    <ThumbnailCard
                        key={illust.id}
                        href={`/artworks/${illust.id}`}
                        imageSrc={url2imageURL(toLowResThumbnailURL(illust.url))}
                        title={illust.title}
                        xRestrict={illust.xRestrict}
                        pageCount={illust.pageCount}
                    />
                ))}
            </div>
        )}
        <Pagination currentPage={page} lastPage={lastPage} currentUrl={c.req.url} />
    </>
    )
})

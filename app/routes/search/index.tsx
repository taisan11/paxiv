import {createRoute} from "honox/factory"
import type {AjaxSearchArtworksResponse} from "@/types/ajax"
import { fetchPixivJson } from "@/pixiv-api"
import { url2imageURL, toLowResThumbnailURL } from "@/util"
import { SearchOptions } from "@/components/SearchOptions"
import { SearchTabBar } from "@/components/SearchTabBar"

//pでページを設定
export default createRoute(async(c)=>{
    const q = c.req.query("q")
    if (!q) return c.render(<>
        <h1>検索</h1>
        <SearchOptions formAction="/search" showOptions={false} />
    </>)
    const params = new URLSearchParams({
        order: "date_d",
        mode: "all",
        p: "1",
        ai_type: "1",
        csw: "0",
        s_mode: "s_tag",
        ratio: ""
    })
    const sarch = await fetchPixivJson<AjaxSearchArtworksResponse>(
        c,
        `https://www.pixiv.net/ajax/search/artworks/${encodeURIComponent(q)}?${params.toString()}`
    )
    const illusts = (sarch.body?.illustManga?.data ?? []).filter((v) => v.url)
    return c.render(<>
        <h1>{q}の検索結果</h1>
        <SearchOptions formAction="/search" currentQuery={q} />
        <SearchTabBar q={q} />
        {illusts.length === 0 ? (
            <p class="empty-state">検索結果が見つかりませんでした。</p>
        ) : (
            <div class="list-base-grid">
                {illusts.map((v) => (
                <a href={`/artworks/${v.id}`} key={v.id} class="list-base-item">
                    <img loading="lazy" src={url2imageURL(toLowResThumbnailURL(v.url))} alt={v.title} class="list-base-img"/>
                </a>
                ))}
            </div>
        )}
    </>)
})

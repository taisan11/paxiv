import {createRoute} from "honox/factory"
import type {AjaxSearchArtworksResponse} from "@/types/ajax"
import { fetchPixivJson } from "@/pixiv-api"
import { url2imageURL, toLowResThumbnailURL } from "@/util"
import { SearchOptions } from "@/components/SearchOptions"
import { SearchTabBar } from "@/components/SearchTabBar"
import { Pagination } from "@/components/Pagination"

//pでページを設定
export default createRoute(async(c)=>{
    const q = c.req.query("q")
    const p = parseInt(c.req.query("p") || "1")
    
    // 検索オプション
    const aiType = c.req.query("ai_type") === "1" ? 1 : 0
    const csw = c.req.query("csw") === "1" ? 1 : 0
    const sMode = c.req.query("s_mode") || "s_tag"
    const type = c.req.query("type") || "illust_and_ugoira"
    
    if (!q) return c.render(<>
        <h1>検索</h1>
        <SearchOptions formAction="/search/i" showType={true} />
    </>)
    
    const params = new URLSearchParams({
        order: "date_d",
        mode: type === "illust_and_ugoira" ? "all" : type,
        p: p.toString(),
        ai_type: aiType.toString(),
        csw: csw.toString(),
        s_mode: sMode,
        ratio: ""
    })

    const sarch = await fetchPixivJson<AjaxSearchArtworksResponse>(
        c,
        `https://www.pixiv.net/ajax/search/artworks/${encodeURIComponent(q)}?${params.toString()}`
    )

    const illusts = (sarch.body?.illustManga?.data ?? [])
        .filter((v) => v?.id)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id))

    return c.render(<>
        <h1>{q}の検索結果</h1>
        <SearchOptions formAction="/search/i" showType={true} currentQuery={q} />
        <SearchTabBar q={q} />
        <div class="list-base-grid">
            {illusts.map((v) => (
            <a href={`/artworks/${v.id}`} key={v.id} class="list-base-item">
                <img loading="lazy" src={url2imageURL(toLowResThumbnailURL(v.url ?? ""))} alt={v.title} class="list-base-img"/>
            </a>
            ))}
        </div>
        <Pagination currentPage={p} lastPage={sarch.body?.illustManga?.lastPage ?? 1} currentUrl={c.req.url} />
    </>)
})

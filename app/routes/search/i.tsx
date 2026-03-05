import {createRoute} from "honox/factory"
import type {SearchIllust} from "@/types/search"
import {fetch} from "@/fetch"
import { url2imageURL } from "@/util"
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
    
    // URLパラメータ構築
    const params = new URLSearchParams({
        include_meta: "1",
        p: p.toString(),
        word: q,
        ai_type: aiType.toString(),
        csw: csw.toString(),
        s_mode: sMode,
        type: type
    })
    
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/search/illusts?${params.toString()}`)).json() as SearchIllust
    sarch.body.illusts = sarch.body.illusts.filter((v) => v.id)
    sarch.body.illusts = sarch.body.illusts.sort((a, b) => parseInt(b.id ?? "0") - parseInt(a.id ?? "0"))
    return c.render(<>
        <h1>{q}の検索結果</h1>
        <SearchOptions formAction="/search/i" showType={true} currentQuery={q} />
        <SearchTabBar q={q} />
        <div class="list-base-grid">
            {sarch.body.illusts.map((v) => (
            <a href={`/artworks/${v.id}`} key={v.id} class="list-base-item">
                <img loading="lazy" src={url2imageURL(v.url ?? "")} alt={v.title} class="list-base-img"/>
            </a>
            ))}
        </div>
        <Pagination currentPage={p} lastPage={sarch.body.lastPage} currentUrl={c.req.url} />
    </>)
})
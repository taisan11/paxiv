import {createRoute} from "honox/factory"
import type {SearchManga} from "@/types/search"
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
    
    if (!q) return c.render(<>
        <h1>検索</h1>
        <SearchOptions formAction="/search/m" />
    </>)
    
    // URLパラメータ構築
    const params = new URLSearchParams({
        include_meta: "1",
        p: p.toString(),
        word: q,
        ai_type: aiType.toString(),
        csw: csw.toString(),
        s_mode: sMode,
        type: "manga"
    })
    
    const sarch = await (
        await fetch(
            `https://www.pixiv.net/touch/ajax/search/illusts?${params.toString()}`
        )
    ).json() as SearchManga
    if (!sarch.body.illusts) {
        return c.render(<>
            <h1>{q}の検索結果</h1>
            <SearchOptions formAction="/search/m" currentQuery={q} />
            <SearchTabBar q={q} />
            <p>該当するマンガが見つからなかったか、リクエストでエラーが発生しました。</p>
        </>)
    }
    sarch.body.illusts = sarch.body.illusts.filter((v) => v.id)
    sarch.body.illusts = sarch.body.illusts.sort((a, b) => parseInt(b.id ?? "0") - parseInt(a.id ?? "0"))
    return c.render(<>
        <h1>{q}の検索結果</h1>
        <SearchOptions formAction="/search/m" currentQuery={q} />
        <SearchTabBar q={q} />
        <div class="list-base-grid">
            {sarch.body.illusts.map((v) => (
            <div key={v.id} class="list-base-item">
                <img loading="lazy" src={url2imageURL(v.url ?? "")} alt={v.title} class="list-base-img"/>
                <a href={`/artworks/${v.id}`}>{v.title}を見る</a>
            </div>
            ))}
        </div>
        <Pagination currentPage={p} lastPage={sarch.body.lastPage} currentUrl={c.req.url} />
    </>)
})
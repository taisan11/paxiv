import {createRoute} from "honox/factory"
import type {SearchNovel} from "@/types/search"
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
    const gs = c.req.query("gs") === "1" ? 1 : 0
    const sMode = c.req.query("s_mode") || "s_tag"
    const workLang = c.req.query("work_lang") || "ja"
    
    if (!q) return c.render(<>
        <h1>検索</h1>
        <SearchOptions formAction="/search/n" showSeriesGroup={true} showWorkLang={true} />
    </>)
    
    // URLパラメータ構築
    const params = new URLSearchParams({
        include_meta: "1",
        p: p.toString(),
        word: q,
        ai_type: aiType.toString(),
        csw: csw.toString(),
        gs: gs.toString(),
        s_mode: sMode,
        work_lang: workLang
    })
    
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/search/novels?${params.toString()}`)).json() as SearchNovel
    sarch.body.novels = sarch.body.novels.filter((v) => v.id)
    sarch.body.novels = sarch.body.novels.sort((a, b) => parseInt(b.id ?? "0") - parseInt(a.id ?? "0"))
    return c.render(<>
        <h1>{q}の検索結果</h1>
        <SearchOptions formAction="/search/n" showSeriesGroup={true} showWorkLang={true} currentQuery={q} />
        <SearchTabBar q={q} />
        <div class="list-base-grid">
            {sarch.body.novels.map((novel) => (
                <div class="list-base-item" key={novel.id}>
                    <img loading="lazy" src={url2imageURL(novel.url ?? "")} alt={novel.title} class="list-base-img"/>
                    <a href={`/novel/${novel.id}`}>{novel.title}</a>
                </div>
            ))}
        </div>
        <Pagination currentPage={p} lastPage={sarch.body.lastPage} currentUrl={c.req.url} />
    </>)
})
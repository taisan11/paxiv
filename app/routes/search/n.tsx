import {createRoute} from "honox/factory"
import type {searchnovel} from "@/types/search"
import {fetch} from "@/fetch"
import { url2imageURL } from "@/util"
import { SearchOptions } from "@/components/SearchOptions"

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
    
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/search/novels?${params.toString()}`)).json() as searchnovel
    sarch.body.novels = sarch.body.novels.filter((v) => v.id)
    sarch.body.novels = sarch.body.novels.sort((a, b) => parseInt(b.id) - parseInt(a.id))
    return c.render(<>
        <h1>{q}の検索結果</h1>
        <SearchOptions formAction="/search/n" showSeriesGroup={true} showWorkLang={true} currentQuery={q} />
        <nav className="search-tab-bar">
            <a href={`/search?q=${q}`}>トップ</a>
            <a href={`/search/i?q=${q}`}>イラスト</a>
            <a href={`/search/m?q=${q}`}>マンガ</a>
            <a href={`/search/n?q=${q}`}>ノベル</a>
        </nav>
        <div class="list-base-grid">
            {sarch.body.novels.map((novel) => (
                <div class="list-base-item" key={novel.id}>
                    <img loading="lazy" src={url2imageURL(novel.url)} alt={novel.title} class="list-base-image"/>
                    <a href={`/novel/${novel.id}`}>{novel.title}</a>
                </div>
            ))}
        </div>
        <div class="pagination">
            {p != 1 && <a href={`?${new URLSearchParams({...Object.fromEntries(new URLSearchParams(c.req.url.split('?')[1] || '')), p: (p - 1).toString()}).toString()}`}>前に戻る</a>}
            {p != sarch.body.lastPage && <a href={`?${new URLSearchParams({...Object.fromEntries(new URLSearchParams(c.req.url.split('?')[1] || '')), p: (p + 1).toString()}).toString()}`}>次に進む</a>}
        </div>
    </>)
})
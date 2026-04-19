import {createRoute} from "honox/factory"
import type {AjaxSearchNovelsResponse} from "@/types/ajax"
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
    const gs = c.req.query("gs") === "1" ? 1 : 0
    const sMode = c.req.query("s_mode") || "s_tag"
    const workLang = c.req.query("work_lang") || "ja"
    
    if (!q) return c.render(<>
        <h1>検索</h1>
        <SearchOptions formAction="/search/n" showSeriesGroup={true} showWorkLang={true} />
    </>)
    
    const params = new URLSearchParams({
        order: "date_d",
        mode: "all",
        p: p.toString(),
        ai_type: aiType.toString(),
        csw: csw.toString(),
        gs: gs.toString(),
        s_mode: sMode,
        work_lang: workLang
    })
    
    const sarch = await fetchPixivJson<AjaxSearchNovelsResponse>(
        c,
        `https://www.pixiv.net/ajax/search/novels/${encodeURIComponent(q)}?${params.toString()}`
    )

    const novels = (sarch.body?.novel?.data ?? [])
        .filter((v) => v?.id)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id))

    return c.render(<>
        <h1>{q}の検索結果</h1>
        <SearchOptions formAction="/search/n" showSeriesGroup={true} showWorkLang={true} currentQuery={q} />
        <SearchTabBar q={q} />
        <div class="list-base-grid">
            {novels.map((novel) => (
                <a href={`/novel/${novel.id}`} class="list-base-item" key={novel.id}>
                        <img
                            loading="lazy"
                            src={url2imageURL(toLowResThumbnailURL(novel.cover?.urls["240mw"] || novel.cover?.urls["480mw"] || novel.cover?.urls.original || novel.url || ""))}
                            alt={novel.title}
                            class="list-base-img"
                        />
                </a>
            ))}
        </div>
        <Pagination currentPage={p} lastPage={sarch.body?.novel?.lastPage ?? 1} currentUrl={c.req.url} />
    </>)
})

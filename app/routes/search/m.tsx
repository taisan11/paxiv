import {createRoute} from "honox/factory"
import type {AjaxSearchMangaResponse} from "@/types/ajax"
import { fetchPixivJson } from "@/pixiv-api"
import { url2imageURL, toLowResThumbnailURL } from "@/util"
import { SearchOptions, normalizeSearchMode } from "@/components/SearchOptions"
import { SearchTabBar } from "@/components/SearchTabBar"
import { Pagination } from "@/components/Pagination"
import { ThumbnailCard } from "@/components/ThumbnailCard"

//pでページを設定
export default createRoute(async(c)=>{
    const q = c.req.query("q")
    const p = parseInt(c.req.query("p") || "1")
    
    // 検索オプション
    const aiType = c.req.query("ai_type") === "1" ? 1 : 0
    const csw = c.req.query("csw") === "1" ? 1 : 0
    const sMode = normalizeSearchMode("manga", c.req.query("s_mode"))
    
    if (!q) return c.render(<>
        <h1>検索</h1>
        <SearchOptions
            formAction="/search/m"
            searchWorkKind="manga"
        />
    </>)
    
    const params = new URLSearchParams({
        order: "date_d",
        mode: "all",
        p: p.toString(),
        ai_type: aiType.toString(),
        csw: csw.toString(),
        s_mode: sMode,
        ratio: "",
        work_lang: "ja"
    })
    
    const sarch = await fetchPixivJson<AjaxSearchMangaResponse>(
        c,
        `https://www.pixiv.net/ajax/search/manga/${encodeURIComponent(q)}?${params.toString()}`
    )

    const mangas = (sarch.body?.manga?.data ?? [])
        .filter((v) => v?.id)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id))

    if (mangas.length === 0) {
        return c.render(<>
            <h1>{q}の検索結果</h1>
            <SearchOptions
                formAction="/search/m"
                currentQuery={q}
                searchWorkKind="manga"
            />
            <SearchTabBar q={q} />
            <p>該当するマンガが見つからなかったか、リクエストでエラーが発生しました。</p>
        </>)
    }

    return c.render(<>
        <h1>{q}の検索結果</h1>
        <SearchOptions
            formAction="/search/m"
            currentQuery={q}
            searchWorkKind="manga"
        />
        <SearchTabBar q={q} />
        <div class="list-base-grid">
            {mangas.map((v) => (
                <ThumbnailCard
                    key={v.id}
                    href={`/artworks/${v.id}`}
                    imageSrc={url2imageURL(toLowResThumbnailURL(v.url ?? ""))}
                    title={v.title}
                    xRestrict={v.xRestrict}
                    pageCount={v.pageCount}
                />
            ))}
        </div>
        <Pagination currentPage={p} lastPage={sarch.body?.manga?.lastPage ?? 1} currentUrl={c.req.url} />
    </>)
})

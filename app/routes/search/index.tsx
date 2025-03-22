import {createRoute} from "honox/factory"
import type {Sarch} from "@/types"
import {fetch} from "@/fetch"
import { host,url2imageURL } from "@/util"

//pでページを設定
export default createRoute(async(c)=>{
    const q = c.req.query("q")
    if (!q) return c.render(<>
        <h1>検索</h1>
        <form action="/search" method="get">
            <input type="text" name="q" id="q" placeholder="キーワード" />
            <button type="submit">検索</button>
        </form>
    </>)
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/tag_portal?word=${encodeURIComponent(q)}`)).json() as Sarch
    sarch.body.illusts.filter((v) => v.url)
    return c.render(<>
        <h1>{sarch.body.tag}の検索結果</h1>
        <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', gap: '1rem',fontsize:'0.8rem',width: '50vw',justifyContent: 'space-between', }}>
            <a href={`/search?q=${q}`}>トップ</a>
            <a href={`/search/i?q=${q}`}>イラスト</a>
            <a href={`/search/m?q=${q}`}>マンガ</a>
            <a href={`/search/n?q=${q}`}>ノベル</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {sarch.body.illusts.map((v) => (
            <div key={v.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img loading="lazy" src={url2imageURL(v.url, host(c))} alt={v.title} style={{ display: 'block', maxWidth: '100%', height: 'auto' }}/>
                <a href={`/artworks/${v.id}`}>{v.title}を見る</a>
            </div>
            ))}
        </div>
    </>)
})
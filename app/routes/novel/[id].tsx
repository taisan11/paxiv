import {createRoute} from "honox/factory"
import {NovelDetails} from "@/types/novel"
import { url2imageURL, cache, sanitizeHtml } from "@/util"
import {fetch} from "@/fetch"

export default createRoute(async (c) => {
    const novelId = c.req.param('id')
    const NovAPIurl = `https://www.pixiv.net/touch/ajax/novel/details?novel_id=${novelId}`
    const Novelresp = await cache(NovAPIurl,await fetch(NovAPIurl))
    const NovelData = await Novelresp.json() as NovelDetails
    if (NovelData.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{NovelData.message || "小説の取得に失敗しました。"}</p>
        </>)
    }
    return c.render(<>
        <h1 id="title">{NovelData.body.novel_details.title}</h1>
        <img loading="lazy" src={url2imageURL(NovelData.body.novel_details.url)} alt="表紙"/>
        <p dangerouslySetInnerHTML={{__html:sanitizeHtml(NovelData.body.novel_details.comment_html)}}></p>
        <hr />
        <div>{NovelData.body.novel_details.text.split("\n").map((v, i)=>{
            if (v==="[newpage]") {return <hr key={i} />}
            return <p key={i}>{v}</p>
        })}</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <a href={`https://www.pixiv.net/novel/show.php?id=${novelId}`} target="_blank">Pixivで見る</a>
        </div>
    </>
    )
})
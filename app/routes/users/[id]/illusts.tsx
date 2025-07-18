import {createRoute} from "honox/factory"
import {UserIllusts} from "@/types"
import { url2imageURL,cache } from "@/util"
import {fetch} from "@/fetch"

export default createRoute(async (c) => {
    const userId = c.req.param('id')
    const p = Number(c.req.query("p")) || 1
    const iluAPIurl = `https://www.pixiv.net/touch/ajax/user/illusts?id=${userId}&p=${p}&type=illust`
    const illustsresp = cache(iluAPIurl,await fetch(iluAPIurl))
    const illustsdata = await illustsresp.json() as UserIllusts
    return c.render(<>
        <h1>{illustsdata.body.meta.title}</h1>
        <p>合計{illustsdata.body.total}個のイラスト</p>
        <div class="list-base-grid">
            {illustsdata.body.illusts.map((illust) => (
                <div key={illust.id} class="list-base-item">
                    <img loading="lazy" src={url2imageURL(illust.url)} alt={illust.title} class="list-base-image" />
                    <a href={`/artworks/${illust.id}`} target="_blank">{illust.title}</a>
                </div>
            ))}
        </div>
        <div class="pagination">
        {p != 1 && <a href={`?p=${p - 1}`}>前に戻る</a>}{p != illustsdata.body.lastPage && <a href={`?p=${p + 1}`}>次に進む</a>}
        </div>
    </>
    )
})
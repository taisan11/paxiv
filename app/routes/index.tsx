import {createRoute} from "honox/factory"
import {SearchBox} from "@/components/searchbox"

export default createRoute((c)=>{
    return c.render(<>
        <h1>Paxiv</h1>
        <p>Paxivはpixivのカスタムクライアントです。</p>
        <a href="/setting">設定を変更する</a><br />
        <a href="/users/11">Pixiv事務局を見る</a><br />
        <a href="/">p<b>a</b>xivに寄付(未実装)</a>
        <h2>検索</h2>
        <SearchBox />
    </>)
})
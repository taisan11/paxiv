import {createRoute} from "honox/factory"

export default createRoute((c)=>{
    return c.render(<>
        <h1>Paxiv</h1>
        <p>Paxivはpixivのカスタムクライアントです。</p>
        <a href="/user/11">Pixiv事務局を見る</a><br />
        <a href="/">paxivに寄付(未実装)</a>
        <h2>検索</h2>
        <form action="/search" method="get">
            <input type="text" name="q" id="q" placeholder="キーワード" />
            <button type="submit">検索</button>
        </form>
    </>)
})
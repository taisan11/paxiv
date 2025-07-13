import {createRoute} from "honox/factory"

export default createRoute(async (c) => {
    return c.render(
        <>
            <h1>履歴</h1>
            <p>端末側の負荷軽減のため最大数が1000件となっています。</p>
            <div class="history-tabs">
                <button id="artworks-tab" class="active">イラスト|漫画</button>
                <button id="novel-tab">ノベル</button>
            </div>
            <ul id="history-list">
                <li>履歴を読み込み中...</li>
            </ul>
            <button id="clear-history-btn" style="display:none;">閲覧履歴を削除</button>
            <a href="/">トップページに戻る</a>
        </>
    );
})
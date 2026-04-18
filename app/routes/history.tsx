import {createRoute} from "honox/factory"
import {Script} from "@/components/Script"

export default createRoute(async (c) => {
    return c.render(
        <>
            <Script src='/app/script/activity.ts' />
            <h1>履歴</h1>
            <p>端末側に保存される履歴・フォロー・ブックマークは最大1000件です。</p>
            <div class="history-tabs">
                <button class="active" data-history-section="history-artworks">閲覧: イラスト|漫画</button>
                <button data-history-section="history-novel">閲覧: ノベル</button>
                <button data-history-section="bookmarks-artworks">ブックマーク: イラスト|漫画</button>
                <button data-history-section="bookmarks-novel">ブックマーク: ノベル</button>
                <button data-history-section="follows">フォロー中</button>
            </div>
            <ul id="history-list">
                <li>履歴を読み込み中...</li>
            </ul>
            <button id="clear-history-btn" style="display:none;">表示中の項目を削除</button>
            <a href="/">トップページに戻る</a>
        </>
    );
})

import { createRoute } from "honox/factory"
import {getCookie,setCookie} from "hono/cookie"
import {Script} from "honox/server"

export default createRoute(async (c) => {
    return c.render(
        <>
            <Script src='/app/setting.ts' />
            <h1>設定</h1>
            <a href="/">トップページに戻る</a>
            <h2>レイアウト</h2>
            <p>カラーテーマを選択してください。</p>
            <select name="thema" id="thema">
                <option value="light">ライト</option>
                <option value="dark">ダーク</option>
                <option value="auto">自動</option>
            </select>
            <button id="save-thema">テーマを保存</button>
        </>
    );
});
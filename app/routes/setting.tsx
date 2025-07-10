import { createRoute } from "honox/factory"
import {getCookie,setCookie} from "hono/cookie"

export default createRoute(async (c) => {
    // Cookieから設定を取得
    const cookieValue = getCookie(c, "settings");
    const settings = cookieValue ? JSON.parse(cookieValue) : {};

    return c.render(
        <>
            <h1>設定</h1>
            <p>現在の設定: {settings.sample ? settings.sample : "未設定"}</p>
            <form method="post">
                <label>
                    サンプル設定:
                    <input name="sample" defaultValue={settings.sample || ""} />
                </label>
                <button type="submit">保存</button>
            </form>
            <p>このページは将来のアップデートで拡張される予定です。</p>
        </>
    );
});

export const POST = createRoute(async (c) => {
    const body = await c.req.parseBody();
    const value = body.sample || "";
    // Cookieに保存（オブジェクトで管理）
    const settings = { sample: value };
    setCookie(c, "settings", JSON.stringify(settings), { maxAge: 60 * 60 * 24 * 300 }); // 300日間有効
    return c.redirect("/setting");
});

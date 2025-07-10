import { createHono } from "honox/factory";

const app = createHono();

export default app.get("*", (c) => {
    // キャッシュ制御ヘッダーを追加
    c.header("Cache-Control", "public, max-age=604800, immutable");

    const path = c.req.path;
    let redirectTo = "/search";
    // パスが /tags/keyword/type の形式の場合に対応
    const match = path.match(/^\/tags\/([^\/]+)\/([^\/]+)$/);
    if (match) {
        const keyword = match[1];
        const type = match[2];
        // typeに応じてリダイレクト先を決定
        let typeSuffix = "";
        if (type === "manga") {
            typeSuffix = "m";
        } else if (type === "novels") {
            typeSuffix = "n";
        } else if (type === "illustrations") {
            typeSuffix = "i";
        }
        redirectTo = `/search/${typeSuffix}?q=${encodeURIComponent(keyword)}`;
        // 既存のqクエリは無視
        return c.redirect(redirectTo);
    }
    const q = c.req.query("q");
    if (q) {
        redirectTo += `?q=${q}`;
    }
    return c.redirect(redirectTo);
});
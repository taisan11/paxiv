import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
    const are = await fetch("https://www.pixiv.net/ajax/street/v2/main",{method:"POST",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"}});
    const data = await are.json() as Record<string, unknown>;
    return c.json(data);
})
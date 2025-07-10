import {createRoute} from "honox/factory"

export default createRoute((c)=>{
    c.header("Cache-Control", "public, max-age=604800, immutable");
    const novelId = c.req.query("id")
    if (!novelId) {
        return c.render(<div>小説IDが指定されていません。</div>);
    }
    return c.redirect(`/novel/${novelId}`)
})
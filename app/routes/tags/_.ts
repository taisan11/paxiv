import {createHono} from "honox/factory";

export default createHono().all((c) => {
    return c.redirect(`/search${c.req.query("q") ? `?q=${c.req.query("q")}` : ""}`);
})
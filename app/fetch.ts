function _fetch(url: string | URL, init?: RequestInit, lang: string = "ja"): Promise<Response> {
    const formattedUrl = new URL(url);
    formattedUrl.searchParams.set("lang", lang);
    formattedUrl.searchParams.set("version", "92ab2445159f62490b3ba509f289ab9350438edb");
    if (import.meta.env.DEV) {
        return fetch(formattedUrl, init);
    } else {
        const proxyUrl = "https://paxiv-proxy-11.deno.dev/proxy/" + formattedUrl;
        return fetch(proxyUrl, init);
    }
}

export { _fetch as fetch };
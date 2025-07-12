function _fetch(url: string | URL, init?: RequestInit, lang: string = "ja"): Promise<Response> {
    const formattedUrl = new URL(url);
    formattedUrl.searchParams.set("lang", lang);
    formattedUrl.searchParams.set("version", "dd36569872a03156be666e0ad061d03a6fe8b94e");
    if (init) {
        init.headers = {
            ...init.headers,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1"
        };
    }
    if (import.meta.env.DEV) {
        return fetch(formattedUrl, init);
    } else {
        const proxyUrl = "https://paxiv-proxy-11.deno.dev/proxy/" + formattedUrl;
        return fetch(proxyUrl, init);
    }
}

export { _fetch as fetch };
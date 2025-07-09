function _fetch(url: string | URL, init?: RequestInit, lang: string = "ja"): Promise<Response> {
    const formattedUrl = new URL(url);
    formattedUrl.searchParams.set("lang", lang);
    formattedUrl.searchParams.set("version", "b3e58c7e8d45f9714abd74d528d8a1333e5d6a3a");
    if (import.meta.env.DEV) {
        return fetch(formattedUrl, init);
    } else {
        const proxyUrl = "https://paxiv-proxy-11.deno.dev/proxy/" + formattedUrl;
        return fetch(proxyUrl, init);
    }
}

export { _fetch as fetch };
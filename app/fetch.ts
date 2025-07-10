function _fetch(url: string | URL, init?: RequestInit, lang: string = "ja"): Promise<Response> {
    const formattedUrl = new URL(url);
    formattedUrl.searchParams.set("lang", lang);
    formattedUrl.searchParams.set("version", "7457520e87f7501b7dbd5de66ffde81be04e15da");
    if (import.meta.env.DEV) {
        return fetch(formattedUrl, init);
    } else {
        const proxyUrl = "https://paxiv-proxy-11.deno.dev/proxy/" + formattedUrl;
        return fetch(proxyUrl, init);
    }
}

export { _fetch as fetch };
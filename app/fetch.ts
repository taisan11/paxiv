// export function fetch(url:string|URL, init?: RequestInit): Promise<Response> {
//     if (import.meta.env.DEV) {
//         return fetch(url, init);
//     } else {
//         const proxyUrl = new URL('https:', url);
//         return fetch(proxyUrl, init);
//     }
// }

const _fetch = import.meta.env.DEV ? fetch : (url:string|URL, init?: RequestInit): Promise<Response> => {
    const proxyUrl = "https://paxiv-proxy-11.deno.dev/proxy/"+new URL(url);
    return fetch(proxyUrl, init);
}

export { _fetch as fetch };
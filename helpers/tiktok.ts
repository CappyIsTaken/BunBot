
export function isTiktok(url: string) {
    return url.includes("tiktok.com")
}

export async function getTiktokID(url: string) {
    let realURL = url
    if(["https://vm.tiktok.com", "https://vt.tiktok.com"].some(u => url.startsWith(u))) {
        const fullURLResp = await fetch(url, {
            method: "HEAD"
        })
        realURL = fullURLResp.url
    }
    realURL = realURL.split("?")[0]
    return realURL.split("/").at(-1)
}

export async function getTiktokVideo(id: string) {
    if(id === "") return
    const resp = await fetch(`https://tiktokv.com/aweme/v1/feed/?aweme_id=${id}`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 OPR/92.0.0.0"
        }
    })
    const data = await resp.json()
    const video = data.aweme_list[0]
    return video["video"]["play_addr"]["url_list"].at(-1)
}
export function isX(url: string) {
    return ["https://x.com", "https://twitter.com"].some(u => url.startsWith(u)) && url.includes("status")
}

export function getXID(url: string) {
    url = url.split("?")[0]
    return url.split("/").at(-1)
}

export async function getXVideo(id: string) {
    
    const resp = await fetch(`https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=${crypto.randomUUID()}`)
    const data = await resp.json()
    const video = data.mediaDetails[0]
    const variants: any[] = video.video_info.variants
    const sorted: any[] = variants.filter(v => "bitrate" in v).sort((a,b) => {
        return a.bitrate - b.bitrate
    })
    return sorted[0].url
}
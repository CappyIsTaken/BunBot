
export async function shortenURL(url: string) {
    var myHeaders = new Headers();
myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0");
myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8");
myHeaders.append("Accept-Language", "en-US,en;q=0.5");
myHeaders.append("Accept-Encoding", "gzip, deflate, br");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Origin", "https://is.gd");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Referer", "https://is.gd/");
myHeaders.append("Upgrade-Insecure-Requests", "1");
myHeaders.append("Sec-Fetch-Dest", "document");
myHeaders.append("Sec-Fetch-Mode", "navigate");
myHeaders.append("Sec-Fetch-Site", "same-origin");
myHeaders.append("Sec-Fetch-User", "?1");
myHeaders.append("TE", "trailers");

var urlencoded = new URLSearchParams();
urlencoded.append("url", encodeURIComponent(url));
urlencoded.append("shorturl", "");
urlencoded.append("opt", "0");

var requestOptions : RequestInit = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};
const resp = await fetch("https://is.gd/create.php", requestOptions)
if(resp.ok) {
    const body = await resp.text()
    const search = '<input type="text" class="tb" id="short_url" value="https://is.gd/'
    const index = body.indexOf(search)+search.length
    if(index) {
        const url =  body.substring(index, index+6)
        return "https://is.gd/" + url
    }
}
}

export function isTiktok(url: string) {
    return url.includes("tiktok.com")
}

export function isInstagram(url: string) {
    return ["https://www.instagram.com/p/", "https://www.instagram.com/reels/"].some(u => url.startsWith(u))
}


export function isX(url: string) {
    return ["https://x.com", "https://twitter.com"].some(u => url.startsWith(u)) && url.includes("status")
}


abstract class URLParser {
    url: string
    source: string = ""
    constructor(url: string) {
        this.url = url
    }
    abstract getPostID(): Promise<string | undefined>
    abstract getMediaURL(): Promise<string | undefined>
}




export class TwitterParser extends URLParser {
    source: string = "X"
    async getPostID(): Promise<string | undefined> {
        this.url = this.url.split("?")[0]
        return this.url.split("/").at(-1)
    }
    async getMediaURL(): Promise<string | undefined> {
        const id = await this.getPostID()
        const resp = await fetch(`https://syndication.twimg.com/tweet-result?id=${id}&token=12345`)
        const data = await resp.json()
        const video = data.mediaDetails[0]
        if(video.type !== "video" && video.type !== "animated_gif") {
        return undefined }
        const variants: any[] = video.video_info.variants
        const sorted: any[] = variants.filter(v => v.content_type.includes("video/mp4")).sort((a, b) => {
            return b.bitrate - a.bitrate
        })
        return sorted[0].url
    }

}

export class TiktokParser extends URLParser {
    source: string = "Tiktok"
    async getPostID(): Promise<string | undefined> {
        let realURL = this.url
        if (["https://vm.tiktok.com", "https://vt.tiktok.com"].some(u => this.url.startsWith(u))) {
            const fullURLResp = await fetch(this.url, {
                method: "HEAD"
            })
            realURL = fullURLResp.url
        }
        realURL = realURL.split("?")[0]
        return realURL.split("/").at(-1)
    }

    async getMediaURL(): Promise<string | undefined> {
        const id = await this.getPostID()
        if (id === "") return
        const resp = await fetch(`https://tiktokv.com/aweme/v1/feed/?aweme_id=${id}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 OPR/92.0.0.0"
            }
        })
        const data = await resp.json()
        const video = data.aweme_list[0]
        return video["video"]["play_addr"]["url_list"].at(-1)
    }

}

export class InstagramParser extends URLParser {
    source: string = "Instagram"
    async getPostID() {
        const regex = "(?:https?:\/\/)?(?:www.)?instagram.com\/?([a-zA-Z0-9\.\_\-]+)?\/([p]+)?([reel]+)?([tv]+)?([stories]+)?\/([a-zA-Z0-9\-\_\.]+)\/?([0-9]+)?"
        return this.url.match(regex)?.at(6)  
    }

    async getMediaURL() {
        const data = new URLSearchParams();
  data.append("url", this.url);
  data.append("obj", "reels");
  data.append("language", "en");
  const headers = new Headers();
  headers.append("Referer", "https://igdown.net");
  headers.append("Origin", "https://igdown.net");
  headers.append(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=utf-8",
  );
  const resp = await fetch("https://social.ioconvert.com/instagram", {
    method: "POST",
    body: data,
    headers: headers,
  });
  const body = await resp.json();
  const key = body.data.key;
  const id = body.data.video.all[0].id;
  return `https://social.ioconvert.com/download?obj=reels&key=${key}&type=video&id=${id}&download=1&file_prefix=igDown&target_id=`
}
}

export class AutoParser {
    static getParser(url: string) : URLParser | undefined {
        if(!url) return undefined
        if(isTiktok(url)) return new TiktokParser(url)
        if(isX(url)) return new TwitterParser(url)
        if(isInstagram(url)) return new InstagramParser(url)
    }
}



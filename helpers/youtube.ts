
class YoutubeEmbedData {
    public title: string
    public authorName: string
    public authorChannelURL: string
    public type: string
    public height: number
    public width: number
    public version: string
    public providerName: string
    public providerURL: string
    public thumbnailWidth: number
    public thumbnailHeight: number
    public thumbnailURL: string
    public embedHTML: string

    constructor(rawJSON: any) {
        this.type = rawJSON.type
        this.version = rawJSON.version
        this.authorChannelURL = rawJSON.author_url
        this.authorName = rawJSON.author_name
        this.title = rawJSON.title
        this.thumbnailHeight = rawJSON.thumbnail_height
        this.thumbnailWidth = rawJSON.thumbnail_width
        this.embedHTML = rawJSON.html
        this.providerName = rawJSON.provider_name
        this.providerURL = rawJSON.provider_url
        this.width = rawJSON.width
        this.height = rawJSON.height
        this.thumbnailURL = rawJSON.thumbnail_url
    }
}



export function isYoutubeURL(url: string) {
    return ["https://www.youtube.com/watch?v=", "https://youtu.be/"].some(v => url.startsWith(v))
}

export async function getYoutubeData(url: string) : Promise<YoutubeEmbedData> {
    const resp = await fetch(`https://youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`)
    const data = await resp.json()
    return new YoutubeEmbedData(data)
}
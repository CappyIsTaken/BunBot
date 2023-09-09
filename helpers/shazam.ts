class Song {
    public id: string
    public releaseDate: string
    public duration: number
    public composers: string
    public artists: string
    public name: string
    public hasLyrics: boolean
    public artwork: string

    constructor(rawSongJSON: any) {
        this.id = rawSongJSON.id
        this.releaseDate = rawSongJSON.attributes.releaseDate
        this.duration = rawSongJSON.attributes.durationInMillis
        this.composers = rawSongJSON.attributes.composerName
        this.name = rawSongJSON.attributes.name
        this.artists = rawSongJSON.attributes.artistName
        this.hasLyrics = rawSongJSON.attributes.hasLyrics
        this.artwork = rawSongJSON.attributes.artwork.url.replace("{w}", rawSongJSON.attributes.artwork.width).replace("{h}", rawSongJSON.attributes.artwork.height)
    }

    async getLyrics() : Promise<string> {
        const lyricsResp = await fetch(`https://www.shazam.com/song/v1/en-US/IL/web/shazam-songs?adamId=${this.id}`)
        const lyricsRespData = await lyricsResp.json()
        const lyrics : Object = lyricsRespData.resources.lyrics
        const lyricsText = Object.values(lyrics)[0].attributes.text
        return lyricsText.join("\n")
    }


}


export async function searchSongs(term: string, limit: number) : Promise<Song[] | null> {
    const resp = await fetch(`https://www.shazam.com/services/amapi/v1/catalog/il/search?types=songs&term=${term}&limit=${limit}`)
    const data = await resp.json()
    const songs : any[] = data.results.songs.data
    const songsObjects : Song[] = songs.map(s => new Song(s))
    return songsObjects
}

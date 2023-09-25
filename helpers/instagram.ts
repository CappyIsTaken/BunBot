

export async function getInstagramMediaURL(url : string) {
    const instagramPython = await Bun.spawn({
        cmd: ["python3", `${__dirname}/python/pygram.py`, url],
        stdout: "pipe"
    })
    const text = await new Response(instagramPython.stdout).text()
    return text
}

export function isInstagramURL(url: string) {
    return ["https://www.instagram.com/reel/", "https://www.instagram.com/p"].some(v => url.startsWith(v))
}
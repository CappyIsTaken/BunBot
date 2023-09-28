
export async function shortenURL(url: string) {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0");
    myHeaders.append("Accept", "/");
    myHeaders.append("Accept-Language", "en-US,en;q=0.5");
    myHeaders.append("Accept-Encoding", "gzip, deflate");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append("Origin", "http://gg.gg/");
    myHeaders.append("DNT", "1");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Referer", "http://gg.gg/");
    var bodyString = `custom_path=&use_norefs=0&long_url=${encodeURIComponent(url)}&app=site&version=0.1`;
    const resp = await fetch("http://gg.gg/create", {
        method: "POST",
        headers: myHeaders,
        body: bodyString,
        redirect: "follow"
    })
    if (resp.ok) return await resp.text()
}
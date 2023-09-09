import axios from "axios"


export function isInstagram(url: string) {
    console.log(url)
    return ["https://www.instagram.com/reel", "https://www.instagram.com/p"].some((u) => url.startsWith(u))
}

export function getInstagramID(url: string) {
    url = url.split("/?")[0]
    return url.split("/").at(-1)
}

export async function loginToInstagram() {
    const csrfTokenResp = await axios.get("https://www.instagram.com/data/shared_data")
    const csrfTokenData = csrfTokenResp.data
    const csrfToken = csrfTokenData.config.csrf_token
    const cookies = csrfTokenResp.headers["set-cookie"]
    const resp = await axios.request({
        url: "https://www.instagram.com/accounts/login/ajax",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
            "Content-Type": "application/x-www-form-urlencoded",
            "x-csrftoken": csrfToken
        },
        method: "POST",
        data: {
            "username": process.env.USERNAME,
            "enc_password": `#PWD_INSTAGRAM_PASSWORD:0:${Math.floor(Date.now()/1000)}:${process.env.PASSWORD}`
        }
    })
    console.log(resp.data)
      
}

export async function getInstagramVideo(id: string) {
    if(id === "") return
    console.log(id)
    const resp = await fetch(`https://www.instagram.com/graphql/query/?doc_id=18222662059122027&variables=%7B%22child_comment_count%22%3A3%2C%22fetch_comment_count%22%3A40%2C%22has_threaded_comments%22%3Atrue%2C%22parent_comment_count%22%3A24%2C%22shortcode%22%3A%22${id}%22%7D`, {
        headers: {
            "Cookie": "csrftoken=ZBp1Iuox94WFYAMnY7wLYPseHyKAHzJW;"
        }
    })
    const data = await resp.json()
    console.log(data)
    return data.data.shortcode_media.video_url
}
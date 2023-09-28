// async function getCSRF() {
//     const resp = await fetch("https://www.instagram.com/data/shared_data/")
//     if(resp.ok) {
//         const body = await resp.json()
//         return body.config.csrf_token 
//     }
// }

// export async function login() {
//     const token = await getCSRF()
//     if(!token) return
//     var myHeaders = new Headers();
// myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0");
// myHeaders.append("Accept", "*/*");
// myHeaders.append("Accept-Language", "en-US,en;q=0.5");
// myHeaders.append("Accept-Encoding", "gzip, deflate, br");
// myHeaders.append("X-CSRFToken", token);
// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
// myHeaders.append("X-Requested-With", "XMLHttpRequest");
// myHeaders.append("Origin", "https://www.instagram.com");
// myHeaders.append("Alt-Used", "www.instagram.com");
// myHeaders.append("Connection", "keep-alive");
// myHeaders.append("Referer", "https://www.instagram.com/");
// myHeaders.append("Sec-Fetch-Dest", "empty");
// myHeaders.append("Sec-Fetch-Mode", "cors");
// myHeaders.append("Sec-Fetch-Site", "same-origin");
// myHeaders.append("TE", "trailers");
// myHeaders.append("Cookie", `csrftoken=${token}; ds_user_id=5327367458; ig_did=84F4D2DF-C7C7-4C92-B663-B4EB518B7C8F; ig_nrcb=1; mid=ZPsM_AALAAFtRSkTIkzGUISM37Uu; rur=\"NAO\\0545327367458\\0541727199117:01f7e454d21220cf7d17554bfb917b5a47cb17166ad1ddda54858b4c819d2a39378f5c23\"; sessionid=5327367458%3As9zV5XUXw4XaKQ%3A22%3AAYe5Yc6Z7cSQVZJvR-xu49CLuzvMtCoZOxHwy91YXg");

// var urlencoded = new URLSearchParams();
// urlencoded.append("enc_password", `#PWD_INSTAGRAM_BROWSER:0:${Date.now()}:${process.env.INSTA_PASSWORD}`);
// urlencoded.append("optIntoOneTap", "false");
// urlencoded.append("queryParams", "{}");
// urlencoded.append("trustedDeviceRecords", "{}");
// urlencoded.append("username", process.env.INSTA_USERNAME);

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: urlencoded,
//   redirect: 'follow'
// };

// fetch("https://www.instagram.com/api/v1/web/accounts/login/ajax/", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// console.log(await req.json())
// }



// export async function getInstagramMediaURL(url : string) {
//     const instagramPython = await Bun.spawn({
//         cmd: ["python3", `${__dirname}/python/pygram.py`, url],
//         stdout: "pipe",
//         env: {...process.env}
//     })
//     const text = await new Response(instagramPython.stdout).text()
//     return text
// }

// export function isInstagramURL(url: string) {
//     return ["https://www.instagram.com/reel/", "https://www.instagram.com/p"].some(v => url.startsWith(v))
// }


// (async () => {
//     await login()
// })()
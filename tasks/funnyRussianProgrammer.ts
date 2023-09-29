// import { shortenURL } from "../helpers/urls";
// import { Task } from "../structures/task";
// import {readFileSync, writeFileSync} from "fs"

// const funnyRussianProgrammerTask : Task = {
//     cron: "0 7 * * *",
//     async execute(client) {
//         const data = readFileSync("russianProgrammer.json", {encoding: "utf-8"})
//         const body : string[] = JSON.parse(data)
//         const resp = await fetch("https://www.tikwm.com/api/user/posts?user_id=7199104096706905094&count=6")
//         if(resp.ok) {
//             const respBody = await resp.json()
//             const list: any[] = respBody.data.videos
//             const ids : any[] = list.map(x => {
//                 return {
//                     "url": x.play,
//                     "id": x.video_id
//                 }
//             })
//             for(const id of ids) {
//                 if(!body.includes(id.id)) {
//                     if(body.length >= 6)
//                         body.pop()
//                     try {
//                         await client.sendMessageToUsers(["207188862273978370", "279956479140954113"], {
//                             content: `New video from russian programmer!!!!\n${await shortenURL(id.url)}`
//                         })

//                     }
//                     catch(e) {
//                         console.error(e);
                        
//                     }
//                     body.push(id.id)
//                 }
//             }
//             console.log(body)
//             writeFileSync("russianProgrammer.json", JSON.stringify(body, null, 4), {
//                 encoding: "utf-8"
//             })
//         }
//     },
//     timezone: "Asia/Jerusalem",
//     name: "funnyRussianProgrammer"
// }

// export default funnyRussianProgrammerTask
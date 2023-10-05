// import { AttachmentBuilder } from "discord.js";
// import { InstagramClient } from "../helpers/instagram";
// import { Task } from "../structures/task";
// import {readFile, writeFile} from "fs/promises"
// const funnyRussianProgrammerTask : Task = {
//     cron: "0 7 * * *",
//     async execute(client) {
//         const instagramClient = InstagramClient.fromUsernameAndPassword(process.env.INSTA_USERNAME, process.env.INSTA_PASSWORD)
//         const data = await readFile("russianProgrammer.json", {encoding: "utf-8"})
//         const json = JSON.parse(data)
//         const userData = await instagramClient.getUser("python_is_trash")
//         const posts = userData.graphql.user.edge_owner_to_timeline_media.edges
//         for(let i = 0; i < 5; i++) {
//             let p = posts[i].node
//             if(!json.includes(p.shortcode)) {
//                 if(json.length > 5) {
//                     json.pop()
//                 }
//                 json.push(p.shortcode)
//                 const postResp = await instagramClient.getPost(p.shortcode)
//                 const videoUrl = postResp.items[0].video_versions[0].url
//                 const videoData = await fetch(videoUrl)
//                 await client.sendMessageToUsers(["279956479140954113", "207188862273978370"], {
//                     content: "New post from funny russian programmer!",
//                     files: [new AttachmentBuilder(Buffer.from(await videoData.arrayBuffer()))]
//                 })
//             }
//         }
//         await writeFile("russianProgrammer.json", JSON.stringify(json), {
//             encoding: "utf-8"
//         })
//     },
//     timezone: "Asia/Jerusalem",
//     name: "funnyRussianProgrammer"
// }

// export default funnyRussianProgrammerTask
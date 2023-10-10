// import { AttachmentBuilder } from "discord.js";
// import { Task } from "../structures/task";
// import {readFile, writeFile} from "fs/promises"

// const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

// const funnyRussianProgrammerTask : Task = {
//     cron: " * * * *",
//     async execute(client) {
//         const file = await readFile("russianProgrammer.json", {
//             encoding: "utf-8"
//         })
//         const json = JSON.parse(file)
//         const postIdsResp = await fetch("https://berd-1337.riouwu.repl.co/insta/u?user=python_is_trash&c=7")
//         const postIds = await postIdsResp.json()
//         for(let i = 0; i < postIds.length; i++) {
//             if(!json.includes(postIds[i])) {
//                 if(json.length > 5) {
//                     json.pop()
//                 }
//                 json.push(postIds[i])

//                 const videoUrl = `https://berd-1337.riouwu.repl.co/insta/p?id=${postIds[i]}`
                
//                 await client.sendMessageToUsers(["279956479140954113", "207188862273978370"], {
//                     content: "New post from funny russian programmer!\n"+videoUrl,
//                 })

//             }
//             await sleep(2000)
//         }
//         await writeFile("russianProgrammer.json", JSON.stringify(json), {
//             encoding: "utf-8"
//         })
//     },
//     timezone: "Asia/Jerusalem",
//     name: "funnyRussianProgrammer"
// }

// export default funnyRussianProgrammerTask
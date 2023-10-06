import { AttachmentBuilder } from "discord.js";
import { Task } from "../structures/task";
import {readFile, writeFile} from "fs/promises"
const funnyRussianProgrammerTask : Task = {
    cron: "0 7 * * *",
    async execute(client) {
        const file = Bun.file("russianProgrammer.json")
        const json = await file.json()
        const postIdsResp = await fetch("https://berd-1337.riouwu.repl.co/insta/u?user=python_is_trash&c=5")
        const postIds = await postIdsResp.json()
        for(let i = 0; i < postIds.length; i++) {
            if(!json.includes(postIds[i])) {
                if(json.length > 5) {
                    json.pop()
                }
                json.push(postIds[i])

                const videoUrl = `https://berd-1337.riouwu.repl.co/insta/p?id=${postIds[i]}`
                
                await client.sendMessageToUsers(["279956479140954113", "207188862273978370"], {
                    content: "New post from funny russian programmer!\n"+videoUrl,
                })
            }
        }
        await writeFile("russianProgrammer.json", JSON.stringify(json), {
            encoding: "utf-8"
        })
    },
    timezone: "Asia/Jerusalem",
    name: "funnyRussianProgrammer"
}

export default funnyRussianProgrammerTask
import { EmbedBuilder } from "discord.js";
import { GenshinBday } from "../helpers/mongo";
import { Task } from "../structures/task";
import {parse} from "node-html-parser"

function changeTimezone(date: Date | string, timezone : string) {
    if(typeof date === "string") {
        return new Date(new Date(date).toLocaleString("en-US", {timeZone: timezone}))
    }

    return new Date(date.toLocaleString("en-US", {timeZone: timezone}))
}

const checkTask : Task = {
    cron: "0 7 * * *",
    async execute(client) {
        const d = new Date()
        
        const jDate = changeTimezone(d, checkTask.timezone)
        const bday = await GenshinBday.findOne({
            day: jDate.getDate(),
            month: jDate.getMonth() + 1
        }, {
            name: 1,
            image: 1
        })
        if(bday) {
        console.log("Test!!!!!!");
            await client.sendMessageToUsers(["207188862273978370", "279956479140954113"], {
                embeds: [new EmbedBuilder().setTitle(`Today it is ${bday.name}'s bday!!!!!`).setDescription("Check your game for gifts!").setImage(bday.image)]
            })
        }
    },
    timezone: "Asia/Jerusalem",
    name: "checkGenshinBdays"
}

export default checkTask
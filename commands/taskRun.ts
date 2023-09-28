import { AttachmentBuilder } from "discord.js";
import { getTiktokID, getTiktokVideo, isTiktok } from "../helpers/tiktok";
import { Command } from "../structures/command";
import { MyClient } from "..";
import {ownerOnly} from "../helpers/conditions"
const ForceTaskRunCommand: Command = {
    name: "forcetask",
    aliases: ["ft"],
    cooldown: 0,
    deleteOriginalMessage: true,
    condition: ownerOnly,
    async execute(msg, args) {
        const [taskName] = args
        const client = msg.client as MyClient
        if(client.tasks.has(taskName)) {
           await client.tasks.get(taskName)?.execute(client)
           await msg.channel.send(`Ran task: ${taskName} successfully! ✅`)
        }
        else {
            await msg.channel.send(`Not found a task named: ${taskName} ❌❌❌❌❌`)
        }
    },
}
export default ForceTaskRunCommand
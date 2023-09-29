import { AttachmentBuilder } from "discord.js";
import { Command } from "../structures/command";
import { MyClient } from "..";
import {ownerOnly} from "../helpers/conditions"
const DeleteMommyMessages: Command = {
    name: "deleteMsg",
    aliases: ["dmm"],
    cooldown: 0,
    deleteOriginalMessage: true,
    condition: ownerOnly,
    async execute(msg, args) {
        const statusMessage = await msg.channel.send("Deleting messages...")
        const [messageId] = args
        if(!messageId) {
            await statusMessage.edit("Not a valid message")
            return
        }
        const client = msg.client as MyClient
        const message = await msg.channel.messages.fetch(messageId)
        if(message && message.author.id === client.user?.id) {
            await message.delete()
            await statusMessage.edit(`Deleted message!`)
        }
        
    },
}
export default DeleteMommyMessages
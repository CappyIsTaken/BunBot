import { Attachment, AttachmentBuilder, MessageType } from "discord.js";
import { Command } from "../structures/command";
import { MyClient } from "..";
import {ownerOnly} from "../helpers/conditions"
import * as sharp from "sharp"
import { sha } from "bun";
const FixImage: Command = {
    name: "fixImage",
    aliases: ["fix"],
    cooldown: 0,
    deleteOriginalMessage: true,
    condition: ownerOnly,
    async execute(msg, args) {
        const statusMessage = await msg.channel.send("Fixing image...")
        if(msg.type === MessageType.Reply) {
            const originalMessage = await msg.fetchReference()
            if(originalMessage.attachments.size > 0) {
                const first = originalMessage.attachments.first()
                if(first?.name.includes(".png")) {
                    const imageData = await fetch(first.url)
                    const imageDataBuf = await imageData.arrayBuffer()
                    const fixed = await (sharp(imageDataBuf)).toBuffer()
                    await statusMessage.edit({
                        content: "Your image has been fixed!",
                        files: [
                            {attachment: fixed, name: "fixed.png"}
                        ]
                    })
                }
            }
        }
    },
}
export default FixImage
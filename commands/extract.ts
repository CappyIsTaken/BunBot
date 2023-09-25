import { AttachmentBuilder } from "discord.js";
import { getInstagramMediaURL, isInstagramURL } from "../helpers/instagram";
import { getTiktokID, getTiktokVideo, isTiktok } from "../helpers/tiktok";
import { getXID, getXVideo, isX } from "../helpers/x";
import { Command } from "../structures/command";

const ExtractCommand: Command = {
    name: "extract",
    aliases: ["e"],
    cooldown: 0,
    deleteOriginalMessage: true,
    async execute(msg, args) {
        const [url] = args
        if(isTiktok(url)) {
            const id = await getTiktokID(url) ?? ""
            const video = await getTiktokVideo(id)
            if(video) {
                await msg.reply(video)
            }
            return
        }
        if(isX(url)) {
            const id = getXID(url) ?? ""
            console.log(id)
            const video = await getXVideo(id)
            if(video) {
                await msg.reply(video)
            }
            return
        }
        if(isInstagramURL(url)) {
            const statusMessage = await msg.channel.send("Getting media from post!")
            const mediaURL = await getInstagramMediaURL(url)
            if(mediaURL) {
                await statusMessage.edit("Found media, Downloading it...")
                const media = await fetch(mediaURL)
                await statusMessage.edit({
                    files: [
                        new AttachmentBuilder(Buffer.from(await media.arrayBuffer()),{name: `${crypto.randomUUID()}.mp4`, description: ""})
                    ],
                    content: `Your post has been successfully uploaded, ${msg.author}`
                })

            }
        }
    },
}
export default ExtractCommand
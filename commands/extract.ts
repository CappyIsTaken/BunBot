import { AttachmentBuilder } from "discord.js";
// import { getInstagramMediaURL, isInstagramURL } from "../helpers/instagram";
import { getTiktokID, getTiktokVideo, isTiktok } from "../helpers/tiktok";
import { getXID, getXVideo, isX } from "../helpers/x";
import { Command } from "../structures/command";
import {serverOnly} from "../helpers/conditions"
import { shortenURL } from "../helpers/urls";
const ExtractCommand: Command = {
    name: "extract",
    aliases: ["e"],
    cooldown: 0,
    condition: serverOnly,
    deleteOriginalMessage: true,
    async execute(msg, args) {
        const statusMessage = await msg.channel.send("Extracting media...")
        const [url] = args
        if(isTiktok(url)) {
            const id = await getTiktokID(url) ?? ""
            const video = await getTiktokVideo(id)
            const shortened = await shortenURL(video)
            if(video) {
                await statusMessage.edit(`Your video has been extracted, ${msg.author}:\n${shortened}\nSource: Tiktok\nOriginal URL: <${url}>`)
            }
            return
        }
        if(isX(url)) {
            const id = getXID(url) ?? ""
            const video = await getXVideo(id)
            const shortened = await shortenURL(video)
            if(video) {
                await statusMessage.edit(`Your video has been extracted, ${msg.author}:\nVideo URL: ${shortened}\nSource: X\nOriginal URL: <${url}>`)
            }
            return
        }
        // if(isInstagramURL(url)) {
        //     const statusMessage = await msg.channel.send("Getting media from post!")
        //     const mediaURL = await getInstagramMediaURL(url)
        //     if(mediaURL) {
        //         await statusMessage.edit("Found media, Downloading it...")
        //         const media = await fetch(mediaURL)
        //         await statusMessage.edit({
        //             files: [
        //                 new AttachmentBuilder(Buffer.from(await media.arrayBuffer()),{name: `${crypto.randomUUID()}.mp4`, description: ""})
        //             ],
        //             content: `Your post has been successfully uploaded, ${msg.author}`
        //         })

        //     }
        // }
    },
}
export default ExtractCommand
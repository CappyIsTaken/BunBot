import { AttachmentBuilder } from "discord.js";
// import { getInstagramMediaURL, isInstagramURL } from "../helpers/instagram";
import { Command } from "../structures/command";
import {serverOnly} from "../helpers/conditions"
import { AutoParser, isTiktok, isX, shortenURL, TiktokParser, TwitterParser } from "../helpers/urls";
const ExtractCommand: Command = {
    name: "extract",
    aliases: ["e"],
    cooldown: 0,
    deleteOriginalMessage: true,
    async execute(msg, args) {
        const statusMessage = await msg.channel.send("Extracting media...")
        const [url] = args
        const parser = AutoParser.getParser(url)
        if(!parser) {
            await statusMessage.edit("Invalid URL!")
            return
        }
        const video = await parser.getMediaURL()
        console.log(video)
        if(video) {
                const shortened = await shortenURL(video)
                await statusMessage.edit(`Your video has been extracted, ${msg.author}:\nVideo URL: ${shortened}\nSource: ${parser.source}\nOriginal URL: <${url}>`)
        }
        return
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
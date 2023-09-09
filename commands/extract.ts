import { getInstagramID, getInstagramVideo, isInstagram, loginToInstagram } from "../helpers/instagram";
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
        // if(isInstagram(url)) {
        //     console.log("instagram!")
        //     await loginToInstagram()
        // }
    },
}
export default ExtractCommand
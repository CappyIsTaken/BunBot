import { AttachmentBuilder } from "discord.js";
import { Command } from "../structures/command";
import { MyClient } from "..";
import {dmOnly} from "../helpers/conditions"
import Paginator from "../helpers/pagination/Paginator";
import Page from "../helpers/pagination/Page";
const GenshinEventsCommand: Command = {
    name: "genshinevents",
    aliases: ["ge"],
    cooldown: 0,
    deleteOriginalMessage: true,
    condition: dmOnly,
    async execute(msg, args) {
        const statusMessage = await msg.channel.send("Getting events...")
        const genshinEventsResp = await fetch("https://bbs-api-os.hoyolab.com/community/community_contribution/wapi/event/list?gids=2&size=15")
        if(genshinEventsResp.ok) {
            const body = await genshinEventsResp.json()
            const paginator = new Paginator(statusMessage)
            const pages = body.data.list.map((x,i) => {
                const startDate = new Date(parseInt(x.start)*1000).toLocaleString("en-GB", {timeZone: "Asia/Jerusalem"})
                const endDate = new Date(parseInt(x.end)*1000).toLocaleString("en-GB", {timeZone: "Asia/Jerusalem"})
                const status = x.status === 3 ? "In Progress" : x.status === 4 ? "Ended" : ""
                return new Page(`(${i+1}/${body.data.list.length}): ${x.name}`, x.desc).setImage(x.banner_url).addField("Started at: ", startDate).addField("Ends at: ", endDate).addField("Status: ", status).addField("URL: ", `https://www.hoyolab.com${x.web_path}`)

            })
            paginator.addPages(pages)
            await paginator.start()
        }
    },
}
export default GenshinEventsCommand
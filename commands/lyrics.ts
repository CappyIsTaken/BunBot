import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, embedLength } from "discord.js";
import { searchSongs } from "../helpers/shazam";
import { Command } from "../structures/command";
import { getYoutubeData, isYoutubeURL } from "../helpers/youtube";


const truncateStr = (str : string, num : number) => (num > str.length) ? str : `${str.substring(0, num)}...`

const LyricsCommand : Command = {
    name: "lyrics",
    aliases: ["l"],
    cooldown: 0,
    deleteOriginalMessage: false,
    async execute(msg, args) {
        const name = args.join(" ")
        let realName = name
        if(isYoutubeURL(name)) {
            const data = await getYoutubeData(name)
            realName = data.title
        }
        const searchResults = await searchSongs(realName, 25)
        if(searchResults) {
            const cancelButton = new ButtonBuilder()
                                    .setCustomId("cancel")
                                    .setLabel("Cancel")
                                    .setStyle(ButtonStyle.Danger)
            const selection = new StringSelectMenuBuilder()
                                .setCustomId("select")
                                .setPlaceholder("Choose a track...")
                                .addOptions(searchResults.map((s,i) => new StringSelectMenuOptionBuilder().setLabel(truncateStr(`${s.artists} - ${s.name}`, 22)).setValue(i.toString())))
            const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selection)
            const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(cancelButton)
            const respMessage = await msg.reply({components: [row, row2]})
            const selectCollector = respMessage.createMessageComponentCollector({
                max: 1,
                maxUsers: 1,
                time: 300000,
                filter: (interaction) => interaction.user.id === msg.author.id
            })
            selectCollector.once("collect", async (interaction) => {
                if(interaction.isButton()) {
                    if(interaction.customId === "cancel") {
                        selectCollector.stop()
                        await interaction.deferUpdate()
                        await respMessage.edit({
                            content: "Cancelled the selection!",
                            components: [],
                            embeds: []
                        })
                    }
                }
                if(!interaction.isStringSelectMenu()) return
                const value = interaction.values[0]
                const index = parseInt(value)
                const song = searchResults[index]
                if(song && song.hasLyrics) {
                    const lyrics = await song.getLyrics()
                    await interaction.deferUpdate()
                    const lyricsEmbed = new EmbedBuilder()
                                            .setColor("Random")
                                            .setDescription(lyrics)
                                            .setTitle(`Showing lyrics for: ${song.artists} - ${song.name}`)
                                            .setThumbnail(song.artwork)
                    await respMessage.edit({
                        content: `Song requested by: ${msg.author}`,
                        embeds: [lyricsEmbed],
                        components: []
                    })
                }
                else {
                    await respMessage.edit({
                        content: `Yo ${msg.author}, The song doesn't have lyrics or ain't real! Get a real song next time!`,
                        embeds: [],
                        components: []
                    })  
                }
            })
        }
    }
}

export default LyricsCommand
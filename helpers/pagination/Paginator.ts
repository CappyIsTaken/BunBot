import { ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonInteraction, ButtonStyle, ComponentType, Interaction, Message } from "discord.js"
import Page from "./Page"

export default class {
    pages: Page[]
    current: number
    message: Message
    constructor(messageToDisplay: Message) {
        this.pages = []
        this.current = 0
        this.message = messageToDisplay
    }

    async start() {
        
        const prev = new ButtonBuilder().setCustomId("prev").setStyle(ButtonStyle.Danger).setLabel("Previous").setDisabled(true)
        const nextButton = new ButtonBuilder().setCustomId("next").setStyle(ButtonStyle.Success).setLabel("Next")
        await this.message.edit({
            content: "",
            components: [new ActionRowBuilder<ButtonBuilder>().addComponents(prev, nextButton)],
            embeds: [this.pages[this.current].getEmbed()]
        })
        const collector = this.message.createMessageComponentCollector({
            componentType: ComponentType.Button,
        })
        collector.on("collect", async (interaction) => {
            if(interaction.customId === "prev") {
                await this.previousPage(interaction)
            }
            if(interaction.customId === "next") {
                await this.nextPage(interaction)
            }
        })
    }



    addPages(pages: Page[]) {
        console.log(pages)
        this.pages = this.pages.concat(pages)
    }

    async nextPage(interaction: ButtonInteraction) {
        this.current = (this.current + 1) % this.pages.length
        const prev = new ButtonBuilder().setCustomId("prev").setStyle(ButtonStyle.Danger).setLabel("Previous").setDisabled(false)
        const nextButton = new ButtonBuilder().setCustomId("next").setStyle(ButtonStyle.Success).setLabel("Next").setDisabled(this.current == this.pages.length -1)

        await interaction.update({
            content: "",
            components: [new ActionRowBuilder<ButtonBuilder>().addComponents(prev, nextButton)],            
            embeds: [this.pages[this.current].getEmbed()]
        })
    }
    async previousPage(interaction: ButtonInteraction) {
        this.current = Math.max(this.current - 1, 0)
        const nextButton = new ButtonBuilder().setCustomId("next").setStyle(ButtonStyle.Success).setLabel("Next")
        const prev = new ButtonBuilder().setCustomId("prev").setStyle(ButtonStyle.Danger).setLabel("Previous").setDisabled(this.current == 0)
        await interaction.update({
            content: "",
            components: [new ActionRowBuilder<ButtonBuilder>().addComponents(prev, nextButton)],
            embeds: [this.pages[this.current].getEmbed()]
        })    
    }
}
import { EmbedBuilder } from "discord.js"

export default class {
    private title: string
    private description: string
    private image?: string

    private embed: EmbedBuilder
    constructor(title: string, description: string) {
        this.embed = new EmbedBuilder()
        this.title = title
        this.description = description
        this.embed.setTitle(this.title)
        this.embed.setDescription(this.description)
    }

    setImage(image: string) {
        this.image = image
        this.embed.setImage(image)
        return this
    }

    addField(name: string, value: string) {
        this.embed.addFields([{
            name: name,
            value: value
        }])
        return this
    }

    getEmbed() {
        return this.embed
    }

}
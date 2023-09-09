import {Client, ClientOptions, Collection, Events, GatewayIntentBits, Message} from "discord.js"

import {readdirSync} from "node:fs"

import path from "path"
import { mentionedOr } from "./helpers/prefix"
import { Command } from "./structures/command"

class MyClient extends Client {
    commands: Collection<string, Command> = new Collection()
    commandsDir = ""
    prefixes: string[] = []
    constructor(options: ClientOptions, commandsDir: string, prefixes: string[]) {
        super(options)
        this.commandsDir = path.join(__dirname, commandsDir)
        
        this.prefixes = prefixes

        this.createReadyListener()
        this.createCommandsListener()
    }

    createCommandsListener() {
        this.on(Events.MessageCreate, async (msg) => {
            const data = this.getCommand(msg)
            if(data.command && data.prefix) {
                const cmd = this.commands.get(data.command)
                if(cmd) {
                    await cmd.execute(msg, data.args)
                    if(cmd.deleteOriginalMessage) {
                        await msg.delete()
                    }
                }
            }
        })
    }

    createReadyListener() {
        this.once(Events.ClientReady, async (c) => {
            console.log(`Ready! Logged in as: ${c.user.tag}`)
            await this.setupCommands()
            if(this.prefixes[0] == "mention") {
                this.prefixes[0] = `<@${this.user?.id}>`
            }
        })
    }


    getCommand(msg: Message<boolean>) {
        const prefix = this.prefixes.find((p) => msg.content.startsWith(p))
        const args = msg.content.slice(prefix?.length).trim().split(/ +/)
        const command = args.shift()?.toLowerCase()
        return {
            prefix,
            command,
            args
        }
    }

    async setupCommands() {
        const commandFiles = readdirSync(this.commandsDir).filter(file => file.endsWith('.ts'))
        for(const file of commandFiles) {
            const filePath = path.join(this.commandsDir, file)
            const command : Command = (await import(filePath)).default
            if("name" in command && "execute" in command) {
                client.commands.set(command.name, command)
                if(command.aliases.length > 0) {
                    for(const alias of command.aliases) {
                        client.commands.set(alias, command)
                    }
                }
                console.log(`Set command: ${command.name} with it's prefixes: ${command.aliases.join(', ')}`)
            }
            else {
                console.log("Invalid file!")
            }
        }
    }

}

const client = new MyClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent]
}, "/commands", mentionedOr("!"))




client.login(process.env.DISCORD_TOKEN)
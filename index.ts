import {Client, ClientOptions, Collection, Events, GatewayIntentBits, Message, MessageCreateOptions, MessagePayload, Partials, Snowflake} from "discord.js"

import {readdirSync} from "node:fs"

import path from "path"
import { mentionedOr } from "./helpers/prefix"
import { Command } from "./structures/command"
import { Task } from "./structures/task"
import cron from "node-cron"

type MyClientOptions = {
    commandsDir: string,
    tasksDir: string,
    prefixes: string[],
}


export class MyClient extends Client {
    commands: Collection<string, Command> = new Collection()
    tasks: Collection<string, Task> = new Collection()
    commandsDir = ""
    tasksDir = ""
    prefixes: string[] = []
    constructor(options: ClientOptions, myOptions: MyClientOptions) {
        super(options)
        this.commandsDir = path.join(__dirname, myOptions.commandsDir)
        
        this.prefixes = myOptions.prefixes
        this.tasksDir = path.join(__dirname, myOptions.tasksDir)
        this.createReadyListener()
        this.createCommandsListener()
    }



    createCommandsListener() {
        this.on(Events.MessageCreate, async (msg) => {
            const data = this.parseCommand(msg)
            if(data.command && data.prefix) {
                const cmd = this.commands.get(data.command)
                if(cmd) {
                    const canExecute = await cmd.condition(msg, data.args)
                    if(!canExecute) {
                        await msg.channel.send(`Can't execute ${data.command} as you don't meet the condition!`)
                        return
                    }
                    await cmd.execute(msg, data.args)
                    if(cmd.deleteOriginalMessage) {
                        await msg.delete()
                    }
                }
            }
        })
    }

    async sendMessageToUsers(users: Snowflake[], message: MessagePayload | MessageCreateOptions) {
        users.forEach(async u => {
            const user = await this.users.fetch(u)
            if(user) {
                await user.send(message)
            }
        })
    }

    createReadyListener() {
        this.once(Events.ClientReady, async (c) => {
            console.log(`Ready! Logged in as: ${c.user.tag}`)
            this.patchMentionPrefix()
            await this.setupCommands()
            await this.setupTasks()
            this.createTasks()   
        })
    }

    createTasks() {
        for(const [_, value] of this.tasks) {
            let task = cron.schedule(value.cron, async () => await value.execute(this), {
                timezone: value.timezone,
                scheduled: true
            })
            value.cronJob = task
            task.start()
        }
        console.log(`Created ${this.tasks.size} tasks!`);
        
    }

    patchMentionPrefix() {
        
        if(this.prefixes[0] == "mention") this.prefixes[0] = `<@${this.user?.id}>`
    }



    parseCommand(msg: Message<boolean>) {
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

    async setupTasks() {
        const taskFiles = readdirSync(this.tasksDir).filter(file => file.endsWith('.ts'))
        for(const file of taskFiles) {
            const filePath = path.join(this.tasksDir, file)
            const task : Task = (await import(filePath)).default
            if(task && "name" in task && "execute" in task && "cron" in task) {
                this.tasks.set(task.name, task)
                console.log(`Set task: ${task.name} to cron string: ${task.cron}`)
            }
            else {
                console.log("Invalid file!")
            }
        }
    }

}

const client = new MyClient({
    partials: [Partials.Channel, Partials.Message],
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent]
}, {commandsDir: "/commands", prefixes: mentionedOr("!"), tasksDir: "/tasks"})




client.login(process.env.DISCORD_TOKEN)
import { Message } from "discord.js"

type ExecuteFunction = (msg: Message, args: string[]) => Promise<void>;
export type ConditionFunction = (msg: Message, args: string[]) => Promise<boolean>


export type Command = {
    name: string,
    aliases: string[],
    execute: ExecuteFunction,
    cooldown: number,
    deleteOriginalMessage: boolean
    condition: ConditionFunction
}
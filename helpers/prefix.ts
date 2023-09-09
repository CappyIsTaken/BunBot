import { Client } from "discord.js";


export function mentionedOr(...prefixes: string[]) : string[] {
    if(prefixes.length == 1) return ["mention", prefixes[0]]
    return ["mention", ...prefixes]
}


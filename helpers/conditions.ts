import { ConditionFunction } from "../structures/command";

export const serverOnly : ConditionFunction = async (msg, args) => {
    return msg.inGuild()
}

export const dmOnly : ConditionFunction = async (msg, args) => {
    return msg.channel.isDMBased()
}

export const ownerOnly : ConditionFunction = async (msg,args) => {
    return msg.author.id === process.env.OWNER_ID
}
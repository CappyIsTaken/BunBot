import mongoose, { Schema, model } from "mongoose";

const connection = mongoose.connect(process.env.DB_URI)

interface IGenshinBday {
    name: string,
    date: string,
    month: number,
    day: number,
    image: string
}

export const genshinBdaySchema = new Schema<IGenshinBday>({
    name: {type: String, required: true},
    date: {type: String, required: true},
    month: {type: Number, required: true},
    day: {type: Number, required: true},
    image: {type: String, required: true}
})

export const GenshinBday = model<IGenshinBday>("genshin_bday", genshinBdaySchema, "genshin_impact_bdays")


export function connectDB() : Promise<typeof mongoose> {
    return connection
}
import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: [true]
        },
        lugar:{
            type: String,
            required: [true]
        },
        lon:{
            type: String
        },
        lat:{
            type: String
        },
        organizador:{
            type: String,
        },
        imagen:{
            type: String
        }
    },
    {
        timestamps: true,
        versionKey:false
    }
)

export const Evento = 
    mongoose?.models?.eventos || 
    mongoose.model("eventos", eventoSchema)
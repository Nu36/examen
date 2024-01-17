import mongoose from "mongoose";

const pagaSchema = new mongoose.Schema(
    {
        concepto:{
            type: String,
            required: true
        },
        importe:{
            type: String
        },
        direccion:{
            type: String
        },
        codPostal:{
            type: String
        },
        lon:{
            type: String
        },
        lat:{
            type: String
        },
        email: {
            type: String
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

export const Paga = 
    mongoose?.models?.pagas || 
    mongoose.model("pagas", pagaSchema)

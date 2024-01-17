import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema(
    {
        concepto:{
            type: String,
            required: true
        },
        importe:{
            type: String,
            required: true
        },
        direccion:{
            type: String,
        },
        codPostal:{
            type: String,
            required: true
        },
        lon:{
            type: String
        },
        lat:{
            type: String
        },
        email: {
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

export const Pago = 
    mongoose?.models?.pagos || 
    mongoose.model("pagos", pagoSchema)

import mongoose from "mongoose";

const loginLogSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    caducidad: { type: Date },
    token: { 
        name: { type: String, required: true },
        email: { type: String, required: true },
        picture: { type: String, required: true },
        sub: { type: String, required: true },
        iat: { type: String, required: true },
        exp: { type: String, required: true }, 
        jti: { type: String, required: true },
    },
}, {
    timestamps: true,
    versionKey:false
});

export const LoginLog = mongoose?.models?.loginLog || mongoose.model("loginLog", loginLogSchema)
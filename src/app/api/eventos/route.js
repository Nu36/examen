import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Evento } from "@/models/Evento";

export const GET = async (req, res) => {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const linea = searchParams.get("linea");
    const sentido = searchParams.get("sentido");
    const nombre = searchParams.get("nombre");

    try {
        let result;

        result = await Evento.find({linea: linea, sentido: sentido});
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
};

export const POST = async (req) => {
    await connectDB();
    try {
        const body = await req.json();
        console.log(body)
        const newEvento = await Evento.create(body);
        return NextResponse.json(newEvento, { status: 201 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};